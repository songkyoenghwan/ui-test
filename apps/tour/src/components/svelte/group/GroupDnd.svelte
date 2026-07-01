<script lang="ts">
	import UiBtn from '@/svelte/btn/UiBtn.svelte';
	import HoverTooltip from '@/svelte/tooltip/HoverTooltip.svelte';
	import IconUpload from '@/svelte/upload/IconUpload.svelte';
	// import type { LangTranslateKey } from '@/types/lang/langTranslate.type';
	import type { LocalizedText } from '@/types/common/locale';
	import { createSortable } from '@dnd-kit/svelte/sortable';
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		index: number;
		btn: { id: string; buttonName: LocalizedText; iconUrl: string };
		onRemove: (id: string) => void;
		onUpdateIcon: (id: string, iconUrl: string) => void;
		onUpdateTxt: (id: string, key: keyof LocalizedText, txt: string) => void;
		isDndDisabled: boolean;
		btnPreview: Snippet<[string, string]>;
	}

	let { id, index, btn, onRemove, onUpdateIcon, onUpdateTxt, isDndDisabled, btnPreview }: Props = $props();

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
	class="grid grid-cols-[658px_40px] rounded-sm border border-slate-200 bg-white py-4 transition-all duration-150 has-[.preview]:grid-cols-[658px_1fr_40px]"
	class:scale-[1.01]={sortable.isDragging}
	class:shadow-md={sortable.isDragging}
	aria-label={String(index + 1)}
>
	<section class="grid grid-cols-[130px_348px_120px] items-center gap-4">
		<div class="flex h-full flex-col items-start gap-1">
			{#if isDndDisabled}
				<ui-tit tag="h4" tit="버튼명" class="pl-12"></ui-tit>
			{:else}
				<button
					type="button"
					{@attach sortable.attachHandle}
					class="handle flex items-center gap-4 pl-4"
					aria-label="Drag handle"
				>
					<span class="sr-only">드래그</span>
					<span class="flex w-4 justify-center">
						<icon-list data-name="dnd" class="icon flex h-2.5 w-1.5 fill-slate-300"></icon-list>
					</span>
					<ui-tit tag="h4" tit="버튼명"></ui-tit>
				</button>
			{/if}

			<div class="flex items-center pl-12">
				<HoverTooltip
					btn="6자 이내 권장"
					txt="언어에 따라 표현 길이가 달라질 수 있으므로 \n번역 내용을 확인해주세요. (최대 50자)"
				/>
			</div>
		</div>

		<div class="flex h-full items-start">
			<lang-translate
				class="flex-1"
				lang={btn.buttonName}
				onupdate={(e: Event) => {
					const { key, txt } = e.detail;
					onUpdateTxt(btn.id, key, txt);
				}}
			></lang-translate>
		</div>

		<div class="flex flex-col justify-center">
			<IconUpload
				img={btn.iconUrl}
				onUpdate={(newImg) => {
					onUpdateIcon(btn.id, newImg);
				}}
			/>
		</div>
	</section>
	{#if btn?.buttonName?.ko || btn.iconUrl}
		<section class="preview flex flex-col gap-5">
			<ui-tit tag="h4" tit="미리보기"></ui-tit>

			{@render btnPreview(btn?.buttonName?.ko ?? '', btn.iconUrl ?? '')}
		</section>
	{/if}

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
