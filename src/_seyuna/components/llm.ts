// Vendored from @seyuna/components. Do not edit — regenerate to update.
/**
 * LLM-facing renderings of the DSL contract: the `emit_dsl` tool input schema and a
 * compact textual block catalog. They live here (not in `@seyuna/prompts`) because both
 * derive from `blockManifest` + `projectSchema` and need `zod`, which this package already
 * depends on — keeping `@seyuna/prompts` free of third-party deps.
 */
import { BLOCK_TYPES, project as projectSchema } from '@seyuna/schema';
import { z } from 'zod';
import { blockManifest } from './manifest.js';

/**
 * JSON Schema for the `emit_dsl` tool's input — derived directly from the canonical
 * `projectSchema` so the tool contract can never drift from what `generate()` accepts.
 *
 * `io: 'input'` relaxes fields that have schema defaults (or are optional) out of the
 * `required` set, so the model is only forced to emit genuinely required fields (`id`,
 * `name`, block `type`, …). Defaults are re-applied by our own parse, and any gaps are
 * caught by the validate/repair loop.
 */
export function dslToolSchema(): Record<string, unknown> {
  const raw = z.toJSONSchema(projectSchema, {
    io: 'input',
    unrepresentable: 'any',
  }) as Record<string, unknown>;

  // Anthropic's tool `input_schema` requires every `properties` key to match
  // `^[a-zA-Z0-9_.-]{1,64}$`. The DSL's `$schema` version field violates that (`$`), and the
  // model never needs to emit it (it has a default that our parse re-applies). Strip it, plus
  // the root JSON-Schema dialect meta-key Anthropic doesn't use.
  delete raw['$schema'];
  const properties = { ...(raw['properties'] as Record<string, unknown> | undefined) };
  delete properties['$schema'];
  const requiredRaw = raw['required'];
  const required = Array.isArray(requiredRaw)
    ? (requiredRaw as string[]).filter((key) => key !== '$schema')
    : requiredRaw;

  return { ...raw, properties, required };
}

interface JsonSchemaNode {
  type?: string | string[];
  enum?: unknown[];
  properties?: Record<string, JsonSchemaNode>;
  required?: string[];
  items?: JsonSchemaNode;
}

function describeType(node: JsonSchemaNode): string {
  if (node.enum) return node.enum.map((v) => JSON.stringify(v)).join('|');
  if (node.type === 'array') return `${describeType(node.items ?? {})}[]`;
  if (Array.isArray(node.type)) return node.type.join('|');
  return node.type ?? 'any';
}

function renderProps(propsSchema: z.ZodType): string {
  const json = z.toJSONSchema(propsSchema, { io: 'input' }) as JsonSchemaNode;
  const props = json.properties ?? {};
  const required = new Set(json.required ?? []);
  const parts = Object.entries(props).map(([name, node]) => {
    const optional = required.has(name) ? '' : '?';
    return `${name}${optional}: ${describeType(node)}`;
  });
  return parts.length ? parts.join(', ') : '—';
}

/**
 * Compact, deterministic textual catalog of every block type and its props/slots, for the
 * cacheable Tier-1 system prompt. Order follows `BLOCK_TYPES` so the string is stable
 * (stable string ⇒ stable prompt-cache key).
 */
export function renderBlockCatalog(): string {
  const lines = BLOCK_TYPES.map((type) => {
    const spec = blockManifest[type];
    const slots = spec.slots.length ? `  slots: [${spec.slots.join(', ')}]` : '';
    return `- ${type}(${renderProps(spec.props)})${slots}`;
  });
  return lines.join('\n');
}
