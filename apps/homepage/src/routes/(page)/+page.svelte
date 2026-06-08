<script lang="ts">
	$effect(() => {
		const mainNews = document?.querySelector('main-home') as HTMLElement;
		if (!mainNews) return;
		mainNews.news = [
			...Array.from({ length: 10 }).map((_) => {
				return {
					link: 'https://www.deepfine.com/news/news-detail',
					img: 'https://www.deepfine.com/filestorage/2026/1/23/1aeaeb1a-8e4c-4042-8bea-8cdf124e1515.png',
					tit: 'https://www.deepfine.com/filestorage/2026/1/23/1aeaeb1a-8e4c-4042-8bea-8cdf124e1515.pnghttps://www.deepfine.com/filestorage/2026/1/23/1aeaeb1a-8e4c-4042-8bea-8cdf124e1515.pnghttps://www.deepfine.com/filestorage/2026/1/23/1aeaeb1a-8e4c-4042-8bea-8cdf124e1515.png',
					date: '2025.12.08',
				};
			}),
		];

		const modalMain = document?.querySelector('modal-main') as HTMLElement;
		if (!modalMain) return;
		modalMain.list = [
			...Array.from({ length: 3 }).map((_) => {
				return {
					link: 'https://www.deepfine.com/news/news-detail',
					img: '/imgs/popup/main-popup.jpg',
					tit: 'title',
				};
			}),
		];
	});
</script>

<main-home></main-home>

<modal-main open="open"></modal-main>
