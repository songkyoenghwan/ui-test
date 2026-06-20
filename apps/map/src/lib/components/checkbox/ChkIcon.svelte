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
	data-name={checked ? 'chk-on' : 'chk-off'}
	class={[disabled ? 'fill-ccc' : 'fill-primary', 'size-5 transition-all']}
></icon-list>
