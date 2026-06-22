<svelte:options
	customElement={{
		tag: 'group-custom',
		shadow: 'none',
		props: {
			result: { type: 'Array' },
			view: { type: 'String', reflect: true },
		},
	}}
/>

<script lang="ts">
	import { move } from '@dnd-kit/helpers';
	import { DragDropProvider } from '@dnd-kit/svelte';
	import UiBtn from '$lib/components/btn/UiBtn.svelte';
	import Chk from '$lib/components/checkbox/Chk.svelte';
	import InputGroup from '$lib/components/checkbox/InputGroup.svelte';
	import GroupDnd from '$lib/components/group/GroupDnd.svelte';
	import InputText from '$lib/components/inputs/InputText.svelte';
	import { createDefaultConfigResult, type BtnLink, type Props } from '$lib/types/group/groupCustom.type';
	import { untrack } from 'svelte';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
	import { v4 as uuidv4 } from 'uuid';

	let { result = $bindable(), view = 'reg' }: Props = $props();
	let isPickerOpen = $state(false);
	let rdoList = $state([
		{
			id: uuidv4(),
			txt: '직접 지정',
			value: 'MANUAL',
		},
		{
			id: uuidv4(),
			txt: '운영 상태 순',
			value: 'STATUS',
		},
	]);
	let local = $state(createDefaultConfigResult());

	$effect(() => {
		if (result && typeof result === 'object') {
			const resultSnap = $state.snapshot(result);

			untrack(() => {
				local.color = resultSnap?.color ?? '#14b871';

				local.features = {
					ai: resultSnap?.features?.ai ?? false,
					zone: resultSnap?.features?.zone ?? false,
					zoneUse: resultSnap?.features?.zoneUse ?? '0',
					facility: resultSnap?.features?.facility ?? false,
					facilityUse: resultSnap?.features?.facilityUse ?? '0',
				};

				local.information = {
					location: resultSnap?.information?.location ?? false,
					locationUse: resultSnap?.information?.locationUse ?? '0',
					address: resultSnap?.information?.address ?? false,
					sorting: resultSnap?.information?.sorting ?? 'MANUAL',
				};

				local.btnLink = resultSnap?.btnLink ?? [];
			});
		}
	});

	function createNewBtnLink(): BtnLink {
		return {
			id: uuidv4(),
			lang: {
				ko: { value: '', error: false },
				en: { value: '', error: false },
				zh: { value: '', error: false },
				ja: { value: '', error: false },
				th: { value: '', error: false },
				vi: { value: '', error: false },
			},
			img: '',
			use: '',
		};
	}

	function handleAddBtnLink() {
		const currentList = local?.btnLink || [];
		if (currentList.length >= 3) {
			alert('공공 링크 버튼은 최대 3개까지만 등록 가능합니다.');
			return;
		}
		local = {
			...local,
			btnLink: [...currentList, createNewBtnLink()],
		};
	}

	function handleRemoveBtnLink(id: string) {
		if (local?.btnLink) {
			local = {
				...local,
				btnLink: local?.btnLink.filter((btn) => btn.id !== id),
			};
		}
	}

	let snapshot: BtnLink[] = $state([]);
	let isDndDisabled = $derived((local?.btnLink?.length ?? 0) <= 1);
	function onDragStart() {
		snapshot = [...(local?.btnLink || [])];
	}

	// oxlint-disable-next-line typescript/no-explicit-any
	function onDragOver(event: any) {
		if (local?.btnLink) {
			local = {
				...local,
				btnLink: move(local.btnLink, event),
			};
		}
	}

	// oxlint-disable-next-line typescript/no-explicit-any
	function onDragEnd(event: any) {
		if (event.canceled) {
			local = { ...local, btnLink: snapshot };
		}
	}

	const useChk = (chk?: boolean): string => {
		return chk ? '사용' : '미사용';
	};
	const textNum1 = '개의 데이터 매칭 가능' as const;
	const textNum2 = '개의 시설에서 사용 중' as const;

	$effect(() => {
		const resultSnap = $state.snapshot(result);
		if (result && typeof result === 'object') {
			untrack(() => {
				result.color = resultSnap?.color;
				result.features = {
					ai: resultSnap?.features?.ai,
					zone: resultSnap?.features?.zone,
					zoneUse: resultSnap?.features?.zoneUse,
					facility: resultSnap?.features?.facility,
					facilityUse: resultSnap?.features?.facilityUse,
				};
				result.information = {
					location: resultSnap?.information?.location,
					locationUse: resultSnap?.information?.locationUse,
					address: resultSnap?.information?.address,
					sorting: resultSnap?.information?.sorting,
				};

				result.btnLink = resultSnap?.btnLink ?? [];
			});
		}
	});
