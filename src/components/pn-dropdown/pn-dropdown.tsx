import { Component, Prop, State, Element, Event, EventEmitter, Watch, Listen, h } from '@stencil/core';

export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
  icon?: string;
}

@Component({
  tag: 'pn-dropdown',
  styleUrl: 'pn-dropdown.scss',
  shadow: false,
})
export class PnDropdown {
  @Element() el!: HTMLElement;

  @Prop() label: string;
  @Prop() placeholder: string = 'Select an option';
  @Prop({ mutable: true }) options: DropdownOption[] = [];
  @Prop({ mutable: true }) value: string = '';
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() error: boolean = false;
  @Prop() errorMessage: string = '';
  @Prop() typeahead: boolean = false;
  @Prop() name: string;
  @Prop() dropdownId: string;
  @Prop() clearable: boolean = false;
  @Prop() noResultsText: string = 'No results found';
  @Prop() iconLeft: string;

  @State() isOpen: boolean = false;
  @State() selectedOption: DropdownOption | null = null;
  @State() filterText: string = '';
  @State() highlightedIndex: number = -1;
  @State() focused: boolean = false;

  @Event() pnChange: EventEmitter<{ value: string; label: string; name?: string }>;
  @Event() pnFocus: EventEmitter<void>;
  @Event() pnBlur: EventEmitter<void>;

  private generatedId: string = 'pn-dd-' + Math.random().toString(36).substring(2, 9);
  private inputRef: HTMLInputElement;
  private listboxRef: HTMLUListElement;
  private triggerRef: HTMLButtonElement;

  componentWillLoad() {
    this.syncSelection();
  }

  @Watch('value')
  onValueChange() {
    this.syncSelection();
  }

  @Watch('options')
  onOptionsChange() {
    this.syncSelection();
  }

  @Listen('click', { target: 'document' })
  onDocumentClick(event: Event) {
    if (!this.el.contains(event.target as Node)) {
      this.close(false);
    }
  }

  private syncSelection() {
    if (this.value && this.options) {
      const match = this.options.find(o => o.value === this.value);
      if (match) {
        this.selectedOption = match;
        this.filterText = match.label;
        return;
      }
    }
    if (!this.value) {
      this.selectedOption = null;
      this.filterText = '';
    }
  }

  private get uid(): string {
    return this.dropdownId || this.generatedId;
  }

  private getFiltered(): DropdownOption[] {
    if (!this.options) return [];
    if (!this.typeahead || !this.filterText) return this.options;
    if (this.selectedOption && this.filterText === this.selectedOption.label) return this.options;
    const q = this.filterText.toLowerCase();
    return this.options.filter(o => o.label.toLowerCase().includes(q));
  }

  private getGrouped(): { group: string | null; items: DropdownOption[] }[] {
    const filtered = this.getFiltered();
    const map = new Map<string | null, DropdownOption[]>();
    for (const opt of filtered) {
      const key = opt.group || null;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(opt);
    }
    return Array.from(map.entries()).map(([group, items]) => ({ group, items }));
  }

  private open() {
    if (this.disabled) return;
    this.isOpen = true;
    this.highlightedIndex = -1;
    if (this.typeahead && this.inputRef) {
      setTimeout(() => { if (this.inputRef) this.inputRef.select(); }, 0);
    }
  }

  private close(restore: boolean = true) {
    this.isOpen = false;
    this.highlightedIndex = -1;
    if (restore && this.typeahead) {
      this.filterText = this.selectedOption ? this.selectedOption.label : '';
    }
  }

  private toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private select(option: DropdownOption) {
    if (option.disabled) return;
    this.selectedOption = option;
    this.filterText = option.label;
    this.isOpen = false;
    this.highlightedIndex = -1;
    this.pnChange.emit({ value: option.value, label: option.label, name: this.name });
    if (this.typeahead && this.inputRef) {
      this.inputRef.focus();
    } else if (this.triggerRef) {
      this.triggerRef.focus();
    }
  }

  private clearValue(e: Event) {
    e.stopPropagation();
    this.selectedOption = null;
    this.filterText = '';
    this.pnChange.emit({ value: '', label: '', name: this.name });
    if (this.typeahead && this.inputRef) {
      this.inputRef.focus();
    } else if (this.triggerRef) {
      this.triggerRef.focus();
    }
  }

  private handleInput(e: Event) {
    this.filterText = (e.target as HTMLInputElement).value;
    this.highlightedIndex = -1;
    if (!this.isOpen) {
      this.isOpen = true;
    }
  }

  private handleInputFocus() {
    this.focused = true;
    this.pnFocus.emit();
    this.open();
  }

