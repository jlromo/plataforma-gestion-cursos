import Anthropic from "@anthropic-ai/sdk";
import { CONFIG_TIPOS } from "./config";
import { formatearContexto } from "./contexto";
import type { ContenidoPorTipo, ContextoGeneracion, TipoRecurso } from "./tipos";

const anthropic = new Anthropic();

const MODELO = "claude-sonnet-5";

export async function generarContenido<T extends TipoRecurso>(
  tipo: T,
  contexto: ContextoGeneracion
): Promise<ContenidoPorTipo[T]> {
  const config = CONFIG_TIPOS[tipo];

  const mensaje = await anthropic.messages.create({
    model: MODELO,
    max_tokens: 8000,
    system: config.systemPrompt,
    tools: [
      {
        name: config.toolName,
        description: config.toolDescription,
        input_schema: config.inputSchema as Anthropic.Tool.InputSchema,
      },
    ],
    tool_choice: { type: "tool", name: config.toolName },
    messages: [{ role: "user", content: formatearContexto(contexto) }],
  });

  const bloque = mensaje.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
  );

  if (!bloque) {
    throw new Error(`Claude no devolvió el resultado esperado para "${tipo}".`);
  }

  return bloque.input as ContenidoPorTipo[T];
}
