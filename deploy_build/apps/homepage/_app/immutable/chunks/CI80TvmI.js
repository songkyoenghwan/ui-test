import {
	So as _e,
	qi as _t,
	ja as $e,
	Da as A,
	Ba as ae,
	Za as Ae,
	ma as at,
	vo as At,
	Ja as B,
	Ua as be,
	da as Be,
	ro as bt,
	Na as ce,
	Vi as Ce,
	na as ct,
	so as Ct,
	Pa as de,
	Xi as De,
	oa as dt,
	ua as Dt,
	Xa as Ee,
	jo as et,
	to as Et,
	Ga as F,
	Pt as fe,
	ao as Fe,
	oo as ft,
	ya as Ft,
	Ma as G,
	Sa as ge,
	fo as Ge,
	qa as gt,
	Ka as H,
	Ra as he,
	ea as He,
	po as ht,
	Gi as I,
	Ao as ie,
	ba as Ie,
	lo as it,
	yo as It,
	Do as j,
	f as J,
	Zi as je,
	ha as Je,
	wa as jt,
	Co as k,
	Mo as K,
	Yi as ke,
	ga as Ke,
	va as kt,
	Ha as L,
	Oa as le,
	bo as Le,
	no as lt,
	za as Lt,
	Ea as M,
	Qi as me,
	_a as Me,
	pa as mt,
	wo as Mt,
	Eo as N,
	$i as ne,
	_o as Ne,
	ko as nt,
	xa as Nt,
	Bt as oe,
	Ya as Oe,
	mo as ot,
	uo as Ot,
	Fa as P,
	Qa as pe,
	aa as Pe,
	p as pt,
	xo as Pt,
	a as q,
	go as qe,
	io as Qe,
	Hi as R,
	Aa as re,
	ca as Re,
	la as rt,
	Ca as se,
	Va as Se,
	n as st,
	sa as St,
	$a as te,
	Wi as Te,
	ka as tt,
	ta as Tt,
	Ki as U,
	Oo as ue,
	eo as Ue,
	ns as ut,
	Ji as V,
	Ta as ve,
	do as Ve,
	r as vt,
	La as W,
	Wa as we,
	fa as We,
	t as wt,
	Ui as xe,
	i as Xe,
	s as xt,
	To as ye,
	ho as Ye,
	ra as yt,
	Ia as z,
	co as ze,
	ia as Ze,
} from './2o53KIMk.js';
import './xihTtKlq.js';
import {
	h as _,
	N as a,
	o as b,
	X as c,
	q as C,
	_ as d,
	st as D,
	E as e,
	s as E,
	ut as ee,
	_t as f,
	f as g,
	et as h,
	M as i,
	Y as l,
	dt as m,
	H as n,
	Q as o,
	tt as O,
	ct as p,
	K as r,
	S as s,
	pt as S,
	F as t,
	rt as T,
	Z as u,
	ht as v,
	r as w,
	ot as x,
	m as y,
} from './DWWkaRp_.js';

