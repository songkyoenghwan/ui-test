<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState } from '@/stores/globalStore';
	import { sheetBottomArea } from '@/stores/uxStore';

	let footerH = $state(0);

	$effect(() => {
		sheetBottomArea.set(footerH);
	});
</script>

<footer
	bind:clientHeight={footerH}
	class="relative grid w-full flex-none gap-2 border-t border-t-slate-200 bg-white px-5 py-3 opacity-100 transition-all transition-discrete starting:opacity-0"
>
	<div class=" grid grid-cols-2 items-center gap-2 *:h-11">
		<button type="button" class="rounded-lg border border-(--base-color) text-lg text-(--base-color) active:bg-slate-50">
			{m.usr_rec_201_07({ locale: $langState })}
		</button>
		<button type="button" class="rounded-lg bg-(--base-color) text-lg text-white active:bg-slate-50">
			{m.usr_rec_201_08({ locale: $langState })}
		</button>
	</div>
</footer>
