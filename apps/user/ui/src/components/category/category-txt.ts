import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('category-txt')
export class CategoryTxt extends LitElement {
	createRenderRoot() {
		return this;
	}

	@property({ type: String, reflect: true })
	txt = '';
	@property({ type: String, reflect: true })
	name = '';
	@property({ type: String, reflect: true })
	parent = '';
	@property({ type: Array, attribute: 'data-tooltip-txt' })
	tooltipTxt: string[] = [];

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		const tooltipLabelMap: Record<string, string> = {
			'facility-congestion': '시설 혼잡도',
			'location-based': '위치 기반 콘텐츠',
		};

		return html`
			<span class="grid w-full space-y-0.5">
				<span class="grid has-[icon-list]:inline-grid has-[icon-list]:grid-cols-[1fr_2.5rem]">
					<span class="min-w-0 truncate text-sm text-slate-600">${this.txt}</span>
					${
						this.tooltipTxt.length
							? html`
									<span class="flex gap-1">
										${this.tooltipTxt.map(
											(item) => html`
												<icon-list
													data-name=${item}
													class="size-4 rounded-sm bg-slate-200 fill-slate-500"
													data-tooltip-txt=${tooltipLabelMap[item] ?? ''}
												></icon-list>
											`,
										)}
									</span>
								`
							: nothing
					}
				</span>

				<span class="flex items-center gap-1 text-xs font-normal text-slate-400">
					${
						this.name
							? html`
									<span>${this.name}</span>
								`
							: nothing
					}
					${
						this.name && this.parent
							? html`
									<span>/</span>
								`
							: nothing
					}
					${
						this.parent
							? html`
									<span>${this.parent}</span>
								`
							: nothing
					}
				</span>
			</span>
		`;
	}
}
