# pn-tabs



## Accessibility

- Active tab text, active border indicator, and focus outlines use `--color-primary-fg` to meet WCAG AA contrast requirements (≥ 4.5:1) in dark mode.

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type                                  | Default     |
| ----------- | ------------ | ----------- | ------------------------------------- | ----------- |
| `activeTab` | `active-tab` |             | `string`                              | `''`        |
| `compact`   | `compact`    |             | `boolean`                             | `false`     |
| `fullWidth` | `full-width` |             | `boolean`                             | `false`     |
| `tabs`      | --           |             | `TabItem[]`                           | `[]`        |
| `variant`   | `variant`    |             | `"default" \| "pills" \| "underline"` | `'default'` |


## Events

| Event         | Description | Type                              |
| ------------- | ----------- | --------------------------------- |
| `pnTabChange` |             | `CustomEvent<{ tabId: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
