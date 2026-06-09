import { Z as a, gt as c, ot as d, E as e, r as f, ut as h, Y as i, h as l, tt as m, N as n, _ as o, st as p, X as r, dt as s, F as t, o as u } from '../chunks/DWWkaRp_.js';
import '../chunks/xihTtKlq.js';
import '../chunks/CbIflH6Q.js';

var g = c({ prerender: () => !0, ssr: () => !1 }),
	_ = class extends HTMLElement {
		constructor() {
			(super(), (this.rendered = !1));
		}
		connectedCallback() {
			this.render();
		}
		render() {
			((this.rendered = !0),
				(this.innerHTML = `
			<footer class="footer text-2md text-666 pb-5 lg:pb-7.5 lg:text-lg" data-scroll="slide-up">
				<div class="relative rounded-xl bg-white lg:grid lg:grid-cols-2">
					<footer-adress class="flex flex-col gap-5 p-5 lg:p-7.5"></footer-adress>

					<section class="flex flex-col justify-between gap-15 p-5 lg:gap-5 lg:p-7.5">
						<ul class="grid grid-cols-2 gap-15 lg:grid-cols-4">
							<li class="grid gap-5">
								<h2 class="text-2md text-black lg:text-lg">Products</h2>
								<ul class="space-y-5">
									<li><a class="underline-offset-4 hover:underline" href="">LOGI.FINE</a></li>
									<li><a class="underline-offset-4 hover:underline" href="">DAO</a></li>
									<li><a class="underline-offset-4 hover:underline" href="">DSC</a></li>
								</ul>
							</li>
							<li class="grid">
								<h2 class="text-2md text-black lg:text-lg">
									<a class="underline-offset-4 hover:underline" href="/company">Company</a>
								</h2>
							</li>
							<li class="grid">
								<h2 class="text-2md text-black lg:text-lg"><a class="underline-offset-4 hover:underline" href="/news/news">News</a></h2>
							</li>
							<li class="grid">
								<h2 class="text-2md text-black lg:text-lg">
									<a class="underline-offset-4 hover:underline" href="Contact">Contact Sales</a>
								</h2>
							</li>
						</ul>
						<footer-sns class="inline-flex w-full items-center justify-center gap-7.5 lg:justify-end"></footer-sns>
					</section>

					<footer-copy class="lg:col-span-2"></footer-copy>
				</div>
			</footer>
		`));
		}
	};
