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
		const hasColor = !!this.color;
		const colorVar = `var(--color-poi-${this.color})`;

		return html`
			<span class="grid size-8 place-content-center rounded-sm border border-slate-200 bg-slate-50">
				<icon-list
					data-name=${this.icon}
					class="${hasColor ? '' : 'fill-slate-500 stroke-slate-500'} size-7"
					style=${hasColor ? `fill: ${colorVar}; stroke: ${colorVar};` : ''}
				></icon-list>
			</span>
		`;
	}
}
