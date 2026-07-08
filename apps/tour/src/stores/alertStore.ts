document.addEventListener('alpine:init', () => {
	if (Alpine.store('alert')) return;
	Alpine.store('alert', {
		isOpen: false,
		targetId: '',
		init() {
			if (this.isOpen && this.targetId) {
				this.show(this.targetId);
			}
		},
		open(targetId = '') {
			if (targetId === '') return;

			const targetEl = document.getElementById(targetId) as HTMLElement;

			targetEl.setAttribute('open', 'open');
		},

		close(targetId = '') {
			const targetEl = document.getElementById(targetId) as HTMLElement;

			targetEl.setAttribute('open', 'open');
		},
	});
});
