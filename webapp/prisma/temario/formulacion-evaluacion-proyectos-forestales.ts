import type { TemarioSeed } from "./tipos";

// Estructurado a partir de "Programa del curso FEPF.pdf" (V. Contenido).
// La Biblioteca de este curso son libros de texto completos (no capítulos
// sueltos), por lo que no se vinculan a una unidad específica: quedan
// visibles como bibliografía general del curso.
export const temarioFormulacionEvaluacionProyectosForestales: TemarioSeed = {
  cursoSlug: "formulacion-evaluacion-proyectos-forestales",
  unidades: [
    {
      titulo: "Unidad I. Introducción general (3 h)",
      objetivo:
        "Que el alumno reconozca la importancia de la planificación y su relación con la elaboración de proyectos de investigación en el uso de los recursos naturales.",
      sesiones: [
        { titulo: "1.1 Los recursos naturales y los proyectos de inversión" },
        { titulo: "1.2 El concepto de proyecto de inversión" },
        { titulo: "1.3 El proceso de planificación y los proyectos de inversión" },
        { titulo: "1.4 El desarrollo sustentable y los proyectos de inversión" },
        { titulo: "1.5 Los valores ambientales y los proyectos de inversión" },
        { titulo: "1.6 El ciclo de un proyecto" },
      ],
      bibliografia: [],
    },
    {
      titulo: "Unidad 2. La idea de un proyecto (3 h)",
      objetivo:
        "Que el alumno describa el concepto, fuente generadora y la elaboración de una idea de proyecto.",
      sesiones: [
        { titulo: "2.1 El concepto de idea de proyecto" },
        { titulo: "2.2 Fuente generadora de idea de proyecto" },
        { titulo: "2.3 Elaboración de una idea de proyecto" },
      ],
      bibliografia: [],
    },
    {
      titulo: "Unidad 3. La elaboración del proyecto de inversión (33 h)",
      objetivo:
        "Que el alumno reconozca la importancia y aplique la metodología en la elaboración de un proyecto de inversión.",
      sesiones: [
        { titulo: "3.1 Proceso de formulación de un proyecto de inversión" },
        { titulo: "3.2 Interrelación entre los diferentes estudios que integra un proyecto" },
        { titulo: "3.3 El estudio legal" },
        {
          titulo: "3.4 El estudio de mercado de producto/servicio",
          objetivo:
            "3.4.1 Determinación del producto/servicio; 3.4.2 Definición del área de mercado; 3.4.3 Demanda de mercado; 3.4.4 Oferta de mercado; 3.4.5 Precio del producto/servicio en el mercado; 3.4.6 Comercialización del producto.",
        },
        {
          titulo: "3.5 Estudio técnico del proyecto",
          objetivo:
            "3.5.1 Determinación del tamaño del proyecto; 3.5.2 Definición de la localización del proyecto; 3.5.3 Ingeniería del proyecto.",
        },
        {
          titulo: "3.6 Estudio administrativo del proyecto",
          objetivo: "3.6.1 Planeación; 3.6.2 Organización; 3.6.3 Integración; 3.6.4 Dirección; 3.6.5 Control.",
        },
        {
          titulo: "3.7 Estudio ambiental",
          objetivo:
            "3.7.1 Descripción de los recursos naturales de la zona de impacto; 3.7.2 Descripción del proceso de producción; 3.7.3 Identificación de los posibles impactos; 3.7.4 Identificación de las medidas de mitigación.",
        },
        {
          titulo: "3.8 Estudio financiero",
          objetivo:
            "3.8.1 Determinación de requerimiento de inversión; 3.8.2 Identificación de fuente financiera; 3.8.3 Proyecciones financieras; 3.8.4 Estados proforma.",
        },
      ],
      bibliografia: [],
    },
    {
      titulo: "Unidad 4. Evaluación del proyecto (9 h)",
      objetivo:
        "Que el alumno identifique los costos y beneficios de un proyecto, además de analizar los riesgos de este, que calcule e interprete los indicadores de rentabilidad de un proyecto.",
      sesiones: [
        { titulo: "4.1 Evaluación financiera y economía del proyecto" },
        { titulo: "4.2 Determinación de costos" },
        { titulo: "4.3 Determinación de beneficio" },
        { titulo: "4.4 La tasa de interés" },
        { titulo: "4.5 El valor del dinero en el tiempo" },
        {
          titulo: "4.6 Indicadores de rentabilidad",
          objetivo:
            "4.6.1 Valor actual neto; 4.6.2 Relación de beneficio-costo; 4.6.3 Tasa interna de rentabilidad; 4.6.4 Otras medidas de rentabilidad.",
        },
        { titulo: "4.7 Análisis de sensibilidad y riesgo" },
        { titulo: "4.8 Procesamiento electrónico de la evaluación de proyectos" },
      ],
      bibliografia: [],
    },
  ],
};
