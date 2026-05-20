import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('text-label')
export class TextLabel extends LitElement {
	protected createRenderRoot() {
		return this;
	}

	@property({ reflect: true }) label?: string = '';

	protected render(): TemplateResult {
		return html`
			<label class="text-sm text-slate-600">${this.label}</label>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'text-label': TextLabel;
	}
}
