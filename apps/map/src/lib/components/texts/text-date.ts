import dayjs from 'dayjs';
import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'dayjs/locale/ko';

dayjs.locale('ko');

@customElement('text-date')
export class TextDate extends LitElement {
	protected createRenderRoot() {
		return this;
	}

	@property({ reflect: true }) label = '';
	@property({ reflect: true }) dateTime = '';
	@property({ type: Boolean, reflect: true, attribute: 'data-time-view' }) timeView = false;

	private formatDate(value?: string) {
		if (!value) return '';

		const d = dayjs(value);
		if (!d.isValid()) return value;

		const weekdayMap = ['일', '월', '화', '수', '목', '금', '토'];
		const day = weekdayMap[d.day()];

		return this.timeView ? `${d.format('YY.MM.DD')}(${day}) ${d.format('HH:mm')}` : `${d.format('YY.MM.DD')}(${day})`;
	}

	protected render(): TemplateResult {
		return html`
			${this.label} ${this.formatDate(this.dateTime)}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'text-date': TextDate;
	}
}
