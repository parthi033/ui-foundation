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
- Dark mode support

## Installation
```bash
npm install @parthi033/ui-foundation
```

## Quick Start

### Load a component:
```javascript
import '@parthi033/ui-foundation/dist/components/pn-button';
```

### Use in HTML:
```html
<pn-button label="Click me"></pn-button>
```

## Components

### pn-button

A versatile button component with icon support and multiple variations.

#### Props:
- `label` (string): Text displayed on the button
- `type` ('primary' | 'secondary' | 'tertiary' | 'white' | 'disabled' | 'transparent'): Button style variant
- `rounded` (boolean): Apply rounded corners
- `shadow` (boolean): Add shadow effect
- `iconLeft` (string): Icon class for left-side icon (e.g., "fas fa-save")
- `iconRight` (string): Icon class for right-side icon (e.g., "fas fa-arrow-right")
- `iconOnly` (boolean): Display only icon without text

#### Examples:
```html
<!-- Basic buttons -->
<pn-button label="Primary" type="primary"></pn-button>
<pn-button label="Secondary" type="secondary"></pn-button>
<pn-button label="Transparent" type="transparent"></pn-button>

<!-- With icons -->
<pn-button label="Save" type="primary" icon-left="fas fa-save"></pn-button>
<pn-button label="Next" type="secondary" icon-right="fas fa-arrow-right"></pn-button>
<pn-button label="Edit" type="transparent" icon-left="fas fa-edit"></pn-button>

<!-- Icon only -->
<pn-button type="primary" icon-left="fas fa-heart" icon-only="true"></pn-button>
<pn-button type="transparent" icon-left="fas fa-plus" icon-only="true"></pn-button>

<!-- Variations -->
<pn-button label="Rounded" type="primary" rounded="true"></pn-button>
<pn-button label="With Shadow" type="transparent" shadow="true"></pn-button>
```

#### Icon Libraries Support:
This component works with any CSS-based icon library:
- Font Awesome: `icon-left="fas fa-save"`
- Heroicons: `icon-left="heroicon-o-cog"`
- Lucide: `icon-left="lucide lucide-search"`
- Bootstrap Icons: `icon-left="bi bi-house"`

## Theming

The library uses CSS custom properties for easy theming:

```css
:root {
  --color-primary: #7009d1;
  --color-secondary: #bf07b6;
  --color-tertiary: #045c5a;
}

/* Dark theme */
:root.dark {
  --color-primary-l: 16%;
  --color-secondary-l: 16%;
  --color-tertiary-l: 16%;
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

function App() {
  return (
    <pn-button 
      label="Save Document"
      type="primary"
      iconLeft="fas fa-save"
      shadow={true}
    />
  );
}
```

### Vue
```vue
<template>
  <pn-button 
    :label="'Save Document'"
    type="primary" 
    icon-left="fas fa-save"
    :shadow="true"
  />
</template>

<script>
import '@parthi033/ui-foundation/dist/components/pn-button';
</script>
```

### Angular
```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@parthi033/ui-foundation/dist/components/pn-button';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

```html
<pn-button 
  label="Save Document"
  type="primary"
  [iconLeft]="'fas fa-save'"
  [shadow]="true">
</pn-button>
```

## Storybook
npm install @parthi033/ui-foundation
import '@parthi033/ui-foundation/dist/components/pn-button';

## Publishing
npm version patch
npm publish --access public

## License
MIT License © 2026 ParthibanNagaraj