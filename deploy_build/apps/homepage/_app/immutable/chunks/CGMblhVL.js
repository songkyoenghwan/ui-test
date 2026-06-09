import {
	Ql as _e,
	Po as $,
	Go as ae,
	Wo as Ae,
	Fc as B,
	Ro as be,
	zn as Be,
	Ii as ce,
	Uc as Ce,
	Kc as de,
	Vn as De,
	Vc as Ee,
	Bo as F,
	Nc as fe,
	ki as Fe,
	Lc as G,
	Pn as ge,
	Hc as H,
	Pi as he,
	Bt as I,
	Ft as ie,
	o as Ie,
	$l as j,
	Lo as J,
	Xc as je,
	Li as K,
	Wc as ke,
	Ci as L,
	Io as le,
	qc as Le,
	Ai as M,
	Pc as me,
	Yc as Me,
	Bc as N,
	Fn as ne,
	d as Ne,
	Hn as oe,
	Vo as Oe,
	Bn as P,
	Oi as pe,
	ji as Pe,
	Ln as q,
	No as Q,
	Di as R,
	Fo as re,
	wi as Re,
	Ho as se,
	Ti as Se,
	Fi as te,
	Uo as Te,
	Ic as U,
	Jc as ue,
	Gc as V,
	Rc as ve,
	zo as Ve,
	In as W,
	Un as we,
	Ni as X,
	Si as xe,
	Mi as Y,
	Rn as ye,
	Ei as z,
	Nn as Z,
	zc as ze,
} from './2o53KIMk.js';
import './xihTtKlq.js';
import {
	h as _,
	K as a,
	v as A,
	m as b,
	Q as c,
	ot as C,
	_ as d,
	rt as D,
	$ as e,
	r as E,
	ut as ee,
	b as f,
	g,
	ft as h,
	H as i,
	tt as k,
	Y as l,
	et as m,
	B as n,
	M as o,
	st as O,
	dt as p,
	F as r,
	N as s,
	o as S,
	A as t,
	q as T,
	Z as u,
	j as v,
	pt as w,
	nt as x,
	k as y,
} from './DWWkaRp_.js';

var He = (e, t = w, n = w) => {
		var r = Ue();
		d(r, 1, `flex h-full min-h-12 w-full flex-1 items-center justify-center gap-2.5 px-5 lg:min-h-17.5 lg:gap-5 lg:px-7.5`);
		var i = l(r),
			c = l(i);
		p(i);
		var f = u(i, 2),
			m = l(f, !0);
		(p(f),
			p(r),
			a(() => {
				(b(c, `src`, t()), o(m, n()));
			}),
			s(e, r));
	},
	Ue = r(
		`<swiper-slide><picture class="inline-flex size-7.5 lg:size-12.5"><img loading="lazy" alt="" class="h-full object-cover"/></picture> <h4 class="text-primary text-lg font-bold lg:text-4xl"> </h4></swiper-slide>`,
		2,
	),
	We = r(
		`<section data-scroll="slide-up" class="bg-light-blue flex h-120 flex-col rounded-xl bg-(image:--banner-bg) bg-cover bg-center bg-no-repeat p-5 text-white lg:h-165 lg:p-15"><div><h3 class="text-2xl leading-tight font-bold text-white lg:text-5xl"> </h3> <div><swiper-container></swiper-container> <h3 class="text-2xl leading-tight font-bold text-white lg:text-5xl"> </h3></div> <p class="text-2md whitespace-pre-line text-white lg:mt-5 lg:text-2xl"> </p></div> <div class="mt-auto"><a class="text-2md group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white hover:text-black max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:text-lg"><span> </span> <icon-list></icon-list></a></div></section>`,
		2,
	);
