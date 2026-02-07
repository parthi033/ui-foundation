# pn-modal



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description | Type                                             | Default     |
| ---------------- | ------------------ | ----------- | ------------------------------------------------ | ----------- |
| `closeOnEsc`     | `close-on-esc`     |             | `boolean`                                        | `true`      |
| `closeOnOverlay` | `close-on-overlay` |             | `boolean`                                        | `true`      |
| `modalId`        | `modal-id`         |             | `string`                                         | `undefined` |
| `modalTitle`     | `modal-title`      |             | `string`                                         | `undefined` |
| `open`           | `open`             |             | `boolean`                                        | `false`     |
| `showClose`      | `show-close`       |             | `boolean`                                        | `true`      |
| `size`           | `size`             |             | `"fullscreen" \| "large" \| "medium" \| "small"` | `'medium'`  |


## Events

| Event     | Description | Type                |
| --------- | ----------- | ------------------- |
| `pnClose` |             | `CustomEvent<void>` |
| `pnOpen`  |             | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
