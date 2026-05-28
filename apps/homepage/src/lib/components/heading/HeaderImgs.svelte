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
	import left from '$lib/assets/imgs/logo/img-header.png';
	import dao from '$lib/assets/imgs/logo/log-header-dao.png';
	import logo from '$lib/assets/imgs/logo/logo-deepfine.svg';
	import dsc from '$lib/assets/imgs/logo/logo-header-dsc.png';
	import logi from '$lib/assets/imgs/logo/logo-header-logi.png';

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
	<img src={activeImg} alt="DEEP.FINE An AI and spatial intelligence solution company empowering industrial operations" class="w-41.75 lg:w-full" />
</picture>

{#if name === 'logo'}
	<footer-lang class="sr-only"></footer-lang>
	<!-- 컴포넌언 언어팩 변경 부분  -->
{/if}
