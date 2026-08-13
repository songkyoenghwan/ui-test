<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
</script>

<div class="grid px-5 py-1">
	<button
		type="button"
		class="text-09235e flex min-h-9 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-100 px-5 py-1"
	>
		<span class="flex items-center gap-2">
			<Icons name="mdi-car" cls="size-4 fill-09235e" />
			{m.usr_map_002_43({ locale: $langState })}
		</span>
		<Icons name="map-start" cls="size-4 fill-09235e" />
	</button>
</div>
