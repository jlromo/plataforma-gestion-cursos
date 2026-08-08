import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GenerarRecursoForm } from "@/components/GenerarRecursoForm";
import { ETIQUETA_TIPO } from "@/lib/generacion/etiquetas";

export const dynamic = "force-dynamic";

export default async function UnidadPage({
  params,
}: {
  params: Promise<{ slug: string; unidadId: string }>;
}) {
  const { slug, unidadId } = await params;

  const unidad = await prisma.unidad.findUnique({
    where: { id: unidadId },
    include: {
      curso: true,
      sesiones: {
        orderBy: { orden: "asc" },
        include: { _count: { select: { recursos: true } } },
      },
      referencias: { orderBy: { titulo: "asc" } },
      recursos: { where: { sesionId: null }, orderBy: { creadoEn: "desc" } },
    },
  });

  if (!unidad || unidad.curso.slug !== slug) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Cursos", href: "/" },
          { label: unidad.curso.nombre, href: `/cursos/${slug}` },
          { label: unidad.titulo },
        ]}
      />

      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{unidad.titulo}</h1>
      {unidad.objetivo && (
        <p className="mt-2 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          {unidad.objetivo}
        </p>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Sesiones</h2>
        {unidad.sesiones.length === 0 ? (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Esta unidad no tiene sesiones definidas.
          </p>
        ) : (
          <ol className="mt-2 space-y-2">
            {unidad.sesiones.map((sesion) => (
              <li key={sesion.id}>
                <Link
                  href={`/cursos/${slug}/unidades/${unidad.id}/sesiones/${sesion.id}`}
                  className="group flex items-start justify-between gap-4 rounded-md border border-black/[.08] bg-white px-4 py-3 text-sm transition hover:border-black/[.16] hover:shadow-sm dark:border-white/[.145] dark:bg-zinc-950 dark:hover:border-white/[.25]"
                >
                  <div>
                    <p className="font-medium">{sesion.titulo}</p>
                    {sesion.objetivo && (
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {sesion.objetivo}
                      </p>
                    )}
                  </div>
                  <span className="flex shrink-0 items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                    {sesion._count.recursos} recursos
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

      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          Bibliografía de la unidad{" "}
          <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
            ({unidad.referencias.length})
          </span>
        </h2>
        {unidad.referencias.length === 0 ? (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Sin bibliografía vinculada a esta unidad todavía.
          </p>
        ) : (
          <ul className="mt-2 space-y-1">
            {unidad.referencias.map((r) => (
              <li
                key={r.id}
                className="rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm dark:border-white/[.145] dark:bg-zinc-950"
              >
                {r.titulo}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8 mb-10">
        <h2 className="text-lg font-semibold">Recursos generados de la unidad</h2>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Recursos que cubren la unidad completa (por ejemplo, una guía de lectura o un
          examen de toda la unidad). Para recursos de una sola clase, genérelos desde la
          sesión correspondiente.
        </p>
        <GenerarRecursoForm cursoId={unidad.cursoId} unidadId={unidad.id} />
        {unidad.recursos.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Aún no se ha generado ningún recurso a nivel de unidad.
          </p>
        ) : (
          <ul className="mt-3 space-y-1">
            {unidad.recursos.map((r) => (
              <li key={r.id}>
                <a
                  href={`/api/recursos/${r.id}`}
                  className="flex items-center justify-between rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm hover:border-black/[.16] dark:border-white/[.145] dark:bg-zinc-950 dark:hover:border-white/[.25]"
                >
                  <span>{r.titulo}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {ETIQUETA_TIPO[r.tipo]}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
