export type Planeacion = {
  titulo: string;
  duracionMinutos: number;
  objetivoAprendizaje: string;
  materiales: string[];
  desarrollo: { fase: string; minutos: number; descripcion: string }[];
  evaluacion: string;
  tareaExtraclase?: string;
};

export type Presentacion = {
  titulo: string;
  slides: { titulo: string; vinetas: string[]; notas?: string }[];
};

export type GuiaLectura = {
  titulo: string;
  introduccion: string;
  conceptosClave: { termino: string; definicion: string }[];
  preguntasGuia: string[];
  resumen: string;
};

export type Examen = {
  titulo: string;
  instrucciones: string;
  preguntas: {
    numero: number;
    tipo: string;
    enunciado: string;
    opciones?: string[];
    respuestaSugerida?: string;
    puntos: number;
  }[];
};

export type PreguntasDidacticas = {
  titulo: string;
  preguntasDetonadoras: string[];
  preguntasDesarrollo: string[];
  preguntasCierre: string[];
};

export type ContenidoPorTipo = {
  PLANEACION: Planeacion;
  PRESENTACION: Presentacion;
  GUIA_LECTURA: GuiaLectura;
  EXAMEN: Examen;
  PREGUNTAS_DIDACTICAS: PreguntasDidacticas;
};

export type TipoRecurso = keyof ContenidoPorTipo;

export type ContextoGeneracion = {
  cursoNombre: string;
  unidadTitulo: string;
  unidadObjetivo: string | null;
  sesionTitulo: string | null;
  sesionObjetivo: string | null;
  bibliografia: string[];
};
