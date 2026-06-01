<script lang="ts">
	import { ParaglideMessage } from '@inlang/paraglide-js-svelte';
	import { getContext } from 'svelte';
	import { register } from 'swiper/element/bundle';

	$effect(() => {
		register();
	});

	// oxlint-disable-next-line typescript/no-explicit-any
	const caseContext = getContext<{ list: any[] }>('case-list');

	let swiperEl: Element | null = $state(null);
	let curretIndex = $state(0);
	const spaceBetween = 10;
</script>

{#snippet resultLi(img: string, logo: string[], tit: string, badge: string[], txt: string[], etc: [])}
	<swiper-slide class="grid grid-cols-1 items-center gap-5 p-5 lg:grid-cols-[minmax(480px,4fr)_minmax(460px,6fr)] lg:p-7.5 xl:gap-15">
		<div class="relative transition-all">
			<picture class="bg-primary/10 inline-flex h-53.75 w-auto overflow-clip rounded-xl max-lg:max-w-80.5 lg:h-120">
				<img loading="lazy" src={img} alt="" class="flex-none object-cover lg:w-full" />
			</picture>
		</div>

		<div class="inline-grid place-content-baseline gap-5">
			{#if logo}
				<div class="inline-flex flex-wrap gap-2.5">
					{#each logo as l, i (`case-l-${i}`)}
						{#if l === 'client'}
							<p>
								<span class="text-2md bg-999 inline-flex min-h-7.5 items-center gap-3 rounded-full px-2.5 text-white">
									<icon-list name="lock" class="size-5 fill-white"></icon-list>
									Client Confidential
								</span>
							</p>
						{/if}

						{#if l !== 'client'}
							<picture class="inline-flex h-7.5 overflow-clip">
								<img loading="lazy" src={l} alt="" class="h-full object-cover" />
							</picture>
						{/if}
					{/each}
				</div>
			{/if}

			<h4 class="text-lg font-bold lg:text-4xl">{tit}</h4>

			{#if badge}
				<div class="inline-flex flex-wrap gap-2.5">
					{#each badge as b, i (`case-b-${i}`)}
						<p class="bg-primary/10 inline-flex flex-none rounded-full px-5 py-1">{b}</p>
					{/each}
				</div>
			{/if}

			<div>
				{#each txt as t, i (`case-t-${i}`)}
					<p class="text-2md text-666 text-lg">{t}</p>
				{/each}
			</div>

			<ul class="text-2md border-t-d9d9d9 space-y-2.5 border-t border-dashed pt-5 text-lg font-bold">
				{#each etc as msg, i (`case-e-${i}`)}
					<li class="flex items-center gap-1.5">
						<icon-list name="tick-circle-list" class="fill-primary size-5"></icon-list>
						<div>
							<ParaglideMessage message={msg}>
								{#snippet b({ children })}
									<strong class="text-primary font-bold">{@render children?.()}</strong>
								{/snippet}
							</ParaglideMessage>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</swiper-slide>
{/snippet}

<section data-scroll="slide-up" class="divide-d9d9d9 relative divide-y rounded-xl bg-white">
	<ul class="flex max-w-dvw snap-x snap-start gap-2.5 overflow-auto p-5 lg:gap-5 lg:p-7.5">
		{#each caseContext.list as { btn }, i (`case-btn-${i}`)}
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
		{#if caseContext?.list}
			{#each caseContext.list as list (list.id)}
				{@render resultLi(list.img, list.logo, list.tit, list.badge || [], list.txt, list.etc)}
			{/each}
		{/if}
	</swiper-container>
</section>
