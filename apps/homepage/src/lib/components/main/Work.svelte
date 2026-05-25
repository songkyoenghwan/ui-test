<svelte:options
	customElement={{
		tag: 'main-work',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	const imgWork1 = $derived(import.meta.env.PROD ? '/build/imgs/main/work/img-work-1.png' : '/imgs/main/work/img-work-1.png');
	const imgWork2 = $derived(import.meta.env.PROD ? '/build/imgs/main/work/img-work-2.png' : '/imgs/main/work/img-work-2.png');
	const imgWork3 = $derived(import.meta.env.PROD ? '/build/imgs/main/work/img-work-3.png' : '/imgs/main/work/img-work-3.png');
	let lists = [
		{
			id: 'work-1',
			img: imgWork1,
			tit: m.main_work_item_tit_1?.(),
			subTit: m.main_work_item_subTit_1?.(),
			txt: m.main_work_item_txt_1?.(),
		},
		{
			id: 'work-2',
			img: imgWork2,
			tit: m.main_work_item_tit_2?.(),
			subTit: m.main_work_item_subTit_2?.(),
			txt: m.main_work_item_txt_2?.(),
		},
		{
			id: 'work-3',
			img: imgWork3,
			tit: m.main_work_item_tit_3?.(),
			subTit: m.main_work_item_subTit_3?.(),
			txt: m.main_work_item_txt_3?.(),
		},
	];
</script>

<section data-scroll="slide-up" class="relative max-w-dvw">
	<sub-heading-line line="none" title={m.main_title_work?.()} subTit={m.main_subtitle_work?.()}></sub-heading-line>

	<dl class="space-y-5 rounded-xl bg-[url(/imgs/main/work/bg-work.png)] bg-cover bg-no-repeat p-5 text-center text-lg text-white lg:pt-15 lg:pb-50 lg:text-4xl">
		<dt class="font-bold">DEEP.FINE SPATIAL INTELLIGENCE AI</dt>
		<dd class="text-2md text-2xl lg:px-50">
			Powered by Vision AI, AI Agents, and Spatial Computing technologies, DEEP.FINE connects spatial, operational, and equipment data across industrial environments enabling
			more efficient and scalable operations.
		</dd>
	</dl>
	<ul class="relative grid grid-cols-1 gap-7.5 py-7.5 lg:-top-37.5 lg:grid-cols-3 lg:py-0">
		{#each lists as list, i (list.id)}
			<li data-scroll="slide-up" data-index={i} class="relative flex flex-col gap-5 text-center">
				<picture data-scroll="slide-up" class="grid place-items-center">
					<img src={list.img} alt="img" class="w-50 lg:w-90.75" />
				</picture>

				<dl class="space-y-2.5">
					<dt class="text-primary text-lg font-bold lg:text-2xl">
						{list.tit}
					</dt>
					<dd class="text-2md text-666 lg:text-lg">{list.subTit}</dd>
					<dd class="text-2md lg:text-lg">{list.txt}</dd>
				</dl>
			</li>
		{/each}
	</ul>
</section>
