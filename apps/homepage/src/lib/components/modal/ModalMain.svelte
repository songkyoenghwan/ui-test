<svelte:options
	customElement={{
		tag: 'modal-main',
		shadow: 'none',
		props: {
			list: { type: 'Array' },
		},
	}}
/>

<script lang="ts">
	import type { SwiperContainerElement } from '$lib/types/swiperType';
	import { tick } from 'svelte';
	import { register } from 'swiper/element/bundle';

	let { list } = $props();

	let isMenuOpen: boolean = $derived(false);
	register();
	let modalElm = $state<HTMLDialogElement | null>(null);
	let swiperEl = $state<SwiperContainerElement | null>(null);
	let swipe = $derived(swiperEl?.swiper);
	let currentIndex = $state(0);

	const handleSlideChange = async () => {
		await tick();
		if (swiperEl?.swiper) {
			currentIndex = swiperEl.swiper.realIndex;
		}
	};

	const handleStorage = {
		setStorage(name: string, expDays: number): void {
			const expirationTime = Date.now() + expDays * 24 * 60 * 60 * 1000;
			localStorage.setItem(name, expirationTime.toString());
		},
		getStorage(name: string): boolean {
			const storedValue = localStorage.getItem(name);

			if (!storedValue) return false;

			const storedTime = parseInt(storedValue, 10);

			if (isNaN(storedTime)) {
				localStorage.removeItem(name);
				return false;
			}
			const storedDate = new Date(storedTime).toDateString();
			const todayDate = new Date().toDateString();

			if (storedDate !== todayDate) {
				localStorage.removeItem(name);
				return false;
			}

			return true;
		},
		setStorageToMidnight(name: string): void {
			const now = new Date();
			const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
			localStorage.setItem(name, midnight.getTime().toString());
		},
	};

	$effect.pre(() => {
		if (!handleStorage.getStorage('main-modal')) {
			isMenuOpen = true;
			tick().then(() => {
				modalElm?.showModal();
			});
		}
	});

	$effect(() => {
		if (swiperEl) {
			swiperEl.addEventListener('swiperslidechange', handleSlideChange);

			return () => {
				if (swiperEl) {
					swiperEl.removeEventListener('swiperslidechange', handleSlideChange);
				}
			};
		}
	});

	const closeModal = () => {
		isMenuOpen = false;
		modalElm?.close();
	};
</script>

<svelte:window class:overflow-hidden={isMenuOpen} />
<svelte:body class:overflow-hidden={isMenuOpen} />

{#if isMenuOpen && list.length > 0}
	<dialog
		bind:this={modalElm}
		class="backdrop:bg-000/70 top-0 left-0 z-200 m-0 hidden h-dvh max-h-dvh w-dvw max-w-dvw place-content-center gap-5 bg-transparent p-0 open:fixed open:grid"
	>
		<div class="flex justify-between gap-2 max-lg:px-5">
			<label class="label gap-2.5" for="contactCheckbox">
				<input
					class="peer sr-only"
					id="contactCheckbox"
					type="checkbox"
					onchange={(e) => {
						const target = e.currentTarget as HTMLInputElement;
						if (target.checked) {
							handleStorage.setStorageToMidnight('main-modal');
						}
					}}
				/>
				<icon-list
					class="peer-checked:bg-primary peer-checked:border-primary size-9 rounded-md border border-white bg-white peer-checked:stroke-white"
					name="chk"
				></icon-list>
				<span class="text-2md text-white">오늘 하루 보지 않기</span>
			</label>

			<button
				class="group grid size-9 place-content-center rounded-full bg-white transition-colors hover:bg-black hover:text-white"
				onclick={(e) => {
					e.preventDefault();
					closeModal();
				}}
			>
				<span class="sr-only">Close</span>
				<icon-list name="close" class="size-3 stroke-black group-hover:stroke-white"></icon-list>
			</button>
		</div>
		<section class="relative w-dvw rounded-xl lg:w-90">
			<swiper-container
				bind:this={swiperEl}
				class="w-full lg:min-w-80"
				pagination={false}
				slides-per-view="1"
				speed="500"
				loop="true"
				space-between="10"
				onslidechange={() => {
					swiperEl = swiperEl;
				}}
			>
				{#each list as item}
					<swiper-slide lazy="true" class="overflow-clip rounded-xl bg-white max-lg:w-[calc(100dvw-40px)] lg:w-90">
						<picture class="rounded-t-xl"><img src={item.img} loading="lazy" alt="" class="lg:h-105 lg:w-90" /></picture>
						<div class="rounded--b-xl grid w-full grid-cols-1 overflow-clip">
							<a href={item.link} aria-label={item.title} class="bg-primary grid place-content-center text-2xl font-bold text-white lg:min-h-15">
								<span>{item.title}</span>
							</a>
						</div>
					</swiper-slide>
				{/each}
			</swiper-container>
		</section>

		<div class="relative z-1 flex w-full items-center justify-between gap-2 max-lg:px-5">
			<button
				class="group grid size-6 place-content-center rounded-full bg-white/20 transition-colors hover:bg-white"
				onclick={() => {
					swipe?.slidePrev();
				}}
			>
				<span class="sr-only">Slide Prev</span>
				<icon-list name="arrow-right" class="size-4 rotate-180 stroke-white group-hover:stroke-black"></icon-list>
			</button>

			<p class="min-w-18 rounded-full bg-white/20 px-5 py-px text-white">
				<strong>{currentIndex + 1}</strong>
				&#47;
				<span>
					{swipe?.slides?.length ?? 0}
				</span>
			</p>
			<button
				class="group grid size-6 place-content-center rounded-full bg-white/20 transition-colors hover:bg-white"
				onclick={() => {
					swipe?.slideNext();
				}}
			>
				<span class="sr-only">Slide Next</span>
				<icon-list name="arrow-right" class="size-4 stroke-white group-hover:stroke-black"></icon-list>
			</button>
		</div>
	</dialog>
{/if}