customElements.get(`footer-tag`) || customElements.define(`footer-tag`, _);
var v = t(
	`<header class="header bg-f5f5f5 group/header fixed top-0 left-0 z-5 grid w-full max-w-dvw place-items-center backdrop-blur-[20px] has-checked:bg-white! 2xl:has-checked:grid-cols-2 2xl:has-checked:items-start"><header-imgs></header-imgs> <div class="flex w-full max-w-490 flex-1 items-center justify-between gap-3 px-5 py-5 transition-discrete group-has-checked/header:bg-white lg:px-10 lg:py-7.5 2xl:items-start 2xl:group-has-checked/header:px-12"><p><a href="/" title="deepfine homepage"><span class="sr-only">deepfine</span> <header-imgs></header-imgs></a></p> <div class="flex items-center gap-7.5"><nav class="relative z-10 hidden items-center gap-5 group-has-checked/header:hidden lg:flex"><ul class="flex text-2xl lg:gap-7.5 2xl:gap-15 2xl:group-has-checked/header:gap-5"><li class="group/products relative" aria-current="false"><button type="button" class="group-aria-[current=page]/products:text-primary flex min-h-12 items-center justify-center gap-2.5 hover:underline"><span class="group-hover/products:text-primary">Products</span> <icon-list></icon-list></button> <ul class="absolute top-9/10 -left-60 hidden w-132.5 grid-rows-3 gap-2.5 rounded-xl bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.25)] group-hover/products:grid peer-checked:grid"><li class="group/head-logo relative transition-all hover:opacity-100 aria-[current=page]:opacity-100" aria-current="false"><a href="/logi" aria-label="logi.fine page"><header-imgs></header-imgs></a></li> <li class="group/head-logo relative transition-all hover:opacity-100 aria-[current=page]:opacity-100" aria-current="page"><a href="/dao" aria-label="dao page"><header-imgs></header-imgs></a></li> <li class="group/head-logo relative transition-all hover:opacity-100 aria-[current=page]:opacity-100" aria-current="false"><a href="/dsc" aria-label="dsc page"><header-imgs></header-imgs></a></li></ul></li> <li><a href="/company" class="hover:text-primary aria-[current=page]:text-primary flex min-h-12 items-center justify-center hover:underline" aria-current="false">Company</a></li> <li><a href="/news" class="hover:text-primary aria-[current=page]:text-primary flex min-h-12 items-center justify-center hover:underline" aria-current="false">News</a></li> <li><a href="/contact" class="bg-primary hover:text-primary hover:border-primary group border-primary flex min-h-12 items-center gap-2 rounded-md border px-5 text-white hover:border hover:bg-white" aria-current="false"><span class="flex-none text-lg">Contact Sales</span> <icon-list></icon-list></a></li></ul></nav> <label for="gnb-menu" class="bg-d8d8d8 hover:outline-primary has-checked:bg-primary has-checked:border-primary group flex size-12 items-center justify-center gap-2 rounded-md hover:bg-white hover:outline"><span class="sr-only">menu</span> <input type="checkbox" name="gnb-menu" id="gnb-menu" class="peer sr-only"/> <icon-list></icon-list> <icon-list></icon-list></label></div></div> <div class="fixed top-22 left-0 hidden h-[calc(100dvh-88px)] w-dvw overflow-y-auto bg-white px-5 opacity-100 shadow-md group-has-checked/header:grid lg:top-27 lg:h-[calc(100dvh-6.75rem)] lg:px-12.5 2xl:right-0 2xl:left-auto 2xl:h-[calc(100dvh-108px)] 2xl:w-[50dvw] 2xl:px-12 starting:opacity-0"><div class="flex flex-col"><section class="flex flex-col justify-between gap-5 pt-10 font-bold"><ul class="grid gap-10 text-2xl 2xl:gap-5"><li class="grid gap-5"><h2 class="text-666 text-lg">Products</h2> <ul><li class="flex items-center gap-5 before:relative before:h-[stretch] before:min-h-full before:w-px before:bg-black/20"><a href="/logi" class="aria-[current=page]:text-primary pb-2.5 leading-tight underline-offset-4 hover:underline" aria-current="false">LOGI.FINE</a></li> <li class="flex items-center gap-5 before:relative before:h-[stretch] before:min-h-full before:w-px before:bg-black/20"><a href="/dao" class="aria-[current=page]:text-primary py-2.5 leading-tight underline-offset-4 hover:underline" aria-current="false">DAO <span class="text-lg font-normal">(DEEP.FINE AR.ON)</span></a></li> <li class="flex items-center gap-5 before:relative before:h-[stretch] before:min-h-full before:w-px before:bg-black/20"><a href="/dsc" class="aria-[current=page]:text-primary pt-2.5 leading-tight underline-offset-4 hover:underline" aria-current="false">DSC <span class="text-lg font-normal">(DEEP.FINE Spatial Crafter)</span></a></li></ul></li> <li class="grid"><h2><a href="/company" class="aria-[current=page]:text-primary underline-offset-4 hover:underline" aria-current="false">Company</a></h2></li> <li class="grid"><h2><a href="/news" class="aria-[current=page]:text-primary underline-offset-4 hover:underline" aria-current="false">News</a></h2></li> <li class="grid"><h2><a href="/contact" class="aria-[current=page]:text-primary underline-offset-4 hover:underline" aria-current="page">Contact Sales</a></h2></li></ul></section> <section class="mt-auto flex flex-col justify-between gap-15 border-t border-t-black/20 py-5 lg:gap-5 lg:py-7.5"><dl class="text-666 flex flex-col gap-5 text-lg"><dt class="font-bold">Downloads</dt> <dd class="inline-flex items-center gap-10"><ul class="inline-flex flex-wrap items-center gap-2.5"><li><a href="https://deepfine.my.salesforce.com/sfc/p/IR000001ZM92/a/TJ00000djirN/Lc54cHS.pbOehXcpItel0OxkWqb66lW7m.7qOou0CU0" aria-label="LOGI.FINE Brochure" target="_blank" class="hover:bg-primary group flex min-h-10.5 flex-none items-center gap-5 rounded-full border border-black px-5 py-1 font-normal hover:text-white">LOGI.FINE Brochure <icon-list></icon-list></a></li></ul></dd></dl></section> <section class="flex flex-col justify-between gap-15 py-5 lg:gap-5 lg:py-7.5"><dl class="text-666 flex items-center justify-between gap-5 text-lg"><dt class="font-bold">Language</dt> <dd class="divde-x-black/20 inline-flex items-center divide-x"><button class="hover:bg-light-blue px-5 text-2xl text-black/50 hover:underline aria-current:text-black aria-current:underline" type="button"><span class="font-bold">EN</span></button> <button class="hover:bg-light-blue px-5 text-2xl text-black/50 hover:underline aria-current:text-black aria-current:underline" type="button" aria-current="true"><span class="font-bold">KR</span></button></dd></dl></section></div></div></header> <!> <footer-tag></footer-tag> <banner-foot></banner-foot>`,
	3,
);
function y(t, c) {
	p(c, !0);
	let f = u(c, `children`, 7);
	var g = {
			get children() {
				return f();
			},
			set children(e) {
				(f(e), m());
			},
		},
		_ = v(),
		y = r(_),
		b = i(y);
	(l(b, `name`, `left`), o(b, 1, `relative z-20 hidden w-full overflow-clip object-cover 2xl:group-has-checked/header:flex 2xl:group-has-checked/header:h-dvh`));
	var x = a(b, 2),
		S = i(x),
		C = i(S);
	(l(a(i(C), 2), `name`, `logo`), s(C), s(S));
	var w = a(S, 2),
		T = i(w),
		E = i(T),
		D = i(E),
		O = i(D),
		k = a(i(O), 2);
	(l(k, `name`, `arrow-down`),
		o(
			k,
			1,
			`group-hover/products:stroke-primary group-aria-[current=page]/products:stroke-primary size-6 rotate-180 stroke-black transition-all group-hover/products:grid group-hover/products:rotate-0`,
		),
		s(O));
	var A = a(O, 2),
		j = i(A),
		M = i(j);
	(l(i(M), `name`, `logi`), s(M), s(j));
	var N = a(j, 2),
		P = i(N);
	(l(i(P), `name`, `dao`), s(P), s(N));
	var F = a(N, 2),
		I = i(F);
	(l(i(I), `name`, `dsc`), s(I), s(F), s(A), s(D));
	var L = a(D, 6),
		R = i(L),
		z = a(i(R), 2);
	(l(z, `name`, `arrow-right`), o(z, 1, `group-hover:stroke-primary size-6 stroke-white`), s(R), s(L), s(E), s(T));
	var B = a(T, 2),
		V = a(i(B), 4);
	(l(V, `name`, `menu`), o(V, 1, `group-hover:fill-primary size-6 stroke-black peer-checked:hidden`));
	var H = a(V, 2);
	(l(H, `name`, `close`), o(H, 1, `hidden size-6 stroke-white peer-checked:flex`), s(B), s(w), s(x));
	var U = a(x, 2),
		W = i(U),
		G = a(i(W), 2),
		K = i(G),
		q = a(i(K), 2),
		J = i(q),
		Y = i(J),
		X = i(Y),
		Z = a(i(X));
	(l(Z, `name`, `import`), o(Z, 1, `size-6 stroke-black group-hover:stroke-white`), s(X), s(Y), s(J), s(q), s(K), s(G), h(2), s(W), s(U), s(y));
	var Q = a(y, 2);
	return (e(Q, f), a(a(Q, 2), 2), n(t, _), d(g));
}
f(y, { children: {} }, [], [], { mode: `open` });
export { y as component, g as universal };
