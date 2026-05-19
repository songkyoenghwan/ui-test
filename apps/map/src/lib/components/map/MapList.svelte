<svelte:options
	customElement={{
		tag: 'map-list',
		shadow: 'none',
		props: {
			list: { type: 'Array', reflect: true },
			selectedItem: { type: 'Object' },
		},
	}}
/>

<script lang="ts">
	type Place = {
		tit: string;
		top: string;
		bottom: string;
	};
	type Item = {
		id: string;
		tit: string;
		poi: string;
		places: Place[] | number;
		exposure: boolean;
	};

	let { list = [] }: { list: Item[] } = $props();
	let containerRef: HTMLElement | null = $state(null);
	let page = $state(50);
	let visibleItems = $derived(list.slice(0, page));

	function handleScroll() {
		if (!containerRef) return;

		const { scrollTop, scrollHeight, clientHeight } = containerRef;

		if (scrollTop + clientHeight >= scrollHeight - 100 && page < list.length) {
			page += 50;
		}
	}

	function handleClick(e: Event, item: Item) {
		e.preventDefault();

		const detail = {
			type: 'poi-click',
			timestamp: Date.now(),
			targetId: item.id,
			item: item,
		};

		$host().dispatchEvent(
			new CustomEvent('poi-click', {
				detail,
				bubbles: true,
				composed: true,
			}),
		);
	}
</script>

{#if list.length === 0}
	<div class="flex flex-1 flex-col items-center justify-center gap-3 p-5 text-center">
		<icon-list data-name="mouse-circle" class="icon stroke-primary fill-primary size-6.5"></icon-list>
		<p class="text-xl text-slate-400">
			지도를 우클릭하면
			<br />
			새 위치가 생성됩니다
		</p>
	</div>
{:else}
	<ul bind:this={containerRef} onscroll={handleScroll} class="flex flex-1 scrollbar-gutter-stable flex-col gap-2 overflow-x-clip overflow-y-auto scroll-smooth pl-5">
		{#each visibleItems as item, index (item?.id)}
			<li data-index={index} class="w-full">
				<button
					type="button"
					aria-label={item.poi}
					class="grid w-full grid-cols-[1fr_minmax(0,40px)] grid-rows-2 space-y-1 rounded-sm border border-slate-200 bg-white px-4 py-3"
					onclick={(e) => handleClick(e, item)}
				>
					<span class="order-1 col-span-1 row-span-1 truncate text-left text-base">{item.tit === '' ? '이름 없음' : item.tit}</span>
					<strong class="order-3 col-span-1 row-span-1 flex items-center gap-2 divide-x divide-slate-200 font-normal">
						<span class="pr-2 text-slate-600">{item.poi}</span>
						<strong class="flex items-center font-normal">
							<span class="flex gap-1 pr-2 text-slate-400">등록시설</span>
							{#if typeof item.places === 'number'}
								<span class={item.places === 0 ? 'text-error' : 'text-primary'}>
									{item.places}
								</span>
							{:else}
								<span class={item.places.length === 0 ? 'text-error' : 'text-primary'}>
									{item.places.length}
								</span>
							{/if}
							<span>개</span>
						</strong>
					</strong>

					<strong class="order-2 row-span-2 grid place-items-center">
						{#if item.exposure}
							<span class="text-primary text-sm font-bold">비노출</span>
						{/if}
					</strong>
				</button>
			</li>
		{/each}
	</ul>
{/if}
