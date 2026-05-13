import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('input-label')
export class InputLabel extends LitElement {
	protected createRenderRoot() {
		return this;
	}

	@property({ reflect: true })
	label?: string = '';

	protected render(): TemplateResult {
		return html`
			<label class="text-sm text-slate-600">${this.label}</label>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'input-label': InputLabel;
	}
}
