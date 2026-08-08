export type SesionSeed = {
  titulo: string;
  objetivo?: string;
};

export type UnidadSeed = {
  titulo: string;
  objetivo: string;
  sesiones: SesionSeed[];
  // Nombres de archivo (Material.nombre) de la Biblioteca del curso que
  // corresponden a esta unidad. Coincidencia exacta con el nombre de archivo.
  bibliografia: string[];
};

export type TemarioSeed = {
  cursoSlug: string;
  unidades: UnidadSeed[];
};
