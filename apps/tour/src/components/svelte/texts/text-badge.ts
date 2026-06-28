import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('text-badge')
export class TestBadge extends LitElement {
	protected createRenderRoot() {
		return this;
	}

	@property({ reflect: true }) txt?: string = '';
	@property({ reflect: true }) variant?: string = '';

	protected render(): TemplateResult {
		const toneClass =
			this.variant === 'danger'
				? 'text-danger border-danger bg-white border'
				: this.variant === 'bg-danger'
					? 'text-white bg-danger'
					: this.variant === 'bg-primary'
						? 'text-white bg-primary'
						: this.variant === 'bg-alert'
							? 'text-ff0000 bg-ff0000/8'
							: 'text-line-primary bg-white border-line-primary border';

		return html`
			<p class="${this.variant} ${toneClass} inline-flex rounded-sm px-2 text-sm">${this.txt}</p>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'text-badge': TestBadge;
	}
}
