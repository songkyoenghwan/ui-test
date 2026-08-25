<script lang="ts">
	import * as m from '@/paraglide/messages.js';
	import { langState } from '@/stores/globalStore';
	import Language from '@/svelte/btn/Language.svelte';
</script>

<header class="flex flex-none items-start justify-between gap-1 bg-white px-5 pt-5 pb-1">
	<h2
		class={[
			'leading-tight break-all text-slate-500',
			$langState === 'en' ? 'text-sm' : $langState === 'ja' ? 'text-[13px]' : 'text-base',
		]}
	>
		{m.usr_obd_003_01({ locale: $langState })}
		<br />
		{m.usr_obd_003_02({ locale: $langState })}
	</h2>
	<Language />
</header>
