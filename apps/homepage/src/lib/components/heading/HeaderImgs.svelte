<svelte:options
	customElement={{
		tag: 'header-imgs',
		shadow: 'none',
		props: {
			name: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	const left = `${__STATIC_URL__}/imgs/logo/img-header.png`;
	const dao = `${__STATIC_URL__}/imgs/logo/log-header-dao.png`;
	const logo = `${__STATIC_URL__}/imgs/logo/logo-deepfine.svg`;
	const dsc = `${__STATIC_URL__}/imgs/logo/logo-header-dsc.png`;
	const logi = `${__STATIC_URL__}/imgs/logo/logo-header-logi.png`;

	let { name = '' } = $props<{ name?: string }>();

	const imgMap = {
		logo,
		left,
		logi,
		dao,
		dsc,
	} as const;

	let activeImg = $derived(name in imgMap ? imgMap[name as keyof typeof imgMap] : null);
</script>

<picture class="flex w-full">
	<img
		loading="lazy"
		src={activeImg}
		alt="DEEP.FINE An AI and spatial intelligence solution company empowering industrial operations"
		class="w-41.75 lg:w-full"
	/>
</picture>

{#if name === 'logo'}
	<footer-lang class="sr-only"></footer-lang>
	<!-- 컴포넌언 언어팩 변경 부분  -->
{/if}
