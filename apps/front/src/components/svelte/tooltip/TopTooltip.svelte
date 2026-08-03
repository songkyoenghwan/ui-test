<svelte:options
	customElement={{
		tag: 'top-tooltip',
		shadow: 'none',
		props: {
			variant: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';

	let { tit = '', checked = '', variant = '' } = $props();

	let id = String(uuidv4());
</script>

<section
	class={[
		'group/top-tip  relative inline-flex min-h-12 items-center gap-1 rounded-sm bg-white opacity-100 shadow-2xs starting:opacity-0',
		variant === 'bg-secondary' ? 'has-checked:bg-secondary' : 'has-checked:bg-white',
	]}
>
	<div class="flex items-center gap-2 py-1 pl-4">
		<icon-list data-name="info-circle" class="icon fill-cms-3 size-5"></icon-list>
		<h4
			class="text-121212 hidden text-base font-normal opacity-100 transition-opacity transition-discrete group-has-checked/top-tip:flex starting:opacity-0"
		>
			{tit || ''}
		</h4>
	</div>
	<label
		for={id || 'top-label-1'}
		class="icon hover:bg-f0fdfa inline-flex h-full min-h-[stretch] min-w-15 flex-[0_0_50px] items-center justify-center rounded-r-sm px-1 text-base text-slate-400 group-has-checked/top-tip:flex-[0_0_80px]"
	>
		<icon-list
			data-name="arrow-left"
			class="icon relative size-5 rotate-180 stroke-slate-400 transition-transform group-has-checked/top-tip:rotate-0"
		></icon-list>
		<input
			type="checkbox"
			id={id || 'top-label-1'}
			name={id || 'top-label-1'}
			class="peer sr-only"
			checked={checked === 'chk'}
			onchange={(e) => {
				checked = (e.currentTarget as HTMLInputElement).checked ? 'chk' : '';
			}}
		/>
		<span class="relative hidden group-has-checked/top-tip:flex">접기</span>
	</label>
</section>
