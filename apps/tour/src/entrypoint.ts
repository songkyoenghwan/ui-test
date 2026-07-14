import persist from '@alpinejs/persist';
import sort from '@alpinejs/sort';
import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
	Alpine.plugin(sort);
	Alpine.plugin(persist);

	Alpine.data('page', () => ({
		view: 'reg',
		loading: false,
		pageViewChange(_current = '') {
			if (_current === '') return;
			this.view = _current;
		},
		scrollBarTopEvent(event: Event, stickyIndex = 0) {
			const container = this.$refs.scrollBar as HTMLElement | undefined;
			if (!container) return;

			const target = event.currentTarget as HTMLButtonElement | null;
			if (!target) return;

			const header = target.parentElement as HTMLElement | null;
			if (!header) return;

			const top = stickyIndex === 0 ? 0 : header.offsetTop - header.offsetHeight;

			container.scrollTo({
				top: Math.max(0, top),
				behavior: 'smooth',
			});
		},
	}));
};