  private handleInputBlur() {
    this.focused = false;
    this.pnBlur.emit();
  }

  private handleTriggerFocus() {
    this.focused = true;
    this.pnFocus.emit();
  }

  private handleTriggerBlur() {
    this.focused = false;
    this.pnBlur.emit();
  }

  private handleKeyDown(e: KeyboardEvent) {
    const list = this.getFiltered();
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this.isOpen) {
          this.open();
          break;
        }
        this.moveHighlight(list, 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!this.isOpen) {
          this.open();
          break;
        }
        this.moveHighlight(list, -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (this.isOpen && this.highlightedIndex >= 0 && list[this.highlightedIndex]) {
          this.select(list[this.highlightedIndex]);
        } else if (!this.isOpen) {
          this.open();
        }
        break;
      case ' ':
        if (!this.typeahead) {
          e.preventDefault();
          if (this.isOpen && this.highlightedIndex >= 0 && list[this.highlightedIndex]) {
            this.select(list[this.highlightedIndex]);
          } else {
            this.toggle();
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        this.close();
        break;
      case 'Tab':
        this.close();
        break;
      case 'Home':
        if (this.isOpen) {
          e.preventDefault();
          const first = list.findIndex(o => !o.disabled);
          if (first >= 0) {
            this.highlightedIndex = first;
            this.scrollToActive();
          }
        }
        break;
      case 'End':
        if (this.isOpen) {
          e.preventDefault();
          for (let i = list.length - 1; i >= 0; i--) {
            if (!list[i].disabled) {
              this.highlightedIndex = i;
              this.scrollToActive();
              break;
            }
          }
        }
        break;
    }
  }

  private moveHighlight(list: DropdownOption[], dir: number) {
    let idx = this.highlightedIndex;
    const len = list.length;
    if (len === 0) return;
    for (let i = 0; i < len; i++) {
      idx = (idx + dir + len) % len;
      if (!list[idx].disabled) {
        this.highlightedIndex = idx;
        this.scrollToActive();
        return;
      }
    }
  }

  private scrollToActive() {
    requestAnimationFrame(() => {
      if (!this.listboxRef) return;
      const active = this.listboxRef.querySelector('[data-highlighted="true"]') as HTMLElement;
      if (active) {
        active.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  private renderChevron() {
    return (
      <svg
        class={{ 'pn-dd__chevron': true, 'pn-dd__chevron--up': this.isOpen }}
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 1.5L6 6.5L11 1.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }

  private renderOption(option: DropdownOption, idx: number) {
    const isSelected = this.selectedOption ? this.selectedOption.value === option.value : false;
    const isHighlighted = idx === this.highlightedIndex;

    return (
      <li
        id={this.uid + '-opt-' + idx}
        role="option"
        aria-selected={isSelected ? 'true' : 'false'}
        aria-disabled={option.disabled ? 'true' : undefined}
        data-highlighted={isHighlighted ? 'true' : 'false'}
        class={{
          'pn-dd__option': true,
          'pn-dd__option--selected': isSelected,
          'pn-dd__option--highlighted': isHighlighted,
          'pn-dd__option--disabled': !!option.disabled,
        }}
        onClick={() => this.select(option)}
        onMouseEnter={() => {
          if (!option.disabled) {
            this.highlightedIndex = idx;
          }
        }}
      >
        {option.icon ? (
          <i class={'pn-dd__option-icon ' + option.icon} aria-hidden="true"></i>
        ) : null}
        <span class="pn-dd__option-label">{option.label}</span>
        {isSelected ? (
          <svg
            class="pn-dd__option-check"
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8l3.5 3.5L13 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ) : null}
      </li>
    );
  }

  render() {
    const id = this.uid;
    const filtered = this.getFiltered();
    const grouped = this.getGrouped();
    const hasGroups = grouped.some(g => g.group !== null);
    const activeDesc = this.highlightedIndex >= 0 ? id + '-opt-' + this.highlightedIndex : undefined;
    let flatIdx = 0;

    return (
      <div
        class={{
          'pn-dd': true,
          'pn-dd--open': this.isOpen,
          'pn-dd--disabled': this.disabled,
          'pn-dd--error': this.error,
          'pn-dd--focused': this.focused,
          'pn-dd--typeahead': this.typeahead,
          'pn-dd--has-value': !!this.selectedOption,
        }}
      >
        {this.label ? (
          <label
            class={{ 'pn-dd__label': true, 'required': this.required }}
            htmlFor={this.typeahead ? id + '-input' : undefined}
            id={id + '-label'}
          >
            {this.label}
            {this.required ? (
              <span class="pn-dd__required" aria-hidden="true"> *</span>
            ) : null}
          </label>
        ) : null}

        <div class="pn-dd__control">
          {this.iconLeft ? (
            <span class="pn-dd__icon-left" aria-hidden="true">
              <i class={this.iconLeft}></i>
            </span>
          ) : null}

          {this.typeahead ? (
            <input
              id={id + '-input'}
              class="pn-dd__input"
              type="text"
              role="combobox"
              aria-expanded={this.isOpen ? 'true' : 'false'}
              aria-controls={id + '-listbox'}
              aria-activedescendant={activeDesc}
              aria-autocomplete="list"
              aria-haspopup="listbox"
              aria-labelledby={this.label ? id + '-label' : undefined}
              aria-invalid={this.error ? 'true' : undefined}
              aria-describedby={this.error && this.errorMessage ? id + '-error' : undefined}
              aria-required={this.required ? 'true' : undefined}
              placeholder={this.placeholder}
              value={this.filterText}
              disabled={this.disabled}
              autoComplete="off"
              ref={(el) => (this.inputRef = el as HTMLInputElement)}
              onInput={(e: Event) => this.handleInput(e)}
              onFocus={() => this.handleInputFocus()}
              onBlur={() => this.handleInputBlur()}
              onKeyDown={(e: KeyboardEvent) => this.handleKeyDown(e)}
            />
          ) : (
            <button
              class="pn-dd__trigger"
              type="button"
              role="combobox"
              aria-expanded={this.isOpen ? 'true' : 'false'}
              aria-controls={id + '-listbox'}
              aria-activedescendant={activeDesc}
              aria-haspopup="listbox"
              aria-labelledby={this.label ? id + '-label' : undefined}
              aria-invalid={this.error ? 'true' : undefined}
              aria-describedby={this.error && this.errorMessage ? id + '-error' : undefined}
              aria-required={this.required ? 'true' : undefined}
              disabled={this.disabled}
              ref={(el) => (this.triggerRef = el as HTMLButtonElement)}
              onClick={() => this.toggle()}
              onFocus={() => this.handleTriggerFocus()}
              onBlur={() => this.handleTriggerBlur()}
              onKeyDown={(e: KeyboardEvent) => this.handleKeyDown(e)}
            >
              <span class={{ 'pn-dd__value': true, 'pn-dd__value--placeholder': !this.selectedOption }}>
                {this.selectedOption ? this.selectedOption.label : this.placeholder}
              </span>
            </button>
          )}

          {this.clearable && this.selectedOption && !this.disabled ? (
            <button
              class="pn-dd__clear"
              onClick={(e: Event) => this.clearValue(e)}
              aria-label="Clear selection"
              tabindex={-1}
              type="button"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          ) : null}

          <span
            class="pn-dd__chevron-wrap"
            aria-hidden="true"
            onClick={this.typeahead ? () => this.toggle() : undefined}
          >
            {this.renderChevron()}
          </span>
        </div>

        {this.isOpen ? (
          <div class="pn-dd__panel">
            {filtered.length === 0 ? (
              <div class="pn-dd__no-results" role="status" aria-live="polite">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>{this.noResultsText}</span>
              </div>
            ) : (
              <ul
                class="pn-dd__listbox"
                role="listbox"
                id={id + '-listbox'}
                aria-label={this.label || 'Options'}
                ref={(el) => (this.listboxRef = el as HTMLUListElement)}
                tabindex={-1}
              >
                {hasGroups
                  ? grouped.map((g) => (
                      <li role="presentation" class="pn-dd__group">
                        {g.group ? (
                          <div class="pn-dd__group-label" role="presentation">{g.group}</div>
                        ) : null}
                        <ul role="group" class="pn-dd__group-list" aria-label={g.group || undefined}>
                          {g.items.map((opt) => {
                            const i = flatIdx++;
                            return this.renderOption(opt, i);
                          })}
                        </ul>
                      </li>
                    ))
                  : filtered.map((opt, i) => this.renderOption(opt, i))}
              </ul>
            )}
            <div class="pn-dd__status" role="status" aria-live="polite" aria-atomic="true">
              {filtered.length} option{filtered.length !== 1 ? 's' : ''} available
            </div>
          </div>
        ) : null}

        {this.error && this.errorMessage ? (
          <div class="pn-dd__error" id={id + '-error'} role="alert">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1L1 14h14L8 1z" stroke="currentColor" stroke-width="1.5" fill="none" />
              <path d="M8 6v3M8 11v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <span>{this.errorMessage}</span>
          </div>
        ) : null}
      </div>
    );
  }
}