var Y = v((e, t) => {
		t.exports = function (e, t) {
			return ((t ||= [0, ``]), (e = String(e)), (t[0] = parseFloat(e, 10)), (t[1] = e.match(/[\d.\-\+]*\s*(.*)/)[1] || ``), t);
		};
	}),
	X = f(
		v((e, t) => {
			var n = Y();
			t.exports = o;
			var r = a(`in`, document.body);
			function i(e, t) {
				var r = n(getComputedStyle(e).getPropertyValue(t));
				return r[0] * o(r[1], e);
			}
			function a(e, t) {
				var n = document.createElement(`div`);
				((n.style.height = `128` + e), t.appendChild(n));
				var r = i(n, `height`) / 128;
				return (t.removeChild(n), r);
			}
			function o(e, t) {
				if (!e) return null;
				switch (((t ||= document.body), (e = (e + `` || `px`).trim().toLowerCase()), (t === window || t === document) && (t = document.body), e)) {
					case `%`:
						return t.clientHeight / 100;
					case `ch`:
					case `ex`:
						return a(e, t);
					case `em`:
						return i(t, `font-size`);
					case `rem`:
						return i(document.body, `font-size`);
					case `vw`:
						return window.innerWidth / 100;
					case `vh`:
						return window.innerHeight / 100;
					case `vmin`:
						return Math.min(window.innerWidth, window.innerHeight) / 100;
					case `vmax`:
						return Math.max(window.innerWidth, window.innerHeight) / 100;
					case `in`:
						return r;
					case `cm`:
						return r / 2.54;
					case `mm`:
						return r / 25.4;
					case `pt`:
						return r / 72;
					case `pc`:
						return r / 6;
					case `px`:
						return 1;
				}
				var s = n(e);
				if (!isNaN(s[0]) && s[1]) {
					var c = o(s[1], t);
					return typeof c == `number` ? s[0] * c : null;
				}
				return null;
			}
		})(),
	),
	Rt = new Set([`$$slots`, `$$events`, `$$legacy`, `$$host`, `children`, `options`]),
	zt = t(`<div><div class="glass-non-edge svelte-vgmuls"><div class="glass-edge svelte-vgmuls"><div class="glass-sheen svelte-vgmuls"><!></div></div></div></div>`),
	Bt = {
		hash: `svelte-vgmuls`,
		code: `.glass.svelte-vgmuls {position:relative;overflow:hidden;z-index:1;inset:0;border-radius:inherit;background-color:var(--main-background-color);& :where(.svelte-vgmuls),
		& :where(.svelte-vgmuls)::before {border-radius:inherit;}.glass-sheen > * {position:relative;z-index:1;}.glass-sheen:where(.svelte-vgmuls)::before {content:'';position:absolute;inset:0;border-radius:inherit;backdrop-filter:blur(var(--sheen-blur));background-color:var(--sheen-background-color);pointer-events:none;z-index:0;-webkit-mask-image:linear-gradient(0deg, #000, transparent var(--sheen-width)),
				linear-gradient(180deg, #000, transparent var(--sheen-width)),
				linear-gradient(90deg, #000, transparent var(--sheen-width)),
				linear-gradient(270deg, #000, transparent var(--sheen-width));mask-image:linear-gradient(0deg, #000, transparent var(--sheen-width)),
				linear-gradient(180deg, #000, transparent var(--sheen-width)),
				linear-gradient(90deg, #000, transparent var(--sheen-width)),
				linear-gradient(270deg, #000, transparent var(--sheen-width));mask-composite:add;mask-type:luminance;pointer-events:none;}.glass-non-edge:where(.svelte-vgmuls)::before {content:'';position:absolute;inset:0;border-radius:inherit;backdrop-filter:blur(var(--main-blur));pointer-events:none;z-index:var(--non-edge-z-index);--gradient:
				transparent var(--non-edge-width),
				#000 calc(var(--non-edge-width) + var(--non-edge-gradient-width));-webkit-mask-image:linear-gradient(0deg, var(--gradient)), linear-gradient(180deg, var(--gradient)),
				linear-gradient(90deg, var(--gradient)), linear-gradient(270deg, var(--gradient));mask-image:linear-gradient(0deg, var(--gradient)), linear-gradient(180deg, var(--gradient)),
				linear-gradient(90deg, var(--gradient)), linear-gradient(270deg, var(--gradient));mask-composite:intersect;pointer-events:none;}.glass-edge:where(.svelte-vgmuls):before {content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:var(--edge-z-index);background-color:var(--edge-background-color);backdrop-filter:blur(var(--edge-blur));--gradient:
				#000 var(--edge-width), transparent calc(var(--edge-width) + var(--edge-gradient-width));-webkit-mask-image:linear-gradient(0deg, var(--gradient)), linear-gradient(180deg, var(--gradient)),
				linear-gradient(90deg, var(--gradient)), linear-gradient(270deg, var(--gradient));mask-image:linear-gradient(0deg, var(--gradient)), linear-gradient(180deg, var(--gradient)),
				linear-gradient(90deg, var(--gradient)), linear-gradient(270deg, var(--gradient));mask-composite:add;mask-type:luminance;pointer-events:none;}}`,
	};
