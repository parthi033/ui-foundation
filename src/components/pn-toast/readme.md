# pn-toast



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type                                                                                              | Default       |
| ----------- | ------------ | ----------- | ------------------------------------------------------------------------------------------------- | ------------- |
| `maxToasts` | `max-toasts` |             | `number`                                                                                          | `5`           |
| `position`  | `position`   |             | `"bottom-center" \| "bottom-left" \| "bottom-right" \| "top-center" \| "top-left" \| "top-right"` | `'top-right'` |


## Events

| Event       | Description | Type                           |
| ----------- | ----------- | ------------------------------ |
| `pnDismiss` |             | `CustomEvent<{ id: string; }>` |


## Methods

### `addToast(options: { message: string; type?: "success" | "error" | "warning" | "info"; duration?: number; dismissible?: boolean; }) => Promise<string>`



#### Parameters

| Name      | Type                                                                                                                 | Description |
| --------- | -------------------------------------------------------------------------------------------------------------------- | ----------- |
| `options` | `{ message: string; type?: "info" \| "error" \| "success" \| "warning"; duration?: number; dismissible?: boolean; }` |             |

#### Returns

Type: `Promise<string>`



### `clearAll() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `removeToast(id: string) => Promise<void>`



#### Parameters

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `id` | `string` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
