"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ETIQUETA_TIPO, TIPOS_RECURSO } from "@/lib/generacion/etiquetas";
import type { TipoRecurso } from "@/lib/generacion/tipos";

export function GenerarRecursoForm({
  cursoId,
  unidadId,
  sesionId,
}: {
  cursoId: string;
  unidadId?: string;
  sesionId?: string;
}) {
  const router = useRouter();
  const [tipo, setTipo] = useState<TipoRecurso>("PLANEACION");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ultimoRecursoId, setUltimoRecursoId] = useState<string | null>(null);

  async function generar() {
    setCargando(true);
    setError(null);
    setUltimoRecursoId(null);
    try {
      const res = await fetch("/api/recursos/generar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo, cursoId, unidadId, sesionId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "No se pudo generar el recurso.");
      }
      setUltimoRecursoId(data.recurso.id as string);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 rounded-md border border-dashed border-black/[.15] p-3 dark:border-white/[.2]">
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value as TipoRecurso)}
        disabled={cargando}
        className="rounded-md border border-black/[.15] bg-white px-2 py-1.5 text-sm dark:border-white/[.2] dark:bg-zinc-900"
      >
        {TIPOS_RECURSO.map((t) => (
          <option key={t} value={t}>
            {ETIQUETA_TIPO[t]}
          </option>
        ))}
      </select>
      <button
        onClick={generar}
        disabled={cargando}
        className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {cargando ? "Generando…" : "Generar recurso"}
      </button>
      {error && <span className="text-sm text-red-600 dark:text-red-400">{error}</span>}
      {ultimoRecursoId && !error && (
        <a
          href={`/api/recursos/${ultimoRecursoId}`}
          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          Descargar el recurso generado →
        </a>
      )}
    </div>
  );
}
