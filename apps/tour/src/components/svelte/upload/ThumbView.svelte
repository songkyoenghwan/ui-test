<svelte:options
	customElement={{
		tag: 'thumbnail-view',
		shadow: 'none',
		props: {
			img: { type: 'String' },
			cls: { type: 'String' },
			fileUrl: { type: 'String', attribute: 'thumb-files' },
		},
	}}
/>

<script lang="ts">
	let { fileUrl = '', cls = '' } = $props();
</script>

<div
	class={[
		'flex items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-100',
		cls ? cls : 'size-25',
	]}
>
	{#if fileUrl}
		<img src={fileUrl} alt="PNG 미리보기" class="max-w-auto min-h-30 object-cover" />
	{:else}
		<ui-txt class="text-center" size="xs" txt="첨부된 이미지가 없어요"></ui-txt>
	{/if}
</div>
