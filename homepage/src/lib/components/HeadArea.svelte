<script lang="ts">
	import logo from '$lib/assets/new_pantos_ci.png';
	import Btns from '@/lib/components/button/Btns.svelte';

	let { name = '' } = $props();
</script>

<header class="flex items-center justify-between gap-1 bg-white px-5 py-2.5">
	<h1>
		<a href="/">
			<picture><img src={logo} alt="" class="h-12.5" /></picture>
			<span class="sr-only">LX판토스</span>
		</a>
	</h1>

	<div aria-label={name || ''}>
		<form method="POST" action="/logout">
			<Btns buttonType="submit" text="로그아웃" variant="neutral" />
		</form>
	</div>
</header>
