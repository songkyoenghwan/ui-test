<svelte:options
	customElement={{
		tag: 'txt-none',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
</script>

<div class="grid min-h-[20dvh] w-full place-content-center rounded-xl bg-white">
	<p class="text-2md w-full lg:text-2xl">
		{m.not_news_txt()}
	</p>
</div>
