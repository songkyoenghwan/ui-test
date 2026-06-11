<svelte:options
	customElement={{
		tag: 'lang-chk',
		shadow: 'none',
		props: {
			ko: { type: 'Boolean' },
			en: { type: 'Boolean' },
			zh: { type: 'Boolean' },
			ja: { type: 'Boolean' },
			th: { type: 'Boolean' },
			vi: { type: 'Boolean' },
		},
	}}
/>

<script lang="ts">
	import { langStore, toggleLang, initLangStore } from '$lib/stores/langStore';
	interface LangChkElement extends HTMLElement {
		zh: boolean;
		ja: boolean;
		th: boolean;
		vi: boolean;
	}
	let { zh = false, ja = false, th = false, vi = false } = $props();

	$effect(() => {
		initLangStore(zh, ja, th, vi);
	});

	$effect(() => {
		const host = $host() as LangChkElement;

		if (host) {
			if (host.zh !== $langStore.zh) host.zh = $langStore.zh;
			if (host.ja !== $langStore.ja) host.ja = $langStore.ja;
			if (host.th !== $langStore.th) host.th = $langStore.th;
			if (host.vi !== $langStore.vi) host.vi = $langStore.vi;
		}
	});
</script>

<ui-txt txt="한국어(KO)" class="flex-none"></ui-txt>
<ui-txt txt="영어(EN)" class="flex-none"></ui-txt>
<ui-checkbox item-id="lang-zh" txt="중국어(ZH)" class="flex-none" checked={zh} change={() => toggleLang('zh')}></ui-checkbox>
<ui-checkbox item-id="lang-ja" txt="일본어(JA)" class="flex-none" checked={ja} change={() => toggleLang('ja')}></ui-checkbox>
<ui-checkbox item-id="lang-th" txt="태국어(TH)" class="flex-none" checked={th} change={() => toggleLang('th')}></ui-checkbox>
<ui-checkbox item-id="lang-vi" txt="베트남어(VI)" class="flex-none" checked={vi} change={() => toggleLang('vi')}></ui-checkbox>
