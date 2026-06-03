// Vendored from @seyuna/components. Do not edit — regenerate to update.
import type { BlockProps } from './manifest.js';

type WithCta = { cta?: React.ReactNode };

export function NavBar(props: BlockProps<'NavBar'> & WithCta) {
  const sticky = props.sticky ? 'sticky top-0 z-30' : '';
  return (
    <header className={`w-full border-b border-input bg-background ${sticky}`}>
      <div className="mx-auto flex max-w-screen-xl items-center gap-6 px-4 py-3">
        <a href="/" className="text-base font-semibold">
          {props.brand}
        </a>
        <nav className="flex flex-1 items-center gap-4 text-sm">
          {props.links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        {props.cta !== undefined ? (
          <div className="flex items-center gap-2">{props.cta}</div>
        ) : null}
      </div>
    </header>
  );
}

export function Footer(props: BlockProps<'Footer'>) {
  return (
    <footer className="w-full border-t border-input bg-background">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground">
        <div>{props.copyright ?? `© ${new Date().getFullYear()}`}</div>
        <nav className="flex items-center gap-4">
          {props.links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export function Breadcrumbs(props: BlockProps<'Breadcrumbs'>) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
      {props.items.map((item, i) => {
        const isLast = i === props.items.length - 1;
        return (
          <span key={item.href ?? item.label} className="flex items-center gap-1">
            {item.href !== undefined && !isLast ? (
              <a href={item.href} className="hover:text-foreground">
                {item.label}
              </a>
            ) : (
              <span className={isLast ? 'text-foreground' : ''}>{item.label}</span>
            )}
            {!isLast ? <span aria-hidden="true">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}