function Ge(e, n) {
	O(n, !0);
	let r = S(n, `page`, 7, ``);
	T(() => {
		Ie();
	});
	let f = m(0),
		h = m(c([se, Oe, F, Ve, be, J, le, re, $, Q])),
		v = m(c([P, Be, ye, q, W, ne, ge, Z])),
		x = D(() => (r() === `dao` ? [...i(h)] : r() === `logi` ? [...i(v)] : [])),
		w = D(() => (r() === `dao` ? `/imgs/banner/bg-banner-dao.png` : `/imgs/banner/bg-banner-logi.png`)),
		E = D(() => (r() === `dao` ? ae() : r() === `logi` ? we() : ``)),
		ee = D(() => (r() === `dao` ? Ae() : r() === `logi` ? oe() : ``)),
		j = D(() => (r() === `dao` ? Te() : r() === `logi` ? De() : ``)),
		M = D(() =>
			Array.from({ length: i(x).length }).map((e, t) => {
				let n = i(x)[t];
				return {
					img: r() === `dao` ? `/imgs/banner/img-banner-dao-slide-${t + 1}.png` : `/imgs/banner/img-banner-logi-slide-${t + 1}.png`,
					txt: typeof n == `function` ? n() : ``,
				};
			}),
		);
	var N = {
			get page() {
				return r();
			},
			set page(e = ``) {
				(r(e), k());
			},
		},
		L = We();
	let R;
	var z = l(L),
		B = l(z),
		te = l(B, !0);
	p(B);
	var V = u(B, 2),
		H = l(V);
	(_(H, `loop`, !0),
		_(H, `slides-per-view`, 1),
		_(H, `space-between`, i(f)),
		_(H, `speed`, `450`),
		_(H, `autoplay-delay`, `1500`),
		_(H, `direction`, `vertical`),
		y(
			H,
			21,
			() => i(M),
			t,
			(e, t) => {
				He(
					e,
					() => i(t).img,
					() => i(t).txt,
				);
			},
		),
		p(H));
	var U = u(H, 2),
		ce = l(U, !0);
	(p(U), p(V));
	var ue = u(V, 2),
		de = l(ue, !0);
	(p(ue), p(z));
	var G = u(z, 2),
		K = l(G),
		Y = l(K),
		fe = l(Y, !0);
	p(Y);
	var X = u(Y, 2);
	return (
		_(X, `name`, `arrow-right`),
		d(X, 1, `size-6 stroke-white group-hover:stroke-black`),
		p(K),
		p(G),
		p(L),
		a(
			(e, t) => {
				((R = g(L, ``, R, { '--banner-bg': `url(${i(w)})` })),
					d(z, 1, A([`flex flex-col gap-2`, r() === `logi` ? `space-y-5` : ``])),
					o(te, i(E)),
					d(V, 1, A([`max-lg:space-y-2.5 lg:gap-5`, r() === `dao` || r() === `logi` ? `space-y-5` : ``])),
					d(H, 1, A([`flex h-12 flex-none justify-between rounded-full bg-white shadow-md lg:h-17.5`, r() === `dao` ? `lg:w-107.5` : r() === `logi` ? `lg:w-155` : ``])),
					o(ce, i(ee)),
					o(de, i(j)),
					b(
						K,
						`href`,
						r() === `logi`
							? `https://logifine.deepfine.com/signup/trial`
							: r() === `dao`
								? `/contact/contact?selectSolution=DAO`
								: r() === `dsc`
									? `/contact/contact?selectSolution=DSC`
									: `/contact/contact`,
					),
					b(K, `target`, r() === `logi` ? `_black` : void 0),
					b(K, `rel`, r() === `logi` ? `noopener noreferrer` : void 0),
					b(K, `aria-label`, e),
					o(fe, t));
			},
			[() => ie?.() + `page`, () => I()],
		),
		s(e, L),
		C(N)
	);
}
E(Ge, { page: {} }, [], [], { mode: `open` });
var Ke = r(`<icon-list></icon-list>`, 2),
	qe = r(`<p></p>`),
	Je = r(
		`<div aria-hidden="true" class="absolute top-[calc(50%-1.25rem)] left-full z-5 grid size-10 animate-[as-is_5s_ease-in-out_infinite] place-items-center max-lg:hidden"><div class="relative"><!> <p class="relative z-2 size-3 rounded-full bg-white"></p></div></div>`,
	),
	Ye = r(
		`<li data-scroll="slide-up"><button><!> <!> <strong class="flex flex-col gap-2.5"><span class="text-2md font-bold lg:text-2xl"> </span> <span> </span></strong></button> <!></li>`,
	),
	Xe = r(
		`<section data-scroll="slide-up"><!> <ol class="grid grid-rows-2 gap-5 lg:grid-cols-[1fr_60px_1fr] lg:grid-rows-1 lg:gap-5 2xl:grid-cols-[1fr_12.5rem_1fr] 2xl:gap-25 starting:opacity-0"><li class="divide-d9d9d9 relative grid h-full divide-y divide-dashed rounded-xl bg-white lg:grid-rows-[90px_1fr]"><header class="grid min-h-15 place-content-center text-xl font-bold lg:min-h-22.5 lg:text-4xl">AS-IS</header> <ul class="divide-d9d9d9 grid grid-rows-4 divide-y divide-dashed px-2"></ul></li> <li class="hidden place-content-center lg:grid"><p class="bg-ebedff grid place-items-center rounded-full lg:size-15 xl:size-50"><icon-list></icon-list></p></li> <li class="divide-d9d9d9 bg-3743ff from-primary to-828aff group relative z-3 grid h-full divide-y divide-dashed rounded-xl bg-linear-to-l text-white lg:grid-rows-[90px_1fr]"><header class="grid min-h-15 place-content-center text-xl font-bold lg:min-h-22.5 lg:text-4xl">TO-BE</header> <ul class="divide-d9d9d9 grid grid-rows-4 divide-y divide-dashed px-2 text-left"></ul></li></ol></section>`,
		2,
	);
