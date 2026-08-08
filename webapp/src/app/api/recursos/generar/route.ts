import { NextResponse } from "next/server";
import { generarYGuardarRecurso } from "@/lib/generacion/generar";
import type { TipoRecurso } from "@/lib/generacion/tipos";

const TIPOS_VALIDOS: TipoRecurso[] = [
  "PLANEACION",
  "PRESENTACION",
  "GUIA_LECTURA",
  "EXAMEN",
  "PREGUNTAS_DIDACTICAS",
];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido." }, { status: 400 });
  }

  const { tipo, cursoId, unidadId, sesionId } = body as Record<string, unknown>;

  if (typeof tipo !== "string" || !TIPOS_VALIDOS.includes(tipo as TipoRecurso)) {
    return NextResponse.json({ error: "Tipo de recurso inválido." }, { status: 400 });
  }
  if (typeof cursoId !== "string") {
    return NextResponse.json({ error: "Falta cursoId." }, { status: 400 });
  }

  try {
    const recurso = await generarYGuardarRecurso({
      tipo: tipo as TipoRecurso,
      cursoId,
      unidadId: typeof unidadId === "string" ? unidadId : null,
      sesionId: typeof sesionId === "string" ? sesionId : null,
    });
    return NextResponse.json({ recurso });
  } catch (error) {
    console.error("Error al generar recurso:", error);
    const mensaje = error instanceof Error ? error.message : "Error desconocido.";
    return NextResponse.json({ error: mensaje }, { status: 500 });
  }
}
