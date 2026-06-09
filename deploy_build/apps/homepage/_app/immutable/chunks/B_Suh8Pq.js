var e = {},
	t = [`ko`, `en`],
	n = `PARAGLIDE_LOCALE`,
	r = 3456e4,
	i = `PARAGLIDE_LOCALE`,
	a = [`localStorage`, `cookie`, `preferredLanguage`, `baseLocale`],
	o = [],
	s,
	c;
function l(t) {
	if (o.length === 0) return;
	let n = typeof t == `string` ? t : t.href;
	if (s === n) return c;
	let r = new URL(n, `http://dummy.com`),
		i;
	for (let t of o)
		if (new e(t.match, r.href).exec(r.href)) {
			i = t;
			break;
		}
	return ((s = n), (c = i), i);
}
function u(e) {
	let t = l(e);
	return t && t.exclude !== !0 && Array.isArray(t.strategy) ? t.strategy : a;
}
var d = void 0;
((globalThis.__paraglide = globalThis.__paraglide ?? {}), (globalThis.__paraglide.ssr = globalThis.__paraglide.ssr ?? {}));
var f = !1,
	p = () => {
		if (d) {
			let e = d?.getStore()?.locale;
			if (e) return e;
		}
		let e = a;
		typeof window < `u` && window.location?.href && (e = u(window.location.href));
		let t = m(e, typeof window < `u` ? window.location?.href : void 0);
		if (t) return (f || ((f = !0), g(t, { reload: !1 })), t);
		throw Error(`No locale found. Read the docs https://inlang.com/m/gerre34r/library-inlang-paraglideJs/errors#no-locale-found`);
	};
function m(e, t) {
	let n;
	for (let t of e) {
		if (t === `cookie`) n = b();
		else if (t === `baseLocale`) n = `ko`;
		else if (t === `preferredLanguage`) n = x();
		else if (t === `localStorage`) n = localStorage.getItem(`PARAGLIDE_LOCALE`) ?? void 0;
		else if (T(t) && w.has(t)) {
			let e = w.get(t);
			if (e) {
				let t = e.getLocale();
				if (t instanceof Promise) continue;
				if (t !== void 0) return y(t);
			}
		}
		let e = v(n);
		if (e) return e;
	}
}
var h = (e) => {
		e ? (window.location.href = e) : window.location.reload();
	},
	g = (e, t) => {
		let o = { reload: !0, ...t },
			s;
		try {
			s = p();
		} catch {}
		let c = [],
			l = a;
		typeof window < `u` && window.location?.href && (l = u(window.location.href));
		for (let t of l)
			if (t === `cookie`) {
				if (typeof document > `u` || typeof window > `u`) continue;
				let t = `${n}=${e}; path=/; max-age=${r}`;
				document.cookie = t;
			} else if (t === `baseLocale`) continue;
			else if (t === `localStorage` && typeof window < `u`) localStorage.setItem(i, e);
			else if (T(t) && w.has(t)) {
				let n = w.get(t);
				if (n) {
					let r = n.setLocale(e);
					r instanceof Promise &&
						((r = r.catch((e) => {
							throw Error(`Custom strategy "${t}" setLocale failed.`, { cause: e });
						})),
						c.push(r));
				}
			}
		let d = () => {
			o.reload && window.location && e !== s && h(void 0);
		};
		if (c.length)
			return Promise.all(c).then(() => {
				d();
			});
		d();
	},
	_ = () => (d ? (d.getStore()?.origin ?? `http://fallback.com`) : typeof window < `u` ? window.location.origin : `http://fallback.com`);
function v(e) {
	if (typeof e != `string`) return;
	let n = e.toLowerCase();
	for (let e of t) if (e.toLowerCase() === n) return e;
}
function y(e) {
	let n = v(e);
	if (n) return n;
	throw Error(`Invalid locale: ${e}. Expected one of: ${t.join(`, `)}`);
}
function b() {
	if (typeof document > `u` || !document.cookie) return;
	let e = document.cookie.match(RegExp(`(^| )${n}=([^;]+)`))?.[2];
	return v(e);
}
function x() {
	if (!navigator?.languages?.length) return;
	let e = navigator.languages.map((e) => ({ fullTag: e, baseTag: e.split(`-`)[0] }));
	for (let t of e) {
		let e = v(t.fullTag);
		if (e) return e;
		let n = v(t.baseTag);
		if (n) return n;
	}
}
function S(e) {
	return C(e);
}
function C(e) {
	let t = typeof e == `string` ? new URL(e, _()) : new URL(e),
		n = t.pathname.split(`/`).filter(Boolean);
	return (n.length > 0 && v(n[0]) && (t.pathname = `/` + n.slice(1).join(`/`)), t);
}
var w = new Map();
function T(e) {
	return typeof e == `string` && /^custom-[A-Za-z0-9_-]+$/.test(e);
}
export { p as n, g as r, S as t };
