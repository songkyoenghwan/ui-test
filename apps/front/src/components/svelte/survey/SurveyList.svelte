<script lang="ts">
	import * as m from '@/paraglide/messages.js';
	import { langState, pickText } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';

	let { surveyList, linkUrl = '' } = $props();

	let current: number = $state(0);
	let prevCurrent = $state(0);
	let currentStep = $state<'plus' | 'minus'>('plus');
	let listTotal = $derived(current === surveyList.length - 1 ? false : true);
	let listStart = $derived(current > 0);

	let answers = $state<Record<number, string | string[]>>({});

	let isCurrentAnswered = $derived.by(() => {
		const survey = surveyList[current];
		const value = answers[survey.id];

		if (survey.questionType.trim() === 'MULTI') {
			return Array.isArray(value) && value.length > 0;
		}

		return typeof value === 'string' && value.length > 0;
	});

	const stepHandler = (state: 'plus' | 'minus') => {
		prevCurrent = current;
		currentStep = state;

		if (state === 'plus' && current < surveyList.length - 1) {
			current += 1;
		}

		if (state === 'minus' && current > 0) {
			current -= 1;
		}

		currentStep = state;
	};
</script>

<div class="grid min-h-0 flex-1 grid-rows-[1fr_90px]">
	<ul class="flex flex-col gap-2 overflow-y-scroll">
		{#each surveyList as survey, i (survey.id)}
			<li class={['relative', current === i ? 'flex flex-1 flex-col' : 'hidden']} aria-hidden={current !== i}>
				<div class=" bg-white px-5 pt-2.5 pb-5">
					<p
						class="text-111 relative flex max-h-12 translate-y-0 items-center text-[22px] transition-all starting:translate-y-1 starting:opacity-0"
					>
						{pickText(survey.title, $langState)}
					</p>

					{#if survey.questionType.trim() === 'MULTI'}
						<p class="mt-2 text-sm text-slate-500">{m.usr_obd_003_03({ locale: $langState })}</p>
					{/if}
				</div>

				{#if surveyList.length > 0}
					<ol class="mx-5 flex items-center gap-1" aria-hidden="true">
						{#each surveyList as step, z (step.id)}
							<li
								class={[
									'relative h-0.75 min-w-0 flex-1 rounded-sm transition-all before:absolute before:top-0 before:left-0 before:h-full before:transition-all before:delay-150 before:duration-300 starting:before:bg-slate-300',
									z <= current ? 'before:w-full before:bg-(--base-color)' : 'before:w-0 before:bg-slate-300',
									z === current && currentStep === 'plus'
										? 'starting:before:w-0 '
										: z === current && currentStep === 'minus'
											? 'starting:before:w-full '
											: '',
								]}
							></li>
						{/each}
					</ol>
				{/if}

				<ul
					class="max-h- relative flex flex-1 translate-x-0 flex-col gap-2 overflow-y-auto bg-slate-50
					p-5 opacity-100 transition-all transition-discrete duration-400 starting:translate-x-10 starting:opacity-0"
				>
					{#each survey.options as opt, y (opt.id)}
						{@const inputId = `${survey.id}-${opt.id}`}

						<li
							class={[
								'relative flex-1 transition-all duration-300 ease-out',
								current === i ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
							]}
							style={`transition-delay:${current === i ? y * 40 : 0}ms`}
						>
							<label
								for={inputId}
								class="itmes-center flex h-full items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-black has-checked:border-(--base-color) has-checked:bg-(--base-color)/5 has-checked:font-bold has-checked:text-(--base-color)"
							>
								{#if survey.questionType.trim() === 'MULTI'}
									<input
										type="checkbox"
										value={String(opt.id)}
										id={inputId}
										class="peer sr-only"
										bind:group={answers[survey.id]}
									/>
								{:else}
									<input
										type="radio"
										name={String(survey.id)}
										id={inputId}
										class="peer sr-only"
										value={String(opt.id)}
										bind:group={answers[survey.id]}
									/>
								{/if}
								{pickText(opt.optionItem, $langState)}

								<Icons name="input-chk-off" cls="size-4.5 stroke-slate-400 peer-checked:hidden" />
								<Icons
									name="input-chk-on"
									cls="size-4.5 starting:scale-0 transition-all scale-100 relative fill-(--base-color) peer-checked:flex hidden"
								/>
							</label>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>

	<footer>
		<div
			class="flex w-full flex-nowrap items-center justify-center gap-2 border-t border-slate-200 bg-slate-50 px-5 py-2 text-slate-500 *:inline-flex *:items-center *:text-base"
		>
			{#if listStart}
				<button
					type="button"
					class="h-10 flex-[0_0_80px] justify-center rounded-sm border border-slate-300 bg-white"
					onclick={() => stepHandler('minus')}
				>
					<span>{m.usr_obd_003_06({ locale: $langState })}</span>
				</button>
			{/if}

			{#if listTotal}
				<button
					type="button"
					class="h-10 flex-1 justify-center rounded-sm bg-(--base-color) text-white disabled:bg-slate-200 disabled:text-slate-500"
					disabled={!isCurrentAnswered}
					onclick={() => stepHandler('plus')}
				>
					<span>{m.usr_obd_003_07({ locale: $langState })}</span>
				</button>
			{:else}
				<a href={linkUrl} class="h-10 flex-1 justify-center rounded-sm bg-(--base-color) text-white">
					<span>{m.usr_obd_003_05({ locale: $langState })}</span>
				</a>
			{/if}
		</div>

		<div class="text-center">
			<a href={linkUrl} class="flex justify-center py-1 text-sm text-slate-500">
				<p>{m.usr_obd_003_04({ locale: $langState })}</p>
			</a>
		</div>
	</footer>
</div>
