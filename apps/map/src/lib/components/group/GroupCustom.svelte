<svelte:options
	customElement={{
		tag: 'group-custom',
		shadow: 'none',
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
	import { type LangAll } from '$lib/stores/langStore';
	import { v4 as uuidv4 } from 'uuid';

	interface RadioOption {
		id: string;
		txt: string;
		value: 'y' | 'n';
	}
	interface BtnLink {
		id: string;
		lang: LangAll;
		img: string;
	}
	interface Props {
		result?: {
			color?: string;
			aiRecommend?: boolean;
			zoneCongestion?: boolean;
			facilityCongestion?: boolean;
			locationBased?: boolean;
			facilityAddress?: boolean;
			facilitySorting?: string;
			btnLink?: BtnLink[];
		};
	}
	let {
		result = {
			color: '#08935a',
			aiRecommend: false,
			zoneCongestion: false,
			facilityCongestion: false,
			locationBased: false,
			facilityAddress: false,
			facilitySorting: 'y',
			btnLink: [],
		},
	}: Props = $props();

	const rdoList: RadioOption[] = [
		{
			id: uuidv4(),
			txt: '직접 지정',
			value: 'y',
		},
		{
			id: uuidv4(),
			txt: '운영 상태 순',
			value: 'n',
		},
	];

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
		const currentList = result.btnLink || [];
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
		if (result.btnLink) {
			result = {
				...result,
				btnLink: result.btnLink.filter((btn) => btn.id !== id),
			};
		}
	}

	let snapshot: BtnLink[] = $state([]);
	let isDndDisabled = $derived((result.btnLink?.length ?? 0) <= 1);
	function onDragStart() {
		snapshot = [...(result.btnLink || [])];
	}

	// oxlint-disable-next-line typescript/no-explicit-any
	function onDragOver(event: any) {
		if (result.btnLink) {
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
</script>

<ul class="divide-y divide-slate-300">
	<li>
		<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5">
			<ui-tit tit="색상 코드"></ui-tit>
			<div class="flex flex-col gap-5">
				<ui-txt size="sm" txt="지도 메인 색상 코드(HEX)를 입력해 주세요  *권장: 어두운 계열의 진한 색상"></ui-txt>
				<div class="flex items-center gap-2">
					<div class="relative flex size-7 items-center justify-center overflow-hidden rounded-sm">
						<input type="color" bind:value={result.color} aria-label="색상 코드" class="absolute -top-3 -left-3 size-14" />
					</div>
					<InputText cls="max-w-50 s" bind:value={result.color} />
				</div>
			</div>
		</div>
	</li>
	<li>
		<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5">
			<ui-tit tit="기능 커스텀"></ui-tit>
			<ul class="inline-grid divide-y divide-slate-200">
				<li class="flex items-center justify-between gap-2 px-3 pb-3">
					<Chk itemId="ai-recommend" txt="AI 추천" reverse="true" cls="min-w-32.5 min-h-9" bind:checked={result.aiRecommend} />
					<ui-txt
						size="sm"
						txt="AI 기반으로 사용자 맞춤 시설을 추천하며, 카테고리별 추천 노출 여부를 설정할 수 있습니다"
					></ui-txt>
				</li>
				<li class="flex items-center justify-between gap-2 p-3">
					<Chk
						itemId="zone-congestion"
						txt="구역 혼잡도"
						reverse="true"
						cls="min-w-32.5 min-h-9"
						bind:checked={result.zoneCongestion}
					/>
					<ui-txt
						size="sm"
						txt="구역에 대한 혼잡도 정보를 안내하며, 지도 관리 메뉴에서 구역을 설정 후 실제 혼잡도 데이터를 불러올 수 있습니다"
					></ui-txt>
				</li>
				<li class="flex items-center justify-between gap-2 p-3">
					<Chk
						itemId="facility-congestion"
						txt="시설 혼잡도"
						reverse="true"
						cls="min-w-32.5 min-h-9"
						bind:checked={result.facilityCongestion}
					/>
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
					<Chk
						itemId="location-based-content"
						txt="위치 기반 콘텐츠"
						reverse="true"
						cls="min-w-32.5 min-h-9"
						bind:checked={result.locationBased}
					/>
					<ui-txt
						size="sm"
						txt="AI 기반으로 사용자 맞춤 시설을 추천하며, 카테고리별 추천 노출 여부를 설정할 수 있습니다"
					></ui-txt>
				</li>
				<li class="flex items-center justify-between gap-2 p-3">
					<Chk
						itemId="facility-address-exposure"
						txt="시설 주소 노출"
						reverse="true"
						cls="min-w-32.5 min-h-9"
						bind:checked={result.facilityAddress}
					/>
					<ui-txt
						size="sm"
						txt="구역에 대한 혼잡도 정보를 안내하며, 지도 관리 메뉴에서 구역을 설정 후 실제 혼잡도 데이터를 불러올 수 있습니다"
					></ui-txt>
				</li>
				<li class="flex items-center justify-between gap-2 p-3">
					<div class="flex items-center gap-3">
						<ui-txt size="sm" txt="시설 정렬 순서" cls="text-black min-w-25"></ui-txt>
						<InputGroup itemId="rdo-11" name="rdo" arr={rdoList} cls="inline-flex gap-3" bind:value={result.facilitySorting} />
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
			<UiBtn
				variant="secondary"
				size="lg"
				txt="추가"
				cls="min-w-30"
				click={handleAddBtnLink}
				disabled={result.btnLink?.length === 3}
			/>
		</div>

		<DragDropProvider {onDragStart} {onDragOver} {onDragEnd}>
			<ul class="flex flex-col gap-3 px-4 pb-4">
				{#each result.btnLink ?? [] as btn, index (btn.id)}
					<GroupDnd id={btn.id} {index} {btn} onRemove={handleRemoveBtnLink} {isDndDisabled} />
				{/each}
			</ul>
		</DragDropProvider>
	</li>
</ul>
