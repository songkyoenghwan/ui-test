import "../../chunks/dev.js";
//#region ../../node_modules/.bun/@sveltejs+kit@2.64.0+2b2b8ed7db1c1ba6/node_modules/@sveltejs/kit/src/runtime/components/svelte-5/layout.svelte
function Layout($$renderer, $$props) {
	let { children } = $$props;
	children($$renderer);
	$$renderer.push(`<!---->`);
}
//#endregion
export { Layout as default };
