<svelte:options
	customElement={{
		tag: 'icon-checkbox',
		shadow: 'none',
	}}
/>

<script lang="ts">
	let { checked = $bindable(false), disabled = $bindable(false) } = $props();
</script>

<icon-list
	data-name={checked ? 'checkbox-on' : 'checkbox-off'}
	class={['icon size-4 ', checked ? 'fill-cms-3 stroke-white' : 'fill-white stroke-slate-300']}
></icon-list>
