<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let { language, name, address, period, closingDay, operatingHours, operationGuide, linkHomepage, linkMap, custom } = $state(data.item);

	let langChkElement = $state<HTMLElement | null>(null);
	let langTranslateElement = $state<HTMLElement | null>(null);
	let periodElement = $state<HTMLElement | null>(null);
	let closingElement = $state<HTMLElement | null>(null);
	let operatingHoursElement = $state<HTMLElement | null>(null);

	const checkValue = () => {
		// console.log(langChkElement?.lang);
		// console.log(langTranslateElement?.lang);
		console.log(operatingHoursElement?.result);

		operatingHoursElement.timeError = true;
		// console.log(periodElement?.result);
		// console.log(closingElement?.result);
	};
</script>

<div class="min-w-5xl flex max-w-[calc(100dvw-80px)] flex-col gap-3 p-5">
	<section class="static flex items-center justify-between">
		<ui-tit tit="$한국어 대상지명(최대 50자)$"></ui-tit>
		<div>
			<ui-btn variant="primary" size="lg" txt="저장" class="w-20" click={checkValue}></ui-btn>
		</div>
	</section>

	<section class="flex items-center">
		<ui-tit tit="섹션" class="px-4.5"></ui-tit>
	</section>

	<section class="shadow-1xs rounded-lg bg-white px-5 py-4">
		<header>
			<h4 class="tit lg px-4.5 sr-only">대상지 정보</h4>
		</header>

		<ul class="divide-y divide-slate-300">
			<li>
				<div class="grid max-w-375 grid-cols-[240px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="제공 언어" sub="사용자에게 제공할 언어를 선택해 주세요"></ui-tit>
					<lang-chk class="flex flex-wrap items-center gap-5" view="reg" lang={language} bind:this={langChkElement}></lang-chk>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-4">
					<ui-tit
						tit="대상지명"
						tip="15자 이내 권장"
						tooltip="언어에 따라 표현 길이가 달라질 수 <br />있으므로 번역 내용을 확인해주세요. (최대 50자)"
					></ui-tit>
					<lang-translate class="flex-1" view="reg" lang={name} bind:this={langTranslateElement}></lang-translate>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="위치"></ui-tit>

					<div class="flex flex-wrap items-center gap-5">
						<ui-txt size="sm" txt="지도의 중심 좌표를 선택해 주세요"></ui-txt>
						<ui-btn variant="ghost" size="md" txt="지도에서 선택하기" class="min-w-30"></ui-btn>
						<ui-txt size="sm" txt={address} cls="text-black"></ui-txt>
					</div>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="운영 기간"></ui-tit>
					<operating-period result={period} bind:this={periodElement}></operating-period>
				</div>
				<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="정기 휴무"></ui-tit>
					<closing-day view="reg" result={closingDay} bind:this={closingElement}></closing-day>
				</div>
			</li>
			<li>
				<div class="z-2 relative grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="운영 시간"></ui-tit>
					<operating-hours view="reg" rest="off" result={operatingHours} bind:this={operatingHoursElement}></operating-hours>
				</div>
			</li>
			<!--<li>
				<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-4">
					<ui-tit
						tit="운영 안내"
						req
						tip="30자 이내 권장"
						tooltip="언어에 따라 표현 길이가 달라질 수 <br />있으므로 번역 내용을 확인해주세요. (최대 60자)"
					></ui-tit>
					<lang-translate data-max-length="50" class="flex-1" lang={operationGuide}></lang-translate>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[200px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="홈페이지 링크"></ui-tit>
					<ui-btn
						tag="a"
						variant="underline"
						size="md"
						cls="underline-offset-1 gap-4"
						icon-name="link"
						icon-pos="lt"
						icon-cls="size-3 stroke-black flex"
						txt={linkHomepage}
						link={linkHomepage}
					></ui-btn>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[200px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="사용자 지도 링크"></ui-tit>
					<ui-btn
						tag="a"
						variant="underline"
						size="md"
						cls="underline-offset-1 gap-4"
						icon-name="link"
						icon-pos="lt"
						icon-cls="size-3 stroke-black flex"
						txt={linkMap}
						link={linkMap}
					></ui-btn>
				</div>
			</li> -->
		</ul>
	</section>

	<section class="shadow-1xs rounded-lg bg-white p-5">
		<ui-tit tag="h2" size="lg" tit="커스텀 항목"></ui-tit>

		<group-custom view="reg" result={custom}></group-custom>
	</section>
</div>
