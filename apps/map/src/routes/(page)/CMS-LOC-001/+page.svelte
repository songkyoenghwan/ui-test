<script lang="ts">
</script>

<div class="flex max-w-[calc(100dvw-80px)] min-w-5xl flex-col gap-3 p-5">
	<section class="shadow-1 space-y-2 rounded-lg bg-white p-5">
		<div class="flex flex-wrap items-center justify-between gap-2">
			<div class="flex flex-wrap items-center gap-2">
				<h3>검색 조건</h3>
				<button type="button" class="button icon" aria-label="refresh">
					<span class="sr-only">refresh</span>
					<icon-list data-name="roate-left" class="icon size-4 stroke-slate-500"></icon-list>
				</button>
			</div>
			<div>
				<button type="button" class="button primary px-4" aria-label="refresh">
					<icon-list data-name="arrow-up" class="icon size-4 stroke-white"></icon-list>
					<span>대상지 추가</span>
				</button>
			</div>
		</div>

		<div class="flex flex-wrap items-center justify-between gap-2">
			<ul class="inline-flex gap-1 text-sm">
				<li class="bg-primary flex min-h-10 items-center gap-4 rounded-sm px-3 py-1 text-white">
					<p>전체</p>
					<p>NN개</p>
				</li>
				<li class="flex min-h-10 items-center gap-4 rounded-sm border border-slate-300 px-3 py-1 text-white">
					<p class="text-slate-800">운영 중</p>
					<p class="text-slate-300">NN개</p>
				</li>
				<li class="flex min-h-10 items-center gap-4 rounded-sm border border-slate-300 px-3 py-1 text-white">
					<p class="text-slate-800">운영 종료</p>
					<p class="text-slate-300">NN개</p>
				</li>
			</ul>
			<div>
				<div class="input-search group/input-search">
					<input type="text" name="" id="" class="input-text peer" placeholder="대상지명 검색" />
					<button type="button" class="button icon" data-btn="input-del">
						<span class="sr-only">del</span>
						<icon-list data-name="input-del" class="icon size-4 stroke-slate-400"></icon-list>
					</button>
				</div>
			</div>
		</div>
	</section>

	<section class="shadow-1 space-y-2 rounded-lg bg-white p-5">
		<div class="inline-flex items-center gap-2">
			<select name="" id="" class="select min-w-35">
				<option value="">10개씩 보기</option>
			</select>
			<select name="" id="" class="select">
				<option value="">최신순</option>
				<option value="">가나다순</option>
			</select>
		</div>

		<div role="table" aria-label="운영 현황 테이블" class="table-grid *:grid-cols-30">
			<ul>
				<li>NO.</li>
				<li class="col-span-4 text-left">대상지명</li>
				<li class="col-span-4 text-left">사용 언어</li>
				<li class="col-span-2 text-left">운영상태</li>
				<li class="col-span-3 text-left">운영기간</li>
				<li class="col-span-3 text-left">운영시간</li>
				<li class="col-span-2">AI 추천</li>
				<li class="col-span-2">시설 혼잡도</li>
				<li class="col-span-2">구역 혼잡도</li>
				<li class="col-span-2">위치기반 콘텐츠</li>
				<li class="col-span-2">사용자 지도</li>
				<li class="col-span-3 text-left">수정일시</li>
			</ul>
			<ul>
				<li>99</li>
				<li class="col-span-4 text-left">여주오곡나루축제</li>
				<li class="col-span-4 text-left">KO, EN, ZH, JA, TH, VI</li>
				<li class="col-span-2 text-left">운영 전</li>
				<li class="col-span-3 text-left">25.04.01(수) ~ 25.04.01(수)</li>
				<li class="col-span-3 text-left">09:00 ~ 22:00</li>
				<li class="col-span-2">사용</li>
				<li class="col-span-2">사용</li>
				<li class="col-span-2">사용</li>
				<li class="col-span-2">사용</li>
				<li class="col-span-2">이동</li>
				<li class="col-span-3 text-left">25.04.01(수) HH:MM</li>
			</ul>
		</div>

		<div></div>
	</section>
</div>
