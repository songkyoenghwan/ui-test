<!-- <script lang="ts">
	import { onMount } from 'svelte';

	let listEl: HTMLUListElement;
	let locked = false;
	let currentIndex = 0;
	let items: HTMLElement[] = [];

	onMount(() => {
		items = Array.from(listEl.querySelectorAll('li')) as HTMLElement[];

		const onWheel = (e: WheelEvent) => {
			e.preventDefault();
			if (locked) return;

			const direction = e.deltaY > 0 ? 1 : -1;
			const nextIndex = Math.max(0, Math.min(items.length - 1, currentIndex + direction));

			if (nextIndex === currentIndex) return;

			locked = true;
			currentIndex = nextIndex;

			items[currentIndex].scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});

			setTimeout(() => {
				locked = false;
			}, 700);
		};

		window.addEventListener('wheel', onWheel, { passive: false });

		return () => window.removeEventListener('wheel', onWheel);
	});
</script> -->

<!-- <script lang="ts">
	import { createTimeline, onScroll, utils } from 'animejs';
	import { onMount } from 'svelte';

	let el: HTMLUListElement;

	onMount(() => {
		const cards = Array.from(el.querySelectorAll('li')) as HTMLElement[];

		utils.set(cards, { opacity: 0, y: 150 });

		const tl = createTimeline({
			defaults: {
				duration: 600,
				ease: 'linear',
			},
			autoplay: onScroll({
				container: document.body,
				target: el,
				enter: 'bottom top',
				leave: 'top bottom',
				sync: 0.05,
				debug: false,
			}),
		});

		cards.forEach((card, i) => {
			tl.add(
				card,
				{
					opacity: [0, 1],
					y: [150, 0],
				},
				i * 500,
			);
		});
	});
</script> -->
<!-- 
<script lang="ts">
	import { animate } from 'animejs';
	import { onMount } from 'svelte';

	let el: HTMLUListElement;
	let items: HTMLElement[] = [];
	let currentIndex = 0;
	let locked = false;

	onMount(() => {
		items = Array.from(el.querySelectorAll('li')) as HTMLElement[];

		items.forEach((item) => {
			item.style.opacity = '0';
			item.style.transform = 'translateY(80px)';
		});

		const showItem = (index: number) => {
			const item = items[index];
			if (!item) return;

			item.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});

			animate(item, {
				opacity: [0, 1],
				y: [80, 0],
				duration: 600,
				easing: 'easeOutQuad',
			});
		};

		const onWheel = (e: WheelEvent) => {
			const direction = e.deltaY > 0 ? 1 : -1;
			const nextIndex = currentIndex + direction;

			if (currentIndex === 0 && direction < 0) return; // 부모 스크롤 허용
			e.preventDefault();

			if (nextIndex >= items.length) {
				return;
			}

			locked = true;
			currentIndex = nextIndex;
			showItem(currentIndex);

			setTimeout(() => {
				locked = false;
			}, 700);
		};

		window.addEventListener('wheel', onWheel, { passive: false });
		showItem(0);

		return () => window.removeEventListener('wheel', onWheel);
	});
</script> -->

<ul bind:this={el} class="overflow-hidden">
	<li class="box relative h-100 bg-red-600"></li>
	<li class="box relative h-100 bg-red-50"></li>
	<li class="box relative h-100 bg-red-400"></li>
	<li class="box relative h-100 bg-blue-200"></li>
	<li class="box relative h-100 bg-rose-950"></li>
</ul>
