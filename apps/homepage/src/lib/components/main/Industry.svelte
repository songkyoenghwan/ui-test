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

	const lists = [
		{ id: 'ind1', alt: 'SAMSUNG 삼성전자' },
		{ id: 'ind2', alt: 'SAMSUNG 상성중공업' },
		{ id: 'ind3', alt: 'HYUNDAI MOTOR GROUP' },
		{ id: 'ind4', alt: 'KB증권' },
		{ id: 'ind42', alt: 'SM Entertainment' },
		{ id: 'ind5', alt: 'hyosung heavy industrieㄴ' },
		{ id: 'ind6', alt: 'HYUNDAI ENGINEERING &amp; CONSTRUCTION' },
		{ id: 'ind7', alt: 'YOKOGAWA' },
		{ id: 'ind8', alt: 'LS ELECTRIC' },
		{ id: 'ind9', alt: 'KPS' },
		{ id: 'ind10', alt: 'LX' },
		{ id: 'ind11', alt: '한진택배' },
		{ id: 'ind12', alt: 'LX판토스' },
		{ id: 'ind13', alt: 'POSCO' },
		{ id: 'ind14', alt: '경기도' },
		{ id: 'ind15', alt: '한국관광공사 KOREA TOURISM ORGANIZTION' },
		{ id: 'ind16', alt: 'LG전자' },
		{ id: 'ind17', alt: 'LG이노텍' },
		{ id: 'ind18', alt: 'NIA 한국지능정보사회진흥원' },
		{ id: 'ind19', alt: 'Mercedes-Benz' },
		{ id: 'ind20', alt: 'DAESANG' },
		{ id: 'ind21', alt: 'SAPEON' },
		{ id: 'ind22', alt: '식품의약품안전처' },
		{ id: 'ind23', alt: '주식회사 오뚜기' },
		{ id: 'ind24', alt: 'LG 에너지솔루션' },
		{ id: 'ind25', alt: '롯데정보통신' },
		{ id: 'ind26', alt: '롯데제과' },
		{ id: 'ind27', alt: '농심엔지니어링' },
		{ id: 'ind28', alt: 'IITP 정보통신기획평가원' },
		{ id: 'ind29', alt: '과학기술정보통신부' },
		{ id: 'ind30', alt: 'sunjin' },
		{ id: 'ind31', alt: 'Pulmuone' },
		{ id: 'ind32', alt: '고용노동부' },
	] as const;
</script>

<section data-scroll="first" class="w-full max-w-dvw space-y-7.5 lg:space-y-15">
	<h3 class="text-center text-lg lg:text-4xl">{m.main_industry()}</h3>

	{#if lists}
		<Marquee pauseOnHover={true} class="gap-3.75 lg:gap-7.5" innerClassName="gap-3.75 lg:gap-7.5" fade={true}>
			{#each lists as { alt, id }, i (id)}
				<picture>
					<img src="{__STATIC_URL__}/imgs/industry/img-industry-{i + 1}.png" {alt} loading="lazy" class="w-37.5 lg:w-75" />
				</picture>
			{/each}
		</Marquee>
	{/if}
</section>
