<svelte:options
	customElement={{
		tag: 'banner-foot',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	let closeState = $state(false);

	const handleStorage = {
		setStorage(open: string): void {
			localStorage.setItem('foot-open', open);
		},
		getStorage() {
			return localStorage.getItem('foot-open');
		},
	};

	$effect.pre(() => {
		const urlParams = new URLSearchParams(window.location.search);

		if (urlParams.get('expanded') === 'true') {
			closeState = true;
			return;
		}

		if (handleStorage.getStorage() === 'true') {
			closeState = true;
		}
	});

	const close = () => {
		closeState = !closeState;
		handleStorage.setStorage(`${closeState}`);
	};
</script>

<section data-section="floating" class={['group/foot fixed bottom-5 z-2 px-5 whitespace-pre-line text-white md:right-5', closeState ? '' : ' max-md:w-full ']}>
	<div
		class={[
			'relative  grid gap-2.5 rounded-xl bg-black/70 px-5 py-2.5 transition-all lg:rounded-xl lg:p-5',
			closeState ? '' : 'grid-cols-1 md:w-135.75 md:grid-cols-2 md:gap-5',
		]}
	>
		<figure class="flex flex-none items-center gap-5 text-center text-white">
			<img src={`${__STATIC_URL__}/imgs/logo/logo-logi-only.svg`} alt="logi.fine" class="min-h-12" />
			<figcaption class="hidden text-left font-bold group-has-aria-expanded/foot:flex">{m.floating_tit()}</figcaption>
		</figure>

		<div class="text-2sm whi hidden grid-cols-2 gap-2.5 font-bold group-has-aria-expanded/foot:grid">
			<a
				href="https://deepfine.my.salesforce.com/sfc/p/IR000001ZM92/a/TJ00000djirN/Lc54cHS.pbOehXcpItel0OxkWqb66lW7m.7qOou0CU0"
				class="group flex items-center gap-2.5 rounded-xl bg-white/20 px-2.5 hover:bg-white hover:text-black md:min-h-9"
				download={m.floating_btn_1()}
				title="새창열림"
				target="_blank"
			>
				<icon-list class="size-6 stroke-white group-hover:stroke-black" name="import"></icon-list>
				<span class="flex-none">{m.floating_btn_1()}</span>
			</a>
			<a
				href="https://logifine.deepfine.com/signup/trial"
				class="group flex min-h-9 items-center gap-2.5 rounded-xl bg-white/20 px-2.5 hover:bg-white hover:text-black"
				title="새창열림"
				target="_blank"
			>
				<icon-list class="size-6 stroke-white group-hover:stroke-black" name="arrow-link-underline"></icon-list>
				<span class="flex-none">{m.floating_btn_2()}</span>
			</a>
		</div>

		<div class="absolute -top-2.5 -left-2.5 z-2">
			<button
				class={['group  grid size-7.5 place-content-center rounded-full transition-colors', closeState ? 'bg-ffa100' : 'bg-000  border border-white/50 hover:bg-white']}
				onclick={close}
				aria-expanded={closeState ? 'false' : 'true'}
			>
				<span class="sr-only">Close</span>
				{#if closeState}
					<span class="text-2md font-bold text-white">N</span>
				{:else}
					<icon-list name="close" class="stroke-ccc group-hover:stroke-000 size-3"></icon-list>
				{/if}
			</button>
		</div>
	</div>
</section>
