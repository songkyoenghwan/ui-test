import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import type { LocalizedText } from '@/types/common/locale'; // 실제 경로에 맞게 유지

export type FacilityButtonItem = {
	buttonName?: LocalizedText | null;
	buttonUrl?: string | null;
	id?: number | null;
	tourDestinationCommonButtonId?: number | null;
};

@customElement('facility-button')
export class FacilityButton extends LitElement {
	protected createRenderRoot() {
		return this;
	}

	@property({ type: Array }) facilityButtons: FacilityButtonItem[] = [];

	render() {
		return html`
			<ul class="space-y-2">
				${repeat(
					this.facilityButtons || [],
					(button, index) => button.id ?? index,
					(button) => html`
						<li class="flex items-start gap-3">
							<div class="flex-[0_0_134px]">
								<ui-btn
									tag="a"
									variant="ghost"
									size="md"
									cls="w-full button ghost"
									txt=${button?.buttonName?.ko ?? ''}
									link=${button?.buttonUrl ?? ''}
								></ui-btn>
							</div>

							<lang-translate view="side" data-text-hidden="ko" .lang=${button?.buttonName ?? null}></lang-translate>
						</li>
					`,
				)}
			</ul>
		`;
	}
}