</script>

{#snippet use(txt = '', sub = '', matching = '')}
	<div class="grid grid-cols-[120px_1fr] items-center">
		<ui-txt size="sm" cls="text-black" {txt}></ui-txt>
		<div>
			<ui-txt size="sm" cls="text-cms-3 font-bold" txt={sub}></ui-txt>

			{#if matching}
				<ui-txt size="sm" txt={matching}></ui-txt>
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
			<span>{txt}</span>
		{/if}
	</button>
{/snippet}

{#if local}
	<ul class="divide-y divide-slate-300">
		<li class="relative z-2">
			<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5">
				<ui-tit tit="색상 코드"></ui-tit>

				{#if view === 'detail'}
					<div class="flex items-center gap-2">
						<p class="color cursor-auto" style="background-color: {local.color || 'transparent'};"></p>
						<ui-txt size="sm" cls="text-black" txt={local.color}></ui-txt>
					</div>
				{:else if view === 'reg' || view === 'edit'}
					<div class="flex flex-col gap-5">
						<ui-txt size="sm" txt="지도 메인 색상 코드(HEX)를 입력해 주세요  *권장: 어두운 계열의 진한 색상"></ui-txt>
						<div class="flex cursor-pointer items-center gap-2">
							<ColorPicker
								bind:isOpen={isPickerOpen}
								bind:hex={local.color}
								components={ChromeVariant}
								sliderDirection="horizontal"
								isAlpha={false}
								textInputModes={['hex']}
								label=""
							/>
							<InputText
								cls="max-w-50 s"
								bind:value={local.color}
								readonly={true}
								onclick={() => (isPickerOpen = !isPickerOpen)}
							/>
						</div>
					</div>
				{/if}
			</div>
		</li>
		<li>
			<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5">
				<ui-tit tit="기능 커스텀"></ui-tit>
				<ul class="inline-grid divide-y divide-slate-200">
					<li class="flex items-center justify-between gap-2 px-3 pb-3">
						{#if view === 'detail'}
							{@render use('시설 혼잡도', useChk(local?.features?.ai))}
						{:else if view === 'reg' || view === 'edit'}
							<Chk
								itemId="ai-recommend"
								txt="AI 추천"
								reverse="true"
								cls="min-w-32.5 min-h-9"
								bind:checked={local.features!.ai}
							/>
						{/if}
						<ui-txt
							size="sm"
							txt="AI 기반으로 사용자 맞춤 시설을 추천하며, 카테고리별 추천 노출 여부를 설정할 수 있습니다"
						></ui-txt>
					</li>
					<li class="flex items-center justify-between gap-2 p-3">
						{#if view === 'detail'}
							{@render use('구역 혼잡도', useChk(local?.features?.zone), `${local?.features?.zoneUse}${textNum1}`)}
						{:else if view === 'reg' || view === 'edit'}
							<Chk
								itemId="zone-congestion"
								txt="구역 혼잡도"
								reverse="true"
								cls="min-w-32.5 min-h-9"
								bind:checked={local.features!.zone}
							/>
						{/if}
						<ui-txt
							size="sm"
							txt="구역에 대한 혼잡도 정보를 안내하며, 지도 관리 메뉴에서 구역을 설정 후 실제 혼잡도 데이터를 불러올 수 있습니다"
						></ui-txt>
					</li>
					<li class="flex items-center justify-between gap-2 p-3">
						{#if view === 'detail'}
							{@render use(
								'시설 혼잡도',
								useChk(local?.features?.facility),
								`${local?.features?.facilityUse}${textNum1}`,
							)}
						{:else if view === 'reg' || view === 'edit'}
							<Chk
								itemId="facility-congestion"
								txt="시설 혼잡도"
								reverse="true"
								cls="min-w-32.5 min-h-9"
								bind:checked={local.features!.facility}
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
			<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-4">
				<ui-tit tit="시설 정보 커스텀"></ui-tit>
				<ul class="inline-grid divide-y divide-slate-200">
					<li class="flex items-center justify-between gap-2 px-3 pb-3">
						{#if view === 'detail'}
							{@render use(
								'위치 기반 콘텐츠',
								useChk(local?.information?.location),
								`${local?.information?.locationUse}${textNum2}`,
							)}
						{:else if view === 'reg' || view === 'edit'}
							<Chk
								itemId="location-based-content"
								txt="위치 기반 콘텐츠"
								reverse="true"
								cls="min-w-32.5 min-h-9"
								bind:checked={local.information!.location}
							/>
						{/if}
						<ui-txt
							size="sm"
							txt="AI 기반으로 사용자 맞춤 시설을 추천하며, 카테고리별 추천 노출 여부를 설정할 수 있습니다"
						></ui-txt>
					</li>
					<li class="flex items-center justify-between gap-2 p-3">
						{#if view === 'detail'}
							{@render use('시설 주소 노출', useChk(local?.information?.address))}
						{:else if view === 'reg' || view === 'edit'}
							<Chk
								itemId="facility-address-exposure"
								txt="시설 주소 노출"
								reverse="true"
								cls="min-w-32.5 min-h-9"
								bind:checked={local.information!.address}
							/>
						{/if}
						<ui-txt
							size="sm"
							txt="구역에 대한 혼잡도 정보를 안내하며, 지도 관리 메뉴에서 구역을 설정 후 실제 혼잡도 데이터를 불러올 수 있습니다"
						></ui-txt>
					</li>
					<li class="flex items-center justify-between gap-2 p-3">
						<div class="flex items-center gap-3">
							{#if view === 'detail'}
								{@render use(
									'시설 정렬 순서',
									rdoList.find((item) => item.value === local?.information?.sorting)?.txt || '',
								)}
							{:else if view === 'reg' || view === 'edit'}
								<ui-txt size="sm" txt="시설 정렬 순서" cls="text-black min-w-25"></ui-txt>
								<InputGroup
									itemId="rdo-11"
									name="rdo"
									arr={rdoList}
									cls="inline-flex gap-3"
									bind:value={local.information!.sorting}
								/>
							{/if}
						</div>
						<ui-txt
							size="sm"
							txt="시설에 대한 혼잡도 정보를 안내하며, 시설 등록 시 실제 혼잡도 데이터를 불러올 수 있습니다"
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
						disabled={local?.btnLink?.length === 3}
					/>
				{/if}
			</div>

			{#if view === 'detail'}
				<ul class="flex items-center gap-5">
					{#each local?.btnLink ?? [] as btn (btn.id)}
						<li class="grid grid-cols-5 gap-4 rounded-sm border border-slate-200 px-3 py-4">
							<div class="col-span-2 flex flex-col items-center justify-center gap-3">
								{@render btnPreview(btn.lang.ko.value, btn.img)}

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
									lang={btn.lang}
								></lang-translate>
							</div>
						</li>
					{/each}
				</ul>
			{:else if view === 'reg' || view === 'edit'}
				<DragDropProvider {onDragStart} {onDragOver} {onDragEnd}>
					<ul class="flex flex-col gap-3 px-4 pb-4">
						{#each local?.btnLink ?? [] as btn, index (btn.id)}
							<GroupDnd id={btn.id} {index} {btn} {btnPreview} onRemove={handleRemoveBtnLink} {isDndDisabled} />
						{/each}
					</ul>
				</DragDropProvider>
			{/if}
		</li>
	</ul>
{/if}

<style>
	/* 내부 입력 필드 라운드 조절 */
	:global(.color) {
		width: 28px;
		height: 28px;
		border-radius: 2px !important;
	}
</style>
