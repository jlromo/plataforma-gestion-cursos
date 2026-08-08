import fs from "node:fs";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { generarContenido } from "./cliente";
import type { ContenidoPorTipo, ContextoGeneracion, TipoRecurso } from "./tipos";
import { buildPlaneacionDocx } from "@/lib/documentos/planeacion";
import { buildGuiaLecturaDocx } from "@/lib/documentos/guiaLectura";
import { buildExamenDocx } from "@/lib/documentos/examen";
import { buildPreguntasDocx } from "@/lib/documentos/preguntas";
import { buildPresentacionPptx } from "@/lib/documentos/presentacion";

const EXTENSION_POR_TIPO: Record<TipoRecurso, string> = {
  PLANEACION: "docx",
  PRESENTACION: "pptx",
  GUIA_LECTURA: "docx",
  EXAMEN: "docx",
  PREGUNTAS_DIDACTICAS: "docx",
};

async function construirArchivo<T extends TipoRecurso>(
  tipo: T,
  contenido: ContenidoPorTipo[T]
): Promise<Buffer> {
  switch (tipo) {
    case "PLANEACION":
      return buildPlaneacionDocx(contenido as ContenidoPorTipo["PLANEACION"]);
    case "PRESENTACION":
      return buildPresentacionPptx(contenido as ContenidoPorTipo["PRESENTACION"]);
    case "GUIA_LECTURA":
      return buildGuiaLecturaDocx(contenido as ContenidoPorTipo["GUIA_LECTURA"]);
    case "EXAMEN":
      return buildExamenDocx(contenido as ContenidoPorTipo["EXAMEN"]);
    case "PREGUNTAS_DIDACTICAS":
      return buildPreguntasDocx(contenido as ContenidoPorTipo["PREGUNTAS_DIDACTICAS"]);
    default:
      throw new Error(`Tipo de recurso no soportado: ${tipo}`);
  }
}

function slugificar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(new RegExp(`[\\u0300-\\u036f]`, "g"), "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export type ParametrosGeneracion = {
  tipo: TipoRecurso;
  cursoId: string;
  unidadId?: string | null;
  sesionId?: string | null;
};

export async function generarYGuardarRecurso(params: ParametrosGeneracion) {
  const { tipo, cursoId, unidadId, sesionId } = params;

  const curso = await prisma.curso.findUniqueOrThrow({ where: { id: cursoId } });

  let unidad: { id: string; titulo: string; objetivo: string | null } | null = null;
  let sesion: { id: string; titulo: string; objetivo: string | null } | null = null;
  let referencias: { titulo: string }[] = [];

  if (sesionId) {
    const sesionEncontrada = await prisma.sesion.findUniqueOrThrow({
      where: { id: sesionId },
      include: { unidad: { include: { referencias: true } } },
    });
    sesion = sesionEncontrada;
    unidad = sesionEncontrada.unidad;
    referencias = sesionEncontrada.unidad.referencias;
  } else if (unidadId) {
    const unidadEncontrada = await prisma.unidad.findUniqueOrThrow({
      where: { id: unidadId },
      include: { referencias: true },
    });
    unidad = unidadEncontrada;
    referencias = unidadEncontrada.referencias;
  }

  const contexto: ContextoGeneracion = {
    cursoNombre: curso.nombre,
    unidadTitulo: unidad?.titulo ?? curso.nombre,
    unidadObjetivo: unidad?.objetivo ?? null,
    sesionTitulo: sesion?.titulo ?? null,
    sesionObjetivo: sesion?.objetivo ?? null,
    bibliografia: referencias.map((r) => r.titulo),
  };

  const contenido = await generarContenido(tipo, contexto);
  const buffer = await construirArchivo(tipo, contenido);

  const extension = EXTENSION_POR_TIPO[tipo];
  const nombreArchivo = `${slugificar(contenido.titulo)}-${Date.now()}.${extension}`;
  const carpetaDestino = path.join(process.cwd(), "generated", curso.slug);
  fs.mkdirSync(carpetaDestino, { recursive: true });
  const rutaAbsoluta = path.join(carpetaDestino, nombreArchivo);
  fs.writeFileSync(rutaAbsoluta, buffer);

  return prisma.recursoGenerado.create({
    data: {
      tipo,
      cursoId,
      unidadId: unidad?.id ?? null,
      sesionId: sesion?.id ?? null,
      titulo: contenido.titulo,
      archivo: rutaAbsoluta,
    },
  });
}
