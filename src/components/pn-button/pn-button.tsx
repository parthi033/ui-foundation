import { Component, Prop, h } from "@stencil/core";

@Component({
    tag: 'pn-button',
    styleUrl: 'pn-button.scss',
    shadow: false,
})
export class PnButton {
    @Prop() label: string;
    @Prop() type: 'primary' | 'secondary' | 'tertiary' | 'white' | 'disabled' | 'transparent' = 'primary';
    @Prop() rounded: boolean = false;
    @Prop() shadow: boolean = false;
    @Prop() iconLeft: string;
    @Prop() iconRight: string;
    @Prop() iconOnly: boolean = false;

    render(){
        const isDisabled = this.type === 'disabled';
        
        return (
            <button 
                class={`btn 
                    ${this.type} 
                    ${this.rounded ? 'rounded' : ''}
                    ${this.shadow ? 'shadow' : ''}
                    ${this.iconLeft ? 'has-icon-left' : ''}
                    ${this.iconRight ? 'has-icon-right' : ''}
                    ${this.iconOnly ? 'icon-only' : ''}
                `}
                disabled={isDisabled}
            >
                {this.iconLeft && (
                    <i class={`btn-icon btn-icon-left ${this.iconLeft}`}></i>
                )}
                
                {!this.iconOnly && this.label && (
                    <span class="btn-text">{this.label}</span>
                )}
                
                {this.iconRight && (
                    <i class={`btn-icon btn-icon-right ${this.iconRight}`}></i>
                )}
            </button>
        );
    }
}