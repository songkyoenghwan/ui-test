<script lang="ts">
	import { setSheetMinH } from '@/src/stores/sheetUiStore';
	import Info from '@/svelte/facility/Info.svelte';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';
</script>

<div bind:clientHeight={null, setSheetMinH}>
	<Info
		variant="detail"
		rest={$facilityCurrent?.facility || undefined}
		detail={$facilityCurrent?.facilityDetail || undefined}
	/>
</div>
