import { Component, Prop, State, Element, h } from '@stencil/core';

@Component({
  tag: 'pn-tooltip',
  styleUrl: 'pn-tooltip.scss',
  shadow: false,
})
export class PnTooltip {
  @Element() el!: HTMLElement;

  @Prop() text: string;
  @Prop() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Prop() delay: number = 200;
  @Prop() tooltipId: string;

  @State() visible: boolean = false;

  private showTimer: ReturnType<typeof setTimeout>;
  private hideTimer: ReturnType<typeof setTimeout>;

  private get uid(): string {
    return this.tooltipId || `pn-tt-${Math.random().toString(36).slice(2, 9)}`;
  }

  private showTooltip() {
    clearTimeout(this.hideTimer);
    this.showTimer = setTimeout(() => {
      this.visible = true;
    }, this.delay);
  }

  private hideTooltip() {
    clearTimeout(this.showTimer);
    this.hideTimer = setTimeout(() => {
      this.visible = false;
    }, 100);
  }

  disconnectedCallback() {
    clearTimeout(this.showTimer);
    clearTimeout(this.hideTimer);
  }

  render() {
    const id = this.uid;
    const classes = {
      'pn-tt': true,
      'pn-tt--visible': this.visible,
      [`pn-tt--${this.position}`]: true,
    };

    return (
      <span
        class={classes}
        onMouseEnter={() => this.showTooltip()}
        onMouseLeave={() => this.hideTooltip()}
        onFocus={() => this.showTooltip()}
        onBlur={() => this.hideTooltip()}
      >
        <span class="pn-tt__trigger" aria-describedby={this.visible ? id : undefined}>
          <slot></slot>
        </span>
        {this.text ? (
          <span
            class="pn-tt__content"
            id={id}
            role="tooltip"
            aria-hidden={!this.visible ? 'true' : undefined}
          >
            {this.text}
          </span>
        ) : null}
      </span>
    );
  }
}
