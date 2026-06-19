<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
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
	</section>

	<section class="shadow-1xs rounded-lg bg-white px-5 py-4">
		<header>
			<h4 class="tit lg sr-only px-4.5">대상지 정보</h4>
		</header>

		<ul class="divide-y divide-slate-300">
			<li>
				<div class="grid max-w-375 grid-cols-[120px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="제공 언어"></ui-tit>
					<lang-chk class="flex flex-wrap items-center gap-5" view="detail" lang={data.item.language}></lang-chk>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[120px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="다국어 대상지명"></ui-tit>
					<lang-translate class="flex-1" view="detail" lang={data.item.name}></lang-translate>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[120px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="위치"></ui-tit>
					<ui-txt size="sm" cls="text-black" txt={data.item.address}></ui-txt>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[120px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="운영 기간"></ui-tit>
					<ui-txt size="sm" cls="text-black" txt={data.item.period}></ui-txt>
				</div>
				<div class="grid max-w-375 grid-cols-[120px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="정기 휴무"></ui-tit>
					<closing-day view="detail" result={data.item.closingDay}></closing-day>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[120px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="운영 시간"></ui-tit>
					<operating-hours view="detail" rest="off" result={data.item.operatingHours}></operating-hours>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[120px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="운영 안내"></ui-tit>
					<lang-translate class="flex-1" view="detail" lang={data.item.operationGuide}></lang-translate>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[120px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="홈페이지 링크"></ui-tit>
					<ui-btn
						tag="a"
						variant="underline"
						size="md"
						cls="underline-offset-1 gap-4"
						icon-name="link"
						icon-pos="lt"
						icon-cls="size-3 stroke-black flex"
						txt={data.item.linkHomepage}
						link={data.item.linkHomepage}
					></ui-btn>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[120px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="사용자 지도 링크"></ui-tit>
					<ui-btn
						tag="a"
						variant="underline"
						size="md"
						cls="underline-offset-1 gap-4"
						icon-name="link"
						icon-pos="lt"
						icon-cls="size-3 stroke-black flex"
						txt={data.item.linkMap}
						link={data.item.linkMap}
					></ui-btn>
				</div>
			</li>
		</ul>
	</section>

	<section class="shadow-1xs rounded-lg bg-white p-5">
		<ui-tit tag="h2" size="lg" tit="커스텀 항목"></ui-tit>

		<group-custom view="detail" result={data.item.custom}></group-custom>
	</section>
</div>
