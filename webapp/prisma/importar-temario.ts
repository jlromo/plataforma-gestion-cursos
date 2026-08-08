import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import type { TemarioSeed } from "./temario/tipos";
import { temarioEconomiaDeterioroAmbiental } from "./temario/economia-deterioro-ambiental";
import { temarioFormulacionEvaluacionProyectosForestales } from "./temario/formulacion-evaluacion-proyectos-forestales";

const adapter = new PrismaBetterSqlite3({
  url: path.resolve(__dirname, "..", "dev.db"),
});
const prisma = new PrismaClient({ adapter });

const TEMARIOS: TemarioSeed[] = [
  temarioEconomiaDeterioroAmbiental,
  temarioFormulacionEvaluacionProyectosForestales,
];

async function importarCurso(temario: TemarioSeed) {
  const curso = await prisma.curso.findUnique({
    where: { slug: temario.cursoSlug },
    include: { materiales: { where: { tipo: "BIBLIOGRAFIA" } } },
  });

  if (!curso) {
    console.warn(`- Curso no encontrado: ${temario.cursoSlug} (¿corrió el seed?)`);
    return;
  }

  const materialPorNombre = new Map(curso.materiales.map((m) => [m.nombre, m]));

  // Idempotente: se eliminan las unidades existentes (cascada a sesiones y
  // referencias) y se recrean desde la definición estructurada.
  await prisma.unidad.deleteMany({ where: { cursoId: curso.id } });

  let sinCoincidencia: string[] = [];

  for (const [i, unidadSeed] of temario.unidades.entries()) {
    const unidad = await prisma.unidad.create({
      data: {
        cursoId: curso.id,
        titulo: unidadSeed.titulo,
        objetivo: unidadSeed.objetivo,
        orden: i + 1,
      },
    });

    for (const [j, sesionSeed] of unidadSeed.sesiones.entries()) {
      await prisma.sesion.create({
        data: {
          unidadId: unidad.id,
          titulo: sesionSeed.titulo,
          objetivo: sesionSeed.objetivo,
          orden: j + 1,
        },
      });
    }

    for (const nombreArchivo of unidadSeed.bibliografia) {
      const material = materialPorNombre.get(nombreArchivo);
      if (!material) {
        sinCoincidencia.push(nombreArchivo);
        continue;
      }
      await prisma.referencia.create({
        data: {
          unidadId: unidad.id,
          titulo: material.nombre,
          archivo: material.rutaAbsoluta,
        },
      });
    }
  }

  const estado = curso.materiales.length > 0 ? "LISTO" : "EN_PROCESO";
  await prisma.curso.update({ where: { id: curso.id }, data: { estado } });

  const totalReferencias = temario.unidades.reduce((n, u) => n + u.bibliografia.length, 0);
  console.log(
    `- ${curso.nombre}: ${temario.unidades.length} unidades, ` +
      `${totalReferencias - sinCoincidencia.length}/${totalReferencias} referencias vinculadas, estado=${estado}`
  );
  if (sinCoincidencia.length > 0) {
    console.warn(`  Sin coincidencia en Biblioteca (revisar nombre de archivo): ${sinCoincidencia.join(", ")}`);
  }
}

async function main() {
  for (const temario of TEMARIOS) {
    await importarCurso(temario);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
