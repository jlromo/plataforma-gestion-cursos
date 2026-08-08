import type { TipoRecurso } from "./tipos";

const CONTEXTO_DOCENTE =
  "Usted asiste a un profesor de la División de Ciencias Forestales de la Universidad Autónoma Chapingo, " +
  "que imparte la asignatura a estudiantes de ingeniería. Responda siempre en español, con tono académico " +
  "claro y aplicado al ámbito forestal/ambiental cuando el tema lo permita.";

type ConfigTipo = {
  label: string;
  toolName: string;
  toolDescription: string;
  systemPrompt: string;
  inputSchema: Record<string, unknown>;
};

export const CONFIG_TIPOS: Record<TipoRecurso, ConfigTipo> = {
  PLANEACION: {
    label: "Planeación didáctica",
    toolName: "generar_planeacion",
    toolDescription: "Genera una planeación didáctica (carta descriptiva) de una sesión de clase.",
    systemPrompt:
      `${CONTEXTO_DOCENTE} Elabore una planeación didáctica (carta descriptiva) para UNA sesión de clase, ` +
      "con fases de apertura, desarrollo y cierre, que sume una duración total razonable (idealmente 90-120 minutos).",
    inputSchema: {
      type: "object",
      properties: {
        titulo: { type: "string" },
        duracionMinutos: { type: "integer" },
        objetivoAprendizaje: { type: "string" },
        materiales: { type: "array", items: { type: "string" } },
        desarrollo: {
          type: "array",
          items: {
            type: "object",
            properties: {
              fase: { type: "string", description: "Apertura, Desarrollo o Cierre" },
              minutos: { type: "integer" },
              descripcion: { type: "string" },
            },
            required: ["fase", "minutos", "descripcion"],
            additionalProperties: false,
          },
        },
        evaluacion: { type: "string" },
        tareaExtraclase: {
          type: ["string", "null"],
          description: "Use null si no aplica tarea extraclase.",
        },
      },
      required: [
        "titulo",
        "duracionMinutos",
        "objetivoAprendizaje",
        "materiales",
        "desarrollo",
        "evaluacion",
        "tareaExtraclase",
      ],
      additionalProperties: false,
    },
  },

  PRESENTACION: {
    label: "Presentación (slides)",
    toolName: "generar_presentacion",
    toolDescription: "Genera el contenido de una presentación de diapositivas para proyectar en clase.",
    systemPrompt:
      `${CONTEXTO_DOCENTE} Elabore el contenido de una presentación de 8 a 14 diapositivas: una de título, ` +
      "varias de contenido con viñetas breves (no párrafos), y una de cierre/síntesis.",
    inputSchema: {
      type: "object",
      properties: {
        titulo: { type: "string" },
        slides: {
          type: "array",
          items: {
            type: "object",
            properties: {
              titulo: { type: "string" },
              vinetas: { type: "array", items: { type: "string" } },
              notas: {
                type: ["string", "null"],
                description: "Notas del orador; use null si no aplica.",
              },
            },
            required: ["titulo", "vinetas", "notas"],
            additionalProperties: false,
          },
        },
      },
      required: ["titulo", "slides"],
      additionalProperties: false,
    },
  },

  GUIA_LECTURA: {
    label: "Guía de lectura",
    toolName: "generar_guia_lectura",
    toolDescription: "Genera una guía de lectura y resumen de la bibliografía de una unidad o sesión.",
    systemPrompt:
      `${CONTEXTO_DOCENTE} Elabore una guía de lectura que ayude al estudiante a abordar la bibliografía ` +
      "indicada: incluya conceptos clave con su definición, preguntas guía de comprensión y un resumen orientador. " +
      "No invente contenido específico de los libros que no pueda inferir del tema; mantenga el resumen a nivel de guía de estudio.",
    inputSchema: {
      type: "object",
      properties: {
        titulo: { type: "string" },
        introduccion: { type: "string" },
        conceptosClave: {
          type: "array",
          items: {
            type: "object",
            properties: {
              termino: { type: "string" },
              definicion: { type: "string" },
            },
            required: ["termino", "definicion"],
            additionalProperties: false,
          },
        },
        preguntasGuia: { type: "array", items: { type: "string" } },
        resumen: { type: "string" },
      },
      required: ["titulo", "introduccion", "conceptosClave", "preguntasGuia", "resumen"],
      additionalProperties: false,
    },
  },

  EXAMEN: {
    label: "Examen / cuestionario",
    toolName: "generar_examen",
    toolDescription: "Genera un examen o cuestionario de evaluación con rúbrica de puntos.",
    systemPrompt:
      `${CONTEXTO_DOCENTE} Elabore un examen o cuestionario de evaluación con una mezcla de tipos de pregunta ` +
      "(opcion_multiple, verdadero_falso, respuesta_corta, desarrollo). Incluya una respuesta sugerida breve para cada " +
      "pregunta y una puntuación por pregunta que sume 100 puntos en total.",
    inputSchema: {
      type: "object",
      properties: {
        titulo: { type: "string" },
        instrucciones: { type: "string" },
        preguntas: {
          type: "array",
          items: {
            type: "object",
            properties: {
              numero: { type: "integer" },
              tipo: {
                type: "string",
                description: "opcion_multiple, verdadero_falso, respuesta_corta o desarrollo",
              },
              enunciado: { type: "string" },
              opciones: {
                type: ["array", "null"],
                items: { type: "string" },
                description: "Use null si la pregunta no es de opción múltiple.",
              },
              respuestaSugerida: { type: ["string", "null"] },
              puntos: { type: "integer" },
            },
            required: ["numero", "tipo", "enunciado", "opciones", "respuestaSugerida", "puntos"],
            additionalProperties: false,
          },
        },
      },
      required: ["titulo", "instrucciones", "preguntas"],
      additionalProperties: false,
    },
  },

  PREGUNTAS_DIDACTICAS: {
    label: "Preguntas didácticas para exposiciones",
    toolName: "generar_preguntas_didacticas",
    toolDescription:
      "Genera preguntas didácticas para guiar la participación de los estudiantes durante una exposición en clase.",
    systemPrompt:
      `${CONTEXTO_DOCENTE} Elabore preguntas didácticas para usar durante una exposición de estudiantes en clase: ` +
      "preguntas detonadoras (para abrir/activar conocimientos previos), preguntas de desarrollo (para profundizar " +
      "durante la exposición) y preguntas de cierre (para reflexión/síntesis final).",
    inputSchema: {
      type: "object",
      properties: {
        titulo: { type: "string" },
        preguntasDetonadoras: { type: "array", items: { type: "string" } },
        preguntasDesarrollo: { type: "array", items: { type: "string" } },
        preguntasCierre: { type: "array", items: { type: "string" } },
      },
      required: ["titulo", "preguntasDetonadoras", "preguntasDesarrollo", "preguntasCierre"],
      additionalProperties: false,
    },
  },
};
