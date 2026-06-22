<script lang="ts">
	import { goto } from '$app/navigation';
	import { v4 as uuidv4 } from 'uuid';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let inputDel = $state(false);
</script>

<div class="flex max-w-[calc(100dvw-80px)] min-w-5xl flex-col gap-3 p-5">
	<section class="shadow-1 space-y-2 rounded-lg bg-white p-5">
		<div class="flex flex-wrap items-center justify-between gap-2">
			<div class="flex flex-wrap items-center gap-2">
				<h3>검색 조건</h3>
				<ui-btn variant="icon" icon-name="rotate-left" icon-cls="size-4 stroke-slate-500"></ui-btn>
			</div>
			<div>
				<ui-btn
					variant="primary"
					size="lg"
					cls="min-w-30"
					icon-name="arrow-up"
					icon-pos="lt"
					icon-cls="size-3 stroke-white"
					txt="대상지 추가"
					click={() => {
						goto(`/CMS-LOC-001/reg/${uuidv4()}`);
					}}
				></ui-btn>
			</div>
		</div>

		<div class="flex flex-wrap items-center justify-between gap-2">
			<div class="inline-flex items-center gap-2">
				<select name="" id="" class="select min-w-62.5">
					<option value="전체">전체 (n개)</option>
					<option value="운영 중">운영 중 (n개)</option>
					<option value="운영 전">운영 전 (n개)</option>
					<option value="운영 종료">운영 종료 (n개)</option>
				</select>
			</div>
			<div>
				<div class="input-search group/input-search relative">
					<input
						class="input-text peer pr-15!"
						type="text"
						placeholder="대상지명 검색"
						onfocus={() => {
							inputDel = true;
						}}
					/>

					<div class="absolute top-1.5 right-2 z-2 bg-white {inputDel ? '' : 'hidden'}">
						<ui-btn
							x-show="focused"
							x-cloak
							variant="icon"
							icon-name="input-del"
							icon-cls="size-4 stroke-slate-400"
							click={() => {
								inputDel = false;
							}}
						></ui-btn>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="shadow-1 space-y-4 rounded-lg bg-white p-5">
		<div class="inline-flex items-center gap-2">
			<select name="" id="" class="select min-w-50">
				<option value="">10개씩 보기</option>
			</select>
			<select name="" id="" class="select min-w-35">
				<option value="">최신순</option>
				<option value="">가나다순</option>
			</select>
		</div>

		<div role="table" aria-label="운영 현황 테이블" class="table-wrap">
			<table>
				<colgroup>
					<col style="width: 100px;" />
					<col style="width: *" />
					<col style="width: 180px;" />
					<col style="width: 120px;" />
					<col style="width: 120px;" />
					<col style="width: 120px;" />
					<col style="width: 100px;" />
					<col style="width: 100px;" />
					<col style="width: 100px;" />
					<col style="width: 100px;" />
					<col style="width: 100px;" />
					<col style="width: 120px;" />
				</colgroup>
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
					{#each data.list as item (item.id)}
						<tr>
							<td>99</td>
							<td>
								<a href={`/CMS-LOC-001/detail/${item.id}`} class="flex items-center gap-2 text-left">
									<p
										style="background-color: {item?.custom?.color || 'transparent'};"
										class="size-4 rounded-xs"
									></p>
									<p>{item?.name?.ko?.value}</p>
								</a>
							</td>
							<td>
								<div class="text-left">
									<p>
										{Object.keys(item.language)
											.filter((key) => item.language[key])
											.join(', ')}
									</p>
								</div>
							</td>
							<td>
								<div class="text-left">
									<p
										class={item.status.trim() === '운영중'
											? 'text-cms-3'
											: item.status.trim() === '운영종료'
												? 'text-error'
												: 'text-slate-400'}
									>
										{item.status}
									</p>
								</div>
							</td>
							<td>
								<div class="text-left whitespace-pre-line">
									<p>{item.period.status === 'always' ? '상시운영' : item.period.day}</p>
								</div>
							</td>
							<td>
								<div class="text-left">
									<p>
										{item.operatingHours.cols.length > 1
											? '요일별 상이'
											: `${item.operatingHours.cols[0].time.timeStart} ~ ${item.operatingHours.cols[0].time.timeEnd}`}
									</p>
								</div>
							</td>
							<td class={item.custom.features.ai ? 'text-cms-3' : ''}>
								{item.custom.features.ai ? '사용' : '미사용'}
							</td>
							<td class={item.custom.features.facility ? 'text-cms-3' : ''}>
								{item.custom.features.facility ? '사용' : '미사용'}
							</td>
							<td class={item.custom.features.zone ? 'text-cms-3' : ''}>
								{item.custom.features.zone ? '사용' : '미사용'}
							</td>
							<td class={item.custom.information.location ? 'text-cms-3' : ''}>
								{item.custom.information.location ? '사용' : '미사용'}
							</td>
							<td>
								<a
									href={item.linkMap}
									class="underline underline-offset-1"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span>🔗 이동</span>
								</a>
							</td>
							<td class="col-span-3 text-left">{item.editTime}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="inline-flex items-center justify-center gap-3">
		<ui-btn variant="text" icon-name="arrow-left" icon-pos="lt" icon-cls="size-4 stroke-black" txt="이전"></ui-btn>
		<div class="inline-flex items-center justify-center gap-1.5">
			<strong class="button primary h-7 min-w-7" aria-label="1 page">
				<span class="text-white">1</span>
			</strong>
			<button class="button text h-7 min-w-7" type="button" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button class="button text h-7 min-w-7" type="button" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button class="button text h-7 min-w-7" type="button" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button class="button text h-7 min-w-7" type="button" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button class="button text h-7 min-w-7" type="button" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button class="button text h-7 min-w-7" type="button" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button class="button text h-7 min-w-7" type="button" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button class="button text h-7 min-w-7" type="button" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<strong class="button text h-7 min-w-7" aria-label="2 page">
				<span class="text-slate-500">..</span>
			</strong>
			<button class="button text h-7 min-w-7" type="button" aria-label="2 page">
				<span class="text-slate-500">999</span>
			</button>
		</div>
		<ui-btn variant="text" icon-name="arrow-left" icon-pos="rt" icon-cls="size-4 rotate-180 stroke-black" txt="다음"></ui-btn>
	</section>
</div>
