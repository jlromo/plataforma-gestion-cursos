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
      <h1 className="text-2xl font-semibold tracking-tight text-chapingo-blue-900 dark:text-white">
        Mis cursos
      </h1>
      <p className="mt-1 text-sm text-chapingo-silver-600 dark:text-chapingo-silver-400">
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
              className="group flex flex-col overflow-hidden rounded-xl border border-chapingo-silver-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-chapingo-blue-500 hover:shadow-lg hover:shadow-chapingo-blue-900/10 dark:border-chapingo-silver-200 dark:bg-chapingo-silver-50"
            >
              <div className="h-1.5 bg-gradient-to-r from-chapingo-blue-700 to-chapingo-blue-500" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-base font-semibold leading-snug text-chapingo-blue-900 dark:text-white">
                    {curso.nombre}
                  </h2>
                  <EstadoBadge estado={curso.estado} />
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-y-1.5 text-sm text-chapingo-silver-600 dark:text-chapingo-silver-400">
                  <dt>Unidades</dt>
                  <dd className="text-right font-medium text-foreground">
                    {curso._count.unidades}
                  </dd>
                  <dt>Programa</dt>
                  <dd className="text-right font-medium text-foreground">
                    {programas > 0 ? "Cargado" : "—"}
                  </dd>
                  <dt>Bibliografía</dt>
                  <dd className="text-right font-medium text-foreground">
                    {bibliografia} archivo{bibliografia === 1 ? "" : "s"}
                  </dd>
                  <dt>Recursos generados</dt>
                  <dd className="text-right font-medium text-foreground">
                    {curso._count.recursos}
                  </dd>
                </dl>

                <span className="mt-4 text-sm font-medium text-chapingo-blue-700 group-hover:underline dark:text-chapingo-blue-600">
                  Ver curso →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
