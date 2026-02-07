import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'pn-toggle',
  styleUrl: 'pn-toggle.scss',
  shadow: false,
})
export class PnToggle {
  @Prop() label: string;
  @Prop() name: string;
  @Prop({ mutable: true }) checked: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() toggleId: string;
  @Prop() labelPosition: 'left' | 'right' = 'right';

  @State() focused: boolean = false;

  @Event() pnChange: EventEmitter<{ checked: boolean }>;

  private get uid(): string {
    return this.toggleId || `pn-tg-${Math.random().toString(36).slice(2, 9)}`;
  }

  private handleChange(ev: Event) {
    const target = ev.target as HTMLInputElement;
    this.checked = target.checked;
    this.pnChange.emit({ checked: this.checked });
  }

  render() {
    const id = this.uid;
    const classes = {
      'pn-tg': true,
      'pn-tg--checked': this.checked,
      'pn-tg--disabled': this.disabled,
      'pn-tg--focused': this.focused,
      [`pn-tg--${this.size}`]: true,
      'pn-tg--label-left': this.labelPosition === 'left',
    };

    return (
      <label class={classes} htmlFor={id}>
        {this.labelPosition === 'left' && this.label ? (
          <span class="pn-tg__text">{this.label}</span>
        ) : null}
        <span class="pn-tg__control">
          <input
            type="checkbox"
            role="switch"
            id={id}
            name={this.name}
            class="pn-tg__input"
            checked={this.checked}
            disabled={this.disabled}
            aria-checked={this.checked ? 'true' : 'false'}
            onChange={(ev) => this.handleChange(ev)}
            onFocus={() => (this.focused = true)}
            onBlur={() => (this.focused = false)}
          />
          <span class="pn-tg__track" aria-hidden="true">
            <span class="pn-tg__thumb"></span>
          </span>
        </span>
        {this.labelPosition === 'right' && this.label ? (
          <span class="pn-tg__text">{this.label}</span>
        ) : null}
      </label>
    );
  }
}
