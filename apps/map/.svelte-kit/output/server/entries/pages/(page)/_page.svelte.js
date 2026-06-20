import { b as attr, i as ensure_array_like, t as attr_class, x as escape_html } from "../../../chunks/server.js";
//#region src/routes/(page)/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const getStatusClass = (check) => {
			switch (check) {
				case "완료": return "text-[--222]";
				case "수정": return "text-red-600";
				case "삭제": return "text-gray-300 line-through";
				case "신규": return "text-2070fb";
				case "확인 필요": return "text-green-600";
				default: return "text-gray-600";
			}
		};
		$$renderer.push(`<section><!--[-->`);
		const each_array = ensure_array_like(data.list);
		for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
			let item = each_array[$$index_1];
			$$renderer.push(`<div class="p-2">`);
			if (item.page) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<h1 class="text-2070fb m-2 pb-2 text-2xl font-bold">${escape_html(item.page)}</h1>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (item.title) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<h2 class="text-2d3648 m-2 text-xl font-bold">${escape_html(item.title)}</h2>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="grid gap-1 sm:grid-cols-1"><!--[-->`);
			const each_array_1 = ensure_array_like(item.subList);
			for (let subIndex = 0, $$length = each_array_1.length; subIndex < $$length; subIndex++) {
				let subItem = each_array_1[subIndex];
				$$renderer.push(`<div${attr_class("border-b border-gray-300 transition-shadow hover:shadow-md " + getStatusClass(subItem.check))}>`);
				if (subItem.subtitle) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<p class="py-2 text-blue-400">· ${escape_html(subItem.subtitle)}</p>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <a${attr("href", subItem.url)} target="_blank" rel="noopener noreferrer" class="group flex h-full flex-col gap-2 p-2 hover:bg-slate-50"><div class="flex items-start justify-between gap-2"><p class="space-x-1 font-medium">${escape_html(subIndex + 1)}. ${escape_html(subItem.text)} <span class="text-xs">${escape_html(subItem.url)}</span></p> `);
				if (subItem.etc) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="shrink-0 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 group-hover:bg-white">${escape_html(subItem.etc)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></a></div>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		}
		$$renderer.push(`<!--]--></section>`);
	});
}
//#endregion
export { _page as default };
