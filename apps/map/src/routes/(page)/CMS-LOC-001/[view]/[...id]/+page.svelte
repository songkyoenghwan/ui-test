<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	// 2. 변수 선언들
	const myTabs = ['1. 대상지 정보', '2. 커스텀 항목'];

	let { data }: PageProps = $props();

	let elms = $state({
		col1: null as HTMLElement | null,
		col2: null as HTMLElement | null,
		col3: null as HTMLElement | null,
		col4: null as HTMLElement | null,
		col5: null as HTMLElement | null,
		col6: null as HTMLElement | null,
		col7: null as HTMLElement | null,
		col8: null as HTMLElement | null,
		col9: null as HTMLElement | null,
		col10: null as HTMLElement | null,
		col11: null as HTMLElement | null,
	});
</script>

<div class="grid w-full min-w-5xl">
	<section class=" sticky top-0 z-5 w-full space-y-2 bg-slate-50 p-5 transition-all">
		<div class="flex items-center justify-between">
			{#if data.view === 'reg'}
				<ui-tit tag="h2" size="lg" tit="대상지 등록"></ui-tit>
			{:else if data.view === 'edit'}
				<ui-tit tag="h2" size="lg" tit="대상지 수정"></ui-tit>
			{:else if data.view === 'detail'}
				<ui-tit tag="h2" size="lg" tit={data?.item.name.ko.value}></ui-tit>
			{/if}

			<div class="itmes-center flex gap-3">
				{#if data.view === 'detail'}
					<ui-btn
						variant="ghost"
						size="lg"
						txt="목록"
						class="w-20"
						click={() => {
							goto(`/CMS-LOC-001/`);
						}}
					></ui-btn>
					<ui-btn variant="ghost" size="lg" txt="삭제" class="w-20"></ui-btn>
					<ui-btn
						variant="primary"
						size="lg"
						txt="수정"
						class="w-20"
						click={() => {
							goto(`/CMS-LOC-001/edit/${data.id}`);
						}}
					></ui-btn>
				{/if}

				{#if data.view === 'edit' || data.view === 'reg'}
					<ui-btn
						variant="primary"
						size="lg"
						txt="저장"
						class="w-20"
						click={() => {
							// console.log(elms.col5.result);
							// console.log(elms.col6.result);
							console.log(elms.col11.result);
						}}
					></ui-btn>
				{/if}
			</div>
		</div>

		<div class="flex items-center">
			<ui-tit tit="섹션" class="px-4.5"></ui-tit>

			<div class="itmes-center flex gap-3">
				<ui-btn
					tag="label"
					variant="segmented"
					size="lg"
					name="tab-section"
					arr={myTabs}
					scroll="tab-section"
					class="w-60 gap-3"
				></ui-btn>
			</div>
		</div>
	</section>

	<article class="px-5 pb-5">
		<section id="target-scroll-tab-section-0" class="shadow-1xs space-y-3 rounded-lg bg-white p-5">
			<ui-tit tag="h3" size="lg" tit="대상지 정보"></ui-tit>

			<ul class="divide-y divide-slate-300">
				<li>
					<div class="grid max-w-375 grid-cols-[240px_1fr] gap-5 px-4 py-5 has-[[view=detail]]:grid-cols-[122px_1fr]">
						{#if data.view === 'detail'}
							<ui-tit tit="제공 언어"></ui-tit>
						{:else}
							<ui-tit tit="제공 언어" sub="사용자에게 제공할 언어를 선택해 주세요"></ui-tit>
						{/if}
						<lang-chk view={data.view} bind:this={elms.col1} lang={data.item.language}></lang-chk>
					</div>
				</li>
				<li>
					<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5 has-[[view=detail]]:grid-cols-[122px_1fr]">
						{#if data.view === 'detail'}
							<ui-tit tit="다국어 대상지명"></ui-tit>
						{:else}
							<ui-tit
								tit="대상지명"
								tip="15자 이내 권장"
								tooltip="언어에 따라 표현 길이가 달라질 수 <br />있으므로 번역 내용을 확인해주세요. (최대 50자)"
							></ui-tit>
						{/if}
						<lang-translate
							class="flex-1"
							data-max-length="50"
							view={data.view}
							bind:this={elms.col2}
							lang={data.item.name}
						></lang-translate>
					</div>
				</li>
				<li>
					<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5 has-[[view=detail]]:grid-cols-[122px_1fr]">
						<ui-tit tit="위치" cls="h-full items-center"></ui-tit>
						<div class="flex flex-wrap items-center gap-5">
							<ui-txt size="sm" txt="지도의 중심 좌표를 선택해 주세요"></ui-txt>
							<ui-btn variant="ghost" size="md" txt="지도에서 선택하기" class="min-w-30"></ui-btn>
							<ui-txt size="sm" txt="서울특별시 용산구 이태원로 29 (한강로1가)" cls="text-black"></ui-txt>
						</div>
					</div>
				</li>
				<li>
					<div
						class="grid max-w-375 grid-cols-[100px_1fr_100px_1fr] gap-5 px-4 py-5 has-[[view=detail]]:grid-cols-[122px_1fr_122px_1fr]"
					>
						<ui-tit tit="운영 기간" cls="pt-1"></ui-tit>
						<operating-period view={data.view} bind:this={elms.col4} result={data.item.period}></operating-period>
						<ui-tit tit="정기 휴무" cls="pt-1"></ui-tit>
						<closing-day view={data.view} bind:this={elms.col5} result={data.item.closingDay}></closing-day>
					</div>
				</li>
				<li>
					<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5 has-[[view=detail]]:grid-cols-[122px_1fr]">
						<ui-tit tit="운영 시간"></ui-tit>
						<operating-hours
							rest="off"
							view={data.view}
							bind:this={elms.col6}
							result={data.item.operatingHours}
						></operating-hours>
					</div>
				</li>
				<li>
					<div class="grid max-w-375 grid-cols-[100px_1fr] gap-5 px-4 py-5 has-[[view=detail]]:grid-cols-[122px_1fr]">
						{#if data.view === 'detail'}
							<ui-tit tit="운영 안내"></ui-tit>
						{:else}
							<ui-tit
								tit="운영 안내"
								req
								tip="30자 이내 권장"
								tooltip="언어에 따라 표현 길이가 달라질 수 <br />있으므로 번역 내용을 확인해주세요. (최대 60자)"
							></ui-tit>
						{/if}
						<lang-translate
							data-max-length="50"
							view={data.view}
							bind:this={elms.col7}
							lang={data.item.operationGuide}
						></lang-translate>
					</div>
				</li>
				<li>
					<div class="grid max-w-375 grid-cols-[200px_1fr] gap-5 px-4 py-5 has-[[view=detail]]:grid-cols-[122px_1fr]">
						{#if data.view === 'detail'}
							<ui-tit tit="홈페이지 링크"></ui-tit>
						{:else}
							<ui-tit tit="홈페이지 링크" req sub="사용자에게 제공할 링크를 작성해 주세요"></ui-tit>
						{/if}
						{#if data.view === 'detail'}
							<ui-btn
								tag="a"
								variant="underline"
								size="md"
								cls="underline-offset-1 gap-4"
								icon-name="link"
								icon-pos="lt"
								icon-cls="size-3 stroke-black flex"
								view={data.view}
								bind:this={elms.col8}
								txt={data.item.linkHomepage}
								link={data.item.linkHomepage}
							></ui-btn>
						{:else}
							<input-text
								data-type="url"
								placeholder="https://(또는 http://)를 포함하여 URL를 입력해주세요"
								view={data.view}
								bind:this={elms.col9}
								value={data.item.linkHomepage}
							></input-text>
						{/if}
					</div>

					<div class="grid max-w-375 grid-cols-[200px_1fr] gap-5 px-4 py-5 has-[[view=detail]]:grid-cols-[122px_1fr]">
						{#if data.view === 'detail'}
							<ui-tit tit="사용자 지도 링크"></ui-tit>
						{:else}
							<ui-tit tit="사용자 지도 링크" req></ui-tit>
						{/if}
						{#if data.view === 'detail'}
							<ui-btn
								tag="a"
								variant="underline"
								size="md"
								cls="underline-offset-1 gap-4"
								icon-name="link"
								icon-pos="lt"
								icon-cls="size-3 stroke-black flex"
								view={data.view}
								txt={data.item.linkMap}
								link={data.item.linkMap}
							></ui-btn>
						{:else}
							<input-text
								data-type="url"
								placeholder="https://(또는 http://)를 포함하여 URL를 입력해주세요"
								view={data.view}
								bind:this={elms.col10}
								value={data.item.linkMap}
							></input-text>
						{/if}
					</div>
				</li>
			</ul>
		</section>

		<section id="target-scroll-tab-section-1" class="shadow-1xs rounded-lg bg-white p-5">
			<ui-tit tag="h2" size="lg" tit="커스텀 항목"></ui-tit>

			<group-custom view={data.view} bind:this={elms.col11} result={data.item.custom}></group-custom>
		</section>
	</article>
</div>
