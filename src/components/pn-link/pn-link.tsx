import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'pn-link',
  styleUrl: 'pn-link.scss',
  shadow: false,
})
export class PnLink {
  @Prop() text: string;
  @Prop() href: string;
  @Prop() newTab?: boolean = false;

  render() {
    return (
      <a 
        href={this.href}
        class={{
          'link': true,
          'link--external': this.newTab
        }}
        target={this.newTab ? '_blank' : undefined}
        rel={this.newTab ? 'noopener noreferrer' : undefined}
      >
        <span class="link__text">{this.text}</span>
        {this.newTab && (
          <i class="link__icon fas fa-external-link-alt" aria-hidden="true"></i>
        )}
      </a>
    );
  }
}