function Z(t, n) {
	(D(n, !0), s(t, Bt));
	let r = {
			mainBackgroundColor: `hsla(0, 0%, 75%, 0.1)`,
			mainBlur: `1vw`,
			edgeBlur: `0.5vw`,
			edgeBackgroundColor: `hsla(0, 0%, 100%, 0.1)`,
			edgeWidth: `1vw`,
			edgeGradientWidth: `1vw`,
			sheenBlur: `3vw`,
			sheenBackgroundColor: `hsla(0, 0%, 100%, 0.2)`,
			sheenWidth: `0.2vw`,
			edgeZIndex: 1,
			nonEdgeZIndex: 0,
			nonEdgeGradientWidth: `0px`,
			nonEdgeWidth: `0px`,
		},
		i = b(n, `children`, 7),
		o = b(n, `options`, 23, () => ({})),
		{ class: c, style: u, ...d } = E(n, Rt),
		f = { ...r, ...o() };
	console.log(f);
	try {
		let e = (0, X.default)(f.mainBlur) ?? 0,
			t = (0, X.default)(f.edgeBlur) ?? 0;
		(console.log(`mainBlurPx: ${e}, edgeBlurPx: ${t}`),
			e > t
				? ((f.nonEdgeGradientWidth = f.edgeGradientWidth),
					(f.edgeGradientWidth = `0.0001px`),
					(f.edgeWidth = `calc(${f.edgeWidth} + ${f.mainBlur})`),
					(f.edgeZIndex = -1),
					(f.nonEdgeZIndex = 0))
				: ((f.nonEdgeGradientWidth = `0.0001px`), (f.edgeZIndex = 0), (f.nonEdgeZIndex = -1)));
	} catch (e) {
		console.error(`Invalid CSS value for blur size:`, e);
	}
	console.log(f);
	let p = `--main-background-color:${f.mainBackgroundColor};
--main-blur:${f.mainBlur};
--edge-blur:${f.edgeBlur};
--edge-background-color:${f.edgeBackgroundColor};
--edge-width:${f.edgeWidth};
--edge-gradient-width:${f.edgeGradientWidth};
--non-edge-gradient-width:${f.nonEdgeGradientWidth};
--non-edge-width:calc(${f.nonEdgeWidth});
--sheen-blur:${f.sheenBlur};
--sheen-background-color:${f.sheenBackgroundColor};
--sheen-width:${f.sheenWidth};
--edge-z-index:${f.edgeZIndex};
--non-edge-z-index:${f.nonEdgeZIndex};`;
	var h = {
			get children() {
				return i();
			},
			set children(e) {
				(i(e), O());
			},
			get options() {
				return o();
			},
			set options(e = {}) {
				(o(e), O());
			},
		},
		_ = zt();
	g(_, () => ({ class: `glass ${c || ``}`, style: `${p} ${u || ``}`, ...d }), void 0, void 0, void 0, `svelte-vgmuls`);
	var v = l(_),
		y = l(v),
		C = l(y);
	return (e(l(C), () => i() ?? S), m(C), m(y), m(v), m(_), a(t, _), x(h));
}
w(Z, { children: {}, options: {} }, [], [], { mode: `open` });
var Vt = t(
		`<p class="text-2md lg:text-lg"> </p> <div class="flex items-end justify-center gap-2.5 text-3xl font-bold lg:text-[5.625rem]"><!> <p class="text-3xl font-bold">m²</p></div> <p class="text-2md lg:text-lg"> </p>`,
		1,
	),
	Ht = t(
		`<section data-scroll="slide-up" class=" gap-5 overflow-clip rounded-xl"><div class="before:bg-primary/50 absolute flex size-full w-full object-cover before:absolute before:z-2 before:size-full" aria-hidden="true"><video class="absoltue z-1 aspect-video h-full w-full object-cover" preload="auto" autoplay="" loop="" playsinline=""><source type="video/webm"/></video></div> <div class="relative z-3 flex flex-col gap-5 p-5 text-center whitespace-pre-line text-white lg:min-h-165 lg:gap-7.5 lg:p-15"><h3 class="text-2xl leading-tight font-bold lg:text-5xl"> </h3> <p class="text-lg lg:text-2xl"> </p> <div><!></div> <div class="mt-auto"><a href="/contact/contact?selectSolution=DSC" class="text-2md group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white hover:text-black max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:text-lg"><span> </span> <icon-list></icon-list></a></div></div></section>`,
		2,
	);
