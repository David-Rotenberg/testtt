// Vendored from @seyuna/schema. Do not edit — regenerate to update.
import { z } from 'zod';
import { BLOCK_TYPES, type BlockType } from './block-types.js';

/**
 * A block instance inside a page. The recursive `children` shape requires `z.lazy`,
 * so we declare the TS type separately and use `z.ZodType<Block>` to tie them together.
 *
 * Props are kept loose at the schema layer (`Record<string, unknown>`) because the
 * per-type prop validation lives in `@seyuna/components/blockManifest`. The generator's
 * `resolve` step walks blocks and runs `blockManifest[type].props.parse(...)` to enforce
 * per-block contracts without a circular dependency.
 */
export type Block = {
  type: BlockType;
  props?: Record<string, unknown> | undefined;
  children?: Block[] | undefined;
  bind?:
    | { model?: string | undefined; field?: string | undefined; action?: string | undefined }
    | undefined;
};

export const block: z.ZodType<Block> = z.lazy(() =>
  z.object({
    type: z.enum(BLOCK_TYPES),
    props: z.record(z.string(), z.unknown()).optional(),
    children: z.array(block).optional(),
    bind: z
      .object({
        model: z.string().optional(),
        field: z.string().optional(),
        action: z.string().optional(),
      })
      .optional(),
  }),
);

export { BLOCK_TYPES, type BlockType } from './block-types.js';
