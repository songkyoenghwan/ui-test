<script lang="ts">
	let { id = '', name = '', value = $bindable(''), disabled = '', placeholder = '작업번호를 입력하세요', cls = '', onkeydown = undefined } = $props();

	let isDisabled = $derived(disabled === 'true' ? true : false);
</script>

<input
	type="text"
	{id}
	{name}
	{placeholder}
	class="rounedd-lg border-input h-input text-999 focus-visible:border-primary outline-primary grid flex-1 place-content-center rounded-lg border px-4 {cls}"
	bind:value
	disabled={isDisabled}
	{onkeydown}
/>
