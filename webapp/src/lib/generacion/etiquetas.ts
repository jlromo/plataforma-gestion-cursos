import type { TipoRecurso } from "./tipos";

export const ETIQUETA_TIPO: Record<TipoRecurso, string> = {
  PLANEACION: "Planeación didáctica",
  PRESENTACION: "Presentación (slides)",
  GUIA_LECTURA: "Guía de lectura",
  EXAMEN: "Examen / cuestionario",
  PREGUNTAS_DIDACTICAS: "Preguntas didácticas (exposiciones)",
};

export const TIPOS_RECURSO: TipoRecurso[] = [
  "PLANEACION",
  "PRESENTACION",
  "GUIA_LECTURA",
  "EXAMEN",
  "PREGUNTAS_DIDACTICAS",
];
