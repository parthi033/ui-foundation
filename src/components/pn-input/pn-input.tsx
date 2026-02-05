import { Component, Prop, State, Element, Event, EventEmitter, h, Watch } from '@stencil/core';

@Component({
  tag: 'pn-input',
  styleUrl: 'pn-input.scss',
  shadow: false,
})
export class PnInput {
  @Element() el: HTMLElement;

  @Prop() label: string;
  @Prop() placeholder?: string = '';
  @Prop() type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' = 'text';
  @Prop() value?: string | number = '';
  @Prop() disabled?: boolean = false;
  @Prop() readonly?: boolean = false;
  @Prop() required?: boolean = false;
  @Prop() error?: boolean = false;
  @Prop() errorMessage?: string = '';
  @Prop() iconLeft?: string;
  @Prop() iconRight?: string;
  @Prop() inputId?: string;
  @Prop() name?: string;
  @Prop() maxlength?: number;
  @Prop() minlength?: number;
  @Prop() min?: number;
  @Prop() max?: number;
  @Prop() step?: number;
  @Prop() autocomplete?: string;

  @State() inputValue: string | number = '';
  @State() focused: boolean = false;

  @Event() pnInput: EventEmitter<{ value: string | number; name?: string }>;
  @Event() pnFocus: EventEmitter<FocusEvent>;
  @Event() pnBlur: EventEmitter<FocusEvent>;
  @Event() pnChange: EventEmitter<{ value: string | number; name?: string }>;

  private inputElement?: HTMLInputElement;
  private generatedId: string;

  constructor() {
    this.generatedId = `pn-input-${Math.random().toString(36).substr(2, 9)}`;
  }

  componentWillLoad() {
    this.inputValue = this.value;
  }

  @Watch('value')
  watchValue(newValue: string | number) {
    this.inputValue = newValue;
    if (this.inputElement) {
      this.inputElement.value = String(newValue);
    }
  }

  private handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const value = this.type === 'number' ? (input.value ? Number(input.value) : '') : input.value;
    
    this.inputValue = value;
    this.pnInput.emit({ 
      value: value, 
      name: this.name 
    });
  };

  private handleFocus = (event: FocusEvent) => {
    this.focused = true;
    this.pnFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.focused = false;
    this.pnBlur.emit(event);
  };

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const value = this.type === 'number' ? (input.value ? Number(input.value) : '') : input.value;
    
    this.pnChange.emit({ 
      value: value, 
      name: this.name 
    });
  };

  private getInputId(): string {
    return this.inputId || this.generatedId;
  }

  private getAriaDescribedBy(): string {
    const describedBy = [];
    if (this.error && this.errorMessage) {
      describedBy.push(`${this.getInputId()}-error`);
    }
    return describedBy.join(' ') || undefined;
  }

  render() {
    const inputId = this.getInputId();
    const hasLeftIcon = !!this.iconLeft;
    const hasRightIcon = !!this.iconRight;
    const ariaDescribedBy = this.getAriaDescribedBy();

    return (
      <div class={{
        'input-wrapper': true,
        'has-left-icon': hasLeftIcon,
        'has-right-icon': hasRightIcon,
        'error': this.error,
        'focused': this.focused,
        'disabled': this.disabled,
        'readonly': this.readonly
      }}>
        {this.label && (
          <label 
            htmlFor={inputId}
            class={{
              'input-label': true,
              'required': this.required
            }}
          >
            {this.label}
            {this.required && <span class="required-indicator" aria-label="required">*</span>}
          </label>
        )}
        
        <div class="input-container">
          {hasLeftIcon && (
            <div class="input-icon input-icon-left" aria-hidden="true">
              <i class={this.iconLeft}></i>
            </div>
          )}
          
          <input
            ref={(el) => this.inputElement = el}
            id={inputId}
            class="input-field"
            type={this.type}
            name={this.name}
            placeholder={this.placeholder}
            value={String(this.inputValue)}
            disabled={this.disabled}
            readonly={this.readonly}
            required={this.required}
            maxlength={this.maxlength}
            minlength={this.minlength}
            min={this.min}
            max={this.max}
            step={this.step}
            autocomplete={this.autocomplete}
            aria-invalid={this.error ? 'true' : 'false'}
            aria-describedby={ariaDescribedBy}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
          />
          
          {hasRightIcon && (
            <div class="input-icon input-icon-right" aria-hidden="true">
              <i class={this.iconRight}></i>
            </div>
          )}
        </div>
        
        {this.error && this.errorMessage && (
          <div 
            id={`${inputId}-error`}
            class="error-message"
            role="alert"
            aria-live="polite"
          >
            {this.errorMessage}
          </div>
        )}
      </div>
    );
  }
}