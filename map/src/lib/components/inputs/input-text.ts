import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('input-text')
export class InputText extends LitElement {
	protected createRenderRoot() {
		return this;
	}

	@property({ reflect: true })
	size?: string = 'md';
	@property({ reflect: true })
	value?: string = '';
	@property({ reflect: true })
	placeholder?: string = '';
	@property()
	readonly?: string = '';
	@property()
	disabled?: string = '';

	protected render(): TemplateResult {
		const heightClass = this.size === 'sm' ? 'h-6.5' : this.size === 'lg' ? 'h-12.5' : 'h-10';

		return html`
			<input
				type="text"
				class="${heightClass} focus-within:outline-primary rounded-sm border border-slate-200 bg-white px-3 placeholder:text-slate-300 read-only:bg-slate-200 disabled:bg-slate-200"
				.value=${this.value ?? ''}
				.placeholder=${this.placeholder ?? ''}
				.readonly=${this.readonly ?? ''}
				.disabled=${this.disabled ?? ''}
				@input=${this._onInput}
			/>
		`;
	}

	private _onInput(e: Event) {
		const input = e.target as HTMLInputElement;
		this.value = input.value;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'input-text': InputText;
	}
}
