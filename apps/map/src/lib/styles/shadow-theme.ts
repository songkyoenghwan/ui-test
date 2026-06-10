import resetStyleText from '$lib/styles/ui-reset.css?inline';

let sharedSheet: CSSStyleSheet | null = null;

export function applyGlobalReset(shadowRoot: ShadowRoot) {
	if (!sharedSheet) {
		sharedSheet = new CSSStyleSheet();
		sharedSheet.replaceSync(resetStyleText);
	}
	shadowRoot.adoptedStyleSheets = [sharedSheet];
}
