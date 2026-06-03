// Vendored from @seyuna/components. Do not edit — regenerate to update.
import type { BlockType } from '@seyuna/schema';
import * as auth from './auth.js';
import * as content from './content.js';
import * as data from './data.js';
import * as feedback from './feedback.js';
import * as forms from './forms.js';
import * as layout from './layout.js';
import * as navigation from './navigation.js';

/**
 * Lookup table from block type → React component. The generator's page emitter uses this
 * to build per-page `import { Stack, Heading, ... } from '@seyuna/components/catalog';`
 * statements deterministically.
 */
export const catalog: Record<BlockType, React.ComponentType<unknown>> = {
  // layout
  Stack: layout.Stack as React.ComponentType<unknown>,
  Grid: layout.Grid as React.ComponentType<unknown>,
  Container: layout.Container as React.ComponentType<unknown>,
  Section: layout.Section as React.ComponentType<unknown>,
  Spacer: layout.Spacer as React.ComponentType<unknown>,
  // content
  Heading: content.Heading as React.ComponentType<unknown>,
  Text: content.Text as React.ComponentType<unknown>,
  Image: content.Image as React.ComponentType<unknown>,
  Link: content.Link as React.ComponentType<unknown>,
  Button: content.Button as React.ComponentType<unknown>,
  Icon: content.Icon as React.ComponentType<unknown>,
  // forms
  Form: forms.Form as React.ComponentType<unknown>,
  Field: forms.Field as React.ComponentType<unknown>,
  Submit: forms.Submit as React.ComponentType<unknown>,
  FieldArray: forms.FieldArray as React.ComponentType<unknown>,
  // data
  Table: data.Table as React.ComponentType<unknown>,
  List: data.List as React.ComponentType<unknown>,
  Card: data.Card as React.ComponentType<unknown>,
  Stat: data.Stat as React.ComponentType<unknown>,
  Avatar: data.Avatar as React.ComponentType<unknown>,
  Badge: data.Badge as React.ComponentType<unknown>,
  // navigation
  NavBar: navigation.NavBar as React.ComponentType<unknown>,
  Footer: navigation.Footer as React.ComponentType<unknown>,
  Breadcrumbs: navigation.Breadcrumbs as React.ComponentType<unknown>,
  // auth
  SignIn: auth.SignIn as React.ComponentType<unknown>,
  SignUp: auth.SignUp as React.ComponentType<unknown>,
  UserMenu: auth.UserMenu as React.ComponentType<unknown>,
  RequireAuth: auth.RequireAuth as React.ComponentType<unknown>,
  // feedback
  Alert: feedback.Alert as React.ComponentType<unknown>,
  EmptyState: feedback.EmptyState as React.ComponentType<unknown>,
  Skeleton: feedback.Skeleton as React.ComponentType<unknown>,
};

export { auth, content, data, feedback, forms, layout, navigation };
