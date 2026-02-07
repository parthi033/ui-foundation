import { Component, Prop, State, Event, EventEmitter, Element, Watch, h } from '@stencil/core';

@Component({
  tag: 'pn-radio',
  styleUrl: 'pn-radio.scss',
  shadow: false,
})
export class PnRadio {
  @Element() el!: HTMLElement;

  @Prop() label: string;
  @Prop() name: string;
  @Prop({ mutable: true }) value: string = '';
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() error: boolean = false;
  @Prop() errorMessage: string;
  @Prop() inline: boolean = false;
  @Prop({ mutable: true }) options: Array<{ label: string; value: string; disabled?: boolean }> = [];

  @State() focusedValue: string | null = null;

  @Event() pnChange: EventEmitter<{ value: string }>;

  private get uid(): string {
    return this.name || `pn-rb-${Math.random().toString(36).slice(2, 9)}`;
  }

  @Watch('value')
  onValueChange() {
    // Value changed externally
  }

  private handleChange(optionValue: string) {
    if (this.disabled) return;
    this.value = optionValue;
    this.pnChange.emit({ value: this.value });
  }

  private handleKeyDown(ev: KeyboardEvent, index: number) {
    let nextIndex = index;
    const enabledOptions = this.options.filter(o => !o.disabled);
    const currentEnabledIndex = enabledOptions.findIndex(o => o.value === this.options[index].value);

    if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') {
      ev.preventDefault();
      const nextEnabledIndex = (currentEnabledIndex + 1) % enabledOptions.length;
      nextIndex = this.options.findIndex(o => o.value === enabledOptions[nextEnabledIndex].value);
    } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') {
      ev.preventDefault();
      const prevEnabledIndex = (currentEnabledIndex - 1 + enabledOptions.length) % enabledOptions.length;
      nextIndex = this.options.findIndex(o => o.value === enabledOptions[prevEnabledIndex].value);
    } else {
      return;
    }

    this.handleChange(this.options[nextIndex].value);
    const radios = this.el.querySelectorAll<HTMLInputElement>('.pn-rb__input');
    if (radios[nextIndex]) {
      radios[nextIndex].focus();
    }
  }

  render() {
    const groupId = this.uid;
    const classes = {
      'pn-rb': true,
      'pn-rb--inline': this.inline,
      'pn-rb--disabled': this.disabled,
      'pn-rb--error': this.error,
    };

    return (
      <div class={classes} role="radiogroup" aria-labelledby={`${groupId}-label`}>
        {this.label ? (
          <div class="pn-rb__legend" id={`${groupId}-label`}>
            {this.label}
            {this.required ? <span class="pn-rb__required" aria-hidden="true">*</span> : null}
          </div>
        ) : null}
        <div class="pn-rb__group">
          {this.options.map((option, index) => {
            const optionId = `${groupId}-${option.value}`;
            const isDisabled = this.disabled || option.disabled;
            const isChecked = this.value === option.value;
            return (
              <label
                class={{
                  'pn-rb__option': true,
                  'pn-rb__option--checked': isChecked,
                  'pn-rb__option--disabled': isDisabled,
                  'pn-rb__option--focused': this.focusedValue === option.value,
                }}
                htmlFor={optionId}
              >
                <span class="pn-rb__control">
                  <input
                    type="radio"
                    id={optionId}
                    name={groupId}
                    class="pn-rb__input"
                    value={option.value}
                    checked={isChecked}
                    disabled={isDisabled}
                    required={this.required && index === 0}
                    aria-invalid={this.error ? 'true' : undefined}
                    onChange={() => this.handleChange(option.value)}
                    onKeyDown={(ev) => this.handleKeyDown(ev, index)}
                    onFocus={() => (this.focusedValue = option.value)}
                    onBlur={() => (this.focusedValue = null)}
                  />
                  <span class="pn-rb__circle" aria-hidden="true">
                    {isChecked ? <span class="pn-rb__dot"></span> : null}
                  </span>
                </span>
                <span class="pn-rb__text">{option.label}</span>
              </label>
            );
          })}
        </div>
        {this.error && this.errorMessage ? (
          <div class="pn-rb__error" role="alert">{this.errorMessage}</div>
        ) : null}
      </div>
    );
  }
}
