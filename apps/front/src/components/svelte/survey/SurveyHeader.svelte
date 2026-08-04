<script lang="ts">
	import * as m from '@/paraglide/messages.js';
	import Language from '@/svelte/btn/Language.svelte';
	import { langState } from '@/stores/globalStore';
</script>

<header class="flex flex-none items-start justify-between gap-2 bg-white px-5 pt-5">
	<h2 class="text-base leading-tight break-all text-slate-500">
		{m.usr_obd_003_01({ locale: $langState })}
		<br />
		{m.usr_obd_003_02({ locale: $langState })}
	</h2>
	<Language />
</header>
