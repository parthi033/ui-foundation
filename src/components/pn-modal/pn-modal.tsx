import { Component, Prop, State, Event, EventEmitter, Element, Listen, Method, h } from '@stencil/core';

@Component({
  tag: 'pn-modal',
  styleUrl: 'pn-modal.scss',
  shadow: false,
})
export class PnModal {
  @Element() el!: HTMLElement;

  @Prop() modalTitle: string;
  @Prop() size: 'small' | 'medium' | 'large' | 'fullscreen' = 'medium';
  @Prop({ mutable: true, reflect: true }) open: boolean = false;
  @Prop() closeOnOverlay: boolean = true;
  @Prop() closeOnEsc: boolean = true;
  @Prop() showClose: boolean = true;
  @Prop() modalId: string;

  @State() isAnimating: boolean = false;

  @Event() pnOpen: EventEmitter<void>;
  @Event() pnClose: EventEmitter<void>;

  private previousFocus: HTMLElement | null = null;
  private focusableSelector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  private get uid(): string {
    return this.modalId || `pn-mdl-${Math.random().toString(36).slice(2, 9)}`;
  }

  @Listen('keydown', { target: 'document' })
  onKeyDown(ev: KeyboardEvent) {
    if (!this.open) return;
    if (ev.key === 'Escape' && this.closeOnEsc) {
      this.close();
    }
    if (ev.key === 'Tab') {
      this.trapFocus(ev);
    }
  }

  @Method()
  async show() {
    this.previousFocus = document.activeElement as HTMLElement;
    this.open = true;
    this.isAnimating = true;
    this.pnOpen.emit();
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      this.isAnimating = false;
      this.focusFirst();
    });
  }

  @Method()
  async close() {
    this.open = false;
    this.pnClose.emit();
    document.body.style.overflow = '';
    if (this.previousFocus) {
      this.previousFocus.focus();
      this.previousFocus = null;
    }
  }

  private focusFirst() {
    const dialog = this.el.querySelector('.pn-mdl__dialog') as HTMLElement;
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>(this.focusableSelector);
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      dialog.focus();
    }
  }

  private trapFocus(ev: KeyboardEvent) {
    const dialog = this.el.querySelector('.pn-mdl__dialog') as HTMLElement;
    if (!dialog) return;
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(this.focusableSelector));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (ev.shiftKey) {
      if (document.activeElement === first) {
        ev.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        ev.preventDefault();
        first.focus();
      }
    }
  }

  private handleOverlayClick(ev: MouseEvent) {
    if (this.closeOnOverlay && ev.target === ev.currentTarget) {
      this.close();
    }
  }

  componentDidUpdate() {
    if (this.open) {
      this.previousFocus = this.previousFocus || document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => this.focusFirst());
    }
  }

  render() {
    if (!this.open) return null;

    const id = this.uid;
    const classes = {
      'pn-mdl': true,
      [`pn-mdl--${this.size}`]: true,
    };

    return (
      <div class="pn-mdl__overlay" onClick={(ev) => this.handleOverlayClick(ev)}>
        <div
          class={classes}
          role="dialog"
          aria-modal="true"
          aria-labelledby={this.modalTitle ? `${id}-title` : undefined}
          tabindex={-1}
        >
          <div class="pn-mdl__dialog">
            {(this.modalTitle || this.showClose) ? (
              <div class="pn-mdl__header">
                {this.modalTitle ? (
                  <h2 class="pn-mdl__title" id={`${id}-title`}>{this.modalTitle}</h2>
                ) : <span></span>}
                {this.showClose ? (
                  <button
                    class="pn-mdl__close"
                    aria-label="Close dialog"
                    onClick={() => this.close()}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                ) : null}
              </div>
            ) : null}
            <div class="pn-mdl__body">
              <slot></slot>
            </div>
            <div class="pn-mdl__footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
