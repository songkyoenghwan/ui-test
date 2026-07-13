import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('text-badge')
export class TestBadge extends LitElement {
	protected createRenderRoot() {
		return this;
	}

	@property() txt?: string = '';
	@property() variant?: string = '';
	@property({ attribute: 'date-ellipsis' }) ellipsis?: string = '';
	@property() cls?: string = '';

	protected render(): TemplateResult {
		const toneClass =
			this.variant === 'danger'
				? 'text-danger border-danger bg-white border'
				: this.variant === 'bg-danger'
					? 'text-white bg-danger'
					: this.variant === 'bg-primary'
						? 'text-white bg-cms-3'
						: this.variant === 'bg-alert'
							? 'text-ff0000 bg-ff0000/8'
							: 'text-cms-3 bg-white border-cms-3 border';

		return html`
			<p
				class="${this.variant} ${toneClass} ${this.cls} ${this.ellipsis
					? 'block truncate'
					: 'inline-flex'} rounded-sm px-2 text-sm"
				title="${this.txt}"
			>
				${this.txt}
			</p>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'text-badge': TestBadge;
	}
}
