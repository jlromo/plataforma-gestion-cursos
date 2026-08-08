import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";

// Tamaño Carta (US Letter), el estándar en México — el valor por defecto de
// docx-js es A4.
const PAGINA_CARTA = { width: 12240, height: 15840 };

export function crearDocumento(hijos: Paragraph[]): Document {
  return new Document({
    sections: [
      {
        properties: {
          page: { size: PAGINA_CARTA },
        },
        children: hijos,
      },
    ],
  });
}

export function empaquetar(doc: Document): Promise<Buffer> {
  return Packer.toBuffer(doc);
}

export function titulo1(texto: string): Paragraph {
  return new Paragraph({ text: texto, heading: HeadingLevel.HEADING_1 });
}

export function titulo2(texto: string): Paragraph {
  return new Paragraph({
    text: texto,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
  });
}

export function parrafo(texto: string): Paragraph {
  return new Paragraph({ children: [new TextRun(texto)], spacing: { after: 120 } });
}

export function vinetaItem(texto: string): Paragraph {
  return new Paragraph({ text: texto, bullet: { level: 0 }, spacing: { after: 60 } });
}
