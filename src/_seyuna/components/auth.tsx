// Vendored from @seyuna/components. Do not edit — regenerate to update.
import type { BlockProps } from './manifest.js';

type WithChildren = { children?: React.ReactNode };

export function SignIn(props: BlockProps<'SignIn'>) {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-lg border border-input bg-card p-6">
      <h1 className="text-xl font-semibold">{props.title}</h1>
      <form action="/api/auth/sign-in/email" method="post" className="flex flex-col gap-3">
        <input type="hidden" name="redirectTo" value={props.redirectTo} />
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Password</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          Sign in
        </button>
      </form>
      {props.showProviders ? (
        <div className="text-xs text-muted-foreground">
          Other providers are configured in your project's auth manifest.
        </div>
      ) : null}
    </div>
  );
}

export function SignUp(props: BlockProps<'SignUp'>) {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-lg border border-input bg-card p-6">
      <h1 className="text-xl font-semibold">{props.title}</h1>
      <form action="/api/auth/sign-up/email" method="post" className="flex flex-col gap-3">
        <input type="hidden" name="redirectTo" value={props.redirectTo} />
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Password</span>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          Create account
        </button>
      </form>
      {props.showProviders ? (
        <div className="text-xs text-muted-foreground">
          Other providers are configured in your project's auth manifest.
        </div>
      ) : null}
    </div>
  );
}

export function UserMenu(props: BlockProps<'UserMenu'>) {
  // Phase 1: server-rendered placeholder. The generated app's emitter wires this to
  // the current session via a layout-level data fetch.
  return (
    <div className="flex items-center gap-2" data-user-menu="">
      {props.showAvatar ? (
        <span className="inline-flex size-7 items-center justify-center rounded-full bg-muted text-xs">
          U
        </span>
      ) : null}
      {props.showEmail ? <span className="text-xs text-muted-foreground" data-user-email /> : null}
      <a href="/api/auth/sign-out" className="text-xs text-muted-foreground hover:text-foreground">
        Sign out
      </a>
    </div>
  );
}

export function RequireAuth(props: BlockProps<'RequireAuth'> & WithChildren) {
  // The check is enforced by the page emitter at the route level (Astro middleware) using
  // `props.level` + `props.redirectTo`. At render time we just emit the gated children.
  return (
    <div data-require-auth={props.level} data-redirect-to={props.redirectTo}>
      {props.children}
    </div>
  );
}
