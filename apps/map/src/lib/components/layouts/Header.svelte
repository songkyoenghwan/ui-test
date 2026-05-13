<svelte:options
	customElement={{
		tag: 'header-wrap',
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

{#snippet name({ link = '', text = '' })}
	<li class="flex h-full">
		<a
			class="aria-[current=page]:text-primary aria-[current=page]:border-b-primary grid place-content-center px-4 aria-[current=page]:border-b aria-[current=page]:font-bold"
			href={link}
			aria-current={current === link ? 'page' : 'false'}
		>
			<p>{text}</p>
		</a>
	</li>
{/snippet}

<header class="bg-primary pt-2">
	<section class="flex h-full items-center rounded-tl-md bg-white px-2 text-slate-300">
		<div class="min-w-21.5 border-r border-r-slate-100">
			<h2 class="text-121212 text-center text-xl font-semibold">지도</h2>
		</div>
		<ul class="text-md flex h-full items-center gap-2 px-2 text-center">
			{#each list as list (list.id)}
				{@render name(list)}
			{/each}
		</ul>
	</section>
</header>
