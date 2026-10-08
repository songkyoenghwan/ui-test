<script lang="ts">
	import Icons from '$/lib/components/icons/Icons.svelte';
	import type { PageProps } from './$types';
	import Btns from '@/lib/components/button/Btns.svelte';
	import { Tooltip } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';

	let { data }: PageProps = $props();

	let simulateState = $state(false);

	let padNumber = (i: number): string => {
		return `TL-${String(i + 1).padStart(2, '0')}`;
	};
	let lineArea = $state(
		Array.from({ length: 16 }, (_, i) => {
			const num = i;

			return {
				name: padNumber(num),
				id: padNumber(num),
			};
		}),
	);
	function makeRange(start: number, end: number) {
		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	}
	let firstLineArea = $derived(lineArea.slice(0, 8));
	let secondLineArea = $derived(lineArea.slice(8, 16));

	function simulateHandler(e: MouseEvent) {
		e.preventDefault();

		const target = e.currentTarget as HTMLElement | null;
		if (!target) return;

		simulateState = !simulateState;
	}

	function getActiveSimulation(areaId: string) {
		return data.simulation.find((item) => item.current_state.startsWith(areaId));
	}

	function refreshHandler(e: MouseEvent) {
		e.preventDefault();

		const target = e.currentTarget as HTMLElement | null;
		if (!target) return;

		target.classList.remove('rotate-720', 'duration-600', 'transition-all');
		void target.offsetWidth;
		target.classList.add('rotate-720', 'duration-600', 'transition-all');
	}
</script>

