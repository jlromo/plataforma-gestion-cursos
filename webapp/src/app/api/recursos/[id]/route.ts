import path from "node:path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CONTENT_TYPE_POR_EXTENSION: Record<string, string> = {
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const recurso = await prisma.recursoGenerado.findUnique({ where: { id } });
  if (!recurso) {
    return NextResponse.json({ error: "Recurso no encontrado." }, { status: 404 });
  }

  const extension = path.extname(recurso.nombreArchivo).toLowerCase();
  const contentType = CONTENT_TYPE_POR_EXTENSION[extension] ?? "application/octet-stream";

  return new NextResponse(new Uint8Array(recurso.contenido), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${encodeURIComponent(recurso.nombreArchivo)}"`,
    },
  });
}
