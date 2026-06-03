// Vendored from @seyuna/schema. Do not edit — regenerate to update.
/**
 * DSL schema version. Bumped together with `CHANGELOG.md`.
 *
 * Format: `seyuna.v<MAJOR>.<MINOR>`. Patch changes (additive optional fields, fixed
 * regex bugs) do not bump this — they ride on the same version. A bump signals a
 * change a consumer might need to handle.
 */
export const SCHEMA_VERSION = 'seyuna.v0.1' as const;
export type SchemaVersion = typeof SCHEMA_VERSION;

/** Every version ever shipped, oldest first. Drives the migration chain. */
export const SCHEMA_VERSIONS = ['seyuna.v0.0', 'seyuna.v0.1'] as const;
export type AnySchemaVersion = (typeof SCHEMA_VERSIONS)[number];

/**
 * Forward-migrate a raw DSL value from any prior version to {@link SCHEMA_VERSION}.
 * Phase 1 ships v0.1 with no migrations to run; later versions add steps here.
 *
 * Throws if `from` is unknown or newer than the current version.
 */
export function migrate(input: unknown, from: AnySchemaVersion): unknown {
  if (from === SCHEMA_VERSION) return input;
  if (!SCHEMA_VERSIONS.includes(from)) {
    throw new Error(`Unknown schema version: ${String(from)}`);
  }
  // No migrations yet. Each future bump prepends a step here.
  // Example pattern:
  //   if (from === 'seyuna.v0.1') input = step_v0_1_to_v0_2(input);
  return input;
}
