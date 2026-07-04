<svelte:options
	customElement={{
		tag: 'facility-button',
		shadow: 'none',
		props: {
			facilityButtons: { type: 'Array' },
		},
	}}
/>

<script lang="ts">
	import UiBtn from '@/svelte/btn/UiBtn.svelte';
	import type { LocalizedText } from '@/types/common/locale';

	type FacilityButtonItem = {
		buttonName?: LocalizedText | null;
		buttonUrl?: string | null;
		id?: number | null;
		tourDestinationCommonButtonId?: number | null;
	};

	let { facilityButtons = $bindable([]) }: { facilityButtons: FacilityButtonItem[] } = $props();
</script>

<ul class="space-y-2">
	{#each facilityButtons as button, i (button.id ?? i)}
		<li class="flex items-start gap-3">
			<div class="flex-[0_0_134px]">
				<UiBtn
					tag="a"
					variant="ghost"
					size="md"
					cls="w-full button ghost text-sm font-bold"
					txt={button?.buttonName?.ko}
					link={String(button?.buttonUrl)}
				/>
			</div>

			<lang-translate view="side" data-text-hidden="ko" lang={button?.buttonName}></lang-translate>
		</li>
	{/each}
</ul>
