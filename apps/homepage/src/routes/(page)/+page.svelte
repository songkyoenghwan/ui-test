<script lang="ts">
	$effect(() => {
		const mainNews = document?.querySelector('main-home');
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
	});
</script>

<main-home></main-home>
