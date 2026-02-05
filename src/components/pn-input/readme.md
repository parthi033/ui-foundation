# pn-input



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                                                                        | Default     |
| -------------- | --------------- | ----------- | --------------------------------------------------------------------------- | ----------- |
| `autocomplete` | `autocomplete`  |             | `string`                                                                    | `undefined` |
| `disabled`     | `disabled`      |             | `boolean`                                                                   | `false`     |
| `error`        | `error`         |             | `boolean`                                                                   | `false`     |
| `errorMessage` | `error-message` |             | `string`                                                                    | `''`        |
| `iconLeft`     | `icon-left`     |             | `string`                                                                    | `undefined` |
| `iconRight`    | `icon-right`    |             | `string`                                                                    | `undefined` |
| `inputId`      | `input-id`      |             | `string`                                                                    | `undefined` |
| `label`        | `label`         |             | `string`                                                                    | `undefined` |
| `max`          | `max`           |             | `number`                                                                    | `undefined` |
| `maxlength`    | `maxlength`     |             | `number`                                                                    | `undefined` |
| `min`          | `min`           |             | `number`                                                                    | `undefined` |
| `minlength`    | `minlength`     |             | `number`                                                                    | `undefined` |
| `name`         | `name`          |             | `string`                                                                    | `undefined` |
| `placeholder`  | `placeholder`   |             | `string`                                                                    | `''`        |
| `readonly`     | `readonly`      |             | `boolean`                                                                   | `false`     |
| `required`     | `required`      |             | `boolean`                                                                   | `false`     |
| `step`         | `step`          |             | `number`                                                                    | `undefined` |
| `type`         | `type`          |             | `"email" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "url"` | `'text'`    |
| `value`        | `value`         |             | `number \| string`                                                          | `''`        |


## Events

| Event      | Description | Type                                                       |
| ---------- | ----------- | ---------------------------------------------------------- |
| `pnBlur`   |             | `CustomEvent<FocusEvent>`                                  |
| `pnChange` |             | `CustomEvent<{ value: string \| number; name?: string; }>` |
| `pnFocus`  |             | `CustomEvent<FocusEvent>`                                  |
| `pnInput`  |             | `CustomEvent<{ value: string \| number; name?: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
