// Vendored from @seyuna/components. Do not edit — regenerate to update.
import { BLOCK_TYPES, type BlockType } from '@seyuna/schema';
import { z } from 'zod';

/**
 * Per-block descriptor consumed by the generator's resolve step.
 *
 * - `props`  — Zod schema validating the block's `props` object.
 * - `slots`  — named child slots the block exposes. `['children']` means a single default slot
 *              (any block type allowed). A named slot like `['fields', 'submit']` lets the generator
 *              place children of specific roles. Phase 1 only enforces the slot *names*; per-slot
 *              type restrictions land in Phase 5.
 */
export interface BlockSpec {
  props: z.ZodType;
  slots: readonly string[];
}

const gap = z.enum(['sm', 'md', 'lg']);
const align = z.enum(['start', 'center', 'end', 'stretch']);

/**
 * The full catalog. Order matches `BLOCK_TYPES` from `@seyuna/schema` for diff-friendliness.
 *
 * Adding a block type requires:
 *   1. Append to `BLOCK_TYPES` in `@seyuna/schema/src/block-types.ts`
 *   2. Add an entry here
 *   3. Add a React implementation under the matching subfolder
 *   4. Bump `SCHEMA_VERSION` in `@seyuna/schema/src/version.ts`
 */
export const blockManifest = {
  // ── Layout ────────────────────────────────────────────────────────────
  Stack: {
    props: z.object({
      direction: z.enum(['row', 'column']).default('column'),
      gap: gap.default('md'),
      align: align.default('stretch'),
      wrap: z.boolean().default(false),
    }),
    slots: ['children'],
  },
  Grid: {
    props: z.object({
      columns: z.number().int().min(1).max(12).default(3),
      gap: gap.default('md'),
    }),
    slots: ['children'],
  },
  Container: {
    props: z.object({
      maxWidth: z.enum(['sm', 'md', 'lg', 'xl', 'full']).default('lg'),
      padding: gap.default('md'),
    }),
    slots: ['children'],
  },
  Section: {
    props: z.object({
      tone: z.enum(['default', 'muted', 'accent']).default('default'),
    }),
    slots: ['children'],
  },
  Spacer: {
    props: z.object({
      size: gap.default('md'),
    }),
    slots: [],
  },

  // ── Content ───────────────────────────────────────────────────────────
  Heading: {
    props: z.object({
      level: z.number().int().min(1).max(6).default(2),
      text: z.string().min(1),
      align: z.enum(['start', 'center', 'end']).default('start'),
    }),
    slots: [],
  },
  Text: {
    props: z.object({
      text: z.string().min(1),
      tone: z.enum(['default', 'muted', 'destructive']).default('default'),
      size: z.enum(['sm', 'base', 'lg']).default('base'),
    }),
    slots: [],
  },
  Image: {
    props: z.object({
      src: z.string().min(1),
      alt: z.string(),
      width: z.number().int().positive().optional(),
      height: z.number().int().positive().optional(),
      fit: z.enum(['cover', 'contain', 'fill']).default('cover'),
    }),
    slots: [],
  },
  Link: {
    props: z.object({
      href: z.string().min(1),
      text: z.string().min(1),
      external: z.boolean().default(false),
    }),
    slots: [],
  },
  Button: {
    props: z.object({
      label: z.string().min(1),
      variant: z.enum(['primary', 'secondary', 'ghost', 'destructive']).default('primary'),
      size: z.enum(['sm', 'md', 'lg']).default('md'),
      /** When set, clicking triggers this action (POST /api/actions/<name>). */
      action: z.string().optional(),
      /** When set, the button is a link to this href. Mutually exclusive with `action`. */
      href: z.string().optional(),
    }),
    slots: [],
  },
  Icon: {
    props: z.object({
      name: z.string().min(1),
      size: z.enum(['sm', 'md', 'lg']).default('md'),
    }),
    slots: [],
  },

  // ── Forms ─────────────────────────────────────────────────────────────
  Form: {
    props: z.object({
      action: z.string().min(1),
      submitLabel: z.string().default('Submit'),
    }),
    slots: ['fields', 'submit'],
  },
  Field: {
    props: z.object({
      name: z.string().min(1),
      label: z.string().min(1),
      type: z
        .enum([
          'text',
          'email',
          'password',
          'number',
          'tel',
          'url',
          'date',
          'textarea',
          'select',
          'checkbox',
          'radio',
        ])
        .default('text'),
      placeholder: z.string().optional(),
      required: z.boolean().default(false),
      helpText: z.string().optional(),
      options: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    }),
    slots: [],
  },
  Submit: {
    props: z.object({
      label: z.string().default('Submit'),
      variant: z.enum(['primary', 'secondary']).default('primary'),
    }),
    slots: [],
  },
  FieldArray: {
    props: z.object({
      name: z.string().min(1),
      label: z.string().min(1),
      addLabel: z.string().default('Add'),
      removeLabel: z.string().default('Remove'),
    }),
    slots: ['item'],
  },

  // ── Data ──────────────────────────────────────────────────────────────
  Table: {
    props: z.object({
      model: z.string().min(1),
      columns: z.array(z.object({ field: z.string(), label: z.string() })).min(1),
      pageSize: z.number().int().positive().default(20),
    }),
    slots: [],
  },
  List: {
    props: z.object({
      model: z.string().min(1),
      itemTemplate: z.enum(['compact', 'card', 'detailed']).default('compact'),
      emptyMessage: z.string().default('Nothing here yet.'),
    }),
    slots: ['item'],
  },
  Card: {
    props: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      tone: z.enum(['default', 'muted', 'accent']).default('default'),
    }),
    slots: ['children', 'footer'],
  },
  Stat: {
    props: z.object({
      label: z.string().min(1),
      value: z.union([z.string(), z.number()]),
      delta: z.string().optional(),
      tone: z.enum(['default', 'positive', 'negative']).default('default'),
    }),
    slots: [],
  },
  Avatar: {
    props: z.object({
      src: z.string().optional(),
      alt: z.string().default('Avatar'),
      fallback: z.string().optional(),
      size: z.enum(['sm', 'md', 'lg']).default('md'),
    }),
    slots: [],
  },
  Badge: {
    props: z.object({
      text: z.string().min(1),
      tone: z.enum(['default', 'muted', 'accent', 'destructive']).default('default'),
    }),
    slots: [],
  },

  // ── Navigation ────────────────────────────────────────────────────────
  NavBar: {
    props: z.object({
      brand: z.string().min(1),
      links: z.array(z.object({ href: z.string(), label: z.string() })).default(() => []),
      sticky: z.boolean().default(true),
    }),
    slots: ['cta'],
  },
  Footer: {
    props: z.object({
      copyright: z.string().optional(),
      links: z.array(z.object({ href: z.string(), label: z.string() })).default(() => []),
    }),
    slots: [],
  },
  Breadcrumbs: {
    props: z.object({
      items: z.array(z.object({ href: z.string().optional(), label: z.string() })).min(1),
    }),
    slots: [],
  },

  // ── Auth ──────────────────────────────────────────────────────────────
  SignIn: {
    props: z.object({
      title: z.string().default('Sign in'),
      showProviders: z.boolean().default(true),
      redirectTo: z.string().default('/'),
    }),
    slots: [],
  },
  SignUp: {
    props: z.object({
      title: z.string().default('Create your account'),
      showProviders: z.boolean().default(true),
      redirectTo: z.string().default('/'),
    }),
    slots: [],
  },
  UserMenu: {
    props: z.object({
      showAvatar: z.boolean().default(true),
      showEmail: z.boolean().default(false),
    }),
    slots: [],
  },
  RequireAuth: {
    props: z.object({
      redirectTo: z.string().default('/sign-in'),
      level: z.enum(['optional', 'required', 'admin']).default('required'),
    }),
    slots: ['children'],
  },

  // ── Feedback ──────────────────────────────────────────────────────────
  Alert: {
    props: z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      tone: z.enum(['info', 'success', 'warning', 'destructive']).default('info'),
    }),
    slots: [],
  },
  EmptyState: {
    props: z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      actionLabel: z.string().optional(),
      actionHref: z.string().optional(),
    }),
    slots: [],
  },
  Skeleton: {
    props: z.object({
      lines: z.number().int().positive().default(3),
    }),
    slots: [],
  },
} as const satisfies Record<BlockType, BlockSpec>;

/**
 * Compile-time sanity: the catalog must cover every `BlockType` in the schema.
 * If a name is added to `BLOCK_TYPES` without an entry here, `satisfies` fails.
 */
export type BlockManifest = typeof blockManifest;

/** Convenience: array of all block type names in canonical order. */
export const blockTypes: readonly BlockType[] = BLOCK_TYPES;

/** Inferred prop type for a given block type. */
export type BlockProps<T extends BlockType> = z.infer<BlockManifest[T]['props']>;

/**
 * Validate a block's props at runtime. Used by the generator's `resolve` step before
 * emitting JSX for the block. Returns the parsed props (with defaults applied) or throws.
 */
export function parseBlockProps<T extends BlockType>(type: T, props: unknown): BlockProps<T> {
  return blockManifest[type].props.parse(props ?? {}) as BlockProps<T>;
}
