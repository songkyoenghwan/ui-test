<script lang="ts">
	import FieldCase from '$/lib/components/slide/FieldCase.svelte';
	import SubHeading from '$lib/components/heading/SubHeading.svelte';
	import CountNumber from '$lib/components/text/CountNumber.svelte';

	let { tit = '', txt = '', subTxt = '', lists = [] } = $props();
</script>

{#snippet resultLi(num = 0, subTit = '', txt = '', result = 'down', per = '')}
	<li
		data-scroll="slide-up"
		class={[
			'h-90.5 overflow-clip rounded-xl p-5  lg:p-7.5 xl:h-111.25',
			result === 'up' ? 'bg-ff4000/10' : result === 'chk' ? 'bg-1bc900/10' : result === 'down' ? 'bg-primary/10' : 'bg-ddd',
		]}
	>
		<dl class="group/res flex h-full flex-col justify-between">
			<dt class="relative">
				<p
					class={[
						'relative pr-15 text-6xl leading-none font-bold transition-colors lg:text-[90px]',
						result === 'up' ? 'text-red' : result === 'chk' ? 'text-149e00' : result === 'down' ? 'text-primary' : 'text-black',
					]}
				>
					{#if num}
						<CountNumber text={Number(num)} />
					{:else}
						ZERO
					{/if}
					{#if per}
						{per}
					{/if}
				</p>

				<p class="text-2xl font-bold lg:text-4xl lg:whitespace-pre-line">{subTit}</p>

				<div
					data-scroll="scale-up"
					class={[
						'@starting:rotate-180 absolute top-0 right-0 z-1 grid size-10 scale-100 rotate-0 place-content-center rounded-2xl transition-all delay-1000 lg:size-12.5',
						result === 'up' ? 'fill-red' : result === 'chk' ? 'fill-149e00' : result === 'down' ? 'fill-primary' : 'fill-black',
					]}
				>
					<icon-list
						name={result === 'up'
							? 'result-up'
							: result === 'chk'
								? 'result-chk'
								: result === 'down'
									? 'result-down'
									: result === 'eye'
										? 'result-eye'
										: 'result-close'}
						class="size-12.5"
					></icon-list>
				</div>
			</dt>
			<dd class="text-2xl lg:text-4xl lg:whitespace-pre-line">
				<p class="text-666 text-2md lg:text-lg">{txt}</p>
			</dd>
		</dl>
	</li>
{/snippet}

<section data-scroll="slide-up" class="space-y-5 rounded-xl py-11.25 lg:space-y-7.5 lg:py-15">
	<SubHeading {tit} {txt} {subTxt} />
	<ul
		class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5 lg:grid-cols-[repeat(auto-fit,minmax(calc(50%-20px),1fr))] xl:grid-cols-[repeat(auto-fit,minmax(calc(25%-20px),1fr))]"
	>
		{#each lists as list, i (`result-item-${i}`)}
			{@render resultLi(list.num, list.subTit, list.txt, list.result, list.per)}
		{/each}
	</ul>
	<FieldCase />
</section>
