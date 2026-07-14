<svelte:options
	customElement={{
		tag: 'group-custom',
		shadow: 'none',
		props: {
			colorCode: { type: 'String', attribute: 'color-code' },
			isAiRecommendYn: { type: 'Boolean', attribute: 'is-ai-recommend-yn' },
			isSectionCongestionYn: { type: 'Boolean', attribute: 'is-section-congestion-yn' },
			isSectionCongestionUse: { type: 'String', attribute: 'is-section-congestion-use' },
			isFacilityCongestionYn: { type: 'Boolean', attribute: 'is-facility-congestion-yn' },
			isFacilityCongestionUse: { type: 'String', attribute: 'is-facility-congestion-use' },
			isVpsContentsYn: { type: 'Boolean', attribute: 'is-vps-contents-yn' },
			isVpsContentsYnUse: { type: 'String', attribute: 'is-vps-contents-yn-use' },
			isFacilityAddressYn: { type: 'Boolean', attribute: 'is-facility-address-yn' },
			isFacilityAddressYnUse: { type: 'String', attribute: 'is-facility-address-yn-use' },
			isCustomSortingYn: { type: 'Boolean', attribute: 'is-custom-sorting-yn' },
			tourDestinationCommonButtons: { type: 'Array', attribute: 'tour-destination-common-buttons' },
			view: { type: 'String', attribute: 'view', reflect: true },
		},
	}}
/>

<script lang="ts">
	import UiBtn from '@/svelte/btn/UiBtn.svelte';
	import Chk from '@/svelte/checkbox/Chk.svelte';
	import InputGroup from '@/svelte/checkbox/InputGroup.svelte';
	import GroupDnd from '@/svelte/group/GroupDnd.svelte';
	import type { LocalizedText } from '@/types/common/locale';
	import { move } from '@dnd-kit/helpers';
	import { DragDropProvider } from '@dnd-kit/svelte';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
	import { v4 as uuidv4 } from 'uuid';

	type LangMap = {
		ko?: string;
		en?: string;
		ja?: string;
		th?: string;
		vi?: string;
		zh?: string;
	};

	type TourDestinationCommonButton = {
		sortingNumber: number;
		id: number | string;
		iconUrl?: string;
		use?: number | string;
		buttonName: LangMap;
	};

	type GroupCustomProps = {
		colorCode?: string;
		isAiRecommendYn?: boolean;
		isSectionCongestionYn?: boolean;
		isSectionCongestionUse?: string;
		isFacilityCongestionYn?: boolean;
		isFacilityCongestionUse?: string;
		isVpsContentsYn?: boolean;
		isVpsContentsYnUse?: string;
		isFacilityAddressYn?: boolean;
		isFacilityAddressYnUse?: string;
		isCustomSortingYn?: boolean;
		tourDestinationCommonButtons?: TourDestinationCommonButton[];
		view?: string;
	};

	let {
		colorCode = '#274FA8',
		isAiRecommendYn = false,
		isSectionCongestionYn = false,
		isSectionCongestionUse = '0',
		isFacilityCongestionYn = false,
		isFacilityCongestionUse = '0',
		isVpsContentsYn = false,
		isVpsContentsYnUse = '0',
		isFacilityAddressYn = false,
		isFacilityAddressYnUse = '0',
		isCustomSortingYn = false,
		tourDestinationCommonButtons = [],
		view = 'reg',
	}: GroupCustomProps = $props();

	const textNum1 = '개의 데이터 매칭 가능' as const;
	const textNum2 = '개의 시설에서 사용 중' as const;

	let isPickerOpen = $state(false);
	let rdoList = $state([
		{ id: uuidv4(), txt: '직접 지정', value: 'MANUAL' },
		{ id: uuidv4(), txt: '운영 상태 순', value: 'STATUS' },
	]);
	let snapshot = $state<TourDestinationCommonButton[]>([]);

	function getResult(): GroupCustomProps {
		return {
			colorCode,
			isAiRecommendYn,
			isSectionCongestionYn,
			isSectionCongestionUse,
			isFacilityCongestionYn,
			isFacilityCongestionUse,
			isVpsContentsYn,
			isVpsContentsYnUse,
			isFacilityAddressYn,
			isFacilityAddressYnUse,
			isCustomSortingYn,
			tourDestinationCommonButtons,
		};
	}

	function emitResultChange() {
		$host()?.dispatchEvent(
			new CustomEvent('result-change', {
				detail: structuredClone(getResult()),
				bubbles: true,
				composed: true,
			}),
		);
	}

	function updateButtons(nextButtons: TourDestinationCommonButton[]) {
		tourDestinationCommonButtons = nextButtons;
		emitResultChange();
	}

	function createNewBtnLink(): TourDestinationCommonButton {
		return {
			id: uuidv4(),
			buttonName: {
				ko: '',
				en: '',
				ja: '',
				th: '',
				vi: '',
				zh: '',
			},
			iconUrl: '',
			sortingNumber: tourDestinationCommonButtons.length,
			use: '',
		};
	}

	function toLocalizedText(buttonName?: LangMap) {
		return {
			ko: buttonName?.ko ?? '',
			en: buttonName?.en ?? '',
			ja: buttonName?.ja ?? '',
			th: buttonName?.th ?? '',
			vi: buttonName?.vi ?? '',
			zh: buttonName?.zh ?? '',
		};
	}

	function handleAddBtnLink() {
		const currentList = tourDestinationCommonButtons || [];
		if (currentList.length >= 3) {
			alert('공공 링크 버튼은 최대 3개까지만 등록 가능합니다.');
			return;
		}
		updateButtons([...currentList, createNewBtnLink()]);
	}

	function handleRemoveBtnLink(id: string) {
		updateButtons(
			tourDestinationCommonButtons
				.filter((btn) => String(btn.id) !== String(id))
				.map((btn, index) => ({ ...btn, sortingNumber: index })),
		);
	}

	let isDndDisabled = $derived((tourDestinationCommonButtons?.length ?? 0) <= 1);

	function onDragStart() {
		snapshot = structuredClone(tourDestinationCommonButtons || []);
	}

	// oxlint-disable-next-line typescript/no-explicit-any
	function onDragOver(event: any) {
		updateButtons(
			move(tourDestinationCommonButtons, event).map((item: TourDestinationCommonButton, index: number) => ({
				...item,
				sortingNumber: index,
			})),
		);
	}

	// oxlint-disable-next-line typescript/no-explicit-any
	function onDragEnd(event: any) {
		if (event.canceled) {
			updateButtons(structuredClone(snapshot));
		}
	}

	function handleUpdateBtnIcon(id: string, iconUrl: string) {
		updateButtons(tourDestinationCommonButtons.map((item) => (String(item.id) === String(id) ? { ...item, iconUrl } : item)));
	}

	const useChk = (chk?: boolean): string => {
		return chk ? '사용' : '미사용';
	};

	function handleUpdateBtnText(id: string, key: keyof LocalizedText, txt: string) {
		updateButtons(
			tourDestinationCommonButtons.map((item) =>
				String(item.id) === String(id)
					? {
							...item,
							buttonName: {
								...item.buttonName,
								[key]: txt,
							},
						}
					: item,
			),
		);
	}
