import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'pn-textarea',
  styleUrl: 'pn-textarea.scss',
  shadow: false,
})
export class PnTextarea {
  @Prop() label: string;
  @Prop() name: string;
  @Prop() placeholder: string;
  @Prop({ mutable: true }) value: string = '';
  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() required: boolean = false;
  @Prop() error: boolean = false;
  @Prop() errorMessage: string;
  @Prop() rows: number = 4;
  @Prop() maxlength: number;
  @Prop() resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';
  @Prop() showCount: boolean = false;
  @Prop() textareaId: string;

  @State() focused: boolean = false;
  @State() charCount: number = 0;

  @Event() pnInput: EventEmitter<{ value: string }>;
  @Event() pnChange: EventEmitter<{ value: string }>;
  @Event() pnFocus: EventEmitter<void>;
  @Event() pnBlur: EventEmitter<void>;

  private get uid(): string {
    return this.textareaId || `pn-ta-${Math.random().toString(36).slice(2, 9)}`;
  }

  componentWillLoad() {
    this.charCount = (this.value || '').length;
  }

  private handleInput(ev: Event) {
    const target = ev.target as HTMLTextAreaElement;
    this.value = target.value;
    this.charCount = target.value.length;
    this.pnInput.emit({ value: this.value });
  }

  private handleChange(ev: Event) {
    const target = ev.target as HTMLTextAreaElement;
    this.value = target.value;
    this.pnChange.emit({ value: this.value });
  }

  render() {
    const id = this.uid;
    const classes = {
      'pn-ta': true,
      'pn-ta--focused': this.focused,
      'pn-ta--disabled': this.disabled,
      'pn-ta--readonly': this.readonly,
      'pn-ta--error': this.error,
      'pn-ta--has-value': !!this.value,
    };

    return (
      <div class={classes}>
        {this.label ? (
          <label class="pn-ta__label" htmlFor={id}>
            {this.label}
            {this.required ? <span class="pn-ta__required" aria-hidden="true">*</span> : null}
          </label>
        ) : null}
        <textarea
          id={id}
          name={this.name}
          class="pn-ta__field"
          placeholder={this.placeholder}
          value={this.value}
          disabled={this.disabled}
          readOnly={this.readonly}
          required={this.required}
          rows={this.rows}
          maxLength={this.maxlength > 0 ? this.maxlength : undefined}
          style={{ resize: this.resize }}
          aria-invalid={this.error ? 'true' : undefined}
          aria-describedby={this.error && this.errorMessage ? `${id}-error` : undefined}
          onInput={(ev) => this.handleInput(ev)}
          onChange={(ev) => this.handleChange(ev)}
          onFocus={() => { this.focused = true; this.pnFocus.emit(); }}
          onBlur={() => { this.focused = false; this.pnBlur.emit(); }}
        ></textarea>
        <div class="pn-ta__footer">
          {this.error && this.errorMessage ? (
            <div class="pn-ta__error" id={`${id}-error`} role="alert">{this.errorMessage}</div>
          ) : <span></span>}
          {this.showCount ? (
            <div class="pn-ta__count">
              {this.charCount}{this.maxlength > 0 ? ` / ${this.maxlength}` : ''}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
