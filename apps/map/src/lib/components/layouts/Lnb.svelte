<svelte:options
	customElement={{
		tag: 'aside-lnb',
		shadow: 'none',
		props: {
			current: { type: 'String', reflect: true },
			list: { type: 'Array' },
		},
	}}
/>

<script lang="ts">
	let {
		current = 'lnb-1',
		list = [
			{
				id: 'lnb-1',
				text: '지도 관리',
			},
			{
				id: 'lnb-2',
				text: '혼잡도 현황',
			},
			{
				id: 'lnb-3',
				text: '통계',
			},
			{
				id: 'lnb-4',
				text: '대상지 관리',
			},
		],
	} = $props();
</script>

<aside class="bg-primary flex h-full flex-col space-y-3 px-2 py-6">
	<picture class="flex h-10 justify-center">
		<img class="h-10 w-auto" src="/images/logo/lnb-logo.svg" alt="" />
	</picture>
	<nav class="text-base text-slate-50">
		<ul class="flex flex-col gap-6.25 text-center leading-tight break-keep">
			{#each list as list (list.id)}
				<li class="grid min-h-15">
					<a
						class="grid size-full place-content-center rounded-lg transition-colors hover:bg-white/34 aria-[current=page]:bg-white/34 aria-[current=page]:text-white"
						aria-current={current === list.id ? 'page' : 'false'}
						href=""
					>
						<p>{list.text}</p>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>
