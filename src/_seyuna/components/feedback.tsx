// Vendored from @seyuna/components. Do not edit — regenerate to update.
import type { BlockProps } from './manifest.js';

const ALERT_TONE = {
  info: 'bg-secondary text-secondary-foreground border-secondary',
  success:
    'bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-100 dark:border-emerald-900/40',
  warning:
    'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-900/20 dark:text-amber-100 dark:border-amber-900/40',
  destructive: 'bg-destructive/10 text-destructive border-destructive/30',
} as const;

export function Alert(props: BlockProps<'Alert'>) {
  return (
    <div
      role="alert"
      className={`flex flex-col gap-1 rounded-md border px-4 py-3 ${ALERT_TONE[props.tone]}`}
    >
      <div className="text-sm font-medium">{props.title}</div>
      {props.description !== undefined ? (
        <div className="text-sm opacity-90">{props.description}</div>
      ) : null}
    </div>
  );
}

export function EmptyState(props: BlockProps<'EmptyState'>) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-input px-6 py-12 text-center">
      <div className="text-base font-medium">{props.title}</div>
      {props.description !== undefined ? (
        <div className="max-w-sm text-sm text-muted-foreground">{props.description}</div>
      ) : null}
      {props.actionLabel !== undefined && props.actionHref !== undefined ? (
        <a
          href={props.actionHref}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          {props.actionLabel}
        </a>
      ) : null}
    </div>
  );
}

export function Skeleton(props: BlockProps<'Skeleton'>) {
  return (
    <div className="flex flex-col gap-2" role="status" aria-label="Loading">
      {Array.from({ length: props.lines }, (_, i) => `skeleton-${i}-${100 - (i % 3) * 10}`).map(
        (key, i) => (
          <div
            key={key}
            className="h-3 animate-pulse rounded bg-muted"
            style={{ width: `${100 - (i % 3) * 10}%` }}
          />
        ),
      )}
    </div>
  );
}
