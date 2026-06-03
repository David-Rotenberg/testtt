// Vendored from @seyuna/schema. Do not edit — regenerate to update.
/**
 * Canonical list of block type names. Single source of truth for the DSL `block.type`
 * field. `@seyuna/components` builds its `blockManifest` (Zod props per type) and React
 * implementations against this list — no runtime dependency back into the schema.
 *
 * Adding a block type is a schema-version change. Bump `SCHEMA_VERSION` in
 * [version.ts](./version.ts) when this list grows.
 */
export const BLOCK_TYPES = [
  // Layout
  'Stack',
  'Grid',
  'Container',
  'Section',
  'Spacer',
  // Content
  'Heading',
  'Text',
  'Image',
  'Link',
  'Button',
  'Icon',
  // Forms
  'Form',
  'Field',
  'Submit',
  'FieldArray',
  // Data
  'Table',
  'List',
  'Card',
  'Stat',
  'Avatar',
  'Badge',
  // Navigation
  'NavBar',
  'Footer',
  'Breadcrumbs',
  // Auth
  'SignIn',
  'SignUp',
  'UserMenu',
  'RequireAuth',
  // Feedback
  'Alert',
  'EmptyState',
  'Skeleton',
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];
