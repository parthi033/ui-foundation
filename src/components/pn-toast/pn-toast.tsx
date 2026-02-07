import { Component, Prop, State, Event, EventEmitter, Element, Method, h } from '@stencil/core';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
  dismissible: boolean;
}

@Component({
  tag: 'pn-toast',
  styleUrl: 'pn-toast.scss',
  shadow: false,
})
export class PnToast {
  @Element() el!: HTMLElement;

  @Prop() position: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center' = 'top-right';
  @Prop() maxToasts: number = 5;

  @State() toasts: ToastItem[] = [];

  @Event() pnDismiss: EventEmitter<{ id: string }>;

  private timers: Map<string, ReturnType<typeof setTimeout>> = new Map();

  @Method()
  async addToast(options: {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    dismissible?: boolean;
  }) {
    const toast: ToastItem = {
      id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      message: options.message,
      type: options.type || 'info',
      duration: options.duration !== undefined ? options.duration : 5000,
      dismissible: options.dismissible !== undefined ? options.dismissible : true,
    };

    this.toasts = [...this.toasts.slice(-(this.maxToasts - 1)), toast];

    if (toast.duration > 0) {
      const timer = setTimeout(() => this.removeToast(toast.id), toast.duration);
      this.timers.set(toast.id, timer);
    }

    return toast.id;
  }

  @Method()
  async removeToast(id: string) {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.pnDismiss.emit({ id });
  }

  @Method()
  async clearAll() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
    this.toasts = [];
  }

  disconnectedCallback() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
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
    const classes = {
      'pn-tst': true,
      [`pn-tst--${this.position}`]: true,
    };

    return (
      <div class={classes} aria-live="polite" aria-relevant="additions removals">
        {this.toasts.map(toast => (
          <div
            class={`pn-tst__item pn-tst__item--${toast.type}`}
            key={toast.id}
            role="alert"
          >
            <svg class="pn-tst__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d={this.getIcon(toast.type)} />
            </svg>
            <span class="pn-tst__message">{toast.message}</span>
            {toast.dismissible ? (
              <button
                class="pn-tst__dismiss"
                aria-label="Dismiss"
                onClick={() => this.removeToast(toast.id)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}
