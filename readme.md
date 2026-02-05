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

## Demo

🚀 **[Live Demo & Documentation](https://parthi033.github.io/ui-foundation-storybook/?path=/docs/ui-foundation-pn-button--docs)**

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
<pn-input label="Full Name" placeholder="Enter your name"></pn-input>
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

### pn-input

A comprehensive input component with full ADA compliance, icon support, and error handling.

#### Props:
- `label` (string): Label text (required for accessibility)
- `placeholder` (string): Placeholder text
- `type` ('text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'): Input type
- `value` (string | number): Input value
- `disabled` (boolean): Disable the input
- `readonly` (boolean): Make input read-only
- `required` (boolean): Mark as required field
- `error` (boolean): Show error state
- `errorMessage` (string): Error message text
- `iconLeft` (string): Left icon class (e.g., "fas fa-user")
- `iconRight` (string): Right icon class (e.g., "fas fa-search")

#### Examples:
```html
<!-- Basic inputs -->
<pn-input label="Full Name" placeholder="Enter your full name" required="true"></pn-input>
<pn-input label="Email" type="email" placeholder="you@example.com" icon-left="fas fa-envelope"></pn-input>

<!-- Input types -->
<pn-input label="Password" type="password" icon-left="fas fa-lock" required="true"></pn-input>
<pn-input label="Age" type="number" min="18" max="120" icon-left="fas fa-user"></pn-input>
<pn-input label="Search" type="search" placeholder="Search..." icon-right="fas fa-search"></pn-input>

<!-- States -->
<pn-input label="Error Example" error="true" error-message="This field is required"></pn-input>
<pn-input label="Read-only" value="Cannot be changed" readonly="true"></pn-input>
<pn-input label="Disabled" disabled="true"></pn-input>
```

#### Icon Libraries Support:
Both components work with any CSS-based icon library:
- Font Awesome: `icon-left="fas fa-save"`
- Heroicons: `icon-left="heroicon-o-cog"`
- Lucide: `icon-left="lucide lucide-search"`
- Bootstrap Icons: `icon-left="bi bi-house"`

## Accessibility

The components are built with ADA compliance in mind:
- Semantic HTML elements
- Proper ARIA attributes
- Screen reader support
- Keyboard navigation
- High contrast mode support
- Focus management

## Theming

The library uses CSS custom properties for easy theming:

```css
:root {
  --color-primary: #7009d1;
  --color-secondary: #bf07b6;
  --color-tertiary: #045c5a;
  /* Input specific tokens */
  --input-bg: #ffffff;
  --input-border: hsl(0, 0%, 80%);
  --input-focus-border: var(--color-primary);
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
import '@parthi033/ui-foundation/dist/components/pn-input';

function App() {
  const [email, setEmail] = useState('');
  
  return (
    <div>
      <pn-input 
        label="Email Address"
        type="email"
        iconLeft="fas fa-envelope"
        required={true}
        onPnInput={(e) => setEmail(e.detail.value)}
      />
      <pn-button 
        label="Save Document"
        type="primary"
        iconLeft="fas fa-save"
        shadow={true}
      />
    </div>
  );
}
```

### Vue
```vue
<template>
  <div>
    <pn-input 
      :label="'Email Address'"
      type="email" 
      icon-left="fas fa-envelope"
      :required="true"
      @pnInput="handleInput"
    />
    <pn-button 
      :label="'Save Document'"
      type="primary" 
      icon-left="fas fa-save"
      :shadow="true"
    />
  </div>
</template>

<script>
import '@parthi033/ui-foundation/dist/components/pn-button';
import '@parthi033/ui-foundation/dist/components/pn-input';

export default {
  methods: {
    handleInput(event) {
      console.log('Input value:', event.detail.value);
    }
  }
}
</script>
```

### Angular
```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@parthi033/ui-foundation/dist/components/pn-button';
import '@parthi033/ui-foundation/dist/components/pn-input';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

```html
<pn-input 
  label="Email Address"
  type="email"
  [iconLeft]="'fas fa-envelope'"
  [required]="true"
  (pnInput)="handleInput($event)">
</pn-input>
<pn-button 
  label="Save Document"
  type="primary"
  [iconLeft]="'fas fa-save'"
  [shadow]="true">
</pn-button>
```

## Storybook
```bash
npm install @parthi033/ui-foundation
```
```javascript
import '@parthi033/ui-foundation/dist/components/pn-button';
import '@parthi033/ui-foundation/dist/components/pn-input';
```

## Publishing
```bash
npm version patch
npm publish --access public
```

## License
MIT License © 2026 ParthibanNagaraj