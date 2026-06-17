<script lang="ts">
	import { createSortable } from '@dnd-kit/svelte/sortable';
	import UiBtn from '$lib/components/btn/UiBtn.svelte';
	import HoverTooltip from '$lib/components/tooltip/HoverTooltip.svelte';
	import IconUpload from '$lib/components/upload/IconUpload.svelte';
	import { type LangAll } from '$lib/stores/langStore';

	interface Props {
		id: string;
		index: number;
		btn: { id: string; lang: LangAll; img: string };
		onRemove: (id: string) => void;
		isDndDisabled: boolean;
	}

	let { id, index, btn, onRemove, isDndDisabled }: Props = $props();

	const sortable = createSortable({
		get id() {
			return id;
		},
		get index() {
			return index;
		},
		get disabled() {
			return isDndDisabled;
		},
	});
</script>

<li
	{@attach sortable.attach}
	data-shadow={sortable.isDragging ? 'true' : undefined}
	class="grid grid-cols-[130px_348px_120px_40px] items-center gap-4 rounded-sm border border-slate-200 bg-white py-4 transition-all duration-150"
	class:opacity-50={sortable.isDragging}
	class:scale-[1.01]={sortable.isDragging}
	class:shadow-md={sortable.isDragging}
	aria-label={String(index + 1)}
>
	<div class="flex h-full flex-col items-start gap-1">
		{#if isDndDisabled}
			<ui-tit tag="h4" tit="버튼명" class="pl-12"></ui-tit>
		{:else}
			<button type="button" {@attach sortable.attachHandle} class="handle flex items-center gap-4 pl-4" aria-label="Drag handle">
				<span class="sr-only">드래그</span>
				<span class="flex w-4 justify-center">
					<icon-list data-name="dnd" class="icon flex h-2.5 w-1.5 fill-slate-300"></icon-list>
				</span>
				<ui-tit tag="h4" tit="버튼명"></ui-tit>
			</button>
		{/if}

		<div class="flex items-center pl-12">
			<HoverTooltip btn="6자 이내 권장" txt="언어에 따라 표현 길이가 달라질 수 있으므로 \n번역 내용을 확인해주세요. (최대 50자)" />
		</div>
	</div>

	<div class="flex h-full items-start">
		<lang-translate class="flex-1" lang={btn.lang}></lang-translate>
	</div>

	<div class="flex flex-col justify-center">
		<IconUpload />
	</div>

	<div class="flex flex-col items-center justify-center">
		<UiBtn
			tag="button"
			variant="icon"
			txt="삭제"
			iconName="btn-del"
			cls="size-7 stroke-error fill-error"
			click={() => onRemove(btn.id)}
		/>
	</div>
</li>
