import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('category-icon')
export class CategoryIcon extends LitElement {
	createRenderRoot() {
		return this;
	}

	@property({ type: String, reflect: true })
	icon = '';

	@property({ type: String, reflect: true })
	color = '';

	render(): TemplateResult {
		const color = this.color || '#62748E';

		return html`
			<span class="grid size-8 place-content-center rounded-sm border border-slate-200 bg-slate-50">
				<icon-list
					data-name=${this.icon || 'location'}
					class="size-7"
					style=${`fill: ${color}; stroke: ${color};`}
				></icon-list>
			</span>
		`;
	}
}
