# Design System (Starter)

This starter includes a lightweight but scalable **token-first design system** built on Tailwind CSS and semantic CSS variables, optimized for **WCAG 2.1 AA** and “liquid” responsiveness.

## 1) Design Tokens

Tokens live in `src/shared/styles/tokens.css` and are mapped into Tailwind in `tailwind.config.ts`.

### Color tokens (semantic)

- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--success`, `--success-foreground`
- `--warning`, `--warning-foreground`
- `--border`, `--input`, `--ring`

Use via Tailwind:

- `bg-background text-foreground`
- `bg-primary text-primary-foreground`
- `border-border`
- `text-muted-foreground`
- `focus-visible:ring-ring`

### Typography tokens (fluid)

Typography uses `clamp()`-based variables for smooth scaling:

- `--text-xs` → `--text-4xl`
- `--heading-1` → `--heading-6`
- `--leading-tight`, `--leading-normal`, `--leading-relaxed`

Tailwind utilities:

- `text-base`, `text-lg`, `text-2xl`, etc.
- `text-h1` → `text-h6` for headings

### Spacing + shadows

Spacing: `--space-1` … `--space-16` (4px base)\
Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

Tailwind shadows map to tokens (e.g. `shadow-md`).

## 2) Accessibility defaults (WCAG 2.1 AA)

Global styles in `src/shared/styles/globals.css` include:

- **Focus visible** outline + ring token
- **Reduced motion** support (`prefers-reduced-motion`)
- **High contrast** adjustments (`prefers-contrast: more`)
- **Minimum touch targets** on coarse pointers (44×44px)
- `sr-only` and `sr-only-focusable` utilities

## 3) Reusable UI components

Components are in `src/shared/ui/` and exported from `src/shared/ui/index.ts`.

### Typography

- `Heading` (levels 1–6, semantic tags)
- `Text` (variants: `body`, `muted`, `small`, `caption`)
- `Lead`

### Buttons

- `Button` for `<button>` elements
- `ButtonLink` for React Router links styled like buttons
- `IconButton` for icon-only buttons with required aria-label

Variants: `primary`, `secondary`, `outline`, `ghost`, `destructive`\
Sizes: `sm`, `md`, `lg`\
Supports loading state and icons.

### Forms

- `FormField` (label/description/error wrapper with correct ARIA)
- `Label`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`

### Layout primitives

- `Card`, `CardHeader`, `CardContent`, `CardFooter`
- `Badge`, `Alert`
- `Section`, `Stack`, `Grid`

### Interactive components

- `Dialog` – Modal dialog with focus trap, portal, and keyboard support
- `Drawer` – Slide-out panel (left/right) with focus trap
- `Dropdown` – Menu with keyboard navigation (arrow keys, escape)
- `Tabs` – Tab interface with ARIA roles and keyboard navigation
- `Accordion` – Expandable sections with animated transitions
- `Tooltip` – Positioned tooltip with delay and arrow

### Feedback components

- `Toast` / `Toaster` – Toast notification system with `toast()` API
- `Progress` – Linear and circular progress indicators
- `Spinner` – Simple loading spinner
- `Skeleton` – Loading placeholders (text, avatar, card, button variants)

### Marketing components

- `Hero` – Hero section with variants (default, centered, split)
- `FeatureCard` / `FeatureGrid` / `FeatureSection` – Feature showcases
- `Testimonial` / `TestimonialGrid` / `FeaturedTestimonial` – Customer quotes
- `PricingCard` / `PricingGrid` / `PricingToggle` – Pricing tables
- `OptimizedImage` – Lazy loading image with blur placeholder
- `AvatarImage` – Avatar with fallback initials

### SEO & Content

- `Seo` – Full SEO component with OG, Twitter, canonical, and JSON-LD
- `Markdown` – Markdown renderer with prose styling

## 4) Usage examples

### Button

```tsx
import { Button } from '@/shared/ui';

export function Example() {
  return (
    <Button variant="primary" size="md">
      Submit
    </Button>
  );
}
```

### FormField + Input

```tsx
import { FormField, Input } from '@/shared/ui';

export function Example() {
  return (
    <FormField
      label="Email"
      required
      description="We’ll only use this to reply."
      error={undefined}
    >
      {({ id, describedBy, invalid }) => (
        <Input id={id} aria-describedby={describedBy} invalid={invalid} placeholder="you@company.com" />
      )}
    </FormField>
  );
}
```

### Typography

```tsx
import { Heading, Lead, Text } from '@/shared/ui';

export function Example() {
  return (
    <div>
      <Heading level={1}>A marketing headline</Heading>
      <Lead>Short intro text that scales fluidly.</Lead>
      <Text variant="muted">Supporting details.</Text>
    </div>
  );
}
```

### Dialog

```tsx
import { useState } from 'react';
import { Dialog, DialogFooter, Button } from '@/shared/ui';

export function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Confirm action">
        <p>Are you sure you want to proceed?</p>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
```

### Toast notifications

```tsx
import { toast } from '@/shared/lib/toast';
import { Button } from '@/shared/ui';

export function Example() {
  return (
    <Button onClick={() => toast.success('Saved!', { description: 'Changes saved.' })}>
      Save
    </Button>
  );
}
```

### Hero section

```tsx
import { Hero, Button, ButtonLink } from '@/shared/ui';

export function Example() {
  return (
    <Hero
      variant="centered"
      title="Build faster with our starter"
      description="A production-ready foundation for marketing sites."
      actions={
        <>
          <Button size="lg">Get Started</Button>
          <ButtonLink to="/docs" variant="outline" size="lg">Learn More</ButtonLink>
        </>
      }
    />
  );
}
```

### Feature grid

```tsx
import { FeatureSection, FeatureCard } from '@/shared/ui';
import { Zap, Shield, Globe } from 'lucide-react';

export function Example() {
  return (
    <FeatureSection title="Why choose us" centered>
      <FeatureCard icon={<Zap />} title="Fast" description="Optimized for performance." />
      <FeatureCard icon={<Shield />} title="Secure" description="Built with security in mind." />
      <FeatureCard icon={<Globe />} title="Global" description="Multi-language support." />
    </FeatureSection>
  );
}
```

## 5) Customization checklist

- **Brand color**: set `--primary` / `--primary-foreground` in `tokens.css`.
- **Radius**: set `--radius`.
- **Light/dark**: adjust token values in the default and `prefers-color-scheme: light` blocks.
- **Typography**: tune `--heading-*` and `--text-*` clamps.

## 6) WCAG notes (practical)

- Keep contrast: \(\ge 4.5:1\) for normal text, \(\ge 3:1\) for large text.
- Don’t rely on color alone for errors/success; pair with text + icons.
- Ensure interactive elements remain reachable by keyboard and show focus.

