<script lang="ts">
	import * as m from '@/paraglide/messages';
	import Icons from '@/svelte/icons/Icons.svelte';
	import { langState, mainViewState } from '@/stores/globalStore';
</script>

<footer
	class="fixed right-0 bottom-0 left-0 grid w-full grid-cols-2 items-center gap-2 border-t border-t-slate-200 bg-white px-5 py-3 *:h-11"
>
	<button type="button" class="rounded-lg border border-(--base-color) text-lg text-(--base-color) active:bg-slate-50">
		{m.usr_rec_201_07({ locale: $langState })}
	</button>
	<button type="button" class="rounded-lg bg-(--base-color) text-lg text-white active:bg-slate-50">
		{m.usr_rec_201_08({ locale: $langState })}
	</button>
</footer>
