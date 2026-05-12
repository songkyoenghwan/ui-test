<script lang="ts">
	import '@/lib/styles/index.css';

	let { children, data } = $props();
</script>

<main class="">
	{@render children()}
</main>
