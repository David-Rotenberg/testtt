// Vendored from @seyuna/components. Do not edit — regenerate to update.
import type { BlockProps } from './manifest.js';

const TEXT_SIZE = { sm: 'text-sm', base: 'text-base', lg: 'text-lg' } as const;
const TEXT_TONE = {
  default: '',
  muted: 'text-muted-foreground',
  destructive: 'text-destructive',
} as const;
const ALIGN = { start: 'text-left', center: 'text-center', end: 'text-right' } as const;
const FIT = { cover: 'object-cover', contain: 'object-contain', fill: 'object-fill' } as const;

const HEADING_SIZE = ['', 'text-4xl', 'text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-base'];

export function Heading(props: BlockProps<'Heading'>) {
  const Tag = `h${props.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return (
    <Tag
      className={`font-semibold tracking-tight ${HEADING_SIZE[props.level]} ${ALIGN[props.align]}`}
    >
      {props.text}
    </Tag>
  );
}

export function Text(props: BlockProps<'Text'>) {
  return <p className={`${TEXT_SIZE[props.size]} ${TEXT_TONE[props.tone]}`}>{props.text}</p>;
}

export function Image(props: BlockProps<'Image'>) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={`block ${FIT[props.fit]}`}
      loading="lazy"
    />
  );
}

export function Link(props: BlockProps<'Link'>) {
  const ext = props.external ? { target: '_blank', rel: 'noreferrer' } : {};
  return (
    <a href={props.href} {...ext} className="text-primary underline-offset-4 hover:underline">
      {props.text}
    </a>
  );
}

const BTN_VARIANT = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
} as const;
const BTN_SIZE = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
} as const;

export function Button(props: BlockProps<'Button'>) {
  const cls = `inline-flex items-center justify-center rounded-md font-medium transition-colors ${BTN_VARIANT[props.variant]} ${BTN_SIZE[props.size]}`;
  if (props.href !== undefined) {
    return (
      <a href={props.href} className={cls}>
        {props.label}
      </a>
    );
  }
  // `action` is wired by the generator's page emitter, which compiles it into a runtime call.
  // The runtime SDK turns the `data-action` attribute into a useAction(...).run() invocation.
  return (
    <button type="button" data-action={props.action} className={cls}>
      {props.label}
    </button>
  );
}

const ICON_SIZE = { sm: 'size-4', md: 'size-5', lg: 'size-6' } as const;

export function Icon(props: BlockProps<'Icon'>) {
  // Phase 1: render a placeholder badge with the icon name. Phase 5 swaps to lucide-react
  // resolved at generate time (icon names baked into the JSX import).
  return (
    <span
      role="img"
      className={`inline-flex items-center justify-center rounded-sm bg-muted text-muted-foreground ${ICON_SIZE[props.size]}`}
      aria-label={props.name}
    >
      {props.name.slice(0, 1).toUpperCase()}
    </span>
  );
}
