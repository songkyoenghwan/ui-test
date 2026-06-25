<svelte:options
	customElement={{
		tag: 'aside-lnb',
		shadow: 'none',
		props: {
			admin: { type: 'String', reflect: true },
			current: { type: 'String', reflect: true },
			menus: { type: 'Array' },
		},
	}}
/>

<script lang="ts">
	import logo from '$lib/images/logo/lnb-logo.svg';

	let { menus = [] } = $props();

	let hoveredId = $state('');
	let displayName = $derived(window.location.pathname.split('/').filter(Boolean)[0] ?? '');
	$inspect(displayName);
</script>

{#snippet li(id = '', link = '', h3 = '')}
	<li class="grid min-h-15">
		<a
			class="group/lnb-link shadow-1xs grid size-full place-items-center rounded-lg border border-transparent p-1 transition-colors hover:border-white/10 aria-[current=page]:bg-white/10 aria-[current=page]:text-white aria-[current=page]:shadow-2xs"
			aria-current={displayName === link.replace(/^\//, '') ? 'page' : undefined}
			href={`${link}`}
			onmouseenter={() => (hoveredId = link)}
			onmouseleave={() => (hoveredId = '')}
		>
			<icon-list
				data-name={hoveredId === id || displayName === link.replace(/^\//, '')
					? `${link.replace(/^\//, '')}-on`
					: `${link.replace(/^\//, '')}-off`}
				class="size-5 fill-white stroke-slate-50 transition-all delay-0 group-aria-[current=page]/lnb-link:fill-white group-aria-[current=page]/lnb-link:text-white"
			></icon-list>
			<p class="group-aria-[current=page]/lnb-link:font-semibold">{h3}</p>
		</a>
	</li>
{/snippet}
{#if menus}
	<aside class="from-002e1e to-2e5345 flex h-full flex-col space-y-3 bg-linear-to-t px-2 py-6">
		<picture class="flex h-10 justify-center">
			<enhanced:img class="h-10 w-auto" src={logo} alt="logo" />
		</picture>
		<nav class="text-base text-slate-50">
			<ul class="flex flex-col gap-3 text-center leading-tight break-keep">
				{#each JSON.parse(menus) as lnb, i (i)}
					<li class="grid gap-4">
						{#if lnb.id === 1 || lnb.id === 5}
							<h2 class={['font-semibold text-white', lnb.id === 5 ? 'mt-2 border-t border-t-white/50 pt-5' : '']}>
								{lnb.id === 1 ? '관리' : '현황'}
							</h2>
						{/if}

						{@render li(lnb.id, lnb.url, lnb.name)}
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
{/if}
