<script lang="ts">
	import { register } from 'swiper/element/bundle';

	$effect(() => {
		register();
	});

	let { lists = [] } = $props();

	let swiperEl: Element | null = $state(null);
	let curretIndex = $state(0);
	const spaceBetween = 10;
</script>

{#snippet resultLi(img: string, logo: string, tit: string, badge: string[], txt: string[], etc: string[])}
	<swiper-slide class="grid grid-cols-1 items-center gap-5 p-5 lg:grid-cols-[minmax(480px,4fr)_minmax(420px,6fr)] lg:gap-15 lg:p-7.5">
		<div class="relative transition-all">
			<picture class="bg-primary/10 inline-flex h-53.75 w-auto overflow-clip rounded-xl lg:h-120">
				<img src={img} alt="" class="flex-none object-cover lg:w-full" />
			</picture>
		</div>

		<div class="inline-grid place-content-baseline gap-5">
			{#if logo}
				<picture class="inline-flex h-5 overflow-clip"><img src={logo} alt="" class="h-full object-cover" /></picture>
			{/if}

			<h4 class="text-lg font-bold lg:text-4xl">{tit}</h4>

			{#if badge}
				<div>
					{#each badge as b, i (`case-b-${i}`)}
						<p class="bg-primary/10 inline-flex rounded-full px-5 py-1">{b}</p>
					{/each}
				</div>
			{/if}

			<div>
				{#each txt as t, i (`case-t-${i}`)}
					<p class="text-2md text-666 text-lg">{t}</p>
				{/each}
			</div>

			<ul class="text-2md border-t-d9d9d9 space-y-2.5 border-t border-dashed pt-5 text-lg font-bold">
				{#each etc as e, i (`case-e-${i}`)}
					<li class="flex items-center gap-1.5">
						<icon-list name="tick-circle-list" class="fill-primary size-5"></icon-list>
						{e}
					</li>
				{/each}
			</ul>
		</div>
	</swiper-slide>
{/snippet}

<section data-scroll="slide-up" class="divide-d9d9d9 relative divide-y rounded-xl bg-white">
	<ul class="flex max-w-dvw snap-x snap-start gap-2.5 overflow-auto p-5 lg:gap-5 lg:p-7.5">
		{#each lists as { btn }, i (`case-btn-${i}`)}
			<li class="flex-none">
				<button
					type="button"
					class="label-check aria-current:border-primary aria-current:bg-primary flex-none place-items-center rounded-full aria-current:text-white"
					onclick={(e) => {
						e.preventDefault();
						curretIndex = i;
						(swiperEl as any)?.swiper?.slideTo(i, 450);
					}}
					aria-current={curretIndex === i ? 'true' : undefined}
				>
					<span>{btn}</span>
				</button>
			</li>
		{/each}
	</ul>
	<swiper-container
		bind:this={swiperEl}
		slides-per-view={1}
		space-between={spaceBetween}
		centered-slides={true}
		speed="450"
		autoplay-delay="5000"
		pagination={{
			hideOnClick: true,
		}}
		data-scroll="slide-up"
	>
		{#each lists as list, i}
			{@render resultLi(list.img, list.logo, list.tit, list.badge, list.txt, list.etc)}
		{/each}
	</swiper-container>
</section>
