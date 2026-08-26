<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import { langState, setLang } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import type { LocalizedText } from '@/types/common/locale';

	type LocalizedKey = keyof LocalizedText;

	const defaultClass = 'flex items-center shadow-2xs justify-center gap-1 rounded-lg shadow-1xs bg-white px-3 py-2 text-base';

	let langModal = $state(false);

	export const LANGS: { key: LocalizedKey; label: string }[] = [
		{ key: 'ko', label: '한국어(KO)' },
		{ key: 'en', label: 'English(EN)' },
		{ key: 'zh', label: '中文(ZH)' },
		{ key: 'ja', label: '日本語(JP)' },
		{ key: 'th', label: 'ภาษาไทย(TH)' },
		{ key: 'vi', label: 'Tiếng Việt(VI)' },
	];
	const langHandler = async (_key: LocalizedKey) => {
		setLang(_key);
		langModal = false;
	};
</script>

<div class="flex flex-none justify-end">
	<button type="button" class={[defaultClass]} onclick={() => (langModal = true)}>
		<Icons name="global" cls="size-5 stroke-26b7ff" />
		<span>Language</span>
	</button>
</div>

<Modal class="w-82.5 max-w-[calc(100%-3.75rem)]" bind:open={langModal}>
	<ul class="space-y-2 pt-7">
		{#each LANGS as item (item.key)}
			<li>
				<button
					type="button"
					class="group relative flex h-10 w-full items-center justify-center rounded-lg bg-white px-2 py-1 transition-colors hover:bg-(--base-color) hover:text-white active:bg-(--base-color) active:text-white aria-current:bg-(--base-color) aria-current:text-white"
					aria-current={item.key === $langState}
					onclick={() => langHandler(item.key)}
				>
					{item.label}
				</button>
			</li>
		{/each}
	</ul>
</Modal>
