import { Paragraph } from "docx";
import type { PreguntasDidacticas } from "../generacion/tipos";
import { crearDocumento, empaquetar, titulo1, titulo2, vinetaItem } from "./comunDocx";

export async function buildPreguntasDocx(data: PreguntasDidacticas): Promise<Buffer> {
  const hijos: Paragraph[] = [
    titulo1(data.titulo),
    titulo2("Preguntas detonadoras"),
    ...(data.preguntasDetonadoras ?? []).map(vinetaItem),
    titulo2("Preguntas de desarrollo"),
    ...(data.preguntasDesarrollo ?? []).map(vinetaItem),
    titulo2("Preguntas de cierre"),
    ...(data.preguntasCierre ?? []).map(vinetaItem),
  ];

  return empaquetar(crearDocumento(hijos));
}
