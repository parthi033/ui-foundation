import { Component, Prop, State, Event, EventEmitter, Element, Listen, h } from '@stencil/core';

export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  badge?: string;
  children?: SidebarItem[];
  disabled?: boolean;
  divider?: boolean;
  section?: string;
}

@Component({
  tag: 'pn-sidebar',
  styleUrl: 'pn-sidebar.scss',
  shadow: false,
})
export class PnSidebar {
  @Element() el!: HTMLElement;

  @Prop({ mutable: true }) items: SidebarItem[] = [];
  @Prop({ mutable: true }) activeItem: string = '';
  @Prop() collapsed: boolean = false;
  @Prop() header: string;
  @Prop() collapsible: boolean = true;
  @Prop() width: string = '260px';

  @State() expandedItems: Set<string> = new Set();
  @State() isCollapsed: boolean = false;

  @Event() pnNavigate: EventEmitter<{ item: SidebarItem }>;
  @Event() pnCollapse: EventEmitter<{ collapsed: boolean }>;

  componentWillLoad() {
    this.isCollapsed = this.collapsed;
    // Auto-expand parents of active item
    this.autoExpandActive();
  }

  @Listen('keydown')
  onKeyDown(ev: KeyboardEvent) {
    const target = ev.target as HTMLElement;
    if (!target.classList.contains('pn-sb__link') && !target.classList.contains('pn-sb__toggle')) return;

    const links = Array.from(this.el.querySelectorAll<HTMLElement>('.pn-sb__link, .pn-sb__toggle'));
    const currentIndex = links.indexOf(target);

    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      const next = (currentIndex + 1) % links.length;
      links[next].focus();
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      const prev = (currentIndex - 1 + links.length) % links.length;
      links[prev].focus();
    }
  }

  private autoExpandActive() {
    const findParents = (items: SidebarItem[], targetId: string, parents: string[] = []): string[] | null => {
      for (const item of items) {
        if (item.id === targetId) return parents;
        if (item.children) {
          const result = findParents(item.children, targetId, [...parents, item.id]);
          if (result) return result;
        }
      }
      return null;
    };
    const parents = findParents(this.items, this.activeItem);
    if (parents) {
      this.expandedItems = new Set(parents);
    }
  }

  private toggleExpand(id: string) {
    const next = new Set(this.expandedItems);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.expandedItems = next;
  }

  private toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.pnCollapse.emit({ collapsed: this.isCollapsed });
  }

  private handleItemClick(item: SidebarItem) {
    if (item.disabled) return;
    if (item.children && item.children.length > 0) {
      this.toggleExpand(item.id);
    } else {
      this.activeItem = item.id;
      this.pnNavigate.emit({ item });
    }
  }

  private renderItems(items: SidebarItem[], level: number = 0): any[] {
    const result: any[] = [];
    let currentSection = '';

    items.forEach(item => {
      if (item.divider) {
        result.push(<li class="pn-sb__divider" key={`div-${item.id}`} role="separator"></li>);
        return;
      }

      if (item.section && item.section !== currentSection) {
        currentSection = item.section;
        if (!this.isCollapsed) {
          result.push(
            <li class="pn-sb__section" key={`sec-${item.section}`}>
              {item.section}
            </li>
          );
        }
      }

      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = this.expandedItems.has(item.id);
      const isActive = this.activeItem === item.id;

      result.push(
        <li
          class={{
            'pn-sb__item': true,
            'pn-sb__item--active': isActive,
            'pn-sb__item--disabled': !!item.disabled,
            'pn-sb__item--expanded': isExpanded,
            [`pn-sb__item--level-${level}`]: true,
          }}
          key={item.id}
        >
          {hasChildren ? (
            <button
              class="pn-sb__toggle"
              aria-expanded={isExpanded ? 'true' : 'false'}
              onClick={() => this.handleItemClick(item)}
              title={this.isCollapsed ? item.label : undefined}
              disabled={item.disabled}
            >
              {item.icon ? <i class={`pn-sb__icon ${item.icon}`} aria-hidden="true"></i> : null}
              {!this.isCollapsed ? (
                <span class="pn-sb__label">{item.label}</span>
              ) : null}
              {!this.isCollapsed ? (
                <svg class="pn-sb__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              ) : null}
            </button>
          ) : item.href ? (
            <a
              class="pn-sb__link"
              href={item.href}
              title={this.isCollapsed ? item.label : undefined}
              onClick={(ev) => { ev.preventDefault(); this.handleItemClick(item); }}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.icon ? <i class={`pn-sb__icon ${item.icon}`} aria-hidden="true"></i> : null}
              {!this.isCollapsed ? <span class="pn-sb__label">{item.label}</span> : null}
              {item.badge && !this.isCollapsed ? <span class="pn-sb__badge">{item.badge}</span> : null}
            </a>
          ) : (
            <button
              class="pn-sb__link"
              title={this.isCollapsed ? item.label : undefined}
              onClick={() => this.handleItemClick(item)}
              disabled={item.disabled}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.icon ? <i class={`pn-sb__icon ${item.icon}`} aria-hidden="true"></i> : null}
              {!this.isCollapsed ? <span class="pn-sb__label">{item.label}</span> : null}
              {item.badge && !this.isCollapsed ? <span class="pn-sb__badge">{item.badge}</span> : null}
            </button>
          )}
          {hasChildren && isExpanded && !this.isCollapsed ? (
            <ul class="pn-sb__submenu" role="group">
              {this.renderItems(item.children, level + 1)}
            </ul>
          ) : null}
        </li>
      );
    });

    return result;
  }

  render() {
    const classes = {
      'pn-sb': true,
      'pn-sb--collapsed': this.isCollapsed,
    };

    const style = {
      width: this.isCollapsed ? '64px' : this.width,
    };

    return (
      <aside class={classes} style={style} role="navigation" aria-label="Sidebar navigation">
        {this.header || this.collapsible ? (
          <div class="pn-sb__header">
            {!this.isCollapsed && this.header ? (
              <span class="pn-sb__header-text">{this.header}</span>
            ) : null}
            {this.collapsible ? (
              <button
                class="pn-sb__collapse-btn"
                onClick={() => this.toggleCollapse()}
                aria-label={this.isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  {this.isCollapsed
                    ? <path d="M9 18l6-6-6-6" />
                    : <path d="M15 18l-6-6 6-6" />
                  }
                </svg>
              </button>
            ) : null}
          </div>
        ) : null}
        <nav class="pn-sb__nav">
          <ul class="pn-sb__list" role="menubar">
            {this.renderItems(this.items)}
          </ul>
        </nav>
      </aside>
    );
  }
}
