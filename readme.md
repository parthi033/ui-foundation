# @parthi033/ui-foundation

A lightweight, framework‑agnostic Web Components library built with Stencil.

## Features
- Framework‑agnostic Web Components
- Stencil-powered with TypeScript
- Optional Shadow DOM
- Tree‑shakeable builds (ESM + CJS)
- Typed definitions included
- Easy integration with Storybook, React, Angular, Vue
- Icon support with popular icon libraries
- Dynamic theming with CSS custom properties
- Dark mode support with WCAG AA compliance

## Demo

🚀 **[Live Demo & Documentation](https://parthi033.github.io/ui-foundation-storybook/?path=/docs/ui-foundation-pn-button--docs)**

## Installation
```bash
npm install @parthi033/ui-foundation
```

## Quick Start

### Load components:
```javascript
import '@parthi033/ui-foundation/dist/components/pn-button';
import '@parthi033/ui-foundation/dist/components/pn-input';
```

### Use in HTML:
```html
<pn-button label="Click me" type="primary"></pn-button>
<pn-input label="Full Name" placeholder="Enter your name" required="true"></pn-input>
```

---

## Components

### pn-accordion

Expandable accordion panels with single or multi-expand support.

| Prop | Type | Default |
|------|------|---------|
| `items` | `AccordionItem[]` | `[]` |
| `multiple` | `boolean` | `false` |
| `bordered` | `boolean` | `true` |
| `compact` | `boolean` | `false` |

**Events:** `pnToggle` → `{ id, open }`

```html
<pn-accordion multiple="true"></pn-accordion>
```

---

### pn-alert

Dismissible alert banners with type-based styling.

| Prop | Type | Default |
|------|------|---------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` |
| `alertTitle` | `string` | — |
| `dismissible` | `boolean` | `false` |
| `icon` | `boolean` | `true` |

**Events:** `pnDismiss`

```html
<pn-alert type="success" alert-title="Done!" dismissible="true">Operation completed.</pn-alert>
```

---

### pn-avatar

User avatars with image, initials, status indicator, and shape options.

| Prop | Type | Default |
|------|------|---------|
| `src` | `string` | — |
| `alt` | `string` | `''` |
| `name` | `string` | — |
| `size` | `'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` |
| `shape` | `'circle' \| 'square'` | `'circle'` |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away' \| ''` | `''` |
| `border` | `boolean` | `false` |

```html
<pn-avatar name="John Doe" size="large" status="online"></pn-avatar>
<pn-avatar src="/photo.jpg" alt="Profile" shape="square"></pn-avatar>
```

---

### pn-badge

Inline badges with solid, outline, and soft variants.

| Prop | Type | Default |
|------|------|---------|
| `text` | `string` | — |
| `type` | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `variant` | `'solid' \| 'outline' \| 'soft'` | `'solid'` |
| `rounded` | `boolean` | `false` |
| `dot` | `boolean` | `false` |
| `icon` | `string` | — |

```html
<pn-badge text="New" type="success" variant="soft" rounded="true"></pn-badge>
<pn-badge text="3" type="error" variant="solid" rounded="true"></pn-badge>
<pn-badge text="Beta" type="primary" variant="outline"></pn-badge>
```

---

### pn-breadcrumb

Navigation breadcrumbs with collapsible overflow and custom separators.

| Prop | Type | Default |
|------|------|---------|
| `items` | `BreadcrumbItem[]` | `[]` |
| `separator` | `string` | `'/'` |
| `maxItems` | `number` | `0` |
| `collapseLabel` | `string` | `'...'` |

```html
<pn-breadcrumb separator=">"></pn-breadcrumb>
```

---

### pn-button

Versatile button with icon support and multiple style variants.

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `type` | `'primary' \| 'secondary' \| 'tertiary' \| 'white' \| 'disabled' \| 'transparent'` | `'primary'` |
| `rounded` | `boolean` | `false` |
| `shadow` | `boolean` | `false` |
| `iconLeft` | `string` | — |
| `iconRight` | `string` | — |
| `iconOnly` | `boolean` | `false` |

```html
<pn-button label="Save" type="primary" icon-left="fas fa-save"></pn-button>
<pn-button label="Cancel" type="transparent"></pn-button>
<pn-button type="secondary" icon-left="fas fa-heart" icon-only="true"></pn-button>
```

---

### pn-card

Content card with image, title, subtitle, and click/hover support.

| Prop | Type | Default |
|------|------|---------|
| `cardTitle` | `string` | — |
| `subtitle` | `string` | — |
| `image` | `string` | — |
| `imageAlt` | `string` | `''` |
| `variant` | `'default' \| 'outlined' \| 'elevated'` | `'default'` |
| `hoverable` | `boolean` | `false` |
| `compact` | `boolean` | `false` |
| `clickable` | `boolean` | `false` |
| `href` | `string` | — |

```html
<pn-card card-title="My Card" subtitle="Description" variant="elevated" hoverable="true">
  <p>Card content goes here.</p>
</pn-card>
```

---

### pn-checkbox

Checkbox with label, indeterminate state, and error handling.

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `name` | `string` | — |
| `checked` | `boolean` | `false` |
| `indeterminate` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `error` | `boolean` | `false` |
| `errorMessage` | `string` | — |
| `value` | `string` | `''` |
| `checkboxId` | `string` | — |

**Events:** `pnChange` → `{ checked, value }`

```html
<pn-checkbox label="I agree to the terms" required="true"></pn-checkbox>
```

---

### pn-dropdown

Select dropdown with typeahead search, clearable, and icon support.

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `placeholder` | `string` | `'Select an option'` |
| `options` | `DropdownOption[]` | `[]` |
| `value` | `string` | `''` |
| `disabled` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `error` | `boolean` | `false` |
| `errorMessage` | `string` | `''` |
| `typeahead` | `boolean` | `false` |
| `clearable` | `boolean` | `false` |
| `noResultsText` | `string` | `'No results found'` |
| `iconLeft` | `string` | — |
| `name` | `string` | — |
| `dropdownId` | `string` | — |

**Events:** `pnChange` → `{ value, label }`, `pnFocus`, `pnBlur`

```html
<pn-dropdown label="Country" placeholder="Choose..." typeahead="true" clearable="true"></pn-dropdown>
```

---

### pn-form-field

Wrapper for form fields with label, hint, and error message.

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `required` | `boolean` | `false` |
| `error` | `boolean` | `false` |
| `errorMessage` | `string` | — |
| `hint` | `string` | — |
| `fieldId` | `string` | — |
| `inline` | `boolean` | `false` |

```html
<pn-form-field label="Email" required="true" hint="We'll never share your email.">
  <pn-input type="email" placeholder="you@example.com"></pn-input>
</pn-form-field>
```

---

### pn-header

Application header with navigation, search, actions, and multiple layout variants.

| Prop | Type | Default |
|------|------|---------|
| `logo` | `string` | — |
| `logoAltText` | `string` | — |
| `company` | `string` | — |
| `navigation` | `NavigationItem[]` | `[]` |
| `actions` | `ActionButton[]` | `[]` |
| `showSearch` | `boolean` | `false` |
| `variant` | `'default' \| 'centered' \| 'mega-menu' \| 'sticky' \| 'transparent' \| 'split' \| 'sidebar' \| 'command-palette'` | `'default'` |
| `utilityLinks` | `{ label, href }[]` | `[]` |

**Events:** `headerSearch` → `string`

```html
<pn-header company="Acme" variant="sticky" show-search="true"></pn-header>
```

---

### pn-input

Input field with icon support, validation, and full ADA compliance.

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `placeholder` | `string` | — |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` |
| `value` | `string \| number` | — |
| `disabled` | `boolean` | `false` |
| `readonly` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `error` | `boolean` | `false` |
| `errorMessage` | `string` | — |
| `iconLeft` | `string` | — |
| `iconRight` | `string` | — |

```html
<pn-input label="Email" type="email" icon-left="fas fa-envelope" required="true"></pn-input>
<pn-input label="Search" type="search" placeholder="Search..." icon-right="fas fa-search"></pn-input>
```

---

### pn-link

Styled anchor link with optional new-tab support.

| Prop | Type | Default |
|------|------|---------|
| `text` | `string` | — |
| `href` | `string` | — |
| `newTab` | `boolean` | `false` |

```html
<pn-link text="Visit Site" href="https://example.com" new-tab="true"></pn-link>
```

---

### pn-modal

Dialog modal with size options, overlay click, and ESC key dismiss.

| Prop | Type | Default |
|------|------|---------|
| `modalTitle` | `string` | — |
| `size` | `'small' \| 'medium' \| 'large' \| 'fullscreen'` | `'medium'` |
| `open` | `boolean` | `false` |
| `closeOnOverlay` | `boolean` | `true` |
| `closeOnEsc` | `boolean` | `true` |
| `showClose` | `boolean` | `true` |
| `modalId` | `string` | — |

**Events:** `pnOpen`, `pnClose`

```html
<pn-modal modal-title="Confirm" size="small" open="true">
  <p>Are you sure?</p>
</pn-modal>
```

---

### pn-pagination

Page navigation with configurable sibling count and compact mode.

| Prop | Type | Default |
|------|------|---------|
| `currentPage` | `number` | `1` |
| `totalPages` | `number` | `1` |
| `siblingCount` | `number` | `1` |
| `showFirstLast` | `boolean` | `true` |
| `showPrevNext` | `boolean` | `true` |
| `compact` | `boolean` | `false` |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` |

**Events:** `pnPageChange` → `{ page }`

```html
<pn-pagination total-pages="20" current-page="5"></pn-pagination>
```

---

### pn-radio

Radio button group with inline layout and error handling.

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `name` | `string` | — |
| `value` | `string` | `''` |
| `disabled` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `error` | `boolean` | `false` |
| `errorMessage` | `string` | — |
| `inline` | `boolean` | `false` |
| `options` | `{ label, value, disabled? }[]` | `[]` |

**Events:** `pnChange` → `{ value }`

```html
<pn-radio label="Size" name="size" inline="true"></pn-radio>
```

---

### pn-sidebar

Collapsible sidebar navigation with sections, badges, and nested items.

| Prop | Type | Default |
|------|------|---------|
| `items` | `SidebarItem[]` | `[]` |
| `activeItem` | `string` | `''` |
| `collapsed` | `boolean` | `false` |
| `header` | `string` | — |
| `collapsible` | `boolean` | `true` |
| `width` | `string` | `'260px'` |

**Events:** `pnNavigate` → `{ item }`, `pnCollapse` → `{ collapsed }`

```html
<pn-sidebar header="Admin Panel" collapsible="true"></pn-sidebar>
```

---

### pn-spinner

Loading indicators: spinner, dots, and skeleton variants with overlay mode.

| Prop | Type | Default |
|------|------|---------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `type` | `'spinner' \| 'dots' \| 'skeleton'` | `'spinner'` |
| `label` | `string` | `'Loading'` |
| `color` | `string` | — |
| `overlay` | `boolean` | `false` |
| `skeletonWidth` | `string` | `'100%'` |
| `skeletonHeight` | `string` | `'1rem'` |
| `skeletonRadius` | `string` | `'4px'` |
| `skeletonLines` | `number` | `1` |

```html
<pn-spinner size="large"></pn-spinner>
<pn-spinner type="dots" size="medium"></pn-spinner>
<pn-spinner type="skeleton" skeleton-lines="3" skeleton-width="80%"></pn-spinner>
```

---

### pn-tabs

Tabbed navigation with default, pills, and underline variants.

| Prop | Type | Default |
|------|------|---------|
| `tabs` | `TabItem[]` | `[]` |
| `activeTab` | `string` | `''` |
| `variant` | `'default' \| 'pills' \| 'underline'` | `'default'` |
| `fullWidth` | `boolean` | `false` |
| `compact` | `boolean` | `false` |

**Events:** `pnTabChange` → `{ tabId }`

```html
<pn-tabs variant="underline" full-width="true"></pn-tabs>
```

---

### pn-textarea

Multi-line text input with character count, resize control, and validation.

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `name` | `string` | — |
| `placeholder` | `string` | — |
| `value` | `string` | `''` |
| `disabled` | `boolean` | `false` |
| `readonly` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `error` | `boolean` | `false` |
| `errorMessage` | `string` | — |
| `rows` | `number` | `4` |
| `maxlength` | `number` | — |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` |
| `showCount` | `boolean` | `false` |
| `textareaId` | `string` | — |

**Events:** `pnInput` → `{ value }`, `pnChange` → `{ value }`, `pnFocus`, `pnBlur`

```html
<pn-textarea label="Comments" rows="5" maxlength="500" show-count="true" required="true"></pn-textarea>
```

---

### pn-toast

Toast notification container with position control.

| Prop | Type | Default |
|------|------|---------|
| `position` | `'top-right' \| 'top-left' \| 'top-center' \| 'bottom-right' \| 'bottom-left' \| 'bottom-center'` | `'top-right'` |
| `maxToasts` | `number` | `5` |

**Events:** `pnDismiss` → `{ id }`

```html
<pn-toast position="bottom-right" max-toasts="3"></pn-toast>
```

---

### pn-toggle

Toggle switch with label positioning and size options.

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `name` | `string` | — |
| `checked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `toggleId` | `string` | — |
| `labelPosition` | `'left' \| 'right'` | `'right'` |

**Events:** `pnChange` → `{ checked }`

```html
<pn-toggle label="Dark Mode" size="medium"></pn-toggle>
```

---

### pn-tooltip

Hover tooltip with directional positioning and configurable delay.

| Prop | Type | Default |
|------|------|---------|
| `text` | `string` | — |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| `delay` | `number` | `200` |
| `tooltipId` | `string` | — |

```html
<pn-tooltip text="More info" position="right">
  <pn-button label="Hover me" type="primary"></pn-button>
</pn-tooltip>
```

---

## Icon Libraries Support

All icon-supporting components work with any CSS-based icon library:
- Font Awesome: `icon-left="fas fa-save"`
- Heroicons: `icon-left="heroicon-o-cog"`
- Lucide: `icon-left="lucide lucide-search"`
- Bootstrap Icons: `icon-left="bi bi-house"`

## Accessibility

All components are built with ADA compliance in mind:
- Semantic HTML elements
- Proper ARIA attributes
- Screen reader support
- Keyboard navigation
- High contrast mode support
- Focus management
- Dark mode uses `--color-primary-fg` token for WCAG AA contrast (≥ 4.5:1) on foreground/accent elements

## Theming

The library uses CSS custom properties for easy theming:

```css
:root {
  --color-primary: #7009d1;
  --color-secondary: #bf07b6;
  --color-tertiary: #045c5a;
}

/* Dark theme — add class="dark" to html or a wrapper */
:root.dark {
  --color-primary-l: 16%;
  --color-primary-fg: hsl(var(--color-primary-h), var(--color-primary-s), 72%);
}
```

## Development

```bash
npm install
npm run build
npm start
```

## Framework Integration

### React
```jsx
import '@parthi033/ui-foundation/dist/components/pn-button';
import '@parthi033/ui-foundation/dist/components/pn-input';

function App() {
  return (
    <div>
      <pn-input label="Email" type="email" iconLeft="fas fa-envelope" required={true} />
      <pn-button label="Submit" type="primary" iconLeft="fas fa-save" />
    </div>
  );
}
```

### Vue
```vue
<template>
  <pn-input label="Email" type="email" icon-left="fas fa-envelope" :required="true" @pnInput="handleInput" />
  <pn-button label="Submit" type="primary" icon-left="fas fa-save" />
</template>

<script>
import '@parthi033/ui-foundation/dist/components/pn-button';
import '@parthi033/ui-foundation/dist/components/pn-input';
</script>
```

### Angular
```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@parthi033/ui-foundation/dist/components/pn-button';
import '@parthi033/ui-foundation/dist/components/pn-input';

@NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA] })
```
```html
<pn-input label="Email" type="email" [iconLeft]="'fas fa-envelope'" [required]="true" (pnInput)="handleInput($event)"></pn-input>
<pn-button label="Submit" type="primary" [iconLeft]="'fas fa-save'"></pn-button>
```

## License
MIT License © 2026 ParthibanNagaraj