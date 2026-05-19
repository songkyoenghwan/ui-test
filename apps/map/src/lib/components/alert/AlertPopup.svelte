<svelte:options
	customElement={{
		tag: 'alert-popup',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	type ModalPlacementType = 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

	let placement: ModalPlacementType = $state('center');

	let { open = 'close', txt = '', confirm = '', cancel = '' } = $props();
	let popupModal = $state(true);

	$effect.pre(() => {
		if (open === 'close') {
			$host().setAttribute('inert', '');
			$host().setAttribute('aria-hidden', 'true');
			popupModal = false;
		} else {
			$host().removeAttribute('inert');
			$host().removeAttribute('aria-hidden');
			popupModal = true;
		}
	});

	function dispatch(type: string) {
		open = 'close';

		$host().dispatchEvent(new CustomEvent(type));
	}
</script>

<Modal bind:open={popupModal} size="xs" permanent {placement} class="overflow-clip rounded-sm bg-white shadow-2xs">
	<section class="min-h-30 space-y-7.5">
		<h4 class="text-121212 text-xl font-semibold">
			{@html txt}
		</h4>

		<div class="flex items-center justify-end gap-2">
			{#if cancel}
				<button type="button" class="button ghost basis-20" onclick={() => dispatch('alert-cancel')}>
					<span>{cancel}</span>
				</button>
			{/if}
			<button type="button" class="button primary flex-1" onclick={() => dispatch('alert-confirm')}>
				<span>{confirm}</span>
			</button>
		</div>
	</section>
</Modal>
