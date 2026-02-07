import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'pn-alert',
  styleUrl: 'pn-alert.scss',
  shadow: false,
})
export class PnAlert {
  @Prop() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Prop() alertTitle: string;
  @Prop() dismissible: boolean = false;
  @Prop() icon: boolean = true;

  @State() dismissed: boolean = false;

  @Event() pnDismiss: EventEmitter<void>;

  private dismiss() {
    this.dismissed = true;
    this.pnDismiss.emit();
  }

  private getIcon(type: string): string {
    switch (type) {
      case 'success': return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'error': return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'warning': return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z';
      default: return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }

  render() {
    if (this.dismissed) return null;

    const classes = {
      'pn-alt': true,
      [`pn-alt--${this.type}`]: true,
    };

    return (
      <div class={classes} role="alert">
        {this.icon ? (
          <svg class="pn-alt__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d={this.getIcon(this.type)} />
          </svg>
        ) : null}
        <div class="pn-alt__content">
          {this.alertTitle ? <div class="pn-alt__title">{this.alertTitle}</div> : null}
          <div class="pn-alt__message">
            <slot></slot>
          </div>
        </div>
        {this.dismissible ? (
          <button class="pn-alt__dismiss" aria-label="Dismiss alert" onClick={() => this.dismiss()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </div>
    );
  }
}
