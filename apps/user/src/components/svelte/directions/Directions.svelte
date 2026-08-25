<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { distance, langStore } from '@/stores/globalStore';
	import { restorePreviousViewState, searchViewState, toastState, updateViewState } from '@/stores/uxStore';
	import Icons from '@/svelte/icons/Icons.svelte';

	function swapDistance() {
		const prev = $distance;

		distance.set({
			...prev,
			start: prev.end,
			end: prev.start,
		});
	}

	const onViewDistance = () => {
		updateViewState({
			layout: 'search',
			detail: 'idle',
			search: 'departureSearch',
		});
	};

	const backViewDistance = () => {
		if (restorePreviousViewState()) return;

		updateViewState({
			layout: 'default',
			detail: 'idle',
			search: 'default',
		});
	};
</script>

{#snippet ring(dir: string)}
	<div class={['size-3.5 rounded-full border-3 bg-white', dir === 'start' ? 'border-dd281d' : 'border-1965e9']}></div>
{/snippet}

{#if ['departure', 'path'].includes($searchViewState)}
	<header class="fixed top-0 left-0 z-40 w-full max-w-dvw gap-1 bg-white px-4 py-2 shadow-2xs">
		<div
			class={[
				'inline-grid w-full items-center gap-1',
				$searchViewState === 'departure' && 'grid-cols-[40px_1fr_40px]',
				$searchViewState === 'path' && 'min-h-14 grid-cols-[1fr_40px]',
			]}
		>
			{#if $searchViewState === 'departure'}
				<button type="button" class="size-10" onclick={swapDistance}>
					<Icons name="input-change" cls="size-7.5 bg-slate-100 rounded-full stroke-black" />
				</button>
			{/if}
			<div
				class={[
					'grid items-center gap-1',
					$searchViewState === 'departure' && 'grid-cols-[14px_1fr]',
					$searchViewState === 'path' && 'grid-cols-1',
				]}
			>
				{#if $searchViewState === 'departure'}
					<div
						aria-hidden="true"
						class="relative inline-grid h-15 gap-7.5 before:absolute before:top-2.5 before:left-1.5 before:h-8 before:w-0.5 before:border-l before:border-dashed before:border-slate-200"
					>
						{@render ring('start')}
						{@render ring('end')}
					</div>
				{/if}

				<ol
					class={[
						$searchViewState === 'departure' && 'divide-y divide-slate-200',
						$searchViewState === 'path' && 'grid grid-cols-[1fr_16px_1fr] items-center gap-1',
					]}
				>
					<li
						class={[
							$searchViewState === 'departure' && 'py-1',
							$searchViewState === 'path' && 'grid grid-cols-[14px_1fr] items-center',
						]}
					>
						{#if $searchViewState === 'path'}
							{@render ring('start')}
						{/if}
						<input
							type="text"
							placeholder={m.usr_nav_001_01({ locale: $langStore })}
							class="min-h-10 w-full px-3 text-sm outline-none"
							readonly={$searchViewState === 'path'}
							bind:value={$distance.start}
							oninput={(e) => distance.setKey('start', e.currentTarget.value)}
							onclick={() => onViewDistance()}
						/>
					</li>

					{#if $searchViewState === 'path'}
						<Icons name="back" cls="size-4 stroke-slate-500 rotate-180" />
					{/if}
					<li
						class={[
							$searchViewState === 'departure' && 'py-1',
							$searchViewState === 'path' && 'grid grid-cols-[14px_1fr] items-center',
						]}
					>
						{#if $searchViewState === 'path'}
							{@render ring('end')}
						{/if}
						<input
							type="text"
							placeholder={m.usr_nav_001_02({ locale: $langStore })}
							class="min-h-10 w-full px-3 text-sm outline-none"
							readonly={$searchViewState === 'path'}
							bind:value={$distance.end}
							oninput={(e) => distance.setKey('end', e.currentTarget.value)}
							onclick={() => onViewDistance()}
						/>
					</li>
				</ol>
			</div>
			<button
				type="button"
				class="grid size-10 cursor-pointer place-content-center rounded-lg bg-white"
				aria-label="Close"
				onclick={backViewDistance}
			>
				<Icons name="close-circle" cls="size-4 stroke-black" />
				<span class="sr-only">close</span>
			</button>
		</div>
	</header>
{/if}

{#if ['same', 'disabled', 'far', 'arrival'].includes($toastState)}
	<div
		class={[
			'fixed right-5 left-5 z-40 max-w-dvw shadow-2xs transition-all starting:top-20',
			$searchViewState === 'finding' && 'top-5',
			$searchViewState === 'path' && 'top-23',
		]}
	>
		<div
			class={[
				'relative inline-grid w-full items-center gap-1 rounded-lg border bg-white px-4 py-3 opacity-100 transition-all starting:opacity-0',
				$toastState !== 'arrival' && 'border-error grid-cols-[36px_1fr] grid-rows-2',
				$toastState === 'arrival' && 'border-1553ff grid-cols-[36px_1fr_40px]',
			]}
		>
			<p class={[$toastState !== 'arrival' && 'row-span-2']}>
				{#if $toastState === 'arrival'}
					<Icons name="arrival-toast" cls="size-9" />
				{:else}
					<Icons name="alert-toast" cls="size-9 fill-error" />
				{/if}
			</p>

			<p class="text-121212 leading-tight font-semibold">
				{#if $toastState === 'same'}
					{m.usr_nav_001_03({ locale: $langStore })}
				{:else if $toastState === 'disabled'}
					{m.usr_nav_001_05({ locale: $langStore })}
				{:else if $toastState === 'far'}
					{m.usr_nav_001_07({ locale: $langStore })}
				{:else if $toastState === 'arrival'}
					{m.usr_rec_201_09({ locale: $langStore })}
				{/if}
			</p>

			{#if $toastState !== 'arrival'}
				<p class="text-sm leading-[1.1] text-slate-500">
					{#if $toastState === 'same'}
						{m.usr_nav_001_04({ locale: $langStore })}
					{:else if $toastState === 'disabled'}
						{m.usr_nav_001_06({ locale: $langStore })}
					{:else if $toastState === 'far'}
						{m.usr_nav_001_08({ locale: $langStore })}
					{/if}
				</p>
			{:else}
				<button
					type="button"
					class="grid size-10 cursor-pointer place-content-center rounded-lg bg-white"
					aria-label="Close"
					onclick={() => toastState.set('none')}
				>
					<Icons name="close-circle" cls="size-4 stroke-black" />
					<span class="sr-only">close</span>
				</button>
			{/if}
		</div>
	</div>
{/if}
