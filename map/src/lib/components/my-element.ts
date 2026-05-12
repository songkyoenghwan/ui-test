import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
	protected createRenderRoot() {
		return this;
	}

	@property({ reflect: true })
	value?: string = '';
	@property()
	variant?: string = 'md';

	protected render(): TemplateResult {
		return html`
			<input type="text" class="rounded-sm border border-slate-200 bg-white" .value=${this.value} @input=${this._onInput} />
		`;
	}

	private _onInput(e: Event) {
		const input = e.target as HTMLInputElement;
		this.value = input.value; // Input 값이 변경되면 name도 동기화
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'my-element': MyElement;
	}
}
