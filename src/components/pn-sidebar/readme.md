# pn-sidebar



## Accessibility

- Keyboard navigation with `ArrowUp`/`ArrowDown` for moving between items.
- Focus-visible outlines on links and toggle buttons.

## Styling Notes

- Badges are positioned inline next to the label text (not pushed to the far edge).
- Hovering over links applies a primary-tinted background and primary text color for clear visual feedback.
- Chevrons on expandable items are right-aligned via `margin-left: auto`.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type            | Default     |
| ------------- | ------------- | ----------- | --------------- | ----------- |
| `activeItem`  | `active-item` |             | `string`        | `''`        |
| `collapsed`   | `collapsed`   |             | `boolean`       | `false`     |
| `collapsible` | `collapsible` |             | `boolean`       | `true`      |
| `header`      | `header`      |             | `string`        | `undefined` |
| `items`       | --            |             | `SidebarItem[]` | `[]`        |
| `width`       | `width`       |             | `string`        | `'260px'`   |


## Events

| Event        | Description | Type                                   |
| ------------ | ----------- | -------------------------------------- |
| `pnCollapse` |             | `CustomEvent<{ collapsed: boolean; }>` |
| `pnNavigate` |             | `CustomEvent<{ item: SidebarItem; }>`  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
