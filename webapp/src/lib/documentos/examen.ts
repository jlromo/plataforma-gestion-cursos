import { Paragraph, TextRun } from "docx";
import type { Examen } from "../generacion/tipos";
import { crearDocumento, empaquetar, parrafo, titulo1, titulo2 } from "./comunDocx";

export async function buildExamenDocx(data: Examen): Promise<Buffer> {
  const hijos: Paragraph[] = [titulo1(data.titulo), parrafo(data.instrucciones), titulo2("Preguntas")];

  for (const p of data.preguntas ?? []) {
    hijos.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${p.numero}. `, bold: true }),
          new TextRun(p.enunciado),
          new TextRun({ text: `  (${p.puntos} pts)`, italics: true }),
        ],
        spacing: { before: 160, after: 60 },
      })
    );

    if (p.opciones && p.opciones.length > 0) {
      for (const [i, opcion] of p.opciones.entries()) {
        hijos.push(
          new Paragraph({
            text: `${String.fromCharCode(97 + i)}) ${opcion}`,
            indent: { left: 400 },
          })
        );
      }
    }
  }

  const conRespuesta = (data.preguntas ?? []).filter((p) => p.respuestaSugerida);
  if (conRespuesta.length > 0) {
    hijos.push(titulo2("Clave de respuestas (uso del profesor)"));
    for (const p of conRespuesta) {
      hijos.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${p.numero}. `, bold: true }),
            new TextRun(p.respuestaSugerida!),
          ],
          spacing: { after: 60 },
        })
      );
    }
  }

  return empaquetar(crearDocumento(hijos));
}
