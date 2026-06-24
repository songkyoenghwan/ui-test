<svelte:options
	customElement={{
		tag: 'lang-translate',
		shadow: 'none',
		props: {
			open: { type: 'String', reflect: true },
			maxlength: { type: 'String', attribute: 'data-max-length' },
			lang: { type: 'Object' },
			view: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import { langStore } from '$lib/stores/langStore';
	import { createTranslateLang, LANGS, type Props } from '$lib/types/lang/LangTranslate.type';
	import { untrack } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	let { lang = $bindable(), error, open = 'close', maxlength, view = 'reg', btnPreview = '', click }: Props = $props();

	let itemId = uuidv4();
	let langToggle = $state(false);
	let local = $state(createTranslateLang());
	let btnView = $derived($langStore.lang.zh || $langStore.lang.ja || $langStore.lang.th || $langStore.lang.vi);

	$effect(() => {
		if (lang && typeof lang === 'object') {
			const langSnap = $state.snapshot(lang);

			untrack(() => {
				local.ko = langSnap.ko || '';
				local.en = langSnap.en || '';
				local.zh = langSnap.zh || '';
				local.ja = langSnap.ja || '';
				local.th = langSnap.th || '';
				local.vi = langSnap.vi || '';
			});
		}
	});

	$effect(() => {
		const snap = $state.snapshot(local);

		untrack(() => {
			if (lang && typeof lang === 'object') {
				LANGS.forEach((item) => {
					const key = typeof item === 'string' ? item : item.key;
					if (lang[key] && snap[key]) {
						lang[key] = snap[key];
					}
				});
			}
		});
	});
</script>

{#if local}
	{#if view === 'detail'}
		<ul class={['flex flex-col', btnPreview === 'btn-name' ? 'gap-1.5 pt-1.5' : '']}>
			{#each LANGS as item}
				{@const key = typeof item === 'string' ? item : item.key}

				{#if local[key] !== ''}
					<li
						class={[
							btnPreview === 'btn-name'
								? 'grid grid-cols-[32px_1fr] '
								: 'mt-3 grid grid-cols-[44px_1fr] place-content-center border-t border-t-slate-200 pt-3 first:mt-0 first:border-t-0 first:pt-0',
						]}
					>
						<ui-txt size="sm" txt={String(key).toUpperCase()} cls="text-cms-3 font-semibold text-center"></ui-txt>
						<ui-txt size="sm" txt={local[key]} cls="text-black"></ui-txt>
					</li>
				{/if}
			{/each}
		</ul>
	{:else}
		<section class="group/lang">
			<ul class="flex flex-col gap-0.5">
				{#each LANGS as item, i (`${itemId}-${i}`)}
					<li
						class={[
							'grid grid-cols-[28px_1fr] items-center gap-0.5 has-[ui-btn]:grid-cols-[28px_1fr_80px]',
							item.key === 'ko' || item.key === 'en' || (langToggle && $langStore.lang[item.key]) ? '' : 'hidden',
						]}
					>
						<label for="{itemId}-{item.key}" class="label">{String(item.key).toUpperCase()}</label>
						<input
							type="text"
							id="{itemId}-{item.key}"
							class="input-text s {String(local[item.key]).trim() === '' ? 'error' : ''}"
							placeholder="내용을 입력해 주세요."
							{maxlength}
							bind:value={local[item.key]}
						/>
						{#if item.key === 'ko'}
							<ui-btn
								variant="secondary"
								size="md"
								txt="자동번역"
								icon-name="translate"
								class="flex-none"
								cls="stroke-cms-3"
								{click}
								mousedown={() => {
									langToggle = true;
								}}
							></ui-btn>
						{/if}
					</li>
				{/each}
			</ul>

			{#if btnView}
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
						aria-expanded={open === 'close' ? 'false' : 'true'}
						click={(e: Event) => {
							e.preventDefault();
							langToggle = !langToggle;
						}}
					></ui-btn>
				</div>
			{/if}
		</section>
	{/if}
{/if}
