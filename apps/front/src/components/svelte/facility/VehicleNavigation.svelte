<script lang="ts">
	import * as m from '@/paraglide/messages';
	import { langState, pickText } from '@/stores/globalStore';
	import Icons from '@/svelte/icons/Icons.svelte';
	import { facilityCurrent } from '@/utils/detail.svelte.ts';
	import { Modal } from 'flowbite-svelte';

	let defaultModal = $state(false);
</script>

{#if $facilityCurrent?.poisMatch?.managementCode}
	<div class="grid px-5 py-1">
		<button
			type="button"
			class="text-09235e flex min-h-9 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-100 px-5 py-1"
			onclick={() => (defaultModal = true)}
		>
			<span class="flex items-center gap-2">
				<Icons name="mdi-car" cls="size-4 fill-09235e" />
				{m.usr_map_002_43({ locale: $langState })}
			</span>
			<Icons name="map-start" cls="size-4 fill-09235e" />
		</button>
	</div>
{/if}

<Modal
	bind:open={defaultModal}
	placement="center"
	class="m-auto max-h-dvh max-w-[calc(100%-60px)] divide-transparent"
	classes={{ header: 'p-0 md:p-0', body: 'p-0 md:p-0' }}
>
	{#snippet header()}
		<div class="flex w-full items-center justify-between gap-2 px-5 pt-5 pb-1">
			<p class="line-clamp-2 font-bold text-black">
				{m.usr_map_112_01({ name: `${pickText($facilityCurrent?.facility?.name, $langState)}` }, { locale: $langState })}
			</p>

			<button type="button" class="sr-only grid size-8 place-content-center" onclick={() => (defaultModal = !defaultModal)}>
				<Icons name="close-circle" cls="size-4 stroke-black" />
				<span class="sr-only">close</span>
			</button>
		</div>
	{/snippet}

	<ul class="space-y-2 px-5 pt-2 pb-5">
		<li>
			<a
				href="http://"
				target="_blank"
				rel="noopener noreferrer"
				class="grid grid-cols-[32px_1fr] items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2"
			>
				<picture>
					<img src="/images/icon/img-tmap.svg" alt="" />
				</picture>
				<span class="text-center text-black">{m.usr_map_112_02({ locale: $langState })}</span>
			</a>
		</li>
		<li>
			<a
				href="http://"
				target="_blank"
				rel="noopener noreferrer"
				class="grid grid-cols-[32px_1fr] items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2"
			>
				<picture>
					<img src="/images/icon/img-kakao-navi.svg" alt="" />
				</picture>
				<span class="text-center text-black">{m.usr_map_112_03({ locale: $langState })}</span>
			</a>
		</li>
		<li>
			<a
				href="http://"
				target="_blank"
				rel="noopener noreferrer"
				class="grid grid-cols-[32px_1fr] items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2"
			>
				<picture>
					<img src="/images/icon/img-naver-map.svg" alt="" />
				</picture>
				<span class="text-center text-black">{m.usr_map_112_04({ locale: $langState })}</span>
			</a>
		</li>
	</ul>
</Modal>
