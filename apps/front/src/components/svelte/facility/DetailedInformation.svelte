<script lang="ts">
	import { tick } from 'svelte';
	import { langState, pickText } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import type { FacilityDetailResponse } from '@/types/facilities';
	import IntersectionObserver from 'svelte-intersection-observer';

	let element: HTMLDivElement | undefined = $state();
	let intersecting = $state(false);
	let open = $state(false);
	let contentHeight = $state(0);
	let hasOverflow = $state(false);

	type Props = {
		facility?: FacilityDetailResponse;
	};

	let { facility }: Props = $props();

	async function measure() {
		await tick();
		if (!element) return;

		hasOverflow = contentHeight > 70;
	}

	function toggle() {
		open = !open;
		measure();
	}

	$effect(() => {
		measure();
	});

	$effect(() => {
		if (intersecting) {
			measure();
		}
	});
</script>

<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
	<p class="text-000 flex items-center gap-2 text-base">
		<Icons name="chat" cls="size-4 fill-slate-400" />
		상세 정보
	</p>
	<IntersectionObserver {element} bind:intersecting>
		<div class="relative rounded-lg bg-slate-100 p-3 transition-all">
			<div
				bind:this={element}
				class={['relative overflow-clip bg-slate-100 transition-all', open ? 'max-h-max' : 'max-h-17.5 overflow-clip']}
			>
				<p
					class="relative bg-slate-100 text-xs whitespace-pre-line text-slate-700 transition-all"
					bind:clientHeight={contentHeight}
				>
					{pickText(facility?.description, $langState)}
				</p>
			</div>

			{#if hasOverflow}
				<button
					type="button"
					class="flex min-h-6 w-full items-center justify-center gap-3 pt-2"
					onclick={toggle}
					aria-expanded={open}
				>
					<span class=" flex items-center justify-center gap-1 text-xs text-slate-500">
						<span class={['relative transition-all', open ? 'rotate-90' : 'rotate-270']}>
							<Icons name="arrow-left" cls="size-4 stroke-slate-500" />
						</span>
						상세 정보
					</span>

					<Icons
						name="arrow-down"
						cls={`size-4 fill-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
					/>
				</button>
			{/if}
		</div>
	</IntersectionObserver>
</div>
