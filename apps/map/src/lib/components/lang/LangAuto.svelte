<svelte:options
	customElement={{
		tag: 'lang-auto',
		shadow: 'none',
		props: {
			open: { type: 'String', reflect: true },
			ko: { type: 'String', reflect: true },
			en: { type: 'String', reflect: true },
			zh: { type: 'String', reflect: true },
			ja: { type: 'String', reflect: true },
			th: { type: 'String', reflect: true },
			vi: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import { langStore } from '$lib/stores/langStore';

	let {
		open = 'close',
		ko = $bindable(''),
		en = $bindable(''),
		zh = $bindable(''),
		ja = $bindable(''),
		th = $bindable(''),
		vi = $bindable(''),
		places = $bindable([]),
	} = $props();

	let langToggle = $state(true);

	$effect.pre(() => {
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
</script>

<section class="group/lang">
	<ul class="flex flex-col gap-2">
		<li class="grid grid-cols-[28px_1fr_80px] items-center gap-1">
			<label for="map-reg-ko" class="label">KO</label>
			<input type="text" name="map-reg-ko" id="map-reg-ko" class="input-text s" autocomplete="off" placeholder="내용을 입력해 주세요." maxlength="25" />
			<!-- <icon-list data-name="translate" class="icon stroke-primary size-4"></icon-list> -->
			<ui-btn variant="secondary" size="md" txt="자동번역" class="w-20"></ui-btn>
		</li>

		<li class="grid grid-cols-[28px_1fr] items-center gap-0.5 starting:opacity-0 {langToggle ? '' : 'hidden'}">
			<label for="map-reg-en" class="label">EN</label>
			<input type="text" name="map-reg-en" id="map-reg-en" autocomplete="off" class="input-text s" placeholder="영어로 입력해 주세요." maxlength="25" bind:value={en} />
		</li>

		{#if $langStore.zh}
			<li class="grid grid-cols-[28px_1fr] items-center gap-0.5 starting:opacity-0 {langToggle ? '' : 'hidden'}">
				<label for="map-reg-zh" class="label">ZH</label>
				<input type="text" name="map-reg-zh" id="map-reg-zh" autocomplete="off" class="input-text s" placeholder="중국어로 입력해 주세요." maxlength="25" bind:value={zh} />
			</li>
		{/if}

		{#if $langStore.ja}
			<li class="grid grid-cols-[28px_1fr] items-center gap-0.5 starting:opacity-0 {langToggle ? '' : 'hidden'}">
				<label for="map-reg-ja" class="label">jA</label>
				<input type="text" name="map-reg-ja" id="map-reg-ja" autocomplete="off" class="input-text s" placeholder="일본어로 입력해 주세요." maxlength="25" bind:value={ja} />
			</li>
		{/if}

		{#if $langStore.th}
			<li class="grid grid-cols-[28px_1fr] items-center gap-0.5 starting:opacity-0 {langToggle ? '' : 'hidden'}">
				<label for="map-reg-th" class="label">TH</label>
				<input type="text" name="map-reg-th" id="map-reg-th" autocomplete="off" class="input-text s" placeholder="태국어로 입력해 주세요." maxlength="25" bind:value={th} />
			</li>
		{/if}

		{#if $langStore.vi}
			<li class="grid grid-cols-[28px_1fr] items-center gap-0.5 starting:opacity-0 {langToggle ? '' : 'hidden'}">
				<label for="map-reg-vi" class="label">VI</label>
				<input
					type="text"
					name="map-reg-vi"
					id="map-reg-vi"
					autocomplete="off"
					class="input-text s"
					placeholder="베트남어로 입력해 주세요."
					maxlength="25"
					bind:value={vi}
				/>
			</li>
		{/if}
	</ul>
	<div class="mt-2 flex items-center gap-2">
		<ui-btn
			variant="secondary"
			size="md"
			txt="다국어 입력"
			class="flex-1"
			click={(e: Event) => {
				e.preventDefault();
				langToggle = !langToggle;
			}}
		></ui-btn>

		<!-- <icon-list data-name="arrow-down" class="icon stroke-primary relative size-4 transition-transform {langToggle ? 'rotate-180' : 'rotate-0'}"></icon-list> -->
	</div>
</section>
