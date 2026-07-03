<script>
	const myTabs = ['1. 대상지 정보', '2. 커스텀 항목'];

	const langChk = document.querySelector('lang-chk');
	const c1 = document.querySelectorAll('lang-translate')[0];
	const c2 = document.querySelector('input-operating-period');
	const c3 = document.querySelector('input-closing-day');
	const c4 = document.querySelector('input-operating-hours');
	const c5 = document.querySelectorAll('lang-translate')[1];

	$effect(() => {
		if (langChk) {
			// @ts-ignore
			langChk.lang = {
				zh: true,
				ja: true,
				th: true,
				vi: true,
			};
		}
	});
</script>

<div class="min-w-5xl flex max-w-[calc(100dvw-80px)] flex-col gap-3 p-5">
	<section class="static flex items-center justify-between">
		<ui-tit tit="$한국어 대상지명(최대 50자)$"></ui-tit>
		<div>
			<ui-btn
				variant="primary"
				size="lg"
				txt="저장"
				class="w-20"
				click={() => {
					console.log(document.querySelectorAll('lang-translate')[0]?.result);
					console.log(document?.querySelector('operating-period')?.result);
					console.log(document?.querySelector('closing-day')?.result);
					console.log(document?.querySelector('operating-hours')?.result);
					console.log(document?.querySelector('group-custom')?.result);
					// console.log(c4.result);
					// console.log(c5.result);
					// console.log(c6.result);
				}}
			></ui-btn>
		</div>
	</section>

	<section class="flex items-center">
		<ui-tit tit="섹션" class="px-4.5"></ui-tit>

		<div class="itmes-center flex gap-3">
			<ui-btn tag="label" variant="segmented" size="lg" name="tab-section" arr={myTabs} class="w-60 gap-3"></ui-btn>
		</div>
	</section>

	<section class="shadow-1xs rounded-lg bg-white p-5">
		<ui-tit tag="h2" size="lg" tit="대상지 정보"></ui-tit>

		<ul class="divide-y divide-slate-300">
			<li>
				<div class="grid max-w-375 grid-cols-[240px_1fr] gap-5 px-4 py-5">
					<ui-tit tit="제공 언어" sub="사용자에게 제공할 언어를 선택해 주세요"></ui-tit>
					<lang-chk view="reg" class="flex flex-wrap items-center justify-end gap-5"></lang-chk>
					<!-- 나노스토어로 언어값 체크 연동 중 -->
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5">
					<ui-tit
						tit="대상지명"
						tip="15자 이내 권장"
						tooltip="언어에 따라 표현 길이가 달라질 수 <br />있으므로 번역 내용을 확인해주세요. (최대 50자)"
					></ui-tit>
					<lang-translate data-max-length="50" class="flex-1"></lang-translate>
					<!-- 나노스토어로 언어값 체크 연동 중 -->
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5">
					<ui-tit tit="위치"></ui-tit>
					<div class="flex flex-wrap items-center gap-5">
						<ui-txt size="sm" txt="지도의 중심 좌표를 선택해 주세요"></ui-txt>
						<ui-btn variant="ghost" size="md" txt="지도에서 선택하기" class="min-w-30"></ui-btn>
						<ui-txt size="sm" txt="서울특별시 용산구 이태원로 29 (한강로1가)" cls="text-black"></ui-txt>
					</div>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5">
					<ui-tit tit="운영 기간"></ui-tit>
					<operating-period></operating-period>
					<!--  result="" -->
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5">
					<ui-tit tit="정기 휴무"></ui-tit>
					<closing-day></closing-day>
				</div>
			</li>
			<li>
				<div class="z-2 relative grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5">
					<ui-tit tit="운영 시간"></ui-tit>
					<operating-hours item-id="input-2" selected="always" rest="off"></operating-hours>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5">
					<ui-tit
						tit="운영 안내"
						req
						tip="30자 이내 권장"
						tooltip="언어에 따라 표현 길이가 달라질 수 <br />있으므로 번역 내용을 확인해주세요. (최대 60자)"
					></ui-tit>
					<lang-translate data-max-length="50" class="flex-1"></lang-translate>
					<!-- 나노스토어로 언어값 체크 연동 중 -->
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[200px_1fr] gap-5 px-4 py-5">
					<ui-tit tit="홈페이지 링크" req sub="사용자에게 제공할 링크를 작성해 주세요"></ui-tit>
					<input-text
						data-type="url"
						class="flex-1"
						placeholder="https://(또는 http://)를 포함하여 URL를 입력해주세요"
					></input-text>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[200px_1fr] gap-5 px-4 py-5">
					<ui-tit tit="사용자 지도 링크" req></ui-tit>
					<input-text
						data-type="url"
						class="flex-1"
						placeholder="https://(또는 http://)를 포함하여 URL를 입력해주세요"
					></input-text>
				</div>
			</li>
		</ul>
	</section>

	<section class="shadow-1xs rounded-lg bg-white p-5">
		<ui-tit tag="h2" size="lg" tit="커스텀 항목"></ui-tit>

		<group-custom></group-custom>
	</section>
</div>
