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

      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-chapingo-blue-900 dark:text-white">
        {sesion.titulo}
      </h1>
      {sesion.objetivo && (
        <p className="mt-2 max-w-3xl text-sm text-chapingo-silver-600 dark:text-chapingo-silver-400">
          {sesion.objetivo}
        </p>
      )}

      <section className="mt-8 mb-10">
        <h2 className="text-lg font-semibold text-chapingo-blue-900 dark:text-white">
          Recursos generados de la sesión
        </h2>
        <GenerarRecursoForm
          cursoId={sesion.unidad.cursoId}
          unidadId={sesion.unidadId}
          sesionId={sesion.id}
        />
        {sesion.recursos.length === 0 ? (
          <p className="mt-3 text-sm text-chapingo-silver-600 dark:text-chapingo-silver-400">
            Aún no se ha generado ningún recurso para esta sesión.
          </p>
        ) : (
          <ul className="mt-3 space-y-1">
            {sesion.recursos.map((r) => (
              <li key={r.id}>
                <a
                  href={`/api/recursos/${r.id}`}
                  className="flex items-center justify-between rounded-md border border-chapingo-silver-200 bg-white px-3 py-2 text-sm hover:border-chapingo-blue-500 dark:border-chapingo-silver-200 dark:bg-chapingo-silver-50 dark:hover:border-chapingo-blue-500"
                >
                  <span className="text-foreground">{r.titulo}</span>
                  <span className="text-chapingo-silver-600 dark:text-chapingo-silver-400">
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
