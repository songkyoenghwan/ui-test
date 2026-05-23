<svelte:options
	customElement={{
		tag: 'header-year',
		shadow: 'none',
		props: {
			year: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	let { year = '2019' } = $props<{ year?: string }>();
	import bg2019 from '$static/imgs/company/bg-history-2019.jpg?url';
	import bg2021 from '$static/imgs/company/bg-history-2021.jpg?url';
	import bg2023 from '$static/imgs/company/bg-history-2023.jpg?url';
	import bg2025 from '$static/imgs/company/bg-history-2025.jpg?url';
	const bgMap = {
		'2019': bg2019,
		'2021': bg2021,
		'2023': bg2023,
		'2025': bg2025,
	} as const;

	let activeBg = $derived(year in bgMap ? bgMap[year as keyof typeof bgMap] : bg2019);
</script>

<header
	class="bg-primary items mb-0 flex h-30 flex-col justify-center gap-1.5 overflow-clip rounded-xl bg-(image:--bg-history-url) bg-cover bg-center bg-no-repeat p-5 text-white lg:mb-10 lg:h-45 lg:gap-2.5 lg:px-15 lg:py-5"
	style="--bg-history-url: url('{activeBg}');"
>
	<p class="text-2md lg:text-2xl">{year}~{Number(year) + 1}</p>
	<p class="text-lg font-bold lg:text-2xl">
		{#if year === '2019'}
			{m.history_2019()}
		{:else if year === '2021'}
			{m.history_2021()}
		{:else if year === '2023'}
			{m.history_2023()}
		{:else if year === '2025'}
			{m.history_2025()}
		{/if}
	</p>
</header>
