document.addEventListener('alpine:init', () => {
	if (Alpine.store('modal')) return;
	Alpine.store('modal', {
		isOpen: false,
		edit: '',
		targetId: '',
		targetInputId: '',
		postcode: null,
		init() {
			if (this.isOpen && this.targetId) {
				this.show(this.targetId);
			}
		},
		open(e) {
			const triggerEl = e?.currentTarget ?? e?.target?.closest?.('[data-target]');

			const targetId = triggerEl?.getAttribute?.('data-target');

			if (!targetId) {
				console.warn('data-target not found', triggerEl);
				return;
			}

			const targetEl = document.getElementById(targetId);

			if (!(targetEl instanceof HTMLDialogElement)) {
				console.warn('Dialog not found:', targetId);
				console.log(
					'existing dialogs:',
					[...document.querySelectorAll('dialog')].map((d) => d.id),
				);
				return;
			}

			if (!targetEl.open) {
				targetEl.showModal();
			}

			this.editHandle(e);
			this.targetId = targetId;
			this.isOpen = true;
			document.body.classList.add('overflow-hidden');
		},
		close(e) {
			const dialogs = [...document.querySelectorAll('dialog')].filter(
				(item) => item instanceof HTMLDialogElement && item.open,
			);

			if (!dialogs.length) {
				this.isOpen = false;
				this.targetId = '';
				return;
			}

			const clickedDialog = e?.target?.closest?.('dialog');
			const targetEl = clickedDialog instanceof HTMLDialogElement ? clickedDialog : dialogs[dialogs.length - 1];

			if (targetEl?.open) {
				targetEl.close();
			}

			const remainDialogs = [...document.querySelectorAll('dialog')].filter(
				(item) => item instanceof HTMLDialogElement && item.open,
			);

			this.isOpen = remainDialogs.length > 0;
			this.targetId = remainDialogs.length ? remainDialogs[remainDialogs.length - 1].id : '';
		},

		show(e, edit = '') {
			const targetId = e?.target?.closest('[data-target]')?.dataset.target || e?.target?.getAttribute('data-target');

			if (!targetId || targetId === this.targetId) return;

			const targetEl = document.getElementById(targetId) as HTMLDialogElement;
			if (targetEl && targetEl.showModal) {
				targetEl.showModal();
			}

			this.edit = edit;
			this.targetInputId = targetId;
			this.isOpen = true;
			document.body.classList.add('overflow-hidden');

			if (targetId === 'DialogAddrSearch') {
				this.openPostcodeModal(targetId);
			}
		},
		hidden(e) {
			const currentTargetId = e?.target?.closest('dialog')?.id || this.targetId;

			if (this.isOpen && currentTargetId) {
				const targetEl = document.getElementById(currentTargetId) as HTMLDialogElement;
				if (targetEl) {
					targetEl.close();
					targetEl.removeAttribute('open');
				}
			}

			// 상태 초기화
			this.isOpen = false;
			this.targetInputId = '';
			this.edit = '';
			document.body.classList.remove('overflow-hidden');
		},
		editHandle(e) {
			const targetState =
				e?.target?.closest('[data-target-edit]')?.dataset.targetEdit || e?.target?.getAttribute('data-target-edit');
			if (targetState === '') return;

			this.edit = targetState;
		},

		get postModal() {
			return document.querySelector('#DialogAddrSearch');
		},

		get container() {
			return document.getElementById('postcodeContainer');
		},

		openPostcodeModal(targetInputId = '') {
			this.targetInputId = targetInputId;

			if (!window.daum?.Postcode) {
				console.error('Daum Postcode script is not loaded');
				return;
			}

			if (this.postModal) this.postModal.removeAttribute('aria-hidden');

			requestAnimationFrame(() => {
				if (!this.container) return;
				if (this.postcode && this.container.children.length > 0) return;

				this.postcode = new window.daum.Postcode({
					oncomplete: (data) => {
						const address = data.roadAddress || data.jibunAddress || '';
						const postInput = this.targetInputId ? document.getElementById(this.targetInputId) : null;
						console.log('[postcode] selected', { address, data });

						if (postInput) {
							postInput.value = address;
							postInput.dispatchEvent(new Event('input', { bubbles: true }));
							postInput.dispatchEvent(new Event('change', { bubbles: true }));
						}

						Alpine.store('map')?.selectAddress?.({
							address,
							roadAddress: data.roadAddress,
							jibunAddress: data.jibunAddress,
							zonecode: data.zonecode,
						});
						this.closePostcodeModal('');
					},
					width: '100%',
					height: '100%',
				});

				this.postcode.embed(this.container);
			});
		},

		closePostcodeModal() {
			if (this.postModal) this.postModal.setAttribute('aria-hidden', 'true');
			if (this.container) {
				this.container.style.height = '682px';
			}
			document.getElementById('DialogAddrSearch')?.close();
			this.isOpen = false;
			this.targetInputId = '';
			this.edit = '';
			document.body.classList.remove('overflow-hidden');
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

	Alpine.bind('ModalTopHandler', () => ({
		'@click'(e) {
			modalHandler.show(e);
		},
	}));

	Alpine.bind('ModalTopClose', () => ({
		'@click'(e) {
			modalHandler.hidden(e);
		},
	}));

	Alpine.bind('DialogTopModal', () => ({
		'x-show': '$store.modal.targetInputId',
		'x-transition:enter': 'transition ease-out duration-150',
		'x-transition:enter-start': 'opacity-0 scale-90',
		'x-transition:enter-end': 'opacity-100 scale-100',
		'x-transition:leave': 'transition ease-in duration-150',
		'x-transition:leave-start': 'opacity-100 scale-100',
		'x-transition:leave-end': 'opacity-0 scale-90',
	}));
});
