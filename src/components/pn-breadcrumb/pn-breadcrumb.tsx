import { Component, Prop, h } from '@stencil/core';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

@Component({
  tag: 'pn-breadcrumb',
  styleUrl: 'pn-breadcrumb.scss',
  shadow: false,
})
export class PnBreadcrumb {
  @Prop({ mutable: true }) items: BreadcrumbItem[] = [];
  @Prop() separator: string = '/';
  @Prop() maxItems: number = 0;
  @Prop() collapseLabel: string = '...';

  render() {
    let displayItems = [...this.items];
    let collapsed = false;

    if (this.maxItems > 0 && this.items.length > this.maxItems) {
      const first = this.items[0];
      const last = this.items.slice(-(this.maxItems - 1));
      displayItems = [first, { label: this.collapseLabel }, ...last];
      collapsed = true;
    }

    return (
      <nav class="pn-bc" aria-label="Breadcrumb">
        <ol class="pn-bc__list">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isCollapse = collapsed && index === 1;

            return (
              <li class={{ 'pn-bc__item': true, 'pn-bc__item--current': isLast }} key={index}>
                {index > 0 ? (
                  <span class="pn-bc__separator" aria-hidden="true">{this.separator}</span>
                ) : null}
                {isCollapse ? (
                  <span class="pn-bc__collapse">{this.collapseLabel}</span>
                ) : isLast || !item.href ? (
                  <span class="pn-bc__text" aria-current={isLast ? 'page' : undefined}>
                    {item.icon ? <i class={`pn-bc__icon ${item.icon}`} aria-hidden="true"></i> : null}
                    {item.label}
                  </span>
                ) : (
                  <a class="pn-bc__link" href={item.href}>
                    {item.icon ? <i class={`pn-bc__icon ${item.icon}`} aria-hidden="true"></i> : null}
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
}
