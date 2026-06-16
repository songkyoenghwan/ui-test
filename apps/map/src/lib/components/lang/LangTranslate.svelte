<svelte:options
	customElement={{
		tag: 'lang-translate',
		shadow: 'none',
		props: {
			open: { type: 'String', reflect: true },
			itemId: { type: 'String', reflect: true, attribute: 'item-id' },
			lang: { type: 'Object' },
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
	} = $props();
	let langToggle = $state(false);
	let enELm: HTMLInputElement | undefined = $state();

	$effect.pre(() => {
		if (!$host()) return;
		if (open === 'close') {
			$host().setAttribute('aria-hidden', 'true');
		} else {
			$host().removeAttribute('aria-hidden');
		}

		return () => {
			if ($host() && !$host().isConnected) {
				return;
			}

			if ($host()) {
				$host().removeAttribute('inert');
				$host().removeAttribute('aria-hidden');
			}
		};
	});

	const focusEn = () => {
		if (enELm) enELm.focus();
	};
</script>

<section class="group/lang">
	<ul class="flex flex-col gap-2">
		<li class="grid grid-cols-[28px_1fr_80px] items-center gap-1">
			<label for={`${itemId}-ko`} class="label">KO</label>
			<input
				type="text"
				name={`${itemId}-ko`}
				id={`${itemId}-ko`}
				class="input-text s {lang.ko.error ? 'border-error text-error' : ''}"
				autocomplete="off"
				placeholder="내용을 입력해 주세요."
				maxlength="25"
				bind:value={lang.ko.value}
				onfocusout={async () => {
					if (lang.ko.value.trim() !== '') {
						langToggle = !langToggle;

						if (langToggle) {
							await tick();
							focusEn();
						}
					} else {
						lang.ko.error = lang.ko.value === '' ? true : false;
					}
				}}
			/>
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
		</li>

		<li class="grid grid-cols-[28px_1fr] items-center gap-0.5 starting:opacity-0">
			<label for={`${itemId}-en`} class="label">EN</label>
			<input
				type="text"
				name={`${itemId}-en`}
				id={`${itemId}-en`}
				autocomplete="off"
				class="input-text s {lang.ko.error ? 'border-error text-error' : ''}"
				placeholder="영어로 입력해 주세요."
				maxlength="25"
				bind:value={lang.en.value}
				bind:this={enELm}
			/>
		</li>

		{#if $langStore.lang.zh}
			<li class="grid grid-cols-[28px_1fr] items-center gap-0.5 starting:opacity-0 {langToggle ? '' : 'hidden'}">
				<label for={`${itemId}-zh`} class="label">ZH</label>
				<input
					type="text"
					name={`${itemId}-zh`}
					id={`${itemId}-en`}
					autocomplete="off"
					class="input-text s {lang.ko.error ? 'border-error text-error' : ''}"
					placeholder="중국어로 입력해 주세요."
					maxlength="25"
					bind:value={lang.zh.value}
				/>
			</li>
		{/if}

		{#if $langStore.lang.ja}
			<li class="grid grid-cols-[28px_1fr] items-center gap-0.5 starting:opacity-0 {langToggle ? '' : 'hidden'}">
				<label for={`${itemId}-ja`} class="label">JA</label>
				<input
					type="text"
					name={`${itemId}-ja`}
					id={`${itemId}-ja`}
					autocomplete="off"
					class="input-text s {lang.ko.error ? 'border-error text-error' : ''}"
					placeholder="일본어로 입력해 주세요."
					maxlength="25"
					bind:value={lang.ja.value}
				/>
			</li>
		{/if}

		{#if $langStore.lang.th}
			<li class="grid grid-cols-[28px_1fr] items-center gap-0.5 starting:opacity-0 {langToggle ? '' : 'hidden'}">
				<label for={`${itemId}-th`} class="label">TH</label>
				<input
					type="text"
					name={`${itemId}-th`}
					id={`${itemId}-th`}
					autocomplete="off"
					class="input-text s {lang.ko.error ? 'border-error text-error' : ''}"
					placeholder="태국어로 입력해 주세요."
					maxlength="25"
					bind:value={lang.th.value}
				/>
			</li>
		{/if}

		{#if $langStore.lang.vi}
			<li class="grid grid-cols-[28px_1fr] items-center gap-0.5 starting:opacity-0 {langToggle ? '' : 'hidden'}">
				<label for={`${itemId}-vi`} class="label">VI</label>
				<input
					type="text"
					name={`${itemId}-vi`}
					id={`${itemId}-vi`}
					autocomplete="off"
					class="input-text s {lang.ko.error ? 'border-error text-error' : ''}"
					placeholder="베트남어로 입력해 주세요."
					maxlength="25"
					bind:value={lang.vi.value}
				/>
			</li>
		{/if}
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
				icon-pos="lt"
				click={(e: Event) => {
					e.preventDefault();
					langToggle = !langToggle;
				}}
			></ui-btn>
		</div>
	{/if}
</section>
