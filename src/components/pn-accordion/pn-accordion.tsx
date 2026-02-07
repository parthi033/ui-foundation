import { Component, Prop, State, Event, EventEmitter, Element, Watch, h } from '@stencil/core';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  disabled?: boolean;
}

@Component({
  tag: 'pn-accordion',
  styleUrl: 'pn-accordion.scss',
  shadow: false,
})
export class PnAccordion {
  @Element() el!: HTMLElement;

  @Prop({ mutable: true }) items: AccordionItem[] = [];
  @Prop() multiple: boolean = false;
  @Prop() bordered: boolean = true;
  @Prop() compact: boolean = false;

  @State() openItems: Set<string> = new Set();

  @Event() pnToggle: EventEmitter<{ id: string; open: boolean }>;

  @Watch('items')
  onItemsChange() {
    // Reset if items change
  }

  private toggleItem(id: string) {
    const item = this.items.find(i => i.id === id);
    if (item && item.disabled) return;

    const newOpen = new Set(this.openItems);
    if (newOpen.has(id)) {
      newOpen.delete(id);
      this.pnToggle.emit({ id, open: false });
    } else {
      if (!this.multiple) {
        newOpen.clear();
      }
      newOpen.add(id);
      this.pnToggle.emit({ id, open: true });
    }
    this.openItems = newOpen;
  }

  private handleKeyDown(ev: KeyboardEvent, id: string) {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.toggleItem(id);
    }

    const buttons = Array.from(this.el.querySelectorAll<HTMLButtonElement>('.pn-acc__trigger'));
    const currentIndex = buttons.findIndex(btn => btn === ev.target);

    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      const next = (currentIndex + 1) % buttons.length;
      buttons[next].focus();
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      const prev = (currentIndex - 1 + buttons.length) % buttons.length;
      buttons[prev].focus();
    } else if (ev.key === 'Home') {
      ev.preventDefault();
      buttons[0].focus();
    } else if (ev.key === 'End') {
      ev.preventDefault();
      buttons[buttons.length - 1].focus();
    }
  }

  render() {
    const classes = {
      'pn-acc': true,
      'pn-acc--bordered': this.bordered,
      'pn-acc--compact': this.compact,
    };

    return (
      <div class={classes}>
        {this.items.map(item => {
          const isOpen = this.openItems.has(item.id);
          return (
            <div
              class={{
                'pn-acc__item': true,
                'pn-acc__item--open': isOpen,
                'pn-acc__item--disabled': !!item.disabled,
              }}
              key={item.id}
            >
              <h3 class="pn-acc__heading">
                <button
                  class="pn-acc__trigger"
                  aria-expanded={isOpen ? 'true' : 'false'}
                  aria-controls={`pn-acc-panel-${item.id}`}
                  id={`pn-acc-header-${item.id}`}
                  disabled={item.disabled}
                  onClick={() => this.toggleItem(item.id)}
                  onKeyDown={(ev) => this.handleKeyDown(ev, item.id)}
                >
                  <span class="pn-acc__title">{item.title}</span>
                  <svg class="pn-acc__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </h3>
              <div
                class="pn-acc__panel"
                id={`pn-acc-panel-${item.id}`}
                role="region"
                aria-labelledby={`pn-acc-header-${item.id}`}
                hidden={!isOpen}
              >
                <div class="pn-acc__content" innerHTML={item.content}></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
