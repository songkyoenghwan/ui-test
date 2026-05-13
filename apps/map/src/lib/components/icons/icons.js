import { getIconData } from './icon-data.js';

class IconList extends HTMLElement {
	static get observedAttributes() {
		return ['data-name', 'data-size', 'data-fill-none'];
	}

	constructor() {
		super();
		this.rendered = false;
		this.name = '';
		this.size = '24';
		this.fillNone = '';
	}

	connectedCallback() {
		this.name = this.getAttribute('data-name') || '';
		this.size = '24';
		this.render();
	}

	attributeChangedCallback(attrName = '', oldVal = '', newVal = '') {
		if (oldVal !== newVal) {
			switch (attrName) {
				case 'data-name':
					this.name = newVal || '';
					break;
				case 'data-size':
					this.size = newVal || '24';
					break;
				case 'data-fill-none':
					this.fillNone = newVal || '';
					break;
				default:
					break;
			}
			if (this.rendered === true) {
				this.render();
			}
		}
	}

	matchEitherBidirectional(sizeA, sizeB) {
		const a = sizeA.split(' ').map(Number);
		const b = sizeB.split(' ').map(Number);

		return a.some((n) => b.includes(n)) || b.some((n) => a.includes(n));
	}

	render() {
		this.rendered = true;
		const selectedIcon = getIconData().find((icon) => icon.name === this.name);
		let selectedIconSize = '24';

		if (!selectedIcon) return;
		const parts = selectedIcon.size.trim().split(/\s+/);
		selectedIconSize = parts.length > 1 ? `${selectedIcon.size}` : `${selectedIcon.size} ${selectedIcon.size}`;
		this.content = selectedIcon ? selectedIcon.html : '';

		this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width="100%"
            height="100%"
            viewBox="0 0 ${selectedIconSize}"
            ${this.fillNone !== '' ? 'fill="none" stroke="none"' : ''}>
                ${this.content}
        </svg>`;
	}
}

if (typeof window !== 'undefined' && !customElements.get('icon-list')) {
	// 브라우저에서만 실행되는 코드
	customElements.define('icon-list', IconList);
}
