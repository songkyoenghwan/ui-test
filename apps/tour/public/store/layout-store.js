document.addEventListener('alpine:init', () => {
	if (Alpine.store('layout')) return;
	Alpine.store('layout', {
		csrfToken: '',
		user: {},
		tourDestinations: [],
		menus: [],
		raw: '',
		loading: false,
		error: null,

		async init() {
			this.loading = true;
			this.error = null;

			try {
				const module = await import('/src/mocks/db.json', {
					with: { type: 'json' },
				});

				const data = module.default;

				this.raw = data.auth.data;
				this.menus = data?.auth?.data?.user?.menus ?? [];

				const asideLnb = document.querySelector('aside-lnb');
				if (asideLnb) {
					asideLnb.menus = this.menus;
				}
			} catch (error) {
				this.error = error?.message ?? 'Unknown error';
				console.error('초기 데이터 설정 실패:', error);
			} finally {
				this.loading = false;
			}
		},
	});
});
