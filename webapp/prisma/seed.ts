import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, TipoMaterial, EstadoContenido } from "../src/generated/prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Raíz del proyecto de materiales (un nivel arriba de webapp/), donde el
// usuario ya organizó cada curso en subcarpetas "00 Programa" / "Biblioteca".
const MATERIALES_ROOT = path.resolve(__dirname, "..", "..");

type CursoSeed = {
  slug: string;
  nombre: string;
  carpeta: string; // relativa a MATERIALES_ROOT
  orden: number;
  escanear: boolean; // false = dejar pendiente, no indexar materiales todavía
};

const CURSOS: CursoSeed[] = [
  {
    slug: "economia-forestal",
    nombre: "Economía Forestal",
    carpeta: "Materiales del curso Economía Forestal",
    orden: 1,
    escanear: false, // pendiente: programa y bibliografía por definir
  },
  {
    slug: "economia-deterioro-ambiental",
    nombre: "Economía del Deterioro Ambiental",
    carpeta: "Materiales del curso Econ-Det-Amb",
    orden: 2,
    escanear: true,
  },
  {
    slug: "formulacion-evaluacion-proyectos-forestales",
    nombre: "Formulación y Evaluación de Proyectos Forestales",
    carpeta: "Materiales del curso Form-Eval-Proy-For",
    orden: 3,
    escanear: true,
  },
];

const EXTENSIONES_VALIDAS = new Set([".pdf", ".docx", ".doc", ".pptx", ".xlsx"]);

function esArchivoTemporal(nombre: string) {
  return nombre.startsWith("~$") || nombre.startsWith(".");
}

function clasificarTipo(rutaRelativa: string): TipoMaterial {
  return /programa/i.test(rutaRelativa) ? "PROGRAMA" : "BIBLIOGRAFIA";
}

function listarArchivosRecursivo(dirAbsoluto: string, dirRaizCurso: string): {
  nombre: string;
  rutaAbsoluta: string;
  tipo: TipoMaterial;
  tamanioBytes: number;
}[] {
  if (!fs.existsSync(dirAbsoluto)) return [];

  const resultados: ReturnType<typeof listarArchivosRecursivo> = [];
  for (const entrada of fs.readdirSync(dirAbsoluto, { withFileTypes: true })) {
    if (esArchivoTemporal(entrada.name)) continue;
    const rutaAbsoluta = path.join(dirAbsoluto, entrada.name);

    if (entrada.isDirectory()) {
      resultados.push(...listarArchivosRecursivo(rutaAbsoluta, dirRaizCurso));
      continue;
    }

    const ext = path.extname(entrada.name).toLowerCase();
    if (!EXTENSIONES_VALIDAS.has(ext)) continue;

    const rutaRelativa = path.relative(dirRaizCurso, rutaAbsoluta);
    resultados.push({
      nombre: entrada.name,
      rutaAbsoluta,
      tipo: clasificarTipo(rutaRelativa),
      tamanioBytes: fs.statSync(rutaAbsoluta).size,
    });
  }
  return resultados;
}

async function main() {
  for (const c of CURSOS) {
    const carpetaAbsoluta = path.join(MATERIALES_ROOT, c.carpeta);
    const archivos = c.escanear
      ? listarArchivosRecursivo(carpetaAbsoluta, carpetaAbsoluta)
      : [];

    const estado: EstadoContenido = !c.escanear
      ? "PENDIENTE"
      : archivos.length > 0
        ? "EN_PROCESO"
        : "PENDIENTE";

    const curso = await prisma.curso.upsert({
      where: { slug: c.slug },
      update: {
        nombre: c.nombre,
        carpeta: carpetaAbsoluta,
        orden: c.orden,
        estado,
      },
      create: {
        slug: c.slug,
        nombre: c.nombre,
        carpeta: carpetaAbsoluta,
        orden: c.orden,
        estado,
      },
    });

    // Reindexar materiales: se limpian y se vuelven a insertar para que el
    // seed sea idempotente ante cambios en las carpetas de origen.
    await prisma.material.deleteMany({ where: { cursoId: curso.id } });
    if (archivos.length > 0) {
      await prisma.material.createMany({
        data: archivos.map((a) => ({
          cursoId: curso.id,
          tipo: a.tipo,
          nombre: a.nombre,
          rutaAbsoluta: a.rutaAbsoluta,
          tamanioBytes: a.tamanioBytes,
        })),
      });
    }

    console.log(
      `- ${c.nombre}: ${archivos.length} archivo(s) indexado(s), estado=${estado}`
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
