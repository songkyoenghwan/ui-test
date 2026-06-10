<script>
	const myTabs = ['1. 대상지 정보', '2. 커스텀 항목'];
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
			<li class="flex justify-between px-5 py-4">
				<p class="tit md">
					<strong>제공 언어</strong>
					<span class="txt sm">사용자에게 제공할 언어를 선택해 주세요</span>
				</p>

				<div class="txt md grid-cols-6 gap-5">
					<p>한국어(KO)</p>
					<p>영어(EN)</p>

					<label for=""></label>
				</div>
			</li>
		</ul>
	</section>
</div>
