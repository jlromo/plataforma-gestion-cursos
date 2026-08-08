import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { EstadoBadge } from "@/components/EstadoBadge";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cursos = await prisma.curso.findMany({
    orderBy: { orden: "asc" },
    include: {
      _count: { select: { unidades: true, recursos: true } },
      materiales: { select: { tipo: true } },
    },
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Mis cursos</h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Navegue un curso para ver su temario, bibliografía y recursos generados.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cursos.map((curso) => {
          const programas = curso.materiales.filter((m) => m.tipo === "PROGRAMA").length;
          const bibliografia = curso.materiales.filter((m) => m.tipo === "BIBLIOGRAFIA").length;

          return (
            <Link
              key={curso.id}
              href={`/cursos/${curso.slug}`}
              className="group flex flex-col rounded-xl border border-black/[.08] bg-white p-5 shadow-sm transition hover:border-black/[.16] hover:shadow-md dark:border-white/[.145] dark:bg-zinc-950 dark:hover:border-white/[.25]"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base font-semibold leading-snug">
                  {curso.nombre}
                </h2>
                <EstadoBadge estado={curso.estado} />
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                <dt>Unidades</dt>
                <dd className="text-right font-medium text-zinc-900 dark:text-zinc-100">
                  {curso._count.unidades}
                </dd>
                <dt>Programa</dt>
                <dd className="text-right font-medium text-zinc-900 dark:text-zinc-100">
                  {programas > 0 ? "Cargado" : "—"}
                </dd>
                <dt>Bibliografía</dt>
                <dd className="text-right font-medium text-zinc-900 dark:text-zinc-100">
                  {bibliografia} archivo{bibliografia === 1 ? "" : "s"}
                </dd>
                <dt>Recursos generados</dt>
                <dd className="text-right font-medium text-zinc-900 dark:text-zinc-100">
                  {curso._count.recursos}
                </dd>
              </dl>

              <span className="mt-4 text-sm font-medium text-zinc-900 group-hover:underline dark:text-zinc-100">
                Ver curso →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
