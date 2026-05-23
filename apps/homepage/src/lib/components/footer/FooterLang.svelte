<svelte:options
	customElement={{
		tag: 'footer-lang',
		shadow: 'none',
		props: {
			lang: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import { getLocale, setLocale } from '$lib/paraglide/runtime.js';

	let { lang = $bindable('ko') } = $props<{ lang?: 'ko' | 'en' }>();

	if (typeof document !== 'undefined') {
		const htmlLang = (document?.documentElement?.lang || 'ko').slice(0, 2) as 'ko' | 'en';
		if (getLocale() !== htmlLang) {
			setLocale(htmlLang);
		}
		lang = htmlLang;
	}
</script>

<div class="sr-only">
	{getLocale()}
</div>
