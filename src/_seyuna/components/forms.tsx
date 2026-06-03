// Vendored from @seyuna/components. Do not edit — regenerate to update.
import { Field as BaseField } from '@base-ui/react/field';
import type { BlockProps } from './manifest.js';

type WithChildren = { children?: React.ReactNode };

export function Form(props: BlockProps<'Form'> & WithChildren) {
  return (
    <form action={props.action} method="post" className="flex flex-col gap-4">
      {props.children}
    </form>
  );
}

export function Field(props: BlockProps<'Field'>) {
  const id = `field-${props.name}`;
  const baseInput =
    'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

  const control = (() => {
    switch (props.type) {
      case 'textarea':
        return (
          <BaseField.Control
            render={
              <textarea
                id={id}
                name={props.name}
                placeholder={props.placeholder}
                required={props.required}
                rows={4}
                className={baseInput}
              />
            }
          />
        );
      case 'select':
        return (
          <BaseField.Control
            render={
              <select id={id} name={props.name} required={props.required} className={baseInput}>
                {(props.options ?? []).map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            }
          />
        );
      case 'checkbox':
        return (
          <BaseField.Control
            render={
              <input
                id={id}
                type="checkbox"
                name={props.name}
                required={props.required}
                className="size-4 rounded border-input"
              />
            }
          />
        );
      case 'radio':
        return (
          <div className="flex flex-col gap-2">
            {(props.options ?? []).map((o) => (
              <label key={o.value} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={props.name}
                  value={o.value}
                  required={props.required}
                  className="size-4 border-input"
                />
                {o.label}
              </label>
            ))}
          </div>
        );
      default:
        return (
          <BaseField.Control
            render={
              <input
                id={id}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                required={props.required}
                className={baseInput}
              />
            }
          />
        );
    }
  })();

  return (
    <BaseField.Root name={props.name} className="flex flex-col gap-1.5">
      <BaseField.Label htmlFor={id} className="text-sm font-medium">
        {props.label}
        {props.required ? <span className="ml-1 text-destructive">*</span> : null}
      </BaseField.Label>
      {control}
      {props.helpText !== undefined ? (
        <BaseField.Description className="text-xs text-muted-foreground">
          {props.helpText}
        </BaseField.Description>
      ) : null}
      <BaseField.Error className="text-xs text-destructive" />
    </BaseField.Root>
  );
}

const SUBMIT_VARIANT = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
} as const;

export function Submit(props: BlockProps<'Submit'>) {
  return (
    <button
      type="submit"
      className={`inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium ${SUBMIT_VARIANT[props.variant]}`}
    >
      {props.label}
    </button>
  );
}

export function FieldArray(props: BlockProps<'FieldArray'> & WithChildren) {
  // Phase 1: emits a static container. Repeater behavior (add/remove rows) is a client island
  // added in Phase 5 — the slot still emits its template so the AI/builder can author against it.
  return (
    <fieldset className="flex flex-col gap-2 rounded-md border border-input p-3">
      <legend className="text-sm font-medium">{props.label}</legend>
      <div data-field-array={props.name}>{props.children}</div>
      <button
        type="button"
        className="self-start text-xs text-primary underline-offset-4 hover:underline"
      >
        {props.addLabel}
      </button>
    </fieldset>
  );
}
