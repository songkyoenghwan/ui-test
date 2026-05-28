import "../../../chunks/dev.js";
//#region src/routes/(menulist)/+layout.svelte
function _layout($$renderer, $$props) {
	let { children, data } = $$props;
	$$renderer.push(`<div>`);
	children($$renderer);
	$$renderer.push(`<!----></div>`);
}
//#endregion
export { _layout as default };
