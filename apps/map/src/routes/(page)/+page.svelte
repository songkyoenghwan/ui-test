<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const getStatusClass = (check: string | undefined) => {
		switch (check) {
			case '완료':
				return 'text-[--222]';
			case '수정':
				return 'text-red-600';
			case '삭제':
				return 'text-gray-300 line-through';
			case '신규':
				return 'text-2070fb';
			case '확인 필요':
				return 'text-green-600';
			default:
				return 'text-gray-600';
		}
	};
</script>

<section>
	{#each data.list as item (item.title)}
		<div class="p-2">
			{#if item.page}
				<h1 class="text-2070fb m-2 pb-2 text-2xl font-bold">{item.page}</h1>
			{/if}

			{#if item.title}
				<h2 class="text-2d3648 m-2 text-xl font-bold">{item.title}</h2>
			{/if}

			<div class="grid gap-1 sm:grid-cols-1">
				{#each item.subList as subItem, subIndex (subItem.text)}
					<div class={'border-b border-gray-300 transition-shadow hover:shadow-md ' + getStatusClass(subItem.check)}>
						{#if subItem.subtitle}
							<p class="py-2 text-blue-400">&middot; {subItem.subtitle}</p>
						{/if}

						<a
							href={subItem.url}
							target="_blank"
							rel="noopener noreferrer"
							class="group flex h-full flex-col gap-2 p-2 hover:bg-slate-50"
						>
							<div class="flex items-start justify-between gap-2">
								<p class="space-x-1 font-medium">
									{subIndex + 1}. {subItem.text}
									<span class="text-xs">{subItem.url}</span>
								</p>

								{#if subItem.etc}
									<span class="shrink-0 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 group-hover:bg-white">
										{subItem.etc}
									</span>
								{/if}
							</div>
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</section>
