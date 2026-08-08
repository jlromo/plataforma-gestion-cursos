import { Paragraph, TextRun } from "docx";
import type { GuiaLectura } from "../generacion/tipos";
import { crearDocumento, empaquetar, parrafo, titulo1, titulo2, vinetaItem } from "./comunDocx";

export async function buildGuiaLecturaDocx(data: GuiaLectura): Promise<Buffer> {
  const hijos: Paragraph[] = [titulo1(data.titulo), parrafo(data.introduccion), titulo2("Conceptos clave")];

  for (const c of data.conceptosClave ?? []) {
    hijos.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${c.termino}: `, bold: true }),
          new TextRun(c.definicion),
        ],
        spacing: { after: 100 },
      })
    );
  }

  hijos.push(titulo2("Preguntas guía"), ...(data.preguntasGuia ?? []).map(vinetaItem));
  hijos.push(titulo2("Resumen"), parrafo(data.resumen));

  return empaquetar(crearDocumento(hijos));
}