function Ze(r, g) {
	O(g, !0);
	let w = (r, c, f, m, g) => {
			let S = x(() => h(c?.(), ``)),
				C = x(() => h(f?.(), ``)),
				w = x(() => h(m?.(), ``)),
				T = x(() => h(g?.(), 0));
			var E = Ye(),
				D = l(E),
				O = l(D),
				k = (e) => {
					var t = Ke();
					(_(t, `name`, `tri-alert`), d(t, 1, `group-aria-current:fill-primary fill-999 relative h-10 w-10.5 flex-none transition-all`), s(e, t));
				};
			v(O, (e) => {
				i(w) === `as` && e(k);
			});
			var j = u(O, 2),
				M = (e) => {
					var t = Ke();
					(_(t, `name`, `tick-circle`), d(t, 1, `relative h-10 w-10.5 flex-none fill-white/30 transition-all group-aria-current:fill-white`), s(e, t));
				};
			v(j, (e) => {
				i(w) === `to` && e(M);
			});
			var N = u(j, 2),
				P = l(N),
				F = l(P, !0);
			p(P);
			var I = u(P, 2),
				L = l(I, !0);
			(p(I), p(N), p(D));
			var R = u(D, 2),
				z = (e) => {
					var n = Je(),
						r = l(n);
					(y(
						l(r),
						16,
						() => [, , , , ,],
						t,
						(e, t, n) => {
							var r = qe();
							(d(
								r,
								1,
								A([
									`border-primary @starting:opacity-0 absolute -top-2.5 -left-2.5 grid animate-[ping-motion_0.6s_cubic-bezier(0,0,0.4,1)_infinite] place-items-center rounded-full border-16 opacity-0`,
									n === 1
										? `animate-[ping-motion_1.1s_cubic-bezier(0,0,0.4,1)_infinite]`
										: n === 2
											? `animate-[ping-motion_1.1s_cubic-bezier(0,0,0.4,1)_0.6s_infinite]`
											: n === 3
												? `animate-[ping-motion_1.1s_cubic-bezier(0,0,0.4,1)_1.1s_infinite]`
												: n === 4
													? `animate-[ping-motion_0.6s_cubic-bezier(0,0,0.4,1)_1.6s_infinite]`
													: ``,
								]),
							),
								s(e, r));
						},
					),
						ee(2),
						p(r),
						p(n),
						s(e, n));
				};
			(v(R, (e) => {
				i(W) === i(T) && i(w) === `as` && e(z);
			}),
				p(E),
				a(() => {
					(d(
						E,
						1,
						A([
							`before:bg-primary relative flex py-2 before:top-[calc(50%-0.1563rem)] before:z-5 before:rounded-full before:opacity-0 before:transition-all has-aria-current:before:absolute has-aria-current:before:size-1.25 has-aria-current:before:opacity-100 max-lg:before:hidden! max-lg:after:hidden`,
							i(w) === `as`
								? `after:border-primary z-6 after:top-[calc(50%-.0156rem)] after:z-1 after:border-dashed has-aria-current:before:right-0 has-aria-current:after:absolute has-aria-current:after:left-full has-aria-current:after:border lg:has-aria-current:after:w-30 2xl:has-aria-current:after:w-105`
								: `z-7 delay-500 before:z-6 has-aria-current:before:left-0`,
						]),
					),
						d(
							D,
							1,
							A([
								`@starting:bg-transparnet group z-3 flex flex-1 grid-rows-2 items-center gap-5 space-y-2.5 rounded-xl p-5 text-left transition-all lg:gap-7.5 lg:py-7.5`,
								i(w) === `as` ? `aria-current:bg-light-blue text-666` : `aria-current:bg-9097ff`,
							]),
						),
						b(D, `aria-current`, i(W) === i(T) ? `true` : void 0),
						o(F, i(S)),
						d(I, 1, A([`text-2md text-666 font-normal lg:text-lg`, i(w) === `as` ? ` text-666` : `text-white`])),
						o(L, i(C)));
				}),
				n(`mouseenter`, D, () => e(W, i(T), !0)),
				s(r, E));
		},
		T = S(g, `page`, 7, ``),
		E = m(!1),
		P = Me(),
		F = je(),
		I = m(
			c([
				{ tit: ue(), txt: Le() },
				{ tit: de(), txt: V() },
				{ tit: ke(), txt: Ce() },
				{ tit: H(), txt: Ee() },
			]),
		),
		ne = m(
			c([
				{ tit: N(), txt: ze() },
				{ tit: ve(), txt: G() },
				{ tit: U(), txt: B() },
				{ tit: me(), txt: fe() },
			]),
		),
		re = m(
			c([
				{ tit: K(), txt: ce() },
				{ tit: te(), txt: he() },
				{ tit: X(), txt: Y() },
				{ tit: Pe(), txt: M() },
			]),
		),
		ie = m(
			c([
				{ tit: Fe(), txt: pe() },
				{ tit: R(), txt: z() },
				{ tit: Se(), txt: Re() },
				{ tit: L(), txt: xe() },
			]),
		),
		ae = D(() => (T() === `dao` ? i(I) : i(re))),
		oe = D(() => (T() === `dao` ? i(ne) : i(ie))),
		se = (t) => {
			let n = j(t, { y: [30, 0], opacity: [0, 1], duration: 400, easing: `easeOutQuad`, autoplay: !1 }),
				r = _e({
					container: document.body,
					target: t,
					enter: `bottom center`,
					leave: `top bottom`,
					axis: `y`,
					onEnter: () => {
						i(E) || (e(E, !0), n.seek(0), n.play());
					},
					onLeaveBackward: () => {
						e(E, !1);
					},
					debug: !1,
				});
			return () => r.revert?.();
		},
		W = m(0);
	var le = {
			get page() {
				return T();
			},
			set page(e = ``) {
				(T(e), k());
			},
		},
		q = Xe(),
		J = l(q);
	Ne(J, {
		get tit() {
			return F;
		},
		get txt() {
			return P;
		},
	});
	var Z = u(J, 2),
		Q = l(Z),
		ge = u(l(Q), 2);
	(y(
		ge,
		21,
		() => i(ae),
		t,
		(e, t, n) => {
			w(
				e,
				() => i(t).tit,
				() => i(t).txt,
				() => `as`,
				() => n,
			);
		},
	),
		p(ge),
		p(Q));
	var $ = u(Q, 2),
		ye = l($),
		be = l(ye);
	(_(be, `name`, `arrow-as-is`), d(be, 1, `stroke-primary relative w-full max-w-22.5 p-1 transition-all`), p(ye), p($));
	var we = u($, 2),
		Te = u(l(we), 2);
	return (
		y(
			Te,
			21,
			() => i(oe),
			t,
			(e, t, n) => {
				w(
					e,
					() => i(t).tit,
					() => i(t).txt,
					() => `to`,
					() => n,
				);
			},
		),
		p(Te),
		p(we),
		p(Z),
		p(q),
		f(q, () => se),
		a(() => d(q, 1, A([`space-y-5 py-7.5 lg:space-y-7.5`, T() === `dao` ? `py-15` : `lg:pt-7.5 lg:pb-15`]))),
		s(r, q),
		C(le)
	);
}
customElements.define(`sub-problem`, E(Ze, { page: {} }, [], []));
export { Ge as n, Ze as t };
