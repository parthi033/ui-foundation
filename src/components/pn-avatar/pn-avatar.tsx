import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'pn-avatar',
  styleUrl: 'pn-avatar.scss',
  shadow: false,
})
export class PnAvatar {
  @Prop() src: string;
  @Prop() alt: string = '';
  @Prop() name: string;
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
  @Prop() shape: 'circle' | 'square' = 'circle';
  @Prop() status: 'online' | 'offline' | 'busy' | 'away' | '' = '';
  @Prop() border: boolean = false;

  private getInitials(name: string): string {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  }

  private getColorFromName(name: string): string {
    if (!name) return '#6b7280';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 55%, 45%)`;
  }

  render() {
    const classes = {
      'pn-avt': true,
      [`pn-avt--${this.size}`]: true,
      [`pn-avt--${this.shape}`]: true,
      'pn-avt--border': this.border,
    };

    const initials = this.getInitials(this.name);
    const bgColor = this.getColorFromName(this.name);

    return (
      <div class={classes} role="img" aria-label={this.alt || this.name || 'Avatar'}>
        {this.src ? (
          <img class="pn-avt__image" src={this.src} alt={this.alt || this.name || ''} loading="lazy" />
        ) : (
          <span class="pn-avt__initials" style={{ background: bgColor }}>{initials}</span>
        )}
        {this.status ? (
          <span class={`pn-avt__status pn-avt__status--${this.status}`} aria-label={this.status}></span>
        ) : null}
      </div>
    );
  }
}
