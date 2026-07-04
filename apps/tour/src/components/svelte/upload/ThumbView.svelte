<svelte:options
	customElement={{
		tag: 'thumbnail-view',
		shadow: 'none',
		props: {
			img: { type: 'String' },
			fileUrl: { type: 'String', attribute: 'thumb-files' },
		},
	}}
/>

<script lang="ts">
	let { fileUrl = '' } = $props();
</script>

<div class="flex flex-col items-center gap-2">
	<div
		class="flex size-22.5 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-200 bg-slate-100"
	>
		{#if fileUrl}
			<img src={fileUrl} alt="PNG 미리보기" class="max-w-auto min-h-30 object-cover" />
		{:else}
			<ui-txt class="text-center" size="xs" txt="첨부된 이미지가 없어요"></ui-txt>
		{/if}
	</div>
</div>
