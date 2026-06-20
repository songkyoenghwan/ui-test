import { b as attr, i as ensure_array_like, n as attr_style, s as stringify, x as escape_html } from "../../../../chunks/server.js";
import "../../../../chunks/navigation.js";
//#region src/routes/(page)/CMS-LOC-001/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		$$renderer.push(`<div class="flex max-w-[calc(100dvw-80px)] min-w-5xl flex-col gap-3 p-5"><section class="shadow-1 space-y-2 rounded-lg bg-white p-5"><div class="flex flex-wrap items-center justify-between gap-2"><div class="flex flex-wrap items-center gap-2"><h3>검색 조건</h3> <button type="button" class="button icon" aria-label="refresh"><span class="sr-only">refresh</span> <icon-list data-name="rotate-left" class="icon size-4 stroke-slate-500"></icon-list></button></div> <div><button type="button" class="button primary l px-4" aria-label="refresh"><icon-list data-name="arrow-up" class="icon size-3 stroke-white"></icon-list> <span>대상지 추가</span></button></div></div> <div class="flex flex-wrap items-center justify-between gap-2"><div class="inline-flex items-center gap-2"><select name="" id="" class="select min-w-62.5">`);
		$$renderer.option({ value: "전체" }, ($$renderer) => {
			$$renderer.push(`전체 (n개)`);
		});
		$$renderer.option({ value: "운영 중" }, ($$renderer) => {
			$$renderer.push(`운영 중 (n개)`);
		});
		$$renderer.option({ value: "운영 전" }, ($$renderer) => {
			$$renderer.push(`운영 전 (n개)`);
		});
		$$renderer.option({ value: "운영 종료" }, ($$renderer) => {
			$$renderer.push(`운영 종료 (n개)`);
		});
		$$renderer.push(`</select></div> <div><div class="input-search group/input-search"><input type="text" name="" id="" class="input-text peer" placeholder="대상지명 검색"/> <button type="button" class="button icon" data-btn="input-del"><span class="sr-only">del</span> <icon-list data-name="input-del" class="icon size-4 stroke-slate-400"></icon-list></button></div></div></div></section> <section class="shadow-1 space-y-4 rounded-lg bg-white p-5"><div class="inline-flex items-center gap-2"><select name="" id="" class="select min-w-50">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`10개씩 보기`);
		});
		$$renderer.push(`</select> <select name="" id="" class="select min-w-35">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`최신순`);
		});
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`가나다순`);
		});
		$$renderer.push(`</select></div> <div role="table" aria-label="운영 현황 테이블" class="table-wrap"><table><colgroup><col style="width: 100px;"/><col style="width: *"/><col style="width: 180px;"/><col style="width: 120px;"/><col style="width: 120px;"/><col style="width: 120px;"/><col style="width: 100px;"/><col style="width: 100px;"/><col style="width: 100px;"/><col style="width: 100px;"/><col style="width: 100px;"/><col style="width: 120px;"/></colgroup><thead><tr><th scope="row">NO.</th><th scope="row" class="col-span-4 text-left">대상지명</th><th scope="row" class="col-span-4 text-left">사용 언어</th><th scope="row" class="col-span-2 text-left">운영상태</th><th scope="row" class="col-span-3 text-left">운영기간</th><th scope="row" class="col-span-3 text-left">운영시간</th><th scope="row" class="col-span-2">AI 추천</th><th scope="row" class="col-span-2">시설 <br/> 혼잡도</th><th scope="row" class="col-span-2">구역 <br/> 혼잡도</th><th scope="row" class="col-span-2">위치기반 <br/> 콘텐츠</th><th scope="row" class="col-span-2">사용자 <br/> 지도</th><th scope="row" class="col-span-3 text-left">수정일시</th></tr></thead><tbody><!--[-->`);
		const each_array = ensure_array_like(data.list);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<tr><td>99</td><td><a${attr("href", `/CMS-LOC-001/detail/${item.id}`)} class="flex items-center gap-2 text-left"><p${attr_style(`background-color: ${stringify(item?.custom?.color || "transparent")};`)} class="size-4 rounded-xs"></p> ${escape_html(item?.name?.ko?.value)}</a></td><td><div class="text-left"><p>${escape_html(Object.keys(item.language).filter((key) => item.language[key]).join(", "))}</p></div></td><td><div class="text-left"><p>${escape_html(item.status)}</p></div></td><td><div class="text-left whitespace-pre-line"><p>${escape_html(item.period)}</p></div></td><td><div class="text-left"><p>${escape_html(item.hours)}</p></div></td><td>${escape_html(item?.custom?.aiRecommended ? "사용" : "미사용")}</td><td>${escape_html(item?.custom?.facilityCongestion ? "사용" : "미사용")}</td><td>${escape_html(item?.custom?.zoneCongestion ? "사용" : "미사용")}</td><td>${escape_html(item?.custom?.locationBasedContent ? "사용" : "미사용")}</td><td><a${attr("href", item.linkMap)} class="underline underline-offset-1" target="_blank" rel="noopener noreferrer"><span>🔗 이동</span></a></td><td class="col-span-3 text-left">${escape_html(item.editTime)}</td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></section> <section class="inline-flex items-center justify-center gap-3"><button type="button" class="button text" aria-label="이전"><icon-list data-name="arrow-left" class="icon size-4 stroke-black"></icon-list> <span>이전</span></button> <div class="inline-flex items-center justify-center gap-1.5"><strong class="button primary h-7 min-w-7" aria-label="1 page"><span class="text-white">1</span></strong> <button type="button" class="button text h-7 min-w-7" aria-label="2 page"><span class="text-slate-500">2</span></button> <button type="button" class="button text h-7 min-w-7" aria-label="2 page"><span class="text-slate-500">2</span></button> <button type="button" class="button text h-7 min-w-7" aria-label="2 page"><span class="text-slate-500">2</span></button> <button type="button" class="button text h-7 min-w-7" aria-label="2 page"><span class="text-slate-500">2</span></button> <button type="button" class="button text h-7 min-w-7" aria-label="2 page"><span class="text-slate-500">2</span></button> <button type="button" class="button text h-7 min-w-7" aria-label="2 page"><span class="text-slate-500">2</span></button> <button type="button" class="button text h-7 min-w-7" aria-label="2 page"><span class="text-slate-500">2</span></button> <button type="button" class="button text h-7 min-w-7" aria-label="2 page"><span class="text-slate-500">2</span></button> <strong class="button text h-7 min-w-7" aria-label="2 page"><span class="text-slate-500">...</span></strong> <button type="button" class="button text h-7 min-w-7" aria-label="2 page"><span class="text-slate-500">999</span></button></div> <button type="button" class="button text" aria-label="다음"><span>다음</span> <icon-list data-name="arrow-left" class="icon size-4 rotate-180 stroke-black"></icon-list></button></section></div>`);
	});
}
//#endregion
export { _page as default };
