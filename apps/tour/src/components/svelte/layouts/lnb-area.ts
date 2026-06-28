import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('aside-lnb')
export class AsideLnb extends LitElement {
	createRenderRoot() {
		return this;
	}

	@property({ type: String, reflect: true }) admin = '';
	@property({ type: String, reflect: true }) current = '';
	@property({ type: Array }) menus: Array<{ id: number; url: string; name: string }> = [];

	@state() hoveredId = '';

	get displayName() {
		return window.location.pathname.split('/').filter(Boolean)[0] ?? '';
	}

	renderLi(lnb: { id: number; url: string; name: string }) {
		const normalized = lnb.url.replace(/^\//, '');
		const isCurrent = this.displayName === normalized;
		const iconName = this.hoveredId === lnb.url || isCurrent ? `${normalized}-on` : `${normalized}-off`;

		return html /* HTML */ `
      <li class="grid gap-4">
        ${
			lnb.id === 1 || lnb.id === 5
				? html`
						<h2 class="${lnb.id === 5 ? 'mt-2 border-t border-t-white/50 pt-5' : ''} font-semibold text-white">
							${lnb.id === 1 ? '관리' : '현황'}
						</h2>
					`
				: null
		}

        <li class="grid min-h-15">
          <a
            class="group/lnb-link shadow-1xs grid size-full place-items-center rounded-lg border border-transparent p-1 transition-colors hover:border-white/10 aria-[current=page]:bg-white/10 aria-[current=page]:text-white aria-[current=page]:shadow-2xs"
            aria-current=${isCurrent ? 'page' : 'false'}
            href=${lnb.url}
            @mouseenter=${() => (this.hoveredId = lnb.url)}
            @mouseleave=${() => (this.hoveredId = '')}
          >
            <icon-list
              data-name=${iconName}
              class="size-5 fill-white stroke-slate-50 transition-all delay-0 group-aria-[current=page]/lnb-link:fill-white group-aria-[current=page]/lnb-link:text-white"
            ></icon-list>
            <p class="group-aria-[current=page]/lnb-link:font-semibold">${lnb.name}</p>
          </a>
        </li>
      </li>
    `;
	}

	render() {
		if (!this.menus?.length) return null;

		return html`
			<aside class="from-002e1e to-2e5345 flex h-full flex-col space-y-3 bg-linear-to-t px-2 py-6">
				<div class="flex h-10 justify-center"></div>

				<nav class="text-base text-slate-50">
					<ul class="flex flex-col gap-3 text-center leading-tight break-keep">
						${this.menus.map((lnb) => this.renderLi(lnb))}
					</ul>
				</nav>
			</aside>
		`;
	}
}
