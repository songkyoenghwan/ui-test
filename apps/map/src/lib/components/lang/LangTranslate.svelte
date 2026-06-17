<svelte:options
	customElement={{
		tag: 'lang-translate',
		shadow: 'none',
		props: {
			open: { type: 'String', reflect: true },
			itemId: { type: 'String', reflect: true, attribute: 'item-id' },
			maxlength: { type: 'String', attribute: 'data-max-length' },
			lang: { type: 'Object' },
			view: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import { langStore } from '$lib/stores/langStore';
	import { tick } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	let {
		itemId = uuidv4(),
		open = 'close',
		lang = $bindable({
			ko: { value: '', error: false },
			en: { value: '', error: false },
			zh: { value: '', error: false },
			ja: { value: '', error: false },
			th: { value: '', error: false },
			vi: { value: '', error: false },
		}),
		maxlength,
		view = 'reg',
	} = $props();
	const langKeys = $state(['ko', 'en', 'zh', 'ja', 'th', 'vi']);
	let langToggle = $state(false);
	let enELm: HTMLInputElement | undefined = $state();

	$effect.pre(() => {
		if (!$host()) return;
		if (open === 'close') {
			$host().setAttribute('aria-expended', 'false');
		} else {
			$host().setAttribute('aria-expended', 'true');
		}

		return () => {
			if ($host() && !$host().isConnected) {
				return;
			}

			if ($host()) {
				$host().removeAttribute('aria-expended');
			}
		};
	});

	const focusEn = () => {
		if (enELm) enELm.focus();
	};
</script>

{#if view === 'detail'}
	<ul class="flex flex-col gap-2 divide-y divide-slate-200">
		{#each langKeys as key}
			{@const item = lang[key]}

			{#if key === 'ko' || key === 'en' || (key === 'zh' && $langStore.lang.zh) || (key === 'zh' && $langStore.lang.ja) || (key === 'zh' && $langStore.lang.ja) || (key === 'th' && $langStore.lang.th) || (key === 'vi' && $langStore.lang.vi)}
				<li class="grid min-h-10 grid-cols-[44px_1fr] place-content-center">
					<ui-txt txt={key.toLocaleUpperCase()} cls="text-cms-3 font-semibold text-center"></ui-txt>
					{item.value}
				</li>
			{/if}
		{/each}
	</ul>
{:else}
	<section class="group/lang">
		<ul class="flex flex-col gap-2">
			{#each langKeys as key}
				{@const item = lang[key]}

				{#if key === 'ko' || key === 'en' || (key === 'zh' && $langStore.lang.zh) || (key === 'zh' && $langStore.lang.ja) || (key === 'zh' && $langStore.lang.ja) || (key === 'th' && $langStore.lang.th) || (key === 'vi' && $langStore.lang.vi)}
					<li
						class={[
							'grid grid-cols-[28px_1fr] items-center gap-1 has-[ui-btn]:grid-cols-[28px_1fr_80px]',
							key === 'ko' ||
							key === 'en' ||
							(key === 'zh' && langToggle) ||
							(key === 'zh' && langToggle) ||
							(key === 'zh' && langToggle) ||
							(key === 'th' && langToggle) ||
							(key === 'vi' && langToggle)
								? ''
								: 'hidden',
						]}
					>
						<label for="{itemId}-{key}" class="label">{key.toUpperCase()}</label>
						<input
							type="text"
							id="{itemId}-{key}"
							class="input-text s {item.error ? 'error' : ''}"
							placeholder="내용을 입력해 주세요."
							{maxlength}
							bind:value={item.value}
							oninput={() => {
								item.error = !item.value.trim().length;
							}}
							onfocusout={() => {
								item.error = item.value.trim() === '';
							}}
						/>
						{#if key === 'ko'}
							<ui-btn
								variant="secondary"
								size="md"
								txt="자동번역"
								icon-name="translate"
								class="flex-none"
								cls="stroke-cms-3"
								click={() => {
									langToggle = true;
								}}
							></ui-btn>
						{/if}
					</li>
				{/if}
			{/each}
		</ul>

		{#if $langStore.lang.zh || $langStore.lang.ja || $langStore.lang.th || $langStore.lang.vi}
			<div class="mt-2 flex items-center gap-2">
				<ui-btn
					variant="secondary"
					size="md"
					txt="다국어 입력"
					icon-name="arrow-down"
					icon-size="16"
					class="flex-1"
					cls="stroke-cms-3"
					icon-cls={langToggle ? 'rotate-180' : ''}
					icon-pos="lt"
					click={(e: Event) => {
						e.preventDefault();
						langToggle = !langToggle;
					}}
				></ui-btn>
			</div>
		{/if}
	</section>
{/if}