function Q(e, t) {
	D(t, !0);
	var n = Ht(),
		o = l(n),
		s = l(o);
	((s.muted = !0), y(s, `poster`, `/video/banner-dsc.jpg`), y(l(s), `src`, `/video/banner-dsc.webm`), m(s), m(o));
	var f = u(o, 2),
		p = l(f),
		h = l(p, !0);
	m(p);
	var g = u(p, 2),
		v = l(g, !0);
	m(g);
	var b = u(g, 2);
	(Z(l(b), {
		class: `inline-flex w-full max-w-225 items-center justify-center gap-2 rounded-full p-5`,
		style: `border-radius: 12px;`,
		children: (e, t) => {
			var n = Vt(),
				o = c(n),
				s = l(o, !0);
			m(o);
			var d = u(o, 2);
			(vt(l(d), { text: 15e5 }), ee(2), m(d));
			var f = u(d, 2),
				p = l(f, !0);
			(m(f),
				r(
					(e, t) => {
						(i(s, e), i(p, t));
					},
					[() => R(), () => Ce()],
				),
				a(e, n));
		},
		$$slots: { default: !0 },
	}),
		m(b));
	var S = u(b, 2),
		C = l(S),
		w = l(C),
		T = l(w, !0);
	m(w);
	var E = u(w, 2);
	(_(E, `name`, `arrow-right`),
		d(E, 1, `size-6 stroke-white group-hover:stroke-black`),
		m(C),
		m(S),
		m(f),
		m(n),
		r(
			(e, t, n) => {
				(i(h, e), i(v, t), i(T, n));
			},
			[() => Te(), () => xe(), () => oe()],
		),
		a(e, n),
		x());
}
w(Q, {}, [], [], { mode: `open` });
var Ut = t(`<!> <!> <!> <!> <!> <!> <!>`, 1);
function $(e, t) {
	D(t, !0);
	let r = h(
			o([
				{ img: `/imgs/banner/img-banner-dsc-8.png`, tit: Ge(), txt: Ve() },
				{ img: `/imgs/banner/img-banner-dsc-2.png`, tit: Mt(), txt: k() },
				{ img: `/imgs/banner/img-banner-dsc-3.png`, tit: _e(), txt: Pt() },
				{ img: `/imgs/banner/img-banner-dsc-1.png`, tit: N(), txt: ye() },
				{ img: `/imgs/banner/img-banner-dao-3.png`, tit: qe(), txt: Ye() },
				{ img: `/imgs/banner/img-banner-dao-8.png`, tit: Le(), txt: It() },
				{ img: `/imgs/banner/img-banner-dao-9.png`, tit: At(), txt: Ne() },
				{ img: `/imgs/banner/img-banner-dao-10.png`, tit: ot(), txt: ht() },
			]),
		),
		i = h(
			o([
				{ poster: `/video/vps-video.jpg`, video: `/video/vps-video.webm`, tit: te(), txt: [pe(), Ae()], logo: Ee(), labels: [Oe(), B(), gt()] },
				{ poster: `/video/scan-video.jpg`, video: `/video/scan-video.webm`, tit: ft(), txt: [Fe(), Qe()], logo: bt(), labels: [lt(), Et(), Ue()] },
				{ img: `/imgs/features/logo-features-dsc-3.jpg`, tit: H(), txt: [F()], logo: we(), labels: [be(), L()] },
				{ poster: `/video/dsc-part2-video-1.jpg`, video: `/video/dsc-part2-video-1.webm`, tit: Se(), txt: [ae(), Lt()], logo: he(), labels: [W(), z(), P()] },
				{ poster: `/video/dsc-part2-video-2.jpg`, video: `/video/dsc-part2-video-2.webm`, tit: de(), txt: [ce(), G()], logo: $e(), labels: [re(), tt(), le()] },
			]),
		),
		s = T(() => n(i).slice(0, 3)),
		l = T(() => n(i).slice(3, 5)),
		d = h(
			o([
				{ img: `/imgs/result/img-result-dsc-1.png`, tit: ve(), txt: jt },
				{ img: `/imgs/result/img-result-dsc-2.png`, tit: se(), txt: ge },
				{ img: `/imgs/result/img-result-dsc-3.png`, tit: Nt(), txt: Ie },
				{ img: `/imgs/result/img-result-dsc-4.png`, tit: Ft(), txt: kt },
			]),
		),
		f = h(
			o([
				{
					id: `dsc-case-2`,
					btn: Re(),
					logo: [`/imgs/case/logo-case-dsc-2.png`, `client`],
					img: `/imgs/case/img-case-dsc-2.jpg`,
					tit: St(),
					badge: [dt(), Pe(), Ze()],
					txt: [yt()],
					etc: [ct, Tt],
				},
				{
					id: `dsc-case-1`,
					btn: Me(),
					logo: [`/imgs/case/logo-case-dsc-1.png`],
					img: `/imgs/case/img-case-dsc-1.jpg`,
					tit: Ke(),
					badge: [Je(), at(), mt(), We()],
					txt: [Be()],
					etc: [Dt, rt],
				},
			]),
		),
		m = h(
			o([
				{ id: `faq-dsc-chk-1`, tit: He(), txt: ne },
				{ id: `faq-dsc-chk-2`, tit: me(), txt: je },
				{ id: `faq-dsc-chk-3`, tit: De(), txt: ke },
				{ id: `faq-dsc-chk-4`, tit: V(), txt: _t },
				{ id: `faq-dsc-chk-5`, link: `https://logifine.deepfine.com/signup/trial`, btn: fe(), tit: U(), txt: I },
			]),
		);
	(p(`case-list`, {
		get list() {
			return n(f);
		},
	}),
		C(() => {
			let e = new pt({ autoRaf: !0 });
			return (
				J.setInstance(e),
				() => {
					J.clear();
				}
			);
		}));
	var g = Ut(),
		_ = c(g);
	{
		let e = T(() => K()),
			t = T(() => et());
		wt(_, {
			get videoUrl() {
				return `/video/dsc-video.webm`;
			},
			get bg() {
				return `/video/dsc-video.jpg`;
			},
			get logo() {
				return `/imgs/logo/logo-sub-dsc.svg`;
			},
			page: `dsc`,
			get logoAlt() {
				return n(e);
			},
			get tit() {
				return n(t);
			},
			get subtit() {
				return ie;
			},
		});
	}
	var v = u(_, 2);
	{
		let e = T(() => nt()),
			t = T(() => ue()),
			i = T(() => j()),
			a = T(() => [...n(r)]);
		Xe(v, {
			cls: ` xl:grid-cols-4 lg:grid-cols-2 grid-cols-[repeat(auto-fit,1fr)]`,
			get tit() {
				return n(e);
			},
			get txt() {
				return n(t);
			},
			get subTxt() {
				return n(i);
			},
			get lists() {
				return n(a);
			},
			page: `dsc`,
		});
	}
	var y = u(v, 2);
	{
		let e = T(() => Ot()),
			t = T(() => it()),
			r = T(() => [...n(s)]);
		q(y, {
			get tit() {
				return n(e);
			},
			get txt() {
				return n(t);
			},
			get lists() {
				return n(r);
			},
			page: `dsc`,
		});
	}
	var b = u(y, 2);
	{
		let e = T(() => ze()),
			t = T(() => Ct()),
			r = T(() => [...n(l)]);
		q(b, {
			get tit() {
				return n(e);
			},
			get txt() {
				return n(t);
			},
			get lists() {
				return n(r);
			},
			page: `dsc`,
		});
	}
	var S = u(b, 2);
	{
		let e = T(() => A()),
			t = T(() => M()),
			r = T(() => [...n(d)]);
		st(S, {
			get tit() {
				return n(e);
			},
			get txt() {
				return n(t);
			},
			get lists() {
				return n(r);
			},
			page: `dsc`,
		});
	}
	var w = u(S, 2);
	{
		let e = T(() => ut()),
			t = T(() => [...n(m)]);
		xt(w, {
			tit: `FAQ`,
			get txt() {
				return n(e);
			},
			get lists() {
				return n(t);
			},
		});
	}
	(Q(u(w, 2), {}), a(e, g), x());
}
customElements.define(`sub-dsc`, w($, { videoUrl: { attribute: `data-vide-url`, type: `String` } }, [], []));
export { Z as n, $ as t };
