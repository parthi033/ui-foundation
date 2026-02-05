# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-04

### ✨ Added
- **Icon Support**: Added `iconLeft`, `iconRight`, and `iconOnly` props to pn-button component
- **Icon Library Integration**: Support for Font Awesome, Heroicons, Lucide, Bootstrap Icons, and other CSS-based icon libraries
- **Font Awesome Dependency**: Integrated Font Awesome as node module instead of CDN for better performance and offline support
- **Dynamic Color System**: Implemented HSL color extraction from HEX values for better theming flexibility
- **Enhanced Button Variations**: Added tertiary button type support
- **Comprehensive Examples**: Added extensive icon usage examples in demo page
- **Build Optimization**: Configured Stencil to automatically copy Font Awesome assets during build

### 🎨 Enhanced
- **Button Styling**: Improved flexbox layout for proper icon and text alignment
- **Design Tokens**: Enhanced token system with dynamic HSL calculation from HEX colors
- **Dark Theme Support**: Better dark mode implementation with relative color adjustments
- **Box Shadow System**: Added primary color-based shadow variations for consistent theming

### 🔧 Technical
- **Asset Management**: Added Font Awesome asset copying to Stencil build configuration
- **Type Safety**: Enhanced TypeScript definitions for new icon props
- **Documentation**: Comprehensive README update with usage examples and framework integration guides

### 📱 Usage Examples
```html
<!-- Icon with text -->
<pn-button label="Save" type="primary" icon-left="fas fa-save"></pn-button>

<!-- Icon only -->
<pn-button type="primary" icon-left="fas fa-heart" icon-only="true"></pn-button>

<!-- Multiple variations -->
<pn-button label="Download" type="secondary" icon-right="fas fa-download" rounded="true" shadow="true"></pn-button>
```

## [0.0.5] - 2026-02-03

### Initial Release
- Basic pn-button component with primary, secondary, white, and disabled variations
- Rounded and shadow prop support
- SCSS-based styling with design tokens
- Stencil-based Web Components architecture
- Framework-agnostic distribution builds