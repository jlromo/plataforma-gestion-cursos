import PptxGenJS from "pptxgenjs";
import type { Presentacion } from "../generacion/tipos";

export async function buildPresentacionPptx(data: Presentacion): Promise<Buffer> {
  const pres = new PptxGenJS();
  pres.layout = "LAYOUT_16x9";

  const portada = pres.addSlide();
  portada.addText(data.titulo, {
    x: 0.5,
    y: 2.5,
    w: 9,
    h: 1.5,
    fontSize: 32,
    bold: true,
    align: "center",
  });

  for (const slide of data.slides ?? []) {
    const s = pres.addSlide();
    s.addText(slide.titulo, {
      x: 0.5,
      y: 0.3,
      w: 9,
      h: 0.8,
      fontSize: 24,
      bold: true,
    });
    s.addText(
      (slide.vinetas ?? []).map((v) => ({ text: v, options: { bullet: true, breakLine: true } })),
      { x: 0.5, y: 1.3, w: 9, h: 5.5, fontSize: 18 }
    );
    if (slide.notas) {
      s.addNotes(slide.notas);
    }
  }

  return (await pres.write({ outputType: "nodebuffer" })) as Buffer;
}
