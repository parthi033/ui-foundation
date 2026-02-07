# pn-dropdown



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description | Type               | Default              |
| --------------- | ----------------- | ----------- | ------------------ | -------------------- |
| `clearable`     | `clearable`       |             | `boolean`          | `false`              |
| `disabled`      | `disabled`        |             | `boolean`          | `false`              |
| `dropdownId`    | `dropdown-id`     |             | `string`           | `undefined`          |
| `error`         | `error`           |             | `boolean`          | `false`              |
| `errorMessage`  | `error-message`   |             | `string`           | `''`                 |
| `iconLeft`      | `icon-left`       |             | `string`           | `undefined`          |
| `label`         | `label`           |             | `string`           | `undefined`          |
| `name`          | `name`            |             | `string`           | `undefined`          |
| `noResultsText` | `no-results-text` |             | `string`           | `'No results found'` |
| `options`       | --                |             | `DropdownOption[]` | `[]`                 |
| `placeholder`   | `placeholder`     |             | `string`           | `'Select an option'` |
| `required`      | `required`        |             | `boolean`          | `false`              |
| `typeahead`     | `typeahead`       |             | `boolean`          | `false`              |
| `value`         | `value`           |             | `string`           | `''`                 |


## Events

| Event      | Description | Type                                                            |
| ---------- | ----------- | --------------------------------------------------------------- |
| `pnBlur`   |             | `CustomEvent<void>`                                             |
| `pnChange` |             | `CustomEvent<{ value: string; label: string; name?: string; }>` |
| `pnFocus`  |             | `CustomEvent<void>`                                             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
