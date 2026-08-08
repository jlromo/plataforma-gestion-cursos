import type { EstadoContenido } from "@/generated/prisma/enums";

const ESTILOS: Record<EstadoContenido, string> = {
  PENDIENTE:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  EN_PROCESO:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  LISTO:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
};

const ETIQUETAS: Record<EstadoContenido, string> = {
  PENDIENTE: "Pendiente",
  EN_PROCESO: "En proceso",
  LISTO: "Listo",
};

export function EstadoBadge({ estado }: { estado: EstadoContenido }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ESTILOS[estado]}`}
    >
      {ETIQUETAS[estado]}
    </span>
  );
}
