

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(page)/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.jCjUVXnE.js","_app/immutable/chunks/BI13FDpI.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BB3JeiZr.js"];
export const stylesheets = [];
export const fonts = [];
