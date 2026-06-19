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
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
	import { v4 as uuidv4 } from 'uuid';

	let { result = $bindable(), view = 'reg' }: Props = $props();
	let isPickerOpen = $state(false);
	let stateResult = $state(result ?? createDefaultConfigResult());
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
		};
	}

	function handleAddBtnLink() {
		const currentList = result?.btnLink || [];
		if (currentList.length >= 3) {
			alert('공공 링크 버튼은 최대 3개까지만 등록 가능합니다.');
			return;
		}
		result = {
			...result,
			btnLink: [...currentList, createNewBtnLink()],
		};
	}

	function handleRemoveBtnLink(id: string) {
		if (result?.btnLink) {
			result = {
				...result,
				btnLink: result?.btnLink.filter((btn) => btn.id !== id),
			};
		}
	}

	let snapshot: BtnLink[] = $state([]);
	let isDndDisabled = $derived((result?.btnLink?.length ?? 0) <= 1);
	function onDragStart() {
		snapshot = [...(result?.btnLink || [])];
	}

	// oxlint-disable-next-line typescript/no-explicit-any
	function onDragOver(event: any) {
		if (result?.btnLink) {
			result = {
				...result,
				btnLink: move(result.btnLink, event),
			};
		}
	}

	// oxlint-disable-next-line typescript/no-explicit-any
	function onDragEnd(event: any) {
		if (event.canceled) {
			result = { ...result, btnLink: snapshot };
		}
	}

	const useChk = (chk?: boolean): string => {
		return chk ? '사용' : '미사용';
	};
	const textNum1 = '개의 데이터 매칭 가능' as const;
	const textNum2 = '개의 시설에서 사용 중' as const;

	$effect(() => {
		result = stateResult;
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

<ul class="divide-y divide-slate-300">
	<li class="relative z-2">
		<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5">
			<ui-tit tit="색상 코드"></ui-tit>

			{#if view === 'detail'}
				<div class="flex items-center gap-2">
					<p class="color cursor-auto" style="background-color: {stateResult.color || 'transparent'};"></p>
					<ui-txt size="sm" cls="text-black" txt={stateResult.color}></ui-txt>
				</div>
			{/if}

			{#if view === 'reg'}
				<div class="flex flex-col gap-5">
					<ui-txt size="sm" txt="지도 메인 색상 코드(HEX)를 입력해 주세요  *권장: 어두운 계열의 진한 색상"></ui-txt>
					<div class="flex cursor-pointer items-center gap-2">
						<ColorPicker
							bind:isOpen={isPickerOpen}
							bind:hex={stateResult.color}
							components={ChromeVariant}
							sliderDirection="horizontal"
							isAlpha={false}
							textInputModes={['hex']}
							label=""
						/>
						<InputText
							cls="max-w-50 s"
							bind:value={stateResult.color}
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
						{@render use('시설 혼잡도', useChk(stateResult?.features?.ai))}
					{/if}

					{#if view === 'reg'}<Chk
							itemId="ai-recommend"
							txt="AI 추천"
							reverse="true"
							cls="min-w-32.5 min-h-9"
							bind:checked={stateResult.features!.ai}
						/>
					{/if}
					<ui-txt
						size="sm"
						txt="AI 기반으로 사용자 맞춤 시설을 추천하며, 카테고리별 추천 노출 여부를 설정할 수 있습니다"
					></ui-txt>
				</li>
				<li class="flex items-center justify-between gap-2 p-3">
					{#if view === 'detail'}
						{@render use('구역 혼잡도', useChk(stateResult?.features?.zone), `${stateResult?.features?.zoneUse}${textNum1}`)}
					{/if}

					{#if view === 'reg'}
						<Chk
							itemId="zone-congestion"
							txt="구역 혼잡도"
							reverse="true"
							cls="min-w-32.5 min-h-9"
							bind:checked={stateResult.features!.zone}
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
							useChk(stateResult?.features?.facility),
							`${stateResult?.features?.facilityUse}${textNum1}`,
						)}
					{/if}

					{#if view === 'reg'}<Chk
							itemId="facility-congestion"
							txt="시설 혼잡도"
							reverse="true"
							cls="min-w-32.5 min-h-9"
							bind:checked={stateResult.features!.facility}
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
							useChk(stateResult?.information?.location),
							`${stateResult?.information?.locationUse}${textNum2}`,
						)}
					{/if}

					{#if view === 'reg'}<Chk
							itemId="location-based-content"
							txt="위치 기반 콘텐츠"
							reverse="true"
							cls="min-w-32.5 min-h-9"
							bind:checked={stateResult.information!.location}
						/>
					{/if}
					<ui-txt
						size="sm"
						txt="AI 기반으로 사용자 맞춤 시설을 추천하며, 카테고리별 추천 노출 여부를 설정할 수 있습니다"
					></ui-txt>
				</li>
				<li class="flex items-center justify-between gap-2 p-3">
					{#if view === 'detail'}
						{@render use('시설 주소 노출', useChk(stateResult?.information?.address))}
					{/if}

					{#if view === 'reg'}<Chk
							itemId="facility-address-exposure"
							txt="시설 주소 노출"
							reverse="true"
							cls="min-w-32.5 min-h-9"
							bind:checked={stateResult.information!.address}
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
								rdoList.find((item) => item.value === stateResult?.information?.sorting)?.txt || '',
							)}
						{/if}

						{#if view === 'reg'}
							<ui-txt size="sm" txt="시설 정렬 순서" cls="text-black min-w-25"></ui-txt>
							<InputGroup
								itemId="rdo-11"
								name="rdo"
								arr={rdoList}
								cls="inline-flex gap-3"
								bind:value={stateResult.information!.sorting}
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

			{#if view === 'reg'}
				<UiBtn
					variant="secondary"
					size="lg"
					txt="추가"
					cls="min-w-30"
					click={handleAddBtnLink}
					disabled={result?.btnLink?.length === 3}
				/>
			{/if}
		</div>

		{#if view === 'reg'}
			<DragDropProvider {onDragStart} {onDragOver} {onDragEnd}>
				<ul class="flex flex-col gap-3 px-4 pb-4">
					{#each result?.btnLink ?? [] as btn, index (btn.id)}
						<GroupDnd id={btn.id} {index} {btn} onRemove={handleRemoveBtnLink} {isDndDisabled} />
					{/each}
				</ul>
			</DragDropProvider>
		{/if}
	</li>
</ul>

<style>
	/* 내부 입력 필드 라운드 조절 */
	:global(.color) {
		width: 28px;
		height: 28px;
		border-radius: 2px !important;
	}
</style>
