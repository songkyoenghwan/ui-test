import "../../../../chunks/index-server.js";
import "../../../../chunks/dev.js";
//#region src/routes/(page)/CMS-MAP-001/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<top-tooltip tit="지도를 우클릭하여 위치 변경" class="absolute top-5 left-5 z-5"></top-tooltip> <section id="map_div" class="grid size-full"></section> <section class="map-list"><header class="map-list__header"><div class="flex items-end justify-between gap-1"><h3 class="font-bold">위치 목록</h3> <div class="flex-none"><p class="flex-1 text-slate-500"><strong class="font-bold">302</strong> <span>개</span></p></div></div> <div class="grid grid-cols-9 gap-2"><select name="" id="" class="select col-span-5" title="content:">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`전체 카테고리`);
		});
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`옵션`);
		});
		$$renderer.push(`</select> <select name="" id="" class="select col-span-4">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`노출 + 비노출`);
		});
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`옵션`);
		});
		$$renderer.push(`</select></div> <div class="input-search group/input-search"><input type="text" name="" id="" class="input-text peer" placeholder="위치 검색"/> <button type="button" class="button icon" data-btn="input-del"><span class="sr-only">del</span> <icon-list data-name="input-del" class="icon size-4 stroke-slate-400"></icon-list></button></div></header> <div class="map-list-body"><div class="flex items-end justify-between gap-1 px-5"><select name="" id="" class="select w-30">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`최신순`);
		});
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`가나다순`);
		});
		$$renderer.push(`</select> <div class="flex-none"><p class="flex-1 text-slate-500"><span>검색결과</span> <strong class="text-primary font-bold">300</strong></p></div></div> <map-list class="flex min-h-0 flex-1 flex-col"></map-list></div></section> <map-reg class="map-reg" open="close" id="" poi="" ko="" en="" zh="" ja="" th="" vi="" lat="" lon="" addr=""></map-reg>`);
	});
}
//#endregion
export { _page as default };
