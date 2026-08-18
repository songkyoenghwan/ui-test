<script lang="ts">
	import { langState, pickText } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';
</script>

{#if $facilityCurrent?.facilityDetail?.facilityButtons}
	<div class="flex min-h-12.5 flex-col gap-3 px-5 py-1">
		<p class="text-000 flex items-center gap-2 text-base">
			<Icons name="add-info" cls="size-4 fill-slate-400" />
			시설 정보 더보기
		</p>

		<div class="grid gap-2">
			{#each $facilityCurrent?.facilityDetail?.facilityButtons as f (f.id)}
				{#if f?.tourDestinationCommonButtonId === null}
					<a
						href={f.buttonUrl}
						target="_blank"
						class="flex h-9 flex-1 items-center justify-center gap-0.5 rounded-lg border border-slate-200 bg-slate-50 px-2 text-sm"
					>
						{pickText(f.buttonName, $langState)}
					</a>
				{/if}
			{/each}
		</div>
	</div>
{/if}
