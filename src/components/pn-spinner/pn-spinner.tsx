import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'pn-spinner',
  styleUrl: 'pn-spinner.scss',
  shadow: false,
})
export class PnSpinner {
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() type: 'spinner' | 'dots' | 'skeleton' = 'spinner';
  @Prop() label: string = 'Loading';
  @Prop() color: string;
  @Prop() overlay: boolean = false;
  @Prop() skeletonWidth: string = '100%';
  @Prop() skeletonHeight: string = '1rem';
  @Prop() skeletonRadius: string = '4px';
  @Prop() skeletonLines: number = 1;

  render() {
    if (this.type === 'skeleton') {
      return (
        <div class="pn-spn pn-spn--skeleton" aria-busy="true" aria-label={this.label}>
          {Array.from({ length: this.skeletonLines }, (_, i) => (
            <div
              class="pn-spn__skeleton-line"
              key={i}
              style={{
                width: i === this.skeletonLines - 1 && this.skeletonLines > 1 ? '75%' : this.skeletonWidth,
                height: this.skeletonHeight,
                borderRadius: this.skeletonRadius,
              }}
            ></div>
          ))}
        </div>
      );
    }

    const classes = {
      'pn-spn': true,
      [`pn-spn--${this.size}`]: true,
      [`pn-spn--${this.type}`]: true,
      'pn-spn--overlay': this.overlay,
    };

    const style = this.color ? { '--pn-spinner-color': this.color } as Record<string, string> : {};

    return (
      <div class={classes} role="status" aria-label={this.label} style={style}>
        {this.overlay ? <div class="pn-spn__backdrop"></div> : null}
        <div class="pn-spn__container">
          {this.type === 'spinner' ? (
            <svg class="pn-spn__svg" viewBox="0 0 50 50">
              <circle class="pn-spn__track" cx="25" cy="25" r="20" fill="none" stroke-width="4" />
              <circle class="pn-spn__circle" cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke-linecap="round" />
            </svg>
          ) : (
            <div class="pn-spn__dots">
              <span class="pn-spn__dot"></span>
              <span class="pn-spn__dot"></span>
              <span class="pn-spn__dot"></span>
            </div>
          )}
          <span class="pn-spn__sr-only">{this.label}</span>
        </div>
      </div>
    );
  }
}
