<svelte:options
	customElement={{
		tag: 'aside-lnb',
		shadow: 'none',
		props: {
			admin: { type: 'String', reflect: true },
			current: { type: 'String', reflect: true },
			lnblist: { type: 'Array' },
		},
	}}
/>

<script lang="ts">
	import logo from '$lib/images/logo/lnb-logo.svg';
	import { currentItemFromPath, initNavigation, navigationStore, setCurrentId } from '$lib/stores/navigation.svelte';

	let {
		authority = 'user',
		current = 'CMS-MAP',
		lnblist = [
			{
				h2: '관리',
				list: [
					{
						id: 'CMS-MAP',
						link: 'CMS-MAP-001',
						icon: 'lnb-1-1',
						h3: '지도',
						sub: [
							{
								link: 'CMS-MAP-001',
								h4: '위치',
							},
							{
								link: 'CMS-MAP-002',
								h4: '실내 위치',
							},
							{
								link: 'CMS-MAP-003',
								h4: '시설',
							},
							{
								link: 'CMS-MAP-004',
								h4: '카테고리',
							},
						],
					},
					{
						id: 'CMS-OBD',
						link: 'CMS-OBD-001',
						icon: 'lnb-1-2',
						h3: '온보딩',
						sub: [
							{
								link: 'CMS-OBD-001',
								h4: '온보딩',
							},
							{
								link: 'CMS-OBD-002',
								h4: '기초 설문',
							},
						],
					},
					{
						id: 'CMS-LOC',
						link: 'CMS-LOC-001',
						icon: 'lnb-1-3',
						h3: '대상지',
					},
				],
			},
			{
				h2: '현황',
				list: [
					{
						id: 'CMS-CON',
						link: 'CMS-CON-001',
						icon: 'lnb-2-1',
						h3: '혼잡도',
					},
					{
						id: 'CMS-STA',
						link: 'CMS-STA-001',
						icon: 'lnb-2-2',
						h3: '통계',
						sub: [
							{
								link: 'CMS-STA-001',
								h4: '방문자',
							},
							{
								link: 'CMS-STA-002',
								h4: '이용',
							},
						],
					},
				],
			},
			{
				h2: 'UI',
				list: [
					{
						id: 'CMS-UI',
						link: 'CMS-UI',
						h3: 'UI',
					},
				],
			},
		],
	} = $props();

	let hoveredId = $state('');

	$effect.pre(() => {
		if ($navigationStore.lnblist.length === 0) {
			initNavigation(lnblist);
		}
	});

	function handleNavClick(listId: string, listLink: string) {
		setCurrentId(listId);
		current = listLink;
	}

	let displayName = $derived($currentItemFromPath?.id || '');
	let auth = $derived(authority || 'user');
</script>

{#snippet li(id = '', link = '', icon = '', h3 = '')}
	<li class="grid min-h-15">
		<a
			class="group/lnb-link aria-[current=page]:shadow-1xs aria-[current=page]:bg-darken hover:shadow-1xs grid size-full place-items-center rounded-lg p-1 transition-colors aria-[current=page]:text-white"
			aria-current={displayName === id ? 'page' : undefined}
			href={link}
			onmouseenter={() => (hoveredId = id)}
			onmouseleave={() => (hoveredId = '')}
			onclick={(e) => {
				e.stopPropagation();
				handleNavClick(id, link);
			}}
		>
			<icon-list
				data-name={hoveredId === id || displayName === id ? `${icon}-on` : icon}
				class="stroke-90efd0 size-5 fill-white transition-all delay-0 group-hover/lnb-link:fill-white group-aria-[current=page]/lnb-link:fill-white group-aria-[current=page]/lnb-link:text-white"
			></icon-list>
			<p>{h3}</p>
		</a>
	</li>
{/snippet}

<aside class="bg-primary flex h-full flex-col space-y-3 px-2 py-6">
	<picture class="flex h-10 justify-center">
		<enhanced:img class="h-10 w-auto" src={logo} alt="logo" />
	</picture>
	<nav class="text-base text-slate-50">
		<ul class="divide-darken flex flex-col divide-y text-center leading-tight break-keep">
			{#each lnblist as lnb, i (i)}
				<li class="grid gap-4 py-5">
					{#if lnb?.h2}
						<h2 class="font-semibold text-white">{lnb?.h2}</h2>
					{/if}

					{#if lnb.list}
						<ul class="flex flex-col gap-3 text-center leading-tight break-keep">
							{#each lnb.list as list (list.id)}
								{#if !(auth === 'user' && list.id === 'CMS-LOC')}
									{@render li(list.id, list.link, list.icon, list.h3)}
								{/if}
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
</aside>
