<script>
	import { langStore, toggleLang, resetLangs } from '$lib/stores/langStore';
	const myTabs = ['1. 대상지 정보', '2. 커스텀 항목'];
	const rdoList = [
		{
			id: '1',
			txt: '1. 대상지 정보',
			value: 'y',
		},
		{
			id: '2',
			txt: '2. 대상지 정보',
			value: 'n',
		},
	];

	$effect(() => {
		const langChk = document.querySelector('lang-chk');

		if (langChk instanceof HTMLElement) {
			langChk.zh = false;
			langChk.ja = true;
			langChk.th = false;
			langChk.vi = true;
		}
	});
</script>

<div class="flex max-w-[calc(100dvw-80px)] min-w-5xl flex-col gap-3 p-5">
	<section class="static flex items-center justify-between">
		<ui-tit tit="$한국어 대상지명(최대 50자)$"></ui-tit>
		<div>
			<ui-btn variant="primary" size="lg" txt="저장" class="w-20"></ui-btn>
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
				<lang-auto class="flex-1"></lang-auto>
				<!-- 나노스토어로 언어값 체크 연동 중 -->
			</li>
			<li class="grid grid-cols-[100px_1fr] gap-5 px-5 py-4">
				<ui-tit tit="위치"></ui-tit>
				<div class="txt md gap-5">
					<p>지도의 중심 좌표를 선택해 주세요</p>
					<ui-btn variant="ghost" size="md" txt="지도에서 선택하기" class="min-w-30"></ui-btn>
					<p class="text-black">34.9732111, 127.7343111</p>
				</div>
			</li>
		</ul>
	</section>
</div>
