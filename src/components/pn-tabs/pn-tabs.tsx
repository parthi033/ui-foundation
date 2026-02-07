import { Component, Prop, State, Event, EventEmitter, Element, Watch, h } from '@stencil/core';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  tag: 'pn-tabs',
  styleUrl: 'pn-tabs.scss',
  shadow: false,
})
export class PnTabs {
  @Element() el!: HTMLElement;

  @Prop({ mutable: true }) tabs: TabItem[] = [];
  @Prop({ mutable: true }) activeTab: string = '';
  @Prop() variant: 'default' | 'pills' | 'underline' = 'default';
  @Prop() fullWidth: boolean = false;
  @Prop() compact: boolean = false;

  @State() internalActive: string = '';

  @Event() pnTabChange: EventEmitter<{ tabId: string }>;

  @Watch('activeTab')
  onActiveTabChange(val: string) {
    this.internalActive = val;
  }

  componentWillLoad() {
    if (this.activeTab) {
      this.internalActive = this.activeTab;
    } else if (this.tabs.length > 0) {
      this.internalActive = this.tabs[0].id;
    }
  }

  private selectTab(tabId: string) {
    const tab = this.tabs.find(t => t.id === tabId);
    if (tab && tab.disabled) return;
    this.internalActive = tabId;
    this.activeTab = tabId;
    this.pnTabChange.emit({ tabId });
  }

  private handleKeyDown(ev: KeyboardEvent) {
    const enabledTabs = this.tabs.filter(t => !t.disabled);
    const currentIndex = enabledTabs.findIndex(t => t.id === this.internalActive);
    let newIndex = currentIndex;

    if (ev.key === 'ArrowRight' || ev.key === 'ArrowDown') {
      ev.preventDefault();
      newIndex = (currentIndex + 1) % enabledTabs.length;
    } else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowUp') {
      ev.preventDefault();
      newIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
    } else if (ev.key === 'Home') {
      ev.preventDefault();
      newIndex = 0;
    } else if (ev.key === 'End') {
      ev.preventDefault();
      newIndex = enabledTabs.length - 1;
    } else {
      return;
    }

    this.selectTab(enabledTabs[newIndex].id);
    const buttons = this.el.querySelectorAll<HTMLButtonElement>('.pn-tbs__tab');
    const targetIndex = this.tabs.findIndex(t => t.id === enabledTabs[newIndex].id);
    if (buttons[targetIndex]) {
      buttons[targetIndex].focus();
    }
  }

  render() {
    const classes = {
      'pn-tbs': true,
      [`pn-tbs--${this.variant}`]: true,
      'pn-tbs--full-width': this.fullWidth,
      'pn-tbs--compact': this.compact,
    };

    return (
      <div class={classes}>
        <div class="pn-tbs__list" role="tablist">
          {this.tabs.map(tab => {
            const isActive = this.internalActive === tab.id;
            return (
              <button
                class={{
                  'pn-tbs__tab': true,
                  'pn-tbs__tab--active': isActive,
                  'pn-tbs__tab--disabled': !!tab.disabled,
                }}
                key={tab.id}
                role="tab"
                aria-selected={isActive ? 'true' : 'false'}
                aria-controls={`pn-tbs-panel-${tab.id}`}
                id={`pn-tbs-tab-${tab.id}`}
                tabindex={isActive ? 0 : -1}
                disabled={tab.disabled}
                onClick={() => this.selectTab(tab.id)}
                onKeyDown={(ev) => this.handleKeyDown(ev)}
              >
                {tab.icon ? <i class={`pn-tbs__icon ${tab.icon}`}></i> : null}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div class="pn-tbs__panels">
          {this.tabs.map(tab => (
            <div
              class="pn-tbs__panel"
              key={tab.id}
              id={`pn-tbs-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`pn-tbs-tab-${tab.id}`}
              hidden={this.internalActive !== tab.id}
            >
              <slot name={tab.id}></slot>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
