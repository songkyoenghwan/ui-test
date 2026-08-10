<script lang="ts">
	import Icons from '@/svelte/icons/Icons.svelte';
	import { setSheetMidH, setSheetMinH, setSheetScrollRef, setPointSheetUi } from '@/src/stores/sheetUiStore';

	let tab = $state<'ai-recommend' | 'popularity'>('ai-recommend');
	let scrollEl: HTMLDivElement | null = $state(null);

	$effect(() => {
		setSheetScrollRef(scrollEl);
	});
</script>

<div class="px-6 py-1" bind:clientHeight={null, setSheetMinH}>
	<div class="*:text-cente grid grid-cols-2 rounded-lg bg-slate-100 p-1 *:min-h-8">
		<label
			for="ai-recommend"
			class="flex items-center justify-center gap-1 rounded-lg bg-slate-100 text-black has-checked:bg-white"
		>
			<input
				type="radio"
				bind:group={tab}
				value="ai-recommend"
				id="ai-recommend"
				class="peer sr-only"
				onchange={() => setPointSheetUi('max')}
			/>
			{#if tab === 'ai-recommend'}
				<Icons name="ai-on" cls="size-4" />
			{:else}
				<Icons name="ai-off" cls="size-4 fill-121212" />
			{/if}
			AI 추천
		</label>
		<label
			for="popularity"
			class="flex items-center justify-center gap-1 rounded-lg bg-slate-100 text-black has-checked:bg-white"
		>
			<input
				type="radio"
				bind:group={tab}
				value="popularity"
				id="popularity"
				class="peer sr-only"
				onchange={() => setPointSheetUi('max')}
			/>
			{#if tab === 'popularity'}
				<Icons name="trending-on" cls="size-4" />
			{:else}
				<Icons name="trending-off" cls="size-4 fill-121212" />
			{/if}
			인기
		</label>
	</div>
</div>

<div bind:this={scrollEl}>
	<ul class="min-h-px" bind:clientHeight={null, setSheetMidH}>
		<li class={[tab === 'ai-recommend' ? 'flex flex-col' : 'hidden']}>
			<p class="flex items-center gap-1 p-5">
				<Icons name="ai-on" cls="size-4" />
				$키워드 영역$가 많이 찾는 시설이에요
			</p>
		</li>
		<li class={[tab === 'popularity' ? 'flex flex-col' : 'hidden']}>
			<p class="flex items-center gap-1 p-5">
				<Icons name="trending-on" cls="size-4" />
				방문객이 많이 찾은 시설이에요
			</p>
		</li>
	</ul>
</div>
