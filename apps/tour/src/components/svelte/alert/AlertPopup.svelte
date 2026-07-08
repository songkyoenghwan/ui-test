<svelte:options
	customElement={{
		tag: 'alert-popup',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import { scale } from 'svelte/transition';

	type ModalPlacementType =
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'center-left'
		| 'center'
		| 'center-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right';

	interface AlertPopupProps {
		open?: 'open' | 'close'; // 명확한 유니온 타입 지정
		txt?: string;
		confirm?: string;
		cancel?: string;
		placement?: ModalPlacementType;
	}
	let {
		open = $bindable('close'),
		txt = '',
		confirm = '확인', // 기본값 지정
		cancel = '',
		placement = 'center',
	}: AlertPopupProps = $props();

	let popupModal = $state(open === 'open');

	$effect.pre(() => {
		if (open === 'close') {
			$host()?.setAttribute('inert', '');
		} else {
			$host()?.removeAttribute('inert');
		}

		return () => {
			if ($host() && !$host().isConnected) return;
			$host()?.removeAttribute('inert');
		};
	});

	function dispatch(type: string) {
		open = 'close';

		$host().dispatchEvent(new CustomEvent(type));
	}

	$effect(() => {
		popupModal = open === 'open';
	});

	$effect(() => {
		open = popupModal ? 'open' : 'close';

		if (open === 'close') {
			$host()?.removeAttribute('open');
		}
	});
</script>

<Modal bind:open={popupModal} size="xs" permanent {placement} transition={scale} class=" bg-transparent backdrop:bg-transparent">
	<section class="min-h-37.5 space-y-7.5 overflow-clip rounded-sm bg-white p-5 shadow-2xs">
		<p class="text-base font-semibold text-black">
			{@html txt}
		</p>

		<div class="grid grid-cols-[repeat(2,82px)] items-center justify-end gap-2">
			{#if cancel}
				<button type="button" class="button ghost l basis-20.5" onclick={() => dispatch('alert-cancel')}>
					<span>{cancel}</span>
				</button>
			{/if}
			<button type="button" class="button primary l basis-20.5" onclick={() => dispatch('alert-confirm')}>
				<span>{confirm}</span>
			</button>
		</div>
	</section>
</Modal>
