import "../../chunks/dev.js";
//#region ../../node_modules/.bun/@sveltejs+kit@2.61.1+d5c48f3efaa00625/node_modules/@sveltejs/kit/src/runtime/components/svelte-5/layout.svelte
function Layout($$renderer, $$props) {
	let { children } = $$props;
	children($$renderer);
	$$renderer.push(`<!---->`);
}
//#endregion
export { Layout as default };
