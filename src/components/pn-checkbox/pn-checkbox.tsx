import { Component, Prop, State, Event, EventEmitter, Element, h } from '@stencil/core';

@Component({
  tag: 'pn-checkbox',
  styleUrl: 'pn-checkbox.scss',
  shadow: false,
})
export class PnCheckbox {
  @Element() el!: HTMLElement;

  @Prop() label: string;
  @Prop() name: string;
  @Prop({ mutable: true }) checked: boolean = false;
  @Prop() indeterminate: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() error: boolean = false;
  @Prop() errorMessage: string;
  @Prop() value: string = '';
  @Prop() checkboxId: string;

  @State() focused: boolean = false;

  @Event() pnChange: EventEmitter<{ checked: boolean; value: string }>;

  private inputEl!: HTMLInputElement;

  private get uid(): string {
    return this.checkboxId || `pn-cb-${Math.random().toString(36).slice(2, 9)}`;
  }

  componentDidLoad() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.indeterminate;
    }
  }

  componentDidUpdate() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.indeterminate && !this.checked;
    }
  }

  private handleChange(ev: Event) {
    const target = ev.target as HTMLInputElement;
    this.checked = target.checked;
    this.pnChange.emit({ checked: this.checked, value: this.value });
  }

  render() {
    const id = this.uid;
    const classes = {
      'pn-cb': true,
      'pn-cb--checked': this.checked,
      'pn-cb--indeterminate': this.indeterminate && !this.checked,
      'pn-cb--disabled': this.disabled,
      'pn-cb--error': this.error,
      'pn-cb--focused': this.focused,
    };

    return (
      <div class={classes}>
        <label class="pn-cb__label" htmlFor={id}>
          <span class="pn-cb__control">
            <input
              ref={(el) => (this.inputEl = el as HTMLInputElement)}
              type="checkbox"
              id={id}
              name={this.name}
              class="pn-cb__input"
              checked={this.checked}
              disabled={this.disabled}
              required={this.required}
              value={this.value}
              aria-invalid={this.error ? 'true' : undefined}
              aria-describedby={this.error && this.errorMessage ? `${id}-error` : undefined}
              onChange={(ev) => this.handleChange(ev)}
              onFocus={() => (this.focused = true)}
              onBlur={() => (this.focused = false)}
            />
            <span class="pn-cb__box" aria-hidden="true">
              {this.checked ? (
                <svg class="pn-cb__icon" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              ) : this.indeterminate ? (
                <svg class="pn-cb__icon" viewBox="0 0 16 16" fill="none">
                  <path d="M4 8H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
              ) : null}
            </span>
          </span>
          {this.label ? <span class="pn-cb__text">{this.label}</span> : null}
          {this.required ? <span class="pn-cb__required" aria-hidden="true">*</span> : null}
        </label>
        {this.error && this.errorMessage ? (
          <div class="pn-cb__error" id={`${id}-error`} role="alert">
            {this.errorMessage}
          </div>
        ) : null}
      </div>
    );
  }
}