</script>

{#snippet use(chk = false, txt = '', sub = '', matching = '')}
	<div class="grid min-h-9 grid-cols-[120px_1fr] items-center">
		<ui-txt size="sm" cls="text-black" {txt}></ui-txt>
		<div>
			{#if chk}
				<ui-txt size="sm" cls="font-bold text-cms-3" txt={sub}></ui-txt>
			{:else}
				<ui-txt size="sm" cls="font-bold text-slate-500" txt={sub}></ui-txt>
			{/if}

			{#if matching}
				<ui-txt size="sm" txt={matching} class="text-left"></ui-txt>
			{/if}
		</div>
	</div>
{/snippet}

{#snippet btnPreview(txt = '', img = '')}
	<button
		type="button"
		class="border-cms-3 shadow-1xs inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full border px-3"
	>
		{#if img}
			<picture class="h-4">
				<img src={img} alt="" class="h-4" />
			</picture>
		{/if}

		{#if txt}
			<span class="max-w-40 truncate">{txt}</span>
		{/if}
	</button>
{/snippet}

<ul class="divide-y divide-slate-300">
	<li class="relative z-2">
		<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5">
			<ui-tit tit="색상 코드"></ui-tit>

			{#if view === 'detail'}
				<div class="flex items-center gap-2">
					<p class="color cursor-auto" style="background-color: {colorCode || 'transparent'};"></p>
					<ui-txt size="sm" cls="text-black" txt={colorCode}></ui-txt>
				</div>
			{:else if view === 'reg' || view === 'edit'}
				<div class="flex flex-col gap-5">
					<ui-txt size="sm" txt="지도 메인 색상 코드(HEX)를 입력해 주세요  *권장: 어두운 계열의 진한 색상"></ui-txt>
					<div class="flex cursor-pointer items-center gap-2">
						<ColorPicker
							bind:isOpen={isPickerOpen}
							hex={colorCode ?? '#274FA8'}
							components={ChromeVariant}
							sliderDirection="horizontal"
							isAlpha={false}
							textInputModes={['hex']}
							label=""
							onInput={(e) => {
								colorCode = String(e.hex);
								emitResultChange();
							}}
						/>

						<input
							type="text"
							class="input-text s max-w-50 read-only:bg-white"
							readonly
							value={colorCode ?? '#274FA8'}
							onclick={() => (isPickerOpen = !isPickerOpen)}
						/>
					</div>
				</div>
			{/if}
		</div>
	</li>

	<li>
		<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4">
			<ui-tit tit="기능 커스텀" class="py-5"></ui-tit>
			<ul class="inline-grid divide-y divide-slate-200 py-2">
				<li class="flex min-h-9 items-center justify-between gap-2 px-3 py-3">
					{#if view === 'detail'}
						{@render use(isAiRecommendYn, 'AI 추천', useChk(isAiRecommendYn))}
					{:else if view === 'reg' || view === 'edit'}
						<Chk
							itemId="ai-recommend"
							txt="AI 추천"
							reverse="true"
							cls="min-w-32.5 min-h-9"
							checked={isAiRecommendYn}
							change={(e: Event) => {
								const input = e.currentTarget as HTMLInputElement;
								isAiRecommendYn = input.checked;
								emitResultChange();
							}}
						/>
					{/if}
					<ui-txt
						size="sm"
						txt="AI 기반으로 사용자 맞춤 시설을 추천하며, 카테고리별 추천 노출 여부를 설정할 수 있습니다"
					></ui-txt>
				</li>

				<li class="flex min-h-9 items-center justify-between gap-2 px-3 py-3">
					{#if view === 'detail'}
						{@render use(
							isSectionCongestionYn,
							'구역 혼잡도',
							useChk(isSectionCongestionYn),
							`${isSectionCongestionUse ?? 0}${textNum1}`,
						)}
					{:else if view === 'reg' || view === 'edit'}
						<Chk
							itemId="zone-congestion"
							txt="구역 혼잡도"
							reverse="true"
							cls="min-w-32.5 min-h-9"
							checked={isSectionCongestionYn}
							change={(e: Event) => {
								const input = e.currentTarget as HTMLInputElement;
								isSectionCongestionYn = input.checked;
								emitResultChange();
							}}
						/>
					{/if}
					<ui-txt
						size="sm"
						txt="구역에 대한 혼잡도 정보를 안내하며, 지도 관리 메뉴에서 구역을 설정 후 실제 혼잡도 데이터를 불러올 수 있습니다"
					></ui-txt>
				</li>

				<li class="flex min-h-9 items-center justify-between gap-2 px-3 py-3">
					{#if view === 'detail'}
						{@render use(
							isFacilityCongestionYn,
							'시설 혼잡도',
							useChk(isFacilityCongestionYn),
							`${isFacilityCongestionUse ?? 0}${textNum1}`,
						)}
					{:else if view === 'reg' || view === 'edit'}
						<Chk
							itemId="facility-congestion"
							txt="시설 혼잡도"
							reverse="true"
							cls="min-w-32.5 min-h-9"
							checked={isFacilityCongestionYn}
							change={(e: Event) => {
								const input = e.currentTarget as HTMLInputElement;
								isFacilityCongestionYn = input.checked;
								emitResultChange();
							}}
						/>
					{/if}
					<ui-txt
						size="sm"
						txt="시설에 대한 혼잡도 정보를 안내하며, 시설 등록 시 실제 혼잡도 데이터를 불러올 수 있습니다"
					></ui-txt>
				</li>
			</ul>
		</div>
	</li>

	<li>
		<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4">
			<ui-tit tit="시설 정보 커스텀" class="py-5"></ui-tit>
			<ul class="inline-grid divide-y divide-slate-200 py-2">
				<li class="flex min-h-9 items-center justify-between gap-2 px-3 py-3">
					{#if view === 'detail'}
						{@render use(
							isVpsContentsYn,
							'위치 기반 콘텐츠',
							useChk(isVpsContentsYn),
							`${isVpsContentsYnUse ?? 0}${textNum2}`,
						)}
					{:else if view === 'reg' || view === 'edit'}
						<Chk
							itemId="location-based-content"
							txt="위치 기반 콘텐츠"
							reverse="true"
							cls="min-w-32.5 min-h-9"
							checked={isVpsContentsYn}
							change={(e: Event) => {
								const input = e.currentTarget as HTMLInputElement;
								isVpsContentsYn = input.checked;
								emitResultChange();
							}}
						/>
					{/if}
					<ui-txt size="sm" txt="사용자가 시설 반경 5m 이내에 접근했을 때, 콘텐츠 링크 진입을 유도합니다"></ui-txt>
				</li>

				<li class="flex min-h-9 items-center justify-between gap-2 px-3 py-3">
					{#if view === 'detail'}
						{@render use(isFacilityAddressYn, '시설 주소 노출', useChk(isFacilityAddressYn))}
					{:else if view === 'reg' || view === 'edit'}
						<Chk
							itemId="facility-address-exposure"
							txt="시설 주소 노출"
							reverse="true"
							cls="min-w-32.5 min-h-9"
							checked={isFacilityAddressYn}
							change={(e: Event) => {
								const input = e.currentTarget as HTMLInputElement;
								isFacilityAddressYn = input.checked;
								emitResultChange();
							}}
						/>
					{/if}
					<ui-txt size="sm" txt="사용자 화면에서 시설의 상세 주소를 함께 안내합니다"></ui-txt>
				</li>

				<li class="flex min-h-9 items-center justify-between gap-2 px-3 py-3">
					<div class="flex items-center gap-3">
						{#if view === 'detail'}
							{@render use(isCustomSortingYn, '시설 정렬 순서', isCustomSortingYn ? '직접 지정' : '운영 상태 순')}
						{:else if view === 'reg' || view === 'edit'}
							<ui-txt
								size="sm"
								txt="시설 정렬 순서"
								cls="text-black min-w-25 min-h-9 place-content-center"
							></ui-txt>
							<InputGroup
								itemId="rdo-11"
								name="rdo"
								arr={rdoList}
								cls="inline-flex gap-3"
								value={isCustomSortingYn ? 'STATUS' : 'MANUAL'}
								change={(e: Event) => {
									const input = e.target as HTMLInputElement;
									isCustomSortingYn = input.value === 'STATUS';
									emitResultChange();
								}}
							/>
						{/if}
					</div>
					<ui-txt
						size="sm"
						txt="한 위치에 여러 시설이 등록된 경우, 사용자 화면에서 선택한 정렬 기준으로 노출됩니다"
					></ui-txt>
				</li>
			</ul>
		</div>
	</li>

	<li>
		<div class="grid max-w-375 grid-cols-[100px_1fr_120px] items-center gap-5 px-4 py-4">
			<ui-tit tit="공통 링크 버튼 <br />미리보기"></ui-tit>
			<ui-txt
				size="sm"
				txt="시설 등록 시 설정된 버튼에 대한 링크를 삽입하여 사용자에게 제공할 수 있으며, 최대 3개까지 등록 가능합니다"
			></ui-txt>

			{#if view === 'reg' || view === 'edit'}
				<UiBtn
					variant="secondary"
					size="lg"
					txt="추가"
					cls="min-w-30"
					click={handleAddBtnLink}
					disabled={tourDestinationCommonButtons?.length === 3}
				/>
			{/if}
		</div>

		{#if view === 'detail'}
			<ul class="flex items-center gap-5">
				{#each tourDestinationCommonButtons ?? [] as btn (btn.id)}
					<li class="grid grid-cols-5 gap-4 rounded-sm border border-slate-200 px-3 py-4">
						<div class="col-span-2 flex flex-col items-center justify-center gap-3">
							{@render btnPreview(btn.buttonName.ko, btn.iconUrl)}

							{#if btn.use}
								<ui-txt size="sm" txt={`${btn.use}개의 시설에서 사용 중`}></ui-txt>
							{/if}
						</div>
						<div class="col-span-3">
							<ui-txt size="sm" cls="text-black" txt="다국어 버튼명"></ui-txt>
							<lang-translate
								data-max-length="50"
								{view}
								btnPreview="btn-name"
								lang={btn.buttonName}
							></lang-translate>
						</div>
					</li>
				{/each}
			</ul>
		{:else if view === 'reg' || view === 'edit'}
			<DragDropProvider {onDragStart} {onDragOver} {onDragEnd}>
				<ul class="flex flex-col gap-3 px-4 pb-4">
					{#each tourDestinationCommonButtons ?? [] as btn, index (btn.id)}
						<GroupDnd
							id={String(btn.id)}
							{index}
							btn={{
								...btn,
								id: String(btn.id),
								iconUrl: btn.iconUrl ?? '',
								buttonName: toLocalizedText(btn.buttonName),
							}}
							{btnPreview}
							onRemove={handleRemoveBtnLink}
							onUpdateTxt={handleUpdateBtnText}
							onUpdateIcon={handleUpdateBtnIcon}
							{isDndDisabled}
						/>
					{/each}
				</ul>
			</DragDropProvider>
		{/if}
	</li>
</ul>

<style>
	:global(.color) {
		width: 28px;
		height: 28px;
		border-radius: 2px !important;
	}
</style>
