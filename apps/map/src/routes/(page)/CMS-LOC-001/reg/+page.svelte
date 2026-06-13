<script>
	const myTabs = ['1. 대상지 정보', '2. 커스텀 항목'];

	$effect(() => {
		const langChk = document.querySelector('lang-chk');
		const d = document.querySelector('input-operating-hours');

		if (langChk) {
			// @ts-ignore
			langChk.lang = {
				zh: true,
				ja: true,
				th: true,
				vi: true,
			};

			console.log(d.result);
		}
	});
</script>

<div class="flex max-w-[calc(100dvw-80px)] min-w-5xl flex-col gap-3 p-5">
	<section class="static flex items-center justify-between">
		<ui-tit tit="$한국어 대상지명(최대 50자)$"></ui-tit>
		<div>
			<ui-btn
				variant="primary"
				size="lg"
				txt="저장"
				class="w-20"
				click={() => {
					console.log(document.querySelector('input-operating-hours').result);
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

	<section class="shadow-1xs rounded-lg bg-white px-5 py-4">
		<header>
			<h4 class="tit lg sr-only px-4.5">대상지 정보</h4>
		</header>

		<ul>
			<li class="grid grid-cols-[240px_1fr] gap-5 px-5 py-4">
				<ui-tit tit="제공 언어" sub="사용자에게 제공할 언어를 선택해 주세요"></ui-tit>
				<lang-chk class="flex flex-wrap items-center justify-end gap-5"></lang-chk>
				<!-- 나노스토어로 언어값 체크 연동 중 -->
			</li>
			<li class="grid grid-cols-[100px_1fr] gap-5 px-5 py-4">
				<ui-tit tit="대상지명" sub="15자 이내 권장"></ui-tit>
				<lang-translate class="flex-1"></lang-translate>
				<!-- 나노스토어로 언어값 체크 연동 중 -->
			</li>
			<li class="grid grid-cols-[100px_1fr] gap-5 px-5 py-4">
				<ui-tit tit="위치"></ui-tit>
				<div class="flex flex-wrap items-center gap-5">
					<ui-txt size="sm" txt="지도의 중심 좌표를 선택해 주세요"></ui-txt>
					<ui-btn variant="ghost" size="md" txt="지도에서 선택하기" class="min-w-30"></ui-btn>
					<ui-txt size="sm" txt="서울특별시 용산구 이태원로 29 (한강로1가)" cls="text-black"></ui-txt>
				</div>
			</li>
			<li class="grid grid-cols-[100px_1fr] gap-5 px-5 py-4">
				<ui-tit tit="운영 기간"></ui-tit>

				<input-operating-period item-id="input-1" selected="always" day="2026.06.02(화)~2026.06.02(화)"></input-operating-period>
			</li>
			<li class="grid grid-cols-[100px_1fr] gap-5 px-5 py-4">
				<ui-tit tit="정기 휴무"></ui-tit>

				<input-closing-day item-id="input-2" selected="none" week="" all-week="" day="" date=""></input-closing-day>
			</li>
			<li class="grid grid-cols-[100px_1fr] gap-5 px-5 py-4">
				<ui-tit tit="운영 시간"></ui-tit>

				<input-operating-hours item-id="input-2" selected="always"></input-operating-hours>
			</li>
			<li class="grid grid-cols-[100px_1fr] gap-5 px-5 py-4">
				<ui-tit tit="운영 안내" sub="30자 이내 권장"></ui-tit>
				<lang-translate class="flex-1"></lang-translate>
				<!-- 나노스토어로 언어값 체크 연동 중 -->
			</li>
			<li class="grid grid-cols-[240px_1fr] gap-5 px-5 py-4">
				<ui-tit tit="홈페이지 링크" sub="사용자에게 제공할 링크를 작성해 주세요"></ui-tit>
				<input-text class="flex-1" placeholder="https://(또는 http://)를 포함하여 URL를 입력해주세요"></input-text>
			</li>
			<li class="grid grid-cols-[240px_1fr] gap-5 px-5 py-4">
				<ui-tit tit="사용자 지도 링크" sub="30자 이내 권장"></ui-tit>
				<input-text class="flex-1" placeholder="https://(또는 http://)를 포함하여 URL를 입력해주세요"></input-text>
			</li>
		</ul>
	</section>
</div>
