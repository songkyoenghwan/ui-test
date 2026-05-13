<script lang="ts">
	let { children } = $props();
</script>

<div class="border-table-outline grid min-h-0 grid-rows-[60px_minmax(0,1fr)] rounded-lg border">
	{@render children()}
</div>
