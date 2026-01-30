# @parthi033/ui-foundation

A lightweight, framework‑agnostic Web Components library built with Stencil.

## Features
- Framework‑agnostic Web Components
- Stencil-powered
- Optional Shadow DOM
- Tree‑shakeable builds (ESM + CJS)
- Typed definitions included
- Easy integration with Storybook, React, Angular, Vue

## Installation
npm install @parthi033/ui-foundation

## Usage
Load a component:
import '@parthi033/ui-foundation/dist/components/pn-button';

Use in HTML:
<pn-button label="Click me"></pn-button>

## Components
### pn-button
Props:
- label (string): Text displayed on the button

## Development
npm install
npm run build
npm start

## Storybook
npm install @parthi033/ui-foundation
import '@parthi033/ui-foundation/dist/components/pn-button';

## Publishing
npm version patch
npm publish --access public

## License
MIT License © 2026 ParthibanNagaraj