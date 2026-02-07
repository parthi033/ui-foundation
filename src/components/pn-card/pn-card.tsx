import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'pn-card',
  styleUrl: 'pn-card.scss',
  shadow: false,
})
export class PnCard {
  @Prop() cardTitle: string;
  @Prop() subtitle: string;
  @Prop() image: string;
  @Prop() imageAlt: string = '';
  @Prop() variant: 'default' | 'outlined' | 'elevated' = 'default';
  @Prop() hoverable: boolean = false;
  @Prop() compact: boolean = false;
  @Prop() clickable: boolean = false;
  @Prop() href: string;

  render() {
    const classes = {
      'pn-crd': true,
      [`pn-crd--${this.variant}`]: true,
      'pn-crd--hoverable': this.hoverable,
      'pn-crd--compact': this.compact,
      'pn-crd--clickable': this.clickable || !!this.href,
    };

    const content = [
      this.image ? (
        <div class="pn-crd__media">
          <img class="pn-crd__image" src={this.image} alt={this.imageAlt} loading="lazy" />
        </div>
      ) : null,
      <div class="pn-crd__header">
        <slot name="header">
          {this.cardTitle ? <h3 class="pn-crd__title">{this.cardTitle}</h3> : null}
          {this.subtitle ? <p class="pn-crd__subtitle">{this.subtitle}</p> : null}
        </slot>
      </div>,
      <div class="pn-crd__body">
        <slot></slot>
      </div>,
      <div class="pn-crd__footer">
        <slot name="footer"></slot>
      </div>,
    ];

    if (this.href) {
      return (
        <a class={classes} href={this.href} tabindex={0}>
          {content}
        </a>
      );
    }

    return (
      <div class={classes} tabindex={this.clickable ? 0 : undefined}>
        {content}
      </div>
    );
  }
}
