<script lang="ts">
	import Icons from '@/lib/components/icons/Icons.svelte';
	import { page } from '$app/state';
	import { Tooltip } from 'flowbite-svelte';

	const list = [
		{
			id: 'work-order-upload',
			text: '작업지시서 업로드',
			icon: 'export',
			link: '/',
			active: true,
		},
		{
			id: 'wave-picking',
			text: '피킹 리스트',
			icon: 'wave-picking-list',
			link: '/wave-picking',
			active: false,
		},
		{
			id: 'inspection',
			text: '검수 리스트',
			icon: 'inspection-list',
			link: '/inspection',
			active: false,
		},
		{
			id: 'das',
			text: 'DAS 리스트',
			icon: 'das-list',
			link: '/das',
			active: false,
		},
	];
</script>

<aside class="bg-primary text-primary-frg p-container h-full rounded-2xl text-xl transition-all">
	<nav class="relative">
		<ul class="gap-container flex flex-col">
			{#each list as item (item.id)}
				{@const isActive = item.link === '/' ? page.url.pathname === '/' : page.url.pathname.split('/').includes(item.id)}

				<li class="group" aria-current={isActive ? 'page' : undefined}>
					<a
						href={item.link}
						class="p-card hover:bg-default/70 group-aria-[current=page]:bg-default relative flex min-h-14 items-center gap-3 rounded-xl text-lg opacity-70 transition-all group-aria-[current=page]:opacity-100"
						aria-label={item.text}
					>
						<Icons name={item.icon} cls="flex size-8 fill-white stroke-white" />
						<span class="max-[1280px]:hidden min-[1280px]:block">{item.text}</span>
					</a>

					<Tooltip placement="right" class="bg-primary border-primary border text-white min-[1280px]:hidden">{item.text}</Tooltip>
				</li>
			{/each}
		</ul>
	</nav>
</aside>
