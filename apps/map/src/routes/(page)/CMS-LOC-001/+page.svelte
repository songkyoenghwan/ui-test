<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
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
				<button
					type="button"
					class="button primary l px-4"
					aria-label="refresh"
					onclick={() => {
						goto(`/CMS-LOC-001/reg`);
					}}
				>
					<icon-list data-name="arrow-up" class="icon size-3 stroke-white"></icon-list>
					<span>대상지 추가</span>
				</button>
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
								<a
									href="/"
									class="flex items-center gap-2 text-left"
									onclick={(e) => {
										e.preventDefault();
										goto(`/CMS-LOC-001/${item.id}`);
									}}
								>
									<p style="background-color: {item?.custom?.color || 'transparent'};" class="size-4 rounded-xs"></p>
									{item?.name?.ko?.value}
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
									<p>
										{item.status}
									</p>
								</div>
							</td>
							<td>
								<div class="text-left whitespace-pre-line">
									<p>{item.period}</p>
								</div>
							</td>
							<td>
								<div class="text-left">
									<p>{item.hours}</p>
								</div>
							</td>
							<td>{item?.custom?.aiRecommended ? '사용' : '미사용'}</td>
							<td>{item?.custom?.facilityCongestion ? '사용' : '미사용'}</td>
							<td>{item?.custom?.zoneCongestion ? '사용' : '미사용'}</td>
							<td>{item?.custom?.locationBasedContent ? '사용' : '미사용'}</td>
							<td>
								<a href={item.linkMap} class="underline underline-offset-1" target="_blank" rel="noopener noreferrer">
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
		<button type="button" class="button text" aria-label="이전">
			<icon-list data-name="arrow-left" class="icon size-4 stroke-black"></icon-list>
			<span>이전</span>
		</button>
		<div class="inline-flex items-center justify-center gap-1.5">
			<strong class="button primary h-7 min-w-7" aria-label="1 page">
				<span class="text-white">1</span>
			</strong>
			<button type="button" class="button text h-7 min-w-7" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button type="button" class="button text h-7 min-w-7" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button type="button" class="button text h-7 min-w-7" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button type="button" class="button text h-7 min-w-7" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button type="button" class="button text h-7 min-w-7" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button type="button" class="button text h-7 min-w-7" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button type="button" class="button text h-7 min-w-7" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<button type="button" class="button text h-7 min-w-7" aria-label="2 page">
				<span class="text-slate-500">2</span>
			</button>
			<strong class="button text h-7 min-w-7" aria-label="2 page">
				<span class="text-slate-500">...</span>
			</strong>
			<button type="button" class="button text h-7 min-w-7" aria-label="2 page">
				<span class="text-slate-500">999</span>
			</button>
		</div>
		<button type="button" class="button text" aria-label="다음">
			<span>다음</span>
			<icon-list data-name="arrow-left" class="icon size-4 rotate-180 stroke-black"></icon-list>
		</button>
	</section>
</div>
