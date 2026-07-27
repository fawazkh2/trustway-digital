# Trustway Digital Design System

## Foundations

The system is defined in `app/globals.css`. Use semantic tokens instead of literal colors in new components.

| Group | Tokens |
| --- | --- |
| Color | `--ds-primary`, `--ds-secondary`, `--ds-success`, `--ds-warning`, `--ds-danger`, `--ds-info` |
| Surface | `--ds-surface`, `--ds-surface-subtle`, `--ds-text`, `--ds-text-muted`, `--ds-border` |
| Spacing | `--ds-space-1` through `--ds-space-6` |
| Radius | `--ds-radius-sm`, `--ds-radius-md`, `--ds-radius-lg` |
| Shadow | `--ds-shadow-sm`, `--ds-shadow-md`, `--ds-shadow-lg` |
| Motion | `--ds-duration-fast`, `--ds-duration-base`, `--ds-ease` |

All foundation tokens have a dark-mode counterpart under `:root.dark`. Do not add separate dark color literals to a component unless it is a page-specific illustration.

## Components

All UI primitives are exported from `components/ui`.

```tsx
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  EmptyState,
  ErrorState,
  Icon,
  Input,
  LoadingState,
  Modal,
  Progress,
  Select,
  Skeleton,
  Textarea,
  ThemeToggle,
  Toast,
} from "@/components/ui";
```

| Component | Purpose |
| --- | --- |
| `Button` | Actions. Variants: `primary`, `secondary`, `ghost`, `danger`; sizes: `sm`, `md`, `lg`. |
| `Input` | Single-line text, email, password, number, date and file fields. |
| `Textarea` | Multi-line text input. |
| `Select` | Native select with shared focus and dark-mode treatment. |
| `Checkbox` | Native checkbox with shared accent color. |
| `Card` | Surface container for grouped content. |
| `Modal` | Accessible dialog with backdrop click and Escape handling. |
| `Badge` | Compact status label. Tones: `neutral`, `primary`, `success`, `warning`, `danger`, `info`. |
| `Alert` | Inline validation or system feedback. |
| `Toast` | Floating, non-blocking status feedback. |
| `Progress` | Determinate progress bar from `0` to `100`. |
| `Avatar` | Image or initials identity marker. |
| `EmptyState` | No-content state with optional action. |
| `LoadingState` | Spinner and loading label. |
| `ErrorState` | Recoverable content error. |
| `Skeleton` | Loading placeholder. Set width and height through a custom class. |
| `Icon` | Shared stroke icon set. Available names are typed in `IconName`. |
| `ThemeToggle` | Shared light/dark appearance control; use it with `useTheme`. |

## Usage

```tsx
<Card>
  <Badge tone="warning">Planung</Badge>
  <Progress value={24} label="Projektfortschritt" />
  <Button>Änderungen speichern</Button>
</Card>
```

## Motion and Accessibility

- Use `ui-page-enter` for page-level fade-in only.
- Primitives include hover, active and keyboard focus states.
- `prefers-reduced-motion` disables non-essential animation globally.
- Use `Alert` for form errors and `Toast` for transient confirmations.
- Use the shared `Icon` component instead of text symbols for newly added controls.
- Use `useTheme` from `hooks/use-theme` and `ThemeToggle` instead of duplicating theme state or localStorage effects.

## Conventions

- Use semantic tokens, not hard-coded colors, for reusable UI.
- Keep page-specific editorial layouts in their route stylesheet classes.
- Prefer `Badge` for status and `Progress` for numeric completion.
- Keep destructive actions explicit with `Button variant="danger"`.
