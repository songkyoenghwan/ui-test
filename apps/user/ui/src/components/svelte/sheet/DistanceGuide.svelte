<script lang="ts">
	import { ParaglideMessage } from '@inlang/paraglide-js-svelte';
	import type { Snippet } from 'svelte';
	import * as m from '@/paraglide/messages';
	import { distance } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
</script>

<div class="fixed bottom-0 left-0 w-full space-y-2 overflow-clip rounded-t-lg bg-white px-5 py-4 shadow-2xs">
	<p class="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-base">
		<ParaglideMessage message={m.usr_rec_201_02} inputs={{ mm: String($distance.step.toLocaleString() ?? 0) }}>
			{#snippet strong({ children }: { children?: Snippet })}
				<span class="text-267cd1 flex items-center gap-2 text-xl font-semibold">
					<Icons name="walking" cls="size-8 fill-267cd1" />
					{@render children?.()}
				</span>
			{/snippet}
		</ParaglideMessage>
	</p>

	<div class="grid grid-cols-2 divide-x divide-slate-200 text-slate-500 *:min-h-6">
		<p class="flex items-center gap-2 px-5">
			<ParaglideMessage message={m.usr_rec_201_03} inputs={{ mm: String($distance.totalDistance ?? 0) }}>
				{#snippet strong({ children }: { children?: Snippet })}
					<span class="text-black">
						{@render children?.()}
					</span>
				{/snippet}
			</ParaglideMessage>
		</p>
		<p class="flex items-center gap-2 px-5">
			<ParaglideMessage message={m.usr_rec_201_04} inputs={{ time: String($distance.time ?? 0) }}>
				{#snippet strong({ children }: { children?: Snippet })}
					<span class="text-black">
						{@render children?.()}
					</span>
				{/snippet}
			</ParaglideMessage>
		</p>
	</div>
</div>
