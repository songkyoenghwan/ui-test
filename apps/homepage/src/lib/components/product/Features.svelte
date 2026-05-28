<script lang="ts">
	import daoLogo from '$lib/assets/imgs/logo/logo-dao-only.svg';
	import dscLogo from '$lib/assets/imgs/logo/logo-dsc-only.svg';
	import SubHeading from '$lib/components/heading/SubHeading.svelte';
	import { parseBreakline } from '$lib/utils/textUtils.svelte';

	let { tit = '', txt = '', subTxt = '', lists = [], logo = '' } = $props();

	let logoType = $derived(logo === 'dao' ? daoLogo : dscLogo);
	let videoEl: HTMLVideoElement | null = $state(null);

	$effect.pre(() => {
		if (videoEl) {
			videoEl.muted = true;
			videoEl.play().catch(() => {});
		}
	});
</script>

<section class="space-y-5 rounded-xl py-11.25 lg:space-y-7.5 lg:py-15">
	<SubHeading {tit} {txt} {subTxt} />
	<ul data-scroll="slide-up" class="flex flex-col gap-5 lg:gap-7.5">
		{#each lists as item, i (i)}
			<li class="stack-card relative grid gap-5 rounded-xl bg-white p-5 shadow-md lg:grid-cols-[1fr_fit-content(640px)] lg:flex-row lg:gap-15 lg:p-15 xl:gap-50">
				<div class="flex flex-col justify-between gap-2.5">
					<dl class="space-y-2.5 lg:space-y-5">
						<dt class="text-2xl font-bold lg:text-5xl">{parseBreakline(item.tit)}</dt>
						<dd class="text-lg lg:text-2xl">{parseBreakline(item.txt)}</dd>

						{#if item.subTxt}
							<dd class="text-2sm text-666 lg:text-lg">{parseBreakline(item.subTxt)}</dd>
						{/if}
					</dl>

					<div class="divide-d9d9d9 divide-y divide-dashed">
						{#if item.labels}
							<ul class="inline-flex flex-wrap gap-2.5 py-5 lg:pt-5 lg:pb-7.5">
								{#each item.labels as laebl, i (i)}
									<li class="bg-ebedff lg:text-2md text-2sm text-3f53ff flex flex-none items-center rounded-full px-5 py-1">{laebl}</li>
								{/each}
							</ul>
						{/if}

						<div class="pt-5">
							<div class="bg-ebedff flex min-h-10 items-center gap-2.5 rounded-[1.25rem] px-1.25 py-2.5 lg:p-1.25">
								<picture class="flex size-7.5">
									<enhanced:img src={logoType} alt="logo" class="h-full" />
								</picture>
								<p class="lg:text-2md text-2sm">{item.logo}</p>
							</div>
						</div>
					</div>
				</div>

				<div>
					<video
						bind:this={videoEl}
						src="https://videos.pexels.com/video-files/35423737/15008263_2560_1440_30fps.mp4"
						class="bg-ebedff aspect-video h-auto w-full rounded-2xl object-cover sm:h-90 lg:w-160"
						autoplay
						muted
						playsinline
						loop
					>
						<source src="https://videos.pexels.com/video-files/35423737/15008263_2560_1440_30fps.mp4" type="video/mp4" />
					</video>
				</div>
			</li>
		{/each}
	</ul>
</section>
