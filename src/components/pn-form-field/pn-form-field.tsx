import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'pn-form-field',
  styleUrl: 'pn-form-field.scss',
  shadow: false,
})
export class PnFormField {
  @Prop() label: string;
  @Prop() required: boolean = false;
  @Prop() error: boolean = false;
  @Prop() errorMessage: string;
  @Prop() hint: string;
  @Prop() fieldId: string;
  @Prop() inline: boolean = false;

  private get uid(): string {
    return this.fieldId || `pn-ff-${Math.random().toString(36).slice(2, 9)}`;
  }

  render() {
    const id = this.uid;
    const classes = {
      'pn-ff': true,
      'pn-ff--error': this.error,
      'pn-ff--inline': this.inline,
    };

    return (
      <div class={classes}>
        {this.label ? (
          <label class="pn-ff__label" htmlFor={id}>
            {this.label}
            {this.required ? <span class="pn-ff__required" aria-hidden="true">*</span> : null}
          </label>
        ) : null}
        <div class="pn-ff__control">
          <slot></slot>
        </div>
        {this.hint && !this.error ? (
          <div class="pn-ff__hint" id={`${id}-hint`}>{this.hint}</div>
        ) : null}
        {this.error && this.errorMessage ? (
          <div class="pn-ff__error" id={`${id}-error`} role="alert">{this.errorMessage}</div>
        ) : null}
      </div>
    );
  }
}
