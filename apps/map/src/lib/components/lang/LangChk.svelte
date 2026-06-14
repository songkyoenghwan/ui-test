<svelte:options
	customElement={{
		tag: 'lang-chk',
		shadow: 'none',
		props: {
			lang: { type: 'Object', reflect: true },
		},
	}}
/>

<script lang="ts">
	import { initLangStore, langStore, toggleLang } from '$lib/stores/langStore';

	let { lang = { zh: false, ja: false, th: false, vi: false } } = $props();

	$effect(() => {
		if (lang) {
			initLangStore({
				zh: lang.zh,
				ja: lang.ja,
				th: lang.th,
				vi: lang.vi,
			});
		}
	});
</script>

<ui-txt txt="한국어(KO)" class="flex-none"></ui-txt>
<ui-txt txt="영어(EN)" class="flex-none"></ui-txt>
<ui-checkbox
	item-id="lang-zh"
	txt="중국어(ZH)"
	class="flex-none"
	checked={$langStore.lang.zh}
	change={() => toggleLang('zh')}
></ui-checkbox>

<ui-checkbox
	item-id="lang-ja"
	txt="일본어(JA)"
	class="flex-none"
	checked={$langStore.lang.ja}
	change={() => toggleLang('ja')}
></ui-checkbox>

<ui-checkbox
	item-id="lang-th"
	txt="태국어(TH)"
	class="flex-none"
	checked={$langStore.lang.th}
	change={() => toggleLang('th')}
></ui-checkbox>

<ui-checkbox
	item-id="lang-vi"
	txt="베트남어(VI)"
	class="flex-none"
	checked={$langStore.lang.vi}
	change={() => toggleLang('vi')}
></ui-checkbox>
