import { Component, Prop, h } from "@stencil/core";

@Component({
    tag: 'pn-button',
    styleUrl: 'pn-button.css',
    shadow: false,
})
export class PnButton {
    @Prop() label: string;
    @Prop() type: string;
    render(){
        return <button class="btn primary">{this.label}</button>;
    }
}