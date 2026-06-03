// Vendored from @seyuna/components. Do not edit — regenerate to update.
import type { BlockProps } from './manifest.js';

type WithChildren = { children?: React.ReactNode };
type WithSlots = { children?: React.ReactNode; footer?: React.ReactNode };

const AVATAR_SIZE = {
  sm: 'size-6 text-[0.6rem]',
  md: 'size-8 text-xs',
  lg: 'size-10 text-sm',
} as const;
const BADGE_TONE = {
  default: 'bg-secondary text-secondary-foreground',
  muted: 'bg-muted text-muted-foreground',
  accent: 'bg-accent text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
} as const;
const STAT_TONE = {
  default: 'text-foreground',
  positive: 'text-emerald-600 dark:text-emerald-400',
  negative: 'text-destructive',
} as const;
const CARD_TONE = {
  default: 'bg-card',
  muted: 'bg-muted',
  accent: 'bg-accent',
} as const;

export function Table(props: BlockProps<'Table'>) {
  // Phase 1: emits a static shell. Row hydration is wired by the page emitter via the
  // server-rendered initial dataset (the generator's hono emitter exposes /api/models/<m>/list).
  return (
    <div
      className="overflow-hidden rounded-md border border-input"
      data-table-model={props.model}
      data-page-size={props.pageSize}
    >
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            {props.columns.map((c) => (
              <th key={c.field} className="px-3 py-2 text-left font-medium text-muted-foreground">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={props.columns.length}
              className="px-3 py-6 text-center text-muted-foreground"
            >
              Loading…
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function List(props: BlockProps<'List'> & WithChildren) {
  return (
    <ul
      className="flex flex-col gap-2"
      data-list-model={props.model}
      data-template={props.itemTemplate}
    >
      <li className="text-sm text-muted-foreground" data-list-empty>
        {props.emptyMessage}
      </li>
      {props.children}
    </ul>
  );
}

export function Card(props: BlockProps<'Card'> & WithSlots) {
  return (
    <div className={`rounded-lg border border-input shadow-sm ${CARD_TONE[props.tone]}`}>
      {(props.title !== undefined || props.description !== undefined) && (
        <div className="border-b border-input px-4 py-3">
          {props.title !== undefined ? <div className="font-medium">{props.title}</div> : null}
          {props.description !== undefined ? (
            <div className="text-sm text-muted-foreground">{props.description}</div>
          ) : null}
        </div>
      )}
      {props.children !== undefined ? <div className="p-4">{props.children}</div> : null}
      {props.footer !== undefined ? (
        <div className="border-t border-input px-4 py-3">{props.footer}</div>
      ) : null}
    </div>
  );
}

export function Stat(props: BlockProps<'Stat'>) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{props.label}</div>
      <div className={`text-2xl font-semibold tabular-nums ${STAT_TONE[props.tone]}`}>
        {props.value}
      </div>
      {props.delta !== undefined ? (
        <div className="text-xs text-muted-foreground">{props.delta}</div>
      ) : null}
    </div>
  );
}

export function Avatar(props: BlockProps<'Avatar'>) {
  const initials = (props.fallback ?? props.alt ?? '?').slice(0, 2).toUpperCase();
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-medium ${AVATAR_SIZE[props.size]}`}
    >
      {props.src !== undefined ? (
        <img src={props.src} alt={props.alt} className="size-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}

export function Badge(props: BlockProps<'Badge'>) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${BADGE_TONE[props.tone]}`}
    >
      {props.text}
    </span>
  );
}
