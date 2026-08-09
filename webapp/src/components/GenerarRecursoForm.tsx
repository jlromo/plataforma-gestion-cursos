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
  const [ultimoRecurso, setUltimoRecurso] = useState<{ id: string; tipo: TipoRecurso } | null>(
    null
  );

  async function generar() {
    setCargando(true);
    setError(null);
    setUltimoRecurso(null);
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
      setUltimoRecurso({ id: data.recurso.id as string, tipo });
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 rounded-md border border-dashed border-chapingo-blue-500/40 bg-chapingo-blue-50 p-3 dark:border-chapingo-blue-500/40 dark:bg-chapingo-blue-50">
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value as TipoRecurso)}
        disabled={cargando}
        className="rounded-md border border-chapingo-silver-300 bg-white px-2 py-1.5 text-sm text-foreground dark:border-chapingo-silver-300 dark:bg-chapingo-silver-50"
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
        className="rounded-md bg-chapingo-blue-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-chapingo-blue-800 disabled:opacity-50"
      >
        {cargando ? "Generando…" : "Generar recurso"}
      </button>
      {error && <span className="text-sm text-red-600 dark:text-red-400">{error}</span>}
      {ultimoRecurso && !error && (
        <a
          href={`/api/recursos/${ultimoRecurso.id}`}
          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-600"
        >
          Descargar "{ETIQUETA_TIPO[ultimoRecurso.tipo]}" generado →
        </a>
      )}
      <p className="w-full text-xs text-chapingo-silver-600 dark:text-chapingo-silver-600">
        Recuerde: el selector conserva el tipo elegido. Para generar otro tipo, cámbielo
        antes de dar clic en "Generar recurso".
      </p>
    </div>
  );
}
