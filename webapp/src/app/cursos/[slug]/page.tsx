import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EstadoBadge } from "@/components/EstadoBadge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { formatBytes } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function CursoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const curso = await prisma.curso.findUnique({
    where: { slug },
    include: {
      materiales: { orderBy: { nombre: "asc" } },
      unidades: {
        orderBy: { orden: "asc" },
        include: {
          _count: { select: { sesiones: true, referencias: true } },
        },
      },
      recursos: { where: { unidadId: null }, orderBy: { creadoEn: "desc" } },
    },
  });

  if (!curso) notFound();

  const referenciasVinculadas = await prisma.referencia.findMany({
    where: { unidad: { cursoId: curso.id } },
    select: { titulo: true },
  });
  const nombresVinculados = new Set(referenciasVinculadas.map((r) => r.titulo));

  const programas = curso.materiales.filter((m) => m.tipo === "PROGRAMA");
  const bibliografia = curso.materiales.filter(
    (m) => m.tipo === "BIBLIOGRAFIA" && !nombresVinculados.has(m.nombre)
  );
  const sinMateriales = curso.materiales.length === 0;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Cursos", href: "/" }, { label: curso.nombre }]} />

      <div className="mt-2 flex items-start justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{curso.nombre}</h1>
        <EstadoBadge estado={curso.estado} />
      </div>

      {sinMateriales && (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-200">
          Aún no se ha cargado el programa ni la bibliografía de este curso.
          Coloque los archivos en{" "}
          <code className="rounded bg-black/[.06] px-1 py-0.5 font-mono text-[0.85em] dark:bg-white/[.08]">
            {curso.carpeta}
          </code>{" "}
          y vuelva a ejecutar <code>npx tsx prisma/seed.ts</code> para sincronizar.
        </div>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Programa</h2>
        {programas.length === 0 ? (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Sin programa cargado.
          </p>
        ) : (
          <ul className="mt-2 space-y-1">
            {programas.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm dark:border-white/[.145] dark:bg-zinc-950"
              >
                <span>{m.nombre}</span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {formatBytes(m.tamanioBytes)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          Bibliografía general{" "}
          <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
            ({bibliografia.length})
          </span>
        </h2>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Archivos no vinculados a una unidad específica.
        </p>
        {bibliografia.length === 0 ? (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Sin bibliografía cargada.
          </p>
        ) : (
          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Ver archivos
            </summary>
            <ul className="mt-1 max-h-80 space-y-1 overflow-y-auto pr-1">
              {bibliografia.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm dark:border-white/[.145] dark:bg-zinc-950"
                >
                  <span className="truncate pr-4">{m.nombre}</span>
                  <span className="shrink-0 text-zinc-500 dark:text-zinc-400">
                    {formatBytes(m.tamanioBytes)}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Unidades temáticas</h2>
        {curso.unidades.length === 0 ? (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Aún no se han definido las unidades a partir del programa. (Próximo
            paso: estructurar el temario.)
          </p>
        ) : (
          <ol className="mt-2 space-y-2">
            {curso.unidades.map((unidad) => (
              <li key={unidad.id}>
                <Link
                  href={`/cursos/${curso.slug}/unidades/${unidad.id}`}
                  className="group flex items-center justify-between rounded-md border border-black/[.08] bg-white px-4 py-3 text-sm transition hover:border-black/[.16] hover:shadow-sm dark:border-white/[.145] dark:bg-zinc-950 dark:hover:border-white/[.25]"
                >
                  <span className="font-medium">{unidad.titulo}</span>
                  <span className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                    {unidad._count.sesiones} sesiones · {unidad._count.referencias} referencias
                    <span className="text-zinc-900 group-hover:underline dark:text-zinc-100">
                      Ver →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="mt-8 mb-10">
        <h2 className="text-lg font-semibold">Recursos generados del curso</h2>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          No ligados a una unidad o sesión específica.
        </p>
        {curso.recursos.length === 0 ? (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Aún no se ha generado ningún recurso de este tipo para este curso.
          </p>
        ) : (
          <ul className="mt-2 space-y-1">
            {curso.recursos.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm dark:border-white/[.145] dark:bg-zinc-950"
              >
                <span>{r.titulo}</span>
                <span className="text-zinc-500 dark:text-zinc-400">{r.tipo}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
