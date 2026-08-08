import { Paragraph, TextRun } from "docx";
import type { Planeacion } from "../generacion/tipos";
import { crearDocumento, empaquetar, parrafo, titulo1, titulo2, vinetaItem } from "./comunDocx";

export async function buildPlaneacionDocx(data: Planeacion): Promise<Buffer> {
  const hijos: Paragraph[] = [
    titulo1(data.titulo),
    parrafo(`Duración total: ${data.duracionMinutos} minutos`),
    titulo2("Objetivo de aprendizaje"),
    parrafo(data.objetivoAprendizaje),
    titulo2("Materiales"),
    ...(data.materiales ?? []).map(vinetaItem),
    titulo2("Desarrollo de la sesión"),
  ];

  for (const fase of data.desarrollo ?? []) {
    hijos.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${fase.fase} (${fase.minutos} min): `, bold: true }),
          new TextRun(fase.descripcion),
        ],
        spacing: { after: 120 },
      })
    );
  }

  hijos.push(titulo2("Evaluación"), parrafo(data.evaluacion));

  if (data.tareaExtraclase) {
    hijos.push(titulo2("Tarea extraclase"), parrafo(data.tareaExtraclase));
  }

  return empaquetar(crearDocumento(hijos));
}
