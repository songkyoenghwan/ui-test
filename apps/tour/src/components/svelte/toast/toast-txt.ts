import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('toast-txt')
export class ToastText extends LitElement {
	protected createRenderRoot() {
		return this;
	}

	@property({ reflect: true })
	variant?: string = 'primary';
	@property({ reflect: true })
	txt?: string = '';

	protected render(): TemplateResult {
		const heightClass =
			this.variant === 'primary'
				? 'border-cms-3 border bg-cms-3'
				: this.variant === 'error'
					? 'border-error border bg-error'
					: 'bg-white';

		return html`
			<dialog
				class="group/toast ${heightClass} fixed bottom-5 left-25 grid min-w-112.5 translate-y-0 items-center gap-1 rounded-lg pl-1 opacity-100 shadow-2xs transition-all transition-discrete select-none starting:translate-y-5 starting:opacity-0"
			>
				<div
					class="flex h-full min-h-12 items-center gap-2 rounded-lg bg-slate-50 px-4 py-1 opacity-100 transition-opacity transition-discrete starting:opacity-0"
				>
					${this.variant === 'primary'
						? html`
								<icon-list data-name="info-circle-chk" class="icon fill-cms-3 size-4"></icon-list>
							`
						: html`
								<icon-list data-name="info-circle" class="icon fill-error size-4"></icon-list>
							`}
					<p class="text-sm text-black">${this.txt}</p>
				</div>
			</dialog>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'toast-txt': ToastText;
	}
}
