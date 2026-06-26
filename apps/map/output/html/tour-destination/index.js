document.addEventListener('alpine:init', () => {
	const listStore = import('alpinejs').Alpine.store('list');
	import('alpinejs').Alpine.store('list', {
		items: [],
		itemsToShow: 10,
		loading: false,
		error: null,
		itemId: '',
		setItemId(id = '') {
			this.itemId = id;
			sessionStorage.setItem('cms-loc-page-view-id', id);
		},
		view: sessionStorage.getItem('cms-loc-page-view') ?? 'reg',
		setView(view = 'reg') {
			this.view = view;
			sessionStorage.setItem('cms-loc-page-view', view);
		},
		async init() {
			this.loading = true;
			this.error = null;

			try {
				const res = await fetch('http://192.168.1.155:5184/api/tour-destinations');

				if (!res.ok) {
					throw new Error('Failed to load json');
				}

				const data = await res.json();

				this.items = data.data.items;
			} catch (error) {
				this.error = error.message ?? 'Unknown error';
				console.error('초기 데이터 설정 실패:', error);
			} finally {
				this.loading = false;
			}
		},
	});
});

document.addEventListener('DOMContentLoaded', async () => {
	const listStore = import('alpinejs').Alpine.store('list');
	const pageId = 'CMS_01_1';

	try {
		if (listStore) {
			listStore.init();
		}
	} catch (error) {
		console.error('초기 데이터 설정 실패:', error);
	}
});
