// Vendored from @seyuna/components. Do not edit — regenerate to update.
import type { BlockProps } from './manifest.js';

type WithChildren = { children?: React.ReactNode };

const GAP = { sm: 'gap-2', md: 'gap-4', lg: 'gap-8' } as const;
const PAD = { sm: 'p-2', md: 'p-4', lg: 'p-8' } as const;
const ALIGN = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const;
const MAX_W = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-none',
} as const;
const TONE = {
  default: '',
  muted: 'bg-muted',
  accent: 'bg-accent',
} as const;

export function Stack(props: BlockProps<'Stack'> & WithChildren) {
  const dir = props.direction === 'row' ? 'flex-row' : 'flex-col';
  const wrap = props.wrap ? 'flex-wrap' : 'flex-nowrap';
  return (
    <div className={`flex ${dir} ${wrap} ${GAP[props.gap]} ${ALIGN[props.align]}`}>
      {props.children}
    </div>
  );
}

export function Grid(props: BlockProps<'Grid'> & WithChildren) {
  return (
    <div
      className={`grid ${GAP[props.gap]}`}
      style={{ gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))` }}
    >
      {props.children}
    </div>
  );
}

export function Container(props: BlockProps<'Container'> & WithChildren) {
  return (
    <div className={`mx-auto w-full ${MAX_W[props.maxWidth]} ${PAD[props.padding]}`}>
      {props.children}
    </div>
  );
}

export function Section(props: BlockProps<'Section'> & WithChildren) {
  return <section className={`w-full py-12 ${TONE[props.tone]}`}>{props.children}</section>;
}

export function Spacer(props: BlockProps<'Spacer'>) {
  const cls = props.size === 'sm' ? 'h-4' : props.size === 'lg' ? 'h-16' : 'h-8';
  return <div className={cls} aria-hidden="true" />;
}
