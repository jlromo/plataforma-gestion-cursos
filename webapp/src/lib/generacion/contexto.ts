import type { ContextoGeneracion } from "./tipos";

export function formatearContexto(ctx: ContextoGeneracion): string {
  const partes = [
    `Curso: ${ctx.cursoNombre}`,
    `Unidad: ${ctx.unidadTitulo}`,
  ];
  if (ctx.unidadObjetivo) {
    partes.push(`Objetivo de la unidad: ${ctx.unidadObjetivo}`);
  }
  if (ctx.sesionTitulo) {
    partes.push(`Sesión / tema específico: ${ctx.sesionTitulo}`);
  }
  if (ctx.sesionObjetivo) {
    partes.push(`Detalle de la sesión: ${ctx.sesionObjetivo}`);
  }
  if (ctx.bibliografia.length > 0) {
    partes.push(
      `Bibliografía disponible para este contenido:\n` +
        ctx.bibliografia.map((b) => `- ${b}`).join("\n")
    );
  }
  return partes.join("\n\n");
}
