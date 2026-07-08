document.addEventListener('alpine:init', () => {
	if (Alpine.store('modal')) return;
	Alpine.store('modal', {
		isOpen: false,
		edit: '',
		targetId: '',
		init() {
			if (this.isOpen && this.targetId) {
				this.show(this.targetId);
			}
		},
		open(e) {
			const targetId = e?.target?.closest('[data-target]')?.dataset.target || e?.target?.getAttribute('data-target');

			if (!targetId || targetId === this.targetId) return;

			const targetEl = document.getElementById(targetId) as HTMLDialogElement;
			if (targetEl && targetEl.showModal) {
				targetEl.showModal();
			}

			this.editHandle(e);
			this.targetId = targetId;
			this.isOpen = true;
			document.body.classList.add('overflow-hidden');
		},

		show(targetId = '', edit = '') {
			if (targetId === '') return;

			const targetEl = document.getElementById(targetId) as HTMLDialogElement;
			if (targetEl && targetEl.showModal) {
				targetEl.showModal();
			}

			this.edit = edit;
			this.targetId = targetId;
			this.isOpen = true;
			document.body.classList.add('overflow-hidden');
		},

		close(e) {
			const currentTargetId = e?.target?.closest('dialog')?.id || this.targetId;

			if (this.isOpen && currentTargetId) {
				const targetEl = document.getElementById(currentTargetId) as HTMLDialogElement;
				if (targetEl && targetEl.close) {
					targetEl.close();
				}
			}

			// 상태 초기화
			this.isOpen = false;
			this.targetId = '';
			this.edit = '';
			document.body.classList.remove('overflow-hidden');
		},
		editHandle(e) {
			const targetState = e?.target?.closest('[data-target-edit]')?.dataset.targetEdit || e?.target?.getAttribute('data-target-edit');
			if (targetState === '') return;

			this.edit = targetState;
		},
	});

	const modalHandler = Alpine.store('modal');

	Alpine.bind('ModalHandler', () => ({
		'@btn-click'(e) {
			modalHandler.open(e);
		},
	}));

	Alpine.bind('ModalClose', () => ({
		'@btn-click'(e) {
			modalHandler.close(e);
		},
	}));

	Alpine.bind('DialogHandler', () => ({
		'x-cloak': '',
		'@keydown.escape.prevent': '$store.modal.close()',
		'@click.self': '$store.modal.close()',
	}));

	Alpine.bind('DialogSide', () => ({
		'x-show': '$store.modal.targetId',
		'x-transition:enter': 'transition ease-out duration-200',
		'x-transition:enter-start': 'translate-x-120',
		'x-transition:enter-end': 'translate-x-0 opacity-100',
		'x-transition:leave': 'transition ease-in duration-100',
		'x-transition:leave-start': 'translate-x-0 opacity-100',
		'x-transition:leave-end': 'translate-x-120',
	}));

	Alpine.bind('DialogModal', () => ({
		'x-show': '$store.modal.targetId',
		'x-transition:enter': 'transition ease-out duration-150',
		'x-transition:enter-start': 'opacity-0 scale-90',
		'x-transition:enter-end': 'opacity-100 scale-100',
		'x-transition:leave': 'transition ease-in duration-150',
		'x-transition:leave-start': 'opacity-100 scale-100',
		'x-transition:leave-end': 'opacity-0 scale-90',
	}));
});
