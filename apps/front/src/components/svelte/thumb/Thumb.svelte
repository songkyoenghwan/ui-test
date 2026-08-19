<script lang="ts">
	import Icons from '@/svelte/icons/Icons.svelte';
	import { Modal } from 'flowbite-svelte';
	import Swiper from 'swiper';
	import { Navigation, Pagination } from 'swiper/modules';
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import { tick } from 'svelte';
	import type { Attachment } from 'svelte/attachments';

	let { facilityFiles = [], variant = '' } = $props();
	let restFiles = $derived(facilityFiles ?? []);
	let defaultModal = $state(false);
	let swiperInstance: Swiper | null = $state(null);
	let swiperIdx: number = $state(0);

	function imgRatio(element: HTMLElement): ReturnType<Attachment> {
		const img = element as HTMLImageElement;

		const width = img.naturalWidth;
		const height = img.naturalHeight;
		const ratio = height > 0 ? width / height : 0;

		let orientation = 'square';
		if (width > height) orientation = 'landscape';
		if (width < height) orientation = 'portrait';

		img.dataset.ratio = String(ratio);
		img.dataset.orientation = orientation;
		img.dataset.width = String(width);
		img.dataset.height = String(height);

		return () => {
			delete img.dataset.ratio;
			delete img.dataset.orientation;
			delete img.dataset.width;
			delete img.dataset.height;
		};
	}

	const swiperAttach = (node: HTMLElement) => {
		swiperInstance = new Swiper(node, {
			modules: [Navigation, Pagination],
			slidesPerView: 1,
			spaceBetween: 0,
			centeredSlides: true,
			observer: true,
			observeParents: true,
			navigation: {
				nextEl: '.thumb-button-next',
				prevEl: '.thumb-button-prev',
			},
			pagination: {
				el: '.thumb-pagination',
				type: 'bullets',
				clickable: true,
			},
		});

		return () => {
			swiperInstance?.destroy(true, true);
			swiperInstance = null;
		};
	};

	const modalThumbHandler = (i = 0) => {
		defaultModal = true;
		swiperIdx = i;
	};

	$effect(() => {
		if (!defaultModal) return;

		tick().then(() => {
			swiperInstance?.update();
			swiperInstance?.slideTo(swiperIdx, 0);
		});
	});
</script>

{#if variant === 'guide'}
	<ul
		class="scrollbar-hide inline-flex w-full max-w-[clac(100dvw-40px)] snap-x snap-mandatory items-center gap-2 overflow-x-auto"
	>
		{#each restFiles as item, idx (item.id)}
			<li class="size-25 flex-none snap-center overflow-clip rounded-lg">
				<button
					type="button"
					class="inline-flex h-full flex-none"
					onclick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						modalThumbHandler(idx);
					}}
				>
					<picture
						class="flex size-full flex-none items-center justify-center overflow-hidden rounded-lg bg-slate-50 object-cover"
					>
						<img src={item.fileUrl} class="max-w-auto h-auto min-h-full object-cover" alt="" />
					</picture>
				</button>
			</li>
		{/each}
	</ul>
{:else}
	{#each restFiles as item (item.id)}
		<button type="button" class="inline-flex h-full flex-none" onclick={() => (defaultModal = true)}>
			<picture class="size-17.5 flex-none overflow-clip rounded-sm bg-slate-50 object-cover">
				<img src={item.fileUrl} class="max-w-auto h-full object-cover" alt="" />
			</picture>
		</button>
	{/each}
{/if}

<Modal
	bind:open={defaultModal}
	placement="center"
	size="none"
	fullscreen
	class="model-thumb h-dvh max-h-dvh max-w-dvw divide-transparent overflow-clip rounded-none bg-slate-800 *:h-dvh *:p-0"
	classes={{ header: 'p-0 md:p-0', body: 'p-0 md:p-0 overflow-hidden' }}
>
	<div class="flex h-full w-full items-center justify-center overflow-hidden">
		<div {@attach swiperAttach} class="swiper h-full w-full max-w-full min-w-0 overflow-hidden">
			<button
				type="button"
				aria-label="thumbnail slide prev"
				class="swiper-button-prev thumb-button-prev -left-2.5! stroke-white text-white! *:fill-white!"
			>
				<Icons name="arrow-slide" cls="w-5.5 h-10.5 rotate-180 stroke-white" />
			</button>
			<div class="swiper-wrapper">
				{#each restFiles as item (item.id)}
					<div class="swiper-slide flex h-full w-full place-content-center items-center justify-center">
						<img {@attach imgRatio} src={item.fileUrl} alt="" class="block max-h-full max-w-full object-contain" />
					</div>
				{/each}
			</div>
			<div class="swiper-pagination thumb-pagination"></div>

			<button
				type="button"
				aria-label="thumbnail slide next"
				class="swiper-button-next thumb-button-next -right-2.5! stroke-white text-white! *:fill-white!"
			>
				<Icons name="arrow-slide" cls="w-5.5 h-10.5 stroke-white" />
			</button>
		</div>
	</div>

	<div class="fixed top-5 right-5 z-50">
		<button
			type="button"
			class="grid size-10 cursor-pointer place-content-center rounded-lg bg-white"
			aria-label="Close"
			onclick={() => (defaultModal = !defaultModal)}
		>
			<Icons name="close-circle" cls="size-4 stroke-black" />
			<span class="sr-only">close</span>
		</button>
	</div>
</Modal>

<style>
	:global(.swiper-pagination-bullet-active) {
		width: 1.5rem;
		border-radius: 0.25rem;
		background-color: var(--color-fff);
		transition: all ease-in 0.2s;
	}

	:global(.model-thumb) {
		& > button[type='submit'] {
			display: none;
		}
	}
</style>
