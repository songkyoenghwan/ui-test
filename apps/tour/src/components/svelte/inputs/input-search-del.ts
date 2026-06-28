import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('input-search-del')
export class InputSearchDel extends LitElement {
	protected createRenderRoot() {
		return this;
	}

	@property({ reflect: true }) size?: string = 'md';
	@property({ reflect: true }) value?: string = '';
	@property({ reflect: true }) placeholder?: string = '';
	@property({ type: 'Sting' }) readonly?: string = '';
	@property({ type: 'Sting' }) disabled?: string = '';
	@property({ type: 'Boolean' }) foc?: boolean = false;

	protected render(): TemplateResult {
		return html`
			<div class="input-search group/input-search">
				<input
					class="input-text peer pr-15!"
					type="text"
					.value=${this.value ?? ''}
					.placeholder=${this.placeholder ?? ''}
					?readonly=${this.readonly ?? ''}
					?disabled=${this.disabled ?? ''}
					@focus=${() => this._handleFocus(true)}
					@blur=${() => this._handleFocus(false)}
					@input=${this._onInput}
				/>

				<div class="${this.foc ? '' : 'hidden'} absolute top-1.5 right-2 z-2 bg-white">
					<ui-btn
						x-show="focused"
						x-cloak
						variant="icon"
						icon-name="input-del"
						icon-cls="size-4 stroke-slate-400"
						@click=${this._clear}
					></ui-btn>
				</div>
			</div>

			${this.value}
		`;
	}

	private _onInput(e: Event) {
		const input = e.target as HTMLInputElement;
		this.value = input.value;
	}

	private _handleFocus = (_val: boolean) => {
		this.foc = _val;
	};

	private _clear = () => {
		this.value = '';
		this.foc = false;
	};
}

declare global {
	interface HTMLElementTagNameMap {
		'input-search-del': InputSearchDel;
	}
}
