import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'pn-badge',
  styleUrl: 'pn-badge.scss',
  shadow: false,
})
export class PnBadge {
  @Prop() text: string;
  @Prop() type: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' = 'primary';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() variant: 'solid' | 'outline' | 'soft' = 'solid';
  @Prop() rounded: boolean = false;
  @Prop() dot: boolean = false;
  @Prop() icon: string;

  render() {
    const classes = {
      'pn-bdg': true,
      [`pn-bdg--${this.type}`]: true,
      [`pn-bdg--${this.size}`]: true,
      [`pn-bdg--${this.variant}`]: true,
      'pn-bdg--rounded': this.rounded,
      'pn-bdg--dot': this.dot,
    };

    return (
      <span class={classes}>
        {this.dot ? <span class="pn-bdg__dot" aria-hidden="true"></span> : null}
        {this.icon ? <i class={`pn-bdg__icon ${this.icon}`} aria-hidden="true"></i> : null}
        {this.text ? <span class="pn-bdg__text">{this.text}</span> : null}
        <slot></slot>
      </span>
    );
  }
}
