import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GenerarRecursoForm } from "@/components/GenerarRecursoForm";
import { ETIQUETA_TIPO } from "@/lib/generacion/etiquetas";

export const dynamic = "force-dynamic";

export default async function SesionPage({
  params,
}: {
  params: Promise<{ slug: string; unidadId: string; sesionId: string }>;
}) {
  const { slug, unidadId, sesionId } = await params;

  const sesion = await prisma.sesion.findUnique({
    where: { id: sesionId },
    include: {
      unidad: { include: { curso: true } },
      recursos: { orderBy: { creadoEn: "desc" } },
    },
  });

  if (!sesion || sesion.unidadId !== unidadId || sesion.unidad.curso.slug !== slug) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Cursos", href: "/" },
          { label: sesion.unidad.curso.nombre, href: `/cursos/${slug}` },
          {
            label: sesion.unidad.titulo,
            href: `/cursos/${slug}/unidades/${unidadId}`,
          },
          { label: sesion.titulo },
        ]}
      />

      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{sesion.titulo}</h1>
      {sesion.objetivo && (
        <p className="mt-2 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          {sesion.objetivo}
        </p>
      )}

      <section className="mt-8 mb-10">
        <h2 className="text-lg font-semibold">Recursos generados de la sesión</h2>
        <GenerarRecursoForm
          cursoId={sesion.unidad.cursoId}
          unidadId={sesion.unidadId}
          sesionId={sesion.id}
        />
        {sesion.recursos.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Aún no se ha generado ningún recurso para esta sesión.
          </p>
        ) : (
          <ul className="mt-3 space-y-1">
            {sesion.recursos.map((r) => (
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
