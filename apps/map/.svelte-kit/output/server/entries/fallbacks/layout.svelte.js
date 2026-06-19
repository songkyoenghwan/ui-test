import "../../chunks/server.js";
//#region ../../node_modules/.bun/@sveltejs+kit@2.66.0+bd8971b7bb8ed6b2/node_modules/@sveltejs/kit/src/runtime/components/svelte-5/layout.svelte
function Layout($$renderer, $$props) {
	let { children } = $$props;
	children($$renderer);
	$$renderer.push(`<!---->`);
}
//#endregion
export { Layout as default };
