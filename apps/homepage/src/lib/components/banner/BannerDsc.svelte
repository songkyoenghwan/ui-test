<script lang="ts">
	import CountNumber from '$lib/components/text/CountNumber.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { LiquidGlass } from 'liquid-glass-svelte';
</script>

<section
	data-scroll="slide-up"
	class="flex flex-col gap-5 rounded-xl bg-(image:--bg-banner-dsc) bg-cover bg-center bg-no-repeat p-5 text-center whitespace-pre-line text-white lg:min-h-165 lg:gap-7.5 lg:p-7.5"
	style:--bg-banner-dsc={`url(${__STATIC_URL__}/imgs/banner/bg-banner-dsc.png)`}
>
	<h3 class="text-2xl leading-tight font-bold lg:text-5xl">{m.dsc_banner_tit()}</h3>
	<p class="text-lg lg:text-2xl">{m.dsc_banner_txt()}</p>

	<div>
		<LiquidGlass class="inline-flex w-full max-w-225 items-center justify-center gap-2 rounded-full p-5" style="border-radius: 12px;">
			<p class="text-2md lg:text-lg">{m.dsc_banner_box_txt_1()}</p>

			<div class="flex items-end justify-center gap-2.5 text-3xl font-bold lg:text-[5.625rem]">
				<CountNumber text={Number(1500000)} />
				<p class="text-3xl font-bold">m²</p>
			</div>
			<p class="text-2md lg:text-lg">{m.dsc_banner_box_txt_2()}</p>
		</LiquidGlass>
	</div>

	<div class="mt-auto">
		<a
			href="/contact?selectSolution=DSC"
			class="hover:text-3743ff text-2md group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white max-lg:justify-between lg:min-h-13.5 lg:w-auto"
		>
			<span>{m.btn_inquiry()}</span>
			<icon-list name="arrow-right" class="group-hover:stroke-primary size-6 stroke-white"></icon-list>
		</a>
	</div>
</section>
