<svelte:options
	customElement={{
		tag: 'main-industry',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { Marquee } from '@selemondev/svelte-marquee';
	import { m } from '$lib/paraglide/messages.js';
	import '@selemondev/svelte-marquee/dist/style.css';

	const lists = $state([
		{ id: 'industry-1', alt: 'hyosung heavy industrie' },
		{ id: 'industry-2', alt: 'SAMSUNG 삼성전자' },
		{ id: 'industry-3', alt: 'SAMSUNG 상성중공업' },
		{ id: 'industry-4', alt: 'HYUNDAI MOTOR GROUP' },
		{ id: 'industry-5', alt: 'KB증권' },
		{ id: 'industry-6', alt: 'SM Entertainment' },
		{ id: 'industry-7', alt: 'HYUNDAI ENGINEERING &amp; CONSTRUCTION' },
		{ id: 'industry-8', alt: 'YOKOGAWA' },
		{ id: 'industry-9', alt: '한전 KPS' },
		{ id: 'industry-10', alt: '한진택배' },
		{ id: 'industry-11', alt: 'LX판토스' },
		{ id: 'industry-12', alt: '경기도' },
		{ id: 'industry-13', alt: '한국관광공사 KOREA TOURISM ORGANIZTION' },
		{ id: 'industry-14', alt: 'LG전자' },
		{ id: 'industry-15', alt: 'LG이노텍' },
		{ id: 'industry-16', alt: 'NIA 한국지능정보사회진흥원' },
		{ id: 'industry-17', alt: 'Mercedes-Benz' },
		{ id: 'industry-18', alt: 'DAESANG' },
		{ id: 'industry-19', alt: 'rebellions' },
		{ id: 'industry-20', alt: '식품의약품안전처' },
		{ id: 'industry-21', alt: '롯데정보통신' },
		{ id: 'industry-22', alt: '농심엔지니어링' },
		{ id: 'industry-23', alt: 'IITP 정보통신기획평가원' },
		{ id: 'industry-24', alt: '과학기술정보통신부' },
		{ id: 'industry-25', alt: 'sunjin' },
		{ id: 'industry-26', alt: 'Pulmuone' },
		{ id: 'industry-27', alt: '고용노동부' },
	]);
</script>

<section data-scroll="first" class="w-full max-w-dvw space-y-7.5 lg:space-y-15">
	<h3 class="text-center text-lg lg:text-4xl">{m.main_industry()}</h3>

	{#if lists}
		<Marquee pauseOnHover={true} class="gap-3.75 lg:gap-7.5" innerClassName="gap-3.75 lg:gap-7.5" fade={true}>
			{#each lists as { alt, id } (id)}
				<picture>
					<img loading="lazy" src="{__STATIC_URL__}/imgs/industry/img-{id}.png" {alt} class="w-37.5 lg:w-75" />
				</picture>
			{/each}
		</Marquee>
	{/if}
</section>
