import { Component, Prop, h } from "@stencil/core";

@Component({
    tag: 'pn-button',
    styleUrl: 'pn-button.scss',
    shadow: false,
})
export class PnButton {
    @Prop() label: string;
    @Prop() type: 'primary' | 'secondary' | 'disabled' = 'primary';
    @Prop() rounded: boolean = false;
    render(){
        const isDisabled = this.type ==='disabled';
        return <button class={`btn ${this.type} ${this.rounded ? 'rounded':''}`} disabled={isDisabled}>{this.label}</button>;
    }
}