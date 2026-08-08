import type { TemarioSeed } from "./tipos";

// Estructurado a partir de "Economía  Ambiental 22122025.pdf"
// (programa oficial UACh, formato DGA, VI. Unidades de aprendizaje).
export const temarioEconomiaDeterioroAmbiental: TemarioSeed = {
  cursoSlug: "economia-deterioro-ambiental",
  unidades: [
    {
      titulo: "Unidad 1. Fundamentos de economía ambiental",
      objetivo:
        "El estudiante argumenta los fundamentos, alcance y objetivos de la economía ambiental y su relación con el medio ambiente, para comprender el papel de los procesos económicos en el deterioro y conservación de los ecosistemas, bajo un enfoque crítico y ético, promoviendo actitudes de responsabilidad social, inclusión y sustentabilidad en contextos locales, regionales y globales.",
      sesiones: [
        { titulo: "1.1 Definición y alcance de la economía del deterioro ambiental" },
        { titulo: "1.2 Importancia y objetivos de la economía ambiental" },
        { titulo: "1.3 Relación entre economía y medio ambiente" },
        { titulo: "1.4 Concepto y tipos de externalidades: positivas y negativas" },
        { titulo: "1.5 Derechos de propiedad y su importancia en la gestión de recursos naturales" },
        {
          titulo:
            "1.6 Tipología de bienes: públicos, privados, comunes y reservados. La tragedia de los comunes",
        },
        { titulo: "1.7 Las fuerzas del mercado" },
      ],
      bibliografia: [
        "2 Conceptos básicos de Micro.pdf",
        "4. The optimal level of pollution -Pearce and Turner.pdf",
        "5. Óptima contaminación del mercado Pearce and Turner.docx",
        "Cap 1 Que es la economía ambiental- Field.pdf",
        "Cap 16 Externalidades y B Públicos -Case.pdf",
        "Cap 19 Externalidades y B Públicos Nicholson.pdf",
        "Cap 2 Economía y medio ambiente -Field.pdf",
        "Cap 2 Fallas del Mercado-Shogren.pdf",
        "Cap 3 Beneficios y costos, oferta y demanda -Field.pdf",
        "Cap 3 Demanda, oferta y eq de mercado Case.pdf",
        "Cap 4 Caracrerísticas de la demanda de mercado FERGUSON_GOULD.pdf",
        "Cap 5 La producción con un insumo variable FERGUSON_GOULD.pdf",
        "Cap 8  La Teoría del precio-merc-comp-perfecta FERGUSON_GOULD.pdf",
        "Ch 2 The economic approach- Tietenberg.pdf",
        "Ch 21 Extermalities in competitive markets-Nechyba.pdf",
        "Ch 4  Mercados, externalidades y bienes públicos-Field.pdf",
        "Ch 6 Market Imperfections-McAfee.pdf",
        "Ch-10 Externalidades- Microeconomía Mankiw-5.pdf",
        "Ch-11 Bienes públicos y rec-comunes Microeconomía Mankiw-5.pdf",
        "Ch-3 Benefits and Costs, Supply and Demand-Field.pdf",
        "Ch-4 Las fuerzas del mercado- Microeconomía Mankiw.pdf",
        "Ch-4 Markets, Externalities and Public Goods-Field.pdf",
        "Chp 1 Introduction to Economics and Environmental-Buchholz.pdf",
        "cap 12 Modelo Competitivo Eq-parcial Nicholson.pdf",
      ],
    },
    {
      titulo: "Unidad 2. Instrumentos económicos de gestión ambiental",
      objetivo:
        "El estudiante analiza y aplica los principales instrumentos económicos de gestión ambiental —fiscales, cargos, de mercado y estándares— para evaluar su efectividad en la regulación de actividades productivas y en la mitigación del deterioro ambiental, bajo un enfoque crítico, ético y orientado a la sustentabilidad.",
      sesiones: [
        {
          titulo:
            "2.1 Instrumentos fiscales: impuestos ambientales, subsidios y deducciones fiscales",
        },
        { titulo: "2.2 Cargos por uso o contaminación: tarifas, multas y licencias" },
        {
          titulo:
            "2.3 Instrumentos de mercado: permisos negociables, bonos de carbono y mecanismos de compensación",
        },
        {
          titulo:
            "2.4 Estándares ambientales: límites de emisión, normas técnicas y regulaciones internacionales",
        },
      ],
      bibliografia: [
        "6. Taxation and optimal pollution -Pearce an Turner.pdf",
        "7. Environmental standards, taxes and Subsidies - Pearce and Turner.pdf",
        "7. Estándares, impuestos y subsidios ambientales - Pearce and Turner.docx",
        "8. Permisos de contaminación comercializables-Pearce.docx",
        "Cap 5 Economía de la calidad ambiental -Field.pdf",
        "Ch 2 Externalities and Their internalization-Buchholz.pdf",
        "Ch 4 A comparison of environmental instruments-Buchholz.pdf",
        "Ch-6 Oferta, demanda y políticas gubernamentales- Microeconomía Mankiw.pdf",
      ],
    },
    {
      titulo:
        "Unidad 3. Valoración económica de los recursos naturales y servicios ecosistémicos",
      objetivo:
        "El estudiante aplica los principales métodos de valoración económica de los recursos naturales y servicios ecosistémicos, distinguiendo entre enfoques directos e indirectos, para estimar el valor ambiental en contextos de deterioro y restauración, con actitud crítica, ética y orientada a la sustentabilidad.",
      sesiones: [
        {
          titulo:
            "3.1 Taxonomía del valor: valores de uso, no uso, opción, existencia y legado",
        },
        { titulo: "3.2 Método del costo de viaje: fundamentos, supuestos y aplicaciones" },
        {
          titulo:
            "3.3 Método de valoración contingente: diseño de encuestas, sesgos y aplicaciones",
        },
        {
          titulo:
            "3.4 Otros métodos de valoración económica: precios hedónicos, costos evitados, productividad marginal, costos de remplazo, entre otros",
        },
      ],
      bibliografia: [
        "Ch 3 Monetary Valuation of the environment-Buchholz.pdf",
        "Robert Costanza - The economics of nature and the nature of economics-Edward Elgar Publishing (2001).pdf",
      ],
    },
    {
      titulo: "Unidad 4. Mercados de Carbono, Bioeconomía y Circularidad",
      objetivo:
        "El estudiante interpreta los fundamentos y la evolución de los mercados de emisiones de carbono, diferenciando entre los esquemas voluntarios y obligatorios, para analizar su funcionamiento, alcances y limitaciones como instrumentos de mitigación del cambio climático, en un marco de responsabilidad ética, social y ambiental.",
      sesiones: [
        { titulo: "4.1 El mercado de emisiones de Carbono" },
        { titulo: "4.2 Bioeconomía" },
        { titulo: "4.3 Economía Circular" },
      ],
      // Sin bibliografía específica indexada todavía: es la unidad más reciente
      // del programa (2025) y la Biblioteca actual no incluye material sobre
      // mercados de carbono, bioeconomía o circularidad.
      bibliografia: [],
    },
  ],
};
