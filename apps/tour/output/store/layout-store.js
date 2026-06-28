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
				const res = await fetch('http://localhost:5185/auth');

				if (!res.ok) {
					throw new Error('Failed to load json');
				}

				const data = await res.json();

				this.menus = data?.data?.user?.menus ?? [];

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
