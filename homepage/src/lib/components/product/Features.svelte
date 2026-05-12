<script lang="ts">
	import SubHeading from '$lib/components/heading/SubHeading.svelte';
	import daoLogo from '$lib/imgs/logo/logo-dao-only.svg';
	import dscLogo from '$lib/imgs/logo/logo-dsc-only.svg';
	import { onMount } from 'svelte';

	let { tit = '', txt = '', subtxt = '', lists = [], logo = '' } = $props();

	let logoType = $derived(logo === 'dao' ? daoLogo : dscLogo);
	let videoEl: HTMLVideoElement = $state(null);

	onMount(() => {
		if (videoEl) {
			videoEl.muted = true;
			videoEl.play().catch(() => {});
		}
	});
</script>

<section class="space-y-5 rounded-xl py-11.25 lg:space-y-7.5 lg:py-15">
	<SubHeading {tit} {txt} {subtxt} />
	<ul class="flex flex-col gap-5 xl:gap-7.5">
		{#each lists as item}
			<li class="grid gap-5 rounded-xl bg-white p-5 lg:grid-cols-[minmax(0,1fr)_640px] xl:flex-row xl:gap-50 xl:p-15">
				<div class="flex flex-col justify-between gap-2.5">
					<dl class="space-y-2.5 xl:space-y-5">
						<dt class="text-2xl font-bold xl:text-5xl">{@html item.tit}</dt>
						<dd class="text-lg xl:text-2xl">{@html item.txt}</dd>

						{#if item.subtxt}
							<dd class="text-2sm text-666 xl:text-lg">{@html item.subtxt}</dd>
						{/if}
					</dl>

					<div class="divide-d9d9d9 divide-y divide-dashed">
						{#if item.labels}
							<ul class="inline-flex flex-wrap gap-2.5 py-5 xl:pt-5 xl:pb-7.5">
								{#each item.labels as laebl, i (i)}
									<li class="bg-ebedff xl:text-2md text-2sm text-3f53ff flex flex-none items-center rounded-full px-5 py-1">{laebl}</li>
								{/each}
							</ul>
						{/if}

						<div class="pt-5">
							<div class="bg-ebedff flex min-h-10 items-center gap-2.5 rounded-[1.25rem] px-1.25 py-2.5 xl:p-1.25">
								<picture class="flex size-7.5">
									<enhanced:img src={logoType} alt="logo" class="h-full" />
								</picture>
								<p class="xl:text-2md text-2sm">{item.logo}</p>
							</div>
						</div>
					</div>
				</div>

				<div>
					<video
						bind:this={videoEl}
						src="https://videos.pexels.com/video-files/35423737/15008263_2560_1440_30fps.mp4"
						class="bg-ebedff aspect-video h-auto w-full rounded-2xl object-cover sm:h-90 xl:w-160"
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
