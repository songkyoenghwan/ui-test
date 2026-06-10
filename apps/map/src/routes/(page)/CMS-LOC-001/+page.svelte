<script lang="ts">
</script>

<div class="flex max-w-[calc(100dvw-80px)] min-w-5xl flex-col gap-3 p-5">
	<section class="shadow-1 space-y-2 rounded-lg bg-white p-5">
		<div class="flex flex-wrap items-center justify-between gap-2">
			<div class="flex flex-wrap items-center gap-2">
				<h3>검색 조건</h3>
				<button type="button" class="button icon" aria-label="refresh">
					<span class="sr-only">refresh</span>
					<icon-list data-name="rotate-left" class="icon size-4 stroke-slate-500"></icon-list>
				</button>
			</div>
			<div>
				<button type="button" class="button primary l px-4" aria-label="refresh">
					<icon-list data-name="arrow-up" class="icon size-3 stroke-white"></icon-list>
					<span>대상지 추가</span>
				</button>
			</div>
		</div>

		<div class="flex flex-wrap items-center justify-between gap-2">
			<div class="inline-flex items-center gap-2">
				<select name="" id="" class="select min-w-35">
					<option value="">매칭 전 + 완료</option>
				</select>
			</div>
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

		<div role="table" aria-label="운영 현황 테이블" class="table-wrap">
			<table>
				<thead>
					<tr>
						<th scope="row">NO.</th>
						<th scope="row" class="col-span-4 text-left">대상지명</th>
						<th scope="row" class="col-span-4 text-left">사용 언어</th>
						<th scope="row" class="col-span-2 text-left">운영상태</th>
						<th scope="row" class="col-span-3 text-left">운영기간</th>
						<th scope="row" class="col-span-3 text-left">운영시간</th>
						<th scope="row" class="col-span-2">AI 추천</th>
						<th scope="row" class="col-span-2">
							시설 <br />
							혼잡도
						</th>
						<th scope="row" class="col-span-2">
							구역 <br />
							혼잡도
						</th>
						<th scope="row" class="col-span-2">
							위치기반 <br />
							콘텐츠
						</th>
						<th scope="row" class="col-span-2">
							사용자 <br />
							지도
						</th>
						<th scope="row" class="col-span-3 text-left">수정일시</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>99</td>
						<td class="col-span-4 text-left">여주오곡나루축제</td>
						<td class="col-span-4 text-left">KO, EN, ZH, JA, TH, VI</td>
						<td class="col-span-2 text-left">
							<span class="text-slate-400">운영 전</span>
						</td>
						<td class="col-span-3 text-left">
							25.04.01(수) <br />
							~ 25.04.01(수)
						</td>
						<td class="col-span-3 text-left">09:00 ~ 22:00</td>
						<td class="col-span-2">사용</td>
						<td class="col-span-2">사용</td>
						<td class="col-span-2">사용</td>
						<td class="col-span-2">사용</td>
						<td class="col-span-2">
							<a href="/" class="undertdne">
								<span>이동</span>
							</a>
						</td>
						<td class="col-span-3 text-left">25.04.01(수) HH:MM</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div></div>
	</section>
</div>