{#snippet nameArea(name: string)}
	<p
		class={[
			'flex flex-none items-center gap-1.5 rounded-full bg-white/20 px-2.5 text-base font-bold transition-all xl:gap-1.5 xl:px-5 xl:py-1.5 xl:text-2xl starting:scale-0 starting:opacity-0',
		]}
	>
		<Icons name="people" cls="fill-white size-5 xl:size-8 flex-none" />
		{name !== '' ? name : '미배정'}
	</p>
{/snippet}

{#snippet areaCol(range: number[], id: string, name: string)}
	{#if range}{/if}

	{@const activeSimulation = getActiveSimulation(id)}
	<li
		class={[
			'relative inline-flex min-h-12.5 items-center justify-between gap-1 rounded-sm border px-3 py-1 opacity-100 transition-colors xl:px-5 starting:opacity-0',
			activeSimulation ? 'border-white bg-linear-90 from-[#240102] to-[#a11f26]' : 'border-white/30',
		]}
	>
		<p class={['flex-none text-xl font-bold xl:text-4xl', activeSimulation ? 'text-white' : 'text-white/50']}>{name}</p>

		{#if activeSimulation}
			<div class={['inline-flex items-center gap-1.5 xl:gap-2.5']}>
				{@render nameArea(name)}

				<Btns
					icon="refresh-circle"
					text="새로고침"
					variant="icon-only"
					iconColor="fill-white group-disabled/btn:opacity-30 size-6 xl:size-8"
					cls="disabled:bg-transparent hover:bg-transparent disabled:hover:bg-transparent"
					onclick={refreshHandler}
				/>
				<Tooltip placement="top" class="bg-primary border-primary border text-white min-[1440px]:hidden">새로고침</Tooltip>
			</div>
		{/if}
	</li>
{/snippet}

<div class="bg-191919 grid grid-cols-10">
	<div class="col-span-7 flex flex-col p-5 xl:p-7.5">
		<section class="flex flex-none items-center justify-between gap-2">
			<header>
				<h3 class="text-xl font-bold text-white xl:text-[42px]">실시간 작업자 관제 대시보드</h3>
				<p class="mt-1 text-white/70 xl:mt-5 xl:text-2xl">스마트 글라스 2D 디지털 트윈 로케이션 모니터링</p>
			</header>
		</section>
		<section class="bg-191919 mt-3 flex w-full flex-1 flex-col border border-white/30 text-white/50 xl:mt-5">
			<div class="grid flex-1 grid-cols-[1fr_80px_1fr] xl:grid-cols-[1fr_200px_1fr]">
				<div class="flex h-full flex-col">
					<p class="flex-none pt-5 text-center text-xl font-bold text-white/30 xl:pt-7.5 xl:text-4xl">TL01 라인 A</p>

					<div class="grid min-h-0 flex-1 gap-5 xl:gap-7.5">
						<ul class="grid flex-1 grid-cols-1 grid-rows-8 gap-y-[2dvh] p-5 xl:p-7.5">
							{#each firstLineArea as ar (ar.id)}
								{@render areaCol(makeRange(1, 8), ar.id, ar.name)}
							{/each}
						</ul>
					</div>
				</div>

				<p class="flex items-center justify-center gap-2 bg-[#d9d9d9]/20 whitespace-nowrap [text-orientation:upright] [writing-mode:vertical-rl]">
					<span class="whitespace-nowrap [text-orientation:upright] [writing-mode:vertical-rl]">중앙</span>
					<span class="whitespace-nowrap [text-orientation:upright] [writing-mode:vertical-rl]">피킹</span>
					<span class="whitespace-nowrap [text-orientation:upright] [writing-mode:vertical-rl]">통로</span>
				</p>

				<div class="flex h-full flex-col">
					<p class="flex-none pt-5 text-center text-xl font-bold text-white/30 xl:pt-7.5 xl:text-4xl">TL01 라인 B</p>

					<div class="grid min-h-0 flex-1 gap-5 xl:gap-7.5">
						<ul class="grid flex-1 grid-cols-1 grid-rows-8 gap-y-[2dvh] p-5 xl:p-7.5">
							{#each secondLineArea as ar (ar.id)}
								{@render areaCol(makeRange(9, 16), ar.id, ar.name)}
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</section>
	</div>

	<div class="col-span-3 h-[calc(100dvh-100px)] overflow-x-hidden overflow-y-auto bg-[#383838]">
		<h3 class="px-5 pt-5 text-xl font-bold text-white xl:px-7.5 xl:pt-7.5 xl:text-[42px]">실시간 작업 현황</h3>

		<ul class="flex flex-1 flex-col gap-[2dvh] p-5 text-white xl:p-7.5">
			{#each data.simulation as simulation (simulation.id)}
				<li
					animate:flip={{ delay: 500 }}
					class={[
						'relative flex w-full flex-col rounded-xl bg-linear-90 transition-colors',
						simulation.current_state?.trim() === '' && 'bg-666',
						simulation.current_state?.trim() && simulation.line === 'line-a' && 'from-[#240102] to-[#a11f26]',
						simulation.current_state?.trim() && simulation.line === 'line-b' && 'from-[#200103] to-[#1f389f]',
					]}
				>
					<div class="flex flex-1 flex-wrap items-center justify-between gap-1 border-b border-b-white/20 p-5">
						<p class="flex flex-none flex-wrap items-center gap-2.5 text-xl font-bold xl:gap-5 xl:text-4xl">
							{#if simulation.line === 'line-a' || simulation.line === 'line-b'}
								<strong class="relative">
									<Icons name="glass" cls="size-6 xl:size-9 fill-white" />
									<Icons name="verify" cls="size-4 xl:size-6 fill-[#44ff00] absolute -top-2 -right-2 xl:-top-3 xl:-right-3 z-1" />
								</strong>
							{:else}
								<Icons name="glass" cls="size-6 xl:size-9 fill-white/30" />
							{/if}
							{simulation.id}
						</p>

						{@render nameArea(simulation.name)}
					</div>
					<div class="divide-y divide-white/20 px-5">
						<div class="flex flex-1 flex-wrap items-center justify-between gap-1 py-5">
							<p class="flex-none text-base text-white/70 xl:text-2xl">현재상태</p>
							<p class="flex flex-none flex-wrap items-center gap-2.5 text-base font-bold xl:text-2xl">
								{#if simulation.current_state}
									{simulation.current_state}
									피킹중
								{:else}
									<Icons name="none" cls="size-6 xl:size-9 fill-white/30" /> 미접속
								{/if}
							</p>
						</div>

						<!-- {#if simulation.route.length}
							<div class="flex flex-1 flex-wrap items-center justify-between gap-1 py-5">
								<p class="flex-none text-base text-white/70 xl:text-2xl">이동 동선</p>

								<ul class="flex flex-wrap items-center justify-end gap-2.5">
									{#each simulation.route as route, y}
										<li class="text-base font-bold xl:text-2xl">
											<p class={['flex items-center gap-2.5', simulation.route.length - 1 === y ? 'underline underline-offset-4' : 'line-through']}>
												{#if y !== 0}
													<Icons name="route-arrow" cls="size-4 xl:size-6 stroke-white" />
												{/if}

												{route}
											</p>
										</li>
									{/each}
								</ul>
							</div>
						{/if} -->
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
