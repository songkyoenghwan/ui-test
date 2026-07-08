import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('modal-header')
export class ModalHeader extends LitElement {
	@property({ type: String }) shape = '';
	@property({ type: String }) id = '';
	@property({ type: String }) tit = '';

	createRenderRoot() {
		return this;
	}

	render(): TemplateResult {
		return html`
			<header class="grid grid-cols-[1fr_26px] overflow-clip rounded-t-sm bg-white px-5 pt-5 pb-3.5">
				<ui-tit tag="h4" size="md" tit=${this.tit}></ui-tit>

				<ui-btn
					txt="닫기"
					variant="icon"
					icon-name="modal-close"
					icon-cls="size-5"
					autofocus
					btn-id=${`${this.id}Close`}
					x-bind="ModalClose"
					data-close=${this.id}
				></ui-btn>
			</header>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'modal-header': ModalHeader;
	}
}
