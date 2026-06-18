//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n));
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/constants.js
var l = {}, u = Symbol("uninitialized"), d = "http://www.w3.org/1999/xhtml", f = "http://www.w3.org/2000/svg", p = "http://www.w3.org/1998/Math/MathML", m = Array.isArray, h = Array.prototype.indexOf, g = Array.prototype.includes, _ = Array.from, v = Object.keys, y = Object.defineProperty, b = Object.getOwnPropertyDescriptor, x = Object.getOwnPropertyDescriptors, S = Object.prototype, C = Array.prototype, w = Object.getPrototypeOf, T = Object.isExtensible;
function E(e) {
	return typeof e == "function";
}
var D = () => {};
function O(e) {
	return e();
}
function ee(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function te() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function k(e, t, n = !1) {
	return e === void 0 ? n ? t() : t : e;
}
function ne(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/constants.js
var re = 1 << 24, ie = 1024, ae = 2048, A = 4096, oe = 8192, se = 16384, ce = 32768, le = 1 << 25, ue = 65536, de = 1 << 19, fe = 1 << 20, pe = 1 << 25, me = 65536, he = 1 << 21, ge = 1 << 22, _e = 1 << 23, ve = Symbol("$state"), ye = Symbol("legacy props"), be = Symbol(""), xe = Symbol("attributes"), Se = Symbol("class"), Ce = Symbol("style"), we = Symbol("text"), Te = Symbol("form reset"), Ee = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), De = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
function Oe(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/errors.js
function ke() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Ae(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function je(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Me() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Ne(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Pe() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Fe() {
	throw Error("https://svelte.dev/e/hydration_failed");
}
function Ie(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Le() {
	throw Error("https://svelte.dev/e/set_context_after_init");
}
function Re() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ze() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Be() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ve() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function He() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Ue(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function We() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Ge() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/hydration.js
var j = !1;
function Ke(e) {
	j = e;
}
var qe;
function Je(e) {
	if (e === null) throw Ue(), l;
	return qe = e;
}
function Ye() {
	return Je(/* @__PURE__ */ Nn(qe));
}
function M(e) {
	if (j) {
		if (/* @__PURE__ */ Nn(qe) !== null) throw Ue(), l;
		qe = e;
	}
}
function Xe(e = 1) {
	if (j) {
		for (var t = e, n = qe; t--;) n = /* @__PURE__ */ Nn(n);
		qe = n;
	}
}
function Ze(e = !0) {
	for (var t = 0, n = qe;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ Nn(n);
		e && n.remove(), n = i;
	}
}
function Qe(e) {
	if (!e || e.nodeType !== 8) throw Ue(), l;
	return e.data;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/reactivity/equality.js
function $e(e) {
	return e === this.v;
}
function et(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function tt(e) {
	return !et(e, this.v);
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/flags/index.js
var nt = !1, rt = !1;
function it() {
	rt = !0;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/context.js
var at = null;
function ot(e) {
	at = e;
}
function st(e) {
	return ft("getContext").get(e);
}
function ct(e, t) {
	let n = ft("setContext");
	if (nt) {
		var r = B.f;
		!Sr && r & 32 && !at.i || Le();
	}
	return n.set(e, t), t;
}
function lt(e, t = !1, n) {
	at = {
		p: at,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: B,
		l: rt && !t ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function ut(e) {
	var t = at, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Zn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, at = t.p, e ?? {};
}
function dt() {
	return !rt || at !== null && at.l === null;
}
function ft(e) {
	return at === null && Oe(e), at.c ??= new Map(pt(at) || void 0);
}
function pt(e) {
	let t = e.p;
	for (; t !== null;) {
		let e = t.c;
		if (e !== null) return e;
		t = t.p;
	}
	return null;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/task.js
var mt = [];
function ht() {
	var e = mt;
	mt = [], ee(e);
}
function gt(e) {
	if (mt.length === 0 && !Zt) {
		var t = mt;
		queueMicrotask(() => {
			t === mt && ht();
		});
	}
	mt.push(e);
}
function _t() {
	for (; mt.length > 0;) ht();
}
function vt(e) {
	var t = B;
	if (t === null) return Sr.f |= _e, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	yt(e, t);
}
function yt(e, t) {
	if (!(t !== null && t.f & 16384)) {
		for (; t !== null;) {
			if (t.f & 128) {
				if (!(t.f & 32768)) throw e;
				try {
					t.b.error(e);
					return;
				} catch (t) {
					e = t;
				}
			}
			t = t.parent;
		}
		throw e;
	}
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/reactivity/status.js
var bt = ~(ae | A | ie);
function xt(e, t) {
	e.f = e.f & bt | t;
}
function St(e) {
	e.f & 512 || e.deps === null ? xt(e, ie) : xt(e, A);
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/reactivity/utils.js
function Ct(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= me, Ct(t.deps));
}
function wt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Ct(e.deps), xt(e, ie);
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/reactivity/store.js
var Tt = !1, Et = !1;
function Dt(e) {
	var t = Et;
	try {
		return Et = !1, [e(), Et];
	} finally {
		Et = t;
	}
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/reactivity/create-subscriber.js
function Ot(e) {
	let t = 0, n = gn(0), r;
	return () => {
		Jn() && (V(n), rr(() => (t === 0 && (r = Kr(() => e(() => xn(n)))), t += 1, () => {
			gt(() => {
				--t, t === 0 && (r?.(), r = void 0, xn(n));
			});
		})));
	};
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var kt = ue | de;
function At(e, t, n, r) {
	new jt(e, t, n, r);
}
var jt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = j ? qe : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = /* @__PURE__ */ new Set();
	#p = /* @__PURE__ */ new Set();
	#m = null;
	#h = Ot(() => (this.#m = gn(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = B;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = B.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = ir(() => {
			if (j) {
				let e = this.#t;
				Ye();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, kt), j && (this.#e = qe);
	}
	#g() {
		try {
			this.#a = or(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = or(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = or(() => e(this.#e)), gt(() => {
			var e = this.#c = document.createDocumentFragment(), t = jn();
			e.append(t), this.#a = this.#x(() => or(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, pr(this.#o, () => {
				this.#o = null;
			}), this.#b(qt));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = or(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				_r(this.#a, e);
				let t = this.#n.pending;
				this.#o = or(() => t(this.#e));
			} else this.#b(qt);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		wt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = B, n = Sr, r = at;
		Tr(this.#i), wr(this.#i), ot(this.#i.ctx);
		try {
			return rn.ensure(), e();
		} catch (e) {
			return vt(e), null;
		} finally {
			Tr(t), wr(n), ot(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && pr(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, gt(() => {
			this.#d = !1, this.#m && vn(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), V(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		qt?.is_fork ? (this.#a && qt.skip_effect(this.#a), this.#o && qt.skip_effect(this.#o), this.#s && qt.skip_effect(this.#s), qt.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (ur(this.#a), null), this.#o &&= (ur(this.#o), null), this.#s &&= (ur(this.#s), null), j && (Je(this.#t), Xe(), Je(Ze()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Ge();
				return;
			}
			r = !0, i && Ve(), this.#s !== null && pr(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				yt(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return or(() => {
						var t = B;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return yt(e, this.#i.parent), null;
				}
			}));
		};
		gt(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				yt(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => yt(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/reactivity/async.js
function Mt(e, t, n, r) {
	let i = dt() ? It : zt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = B, c = Nt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				yt(e, s);
			}
			Pt();
		}
	}
	var d = Ft();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ Rt(e))).then(u).catch((e) => yt(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), Pt();
	}) : f();
}
function Nt() {
	var e = B, t = Sr, n = at, r = qt;
	return function(i = !0) {
		Tr(e), wr(t), ot(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function Pt(e = !0) {
	Tr(null), wr(null), ot(null), e && qt?.deactivate();
}
function Ft() {
	var e = B, t = e.b, n = qt, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function It(e) {
	var t = 2 | ae;
	return B !== null && (B.f |= de), {
		ctx: at,
		deps: null,
		effects: null,
		equals: $e,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: u,
		wv: 0,
		parent: B,
		ac: null
	};
}
var Lt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Rt(e, t, n) {
	let r = B;
	r === null && ke();
	var i = void 0, a = gn(u), o = !Sr, s = /* @__PURE__ */ new Set();
	return nr(() => {
		var t = B, n = te();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== Ee && n.reject(e);
			}).finally(Pt);
		} catch (e) {
			n.reject(e), Pt();
		}
		var c = qt;
		if (o) {
			if (t.f & 32768) var l = Ft();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(Lt);
			else for (let e of s.values()) e.reject(Lt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== Lt && (c.activate(), t ? (a.f |= _e, vn(a, t)) : (a.f & 8388608 && (a.f ^= _e), vn(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Yn(() => {
		for (let e of s) e.reject(Lt);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === i ? e(a) : t(i);
			}
			n.then(r, r);
		}
		t(i);
	});
}
/*#__NO_SIDE_EFFECTS__*/
function N(e) {
	let t = /* @__PURE__ */ It(e);
	return nt || Dr(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function zt(e) {
	let t = /* @__PURE__ */ It(e);
	return t.equals = tt, t;
}
function Bt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) ur(t[n]);
	}
}
function Vt(e) {
	var t, n = B, r = e.parent;
	if (!br && r !== null && e.v !== u && r.f & 24576) return He(), e.v;
	Tr(r);
	try {
		e.f &= ~me, Bt(e), t = zr(e);
	} finally {
		Tr(n);
	}
	return t;
}
function Ht(e) {
	var t = Vt(e);
	if (!e.equals(t) && (e.wv = Ir(), (!qt?.is_fork || e.deps === null) && (qt === null ? e.v = t : (qt.capture(e, t, !0), Jt?.capture(e, t, !0)), e.deps === null))) {
		xt(e, ie);
		return;
	}
	br || (Yt === null ? St(e) : (Jn() || qt?.is_fork) && Yt.set(e, t));
}
function Ut(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(Ee), t.fn !== null && (t.teardown = D), t.ac = null, Vr(t, 0), cr(t));
}
function Wt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Hr(t);
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/reactivity/batch.js
var Gt = null, Kt = null, qt = null, Jt = null, Yt = null, Xt = null, Zt = !1, Qt = !1, $t = null, en = null, tn = 0, nn = 1, rn = class e {
	id = nn++;
	#e = !1;
	linked = !0;
	#t = null;
	#n = null;
	async_deriveds = /* @__PURE__ */ new Map();
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = /* @__PURE__ */ new Set();
	#a = 0;
	#o = /* @__PURE__ */ new Map();
	#s = null;
	#c = [];
	#l = [];
	#u = /* @__PURE__ */ new Set();
	#d = /* @__PURE__ */ new Set();
	#f = /* @__PURE__ */ new Map();
	#p = /* @__PURE__ */ new Set();
	is_fork = !1;
	#m = !1;
	constructor() {
		Kt === null ? Gt = Kt = this : (Kt.#n = this, this.#t = Kt), Kt = this;
	}
	#h() {
		if (this.is_fork) return !0;
		for (let n of this.#o.keys()) {
			for (var e = n, t = !1; e.parent !== null;) {
				if (this.#f.has(e)) {
					t = !0;
					break;
				}
				e = e.parent;
			}
			if (!t) return !0;
		}
		return !1;
	}
	skip_effect(e) {
		this.#f.has(e) || this.#f.set(e, {
			d: [],
			m: []
		}), this.#p.delete(e);
	}
	unskip_effect(e, t = (e) => this.schedule(e)) {
		var n = this.#f.get(e);
		if (n) {
			this.#f.delete(e);
			for (var r of n.d) xt(r, ae), t(r);
			for (r of n.m) xt(r, A), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, tn++ > 1e3 && (this.#S(), an());
		for (let e of this.#u) this.#d.delete(e), xt(e, ae), this.schedule(e);
		for (let e of this.#d) xt(e, A), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = $t = [], r = [], i = en = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw fn(e), this.#h() || this.discard(), t;
		}
		if (qt = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if ($t = null, en = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) dn(e, t);
			i.length > 0 && qt.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Jt = this, sn(r), sn(n), Jt = null, this.#s?.resolve();
		var s = qt;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && (this.#S(), nt && (this.#x(), qt = s)), this.#c.length > 0) if (s !== null) {
			let e = s;
			e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
		} else s = this;
		s !== null && s.#g();
	}
	#_(e, t, n) {
		e.f ^= ie;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = (i & 96) != 0;
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= ie : i & 4 ? t.push(r) : nt && i & 16777224 ? n.push(r) : Lr(r) && (i & 16 && this.#d.add(r), Hr(r));
				var o = r.first;
				if (o !== null) {
					r = o;
					continue;
				}
			}
			for (; r !== null;) {
				var s = r.next;
				if (s !== null) {
					r = s;
					break;
				}
				r = r.parent;
			}
		}
	}
	#v() {
		for (var e = this.#t; e !== null;) {
			if (!e.is_fork) {
				for (let [t, [, n]] of this.current) if (e.current.has(t) && !n) return e;
			}
			e = e.#t;
		}
		return null;
	}
	#y(e) {
		for (let [t, n] of e.current) !this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n);
		for (let [t, n] of e.async_deriveds) {
			let e = this.async_deriveds.get(t);
			e && n.promise.then(e.resolve).catch(e.reject);
		}
		e.async_deriveds.clear(), this.transfer_effects(e.#u, e.#d);
		let t = (e) => {
			var n = e.reactions;
			if (n !== null) for (let e of n) {
				var r = e.f;
				if (r & 2) t(e);
				else {
					var i = e;
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), xt(i, ae), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), qt = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) wt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== u && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Yt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		qt = this;
	}
	deactivate() {
		qt = null, Yt = null;
	}
	flush() {
		try {
			Qt = !0, qt = this, this.#g();
		} finally {
			tn = 0, Xt = null, $t = null, en = null, Qt = !1, qt = null, Yt = null, mn.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(Lt);
		this.#S(), this.#s?.resolve();
	}
	register_created_effect(e) {
		this.#l.push(e);
	}
	#x() {
		for (let u = Gt; u !== null; u = u.#n) {
			var e = u.id < this.id, t = [];
			for (let [r, [i, a]] of this.current) {
				if (u.current.has(r)) {
					var n = u.current.get(r)[0];
					if (e && i !== n) u.current.set(r, [i, a]);
					else continue;
				}
				t.push(r);
			}
			if (e) for (let [e, t] of this.async_deriveds) {
				let n = u.async_deriveds.get(e);
				n && t.promise.then(n.resolve).catch(n.reject);
			}
			var r = [...u.current.keys()].filter((e) => !u.current.get(e)[1]);
			if (!(!u.#e || r.length === 0)) {
				var i = r.filter((e) => !this.current.has(e));
				if (i.length === 0) e && u.discard();
				else if (t.length > 0) {
					if (e) for (let e of this.#p) u.unskip_effect(e, (e) => {
						e.f & 4194320 ? u.schedule(e) : u.#b([e]);
					});
					u.activate();
					var a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
					for (var s of t) cn(s, i, a, o);
					o = /* @__PURE__ */ new Map();
					var c = [...u.current].filter(([e, t]) => {
						let n = this.current.get(e);
						return n ? n[0] !== t[0] || n[1] !== t[1] : !0;
					}).map(([e]) => e);
					if (c.length > 0) for (let e of this.#l) !(e.f & 155648) && ln(e, c, o) && (e.f & 4194320 ? (xt(e, ae), u.schedule(e)) : u.#u.add(e));
					if (u.#c.length > 0 && !u.#m) {
						u.apply();
						for (var l of u.#c) u.#_(l, [], []);
						u.#c = [];
					}
					u.deactivate();
				}
			}
		}
	}
	increment(e, t) {
		if (this.#a += 1, e) {
			let e = this.#o.get(t) ?? 0;
			this.#o.set(t, e + 1);
		}
	}
	decrement(e, t) {
		if (--this.#a, e) {
			let e = this.#o.get(t) ?? 0;
			e === 1 ? this.#o.delete(t) : this.#o.set(t, e - 1);
		}
		this.#m || (this.#m = !0, gt(() => {
			this.#m = !1, this.linked && this.flush();
		}));
	}
	transfer_effects(e, t) {
		for (let t of e) this.#u.add(t);
		for (let e of t) this.#d.add(e);
		e.clear(), t.clear();
	}
	oncommit(e) {
		this.#r.add(e);
	}
	ondiscard(e) {
		this.#i.add(e);
	}
	settled() {
		return (this.#s ??= te()).promise;
	}
	static ensure() {
		if (qt === null) {
			let t = qt = new e();
			!Qt && !Zt && gt(() => {
				t.#e || t.flush();
			});
		}
		return qt;
	}
	apply() {
		if (!nt || !this.is_fork && this.#t === null && this.#n === null) {
			Yt = null;
			return;
		}
		Yt = /* @__PURE__ */ new Map();
		for (let [e, [t]] of this.current) Yt.set(e, t);
		for (let t = Gt; t !== null; t = t.#n) if (!(t === this || t.is_fork)) {
			var e = !1;
			if (t.id < this.id) {
				for (let [n, [, r]] of t.current) if (!r && this.current.has(n)) {
					e = !0;
					break;
				}
			}
			if (!e) for (let [e, n] of t.previous) Yt.has(e) || Yt.set(e, n);
		}
	}
	schedule(e) {
		if (Xt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if ($t !== null && t === B && (nt || (Sr === null || !(Sr.f & 2)) && !Tt)) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= ie;
			}
		}
		this.#c.push(t);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null ? Gt = t : e.#n = t, t === null ? Kt = e : t.#t = e, this.linked = !1;
		}
	}
};
function P(e) {
	var t = Zt;
	Zt = !0;
	try {
		var n;
		for (e && (qt !== null && !qt.is_fork && qt.flush(), n = e());;) {
			if (_t(), qt === null) return n;
			qt.flush();
		}
	} finally {
		Zt = t;
	}
}
function an() {
	try {
		Pe();
	} catch (e) {
		yt(e, Xt);
	}
}
var on = null;
function sn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Lr(r) && (on = /* @__PURE__ */ new Set(), Hr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && fr(r), on?.size > 0)) {
				mn.clear();
				for (let e of on) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) on.has(n) && (on.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Hr(n);
					}
				}
				on.clear();
			}
		}
		on = null;
	}
}
function cn(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? cn(i, t, n, r) : e & 4194320 && !(e & 2048) && ln(i, t, r) && (xt(i, ae), un(i));
	}
}
function ln(e, t, n) {
	let r = n.get(e);
	if (r !== void 0) return r;
	if (e.deps !== null) for (let r of e.deps) {
		if (g.call(t, r)) return !0;
		if (r.f & 2 && ln(r, t, n)) return n.set(r, !0), !0;
	}
	return n.set(e, !1), !1;
}
function un(e) {
	qt.schedule(e);
}
function dn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), xt(e, ie);
		for (var n = e.first; n !== null;) dn(n, t), n = n.next;
	}
}
function fn(e) {
	xt(e, ie);
	for (var t = e.first; t !== null;) fn(t), t = t.next;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/reactivity/sources.js
var pn = /* @__PURE__ */ new Set(), mn = /* @__PURE__ */ new Map(), hn = !1;
function gn(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: $e,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function F(e, t) {
	let n = gn(e, t);
	return Dr(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function _n(e, t = !1, n = !0) {
	let r = gn(e);
	return t || (r.equals = tt), rt && n && at !== null && at.l !== null && (at.l.s ??= []).push(r), r;
}
function I(e, t, n = !1) {
	return Sr !== null && (!Cr || Sr.f & 131072) && dt() && Sr.f & 4325394 && (Er === null || !Er.has(e)) && Be(), vn(e, n ? Cn(t) : t, en);
}
function vn(e, t, n = null) {
	if (!e.equals(t)) {
		mn.set(e, br ? t : e.v);
		var r = rn.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Vt(t), Yt === null && St(t);
		}
		e.wv = Ir(), Sn(e, ae, n), dt() && B !== null && B.f & 1024 && !(B.f & 96) && (Ar === null ? jr([e]) : Ar.push(e)), !r.is_fork && pn.size > 0 && !hn && yn();
	}
	return t;
}
function yn() {
	hn = !1;
	for (let e of pn) {
		e.f & 1024 && xt(e, A);
		let t;
		try {
			t = Lr(e);
		} catch {
			t = !0;
		}
		t && Hr(e);
	}
	pn.clear();
}
function bn(e, t = 1) {
	var n = V(e), r = t === 1 ? n++ : n--;
	return I(e, n), r;
}
function xn(e) {
	I(e, e.v + 1);
}
function Sn(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = dt(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === B)) {
			var l = (c & ae) === 0;
			if (l && xt(s, t), c & 131072) pn.add(s);
			else if (c & 2) {
				var u = s;
				Yt?.delete(u), c & 65536 || (c & 512 && (B === null || !(B.f & 2097152)) && (s.f |= me), Sn(u, A, n));
			} else if (l) {
				var d = s;
				c & 16 && on !== null && on.add(d), n === null ? un(d) : n.push(d);
			}
		}
	}
}
function Cn(e) {
	if (typeof e != "object" || !e || ve in e) return e;
	let t = w(e);
	if (t !== S && t !== C) return e;
	var n = /* @__PURE__ */ new Map(), r = m(e), i = /* @__PURE__ */ F(0), a = null, o = Pr, s = (e) => {
		if (Pr === o) return e();
		var t = Sr, n = Pr;
		wr(null), Fr(o);
		var r = e();
		return wr(t), Fr(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ F(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			(!("value" in r) || r.configurable === !1 || r.enumerable === !1 || r.writable === !1) && Re();
			var i = n.get(t);
			return i === void 0 ? s(() => {
				var e = /* @__PURE__ */ F(r.value, a);
				return n.set(t, e), e;
			}) : I(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = s(() => /* @__PURE__ */ F(u, a));
					n.set(t, e), xn(i);
				}
			} else I(r, u), xn(i);
			return !0;
		},
		get(t, r, i) {
			if (r === ve) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || b(t, r)?.writable) && (o = s(() => /* @__PURE__ */ F(Cn(c ? t[r] : u), a)), n.set(r, o)), o !== void 0) {
				var l = V(o);
				return l === u ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var r = Reflect.getOwnPropertyDescriptor(e, t);
			if (r && "value" in r) {
				var i = n.get(t);
				i && (r.value = V(i));
			} else if (r === void 0) {
				var a = n.get(t), o = a?.v;
				if (a !== void 0 && o !== u) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === ve) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== u || Reflect.has(e, t);
			return (r !== void 0 || B !== null && (!i || b(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ F(i ? Cn(e[t]) : u, a)), n.set(t, r)), V(r) === u) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), d = t in e;
			if (r && t === "length") for (var f = o; f < l.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = s(() => /* @__PURE__ */ F(u, a)), n.set(f + "", p)) : I(p, u);
			}
			if (l === void 0) (!d || b(e, t)?.writable) && (l = s(() => /* @__PURE__ */ F(void 0, a)), I(l, Cn(o)), n.set(t, l));
			else {
				d = l.v !== u;
				var m = s(() => Cn(o));
				I(l, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(c, o), !d) {
				if (r && typeof t == "string") {
					var g = n.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && I(g, _ + 1);
				}
				xn(i);
			}
			return !0;
		},
		ownKeys(e) {
			V(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== u;
			});
			for (var [r, a] of n) a.v !== u && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			ze();
		}
	});
}
function wn(e) {
	try {
		if (typeof e == "object" && e && ve in e) return e[ve];
	} catch {}
	return e;
}
function Tn(e, t) {
	return Object.is(wn(e), wn(t));
}
new Set([
	"copyWithin",
	"fill",
	"pop",
	"push",
	"reverse",
	"shift",
	"sort",
	"splice",
	"unshift"
]);
var En, Dn, On, kn;
function An() {
	if (En === void 0) {
		En = window, Dn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		On = b(t, "firstChild").get, kn = b(t, "nextSibling").get, T(e) && (e[Se] = void 0, e[xe] = null, e[Ce] = void 0, e.__e = void 0), T(n) && (n[we] = void 0);
	}
}
function jn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Mn(e) {
	return On.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Nn(e) {
	return kn.call(e);
}
function L(e, t) {
	if (!j) return /* @__PURE__ */ Mn(e);
	var n = /* @__PURE__ */ Mn(qe);
	if (n === null) n = qe.appendChild(jn());
	else if (t && n.nodeType !== 3) {
		var r = jn();
		return n?.before(r), Je(r), r;
	}
	return t && Rn(n), Je(n), n;
}
function Pn(e, t = !1) {
	if (!j) {
		var n = /* @__PURE__ */ Mn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Nn(n) : n;
	}
	if (t) {
		if (qe?.nodeType !== 3) {
			var r = jn();
			return qe?.before(r), Je(r), r;
		}
		Rn(qe);
	}
	return qe;
}
function R(e, t = 1, n = !1) {
	let r = j ? qe : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ Nn(r);
	if (!j) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = jn();
			return r === null ? i?.after(a) : r.before(a), Je(a), a;
		}
		Rn(r);
	}
	return Je(r), r;
}
function Fn(e) {
	e.textContent = "";
}
function In() {
	return !nt || on !== null ? !1 : (B.f & ce) !== 0;
}
function Ln(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function Rn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/elements/misc.js
function zn(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, gt(() => {
			document.activeElement === t && e.focus();
		});
	}
}
var Bn = !1;
function Vn() {
	Bn || (Bn = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[Te]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Hn(e, t, n, r = !0) {
	r && n();
	for (var i of t) e.addEventListener(i, n);
	Yn(() => {
		for (var r of t) e.removeEventListener(r, n);
	});
}
function Un(e) {
	var t = Sr, n = B;
	wr(null), Tr(null);
	try {
		return e();
	} finally {
		wr(t), Tr(n);
	}
}
function Wn(e, t, n, r = n) {
	e.addEventListener(t, () => Un(n));
	let i = e[Te];
	i ? e[Te] = () => {
		i(), r(!0);
	} : e[Te] = () => r(!0), Vn();
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/reactivity/effects.js
function Gn(e) {
	B === null && (Sr === null && Ne(e), Me()), br && je(e);
}
function Kn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function qn(e, t) {
	var n = B;
	n !== null && n.f & 8192 && (e |= oe);
	var r = {
		ctx: at,
		deps: null,
		nodes: null,
		f: e | ae | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	qt?.register_created_effect(r);
	var i = r;
	if (e & 4) $t === null ? rn.ensure().schedule(r) : $t.push(r);
	else if (t !== null) {
		try {
			Hr(r);
		} catch (e) {
			throw ur(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= ue));
	}
	if (i !== null && (i.parent = n, n !== null && Kn(i, n), Sr !== null && Sr.f & 2 && !(e & 64))) {
		var a = Sr;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Jn() {
	return Sr !== null && !Cr;
}
function Yn(e) {
	let t = qn(8, null);
	return xt(t, ie), t.teardown = e, t;
}
function Xn(e) {
	Gn("$effect");
	var t = B.f;
	if (!Sr && t & 32 && at !== null && !at.i) {
		var n = at;
		(n.e ??= []).push(e);
	} else return Zn(e);
}
function Zn(e) {
	return qn(4 | fe, e);
}
function Qn(e) {
	return Gn("$effect.pre"), qn(8 | fe, e);
}
function $n(e) {
	rn.ensure();
	let t = qn(64 | de, e);
	return () => {
		ur(t);
	};
}
function er(e) {
	rn.ensure();
	let t = qn(64 | de, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? pr(t, () => {
			ur(t), n(void 0);
		}) : (ur(t), n(void 0));
	});
}
function tr(e) {
	return qn(4, e);
}
function nr(e) {
	return qn(ge | de, e);
}
function rr(e, t = 0) {
	return qn(8 | t, e);
}
function z(e, t = [], n = [], r = []) {
	Mt(r, t, n, (t) => {
		qn(8, () => {
			e(...t.map(V));
		});
	});
}
function ir(e, t = 0) {
	return qn(16 | t, e);
}
function ar(e, t = 0) {
	return qn(re | t, e);
}
function or(e) {
	return qn(32 | de, e);
}
function sr(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = br, n = Sr;
		xr(!0), wr(null);
		try {
			t.call(null);
		} finally {
			xr(e), wr(n);
		}
	}
}
function cr(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Un(() => {
			e.abort(Ee);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : ur(n, t), n = r;
	}
}
function lr(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || ur(t), t = n;
	}
}
function ur(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (dr(e.nodes.start, e.nodes.end), n = !0), e.f |= le, cr(e, t && !n), Vr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	sr(e), e.f ^= le, e.f |= se;
	var i = e.parent;
	i !== null && i.first !== null && fr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function dr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ Nn(e);
		e.remove(), e = n;
	}
}
function fr(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function pr(e, t, n = !0) {
	var r = [];
	mr(e, r, !0);
	var i = () => {
		n && ur(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function mr(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= oe;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				mr(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function hr(e) {
	gr(e, !0);
}
function gr(e, t) {
	if (e.f & 8192) {
		e.f ^= oe, e.f & 1024 || (xt(e, ae), rn.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			gr(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function _r(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ Nn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/legacy.js
var vr = null, yr = !1, br = !1;
function xr(e) {
	br = e;
}
var Sr = null, Cr = !1;
function wr(e) {
	Sr = e;
}
var B = null;
function Tr(e) {
	B = e;
}
var Er = null;
function Dr(e) {
	Sr !== null && (!nt || Sr.f & 2) && (Er ??= /* @__PURE__ */ new Set()).add(e);
}
var Or = null, kr = 0, Ar = null;
function jr(e) {
	Ar = e;
}
var Mr = 1, Nr = 0, Pr = Nr;
function Fr(e) {
	Pr = e;
}
function Ir() {
	return ++Mr;
}
function Lr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~me), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Lr(a) && Ht(a), a.wv > e.wv) return !0;
		}
		t & 512 && Yt === null && xt(e, ie);
	}
	return !1;
}
function Rr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(!nt && Er !== null && Er.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Rr(a, t, !1) : t === a && (n ? xt(a, ae) : a.f & 1024 && xt(a, A), un(a));
	}
}
function zr(e) {
	var t = Or, n = kr, r = Ar, i = Sr, a = Er, o = at, s = Cr, c = Pr, l = e.f;
	Or = null, kr = 0, Ar = null, Sr = l & 96 ? null : e, Er = null, ot(e.ctx), Cr = !1, Pr = ++Nr, e.ac !== null && (Un(() => {
		e.ac.abort(Ee);
	}), e.ac = null);
	try {
		e.f |= he;
		var u = e.fn, d = u();
		e.f |= ce;
		var f = e.deps, p = qt?.is_fork;
		if (Or !== null) {
			var m;
			if (p || Vr(e, kr), f !== null && kr > 0) for (f.length = kr + Or.length, m = 0; m < Or.length; m++) f[kr + m] = Or[m];
			else e.deps = f = Or;
			if (Jn() && e.f & 512) for (m = kr; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && kr < f.length && (Vr(e, kr), f.length = kr);
		if (dt() && Ar !== null && !Cr && f !== null && !(e.f & 6146)) for (m = 0; m < Ar.length; m++) Rr(Ar[m], e);
		if (i !== null && i !== e) {
			if (Nr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Nr;
			if (t !== null) for (let e of t) e.rv = Nr;
			Ar !== null && (r === null ? r = Ar : r.push(...Ar));
		}
		return e.f & 8388608 && (e.f ^= _e), d;
	} catch (e) {
		return vt(e);
	} finally {
		e.f ^= he, Or = t, kr = n, Ar = r, Sr = i, Er = a, ot(o), Cr = s, Pr = c;
	}
}
function Br(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = h.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (Or === null || !g.call(Or, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~me), a.v !== u && St(a), Ut(a), Vr(a, 0);
	}
}
function Vr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Br(e, n[r]);
}
function Hr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		xt(e, ie);
		var n = B, r = yr;
		B = e, yr = !0;
		try {
			t & 16777232 ? lr(e) : cr(e), sr(e);
			var i = zr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Mr;
		} finally {
			yr = r, B = n;
		}
	}
}
async function Ur() {
	if (nt) return new Promise((e) => {
		requestAnimationFrame(() => e()), setTimeout(() => e());
	});
	await Promise.resolve(), P();
}
function V(e) {
	var t = (e.f & 2) != 0;
	if (vr?.add(e), Sr !== null && !Cr && !(B !== null && B.f & 16384) && (Er === null || !Er.has(e))) {
		var n = Sr.deps;
		if (Sr.f & 2097152) e.rv < Nr && (e.rv = Nr, Or === null && n !== null && n[kr] === e ? kr++ : Or === null ? Or = [e] : Or.push(e));
		else {
			Sr.deps ??= [], g.call(Sr.deps, e) || Sr.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [Sr] : g.call(r, Sr) || r.push(Sr);
		}
	}
	if (br && mn.has(e)) return mn.get(e);
	if (t) {
		var i = e;
		if (br) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || Gr(i)) && (a = Vt(i)), mn.set(i, a), a;
		}
		var o = (i.f & 512) == 0 && !Cr && Sr !== null && (yr || (Sr.f & 512) != 0), s = (i.f & ce) === 0;
		Lr(i) && (o && (i.f |= 512), Ht(i)), o && !s && (Wt(i), Wr(i));
	}
	if (Yt?.has(e)) return Yt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Wr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Wt(t), Wr(t));
}
function Gr(e) {
	if (e.v === u) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (mn.has(t) || t.f & 2 && Gr(t)) return !0;
	return !1;
}
function Kr(e) {
	var t = Cr;
	try {
		return Cr = !0, e();
	} finally {
		Cr = t;
	}
}
function qr(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (ve in e) Jr(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && ve in n && Jr(n);
		}
	}
}
function Jr(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			Jr(e[n], t);
		} catch {}
		let n = w(e);
		if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
			let t = x(n);
			for (let n in t) {
				let r = t[n].get;
				if (r) try {
					r.call(e);
				} catch {}
			}
		}
	}
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/elements/events.js
var Yr = Symbol("events"), Xr = /* @__PURE__ */ new Set(), Zr = /* @__PURE__ */ new Set();
function Qr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || ri.call(t, e), !e.cancelBubble) return Un(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? gt(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function $r(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Qr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Yn(() => {
		t.removeEventListener(e, o, a);
	});
}
function ei(e, t, n) {
	(t[Yr] ??= {})[e] = n;
}
function ti(e) {
	for (var t = 0; t < e.length; t++) Xr.add(e[t]);
	for (var n of Zr) n(e);
}
var ni = null;
function ri(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	ni = e;
	var o = 0, s = ni === e && e[Yr];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[Yr] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		y(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = Sr, d = B;
		wr(null), Tr(null);
		try {
			for (var f, p = []; a !== null && a !== t;) {
				try {
					var m = a[Yr]?.[r];
					m != null && (!a.disabled || e.target === a) && m.call(a, e);
				} catch (e) {
					f ? p.push(e) : f = e;
				}
				if (e.cancelBubble) break;
				o++, a = o < i.length ? i[o] : null;
			}
			if (f) {
				for (let e of p) queueMicrotask(() => {
					throw e;
				});
				throw f;
			}
		} finally {
			e[Yr] = t, delete e.currentTarget, wr(u), Tr(d);
		}
	}
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/reconciler.js
var ii = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function ai(e) {
	return ii?.createHTML(e) ?? e;
}
function oi(e) {
	var t = Ln("template");
	return t.innerHTML = ai(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/template.js
function si(e, t) {
	var n = B;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function H(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (j) return si(qe, null), qe;
		i === void 0 && (i = oi(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Mn(i)));
		var t = r || Dn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Mn(t), s = t.lastChild;
			si(o, s);
		} else si(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ci(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = (t & 1) != 0, a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (j) return si(qe, null), qe;
		if (!o) {
			var e = /* @__PURE__ */ Mn(oi(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ Mn(e);) o.appendChild(/* @__PURE__ */ Mn(e));
			else o = /* @__PURE__ */ Mn(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ Mn(t), r = t.lastChild;
			si(n, r);
		} else si(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function li(e, t) {
	return /* @__PURE__ */ ci(e, t, "svg");
}
function ui(e = "") {
	if (!j) {
		var t = jn(e + "");
		return si(t, t), t;
	}
	var n = qe;
	return n.nodeType === 3 ? Rn(n) : (n.before(n = jn()), Je(n)), si(n, n), n;
}
function di() {
	if (j) return si(qe, null), qe;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = jn();
	return e.append(t, n), si(t, n), e;
}
function U(e, t) {
	if (j) {
		var n = B;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = qe), Ye();
		return;
	}
	e !== null && e.before(t);
}
function fi(e) {
	return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
var pi = [
	"beforeinput",
	"click",
	"change",
	"dblclick",
	"contextmenu",
	"focusin",
	"focusout",
	"input",
	"keydown",
	"keyup",
	"mousedown",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup",
	"pointerdown",
	"pointermove",
	"pointerout",
	"pointerover",
	"pointerup",
	"touchend",
	"touchmove",
	"touchstart"
];
function mi(e) {
	return pi.includes(e);
}
var hi = /* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split("."), gi = {
	formnovalidate: "formNoValidate",
	ismap: "isMap",
	nomodule: "noModule",
	playsinline: "playsInline",
	readonly: "readOnly",
	defaultvalue: "defaultValue",
	defaultchecked: "defaultChecked",
	srcobject: "srcObject",
	novalidate: "noValidate",
	allowfullscreen: "allowFullscreen",
	disablepictureinpicture: "disablePictureInPicture",
	disableremoteplayback: "disableRemotePlayback"
};
function _i(e) {
	return e = e.toLowerCase(), gi[e] ?? e;
}
[...hi];
var vi = ["touchstart", "touchmove"];
function yi(e) {
	return vi.includes(e);
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/render.js
var bi = !0;
function W(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[we] ??= e.nodeValue) && (e[we] = n, e.nodeValue = `${n}`);
}
function xi(e, t) {
	return wi(e, t);
}
function Si(e, t) {
	An(), t.intro = t.intro ?? !1;
	let n = t.target, r = j, i = qe;
	try {
		for (var a = /* @__PURE__ */ Mn(n); a && (a.nodeType !== 8 || a.data !== "[");) a = /* @__PURE__ */ Nn(a);
		if (!a) throw l;
		Ke(!0), Je(a);
		let r = wi(e, {
			...t,
			anchor: a
		});
		return Ke(!1), r;
	} catch (r) {
		if (r instanceof Error && r.message.split("\n").some((e) => e.startsWith("https://svelte.dev/e/"))) throw r;
		return r !== l && console.warn("Failed to hydrate: ", r), t.recover === !1 && Fe(), An(), Fn(n), Ke(!1), xi(e, t);
	} finally {
		Ke(r), Je(i);
	}
}
var Ci = /* @__PURE__ */ new Map();
function wi(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	An();
	var c = void 0, u = er(() => {
		var u = n ?? t.appendChild(jn());
		At(u, { pending: () => {} }, (t) => {
			lt({});
			var n = at;
			if (a && (n.c = a), i && (r.$$events = i), j && si(t, null), bi = o, c = e(t, r) || {}, bi = !0, j && (B.nodes.end = qe, qe === null || qe.nodeType !== 8 || qe.data !== "]")) throw Ue(), l;
			ut();
		}, s);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = yi(r);
					for (let e of [t, document]) {
						var a = Ci.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Ci.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, ri, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(_(Xr)), Zr.add(f), () => {
			for (var e of d) for (let n of [t, document]) {
				var r = Ci.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, ri), r.delete(e), r.size === 0 && Ci.delete(n)) : r.set(e, i);
			}
			Zr.delete(f), u !== n && u.parentNode?.removeChild(u);
		};
	});
	return Ti.set(c, u), c;
}
var Ti = /* @__PURE__ */ new WeakMap();
function Ei(e, t) {
	let n = Ti.get(e);
	return n ? (Ti.delete(e), n(t)) : Promise.resolve();
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Di = class {
	anchor;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = !0;
	constructor(e, t = !0) {
		this.anchor = e, this.#i = t;
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e), n = this.#t.get(t);
			if (n) hr(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (hr(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (ur(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						_r(r, t), t.append(jn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else ur(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), pr(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (ur(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = qt, r = In();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = jn();
			i.append(a), this.#n.set(e, {
				effect: or(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, or(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else j && (this.anchor = qe), this.#a(n);
	}
};
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function Oi(e, t, ...n) {
	var r = new Di(e);
	ir(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, ue);
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/blocks/if.js
function G(e, t, n = !1) {
	var r;
	j && (r = qe, Ye());
	var i = new Di(e), a = n ? ue : 0;
	function o(e, t) {
		if (j) {
			var n = Qe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ze();
				Je(a), i.anchor = a, Ke(!1), i.ensure(e, t), Ke(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	ir(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/blocks/each.js
function ki(e, t) {
	return t;
}
function Ai(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		pr(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					ji(e, _(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null;
		if (c) {
			var l = n, u = l.parentNode;
			Fn(u), u.append(l), e.items.clear();
		}
		ji(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function ji(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= pe, _r(a, document.createDocumentFragment())) : ur(t[i], n);
	}
}
var Mi;
function Ni(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = j ? Je(/* @__PURE__ */ Mn(c)) : c.appendChild(jn());
	}
	j && Ye();
	var l = null, u = /* @__PURE__ */ zt(() => {
		var e = n();
		return m(e) ? e : e == null ? [] : _(e);
	}), d, f = /* @__PURE__ */ new Map(), p = !0;
	function h(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = l, Fi(v, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= pe, Li(l, null, o)) : hr(l) : pr(l, () => {
			l = null;
		})));
	}
	function g(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: ir(() => {
			d = V(u);
			var e = d.length;
			let c = !1;
			j && Qe(o) === "[!" != (e === 0) && (o = Ze(), Je(o), Ke(!1), c = !0);
			for (var m = /* @__PURE__ */ new Set(), _ = qt, v = In(), y = 0; y < e; y += 1) {
				j && qe.nodeType === 8 && qe.data === "]" && (o = qe, c = !0, Ke(!1));
				var b = d[y], x = r(b, y), S = p ? null : s.get(x);
				S ? (S.v && vn(S.v, b), S.i && vn(S.i, y), v && _.unskip_effect(S.e)) : (S = Ii(s, p ? o : Mi ??= jn(), b, x, y, i, t, n), p || (S.e.f |= pe), s.set(x, S)), m.add(x);
			}
			if (e === 0 && a && !l && (p ? l = or(() => a(o)) : (l = or(() => a(Mi ??= jn())), l.f |= pe)), e > m.size && Ae("", "", ""), j && e > 0 && Je(Ze()), !p) if (f.set(_, m), v) {
				for (let [e, t] of s) m.has(e) || _.skip_effect(t.e);
				_.oncommit(h), _.ondiscard(g);
			} else h(_);
			c && Ke(!0), V(u);
		}),
		flags: t,
		items: s,
		pending: f,
		outrogroups: null,
		fallback: l
	};
	p = !1, j && (o = qe);
}
function Pi(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Fi(e, t, n, r, i) {
	var a = (r & 8) != 0, o = t.length, s = e.items, c = Pi(e.effect.first), l, u = null, d, f = [], p = [], m, h, g, v;
	if (a) for (v = 0; v < o; v += 1) m = t[v], h = i(m, v), g = s.get(h).e, g.f & 33554432 || (g.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(g));
	for (v = 0; v < o; v += 1) {
		if (m = t[v], h = i(m, v), g = s.get(h).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(g), t.done.delete(g);
		if (g.f & 8192 && (hr(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) if (g.f ^= pe, g === c) Li(g, null, n);
		else {
			var y = u ? u.next : c;
			g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), Ri(e, u, g), Ri(e, g, y), Li(g, y, n), u = g, f = [], p = [], c = Pi(u.next);
			continue;
		}
		if (g !== c) {
			if (l !== void 0 && l.has(g)) {
				if (f.length < p.length) {
					var b = p[0], x;
					u = b.prev;
					var S = f[0], C = f[f.length - 1];
					for (x = 0; x < f.length; x += 1) Li(f[x], b, n);
					for (x = 0; x < p.length; x += 1) l.delete(p[x]);
					Ri(e, S.prev, C.next), Ri(e, u, S), Ri(e, C, b), c = b, u = C, --v, f = [], p = [];
				} else l.delete(g), Li(g, c, n), Ri(e, g.prev, g.next), Ri(e, g, u === null ? e.effect.first : u.next), Ri(e, u, g), u = g;
				continue;
			}
			for (f = [], p = []; c !== null && c !== g;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = Pi(c.next);
			if (c === null) continue;
		}
		g.f & 33554432 || f.push(g), u = g, c = Pi(g.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (ji(e, _(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var w = [];
		if (l !== void 0) for (g of l) g.f & 8192 || w.push(g);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && w.push(c), c = Pi(c.next);
		var T = w.length;
		if (T > 0) {
			var E = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			Ai(e, w, E);
		}
	}
	a && gt(() => {
		if (d !== void 0) for (g of d) g.nodes?.a?.apply();
	});
}
function Ii(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? gn(n) : /* @__PURE__ */ _n(n, !1, !1) : null, l = o & 2 ? gn(i) : null;
	return {
		v: c,
		i: l,
		e: or(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Li(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ Nn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Ri(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function zi(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		j && (o = Je(/* @__PURE__ */ Mn(c)));
	}
	z(() => {
		var e = B;
		if (s === (s = t() ?? "")) {
			j && Ye();
			return;
		}
		if (n && !j) {
			e.nodes = null, c.innerHTML = s, s !== "" && si(/* @__PURE__ */ Mn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (dr(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (j) {
				for (var a = qe.data, u = Ye(), d = u; u !== null && (u.nodeType !== 8 || u.data !== "");) d = u, u = /* @__PURE__ */ Nn(u);
				if (u === null) throw Ue(), l;
				si(qe, d), o = Je(u);
				return;
			}
			var m = Ln(r ? "svg" : i ? "math" : "template", r ? f : i ? p : void 0);
			m.innerHTML = s;
			var h = r || i ? m : m.content;
			if (si(/* @__PURE__ */ Mn(h), h.lastChild), r || i) for (; /* @__PURE__ */ Mn(h);) o.before(/* @__PURE__ */ Mn(h));
			else o.before(h);
		}
	});
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/blocks/slot.js
function Bi(e, t, n, r, i) {
	j && Ye();
	var a = t.$$slots?.[n], o = !1;
	a === !0 && (a = t[n === "default" ? "children" : n], o = !0), a === void 0 ? i !== null && i(e) : a(e, o ? () => r : r);
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/timing.js
var Vi = () => performance.now(), Hi = {
	tick: (e) => requestAnimationFrame(e),
	now: () => Vi(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/loop.js
function Ui() {
	let e = Hi.now();
	Hi.tasks.forEach((t) => {
		t.c(e) || (Hi.tasks.delete(t), t.f());
	}), Hi.tasks.size !== 0 && Hi.tick(Ui);
}
function Wi(e) {
	let t;
	return Hi.tasks.size === 0 && Hi.tick(Ui), {
		promise: new Promise((n) => {
			Hi.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			Hi.tasks.delete(t);
		}
	};
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/elements/transitions.js
function Gi(e, t) {
	Un(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function Ki(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function qi(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = Ki(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var Ji = (e) => e, Yi = null;
function Xi(e, t, n) {
	var r = (Yi ?? B).nodes, i, a, o, s = null;
	r.a ??= {
		element: e,
		measure() {
			i = this.element.getBoundingClientRect();
		},
		apply() {
			if (o?.abort(), a = this.element.getBoundingClientRect(), i.left !== a.left || i.right !== a.right || i.top !== a.top || i.bottom !== a.bottom) {
				let e = t()(this.element, {
					from: i,
					to: a
				}, n?.());
				o = Qi(this.element, e, void 0, 1, () => {}, () => {
					o?.abort(), o = void 0;
				});
			}
		},
		fix() {
			if (!e.getAnimations().length) {
				var { position: t, width: n, height: r } = getComputedStyle(e);
				if (t !== "absolute" && t !== "fixed") {
					var a = e.style;
					s = {
						position: a.position,
						width: a.width,
						height: a.height,
						transform: a.transform
					}, a.position = "absolute", a.width = n, a.height = r;
					var o = e.getBoundingClientRect();
					if (i.left !== o.left || i.top !== o.top) {
						var c = `translate(${i.left - o.left}px, ${i.top - o.top}px)`;
						a.transform = a.transform ? `${a.transform} ${c}` : c;
					}
				}
			}
		},
		unfix() {
			if (s) {
				var t = e.style;
				t.position = s.position, t.width = s.width, t.height = s.height, t.transform = s.transform;
			}
		}
	}, r.a.element = e;
}
function Zi(e, t, n, r) {
	var i = (e & 1) != 0, a = (e & 2) != 0, o = i && a, s = (e & 4) != 0, c = o ? "both" : i ? "in" : "out", l, u = t.inert, d = t.style.overflow, f, p;
	function m() {
		return Un(() => l ??= n()(t, r?.() ?? {}, { direction: c }));
	}
	var h = {
		is_global: s,
		in() {
			if (t.inert = u, !i) {
				p?.abort(), p?.reset?.();
				return;
			}
			a || f?.abort(), f = Qi(t, m(), p, 1, () => {
				Gi(t, "introstart");
			}, () => {
				Gi(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			});
		},
		out(e) {
			if (!a) {
				e?.(), l = void 0;
				return;
			}
			t.inert = !0, p = Qi(t, m(), f, 0, () => {
				Gi(t, "outrostart");
			}, () => {
				Gi(t, "outroend"), e?.();
			});
		},
		stop: () => {
			f?.abort(), p?.abort();
		}
	}, g = B;
	if ((g.nodes.t ??= []).push(h), i && bi) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || (v.f & 32768) != 0;
		}
		_ && tr(() => {
			Kr(() => h.in());
		});
	}
}
function Qi(e, t, n, r, i, a) {
	var o = r === 1;
	if (E(t)) {
		var s, c = !1;
		return gt(() => {
			c || (s = Qi(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
		}), {
			abort: () => {
				c = !0, s?.abort();
			},
			deactivate: () => s.deactivate(),
			reset: () => s.reset(),
			t: () => s.t()
		};
	}
	if (n?.deactivate(), !t?.duration && !t?.delay) return i(), a(), {
		abort: D,
		deactivate: D,
		reset: D,
		t: () => r
	};
	let { delay: l = 0, css: u, tick: d, easing: f = Ji } = t;
	var p = [];
	if (o && n === void 0 && (d && d(0, 1), u)) {
		var m = qi(u(0, 1));
		p.push(m, m);
	}
	var h = () => 1 - r, g = e.animate(p, {
		duration: l,
		fill: "forwards"
	});
	return g.onfinish = () => {
		g.cancel(), i();
		var o = n?.t() ?? 1 - r;
		n?.abort();
		var s = r - o, c = t.duration * Math.abs(s), l = [];
		if (c > 0) {
			var p = !1;
			if (u) for (var m = Math.ceil(c / (1e3 / 60)), _ = 0; _ <= m; _ += 1) {
				var v = o + s * f(_ / m), y = qi(u(v, 1 - v));
				l.push(y), p ||= y.overflow === "hidden";
			}
			p && (e.style.overflow = "hidden"), h = () => {
				var e = g.currentTime;
				return o + s * f(e / c);
			}, d && Wi(() => {
				if (g.playState !== "running") return !1;
				var e = h();
				return d(e, 1 - e), !0;
			});
		}
		g = e.animate(l, {
			duration: c,
			fill: "forwards"
		}), g.onfinish = () => {
			h = () => r, d?.(r, 1 - r), a();
		};
	}, {
		abort: () => {
			g && (g.cancel(), g.effect = null, g.onfinish = D);
		},
		deactivate: () => {
			a = D;
		},
		reset: () => {
			r === 0 && d?.(1, 0);
		},
		t: () => h()
	};
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/css.js
function $i(e, t) {
	tr(() => {
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = Ln("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/elements/actions.js
function ea(e, t, n) {
	tr(() => {
		var r = Kr(() => t(e, n?.()) || {});
		if (n && r?.update) {
			var i = !1, a = {};
			rr(() => {
				var e = n();
				qr(e), i && et(a, e) && (a = e, r.update(e));
			}), i = !0;
		}
		if (r?.destroy) return () => r.destroy();
	});
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/elements/attachments.js
function ta(e, t) {
	var n = void 0, r;
	ar(() => {
		n !== (n = t()) && (r &&= (ur(r), null), n && (r = or(() => {
			tr(() => n(e));
		})));
	});
}
//#endregion
//#region ../../node_modules/.bun/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function na(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = na(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function ra() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = na(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/shared/attributes.js
function ia(e) {
	return typeof e == "object" ? ra(e) : e ?? "";
}
var aa = [..." 	\n\r\f\xA0\v﻿"];
function oa(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || aa.includes(r[o - 1])) && (s === r.length || aa.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function sa(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function ca(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function la(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(ca)), i && c.push(...Object.keys(i).map(ca));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = ca(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += sa(r)), i && (n += sa(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/elements/class.js
function K(e, t, n, r, i, a) {
	var o = e[Se];
	if (j || o !== n || o === void 0) {
		var s = oa(n, r, a);
		(!j || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[Se] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/elements/style.js
function ua(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function da(e, t, n, r) {
	var i = e[Ce];
	if (j || i !== t) {
		var a = la(t, r);
		(!j || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[Ce] = t;
	} else r && (Array.isArray(r) ? (ua(e, n?.[0], r[0]), ua(e, n?.[1], r[1], "important")) : ua(e, n, r));
	return r;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function fa(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!m(t)) return We();
		for (var r of e.options) r.selected = t.includes(ma(r));
		return;
	}
	for (r of e.options) if (Tn(ma(r), t)) {
		r.selected = !0;
		return;
	}
	(!n || t !== void 0) && (e.selectedIndex = -1);
}
function pa(e) {
	var t = new MutationObserver(() => {
		fa(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), Yn(() => {
		t.disconnect();
	});
}
function ma(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ha = Symbol("class"), ga = Symbol("style"), _a = Symbol("is custom element"), va = Symbol("is html"), ya = De ? "link" : "LINK", ba = De ? "input" : "INPUT", xa = De ? "option" : "OPTION", Sa = De ? "select" : "SELECT";
function Ca(e) {
	if (j) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					q(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					q(e, "checked", null), e.checked = r;
				}
			}
		};
		e[Te] = n, gt(n), Vn();
	}
}
function wa(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function q(e, t, n, r) {
	var i = Da(e);
	j && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ya) || i[t] !== (i[t] = n) && (t === "loading" && (e[be] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ka(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function J(e, t, n) {
	var r = Sr, i = B;
	let a = j;
	j && Ke(!1), wr(null), Tr(null);
	try {
		t !== "style" && (Oa.has(e.getAttribute("is") || e.nodeName) || !customElements || customElements.get(e.getAttribute("is") || e.nodeName.toLowerCase()) ? ka(e).includes(t) : n && typeof n == "object") ? e[t] = n : q(e, t, n == null ? n : String(n));
	} finally {
		wr(r), Tr(i), a && Ke(!0);
	}
}
function Ta(e, t, n, r, i = !1, a = !1) {
	if (j && i && e.nodeName === ba) {
		var o = e;
		(o.type === "checkbox" ? "defaultChecked" : "defaultValue") in n || Ca(o);
	}
	var s = Da(e), c = s[_a], l = !s[va];
	let d = j && c;
	d && Ke(!1);
	var f = t || {}, p = e.nodeName === xa;
	for (var m in t) m in n || (n[m] = null);
	n.class ? n.class = ia(n.class) : (r || n[ha]) && (n.class = null), n[ga] && (n.style ??= null);
	var h = ka(e);
	if (e.nodeName === ba && "type" in n && ("value" in n || "__value" in n)) {
		var g = n.type;
		(g !== f.type || g === void 0 && e.hasAttribute("type")) && (f.type = g, q(e, "type", g, a));
	}
	for (let i in n) {
		let o = n[i];
		if (p && i === "value" && o == null) {
			e.value = e.__value = "", f[i] = o;
			continue;
		}
		if (i === "class") {
			K(e, e.namespaceURI === "http://www.w3.org/1999/xhtml", o, r, t?.[ha], n[ha]), f[i] = o, f[ha] = n[ha];
			continue;
		}
		if (i === "style") {
			da(e, o, t?.[ga], n[ga]), f[i] = o, f[ga] = n[ga];
			continue;
		}
		var _ = f[i];
		if (!(o === _ && !(o === void 0 && e.hasAttribute(i)))) {
			f[i] = o;
			var v = i[0] + i[1];
			if (v !== "$$") if (v === "on") {
				let t = {}, n = "$$" + i, r = i.slice(2);
				var y = mi(r);
				if (fi(r) && (r = r.slice(0, -7), t.capture = !0), !y && _) {
					if (o != null) continue;
					e.removeEventListener(r, f[n], t), f[n] = null;
				}
				if (y) ei(r, e, o), ti([r]);
				else if (o != null) {
					function a(e) {
						f[i].call(this, e);
					}
					f[n] = Qr(r, e, a, t);
				}
			} else if (i === "style") q(e, i, o);
			else if (i === "autofocus") zn(e, !!o);
			else if (!c && (i === "__value" || i === "value" && o != null)) e.value = e.__value = o;
			else if (i === "selected" && p) wa(e, o);
			else {
				var b = i;
				l || (b = _i(b));
				var x = b === "defaultValue" || b === "defaultChecked";
				if (o == null && !c && !x) if (s[i] = null, b === "value" || b === "checked") {
					let n = e, r = t === void 0;
					if (b === "value") {
						let e = n.defaultValue;
						n.removeAttribute(b), n.defaultValue = e, n.value = n.__value = r ? e : null;
					} else {
						let e = n.defaultChecked;
						n.removeAttribute(b), n.defaultChecked = e, n.checked = r ? e : !1;
					}
				} else e.removeAttribute(i);
				else x || h.includes(b) && (c || typeof o != "string") ? (e[b] = o, b in s && (s[b] = u)) : typeof o != "function" && q(e, b, o, a);
			}
		}
	}
	return d && Ke(!0), f;
}
function Ea(e, t, n = [], r = [], i = [], a, o = !1, s = !1) {
	Mt(i, n, r, (n) => {
		var r = void 0, i = {}, c = e.nodeName === Sa, l = !1;
		if (ar(() => {
			var u = t(...n.map(V)), d = Ta(e, r, u, a, o, s);
			l && c && "value" in u && fa(e, u.value);
			for (let e of Object.getOwnPropertySymbols(i)) u[e] || ur(i[e]);
			for (let t of Object.getOwnPropertySymbols(u)) {
				var f = u[t];
				t.description === "@attach" && (!r || f !== r[t]) && (i[t] && ur(i[t]), i[t] = or(() => ta(e, () => f))), d[t] = f;
			}
			r = d;
		}), c) {
			var u = e;
			tr(() => {
				fa(u, r.value, !0), pa(u);
			});
		}
		l = !0;
	});
}
function Da(e) {
	return e[xe] ??= {
		[_a]: e.nodeName.includes("-"),
		[va]: e.namespaceURI === d
	};
}
var Oa = /* @__PURE__ */ new Map();
function ka(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Oa.get(t);
	if (n) return n;
	Oa.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = x(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = w(i);
	}
	return n;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Aa(e, t, n = t) {
	Wn(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (j && e.defaultChecked !== e.checked || Kr(t) == null) && n(e.checked), rr(() => {
		e.checked = !!t();
	});
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ja(e, t) {
	return e === t || e?.[ve] === t;
}
function Ma(e = {}, t, n, r) {
	var i = at.r, a = B;
	return tr(() => {
		var o, s;
		return rr(() => {
			o = s, s = r?.() || [], Kr(() => {
				ja(n(...s), e) || (t(e, ...s), o && ja(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ja(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/elements/bindings/window.js
function Na(e, t) {
	Hn(window, ["resize"], () => Un(() => t(window[e])));
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
function Pa(e = !1) {
	let t = at, n = t.l.u;
	if (!n) return;
	let r = () => qr(t.s);
	if (e) {
		let e = 0, n = {}, i = /* @__PURE__ */ It(() => {
			let r = !1, i = t.s;
			for (let e in i) i[e] !== n[e] && (n[e] = i[e], r = !0);
			return r && e++, e;
		});
		r = () => V(i);
	}
	n.b.length && Qn(() => {
		Fa(t, r), ee(n.b);
	}), Xn(() => {
		let e = Kr(() => n.m.map(O));
		return () => {
			for (let t of e) typeof t == "function" && t();
		};
	}), n.a.length && Xn(() => {
		Fa(t, r), ee(n.a);
	});
}
function Fa(e, t) {
	if (e.l.s) for (let t of e.l.s) V(t);
	t();
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/client/reactivity/props.js
var Ia = {
	get(e, t) {
		if (!e.exclude.has(t)) return e.props[t];
	},
	set(e, t) {
		return !1;
	},
	getOwnPropertyDescriptor(e, t) {
		if (!e.exclude.has(t) && t in e.props) return {
			enumerable: !0,
			configurable: !0,
			value: e.props[t]
		};
	},
	has(e, t) {
		return e.exclude.has(t) ? !1 : t in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((t) => !e.exclude.has(t));
	}
};
/*#__NO_SIDE_EFFECTS__*/
function La(e, t, n) {
	return new Proxy({
		props: e,
		exclude: t
	}, Ia);
}
var Ra = {
	get(e, t) {
		if (!e.exclude.includes(t)) return V(e.version), t in e.special ? e.special[t]() : e.props[t];
	},
	set(e, t, n) {
		if (!(t in e.special)) {
			var r = B;
			try {
				Tr(e.parent_effect), e.special[t] = Y({ get [t]() {
					return e.props[t];
				} }, t, 4);
			} finally {
				Tr(r);
			}
		}
		return e.special[t](n), bn(e.version), !0;
	},
	getOwnPropertyDescriptor(e, t) {
		if (!e.exclude.includes(t) && t in e.props) return {
			enumerable: !0,
			configurable: !0,
			value: e.props[t]
		};
	},
	deleteProperty(e, t) {
		return e.exclude.includes(t) ? !0 : (e.exclude.push(t), bn(e.version), !0);
	},
	has(e, t) {
		return e.exclude.includes(t) ? !1 : t in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((t) => !e.exclude.includes(t));
	}
};
function za(e, t) {
	return new Proxy({
		props: e,
		exclude: t,
		special: {},
		version: gn(0),
		parent_effect: B
	}, Ra);
}
function Y(e, t, n, r) {
	var i = !rt || (n & 2) != 0, a = (n & 8) != 0, o = (n & 16) != 0, s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ It(r), V(l)) : (c && (c = !1, s = o ? Kr(r) : r), s);
	let d;
	if (a) {
		var f = ve in e || ye in e;
		d = b(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = Dt(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && Ie(t), d(p)));
	var h = i ? () => {
		var n = e[t];
		return n === void 0 ? u() : (c = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (s = void 0), n === void 0 ? s : n;
	};
	if (i && !(n & 4)) return h;
	if (d) {
		var g = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!i || !t || g || m) && d(t ? h() : e), e) : h();
		});
	}
	var _ = !1, v = (n & 1 ? It : zt)(() => (_ = !1, h()));
	a && V(v);
	var y = B;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? V(v) : i && a ? Cn(e) : e;
			return I(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return br && _ || y.f & 16384 ? v.v : V(v);
	});
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/legacy/legacy-client.js
function Ba(e) {
	return new Va(e);
}
var Va = class {
	#e;
	#t;
	constructor(e) {
		var t = /* @__PURE__ */ new Map(), n = (e, n) => {
			var r = /* @__PURE__ */ _n(n, !1, !1);
			return t.set(e, r), r;
		};
		let r = new Proxy({
			...e.props || {},
			$$events: {}
		}, {
			get(e, r) {
				return V(t.get(r) ?? n(r, Reflect.get(e, r)));
			},
			has(e, r) {
				return r === ye ? !0 : (V(t.get(r) ?? n(r, Reflect.get(e, r))), Reflect.has(e, r));
			},
			set(e, r, i) {
				return I(t.get(r) ?? n(r, i), i), Reflect.set(e, r, i);
			}
		});
		this.#t = (e.hydrate ? Si : xi)(e.component, {
			target: e.target,
			anchor: e.anchor,
			props: r,
			context: e.context,
			intro: e.intro ?? !1,
			recover: e.recover,
			transformError: e.transformError
		}), !nt && (!e?.props?.$$host || e.sync === !1) && P(), this.#e = r.$$events;
		for (let e of Object.keys(this.#t)) e === "$set" || e === "$destroy" || e === "$on" || y(this, e, {
			get() {
				return this.#t[e];
			},
			set(t) {
				this.#t[e] = t;
			},
			enumerable: !0
		});
		this.#t.$set = (e) => {
			Object.assign(r, e);
		}, this.#t.$destroy = () => {
			Ei(this.#t);
		};
	}
	$set(e) {
		this.#t.$set(e);
	}
	$on(e, t) {
		this.#e[e] = this.#e[e] || [];
		let n = (...e) => t.call(this, ...e);
		return this.#e[e].push(n), () => {
			this.#e[e] = this.#e[e].filter((e) => e !== n);
		};
	}
	$destroy() {
		this.#t.$destroy();
	}
}, Ha;
typeof HTMLElement == "function" && (Ha = class extends HTMLElement {
	$$ctor;
	$$s;
	$$c;
	$$cn = !1;
	$$d = {};
	$$r = !1;
	$$p_d = {};
	$$l = {};
	$$l_u = /* @__PURE__ */ new Map();
	$$me;
	$$shadowRoot = null;
	constructor(e, t, n) {
		super(), this.$$ctor = e, this.$$s = t, n && (this.$$shadowRoot = this.attachShadow(n));
	}
	addEventListener(e, t, n) {
		if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(t), this.$$c) {
			let n = this.$$c.$on(e, t);
			this.$$l_u.set(t, n);
		}
		super.addEventListener(e, t, n);
	}
	removeEventListener(e, t, n) {
		if (super.removeEventListener(e, t, n), this.$$c) {
			let e = this.$$l_u.get(t);
			e && (e(), this.$$l_u.delete(t));
		}
	}
	async connectedCallback() {
		if (this.$$cn = !0, !this.$$c) {
			if (await Promise.resolve(), !this.$$cn || this.$$c) return;
			function e(e) {
				return (t) => {
					let n = Ln("slot");
					e !== "default" && (n.name = e), U(t, n);
				};
			}
			let t = {}, n = Wa(this);
			for (let r of this.$$s) r in n && (r === "default" && !this.$$d.children ? (this.$$d.children = e(r), t.default = !0) : t[r] = e(r));
			for (let e of this.attributes) {
				let t = this.$$g_p(e.name);
				t in this.$$d || (this.$$d[t] = Ua(t, e.value, this.$$p_d, "toProp"));
			}
			for (let e in this.$$p_d) !(e in this.$$d) && this[e] !== void 0 && (this.$$d[e] = this[e], delete this[e]);
			this.$$c = Ba({
				component: this.$$ctor,
				target: this.$$shadowRoot || this,
				props: {
					...this.$$d,
					$$slots: t,
					$$host: this
				}
			}), this.$$me = $n(() => {
				rr(() => {
					this.$$r = !0;
					for (let e of v(this.$$c)) {
						if (!this.$$p_d[e]?.reflect) continue;
						this.$$d[e] = this.$$c[e];
						let t = Ua(e, this.$$d[e], this.$$p_d, "toAttribute");
						t == null ? this.removeAttribute(this.$$p_d[e].attribute || e) : this.setAttribute(this.$$p_d[e].attribute || e, t);
					}
					this.$$r = !1;
				});
			});
			for (let e in this.$$l) for (let t of this.$$l[e]) {
				let n = this.$$c.$on(e, t);
				this.$$l_u.set(t, n);
			}
			this.$$l = {};
		}
	}
	attributeChangedCallback(e, t, n) {
		this.$$r || (e = this.$$g_p(e), this.$$d[e] = Ua(e, n, this.$$p_d, "toProp"), this.$$c?.$set({ [e]: this.$$d[e] }));
	}
	disconnectedCallback() {
		this.$$cn = !1, Promise.resolve().then(() => {
			!this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
		});
	}
	$$g_p(e) {
		return v(this.$$p_d).find((t) => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e) || e;
	}
});
function Ua(e, t, n, r) {
	let i = n[e]?.type;
	if (t = i === "Boolean" && typeof t != "boolean" ? t != null : t, !r || !n[e]) return t;
	if (r === "toAttribute") switch (i) {
		case "Object":
		case "Array": return t == null ? null : JSON.stringify(t);
		case "Boolean": return t ? "" : null;
		case "Number": return t ?? null;
		default: return t;
	}
	else switch (i) {
		case "Object":
		case "Array": return t && JSON.parse(t);
		case "Boolean": return t;
		case "Number": return t == null ? t : +t;
		default: return t;
	}
}
function Wa(e) {
	let t = {};
	return e.childNodes.forEach((e) => {
		t[e.slot || "default"] = !0;
	}), t;
}
function Ga(e, t, n, r, i, a) {
	let o = class extends Ha {
		constructor() {
			super(e, n, i), this.$$p_d = t;
		}
		static get observedAttributes() {
			return v(t).map((e) => (t[e].attribute || e).toLowerCase());
		}
	};
	return v(t).forEach((e) => {
		y(o.prototype, e, {
			get() {
				return this.$$c && e in this.$$c ? this.$$c[e] : this.$$d[e];
			},
			set(n) {
				n = Ua(e, n, t), this.$$d[e] = n;
				var r = this.$$c;
				r && (b(r, e)?.get ? r[e] = n : r.$set({ [e]: n }));
			}
		});
	}), r.forEach((e) => {
		y(o.prototype, e, { get() {
			return this.$$c?.[e];
		} });
	}), a && (o = a(o)), e.element = o, o;
}
//#endregion
//#region ../../node_modules/.bun/animejs@4.4.1/node_modules/animejs/dist/modules/core/consts.js
var Ka = typeof window < "u", qa = Ka ? window : null, Ja = Ka ? document : null, Ya = {
	OBJECT: 0,
	ATTRIBUTE: 1,
	CSS: 2,
	TRANSFORM: 3,
	CSS_VAR: 4
}, Xa = {
	NUMBER: 0,
	UNIT: 1,
	COLOR: 2,
	COMPLEX: 3
}, Za = {
	NONE: 0,
	AUTO: 1,
	FORCE: 2
}, Qa = {
	replace: 0,
	none: 1,
	blend: 2
}, $a = Symbol(), eo = Symbol(), to = Symbol(), no = Symbol(), ro = Symbol(), io = 1e-11, ao = 0xe8d4a51000, oo = 1e3, so = /*#__PURE__*/ (() => {
	let e = /* @__PURE__ */ new Map();
	return e.set("x", "translateX"), e.set("y", "translateY"), e.set("z", "translateZ"), e;
})(), co = [
	"perspective",
	"translateX",
	"translateY",
	"translateZ",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"scale",
	"scaleX",
	"scaleY",
	"scaleZ",
	"skew",
	"skewX",
	"skewY"
], lo = /*#__PURE__*/ co.reduce((e, t) => ({
	...e,
	[t]: t + "("
}), {}), uo = () => {}, fo = /\)\s*[-.\d]/, po = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i, mo = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i, ho = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i, go = /hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i, _o = /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i, vo = /[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi, yo = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i, bo = /([a-z])([A-Z])/g, xo = /(\*=|\+=|-=)/, So = /var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/, Co = {
	id: null,
	keyframes: null,
	playbackEase: null,
	playbackRate: 1,
	frameRate: 240,
	loop: 0,
	reversed: !1,
	alternate: !1,
	autoplay: !0,
	persist: !1,
	duration: oo,
	delay: 0,
	loopDelay: 0,
	ease: "out(2)",
	composition: Qa.replace,
	modifier: (e) => e,
	onBegin: uo,
	onBeforeUpdate: uo,
	onUpdate: uo,
	onLoop: uo,
	onPause: uo,
	onComplete: uo,
	onRender: uo
}, wo = {
	current: null,
	root: Ja
}, To = {
	defaults: Co,
	precision: 4,
	timeScale: 1,
	tickThreshold: 200,
	editor: null
}, Eo = {
	version: "4.4.1",
	engine: null
};
Ka && (qa.AnimeJS ||= [], qa.AnimeJS.push(Eo));
//#endregion
//#region ../../node_modules/.bun/animejs@4.4.1/node_modules/animejs/dist/modules/core/helpers.js
var Do = (e) => e.replace(bo, "$1-$2").toLowerCase(), Oo = (e, t) => e.indexOf(t) === 0, ko = Date.now, Ao = Array.isArray, jo = (e) => e && e.constructor === Object, Mo = (e) => typeof e == "number" && !isNaN(e), No = (e) => typeof e == "string", Po = (e) => typeof e == "function", Fo = (e) => e === void 0, Io = (e) => Fo(e) || e === null, Lo = (e) => Ka && e instanceof SVGElement, Ro = (e) => po.test(e), zo = (e) => Oo(e, "rgb"), Bo = (e) => Oo(e, "hsl"), Vo = (e) => Ro(e) || (zo(e) || Bo(e)) && (e[e.length - 1] === ")" || !fo.test(e)), Ho = (e) => !To.defaults.hasOwnProperty(e), Uo = [
	"opacity",
	"rotate",
	"overflow",
	"color"
], Wo = (e, t) => {
	if (Uo.includes(t)) return !1;
	if (e.getAttribute(t) || t in e) {
		if (t === "scale") {
			let t = e.parentNode;
			return t && t.tagName === "filter";
		}
		return !0;
	}
}, Go = (e) => No(e) ? parseFloat(e) : e, Ko = Math.pow, qo = Math.sqrt, Jo = Math.sin, Yo = Math.cos, Xo = Math.abs, Zo = Math.floor, Qo = Math.asin, $o = Math.max, es = Math.PI, ts = Math.round, ns = (e, t, n) => e < t ? t : e > n ? n : e, rs = (e, t) => {
	if (t < 0) return e;
	if (!t) return ts(e);
	let n = 10 ** t;
	return ts(e * n) / n;
}, is = (e, t, n) => e + (t - e) * n, as = (e) => e === Infinity ? ao : e === -Infinity ? -ao : e, os = (e) => e <= 1e-11 ? io : as(rs(e, 11)), ss = (e) => Ao(e) ? [...e] : e, cs = (e, t) => {
	let n = { ...e };
	for (let r in t) {
		let i = e[r];
		n[r] = Fo(i) ? t[r] : i;
	}
	return n;
}, ls = (e, t, n, r = "_prev", i = "_next") => {
	let a = e._head, o = i;
	for (n && (a = e._tail, o = r); a;) {
		let e = a[o];
		t(a), a = e;
	}
}, us = (e, t, n = "_prev", r = "_next") => {
	let i = t[n], a = t[r];
	i ? i[r] = a : e._head = a, a ? a[n] = i : e._tail = i, t[n] = null, t[r] = null;
}, ds = (e, t, n, r = "_prev", i = "_next") => {
	let a = e._tail;
	for (; a && n && n(a, t);) a = a[r];
	let o = a ? a[i] : e._head;
	a ? a[i] = t : e._head = t, o ? o[r] = t : e._tail = t, t[r] = a, t[i] = o;
}, fs = (e, t, n) => {
	let r = e.style.transform;
	if (r) {
		let i = e[no], a = 0, o = r.length, s;
		for (; a < o;) {
			for (; a < o && r.charCodeAt(a) === 32;) a++;
			if (a >= o) break;
			let e = a;
			for (; a < o && r.charCodeAt(a) !== 40;) a++;
			if (a >= o) break;
			let t = r.substring(e, a), n = 1, c = a + 1, l = -1, u = -1;
			for (a++; a < o && n > 0;) {
				let e = r.charCodeAt(a);
				e === 40 ? n++ : e === 41 ? n-- : e === 44 && n === 1 && (l === -1 ? l = a : u === -1 && (u = a)), a++;
			}
			let d = a - 1;
			t === "translate" || t === "translate3d" ? (l === -1 ? i.translateX = r.substring(c, d).trim() : (i.translateX = r.substring(c, l).trim(), u === -1 ? i.translateY = r.substring(l + 1, d).trim() : (i.translateY = r.substring(l + 1, u).trim(), i.translateZ = r.substring(u + 1, d).trim())), s = r.substring(c, d)) : t === "scale" || t === "scale3d" ? l === -1 ? i.scale = r.substring(c, d).trim() : (i.scaleX = r.substring(c, l).trim(), u === -1 ? i.scaleY = r.substring(l + 1, d).trim() : (i.scaleY = r.substring(l + 1, u).trim(), i.scaleZ = r.substring(u + 1, d).trim())) : i[t] = r.substring(c, d);
		}
		if (t === "translate3d" && s) return n && (n[t] = s), s;
		let c = i[t];
		if (!Fo(c)) return n && (n[t] = c), c;
	}
	return t === "translate3d" ? "0px, 0px, 0px" : t === "rotate3d" ? "0, 0, 0, 0deg" : Oo(t, "scale") ? "1" : Oo(t, "rotate") || Oo(t, "skew") ? "0deg" : "0px";
}, ps = (e) => {
	let t = "";
	for (let n = 0, r = co.length; n < r; n++) {
		let r = co[n], i = e[r];
		if (i !== void 0) {
			if (r === "translateX") {
				let r = e.translateY;
				if (r !== void 0) {
					let a = e.translateZ;
					a === void 0 ? (t += `translate(${i},${r}) `, n += 1) : (t += `translate3d(${i},${r},${a}) `, n += 2);
					continue;
				}
			}
			if (r === "scaleX" && e.scale === void 0) {
				let r = e.scaleY;
				if (r !== void 0) {
					let a = e.scaleZ;
					a === void 0 ? (t += `scale(${i},${r}) `, n += 1) : (t += `scale3d(${i},${r},${a}) `, n += 2);
					continue;
				}
			}
			t += `${lo[r]}${i}) `;
		}
		r === "rotateZ" && e.rotate3d !== void 0 && (t += `rotate3d(${e.rotate3d}) `);
	}
	return e.matrix !== void 0 && (t += `matrix(${e.matrix}) `), e.matrix3d !== void 0 && (t += `matrix3d(${e.matrix3d}) `), t;
}, ms = (e) => {
	let t = mo.exec(e) || ho.exec(e), n = Fo(t[4]) ? 1 : +t[4];
	return [
		+t[1],
		+t[2],
		+t[3],
		n
	];
}, hs = (e) => {
	let t = e.length, n = t === 4 || t === 5;
	return [
		+("0x" + e[1] + e[n ? 1 : 2]),
		+("0x" + e[n ? 2 : 3] + e[n ? 2 : 4]),
		+("0x" + e[n ? 3 : 5] + e[n ? 3 : 6]),
		t === 5 || t === 9 ? +(("0x" + e[n ? 4 : 7] + e[n ? 4 : 8]) / 255).toFixed(3) : 1
	];
}, gs = (e, t, n) => (n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e), _s = (e) => {
	let t = go.exec(e) || _o.exec(e), n = t[1] / 360, r = t[2] / 100, i = t[3] / 100, a = Fo(t[4]) ? 1 : +t[4], o, s, c;
	if (r === 0) o = s = c = i;
	else {
		let e = i < .5 ? i * (1 + r) : i + r - i * r, t = 2 * i - e;
		o = rs(gs(t, e, n + 1 / 3) * 255, 0), s = rs(gs(t, e, n) * 255, 0), c = rs(gs(t, e, n - 1 / 3) * 255, 0);
	}
	return [
		o,
		s,
		c,
		a
	];
}, vs = (e) => zo(e) ? ms(e) : Ro(e) ? hs(e) : Bo(e) ? _s(e) : [
	0,
	0,
	0,
	1
], ys = (e, t) => Fo(e) ? t : e, bs = (e, t, n, r, i, a) => {
	let o;
	if (Po(e)) o = () => {
		let i = e(t, n, r, a);
		return isNaN(+i) ? i || 0 : +i;
	};
	else if (No(e) && Oo(e, "var(")) o = () => {
		let n = e.match(So), r = n[1], i = n[2], a = getComputedStyle(t)?.getPropertyValue(r);
		return (!a || a.trim() === "") && i && (a = i.trim()), a || 0;
	};
	else return e;
	return i && (i.func = o), o();
}, xs = (e, t) => e[eo] ? e[to] && Wo(e, t) ? Ya.ATTRIBUTE : co.includes(t) || so.get(t) ? Ya.TRANSFORM : Oo(t, "--") ? Ya.CSS_VAR : t in e.style ? Ya.CSS : t in e ? Ya.OBJECT : Ya.ATTRIBUTE : Ya.OBJECT, Ss = (e, t, n) => {
	let r = e.style[t];
	r && n && (n[t] = r);
	let i = r || getComputedStyle(e[ro] || e).getPropertyValue(t);
	return i === "auto" ? "0" : i;
}, Cs = (e, t, n, r) => {
	let i = Fo(n) ? xs(e, t) : n;
	if (i === Ya.OBJECT) {
		let n = e[t];
		return n && r && (r[t] = n), n || 0;
	}
	if (i === Ya.ATTRIBUTE) {
		let n = e.getAttribute(t);
		return n && r && (r[t] = n), n;
	}
	return i === Ya.TRANSFORM ? fs(e, t, r) : i === Ya.CSS_VAR ? Ss(e, t, r).trimStart() : Ss(e, t, r);
}, ws = (e, t, n) => n === "-" ? e - t : n === "+" ? e + t : e * t, Ts = () => ({
	t: Xa.NUMBER,
	n: 0,
	u: null,
	o: null,
	d: null,
	s: null
}), Es = (e, t) => {
	if (t.t = Xa.NUMBER, t.n = 0, t.u = null, t.o = null, t.d = null, t.s = null, !e) return t;
	let n = +e;
	if (isNaN(n)) {
		let n = e;
		n[1] === "=" && (t.o = n[0], n = n.slice(2));
		let r = n.includes(" ") ? !1 : yo.exec(n);
		if (r) return t.t = Xa.UNIT, t.n = +r[1], t.u = r[2], t;
		if (t.o) return t.n = +n, t;
		if (Vo(n)) return t.t = Xa.COLOR, t.d = vs(n), t;
		{
			let e = n.match(vo);
			return t.t = Xa.COMPLEX, t.d = e ? e.map(Number) : [], t.s = n.split(vo) || [], t;
		}
	} else return t.n = n, t;
}, Ds = (e, t) => (t.t = e._valueType, t.n = e._toNumber, t.u = e._unit, t.o = null, t.d = ss(e._toNumbers), t.s = ss(e._strings), t), Os = Ts(), ks = (e, t, n) => {
	let r = e._modifier, i = e._fromNumbers, a = e._toNumbers, o = rs(ns(r(is(i[0], a[0], t)), 0, 255), 0), s = rs(ns(r(is(i[1], a[1], t)), 0, 255), 0), c = rs(ns(r(is(i[2], a[2], t)), 0, 255), 0), l = ns(r(rs(is(i[3], a[3], t), n)), 0, 1);
	if (e._composition !== Qa.none) {
		let t = e._numbers;
		t[0] = o, t[1] = s, t[2] = c, t[3] = l;
	}
	return `rgba(${o},${s},${c},${l})`;
}, As = (e, t, n) => {
	let r = e._modifier, i = e._fromNumbers, a = e._toNumbers, o = e._strings, s = e._composition !== Qa.none, c = o[0];
	for (let l = 0, u = a.length; l < u; l++) {
		let u = r(rs(is(i[l], a[l], t), n)), d = o[l + 1];
		c += `${d ? u + d : u}`, s && (e._numbers[l] = u);
	}
	return c;
}, js = (e, t, n, r, i) => {
	let a = e.parent, o = e.duration, s = e.completed, c = e.iterationDuration, l = e.iterationCount, u = e._currentIteration, d = e._loopDelay, f = e._reversed, p = e._alternate, m = e._hasChildren, h = e._delay, g = e._currentTime, _ = h + c, v = t - h, y = ns(g, -h, o), b = ns(v, -h, o), x = v - g, S = b > 0, C = b >= o, w = o <= io, T = i === Za.FORCE, E = 0, D = v, O = 0;
	l > 1 && (e._currentIteration = ns(~~(b / (c + (C ? 0 : d))), 0, l), C && e._currentIteration--, E = e._currentIteration % 2, D = b % (c + d) || 0);
	let ee = f ^ (p && E), te = e._ease, k = C ? ee ? 0 : o : ee ? c - D : D;
	te && (k = c * te(k / c) || 0);
	let ne = (a ? a.backwards : v < g) ? !ee : !!ee;
	if (e._currentTime = v, e._iterationTime = k, e.backwards = ne, S && !e.began ? (e.began = !0, !n && !(a && (ne || !a.began)) && e.onBegin(e)) : v <= 0 && (e.began = !1), !n && !m && S && e._currentIteration !== u && e.onLoop(e), T || i === Za.AUTO && (t >= h && t <= _ || t <= h && y > h || t >= _ && y !== o) || k >= _ && y !== o || k <= h && y > 0 || t <= y && y === o && s || C && !s && w) {
		if (S && (e.computeDeltaTime(y), n || e.onBeforeUpdate(e)), !m) {
			let t = T || (ne ? x * -1 : x) >= To.tickThreshold, i = e._offset + (a ? a._offset : 0) + h + k, o = e._head, s, c, l, u, d = 0;
			for (; o;) {
				let e = o._composition, n = o._currentTime, a = o._changeDuration, f = o._absoluteStartTime + o._changeDuration, p = o._nextRep, m = o._prevRep, h = e !== Qa.none;
				if ((t || (n !== a || i <= f + (p ? p._delay : 0)) && (n !== 0 || i >= o._absoluteStartTime)) && (!h || !o._isOverridden && (!o._isOverlapped || i <= f) && (!p || p._isOverridden || i <= p._absoluteStartTime) && (!m || m._isOverridden || i >= m._absoluteStartTime + m._changeDuration + o._delay))) {
					let t = o._currentTime = ns(k - o._startTime, 0, a), n = o._ease(t / o._updateDuration), i = o._modifier, f = o._valueType, p = o._tweenType, m = p === Ya.OBJECT, g = f === Xa.NUMBER, _ = g && m || n === 0 || n === 1 ? -1 : To.precision, v, y;
					if (g ? v = y = i(rs(is(o._fromNumber, o._toNumber, n), _)) : f === Xa.UNIT ? (y = i(rs(is(o._fromNumber, o._toNumber, n), _)), v = `${y}${o._unit}`) : f === Xa.COLOR ? v = ks(o, n, _) : f === Xa.COMPLEX && (v = As(o, n, _)), h && (o._number = y), !r && e !== Qa.blend) {
						let e = o.property;
						s = o.target, m ? s[e] = v : p === Ya.ATTRIBUTE ? s.setAttribute(e, v) : (c = s.style, p === Ya.TRANSFORM ? (s !== l && (l = s, u = s[no]), u[e] = v, d = 1) : p === Ya.CSS ? c[e] = v : p === Ya.CSS_VAR && c.setProperty(e, v)), S && (O = 1);
					} else o._value = v;
				}
				d && o._renderTransforms && (c.transform = ps(u), d = 0), o = o._next;
			}
			!n && O && e.onRender(e);
		}
		!n && S && e.onUpdate(e);
	}
	return a && w ? !n && (a.began && !ne && v > 0 && !s || ne && v <= 1e-11 && s) && (e.onComplete(e), e.completed = !ne) : S && C ? l === Infinity ? e._startTime += e.duration : e._currentIteration >= l - 1 && (e.paused = !0, !s && !m && (e.completed = !0, !n && !(a && (ne || !a.began)) && (e.onComplete(e), e._resolve(e)))) : e.completed = !1, O;
}, Ms = (e, t, n, r, i) => {
	let a = e._currentIteration;
	if (js(e, t, n, r, i), e._hasChildren) {
		let o = e, s = o.backwards, c = r ? t : o._iterationTime, l = ko(), u = 0, d = !0;
		if (!r && o._currentIteration !== a) {
			let e = o.iterationDuration;
			ls(o, (t) => {
				if (!s) !t.completed && !t.backwards && t._currentTime < t.iterationDuration && js(t, e, n, 1, Za.FORCE), t.began = !1, t.completed = !1;
				else {
					let r = t.duration, i = t._offset + t._delay, a = i + r;
					!n && r <= 1e-11 && (!i || a === e) && t.onComplete(t);
				}
			}), n || o.onLoop(o);
		}
		ls(o, (e) => {
			let t = rs((c - e._offset) * e._speed, 12), a = e._fps < o._fps ? e.requestTick(l) : i;
			u += js(e, t, n, r, a), !e.completed && d && (d = !1);
		}, s), !n && u && o.onRender(o), (d || s) && o._currentTime >= o.duration && (o.paused = !0, o.completed || (o.completed = !0, n || (o.onComplete(o), o._resolve(o))));
	}
}, Ns = {}, Ps = (e, t, n) => {
	if (n === Ya.TRANSFORM) return so.get(e) || e;
	if (n === Ya.CSS || n === Ya.ATTRIBUTE && Lo(t) && e in t.style) {
		let t = Ns[e];
		if (t) return t;
		{
			let t = e && Do(e);
			return Ns[e] = t, t;
		}
	} else return e;
}, Fs = (e, t = !1) => {
	if (e._hasChildren) ls(e, (e) => Fs(e, t), !0);
	else {
		let n = e;
		n.pause(), ls(n, (e) => {
			let r = e.property, i = e.target, a = e._tweenType, o = e._inlineValue, s = Io(o) || o === "";
			if (a === Ya.OBJECT) !t && !s && (i[r] = o);
			else if (i[eo]) if (a === Ya.ATTRIBUTE) t || (s ? i.removeAttribute(r) : i.setAttribute(r, o));
			else {
				let t = i.style;
				if (a === Ya.TRANSFORM) {
					let n = i[no];
					s ? delete n[r] : n[r] = o, e._renderTransforms && (Object.keys(n).length ? t.transform = ps(n) : t.removeProperty("transform"));
				} else s ? t.removeProperty(Do(r)) : t[r] = o;
			}
			i[eo] && n._tail === e && n.targets.forEach((e) => {
				e.getAttribute && e.getAttribute("style") === "" && e.removeAttribute("style");
			});
		});
	}
	return e;
}, Is = class {
	constructor(e = 0) {
		this.deltaTime = 0, this._currentTime = e, this._lastTickTime = e, this._startTime = e, this._lastTime = e, this._scheduledTime = 0, this._frameDuration = oo / 240, this._fps = 240, this._speed = 1, this._hasChildren = !1, this._head = null, this._tail = null;
	}
	get fps() {
		return this._fps;
	}
	set fps(e) {
		let t = this._frameDuration, n = +e, r = n < 1e-11 ? io : n, i = oo / r;
		r > Co.frameRate && (Co.frameRate = r), this._fps = r, this._frameDuration = i, this._scheduledTime += i - t;
	}
	get speed() {
		return this._speed;
	}
	set speed(e) {
		let t = +e;
		this._speed = t < 1e-11 ? io : t;
	}
	requestTick(e) {
		let t = this._scheduledTime;
		if (this._lastTickTime = e, e < t) return Za.NONE;
		let n = this._frameDuration, r = e - t;
		return this._scheduledTime += r < n ? n : r, Za.AUTO;
	}
	computeDeltaTime(e) {
		let t = e - this._lastTime;
		return this.deltaTime = t, this._lastTime = e, t;
	}
}, Ls = {
	animation: null,
	update: uo
}, Rs = (e) => {
	let t = Ls.animation;
	return t || (t = {
		duration: io,
		computeDeltaTime: uo,
		_offset: 0,
		_delay: 0,
		_head: null,
		_tail: null
	}, Ls.animation = t, Ls.update = () => {
		e.forEach((e) => {
			for (let t in e) {
				let n = e[t], r = n._head;
				if (r) {
					let e = r._valueType, t = e === Xa.COMPLEX || e === Xa.COLOR ? ss(r._fromNumbers) : null, i = r._fromNumber, a = n._tail;
					for (; a && a !== r;) {
						if (t) for (let e = 0, n = a._numbers.length; e < n; e++) t[e] += a._numbers[e];
						else i += a._number;
						a = a._prevAdd;
					}
					r._toNumber = i, r._toNumbers = t;
				}
			}
		}), js(t, 1, 1, 0, Za.FORCE);
	}), t;
}, zs = Ka ? requestAnimationFrame : setImmediate, Bs = Ka ? cancelAnimationFrame : clearImmediate, Vs = class extends Is {
	constructor(e) {
		super(e), this.useDefaultMainLoop = !0, this.pauseOnDocumentHidden = !0, this.defaults = Co, this.paused = !0, this.reqId = 0;
	}
	update() {
		let e = this._currentTime = ko();
		if (this.requestTick(e)) {
			this.computeDeltaTime(e);
			let t = this._speed, n = this._fps, r = this._head;
			for (; r;) {
				let i = r._next;
				r.paused ? (us(this, r), this._hasChildren = !!this._tail, r._running = !1, r.completed && !r._cancelled && r.cancel()) : Ms(r, (e - r._startTime) * r._speed * t, 0, 0, r._fps < n ? r.requestTick(e) : Za.AUTO), r = i;
			}
			Ls.update();
		}
	}
	wake() {
		return this.useDefaultMainLoop && !this.reqId && (this.requestTick(ko()), this.reqId = zs(Us)), this;
	}
	pause() {
		if (this.reqId) return this.paused = !0, Ws();
	}
	resume() {
		if (this.paused) return this.paused = !1, ls(this, (e) => e.resetTime()), this.wake();
	}
	get speed() {
		return this._speed * (To.timeScale === 1 ? 1 : oo);
	}
	set speed(e) {
		this._speed = e * To.timeScale, ls(this, (e) => e.speed = e._speed);
	}
	get timeUnit() {
		return To.timeScale === 1 ? "ms" : "s";
	}
	set timeUnit(e) {
		let t = .001, n = e === "s", r = n ? t : 1;
		if (To.timeScale !== r) {
			To.timeScale = r, To.tickThreshold = 200 * r;
			let e = n ? t : oo;
			this.defaults.duration *= e, this._speed *= e;
		}
	}
	get precision() {
		return To.precision;
	}
	set precision(e) {
		To.precision = e;
	}
}, Hs = /*#__PURE__*/ (() => {
	let e = new Vs(ko());
	return Ka && (Eo.engine = e, Ja.addEventListener("visibilitychange", () => {
		e.pauseOnDocumentHidden && (Ja.hidden ? e.pause() : e.resume());
	})), e;
})(), Us = () => {
	Hs._head ? (Hs.reqId = zs(Us), Hs.update()) : Hs.reqId = 0;
}, Ws = () => (Bs(Hs.reqId), Hs.reqId = 0, Hs), Gs = {
	_rep: /* @__PURE__ */ new WeakMap(),
	_add: /* @__PURE__ */ new Map()
}, Ks = (e, t, n = "_rep") => {
	let r = Gs[n], i = r.get(e);
	return i || (i = {}, r.set(e, i)), i[t] ? i[t] : i[t] = {
		_head: null,
		_tail: null
	};
}, qs = (e, t) => e._isOverridden || e._absoluteStartTime > t._absoluteStartTime, Js = (e) => {
	e._isOverlapped = 1, e._isOverridden = 1, e._changeDuration = io, e._currentTime = io;
}, Ys = (e, t) => {
	let n = e._composition;
	if (n === Qa.replace) {
		let n = e._absoluteStartTime;
		ds(t, e, qs, "_prevRep", "_nextRep");
		let r = e._prevRep;
		if (r) {
			let t = r.parent, i = r._absoluteStartTime + r._changeDuration;
			if (e.parent.id !== t.id && t.iterationCount > 1 && i + (t.duration - t.iterationDuration) > n) {
				Js(r);
				let e = r._prevRep;
				for (; e && e.parent.id === t.id;) Js(e), e = e._prevRep;
			}
			let a = n - e._delay;
			if (i > a) {
				let e = r._startTime, t = rs(a - (i - (e + r._updateDuration)) - e, 12);
				r._changeDuration = t, r._currentTime = t, r._isOverlapped = 1, t < 1e-11 && Js(r);
			}
			let o = !0;
			if (ls(t, (e) => {
				e._isOverlapped || (o = !1);
			}), o) {
				let e = t.parent;
				if (e) {
					let n = !0;
					ls(e, (e) => {
						e !== t && ls(e, (e) => {
							e._isOverlapped || (n = !1);
						});
					}), n && e.cancel();
				} else t.cancel();
			}
		}
	} else if (n === Qa.blend) {
		let t = Ks(e.target, e.property, "_add"), n = Rs(Gs._add), r = t._head;
		r || (r = { ...e }, r._composition = Qa.replace, r._updateDuration = io, r._startTime = 0, r._numbers = ss(e._fromNumbers), r._number = 0, r._next = null, r._prev = null, ds(t, r), ds(n, r));
		let i = e._toNumber;
		if (e._fromNumber = r._fromNumber - i, e._toNumber = 0, e._numbers = ss(e._fromNumbers), e._number = 0, r._fromNumber = i, e._toNumbers) {
			let t = ss(e._toNumbers);
			t && t.forEach((t, n) => {
				e._fromNumbers[n] = r._fromNumbers[n] - t, e._toNumbers[n] = 0;
			}), r._fromNumbers = t;
		}
		ds(t, e, null, "_prevAdd", "_nextAdd");
	}
	return e;
}, Xs = (e) => {
	let t = e._composition;
	if (t !== Qa.none) {
		let n = e.target, r = e.property, i = Gs._rep.get(n)[r];
		if (us(i, e, "_prevRep", "_nextRep"), t === Qa.blend) {
			let t = Gs._add, i = t.get(n);
			if (!i) return;
			let a = i[r], o = Ls.animation;
			us(a, e, "_prevAdd", "_nextAdd");
			let s = a._head;
			if (s && s === a._tail) {
				us(a, s, "_prevAdd", "_nextAdd"), us(o, s);
				let e = !0;
				for (let t in i) if (i[t]._head) {
					e = !1;
					break;
				}
				e && t.delete(n);
			}
		}
	}
	return e;
}, Zs = (e) => (e.paused = !0, e.began = !1, e.completed = !1, e), Qs = (e) => e._cancelled ? (e._hasChildren ? ls(e, Qs) : ls(e, (e) => {
	e._composition !== Qa.none && Ys(e, Ks(e.target, e.property));
}), e._cancelled = 0, e) : e, $s = 0, ec = (e, t) => e._priority > t._priority, tc = class extends Is {
	constructor(e = {}, t = null, n = 0) {
		super(0), ++$s;
		let { id: r, delay: i, duration: a, reversed: o, alternate: s, loop: c, loopDelay: l, autoplay: u, frameRate: d, playbackRate: f, priority: p, onComplete: m, onLoop: h, onPause: g, onBegin: _, onBeforeUpdate: v, onUpdate: y } = e;
		wo.current && wo.current.register(this);
		let b = t ? 0 : Hs._lastTickTime, x = t ? t.defaults : To.defaults, S = Po(i) || Fo(i) ? x.delay : +i, C = Po(a) || Fo(a) ? Infinity : +a, w = ys(c, x.loop), T = ys(l, x.loopDelay), E = w === !0 || w === Infinity || w < 0 ? Infinity : w + 1, D = 0;
		t ? D = n : (Hs.reqId || Hs.requestTick(ko()), D = (Hs._lastTickTime - Hs._startTime) * To.timeScale), this.id = Fo(r) ? $s : r, this.parent = t, this.duration = as((C + T) * E - T) || 1e-11, this.backwards = !1, this.paused = !0, this.began = !1, this.completed = !1, this.onBegin = _ || x.onBegin, this.onBeforeUpdate = v || x.onBeforeUpdate, this.onUpdate = y || x.onUpdate, this.onLoop = h || x.onLoop, this.onPause = g || x.onPause, this.onComplete = m || x.onComplete, this.iterationDuration = C, this.iterationCount = E, this._autoplay = t ? !1 : ys(u, x.autoplay), this._offset = D, this._delay = S, this._loopDelay = T, this._iterationTime = 0, this._currentIteration = 0, this._resolve = uo, this._running = !1, this._reversed = +ys(o, x.reversed), this._reverse = this._reversed, this._cancelled = 0, this._alternate = ys(s, x.alternate), this._prev = null, this._next = null, this._lastTickTime = b, this._startTime = b, this._lastTime = b, this._fps = ys(d, x.frameRate), this._speed = ys(f, x.playbackRate), this._priority = +ys(p, 1);
	}
	get cancelled() {
		return !!this._cancelled;
	}
	set cancelled(e) {
		e ? this.cancel() : this.reset(!0).play();
	}
	get currentTime() {
		return ns(rs(this._currentTime, To.precision), -this._delay, this.duration);
	}
	set currentTime(e) {
		let t = this.paused;
		this.pause().seek(+e), t || this.resume();
	}
	get iterationCurrentTime() {
		return ns(rs(this._iterationTime, To.precision), 0, this.iterationDuration);
	}
	set iterationCurrentTime(e) {
		this.currentTime = this.iterationDuration * this._currentIteration + e;
	}
	get progress() {
		return ns(rs(this._currentTime / this.duration, 10), 0, 1);
	}
	set progress(e) {
		this.currentTime = this.duration * e;
	}
	get iterationProgress() {
		return ns(rs(this._iterationTime / this.iterationDuration, 10), 0, 1);
	}
	set iterationProgress(e) {
		let t = this.iterationDuration;
		this.currentTime = t * this._currentIteration + t * e;
	}
	get currentIteration() {
		return this._currentIteration;
	}
	set currentIteration(e) {
		this.currentTime = this.iterationDuration * ns(+e, 0, this.iterationCount - 1);
	}
	get reversed() {
		return !!this._reversed;
	}
	set reversed(e) {
		e ? this.reverse() : this.play();
	}
	get speed() {
		return super.speed;
	}
	set speed(e) {
		super.speed = e, this.resetTime();
	}
	reset(e = !1) {
		return Qs(this), this._reversed && !this._reverse && (this.reversed = !1), this._iterationTime = this.iterationDuration, Ms(this, 0, 1, ~~e, Za.FORCE), Zs(this), this._hasChildren && ls(this, Zs), this;
	}
	init(e = !1) {
		this.fps = this._fps, this.speed = this._speed, !e && this._hasChildren && Ms(this, this.duration, 1, ~~e, Za.FORCE), this.reset(e);
		let t = this._autoplay;
		return t === !0 ? this.resume() : t && !Fo(t.linked) && t.link(this), this;
	}
	resetTime() {
		let e = 1 / (this._speed * Hs._speed);
		return this._startTime = ko() - (this._currentTime + this._delay) * e, this;
	}
	pause() {
		return this.paused ? this : (this.paused = !0, this.onPause(this), this);
	}
	resume() {
		return this.paused ? (this.paused = !1, this.duration <= 1e-11 && !this._hasChildren ? Ms(this, io, 0, 0, Za.FORCE) : (this._running ||= (ds(Hs, this, ec), Hs._hasChildren = !0, !0), this.resetTime(), this._startTime -= 12, Hs.wake()), this) : this;
	}
	restart() {
		return this.reset().resume();
	}
	seek(e, t = 0, n = 0) {
		Qs(this), this.completed = !1;
		let r = this.paused;
		return this.paused = !0, Ms(this, e + this._delay, ~~t, ~~n, Za.AUTO), r ? this : this.resume();
	}
	alternate() {
		let e = this._reversed, t = this.iterationCount, n = this.iterationDuration, r = t === Infinity ? Zo(ao / n) : t;
		return this._reversed = +(this._alternate && !(r % 2) ? e : !e), t === Infinity ? this.iterationProgress = this._reversed ? 1 - this.iterationProgress : this.iterationProgress : this.seek(n * r - this._currentTime), this.resetTime(), this;
	}
	play() {
		return this._reversed && this.alternate(), this.resume();
	}
	reverse() {
		return this._reversed || this.alternate(), this.resume();
	}
	cancel() {
		return this._hasChildren ? ls(this, (e) => e.cancel(), !0) : ls(this, Xs), this._cancelled = 1, this.pause();
	}
	stretch(e) {
		let t = this.duration, n = os(e);
		if (t === n) return this;
		let r = e / t, i = e <= io;
		return this.duration = i ? io : n, this.iterationDuration = i ? io : os(this.iterationDuration * r), this._offset *= r, this._delay *= r, this._loopDelay *= r, this;
	}
	revert() {
		Ms(this, 0, 1, 0, Za.AUTO);
		let e = this._autoplay;
		return e && e.linked && e.linked === this && e.revert(), this.cancel();
	}
	complete(e = 0) {
		return this.seek(this.duration, e).cancel();
	}
	then(e = uo) {
		let t = this.then, n = () => {
			this.then = null, e(this), this.then = t, this._resolve = uo;
		};
		return new Promise((e) => (this._resolve = () => e(n()), this.completed && this._resolve(), this));
	}
};
//#endregion
//#region ../../node_modules/.bun/animejs@4.4.1/node_modules/animejs/dist/modules/core/targets.js
function nc(e) {
	let t = No(e) ? wo.root.querySelectorAll(e) : e;
	if (t instanceof NodeList || t instanceof HTMLCollection) return t;
}
function rc(e) {
	if (Io(e)) return [];
	if (!Ka) return Ao(e) && e.flat(Infinity) || [e];
	if (Ao(e)) {
		let t = e.flat(Infinity), n = [];
		for (let e = 0, r = t.length; e < r; e++) {
			let r = t[e];
			if (!Io(r)) {
				let e = nc(r);
				if (e) for (let t = 0, r = e.length; t < r; t++) {
					let r = e[t];
					if (!Io(r)) {
						let e = !1;
						for (let t = 0, i = n.length; t < i; t++) if (n[t] === r) {
							e = !0;
							break;
						}
						e || n.push(r);
					}
				}
				else {
					let e = !1;
					for (let t = 0, i = n.length; t < i; t++) if (n[t] === r) {
						e = !0;
						break;
					}
					e || n.push(r);
				}
			}
		}
		return n;
	}
	let t = nc(e);
	return t ? Array.from(t) : [e];
}
function ic(e) {
	let t = rc(e), n = t.length;
	if (n) for (let e = 0; e < n; e++) {
		let n = t[e];
		if (!n[$a]) {
			n[$a] = !0;
			let e = Lo(n);
			(n.nodeType || e) && (n[eo] = !0, n[to] = e, n[no] = {});
		}
	}
	return t;
}
//#endregion
//#region ../../node_modules/.bun/animejs@4.4.1/node_modules/animejs/dist/modules/core/units.js
var ac = {
	deg: 1,
	rad: 180 / es,
	turn: 360
}, oc = {}, sc = (e, t, n, r = !1) => {
	let i = t.u, a = t.n;
	if (t.t === Xa.UNIT && i === n) return t;
	let o = a + i + n, s = oc[o];
	if (!Fo(s) && !r) t.n = s;
	else {
		let r;
		if (i in ac) r = a * ac[i] / ac[n];
		else {
			let t = e.cloneNode(), o = e.parentNode, s = o && o !== Ja ? o : Ja.body;
			s.appendChild(t);
			let c = t.style;
			c.width = 100 + i;
			let l = t.offsetWidth || 100;
			c.width = 100 + n;
			let u = l / (t.offsetWidth || 100);
			s.removeChild(t), r = u * a;
		}
		t.n = r, oc[o] = r;
	}
	return t.t, Xa.UNIT, t.u = n, t;
}, cc = (e) => e, lc = (e = 1.68) => (t) => Ko(t, +e), uc = {
	in: (e) => (t) => e(t),
	out: (e) => (t) => 1 - e(1 - t),
	inOut: (e) => (t) => t < .5 ? e(t * 2) / 2 : 1 - e(t * -2 + 2) / 2,
	outIn: (e) => (t) => t < .5 ? (1 - e(1 - t * 2)) / 2 : (e(t * 2 - 1) + 1) / 2
}, dc = es / 2, fc = es * 2, pc = {
	"": lc,
	Quad: lc(2),
	Cubic: lc(3),
	Quart: lc(4),
	Quint: lc(5),
	Sine: (e) => 1 - Yo(e * dc),
	Circ: (e) => 1 - qo(1 - e * e),
	Expo: (e) => e ? Ko(2, 10 * e - 10) : 0,
	Bounce: (e) => {
		let t, n = 4;
		for (; e < ((t = Ko(2, --n)) - 1) / 11;);
		return 1 / Ko(4, 3 - n) - 7.5625 * Ko((t * 3 - 2) / 22 - e, 2);
	},
	Back: (e = 1.7) => (t) => (+e + 1) * t * t * t - +e * t * t,
	Elastic: (e = 1, t = .3) => {
		let n = ns(+e, 1, 10), r = ns(+t, io, 2), i = r / fc * Qo(1 / n), a = fc / r;
		return (e) => e === 0 || e === 1 ? e : -n * Ko(2, -10 * (1 - e)) * Jo((1 - e - i) * a);
	}
}, mc = /*#__PURE__ */ (() => {
	let e = {
		linear: cc,
		none: cc
	};
	for (let t in uc) for (let n in pc) {
		let r = pc[n], i = uc[t];
		e[t + n] = n === "" || n === "Back" || n === "Elastic" ? (e, t) => i(r(e, t)) : i(r);
	}
	return e;
})(), hc = {
	linear: cc,
	none: cc
}, gc = (e) => {
	if (hc[e]) return hc[e];
	if (e.indexOf("(") <= -1) {
		let t = uc[e] || e.includes("Back") || e.includes("Elastic") ? mc[e]() : mc[e];
		return t ? hc[e] = t : cc;
	} else {
		let t = e.slice(0, -1).split("("), n = mc[t[0]];
		return n ? hc[e] = n(...t[1].split(",")) : cc;
	}
}, _c = [
	"steps(",
	"irregular(",
	"linear(",
	"cubicBezier("
], vc = (e) => {
	if (No(e)) {
		for (let t = 0, n = _c.length; t < n; t++) if (Oo(e, _c[t])) return console.warn(`String syntax for \`ease: "${e}"\` has been removed from the core and replaced by importing and passing the easing function directly: \`ease: ${e}\``), cc;
	}
	return Po(e) ? e : No(e) ? gc(e) : cc;
}, X = Ts(), yc = Ts(), bc = {}, xc = { func: null }, Sc = { func: null }, Cc = [null], wc = [null, null], Tc = { to: null }, Ec = 0, Dc = 0, Oc, kc, Ac = (e, t) => {
	let n = {};
	if (Ao(e)) {
		let t = [].concat(...e.map((e) => Object.keys(e))).filter(Ho);
		for (let r = 0, i = t.length; r < i; r++) {
			let i = t[r];
			n[i] = e.map((e) => {
				let t = {};
				for (let n in e) {
					let r = e[n];
					Ho(n) ? n === i && (t.to = r) : t[n] = r;
				}
				return t;
			});
		}
	} else {
		let r = ys(t.duration, To.defaults.duration);
		Object.keys(e).map((t) => ({
			o: parseFloat(t) / 100,
			p: e[t]
		})).sort((e, t) => e.o - t.o).forEach((e) => {
			let t = e.o, i = e.p;
			for (let e in i) if (Ho(e)) {
				let a = n[e];
				a ||= n[e] = [];
				let o = t * r, s = a.length, c = a[s - 1], l = { to: i[e] }, u = 0;
				for (let e = 0; e < s; e++) u += a[e].duration;
				s === 1 && (l.from = c.to), i.ease && (l.ease = i.ease), l.duration = o - (s ? u : 0), a.push(l);
			}
			return e;
		});
		for (let e in n) {
			let t = n[e], r;
			for (let e = 0, n = t.length; e < n; e++) {
				let n = t[e], i = n.ease;
				n.ease = r || void 0, r = i;
			}
			t[0].duration || t.shift();
		}
	}
	return n;
}, jc = class extends tc {
	constructor(e, t, n, r, i = !1, a = 0, o) {
		super(t, n, r), ++Dc;
		let s = ic(e), c = s.length, l = t.keyframes, u = l ? cs(Ac(l, t), t) : t, { id: d, delay: f, duration: p, ease: m, playbackEase: h, modifier: g, composition: _, onRender: v } = u, y = n ? n.defaults : To.defaults, b = ys(m, y.ease), x = ys(h, y.playbackEase), S = x ? vc(x) : null, C = !Fo(b.ease), w = C ? b.ease : ys(m, S ? "linear" : y.ease), T = C ? b.settlingDuration : ys(p, y.duration), E = ys(f, y.delay), D = g || y.modifier, O = Fo(_) && c >= 1e3 ? Qa.none : Fo(_) ? y.composition : _, ee = this._offset + (n ? n._offset : 0);
		C && (b.parent = this);
		let te = NaN, k = NaN, ne = 0, re = 0;
		for (let e = 0; e < c; e++) {
			let t = s[e], r = a || e, c = o || s, l = NaN, d = NaN;
			for (let e in u) if (Ho(e)) {
				let a = xs(t, e), o = Ps(e, t, a), s = u[e], f = Ao(s);
				if (i && !f && (wc[0] = s, wc[1] = s, s = wc), f) {
					let e = s.length, t = !jo(s[0]);
					e === 2 && t ? (Tc.to = s, Cc[0] = Tc, Oc = Cc) : e > 2 && t ? (Oc = [], s.forEach((e, t) => {
						t ? t === 1 ? (wc[1] = e, Oc.push(wc)) : Oc.push(e) : wc[0] = e;
					})) : Oc = s;
				} else Cc[0] = s, Oc = Cc;
				let p = null, m = null, h = NaN, g = 0, _ = 0;
				for (let e = Oc.length; _ < e; _++) {
					let i = Oc[_];
					jo(i) ? kc = i : (Tc.to = i, kc = Tc), xc.func = null, Sc.func = null;
					let s = bs(ys(kc.composition, O), t, r, c, null, null), l = Mo(s) ? s : Qa[s];
					!p && l !== Qa.none && (p = Ks(t, o));
					let u = p ? p._tail : null, d = n && u && u.parent.parent === n ? u : m, f = bs(kc.to, t, r, c, xc, d), v;
					jo(f) && !Fo(f.to) ? (kc = f, v = f.to) : v = f;
					let y = bs(kc.from, t, r, c, null, d), b = kc.ease || w, x = bs(b, t, r, c, null, d), S = Po(x) || No(x) ? x : b, C = !Fo(S) && !Fo(S.ease), te = C ? S.ease : S, k = C ? S.settlingDuration : bs(ys(kc.duration, e > 1 ? bs(T, t, r, c, null, d) / e : T), t, r, c, null, d), ie = bs(ys(kc.delay, _ ? 0 : E), t, r, c, null, d), ae = kc.modifier || D, A = !Fo(y), oe = !Fo(v), se = Ao(v), ce = se || A && oe, le = m ? g + ie : ie, ue = rs(ee + le, 12);
					!re && (A || se) && (re = 1);
					let de = m;
					if (l !== Qa.none) {
						let e = p._head;
						for (; e && !e._isOverridden && e._absoluteStartTime <= ue;) if (de = e, e = e._nextRep, e && e._absoluteStartTime >= ue) for (; e;) Js(e), e = e._nextRep;
					}
					if (ce) {
						Es(se ? bs(v[0], t, r, c, Sc, d) : y, X), Es(se ? bs(v[1], t, r, c, xc, d) : v, yc);
						let e = Cs(t, o, a, bc);
						X.t === Xa.NUMBER && (de ? de._valueType === Xa.UNIT && (X.t = Xa.UNIT, X.u = de._unit) : (Es(e, Os), Os.t === Xa.UNIT && (X.t = Xa.UNIT, X.u = Os.u)));
					} else oe ? Es(v, yc) : m ? Ds(m, yc) : Es(n && de && de.parent.parent === n ? de._value : Cs(t, o, a, bc), yc), A ? Es(y, X) : m ? Ds(m, X) : Es(n && de && de.parent.parent === n ? de._value : Cs(t, o, a, bc), X);
					if (X.o && (X.n = ws(de ? de._toNumber : Es(Cs(t, o, a, bc), Os).n, X.n, X.o)), yc.o && (yc.n = ws(X.n, yc.n, yc.o)), X.t !== yc.t) {
						if (X.t === Xa.COMPLEX || yc.t === Xa.COMPLEX) {
							let e = X.t === Xa.COMPLEX ? X : yc, t = X.t === Xa.COMPLEX ? yc : X;
							t.t = Xa.COMPLEX, t.s = ss(e.s), t.d = e.d.map(() => t.n);
						} else if (X.t === Xa.UNIT || yc.t === Xa.UNIT) {
							let e = X.t === Xa.UNIT ? X : yc, t = X.t === Xa.UNIT ? yc : X;
							t.t = Xa.UNIT, t.u = e.u;
						} else if (X.t === Xa.COLOR || yc.t === Xa.COLOR) {
							let e = X.t === Xa.COLOR ? X : yc, t = X.t === Xa.COLOR ? yc : X;
							t.t = Xa.COLOR, t.s = e.s, t.d = [
								0,
								0,
								0,
								1
							];
						}
					}
					if (X.u !== yc.u) {
						let e = yc.u ? X : yc;
						e = sc(t, e, yc.u ? yc.u : X.u, !1);
					}
					if (yc.d && X.d && yc.d.length !== X.d.length) {
						let e = X.d.length > yc.d.length ? X : yc, t = e === X ? yc : X;
						t.d = e.d.map((e, n) => Fo(t.d[n]) ? 0 : t.d[n]), t.s = ss(e.s);
					}
					let fe = rs(+k || 1e-11, 12), pe = bc[o];
					Io(pe) || (bc[o] = null);
					let me = {
						parent: this,
						id: Ec++,
						property: o,
						target: t,
						_value: null,
						_toFunc: xc.func,
						_fromFunc: Sc.func,
						_ease: vc(te),
						_fromNumbers: ss(X.d),
						_toNumbers: ss(yc.d),
						_strings: ss(yc.s),
						_fromNumber: X.n,
						_toNumber: yc.n,
						_numbers: ss(X.d),
						_number: X.n,
						_unit: yc.u,
						_modifier: ae,
						_currentTime: 0,
						_startTime: le,
						_delay: +ie,
						_updateDuration: fe,
						_changeDuration: fe,
						_absoluteStartTime: ue,
						_tweenType: a,
						_valueType: yc.t,
						_composition: l,
						_isOverlapped: 0,
						_isOverridden: 0,
						_renderTransforms: 0,
						_inlineValue: pe,
						_prevRep: null,
						_nextRep: null,
						_prevAdd: null,
						_nextAdd: null,
						_prev: null,
						_next: null
					};
					l !== Qa.none && Ys(me, p);
					let he = me._valueType;
					he === Xa.COMPLEX ? me._value = As(me, 1, -1) : he === Xa.COLOR ? me._value = ks(me, 1, -1) : he === Xa.UNIT ? me._value = `${ae(me._toNumber)}${me._unit}` : me._value = ae(me._toNumber), isNaN(h) && (h = me._startTime), g = rs(le + fe, 12), m = me, ne++, ds(this, me);
				}
				(isNaN(k) || h < k) && (k = h), (isNaN(te) || g > te) && (te = g), a === Ya.TRANSFORM && (l = ne - _, d = ne);
			}
			if (!isNaN(l)) {
				let e = 0;
				ls(this, (t) => {
					e >= l && e < d && (t._renderTransforms = 1, t._composition === Qa.blend && ls(Ls.animation, (e) => {
						e.id === t.id && (e._renderTransforms = 1);
					})), e++;
				});
			}
		}
		c || console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation."), k ? (ls(this, (e) => {
			e._startTime - e._delay || (e._delay -= k), e._startTime -= k;
		}), te -= k) : k = 0, te || (te = io, this.iterationCount = 0), this.targets = s, this.id = Fo(d) ? Dc : d, this.duration = te === 1e-11 ? io : as((te + this._loopDelay) * this.iterationCount - this._loopDelay) || 1e-11, this.onRender = v || y.onRender, this._ease = S, this._delay = k, this.iterationDuration = te, !this._autoplay && re && this.onRender(this);
	}
	stretch(e) {
		let t = this.duration;
		if (t === os(e)) return this;
		let n = e / t;
		return ls(this, (e) => {
			e._updateDuration = os(e._updateDuration * n), e._changeDuration = os(e._changeDuration * n), e._currentTime *= n, e._startTime *= n, e._absoluteStartTime *= n;
		}), super.stretch(e);
	}
	refresh() {
		return ls(this, (e) => {
			let t = e._toFunc, n = e._fromFunc;
			(t || n) && (n ? (Es(n(), X), X.u !== e._unit && e.target[eo] && sc(e.target, X, e._unit, !0), e._fromNumbers = ss(X.d), e._fromNumber = X.n) : t && (Es(Cs(e.target, e.property, e._tweenType), Os), e._fromNumbers = ss(Os.d), e._fromNumber = Os.n), t && (Es(t(), yc), e._toNumbers = ss(yc.d), e._strings = ss(yc.s), e._toNumber = yc.o ? ws(e._fromNumber, yc.n, yc.o) : yc.n));
		}), this.duration === 1e-11 && this.restart(), this;
	}
	revert() {
		return super.revert(), Fs(this);
	}
	then(e) {
		return super.then(e);
	}
}, Mc = (e, t) => To.editor ? To.editor.addAnimation(e, t) : new jc(e, t, null, 0, !1).init(), Nc = (e, t) => {
	if (Oo(t, "<")) {
		let n = t[1] === "<", r = e._tail, i = r ? r._offset + r._delay : 0;
		return n ? i : i + r.duration;
	}
}, Pc = (e, t) => {
	let n = e.iterationDuration;
	if (n === 1e-11 && (n = 0), Fo(t)) return n;
	if (Mo(+t)) return +t;
	let r = t, i = e ? e.labels : null, a = !Io(i), o = Nc(e, r), s = !Fo(o), c = xo.exec(r);
	if (c) {
		let e = c[0], t = r.split(e), l = a && t[0] ? i[t[0]] : n;
		return ws(s ? o : a ? l : n, +t[1], e[0]);
	} else return s ? o : a ? Fo(i[r]) ? n : i[r] : n;
};
//#endregion
//#region ../../node_modules/.bun/animejs@4.4.1/node_modules/animejs/dist/modules/utils/target.js
function Fc(e, t, n) {
	let r = ic(e);
	if (!r.length) return;
	let [i] = r, a = Cs(i, Ps(t, i, xs(i, t)));
	if (Fo(n)) return a;
	if (Es(a, Os), Os.t === Xa.NUMBER || Os.t === Xa.UNIT) {
		if (n === !1) return Os.n;
		{
			let e = sc(i, Os, n, !1);
			return `${rs(e.n, To.precision)}${e.u}`;
		}
	}
}
var Ic = (e, t) => {
	if (!Fo(t)) return t.duration = io, t.composition = ys(t.composition, Qa.none), new jc(e, t, null, 0, !0).resume();
}, Lc = (e = uo) => new tc({
	duration: 1 * To.timeScale,
	onComplete: e
}, null, 0).resume(), Rc = () => {
	let e = Ja.createElement("div");
	Ja.body.appendChild(e), e.style.height = "100lvh";
	let t = e.offsetHeight;
	return Ja.body.removeChild(e), t;
}, zc = (e, t) => e && Po(e) ? e(t) : e, Bc = /* @__PURE__ */ new Map(), Vc = class {
	constructor(e) {
		this.element = e, this.useWin = this.element === Ja.body, this.winWidth = 0, this.winHeight = 0, this.width = 0, this.height = 0, this.left = 0, this.top = 0, this.scale = 1, this.zIndex = 0, this.scrollX = 0, this.scrollY = 0, this.prevScrollX = 0, this.prevScrollY = 0, this.scrollWidth = 0, this.scrollHeight = 0, this.velocity = 0, this.backwardX = !1, this.backwardY = !1, this.scrollTicker = new tc({
			autoplay: !1,
			onBegin: () => this.dataTimer.resume(),
			onUpdate: () => {
				let e = this.backwardX || this.backwardY;
				ls(this, (e) => e.handleScroll(), e);
			},
			onComplete: () => this.dataTimer.pause()
		}).init(), this.dataTimer = new tc({
			autoplay: !1,
			frameRate: 30,
			onUpdate: (e) => {
				let t = e.deltaTime, n = this.prevScrollX, r = this.prevScrollY, i = this.scrollX, a = this.scrollY, o = n - i, s = r - a;
				this.prevScrollX = i, this.prevScrollY = a, o && (this.backwardX = n > i), s && (this.backwardY = r > a), this.velocity = rs(t > 0 ? Math.sqrt(o * o + s * s) / t : 0, 5);
			}
		}).init(), this.resizeTicker = new tc({
			autoplay: !1,
			duration: 250 * To.timeScale,
			onComplete: () => {
				this.updateWindowBounds(), this.refreshScrollObservers(), this.handleScroll();
			}
		}).init(), this.wakeTicker = new tc({
			autoplay: !1,
			duration: 500 * To.timeScale,
			onBegin: () => {
				this.scrollTicker.resume();
			},
			onComplete: () => {
				this.scrollTicker.pause();
			}
		}).init(), this._head = null, this._tail = null, this.updateScrollCoords(), this.updateWindowBounds(), this.updateBounds(), this.refreshScrollObservers(), this.handleScroll(), this.resizeObserver = new ResizeObserver(() => this.resizeTicker.restart()), this.resizeObserver.observe(this.element), (this.useWin ? qa : this.element).addEventListener("scroll", this, !1);
	}
	updateScrollCoords() {
		let e = this.useWin, t = this.element;
		this.scrollX = rs(e ? qa.scrollX : t.scrollLeft, 0), this.scrollY = rs(e ? qa.scrollY : t.scrollTop, 0);
	}
	updateWindowBounds() {
		this.winWidth = qa.innerWidth, this.winHeight = Rc();
	}
	updateBounds() {
		let e = getComputedStyle(this.element), t = this.element;
		this.scrollWidth = t.scrollWidth + parseFloat(e.marginLeft) + parseFloat(e.marginRight), this.scrollHeight = t.scrollHeight + parseFloat(e.marginTop) + parseFloat(e.marginBottom), this.updateWindowBounds();
		let n, r;
		if (this.useWin) n = this.winWidth, r = this.winHeight;
		else {
			let e = t.getBoundingClientRect();
			n = t.clientWidth, r = t.clientHeight, this.top = e.top, this.left = e.left, this.scale = e.width ? n / e.width : e.height ? r / e.height : 1;
		}
		this.width = n, this.height = r;
	}
	refreshScrollObservers() {
		ls(this, (e) => {
			e._debug && e.removeDebug();
		}), this.updateBounds(), ls(this, (e) => {
			e.refresh(), e.onResize(e), e._debug && e.debug();
		});
	}
	refresh() {
		this.updateWindowBounds(), this.updateBounds(), this.refreshScrollObservers(), this.handleScroll();
	}
	handleScroll() {
		this.updateScrollCoords(), this.wakeTicker.restart();
	}
	handleEvent(e) {
		switch (e.type) {
			case "scroll":
				this.handleScroll();
				break;
		}
	}
	revert() {
		this.scrollTicker.cancel(), this.dataTimer.cancel(), this.resizeTicker.cancel(), this.wakeTicker.cancel(), this.resizeObserver.disconnect(), (this.useWin ? qa : this.element).removeEventListener("scroll", this), Bc.delete(this.element);
	}
}, Hc = (e) => {
	let t = e && rc(e)[0] || Ja.body, n = Bc.get(t);
	return n || (n = new Vc(t), Bc.set(t, n)), n;
}, Uc = (e, t, n, r, i) => {
	let a = t === "min", o = t === "max", { n: s, u: c } = Es(t === "top" || t === "left" || t === "start" || a ? 0 : t === "bottom" || t === "right" || t === "end" || o ? "100%" : t === "center" ? "50%" : t, Os), l = s;
	return c === "%" ? l = s / 100 * n : c && (l = sc(e, Os, "px", !0).n), o && r < 0 && (l += r), a && i > 0 && (l += i), l;
}, Wc = (e, t, n, r, i) => {
	let a;
	if (No(t)) {
		let o = xo.exec(t);
		if (o) {
			let s = o[0], c = s[0], l = t.split(s), u = l[0] === "min", d = l[0] === "max", f = Uc(e, l[0], n, r, i), p = Uc(e, l[1], n, r, i);
			if (u) {
				let t = ws(Uc(e, "min", n), p, c);
				a = t < f ? f : t;
			} else if (d) {
				let t = ws(Uc(e, "max", n), p, c);
				a = t > f ? f : t;
			} else a = ws(f, p, c);
		} else a = Uc(e, t, n, r, i);
	} else a = t;
	return rs(a, 0);
}, Gc = (e) => {
	let t, n = e.targets;
	for (let e = 0, r = n.length; e < r; e++) {
		let r = n[e];
		if (r[eo]) {
			t = r;
			break;
		}
	}
	return t;
}, Kc = 0, qc = [
	"#FF4B4B",
	"#FF971B",
	"#FFC730",
	"#F9F640",
	"#7AFF5A",
	"#18FF74",
	"#17E09B",
	"#3CFFEC",
	"#05DBE9",
	"#33B3F1",
	"#638CF9",
	"#C563FE",
	"#FF4FCF",
	"#F93F8A"
], Jc = class {
	constructor(e = {}) {
		wo.current && wo.current.register(this);
		let t = ys(e.sync, "play pause"), n = t ? vc(t) : null, r = t && (t === "linear" || t === cc), i = t && !(n === cc && !r), a = t && (Mo(t) || t === !0 || r), o = t && No(t) && !i && !a, s = o ? t.split(" ").map((e) => () => {
			let t = this.linked;
			return t && t[e] ? t[e]() : null;
		}) : null, c = o && s.length > 2;
		this.index = Kc++, this.id = Fo(e.id) ? this.index : e.id, this.container = Hc(e.container), this.target = null, this.linked = null, this.repeat = null, this.horizontal = null, this.enter = null, this.leave = null, this.sync = i || a || !!s, this.syncEase = i ? n : null, this.syncSmooth = a ? t === !0 || r ? 1 : t : null, this.onSyncEnter = s && !c && s[0] ? s[0] : uo, this.onSyncLeave = s && !c && s[1] ? s[1] : uo, this.onSyncEnterForward = s && c && s[0] ? s[0] : uo, this.onSyncLeaveForward = s && c && s[1] ? s[1] : uo, this.onSyncEnterBackward = s && c && s[2] ? s[2] : uo, this.onSyncLeaveBackward = s && c && s[3] ? s[3] : uo, this.onEnter = e.onEnter || uo, this.onLeave = e.onLeave || uo, this.onEnterForward = e.onEnterForward || uo, this.onLeaveForward = e.onLeaveForward || uo, this.onEnterBackward = e.onEnterBackward || uo, this.onLeaveBackward = e.onLeaveBackward || uo, this.onUpdate = e.onUpdate || uo, this.onResize = e.onResize || uo, this.onSyncComplete = e.onSyncComplete || uo, this.reverted = !1, this.ready = !1, this.completed = !1, this.began = !1, this.isInView = !1, this.forceEnter = !1, this.hasEntered = !1, this.offset = 0, this.offsetStart = 0, this.offsetEnd = 0, this.distance = 0, this.prevProgress = 0, this.thresholds = [
			"start",
			"end",
			"end",
			"start"
		], this.coords = [
			0,
			0,
			0,
			0
		], this.debugStyles = null, this.$debug = null, this._params = e, this._debug = ys(e.debug, !1), this._next = null, this._prev = null, ds(this.container, this), Lc(() => {
			if (!this.reverted) {
				if (!this.target) {
					let t = rc(e.target)[0];
					this.target = t || Ja.body, this.refresh();
				}
				this._debug && this.debug();
			}
		});
	}
	link(e) {
		if (e && (e.pause(), this.linked = e, !Fo(e) && !Fo(e.persist) && (e.persist = !0), !this._params.target)) {
			let t;
			Fo(e.targets) ? ls(e, (e) => {
				e.targets && !t && (t = Gc(e));
			}) : t = Gc(e), this.target = t || Ja.body, this.refresh();
		}
		return this;
	}
	get velocity() {
		return this.container.velocity;
	}
	get backward() {
		return this.horizontal ? this.container.backwardX : this.container.backwardY;
	}
	get scroll() {
		return this.horizontal ? this.container.scrollX : this.container.scrollY;
	}
	get progress() {
		let e = (this.scroll - this.offsetStart) / this.distance;
		return e === Infinity || isNaN(e) ? 0 : rs(ns(e, 0, 1), 6);
	}
	refresh() {
		this.ready = !0, this.reverted = !1;
		let e = this._params;
		return this.repeat = ys(zc(e.repeat, this), !0), this.horizontal = ys(zc(e.axis, this), "y") === "x", this.enter = ys(zc(e.enter, this), "end start"), this.leave = ys(zc(e.leave, this), "start end"), this.updateBounds(), this.handleScroll(), this;
	}
	removeDebug() {
		return this.$debug &&= (this.$debug.parentNode.removeChild(this.$debug), null), this.debugStyles && (this.debugStyles.revert(), this.$debug = null), this;
	}
	debug() {
		this.removeDebug();
		let e = this.container, t = this.horizontal, n = e.element.querySelector(":scope > .animejs-onscroll-debug"), r = Ja.createElement("div"), i = Ja.createElement("div"), a = Ja.createElement("div"), o = qc[this.index % qc.length], s = e.useWin, c = s ? e.winWidth : e.width, l = s ? e.winHeight : e.height, u = e.scrollWidth, d = e.scrollHeight, f = this.container.width > 360 ? 320 : 260, p = t ? 0 : 10, m = t ? 10 : 0, h = t ? 24 : f / 2, g = t ? h : 15, _ = t ? 60 : h, v = t ? _ : g, y = t ? "repeat-x" : "repeat-y", b = (e) => t ? "0px " + e + "px" : e + "px 2px", x = (e) => `linear-gradient(${t ? 90 : 0}deg, ${e} 2px, transparent 1px)`, S = (e, t, n, r, i) => `position:${e};left:${t}px;top:${n}px;width:${r}px;height:${i}px;`;
		r.style.cssText = `${S("absolute", p, m, t ? u : f, t ? f : d)}
      pointer-events: none;
      z-index: ${this.container.zIndex++};
      display: flex;
      flex-direction: ${t ? "column" : "row"};
      filter: drop-shadow(0px 1px 0px rgba(0,0,0,.75));
    `, i.style.cssText = `${S("sticky", 0, 0, t ? c : h, t ? h : l)}`, n || (i.style.cssText += `background:
        ${x("#FFFF")}${b(h - 10)} / 100px 100px ${y},
        ${x("#FFF8")}${b(h - 10)} / 10px 10px ${y};
      `), a.style.cssText = `${S("relative", 0, 0, t ? u : h, t ? h : d)}`, n || (a.style.cssText += `background:
        ${x("#FFFF")}${b(0)} / ${t ? "100px 10px" : "10px 100px"} ${y},
        ${x("#FFF8")}${b(0)} / ${t ? "10px 0px" : "0px 10px"} ${y};
      `);
		let C = [" enter: ", " leave: "];
		this.coords.forEach((e, n) => {
			let r = n > 1, s = (r ? 0 : this.offset) + e, p = n % 2, m = s < v, h = s > (r ? t ? c : l : t ? u : d) - v, y = (r ? p && !m : !p && !m) || h, b = Ja.createElement("div"), x = Ja.createElement("div"), w = t ? y ? "right" : "left" : y ? "bottom" : "top", T = y ? (t ? _ : g) + (r ? t ? -1 : h ? 0 : -2 : t ? -1 : -2) : +!!t;
			x.innerHTML = `${this.id}${C[p]}${this.thresholds[n]}`, b.style.cssText = `${S("absolute", 0, 0, _, g)}
        display: flex;
        flex-direction: ${t ? "column" : "row"};
        justify-content: flex-${r ? "start" : "end"};
        align-items: flex-${y ? "end" : "start"};
        border-${w}: 2px solid ${o};
      `, x.style.cssText = `
        overflow: hidden;
        max-width: ${f / 2 - 10}px;
        height: ${g};
        margin-${t ? y ? "right" : "left" : y ? "bottom" : "top"}: -2px;
        padding: 1px;
        font-family: ui-monospace, monospace;
        font-size: 10px;
        letter-spacing: -.025em;
        line-height: 9px;
        font-weight: 600;
        text-align: ${t && y || !t && !r ? "right" : "left"};
        white-space: pre;
        text-overflow: ellipsis;
        color: ${p ? o : "rgba(0,0,0,.75)"};
        background-color: ${p ? "rgba(0,0,0,.65)" : o};
        border: 2px solid ${p ? o : "transparent"};
        border-${t ? y ? "top-left" : "top-right" : y ? "top-left" : "bottom-left"}-radius: 5px;
        border-${t ? y ? "bottom-left" : "bottom-right" : y ? "top-right" : "bottom-right"}-radius: 5px;
      `, b.appendChild(x);
			let E = s - T + +!!t;
			b.style[t ? "left" : "top"] = `${E}px`, (r ? i : a).appendChild(b);
		}), r.appendChild(i), r.appendChild(a), e.element.appendChild(r), n || r.classList.add("animejs-onscroll-debug"), this.$debug = r, Fc(e.element, "position") === "static" && (this.debugStyles = Ic(e.element, { position: "relative " }));
	}
	updateBounds() {
		this._debug && this.removeDebug();
		let e, t = this.target, n = this.container, r = this.horizontal, i = this.linked, a, o = t;
		for (i && (a = i.currentTime, i.seek(0, !0)); o && o !== n.element && o !== Ja.body;) {
			let t = Fc(o, "position") === "sticky" ? Ic(o, { position: "static" }) : !1;
			o = o.parentElement, t && (e ||= [], e.push(t));
		}
		let s = t.getBoundingClientRect(), c = n.scale, l = (r ? s.left + n.scrollX - n.left : s.top + n.scrollY - n.top) * c, u = (r ? s.width : s.height) * c, d = r ? n.width : n.height, f = (r ? n.scrollWidth : n.scrollHeight) - d, p = this.enter, m = this.leave, h = "start", g = "end", _ = "end", v = "start";
		if (No(p)) {
			let e = p.split(" ");
			_ = e[0], h = e.length > 1 ? e[1] : h;
		} else if (jo(p)) {
			let e = p;
			Fo(e.container) || (_ = e.container), Fo(e.target) || (h = e.target);
		} else Mo(p) && (_ = p);
		if (No(m)) {
			let e = m.split(" ");
			v = e[0], g = e.length > 1 ? e[1] : g;
		} else if (jo(m)) {
			let e = m;
			Fo(e.container) || (v = e.container), Fo(e.target) || (g = e.target);
		} else Mo(m) && (v = m);
		let y = Wc(t, h, u), b = Wc(t, g, u), x = y + l - d, S = b + l - f, C = Wc(t, _, d, x, S), w = Wc(t, v, d, x, S), T = y + l - C, E = b + l - w, D = E - T;
		this.offset = l, this.offsetStart = T, this.offsetEnd = E, this.distance = D <= 0 ? 0 : D, this.thresholds = [
			h,
			g,
			_,
			v
		], this.coords = [
			y,
			b,
			C,
			w
		], e && e.forEach((e) => e.revert()), i && i.seek(a, !0), this._debug && this.debug();
	}
	handleScroll() {
		if (!this.ready) return;
		let e = this.linked, t = this.sync, n = this.syncEase, r = this.syncSmooth, i = e && (n || r), a = this.horizontal, o = this.container, s = this.scroll, c = s <= this.offsetStart, l = s >= this.offsetEnd, u = !c && !l, d = s === this.offsetStart || s === this.offsetEnd, f = !this.hasEntered && d, p = this._debug && this.$debug, m = !1, h = !1, g = this.progress;
		if (c && this.began && (this.began = !1), g > 0 && !this.began && (this.began = !0), i) {
			let t = e.progress;
			if (r && Mo(r)) {
				if (r < 1) {
					let e = t < g && g === 1 ? 1e-4 : t > g && !g ? -1e-4 : 0;
					g = rs(is(t, g, is(.01, .2, r)) + e, 6);
				}
			} else n && (g = n(g));
			m = g !== this.prevProgress, h = t === 1, m && !h && r && t && o.wakeTicker.restart();
		}
		if (p) {
			let e = a ? o.scrollY : o.scrollX;
			p.style[a ? "top" : "left"] = e + 10 + "px";
		}
		(u && !this.isInView || f && !this.forceEnter && !this.hasEntered) && (u && (this.isInView = !0), !this.forceEnter || !this.hasEntered ? (p && u && (p.style.zIndex = `${this.container.zIndex++}`), this.onSyncEnter(this), this.onEnter(this), this.backward ? (this.onSyncEnterBackward(this), this.onEnterBackward(this)) : (this.onSyncEnterForward(this), this.onEnterForward(this)), this.hasEntered = !0, f && (this.forceEnter = !0)) : u && (this.forceEnter = !1)), (u || !u && this.isInView) && (m = !0), m && (i && e.seek(e.duration * g), this.onUpdate(this)), !u && this.isInView && (this.isInView = !1, this.onSyncLeave(this), this.onLeave(this), this.backward ? (this.onSyncLeaveBackward(this), this.onLeaveBackward(this)) : (this.onSyncLeaveForward(this), this.onLeaveForward(this)), t && !r && (h = !0)), g >= 1 && this.began && !this.completed && (t && h || !t) && (t && this.onSyncComplete(this), this.completed = !0, (!this.repeat && !e || !this.repeat && e && e.completed) && this.revert()), g < 1 && this.completed && (this.completed = !1), this.prevProgress = g;
	}
	revert() {
		if (this.reverted) return;
		let e = this.container;
		return us(e, this), e._head || e.revert(), this._debug && this.removeDebug(), this.reverted = !0, this.ready = !1, this;
	}
}, Yc = (e = {}) => new Jc(e), Xc = (e = 0, t = 1, n = 0) => {
	let r = 10 ** n;
	return Math.floor((Math.random() * (t - e + 1 / r) + e) * r) / r;
}, Zc = (e) => {
	let t = e.length, n, r;
	for (; t;) r = Xc(0, --t), n = e[t], e[t] = e[r], e[r] = n;
	return e;
}, Qc = (e, t = {}) => {
	let n = [], r = 0, i, a = t.from, o = t.reversed, s = t.ease, c = !Fo(s), l = c && !Fo(s.ease) ? s.ease : c ? vc(s) : null, u = t.grid, d = u === !0, f = t.axis, p = t.total, m = Fo(a) || a === 0 || a === "first", h = a === "center", g = a === "last", _ = a === "random", v = Ao(a), y = Ao(e), b = t.use, x = Go(y ? e[0] : e), S = y ? Go(e[1]) : 0, C = yo.exec((y ? e[1] : e) + ""), w = t.start || 0 + (y ? x : 0), T = m ? 0 : Mo(a) ? a : 0;
	return (e, s, c, m, E) => {
		let [D] = ic(e), O = Fo(p) ? c.length : p, ee = Fo(b) ? !1 : Po(b) ? b(D, s, O) : Cs(D, b), te = Mo(ee) || No(ee) && Mo(+ee) ? +ee : s;
		if (h && (T = (O - 1) / 2), g && (T = O - 1), !n.length) {
			if (d) {
				let e = !0, t = Infinity, r = Infinity, i = -Infinity, o = -Infinity, s = [], l = [];
				for (let n = 0; n < O; n++) {
					let a = c[n], u = 0, d = 0, f = !1;
					if (a && Po(a.getBoundingClientRect)) {
						let e = a.getBoundingClientRect();
						u = e.left + e.width / 2, d = e.top + e.height / 2, f = !0;
					} else {
						let e = a;
						e && Mo(e.x) && Mo(e.y) && (u = e.x, d = e.y, f = !0);
					}
					if (!f) {
						e = !1;
						break;
					}
					s.push(u), l.push(d), u < t && (t = u), d < r && (r = d), u > i && (i = u), d > o && (o = d);
				}
				if (e) {
					let e = s[0], c = l[0];
					v ? (e = t + a[0] * (i - t), c = r + a[1] * (o - r)) : h ? (e = (t + i) / 2, c = (r + o) / 2) : g ? (e = s[O - 1], c = l[O - 1]) : Mo(a) && (e = s[a], c = l[a]);
					for (let t = 0; t < O; t++) {
						let r = e - s[t], i = c - l[t], a = qo(r * r + i * i);
						f === "x" && (a = -r), f === "y" && (a = -i), n.push(a);
					}
					let u = Infinity;
					for (let e = 0, t = n.length; e < t; e++) {
						let t = Xo(n[e]);
						t > 0 && t < u && (u = t);
					}
					if (u > 0 && u < Infinity) for (let e = 0, t = n.length; e < t; e++) n[e] = n[e] / u;
				} else for (let e = 0; e < O; e++) n.push(Xo(T - e));
			} else for (let e = 0; e < O; e++) if (!u) n.push(Xo(T - e));
			else {
				let t, r;
				v ? (t = a[0] * (u[0] - 1), r = a[1] * (u[1] - 1)) : h ? (t = (u[0] - 1) / 2, r = (u[1] - 1) / 2) : (t = T % u[0], r = Zo(T / u[0]));
				let i = e % u[0], o = Zo(e / u[0]), s = t - i, c = r - o, l = qo(s * s + c * c);
				f === "x" && (l = -s), f === "y" && (l = -c), n.push(l);
			}
			r = $o(...n), l && (n = n.map((e) => l(e / r) * r)), o && (n = n.map((e) => f ? e < 0 ? e * -1 : -e : Xo(r - e))), _ && (n = Zc(n));
		}
		let k = y ? (S - x) / r : x;
		Fo(i) && (i = E ? Pc(E, Fo(t.start) ? E.iterationDuration : w) : w);
		let ne = i + (k * rs(n[te], 2) || 0);
		return t.modifier && (ne = t.modifier(ne)), C && (ne = `${ne}${C[2]}`), ne;
	};
}, $c = (e) => {
	let t = Mc(e.children, {
		y: [20, 0],
		opacity: [0, 1],
		duration: 600,
		delay: Qc(70),
		easing: "easeOutQuad",
		autoplay: !1
	}), n = Yc({
		container: document.body,
		target: e,
		enter: "bottom",
		leave: "top",
		onEnter: () => {
			t.seek(0), t.play();
		},
		debug: !1
	});
	return () => n.revert?.();
}, el = {}, tl = ["ko", "en"], nl = "PARAGLIDE_LOCALE", rl = 3456e4, il = "PARAGLIDE_LOCALE", al = [
	"localStorage",
	"cookie",
	"preferredLanguage",
	"baseLocale"
], ol = [], sl, cl;
function ll(e) {
	if (ol.length === 0) return;
	let t = typeof e == "string" ? e : e.href;
	if (sl === t) return cl;
	let n = new URL(t, "http://dummy.com"), r;
	for (let e of ol) if (new el(e.match, n.href).exec(n.href)) {
		r = e;
		break;
	}
	return sl = t, cl = r, r;
}
function ul(e) {
	let t = ll(e);
	return t && t.exclude !== !0 && Array.isArray(t.strategy) ? t.strategy : al;
}
var dl = void 0;
globalThis.__paraglide = globalThis.__paraglide ?? {}, globalThis.__paraglide.ssr = globalThis.__paraglide.ssr ?? {};
var fl = !1, Z = () => {
	if (dl) {
		let e = dl?.getStore()?.locale;
		if (e) return e;
	}
	let e = al;
	typeof window < "u" && window.location?.href && (e = ul(window.location.href));
	let t = pl(e, typeof window < "u" ? window.location?.href : void 0);
	if (t) return fl || (fl = !0, hl(t, { reload: !1 })), t;
	throw Error("No locale found. Read the docs https://paraglidejs.com/errors#no-locale-found");
};
function pl(e, t) {
	let n;
	for (let t of e) {
		if (t === "cookie") n = vl();
		else if (t === "baseLocale") n = "ko";
		else if (t === "preferredLanguage") n = yl();
		else if (t === "localStorage") n = localStorage.getItem("PARAGLIDE_LOCALE") ?? void 0;
		else if (xl(t) && bl.has(t)) {
			let e = bl.get(t);
			if (e) {
				let t = e.getLocale();
				if (t instanceof Promise) continue;
				if (t !== void 0) return _l(t);
			}
		}
		let e = gl(n);
		if (e) return e;
	}
}
var ml = (e) => {
	e ? window.location.href = e : window.location.reload();
}, hl = (e, t) => {
	let n = {
		reload: !0,
		...t
	}, r;
	try {
		r = Z();
	} catch {}
	let i = [], a = al;
	typeof window < "u" && window.location?.href && (a = ul(window.location.href));
	for (let t of a) if (t === "cookie") {
		if (typeof document > "u" || typeof window > "u") continue;
		let t = `${nl}=${e}; path=/; max-age=${rl}`;
		document.cookie = t;
	} else if (t === "baseLocale") continue;
	else if (t === "localStorage" && typeof window < "u") localStorage.setItem(il, e);
	else if (xl(t) && bl.has(t)) {
		let n = bl.get(t);
		if (n) {
			let r = n.setLocale(e);
			r instanceof Promise && (r = r.catch((e) => {
				throw Error(`Custom strategy "${t}" setLocale failed.`, { cause: e });
			}), i.push(r));
		}
	}
	let o = () => {
		n.reload && window.location && e !== r && ml(void 0);
	};
	if (i.length) return Promise.all(i).then(() => {
		o();
	});
	o();
};
function gl(e) {
	if (typeof e != "string") return;
	let t = e.toLowerCase();
	for (let e of tl) if (e.toLowerCase() === t) return e;
}
function _l(e) {
	let t = gl(e);
	if (t) return t;
	throw Error(`Invalid locale: ${e}. Expected one of: ${tl.join(", ")}`);
}
function vl() {
	if (typeof document > "u" || !document.cookie) return;
	let e = document.cookie.match(RegExp(`(^| )${nl}=([^;]+)`))?.[2];
	return gl(e);
}
function yl() {
	if (!navigator?.languages?.length) return;
	let e = navigator.languages.map((e) => ({
		fullTag: e,
		baseTag: e.split("-")[0]
	}));
	for (let t of e) {
		let e = gl(t.fullTag);
		if (e) return e;
		let n = gl(t.baseTag);
		if (n) return n;
	}
}
var bl = /* @__PURE__ */ new Map();
function xl(e) {
	return typeof e == "string" && /^custom-[A-Za-z0-9_-]+$/.test(e);
}
//#endregion
//#region src/lib/paraglide/messages/header_logo_1.js
var Sl = () => "디지털 물류 운영 플랫폼", Cl = () => "Digital Logistics Operations Platform", wl = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Sl(e) : Cl(e)), Tl = () => "산업 현장 AI 업무지원 플랫폼", El = () => "AI-Powered Industrial \nOperations Support Platform", Dl = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Tl(e) : El(e)), Ol = () => "공간 인식 기반 \n디지털 공간 제작/배포 플랫폼", kl = () => "Spatial Intelligence Platform for \nDigital Space Creation & Distribution", Al = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ol(e) : kl(e)), jl = () => "산업 현장의 일하는 방식을 \n 공간지능으로 바꿉니다", Ml = () => "Transforming Industrial Operations \nThrough Spatial Intelligence", Nl = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? jl(e) : Ml(e)), Pl = () => "딥파인의 제품과 기술력은 다양한 산업 현장에서 검증되었습니다.", Fl = () => "Deepfine’s products and technologies have been proven across diverse industrial environments.", Il = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Pl(e) : Fl(e)), Ll = () => "딥파인은 물류, 제조·MRO, 공간 데이터 분야의 현장 문제를 해결하는 산업 특화 AI 솔루션을 제공합니다.", Rl = () => "Deepfine provides industry-specific AI solutions that address operational challenges in logistics, manufacturing, MRO, and spatial data sectors.", zl = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ll(e) : Rl(e)), Bl = () => "스마트 물류 운영 솔루션", Vl = () => "Smart Logistics Operation Solution", Hl = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Bl(e) : Vl(e)), Ul = () => "LOGI.FINE은 물류센터의 피킹, 검수, 분류, 패킹 업무를 스마트글라스와 Vision AI 기반으로 지원하는 솔루션입니다.", Wl = () => "LOGI.FINE is a solution that supports picking, inspection, sorting, and packing operations in distribution centers through smart glasses and Vision AI.", Gl = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ul(e) : Wl(e)), Kl = () => "AI 현장 업무 관리·자동화 솔루션", ql = () => "AI-Powered Field Operations Management & Automation Solution", Jl = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Kl(e) : ql(e)), Yl = () => "DAO는 MRO, 방산, 제조 현장의 점검·정비 업무에 필요한 정보를 \n스마트글라스로 제공하고, 작업자의 현장 업무 수행을 지원하는 솔루션입니다.", Xl = () => "DAO is a solution that provides the information needed for inspection and maintenance tasks in MRO, defense, and manufacturing environments through smart glasses, helping workers perform field operations more efficiently.", Zl = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Yl(e) : Xl(e)), Ql = () => "공간 인식 기반 디지털 공간 제작/배포 솔루션", $l = () => "Spatial Intelligence Platform for Digital Space Creation & Distribution", eu = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ql(e) : $l(e)), tu = () => "DSC는 현실 공간을 디지털 공간 정보로 생성하고, \n위치 인식과 XR 콘텐츠를 결합해 \n다양한 산업 현장에서 현실/가상 공간을 연결하는 서비스를 구현하는 솔루션입니다", nu = () => "DSC is a solution that transforms physical spaces into digital spatial information and combines location awareness with XR content to enable services that connect physical and virtual spaces across diverse industrial environments.", ru = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? tu(e) : nu(e)), iu = () => "We Transform \n How Industrial Sites Work", au = () => "We Transform \n How Industrial Sites Work", ou = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? iu(e) : au(e)), su = () => "산업현장의 공간을 인식하고, 작업을 데이터화하며, 산업 운영의 AX 전환을 가속합니다.", cu = () => "Recognizing industrial spaces, digitizing workflows, and accelerating the AI transformation of industrial operations.", lu = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? su(e) : cu(e)), uu = () => "딥파인은 공간지능, Vision AI, 운영 데이터 기술을 기반으로 \n현장의 공간·작업·설비 데이터를 연결하고, 산업 운영의 디지털 전환을 지원합니다.", du = () => "Powered by Spatial Intelligence, Vision AI, and operational data technologies, \nDeepfine connects spatial, workflow, and asset data across industrial environments and supports the digital transformation of industrial operations.", fu = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? uu(e) : du(e)), pu = () => "공간지능 AI", mu = () => "Spatial Intelligence AI", hu = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? pu(e) : mu(e)), gu = () => "V-SLAM · VPS · 3D 공간 매핑", _u = () => "V-SLAM · VPS · 3D Spatial Mapping", vu = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? gu(e) : _u(e)), yu = () => "현실 공간을 인식하고 3D 공간 데이터로 구조화해 \n산업 현장의 공간 정보를 운영 자산으로 전환합니다.", bu = () => "Recognizes physical spaces and converts them into structured 3D spatial data, transforming industrial spatial information into operational assets.", xu = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? yu(e) : bu(e)), Su = () => "비전 어시스트 AI", Cu = () => "Vision Assist AI", wu = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Su(e) : Cu(e)), Tu = () => "객체 인식 · 문자 인식 · 바코드 인식", Eu = () => "Object Recognition · OCR · Barcode Recognition", Du = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Tu(e) : Eu(e)), Ou = () => "작업자 시점의 이미지, 바코드, 설비, 작업 상태를 인식해\n 검수·점검 업무와 사진·영상 기반 작업 기록을 지원합니다.", ku = () => "Recognizes images, barcode, equipment, and task status from the worker's perspective to support inspection and verification workflows, as well as photo- and video-based work documentation.", Au = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ou(e) : ku(e)), ju = () => "운영 데이터 AI", Mu = () => "Operational Data AI", Nu = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ju(e) : Mu(e)), Pu = () => "작업 로그 분석 · API 연동 · 대시보드", Fu = () => "Task Log Analysis · API Integration · Dashboard", Iu = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Pu(e) : Fu(e)), Lu = () => "작업 로그, 사진·영상 기록, 오류, 처리 시간 데이터를 \n분석해 현장 운영의 병목을 파악하고 업무 최적화를 지원합니다.", Ru = () => "Analyzes task logs, photo/video records, errors, and processing times to identify operational bottlenecks and support workflow optimization.", zu = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Lu(e) : Ru(e)), Bu = () => "수상 및 인증", Vu = () => "Awards & Certifications", Hu = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Bu(e) : Vu(e)), Uu = () => "산업 데이터 리포트", Wu = () => "Industrial Data Reports", Gu = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Uu(e) : Wu(e)), Ku = () => "글로벌 대기업·공공기관 고객 및 파트너", qu = () => "Global Enterprises & Public Sector Clients and Partners", Ju = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ku(e) : qu(e)), Yu = () => "스마트글라스 기반 \n지능형 솔루션 \n국내 산업 시장 선도", Xu = () => "Korea's Leading Provider of Smart Glasses-Based Intelligent Solutions", Zu = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Yu(e) : Xu(e)), Qu = () => "고객 유지율", $u = () => "Customer Retention Rate", ed = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Qu(e) : $u(e)), td = () => "Why DEEP.FINE", nd = () => "Why DEEP.FINE", rd = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? td(e) : nd(e)), id = () => "실제 산업 현장에서 축적한 작업·공간·운영 데이터가 딥파인의 차별화된 AI 경쟁력입니다.", ad = () => "Deepfine's AI advantage is built on work, spatial, and operational data accumulated in real industrial environments.", od = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? id(e) : ad(e)), sd = () => "다양한 산업 현장에서 \n 검증된 성과를 만들고 있습니다.", cd = () => "Delivering Proven Results\n Across Diverse Industries", ld = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? sd(e) : cd(e)), ud = () => "딥파인은 물류·제조·공공·관광 등 다양한 산업 현장에서 \n 작업 효율화, 오류 감소, 업무 표준화, \n데이터 기반 운영 관리를 검증하고 있습니다.", dd = () => "Deepfine is delivering measurable results across \n logistics, manufacturing, public services, tourism, and other industries \n by improving operational efficiency, reducing errors, standardizing workflows, \n and enabling data-driven operations management.", fd = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ud(e) : dd(e)), pd = () => "공공시설 점검", md = () => "Public Facility Inspection", hd = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? pd(e) : md(e)), gd = () => "조선·중공업 MRO", _d = () => "Shipbuilding & Heavy Industry MRO", vd = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? gd(e) : _d(e)), yd = () => "물류·3PL", bd = () => "Logistics & 3PL", xd = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? yd(e) : bd(e)), Sd = () => "대형 공공시설", Cd = () => "Large Public Facilities", wd = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Sd(e) : Cd(e)), Td = () => "관광·축제", Ed = () => "Tourism & Festivals", Dd = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Td(e) : Ed(e)), Od = () => "스마트글라스 기반 원격 점검으로 \n출장 비용 60% 절감, 생산성 34% 향상", kd = () => "60% reduction in travel costs and 34% increase in productivity through smart glasses-based remote inspections", Ad = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Od(e) : kd(e)), jd = () => "Vision Assist로  도면·작업 지침을 즉시 표시해 \n정비 시간 30% 단축, 교육 기간 40% 단축", Md = () => "30% shorter maintenance time and 40% shorter training period by instantly displaying drawings and work instructions with Vision Assist", Nd = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? jd(e) : Md(e)), Pd = () => "스마트 글라스 기반 피킹/검수 솔루션을 도입해 \n시간당 생산성 58% 향상, 1피킹당 시간 75% 단축", Fd = () => "58% increase in hourly productivity and 75% reduction in time per pick through a smart glasses-based picking and inspection solution", Id = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Pd(e) : Fd(e)), Ld = () => "VPS 기반 대형 역사 AR 내비게이션을 통한 \n사용자 만족도 4.28점 달성", Rd = () => "4.28 user satisfaction score through VPS-based AR navigation in major transit stations", zd = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ld(e) : Rd(e)), Bd = () => "* 비장애인·교통약자·외국인 대상", Vd = () => "* For general users, mobility-impaired users, and international visitors.", Hd = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Bd(e) : Vd(e)), Ud = () => "AI 혼잡도 분석과 맞춤 경로 추천으로 \n누적 이용 416만 건, \n방문객 만족도 4.3점 달성", Wd = () => "4.16M uses and a 4.3 visitor satisfaction score through AI-powered crowd analysis and personalized route recommendations.", Gd = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ud(e) : Wd(e)), Kd = () => "DEEP.FINE NEWS", qd = () => "DEEP.FINE NEWS", Jd = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Kd(e) : qd(e)), Yd = () => "딥파인의 산업 AI, 공간지능, 스마트글라스 플랫폼 적용 사례와 최신 소식을 확인하세요.", Xd = () => "Explore the latest news and real-world applications of Deepfine's Industrial AI, Spatial Intelligence, and Smart Glasses platforms.", Zd = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Yd(e) : Xd(e)), Qd = () => "검증된 산업 AI를 \n 귀사의 현장에 적용해보세요.", $d = () => "Apply proven industrial AI \nto your operations.", ef = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Qd(e) : $d(e)), tf = () => "고객사의 실제 운영 환경에 맞는 도입 전략을 제안드립니다.", nf = () => "We provide implementation strategies tailored \nto your operating environment.", rf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? tf(e) : nf(e)), af = () => "DEEP.FINE의 최신 개발, 전망 및 혁신을 알아보세요.", of = () => "Stay Updated with DEEP.FINE's Latest News and Insights.", sf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? af(e) : of(e)), cf = () => "DEEP.FINE의 혁신을 이끄는 사람들과 조직을 소개합니다.", lf = () => "The People and Teams Powering DEEP.FINE's Innovation", uf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cf(e) : lf(e)), df = () => "물류 운영, 현장 협업, 디지털 공간 구축까지 업무 환경에 맞는 플랫폼을 함께 설계해 드립니다.", ff = () => "From logistics operations and field collaboration to digital spatial environments, we'll help you design the right platform for your business.", pf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? df(e) : ff(e)), mf = () => "DEEP.FINE AR.ON DAO", hf = () => "DEEP.FINE AR.ON DAO", gf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mf(e) : hf(e)), _f = () => "산업 현장 어디서든 \n완벽한 업무 비서가 됩니다", vf = () => "Your Perfect Work Assistant, \n Anywhere on the Industrial Site", yf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _f(e) : vf(e)), bf = /* @__PURE__ */ Object.assign((() => "설비 번호를 스캔하면 도면·매뉴얼이 눈앞에 뜨고,\n음성 명령으로 체크리스트를 완료하고,  작업 결과가 자동으로 기록됩니다.산업현장 AI 업무 지원·관리 플랫폼을 만나보세요."), { parts: (() => [
	{
		type: "markup-start",
		name: "p",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "설비 번호를 스캔하면 도면·매뉴얼이 눈앞에 뜨고,\n음성 명령으로 체크리스트를 완료하고,  작업 결과가 자동으로 기록됩니다."
	},
	{
		type: "markup-end",
		name: "p",
		options: {},
		attributes: {}
	},
	{
		type: "markup-start",
		name: "p",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "산업현장 AI 업무 지원·관리 플랫폼을 만나보세요."
	},
	{
		type: "markup-end",
		name: "p",
		options: {},
		attributes: {}
	}
]) }), xf = /* @__PURE__ */ Object.assign((() => "Scan an equipment ID and drawings and \nmanuals appear right before your eyes. Complete checklists with voice commands, and \n seamlessly record and manage work results. Discover the AI work support and \nmanagement platform for industrial sites."), { parts: (() => [
	{
		type: "markup-start",
		name: "p",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Scan an equipment ID and drawings and \nmanuals appear right before your eyes."
	},
	{
		type: "markup-end",
		name: "p",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " "
	},
	{
		type: "markup-start",
		name: "p",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Complete checklists with voice commands, and \n seamlessly record and manage work results."
	},
	{
		type: "markup-end",
		name: "p",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " "
	},
	{
		type: "markup-start",
		name: "p",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Discover the AI work support and \nmanagement platform for industrial sites."
	},
	{
		type: "markup-end",
		name: "p",
		options: {},
		attributes: {}
	}
]) }), Sf = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bf(e) : xf(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof bf.parts == "function" ? bf.parts(e) : [{
	type: "text",
	value: bf(e)
}] : typeof xf.parts == "function" ? xf.parts(e) : [{
	type: "text",
	value: xf(e)
}]) }), Cf = () => "Problem & Solution", wf = () => "Problem & Solution", Tf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Cf(e) : wf(e)), Ef = () => "DAO 도입 전과 후, 현장이 달라집니다", Df = () => "See the Difference Before and After DAO.", Of = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ef(e) : Df(e)), kf = () => "숙련자 감소, 경험 의존 판단", Af = () => "Skilled Worker Shortage & Experience-Dependent Decision Making", jf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kf(e) : Af(e)), Mf = () => "산업 현장에서 숙련자가 빠르게 줄고 있지만, 현장 작업은 여전히 사람의 경험과 판단에 의존합니다.", Nf = () => "As the number of skilled workers continues to decline, field operations still rely on human experience and judgment.", Pf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Mf(e) : Nf(e)), Ff = () => "이중 작업으로 인한 시간 낭비", If = () => "Time Wasted on Duplicate Tasks", Lf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ff(e) : If(e)), Rf = () => "현장에서 수기로 기록한 후 사무실에서 다시 입력하는 이중 작업이 반복됩니다.", zf = () => "Information recorded in the field is re-entered in the office, resulting in repetitive and inefficient workflows.", Bf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Rf(e) : zf(e)), Vf = () => "종이 기반 데이터, 검색·분석 불가", Hf = () => "Paper-Based Data with No Search and Analytics Capability", Uf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Vf(e) : Hf(e)), Wf = () => "작업 이력이 종이나 개인 파일로만 남아 필요할 때 찾을 수 없습니다.", Gf = () => "Work history is stored only in paper documents or personal files, making it difficult to access when needed.", Kf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Wf(e) : Gf(e)), qf = () => "원거리 점검의 높은 비용", Jf = () => "High Remote Inspection Costs", Yf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qf(e) : Jf(e)), Xf = () => "전문가의 현장 방문으로 출장 비용이 과도하게 발생합니다.", Zf = () => "On-site visits by experts lead to excessive travel costs.", Qf = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Xf(e) : Zf(e)), $f = () => "설비 번호 인식으로 즉시 확인", ep = () => "Instant Equipment Identification", tp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $f(e) : ep(e)), np = () => "설비 번호를 스캔하면 해당 설비의 도면·매뉴얼·체크리스트를 시야에 즉시 띄웁니다", rp = () => "Scan an equipment ID to instantly display its drawings, manuals, and checklists within your field of view.", ip = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? np(e) : rp(e)), ap = () => "음성 명령으로 양손이 자유롭게", op = () => "Hands-Free Operation with Voice Commands", sp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ap(e) : op(e)), cp = () => "체크리스트 수행, 작업 증빙 기록 등 음성 명령 만으로 모든 작업을 완료합니다.", lp = () => "Complete checklists, record work evidence, and perform all tasks using voice commands.", up = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cp(e) : lp(e)), dp = () => "모든 작업 데이터 자동 디지털화", fp = () => "Automatic Digitization of All Work Data", pp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dp(e) : fp(e)), mp = () => "체크리스트, 사진, 음성 메모가 모두 자동으로 저장되고 실시간 동기화되어 언제든 검색·조회 가능합니다.", hp = () => "Automatically save and sync checklists, photos, and voice notes for easy search and access anytime.", gp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mp(e) : hp(e)), _p = () => "원격 협업으로 출장 없이 해결", vp = () => "Resolve Issues Remotely Without Travel", yp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _p(e) : vp(e)), bp = () => "전문가가 원격으로 AR 지시를 내려 출장을 대체합니다.", xp = () => "Experts provide remote AR guidance—eliminating the need for on-site visits.", Sp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bp(e) : xp(e)), Cp = () => "Industries", wp = () => "Industries", Tp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Cp(e) : wp(e)), Ep = () => "정비·점검이 필요한 \n모든 산업 현장에 적용됩니다", Dp = () => "Applicable to any industrial environment \n that requires maintenance and inspection", Op = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ep(e) : Dp(e)), kp = () => "조선·중공업부터 식품·제약까지, \n다양한 산업 환경에 유연하게 대응합니다.", Ap = () => "From shipbuilding and heavy industry to food and pharmaceuticals, \n the solution adapts flexibly to a wide range of industrial environments.", jp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kp(e) : Ap(e)), Mp = () => "조선·중공업 MRO", Np = () => "Shipbuilding & Heavy Industry MRO", Pp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Mp(e) : Np(e)), Fp = () => "제조 공장 품질·위생 점검", Ip = () => "Manufacturing Quality & Hygiene Inspections", Lp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Fp(e) : Ip(e)), Rp = () => "건설 현장 안전관리", zp = () => "Construction Safety Management", Bp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Rp(e) : zp(e)), Vp = () => "에너지·플랜트 설비 유지보수", Hp = () => "Energy & Plant Maintenance", Up = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Vp(e) : Hp(e)), Wp = () => "식품·제약 GMP 점검", Gp = () => "GMP Inspections for Food & Pharma", Kp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Wp(e) : Gp(e)), qp = () => "전력·에너지 설비 점검", Jp = () => "Power & Energy Inspections", Yp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qp(e) : Jp(e)), Xp = () => "Features", Zp = () => "Features", Qp = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Xp(e) : Zp(e)), $p = () => "DAO 핵심 기능으로 산업 현장을 바꿉니다", em = () => "We transform industrial workplaces with core DAO features.", tm = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $p(e) : em(e)), nm = () => "비전 어시스트", rm = () => "Vision Assist", im = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nm(e) : rm(e)), am = () => "스마트글라스로 설비 번호를 스캔하면 도면·매뉴얼이 시야에 즉시 표시됩니다.", om = () => "Scan equipment IDs with smart glasses, and drawings/manuals appear instantly in your field of view.", sm = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? am(e) : om(e)), cm = () => "AI 챗봇으로 유지보수·설치방법·주의 사항 등 매뉴얼을 즉시 탐색해 보세요.", lm = () => "Use the AI chatbot to instantly search manuals for maintenance, installation instructions, precautions, and more.", um = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cm(e) : lm(e)), dm = () => "조선 MRO 현장 정비 시간 30% 단축", fm = () => "Shipyard MRO site 30% reduction in maintenance time", pm = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dm(e) : fm(e)), mm = () => "설비 번호 자동 인식", hm = () => "Automatic equipment ID recognition", gm = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mm(e) : hm(e)), _m = () => "QR 스캔", vm = () => "QR scanning", ym = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _m(e) : vm(e)), bm = () => "도면 뷰어", xm = () => "Drawing viewer", Sm = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bm(e) : xm(e)), Cm = () => "메뉴얼 검색(LLM)", wm = () => "Manual search (LLM)", Tm = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Cm(e) : wm(e)), Em = () => "사진대지", Dm = () => "Photo Reports", Om = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Em(e) : Dm(e)), km = () => "스마트글라스 등 다양한 디바이스를 통해 현장을 바로 촬영하고,\n사진에 음성 메모를 결합하여 작업 현황을 기록합니다.", Am = () => "Capture the worksite instantly using smart glasses or other devices, and record work progress by combining photos with voice notes.", jm = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? km(e) : Am(e)), Mm = () => "조선·건설 현장 현장 증빙 작성 효율화", Nm = () => "Improved Documentation Efficiency for Shipbuilding and Construction Sites", Pm = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Mm(e) : Nm(e)), Fm = () => "사진+메모 자동 결합", Im = () => "Automatic Photo & Note Integration", Lm = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Fm(e) : Im(e)), Rm = () => "작업 전/후 비교", zm = () => "Before-and-After Work Comparison", Bm = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Rm(e) : zm(e)), Vm = () => "워크플로우", Hm = () => "Workflow", Um = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Vm(e) : Hm(e)), Wm = () => "업무 표준 체크리스트 생성부터 레포트 작성, 완료 시 결과 보고서(PDF, Excel)가 자동 생성되며,\n모든 데이터는 PC·모바일·스마트글라스에서 실시간 동기화를 지원합니다", Gm = () => "From standardized checklist creation to report generation, result reports (PDF and Excel) are automatically generated upon completion, with all data synchronized in real time across PCs, mobile devices, and smart glasses.\n Overlay AR manuals and 3D models onto real-world objects for intuitive information visualization and guidance.", Km = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Wm(e) : Gm(e)), qm = () => "실제 객체 위에 증강된 AR 매뉴얼, 3D 객체를 증강시켜 직관적인 정보 인식이 가능합니다.", Jm = () => "Augmented AR manuals and 3D objects overlaid on real-world objects enable intuitive information recognition.", Ym = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qm(e) : Jm(e)), Xm = () => "식품기업 협력사 품질점검 업무 생산성 34% 향상", Zm = () => "Over 34% Increase in Productivity for Supplier Quality Inspection Operations", Qm = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Xm(e) : Zm(e)), $m = () => "자동 보고서", eh = () => "Automated Reporting", th = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $m(e) : eh(e)), nh = () => "오프라인 모드 지원", rh = () => "Offline mode support", ih = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nh(e) : rh(e)), ah = () => "IoT 데이터 증강", oh = () => "IoT Data Integration", sh = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ah(e) : oh(e)), ch = () => "AR 매뉴얼", lh = () => "AR manuals", uh = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ch(e) : lh(e)), dh = () => "다자간 실시간 협업", fh = () => "Multi-party real-time collaboration", ph = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dh(e) : fh(e)), mh = () => "다자간 영상회의로 AR 드로잉·포인팅으로 직관적인 작업 지시를 내려 출장 없이 현장을 해결합니다.", hh = () => "Multi-party video conferencing with AR drawing and pointing enables intuitive work guidance, allowing issues to be resolved remotely without on-site travel.\n Multiple users can simultaneously interact with shared AR objects, enabling real-time collaboration in the same augmented environment.", gh = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mh(e) : hh(e)), _h = () => "증간된 AR 객체에 여러 사용자들이 동시 접근하여 멀티 인터렉션도 가능합니다.", vh = () => "Multiple users can simultaneously access augmented AR objects, enabling multi-interaction.", yh = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _h(e) : vh(e)), bh = () => "경기도 원격 안전점검 출장 시간·비용 60% 절감", xh = () => "60% Reduction in Travel Time and Costs for Remote Safety Inspections in Gyeonggi Province", Sh = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bh(e) : xh(e)), Ch = () => "스마트글라스 원격 제어", wh = () => "Smart glasses remote control", Th = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ch(e) : wh(e)), Eh = () => "체크리스트 동시 작성", Dh = () => "Collaborative checklist creation", Oh = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Eh(e) : Dh(e)), kh = () => "얼굴 자동 모자이크", Ah = () => "Automatic Face Blurring", jh = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kh(e) : Ah(e)), Mh = () => "Proven Results", Nh = () => "Proven Results", Ph = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Mh(e) : Nh(e)), Fh = () => "실제 현장에서 증명된 결과입니다.", Ih = () => "Proven Results in Real-World Operations", Lh = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Fh(e) : Ih(e)), Rh = () => "업무 효율성 향상", zh = () => "Improvement in Operational Efficiency", Bh = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Rh(e) : zh(e)), Vh = () => "경기도 전역 시설물 원격 안전점검, \n 조선 산업 AR 작업 가이드 도입 효과", Hh = () => "Results from remote facility safety inspections across Gyeonggi Province and AR-guided workflows in the shipbuilding industry.", Uh = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Vh(e) : Hh(e)), Wh = () => "설비 다운타임 감소", Gh = () => "Reduction in Equipment Downtime", Kh = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Wh(e) : Gh(e)), qh = () => "제조 설비 MRO 예측 정비 시스템 구축", Jh = () => "Results from implementing a predictive maintenance system for manufacturing equipment", Yh = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qh(e) : Jh(e)), Xh = () => "교육 시간 단축", Zh = () => "Reduction in Training Time", Qh = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Xh(e) : Zh(e)), $h = () => "조선 산업 신규 작업자 OJT 적용", eg = () => "Results from implementing OJT for new workers in the shipbuilding industry", tg = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $h(e) : eg(e)), ng = () => "작업 표준화", rg = () => "Standardization of Work Processes", ig = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ng(e) : rg(e)), ag = () => "제조 설비 워크플로우 구축 완료", og = () => "Completion of a standardized workflow for manufacturing equipment", sg = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ag(e) : og(e)), cg = () => "공공기관 · 시설관리", lg = () => "Public Institutions · Facility Management", ug = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cg(e) : lg(e)), dg = () => "경기도 전역 시설물 안전점검을 위한\n 스마트글라스 활용 원격안전점검 수행", fg = () => "Remote facility safety inspections using smart glasses across Gyeonggi Province", pg = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dg(e) : fg(e)), mg = () => "스마트글라스로 현장의 영상을 공유하면서 실시간으로 보수·보강 대책 등을 컨설팅합니다.", hg = () => "Live video streamed through smart glasses enables experts to provide real-time guidance on maintenance and reinforcement measures.", gg = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mg(e) : hg(e)), _g = () => "기존에는 약 40%에 달하는 시설물 안전점검이 원격으로 수행되어,\n 원거리 출장에 필요한 시간과 비용이 60% 절감되고 민원 처리율이 3배 증가하였습니다.", vg = () => "Approximately 40% of facility safety inspections were performed remotely,\n resulting in a 60% reduction in travel time and costs and a 3× increase in complaint resolution rates.", yg = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _g(e) : vg(e)), bg = /* @__PURE__ */ Object.assign((() => "출장 시간·비용\xA060% 절감"), { parts: (() => [
	{
		type: "text",
		value: "출장 시간·비용\xA0"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "60% 절감"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), xg = /* @__PURE__ */ Object.assign((() => "60% Reduction in Travel Time & Costs"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "60% Reduction"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " in Travel Time & Costs"
	}
]) }), Sg = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bg(e) : xg(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof bg.parts == "function" ? bg.parts(e) : [{
	type: "text",
	value: bg(e)
}] : typeof xg.parts == "function" ? xg.parts(e) : [{
	type: "text",
	value: xg(e)
}]) }), Cg = /* @__PURE__ */ Object.assign((() => "민원 처리율\xA03배 증가"), { parts: (() => [
	{
		type: "text",
		value: "민원 처리율\xA0"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "3배 증가"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), wg = /* @__PURE__ */ Object.assign((() => "3x Increase in Complaint Processing Rate"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "3x Increase"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " in Complaint Processing Rate"
	}
]) }), Tg = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Cg(e) : wg(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof Cg.parts == "function" ? Cg.parts(e) : [{
	type: "text",
	value: Cg(e)
}] : typeof wg.parts == "function" ? wg.parts(e) : [{
	type: "text",
	value: wg(e)
}]) }), Eg = /* @__PURE__ */ Object.assign((() => "전문가 1인이\xA0다수 현장 원격 점검"), { parts: (() => [
	{
		type: "text",
		value: "전문가 1인이\xA0"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "다수 현장 원격 점검"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), Dg = /* @__PURE__ */ Object.assign((() => "Remote Multi-Site Inspection by a Single Expert"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Remote Multi-Site Inspection"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " by a Single Expert"
	}
]) }), Og = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Eg(e) : Dg(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof Eg.parts == "function" ? Eg.parts(e) : [{
	type: "text",
	value: Eg(e)
}] : typeof Dg.parts == "function" ? Dg.parts(e) : [{
	type: "text",
	value: Dg(e)
}]) }), kg = () => "건설 · 안전관리", Ag = () => "Construction · Safety Management", jg = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kg(e) : Ag(e)), Mg = () => "건설사의 효율적인 안전관리를 위한 상시 모니터링 체계", Ng = () => "A Continuous Monitoring System for Efficient Safety Management in Construction", Pg = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Mg(e) : Ng(e)), Fg = () => "REMOTE를 통해 스마트글라스, 무인 드론 등 폭넓은 스마트 디바이스 연계를 지원하여 \n건설현장을 실시간으로 관리하는 원격현장관리플랫폼을 구축하였습니다.", Ig = () => "REMOTE enables real-time construction site management through integration with a wide range of smart devices, \nincluding smart glasses and unmanned drones.", Lg = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Fg(e) : Ig(e)), Rg = () => "안전관리에 필요한 점검항목을 스마트글라스로 수행하며 표준화된 업무 프로세스를 제공합니다.", zg = () => "Safety inspections are performed using smart glasses, ensuring standardized workflows and more efficient safety management.", Bg = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Rg(e) : zg(e)), Vg = /* @__PURE__ */ Object.assign((() => "안전 사고\xA0감소"), { parts: (() => [
	{
		type: "text",
		value: "안전 "
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "사고\xA0감소"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), Hg = /* @__PURE__ */ Object.assign((() => "Reduction in Safety Incidents"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Reduction"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " in Safety Incidents"
	}
]) }), Ug = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Vg(e) : Hg(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof Vg.parts == "function" ? Vg.parts(e) : [{
	type: "text",
	value: Vg(e)
}] : typeof Hg.parts == "function" ? Hg.parts(e) : [{
	type: "text",
	value: Hg(e)
}]) }), Wg = /* @__PURE__ */ Object.assign((() => "실시간 현장\xA0모니터링 체계 구축"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "실시간 현장\xA0모니터링"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " 체계 구축"
	}
]) }), Gg = /* @__PURE__ */ Object.assign((() => "Real-Time On-Site Monitoring System"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Real-Time On-Site Monitoring System"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), Kg = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Wg(e) : Gg(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof Wg.parts == "function" ? Wg.parts(e) : [{
	type: "text",
	value: Wg(e)
}] : typeof Gg.parts == "function" ? Gg.parts(e) : [{
	type: "text",
	value: Gg(e)
}]) }), qg = /* @__PURE__ */ Object.assign((() => "표준화된\xA0업무 프로세스 제공"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "표준화된\xA0업무 프로세스"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " 제공"
	}
]) }), Jg = /* @__PURE__ */ Object.assign((() => "Standardized Work Processes"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Standardized Work Processes"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), Yg = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qg(e) : Jg(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof qg.parts == "function" ? qg.parts(e) : [{
	type: "text",
	value: qg(e)
}] : typeof Jg.parts == "function" ? Jg.parts(e) : [{
	type: "text",
	value: Jg(e)
}]) }), Xg = () => "제조 · 품질관리", Zg = () => "Manufacturing · Quality Control", Qg = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Xg(e) : Zg(e)), $g = () => "식품 기업의 국내외 협력사 \n품질관리 및 위생상태 점검 방법", e_ = () => "Quality and Hygiene Inspections for Domestic and International Suppliers of a Food Company", t_ = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $g(e) : e_(e)), n_ = () => "REMOTE를 통해 국내외 협력사 품질 관리 및 비대면 A/S 처리가 가능해졌습니다.", r_ = () => "REMOTE enables supplier quality management and remote after-sales support across domestic and international partner networks.", i_ = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? n_(e) : r_(e)), a_ = () => "DAO Workflow을 통해 스마트글라스를 착용하고 제조공장의 위생점검, 안전관리를 단독으로 수행하여 생산성을 34% 향상되었습니다.", o_ = () => "With DAO Workflow and smart glasses, a single worker can independently conduct hygiene inspections and safety checks in manufacturing facilities, improving productivity by 34%.", s_ = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? a_(e) : o_(e)), c_ = /* @__PURE__ */ Object.assign((() => "업무 생산성\xA034% 향상"), { parts: (() => [
	{
		type: "text",
		value: "업무 생산성\xA0"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "34% 향상"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), l_ = /* @__PURE__ */ Object.assign((() => "34% Improvement in Productivity"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "34% Improvement"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " in Productivity"
	}
]) }), u_ = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? c_(e) : l_(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof c_.parts == "function" ? c_.parts(e) : [{
	type: "text",
	value: c_(e)
}] : typeof l_.parts == "function" ? l_.parts(e) : [{
	type: "text",
	value: l_(e)
}]) }), d_ = /* @__PURE__ */ Object.assign((() => "단독 점검으로\xA0인력 효율화"), { parts: (() => [
	{
		type: "text",
		value: "단독 점검으로\xA0"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "인력 효율화"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), f_ = /* @__PURE__ */ Object.assign((() => "Improved Workforce Efficiency Through Independent Inspections"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Improved Workforce"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " Efficiency Through Independent Inspections"
	}
]) }), p_ = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? d_(e) : f_(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof d_.parts == "function" ? d_.parts(e) : [{
	type: "text",
	value: d_(e)
}] : typeof f_.parts == "function" ? f_.parts(e) : [{
	type: "text",
	value: f_(e)
}]) }), m_ = /* @__PURE__ */ Object.assign((() => "결과 보고서\xA0자동 생성"), { parts: (() => [
	{
		type: "text",
		value: "결과 보고서\xA0"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "자동 생성"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), h_ = /* @__PURE__ */ Object.assign((() => "Automated Report Generation"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Automated Report"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " Generation"
	}
]) }), g_ = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? m_(e) : h_(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof m_.parts == "function" ? m_.parts(e) : [{
	type: "text",
	value: m_(e)
}] : typeof h_.parts == "function" ? h_.parts(e) : [{
	type: "text",
	value: h_(e)
}]) }), __ = () => "자동차 · XR 쇼룸", v_ = () => "Automotive · XR Showroom", y_ = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? __(e) : v_(e)), b_ = () => "Mercedes Benz XR Showroom", x_ = () => "Mercedes-Benz XR Showroom", S_ = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? b_(e) : x_(e)), C_ = () => "스마트글라스를 통하여 DEEP.FINE의 초실감형 XR 매뉴얼 및 체험형 가상 메르세데스 비대면 차량 안내 서비스로 \n매장에 직접 방문하지 않더라도 원거리에 있는 고객과 딜러가 함께 벤츠의 기술력과 우수한 실내외 디자인에 대해서 \n편리하게 커뮤니케이션 가능하여 미래 메타버스 디지털 소비의 패러다임을 주도할 수 있습니다.", w_ = () => "DEEP.FINE's immersive XR manuals and virtual Mercedes-Benz showroom experience, powered by smart glasses, enable customers and dealers to interact remotely without the need for an in-person showroom visit.\n Customers can explore Mercedes-Benz technologies and premium vehicle designs in an engaging virtual environment, creating a new standard for metaverse-driven digital experiences.", T_ = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? C_(e) : w_(e)), E_ = /* @__PURE__ */ Object.assign((() => "XR 쇼룸\xA0글로벌 확대"), { parts: (() => [
	{
		type: "text",
		value: "XR 쇼룸\xA0"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "글로벌 확대"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), D_ = /* @__PURE__ */ Object.assign((() => "Global Expansion of XR Showrooms"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Global Expansion"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " of XR Showrooms"
	}
]) }), O_ = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? E_(e) : D_(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof E_.parts == "function" ? E_.parts(e) : [{
	type: "text",
	value: E_(e)
}] : typeof D_.parts == "function" ? D_.parts(e) : [{
	type: "text",
	value: D_(e)
}]) }), k_ = /* @__PURE__ */ Object.assign((() => "고객 체험 만족도\xA0향상"), { parts: (() => [
	{
		type: "text",
		value: "고객 체험 "
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "만족도\xA0향상"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), A_ = /* @__PURE__ */ Object.assign((() => "Enhanced Customer Experience"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Enhanced"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " Customer Experience"
	}
]) }), j_ = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? k_(e) : A_(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof k_.parts == "function" ? k_.parts(e) : [{
	type: "text",
	value: k_(e)
}] : typeof A_.parts == "function" ? A_.parts(e) : [{
	type: "text",
	value: A_(e)
}]) }), M_ = /* @__PURE__ */ Object.assign((() => "가상 전시\xA0비용 절감"), { parts: (() => [
	{
		type: "text",
		value: "가상 전시\xA0"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "비용 절감"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), N_ = /* @__PURE__ */ Object.assign((() => "Reduced Virtual Exhibition Costs"), { parts: (() => [
	{
		type: "text",
		value: "Reduced Virtual "
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Exhibition Costs"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), P_ = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? M_(e) : N_(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof M_.parts == "function" ? M_.parts(e) : [{
	type: "text",
	value: M_(e)
}] : typeof N_.parts == "function" ? N_.parts(e) : [{
	type: "text",
	value: N_(e)
}]) }), F_ = () => "조선 · 중공업", I_ = () => "Shipbuilding · Heavy Industry", L_ = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? F_(e) : I_(e)), R_ = () => "대형 선박 정비를 위한 AI 도면 시각화 솔루션", z_ = () => "AI Blueprint Visualization Solution for Large Vessel Maintenance", B_ = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? R_(e) : z_(e)), V_ = () => "대형 조선 / 해양", H_ = () => "Shipbuilding & Offshore Marine", U_ = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? V_(e) : H_(e)), W_ = () => "대형 선박 정비 시 복잡한 도면 해독과 숙련공 부족 문제를 AR 글라스 기반 실시간 작업 가이드 및 원격 전문가 지원으로 해결했습니다.", G_ = () => "Resolved complex blueprint interpretation issues and skilled labor shortages during large vessel maintenance through AR glasses-based real-time task guides and remote expert support.", K_ = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? W_(e) : G_(e)), q_ = () => "Vision Assist로 설비 번호 스캔 시 즉시 도면과 작업 지침이 표시되어 정비 시간이 30% 단축되었으며, \n신규 작업자의 OJT 기간도 40% 단축되었습니다.", J_ = () => "Scanning an equipment ID with Vision Assist instantly displays blueprints and task instructions, \nreducing maintenance time by 30% and shortening new worker OJT periods by 40%.", Y_ = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? q_(e) : J_(e)), X_ = /* @__PURE__ */ Object.assign((() => "종이 도면 없이 즉시 정비 가능"), { parts: (() => [
	{
		type: "text",
		value: "종이 도면 없이 "
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "즉시 정비 가능"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), Z_ = /* @__PURE__ */ Object.assign((() => "Immediate Maintenance Without Paper Drawings"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Immediate Maintenance"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " Without Paper Drawings"
	}
]) }), Q_ = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? X_(e) : Z_(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof X_.parts == "function" ? X_.parts(e) : [{
	type: "text",
	value: X_(e)
}] : typeof Z_.parts == "function" ? Z_.parts(e) : [{
	type: "text",
	value: Z_(e)
}]) }), $_ = /* @__PURE__ */ Object.assign((() => "숙련공 의존 없이 정확한 작업 수행"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "숙련공 의존 없이"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " 정확한 작업 수행"
	}
]) }), ev = /* @__PURE__ */ Object.assign((() => "Accurate Work Without Dependence on Skilled Workers"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Accurate Work"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " Without Dependence on Skilled Workers"
	}
]) }), tv = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $_(e) : ev(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof $_.parts == "function" ? $_.parts(e) : [{
	type: "text",
	value: $_(e)
}] : typeof ev.parts == "function" ? ev.parts(e) : [{
	type: "text",
	value: ev(e)
}]) }), nv = /* @__PURE__ */ Object.assign((() => "신규 작업자 \xA0당일 현장 투입 가능"), { parts: (() => [
	{
		type: "text",
		value: "신규 작업자 \xA0"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "당일 현장 투입 가능"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), rv = /* @__PURE__ */ Object.assign((() => "Same-Day On-Site Deployment for New Workers"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Same-Day On-Site Deployment"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " for New Workers"
	}
]) }), iv = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nv(e) : rv(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof nv.parts == "function" ? nv.parts(e) : [{
	type: "text",
	value: nv(e)
}] : typeof rv.parts == "function" ? rv.parts(e) : [{
	type: "text",
	value: rv(e)
}]) }), av = () => "자주 묻는 질문", ov = () => "Frequently Asked Questions", sv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? av(e) : ov(e)), cv = () => "DAO는 스마트글라스에서만 사용할 수 있나요?", lv = () => "Can DAO be used only with smart glasses?", uv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cv(e) : lv(e)), dv = /* @__PURE__ */ Object.assign((() => "DAO는 다양한 디바이스 환경을 지원합니다.\n\n현장 작업용\n• 스마트글라스: RealWear, Vuzix, Google Glass Enterprise, Magic Leap 등 \n* 주요 산업용 스마트글라스를 모두 지원하며, 특정 모델에 대한 문의는 별도 상담을 통해 확인 가능합니다. • 모바일: Android, iOS\n관리/모니터링용• PC 웹 기반 CMS (관리자 시스템)"), { parts: (() => [
	{
		type: "text",
		value: "DAO는 다양한 디바이스 환경을 지원합니다.\n\n현장 작업용\n"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "• 스마트글라스: RealWear, Vuzix, Google Glass Enterprise, Magic Leap 등 \n* 주요 산업용 스마트글라스를 모두 지원하며, 특정 모델에 대한 문의는 별도 상담을 통해 확인 가능합니다."
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " "
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "• 모바일: Android, iOS"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "\n관리/모니터링용"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "• PC 웹 기반 CMS (관리자 시스템)"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), fv = /* @__PURE__ */ Object.assign((() => "DAO is compatible with a wide range of devices and operating environments. \n\nField Operations \n• Smart Glasses: RealWear, Vuzix, Google Glass Enterprise, Magic Leap, and other leading industrial smart glasses \n* Support is available for all major industrial smart glass platforms. Please contact us for compatibility with specific models.\n• • Mobile Devices: : Android and iOS\n\n Management & Monitoring \n• PC-Based Web CMS (Administrator Portal)"), { parts: (() => [
	{
		type: "text",
		value: "DAO is compatible with a wide range of devices and operating environments. \n\nField Operations \n"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "• Smart Glasses: RealWear, Vuzix, Google Glass Enterprise, Magic Leap, and other leading industrial smart glasses \n* Support is available for all major industrial smart glass platforms. Please contact us for compatibility with specific models."
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "\n"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "• • Mobile Devices:"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : Android and iOS\n\n Management & Monitoring \n"
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "• PC-Based Web CMS (Administrator Portal)"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), pv = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dv(e) : fv(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof dv.parts == "function" ? dv.parts(e) : [{
	type: "text",
	value: dv(e)
}] : typeof fv.parts == "function" ? fv.parts(e) : [{
	type: "text",
	value: fv(e)
}]) }), mv = () => "오프라인(인터넷 없는) 환경에서도 사용할 수 있나요?", hv = () => "Can DAO be used in offline environments without an internet connection?", gv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mv(e) : hv(e)), _v = () => "네, 가능합니다.\nDAO는 오프라인 모드를 지원하여 인터넷 연결 없이도 체크리스트 작성, 사진 촬영, 데이터 기록이 가능합니다.\n\n인터넷 연결 시 자동으로 서버에 동기화됩니다.", vv = () => "Yes. \n DAO supports offline mode, enabling checklist completion, photo capture, and data recording without an internet connection. \n When connectivity is restored, all data is automatically synchronized with the server.", yv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _v(e) : vv(e)), bv = () => "우리 회사 환경에 맞게 커스터마이징할 수 있나요?", xv = () => "Can we try the solution before deployment?", Sv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bv(e) : xv(e)), Cv = () => "네, 가능합니다.\nDAO는 제조, 건설, 물류, 설비 유지보수 등 다양한 산업 현장에서 바로 활용 가능한 범용 기능을 제공합니다.\n\n기존 시스템 연동(ERP, MES, CMMS), 업무 워크플로우 설계, \n보고서 양식 변경 등 기업별 특화 요구사항은 별도 상담을 통해 지원 가능합니다.", wv = () => "Yes. \n DAO offers versatile features that can be readily deployed across a wide range of industries, including manufacturing, construction, logistics, and facility maintenance. \n Customized support is available for company-specific requirements, including integration with existing systems (ERP, MES, and CMMS), workflow configuration, and report template customization.", Tv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Cv(e) : wv(e)), Ev = () => "솔루션 도입 전 체험해볼 수 있나요?", Dv = () => "Can we try the solution before deployment?", Ov = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ev(e) : Dv(e)), kv = () => "네, 가능합니다.\n\n제품 데모를 신청하시면 체험용 계정 발급을 위한 안내 메일을 보내드립니다.\n발급된 계정으로 2~4주간 실제 업무 환경에서 DAO를 자유롭게 사용해보실 수 있으며,\n체험 후 만족하시면 본 도입을 진행하실 수 있습니다.\n\n", Av = () => "Yes. \n After requesting a product demo, you will receive an email with instructions for setting up a trial account. \n The trial account allows you to use DAO in your actual operational environment for 2–4 weeks. If the trial meets your requirements, you can proceed with full deployment.", jv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kv(e) : Av(e)), Mv = () => "도입 비용과 기술 지원은 어떻게 제공되나요?", Nv = () => "How are deployment costs and technical support provided?", Pv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Mv(e) : Nv(e)), Fv = () => "DAO는 계정당 과금 방식으로 월간 또는 연간 구독으로 이용하실 수 있습니다.\n도입 시 온라인 또는 오프라인으로 초기 교육 지원이 가능하며, 전담 기술 지원팀이 운영되어 안정적인 사용을 지원합니다.\n자세한 요금제 및 지원 내용은 문의를 통해 상담해드립니다.\n\n", Iv = () => "DAO is offered on a per-account basis through monthly or annual subscription plans.\n Online or on-site onboarding and training are available during deployment, and our dedicated technical support team ensures reliable operation and continuous assistance.\n Please contact us for detailed pricing information and support options.", Lv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Fv(e) : Iv(e)), Rv = () => "지금 DAO를 도입하고", zv = () => "Start Using DAO Today", Bv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Rv(e) : zv(e)), Vv = () => "현장을 운영하세요.", Hv = () => "and Transform Your Operations", Uv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Vv(e) : Hv(e)), Wv = () => "담당자가 현장 상황에 맞는 맞춤 도입 방안을 제안드립니다.", Gv = () => "Our experts will propose a tailored implementation plan optimized for your operational environment.", Kv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Wv(e) : Gv(e)), qv = () => "조선", Jv = () => "Shipbuilding", Yv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qv(e) : Jv(e)), Xv = () => "제조", Zv = () => "Manufacturing", Qv = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Xv(e) : Zv(e)), $v = () => "건설", ey = () => "Construction", ty = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $v(e) : ey(e)), ny = () => "에너지", ry = () => "Energy", iy = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ny(e) : ry(e)), ay = () => "제약", oy = () => "Pharmaceuticals", sy = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ay(e) : oy(e)), cy = () => "바이오", ly = () => "Bio", uy = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cy(e) : ly(e)), dy = () => "유통", fy = () => "Distribution & Logistics", py = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dy(e) : fy(e)), my = () => "리테일", hy = () => "Retail", gy = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? my(e) : hy(e)), _y = () => "공공기관", vy = () => "Public Institutions", yy = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _y(e) : vy(e)), by = () => "부동산", xy = () => "Real Estate", Sy = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? by(e) : xy(e)), Cy = () => "DEEP.FINE Spaial Crafter", wy = () => "DEEP.FINE Spatial Crafter", Ty = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Cy(e) : wy(e)), Ey = () => "공간지능 기술을 통해 \n산업현장을 데이터화합니다.", Dy = () => "Transform Industrial Sites into \n Data with Spatial Intelligence.", Oy = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ey(e) : Dy(e)), ky = () => "누구나 손쉽게 현실 공간을\xA0디지털화할 수 있는 공간 컴퓨팅 플랫폼 입니다.\n 공간을 스캔하면 AI가 3D Map을 자동 생성합니다. \nAR 길안내부터 실시간 혼잡도·동선 분석, 스마트 관제까지 공간 데이터를 다양한 인사이트로 확장합니다.", Ay = () => "A spatial computing platform that enables anyone to easily digitize real-world spaces.\n Simply scan a space and AI automatically generates a 3D map.\n Unlock powerful insights from spatial data, including AR navigation, \n real-time congestion analysis, movement tracking, and smart monitoring.", jy = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ky(e) : Ay(e)), My = () => "Industries", Ny = () => "Industries", Py = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? My(e) : Ny(e)), Fy = () => "공간이 있는 모든 곳에 적용됩니다", Iy = () => "Applicable to Any Space", Ly = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Fy(e) : Iy(e)), Ry = () => "DSC는 축제·관광부터 전시·공공시설까지 다양한 공간을 디지털화합니다.", zy = () => "DSC digitizes a wide range of spaces, from festivals and tourist attractions to exhibitions and public facilities.", By = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ry(e) : zy(e)), Vy = () => "팝업·전시·갤러리", Hy = () => "Pop-ups · Exhibitions · Galleries", Uy = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Vy(e) : Hy(e)), Wy = () => "AR 도슨트·전시 해설, 방문자 동선 분석", Gy = () => "AR docent · exhibition commentary, visitor flow analysis", Ky = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Wy(e) : Gy(e)), qy = () => "박물관·문화 시설", Jy = () => "Museums · Cultural Facilities", Yy = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qy(e) : Jy(e)), Xy = () => "전시물 3D 복원·해설 자동 표시, AR 길안내", Zy = () => "3D Exhibit Restoration, Automated Exhibit Information Display, and AR Navigation", Qy = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Xy(e) : Zy(e)), $y = () => "관광·지역 축제", eb = () => "Tourism · Local Festivals", tb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $y(e) : eb(e)), nb = () => "인파 밀집도 안내, 부스·주차 AR 지도", rb = () => "Crowd Density Guidance, Booth · Parking AR Maps", ib = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nb(e) : rb(e)), ab = () => "유통·리테일 매장", ob = () => "Retail · Brand Stores", sb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ab(e) : ob(e)), cb = () => "AR 프로모션·상세 정보 증강, 고객 체류 분석", lb = () => "AR Promotions, Enhanced Product Information, and Customer Dwell Time Analysis", ub = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cb(e) : lb(e)), db = () => "공공기관·오피스", fb = () => "Public Institutions · Offices", pb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? db(e) : fb(e)), mb = () => "GPS 불가 실내 AR 내비게이션, 시설 관제", hb = () => "GPS-Free Indoor AR Navigation and Facility Monitoring", gb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mb(e) : hb(e)), _b = () => "제조·건설 현장", vb = () => "Manufacturing · Construction Sites", yb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _b(e) : vb(e)), bb = () => "AR 작업 매뉴얼, 안전 구역 경고 표시", xb = () => "AR Work Instructions and Safety Zone Alerts", Sb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bb(e) : xb(e)), Cb = () => "부동산·공간 투어", wb = () => "Real Estate · Virtual Tours", Tb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Cb(e) : wb(e)), Eb = () => "비대면 가상 투어, 인테리어 AR 시뮬레이션", Db = () => "Remote Virtual Tours and AR Interior Simulations", Ob = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Eb(e) : Db(e)), kb = () => "스마트시티·인프라", Ab = () => "Smart Cities · Infrastructure", jb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kb(e) : Ab(e)), Mb = () => "도시 교통·밀집도 관리, 공간 정보 서비스", Nb = () => "Urban Traffic & Crowd Management, Spatial Information Services", Pb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Mb(e) : Nb(e)), Fb = () => "Features part.1", Ib = () => "Features part.1", Lb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Fb(e) : Ib(e)), Rb = () => "현실 공간을 데이터로 만들고 관리합니다", zb = () => "Digitize and Manage Real-World Spaces", Bb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Rb(e) : zb(e)), Vb = () => "Features part.2", Hb = () => "Features part.2", Ub = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Vb(e) : Hb(e)), Wb = () => "공간 정보를 분석하고 활용합니다", Gb = () => "Analyze and Utilize Spatial Data", Kb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Wb(e) : Gb(e)), qb = () => "누구나 쉽게, 공간 스캔 & 노코드 공간 편집", Jb = () => "Easy Space Scanning & No-Code Space Editing", Yb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qb(e) : Jb(e)), Xb = () => "전시관·공장·매장 등 대규모 시설도 LiDAR 탑재된 디바이스로 공간을 스캔하면 AI가 3D Map을 자동으로 생성합니다.", Zb = () => "AI automatically generates a 3D map when large-scale spaces such as exhibition halls, factories, and retail stores are scanned with LiDAR-enabled devices.", Qb = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Xb(e) : Zb(e)), $b = () => "노코드 공간 편집기에서 2D Panel·3D Asset·영상·오디오 등 모든 콘텐츠를 드래그 앤 드롭으로 3D 공간에 배치·수정·삭제합니다.", ex = () => "The no-code space editor allows users to easily place, edit, and remove 2D panels, 3D assets, videos, audio, and other content within a 3D environment using simple drag-and-drop controls.", tx = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $b(e) : ex(e)), nx = () => "광화문 일대 약 5만㎡ DSC로 디지털 공간화 (서울시·LX한국국토정보공사)", rx = () => "50,000㎡ of the Gwanghwamun Area Digitized with DSC (Seoul Metropolitan Government & LX)", ix = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nx(e) : rx(e)), ax = () => "LiDAR 스캔", ox = () => "LiDAR Scanning", sx = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ax(e) : ox(e)), cx = () => "3D Map 자동 생성", lx = () => "Automatic 3D Map Generation", ux = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cx(e) : lx(e)), dx = () => "올인원 에디터", fx = () => "All-in-One Editor", px = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dx(e) : fx(e)), mx = () => "VPS 정밀 위치 인식 및 AR 길 안내", hx = () => "VPS Precision Positioning & AR Navigation", gx = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mx(e) : hx(e)), _x = () => "Vision AI 기반 VPS(Visual Positioning System)가 카메라 영상의 특징점을 서버의 3D Map과 실시간 매칭해 사용자의 위치·방향을 센티미터 단위로 인식합니다. ", vx = () => "Vision AI-powered VPS (Visual Positioning System) delivers centimeter-level positioning accuracy by matching real-time camera feature points with a server-based 3D map.", yx = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _x(e) : vx(e)), bx = () => "GPS가 닿지 않는 실내에서도 최단 경로 AR 길안내·전시 해설·작업 매뉴얼을 정확한 좌표에 증강합니다.", xx = () => "Even in GPS-denied indoor environments, AR navigation, exhibition guides, and work instructions can be precisely overlaid at their exact locations.", Sx = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bx(e) : xx(e)), Cx = () => "광화문역·서울역·수서역 대형 역사 내 실내 AR 길안내 교통약자 특화 서비스 구축", wx = () => "Indoor AR Navigation with Accessibility Support at Major Stations (Gwanghwamun, Seoul, and Suseo)", Tx = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Cx(e) : wx(e)), Ex = () => " VPS 실내외 측위", Dx = () => "Indoor & Outdoor VPS Positioning", Ox = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ex(e) : Dx(e)), kx = () => "cm 단위 정밀도", Ax = () => "Centimeter-Level Accuracy", jx = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kx(e) : Ax(e)), Mx = () => "도슨트", Nx = () => "AR Docent · Exhibition Guides, Visitor Flow Analysis", Px = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Mx(e) : Nx(e)), Fx = () => "간편 디지털 공간 공유", Ix = () => "Easy Digital Space Sharing", Lx = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Fx(e) : Ix(e)), Rx = () => "콘텐츠 수정 시 실시간 반영되어 앱 업데이트가 불필요하며,\n디지털 공간 링크를 공유하면 앱 설치 없이 XR 공간을 공유할 수 있습니다.", zx = () => "All content changes are applied in real time, eliminating the need for app updates. Simply share a digital space link to provide immersive XR experiences without requiring app installation.", Bx = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Rx(e) : zx(e)), Vx = () => "다수 전시·팝업에서 링크 공유로 AR 체험 제공", Hx = () => "AR Experiences Delivered Through Simple Link Sharing Across Multiple Exhibitions and Pop-Up Events", Ux = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Vx(e) : Hx(e)), Wx = () => "URL 기반 배포", Gx = () => "URL-Based Deployment", Kx = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Wx(e) : Gx(e)), qx = () => "실시간 콘텐츠 관리", Jx = () => "Real-time content management", Yx = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qx(e) : Jx(e)), Xx = () => "실시간 혼잡도 분석 & 안내", Zx = () => "Real-Time Crowd Density Analysis & Guidance", Qx = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Xx(e) : Zx(e)), $x = () => "CCTV·LiDAR 센서 기반 공간 내 방문객의 위치·이동 경로·밀집도·혼잡도를 실시간으로 수집하고 분석합니다.", eS = () => "Using CCTV and LiDAR sensors, DSC continuously collects and analyzes visitor locations, movement patterns, crowd density, and congestion levels in real time.", tS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $x(e) : eS(e)), nS = () => "위험 구역은 즉시 식별·알림을 발송하고, 방문자에게는 AR 지도로 덜 붐비는 경로를 안내합니다. 부스·주차장 위치 안내, 차량 인식을 통한 교통 혼잡도 완화도 지원합니다.", rS = () => "Potential risk zones are detected instantly, triggering automated alerts. AR maps guide visitors along less congested routes, while booth and parking navigation and vehicle-based traffic management help improve the overall visitor experience.", iS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nS(e) : rS(e)), aS = () => "축집사(축제 3곳, 접속 29,206명), 광집사(내장산국립공원, 접속 4,614건)", oS = () => "Chukjipsa (3 festivals, 29,206 visitors), Gwangjipsa (Naejangsan National Park, 4,614 visits)", sS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aS(e) : oS(e)), cS = () => "군중 밀집도 AI 분석", lS = () => "AI Crowd Density Analysis", uS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cS(e) : lS(e)), dS = () => "색상 단계 혼잡도 표시", fS = () => "Color-coded Congestion Display", pS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dS(e) : fS(e)), mS = () => "안전사고 예방 알림", hS = () => "Accident Prevention Alerts", gS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mS(e) : hS(e)), _S = () => "AI 스마트 관제 대시보드", vS = () => "AI Smart Monitoring Dashboard", yS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _S(e) : vS(e)), bS = () => "LiDAR 센서로 수집된 3D 공간 데이터를 실시간으로 시각화합니다.", xS = () => "LiDAR-generated 3D spatial data is visualized in real time through an intuitive dashboard.", SS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bS(e) : xS(e)), CS = () => "객체 위치·이동 경로·혼잡도·위험 구역을 대시보드에서 한눈에 파악하고, 방문자 동선·체류 시간·콘텐츠 클릭 데이터를 기반으로 운영 의사결정을 지원합니다.", wS = () => "Monitor object locations, movement patterns, crowd density, and risk zones at a glance, while leveraging visitor flow, dwell time, and content engagement analytics to support data-driven operational decisions.", TS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CS(e) : wS(e)), ES = () => "관광·물류·교통 인프라 등 다양한 산업에 적용 중", DS = () => "Applied across tourism, logistics, and transportation infrastructure", OS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ES(e) : DS(e)), kS = () => "실시간 대시보드", AS = () => "Real-time Dashboard", jS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kS(e) : AS(e)), MS = () => "방문자 데이터 분석", NS = () => "Visitor Data Analysis", PS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? MS(e) : NS(e)), FS = () => "위험 구역 알림", IS = () => "Risk Zone Alerts", LS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? FS(e) : IS(e)), RS = () => "Proven Results", zS = () => "Proven Results", BS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? RS(e) : zS(e)), VS = () => "실제 현장에서 증명된 결과입니다.", HS = () => "Proven Results in Real-World Operations", US = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? VS(e) : HS(e)), WS = () => "보유한 스캔 장비로 바로 시작 가능", GS = () => "Start with Your Existing Scanning Devices", KS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? WS(e) : GS(e)), qS = /* @__PURE__ */ Object.assign((() => "LiDAR 태블릿, 전문 스캐너, 360° 카메라 등 이미 보유한 장비로 공간을 스캔하고 AR 콘텐츠 편집까지 완료. 기획자·마케터가 노코드 에디터로 직접 제작·운영 가능."), { parts: (() => [
	{
		type: "text",
		value: "LiDAR 태블릿, 전문 스캐너, 360° 카메라 등 "
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "이미 보유한 장비로 공간을 스캔하고 AR 콘텐츠 편집까지 완료."
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " 기획자·마케터가 노코드 에디터로 직접 제작·운영 가능."
	}
]) }), JS = /* @__PURE__ */ Object.assign((() => "Scan spaces and create AR content using your existing devices, including LiDAR tablets, professional scanners, and 360° cameras. \n The no-code editor enables planners and marketers to independently create and manage content without coding."), { parts: (() => [
	{
		type: "text",
		value: "Scan spaces and create AR content using your existing devices, including LiDAR tablets, professional scanners, and 360° cameras. \n "
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "The no-code editor enables planners and marketers to independently create and manage content without coding."
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), YS = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qS(e) : JS(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof qS.parts == "function" ? qS.parts(e) : [{
	type: "text",
	value: qS(e)
}] : typeof JS.parts == "function" ? JS.parts(e) : [{
	type: "text",
	value: JS(e)
}]) }), XS = () => "GPS 대비 실내에서도 \n센티미터 단위 정확도", ZS = () => "Centimeter-Level Accuracy Even Indoors Where GPS Falls Short", QS = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? XS(e) : ZS(e)), $S = /* @__PURE__ */ Object.assign((() => "VPS 기술로 실내·지하·대형·실외 공간에서 센티미터 단위 정밀 위치 인식. 국내 최대 규모 AR 내비게이션 실증 사례로 검증."), { parts: (() => [
	{
		type: "text",
		value: "VPS 기술로 "
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "실내·지하·대형·실외 공간"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "에서 센티미터 단위 정밀 위치 인식. 국내 최대 규모 AR 내비게이션 실증 사례로 검증."
	}
]) }), eC = /* @__PURE__ */ Object.assign((() => "VPS technology delivers centimeter-level positioning accuracy across indoor, underground, large-scale, and outdoor environments. Proven through one of Korea’s largest AR navigation deployments."), { parts: (() => [
	{
		type: "text",
		value: "VPS technology "
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "delivers centimeter-level positioning accuracy across indoor, underground, large-scale, and outdoor environments."
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " Proven through one of Korea’s largest AR navigation deployments."
	}
]) }), tC = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $S(e) : eC(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof $S.parts == "function" ? $S.parts(e) : [{
	type: "text",
	value: $S(e)
}] : typeof eC.parts == "function" ? eC.parts(e) : [{
	type: "text",
	value: eC(e)
}]) }), nC = () => "기설치 CCTV·센서 연동을 통한 \n데이터 분석", rC = () => "Data Analytics with Existing CCTV & Sensor Integration", iC = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nC(e) : rC(e)), aC = /* @__PURE__ */ Object.assign((() => "대부분의 축제·관광지·공공시설에 이미 설치된 CCTV를 활용해 AI 분석 연동. 별도 장비 구매 없이 혼잡도·주차 정보·안전 관제 기능을 즉시 도입 가능."), { parts: (() => [
	{
		type: "text",
		value: "대부분의 축제·관광지·공공시설에 이미 설치된 CCTV를 활용해 AI 분석 연동. "
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "별도 장비 구매 없이"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " 혼잡도·주차 정보·안전 관제 기능을 즉시 도입 가능."
	}
]) }), oC = /* @__PURE__ */ Object.assign((() => "AI analytics can be integrated with CCTV systems already installed at most festivals, tourist destinations, and public facilities. Deploy crowd monitoring, parking information, and safety management capabilities immediately without purchasing additional equipment."), { parts: (() => [
	{
		type: "text",
		value: "AI analytics can be integrated with CCTV systems already installed at most festivals, tourist destinations, and public facilities. Deploy crowd monitoring, parking information, and safety management capabilities immediately "
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "without purchasing additional equipment."
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	}
]) }), sC = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aC(e) : oC(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof aC.parts == "function" ? aC.parts(e) : [{
	type: "text",
	value: aC(e)
}] : typeof oC.parts == "function" ? oC.parts(e) : [{
	type: "text",
	value: oC(e)
}]) }), cC = () => "3D GS 기반 초실감 공간 구현", lC = () => "3D Gaussian Splatting for Photorealistic Spaces", uC = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cC(e) : lC(e)), dC = /* @__PURE__ */ Object.assign((() => "복잡한 모델링 작업 없이 영상 촬영만으로 3D Gaussian Splatting 기술을 활용해 실제 공간에 가까운 3D 공간 모델을 자동 생성. 몰입감 있는 XR 콘텐츠와 공간 기반 서비스를 빠르게 제작 가능."), { parts: (() => [
	{
		type: "text",
		value: "복잡한 모델링 작업 없이 영상 촬영만으로 3D Gaussian Splatting 기술을 활용해 "
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "실제 공간에 가까운 3D 공간 모델을 자동 생성."
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " 몰입감 있는 XR 콘텐츠와 공간 기반 서비스를 빠르게 제작 가능."
	}
]) }), fC = /* @__PURE__ */ Object.assign((() => "Using 3D Gaussian Splatting technology, highly realistic 3D spatial models are automatically generated from simple video captures without complex modeling workflows. \n Quickly create immersive XR content and spatial services using digital spaces that closely replicate real-world environments."), { parts: (() => [
	{
		type: "text",
		value: "Using 3D Gaussian Splatting technology, highly realistic 3D spatial models are "
	},
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "automatically generated from simple video captures without complex modeling workflows."
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " \n Quickly create immersive XR content and spatial services using digital spaces that closely replicate real-world environments."
	}
]) }), pC = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dC(e) : fC(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof dC.parts == "function" ? dC.parts(e) : [{
	type: "text",
	value: dC(e)
}] : typeof fC.parts == "function" ? fC.parts(e) : [{
	type: "text",
	value: fC(e)
}]) }), mC = () => "관광·축제", hC = () => "Tourism · Festivals", gC = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mC(e) : hC(e)), _C = () => "스마트관광 AI 지도 솔루션 도입 (축집사·광집사)", vC = () => "AI-Powered Smart Tourism Mapping Solution (Chukjipsa & Gwangjipsa)", yC = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _C(e) : vC(e)), bC = () => "실시간 혼잡도·주차 정보", xC = () => "Real-Time Crowd Density· Parking Info", SC = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bC(e) : xC(e)), CC = () => "QR 간편결제", wC = () => "QR-Based Payments", TC = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CC(e) : wC(e)), EC = () => "AI 챗봇", DC = () => "AI Chatbot", OC = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? EC(e) : DC(e)), kC = () => "AI 분석 기반 실시간 혼잡도·주차 정보 안내 및 방문객 특성 기반 AI 맞춤 경로 추천으로 안전하고 편리한 축제 운영", AC = () => "Supports safer and more convenient festival operations with AI-powered real-time crowd density and parking information, along with personalized route recommendations based on visitor profiles.", jC = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kC(e) : AC(e)), MC = /* @__PURE__ */ Object.assign((() => "적용 축제/현장 : 부산국제록페스티벌, 진주남강유등축제, 국가정원, 대규모 전시 등"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "적용 축제/현장"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : 부산국제록페스티벌, 진주남강유등축제, 국가정원, 대규모 전시 등"
	}
]) }), NC = /* @__PURE__ */ Object.assign((() => "Applied Festivals/Sites : Busan International Rock Festival, Jinju Namgang Lantern Festival, National Garden, large-scale exhibitions, etc."), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Applied Festivals/Sites"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : Busan International Rock Festival, Jinju Namgang Lantern Festival, National Garden, large-scale exhibitions, etc."
	}
]) }), PC = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? MC(e) : NC(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof MC.parts == "function" ? MC.parts(e) : [{
	type: "text",
	value: MC(e)
}] : typeof NC.parts == "function" ? NC.parts(e) : [{
	type: "text",
	value: NC(e)
}]) }), FC = /* @__PURE__ */ Object.assign((() => "성과 : 총 접속 71,594명, 만족도 4.3점/5.0점"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "성과"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : 총 접속 71,594명, 만족도 4.3점/5.0점"
	}
]) }), IC = /* @__PURE__ */ Object.assign((() => "Results : 71,594 Total Users · 4.3/5.0 User Satisfaction"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Results"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : 71,594 Total Users · 4.3/5.0 User Satisfaction"
	}
]) }), LC = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? FC(e) : IC(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof FC.parts == "function" ? FC.parts(e) : [{
	type: "text",
	value: FC(e)
}] : typeof IC.parts == "function" ? IC.parts(e) : [{
	type: "text",
	value: IC(e)
}]) }), RC = () => "대형 공공시설", zC = () => "Large Public Facilities", BC = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? RC(e) : zC(e)), VC = () => "대형 공공시설 AR 실내외 내비게이션", HC = () => "Indoor · Outdoor AR Navigation for Large Public Facilities", UC = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? VC(e) : HC(e)), WC = () => "VPS 기반 실내 위치 인식", GC = () => "VPS-Based Indoor Positioning", KC = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? WC(e) : GC(e)), qC = () => "AR 경로 안내", JC = () => "AR Route Guidance", YC = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qC(e) : JC(e)), XC = () => "실시간 POI 정보 제공", ZC = () => "Real-Time POI Info", QC = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? XC(e) : ZC(e)), $C = () => "VPS 기술 기반 센티미터 단위 정밀 위치 인식으로 복잡한 실내 길 안내", ew = () => "Navigate complex indoor spaces with centimeter-level accuracy powered by vision-based VPS technology.", tw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $C(e) : ew(e)), nw = /* @__PURE__ */ Object.assign((() => "적용 공간 : 대형 역사 및 복합 지하 시설"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "적용 공간"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : 대형 역사 및 복합 지하 시설"
	}
]) }), rw = /* @__PURE__ */ Object.assign((() => "Applications : Major Railway Stations & Large Underground Complexes"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Applications"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : Major Railway Stations & Large Underground Complexes"
	}
]) }), iw = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nw(e) : rw(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof nw.parts == "function" ? nw.parts(e) : [{
	type: "text",
	value: nw(e)
}] : typeof rw.parts == "function" ? rw.parts(e) : [{
	type: "text",
	value: rw(e)
}]) }), aw = /* @__PURE__ */ Object.assign((() => "검증 사례 : 국내 최대 규모 AR 내비게이션 실증 (광화문역·서울역·수서역)"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "검증 사례"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : 국내 최대 규모 AR 내비게이션 실증 (광화문역·서울역·수서역)"
	}
]) }), ow = /* @__PURE__ */ Object.assign((() => "Proven Deployment : One of Korea's Largest AR Navigation Deployments (Gwanghwamun, Seoul, and Suseo Stations)"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Proven Deployment"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : One of Korea's Largest AR Navigation Deployments (Gwanghwamun, Seoul, and Suseo Stations)"
	}
]) }), sw = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aw(e) : ow(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof aw.parts == "function" ? aw.parts(e) : [{
	type: "text",
	value: aw(e)
}] : typeof ow.parts == "function" ? ow.parts(e) : [{
	type: "text",
	value: ow(e)
}]) }), cw = () => "공간 스캔에 전문 장비가 반드시 필요한가요?", lw = () => "Do I need specialized equipment for space scanning?", uw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cw(e) : lw(e)), dw = () => "LiDAR 센서가 탑재된 모바일 기기라면 별도 전문 장비 없이 앱 하나로 바로 공간 스캔이 가능합니다. \n전문 라이다 스캐너나 360° 카메라 등 기존에 보유하신 장비도 함께 활용하실 수 있습니다.", fw = () => "No.\n Spaces can be scanned directly using the DSC app on any LiDAR-enabled mobile device, without the need for specialized equipment.\n Existing hardware, including professional LiDAR scanners and 360° cameras, can also be integrated into your workflow.", pw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dw(e) : fw(e)), mw = () => "디지털 공간에 배치할 XR 콘텐츠를 만들려면 개발자가 필요한가요?", hw = () => "Do I need a developer to create XR content for digital spaces?", gw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mw(e) : hw(e)), _w = () => "아니요, 개발자 없이도 XR 콘텐츠를 제작할 수 있습니다.\nDSC는 iPad 앱 기반의 노코드 에디터를 제공하여 이미지, 영상, 텍스트, 3D 오브젝트를 드래그 앤 드롭 방식으로 3D 공간에 배치할 수 있습니다.\n콘텐츠 수정 시 실시간으로 반영되어 별도 앱 업데이트도 불필요하며, 기획자나 마케터가 직접 콘텐츠를 제작하고 운영할 수 있습니다.\n복잡한 코딩 없이 누구나 몇 분 안에 콘텐츠를 완성할 수 있습니다.", vw = () => "No. You can create XR content without a developer. \n DSC provides a no-code editor for iPad, allowing you to place images, videos, text, and 3D objects within a 3D space using simple drag-and-drop controls. \n Content updates are applied in real time, eliminating the need for app updates. Planners and marketers can create and manage content directly without technical expertise. \n Anyone can build and publish XR content in just a few minutes, without complex coding.", yw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _w(e) : vw(e)), bw = () => "사용자가 앱을 설치해야만 AR을 체험할 수 있나요?", xw = () => "Do users need to install an app to experience AR content?", Sw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bw(e) : xw(e)), Cw = () => "아니요, 앱 설치 없이도 AR 체험이 가능합니다.\n\n DSC Viewer 앱을 설치하거나, 링크를 공유하면 웹 브라우저에서도 AR 체험을 제공할 수 있습니다.\n QR 코드 스캔 또는 URL 접속만으로 즉시 이용 가능하여 팝업 스토어, 전시회, 관광지 등 불특정 다수의 방문객에게도 손쉽게 AR 콘텐츠를 배포하고 체험시킬 수 있습니다.", ww = () => "No. \n AR experiences can be accessed without installing an app.\n Users can either install the DSC Viewer app or access AR experiences directly through a shared link in a web browser.\n Simply scanning a QR code or opening a URL provides instant access, making it easy to deliver AR content to large numbers of visitors at pop-up stores, exhibitions, tourist attractions, and other public venues.", Tw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Cw(e) : ww(e)), Ew = () => "대규모 공간도 스캔이 가능한가요? 디지털 공간 구축 기간은 얼마나 걸리나요?", Dw = () => "Can large-scale spaces be scanned? How long does it take to create a digital space?", Ow = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ew(e) : Dw(e)), kw = () => "네, 대규모 공간도 스캔 가능합니다.\n\n DSC는 광화문 일대 약 5만㎡를 디지털 공간화한 국내 최대 규모의 실증 사례를 보유하고 있습니다. 대규모 공간은 구역별로 스캔한 후 통합하는 방식으로 진행되며, \n 도입 전 현장 컨설팅을 통해 최적의 스캔 방법을 안내드립니다. \n 소규모 매장이나 전시관 기준 1일 전후로 공간 스캔을 완료할 수 있으며,  공간 크기에 따라 스캔 일정도 늘어나게 됩니다.", Aw = () => "Yes. \n Large-scale spaces can be scanned and digitized. \n DSC has successfully digitized approximately 50,000㎡ of the Gwanghwamun area, one of the largest spatial digitization projects of its kind in Korea. \n For large-scale environments, spaces are scanned by zone and then integrated into a unified digital environment. Prior to deployment, our team provides on-site consulting to recommend the most efficient scanning approach. \n For smaller spaces such as retail stores and exhibition halls, scanning can typically be completed within a day. Project timelines for larger environments vary depending on the size and complexity of the space.", jw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kw(e) : Aw(e)), Mw = () => " 솔루션 도입 전 체험해볼 수 있나요?", Nw = () => "Can I try the solution before deployment?", Pw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Mw(e) : Nw(e)), Fw = () => "네, 가능합니다.\n\n 제품 데모를 신청하시면 체험용 계정 발급을 위한 안내 메일을 보내드립니다.\n 발급된 계정으로 2~4주간 실제 업무 환경에서 DSC를 자유롭게 사용해보실 수 있으며, \n 체험 기간 동안 전담 매니저가 온보딩을 지원하며, 체험 후 만족하시면 본 도입을 진행하실 수 있습니다.\n 자세한 요금제 및 지원 내용은 문의를 통해 상담해드립니다.", Iw = () => "Yes.\n You can try DSC before deployment.\n Once you request a product demo, we will send you an email with instructions for accessing a trial account.\n You can freely use DSC in your actual work environment for 2–4 weeks using the provided account. During the trial period, a dedicated manager will support onboarding and help you get started quickly.\n If you're satisfied with the experience, you can proceed with full deployment. For detailed pricing and support options, please contact us for a consultation.", Lw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Fw(e) : Iw(e)), Rw = () => "현실 공간을 손쉽게 디지털 공간으로 만들어 보세요", zw = () => "Turn Real-World Spaces into Digital Spaces with Ease", Bw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Rw(e) : zw(e)), Vw = () => "담당자가 공간 특성에 맞는 맞춤 도입 방안을 제안드립니다.", Hw = () => "Our experts will propose a customized deployment strategy tailored to your space and use case.", Uw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Vw(e) : Hw(e)), Ww = () => "딥파인이 디지털로 변화시킨 공간", Gw = () => "Spaces Digitized by DEEP.FINE", Kw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ww(e) : Gw(e)), qw = () => "그리고 지금 이 순간도 계속 늘어나고 있습니다", Jw = () => "And the number continues to grow every day.", Yw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qw(e) : Jw(e)), Xw = () => "DEEP.FINE AR.ON DAO", Zw = () => "LOGI.FINE", Qw = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Xw(e) : Zw(e)), $w = () => "설비 없이, 지금 바로\n 가상 DAS 피킹을 시작해보세요", eT = () => "Start Virtual DAS Picking Today, \nWithout Dedicated Equipment.", tT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $w(e) : eT(e)), nT = () => "LOGI.FINE은 종이·설비 없이도 피킹 전략과 무관하게 즉시 실행 가능한 \n토트 기반의 가상 DAS 피킹 솔루션입니다.", rT = () => "LOGI.FINE is a tote-based virtual DAS picking solution that can be deployed immediately \nwithout paper or equipment, regardless of your picking strategy.", iT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nT(e) : rT(e)), aT = () => "DAS 피킹 도입 전과 후, 현장이 달라집니다", oT = () => "See the Difference Before and After Virtual DAS Picking.", sT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aT(e) : oT(e)), cT = () => "종이 피킹리스트 의존", lT = () => "Reliance on paper picking lists", uT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cT(e) : lT(e)), dT = () => "종이 분실 · 수량 오기입으로 오피킹이 반복되고, 재작업과 클레임으로 이어져서 관리 부담이 상시 존재합니다.", fT = () => "Lost paper lists and manual entry errors lead to repeated picking mistakes, rework, customer claims, and ongoing management overhead.", pT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dT(e) : fT(e)), mT = () => "DAS 설비에 막대한 초기 투자", hT = () => "High Upfront Investment in DAS Infrastructure", gT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mT(e) : hT(e)), _T = () => "도입까지 수개월의 공사 기간과 수천만 원 이상의 초기 비용이 필요합니다. 레이아웃 또는 SKU가 변경될 때마다 추가 공사가 불가피해 현장 대응이 느립니다.", vT = () => "Requires months of installation and significant initial costs. Layout or SKU changes often require additional modifications, reducing operational flexibility.", yT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _T(e) : vT(e)), bT = () => "숙련자 의존 구조", xT = () => "Dependence on Skilled Workers", ST = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bT(e) : xT(e)), CT = () => "숙련 작업자와 신규 인력 간 처리 속도·오류율 차이가 크게 벌어집니다. 숙련자가 퇴사하면 생산성에 타격을 받고, 신규 인력 교육에만 몇 주가 소요됩니다.", wT = () => "Significant differences in productivity and accuracy between experienced and new workers. When experienced workers leave, productivity declines and onboarding new workers can take weeks.", TT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CT(e) : wT(e)), ET = () => "제한적 데이터 수집", DT = () => "Limited data collection", OT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ET(e) : DT(e)), kT = () => "작업 완료 여부 외에는 확인할 수 있는 정보가 거의 없습니다. 어디서 시간이 낭비되고 오류가 발생하는지 파악하지 못한 채 감에 의존한 운영이 반복됩니다.", AT = () => "Beyond task completion status, little operational data is available. Operations rely on intuition rather than data, making it difficult to identify where time is wasted or errors occur.", jT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kT(e) : AT(e)), MT = () => "Paper-free 디지털 지시서", NT = () => "Paper-Free Digital Work Instructions", PT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? MT(e) : NT(e)), FT = () => "웹에서 생성된 피킹 지시서를 기준으로 작업이 자동 정의되어 종이 없이 전 과정이 진행됩니다. 지시·진행·완료까지 모든 단계가 기록되어 혼선이 사라집니다.", IT = () => "Tasks are automatically defined based on web-generated picking instructions, enabling a fully paperless workflow. Every step from instruction to completion is recorded, eliminating confusion and miscommunication.", LT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? FT(e) : IT(e)), RT = () => "토트 기반 가상 DAS 즉시 구성", zT = () => "Instant Tote-Based Virtual DAS Setup", BT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? RT(e) : zT(e)), VT = () => "별도 설비 없이 당일 DAS 환경을 구성할 수 있습니다. SKU나 동선 및 로케이션 레이아웃이 바뀌어도 추가 공사 없이 즉각 대응이 가능합니다.", HT = () => "A DAS environment can be set up the same day without dedicated equipment. Adapt instantly to SKU, workflow, or location layout changes without additional modifications.", UT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? VT(e) : HT(e)), WT = () => "숙련도 관계없이 동일한 작업 품질", GT = () => "Consistent Performance Regardless of Skill Level", KT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? WT(e) : GT(e)), qT = () => "피킹 경로·수량·위치를 시스템이 실시간으로 안내해 누구나 동일한 수준으로 작업할 수 있습니다. 신규 인력도 당일 투입이 가능합니다.", JT = () => "Real-time guidance on picking routes, quantities, and locations enables workers of all skill levels to perform at the same standard. New hires can be deployed from day one.", YT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qT(e) : JT(e)), XT = () => "운영 개선 데이터 자동 수집", ZT = () => "Automated Operational Data Collection", QT = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? XT(e) : ZT(e)), $T = () => "작업 시간, 동선, 오류 발생 위치, SKU별 난이도까지 현장 데이터가 자동으로 쌓입니다. 해당 데이터를 바탕으로 인력 배치와 동선 설계를 개선할 수 있습니다.", eE = () => "Task time, movement paths, error locations, and SKU-specific difficulty are automatically captured. This data can be used to improve workforce allocation and workflow design.", tE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $T(e) : eE(e)), nE = () => "Industries", rE = () => "Industries", iE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nE(e) : rE(e)), aE = () => "피킹 방식과 무관하게,\n 모든 물류 현장에 즉시 적용 가능", oE = () => "Instantly Deployable Across Any Logistics Environment, \nRegardless of Picking Strategy", sE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aE(e) : oE(e)), cE = () => "기존 운영 방식은 그대로, 도입 부담은 제로. \n피스·배치·웨이브 등 어떤 피킹 전략을 사용하든 현재 방식을 변경하지 않고 바로 사용할 수 있습니다.", lE = () => "No changes to existing operations and no implementation burden. Whether you use piece, batch, or wave picking, \nLOGI.FINE can be deployed immediately with your current workflow.", uE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cE(e) : lE(e)), dE = () => "이커머스 풀필먼트", fE = () => "E-commerce Fulfillment", pE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dE(e) : fE(e)), mE = () => "다중 주문 동시 처리, \n빠른 출고가 핵심인 이커머스 물류센터", hE = () => "Optimized for simultaneous order processing and rapid fulfillment", gE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mE(e) : hE(e)), _E = () => "중소형 물류센터", vE = () => "Small & Mid-Sized Logistics Centers", yE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _E(e) : vE(e)), bE = () => "인력 변동이 잦고 설비 투자가 어려운 \n중소형 센터 환경에 최적", xE = () => "Optimized for logistics centers with frequent workforce changes and limited equipment investment", SE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bE(e) : xE(e)), CE = () => "리테일 물류", wE = () => "Retail Logistics", TE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CE(e) : wE(e)), EE = () => "SKU 변동과 시즌 피크에 유연하게 \n대응하는 리테일 분류 작업", DE = () => "Retail sorting operations that adapt to SKU fluctuations and seasonal peaks.", OE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? EE(e) : DE(e)), kE = () => "의약·식품·냉장물류", AE = () => "Pharmaceutical, Food & Cold Chain Logistics", jE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kE(e) : AE(e)), ME = () => "유통기한·온도 관리가 중요한 \n신선·냉장 물류 환경에 최적화", NE = () => "Optimized for fresh and cold chain logistics operations requiring strict temperature and shelf-life management", PE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ME(e) : NE(e)), FE = () => "3PL 물류사", IE = () => "3PL Logistics Providers", LE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? FE(e) : IE(e)), RE = () => "다양한 화주사의 피킹 전략을 \n단일 시스템으로 일원화", zE = () => "Unify diverse picking strategies from multiple shippers in a single system.", BE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? RE(e) : zE(e)), VE = () => "부품·MRO 창고", HE = () => "Parts · MRO Warehouses", UE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? VE(e) : HE(e)), WE = () => "다품종 소량의 부품·소모품 \n피킹 오류를 원천 차단", GE = () => "Eliminate picking errors for high-mix, low-volume parts and consumables", KE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? WE(e) : GE(e)), qE = () => "Features", JE = () => "Features", YE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qE(e) : JE(e)), XE = () => "LOGI.FINE 핵심 기능으로 현장의 효율을 높입니다", ZE = () => "Increase on-site efficiency with LOGI.FINE's core features.", QE = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? XE(e) : ZE(e)), $E = () => "작업 지시서 업로드만으로 \n가상 DAS 즉시 구성", eD = () => "Instant Virtual DAS Configuration with a Work Order Upload", tD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $E(e) : eD(e)), nD = () => "작업 지시서 업로드 시 토트 옵션을 선택하면 주문번호 순서대로 토트가 자동으로 배정됩니다.", rD = () => "When a work order is uploaded, selecting the tote option automatically assigns totes based on order numbers.", iD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nD(e) : rD(e)), aD = () => "별도 매핑 작업 없이 업로드 한 번으로 분류 환경이 즉시 완성됩니다.", oD = () => "A sorting environment is created instantly with a single upload, without any additional mapping.", sD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aD(e) : oD(e)), cD = () => "초기 투자 부담 없이 DAS 환경 즉시 구현", lD = () => "Instant DAS Deployment Without the Burden of Upfront Investment", uD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cD(e) : lD(e)), dD = () => "토트 자동 배정", fD = () => "Automatic Tote Assignment", pD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dD(e) : fD(e)), mD = () => "설비 불필요", hD = () => "No Equipment Required", gD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mD(e) : hD(e)), _D = () => "웨이브 기반 관리", vD = () => "Wave-Based Management", yD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _D(e) : vD(e)), bD = () => "3단계 스캔 시퀀스 \n오피킹 실시간 차단", xD = () => "Real-Time Mis-Pick Prevention with a 3-Step Scan Sequence", SD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bD(e) : xD(e)), CD = () => "로케이션 → 상품 바코드 → 목적지 토트 순으로 인식하여 피킹을 실시간으로 검증합니다.", wD = () => "Each pick is validated in real time through a three-step scan sequence: location → product barcode → destination tote.", TD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CD(e) : wD(e)), ED = () => "수량·상품 오류는 즉각 알림되어 재작업과 클레임을 원천 차단합니다.", DD = () => "Quantity and product errors are detected instantly, preventing rework and customer claims.", OD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ED(e) : DD(e)), kD = () => "피킹 오류 제로를 위한 실시간 3중 검증", AD = () => "Real-time triple verification for zero picking errors", jD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kD(e) : AD(e)), MD = () => "로케이션 스캔", ND = () => "Location Scan", PD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? MD(e) : ND(e)), FD = () => "상품 바코드 검증", ID = () => "Product Barcode Verification", LD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? FD(e) : ID(e)), RD = () => "토트 스캔 확인", zD = () => "Tote Scan Verification", BD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? RD(e) : zD(e)), VD = () => "오류 즉시 알림", HD = () => "Instant Error Alerts", UD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? VD(e) : HD(e)), WD = () => "카트 슬롯 시각화 / \n멀티 오더 동시 처리", GD = () => "Cart Slot Visualization /\n Simultaneous Multi-Order Processing", KD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? WD(e) : GD(e)), qD = () => "피킹 화면 우측 카트 슬롯 패널에서 슬롯별 진행률을 실시간으로 확인합니다.", JD = () => "Monitor slot-by-slot progress in real time through the cart slot panel on the right side of the picking screen.", YD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qD(e) : JD(e)), XD = () => "어느 토트에 몇 개가 채워졌는지 한눈에 파악해 다중 주문을 효율적으로 처리합니다.", ZD = () => "See at a glance how many items are in each tote, enabling efficient multi-order processing.", QD = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? XD(e) : ZD(e)), $D = () => "시간당 처리 주문 수(UPH) 향상", eO = () => "Increased Orders per Hour (UPH)", tO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $D(e) : eO(e)), nO = () => "다수의 슬롯 동시 모니터링", rO = () => "Simultaneous monitoring of multiple slots", iO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nO(e) : rO(e)), aO = () => "슬롯별 진행률 표시", oO = () => "Slot-by-Slot Progress Tracking", sO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aO(e) : oO(e)), cO = () => "토트 개수 커스텀 설정", lO = () => "Custom Tote Count Settings", uO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cO(e) : lO(e)), dO = () => "스마트 글라스 연동 \n완전한 핸즈프리 피킹", fO = () => "Fully Hands-Free Picking \nwith Smart Glasses", pO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dO(e) : fO(e)), mO = () => "태블릿에서 QR 코드 한 번 스캔으로 스마트 글라스와 즉시 페어링됩니다.", hO = () => "Pair instantly with smart glasses using a single QR code scan on the tablet.", gO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mO(e) : hO(e)), _O = () => "SKU·수량·위치를 글래스로 실시간 안내받아 두 손을 자유롭게 유지하며 피킹에 집중합니다.", vO = () => "Real-time guidance on SKUs, quantities, and locations keeps both hands free, allowing workers to stay focused on picking.", yO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _O(e) : vO(e)), bO = () => "신규 작업자 적응 기간 단축", xO = () => "Reduce Onboarding Time for New Workers", SO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bO(e) : xO(e)), CO = () => "Hands-free 작업", wO = () => "Hands-free operation", TO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CO(e) : wO(e)), EO = () => "QR 즉시 페어링", DO = () => "Instant QR pairing", OO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? EO(e) : DO(e)), kO = () => "음성 안내 지원", AO = () => "Voice guidance support", jO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kO(e) : AO(e)), MO = () => "속도·정확도 향상", NO = () => "Improved speed and accuracy", PO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? MO(e) : NO(e)), FO = () => "완료 즉시 KPI 피드백 \n데이터 기반 운영 개선", IO = () => "Instant KPI Feedback for Data-Driven Operational Improvement", LO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? FO(e) : IO(e)), RO = () => "피킹 완료 후 UPH·소요시간·정확도를 즉시 확인합니다. SKU별 피킹 시간, 시간대별 처리량 등 현장 운영 개선에 활용 가능한 데이터를 자동으로 수집·분석합니다.", zO = () => "Instantly view UPH, picking time, and accuracy upon completion.\n Automatically collect and analyze operational data, including SKU-level picking time and hourly throughput.", BO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? RO(e) : zO(e)), VO = () => "UPH · 정확도 · 소요시간 등 핵심 지표 자동 수집", HO = () => "Automatically capture key metrics such as UPH, accuracy, and processing time.", UO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? VO(e) : HO(e)), WO = () => "UPH 실시간 산출", GO = () => "Real-Time UPH Tracking", KO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? WO(e) : GO(e)), qO = () => "정확도 자동 집계", JO = () => "Automatic Accuracy Calculation", YO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qO(e) : JO(e)), XO = () => "SKU별 분석", ZO = () => "SKU-Level Analytics", QO = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? XO(e) : ZO(e)), $O = () => "지연·오류 파악", ek = () => "Delay & Error Detection", tk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $O(e) : ek(e)), nk = () => "Proven Results", rk = () => "Proven Results", ik = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nk(e) : rk(e)), ak = () => "실제 현장에서 증명된 결과입니다", ok = () => "Proven Results in Real-World Operations", sk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ak(e) : ok(e)), ck = () => "설비 투자 비용 Zero", lk = () => "Zero Equipment Investment", uk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ck(e) : lk(e)), dk = () => "토트와 태블릿만으로 즉시 가상 DAS를 구성할 수 있습니다. 기존 DAS 대비 초기 투자 비용을 절감합니다.", fk = () => "A virtual DAS can be set up instantly using only totes and a tablet.\n Reduce upfront investment costs compared to conventional DAS systems.", pk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dk(e) : fk(e)), mk = () => "피킹 처리 속도 향상", hk = () => "Improved Picking Speed", gk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mk(e) : hk(e)), _k = () => "동선 최적화와 자동 안내로 같은 인원이 더 많은 주문을 처리합니다.", vk = () => "Route optimization and automated guidance enable the same workforce to process more orders.", yk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _k(e) : vk(e)), bk = () => "시간당 처리 수량", xk = () => "Hourly Throughput", Sk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bk(e) : xk(e)), Ck = () => "신규 UI와 작업 흐름 최적화로 같은 시간에 더 많은 주문을 완료합니다", wk = () => "A redesigned UI and optimized workflows enable more orders to be completed in the same amount of time.", Tk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ck(e) : wk(e)), Ek = () => "기존 피킹 전략 호환율", Dk = () => "Compatibility with Existing Picking Strategies", Ok = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ek(e) : Dk(e)), kk = () => "피스·배치·웨이브 등 피킹 방식을 바꾸지 않아도 현재 방식과 전략 그대로 사용할 수 있습니다.", Ak = () => "Whether you use piece, batch, or wave picking, you can continue using your existing workflows and strategies without any changes.", jk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kk(e) : Ak(e)), Mk = () => "물류 / 3PL", Nk = () => "Logistics / 3PL", Pk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Mk(e) : Nk(e)), Fk = () => "피킹/검수 솔루션", Ik = () => "Picking/Inspection Solution", Lk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Fk(e) : Ik(e)), Rk = () => "물류 / 3PL", zk = () => "Logistics / 3PL", Bk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Rk(e) : zk(e)), Vk = () => "피킹·검수 작업을 스마트 글라스 기반 단일 시스템으로 통합해 현장 전 과정을 디지털화했습니다.", Hk = () => "Integrated picking and inspection operations into a single smart glasses–based system, digitizing the entire workflow.", Uk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Vk(e) : Hk(e)), Wk = () => "기존 종이 피킹지와 수기 검수 방식에서 벗어나 바코드 스캔과 영상 녹화 기반의 표준화된 작업 환경을 갖출 수 있었습니다.", Gk = () => "A standardized workflow was established through barcode scanning and video recording, replacing paper-based picking lists and manual inspection processes.", Kk = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Wk(e) : Gk(e)), qk = /* @__PURE__ */ Object.assign((() => "작업정확도 99% 이상 향상 : 바코드 및 QR코드 기반 실시간 매칭 검증 기준 측정"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "작업정확도 99% 이상 향상"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : 바코드 및 QR코드 기반 실시간 매칭 검증 기준 측정"
	}
]) }), Jk = /* @__PURE__ */ Object.assign((() => "Achieved Over 99% Work Accuracy : Based on real-time barcode and QR code matching verification"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Achieved Over 99% Work Accuracy"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : Based on real-time barcode and QR code matching verification"
	}
]) }), Yk = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qk(e) : Jk(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof qk.parts == "function" ? qk.parts(e) : [{
	type: "text",
	value: qk(e)
}] : typeof Jk.parts == "function" ? Jk.parts(e) : [{
	type: "text",
	value: Jk(e)
}]) }), Xk = /* @__PURE__ */ Object.assign((() => "시간당 처리 수 18% 이상 : 이전 작업 구간 대비 신규 UI 적용 후 PPH 기준"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "시간당 처리 수 18% 이상"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : 이전 작업 구간 대비 신규 UI 적용 후 PPH 기준"
	}
]) }), Zk = /* @__PURE__ */ Object.assign((() => "Over 18% Increase in Orders Processed per Hour : Based on PPH measured after implementing the new UI compared to the previous workflow."), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Over 18% Increase in Orders Processed per Hour"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : Based on PPH measured after implementing the new UI compared to the previous workflow."
	}
]) }), Qk = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Xk(e) : Zk(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof Xk.parts == "function" ? Xk.parts(e) : [{
	type: "text",
	value: Xk(e)
}] : typeof Zk.parts == "function" ? Zk.parts(e) : [{
	type: "text",
	value: Zk(e)
}]) }), $k = () => "풀필먼트 / 배송", eA = () => "Fulfillment / Delivery", tA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $k(e) : eA(e)), nA = () => "스마트 물류 솔루션", rA = () => "Smart Logistics Solution", iA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nA(e) : rA(e)), aA = () => "풀필먼트 / 배송", oA = () => "Fulfillment / Delivery", sA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aA(e) : oA(e)), cA = () => "종합 물류센터에 스마트 글라스 기반 피킹 솔루션을 도입해 현장 작업 효율을 대폭 향상시켰습니다.", lA = () => "Implemented a smart glasses-based picking solution at a logistics center, significantly improving on-site operational efficiency.", uA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cA(e) : lA(e)), dA = () => "숙련자 의존 구조에서 벗어나 신규 인력도 즉시 투입 가능한 표준화된 피킹 환경을 구축했습니다.", fA = () => "Established a standardized picking environment that reduces reliance on experienced workers and enables new personnel to be deployed immediately.", pA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dA(e) : fA(e)), mA = /* @__PURE__ */ Object.assign((() => "시간당 생산성 58% 이상 향상 : 피킹 업무 프로세스 적용 전후 대비 기준"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "시간당 생산성 58% 이상 향상"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : 피킹 업무 프로세스 적용 전후 대비 기준"
	}
]) }), hA = /* @__PURE__ */ Object.assign((() => "Over 58% Increase in Hourly Productivity : Based on a comparison before and after implementing the picking workflow."), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Over 58% Increase in Hourly Productivity"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : Based on a comparison before and after implementing the picking workflow."
	}
]) }), gA = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mA(e) : hA(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof mA.parts == "function" ? mA.parts(e) : [{
	type: "text",
	value: mA(e)
}] : typeof hA.parts == "function" ? hA.parts(e) : [{
	type: "text",
	value: hA(e)
}]) }), _A = /* @__PURE__ */ Object.assign((() => "1피킹당 시간 75% 단축  : 스마트글라스 기반 가이드 적용 전 수작업 대비 지표"), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "1피킹당 시간 75% 단축"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "  : 스마트글라스 기반 가이드 적용 전 수작업 대비 지표"
	}
]) }), vA = /* @__PURE__ */ Object.assign((() => "Over 75% Reduction in Time per Pick : Based on a comparison with manual operations before implementing smart glasses–based guidance."), { parts: (() => [
	{
		type: "markup-start",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: "Over 75% Reduction in Time per Pick"
	},
	{
		type: "markup-end",
		name: "b",
		options: {},
		attributes: {}
	},
	{
		type: "text",
		value: " : Based on a comparison with manual operations before implementing smart glasses–based guidance."
	}
]) }), yA = /* @__PURE__ */ Object.assign(((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _A(e) : vA(e)), { parts: ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? typeof _A.parts == "function" ? _A.parts(e) : [{
	type: "text",
	value: _A(e)
}] : typeof vA.parts == "function" ? vA.parts(e) : [{
	type: "text",
	value: vA(e)
}]) }), bA = () => "보안 정책에 따라 고객사 정보 및 이미지 일부를 대체하였습니다", xA = () => "Due to security policies, some client information and images have been replaced.", SA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bA(e) : xA(e)), CA = () => "도입 전 궁금한 점들", wA = () => "Frequently Asked Questions", TA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CA(e) : wA(e)), EA = () => "기존 WMS·ERP 시스템과 연동이 필요한가요?", DA = () => "Do I need to integrate with my existing WMS or ERP system?", OA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? EA(e) : DA(e)), kA = () => "아니요. \n별도 연동 없이 엑셀 파일 업로드만으로 즉시 사용 가능합니다. \n피킹 지시서를 표준 엑셀 포맷으로 추출하기만 하면 되기 때문에 기존 시스템과 관계 없이 독립적으로 운영됩니다.\n WMS·ERP 연동이 필요한 경우에는 API 방식으로 별도 협의를 통해 지원합니다.", AA = () => "No.\n The solution can be used immediately by simply uploading an Excel file, with no additional system integration required.\n As long as picking instructions can be exported in a standard Excel format, the solution operates independently of existing systems.\n If WMS or ERP integration is required, API-based integration can be supported through separate consultation.", jA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kA(e) : AA(e)), MA = () => "스마트 글라스가 없으면 사용할 수 없나요?", NA = () => "Can the solution be used without smart glasses?", PA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? MA(e) : NA(e)), FA = () => "태블릿만으로도 모든 기능을 동일하게 사용할 수 있습니다. \n스마트 글라스는 두 손을 완전히 자유롭게 유지하고 싶은 현장에서 추가로 연동하는 선택 사항입니다. \n태블릿으로 먼저 도입해 효과를 검증한 후, 필요에 따라 스마트 글라스를 단계적으로 확대 적용하는 방식도 가능합니다.", IA = () => "Yes. \n All features can be used with a tablet alone. \n Smart glasses are an optional add-on for environments where both hands need to remain completely free during operations. \n You can first deploy the solution using tablets to validate its effectiveness and then gradually expand to smart glasses as needed.", LA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? FA(e) : IA(e)), RA = () => "작업 현황을 사무실에서 실시간으로 볼 수 있나요?", zA = () => "Can I monitor work progress in real time from the office?", BA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? RA(e) : zA(e)), VA = () => "웹 기반 관리 화면을 통해 현장에 없어도 작업 상황을 실시간으로 파악할 수 있습니다.\n 웨이브별 진행 상태, UPH, 피킹 정확도, 오류 발생 현황을 대시보드에서 바로 확인할 수 있으며, 지연되거나 오류가 발생한 작업도 즉시 감지됩니다.\n 별도 클라이언트 설치 없이 PC 브라우저에서 접속하면 되기 때문에 관리자가 원격에서도 현장 운영 현황을 모니터링할 수 있습니다.", HA = () => "Yes. \n A web-based management dashboard provides real-time visibility into operational status, even when off-site. \n Wave progress, UPH, picking accuracy, and error status can be monitored directly from the dashboard, with delayed or failed tasks flagged immediately. \n Since the system is accessible through a standard PC web browser without any client installation, managers can remotely monitor on-site operations.", UA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? VA(e) : HA(e)), WA = () => "도입 전 소규모로 먼저 테스트해볼 수 있나요?", GA = () => "Can I run a small-scale pilot test before full deployment?", KA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? WA(e) : GA(e)), qA = () => "트라이얼 계정을 통해 실제 현장 환경에서 소규모 파일럿으로 먼저 검증할 수 있습니다. \n특정 웨이브나 작업 라인 일부에만 먼저 적용해 효과를 확인한 후, 검증이 완료되면 전사 확산으로 전환하는 단계적 롤아웃 방식으로 진행됩니다.\n 트라이얼 기간 동안에는 딥파인 전담 담당자가 현장 셋업부터 운영 안착까지 직접 지원합니다.", JA = () => "Yes. \n A trial account allows you to validate the solution through a small-scale pilot in your actual operational environment. \n You can start with a specific wave or part of a work line, evaluate the results, and then expand deployment organization-wide through a phased rollout once the effectiveness has been verified. \n Throughout the trial period, a dedicated Deepfine specialist will support you from on-site setup to successful operational adoption.", YA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qA(e) : JA(e)), XA = () => "LOGI.FINE이 바꾸는", ZA = () => "How LOGI.FINE Transforms", QA = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? XA(e) : ZA(e)), $A = () => "피킹 현장", ej = () => "Picking Operations", tj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $A(e) : ej(e)), nj = () => "업종과 현장 환경에 맞는 최적 도입 플랜을 무료로 제안해 드립니다. \n지금 바로 문의해 주세요.", rj = () => "Get a free deployment plan tailored to your industry and operational environment.\n Contact us now.", ij = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nj(e) : rj(e)), aj = () => "이커머스 풀필먼트", oj = () => "E-commerce Fulfillment", sj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aj(e) : oj(e)), cj = () => "3PL 물류센터", lj = () => "3PL Logistics Centers", uj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cj(e) : lj(e)), dj = () => "제조·부품 창고", fj = () => "Manufacturing · Parts Warehouses", pj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dj(e) : fj(e)), mj = () => "리테일 물류", hj = () => "Retail Logistics", gj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mj(e) : hj(e)), _j = () => "의약품·헬스케어", vj = () => "Pharmaceutical · Healthcare", yj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _j(e) : vj(e)), bj = () => "식품·냉장 물류", xj = () => "Food · Cold Chain Logistics", Sj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bj(e) : xj(e)), Cj = () => "뷰티·화장품 물류", wj = () => "Beauty · Cosmetics Logistics", Tj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Cj(e) : wj(e)), Ej = () => "MRO·산업자재 물류", Dj = () => "MRO · Industrial Material Logistics", Oj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Ej(e) : Dj(e)), kj = () => "딥파인은 Spatial Intelligence 기술을 기반으로\n 산업 현장의 운영 방식을 바꾸고 있습니다.", Aj = () => "DEEP.FINE is redefining industrial operations \n with its Spatial Intelligence technology.", jj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kj(e) : Aj(e)), Mj = () => "우리는 현장의 작업과 공간 데이터를 연결해 수작업과 경험에 의존하던 업무를 표준화하고,\n 더 안전하고 효율적인 운영 구조로 전환하고자 합니다. Vision AI, VPS, 3D 공간 데이터,\n 스마트글라스 등의 기술은 이를 실현하는 딥파인의 핵심 기반입니다.", Nj = () => "We connect field operations with spatial data to standardize workflows \n that have traditionally relied on manual processes and individual experience, \n enabling safer and more efficient operations. \n Vision AI, VPS, 3D spatial data, and smart glasses \n form the technological foundation that makes this transformation possible.", Pj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Mj(e) : Nj(e)), Fj = () => "딥파인은 물류, 제조, 조선·중공업, MRO, 관광·공공 등 다양한 분야에서 \n고객과 함께 기술을 검증하고 상용화해 왔습니다.", Ij = () => "DEEP.FINE has validated and commercialized its technologies \n across a wide range of industries, including logistics, manufacturing,  \n shipbuilding and heavy industries, MRO, tourism, and the public sector,  \n working closely with customers to deliver real-world value.", Lj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Fj(e) : Ij(e)), Rj = () => "이제는 검증된 기술을 더 많은 현장과 산업으로 확장하며, \n고객의 성과로 증명되는 산업 AX 환경을 만들어가겠습니다.", zj = () => "Building on this proven track record, we are expanding our technologies \n to more worksites and industries, creating an Industrial AX environment \n defined by measurable customer success.", Bj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Rj(e) : zj(e)), Vj = () => "김현배", Hj = () => "Hyunbae Kim", Uj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Vj(e) : Hj(e)), Wj = () => "기술개발본부", Gj = () => "Technology Development Division", Kj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Wj(e) : Gj(e)), qj = () => "딥파인의 Spatial AI와 산업 운영 솔루션을 구현하는 핵심 기술을 개발합니다. 비전 AI, 3D 공간 매핑, VPS, 클라우드, 스마트글라스 애플리케이션까지 현장에서 작동하는 기술 기반을 만듭니다.", Jj = () => "Develops the core technologies behind DEEP.FINE's Spatial AI and industrial operations solutions. From Vision AI and 3D spatial mapping to VPS, cloud platforms, and smart glass applications, the division builds the technology foundation for real-world industrial environments.", Yj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qj(e) : Jj(e)), Xj = () => "AI·Vision 개발: 산업 현장 인식, 객체 인식, Vision AI, AI Agent 기술 개발", Zj = () => "AI · Vision Development : Building AI technologies for industrial scene understanding, object recognition, Vision AI, and AI Agents.", Qj = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? Xj(e) : Zj(e)), $j = () => "Spatial Computing 개발: VPS, 3D 매핑, 실내 측위, 공간 데이터 처리 기술 개발", eM = () => "Spatial Computing Development : Developing VPS, 3D mapping, indoor positioning, and spatial data technologies.", tM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $j(e) : eM(e)), nM = () => "플랫폼 개발: 클라우드, 백엔드, API, 데이터 처리 인프라 구축", rM = () => "Platform Development : Building cloud platforms, backend systems, APIs, and data infrastructure.", iM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nM(e) : rM(e)), aM = () => "애플리케이션 개발: 모바일, 웹, 스마트글라스, XR 기반 현장 앱 개발", oM = () => "Application Development : Developing mobile, web, smart glass, and XR applications for field operations.", sM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aM(e) : oM(e)), cM = () => "제품·서비스본부", lM = () => "Product & Service Division", uM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cM(e) : lM(e)), dM = () => "산업 현장의 요구사항을 실제 제품과 서비스 경험으로 설계합니다. 고객의 업무 프로세스를 분석하고, 사용자가 현장에서 쉽게 쓸 수 있는 화면, 기능, 콘텐츠, 도입 구조를 만듭니다.", fM = () => "Designs products and service experiences based on the needs of industrial operations. By analyzing customer workflows, the division creates intuitive interfaces, features, content, and deployment frameworks that enable users to work effectively in the field.", pM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dM(e) : fM(e)), mM = () => "제품기획: 솔루션 방향성, 기능 우선순위, 제품 로드맵 수립", hM = () => "Product Planning : Defining solution strategies, feature priorities, and product roadmaps.", gM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mM(e) : hM(e)), _M = () => "UX/UI 디자인: 웹, 모바일, 스마트글라스, XR 환경에 맞는 사용자 경험 설계", vM = () => "UX/UI Design : Designing user experiences for web, mobile, smart glasses, and XR environments.", yM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _M(e) : vM(e)), bM = () => "프로젝트 관리: PoC, 구축, 고객 요구사항, 일정 및 산출물 관리", xM = () => "Project Management : Managing PoCs, implementation projects, customer requirements, schedules, and deliverables.", SM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bM(e) : xM(e)), CM = () => "콘텐츠·서비스 설계: 3D 에셋, 매뉴얼, 업무 시나리오, 현장형 서비스 콘텐츠 제작", wM = () => "Content & Service Design : Creating 3D assets, manuals, workflow scenarios, and field-ready service content.", TM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CM(e) : wM(e)), EM = () => "경영지원본부", DM = () => "Management Support Division", OM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? EM(e) : DM(e)), kM = () => "딥파인이 안정적으로 성장할 수 있도록 인사, 재무, 총무, 법무, 내부 운영 체계를 관리합니다. 구성원이 제품 개발과 고객 대응에 집중할 수 있는 환경을 조성하고, 조직 운영의 안정성과 효율성을 높이는 기반을 만듭니다.", AM = () => "Supports DEEP.FINE's sustainable growth by managing HR, finance, administration, legal affairs, and internal operations. The division builds the foundation for efficient organizational management, enabling teams to focus on product innovation and customer success.", jM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kM(e) : AM(e)), MM = () => "재무·회계: 회계, 자금, 예산, 정산, 경영 리포트 관리", NM = () => "Finance & Accounting : Managing accounting, treasury, budgeting, settlements, and management reporting.", PM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? MM(e) : NM(e)), FM = () => "인사·조직문화: 채용, 온보딩, 평가, 조직문화 및 구성원 경험 관리", IM = () => "People & Culture : Managing recruitment, onboarding, performance management, organizational culture, and employee experience.", LM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? FM(e) : IM(e)), RM = () => "총무·자산관리: 사무환경, 자산, 계약, 구매 및 행정 업무 지원", zM = () => "General Affairs & Asset Management : Supporting workplace operations, asset management, contracts, procurement, and administrative functions.", BM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? RM(e) : zM(e)), VM = () => "운영지원: 내부 프로세스, 문서, 컴플라이언스, 업무 효율화 지원", HM = () => "Operations Support : Supporting internal processes, documentation, compliance, and operational efficiency.", UM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? VM(e) : HM(e)), WM = () => "세일즈·마케팅본부", GM = () => "Sales & Marketing Division", KM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? WM(e) : GM(e)), qM = () => "딥파인의 기술과 솔루션을 시장 기회와 고객 수요로 연결합니다. 대기업 고객, 전략 파트너, 전시, PR, 디지털 마케팅을 통해 사업 성장과 브랜드 인지도를 확대합니다.", JM = () => "Connects DEEP.FINE's technologies and solutions with market opportunities. Through enterprise sales, strategic partnerships, exhibitions, PR, and digital marketing, the division accelerates business growth and expands brand presence.", YM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qM(e) : JM(e)), XM = () => "엔터프라이즈 세일즈: 대기업 고객 발굴, 영업 기회 관리, 전략 계정 대응", ZM = () => "Enterprise Sales : Identifying enterprise customers, managing sales opportunities, and supporting strategic accounts.", QM = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? XM(e) : ZM(e)), $M = () => "전략 파트너십: 그룹사, 공공기관, 산업별 파트너와의 협력 구조 구축", eN = () => "Strategic Partnerships : Building collaborative partnerships with affiliates, public institutions, and industry partners.", tN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $M(e) : eN(e)), nN = () => "마케팅 전략: 캠페인, 전시, PR, 콘텐츠, 리드 제너레이션 기획", rN = () => "Marketing Strategy : Planning campaigns, exhibitions, PR, content marketing, and lead generation initiatives.", iN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nN(e) : rN(e)), aN = () => "브랜드 커뮤니케이션: 온·오프라인 채널을 통한 브랜드 인지도 및 신뢰도 강화", oN = () => "Brand Communications : Strengthening brand awareness and trust through online and offline communication channels.", sN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aN(e) : oN(e)), cN = () => "기술로 더 나은 미래를 만들어갈 새로운 동료를 기다립니다.", lN = () => "Join us in building a better future through technology", uN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cN(e) : lN(e)), dN = () => "채용 공고", fN = () => "Join Us", pN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dN(e) : fN(e)), mN = () => "설립과 시장 진입", hN = () => "Foundation & Market Entry", gN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mN(e) : hN(e)), _N = () => "상용화와 기업 고객 확대", vN = () => "Commercialization & Enterprise Customer Growth", yN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _N(e) : vN(e)), bN = () => "사업 확장과 레퍼런스 구축", xN = () => "Business Expansion & Reference Building", SN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bN(e) : xN(e)), CN = () => "도약과 스케일업", wN = () => "Growth & Scale-Up", TN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CN(e) : wN(e)), EN = () => "주소", DN = () => "Address", ON = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? EN(e) : DN(e)), kN = () => "서울특별시 용산구 한강대로30길 25, 업무동 10층 1호 (한강로2가, 아스테리움 용산)", AN = () => "Business Tower 10F #1, 25, Hangang-daero 30-gil, Yongsan-gu, Seoul, Republic of Korea", jN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kN(e) : AN(e)), MN = () => "대표번호", NN = () => "Tel", PN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? MN(e) : NN(e)), FN = () => "070-4633-2487~8", IN = () => "+82 70-4633-2487~8", LN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? FN(e) : IN(e)), RN = () => "평일 10시~17시까지 고객센터 운영 (공휴일 휴무)", zN = () => "Customer service is available from 10 AM(KST) to 5 PM(KST) on weekdays and closed on public holidays", BN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? RN(e) : zN(e)), VN = () => "이메일", HN = () => "Email", UN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? VN(e) : HN(e)), WN = () => "help@deepfine.com", GN = () => "help@deepfine.com", KN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? WN(e) : GN(e)), qN = () => "팩스", JN = () => "Fax", YN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qN(e) : JN(e)), XN = () => "+82 70-4009-7779", ZN = () => "+82 70-4009-7779", QN = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? XN(e) : ZN(e)), $N = () => "딥파인은 공간컴퓨팅, 공간지능, Vision AI, XR, LLM 기술 등을 기반으로 \n물류·제조·MRO ·공공 현장의 작업과 공간 데이터를 연결합니다.", eP = () => "Powered by Spatial Computing, Spatial Intelligence, Vision AI, XR, and LLM technologies, \n DEEP.FINE connects workflows and spatial data across \n logistics, manufacturing, MRO, and public-sector operations.", tP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $N(e) : eP(e)), nP = () => "수작업과 숙련자 의존으로 운영되던 현장을 \n표준화된 디지털 워크플로우와 산업 AI 운영 플랫폼으로 전환합니다.", rP = () => "We help organizations move beyond manual, experience-driven processes \n by enabling standardized digital workflows and AI-powered industrial operations.", iP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nP(e) : rP(e)), aP = () => "도입 문의", oP = () => "Contact Sales", sP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aP(e) : oP(e)), cP = () => "자세히 보기", lP = () => "Learn More", uP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cP(e) : lP(e)), dP = () => "더보기", fP = () => "See more", pP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dP(e) : fP(e)), mP = () => "물류 현장의 비효율, \nLOGI.FINE으로 끝내세요.", hP = () => "Put an end to logistics inefficiencies with LOGI.FINE.", gP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mP(e) : hP(e)), _P = () => "바코드 스캔 기반 피킹 시스템과 가상 DAS로 오피킹 0%에 도전하세요. \n28일간의 무료 트라이얼을 제공합니다.", vP = () => "Achieve zero picking errors with a barcode scanning-based picking system and Virtual DAS.\n Enjoy a 28-day free trial.", yP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _P(e) : vP(e)), bP = () => "트라이얼 신청하기", xP = () => "Start Free Trial", SP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bP(e) : xP(e)), CP = () => "무료 데모 신청하기", wP = () => "Request a Free Demo", TP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CP(e) : wP(e)), EP = () => "견적 문의하기", DP = () => "Request a quote", OP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? EP(e) : DP(e)), kP = () => "개인정보처리방침", AP = () => "Privacy Policy", jP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kP(e) : AP(e)), MP = () => "주식회사 딥파인 ('http://www.deepfine.com'이하 '딥파인 홈페이지')은「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.", NP = () => "DEEP.FINE Co., Ltd. (hereinafter referred to as 'DEEP.FINE Website' or 'http://www.deepfine.com') establishes and discloses this Privacy Policy in accordance with Article 30 of the Personal Information Protection Act to protect the personal information of data subjects and to handle related grievances quickly and smoothly.", PP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? MP(e) : NP(e)), FP = () => "개인정보의 처리 목적", IP = () => "Purposes of Processing Personal Information", LP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? FP(e) : IP(e)), RP = () => "주식회사 딥파인 ('http://www.deepfine.com'이하 '딥파인 홈페이지')은 다음의 목적을 위하여 개인정보를 처리합니다.처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.", zP = () => "DEEP.FINE Co., Ltd. processes personal information for the following purposes. The personal information being processed will not be used for purposes other than the following, and if the purpose of use changes, necessary measures such as obtaining separate consent will be implemented in accordance with Article 18 of the Personal Information Protection Act.", BP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? RP(e) : zP(e)), VP = () => "1. 홈페이지 회원가입 및 관리", HP = () => "1. Website Membership Registration and Management", UP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? VP(e) : HP(e)), WP = () => "회원자격 유지·관리, 서비스 부정이용 방지, 만14세 미만 아동의 개인정보 처리 시 법정대리인의 동의여부 확인 목적으로 개인정보를 처리합니다.", GP = () => "Personal information is processed for the purposes of maintaining and managing membership qualifications, preventing unauthorized use of services, and verifying the consent of legal representatives when processing personal information of children under the age of 14.", KP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? WP(e) : GP(e)), qP = () => "2. 재화 또는 서비스 제공", JP = () => "2. Provision of Goods or Services", YP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qP(e) : JP(e)), XP = () => "서비스 제공을 목적으로 개인정보를 처리합니다.", ZP = () => "Personal information is processed for the purpose of providing services.", QP = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? XP(e) : ZP(e)), $P = () => "3. 마케팅 및 광고에의 활용", eF = () => "3. Marketing and Advertising Optimization", tF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $P(e) : eF(e)), nF = () => "신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공 , 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.", rF = () => "Personal information is processed for the purposes of developing new services (products) and providing customized services, providing events and advertising information, offering opportunities to participate, identifying access frequencies, or compiling statistics on members' service utilization.", iF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nF(e) : rF(e)), aF = () => "4. 서비스 이용 및 문의에 따른 본인 식별 및 실명 확인", oF = () => "4. Identity Verification and Real-Name Confirmation upon Service Use and Inquiries", sF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aF(e) : oF(e)), cF = () => "제품관련 문의에 따른 추가 조사를 위한 의사소통 경로 확보", lF = () => "Securing communication channels for additional inquiries and follow-up investigations related to product inquiries.", uF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cF(e) : lF(e)), dF = () => "개인정보의 처리 및 보유 기간", fF = () => "Processing and Retention Period of Personal Information", pF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dF(e) : fF(e)), mF = () => "1. 주식회사 딥파인은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.", hF = () => "1. DEEP.FINE Co., Ltd. processes and retains personal information within the personal information retention and use period required by statutes or the personal information retention and use period consented to by the data subject upon collection.", gF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mF(e) : hF(e)), _F = () => "2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.", vF = () => "2. The specific processing and retention periods for each category of personal information are as follows:", yF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _F(e) : vF(e)), bF = () => "신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년", xF = () => "Records on collection/processing and use of credit information: 3 years", SF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bF(e) : xF(e)), CF = () => " 소비자 불만 또는 분쟁처리에 관한 기록: 분쟁처리 종료일로부터 5년", wF = () => "Records on consumer complaints or dispute resolution: 5 years from the date of dispute resolution completion.", TF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CF(e) : wF(e)), EF = () => "개인정보의 제3자 제공", DF = () => "Third-Party Provision of Personal Information", OF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? EF(e) : DF(e)), kF = () => "주식회사 딥파인은 이용자의 개인정보를 \"개인정보 처리 목적”에서 고지한 범위 내에서 사용하며, 이용자의 사전 동의 없이 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 정보주체와 법정대리인의 권리·의무 및 그 행사방법", AF = () => "DEEP.FINE Co., Ltd. uses the user's personal information only within the scope notified in the 'Purposes of Processing Personal Information' and does not use it beyond that scope or provide it to third parties without the prior consent of the user, except as permitted under general legal principles.", jF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kF(e) : AF(e)), MF = () => "정보주체와 법정대리인의 권리·의무 및 그 행사방법", NF = () => "Rights and Obligations of Data Subjects and Legal Representatives and Methods of Exercise", PF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? MF(e) : NF(e)), FF = () => "1. 정보주체는 주식회사 딥파인에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.", IF = () => "1. Data subjects may exercise their rights to access, correct, delete, or suspend the processing of their personal information against DEEP.FINE Co., Ltd. at any time.", LF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? FF(e) : IF(e)), RF = () => "2. 제1항에 따른 권리 행사는주식회사 딥파인에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 주식회사 딥파인은(는) 이에 대해 지체 없이 조치하겠습니다.", zF = () => "2. The exercise of rights pursuant to Paragraph 1 may be made in writing, via electronic mail, or facsimile (FAX) in accordance with Article 41, Paragraph 1 of the Enforcement Decree of the Personal Information Protection Act, and DEEP.FINE Co., Ltd. will take action without delay.", BF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? RF(e) : zF(e)), VF = () => "3. 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.", HF = () => "3. The exercise of rights pursuant to Paragraph 1 may be done through a legal representative of the data subject or an agent who has been delegated authority. In this case, a power of attorney in accordance with Form No. 11 of the 'Notice on Methods of Processing Personal Information (No. 2020-7)' must be submitted.", UF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? VF(e) : HF(e)), WF = () => "4. 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.", GF = () => "4. Requests for access to and suspension of processing of personal information may be restricted under Article 35, Paragraph 4 and Article 37, Paragraph 2 of the Personal Information Protection Act.", KF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? WF(e) : GF(e)), qF = () => "5. 주식회사 딥파인은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.", JF = () => "5. DEEP.FINE Co., Ltd. verifies whether the person making the request for access, correction, deletion, or suspension of processing is the data subject themselves or a legitimate representative.", YF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qF(e) : JF(e)), XF = () => "처리하는 개인정보의 항목 작성", ZF = () => "Items of Personal Information Processed", QF = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? XF(e) : ZF(e)), $F = () => "주식회사 딥파인은 제품제공, 원할한 고객상담을 위해 최소한의 개인정보를 수집합니다. \n이메일, 전화번호, 이름, 회사명, 직책, 부서, 회사명, 문의내용, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보", eI = () => "DEEP.FINE Co., Ltd. collects the minimum personal information required for seamless customer consultation and product provision:\n Email, phone number, name, company name, job title, department, inquiry details, service utilization logs, access logs, cookies, and access IP information.", tI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $F(e) : eI(e)), nI = () => "개인정보의 파기", rI = () => "Destruction of Personal Information", iI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nI(e) : rI(e)), aI = () => "1. 주식회사 딥파인은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.", oI = () => "1. DEEP.FINE Co., Ltd. destroys personal information without delay when it becomes unnecessary, such as upon expiration of the retention period or achievement of the processing purpose.", sI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aI(e) : oI(e)), cI = () => "2. 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.", lI = () => "2. If personal information must be continuously preserved under other statutes despite the expiration of the retention period consented to by the data subject or the achievement of the processing purpose, the personal information is transferred to a separate database (DB) or stored in a different location.", uI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cI(e) : lI(e)), dI = () => "3. 개인정보 파기의 절차 및 방법은 다음과 같습니다.", fI = () => "3. The procedures and methods for destroying personal information are as follows:", pI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dI(e) : fI(e)), mI = () => "파기절차주식회사 딥파인은 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다. 파기방법회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.", hI = () => "Destruction Procedure: DEEP.FINE Co., Ltd. selects the personal information for which the reason for destruction has occurred and destroys it with the approval of the company's Privacy Officer. | Destruction Method: Personal information recorded and stored in electronic file format is destroyed so that the records cannot be reproduced, and personal information recorded and stored in paper documents is shredded or incinerated.", gI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mI(e) : hI(e)), _I = () => "개인정보의 안전성 확보 조치", vI = () => "Measures to Secure the Safety of Personal Information", yI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _I(e) : vI(e)), bI = () => "주식회사 딥파인은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.", xI = () => "DEEP.FINE Co., Ltd. takes the following measures to ensure the safety of personal information:", SI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bI(e) : xI(e)), CI = () => "1. 정기적인 자체 감사 실시", wI = () => "1. Conducting Regular Self-Audits", TI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CI(e) : wI(e)), EI = () => "개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.", DI = () => "To ensure safety related to the handling of personal information, regular (once a quarter) self-audits are conducted.", OI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? EI(e) : DI(e)), kI = () => "2. 개인정보 취급 직원의 최소화 및 교육", AI = () => "2. Minimization and Training of Staff Handling Personal Information", jI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kI(e) : AI(e)), MI = () => "개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.", NI = () => "We designate specific employees who handle personal information and limit access to designated staff only to minimize and manage personal information hazards.", PI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? MI(e) : NI(e)), FI = () => "3. 내부관리계획의 수립 및 시행", II = () => "3. Establishment and Implementation of Internal Management Plans", LI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? FI(e) : II(e)), RI = () => "개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.", zI = () => "An internal management plan has been established and implemented for the secure processing of personal information.", BI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? RI(e) : zI(e)), VI = () => "4. 해킹 등에 대비한 기술적 대책", HI = () => "4. Technical Measures Against Hacking, etc.", UI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? VI(e) : HI(e)), WI = () => "딥파인 홈페이지는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.", GI = () => "The DEEP.FINE Website installs security programs and performs periodic updates and inspections to prevent personal information leakage or corruption caused by hacking or computer viruses. Systems are installed in areas where access from the outside is controlled, monitoring and blocking both technically and physically.", KI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? WI(e) : GI(e)), qI = () => "5. 개인정보의 암호화", JI = () => "5. Encryption of Personal Information", YI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qI(e) : JI(e)), XI = () => "이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.", ZI = () => "The user's personal information and passwords are encrypted, stored, and managed so that only the user knows them. For critical data, separate security features such as file/transmission data encryption or file locking functions are used.", QI = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? XI(e) : ZI(e)), $I = () => "6. 접속기록의 보관 및 위변조 방지", eL = () => "6. Retention of Access Logs and Prevention of Forgery/Alteration", tL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $I(e) : eL(e)), nL = () => "개인정보처리시스템에 접속한 기록을 최소 1년 이상 보관, 관리하고 있으며,다만, 5만명 이상의 정보주체에 관하여 개인정보를 추가하거나, 고유식별정보 또는 민감정보를 처리하는 경우에는 2년이상 보관, 관리하고 있습니다. 또한, 접속기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다.", rL = () => "Records of access to the personal information processing system are maintained and managed for at least 1 year. However, if personal information of more than 50,000 data subjects is added, or unique identification information or sensitive data is processed, records are stored and managed for more than 2 years. Security features are deployed to prevent access records from being forged, altered, stolen, or lost.", iL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nL(e) : rL(e)), aL = () => "7. 개인정보에 대한 접근 제한", oL = () => "7. Restricting Access to Personal Information", sL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aL(e) : oL(e)), cL = () => "개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.", lL = () => "Necessary measures are taken to control access to personal information by granting, changing, and revoking access rights to the database system processing personal information, and unauthorized access from the outside is controlled using an intrusion prevention system.", uL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cL(e) : lL(e)), dL = () => "개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항", fL = () => "Matters Concerning Installation, Operation, and Rejection of Automatic Personal Information Collection Devices", pL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dL(e) : fL(e)), mL = () => "1. 회사는 안정적인 홈페이지 운영을 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.", hL = () => "1. The company uses 'cookies' that store and retrieve user information from time to time to ensure stable website operations.", gL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mL(e) : hL(e)), _L = () => "2. 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.", vL = () => "2. Cookies are small amounts of information sent by the server (HTTP) used to run the website to the user's computer browser and may be stored on the hard disk of the user's PC computer.", yL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _L(e) : vL(e)), bL = () => "쿠키의 사용목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태 등을 파악하여 안정적인 홈페이지 운영을 위해 사용됩니다. 쿠키의 설치·운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다. 이용자가 쿠키 저장을 거부하여도 홈페이지 이용에 어려움이나 불이익은 없습니다.", xL = () => "Purpose of Cookie Use: Cookies are used to grasp visitation and utilization formats for each service and website visited by the user to ensure stable website operation. | Installation, Operation, and Rejection of Cookies: You can refuse cookie storage through the option settings in Tools > Internet Options > Privacy menu at the top of your web browser. Even if users refuse to store cookies, there are no difficulties or disadvantages in using the website.", SL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bL(e) : xL(e)), CL = () => "개인정보 보호책임자", wL = () => "Privacy Officer", TL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CL(e) : wL(e)), EL = () => "주식회사 딥파인 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.", DL = () => "DEEP.FINE Co., Ltd. takes overall responsibility for matters related to personal information processing and designates a Privacy Officer as follows to handle complaints and remedy damages of data subjects regarding personal information processing.", OL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? EL(e) : DL(e)), kL = () => "개인정보보호책임자", AL = () => "Chief Privacy Officer (CPO)", jL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? kL(e) : AL(e)), ML = () => "성명 : 이정민", NL = () => "Name: Jungmin Lee", PL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ML(e) : NL(e)), FL = () => "직책 : 이사", IL = () => "Title: Director", LL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? FL(e) : IL(e)), RL = () => "전화번호 : 070-4633-2488", zL = () => "Phone: +82-70-4633-2488", BL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? RL(e) : zL(e)), VL = () => "메일주소 : jm.lee@deepfine.com", HL = () => "Email: jm.lee@deepfine.com", UL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? VL(e) : HL(e)), WL = () => "기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.", GL = () => "If you need to report or consult on other privacy infringements, please contact the following agencies:", KL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? WL(e) : GL(e)), qL = () => "1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972", JL = () => "1. Personal Information Dispute Mediation Committee: (Without Area Code) 1833-6972", YL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? qL(e) : JL(e)), XL = () => "2. 개인정보침해신고센터 : (국번없이) 118", ZL = () => "2. Personal Information Infringement Report Center: (Without Area Code) 118", QL = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? XL(e) : ZL(e)), $L = () => "3. 대검찰청 사이버범죄 수사단 : (국번없이) 1301", eR = () => "3. Cybercrime Investigation Division, Supreme Prosecutors' Office: (Without Area Code) 1301", tR = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? $L(e) : eR(e)), nR = () => "4. 경찰청 사이버안전국 : (국번없이) 182", rR = () => "4. Cyber Log-in, National Police Agency: (Without Area Code) 182", iR = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? nR(e) : rR(e)), aR = () => "개인정보 처리방침 변경", oR = () => "Amendment of Privacy Policy", sR = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? aR(e) : oR(e)), cR = () => "이 개인정보처리방침은 2022년 2월 25부터 적용됩니다.", lR = () => "This Privacy Policy is effective as of February 25, 2022.", uR = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? cR(e) : lR(e)), dR = () => "바코드 피킹과 가상 DAS를 \n무료 체험해보세요.", fR = () => "Try Barcode Picking \n& Virtual DAS for Free.", pR = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? dR(e) : fR(e)), mR = () => "브로슈어", hR = () => "Brochure", gR = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? mR(e) : hR(e)), _R = () => "트라이얼 신청", vR = () => "Free Trial", yR = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? _R(e) : vR(e)), bR = () => "찾으시는 정보가 이동되었거나 존재하지 않습니다.", xR = () => "The information you are looking for has been moved or does not exist.", SR = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? bR(e) : xR(e)), CR = () => "메인으로 돌아가기", wR = () => "Return to Main", TR = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? CR(e) : wR(e)), ER = () => "등록된 게시글이 없습니다.", DR = () => "No posts have been registered yet.", OR = ((e = {}, t = {}) => (t.locale ?? Z()) === "ko" ? ER(e) : DR(e)), kR = /* @__PURE__ */ H("<section class=\"rounded-xl bg-black bg-(image:--bg-mo) bg-cover bg-center p-5 text-white transition-all lg:bg-(image:--bg-pc) lg:p-15\"><ul class=\"grid grid-cols-1 gap-7.5 lg:grid-cols-2\"><li class=\"space-y-2\"><p class=\"text-2md text-white/70 lg:text-lg\"> </p> <address class=\"text-2md font-bold lg:text-lg\"> </address></li> <li class=\"space-y-2\"><p class=\"text-2md text-white/70 lg:text-lg\"> </p> <a class=\"text-2md font-bold lg:text-lg\"> </a> <p class=\"text-2md text-white/70 lg:text-lg\"> </p></li> <li class=\"space-y-2\"><p class=\"text-2md text-white/70 lg:text-lg\"> </p> <a class=\"text-2md font-bold lg:text-lg\"> </a></li> <li class=\"space-y-2\"><p class=\"text-2md text-white/70 lg:text-lg\"> </p> <p class=\"text-2md font-bold lg:text-lg\"> </p></li></ul></section>");
function AR(e, t) {
	lt(t, !0);
	var n = kR();
	da(n, "", {}, {
		"--bg-mo": "url(/output/imgs/visual/bg-addr-mo.jpg)",
		"--bg-pc": "url(/output/imgs/visual/bg-addr-pc.jpg)"
	});
	var r = L(n), i = L(r), a = L(i), o = L(a, !0);
	M(a);
	var s = R(a, 2), c = L(s, !0);
	M(s), M(i);
	var l = R(i, 2), u = L(l), d = L(u, !0);
	M(u);
	var f = R(u, 2), p = L(f, !0);
	M(f);
	var m = R(f, 2), h = L(m, !0);
	M(m), M(l);
	var g = R(l, 2), _ = L(g), v = L(_, !0);
	M(_);
	var y = R(_, 2), b = L(y, !0);
	M(y), M(g);
	var x = R(g, 2), S = L(x), C = L(S, !0);
	M(S);
	var w = R(S, 2), T = L(w, !0);
	M(w), M(x), M(r), ta(r, () => $c), M(n), z((e, t, n, r, i, a, s, l, u, m, g) => {
		W(o, e), W(c, t), W(d, n), q(f, "href", `tel:${r ?? ""}`), W(p, i), W(h, a), W(v, s), q(y, "href", `mailto:${l ?? ""}`), W(b, u), W(C, m), W(T, g);
	}, [
		() => ON?.(),
		() => jN?.(),
		() => PN?.(),
		() => LN?.(),
		() => LN?.(),
		() => BN?.(),
		() => UN?.(),
		() => KN?.(),
		() => KN?.(),
		() => YN?.(),
		() => QN?.()
	]), U(e, n), ut();
}
customElements.define("address-section", Ga(AR, {}, [], []));
//#endregion
//#region src/lib/components/footer/FooterAdress.svelte
var jR = /* @__PURE__ */ H("<img alt=\"DEEP.FINE\" class=\"w-35 lg:w-69.25\"/>"), MR = /* @__PURE__ */ H("<section class=\"flex flex-col gap-5\"><p><!></p> <div class=\"grid grid-cols-1\"><p class=\"text-2md text-black lg:text-lg\"> </p> <address> </address></div> <ul class=\"grid grid-cols-1 gap-2 lg:pt-7.5\"><li class=\"grid grid-cols-[72px_1fr]\"><p class=\"text-2md text-black lg:text-lg\"> </p> <a> </a></li> <li class=\"grid grid-cols-[72px_1fr]\"><p class=\"text-2md text-black lg:text-lg\"> </p> <a> </a></li> <li class=\"grid grid-cols-[72px_1fr]\"><p class=\"text-2md text-black lg:text-lg\"> </p> <p> </p></li></ul></section>");
function NR(e, t) {
	lt(t, !0);
	var n = MR(), r = L(n), i = L(r), a = (e) => {
		var t = di(), n = Pn(t), r = (e) => {
			var t = jR();
			q(t, "src", "/output/imgs/logo/logo-deepfine.svg"), U(e, t);
		};
		G(n, (e) => {
			e(r, -1);
		}), U(e, t);
	};
	G(i, (e) => {
		e(a);
	}), M(r);
	var o = R(r, 2), s = L(o), c = L(s, !0);
	M(s);
	var l = R(s, 2), u = L(l, !0);
	M(l), M(o);
	var d = R(o, 2), f = L(d), p = L(f), m = L(p, !0);
	M(p);
	var h = R(p, 2), g = L(h, !0);
	M(h), M(f);
	var _ = R(f, 2), v = L(_), y = L(v, !0);
	M(v);
	var b = R(v, 2), x = L(b, !0);
	M(b), M(_);
	var S = R(_, 2), C = L(S), w = L(C, !0);
	M(C);
	var T = R(C, 2), E = L(T, !0);
	M(T), M(S), M(d), M(n), z((e, t, n, r, i, a, o, s, l, d) => {
		W(c, e), W(u, t), W(m, n), q(h, "href", `tel:${r ?? ""}`), W(g, i), W(y, a), q(b, "href", `mailto:${o ?? ""}`), W(x, s), W(w, l), W(E, d);
	}, [
		() => ON?.(),
		() => jN?.(),
		() => PN?.(),
		() => LN?.(),
		() => LN?.(),
		() => UN?.(),
		() => KN?.(),
		() => KN?.(),
		() => YN?.(),
		() => QN?.()
	]), U(e, n), ut();
}
customElements.define("footer-adress", Ga(NR, {}, [], []));
//#endregion
//#region src/lib/components/footer/FooterCopy.svelte
var PR = /* @__PURE__ */ H("<section class=\"border-t-dashed border-t-d9d9d9 border-t p-5 text-center\"><p class=\"text-2md\"> </p></section>");
function FR(e, t) {
	lt(t, !0);
	var n = PR(), r = L(n), i = L(r);
	M(r), M(n), z((e) => W(i, `ⓒ ${e ?? ""}. DEEP.FINE Co., Ltd. All rights reserved.`), [() => (/* @__PURE__ */ new Date()).getUTCFullYear()]), U(e, n), ut();
}
customElements.define("footer-copy", Ga(FR, {}, [], []));
//#endregion
//#region src/lib/paraglide/runtime.js
var IR = {}, LR = ["ko", "en"], RR = "PARAGLIDE_LOCALE", zR = 3456e4, BR = "PARAGLIDE_LOCALE", VR = [
	"localStorage",
	"cookie",
	"preferredLanguage",
	"baseLocale"
], HR = [], UR, WR;
function GR(e) {
	if (HR.length === 0) return;
	let t = typeof e == "string" ? e : e.href;
	if (UR === t) return WR;
	let n = new URL(t, "http://dummy.com"), r;
	for (let e of HR) if (new IR(e.match, n.href).exec(n.href)) {
		r = e;
		break;
	}
	return UR = t, WR = r, r;
}
function KR(e) {
	let t = GR(e);
	return t && t.exclude !== !0 && Array.isArray(t.strategy) ? t.strategy : VR;
}
var qR = void 0;
globalThis.__paraglide = globalThis.__paraglide ?? {}, globalThis.__paraglide.ssr = globalThis.__paraglide.ssr ?? {};
var JR = !1, YR = () => {
	if (qR) {
		let e = qR?.getStore()?.locale;
		if (e) return e;
	}
	let e = VR;
	typeof window < "u" && window.location?.href && (e = KR(window.location.href));
	let t = XR(e, typeof window < "u" ? window.location?.href : void 0);
	if (t) return JR || (JR = !0, QR(t, { reload: !1 })), t;
	throw Error("No locale found. Read the docs https://paraglidejs.com/errors#no-locale-found");
};
function XR(e, t) {
	let n;
	for (let t of e) {
		if (t === "cookie") n = tz();
		else if (t === "baseLocale") n = "ko";
		else if (t === "preferredLanguage") n = nz();
		else if (t === "localStorage") n = localStorage.getItem("PARAGLIDE_LOCALE") ?? void 0;
		else if (iz(t) && rz.has(t)) {
			let e = rz.get(t);
			if (e) {
				let t = e.getLocale();
				if (t instanceof Promise) continue;
				if (t !== void 0) return ez(t);
			}
		}
		let e = $R(n);
		if (e) return e;
	}
}
var ZR = (e) => {
	e ? window.location.href = e : window.location.reload();
}, QR = (e, t) => {
	let n = {
		reload: !0,
		...t
	}, r;
	try {
		r = YR();
	} catch {}
	let i = [], a = VR;
	typeof window < "u" && window.location?.href && (a = KR(window.location.href));
	for (let t of a) if (t === "cookie") {
		if (typeof document > "u" || typeof window > "u") continue;
		let t = `${RR}=${e}; path=/; max-age=${zR}`;
		document.cookie = t;
	} else if (t === "baseLocale") continue;
	else if (t === "localStorage" && typeof window < "u") localStorage.setItem(BR, e);
	else if (iz(t) && rz.has(t)) {
		let n = rz.get(t);
		if (n) {
			let r = n.setLocale(e);
			r instanceof Promise && (r = r.catch((e) => {
				throw Error(`Custom strategy "${t}" setLocale failed.`, { cause: e });
			}), i.push(r));
		}
	}
	let o = () => {
		n.reload && window.location && e !== r && ZR(void 0);
	};
	if (i.length) return Promise.all(i).then(() => {
		o();
	});
	o();
};
function $R(e) {
	if (typeof e != "string") return;
	let t = e.toLowerCase();
	for (let e of LR) if (e.toLowerCase() === t) return e;
}
function ez(e) {
	let t = $R(e);
	if (t) return t;
	throw Error(`Invalid locale: ${e}. Expected one of: ${LR.join(", ")}`);
}
function tz() {
	if (typeof document > "u" || !document.cookie) return;
	let e = document.cookie.match(RegExp(`(^| )${RR}=([^;]+)`))?.[2];
	return $R(e);
}
function nz() {
	if (!navigator?.languages?.length) return;
	let e = navigator.languages.map((e) => ({
		fullTag: e,
		baseTag: e.split("-")[0]
	}));
	for (let t of e) {
		let e = $R(t.fullTag);
		if (e) return e;
		let n = $R(t.baseTag);
		if (n) return n;
	}
}
var rz = /* @__PURE__ */ new Map();
function iz(e) {
	return typeof e == "string" && /^custom-[A-Za-z0-9_-]+$/.test(e);
}
//#endregion
//#region src/lib/components/footer/FooterLang.svelte
var az = /* @__PURE__ */ H("<div class=\"sr-only\"> </div>");
function oz(e, t) {
	lt(t, !0);
	let n = Y(t, "lang", 15, "ko");
	if (typeof document < "u") {
		let e = (document?.documentElement?.lang || "ko").slice(0, 2);
		YR() !== e && QR(e), n(e);
	}
	var r = {
		get lang() {
			return n();
		},
		set lang(e = "ko") {
			n(e), P();
		}
	}, i = az(), a = L(i, !0);
	return M(i), z((e) => W(a, e), [() => YR()]), U(e, i), ut(r);
}
customElements.define("footer-lang", Ga(oz, { lang: {
	reflect: !0,
	type: "String"
} }, [], []));
//#endregion
//#region src/lib/components/footer/FooterSns.svelte
var sz = /* @__PURE__ */ H("<ul class=\"inline-flex w-full items-center justify-center gap-7.5 lg:justify-end\"><li class=\"size-12\"><a href=\"https://www.instagram.com/deepfinecorp/\" class=\"flex size-full\" title=\"new window page insagram\" target=\"_blank\" rel=\"noopener noreferrer\"><img loading=\"lazy\" alt=\"insagram\" class=\"size-12\"/> <span class=\"sr-only\">insagram</span></a></li> <li class=\"size-12\"><a href=\"https://www.youtube.com/channel/UCRzU2-rKT06nbB8IVxOg0Lg\" class=\"flex size-full\" title=\"new window page youtube\" target=\"_blank\" rel=\"noopener noreferrer\"><img loading=\"lazy\" alt=\"youtube\" class=\"size-12\"/> <span class=\"sr-only\">youtube</span></a></li> <li class=\"size-12\"><a href=\"https://www.linkedin.com/company/deepfine/mycompany/\" class=\"flex size-full\" title=\"new window page linkedin\" target=\"_blank\" rel=\"noopener noreferrer\"><img loading=\"lazy\" alt=\"youtube\" class=\"size-12\"/> <span class=\"sr-only\">linkedin</span></a></li> <li class=\"size-12\"><a href=\"https://blog.naver.com/PostList.naver?blogId=deepfine0722&amp;categoryNo=0&amp;from=postList\" class=\"flex size-full\" title=\"new window page blog naver\" target=\"_blank\" rel=\"noopener noreferrer\"><img loading=\"lazy\" alt=\"youtube\" class=\"size-12\"/> <span class=\"sr-only\">naver blog</span></a></li></ul>");
function cz(e) {
	var t = sz(), n = L(t), r = L(n);
	q(L(r), "src", "/output/imgs/logo/icon-instagram.jpg"), Xe(2), M(r), M(n);
	var i = R(n, 2), a = L(i);
	q(L(a), "src", "/output/imgs/logo/icon-youtube.jpg"), Xe(2), M(a), M(i);
	var o = R(i, 2), s = L(o);
	q(L(s), "src", "/output/imgs/logo/icon-linkedin.jpg"), Xe(2), M(s), M(o);
	var c = R(o, 2), l = L(c);
	q(L(l), "src", "/output/imgs/logo/icon-blog.jpg"), Xe(2), M(l), M(c), M(t), U(e, t);
}
customElements.define("footer-sns", Ga(cz, {}, [], []));
//#endregion
//#region src/lib/components/heading/HeaderImgs.svelte
var lz = /* @__PURE__ */ H("<picture class=\"flex w-full\"><img loading=\"lazy\" alt=\"DEEP.FINE An AI and spatial intelligence solution company empowering industrial operations\" class=\"w-41.75 lg:w-full\"/></picture>"), uz = /* @__PURE__ */ H("<figure><img loading=\"lazy\" alt=\"DEEP.FINE An AI and spatial intelligence solution company empowering industrial operations\" class=\"h-10\"/> <figcaption class=\"text-right whitespace-pre-line\"><!></figcaption></figure>"), dz = /* @__PURE__ */ H("<section class=\"before:bg-000/70 absolute flex size-full w-full object-cover before:absolute before:z-2 before:size-full\"><video class=\"absoltue z-1 aspect-video h-full w-full object-cover\" preload=\"auto\" autoplay=\"\" loop=\"\" playsinline=\"\"><source type=\"video/mp4\"/> <source type=\"video/webm\"/></video></section> <div class=\"relative z-3 flex size-full flex-col items-center justify-center gap-15\"><picture class=\"flex w-full justify-center\"><img loading=\"lazy\" alt=\"DEEP.FINE An AI and spatial intelligence solution company empowering industrial operations\" class=\"max-w-72.25 lg:w-full\"/></picture> <p class=\"max-w-135 text-center text-2xl text-white\">An AI and spatial intelligence solution company empowering industrial operations</p></div>", 3), fz = /* @__PURE__ */ H("<footer-lang></footer-lang>", 2), pz = /* @__PURE__ */ H("<!> <!> <!> <!>", 1);
function mz(e, t) {
	lt(t, !0);
	let n = Y(t, "name", 7, ""), r = {
		logo: "/output/imgs/logo/logo-deepfine.svg",
		left: "/output/imgs/logo/img-header.png",
		logi: "/output/imgs/logo/logo-main-logi.svg",
		dao: "/output/imgs/logo/logo-main-dao.svg",
		dsc: "/output/imgs/logo/logo-main-dsc.svg"
	}, i = /* @__PURE__ */ N(() => n() in r ? r[n()] : null), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(Cn(typeof window < "u" ? window.innerWidth : 0)), s = /* @__PURE__ */ N(() => V(o) >= 1280), c = /* @__PURE__ */ F(null);
	Xn(() => {
		if (n() === "left") {
			I(c, document?.getElementById("gnb-menu"), !0);
			let e = () => {
				V(a) && (V(c)?.checked && V(s) ? Ur().then(() => {
					V(a)?.play().catch((e) => console.warn("비디오 재생 거부:", e));
				}) : V(a)?.pause());
			};
			return V(c).addEventListener("change", e), () => {
				V(c)?.removeEventListener("change", e), V(a)?.pause();
			};
		}
	});
	var l = {
		get name() {
			return n();
		},
		set name(e = "") {
			n(e), P();
		}
	}, u = pz(), d = Pn(u), f = (e) => {
		var t = lz(), n = L(t);
		M(t), z(() => q(n, "src", V(i))), U(e, t);
	};
	G(d, (e) => {
		n() === "logo" && e(f);
	});
	var p = R(d, 2), m = (e) => {
		var t = uz();
		da(t, "", {}, {
			"--bg-head-logi": "url(/output/imgs/logo/bg-header-logi-off.jpg)",
			"--bg-head-dao": "url(/output/imgs/logo/bg-header-dao-off.jpg)",
			"--bg-head-dsc": "url(/output/imgs/logo/bg-header-dsc-off.jpg)",
			"--bg-head-logi-on": "url(/output/imgs/logo/bg-header-logi-on.jpg)",
			"--bg-head-dao-on": "url(/output/imgs/logo/bg-header-dao-on.jpg)",
			"--bg-head-dsc-on": "url(/output/imgs/logo/bg-header-dsc-on.jpg)"
		});
		var r = L(t), a = R(r, 2), o = L(a), s = (e) => {
			var t = ui();
			z((e) => W(t, e), [() => wl()]), U(e, t);
		}, c = (e) => {
			var t = ui();
			z((e) => W(t, e), [() => Dl()]), U(e, t);
		}, l = (e) => {
			var t = ui();
			z((e) => W(t, e), [() => Al()]), U(e, t);
		};
		G(o, (e) => {
			n() === "logi" ? e(s) : n() === "dao" ? e(c, 1) : n() === "dsc" && e(l, 2);
		}), M(a), M(t), z(() => {
			K(t, 1, ia([
				"text-2sm flex h-22.5 w-full items-center justify-between bg-cover bg-center bg-no-repeat px-5 text-white",
				n() === "logi" ? "bg-(image:--bg-head-logi) group-hover/head-logo:bg-(image:--bg-head-logi-on) group-aria-[current=page]/head-logo:bg-(image:--bg-head-logi-on) " : "",
				n() === "dao" ? "bg-(image:--bg-head-dao) group-hover/head-logo:bg-(image:--bg-head-dao-on) group-aria-[current=page]/head-logo:bg-(image:--bg-head-dao-on) " : "",
				n() === "dsc" ? "bg-(image:--bg-head-dsc) group-hover/head-logo:bg-(image:--bg-head-dsc-on) group-aria-[current=page]/head-logo:bg-(image:--bg-head-dsc-on) " : ""
			])), q(r, "src", V(i));
		}), U(e, t);
	};
	G(p, (e) => {
		(n() === "logi" || n() === "dao" || n() === "dsc") && e(m);
	});
	var h = R(p, 2), g = (e) => {
		var t = dz(), n = Pn(t), r = L(n);
		r.muted = !0, q(r, "poster", "/output/video/main-video.jpg");
		var o = L(r);
		q(o, "src", "/output/video/main-video.mp4"), q(R(o, 2), "src", "/output/video/main-video.webm"), M(r), Ma(r, (e) => I(a, e), () => V(a)), M(n);
		var s = R(n, 2), c = L(s), l = L(c);
		M(c), Xe(2), M(s), z(() => q(l, "src", V(i))), U(e, t);
	};
	G(h, (e) => {
		n() === "left" && e(g);
	});
	var _ = R(h, 2), v = (e) => {
		var t = fz();
		K(t, 1, "sr-only"), U(e, t);
	};
	return G(_, (e) => {
		n() === "logo" && e(v);
	}), Na("innerWidth", (e) => I(o, e, !0)), U(e, u), ut(l);
}
customElements.define("header-imgs", Ga(mz, { name: { type: "String" } }, [], []));
//#endregion
//#region src/lib/components/heading/HeaderYear.svelte
var hz = /* @__PURE__ */ H("<header class=\"bg-primary items flex h-30 flex-col justify-center gap-1.5 overflow-clip rounded-xl bg-(image:--bg-history-url) bg-cover bg-center bg-no-repeat p-5 text-white lg:h-45 lg:gap-2.5 lg:px-15 lg:py-5\"><p class=\"text-2md lg:text-2xl\"> </p> <p class=\"text-lg font-bold lg:text-2xl\"><!></p></header>");
function gz(e, t) {
	lt(t, !0);
	let n = Y(t, "year", 7, "2019"), r = "/output/imgs/company/bg-history-2019.jpg", i = {
		2019: r,
		2021: "/output/imgs/company/bg-history-2021.jpg",
		2023: "/output/imgs/company/bg-history-2023.jpg",
		2025: "/output/imgs/company/bg-history-2025.jpg"
	}, a = /* @__PURE__ */ N(() => n() in i ? i[n()] : r);
	var o = {
		get year() {
			return n();
		},
		set year(e = "2019") {
			n(e), P();
		}
	}, s = hz();
	let c;
	var l = L(s), u = L(l);
	M(l);
	var d = R(l, 2), f = L(d), p = (e) => {
		var t = ui();
		z((e) => W(t, e), [() => gN()]), U(e, t);
	}, m = (e) => {
		var t = ui();
		z((e) => W(t, e), [() => yN()]), U(e, t);
	}, h = (e) => {
		var t = ui();
		z((e) => W(t, e), [() => SN()]), U(e, t);
	}, g = (e) => {
		var t = ui();
		z((e) => W(t, e), [() => TN()]), U(e, t);
	};
	return G(f, (e) => {
		n() === "2019" ? e(p) : n() === "2021" ? e(m, 1) : n() === "2023" ? e(h, 2) : n() === "2025" && e(g, 3);
	}), M(d), M(s), z((e) => {
		c = da(s, "", c, { "--bg-history-url": `url('${V(a)}')` }), W(u, `${n() ?? ""}~${e ?? ""}`);
	}, [() => Number(n()) + 1]), U(e, s), ut(o);
}
customElements.define("header-year", Ga(gz, { year: { type: "String" } }, [], []));
//#endregion
//#region src/lib/utils/textUtils.svelte.ts
function _z(e) {
	return e ? e.replace(/\\n/g, "<br />") : "";
}
//#endregion
//#region src/lib/components/heading/SubHeadingLine.svelte
var vz = /* @__PURE__ */ H("<h1 class=\"text-3xl leading-tight font-bold transition-all lg:text-6xl\"> </h1> <h2 class=\"sr-only\"> </h2>", 1), yz = /* @__PURE__ */ H("<h2 class=\"text-3xl leading-tight font-bold transition-all lg:text-6xl\"> </h2>"), bz = /* @__PURE__ */ H("<div class=\"max-lg:mt-5\"><a class=\"group flex min-h-12 flex-1 items-center justify-between gap-2 rounded-md border border-black px-5 transition-colors hover:bg-black hover:text-white max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:flex-none\"><span> </span> <icon-list></icon-list></a></div>", 2), xz = /* @__PURE__ */ H("<header><div><!> <p class=\"text-2md transition-all lg:text-2xl\"> </p></div> <!></header>");
function Sz(e, t) {
	lt(t, !0);
	let n = Y(t, "line", 7, "bottom"), r = Y(t, "title", 7, ""), i = Y(t, "subTit", 7, ""), a = Y(t, "btnRender", 7, ""), o = Y(t, "cls", 7, ""), s = Y(t, "page", 7, ""), c = Y(t, "link", 7, ""), l = /* @__PURE__ */ N(() => _z(r())), u = /* @__PURE__ */ N(() => {
		let e = r().toLocaleLowerCase();
		return e === "news" ? sf() : e === "company" ? uf() : e === "contact" ? pf() : "";
	});
	var d = {
		get line() {
			return n();
		},
		set line(e = "bottom") {
			n(e), P();
		},
		get title() {
			return r();
		},
		set title(e = "") {
			r(e), P();
		},
		get subTit() {
			return i();
		},
		set subTit(e = "") {
			i(e), P();
		},
		get btnRender() {
			return a();
		},
		set btnRender(e = "") {
			a(e), P();
		},
		get cls() {
			return o();
		},
		set cls(e = "") {
			o(e), P();
		},
		get page() {
			return s();
		},
		set page(e = "") {
			s(e), P();
		},
		get link() {
			return c();
		},
		set link(e = "") {
			c(e), P();
		}
	}, f = xz(), p = L(f), m = L(p), h = (e) => {
		var t = vz(), n = Pn(t), i = L(n, !0);
		M(n);
		var a = R(n, 2), o = L(a, !0);
		M(a), z(() => {
			W(i, V(l)), W(o, r());
		}), U(e, t);
	}, g = /* @__PURE__ */ N(() => r().toLocaleLowerCase() === "news" || r().toLocaleLowerCase() === "company" || r().toLocaleLowerCase() === "contact"), _ = (e) => {
		var t = yz(), n = L(t, !0);
		M(t), z(() => W(n, V(l))), U(e, t);
	};
	G(m, (e) => {
		V(g) ? e(h) : e(_, -1);
	});
	var v = R(m, 2), y = L(v, !0);
	M(v), M(p);
	var b = R(p, 2), x = (e) => {
		var t = bz(), n = L(t), r = L(n), i = L(r, !0);
		M(r);
		var a = R(r, 2);
		J(a, "name", "arrow-right"), K(a, 1, "size-6 stroke-black group-hover:stroke-white"), M(n), M(t), z((e) => {
			q(n, "href", `${c() ?? "/"}`), q(n, "aria-label", V(u)), W(i, e);
		}, [() => pP()]), U(e, t);
	};
	return G(b, (e) => {
		a() === "link" && e(x);
	}), M(f), ta(f, () => $c), z((e) => {
		K(f, 1, e), K(p, 1, ia(o() ? o() : "space-y-2.5")), W(y, i() ? i() : V(u));
	}, [() => ia([
		"flex justify-between pb-5 opacity-100 max-lg:flex-col lg:whitespace-pre-line",
		n() === "bottom" ? "border-b border-b-black lg:pb-15" : "lg:pb-7.5",
		r().toLocaleLowerCase() === "news" ? "pt-5 lg:pt-15" : "",
		r().toLocaleLowerCase() === "company" ? "pt-5 lg:pt-15" : "",
		r().toLocaleLowerCase() === "contact" ? "pt-5 lg:pt-15" : "",
		s().toLocaleLowerCase() === "term" ? "pt-5 lg:pt-15" : ""
	])]), U(e, f), ut(d);
}
customElements.define("sub-heading-line", Ga(Sz, {
	title: { type: "String" },
	subTit: { type: "String" },
	btnRender: { type: "String" },
	link: { type: "String" },
	cls: { type: "String" },
	line: {},
	page: {}
}, [], []));
//#endregion
//#region src/lib/components/icons/IconData.svelte.ts
function Cz() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		let t = Math.random() * 16 | 0;
		return (e === "x" ? t : t & 3 | 8).toString(16);
	});
}
var wz = Cz(), Tz = () => [
	{
		name: "svg",
		size: "20",
		html: `
				${wz}
			`
	},
	{
		name: "add",
		size: "24",
		html: "\n				<path d=\"M6 12H18\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n				<path d=\"M12 18V6\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n			"
	},
	{
		name: "undo",
		size: "24",
		html: "\n				<path\n					d=\"M7.13086 18.3101H15.1309C17.8909 18.3101 20.1309 16.0701 20.1309 13.3101C20.1309 10.5501 17.8909 8.31006 15.1309 8.31006H4.13086\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-miterlimit=\"10\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n				<path\n					d=\"M6.42914 10.8099L3.86914 8.24994L6.42914 5.68994\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n			"
	},
	{
		name: "tick-circle",
		size: "24",
		html: "\n				<path\n					d=\"M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z\"\n				/>\n			"
	},
	{
		name: "arrow-down",
		size: "20",
		html: "\n				<path\n					d=\"M16.6 12.5416L11.1667 7.10829C10.525 6.46663 9.47502 6.46663 8.83336 7.10829L3.40002 12.5416\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-miterlimit=\"10\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n			"
	},
	{
		name: "arrow-right",
		size: "24",
		html: "\n				<path\n					d=\"M14.4302 5.92969L20.5002 11.9997L14.4302 18.0697\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-miterlimit=\"10\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n				<path\n					d=\"M3.5 12H20.33\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-miterlimit=\"10\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n			"
	},
	{
		name: "arrow-new-link",
		size: "20",
		html: "\n				<path\n					d=\"M20.5 22H3.5\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-miterlimit=\"10\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n				<path\n					d=\"M19 3.5L5 17.5\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-miterlimit=\"10\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n				<path\n					d=\"M19 13.77V3.5H8.73\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-miterlimit=\"10\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n			"
	},
	{
		name: "arrow-as-is",
		size: "90",
		html: "\n				<g opacity=\"0.2\">\n					<path\n						d=\"M54.1123 22.2375L76.8748 45L54.1123 67.7625\"\n						fill=\"none\"\n						stroke-width=\"12\"\n						stroke-miterlimit=\"10\"\n						stroke-linecap=\"round\"\n						stroke-linejoin=\"round\"\n					/>\n					<path\n						d=\"M13.125 45H76.2375\"\n						fill=\"none\"\n						stroke-width=\"12\"\n						stroke-miterlimit=\"10\"\n						stroke-linecap=\"round\"\n						stroke-linejoin=\"round\"\n					/>\n				</g>\n			"
	},
	{
		name: "arrow-link-underline",
		size: "24",
		html: "\n				<path\n					d=\"M20.5 22H3.5\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-miterlimit=\"10\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n				<path\n					d=\"M19 3.5L5 17.5\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-miterlimit=\"10\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n				<path\n					d=\"M19 13.77V3.5H8.73\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-miterlimit=\"10\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n			"
	},
	{
		name: "menu",
		size: "24",
		html: "\n				<path d=\"M3 7H21\" fill=\"none\" stroke-width=\"1.5\" stroke-linecap=\"round\" />\n				<path d=\"M3 12H21\" fill=\"none\" stroke-width=\"1.5\" stroke-linecap=\"round\" />\n				<path d=\"M3 17H21\" fill=\"none\" stroke-width=\"1.5\" stroke-linecap=\"round\" />\n			"
	},
	{
		name: "import",
		size: "24",
		html: "\n				<path\n					d=\"M9.32007 11.6799L11.8801 14.2399L14.4401 11.6799\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-miterlimit=\"10\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n				<path\n					d=\"M11.8799 4V14.17\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-miterlimit=\"10\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n				<path\n					d=\"M20 12.1799C20 16.5999 17 20.1799 12 20.1799C7 20.1799 4 16.5999 4 12.1799\"\n					fill=\"none\"\n					stroke-width=\"1.5\"\n					stroke-miterlimit=\"10\"\n					stroke-linecap=\"round\"\n					stroke-linejoin=\"round\"\n				/>\n			"
	},
	{
		name: "close",
		size: "24",
		html: "\n				<path d=\"M4 20L20 4\" fill=\"none\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n				<path d=\"M20 20L4 4\" fill=\"none\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n			"
	},
	{
		name: "result-up",
		size: "50",
		html: "\n				<path\n					d=\"M35.475 0H14.525C5.425 0 0 5.425 0 14.525V35.45C0 44.575 5.425 50 14.525 50H35.45C44.55 50 49.975 44.575 49.975 35.475V14.525C50 5.425 44.575 0 35.475 0ZM38.125 25.825C38.125 26.85 37.275 27.7 36.25 27.7C35.225 27.7 34.375 26.85 34.375 25.825V18.275L15.075 37.575C14.7 37.95 14.225 38.125 13.75 38.125C13.275 38.125 12.8 37.95 12.425 37.575C11.7 36.85 11.7 35.65 12.425 34.925L31.725 15.625H24.175C23.15 15.625 22.3 14.775 22.3 13.75C22.3 12.725 23.15 11.875 24.175 11.875H36.25C37.275 11.875 38.125 12.725 38.125 13.75V25.825Z\"\n					stroke=\"none\"\n				/>\n			"
	},
	{
		name: "result-down",
		size: "50",
		html: "\n				<path\n					d=\"M35.475 50H14.525C5.425 50 0 44.575 0 35.475V14.55C0 5.425 5.425 0 14.525 0H35.45C44.55 0 49.975 5.425 49.975 14.525V35.475C50 44.575 44.575 50 35.475 50ZM38.125 24.175C38.125 23.15 37.275 22.3 36.25 22.3C35.225 22.3 34.375 23.15 34.375 24.175V31.725L15.075 12.425C14.7 12.05 14.225 11.875 13.75 11.875C13.275 11.875 12.8 12.05 12.425 12.425C11.7 13.15 11.7 14.35 12.425 15.075L31.725 34.375H24.175C23.15 34.375 22.3 35.225 22.3 36.25C22.3 37.275 23.15 38.125 24.175 38.125H36.25C37.275 38.125 38.125 37.275 38.125 36.25V24.175Z\"\n					stroke=\"none\"\n				/>\n			"
	},
	{
		name: "result-chk",
		size: "50",
		html: "\n				<path\n					d=\"M35.475 0H14.525C5.425 0 0 5.425 0 14.525V35.45C0 44.575 5.425 50 14.525 50H35.45C44.55 50 49.975 44.575 49.975 35.475V14.525C50 5.425 44.575 0 35.475 0ZM36.95 19.25L22.775 33.425C22.425 33.775 21.95 33.975 21.45 33.975C20.95 33.975 20.475 33.775 20.125 33.425L13.05 26.35C12.325 25.625 12.325 24.425 13.05 23.7C13.775 22.975 14.975 22.975 15.7 23.7L21.45 29.45L34.3 16.6C35.025 15.875 36.225 15.875 36.95 16.6C37.675 17.325 37.675 18.5 36.95 19.25Z\"\n					stroke=\"none\"\n				/>\n			"
	},
	{
		name: "result-close",
		size: "50",
		html: "\n				<path\n					d=\"M47.8 12.45L37.55 2.2C36.35 1 33.95 0 32.25 0H17.75C16.05 0 13.65 1 12.45 2.2L2.2 12.45C1 13.65 0 16.05 0 17.75V32.25C0 33.95 1 36.35 2.2 37.55L12.45 47.8C13.65 49 16.05 50 17.75 50H32.25C33.95 50 36.35 49 37.55 47.8L47.8 37.55C49 36.35 50 33.95 50 32.25V17.75C50 16.05 49 13.65 47.8 12.45ZM35.075 32.425C35.8 33.15 35.8 34.35 35.075 35.075C34.7 35.45 34.225 35.625 33.75 35.625C33.275 35.625 32.8 35.45 32.425 35.075L25 27.65L17.575 35.075C17.2 35.45 16.725 35.625 16.25 35.625C15.775 35.625 15.3 35.45 14.925 35.075C14.2 34.35 14.2 33.15 14.925 32.425L22.35 25L14.925 17.575C14.2 16.85 14.2 15.65 14.925 14.925C15.65 14.2 16.85 14.2 17.575 14.925L25 22.35L32.425 14.925C33.15 14.2 34.35 14.2 35.075 14.925C35.8 15.65 35.8 16.85 35.075 17.575L27.65 25L35.075 32.425Z\"\n					stroke=\"none\"\n				/>\n			"
	},
	{
		name: "result-eye",
		size: "50 42",
		html: "\n				<path\n					d=\"M48.125 14.3C42.35 5.225 33.9 0 25 0C20.55 0 16.225 1.3 12.275 3.725C8.325 6.175 4.775 9.75 1.875 14.3C-0.625 18.225 -0.625 24.6 1.875 28.525C7.65 37.625 16.1 42.825 25 42.825C29.45 42.825 33.775 41.525 37.725 39.1C41.675 36.65 45.225 33.075 48.125 28.525C50.625 24.625 50.625 18.225 48.125 14.3ZM25 31.525C19.4 31.525 14.9 27 14.9 21.425C14.9 15.85 19.4 11.325 25 11.325C30.6 11.325 35.1 15.85 35.1 21.425C35.1 27 30.6 31.525 25 31.525Z\"\n					stroke=\"none\"\n				/>\n			"
	},
	{
		name: "tick-circle-list",
		size: "20",
		html: "\n				<path\n					d=\"M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z\"\n					stroke=\"none\"\n				/>\n			"
	},
	{
		name: "faq_arr",
		size: "34",
		html: "\n				<path\n					d=\"M16.6667 0C7.48333 0 0 7.48333 0 16.6667C0 25.85 7.48333 33.3333 16.6667 33.3333C25.85 33.3333 33.3333 25.85 33.3333 16.6667C33.3333 7.48333 25.85 0 16.6667 0ZM23.4333 15.45L17.55 21.3333C17.3 21.5833 16.9833 21.7 16.6667 21.7C16.35 21.7 16.0333 21.5833 15.7833 21.3333L9.9 15.45C9.41667 14.9667 9.41667 14.1667 9.9 13.6833C10.3833 13.2 11.1833 13.2 11.6667 13.6833L16.6667 18.6833L21.6667 13.6833C22.15 13.2 22.95 13.2 23.4333 13.6833C23.9167 14.1667 23.9167 14.95 23.4333 15.45Z\"\n					stroke=\"none\"\n				/>\n			"
	},
	{
		name: "tri-alert",
		size: "42 40",
		html: "\n				<path\n					d=\"M40.3998 27.84L27.5998 4.8C25.8798 1.7 23.4998 0 20.8798 0C18.2598 0 15.8798 1.7 14.1598 4.8L1.35984 27.84C-0.260162 30.78 -0.440162 33.6 0.859838 35.82C2.15984 38.04 4.71984 39.26 8.07984 39.26H33.6798C37.0398 39.26 39.5998 38.04 40.8998 35.82C42.1998 33.6 42.0198 30.76 40.3998 27.84ZM19.3798 14C19.3798 13.18 20.0598 12.5 20.8798 12.5C21.6998 12.5 22.3798 13.18 22.3798 14V24C22.3798 24.82 21.6998 25.5 20.8798 25.5C20.0598 25.5 19.3798 24.82 19.3798 24V14ZM22.2998 31.42C22.1998 31.5 22.0998 31.58 21.9998 31.66C21.8798 31.74 21.7598 31.8 21.6398 31.84C21.5198 31.9 21.3998 31.94 21.2598 31.96C21.1398 31.98 20.9998 32 20.8798 32C20.7598 32 20.6198 31.98 20.4798 31.96C20.3598 31.94 20.2398 31.9 20.1198 31.84C19.9998 31.8 19.8798 31.74 19.7598 31.66C19.6598 31.58 19.5598 31.5 19.4598 31.42C19.0998 31.04 18.8798 30.52 18.8798 30C18.8798 29.48 19.0998 28.96 19.4598 28.58C19.5598 28.5 19.6598 28.42 19.7598 28.34C19.8798 28.26 19.9998 28.2 20.1198 28.16C20.2398 28.1 20.3598 28.06 20.4798 28.04C20.7398 27.98 21.0198 27.98 21.2598 28.04C21.3998 28.06 21.5198 28.1 21.6398 28.16C21.7598 28.2 21.8798 28.26 21.9998 28.34C22.0998 28.42 22.1998 28.5 22.2998 28.58C22.6598 28.96 22.8798 29.48 22.8798 30C22.8798 30.52 22.6598 31.04 22.2998 31.42Z\"\n					stroke=\"none\"\n				/>\n			"
	},
	{
		name: "lock",
		size: "20",
		html: "\n				<path\n					d=\"M16.28 7.53V6.28C16.28 3.58 15.63 0 10 0C4.37 0 3.72 3.58 3.72 6.28V7.53C0.92 7.88 0 9.3 0 12.79V14.65C0 18.75 1.25 20 5.35 20H14.65C18.75 20 20 18.75 20 14.65V12.79C20 9.3 19.08 7.88 16.28 7.53ZM10 16.74C8.33 16.74 6.98 15.38 6.98 13.72C6.98 12.05 8.34 10.7 10 10.7C11.66 10.7 13.02 12.06 13.02 13.72C13.02 15.39 11.67 16.74 10 16.74ZM5.35 7.44C5.27 7.44 5.2 7.44 5.12 7.44V6.28C5.12 3.35 5.95 1.4 10 1.4C14.05 1.4 14.88 3.35 14.88 6.28V7.45C14.8 7.45 14.73 7.45 14.65 7.45H5.35V7.44Z\"\n					stroke=\"none\"\n				/>\n			"
	},
	{
		name: "chk",
		size: "60",
		html: "\n				<path d=\"M19 30L26.6576 38L42 22\" fill=\"none\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n			"
	}
], Ez = /* @__PURE__ */ li("<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\"></svg>");
function Dz(e, t) {
	lt(t, !0);
	let n = Y(t, "name", 7, ""), r = Y(t, "w", 7, "100%"), i = Y(t, "h", 7, "100%"), a = Y(t, "cls", 7, ""), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ N(() => Tz().find((e) => e.name === n())), c = /* @__PURE__ */ N(() => V(s) ? V(s).size.trim().split(/\s+/).length > 1 ? `0 0 ${V(s).size}` : `0 0 ${V(s).size} ${V(s).size}` : "0 0 24 24"), l = /* @__PURE__ */ N(() => V(s) ? V(s).html : "");
	Qn(() => {
		V(o) && (V(o).innerHTML = "", V(s) && V(s).html && (V(o).innerHTML = V(l)));
	});
	var u = {
		get name() {
			return n();
		},
		set name(e = "") {
			n(e), P();
		},
		get w() {
			return r();
		},
		set w(e = "100%") {
			r(e), P();
		},
		get h() {
			return i();
		},
		set h(e = "100%") {
			i(e), P();
		},
		get cls() {
			return a();
		},
		set cls(e = "") {
			a(e), P();
		}
	}, d = di(), f = Pn(d), p = (e) => {
		var t = Ez();
		Ma(t, (e) => I(o, e), () => V(o)), z(() => {
			K(t, 0, ia(a())), q(t, "width", r()), q(t, "height", i()), q(t, "viewBox", V(c));
		}), U(e, t);
	};
	return G(f, (e) => {
		V(s) && e(p);
	}), U(e, d), ut(u);
}
customElements.define("icon-list", Ga(Dz, {
	name: {
		attribute: "data-name",
		reflect: !0,
		type: "String"
	},
	w: {},
	h: {},
	cls: {}
}, [], []));
//#endregion
//#region src/lib/components/news/newsSection.svelte
var Oz = (e, t) => {
	let n = /* @__PURE__ */ zt(() => k(t?.(), ""));
	var r = kz(), i = L(r, !0);
	M(r), z(() => W(i, V(n))), U(e, r);
}, kz = /* @__PURE__ */ H("<p class=\"bg-light-blue text-primary grid flex-none place-content-center rounded-full px-5 py-1 font-bold\"> </p>"), Az = /* @__PURE__ */ H("<picture><img loading=\"lazy\" class=\"w-full max-w-300 object-cover\"/></picture>"), jz = /* @__PURE__ */ H("<p class=\"font-bold\"> </p>"), Mz = /* @__PURE__ */ H("<div class=\"border-t-d9d9d9 text-666 text-2md flex gap-2 border-t border-dashed pt-5 max-lg:flex-col lg:flex-row lg:items-center lg:gap-7.5 lg:pt-7.5 lg:text-lg\"><p class=\"font-bold\">URL</p> <a target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex-1 break-all underline\"> </a></div>"), Nz = /* @__PURE__ */ H("<div class=\"flex flex-col gap-5\"><div class=\"inline-flex flex-wrap gap-3\"><!></div> <h4> </h4> <p class=\"text-2md lg:py-5 lg:text-lg\"></p> <div class=\"text-666 text-2md mt-auto flex justify-between gap-2 lg:pt-2.5 lg:text-lg\"><!> <p class=\"flex-1 text-right\"> </p></div> <!></div>"), Pz = /* @__PURE__ */ H("<section data-scroll=\"slide-up\" class=\"text-2md grid gap-5 rounded-xl bg-white p-5 transition-all lg:grid lg:grid-cols-[534px_1fr] lg:gap-15 lg:p-7.5\"><!> <!></section>"), Fz = /* @__PURE__ */ H("<section data-scroll=\"first\" class=\"text-2md grid gap-5 rounded-xl bg-white p-5 transition-all lg:gap-15 lg:p-15\"><!></section>");
function Iz(e, t) {
	lt(t, !0);
	let n = (e, t) => {
		let n = /* @__PURE__ */ zt(() => k(t?.(), ""));
		var r = Az(), a = L(r);
		M(r), z(() => {
			K(r, 1, `grid place-content-center overflow-clip rounded-xl bg-white transition-all ${i() === "list" ? "h-45 lg:h-75 lg:w-133.5" : ""}`), q(a, "src", V(n) !== "" && V(n) !== null && V(n) !== void 0 && V(n) !== "undefined" ? V(n) : "/output/imgs/visual/img-none.jpg"), q(a, "alt", `${s()} image`);
		}), U(e, r);
	}, r = (e, t, n, r, a, o, s, c) => {
		let l = /* @__PURE__ */ zt(() => k(n?.(), "")), u = /* @__PURE__ */ zt(() => k(r?.(), "")), d = /* @__PURE__ */ zt(() => k(a?.(), "")), f = /* @__PURE__ */ zt(() => k(o?.(), "")), h = /* @__PURE__ */ zt(() => k(s?.(), "")), g = /* @__PURE__ */ zt(() => k(c?.(), ""));
		var _ = Nz(), v = L(_), y = L(v), b = (e) => {
			var t = di();
			Ni(Pn(t), 17, () => V(p), ki, (e, t) => {
				Oz(e, () => V(t));
			}), U(e, t);
		}, x = (e) => {
			Oz(e, () => V(l));
		};
		G(y, (e) => {
			V(m) ? e(b) : e(x, -1);
		}), M(v);
		var S = R(v, 2), C = L(S, !0);
		M(S);
		var w = R(S, 2);
		zi(w, () => V(d), !0), M(w);
		var T = R(w, 2), E = L(T), D = (e) => {
			var t = jz(), n = L(t, !0);
			M(t), z(() => W(n, V(h))), U(e, t);
		};
		G(E, (e) => {
			V(h) && e(D);
		});
		var O = R(E, 2), ee = L(O, !0);
		M(O), M(T);
		var te = R(T, 2), ne = (e) => {
			var t = Mz(), n = R(L(t), 2), r = L(n, !0);
			M(n), M(t), z(() => {
				q(n, "href", V(g)), q(n, "aria-label", V(u)), W(r, V(g));
			}), U(e, t);
		};
		G(te, (e) => {
			V(g) && e(ne);
		}), M(_), z(() => {
			K(S, 1, ia(["font-bold", i() === "list" ? "text-lg lg:text-4xl" : "text-2xl lg:text-5xl"])), W(C, V(u)), W(ee, V(f));
		}), U(e, _);
	}, i = Y(t, "layout", 7, ""), a = Y(t, "img", 7, ""), o = Y(t, "badges", 7, ""), s = Y(t, "title", 7, ""), c = Y(t, "text", 7, ""), l = Y(t, "date", 7, ""), u = Y(t, "source", 7, ""), d = Y(t, "url", 7, ""), f = /* @__PURE__ */ F(""), p = /* @__PURE__ */ F(Cn([])), m = /* @__PURE__ */ N(() => String(o()).includes(",")), h = /* @__PURE__ */ N(() => () => {
		let e = String(o());
		return e !== V(f) && (I(f, e, !0), I(p, e.split(/\s*,\s*/), !0)), V(p);
	});
	Xn(() => {
		V(h)();
	});
	var g = {
		get layout() {
			return i();
		},
		set layout(e = "") {
			i(e), P();
		},
		get img() {
			return a();
		},
		set img(e = "") {
			a(e), P();
		},
		get badges() {
			return o();
		},
		set badges(e = "") {
			o(e), P();
		},
		get title() {
			return s();
		},
		set title(e = "") {
			s(e), P();
		},
		get text() {
			return c();
		},
		set text(e = "") {
			c(e), P();
		},
		get date() {
			return l();
		},
		set date(e = "") {
			l(e), P();
		},
		get source() {
			return u();
		},
		set source(e = "") {
			u(e), P();
		},
		get url() {
			return d();
		},
		set url(e = "") {
			d(e), P();
		}
	}, _ = di(), v = Pn(_), y = (e) => {
		var t = Pz(), i = L(t);
		n(i, a), r(R(i, 2), a, o, s, c, l, u), M(t), U(e, t);
	}, b = (e) => {
		var t = Fz();
		r(L(t), a, o, s, c, l, u, d), M(t), U(e, t);
	};
	return G(v, (e) => {
		i() === "list" ? e(y) : e(b, -1);
	}), U(e, _), ut(g);
}
customElements.define("news-section", Ga(Iz, {
	layout: {},
	img: {},
	badges: {},
	title: {},
	text: {},
	date: {},
	source: {},
	url: {}
}, [], []));
//#endregion
//#region ../../node_modules/.bun/lenis@1.3.23+57ea6ac7810bd904/node_modules/lenis/dist/lenis.mjs
var Lz = "1.3.23";
function Rz(e, t, n) {
	return Math.max(e, Math.min(t, n));
}
function zz(e, t, n) {
	return (1 - n) * e + n * t;
}
function Bz(e, t, n, r) {
	return zz(e, t, 1 - Math.exp(-n * r));
}
function Vz(e, t) {
	return (e % t + t) % t;
}
var Hz = class {
	isRunning = !1;
	value = 0;
	from = 0;
	to = 0;
	currentTime = 0;
	lerp;
	duration;
	easing;
	onUpdate;
	advance(e) {
		if (!this.isRunning) return;
		let t = !1;
		if (this.duration && this.easing) {
			this.currentTime += e;
			let n = Rz(0, this.currentTime / this.duration, 1);
			t = n >= 1;
			let r = t ? 1 : this.easing(n);
			this.value = this.from + (this.to - this.from) * r;
		} else this.lerp ? (this.value = Bz(this.value, this.to, this.lerp * 60, e), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, t = !0)) : (this.value = this.to, t = !0);
		t && this.stop(), this.onUpdate?.(this.value, t);
	}
	stop() {
		this.isRunning = !1;
	}
	fromTo(e, t, { lerp: n, duration: r, easing: i, onStart: a, onUpdate: o }) {
		this.from = this.value = e, this.to = t, this.lerp = n, this.duration = r, this.easing = i, this.currentTime = 0, this.isRunning = !0, a?.(), this.onUpdate = o;
	}
};
function Uz(e, t) {
	let n;
	return function(...r) {
		clearTimeout(n), n = setTimeout(() => {
			n = void 0, e.apply(this, r);
		}, t);
	};
}
var Wz = class {
	width = 0;
	height = 0;
	scrollHeight = 0;
	scrollWidth = 0;
	debouncedResize;
	wrapperResizeObserver;
	contentResizeObserver;
	constructor(e, t, { autoResize: n = !0, debounce: r = 250 } = {}) {
		this.wrapper = e, this.content = t, n && (this.debouncedResize = Uz(this.resize, r), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
	}
	destroy() {
		this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize);
	}
	resize = () => {
		this.onWrapperResize(), this.onContentResize();
	};
	onWrapperResize = () => {
		this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
	};
	onContentResize = () => {
		this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
	};
	get limit() {
		return {
			x: this.scrollWidth - this.width,
			y: this.scrollHeight - this.height
		};
	}
}, Gz = class {
	events = {};
	emit(e, ...t) {
		let n = this.events[e] || [];
		for (let e = 0, r = n.length; e < r; e++) n[e]?.(...t);
	}
	on(e, t) {
		return this.events[e] ? this.events[e].push(t) : this.events[e] = [t], () => {
			this.events[e] = this.events[e]?.filter((e) => t !== e);
		};
	}
	off(e, t) {
		this.events[e] = this.events[e]?.filter((e) => t !== e);
	}
	destroy() {
		this.events = {};
	}
}, Kz = 100 / 6, qz = { passive: !1 };
function Jz(e, t) {
	return e === 1 ? Kz : e === 2 ? t : 1;
}
var Yz = class {
	touchStart = {
		x: 0,
		y: 0
	};
	lastDelta = {
		x: 0,
		y: 0
	};
	window = {
		width: 0,
		height: 0
	};
	emitter = new Gz();
	constructor(e, t = {
		wheelMultiplier: 1,
		touchMultiplier: 1
	}) {
		this.element = e, this.options = t, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, qz), this.element.addEventListener("touchstart", this.onTouchStart, qz), this.element.addEventListener("touchmove", this.onTouchMove, qz), this.element.addEventListener("touchend", this.onTouchEnd, qz);
	}
	on(e, t) {
		return this.emitter.on(e, t);
	}
	destroy() {
		this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, qz), this.element.removeEventListener("touchstart", this.onTouchStart, qz), this.element.removeEventListener("touchmove", this.onTouchMove, qz), this.element.removeEventListener("touchend", this.onTouchEnd, qz);
	}
	onTouchStart = (e) => {
		let { clientX: t, clientY: n } = e.targetTouches ? e.targetTouches[0] : e;
		this.touchStart.x = t, this.touchStart.y = n, this.lastDelta = {
			x: 0,
			y: 0
		}, this.emitter.emit("scroll", {
			deltaX: 0,
			deltaY: 0,
			event: e
		});
	};
	onTouchMove = (e) => {
		let { clientX: t, clientY: n } = e.targetTouches ? e.targetTouches[0] : e, r = -(t - this.touchStart.x) * this.options.touchMultiplier, i = -(n - this.touchStart.y) * this.options.touchMultiplier;
		this.touchStart.x = t, this.touchStart.y = n, this.lastDelta = {
			x: r,
			y: i
		}, this.emitter.emit("scroll", {
			deltaX: r,
			deltaY: i,
			event: e
		});
	};
	onTouchEnd = (e) => {
		this.emitter.emit("scroll", {
			deltaX: this.lastDelta.x,
			deltaY: this.lastDelta.y,
			event: e
		});
	};
	onWheel = (e) => {
		let { deltaX: t, deltaY: n, deltaMode: r } = e, i = Jz(r, this.window.width), a = Jz(r, this.window.height);
		t *= i, n *= a, t *= this.options.wheelMultiplier, n *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
			deltaX: t,
			deltaY: n,
			event: e
		});
	};
	onWindowResize = () => {
		this.window = {
			width: window.innerWidth,
			height: window.innerHeight
		};
	};
}, Xz = (e) => Math.min(1, 1.001 - 2 ** (-10 * e)), Zz = class {
	_isScrolling = !1;
	_isStopped = !1;
	_isLocked = !1;
	_preventNextNativeScrollEvent = !1;
	_resetVelocityTimeout = null;
	_rafId = null;
	isTouching;
	time = 0;
	userData = {};
	lastVelocity = 0;
	velocity = 0;
	direction = 0;
	options;
	targetScroll;
	animatedScroll;
	animate = new Hz();
	emitter = new Gz();
	dimensions;
	virtualScroll;
	constructor({ wrapper: e = window, content: t = document.documentElement, eventsTarget: n = e, smoothWheel: r = !0, syncTouch: i = !1, syncTouchLerp: a = .075, touchInertiaExponent: o = 1.7, duration: s, easing: c, lerp: l = .1, infinite: u = !1, orientation: d = "vertical", gestureOrientation: f = d === "horizontal" ? "both" : "vertical", touchMultiplier: p = 1, wheelMultiplier: m = 1, autoResize: h = !0, prevent: g, virtualScroll: _, overscroll: v = !0, autoRaf: y = !1, anchors: b = !1, autoToggle: x = !1, allowNestedScroll: S = !1, __experimental__naiveDimensions: C = !1, naiveDimensions: w = C, stopInertiaOnNavigate: T = !1 } = {}) {
		window.lenisVersion = Lz, window.lenis || (window.lenis = {}), window.lenis.version = Lz, d === "horizontal" && (window.lenis.horizontal = !0), i === !0 && (window.lenis.touch = !0), (!e || e === document.documentElement) && (e = window), typeof s == "number" && typeof c != "function" ? c = Xz : typeof c == "function" && typeof s != "number" && (s = 1), this.options = {
			wrapper: e,
			content: t,
			eventsTarget: n,
			smoothWheel: r,
			syncTouch: i,
			syncTouchLerp: a,
			touchInertiaExponent: o,
			duration: s,
			easing: c,
			lerp: l,
			infinite: u,
			gestureOrientation: f,
			orientation: d,
			touchMultiplier: p,
			wheelMultiplier: m,
			autoResize: h,
			prevent: g,
			virtualScroll: _,
			overscroll: v,
			autoRaf: y,
			anchors: b,
			autoToggle: x,
			allowNestedScroll: S,
			naiveDimensions: w,
			stopInertiaOnNavigate: T
		}, this.dimensions = new Wz(e, t, { autoResize: h }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: !0 }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new Yz(n, {
			touchMultiplier: p,
			wheelMultiplier: m
		}), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && (this.checkOverflow(), this.rootElement.addEventListener("transitionend", this.onTransitionEnd)), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
	}
	destroy() {
		this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, { capture: !0 }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.removeEventListener("click", this.onClick), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this._rafId && cancelAnimationFrame(this._rafId);
	}
	on(e, t) {
		return this.emitter.on(e, t);
	}
	off(e, t) {
		return this.emitter.off(e, t);
	}
	onScrollEnd = (e) => {
		e instanceof CustomEvent || (this.isScrolling === "smooth" || this.isScrolling === !1) && e.stopPropagation();
	};
	dispatchScrollendEvent = () => {
		this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
			bubbles: this.options.wrapper === window,
			detail: { lenisScrollEnd: !0 }
		}));
	};
	get overflow() {
		let e = this.isHorizontal ? "overflow-x" : "overflow-y";
		return getComputedStyle(this.rootElement)[e];
	}
	checkOverflow() {
		["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart();
	}
	onTransitionEnd = (e) => {
		e.propertyName?.includes("overflow") && e.target === this.rootElement && this.checkOverflow();
	};
	setScroll(e) {
		this.isHorizontal ? this.options.wrapper.scrollTo({
			left: e,
			behavior: "instant"
		}) : this.options.wrapper.scrollTo({
			top: e,
			behavior: "instant"
		});
	}
	onClick = (e) => {
		let t = e.composedPath().filter((e) => e instanceof HTMLAnchorElement && e.href).map((e) => new URL(e.href)), n = new URL(window.location.href);
		if (this.options.anchors) {
			let e = t.find((e) => n.host === e.host && n.pathname === e.pathname && e.hash);
			if (e) {
				let t = typeof this.options.anchors == "object" && this.options.anchors ? this.options.anchors : void 0, n = `#${e.hash.split("#")[1]}`;
				this.scrollTo(n, t);
				return;
			}
		}
		if (this.options.stopInertiaOnNavigate && t.some((e) => n.host === e.host && n.pathname !== e.pathname)) {
			this.reset();
			return;
		}
	};
	onPointerDown = (e) => {
		e.button === 1 && this.reset();
	};
	onVirtualScroll = (e) => {
		if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(e) === !1) return;
		let { deltaX: t, deltaY: n, event: r } = e;
		if (this.emitter.emit("virtual-scroll", {
			deltaX: t,
			deltaY: n,
			event: r
		}), r.ctrlKey || r.lenisStopPropagation) return;
		let i = r.type.includes("touch"), a = r.type.includes("wheel");
		this.isTouching = r.type === "touchstart" || r.type === "touchmove";
		let o = t === 0 && n === 0;
		if (this.options.syncTouch && i && r.type === "touchstart" && o && !this.isStopped && !this.isLocked) {
			this.reset();
			return;
		}
		let s = this.options.gestureOrientation === "vertical" && n === 0 || this.options.gestureOrientation === "horizontal" && t === 0;
		if (o || s) return;
		let c = r.composedPath();
		c = c.slice(0, c.indexOf(this.rootElement));
		let l = this.options.prevent, u = Math.abs(t) >= Math.abs(n) ? "horizontal" : "vertical";
		if (c.find((e) => e instanceof HTMLElement && (typeof l == "function" && l?.(e) || e.hasAttribute?.("data-lenis-prevent") || u === "vertical" && e.hasAttribute?.("data-lenis-prevent-vertical") || u === "horizontal" && e.hasAttribute?.("data-lenis-prevent-horizontal") || i && e.hasAttribute?.("data-lenis-prevent-touch") || a && e.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(e, {
			deltaX: t,
			deltaY: n
		})))) return;
		if (this.isStopped || this.isLocked) {
			r.cancelable && r.preventDefault();
			return;
		}
		if (!(this.options.syncTouch && i || this.options.smoothWheel && a)) {
			this.isScrolling = "native", this.animate.stop(), r.lenisStopPropagation = !0;
			return;
		}
		let d = n;
		this.options.gestureOrientation === "both" ? d = Math.abs(n) > Math.abs(t) ? n : t : this.options.gestureOrientation === "horizontal" && (d = t), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && n > 0 || this.animatedScroll === this.limit && n < 0)) && (r.lenisStopPropagation = !0), r.cancelable && r.preventDefault();
		let f = i && this.options.syncTouch, p = i && r.type === "touchend";
		p && (d = Math.sign(d) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + d, {
			programmatic: !1,
			...f ? { lerp: p ? this.options.syncTouchLerp : 1 } : {
				lerp: this.options.lerp,
				duration: this.options.duration,
				easing: this.options.easing
			}
		});
	};
	resize() {
		this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit();
	}
	emit() {
		this.emitter.emit("scroll", this);
	}
	onNativeScroll = () => {
		if (this._resetVelocityTimeout !== null && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) {
			this._preventNextNativeScrollEvent = !1;
			return;
		}
		if (this.isScrolling === !1 || this.isScrolling === "native") {
			let e = this.animatedScroll;
			this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - e, this.direction = Math.sign(this.animatedScroll - e), this.isStopped || (this.isScrolling = "native"), this.emit(), this.velocity !== 0 && (this._resetVelocityTimeout = setTimeout(() => {
				this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit();
			}, 400));
		}
	};
	reset() {
		this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
	}
	start() {
		if (this.isStopped) {
			if (this.options.autoToggle) {
				this.rootElement.style.removeProperty("overflow");
				return;
			}
			this.internalStart();
		}
	}
	internalStart() {
		this.isStopped && (this.reset(), this.isStopped = !1, this.emit());
	}
	stop() {
		if (!this.isStopped) {
			if (this.options.autoToggle) {
				this.rootElement.style.setProperty("overflow", "clip");
				return;
			}
			this.internalStop();
		}
	}
	internalStop() {
		this.isStopped || (this.reset(), this.isStopped = !0, this.emit());
	}
	raf = (e) => {
		let t = e - (this.time || e);
		this.time = e, this.animate.advance(t * .001), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
	};
	scrollTo(e, { offset: t = 0, immediate: n = !1, lock: r = !1, programmatic: i = !0, lerp: a = i ? this.options.lerp : void 0, duration: o = i ? this.options.duration : void 0, easing: s = i ? this.options.easing : void 0, onStart: c, onComplete: l, force: u = !1, userData: d } = {}) {
		if ((this.isStopped || this.isLocked) && !u) return;
		let f = e, p = t;
		if (typeof f == "string" && [
			"top",
			"left",
			"start",
			"#"
		].includes(f)) f = 0;
		else if (typeof f == "string" && [
			"bottom",
			"right",
			"end"
		].includes(f)) f = this.limit;
		else {
			let e = null;
			if (typeof f == "string" ? (e = document.querySelector(f), e || (f === "#top" ? f = 0 : console.warn("Lenis: Target not found", f))) : f instanceof HTMLElement && f?.nodeType && (e = f), e) {
				if (this.options.wrapper !== window) {
					let e = this.rootElement.getBoundingClientRect();
					p -= this.isHorizontal ? e.left : e.top;
				}
				let t = e.getBoundingClientRect(), n = getComputedStyle(e), r = this.isHorizontal ? Number.parseFloat(n.scrollMarginLeft) : Number.parseFloat(n.scrollMarginTop), i = getComputedStyle(this.rootElement), a = this.isHorizontal ? Number.parseFloat(i.scrollPaddingLeft) : Number.parseFloat(i.scrollPaddingTop);
				f = (this.isHorizontal ? t.left : t.top) + this.animatedScroll - (Number.isNaN(r) ? 0 : r) - (Number.isNaN(a) ? 0 : a);
			}
		}
		if (typeof f == "number") {
			if (f += p, this.options.infinite) {
				if (i) {
					this.targetScroll = this.animatedScroll = this.scroll;
					let e = f - this.animatedScroll;
					e > this.limit / 2 ? f -= this.limit : e < -this.limit / 2 && (f += this.limit);
				}
			} else f = Rz(0, f, this.limit);
			if (f === this.targetScroll) {
				c?.(this), l?.(this);
				return;
			}
			if (this.userData = d ?? {}, n) {
				this.animatedScroll = this.targetScroll = f, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), l?.(this), this.userData = {}, requestAnimationFrame(() => {
					this.dispatchScrollendEvent();
				});
				return;
			}
			i || (this.targetScroll = f), typeof o == "number" && typeof s != "function" ? s = Xz : typeof s == "function" && typeof o != "number" && (o = 1), this.animate.fromTo(this.animatedScroll, f, {
				duration: o,
				easing: s,
				lerp: a,
				onStart: () => {
					r && (this.isLocked = !0), this.isScrolling = "smooth", c?.(this);
				},
				onUpdate: (e, t) => {
					this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = e - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = e, this.setScroll(this.scroll), i && (this.targetScroll = e), t || this.emit(), t && (this.reset(), this.emit(), l?.(this), this.userData = {}, requestAnimationFrame(() => {
						this.dispatchScrollendEvent();
					}), this.preventNextNativeScrollEvent());
				}
			});
		}
	}
	preventNextNativeScrollEvent() {
		this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
			this._preventNextNativeScrollEvent = !1;
		});
	}
	hasNestedScroll(e, { deltaX: t, deltaY: n }) {
		let r = Date.now();
		e._lenis ||= {};
		let i = e._lenis, a, o, s, c, l, u, d, f, p, m;
		if (r - (i.time ?? 0) > 2e3) {
			i.time = Date.now();
			let t = window.getComputedStyle(e);
			if (i.computedStyle = t, a = [
				"auto",
				"overlay",
				"scroll"
			].includes(t.overflowX), o = [
				"auto",
				"overlay",
				"scroll"
			].includes(t.overflowY), l = ["auto"].includes(t.overscrollBehaviorX), u = ["auto"].includes(t.overscrollBehaviorY), i.hasOverflowX = a, i.hasOverflowY = o, !(a || o)) return !1;
			d = e.scrollWidth, f = e.scrollHeight, p = e.clientWidth, m = e.clientHeight, s = d > p, c = f > m, i.isScrollableX = s, i.isScrollableY = c, i.scrollWidth = d, i.scrollHeight = f, i.clientWidth = p, i.clientHeight = m, i.hasOverscrollBehaviorX = l, i.hasOverscrollBehaviorY = u;
		} else s = i.isScrollableX, c = i.isScrollableY, a = i.hasOverflowX, o = i.hasOverflowY, d = i.scrollWidth, f = i.scrollHeight, p = i.clientWidth, m = i.clientHeight, l = i.hasOverscrollBehaviorX, u = i.hasOverscrollBehaviorY;
		if (!(a && s || o && c)) return !1;
		let h = Math.abs(t) >= Math.abs(n) ? "horizontal" : "vertical", g, _, v, y, b, x;
		if (h === "horizontal") g = Math.round(e.scrollLeft), _ = d - p, v = t, y = a, b = s, x = l;
		else if (h === "vertical") g = Math.round(e.scrollTop), _ = f - m, v = n, y = o, b = c, x = u;
		else return !1;
		return !x && (g >= _ || g <= 0) ? !0 : (v > 0 ? g < _ : g > 0) && y && b;
	}
	get rootElement() {
		return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
	}
	get limit() {
		return this.options.naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
	}
	get isHorizontal() {
		return this.options.orientation === "horizontal";
	}
	get actualScroll() {
		let e = this.options.wrapper;
		return this.isHorizontal ? e.scrollX ?? e.scrollLeft : e.scrollY ?? e.scrollTop;
	}
	get scroll() {
		return this.options.infinite ? Vz(this.animatedScroll, this.limit) : this.animatedScroll;
	}
	get progress() {
		return this.limit === 0 ? 1 : this.scroll / this.limit;
	}
	get isScrolling() {
		return this._isScrolling;
	}
	set isScrolling(e) {
		this._isScrolling !== e && (this._isScrolling = e, this.updateClassName());
	}
	get isStopped() {
		return this._isStopped;
	}
	set isStopped(e) {
		this._isStopped !== e && (this._isStopped = e, this.updateClassName());
	}
	get isLocked() {
		return this._isLocked;
	}
	set isLocked(e) {
		this._isLocked !== e && (this._isLocked = e, this.updateClassName());
	}
	get isSmooth() {
		return this.isScrolling === "smooth";
	}
	get className() {
		let e = "lenis";
		return this.options.autoToggle && (e += " lenis-autoToggle"), this.isStopped && (e += " lenis-stopped"), this.isLocked && (e += " lenis-locked"), this.isScrolling && (e += " lenis-scrolling"), this.isScrolling === "smooth" && (e += " lenis-smooth"), e;
	}
	updateClassName() {
		this.cleanUpClassName(), this.className.split(" ").forEach((e) => {
			this.rootElement.classList.add(e);
		});
	}
	cleanUpClassName() {
		for (let e of Array.from(this.rootElement.classList)) (e === "lenis" || e.startsWith("lenis-")) && this.rootElement.classList.remove(e);
	}
}, Qz = new class {
	#e;
	get instance() {
		return V(this.#e);
	}
	set instance(e) {
		I(this.#e, e, !0);
	}
	constructor() {
		this.#e = /* @__PURE__ */ F(null);
	}
	setInstance(e) {
		this.instance = e;
	}
	clear() {
		this.instance &&= (this.instance.destroy(), null);
	}
}(), $z = /* @__PURE__ */ H("<li class=\"text-dot\"> </li>"), eB = /* @__PURE__ */ H("<li data-scroll=\"slide-up\" class=\"bg-light-blue flex flex-col overflow-clip rounded-xl\"><picture class=\"flex\"><img loading=\"lazy\" class=\"w-full\"/></picture> <div class=\"flex flex-col gap-5 p-5 lg:gap-7.5 lg:p-7.5\"><h4 class=\"text-primary text-2xl font-bold lg:text-4xl\"> </h4> <p class=\"text-666 text-lg lg:text-2xl\"> </p> <ul></ul></div></li>"), tB = /* @__PURE__ */ H("<section data-scroll=\"first\" class=\"text-2md grid gap-5 rounded-xl bg-white p-5 transition-all max-xl:pr-0 max-xl:pb-0 lg:gap-15 lg:pt-15 lg:pl-15\"><h3 class=\"relative z-2 text-2xl font-bold lg:text-5xl\">CEO Message</h3> <div class=\"relative z-4 space-y-5 break-all max-lg:pr-5 lg:space-y-10 lg:whitespace-pre-line\"><p class=\"break-alllg:text-4xl text-lg font-bold\"> </p> <p class=\"text-2md break-all lg:text-2xl\"> </p> <p class=\"text-2md break-all lg:text-2xl\"> </p> <p class=\"text-2md break-all lg:text-2xl\"> </p></div> <div class=\"relative z-2 space-y-2.5\"><p class=\"text-sm font-bold lg:text-lg\">CEO</p> <p class=\"text-2md lg:text-2xl\"> </p> <picture><img loading=\"lazy\"/></picture></div> <div class=\"relative z-1 h-full w-full max-w-273.5 before:absolute before:-left-5 before:z-3 before:h-20 before:w-full before:bg-linear-to-b before:from-white/10 before:to-transparent max-xl:hidden max-lg:hidden xl:absolute xl:right-0 xl:bottom-0\"><video class=\"relative z-1 aspect-video h-full w-full max-w-273.5 object-cover\" autoplay=\"\" playsinline=\"\"><source type=\"video/mp4\"/></video></div> <picture class=\"relative -mt-5 flex justify-end lg:-mt-60\"><img loading=\"lazy\" class=\"max-h-127.25\"/></picture></section> <section class=\"text-2md grid gap-5 rounded-xl bg-white p-5 transition-all lg:gap-15 lg:p-15\"><h3 class=\"text-2xl font-bold lg:text-5xl\">Our Teams</h3> <ul class=\"text-2md grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-15 lg:text-lg\"></ul> <section data-scroll=\"slide-up\" class=\"min-h-80.5 rounded-xl bg-(image:--bg-mo) bg-cover bg-bottom bg-no-repeat text-white transition-all lg:min-h-63.75 lg:bg-(image:--bg-pc)\"><div class=\"flex h-full flex-col gap-5 bg-(image:--bg-person) bg-size-[203px_auto] bg-position-[calc(100%-20px)_calc(100%+60px)] bg-no-repeat p-5 lg:bg-size-[345px_353px] lg:bg-position-[calc(100%-5%)_top] lg:p-15\"><h4 class=\"text-2xl leading-tight font-bold text-white text-shadow-md lg:max-w-4/6 lg:text-5xl\"> </h4> <div class=\"flex w-full items-center lg:inline-flex\"><a href=\"https://www.jobkorea.co.kr/Recruit/Co_Read/Recruit/C/29884596\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"hover:text-primary group flex min-h-12 flex-1 items-center justify-between gap-2 rounded-md border border-white px-5 text-white hover:bg-white lg:flex-none lg:justify-baseline\"><span> </span> <icon-list></icon-list></a></div></div></section></section>", 3);
function nB(e, t) {
	lt(t, !0);
	let n = /* @__PURE__ */ F(Cn([
		{
			img: "/output/imgs/company/img-division-1.jpg",
			team: Kj(),
			subtitle: Yj(),
			list: [
				Qj(),
				tM(),
				iM(),
				sM()
			]
		},
		{
			img: "/output/imgs/company/img-division-2.jpg",
			team: uM(),
			subtitle: pM(),
			list: [
				gM(),
				yM(),
				SM(),
				TM()
			]
		},
		{
			img: "/output/imgs/company/img-division-3.jpg",
			team: OM(),
			subtitle: jM(),
			list: [
				PM(),
				LM(),
				BM(),
				UM()
			]
		},
		{
			img: "/output/imgs/company/img-division-4.jpg",
			team: KM(),
			subtitle: YM(),
			list: [
				QM(),
				tN(),
				iN(),
				sN()
			]
		}
	]));
	Xn(() => {
		let e = new Zz({ autoRaf: !0 });
		return Qz.setInstance(e), () => {
			Qz.clear();
		};
	});
	var r = tB(), i = Pn(r), a = R(L(i), 2), o = L(a), s = L(o, !0);
	M(o);
	var c = R(o, 2), l = L(c, !0);
	M(c);
	var u = R(c, 2), d = L(u, !0);
	M(u);
	var f = R(u, 2), p = L(f, !0);
	M(f), M(a);
	var m = R(a, 2), h = R(L(m), 2), g = L(h, !0);
	M(h);
	var _ = R(h, 2), v = L(_);
	M(_), M(m);
	var y = R(m, 2), b = L(y);
	b.muted = !0, q(L(b), "src", "/output/video/ceo-video.mp4"), M(b), M(y);
	var x = R(y, 2), S = L(x);
	q(S, "src", "/output/imgs/ceo/img-ceo.png"), M(x), M(i);
	var C = R(i, 2), w = R(L(C), 2);
	Ni(w, 23, () => V(n), (e, t) => `team-${t}`, (e, t) => {
		var n = eB(), r = L(n), i = L(r);
		M(r);
		var a = R(r, 2), o = L(a), s = L(o, !0);
		M(o);
		var c = R(o, 2), l = L(c, !0);
		M(c);
		var u = R(c, 2);
		Ni(u, 23, () => V(t).list, (e, t) => `team-text-${t}`, (e, t, n, r) => {
			var i = $z(), a = L(i, !0);
			M(i), z(() => W(a, V(t))), U(e, i);
		}), M(u), M(a), M(n), z(() => {
			q(i, "src", V(t).img), q(i, "alt", V(t).team), W(s, V(t).team), W(l, V(t).subtitle);
		}), U(e, n);
	}), M(w);
	var T = R(w, 2), E = L(T), D = L(E), O = L(D, !0);
	M(D);
	var ee = R(D, 2), te = L(ee), k = L(te), ne = L(k, !0);
	M(k);
	var re = R(k, 2);
	J(re, "name", "arrow-new-link"), K(re, 1, "group-hover:stroke-primary size-6 stroke-white"), M(te), M(ee), M(E), M(T), M(C), z((e, t, n, r, i, a, o, c, u, f) => {
		W(s, e), W(l, t), W(d, n), W(p, r), W(g, i), q(v, "src", "/output/imgs/ceo/img-sign.png"), q(v, "alt", a), q(S, "alt", o), da(T, "--bg-mo: url('/output/imgs/company/bg-join-us-mo.jpg'); --bg-pc: url('/output/imgs/company/bg-join-us-pc.jpg'); --bg-person: url('/output/imgs/company/bg-join-us-person.png');"), W(O, c), q(te, "aria-label", u), W(ne, f);
	}, [
		() => jj(),
		() => Pj(),
		() => Lj(),
		() => Bj(),
		() => Uj(),
		() => Uj(),
		() => Uj(),
		() => uN(),
		() => pN(),
		() => pN()
	]), U(e, r), ut();
}
customElements.define("sub-company", Ga(nB, {}, [], []));
//#endregion
//#region ../../node_modules/.bun/@inlang+paraglide-js-svelte@1.0.3+a76dc86e39b3c2ec/node_modules/@inlang/paraglide-js-svelte/dist/message.js
function rB(e) {
	let { message: t, inputs: n, options: r, ...i } = e, a = n ?? {}, o = i, s = t;
	if (typeof s.parts != "function") return [s(a, r)];
	let c = [], l = [], u = s.parts(a, r), d = (e) => {
		let t = l[l.length - 1];
		t ? t.children.push(e) : c.push(e);
	};
	for (let e of u) switch (e.type) {
		case "text":
			d(e.value);
			break;
		case "markup-start": {
			let t = o[e.name];
			l.push({
				name: e.name,
				snippet: t,
				children: [],
				options: e.options,
				attributes: e.attributes
			});
			break;
		}
		case "markup-end": {
			let t = l.pop();
			if (!t) throw Error(`Unexpected closing markup "${e.name}"`);
			if (t.name !== e.name) throw Error(`Mismatched markup. Expected closing "${t.name}" but received "${e.name}"`);
			if (!t.snippet) {
				for (let e of t.children) d(e);
				break;
			}
			d({
				snippet: t.snippet,
				children: t.children,
				options: t.options,
				attributes: t.attributes
			});
			break;
		}
		case "markup-standalone": {
			let t = o[e.name];
			if (!t) break;
			d({
				snippet: t,
				children: [],
				options: e.options,
				attributes: e.attributes
			});
			break;
		}
	}
	if (l.length > 0) {
		let e = l[l.length - 1];
		if (e) throw Error(`Unclosed markup "${e.name}"`);
	}
	return c;
}
//#endregion
//#region ../../node_modules/.bun/@inlang+paraglide-js-svelte@1.0.3+a76dc86e39b3c2ec/node_modules/@inlang/paraglide-js-svelte/dist/Message.svelte
var iB = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"$$host",
	"message",
	"inputs",
	"options"
]);
function aB(e, t) {
	lt(t, !0);
	let n = (e, t = D) => {
		var r = di();
		Ni(Pn(r), 17, t, ki, (e, t) => {
			var r = di(), i = Pn(r), o = (e) => {
				var n = ui();
				z(() => W(n, V(t))), U(e, n);
			}, c = (e) => {
				let r = (e) => {
					n(e, () => V(t).children);
				};
				var i = di();
				Oi(Pn(i), () => V(t).snippet, () => ({
					options: V(t).options,
					attributes: V(t).attributes,
					inputs: V(s),
					messageOptions: a(),
					children: r
				})), U(e, i);
			};
			G(i, (e) => {
				typeof V(t) == "string" ? e(o) : e(c, -1);
			}), U(e, r);
		}), U(e, r);
	}, r = Y(t, "message", 7), i = Y(t, "inputs", 7), a = Y(t, "options", 7), o = /* @__PURE__ */ La(t, iB), s = /* @__PURE__ */ N(() => i() ?? {}), c = o, l = /* @__PURE__ */ N(() => rB({
		message: r(),
		inputs: V(s),
		options: a(),
		...c
	}));
	return n(e, () => V(l)), ut({
		get message() {
			return r();
		},
		set message(e) {
			r(e), P();
		},
		get inputs() {
			return i();
		},
		set inputs(e) {
			i(e), P();
		},
		get options() {
			return a();
		},
		set options(e) {
			a(e), P();
		}
	});
}
Ga(aB, {
	message: {},
	inputs: {},
	options: {}
}, [], [], { mode: "open" });
//#endregion
//#region src/lib/components/heading/SubHeading.svelte
var oB = /* @__PURE__ */ H("<p class=\"text-666 text-2md mt-2.5 lg:text-2xl lg:whitespace-pre-line\"> </p>"), sB = /* @__PURE__ */ H("<header class=\"space-y-5\"><p class=\"text-666 text-2md font-bold lg:text-2xl\"> </p> <h3 class=\"text-1a1a2e text-2xl leading-tight font-bold lg:text-5xl lg:whitespace-pre-line\"> </h3> <!></header>");
function cB(e, t) {
	lt(t, !0);
	let n = Y(t, "page", 7, ""), r = Y(t, "tit", 7, ""), i = Y(t, "txt", 7, ""), a = Y(t, "subTxt", 7, ""), o = /* @__PURE__ */ F(!1), s = (e) => {
		let t = Mc(e.children, {
			y: [20, 0],
			opacity: [0, 1],
			duration: 400,
			delay: Qc(100),
			easing: "easeOutQuad",
			autoplay: !1
		}), n = Yc({
			container: document.body,
			target: e,
			enter: "bottom center",
			leave: "top bottom",
			axis: "y",
			onEnter: () => {
				V(o) || (I(o, !0), t.seek(0), t.play());
			},
			onLeaveBackward: () => {
				I(o, !1);
			},
			debug: !1
		});
		return () => n.revert?.();
	}, c = /* @__PURE__ */ N(() => _z(r())), l = /* @__PURE__ */ N(() => _z(i())), u = /* @__PURE__ */ N(() => _z(a()));
	var d = {
		headingMotion: s,
		get page() {
			return n();
		},
		set page(e = "") {
			n(e), P();
		},
		get tit() {
			return r();
		},
		set tit(e = "") {
			r(e), P();
		},
		get txt() {
			return i();
		},
		set txt(e = "") {
			i(e), P();
		},
		get subTxt() {
			return a();
		},
		set subTxt(e = "") {
			a(e), P();
		}
	}, f = sB(), p = L(f), m = L(p, !0);
	M(p);
	var h = R(p, 2), g = L(h, !0);
	M(h);
	var _ = R(h, 2), v = (e) => {
		var t = oB(), n = L(t, !0);
		M(t), z(() => W(n, V(u))), U(e, t);
	};
	return G(_, (e) => {
		a() && e(v);
	}), M(f), ta(f, () => s), z(() => {
		W(m, V(c)), W(g, V(l));
	}), U(e, f), ut(d);
}
Ga(cB, {
	page: {},
	tit: {},
	txt: {},
	subTxt: {}
}, [], ["headingMotion"], { mode: "open" });
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/easing/index.js
function lB(e) {
	let t = e - 1;
	return t * t * t + 1;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/animate/index.js
function uB(e, { from: t, to: n }, r = {}) {
	var { delay: i = 0, duration: a = (e) => Math.sqrt(e) * 120, easing: o = lB } = r, s = getComputedStyle(e), c = s.transform === "none" ? "" : s.transform, [l, u] = s.transformOrigin.split(" ").map(parseFloat);
	l /= e.clientWidth, u /= e.clientHeight;
	var d = dB(e), f = e.clientWidth / n.width / d, p = e.clientHeight / n.height / d, m = t.left + t.width * l, h = t.top + t.height * u, g = n.left + n.width * l, _ = n.top + n.height * u, v = (m - g) * f, y = (h - _) * p, b = t.width / n.width, x = t.height / n.height;
	return {
		delay: i,
		duration: typeof a == "function" ? a(Math.sqrt(v * v + y * y)) : a,
		easing: o,
		css: (e, t) => `transform: ${c} translate(${t * v}px, ${t * y}px) scale(${e + t * b}, ${e + t * x});`
	};
}
function dB(e) {
	if ("currentCSSZoom" in e) return e.currentCSSZoom;
	for (var t = e, n = 1; t !== null;) n *= +getComputedStyle(t).zoom, t = t.parentElement;
	return n;
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/transition/index.js
var fB = (e) => e;
function pB(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function mB(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function hB(e, { delay: t = 0, duration: n = 400, easing: r = fB } = {}) {
	let i = +getComputedStyle(e).opacity;
	return {
		delay: t,
		duration: n,
		easing: r,
		css: (e) => `opacity: ${e * i}`
	};
}
function gB(e, { delay: t = 0, duration: n = 400, easing: r = pB, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = mB(i), [p, m] = mB(a);
	return {
		delay: t,
		duration: n,
		easing: r,
		css: (e, t) => `
			transform: ${l} translate(${(1 - e) * d}${f}, ${(1 - e) * p}${m});
			opacity: ${c - u * t}`
	};
}
//#endregion
//#region src/lib/components/faq/Faq.svelte
var _B = /* @__PURE__ */ H("<p class=\"pl-4 -indent-4\"><!></p>"), vB = /* @__PURE__ */ H("<div class=\"mt-5 flex lg:mt-7.5\"><a class=\"group flex min-h-12 flex-1 items-center justify-between gap-2 rounded-md border border-black px-5 transition-colors hover:bg-black hover:text-white max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:flex-none\"><span> </span> <icon-list></icon-list></a></div>", 2), yB = /* @__PURE__ */ H("<div class=\"py-5 pr-5 pl-10.5 lg:p-7.5 lg:px-22\"><!> <!></div>"), bB = /* @__PURE__ */ H("<p class=\"sr-only\"> </p>"), xB = /* @__PURE__ */ H("<li data-scroll=\"slide-up\" class=\"rounded-xl bg-white\"><dl class=\"text-2md divide-d9d9d9 group/faq flex flex-col divide-dashed has-checked:divide-y lg:text-2xl\"><dt class=\"flex\"><label class=\"group flex flex-1 items-center justify-between gap-2.5 p-5 font-bold lg:gap-7.5 lg:p-7.5\"><input type=\"checkbox\" class=\"sr-only\"/> <p class=\"flex items-center gap-2.5 lg:gap-7.5\"><span class=\"text-primary text-2md flex-none font-bold lg:text-4xl\">Q</span> <strong class=\"font-bold\"> </strong></p> <icon-list></icon-list></label></dt> <dd class=\"text-666 @starting:opacity-0 relative hidden whitespace-pre-line opacity-0 transition-all transition-discrete duration-300 group-not-checked/faq:opacity-0 group-has-checked/faq:grid group-has-checked/faq:opacity-100\"><!></dd></dl></li>", 2), SB = /* @__PURE__ */ H("<section data-scroll=\"slide-up\" class=\"space-y-5 py-11.25 lg:space-y-7.5 lg:py-15\"><!> <ul class=\"space-y-5 lg:space-y-7.5\"></ul></section>");
function CB(e, t) {
	lt(t, !0);
	let n = Y(t, "tit", 7, ""), r = Y(t, "txt", 7, ""), i = Y(t, "lists", 23, () => []);
	var a = {
		get tit() {
			return n();
		},
		set tit(e = "") {
			n(e), P();
		},
		get txt() {
			return r();
		},
		set txt(e = "") {
			r(e), P();
		},
		get lists() {
			return i();
		},
		set lists(e = []) {
			i(e), P();
		}
	}, o = SB(), s = L(o);
	cB(s, {
		get tit() {
			return n();
		},
		get txt() {
			return r();
		}
	});
	var c = R(s, 2);
	return Ni(c, 31, i, (e) => e.id, (e, t, n) => {
		let r = /* @__PURE__ */ N(() => V(t).checked);
		var i = xB(), a = L(i), o = L(a), s = L(o), c = L(s);
		Ca(c);
		var l = R(c, 2), u = R(L(l), 2), d = L(u, !0);
		M(u), M(l);
		var f = R(l, 2);
		J(f, "name", "faq_arr"), K(f, 1, "group-has-checked/faq:fill-primary group-hover:fill-primary relative ml-auto size-6.25 flex-none fill-black transition-all group-has-checked/faq:-rotate-180 lg:size-8.5"), M(s), M(o);
		var p = R(o, 2), m = L(p), h = (e) => {
			var n = yB(), r = L(n);
			aB(r, {
				get message() {
					return V(t).txt;
				},
				b: (e, t) => {
					let n = () => t?.().children;
					var r = _B();
					Oi(L(r), () => n() ?? D), M(r), U(e, r);
				},
				$$slots: { b: !0 }
			});
			var i = R(r, 2), a = (e) => {
				var n = vB(), r = L(n), i = L(r), a = L(i, !0);
				M(i);
				var o = R(i, 2);
				J(o, "name", "arrow-right"), K(o, 1, "size-6 stroke-black group-hover:stroke-white"), M(r), M(n), z(() => {
					q(r, "href", V(t).link), q(r, "aria-label", V(t).btn), q(r, "target", V(t).target ?? void 0), q(r, "rel", V(t).target ? "noopener noreferrer" : void 0), W(a, V(t).btn);
				}), U(e, n);
			};
			G(i, (e) => {
				V(t).link && e(a);
			}), M(n), Zi(1, n, () => gB, () => ({
				y: 15,
				duration: 400,
				delay: 100
			})), Zi(2, n, () => hB, () => ({ duration: 150 })), U(e, n);
		}, g = (e) => {
			var n = bB(), r = L(n, !0);
			M(n), z(() => W(r, V(t).txt)), U(e, n);
		};
		G(m, (e) => {
			V(r) ? e(h) : e(g, -1);
		}), M(p), M(a), M(i), z(() => {
			q(s, "for", V(t).id), q(s, "aria-expanded", V(r) ? "true" : "false"), q(c, "id", V(t).id), q(c, "name", V(t).id), W(d, V(t).tit);
		}), Aa(c, () => V(t).checked, (e) => V(t).checked = e), Xi(i, () => uB, () => ({ delay: 500 })), U(e, i);
	}), M(c), M(o), U(e, o), ut(a);
}
Ga(CB, {
	tit: {},
	txt: {},
	lists: {}
}, [], [], { mode: "open" });
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/shared/ssr-window.esm.mjs
function wB(e) {
	return typeof e == "object" && !!e && "constructor" in e && e.constructor === Object;
}
function TB(e = {}, t = {}) {
	let n = [
		"__proto__",
		"constructor",
		"prototype"
	];
	Object.keys(t).filter((e) => n.indexOf(e) < 0).forEach((n) => {
		e[n] === void 0 ? e[n] = t[n] : wB(t[n]) && wB(e[n]) && Object.keys(t[n]).length > 0 && TB(e[n], t[n]);
	});
}
var EB = {
	body: {},
	addEventListener() {},
	removeEventListener() {},
	activeElement: {
		blur() {},
		nodeName: ""
	},
	querySelector() {
		return null;
	},
	querySelectorAll() {
		return [];
	},
	getElementById() {
		return null;
	},
	createEvent() {
		return { initEvent() {} };
	},
	createElement() {
		return {
			children: [],
			childNodes: [],
			style: {},
			setAttribute() {},
			getElementsByTagName() {
				return [];
			}
		};
	},
	createElementNS() {
		return {};
	},
	importNode() {
		return null;
	},
	location: {
		hash: "",
		host: "",
		hostname: "",
		href: "",
		origin: "",
		pathname: "",
		protocol: "",
		search: ""
	}
};
function DB() {
	let e = typeof document < "u" ? document : {};
	return TB(e, EB), e;
}
var OB = {
	document: EB,
	navigator: { userAgent: "" },
	location: {
		hash: "",
		host: "",
		hostname: "",
		href: "",
		origin: "",
		pathname: "",
		protocol: "",
		search: ""
	},
	history: {
		replaceState() {},
		pushState() {},
		go() {},
		back() {}
	},
	CustomEvent: function() {
		return this;
	},
	addEventListener() {},
	removeEventListener() {},
	getComputedStyle() {
		return { getPropertyValue() {
			return "";
		} };
	},
	Image() {},
	Date() {},
	screen: {},
	setTimeout() {},
	clearTimeout() {},
	matchMedia() {
		return {};
	},
	requestAnimationFrame(e) {
		return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0);
	},
	cancelAnimationFrame(e) {
		typeof setTimeout > "u" || clearTimeout(e);
	}
};
function kB() {
	let e = typeof window < "u" ? window : {};
	return TB(e, OB), e;
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/shared/utils.mjs
function AB(e = "") {
	return e.trim().split(" ").filter((e) => !!e.trim());
}
function jB(e) {
	let t = e;
	Object.keys(t).forEach((e) => {
		try {
			t[e] = null;
		} catch {}
		try {
			delete t[e];
		} catch {}
	});
}
function MB(e, t = 0) {
	return setTimeout(e, t);
}
function NB() {
	return Date.now();
}
function PB(e) {
	let t = kB(), n;
	return t.getComputedStyle && (n = t.getComputedStyle(e, null)), !n && e.currentStyle && (n = e.currentStyle), n ||= e.style, n;
}
function FB(e, t = "x") {
	let n = kB(), r, i, a, o = PB(e);
	return n.WebKitCSSMatrix ? (i = o.transform || o.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map((e) => e.replace(",", ".")).join(", ")), a = new n.WebKitCSSMatrix(i === "none" ? "" : i)) : (a = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), r = a.toString().split(",")), t === "x" && (i = n.WebKitCSSMatrix ? a.m41 : r.length === 16 ? parseFloat(r[12]) : parseFloat(r[4])), t === "y" && (i = n.WebKitCSSMatrix ? a.m42 : r.length === 16 ? parseFloat(r[13]) : parseFloat(r[5])), i || 0;
}
function IB(e) {
	return typeof e == "object" && !!e && e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object";
}
function LB(e) {
	return typeof window < "u" && window.HTMLElement !== void 0 ? e instanceof HTMLElement : e && (e.nodeType === 1 || e.nodeType === 11);
}
function RB(...e) {
	let t = Object(e[0]);
	for (let n = 1; n < e.length; n += 1) {
		let r = e[n];
		if (r != null && !LB(r)) {
			let e = Object.keys(Object(r)).filter((e) => e !== "__proto__" && e !== "constructor" && e !== "prototype");
			for (let n = 0, i = e.length; n < i; n += 1) {
				let i = e[n], a = Object.getOwnPropertyDescriptor(r, i);
				a !== void 0 && a.enumerable && (IB(t[i]) && IB(r[i]) ? r[i].__swiper__ ? t[i] = r[i] : RB(t[i], r[i]) : !IB(t[i]) && IB(r[i]) ? (t[i] = {}, r[i].__swiper__ ? t[i] = r[i] : RB(t[i], r[i])) : t[i] = r[i]);
			}
		}
	}
	return t;
}
function zB(e, t, n) {
	e.style.setProperty(t, n);
}
function BB({ swiper: e, targetPosition: t, side: n }) {
	let r = kB(), i = -e.translate, a = null, o, s = e.params.speed;
	e.wrapperEl.style.scrollSnapType = "none", r.cancelAnimationFrame(e.cssModeFrameID);
	let c = t > i ? "next" : "prev", l = (e, t) => c === "next" && e >= t || c === "prev" && e <= t, u = () => {
		o = (/* @__PURE__ */ new Date()).getTime(), a === null && (a = o);
		let c = Math.max(Math.min((o - a) / s, 1), 0), d = i + (.5 - Math.cos(c * Math.PI) / 2) * (t - i);
		if (l(d, t) && (d = t), e.wrapperEl.scrollTo({ [n]: d }), l(d, t)) {
			e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
				e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({ [n]: d });
			}), r.cancelAnimationFrame(e.cssModeFrameID);
			return;
		}
		e.cssModeFrameID = r.requestAnimationFrame(u);
	};
	u();
}
function VB(e) {
	return e.querySelector(".swiper-slide-transform") || e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform") || e;
}
function HB(e, t = "") {
	let n = kB(), r = [...e.children];
	return n.HTMLSlotElement && e instanceof HTMLSlotElement && r.push(...e.assignedElements()), t ? r.filter((e) => e.matches(t)) : r;
}
function UB(e, t) {
	let n = [t];
	for (; n.length > 0;) {
		let t = n.shift();
		if (e === t) return !0;
		n.push(...t.children, ...t.shadowRoot ? t.shadowRoot.children : [], ...t.assignedElements ? t.assignedElements() : []);
	}
}
function WB(e, t) {
	let n = kB(), r = t.contains(e);
	return !r && n.HTMLSlotElement && t instanceof HTMLSlotElement && (r = [...t.assignedElements()].includes(e), r ||= UB(e, t)), r;
}
function GB(e) {
	try {
		console.warn(e);
		return;
	} catch {}
}
function KB(e, t = []) {
	let n = document.createElement(e);
	return n.classList.add(...Array.isArray(t) ? t : AB(t)), n;
}
function qB(e) {
	let t = kB(), n = DB(), r = e.getBoundingClientRect(), i = n.body, a = e.clientTop || i.clientTop || 0, o = e.clientLeft || i.clientLeft || 0, s = e === t ? t.scrollY : e.scrollTop, c = e === t ? t.scrollX : e.scrollLeft;
	return {
		top: r.top + s - a,
		left: r.left + c - o
	};
}
function JB(e, t) {
	let n = [];
	for (; e.previousElementSibling;) {
		let r = e.previousElementSibling;
		t ? r.matches(t) && n.push(r) : n.push(r), e = r;
	}
	return n;
}
function YB(e, t) {
	let n = [];
	for (; e.nextElementSibling;) {
		let r = e.nextElementSibling;
		t ? r.matches(t) && n.push(r) : n.push(r), e = r;
	}
	return n;
}
function XB(e, t) {
	return kB().getComputedStyle(e, null).getPropertyValue(t);
}
function ZB(e) {
	let t = e, n;
	if (t) {
		for (n = 0; (t = t.previousSibling) !== null;) t.nodeType === 1 && (n += 1);
		return n;
	}
}
function QB(e, t) {
	let n = [], r = e.parentElement;
	for (; r;) t ? r.matches(t) && n.push(r) : n.push(r), r = r.parentElement;
	return n;
}
function $B(e, t) {
	function n(r) {
		r.target === e && (t.call(e, r), e.removeEventListener("transitionend", n));
	}
	t && e.addEventListener("transitionend", n);
}
function eV(e, t, n) {
	let r = kB();
	return n ? e[t === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(r.getComputedStyle(e, null).getPropertyValue(t === "width" ? "margin-right" : "margin-top")) + parseFloat(r.getComputedStyle(e, null).getPropertyValue(t === "width" ? "margin-left" : "margin-bottom")) : e.offsetWidth;
}
function tV(e) {
	return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
}
function nV(e) {
	return (t) => Math.abs(t) > 0 && e.browser && e.browser.need3dFix && Math.abs(t) % 90 == 0 ? t + .001 : t;
}
function rV(e, t = "") {
	typeof trustedTypes < "u" ? e.innerHTML = trustedTypes.createPolicy("html", { createHTML: (e) => e }).createHTML(t) : e.innerHTML = t;
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/shared/swiper-core.mjs
var iV;
function aV() {
	let e = kB(), t = DB();
	return {
		smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style,
		touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
	};
}
function oV() {
	return iV ||= aV(), iV;
}
var sV;
function cV({ userAgent: e } = {}) {
	let t = oV(), n = kB(), r = n.navigator.platform, i = e || n.navigator.userAgent, a = {
		ios: !1,
		android: !1
	}, o = n.screen.width, s = n.screen.height, c = i.match(/(Android);?[\s\/]+([\d.]+)?/), l = i.match(/(iPad)(?!\1).*OS\s([\d_]+)/), u = i.match(/(iPod)(.*OS\s([\d_]+))?/), d = !l && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/), f = r === "Win32", p = r === "MacIntel";
	return !l && p && t.touch && [
		"1024x1366",
		"1366x1024",
		"834x1194",
		"1194x834",
		"834x1112",
		"1112x834",
		"768x1024",
		"1024x768",
		"820x1180",
		"1180x820",
		"810x1080",
		"1080x810"
	].indexOf(`${o}x${s}`) >= 0 && (l = i.match(/(Version)\/([\d.]+)/), l ||= [
		0,
		1,
		"13_0_0"
	], p = !1), c && !f && (a.os = "android", a.android = !0), (l || d || u) && (a.os = "ios", a.ios = !0), a;
}
function lV(e = {}) {
	return sV ||= cV(e), sV;
}
var uV;
function dV() {
	let e = kB(), t = lV(), n = !1;
	function r() {
		let t = e.navigator.userAgent.toLowerCase();
		return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0;
	}
	if (r()) {
		let t = String(e.navigator.userAgent);
		if (t.includes("Version/")) {
			let [e, r] = t.split("Version/")[1].split(" ")[0].split(".").map((e) => Number(e));
			n = e < 16 || e === 16 && r < 2;
		}
	}
	let i = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent), a = r(), o = a || i && t.ios;
	return {
		isSafari: n || a,
		needPerspectiveFix: n,
		need3dFix: o,
		isWebView: i
	};
}
function fV() {
	return uV ||= dV(), uV;
}
function pV({ swiper: e, on: t, emit: n }) {
	let r = kB(), i = null, a = null, o = () => {
		!e || e.destroyed || !e.initialized || (n("beforeResize"), n("resize"));
	}, s = () => {
		!e || e.destroyed || !e.initialized || (i = new ResizeObserver((t) => {
			a = r.requestAnimationFrame(() => {
				let { width: n, height: r } = e, i = n, a = r;
				t.forEach(({ contentBoxSize: t, contentRect: n, target: r }) => {
					r && r !== e.el || (i = n ? n.width : (t[0] || t).inlineSize, a = n ? n.height : (t[0] || t).blockSize);
				}), (i !== n || a !== r) && o();
			});
		}), i.observe(e.el));
	}, c = () => {
		a && r.cancelAnimationFrame(a), i && i.unobserve && e.el && (i.unobserve(e.el), i = null);
	}, l = () => {
		!e || e.destroyed || !e.initialized || n("orientationchange");
	};
	t("init", () => {
		if (e.params.resizeObserver && r.ResizeObserver !== void 0) {
			s();
			return;
		}
		r.addEventListener("resize", o), r.addEventListener("orientationchange", l);
	}), t("destroy", () => {
		c(), r.removeEventListener("resize", o), r.removeEventListener("orientationchange", l);
	});
}
function mV({ swiper: e, extendParams: t, on: n, emit: r }) {
	let i = [], a = kB(), o = (t, n = {}) => {
		let o = new (a.MutationObserver || a.WebkitMutationObserver)((t) => {
			if (e.__preventObserver__) return;
			if (t.length === 1) {
				r("observerUpdate", t[0]);
				return;
			}
			let n = function() {
				r("observerUpdate", t[0]);
			};
			a.requestAnimationFrame ? a.requestAnimationFrame(n) : a.setTimeout(n, 0);
		});
		o.observe(t, {
			attributes: n.attributes === void 0 ? !0 : n.attributes,
			childList: e.isElement || (n.childList === void 0 ? !0 : n).childList,
			characterData: n.characterData === void 0 ? !0 : n.characterData
		}), i.push(o);
	};
	t({
		observer: !1,
		observeParents: !1,
		observeSlideChildren: !1
	}), n("init", () => {
		if (e.params.observer) {
			if (e.params.observeParents) {
				let t = QB(e.hostEl);
				for (let e = 0; e < t.length; e += 1) o(t[e]);
			}
			o(e.hostEl, { childList: e.params.observeSlideChildren }), o(e.wrapperEl, { attributes: !1 });
		}
	}), n("destroy", () => {
		i.forEach((e) => {
			e.disconnect();
		}), i.splice(0, i.length);
	});
}
var hV = {
	on(e, t, n) {
		let r = this;
		if (!r.eventsListeners || r.destroyed || typeof t != "function") return r;
		let i = n ? "unshift" : "push";
		return e.split(" ").forEach((e) => {
			r.eventsListeners[e] || (r.eventsListeners[e] = []), r.eventsListeners[e][i](t);
		}), r;
	},
	once(e, t, n) {
		let r = this;
		if (!r.eventsListeners || r.destroyed || typeof t != "function") return r;
		function i(...n) {
			r.off(e, i), i.__emitterProxy && delete i.__emitterProxy, t.apply(r, n);
		}
		return i.__emitterProxy = t, r.on(e, i, n);
	},
	onAny(e, t) {
		let n = this;
		if (!n.eventsListeners || n.destroyed || typeof e != "function") return n;
		let r = t ? "unshift" : "push";
		return n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[r](e), n;
	},
	offAny(e) {
		let t = this;
		if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t;
		let n = t.eventsAnyListeners.indexOf(e);
		return n >= 0 && t.eventsAnyListeners.splice(n, 1), t;
	},
	off(e, t) {
		let n = this;
		return !n.eventsListeners || n.destroyed || !n.eventsListeners || e.split(" ").forEach((e) => {
			t === void 0 ? n.eventsListeners[e] = [] : n.eventsListeners[e] && n.eventsListeners[e].forEach((r, i) => {
				(r === t || r.__emitterProxy && r.__emitterProxy === t) && n.eventsListeners[e].splice(i, 1);
			});
		}), n;
	},
	emit(...e) {
		let t = this;
		if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
		let n, r, i;
		return typeof e[0] == "string" || Array.isArray(e[0]) ? (n = e[0], r = e.slice(1, e.length), i = t) : (n = e[0].events, r = e[0].data, i = e[0].context || t), r.unshift(i), (Array.isArray(n) ? n : n.split(" ")).forEach((e) => {
			t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach((t) => {
				t.apply(i, [e, ...r]);
			}), t.eventsListeners && t.eventsListeners[e] && t.eventsListeners[e].forEach((e) => {
				e.apply(i, r);
			});
		}), t;
	}
};
function gV() {
	let e = this, t, n, r = e.el;
	t = e.params.width !== void 0 && e.params.width !== null ? e.params.width : r.clientWidth, n = e.params.height !== void 0 && e.params.height !== null ? e.params.height : r.clientHeight, !(t === 0 && e.isHorizontal() || n === 0 && e.isVertical()) && (t = t - parseInt(XB(r, "padding-left") || 0, 10) - parseInt(XB(r, "padding-right") || 0, 10), n = n - parseInt(XB(r, "padding-top") || 0, 10) - parseInt(XB(r, "padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(n) && (n = 0), Object.assign(e, {
		width: t,
		height: n,
		size: e.isHorizontal() ? t : n
	}));
}
function _V() {
	let e = this;
	function t(t, n) {
		return parseFloat(t.getPropertyValue(e.getDirectionLabel(n)) || 0);
	}
	let n = e.params, { wrapperEl: r, slidesEl: i, rtlTranslate: a, wrongRTL: o } = e, s = e.virtual && n.virtual.enabled, c = s ? e.virtual.slides.length : e.slides.length, l = HB(i, `.${e.params.slideClass}, swiper-slide`), u = s ? e.virtual.slides.length : l.length, d = [], f = [], p = [], m = n.slidesOffsetBefore;
	typeof m == "function" && (m = n.slidesOffsetBefore.call(e));
	let h = n.slidesOffsetAfter;
	typeof h == "function" && (h = n.slidesOffsetAfter.call(e));
	let g = e.snapGrid.length, _ = e.slidesGrid.length, v = e.size - m - h, y = n.spaceBetween, b = -m, x = 0, S = 0;
	if (v === void 0) return;
	typeof y == "string" && y.indexOf("%") >= 0 ? y = parseFloat(y.replace("%", "")) / 100 * v : typeof y == "string" && (y = parseFloat(y)), e.virtualSize = -y - m - h, l.forEach((e) => {
		a ? e.style.marginLeft = "" : e.style.marginRight = "", e.style.marginBottom = "", e.style.marginTop = "";
	}), n.centeredSlides && n.cssMode && (zB(r, "--swiper-centered-offset-before", ""), zB(r, "--swiper-centered-offset-after", "")), n.cssMode && (zB(r, "--swiper-slides-offset-before", `${m}px`), zB(r, "--swiper-slides-offset-after", `${h}px`));
	let C = n.grid && n.grid.rows > 1 && e.grid;
	C ? e.grid.initSlides(l) : e.grid && e.grid.unsetSlides();
	let w, T = n.slidesPerView === "auto" && n.breakpoints && Object.keys(n.breakpoints).filter((e) => n.breakpoints[e].slidesPerView !== void 0).length > 0;
	for (let r = 0; r < u; r += 1) {
		w = 0;
		let i = l[r];
		if (!(i && (C && e.grid.updateSlide(r, i, l), XB(i, "display") === "none"))) {
			if (s && n.slidesPerView === "auto") n.virtual.slidesPerViewAutoSlideSize && (w = n.virtual.slidesPerViewAutoSlideSize), w && i && (n.roundLengths && (w = Math.floor(w)), i.style[e.getDirectionLabel("width")] = `${w}px`);
			else if (n.slidesPerView === "auto") {
				T && (i.style[e.getDirectionLabel("width")] = "");
				let r = getComputedStyle(i), a = i.style.transform, o = i.style.webkitTransform;
				if (a && (i.style.transform = "none"), o && (i.style.webkitTransform = "none"), n.roundLengths) w = e.isHorizontal() ? eV(i, "width", !0) : eV(i, "height", !0);
				else {
					let e = t(r, "width"), n = t(r, "padding-left"), a = t(r, "padding-right"), o = t(r, "margin-left"), s = t(r, "margin-right"), c = r.getPropertyValue("box-sizing");
					if (c && c === "border-box") w = e + o + s;
					else {
						let { clientWidth: t, offsetWidth: r } = i;
						w = e + n + a + o + s + (r - t);
					}
				}
				a && (i.style.transform = a), o && (i.style.webkitTransform = o), n.roundLengths && (w = Math.floor(w));
			} else w = (v - (n.slidesPerView - 1) * y) / n.slidesPerView, n.roundLengths && (w = Math.floor(w)), i && (i.style[e.getDirectionLabel("width")] = `${w}px`);
			i && (i.swiperSlideSize = w), p.push(w), n.centeredSlides ? (b = b + w / 2 + x / 2 + y, x === 0 && r !== 0 && (b = b - v / 2 - y), r === 0 && (b = b - v / 2 - y), Math.abs(b) < 1 / 1e3 && (b = 0), n.roundLengths && (b = Math.floor(b)), S % n.slidesPerGroup === 0 && d.push(b), f.push(b)) : (n.roundLengths && (b = Math.floor(b)), (S - Math.min(e.params.slidesPerGroupSkip, S)) % e.params.slidesPerGroup === 0 && d.push(b), f.push(b), b = b + w + y), e.virtualSize += w + y, x = w, S += 1;
		}
	}
	if (e.virtualSize = Math.max(e.virtualSize, v) + h, a && o && (n.effect === "slide" || n.effect === "coverflow") && (r.style.width = `${e.virtualSize + y}px`), n.setWrapperSize && (r.style[e.getDirectionLabel("width")] = `${e.virtualSize + y}px`), C && e.grid.updateWrapperSize(w, d), !n.centeredSlides) {
		let t = n.slidesPerView !== "auto" && n.slidesPerView % 1 != 0, r = n.snapToSlideEdge && !n.loop && (n.slidesPerView === "auto" || t), i = d.length;
		if (r) {
			let e;
			if (n.slidesPerView === "auto") {
				e = 1;
				let t = 0;
				for (let n = p.length - 1; n >= 0 && (t += p[n] + (n < p.length - 1 ? y : 0), t <= v); --n) e = p.length - n;
			} else e = Math.floor(n.slidesPerView);
			i = Math.max(u - e, 0);
		}
		let a = [];
		for (let t = 0; t < d.length; t += 1) {
			let o = d[t];
			n.roundLengths && (o = Math.floor(o)), r ? t <= i && a.push(o) : d[t] <= e.virtualSize - v && a.push(o);
		}
		d = a, Math.floor(e.virtualSize - v) - Math.floor(d[d.length - 1]) > 1 && (r || d.push(e.virtualSize - v));
	}
	if (s && n.loop) {
		let t = p[0] + y;
		if (n.slidesPerGroup > 1) {
			let r = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / n.slidesPerGroup), i = t * n.slidesPerGroup;
			for (let e = 0; e < r; e += 1) d.push(d[d.length - 1] + i);
		}
		for (let r = 0; r < e.virtual.slidesBefore + e.virtual.slidesAfter; r += 1) n.slidesPerGroup === 1 && d.push(d[d.length - 1] + t), f.push(f[f.length - 1] + t), e.virtualSize += t;
	}
	if (d.length === 0 && (d = [0]), y !== 0) {
		let t = e.isHorizontal() && a ? "marginLeft" : e.getDirectionLabel("marginRight");
		l.filter((e, t) => !n.cssMode || n.loop ? !0 : t !== l.length - 1).forEach((e) => {
			e.style[t] = `${y}px`;
		});
	}
	if (n.centeredSlides && n.centeredSlidesBounds) {
		let e = 0;
		p.forEach((t) => {
			e += t + (y || 0);
		}), e -= y;
		let t = e > v ? e - v : 0;
		d = d.map((e) => e <= 0 ? -m : e > t ? t + h : e);
	}
	if (n.centerInsufficientSlides) {
		let e = 0;
		if (p.forEach((t) => {
			e += t + (y || 0);
		}), e -= y, e < v) {
			let t = (v - e) / 2;
			d.forEach((e, n) => {
				d[n] = e - t;
			}), f.forEach((e, n) => {
				f[n] = e + t;
			});
		}
	}
	if (Object.assign(e, {
		slides: l,
		snapGrid: d,
		slidesGrid: f,
		slidesSizesGrid: p
	}), n.centeredSlides && n.cssMode && !n.centeredSlidesBounds) {
		zB(r, "--swiper-centered-offset-before", `${-d[0]}px`), zB(r, "--swiper-centered-offset-after", `${e.size / 2 - p[p.length - 1] / 2}px`);
		let t = -e.snapGrid[0], n = -e.slidesGrid[0];
		e.snapGrid = e.snapGrid.map((e) => e + t), e.slidesGrid = e.slidesGrid.map((e) => e + n);
	}
	if (u !== c && e.emit("slidesLengthChange"), d.length !== g && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), f.length !== _ && e.emit("slidesGridLengthChange"), n.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !s && !n.cssMode && (n.effect === "slide" || n.effect === "fade")) {
		let t = `${n.containerModifierClass}backface-hidden`, r = e.el.classList.contains(t);
		u <= n.maxBackfaceHiddenSlides ? r || e.el.classList.add(t) : r && e.el.classList.remove(t);
	}
}
function vV(e) {
	let t = this, n = [], r = t.virtual && t.params.virtual.enabled, i = 0, a;
	typeof e == "number" ? t.setTransition(e) : e === !0 && t.setTransition(t.params.speed);
	let o = (e) => r ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
	if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1) if (t.params.centeredSlides) (t.visibleSlides || []).forEach((e) => {
		n.push(e);
	});
	else for (a = 0; a < Math.ceil(t.params.slidesPerView); a += 1) {
		let e = t.activeIndex + a;
		if (e > t.slides.length && !r) break;
		n.push(o(e));
	}
	else n.push(o(t.activeIndex));
	for (a = 0; a < n.length; a += 1) if (n[a] !== void 0) {
		let e = n[a].offsetHeight;
		i = e > i ? e : i;
	}
	(i || i === 0) && (t.wrapperEl.style.height = `${i}px`);
}
function yV() {
	let e = this, t = e.slides, n = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
	for (let r = 0; r < t.length; r += 1) t[r].swiperSlideOffset = (e.isHorizontal() ? t[r].offsetLeft : t[r].offsetTop) - n - e.cssOverflowAdjustment();
}
var bV = (e, t, n) => {
	t && !e.classList.contains(n) ? e.classList.add(n) : !t && e.classList.contains(n) && e.classList.remove(n);
};
function xV(e = this && this.translate || 0) {
	let t = this, n = t.params, { slides: r, rtlTranslate: i, snapGrid: a } = t;
	if (r.length === 0) return;
	r[0].swiperSlideOffset === void 0 && t.updateSlidesOffset();
	let o = -e;
	i && (o = e), t.visibleSlidesIndexes = [], t.visibleSlides = [];
	let s = n.spaceBetween;
	typeof s == "string" && s.indexOf("%") >= 0 ? s = parseFloat(s.replace("%", "")) / 100 * t.size : typeof s == "string" && (s = parseFloat(s));
	for (let e = 0; e < r.length; e += 1) {
		let c = r[e], l = c.swiperSlideOffset;
		n.cssMode && n.centeredSlides && (l -= r[0].swiperSlideOffset);
		let u = (o + (n.centeredSlides ? t.minTranslate() : 0) - l) / (c.swiperSlideSize + s), d = (o - a[0] + (n.centeredSlides ? t.minTranslate() : 0) - l) / (c.swiperSlideSize + s), f = -(o - l), p = f + t.slidesSizesGrid[e], m = f >= 0 && f <= t.size - t.slidesSizesGrid[e], h = f >= 0 && f < t.size - 1 || p > 1 && p <= t.size || f <= 0 && p >= t.size;
		h && (t.visibleSlides.push(c), t.visibleSlidesIndexes.push(e)), bV(c, h, n.slideVisibleClass), bV(c, m, n.slideFullyVisibleClass), c.progress = i ? -u : u, c.originalProgress = i ? -d : d;
	}
}
function SV(e) {
	let t = this;
	if (e === void 0) {
		let n = t.rtlTranslate ? -1 : 1;
		e = t && t.translate && t.translate * n || 0;
	}
	let n = t.params, r = t.maxTranslate() - t.minTranslate(), { progress: i, isBeginning: a, isEnd: o, progressLoop: s } = t, c = a, l = o;
	if (r === 0) i = 0, a = !0, o = !0;
	else {
		i = (e - t.minTranslate()) / r;
		let n = Math.abs(e - t.minTranslate()) < 1, s = Math.abs(e - t.maxTranslate()) < 1;
		a = n || i <= 0, o = s || i >= 1, n && (i = 0), s && (i = 1);
	}
	if (n.loop) {
		let n = t.getSlideIndexByData(0), r = t.getSlideIndexByData(t.slides.length - 1), i = t.slidesGrid[n], a = t.slidesGrid[r], o = t.slidesGrid[t.slidesGrid.length - 1], c = Math.abs(e);
		s = c >= i ? (c - i) / o : (c + o - a) / o, s > 1 && --s;
	}
	Object.assign(t, {
		progress: i,
		progressLoop: s,
		isBeginning: a,
		isEnd: o
	}), (n.watchSlidesProgress || n.centeredSlides && n.autoHeight) && t.updateSlidesProgress(e), a && !c && t.emit("reachBeginning toEdge"), o && !l && t.emit("reachEnd toEdge"), (c && !a || l && !o) && t.emit("fromEdge"), t.emit("progress", i);
}
var CV = (e, t, n) => {
	t && !e.classList.contains(n) ? e.classList.add(n) : !t && e.classList.contains(n) && e.classList.remove(n);
};
function wV() {
	let e = this, { slides: t, params: n, slidesEl: r, activeIndex: i } = e, a = e.virtual && n.virtual.enabled, o = e.grid && n.grid && n.grid.rows > 1, s = (e) => HB(r, `.${n.slideClass}${e}, swiper-slide${e}`)[0], c, l, u;
	if (a) if (n.loop) {
		let t = i - e.virtual.slidesBefore;
		t < 0 && (t = e.virtual.slides.length + t), t >= e.virtual.slides.length && (t -= e.virtual.slides.length), c = s(`[data-swiper-slide-index="${t}"]`);
	} else c = s(`[data-swiper-slide-index="${i}"]`);
	else o ? (c = t.find((e) => e.column === i), u = t.find((e) => e.column === i + 1), l = t.find((e) => e.column === i - 1)) : c = t[i];
	c && (o || (u = YB(c, `.${n.slideClass}, swiper-slide`)[0], n.loop && !u && (u = t[0]), l = JB(c, `.${n.slideClass}, swiper-slide`)[0], n.loop)), t.forEach((e) => {
		CV(e, e === c, n.slideActiveClass), CV(e, e === u, n.slideNextClass), CV(e, e === l, n.slidePrevClass);
	}), e.emitSlidesClasses();
}
var TV = (e, t) => {
	if (!e || e.destroyed || !e.params) return;
	let n = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
	if (n) {
		let t = n.querySelector(`.${e.params.lazyPreloaderClass}`);
		!t && e.isElement && (n.shadowRoot ? t = n.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
			n.shadowRoot && (t = n.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), t && !t.lazyPreloaderManaged && t.remove());
		})), t && !t.lazyPreloaderManaged && t.remove();
	}
}, EV = (e, t) => {
	if (!e.slides[t]) return;
	let n = e.slides[t].querySelector("[loading=\"lazy\"]");
	n && n.removeAttribute("loading");
}, DV = (e) => {
	if (!e || e.destroyed || !e.params) return;
	let t = e.params.lazyPreloadPrevNext, n = e.slides.length;
	if (!n || !t || t < 0) return;
	t = Math.min(t, n);
	let r = e.params.slidesPerView === "auto" ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), i = e.activeIndex;
	if (e.params.grid && e.params.grid.rows > 1) {
		let n = i, a = [n - t];
		a.push(...Array.from({ length: t }).map((e, t) => n + r + t)), e.slides.forEach((t, n) => {
			a.includes(t.column) && EV(e, n);
		});
		return;
	}
	let a = i + r - 1;
	if (e.params.rewind || e.params.loop) for (let r = i - t; r <= a + t; r += 1) {
		let t = (r % n + n) % n;
		(t < i || t > a) && EV(e, t);
	}
	else for (let r = Math.max(i - t, 0); r <= Math.min(a + t, n - 1); r += 1) r !== i && (r > a || r < i) && EV(e, r);
};
function OV(e) {
	let { slidesGrid: t, params: n } = e, r = e.rtlTranslate ? e.translate : -e.translate, i;
	for (let e = 0; e < t.length; e += 1) t[e + 1] === void 0 ? r >= t[e] && (i = e) : r >= t[e] && r < t[e + 1] - (t[e + 1] - t[e]) / 2 ? i = e : r >= t[e] && r < t[e + 1] && (i = e + 1);
	return n.normalizeSlideIndex && (i < 0 || i === void 0) && (i = 0), i;
}
function kV(e) {
	let t = this, n = t.rtlTranslate ? t.translate : -t.translate, { snapGrid: r, params: i, activeIndex: a, realIndex: o, snapIndex: s } = t, c = e, l, u = (e) => {
		let n = e - t.virtual.slidesBefore;
		return n < 0 && (n = t.virtual.slides.length + n), n >= t.virtual.slides.length && (n -= t.virtual.slides.length), n;
	};
	if (c === void 0 && (c = OV(t)), r.indexOf(n) >= 0) l = r.indexOf(n);
	else {
		let e = Math.min(i.slidesPerGroupSkip, c);
		l = e + Math.floor((c - e) / i.slidesPerGroup);
	}
	if (l >= r.length && (l = r.length - 1), c === a && !t.params.loop) {
		l !== s && (t.snapIndex = l, t.emit("snapIndexChange"));
		return;
	}
	if (c === a && t.params.loop && t.virtual && t.params.virtual.enabled) {
		t.realIndex = u(c);
		return;
	}
	let d = t.grid && i.grid && i.grid.rows > 1, f;
	if (t.virtual && i.virtual.enabled) f = i.loop ? u(c) : c;
	else if (d) {
		let e = t.slides.find((e) => e.column === c), n = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
		Number.isNaN(n) && (n = Math.max(t.slides.indexOf(e), 0)), f = Math.floor(n / i.grid.rows);
	} else if (t.slides[c]) {
		let e = t.slides[c].getAttribute("data-swiper-slide-index");
		f = e ? parseInt(e, 10) : c;
	} else f = c;
	Object.assign(t, {
		previousSnapIndex: s,
		snapIndex: l,
		previousRealIndex: o,
		realIndex: f,
		previousIndex: a,
		activeIndex: c
	}), t.initialized && DV(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && (o !== f && t.emit("realIndexChange"), t.emit("slideChange"));
}
function AV(e, t) {
	let n = this, r = n.params, i = e.closest(`.${r.slideClass}, swiper-slide`);
	!i && n.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
		!i && e.matches && e.matches(`.${r.slideClass}, swiper-slide`) && (i = e);
	});
	let a = !1, o;
	if (i) {
		for (let e = 0; e < n.slides.length; e += 1) if (n.slides[e] === i) {
			a = !0, o = e;
			break;
		}
	}
	if (i && a) n.clickedSlide = i, n.virtual && n.params.virtual.enabled ? n.clickedIndex = parseInt(i.getAttribute("data-swiper-slide-index"), 10) : n.clickedIndex = o;
	else {
		n.clickedSlide = void 0, n.clickedIndex = void 0;
		return;
	}
	r.slideToClickedSlide && n.clickedIndex !== void 0 && n.clickedIndex !== n.activeIndex && n.slideToClickedSlide();
}
var jV = {
	updateSize: gV,
	updateSlides: _V,
	updateAutoHeight: vV,
	updateSlidesOffset: yV,
	updateSlidesProgress: xV,
	updateProgress: SV,
	updateSlidesClasses: wV,
	updateActiveIndex: kV,
	updateClickedSlide: AV
};
function MV(e = this.isHorizontal() ? "x" : "y") {
	let t = this, { params: n, rtlTranslate: r, translate: i, wrapperEl: a } = t;
	if (n.virtualTranslate) return r ? -i : i;
	if (n.cssMode) return i;
	let o = FB(a, e);
	return o += t.cssOverflowAdjustment(), r && (o = -o), o || 0;
}
function NV(e, t) {
	let n = this, { rtlTranslate: r, params: i, wrapperEl: a, progress: o } = n, s = 0, c = 0;
	n.isHorizontal() ? s = r ? -e : e : c = e, i.roundLengths && (s = Math.floor(s), c = Math.floor(c)), n.previousTranslate = n.translate, n.translate = n.isHorizontal() ? s : c, i.cssMode ? a[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal() ? -s : -c : i.virtualTranslate || (n.isHorizontal() ? s -= n.cssOverflowAdjustment() : c -= n.cssOverflowAdjustment(), a.style.transform = `translate3d(${s}px, ${c}px, 0px)`);
	let l, u = n.maxTranslate() - n.minTranslate();
	l = u === 0 ? 0 : (e - n.minTranslate()) / u, l !== o && n.updateProgress(e), n.emit("setTranslate", n.translate, t);
}
function PV() {
	return -this.snapGrid[0];
}
function FV() {
	return -this.snapGrid[this.snapGrid.length - 1];
}
function IV(e = 0, t = this.params.speed, n = !0, r = !0, i) {
	let a = this, { params: o, wrapperEl: s } = a;
	if (a.animating && o.preventInteractionOnTransition) return !1;
	let c = a.minTranslate(), l = a.maxTranslate(), u;
	if (u = r && e > c ? c : r && e < l ? l : e, a.updateProgress(u), o.cssMode) {
		let e = a.isHorizontal();
		if (t === 0) s[e ? "scrollLeft" : "scrollTop"] = -u;
		else {
			if (!a.support.smoothScroll) return BB({
				swiper: a,
				targetPosition: -u,
				side: e ? "left" : "top"
			}), !0;
			s.scrollTo({
				[e ? "left" : "top"]: -u,
				behavior: "smooth"
			});
		}
		return !0;
	}
	return t === 0 ? (a.setTransition(0), a.setTranslate(u), n && (a.emit("beforeTransitionStart", t, i), a.emit("transitionEnd"))) : (a.setTransition(t), a.setTranslate(u), n && (a.emit("beforeTransitionStart", t, i), a.emit("transitionStart")), a.animating || (a.animating = !0, a.onTranslateToWrapperTransitionEnd ||= function(e) {
		!a || a.destroyed || e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), a.onTranslateToWrapperTransitionEnd = null, delete a.onTranslateToWrapperTransitionEnd, a.animating = !1, n && a.emit("transitionEnd"));
	}, a.wrapperEl.addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd))), !0;
}
var LV = {
	getTranslate: MV,
	setTranslate: NV,
	minTranslate: PV,
	maxTranslate: FV,
	translateTo: IV
};
function RV(e, t) {
	let n = this;
	n.params.cssMode || (n.wrapperEl.style.transitionDuration = `${e}ms`, n.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : ""), n.emit("setTransition", e, t);
}
function zV({ swiper: e, runCallbacks: t, direction: n, step: r }) {
	let { activeIndex: i, previousIndex: a } = e, o = n;
	o ||= i > a ? "next" : i < a ? "prev" : "reset", e.emit(`transition${r}`), t && o === "reset" ? e.emit(`slideResetTransition${r}`) : t && i !== a && (e.emit(`slideChangeTransition${r}`), o === "next" ? e.emit(`slideNextTransition${r}`) : e.emit(`slidePrevTransition${r}`));
}
function BV(e = !0, t) {
	let n = this, { params: r } = n;
	r.cssMode || (r.autoHeight && n.updateAutoHeight(), zV({
		swiper: n,
		runCallbacks: e,
		direction: t,
		step: "Start"
	}));
}
function VV(e = !0, t) {
	let n = this, { params: r } = n;
	n.animating = !1, !r.cssMode && (n.setTransition(0), zV({
		swiper: n,
		runCallbacks: e,
		direction: t,
		step: "End"
	}));
}
var HV = {
	setTransition: RV,
	transitionStart: BV,
	transitionEnd: VV
};
function UV(e = 0, t, n = !0, r, i) {
	typeof e == "string" && (e = parseInt(e, 10));
	let a = this, o = e;
	o < 0 && (o = 0);
	let { params: s, snapGrid: c, slidesGrid: l, previousIndex: u, activeIndex: d, rtlTranslate: f, wrapperEl: p, enabled: m } = a;
	if (!m && !r && !i || a.destroyed || a.animating && s.preventInteractionOnTransition) return !1;
	t === void 0 && (t = a.params.speed);
	let h = Math.min(a.params.slidesPerGroupSkip, o), g = h + Math.floor((o - h) / a.params.slidesPerGroup);
	g >= c.length && (g = c.length - 1);
	let _ = -c[g];
	if (s.normalizeSlideIndex) for (let e = 0; e < l.length; e += 1) {
		let t = -Math.floor(_ * 100), n = Math.floor(l[e] * 100), r = Math.floor(l[e + 1] * 100);
		l[e + 1] === void 0 ? t >= n && (o = e) : t >= n && t < r - (r - n) / 2 ? o = e : t >= n && t < r && (o = e + 1);
	}
	if (a.initialized && o !== d && (!a.allowSlideNext && (f ? _ > a.translate && _ > a.minTranslate() : _ < a.translate && _ < a.minTranslate()) || !a.allowSlidePrev && _ > a.translate && _ > a.maxTranslate() && (d || 0) !== o)) return !1;
	o !== (u || 0) && n && a.emit("beforeSlideChangeStart"), a.updateProgress(_);
	let v;
	v = o > d ? "next" : o < d ? "prev" : "reset";
	let y = a.virtual && a.params.virtual.enabled;
	if (!(y && i) && (f && -_ === a.translate || !f && _ === a.translate)) return a.updateActiveIndex(o), s.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), s.effect !== "slide" && a.setTranslate(_), v !== "reset" && (a.transitionStart(n, v), a.transitionEnd(n, v)), !1;
	if (s.cssMode) {
		let e = a.isHorizontal(), n = f ? _ : -_;
		if (t === 0) y && (a.wrapperEl.style.scrollSnapType = "none", a._immediateVirtual = !0), y && !a._cssModeVirtualInitialSet && a.params.initialSlide > 0 ? (a._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
			p[e ? "scrollLeft" : "scrollTop"] = n;
		})) : p[e ? "scrollLeft" : "scrollTop"] = n, y && requestAnimationFrame(() => {
			a.wrapperEl.style.scrollSnapType = "", a._immediateVirtual = !1;
		});
		else {
			if (!a.support.smoothScroll) return BB({
				swiper: a,
				targetPosition: n,
				side: e ? "left" : "top"
			}), !0;
			p.scrollTo({
				[e ? "left" : "top"]: n,
				behavior: "smooth"
			});
		}
		return !0;
	}
	let b = fV().isSafari;
	return y && !i && b && a.isElement && a.virtual.update(!1, !1, o), a.setTransition(t), a.setTranslate(_), a.updateActiveIndex(o), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, r), a.transitionStart(n, v), t === 0 ? a.transitionEnd(n, v) : a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd ||= function(e) {
		!a || a.destroyed || e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, a.transitionEnd(n, v));
	}, a.wrapperEl.addEventListener("transitionend", a.onSlideToWrapperTransitionEnd)), !0;
}
function WV(e = 0, t, n = !0, r) {
	typeof e == "string" && (e = parseInt(e, 10));
	let i = this;
	if (i.destroyed) return;
	t === void 0 && (t = i.params.speed);
	let a = i.grid && i.params.grid && i.params.grid.rows > 1, o = e;
	if (i.params.loop) if (i.virtual && i.params.virtual.enabled) o += i.virtual.slidesBefore;
	else {
		let e;
		if (a) {
			let t = o * i.params.grid.rows;
			e = i.slides.find((e) => e.getAttribute("data-swiper-slide-index") * 1 === t).column;
		} else e = i.getSlideIndexByData(o);
		let t = a ? Math.ceil(i.slides.length / i.params.grid.rows) : i.slides.length, { centeredSlides: n, slidesOffsetBefore: s, slidesOffsetAfter: c } = i.params, l = n || !!s || !!c, u = i.params.slidesPerView;
		u === "auto" ? u = i.slidesPerViewDynamic() : (u = Math.ceil(parseFloat(i.params.slidesPerView, 10)), l && u % 2 == 0 && (u += 1));
		let d = t - e < u;
		if (l && (d ||= e < Math.ceil(u / 2)), r && l && i.params.slidesPerView !== "auto" && !a && (d = !1), d) {
			let n = l ? e < i.activeIndex ? "prev" : "next" : e - i.activeIndex - 1 < i.params.slidesPerView ? "next" : "prev";
			i.loopFix({
				direction: n,
				slideTo: !0,
				activeSlideIndex: n === "next" ? e + 1 : e - t + 1,
				slideRealIndex: n === "next" ? i.realIndex : void 0
			});
		}
		if (a) {
			let e = o * i.params.grid.rows;
			o = i.slides.find((t) => t.getAttribute("data-swiper-slide-index") * 1 === e).column;
		} else o = i.getSlideIndexByData(o);
	}
	return requestAnimationFrame(() => {
		i.slideTo(o, t, n, r);
	}), i;
}
function GV(e, t = !0, n) {
	let r = this, { enabled: i, params: a, animating: o } = r;
	if (!i || r.destroyed) return r;
	e === void 0 && (e = r.params.speed);
	let s = a.slidesPerGroup;
	a.slidesPerView === "auto" && a.slidesPerGroup === 1 && a.slidesPerGroupAuto && (s = Math.max(r.slidesPerViewDynamic("current", !0), 1));
	let c = r.activeIndex < a.slidesPerGroupSkip ? 1 : s, l = r.virtual && a.virtual.enabled;
	if (a.loop) {
		if (o && !l && a.loopPreventsSliding) return !1;
		if (r.loopFix({ direction: "next" }), r._clientLeft = r.wrapperEl.clientLeft, r.activeIndex === r.slides.length - 1 && a.cssMode) return requestAnimationFrame(() => {
			r.slideTo(r.activeIndex + c, e, t, n);
		}), !0;
	}
	return a.rewind && r.isEnd ? r.slideTo(0, e, t, n) : r.slideTo(r.activeIndex + c, e, t, n);
}
function KV(e, t = !0, n) {
	let r = this, { params: i, snapGrid: a, slidesGrid: o, rtlTranslate: s, enabled: c, animating: l } = r;
	if (!c || r.destroyed) return r;
	e === void 0 && (e = r.params.speed);
	let u = r.virtual && i.virtual.enabled;
	if (i.loop) {
		if (l && !u && i.loopPreventsSliding) return !1;
		r.loopFix({ direction: "prev" }), r._clientLeft = r.wrapperEl.clientLeft;
	}
	let d = s ? r.translate : -r.translate;
	function f(e) {
		return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
	}
	let p = f(d), m = a.map((e) => f(e)), h = i.freeMode && i.freeMode.enabled, g = a[m.indexOf(p) - 1];
	if (g === void 0 && (i.cssMode || h)) {
		let e;
		a.forEach((t, n) => {
			p >= t && (e = n);
		}), e !== void 0 && (g = h ? a[e] : a[e > 0 ? e - 1 : e]);
	}
	let _ = 0;
	if (g !== void 0 && (_ = o.indexOf(g), _ < 0 && (_ = r.activeIndex - 1), i.slidesPerView === "auto" && i.slidesPerGroup === 1 && i.slidesPerGroupAuto && (_ = _ - r.slidesPerViewDynamic("previous", !0) + 1, _ = Math.max(_, 0))), i.rewind && r.isBeginning) {
		let i = r.params.virtual && r.params.virtual.enabled && r.virtual ? r.virtual.slides.length - 1 : r.slides.length - 1;
		return r.slideTo(i, e, t, n);
	} else if (i.loop && r.activeIndex === 0 && i.cssMode) return requestAnimationFrame(() => {
		r.slideTo(_, e, t, n);
	}), !0;
	return r.slideTo(_, e, t, n);
}
function qV(e, t = !0, n) {
	let r = this;
	if (!r.destroyed) return e === void 0 && (e = r.params.speed), r.slideTo(r.activeIndex, e, t, n);
}
function JV(e, t = !0, n, r = .5) {
	let i = this;
	if (i.destroyed) return;
	e === void 0 && (e = i.params.speed);
	let a = i.activeIndex, o = Math.min(i.params.slidesPerGroupSkip, a), s = o + Math.floor((a - o) / i.params.slidesPerGroup), c = i.rtlTranslate ? i.translate : -i.translate;
	if (c >= i.snapGrid[s]) {
		let e = i.snapGrid[s], t = i.snapGrid[s + 1];
		c - e > (t - e) * r && (a += i.params.slidesPerGroup);
	} else {
		let e = i.snapGrid[s - 1], t = i.snapGrid[s];
		c - e <= (t - e) * r && (a -= i.params.slidesPerGroup);
	}
	return a = Math.max(a, 0), a = Math.min(a, i.slidesGrid.length - 1), i.slideTo(a, e, t, n);
}
function YV() {
	let e = this;
	if (e.destroyed) return;
	let { params: t, slidesEl: n } = e, r = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView, i = e.getSlideIndexWhenGrid(e.clickedIndex), a, o = e.isElement ? "swiper-slide" : `.${t.slideClass}`, s = e.grid && e.params.grid && e.params.grid.rows > 1;
	if (t.loop) {
		if (e.animating) return;
		a = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? e.slideToLoop(a) : i > (s ? (e.slides.length - r) / 2 - (e.params.grid.rows - 1) : e.slides.length - r) ? (e.loopFix(), i = e.getSlideIndex(HB(n, `${o}[data-swiper-slide-index="${a}"]`)[0]), MB(() => {
			e.slideTo(i);
		})) : e.slideTo(i);
	} else e.slideTo(i);
}
var XV = {
	slideTo: UV,
	slideToLoop: WV,
	slideNext: GV,
	slidePrev: KV,
	slideReset: qV,
	slideToClosest: JV,
	slideToClickedSlide: YV
};
function ZV(e, t) {
	let n = this, { params: r, slidesEl: i } = n;
	if (!r.loop || n.virtual && n.params.virtual.enabled) return;
	let a = () => {
		HB(i, `.${r.slideClass}, swiper-slide`).forEach((e, t) => {
			e.setAttribute("data-swiper-slide-index", t);
		});
	}, o = () => {
		let e = HB(i, `.${r.slideBlankClass}`);
		e.forEach((e) => {
			e.remove();
		}), e.length > 0 && (n.recalcSlides(), n.updateSlides());
	}, s = n.grid && r.grid && r.grid.rows > 1;
	r.loopAddBlankSlides && (r.slidesPerGroup > 1 || s) && o();
	let c = r.slidesPerGroup * (s ? r.grid.rows : 1), l = n.slides.length % c !== 0, u = s && n.slides.length % r.grid.rows !== 0, d = (e) => {
		for (let t = 0; t < e; t += 1) {
			let e = n.isElement ? KB("swiper-slide", [r.slideBlankClass]) : KB("div", [r.slideClass, r.slideBlankClass]);
			n.slidesEl.append(e);
		}
	};
	l ? (r.loopAddBlankSlides ? (d(c - n.slides.length % c), n.recalcSlides(), n.updateSlides()) : GB("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"), a()) : (u && (r.loopAddBlankSlides ? (d(r.grid.rows - n.slides.length % r.grid.rows), n.recalcSlides(), n.updateSlides()) : GB("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)")), a());
	let f = r.centeredSlides || !!r.slidesOffsetBefore || !!r.slidesOffsetAfter;
	n.loopFix({
		slideRealIndex: e,
		direction: f ? void 0 : "next",
		initial: t
	});
}
function QV({ slideRealIndex: e, slideTo: t = !0, direction: n, setTranslate: r, activeSlideIndex: i, initial: a, byController: o, byMousewheel: s } = {}) {
	let c = this;
	if (!c.params.loop) return;
	c.emit("beforeLoopFix");
	let { slides: l, allowSlidePrev: u, allowSlideNext: d, slidesEl: f, params: p } = c, { centeredSlides: m, slidesOffsetBefore: h, slidesOffsetAfter: g, initialSlide: _ } = p, v = m || !!h || !!g;
	if (c.allowSlidePrev = !0, c.allowSlideNext = !0, c.virtual && p.virtual.enabled) {
		t && (!v && c.snapIndex === 0 ? c.slideTo(c.virtual.slides.length, 0, !1, !0) : v && c.snapIndex < p.slidesPerView ? c.slideTo(c.virtual.slides.length + c.snapIndex, 0, !1, !0) : c.snapIndex === c.snapGrid.length - 1 && c.slideTo(c.virtual.slidesBefore, 0, !1, !0)), c.allowSlidePrev = u, c.allowSlideNext = d, c.emit("loopFix");
		return;
	}
	let y = p.slidesPerView;
	y === "auto" ? y = c.slidesPerViewDynamic() : (y = Math.ceil(parseFloat(p.slidesPerView, 10)), v && y % 2 == 0 && (y += 1));
	let b = p.slidesPerGroupAuto ? y : p.slidesPerGroup, x = v ? Math.max(b, Math.ceil(y / 2)) : b;
	x % b !== 0 && (x += b - x % b), x += p.loopAdditionalSlides, c.loopedSlides = x;
	let S = c.grid && p.grid && p.grid.rows > 1;
	l.length < y + x || c.params.effect === "cards" && l.length < y + x * 2 ? GB("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : S && p.grid.fill === "row" && GB("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
	let C = [], w = [], T = S ? Math.ceil(l.length / p.grid.rows) : l.length, E = a && T - _ < y && !v, D = E ? _ : c.activeIndex;
	i === void 0 ? i = c.getSlideIndex(l.find((e) => e.classList.contains(p.slideActiveClass))) : D = i;
	let O = n === "next" || !n, ee = n === "prev" || !n, te = 0, k = 0, ne = (S ? l[i].column : i) + (v && r === void 0 ? -y / 2 + .5 : 0);
	if (ne < x) {
		te = Math.max(x - ne, b);
		for (let e = 0; e < x - ne; e += 1) {
			let t = e - Math.floor(e / T) * T;
			if (S) {
				let e = T - t - 1;
				for (let t = l.length - 1; t >= 0; --t) l[t].column === e && C.push(t);
			} else C.push(T - t - 1);
		}
	} else if (ne + y > T - x) {
		k = Math.max(ne - (T - x * 2), b), E && (k = Math.max(k, y - T + _ + 1));
		for (let e = 0; e < k; e += 1) {
			let t = e - Math.floor(e / T) * T;
			S ? l.forEach((e, n) => {
				e.column === t && w.push(n);
			}) : w.push(t);
		}
	}
	if (c.__preventObserver__ = !0, requestAnimationFrame(() => {
		c.__preventObserver__ = !1;
	}), c.params.effect === "cards" && l.length < y + x * 2 && (w.includes(i) && w.splice(w.indexOf(i), 1), C.includes(i) && C.splice(C.indexOf(i), 1)), ee && C.forEach((e) => {
		l[e].swiperLoopMoveDOM = !0, f.prepend(l[e]), l[e].swiperLoopMoveDOM = !1;
	}), O && w.forEach((e) => {
		l[e].swiperLoopMoveDOM = !0, f.append(l[e]), l[e].swiperLoopMoveDOM = !1;
	}), c.recalcSlides(), p.slidesPerView === "auto" ? c.updateSlides() : S && (C.length > 0 && ee || w.length > 0 && O) && c.slides.forEach((e, t) => {
		c.grid.updateSlide(t, e, c.slides);
	}), p.watchSlidesProgress && c.updateSlidesOffset(), t) {
		if (C.length > 0 && ee) {
			if (e === void 0) {
				let e = c.slidesGrid[D], t = c.slidesGrid[D + te] - e;
				s ? c.setTranslate(c.translate - t) : (c.slideTo(D + Math.ceil(te), 0, !1, !0), r && (c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - t, c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - t));
			} else if (r) {
				let e = S ? C.length / p.grid.rows : C.length;
				c.slideTo(c.activeIndex + e, 0, !1, !0), c.touchEventsData.currentTranslate = c.translate;
			}
		} else if (w.length > 0 && O) if (e === void 0) {
			let e = c.slidesGrid[D], t = c.slidesGrid[D - k] - e;
			s ? c.setTranslate(c.translate - t) : (c.slideTo(D - k, 0, !1, !0), r && (c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - t, c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - t));
		} else {
			let e = S ? w.length / p.grid.rows : w.length;
			c.slideTo(c.activeIndex - e, 0, !1, !0);
		}
	}
	if (c.allowSlidePrev = u, c.allowSlideNext = d, c.controller && c.controller.control && !o) {
		let a = {
			slideRealIndex: e,
			direction: n,
			setTranslate: r,
			activeSlideIndex: i,
			byController: !0
		};
		Array.isArray(c.controller.control) ? c.controller.control.forEach((e) => {
			!e.destroyed && e.params.loop && e.loopFix({
				...a,
				slideTo: e.params.slidesPerView === p.slidesPerView ? t : !1
			});
		}) : c.controller.control instanceof c.constructor && c.controller.control.params.loop && c.controller.control.loopFix({
			...a,
			slideTo: c.controller.control.params.slidesPerView === p.slidesPerView ? t : !1
		});
	}
	c.emit("loopFix");
}
function $V() {
	let e = this, { params: t, slidesEl: n } = e;
	if (!t.loop || !n || e.virtual && e.params.virtual.enabled) return;
	e.recalcSlides();
	let r = [];
	e.slides.forEach((e) => {
		let t = e.swiperSlideIndex === void 0 ? e.getAttribute("data-swiper-slide-index") * 1 : e.swiperSlideIndex;
		r[t] = e;
	}), e.slides.forEach((e) => {
		e.removeAttribute("data-swiper-slide-index");
	}), r.forEach((e) => {
		n.append(e);
	}), e.recalcSlides(), e.slideTo(e.realIndex, 0);
}
var eH = {
	loopCreate: ZV,
	loopFix: QV,
	loopDestroy: $V
};
function tH(e) {
	let t = this;
	if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
	let n = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
	t.isElement && (t.__preventObserver__ = !0), n.style.cursor = "move", n.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame(() => {
		t.__preventObserver__ = !1;
	});
}
function nH() {
	let e = this;
	e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame(() => {
		e.__preventObserver__ = !1;
	}));
}
var rH = {
	setGrabCursor: tH,
	unsetGrabCursor: nH
};
function iH(e, t = this) {
	function n(t) {
		if (!t || t === DB() || t === kB()) return null;
		t.assignedSlot && (t = t.assignedSlot);
		let r = t.closest(e);
		return !r && !t.getRootNode ? null : r || n(t.getRootNode().host);
	}
	return n(t);
}
function aH(e, t, n) {
	let r = kB(), { params: i } = e, a = i.edgeSwipeDetection, o = i.edgeSwipeThreshold;
	return a && (n <= o || n >= r.innerWidth - o) ? a === "prevent" ? (t.preventDefault(), !0) : !1 : !0;
}
function oH(e) {
	let t = this;
	if (t.destroyed) return;
	let n = DB(), r = e;
	r.originalEvent && (r = r.originalEvent);
	let i = t.touchEventsData;
	if (r.type === "pointerdown") {
		if (i.pointerId !== null && i.pointerId !== r.pointerId) return;
		i.pointerId = r.pointerId;
	} else r.type === "touchstart" && r.targetTouches.length === 1 && (i.touchId = r.targetTouches[0].identifier);
	if (r.type === "touchstart") {
		aH(t, r, r.targetTouches[0].pageX);
		return;
	}
	let { params: a, touches: o, enabled: s } = t;
	if (!s || !a.simulateTouch && r.pointerType === "mouse" || t.animating && a.preventInteractionOnTransition) return;
	!t.animating && a.cssMode && a.loop && t.loopFix();
	let c = r.target;
	if (a.touchEventsTarget === "wrapper" && !WB(c, t.wrapperEl) || "which" in r && r.which === 3 || "button" in r && r.button > 0 || i.isTouched && i.isMoved) return;
	let l = !!a.noSwipingClass && a.noSwipingClass !== "", u = r.composedPath ? r.composedPath() : r.path;
	l && r.target && r.target.shadowRoot && u && (c = u[0]);
	let d = a.noSwipingSelector ? a.noSwipingSelector : `.${a.noSwipingClass}`, f = !!(r.target && r.target.shadowRoot);
	if (a.noSwiping && (f ? iH(d, c) : c.closest(d))) {
		t.allowClick = !0;
		return;
	}
	if (a.swipeHandler && !c.closest(a.swipeHandler)) return;
	o.currentX = r.pageX, o.currentY = r.pageY;
	let p = o.currentX, m = o.currentY;
	if (!aH(t, r, p)) return;
	Object.assign(i, {
		isTouched: !0,
		isMoved: !1,
		allowTouchCallbacks: !0,
		isScrolling: void 0,
		startMoving: void 0
	}), o.startX = p, o.startY = m, i.touchStartTime = NB(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, a.threshold > 0 && (i.allowThresholdMove = !1);
	let h = !0;
	c.matches(i.focusableElements) && (h = !1, c.nodeName === "SELECT" && (i.isTouched = !1)), n.activeElement && n.activeElement.matches(i.focusableElements) && n.activeElement !== c && (r.pointerType === "mouse" || r.pointerType !== "mouse" && !c.matches(i.focusableElements)) && n.activeElement.blur();
	let g = h && t.allowTouchMove && a.touchStartPreventDefault;
	(a.touchStartForcePreventDefault || g) && !c.isContentEditable && r.preventDefault(), a.freeMode && a.freeMode.enabled && t.freeMode && t.animating && !a.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", r);
}
function sH(e) {
	let t = DB(), n = this;
	if (n.destroyed) return;
	let r = n.touchEventsData, { params: i, touches: a, rtlTranslate: o, enabled: s } = n;
	if (!s || !i.simulateTouch && e.pointerType === "mouse") return;
	let c = e;
	if (c.originalEvent && (c = c.originalEvent), c.type === "pointermove" && (r.touchId !== null || c.pointerId !== r.pointerId)) return;
	let l;
	if (c.type === "touchmove") {
		if (l = [...c.changedTouches].find((e) => e.identifier === r.touchId), !l || l.identifier !== r.touchId) return;
	} else l = c;
	if (!r.isTouched) {
		r.startMoving && r.isScrolling && n.emit("touchMoveOpposite", c);
		return;
	}
	let u = l.pageX, d = l.pageY;
	if (c.preventedByNestedSwiper) {
		a.startX = u, a.startY = d;
		return;
	}
	if (!n.allowTouchMove) {
		c.target.matches(r.focusableElements) || (n.allowClick = !1), r.isTouched && (Object.assign(a, {
			startX: u,
			startY: d,
			currentX: u,
			currentY: d
		}), r.touchStartTime = NB());
		return;
	}
	if (i.touchReleaseOnEdges && !i.loop) {
		if (n.isVertical()) {
			if (d < a.startY && n.translate <= n.maxTranslate() || d > a.startY && n.translate >= n.minTranslate()) {
				r.isTouched = !1, r.isMoved = !1;
				return;
			}
		} else if (o && (u > a.startX && -n.translate <= n.maxTranslate() || u < a.startX && -n.translate >= n.minTranslate())) return;
		else if (!o && (u < a.startX && n.translate <= n.maxTranslate() || u > a.startX && n.translate >= n.minTranslate())) return;
	}
	if (t.activeElement && t.activeElement.matches(r.focusableElements) && t.activeElement !== c.target && c.pointerType !== "mouse" && t.activeElement.blur(), t.activeElement && c.target === t.activeElement && c.target.matches(r.focusableElements)) {
		r.isMoved = !0, n.allowClick = !1;
		return;
	}
	r.allowTouchCallbacks && n.emit("touchMove", c), a.previousX = a.currentX, a.previousY = a.currentY, a.currentX = u, a.currentY = d;
	let f = a.currentX - a.startX, p = a.currentY - a.startY;
	if (n.params.threshold && Math.sqrt(f ** 2 + p ** 2) < n.params.threshold) return;
	if (r.isScrolling === void 0) {
		let e;
		n.isHorizontal() && a.currentY === a.startY || n.isVertical() && a.currentX === a.startX ? r.isScrolling = !1 : f * f + p * p >= 25 && (e = Math.atan2(Math.abs(p), Math.abs(f)) * 180 / Math.PI, r.isScrolling = n.isHorizontal() ? e > i.touchAngle : 90 - e > i.touchAngle);
	}
	if (r.isScrolling && n.emit("touchMoveOpposite", c), r.startMoving === void 0 && (a.currentX !== a.startX || a.currentY !== a.startY) && (r.startMoving = !0), r.isScrolling || c.type === "touchmove" && r.preventTouchMoveFromPointerMove) {
		r.isTouched = !1;
		return;
	}
	if (!r.startMoving) return;
	n.allowClick = !1, !i.cssMode && c.cancelable && c.preventDefault(), i.touchMoveStopPropagation && !i.nested && c.stopPropagation();
	let m = n.isHorizontal() ? f : p, h = n.isHorizontal() ? a.currentX - a.previousX : a.currentY - a.previousY;
	i.oneWayMovement && (m = Math.abs(m) * (o ? 1 : -1), h = Math.abs(h) * (o ? 1 : -1)), a.diff = m, m *= i.touchRatio, o && (m = -m, h = -h);
	let g = n.touchesDirection;
	n.swipeDirection = m > 0 ? "prev" : "next", n.touchesDirection = h > 0 ? "prev" : "next";
	let _ = n.params.loop && !i.cssMode, v = n.touchesDirection === "next" && n.allowSlideNext || n.touchesDirection === "prev" && n.allowSlidePrev;
	if (!r.isMoved) {
		if (_ && v && n.loopFix({ direction: n.swipeDirection }), r.startTranslate = n.getTranslate(), n.setTransition(0), n.animating) {
			let e = new window.CustomEvent("transitionend", {
				bubbles: !0,
				cancelable: !0,
				detail: { bySwiperTouchMove: !0 }
			});
			n.wrapperEl.dispatchEvent(e);
		}
		r.allowMomentumBounce = !1, i.grabCursor && (n.allowSlideNext === !0 || n.allowSlidePrev === !0) && n.setGrabCursor(!0), n.emit("sliderFirstMove", c);
	}
	if ((/* @__PURE__ */ new Date()).getTime(), i._loopSwapReset !== !1 && r.isMoved && r.allowThresholdMove && g !== n.touchesDirection && _ && v && Math.abs(m) >= 1) {
		Object.assign(a, {
			startX: u,
			startY: d,
			currentX: u,
			currentY: d,
			startTranslate: r.currentTranslate
		}), r.loopSwapReset = !0, r.startTranslate = r.currentTranslate;
		return;
	}
	n.emit("sliderMove", c), r.isMoved = !0, r.currentTranslate = m + r.startTranslate;
	let y = !0, b = i.resistanceRatio;
	if (i.touchReleaseOnEdges && (b = 0), m > 0 ? (_ && v && r.allowThresholdMove && r.currentTranslate > (i.centeredSlides ? n.minTranslate() - n.slidesSizesGrid[n.activeIndex + 1] - (i.slidesPerView !== "auto" && n.slides.length - i.slidesPerView >= 2 ? n.slidesSizesGrid[n.activeIndex + 1] + n.params.spaceBetween : 0) - n.params.spaceBetween : n.minTranslate()) && n.loopFix({
		direction: "prev",
		setTranslate: !0,
		activeSlideIndex: 0
	}), r.currentTranslate > n.minTranslate() && (y = !1, i.resistance && (r.currentTranslate = n.minTranslate() - 1 + (-n.minTranslate() + r.startTranslate + m) ** b))) : m < 0 && (_ && v && r.allowThresholdMove && r.currentTranslate < (i.centeredSlides ? n.maxTranslate() + n.slidesSizesGrid[n.slidesSizesGrid.length - 1] + n.params.spaceBetween + (i.slidesPerView !== "auto" && n.slides.length - i.slidesPerView >= 2 ? n.slidesSizesGrid[n.slidesSizesGrid.length - 1] + n.params.spaceBetween : 0) : n.maxTranslate()) && n.loopFix({
		direction: "next",
		setTranslate: !0,
		activeSlideIndex: n.slides.length - (i.slidesPerView === "auto" ? n.slidesPerViewDynamic() : Math.ceil(parseFloat(i.slidesPerView, 10)))
	}), r.currentTranslate < n.maxTranslate() && (y = !1, i.resistance && (r.currentTranslate = n.maxTranslate() + 1 - (n.maxTranslate() - r.startTranslate - m) ** b))), y && (c.preventedByNestedSwiper = !0), !n.allowSlideNext && n.swipeDirection === "next" && r.currentTranslate < r.startTranslate && (r.currentTranslate = r.startTranslate), !n.allowSlidePrev && n.swipeDirection === "prev" && r.currentTranslate > r.startTranslate && (r.currentTranslate = r.startTranslate), !n.allowSlidePrev && !n.allowSlideNext && (r.currentTranslate = r.startTranslate), i.threshold > 0) if (Math.abs(m) > i.threshold || r.allowThresholdMove) {
		if (!r.allowThresholdMove) {
			r.allowThresholdMove = !0, a.startX = a.currentX, a.startY = a.currentY, r.currentTranslate = r.startTranslate, a.diff = n.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY;
			return;
		}
	} else {
		r.currentTranslate = r.startTranslate;
		return;
	}
	!i.followFinger || i.cssMode || ((i.freeMode && i.freeMode.enabled && n.freeMode || i.watchSlidesProgress) && (n.updateActiveIndex(), n.updateSlidesClasses()), i.freeMode && i.freeMode.enabled && n.freeMode && n.freeMode.onTouchMove(), n.updateProgress(r.currentTranslate), n.setTranslate(r.currentTranslate));
}
function cH(e) {
	let t = this;
	if (t.destroyed) return;
	let n = t.touchEventsData, r = e;
	r.originalEvent && (r = r.originalEvent);
	let i;
	if (!(r.type === "touchend" || r.type === "touchcancel")) {
		if (n.touchId !== null || r.pointerId !== n.pointerId) return;
		i = r;
	} else if (i = [...r.changedTouches].find((e) => e.identifier === n.touchId), !i || i.identifier !== n.touchId) return;
	if ([
		"pointercancel",
		"pointerout",
		"pointerleave",
		"contextmenu"
	].includes(r.type) && !(["pointercancel", "contextmenu"].includes(r.type) && (t.browser.isSafari || t.browser.isWebView))) return;
	n.pointerId = null, n.touchId = null;
	let { params: a, touches: o, rtlTranslate: s, slidesGrid: c, enabled: l } = t;
	if (!l || !a.simulateTouch && r.pointerType === "mouse") return;
	if (n.allowTouchCallbacks && t.emit("touchEnd", r), n.allowTouchCallbacks = !1, !n.isTouched) {
		n.isMoved && a.grabCursor && t.setGrabCursor(!1), n.isMoved = !1, n.startMoving = !1;
		return;
	}
	a.grabCursor && n.isMoved && n.isTouched && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!1);
	let u = NB(), d = u - n.touchStartTime;
	if (t.allowClick) {
		let e = r.path || r.composedPath && r.composedPath();
		t.updateClickedSlide(e && e[0] || r.target, e), t.emit("tap click", r), d < 300 && u - n.lastClickTime < 300 && t.emit("doubleTap doubleClick", r);
	}
	if (n.lastClickTime = NB(), MB(() => {
		t.destroyed || (t.allowClick = !0);
	}), !n.isTouched || !n.isMoved || !t.swipeDirection || o.diff === 0 && !n.loopSwapReset || n.currentTranslate === n.startTranslate && !n.loopSwapReset) {
		n.isTouched = !1, n.isMoved = !1, n.startMoving = !1;
		return;
	}
	n.isTouched = !1, n.isMoved = !1, n.startMoving = !1;
	let f;
	if (f = a.followFinger ? s ? t.translate : -t.translate : -n.currentTranslate, a.cssMode) return;
	if (a.freeMode && a.freeMode.enabled) {
		t.freeMode.onTouchEnd({ currentPos: f });
		return;
	}
	let p = f >= -t.maxTranslate() && !t.params.loop, m = 0, h = t.slidesSizesGrid[0];
	for (let e = 0; e < c.length; e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
		let t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
		c[e + t] === void 0 ? (p || f >= c[e]) && (m = e, h = c[c.length - 1] - c[c.length - 2]) : (p || f >= c[e] && f < c[e + t]) && (m = e, h = c[e + t] - c[e]);
	}
	let g = null, _ = null;
	a.rewind && (t.isBeginning ? _ = a.virtual && a.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (g = 0));
	let v = (f - c[m]) / h, y = m < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
	if (d > a.longSwipesMs) {
		if (!a.longSwipes) {
			t.slideTo(t.activeIndex);
			return;
		}
		t.swipeDirection === "next" && (v >= a.longSwipesRatio ? t.slideTo(a.rewind && t.isEnd ? g : m + y) : t.slideTo(m)), t.swipeDirection === "prev" && (v > 1 - a.longSwipesRatio ? t.slideTo(m + y) : _ !== null && v < 0 && Math.abs(v) > a.longSwipesRatio ? t.slideTo(_) : t.slideTo(m));
	} else {
		if (!a.shortSwipes) {
			t.slideTo(t.activeIndex);
			return;
		}
		t.navigation && (r.target === t.navigation.nextEl || r.target === t.navigation.prevEl) ? r.target === t.navigation.nextEl ? t.slideTo(m + y) : t.slideTo(m) : (t.swipeDirection === "next" && t.slideTo(g === null ? m + y : g), t.swipeDirection === "prev" && t.slideTo(_ === null ? m : _));
	}
}
function lH() {
	let e = this, { params: t, el: n } = e;
	if (n && n.offsetWidth === 0) return;
	t.breakpoints && e.setBreakpoint();
	let { allowSlideNext: r, allowSlidePrev: i, snapGrid: a } = e, o = e.virtual && e.params.virtual.enabled;
	e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
	let s = o && t.loop;
	if ((t.slidesPerView === "auto" || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !s) {
		let t = o ? e.virtual.slides : e.slides;
		e.slideTo(t.length - 1, 0, !1, !0);
	} else e.params.loop && !o ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
	e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), e.autoplay.resizeTimeout = setTimeout(() => {
		e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
	}, 500)), e.allowSlidePrev = i, e.allowSlideNext = r, e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
}
function uH(e) {
	let t = this;
	t.destroyed || t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
function dH() {
	let e = this;
	if (e.destroyed) return;
	let { wrapperEl: t, rtlTranslate: n, enabled: r } = e;
	if (!r) return;
	e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, e.translate === 0 && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
	let i, a = e.maxTranslate() - e.minTranslate();
	i = a === 0 ? 0 : (e.translate - e.minTranslate()) / a, i !== e.progress && e.updateProgress(n ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
}
function fH(e) {
	let t = this;
	t.destroyed || (TV(t, e.target), !(t.params.cssMode || t.params.slidesPerView !== "auto" && !t.params.autoHeight) && t.update());
}
function pH() {
	let e = this;
	e.destroyed || e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
}
var mH = (e, t) => {
	let n = DB(), { params: r, el: i, wrapperEl: a, device: o } = e, s = !!r.nested, c = t === "on" ? "addEventListener" : "removeEventListener", l = t;
	!i || typeof i == "string" || (n[c]("touchstart", e.onDocumentTouchStart, {
		passive: !1,
		capture: s
	}), i[c]("touchstart", e.onTouchStart, { passive: !1 }), i[c]("pointerdown", e.onTouchStart, { passive: !1 }), n[c]("touchmove", e.onTouchMove, {
		passive: !1,
		capture: s
	}), n[c]("pointermove", e.onTouchMove, {
		passive: !1,
		capture: s
	}), n[c]("touchend", e.onTouchEnd, { passive: !0 }), n[c]("pointerup", e.onTouchEnd, { passive: !0 }), n[c]("pointercancel", e.onTouchEnd, { passive: !0 }), n[c]("touchcancel", e.onTouchEnd, { passive: !0 }), n[c]("pointerout", e.onTouchEnd, { passive: !0 }), n[c]("pointerleave", e.onTouchEnd, { passive: !0 }), n[c]("contextmenu", e.onTouchEnd, { passive: !0 }), (r.preventClicks || r.preventClicksPropagation) && i[c]("click", e.onClick, !0), r.cssMode && a[c]("scroll", e.onScroll), r.updateOnWindowResize ? e[l](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", lH, !0) : e[l]("observerUpdate", lH, !0), i[c]("load", e.onLoad, { capture: !0 }));
};
function hH() {
	let e = this, { params: t } = e;
	e.onTouchStart = oH.bind(e), e.onTouchMove = sH.bind(e), e.onTouchEnd = cH.bind(e), e.onDocumentTouchStart = pH.bind(e), t.cssMode && (e.onScroll = dH.bind(e)), e.onClick = uH.bind(e), e.onLoad = fH.bind(e), mH(e, "on");
}
function gH() {
	mH(this, "off");
}
var _H = {
	attachEvents: hH,
	detachEvents: gH
}, vH = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function yH() {
	let e = this, { realIndex: t, initialized: n, params: r, el: i } = e, a = r.breakpoints;
	if (!a || a && Object.keys(a).length === 0) return;
	let o = DB(), s = r.breakpointsBase === "window" || !r.breakpointsBase ? r.breakpointsBase : "container", c = ["window", "container"].includes(r.breakpointsBase) || !r.breakpointsBase ? e.el : o.querySelector(r.breakpointsBase), l = e.getBreakpoint(a, s, c);
	if (!l || e.currentBreakpoint === l) return;
	let u = (l in a ? a[l] : void 0) || e.originalParams, d = vH(e, r), f = vH(e, u), p = e.params.grabCursor, m = u.grabCursor, h = r.enabled;
	d && !f ? (i.classList.remove(`${r.containerModifierClass}grid`, `${r.containerModifierClass}grid-column`), e.emitContainerClasses()) : !d && f && (i.classList.add(`${r.containerModifierClass}grid`), (u.grid.fill && u.grid.fill === "column" || !u.grid.fill && r.grid.fill === "column") && i.classList.add(`${r.containerModifierClass}grid-column`), e.emitContainerClasses()), p && !m ? e.unsetGrabCursor() : !p && m && e.setGrabCursor(), [
		"navigation",
		"pagination",
		"scrollbar"
	].forEach((t) => {
		if (u[t] === void 0) return;
		let n = r[t] && r[t].enabled, i = u[t] && u[t].enabled;
		n && !i && e[t].disable(), !n && i && e[t].enable();
	});
	let g = u.direction && u.direction !== r.direction, _ = r.loop && (u.slidesPerView !== r.slidesPerView || g), v = r.loop;
	g && n && e.changeDirection(), RB(e.params, u);
	let y = e.params.enabled, b = e.params.loop;
	Object.assign(e, {
		allowTouchMove: e.params.allowTouchMove,
		allowSlideNext: e.params.allowSlideNext,
		allowSlidePrev: e.params.allowSlidePrev
	}), h && !y ? e.disable() : !h && y && e.enable(), e.currentBreakpoint = l, e.emit("_beforeBreakpoint", u), n && (_ ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides()) : !v && b ? (e.loopCreate(t), e.updateSlides()) : v && !b && e.loopDestroy()), e.emit("breakpoint", u);
}
function bH(e, t = "window", n) {
	if (!e || t === "container" && !n) return;
	let r = !1, i = kB(), a = t === "window" ? i.innerHeight : n.clientHeight, o = Object.keys(e).map((e) => typeof e == "string" && e.indexOf("@") === 0 ? {
		value: a * parseFloat(e.substr(1)),
		point: e
	} : {
		value: e,
		point: e
	});
	o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
	for (let e = 0; e < o.length; e += 1) {
		let { point: a, value: s } = o[e];
		t === "window" ? i.matchMedia(`(min-width: ${s}px)`).matches && (r = a) : s <= n.clientWidth && (r = a);
	}
	return r || "max";
}
var xH = {
	setBreakpoint: yH,
	getBreakpoint: bH
};
function SH(e, t) {
	let n = [];
	return e.forEach((e) => {
		typeof e == "object" ? Object.keys(e).forEach((r) => {
			e[r] && n.push(t + r);
		}) : typeof e == "string" && n.push(t + e);
	}), n;
}
function CH() {
	let e = this, { classNames: t, params: n, rtl: r, el: i, device: a } = e, o = SH([
		"initialized",
		n.direction,
		{ "free-mode": e.params.freeMode && n.freeMode.enabled },
		{ autoheight: n.autoHeight },
		{ rtl: r },
		{ grid: n.grid && n.grid.rows > 1 },
		{ "grid-column": n.grid && n.grid.rows > 1 && n.grid.fill === "column" },
		{ android: a.android },
		{ ios: a.ios },
		{ "css-mode": n.cssMode },
		{ centered: n.cssMode && n.centeredSlides },
		{ "watch-progress": n.watchSlidesProgress }
	], n.containerModifierClass);
	t.push(...o), i.classList.add(...t), e.emitContainerClasses();
}
function wH() {
	let e = this, { el: t, classNames: n } = e;
	!t || typeof t == "string" || (t.classList.remove(...n), e.emitContainerClasses());
}
var TH = {
	addClasses: CH,
	removeClasses: wH
};
function EH() {
	let e = this, { isLocked: t, params: n } = e, { slidesOffsetBefore: r } = n;
	if (r) {
		let t = e.slides.length - 1, n = e.slidesGrid[t] + e.slidesSizesGrid[t] + r * 2;
		e.isLocked = e.size > n;
	} else e.isLocked = e.snapGrid.length === 1;
	n.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked), n.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var DH = { checkOverflow: EH }, OH = {
	init: !0,
	direction: "horizontal",
	oneWayMovement: !1,
	swiperElementNodeName: "SWIPER-CONTAINER",
	touchEventsTarget: "wrapper",
	initialSlide: 0,
	speed: 300,
	cssMode: !1,
	updateOnWindowResize: !0,
	resizeObserver: !0,
	nested: !1,
	createElements: !1,
	eventsPrefix: "swiper",
	enabled: !0,
	focusableElements: "input, select, option, textarea, button, video, label",
	width: null,
	height: null,
	preventInteractionOnTransition: !1,
	userAgent: null,
	url: null,
	edgeSwipeDetection: !1,
	edgeSwipeThreshold: 20,
	autoHeight: !1,
	setWrapperSize: !1,
	virtualTranslate: !1,
	effect: "slide",
	breakpoints: void 0,
	breakpointsBase: "window",
	spaceBetween: 0,
	slidesPerView: 1,
	slidesPerGroup: 1,
	slidesPerGroupSkip: 0,
	slidesPerGroupAuto: !1,
	centeredSlides: !1,
	centeredSlidesBounds: !1,
	slidesOffsetBefore: 0,
	slidesOffsetAfter: 0,
	normalizeSlideIndex: !0,
	centerInsufficientSlides: !1,
	snapToSlideEdge: !1,
	watchOverflow: !0,
	roundLengths: !1,
	touchRatio: 1,
	touchAngle: 45,
	simulateTouch: !0,
	shortSwipes: !0,
	longSwipes: !0,
	longSwipesRatio: .5,
	longSwipesMs: 300,
	followFinger: !0,
	allowTouchMove: !0,
	threshold: 5,
	touchMoveStopPropagation: !1,
	touchStartPreventDefault: !0,
	touchStartForcePreventDefault: !1,
	touchReleaseOnEdges: !1,
	uniqueNavElements: !0,
	resistance: !0,
	resistanceRatio: .85,
	watchSlidesProgress: !1,
	grabCursor: !1,
	preventClicks: !0,
	preventClicksPropagation: !0,
	slideToClickedSlide: !1,
	loop: !1,
	loopAddBlankSlides: !0,
	loopAdditionalSlides: 0,
	loopPreventsSliding: !0,
	rewind: !1,
	allowSlidePrev: !0,
	allowSlideNext: !0,
	swipeHandler: null,
	noSwiping: !0,
	noSwipingClass: "swiper-no-swiping",
	noSwipingSelector: null,
	passiveListeners: !0,
	maxBackfaceHiddenSlides: 10,
	containerModifierClass: "swiper-",
	slideClass: "swiper-slide",
	slideBlankClass: "swiper-slide-blank",
	slideActiveClass: "swiper-slide-active",
	slideVisibleClass: "swiper-slide-visible",
	slideFullyVisibleClass: "swiper-slide-fully-visible",
	slideNextClass: "swiper-slide-next",
	slidePrevClass: "swiper-slide-prev",
	wrapperClass: "swiper-wrapper",
	lazyPreloaderClass: "swiper-lazy-preloader",
	lazyPreloadPrevNext: 0,
	runCallbacksOnInit: !0,
	_emitClasses: !1
};
function kH(e, t) {
	return function(n = {}) {
		let r = Object.keys(n)[0], i = n[r];
		if (typeof i != "object" || !i) {
			RB(t, n);
			return;
		}
		if (e[r] === !0 && (e[r] = { enabled: !0 }), r === "navigation" && e[r] && e[r].enabled && !e[r].prevEl && !e[r].nextEl && (e[r].auto = !0), ["pagination", "scrollbar"].indexOf(r) >= 0 && e[r] && e[r].enabled && !e[r].el && (e[r].auto = !0), !(r in e && "enabled" in i)) {
			RB(t, n);
			return;
		}
		typeof e[r] == "object" && !("enabled" in e[r]) && (e[r].enabled = !0), e[r] || (e[r] = { enabled: !1 }), RB(t, n);
	};
}
var AH = {
	eventsEmitter: hV,
	update: jV,
	translate: LV,
	transition: HV,
	slide: XV,
	loop: eH,
	grabCursor: rH,
	events: _H,
	breakpoints: xH,
	checkOverflow: DH,
	classes: TH
}, jH = {}, MH = class e {
	constructor(...t) {
		let n, r;
		t.length === 1 && t[0].constructor && Object.prototype.toString.call(t[0]).slice(8, -1) === "Object" ? r = t[0] : [n, r] = t, r ||= {}, r = RB({}, r), n && !r.el && (r.el = n);
		let i = DB();
		if (r.el && typeof r.el == "string" && i.querySelectorAll(r.el).length > 1) {
			let t = [];
			return i.querySelectorAll(r.el).forEach((n) => {
				let i = RB({}, r, { el: n });
				t.push(new e(i));
			}), t;
		}
		let a = this;
		a.__swiper__ = !0, a.support = oV(), a.device = lV({ userAgent: r.userAgent }), a.browser = fV(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [...a.__modules__], r.modules && Array.isArray(r.modules) && r.modules.forEach((e) => {
			typeof e == "function" && a.modules.indexOf(e) < 0 && a.modules.push(e);
		});
		let o = {};
		return a.modules.forEach((e) => {
			e({
				params: r,
				swiper: a,
				extendParams: kH(r, o),
				on: a.on.bind(a),
				once: a.once.bind(a),
				off: a.off.bind(a),
				emit: a.emit.bind(a)
			});
		}), a.params = RB({}, RB({}, OH, o), jH, r), a.originalParams = RB({}, a.params), a.passedParams = RB({}, r), a.params && a.params.on && Object.keys(a.params.on).forEach((e) => {
			a.on(e, a.params.on[e]);
		}), a.params && a.params.onAny && a.onAny(a.params.onAny), Object.assign(a, {
			enabled: a.params.enabled,
			el: n,
			classNames: [],
			slides: [],
			slidesGrid: [],
			snapGrid: [],
			slidesSizesGrid: [],
			isHorizontal() {
				return a.params.direction === "horizontal";
			},
			isVertical() {
				return a.params.direction === "vertical";
			},
			activeIndex: 0,
			realIndex: 0,
			isBeginning: !0,
			isEnd: !1,
			translate: 0,
			previousTranslate: 0,
			progress: 0,
			velocity: 0,
			animating: !1,
			cssOverflowAdjustment() {
				return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
			},
			allowSlideNext: a.params.allowSlideNext,
			allowSlidePrev: a.params.allowSlidePrev,
			touchEventsData: {
				isTouched: void 0,
				isMoved: void 0,
				allowTouchCallbacks: void 0,
				touchStartTime: void 0,
				isScrolling: void 0,
				currentTranslate: void 0,
				startTranslate: void 0,
				allowThresholdMove: void 0,
				focusableElements: a.params.focusableElements,
				lastClickTime: 0,
				clickTimeout: void 0,
				velocities: [],
				allowMomentumBounce: void 0,
				startMoving: void 0,
				pointerId: null,
				touchId: null
			},
			allowClick: !0,
			allowTouchMove: a.params.allowTouchMove,
			touches: {
				startX: 0,
				startY: 0,
				currentX: 0,
				currentY: 0,
				diff: 0
			},
			imagesToLoad: [],
			imagesLoaded: 0
		}), a.emit("_swiper"), a.params.init && a.init(), a;
	}
	getDirectionLabel(e) {
		return this.isHorizontal() ? e : {
			width: "height",
			"margin-top": "margin-left",
			"margin-bottom ": "margin-right",
			"margin-left": "margin-top",
			"margin-right": "margin-bottom",
			"padding-left": "padding-top",
			"padding-right": "padding-bottom",
			marginRight: "marginBottom"
		}[e];
	}
	getSlideIndex(e) {
		let { slidesEl: t, params: n } = this, r = ZB(HB(t, `.${n.slideClass}, swiper-slide`)[0]);
		return ZB(e) - r;
	}
	getSlideIndexByData(e) {
		return this.getSlideIndex(this.slides.find((t) => t.getAttribute("data-swiper-slide-index") * 1 === e));
	}
	getSlideIndexWhenGrid(e) {
		return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? e = Math.floor(e / this.params.grid.rows) : this.params.grid.fill === "row" && (e %= Math.ceil(this.slides.length / this.params.grid.rows))), e;
	}
	recalcSlides() {
		let e = this, { slidesEl: t, params: n } = e;
		e.slides = HB(t, `.${n.slideClass}, swiper-slide`);
	}
	enable() {
		let e = this;
		e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
	}
	disable() {
		let e = this;
		e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
	}
	setProgress(e, t) {
		let n = this;
		e = Math.min(Math.max(e, 0), 1);
		let r = n.minTranslate(), i = (n.maxTranslate() - r) * e + r;
		n.translateTo(i, t === void 0 ? 0 : t), n.updateActiveIndex(), n.updateSlidesClasses();
	}
	emitContainerClasses() {
		let e = this;
		if (!e.params._emitClasses || !e.el) return;
		let t = e.el.className.split(" ").filter((t) => t.indexOf("swiper") === 0 || t.indexOf(e.params.containerModifierClass) === 0);
		e.emit("_containerClasses", t.join(" "));
	}
	getSlideClasses(e) {
		let t = this;
		return t.destroyed ? "" : e.className.split(" ").filter((e) => e.indexOf("swiper-slide") === 0 || e.indexOf(t.params.slideClass) === 0).join(" ");
	}
	emitSlidesClasses() {
		let e = this;
		if (!e.params._emitClasses || !e.el) return;
		let t = [];
		e.slides.forEach((n) => {
			let r = e.getSlideClasses(n);
			t.push({
				slideEl: n,
				classNames: r
			}), e.emit("_slideClass", n, r);
		}), e.emit("_slideClasses", t);
	}
	slidesPerViewDynamic(e = "current", t = !1) {
		let { params: n, slides: r, slidesGrid: i, slidesSizesGrid: a, size: o, activeIndex: s } = this, c = 1;
		if (typeof n.slidesPerView == "number") return n.slidesPerView;
		if (n.centeredSlides) {
			let e = r[s] ? Math.ceil(r[s].swiperSlideSize) : 0, t;
			for (let n = s + 1; n < r.length; n += 1) r[n] && !t && (e += Math.ceil(r[n].swiperSlideSize), c += 1, e > o && (t = !0));
			for (let n = s - 1; n >= 0; --n) r[n] && !t && (e += r[n].swiperSlideSize, c += 1, e > o && (t = !0));
		} else if (e === "current") for (let e = s + 1; e < r.length; e += 1) (t ? i[e] + a[e] - i[s] < o : i[e] - i[s] < o) && (c += 1);
		else for (let e = s - 1; e >= 0; --e) i[s] - i[e] < o && (c += 1);
		return c;
	}
	update() {
		let e = this;
		if (!e || e.destroyed) return;
		let { snapGrid: t, params: n } = e;
		n.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll("[loading=\"lazy\"]")].forEach((t) => {
			t.complete && TV(e, t);
		}), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses();
		function r() {
			let t = e.rtlTranslate ? e.translate * -1 : e.translate, n = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
			e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses();
		}
		let i;
		if (n.freeMode && n.freeMode.enabled && !n.cssMode) r(), n.autoHeight && e.updateAutoHeight();
		else {
			if ((n.slidesPerView === "auto" || n.slidesPerView > 1) && e.isEnd && !n.centeredSlides) {
				let t = e.virtual && n.virtual.enabled ? e.virtual.slides : e.slides;
				i = e.slideTo(t.length - 1, 0, !1, !0);
			} else i = e.slideTo(e.activeIndex, 0, !1, !0);
			i || r();
		}
		n.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
	}
	changeDirection(e, t = !0) {
		let n = this, r = n.params.direction;
		return e ||= r === "horizontal" ? "vertical" : "horizontal", e === r || e !== "horizontal" && e !== "vertical" ? n : (n.el.classList.remove(`${n.params.containerModifierClass}${r}`), n.el.classList.add(`${n.params.containerModifierClass}${e}`), n.emitContainerClasses(), n.params.direction = e, n.slides.forEach((t) => {
			e === "vertical" ? t.style.width = "" : t.style.height = "";
		}), n.emit("changeDirection"), t && n.update(), n);
	}
	changeLanguageDirection(e) {
		let t = this;
		t.rtl && e === "rtl" || !t.rtl && e === "ltr" || (t.rtl = e === "rtl", t.rtlTranslate = t.params.direction === "horizontal" && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update());
	}
	mount(e) {
		let t = this;
		if (t.mounted) return !0;
		let n = e || t.params.el;
		if (typeof n == "string" && (n = document.querySelector(n)), !n) return !1;
		n.swiper = t, n.parentNode && n.parentNode.host && n.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
		let r = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`, i = n && n.shadowRoot && n.shadowRoot.querySelector ? n.shadowRoot.querySelector(r()) : HB(n, r())[0];
		return !i && t.params.createElements && (i = KB("div", t.params.wrapperClass), n.append(i), HB(n, `.${t.params.slideClass}`).forEach((e) => {
			i.append(e);
		})), Object.assign(t, {
			el: n,
			wrapperEl: i,
			slidesEl: t.isElement && !n.parentNode.host.slideSlots ? n.parentNode.host : i,
			hostEl: t.isElement ? n.parentNode.host : n,
			mounted: !0,
			rtl: n.dir.toLowerCase() === "rtl" || XB(n, "direction") === "rtl",
			rtlTranslate: t.params.direction === "horizontal" && (n.dir.toLowerCase() === "rtl" || XB(n, "direction") === "rtl"),
			wrongRTL: XB(i, "display") === "-webkit-box"
		}), !0;
	}
	init(e) {
		let t = this;
		if (t.initialized || t.mount(e) === !1) return t;
		t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(void 0, !0), t.attachEvents();
		let n = [...t.el.querySelectorAll("[loading=\"lazy\"]")];
		return t.isElement && n.push(...t.hostEl.querySelectorAll("[loading=\"lazy\"]")), n.forEach((e) => {
			e.complete ? TV(t, e) : e.addEventListener("load", (e) => {
				TV(t, e.target);
			});
		}), DV(t), t.initialized = !0, DV(t), t.emit("init"), t.emit("afterInit"), t;
	}
	destroy(e = !0, t = !0) {
		let n = this, { params: r, el: i, wrapperEl: a, slides: o } = n;
		return n.params === void 0 || n.destroyed ? null : (n.emit("beforeDestroy"), n.initialized = !1, n.detachEvents(), r.loop && n.loopDestroy(), t && (n.removeClasses(), i && typeof i != "string" && i.removeAttribute("style"), a && a.removeAttribute("style"), o && o.length && o.forEach((e) => {
			e.classList.remove(r.slideVisibleClass, r.slideFullyVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass), e.removeAttribute("style"), e.removeAttribute("data-swiper-slide-index");
		})), n.emit("destroy"), Object.keys(n.eventsListeners).forEach((e) => {
			n.off(e);
		}), e !== !1 && (n.el && typeof n.el != "string" && (n.el.swiper = null), jB(n)), n.destroyed = !0, null);
	}
	static extendDefaults(e) {
		RB(jH, e);
	}
	static get extendedDefaults() {
		return jH;
	}
	static get defaults() {
		return OH;
	}
	static installModule(t) {
		e.prototype.__modules__ || (e.prototype.__modules__ = []);
		let n = e.prototype.__modules__;
		typeof t == "function" && n.indexOf(t) < 0 && n.push(t);
	}
	static use(t) {
		return Array.isArray(t) ? (t.forEach((t) => e.installModule(t)), e) : (e.installModule(t), e);
	}
};
Object.keys(AH).forEach((e) => {
	Object.keys(AH[e]).forEach((t) => {
		MH.prototype[t] = AH[e][t];
	});
}), MH.use([pV, mV]);
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/virtual.mjs
function NH({ swiper: e, extendParams: t, on: n, emit: r }) {
	t({ virtual: {
		enabled: !1,
		slides: [],
		cache: !0,
		slidesPerViewAutoSlideSize: 320,
		renderSlide: null,
		renderExternal: null,
		renderExternalUpdate: !0,
		addSlidesBefore: 0,
		addSlidesAfter: 0
	} });
	let i, a = DB();
	e.virtual = {
		cache: {},
		from: void 0,
		to: void 0,
		slides: [],
		offset: 0,
		slidesGrid: []
	};
	let o = a.createElement("div");
	function s(t, n) {
		let r = e.params.virtual;
		if (r.cache && e.virtual.cache[n]) return e.virtual.cache[n];
		let i;
		return r.renderSlide ? (i = r.renderSlide.call(e, t, n), typeof i == "string" && (rV(o, i), i = o.children[0])) : i = e.isElement ? KB("swiper-slide") : KB("div", e.params.slideClass), i.setAttribute("data-swiper-slide-index", n), r.renderSlide || rV(i, t), r.cache && (e.virtual.cache[n] = i), i;
	}
	function c(t, n, i) {
		let { slidesPerGroup: a, centeredSlides: o, slidesPerView: c, loop: l, initialSlide: u } = e.params;
		if (n && !l && u > 0) return;
		let { addSlidesBefore: d, addSlidesAfter: f, slidesPerViewAutoSlideSize: p } = e.params.virtual, { from: m, to: h, slides: g, slidesGrid: _, offset: v } = e.virtual;
		e.params.cssMode || e.updateActiveIndex();
		let y = i === void 0 ? e.activeIndex || 0 : i, b;
		b = e.rtlTranslate ? "right" : e.isHorizontal() ? "left" : "top";
		let x;
		if (c === "auto") if (p) {
			let t = e.size;
			t ||= e.isHorizontal() ? e.el.getBoundingClientRect().width : e.el.getBoundingClientRect().height, x = Math.max(1, Math.ceil(t / p));
		} else x = 1;
		else x = c;
		let S, C;
		o ? (S = Math.floor(x / 2) + a + f, C = Math.floor(x / 2) + a + d) : (S = x + (a - 1) + f, C = (l ? x : a) + d);
		let w = y - C, T = y + S;
		l || (w = Math.max(w, 0), T = Math.min(T, g.length - 1));
		let E = (e.slidesGrid[w] || 0) - (e.slidesGrid[0] || 0);
		l && y >= C ? (w -= C, o || (E += e.slidesGrid[0])) : l && y < C && (w = -C, o && (E += e.slidesGrid[0])), Object.assign(e.virtual, {
			from: w,
			to: T,
			offset: E,
			slidesGrid: e.slidesGrid,
			slidesBefore: C,
			slidesAfter: S
		});
		function D() {
			e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), r("virtualUpdate");
		}
		if (m === w && h === T && !t) {
			e.slidesGrid !== _ && E !== v && e.slides.forEach((t) => {
				t.style[b] = `${E - Math.abs(e.cssOverflowAdjustment())}px`;
			}), e.updateProgress(), r("virtualUpdate");
			return;
		}
		if (e.params.virtual.renderExternal) {
			e.params.virtual.renderExternal.call(e, {
				offset: E,
				from: w,
				to: T,
				slides: function() {
					let e = [];
					for (let t = w; t <= T; t += 1) e.push(g[t]);
					return e;
				}()
			}), e.params.virtual.renderExternalUpdate ? D() : r("virtualUpdate");
			return;
		}
		let O = [], ee = [], te = (e) => {
			let t = e;
			return e < 0 ? t = g.length + e : t >= g.length && (t -= g.length), t;
		};
		if (t) e.slides.filter((t) => t.matches(`.${e.params.slideClass}, swiper-slide`)).forEach((e) => {
			e.remove();
		});
		else for (let t = m; t <= h; t += 1) if (t < w || t > T) {
			let n = te(t);
			e.slides.filter((t) => t.matches(`.${e.params.slideClass}[data-swiper-slide-index="${n}"], swiper-slide[data-swiper-slide-index="${n}"]`)).forEach((e) => {
				e.remove();
			});
		}
		let k = l ? -g.length : 0, ne = l ? g.length * 2 : g.length;
		for (let e = k; e < ne; e += 1) if (e >= w && e <= T) {
			let n = te(e);
			h === void 0 || t ? ee.push(n) : (e > h && ee.push(n), e < m && O.push(n));
		}
		if (ee.forEach((t) => {
			e.slidesEl.append(s(g[t], t));
		}), l) for (let t = O.length - 1; t >= 0; --t) {
			let n = O[t];
			e.slidesEl.prepend(s(g[n], n));
		}
		else O.sort((e, t) => t - e), O.forEach((t) => {
			e.slidesEl.prepend(s(g[t], t));
		});
		HB(e.slidesEl, ".swiper-slide, swiper-slide").forEach((t) => {
			t.style[b] = `${E - Math.abs(e.cssOverflowAdjustment())}px`;
		}), D();
	}
	function l(t) {
		if (typeof t == "object" && "length" in t) for (let n = 0; n < t.length; n += 1) t[n] && e.virtual.slides.push(t[n]);
		else e.virtual.slides.push(t);
		c(!0);
	}
	function u(t) {
		let n = e.activeIndex, r = n + 1, i = 1;
		if (Array.isArray(t)) {
			for (let n = 0; n < t.length; n += 1) t[n] && e.virtual.slides.unshift(t[n]);
			r = n + t.length, i = t.length;
		} else e.virtual.slides.unshift(t);
		if (e.params.virtual.cache) {
			let t = e.virtual.cache, n = {};
			Object.keys(t).forEach((e) => {
				let r = t[e], a = r.getAttribute("data-swiper-slide-index");
				a && r.setAttribute("data-swiper-slide-index", parseInt(a, 10) + i), n[parseInt(e, 10) + i] = r;
			}), e.virtual.cache = n;
		}
		c(!0), e.slideTo(r, 0);
	}
	function d(t) {
		if (t == null) return;
		let n = e.activeIndex;
		if (Array.isArray(t)) for (let r = t.length - 1; r >= 0; --r) e.params.virtual.cache && (delete e.virtual.cache[t[r]], Object.keys(e.virtual.cache).forEach((n) => {
			n > t && (e.virtual.cache[n - 1] = e.virtual.cache[n], e.virtual.cache[n - 1].setAttribute("data-swiper-slide-index", n - 1), delete e.virtual.cache[n]);
		})), e.virtual.slides.splice(t[r], 1), t[r] < n && --n, n = Math.max(n, 0);
		else e.params.virtual.cache && (delete e.virtual.cache[t], Object.keys(e.virtual.cache).forEach((n) => {
			n > t && (e.virtual.cache[n - 1] = e.virtual.cache[n], e.virtual.cache[n - 1].setAttribute("data-swiper-slide-index", n - 1), delete e.virtual.cache[n]);
		})), e.virtual.slides.splice(t, 1), t < n && --n, n = Math.max(n, 0);
		c(!0), e.slideTo(n, 0);
	}
	function f() {
		e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), c(!0), e.slideTo(0, 0);
	}
	n("beforeInit", () => {
		if (!e.params.virtual.enabled) return;
		let t;
		if (e.passedParams.virtual.slides === void 0) {
			let n = [...e.slidesEl.children].filter((t) => t.matches(`.${e.params.slideClass}, swiper-slide`));
			n && n.length && (e.virtual.slides = [...n], t = !0, n.forEach((t, n) => {
				t.setAttribute("data-swiper-slide-index", n), e.virtual.cache[n] = t, t.remove();
			}));
		}
		t || (e.virtual.slides = e.params.virtual.slides), e.classNames.push(`${e.params.containerModifierClass}virtual`), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0, c(!1, !0);
	}), n("setTranslate", () => {
		e.params.virtual.enabled && (e.params.cssMode && !e._immediateVirtual ? (clearTimeout(i), i = setTimeout(() => {
			c();
		}, 100)) : c());
	}), n("init update resize", () => {
		e.params.virtual.enabled && e.params.cssMode && zB(e.wrapperEl, "--swiper-virtual-size", `${e.virtualSize}px`);
	}), Object.assign(e.virtual, {
		appendSlide: l,
		prependSlide: u,
		removeSlide: d,
		removeAllSlides: f,
		update: c
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/keyboard.mjs
function PH({ swiper: e, extendParams: t, on: n, emit: r }) {
	let i = DB(), a = kB();
	e.keyboard = { enabled: !1 }, t({ keyboard: {
		enabled: !1,
		onlyInViewport: !0,
		pageUpDown: !0,
		speed: void 0
	} });
	function o(t) {
		if (!e.enabled) return;
		let { rtlTranslate: n } = e, o = t;
		o.originalEvent && (o = o.originalEvent);
		let s = o.keyCode || o.charCode, c = e.params.keyboard.pageUpDown, l = c && s === 33, u = c && s === 34, d = s === 37, f = s === 39, p = s === 38, m = s === 40;
		if (!e.allowSlideNext && (e.isHorizontal() && f || e.isVertical() && m || u) || !e.allowSlidePrev && (e.isHorizontal() && d || e.isVertical() && p || l)) return !1;
		if (o.shiftKey || o.altKey || o.ctrlKey || o.metaKey || i.activeElement && (i.activeElement.isContentEditable || i.activeElement.nodeName && (i.activeElement.nodeName.toLowerCase() === "input" || i.activeElement.nodeName.toLowerCase() === "textarea"))) return;
		if (e.params.keyboard.onlyInViewport && (l || u || d || f || p || m)) {
			let t = !1;
			if (QB(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 && QB(e.el, `.${e.params.slideActiveClass}`).length === 0) return;
			let r = e.el, i = r.clientWidth, o = r.clientHeight, s = a.innerWidth, c = a.innerHeight, l = qB(r);
			n && (l.left -= r.scrollLeft);
			let u = [
				[l.left, l.top],
				[l.left + i, l.top],
				[l.left, l.top + o],
				[l.left + i, l.top + o]
			];
			for (let e = 0; e < u.length; e += 1) {
				let n = u[e];
				if (n[0] >= 0 && n[0] <= s && n[1] >= 0 && n[1] <= c) {
					if (n[0] === 0 && n[1] === 0) continue;
					t = !0;
				}
			}
			if (!t) return;
		}
		let h = e.params.keyboard.speed;
		e.isHorizontal() ? ((l || u || d || f) && (o.preventDefault ? o.preventDefault() : o.returnValue = !1), ((u || f) && !n || (l || d) && n) && e.slideNext(h), ((l || d) && !n || (u || f) && n) && e.slidePrev(h)) : ((l || u || p || m) && (o.preventDefault ? o.preventDefault() : o.returnValue = !1), (u || m) && e.slideNext(h), (l || p) && e.slidePrev(h)), r("keyPress", s);
	}
	function s() {
		e.keyboard.enabled || (i.addEventListener("keydown", o), e.keyboard.enabled = !0);
	}
	function c() {
		e.keyboard.enabled && (i.removeEventListener("keydown", o), e.keyboard.enabled = !1);
	}
	n("init", () => {
		e.params.keyboard.enabled && s();
	}), n("destroy", () => {
		e.keyboard.enabled && c();
	}), Object.assign(e.keyboard, {
		enable: s,
		disable: c
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/mousewheel.mjs
function FH({ swiper: e, extendParams: t, on: n, emit: r }) {
	let i = kB();
	t({ mousewheel: {
		enabled: !1,
		releaseOnEdges: !1,
		invert: !1,
		forceToAxis: !1,
		sensitivity: 1,
		eventsTarget: "container",
		thresholdDelta: null,
		thresholdTime: null,
		noMousewheelClass: "swiper-no-mousewheel"
	} }), e.mousewheel = { enabled: !1 };
	let a, o = NB(), s, c = [];
	function l(e) {
		let t = 0, n = 0, r = 0, i = 0;
		return "detail" in e && (n = e.detail), "wheelDelta" in e && (n = -e.wheelDelta / 120), "wheelDeltaY" in e && (n = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = n, n = 0), r = t * 10, i = n * 10, "deltaY" in e && (i = e.deltaY), "deltaX" in e && (r = e.deltaX), e.shiftKey && !r && (r = i, i = 0), (r || i) && e.deltaMode && (e.deltaMode === 1 ? (r *= 40, i *= 40) : (r *= 800, i *= 800)), r && !t && (t = r < 1 ? -1 : 1), i && !n && (n = i < 1 ? -1 : 1), {
			spinX: t,
			spinY: n,
			pixelX: r,
			pixelY: i
		};
	}
	function u() {
		e.enabled && (e.mouseEntered = !0);
	}
	function d() {
		e.enabled && (e.mouseEntered = !1);
	}
	function f(t) {
		return e.params.mousewheel.thresholdDelta && t.delta < e.params.mousewheel.thresholdDelta || e.params.mousewheel.thresholdTime && NB() - o < e.params.mousewheel.thresholdTime ? !1 : t.delta >= 6 && NB() - o < 60 ? !0 : (t.direction < 0 ? (!e.isEnd || e.params.loop) && !e.animating && (e.slideNext(), r("scroll", t.raw)) : (!e.isBeginning || e.params.loop) && !e.animating && (e.slidePrev(), r("scroll", t.raw)), o = new i.Date().getTime(), !1);
	}
	function p(t) {
		let n = e.params.mousewheel;
		if (t.direction < 0) {
			if (e.isEnd && !e.params.loop && n.releaseOnEdges) return !0;
		} else if (e.isBeginning && !e.params.loop && n.releaseOnEdges) return !0;
		return !1;
	}
	function m(t) {
		let n = t, i = !0;
		if (!e.enabled || t.target.closest(`.${e.params.mousewheel.noMousewheelClass}`)) return;
		let o = e.params.mousewheel;
		e.params.cssMode && n.preventDefault();
		let u = e.el;
		e.params.mousewheel.eventsTarget !== "container" && (u = document.querySelector(e.params.mousewheel.eventsTarget));
		let d = u && u.contains(n.target);
		if (!e.mouseEntered && !d && !o.releaseOnEdges) return !0;
		n.originalEvent && (n = n.originalEvent);
		let m = 0, h = e.rtlTranslate ? -1 : 1, g = l(n);
		if (o.forceToAxis) if (e.isHorizontal()) if (Math.abs(g.pixelX) > Math.abs(g.pixelY)) m = -g.pixelX * h;
		else return !0;
		else if (Math.abs(g.pixelY) > Math.abs(g.pixelX)) m = -g.pixelY;
		else return !0;
		else m = Math.abs(g.pixelX) > Math.abs(g.pixelY) ? -g.pixelX * h : -g.pixelY;
		if (m === 0) return !0;
		o.invert && (m = -m);
		let _ = e.getTranslate() + m * o.sensitivity;
		if (_ >= e.minTranslate() && (_ = e.minTranslate()), _ <= e.maxTranslate() && (_ = e.maxTranslate()), i = e.params.loop ? !0 : !(_ === e.minTranslate() || _ === e.maxTranslate()), i && e.params.nested && n.stopPropagation(), !e.params.freeMode || !e.params.freeMode.enabled) {
			let e = {
				time: NB(),
				delta: Math.abs(m),
				direction: Math.sign(m),
				raw: t
			};
			c.length >= 2 && c.shift();
			let n = c.length ? c[c.length - 1] : void 0;
			if (c.push(e), n ? (e.direction !== n.direction || e.delta > n.delta || e.time > n.time + 150) && f(e) : f(e), p(e)) return !0;
		} else {
			let t = {
				time: NB(),
				delta: Math.abs(m),
				direction: Math.sign(m)
			}, i = s && t.time < s.time + 500 && t.delta <= s.delta && t.direction === s.direction;
			if (!i) {
				s = void 0;
				let l = e.getTranslate() + m * o.sensitivity, u = e.isBeginning, d = e.isEnd;
				if (l >= e.minTranslate() && (l = e.minTranslate()), l <= e.maxTranslate() && (l = e.maxTranslate()), e.setTransition(0), e.setTranslate(l), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses(), (!u && e.isBeginning || !d && e.isEnd) && e.updateSlidesClasses(), e.params.loop && e.loopFix({
					direction: t.direction < 0 ? "next" : "prev",
					byMousewheel: !0
				}), e.params.freeMode.sticky) {
					clearTimeout(a), a = void 0, c.length >= 15 && c.shift();
					let n = c.length ? c[c.length - 1] : void 0, r = c[0];
					if (c.push(t), n && (t.delta > n.delta || t.direction !== n.direction)) c.splice(0);
					else if (c.length >= 15 && t.time - r.time < 500 && r.delta - t.delta >= 1 && t.delta <= 6) {
						let n = m > 0 ? .8 : .2;
						s = t, c.splice(0), a = MB(() => {
							e.destroyed || !e.params || e.slideToClosest(e.params.speed, !0, void 0, n);
						}, 0);
					}
					a ||= MB(() => {
						e.destroyed || !e.params || (s = t, c.splice(0), e.slideToClosest(e.params.speed, !0, void 0, .5));
					}, 500);
				}
				if (i || r("scroll", n), e.params.autoplay && e.params.autoplay.disableOnInteraction && e.autoplay.stop(), o.releaseOnEdges && (l === e.minTranslate() || l === e.maxTranslate())) return !0;
			}
		}
		return n.preventDefault ? n.preventDefault() : n.returnValue = !1, !1;
	}
	function h(t) {
		let n = e.el;
		e.params.mousewheel.eventsTarget !== "container" && (n = document.querySelector(e.params.mousewheel.eventsTarget)), n[t]("mouseenter", u), n[t]("mouseleave", d), n[t]("wheel", m);
	}
	function g() {
		return e.params.cssMode ? (e.wrapperEl.removeEventListener("wheel", m), !0) : e.mousewheel.enabled ? !1 : (h("addEventListener"), e.mousewheel.enabled = !0, !0);
	}
	function _() {
		return e.params.cssMode ? (e.wrapperEl.addEventListener(event, m), !0) : e.mousewheel.enabled ? (h("removeEventListener"), e.mousewheel.enabled = !1, !0) : !1;
	}
	n("init", () => {
		!e.params.mousewheel.enabled && e.params.cssMode && _(), e.params.mousewheel.enabled && g();
	}), n("destroy", () => {
		e.params.cssMode && g(), e.mousewheel.enabled && _();
	}), Object.assign(e.mousewheel, {
		enable: g,
		disable: _
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/shared/create-element-if-not-defined.mjs
function IH(e, t, n, r) {
	return e.params.createElements && Object.keys(r).forEach((i) => {
		if (!n[i] && n.auto === !0) {
			let a = HB(e.el, `.${r[i]}`)[0];
			a || (a = KB("div", r[i]), a.className = r[i], e.el.append(a)), n[i] = a, t[i] = a;
		}
	}), n;
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/navigation.mjs
var LH = "<svg class=\"swiper-navigation-icon\" width=\"11\" height=\"20\" viewBox=\"0 0 11 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z\" fill=\"currentColor\"/></svg>";
function RH({ swiper: e, extendParams: t, on: n, emit: r }) {
	t({ navigation: {
		nextEl: null,
		prevEl: null,
		addIcons: !0,
		hideOnClick: !1,
		disabledClass: "swiper-button-disabled",
		hiddenClass: "swiper-button-hidden",
		lockClass: "swiper-button-lock",
		navigationDisabledClass: "swiper-navigation-disabled"
	} }), e.navigation = {
		nextEl: null,
		prevEl: null,
		arrowSvg: LH
	};
	function i(t) {
		let n;
		return t && typeof t == "string" && e.isElement && (n = e.el.querySelector(t) || e.hostEl.querySelector(t), n) ? n : (t && (typeof t == "string" && (n = [...document.querySelectorAll(t)]), e.params.uniqueNavElements && typeof t == "string" && n && n.length > 1 && e.el.querySelectorAll(t).length === 1 ? n = e.el.querySelector(t) : n && n.length === 1 && (n = n[0])), t && !n ? t : n);
	}
	function a(t, n) {
		let r = e.params.navigation;
		t = tV(t), t.forEach((t) => {
			t && (t.classList[n ? "add" : "remove"](...r.disabledClass.split(" ")), t.tagName === "BUTTON" && (t.disabled = n), e.params.watchOverflow && e.enabled && t.classList[e.isLocked ? "add" : "remove"](r.lockClass));
		});
	}
	function o() {
		let { nextEl: t, prevEl: n } = e.navigation;
		if (e.params.loop) {
			a(n, !1), a(t, !1);
			return;
		}
		a(n, e.isBeginning && !e.params.rewind), a(t, e.isEnd && !e.params.rewind);
	}
	function s(t) {
		t.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), r("navigationPrev"));
	}
	function c(t) {
		t.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), r("navigationNext"));
	}
	function l() {
		let t = e.params.navigation;
		if (e.params.navigation = IH(e, e.originalParams.navigation, e.params.navigation, {
			nextEl: "swiper-button-next",
			prevEl: "swiper-button-prev"
		}), !(t.nextEl || t.prevEl)) return;
		let n = i(t.nextEl), r = i(t.prevEl);
		Object.assign(e.navigation, {
			nextEl: n,
			prevEl: r
		}), n = tV(n), r = tV(r);
		let a = (n, r) => {
			if (n) {
				if (t.addIcons && n.matches(".swiper-button-next,.swiper-button-prev") && !n.querySelector("svg")) {
					let e = document.createElement("div");
					rV(e, LH), n.appendChild(e.querySelector("svg")), e.remove();
				}
				n.addEventListener("click", r === "next" ? c : s);
			}
			!e.enabled && n && n.classList.add(...t.lockClass.split(" "));
		};
		n.forEach((e) => a(e, "next")), r.forEach((e) => a(e, "prev"));
	}
	function u() {
		let { nextEl: t, prevEl: n } = e.navigation;
		t = tV(t), n = tV(n);
		let r = (t, n) => {
			t.removeEventListener("click", n === "next" ? c : s), t.classList.remove(...e.params.navigation.disabledClass.split(" "));
		};
		t.forEach((e) => r(e, "next")), n.forEach((e) => r(e, "prev"));
	}
	n("init", () => {
		e.params.navigation.enabled === !1 ? f() : (l(), o());
	}), n("toEdge fromEdge lock unlock", () => {
		o();
	}), n("destroy", () => {
		u();
	}), n("enable disable", () => {
		let { nextEl: t, prevEl: n } = e.navigation;
		if (t = tV(t), n = tV(n), e.enabled) {
			o();
			return;
		}
		[...t, ...n].filter((e) => !!e).forEach((t) => t.classList.add(e.params.navigation.lockClass));
	}), n("click", (t, n) => {
		let { nextEl: i, prevEl: a } = e.navigation;
		i = tV(i), a = tV(a);
		let o = n.target, s = a.includes(o) || i.includes(o);
		if (e.isElement && !s) {
			let e = n.path || n.composedPath && n.composedPath();
			e && (s = e.find((e) => i.includes(e) || a.includes(e)));
		}
		if (e.params.navigation.hideOnClick && !s) {
			if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === o || e.pagination.el.contains(o))) return;
			let t;
			i.length ? t = i[0].classList.contains(e.params.navigation.hiddenClass) : a.length && (t = a[0].classList.contains(e.params.navigation.hiddenClass)), r(t === !0 ? "navigationShow" : "navigationHide"), [...i, ...a].filter((e) => !!e).forEach((t) => t.classList.toggle(e.params.navigation.hiddenClass));
		}
	});
	let d = () => {
		e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")), l(), o();
	}, f = () => {
		e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")), u();
	};
	Object.assign(e.navigation, {
		enable: d,
		disable: f,
		update: o,
		init: l,
		destroy: u
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/shared/classes-to-selector.mjs
function zH(e = "") {
	return `.${e.trim().replace(/([\.:!+\/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1").replace(/ /g, ".")}`;
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/pagination.mjs
function BH({ swiper: e, extendParams: t, on: n, emit: r }) {
	let i = "swiper-pagination";
	t({ pagination: {
		el: null,
		bulletElement: "span",
		clickable: !1,
		hideOnClick: !1,
		renderBullet: null,
		renderProgressbar: null,
		renderFraction: null,
		renderCustom: null,
		progressbarOpposite: !1,
		type: "bullets",
		dynamicBullets: !1,
		dynamicMainBullets: 1,
		formatFractionCurrent: (e) => e,
		formatFractionTotal: (e) => e,
		bulletClass: `${i}-bullet`,
		bulletActiveClass: `${i}-bullet-active`,
		modifierClass: `${i}-`,
		currentClass: `${i}-current`,
		totalClass: `${i}-total`,
		hiddenClass: `${i}-hidden`,
		progressbarFillClass: `${i}-progressbar-fill`,
		progressbarOppositeClass: `${i}-progressbar-opposite`,
		clickableClass: `${i}-clickable`,
		lockClass: `${i}-lock`,
		horizontalClass: `${i}-horizontal`,
		verticalClass: `${i}-vertical`,
		paginationDisabledClass: `${i}-disabled`
	} }), e.pagination = {
		el: null,
		bullets: []
	};
	let a, o = 0;
	function s() {
		return !e.params.pagination.el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0;
	}
	function c(t, n) {
		let { bulletActiveClass: r } = e.params.pagination;
		t && (t = t[`${n === "prev" ? "previous" : "next"}ElementSibling`], t && (t.classList.add(`${r}-${n}`), t = t[`${n === "prev" ? "previous" : "next"}ElementSibling`], t && t.classList.add(`${r}-${n}-${n}`)));
	}
	function l(e, t, n) {
		if (e %= n, t %= n, t === e + 1) return "next";
		if (t === e - 1) return "previous";
	}
	function u(t) {
		let n = t.target.closest(zH(e.params.pagination.bulletClass));
		if (!n) return;
		t.preventDefault();
		let r = ZB(n) * e.params.slidesPerGroup;
		if (e.params.loop) {
			if (e.realIndex === r) return;
			let t = l(e.realIndex, r, e.slides.length);
			t === "next" ? e.slideNext() : t === "previous" ? e.slidePrev() : e.slideToLoop(r);
		} else e.slideTo(r);
	}
	function d() {
		let t = e.rtl, n = e.params.pagination;
		if (s()) return;
		let i = e.pagination.el;
		i = tV(i);
		let l, u, d = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, f = e.params.loop ? Math.ceil(d / e.params.slidesPerGroup) : e.snapGrid.length;
		if (e.params.loop ? (u = e.previousRealIndex || 0, l = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex) : e.snapIndex === void 0 ? (u = e.previousIndex || 0, l = e.activeIndex || 0) : (l = e.snapIndex, u = e.previousSnapIndex), n.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
			let r = e.pagination.bullets, s, d, f;
			if (n.dynamicBullets && (a = eV(r[0], e.isHorizontal() ? "width" : "height", !0), i.forEach((t) => {
				t.style[e.isHorizontal() ? "width" : "height"] = `${a * (n.dynamicMainBullets + 4)}px`;
			}), n.dynamicMainBullets > 1 && u !== void 0 && (o += l - (u || 0), o > n.dynamicMainBullets - 1 ? o = n.dynamicMainBullets - 1 : o < 0 && (o = 0)), s = Math.max(l - o, 0), d = s + (Math.min(r.length, n.dynamicMainBullets) - 1), f = (d + s) / 2), r.forEach((e) => {
				let t = [...[
					"",
					"-next",
					"-next-next",
					"-prev",
					"-prev-prev",
					"-main"
				].map((e) => `${n.bulletActiveClass}${e}`)].map((e) => typeof e == "string" && e.includes(" ") ? e.split(" ") : e).flat();
				e.classList.remove(...t);
			}), i.length > 1) r.forEach((t) => {
				let r = ZB(t);
				r === l ? t.classList.add(...n.bulletActiveClass.split(" ")) : e.isElement && t.setAttribute("part", "bullet"), n.dynamicBullets && (r >= s && r <= d && t.classList.add(...`${n.bulletActiveClass}-main`.split(" ")), r === s && c(t, "prev"), r === d && c(t, "next"));
			});
			else {
				let t = r[l];
				if (t && t.classList.add(...n.bulletActiveClass.split(" ")), e.isElement && r.forEach((e, t) => {
					e.setAttribute("part", t === l ? "bullet-active" : "bullet");
				}), n.dynamicBullets) {
					let e = r[s], t = r[d];
					for (let e = s; e <= d; e += 1) r[e] && r[e].classList.add(...`${n.bulletActiveClass}-main`.split(" "));
					c(e, "prev"), c(t, "next");
				}
			}
			if (n.dynamicBullets) {
				let i = Math.min(r.length, n.dynamicMainBullets + 4), o = (a * i - a) / 2 - f * a, s = t ? "right" : "left";
				r.forEach((t) => {
					t.style[e.isHorizontal() ? s : "top"] = `${o}px`;
				});
			}
		}
		i.forEach((t, i) => {
			if (n.type === "fraction" && (t.querySelectorAll(zH(n.currentClass)).forEach((e) => {
				e.textContent = n.formatFractionCurrent(l + 1);
			}), t.querySelectorAll(zH(n.totalClass)).forEach((e) => {
				e.textContent = n.formatFractionTotal(f);
			})), n.type === "progressbar") {
				let r;
				r = n.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
				let i = (l + 1) / f, a = 1, o = 1;
				r === "horizontal" ? a = i : o = i, t.querySelectorAll(zH(n.progressbarFillClass)).forEach((t) => {
					t.style.transform = `translate3d(0,0,0) scaleX(${a}) scaleY(${o})`, t.style.transitionDuration = `${e.params.speed}ms`;
				});
			}
			n.type === "custom" && n.renderCustom ? (rV(t, n.renderCustom(e, l + 1, f)), i === 0 && r("paginationRender", t)) : (i === 0 && r("paginationRender", t), r("paginationUpdate", t)), e.params.watchOverflow && e.enabled && t.classList[e.isLocked ? "add" : "remove"](n.lockClass);
		});
	}
	function f() {
		let t = e.params.pagination;
		if (s()) return;
		let n = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.grid && e.params.grid.rows > 1 ? e.slides.length / Math.ceil(e.params.grid.rows) : e.slides.length, i = e.pagination.el;
		i = tV(i);
		let a = "";
		if (t.type === "bullets") {
			let r = e.params.loop ? Math.ceil(n / e.params.slidesPerGroup) : e.snapGrid.length;
			e.params.freeMode && e.params.freeMode.enabled && r > n && (r = n);
			for (let n = 0; n < r; n += 1) t.renderBullet ? a += t.renderBullet.call(e, n, t.bulletClass) : a += `<${t.bulletElement} ${e.isElement ? "part=\"bullet\"" : ""} class="${t.bulletClass}"></${t.bulletElement}>`;
		}
		t.type === "fraction" && (a = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`), t.type === "progressbar" && (a = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : `<span class="${t.progressbarFillClass}"></span>`), e.pagination.bullets = [], i.forEach((n) => {
			t.type !== "custom" && rV(n, a || ""), t.type === "bullets" && e.pagination.bullets.push(...n.querySelectorAll(zH(t.bulletClass)));
		}), t.type !== "custom" && r("paginationRender", i[0]);
	}
	function p() {
		e.params.pagination = IH(e, e.originalParams.pagination, e.params.pagination, { el: "swiper-pagination" });
		let t = e.params.pagination;
		if (!t.el) return;
		let n;
		typeof t.el == "string" && e.isElement && (n = e.el.querySelector(t.el)), !n && typeof t.el == "string" && (n = [...document.querySelectorAll(t.el)]), n ||= t.el, !(!n || n.length === 0) && (e.params.uniqueNavElements && typeof t.el == "string" && Array.isArray(n) && n.length > 1 && (n = [...e.el.querySelectorAll(t.el)], n.length > 1 && (n = n.find((t) => QB(t, ".swiper")[0] === e.el))), Array.isArray(n) && n.length === 1 && (n = n[0]), Object.assign(e.pagination, { el: n }), n = tV(n), n.forEach((n) => {
			t.type === "bullets" && t.clickable && n.classList.add(...(t.clickableClass || "").split(" ")), n.classList.add(t.modifierClass + t.type), n.classList.add(e.isHorizontal() ? t.horizontalClass : t.verticalClass), t.type === "bullets" && t.dynamicBullets && (n.classList.add(`${t.modifierClass}${t.type}-dynamic`), o = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), t.type === "progressbar" && t.progressbarOpposite && n.classList.add(t.progressbarOppositeClass), t.clickable && n.addEventListener("click", u), e.enabled || n.classList.add(t.lockClass);
		}));
	}
	function m() {
		let t = e.params.pagination;
		if (s()) return;
		let n = e.pagination.el;
		n && (n = tV(n), n.forEach((n) => {
			n.classList.remove(t.hiddenClass), n.classList.remove(t.modifierClass + t.type), n.classList.remove(e.isHorizontal() ? t.horizontalClass : t.verticalClass), t.clickable && (n.classList.remove(...(t.clickableClass || "").split(" ")), n.removeEventListener("click", u));
		})), e.pagination.bullets && e.pagination.bullets.forEach((e) => e.classList.remove(...t.bulletActiveClass.split(" ")));
	}
	n("changeDirection", () => {
		if (!e.pagination || !e.pagination.el) return;
		let t = e.params.pagination, { el: n } = e.pagination;
		n = tV(n), n.forEach((n) => {
			n.classList.remove(t.horizontalClass, t.verticalClass), n.classList.add(e.isHorizontal() ? t.horizontalClass : t.verticalClass);
		});
	}), n("init", () => {
		e.params.pagination.enabled === !1 ? g() : (p(), f(), d());
	}), n("activeIndexChange", () => {
		e.snapIndex === void 0 && d();
	}), n("snapIndexChange", () => {
		d();
	}), n("snapGridLengthChange", () => {
		f(), d();
	}), n("destroy", () => {
		m();
	}), n("enable disable", () => {
		let { el: t } = e.pagination;
		t && (t = tV(t), t.forEach((t) => t.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)));
	}), n("lock unlock", () => {
		d();
	}), n("click", (t, n) => {
		let i = n.target, a = tV(e.pagination.el);
		if (e.params.pagination.el && e.params.pagination.hideOnClick && a && a.length > 0 && !i.classList.contains(e.params.pagination.bulletClass)) {
			if (e.navigation && (e.navigation.nextEl && i === e.navigation.nextEl || e.navigation.prevEl && i === e.navigation.prevEl)) return;
			a[0].classList.contains(e.params.pagination.hiddenClass) === !0 ? r("paginationShow") : r("paginationHide"), a.forEach((t) => t.classList.toggle(e.params.pagination.hiddenClass));
		}
	});
	let h = () => {
		e.el.classList.remove(e.params.pagination.paginationDisabledClass);
		let { el: t } = e.pagination;
		t && (t = tV(t), t.forEach((t) => t.classList.remove(e.params.pagination.paginationDisabledClass))), p(), f(), d();
	}, g = () => {
		e.el.classList.add(e.params.pagination.paginationDisabledClass);
		let { el: t } = e.pagination;
		t && (t = tV(t), t.forEach((t) => t.classList.add(e.params.pagination.paginationDisabledClass))), m();
	};
	Object.assign(e.pagination, {
		enable: h,
		disable: g,
		render: f,
		update: d,
		init: p,
		destroy: m
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/scrollbar.mjs
function VH({ swiper: e, extendParams: t, on: n, emit: r }) {
	let i = DB(), a = !1, o = null, s = null, c, l, u, d;
	t({ scrollbar: {
		el: null,
		dragSize: "auto",
		hide: !1,
		draggable: !1,
		snapOnRelease: !0,
		lockClass: "swiper-scrollbar-lock",
		dragClass: "swiper-scrollbar-drag",
		scrollbarDisabledClass: "swiper-scrollbar-disabled",
		horizontalClass: "swiper-scrollbar-horizontal",
		verticalClass: "swiper-scrollbar-vertical"
	} }), e.scrollbar = {
		el: null,
		dragEl: null
	};
	function f() {
		if (!e.params.scrollbar.el || !e.scrollbar.el) return;
		let { scrollbar: t, rtlTranslate: n } = e, { dragEl: r, el: i } = t, a = e.params.scrollbar, s = e.params.loop ? e.progressLoop : e.progress, c = l, d = (u - l) * s;
		n ? (d = -d, d > 0 ? (c = l - d, d = 0) : -d + l > u && (c = u + d)) : d < 0 ? (c = l + d, d = 0) : d + l > u && (c = u - d), e.isHorizontal() ? (r.style.transform = `translate3d(${d}px, 0, 0)`, r.style.width = `${c}px`) : (r.style.transform = `translate3d(0px, ${d}px, 0)`, r.style.height = `${c}px`), a.hide && (clearTimeout(o), i.style.opacity = 1, o = setTimeout(() => {
			i.style.opacity = 0, i.style.transitionDuration = "400ms";
		}, 1e3));
	}
	function p(t) {
		!e.params.scrollbar.el || !e.scrollbar.el || (e.scrollbar.dragEl.style.transitionDuration = `${t}ms`);
	}
	function m() {
		if (!e.params.scrollbar.el || !e.scrollbar.el) return;
		let { scrollbar: t } = e, { dragEl: n, el: r } = t;
		n.style.width = "", n.style.height = "", u = e.isHorizontal() ? r.offsetWidth : r.offsetHeight, d = e.size / (e.virtualSize + e.params.slidesOffsetBefore - (e.params.centeredSlides ? e.snapGrid[0] : 0)), l = e.params.scrollbar.dragSize === "auto" ? u * d : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? n.style.width = `${l}px` : n.style.height = `${l}px`, d >= 1 ? r.style.display = "none" : r.style.display = "", e.params.scrollbar.hide && (r.style.opacity = 0), e.params.watchOverflow && e.enabled && t.el.classList[e.isLocked ? "add" : "remove"](e.params.scrollbar.lockClass);
	}
	function h(t) {
		return e.isHorizontal() ? t.clientX : t.clientY;
	}
	function g(t) {
		let { scrollbar: n, rtlTranslate: r } = e, { el: i } = n, a;
		a = (h(t) - qB(i)[e.isHorizontal() ? "left" : "top"] - (c === null ? l / 2 : c)) / (u - l), a = Math.max(Math.min(a, 1), 0), r && (a = 1 - a);
		let o = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * a;
		e.updateProgress(o), e.setTranslate(o), e.updateActiveIndex(), e.updateSlidesClasses();
	}
	function _(t) {
		let n = e.params.scrollbar, { scrollbar: i, wrapperEl: o } = e, { el: l, dragEl: u } = i;
		a = !0, c = t.target === u ? h(t) - t.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"] : null, t.preventDefault(), t.stopPropagation(), o.style.transitionDuration = "100ms", u.style.transitionDuration = "100ms", g(t), clearTimeout(s), l.style.transitionDuration = "0ms", n.hide && (l.style.opacity = 1), e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "none"), r("scrollbarDragStart", t);
	}
	function v(t) {
		let { scrollbar: n, wrapperEl: i } = e, { el: o, dragEl: s } = n;
		a && (t.preventDefault && t.cancelable ? t.preventDefault() : t.returnValue = !1, g(t), i.style.transitionDuration = "0ms", o.style.transitionDuration = "0ms", s.style.transitionDuration = "0ms", r("scrollbarDragMove", t));
	}
	function y(t) {
		let n = e.params.scrollbar, { scrollbar: i, wrapperEl: o } = e, { el: c } = i;
		a && (a = !1, e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "", o.style.transitionDuration = ""), n.hide && (clearTimeout(s), s = MB(() => {
			c.style.opacity = 0, c.style.transitionDuration = "400ms";
		}, 1e3)), r("scrollbarDragEnd", t), n.snapOnRelease && e.slideToClosest());
	}
	function b(t) {
		let { scrollbar: n, params: r } = e, a = n.el;
		if (!a) return;
		let o = a, s = r.passiveListeners ? {
			passive: !1,
			capture: !1
		} : !1, c = r.passiveListeners ? {
			passive: !0,
			capture: !1
		} : !1;
		if (!o) return;
		let l = t === "on" ? "addEventListener" : "removeEventListener";
		o[l]("pointerdown", _, s), i[l]("pointermove", v, s), i[l]("pointerup", y, c);
	}
	function x() {
		!e.params.scrollbar.el || !e.scrollbar.el || b("on");
	}
	function S() {
		!e.params.scrollbar.el || !e.scrollbar.el || b("off");
	}
	function C() {
		let { scrollbar: t, el: n } = e;
		e.params.scrollbar = IH(e, e.originalParams.scrollbar, e.params.scrollbar, { el: "swiper-scrollbar" });
		let r = e.params.scrollbar;
		if (!r.el) return;
		let a;
		if (typeof r.el == "string" && e.isElement && (a = e.el.querySelector(r.el)), !a && typeof r.el == "string") {
			if (a = i.querySelectorAll(r.el), !a.length) return;
		} else a ||= r.el;
		e.params.uniqueNavElements && typeof r.el == "string" && a.length > 1 && n.querySelectorAll(r.el).length === 1 && (a = n.querySelector(r.el)), a.length > 0 && (a = a[0]), a.classList.add(e.isHorizontal() ? r.horizontalClass : r.verticalClass);
		let o;
		a && (o = a.querySelector(zH(e.params.scrollbar.dragClass)), o || (o = KB("div", e.params.scrollbar.dragClass), a.append(o))), Object.assign(t, {
			el: a,
			dragEl: o
		}), r.draggable && x(), a && a.classList[e.enabled ? "remove" : "add"](...AB(e.params.scrollbar.lockClass));
	}
	function w() {
		let t = e.params.scrollbar, n = e.scrollbar.el;
		n && n.classList.remove(...AB(e.isHorizontal() ? t.horizontalClass : t.verticalClass)), S();
	}
	n("changeDirection", () => {
		if (!e.scrollbar || !e.scrollbar.el) return;
		let t = e.params.scrollbar, { el: n } = e.scrollbar;
		n = tV(n), n.forEach((n) => {
			n.classList.remove(t.horizontalClass, t.verticalClass), n.classList.add(e.isHorizontal() ? t.horizontalClass : t.verticalClass);
		});
	}), n("init", () => {
		e.params.scrollbar.enabled === !1 ? E() : (C(), m(), f());
	}), n("update resize observerUpdate lock unlock changeDirection", () => {
		m();
	}), n("setTranslate", () => {
		f();
	}), n("setTransition", (e, t) => {
		p(t);
	}), n("enable disable", () => {
		let { el: t } = e.scrollbar;
		t && t.classList[e.enabled ? "remove" : "add"](...AB(e.params.scrollbar.lockClass));
	}), n("destroy", () => {
		w();
	});
	let T = () => {
		e.el.classList.remove(...AB(e.params.scrollbar.scrollbarDisabledClass)), e.scrollbar.el && e.scrollbar.el.classList.remove(...AB(e.params.scrollbar.scrollbarDisabledClass)), C(), m(), f();
	}, E = () => {
		e.el.classList.add(...AB(e.params.scrollbar.scrollbarDisabledClass)), e.scrollbar.el && e.scrollbar.el.classList.add(...AB(e.params.scrollbar.scrollbarDisabledClass)), w();
	};
	Object.assign(e.scrollbar, {
		enable: T,
		disable: E,
		updateSize: m,
		setTranslate: f,
		init: C,
		destroy: w
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/parallax.mjs
function HH({ swiper: e, extendParams: t, on: n }) {
	t({ parallax: { enabled: !1 } });
	let r = "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]", i = (t, n) => {
		let { rtl: r } = e, i = r ? -1 : 1, a = t.getAttribute("data-swiper-parallax") || "0", o = t.getAttribute("data-swiper-parallax-x"), s = t.getAttribute("data-swiper-parallax-y"), c = t.getAttribute("data-swiper-parallax-scale"), l = t.getAttribute("data-swiper-parallax-opacity"), u = t.getAttribute("data-swiper-parallax-rotate");
		if (o || s ? (o ||= "0", s ||= "0") : e.isHorizontal() ? (o = a, s = "0") : (s = a, o = "0"), o = o.indexOf("%") >= 0 ? `${parseInt(o, 10) * n * i}%` : `${o * n * i}px`, s = s.indexOf("%") >= 0 ? `${parseInt(s, 10) * n}%` : `${s * n}px`, l != null) {
			let e = l - (l - 1) * (1 - Math.abs(n));
			t.style.opacity = e;
		}
		let d = `translate3d(${o}, ${s}, 0px)`;
		if (c != null) {
			let e = c - (c - 1) * (1 - Math.abs(n));
			d += ` scale(${e})`;
		}
		if (u && u != null) {
			let e = u * n * -1;
			d += ` rotate(${e}deg)`;
		}
		t.style.transform = d;
	}, a = () => {
		let { el: t, slides: n, progress: a, snapGrid: o, isElement: s } = e, c = HB(t, r);
		e.isElement && c.push(...HB(e.hostEl, r)), c.forEach((e) => {
			i(e, a);
		}), n.forEach((t, n) => {
			let s = t.progress;
			e.params.slidesPerGroup > 1 && e.params.slidesPerView !== "auto" && (s += Math.ceil(n / 2) - a * (o.length - 1)), s = Math.min(Math.max(s, -1), 1), t.querySelectorAll(`${r}, [data-swiper-parallax-rotate]`).forEach((e) => {
				i(e, s);
			});
		});
	}, o = (t = e.params.speed) => {
		let { el: n, hostEl: i } = e, a = [...n.querySelectorAll(r)];
		e.isElement && a.push(...i.querySelectorAll(r)), a.forEach((e) => {
			let n = parseInt(e.getAttribute("data-swiper-parallax-duration"), 10) || t;
			t === 0 && (n = 0), e.style.transitionDuration = `${n}ms`;
		});
	};
	n("beforeInit", () => {
		e.params.parallax.enabled && (e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0);
	}), n("init", () => {
		e.params.parallax.enabled && a();
	}), n("setTranslate", () => {
		e.params.parallax.enabled && a();
	}), n("setTransition", (t, n) => {
		e.params.parallax.enabled && o(n);
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/zoom.mjs
function UH({ swiper: e, extendParams: t, on: n, emit: r }) {
	let i = kB();
	t({ zoom: {
		enabled: !1,
		limitToOriginalSize: !1,
		maxRatio: 3,
		minRatio: 1,
		panOnMouseMove: !1,
		toggle: !0,
		containerClass: "swiper-zoom-container",
		zoomedSlideClass: "swiper-slide-zoomed"
	} }), e.zoom = { enabled: !1 };
	let a = 1, o = !1, s = !1, c = {
		x: 0,
		y: 0
	}, l, u, d = [], f = {
		originX: 0,
		originY: 0,
		slideEl: void 0,
		slideWidth: void 0,
		slideHeight: void 0,
		imageEl: void 0,
		imageWrapEl: void 0,
		maxRatio: 3
	}, p = {
		isTouched: void 0,
		isMoved: void 0,
		currentX: void 0,
		currentY: void 0,
		minX: void 0,
		minY: void 0,
		maxX: void 0,
		maxY: void 0,
		width: void 0,
		height: void 0,
		startX: void 0,
		startY: void 0,
		touchesStart: {},
		touchesCurrent: {}
	}, m = {
		x: void 0,
		y: void 0,
		prevPositionX: void 0,
		prevPositionY: void 0,
		prevTime: void 0
	}, h = 1;
	Object.defineProperty(e.zoom, "scale", {
		get() {
			return h;
		},
		set(e) {
			if (h !== e) {
				let t = f.imageEl, n = f.slideEl;
				r("zoomChange", e, t, n);
			}
			h = e;
		}
	});
	function g() {
		if (d.length < 2) return 1;
		let e = d[0].pageX, t = d[0].pageY, n = d[1].pageX, r = d[1].pageY;
		return Math.sqrt((n - e) ** 2 + (r - t) ** 2);
	}
	function _() {
		let t = e.params.zoom, n = f.imageWrapEl.getAttribute("data-swiper-zoom") || t.maxRatio;
		if (t.limitToOriginalSize && f.imageEl && f.imageEl.naturalWidth) {
			let e = f.imageEl.naturalWidth / f.imageEl.offsetWidth;
			return Math.min(e, n);
		}
		return n;
	}
	function v() {
		if (d.length < 2) return {
			x: null,
			y: null
		};
		let e = f.imageEl.getBoundingClientRect();
		return [(d[0].pageX + (d[1].pageX - d[0].pageX) / 2 - e.x - i.scrollX) / a, (d[0].pageY + (d[1].pageY - d[0].pageY) / 2 - e.y - i.scrollY) / a];
	}
	function y() {
		return e.isElement ? "swiper-slide" : `.${e.params.slideClass}`;
	}
	function b(t) {
		let n = y();
		return !!(t.target.matches(n) || e.slides.filter((e) => e.contains(t.target)).length > 0);
	}
	function x(t) {
		let n = `.${e.params.zoom.containerClass}`;
		return !!(t.target.matches(n) || [...e.hostEl.querySelectorAll(n)].filter((e) => e.contains(t.target)).length > 0);
	}
	function S(t) {
		if (t.pointerType === "mouse" && d.splice(0, d.length), !b(t)) return;
		let n = e.params.zoom;
		if (l = !1, u = !1, d.push(t), !(d.length < 2)) {
			if (l = !0, f.scaleStart = g(), !f.slideEl) {
				f.slideEl = t.target.closest(`.${e.params.slideClass}, swiper-slide`), f.slideEl ||= e.slides[e.activeIndex];
				let r = f.slideEl.querySelector(`.${n.containerClass}`);
				if (r &&= r.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0], f.imageEl = r, r ? f.imageWrapEl = QB(f.imageEl, `.${n.containerClass}`)[0] : f.imageWrapEl = void 0, !f.imageWrapEl) {
					f.imageEl = void 0;
					return;
				}
				f.maxRatio = _();
			}
			if (f.imageEl) {
				let [e, t] = v();
				f.originX = e, f.originY = t, f.imageEl.style.transitionDuration = "0ms";
			}
			o = !0;
		}
	}
	function C(t) {
		if (!b(t)) return;
		let n = e.params.zoom, r = e.zoom, i = d.findIndex((e) => e.pointerId === t.pointerId);
		i >= 0 && (d[i] = t), !(d.length < 2) && (u = !0, f.scaleMove = g(), f.imageEl && (r.scale = f.scaleMove / f.scaleStart * a, r.scale > f.maxRatio && (r.scale = f.maxRatio - 1 + (r.scale - f.maxRatio + 1) ** .5), r.scale < n.minRatio && (r.scale = n.minRatio + 1 - (n.minRatio - r.scale + 1) ** .5), f.imageEl.style.transform = `translate3d(0,0,0) scale(${r.scale})`));
	}
	function w(t) {
		if (!b(t) || t.pointerType === "mouse" && t.type === "pointerout") return;
		let n = e.params.zoom, r = e.zoom, i = d.findIndex((e) => e.pointerId === t.pointerId);
		i >= 0 && d.splice(i, 1), !(!l || !u) && (l = !1, u = !1, f.imageEl && (r.scale = Math.max(Math.min(r.scale, f.maxRatio), n.minRatio), f.imageEl.style.transitionDuration = `${e.params.speed}ms`, f.imageEl.style.transform = `translate3d(0,0,0) scale(${r.scale})`, a = r.scale, o = !1, r.scale > 1 && f.slideEl ? f.slideEl.classList.add(`${n.zoomedSlideClass}`) : r.scale <= 1 && f.slideEl && f.slideEl.classList.remove(`${n.zoomedSlideClass}`), r.scale === 1 && (f.originX = 0, f.originY = 0, f.slideEl = void 0)));
	}
	let T;
	function E() {
		e.touchEventsData.preventTouchMoveFromPointerMove = !1;
	}
	function D() {
		clearTimeout(T), e.touchEventsData.preventTouchMoveFromPointerMove = !0, T = setTimeout(() => {
			e.destroyed || E();
		});
	}
	function O(t) {
		let n = e.device;
		if (!f.imageEl || p.isTouched) return;
		n.android && t.cancelable && t.preventDefault(), p.isTouched = !0;
		let r = d.length > 0 ? d[0] : t;
		p.touchesStart.x = r.pageX, p.touchesStart.y = r.pageY;
	}
	function ee(t) {
		let n = t.pointerType === "mouse" && e.params.zoom.panOnMouseMove;
		if (!b(t) || !x(t)) return;
		let r = e.zoom;
		if (!f.imageEl) return;
		if (!p.isTouched || !f.slideEl) {
			n && ne(t);
			return;
		}
		if (n) {
			ne(t);
			return;
		}
		p.isMoved || (p.width = f.imageEl.offsetWidth || f.imageEl.clientWidth, p.height = f.imageEl.offsetHeight || f.imageEl.clientHeight, p.startX = FB(f.imageWrapEl, "x") || 0, p.startY = FB(f.imageWrapEl, "y") || 0, f.slideWidth = f.slideEl.offsetWidth, f.slideHeight = f.slideEl.offsetHeight, f.imageWrapEl.style.transitionDuration = "0ms");
		let i = p.width * r.scale, s = p.height * r.scale;
		if (p.minX = Math.min(f.slideWidth / 2 - i / 2, 0), p.maxX = -p.minX, p.minY = Math.min(f.slideHeight / 2 - s / 2, 0), p.maxY = -p.minY, p.touchesCurrent.x = d.length > 0 ? d[0].pageX : t.pageX, p.touchesCurrent.y = d.length > 0 ? d[0].pageY : t.pageY, Math.max(Math.abs(p.touchesCurrent.x - p.touchesStart.x), Math.abs(p.touchesCurrent.y - p.touchesStart.y)) > 5 && (e.allowClick = !1), !p.isMoved && !o) {
			if (e.isHorizontal() && (Math.floor(p.minX) === Math.floor(p.startX) && p.touchesCurrent.x < p.touchesStart.x || Math.floor(p.maxX) === Math.floor(p.startX) && p.touchesCurrent.x > p.touchesStart.x)) {
				p.isTouched = !1, E();
				return;
			}
			if (!e.isHorizontal() && (Math.floor(p.minY) === Math.floor(p.startY) && p.touchesCurrent.y < p.touchesStart.y || Math.floor(p.maxY) === Math.floor(p.startY) && p.touchesCurrent.y > p.touchesStart.y)) {
				p.isTouched = !1, E();
				return;
			}
		}
		t.cancelable && t.preventDefault(), t.stopPropagation(), D(), p.isMoved = !0;
		let c = (r.scale - a) / (f.maxRatio - e.params.zoom.minRatio), { originX: l, originY: u } = f;
		p.currentX = p.touchesCurrent.x - p.touchesStart.x + p.startX + c * (p.width - l * 2), p.currentY = p.touchesCurrent.y - p.touchesStart.y + p.startY + c * (p.height - u * 2), p.currentX < p.minX && (p.currentX = p.minX + 1 - (p.minX - p.currentX + 1) ** .8), p.currentX > p.maxX && (p.currentX = p.maxX - 1 + (p.currentX - p.maxX + 1) ** .8), p.currentY < p.minY && (p.currentY = p.minY + 1 - (p.minY - p.currentY + 1) ** .8), p.currentY > p.maxY && (p.currentY = p.maxY - 1 + (p.currentY - p.maxY + 1) ** .8), m.prevPositionX ||= p.touchesCurrent.x, m.prevPositionY ||= p.touchesCurrent.y, m.prevTime ||= Date.now(), m.x = (p.touchesCurrent.x - m.prevPositionX) / (Date.now() - m.prevTime) / 2, m.y = (p.touchesCurrent.y - m.prevPositionY) / (Date.now() - m.prevTime) / 2, Math.abs(p.touchesCurrent.x - m.prevPositionX) < 2 && (m.x = 0), Math.abs(p.touchesCurrent.y - m.prevPositionY) < 2 && (m.y = 0), m.prevPositionX = p.touchesCurrent.x, m.prevPositionY = p.touchesCurrent.y, m.prevTime = Date.now(), f.imageWrapEl.style.transform = `translate3d(${p.currentX}px, ${p.currentY}px,0)`;
	}
	function te() {
		let t = e.zoom;
		if (d.length = 0, !f.imageEl) return;
		if (!p.isTouched || !p.isMoved) {
			p.isTouched = !1, p.isMoved = !1;
			return;
		}
		p.isTouched = !1, p.isMoved = !1;
		let n = 300, r = 300, i = m.x * n, a = p.currentX + i, o = m.y * r, s = p.currentY + o;
		m.x !== 0 && (n = Math.abs((a - p.currentX) / m.x)), m.y !== 0 && (r = Math.abs((s - p.currentY) / m.y));
		let c = Math.max(n, r);
		p.currentX = a, p.currentY = s;
		let l = p.width * t.scale, u = p.height * t.scale;
		p.minX = Math.min(f.slideWidth / 2 - l / 2, 0), p.maxX = -p.minX, p.minY = Math.min(f.slideHeight / 2 - u / 2, 0), p.maxY = -p.minY, p.currentX = Math.max(Math.min(p.currentX, p.maxX), p.minX), p.currentY = Math.max(Math.min(p.currentY, p.maxY), p.minY), f.imageWrapEl.style.transitionDuration = `${c}ms`, f.imageWrapEl.style.transform = `translate3d(${p.currentX}px, ${p.currentY}px,0)`;
	}
	function k() {
		let t = e.zoom;
		f.slideEl && e.activeIndex !== e.slides.indexOf(f.slideEl) && (f.imageEl && (f.imageEl.style.transform = "translate3d(0,0,0) scale(1)"), f.imageWrapEl && (f.imageWrapEl.style.transform = "translate3d(0,0,0)"), f.slideEl.classList.remove(`${e.params.zoom.zoomedSlideClass}`), t.scale = 1, a = 1, f.slideEl = void 0, f.imageEl = void 0, f.imageWrapEl = void 0, f.originX = 0, f.originY = 0);
	}
	function ne(e) {
		if (a <= 1 || !f.imageWrapEl || !b(e) || !x(e)) return;
		let t = i.getComputedStyle(f.imageWrapEl).transform, n = new i.DOMMatrix(t);
		if (!s) {
			s = !0, c.x = e.clientX, c.y = e.clientY, p.startX = n.e, p.startY = n.f, p.width = f.imageEl.offsetWidth || f.imageEl.clientWidth, p.height = f.imageEl.offsetHeight || f.imageEl.clientHeight, f.slideWidth = f.slideEl.offsetWidth, f.slideHeight = f.slideEl.offsetHeight;
			return;
		}
		let r = (e.clientX - c.x) * -3, o = (e.clientY - c.y) * -3, l = p.width * a, u = p.height * a, d = f.slideWidth, m = f.slideHeight, h = Math.min(d / 2 - l / 2, 0), g = -h, _ = Math.min(m / 2 - u / 2, 0), v = -_, y = Math.max(Math.min(p.startX + r, g), h), S = Math.max(Math.min(p.startY + o, v), _);
		f.imageWrapEl.style.transitionDuration = "0ms", f.imageWrapEl.style.transform = `translate3d(${y}px, ${S}px, 0)`, c.x = e.clientX, c.y = e.clientY, p.startX = y, p.startY = S, p.currentX = y, p.currentY = S;
	}
	function re(t) {
		let n = e.zoom, r = e.params.zoom;
		if (!f.slideEl) {
			t && t.target && (f.slideEl = t.target.closest(`.${e.params.slideClass}, swiper-slide`)), f.slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? f.slideEl = HB(e.slidesEl, `.${e.params.slideActiveClass}`)[0] : f.slideEl = e.slides[e.activeIndex]);
			let n = f.slideEl.querySelector(`.${r.containerClass}`);
			n &&= n.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0], f.imageEl = n, n ? f.imageWrapEl = QB(f.imageEl, `.${r.containerClass}`)[0] : f.imageWrapEl = void 0;
		}
		if (!f.imageEl || !f.imageWrapEl) return;
		f.maxRatio = _(), e.params.cssMode && (e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.touchAction = "none"), f.slideEl.classList.add(`${r.zoomedSlideClass}`);
		let o, s, c, l, u, d, m, h, g, v, y, b, x, S, C, w, T, E;
		p.touchesStart.x === void 0 && t ? (o = t.pageX, s = t.pageY) : (o = p.touchesStart.x, s = p.touchesStart.y);
		let D = a, O = typeof t == "number" ? t : null;
		a === 1 && O && (o = void 0, s = void 0, p.touchesStart.x = void 0, p.touchesStart.y = void 0);
		let ee = _();
		n.scale = O || ee, a = O || ee, t && !(a === 1 && O) ? (T = f.slideEl.offsetWidth, E = f.slideEl.offsetHeight, c = qB(f.slideEl).left + i.scrollX, l = qB(f.slideEl).top + i.scrollY, u = c + T / 2 - o, d = l + E / 2 - s, g = f.imageEl.offsetWidth || f.imageEl.clientWidth, v = f.imageEl.offsetHeight || f.imageEl.clientHeight, y = g * n.scale, b = v * n.scale, x = Math.min(T / 2 - y / 2, 0), S = Math.min(E / 2 - b / 2, 0), C = -x, w = -S, D > 0 && O && typeof p.currentX == "number" && typeof p.currentY == "number" ? (m = p.currentX * n.scale / D, h = p.currentY * n.scale / D) : (m = u * n.scale, h = d * n.scale), m < x && (m = x), m > C && (m = C), h < S && (h = S), h > w && (h = w)) : (m = 0, h = 0), O && n.scale === 1 && (f.originX = 0, f.originY = 0), p.currentX = m, p.currentY = h, f.imageWrapEl.style.transitionDuration = "300ms", f.imageWrapEl.style.transform = `translate3d(${m}px, ${h}px,0)`, f.imageEl.style.transitionDuration = "300ms", f.imageEl.style.transform = `translate3d(0,0,0) scale(${n.scale})`;
	}
	function ie() {
		let t = e.zoom, n = e.params.zoom;
		if (!f.slideEl) {
			e.params.virtual && e.params.virtual.enabled && e.virtual ? f.slideEl = HB(e.slidesEl, `.${e.params.slideActiveClass}`)[0] : f.slideEl = e.slides[e.activeIndex];
			let t = f.slideEl.querySelector(`.${n.containerClass}`);
			t &&= t.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0], f.imageEl = t, t ? f.imageWrapEl = QB(f.imageEl, `.${n.containerClass}`)[0] : f.imageWrapEl = void 0;
		}
		!f.imageEl || !f.imageWrapEl || (f.maxRatio = _(), e.params.cssMode && (e.wrapperEl.style.overflow = "", e.wrapperEl.style.touchAction = ""), t.scale = 1, a = 1, p.currentX = void 0, p.currentY = void 0, p.touchesStart.x = void 0, p.touchesStart.y = void 0, f.imageWrapEl.style.transitionDuration = "300ms", f.imageWrapEl.style.transform = "translate3d(0,0,0)", f.imageEl.style.transitionDuration = "300ms", f.imageEl.style.transform = "translate3d(0,0,0) scale(1)", f.slideEl.classList.remove(`${n.zoomedSlideClass}`), f.slideEl = void 0, f.originX = 0, f.originY = 0, e.params.zoom.panOnMouseMove && (c = {
			x: 0,
			y: 0
		}, s && (s = !1, p.startX = 0, p.startY = 0)));
	}
	function ae(t) {
		let n = e.zoom;
		n.scale && n.scale !== 1 ? ie() : re(t);
	}
	function A() {
		return {
			passiveListener: e.params.passiveListeners ? {
				passive: !0,
				capture: !1
			} : !1,
			activeListenerWithCapture: e.params.passiveListeners ? {
				passive: !1,
				capture: !0
			} : !0
		};
	}
	function oe() {
		let t = e.zoom;
		if (t.enabled) return;
		t.enabled = !0;
		let { passiveListener: n, activeListenerWithCapture: r } = A();
		e.wrapperEl.addEventListener("pointerdown", S, n), e.wrapperEl.addEventListener("pointermove", C, r), [
			"pointerup",
			"pointercancel",
			"pointerout"
		].forEach((t) => {
			e.wrapperEl.addEventListener(t, w, n);
		}), e.wrapperEl.addEventListener("pointermove", ee, r);
	}
	function se() {
		let t = e.zoom;
		if (!t.enabled) return;
		t.enabled = !1;
		let { passiveListener: n, activeListenerWithCapture: r } = A();
		e.wrapperEl.removeEventListener("pointerdown", S, n), e.wrapperEl.removeEventListener("pointermove", C, r), [
			"pointerup",
			"pointercancel",
			"pointerout"
		].forEach((t) => {
			e.wrapperEl.removeEventListener(t, w, n);
		}), e.wrapperEl.removeEventListener("pointermove", ee, r);
	}
	n("init", () => {
		e.params.zoom.enabled && oe();
	}), n("destroy", () => {
		se();
	}), n("touchStart", (t, n) => {
		e.zoom.enabled && O(n);
	}), n("touchEnd", (t, n) => {
		e.zoom.enabled && te();
	}), n("doubleTap", (t, n) => {
		!e.animating && e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && ae(n);
	}), n("transitionEnd", () => {
		e.zoom.enabled && e.params.zoom.enabled && k();
	}), n("slideChange", () => {
		e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && k();
	}), Object.assign(e.zoom, {
		enable: oe,
		disable: se,
		in: re,
		out: ie,
		toggle: ae
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/controller.mjs
function WH({ swiper: e, extendParams: t, on: n }) {
	t({ controller: {
		control: void 0,
		inverse: !1,
		by: "slide"
	} }), e.controller = { control: void 0 };
	function r(e, t) {
		let n = function() {
			let e, t, n;
			return (r, i) => {
				for (t = -1, e = r.length; e - t > 1;) n = e + t >> 1, r[n] <= i ? t = n : e = n;
				return e;
			};
		}();
		this.x = e, this.y = t, this.lastIndex = e.length - 1;
		let r, i;
		return this.interpolate = function(e) {
			return e ? (i = n(this.x, e), r = i - 1, (e - this.x[r]) * (this.y[i] - this.y[r]) / (this.x[i] - this.x[r]) + this.y[r]) : 0;
		}, this;
	}
	function i(t) {
		e.controller.spline = e.params.loop ? new r(e.slidesGrid, t.slidesGrid) : new r(e.snapGrid, t.snapGrid);
	}
	function a(t, n) {
		let r = e.controller.control, a, o, s = e.constructor;
		function c(t) {
			if (t.destroyed) return;
			let n = e.rtlTranslate ? -e.translate : e.translate;
			e.params.controller.by === "slide" && (i(t), o = -e.controller.spline.interpolate(-n)), (!o || e.params.controller.by === "container") && (a = (t.maxTranslate() - t.minTranslate()) / (e.maxTranslate() - e.minTranslate()), (Number.isNaN(a) || !Number.isFinite(a)) && (a = 1), o = (n - e.minTranslate()) * a + t.minTranslate()), e.params.controller.inverse && (o = t.maxTranslate() - o), t.updateProgress(o), t.setTranslate(o, e), t.updateActiveIndex(), t.updateSlidesClasses();
		}
		if (Array.isArray(r)) for (let e = 0; e < r.length; e += 1) r[e] !== n && r[e] instanceof s && c(r[e]);
		else r instanceof s && n !== r && c(r);
	}
	function o(t, n) {
		let r = e.constructor, i = e.controller.control, a;
		function o(n) {
			n.destroyed || (n.setTransition(t, e), t !== 0 && (n.transitionStart(), n.params.autoHeight && MB(() => {
				n.updateAutoHeight();
			}), $B(n.wrapperEl, () => {
				i && n.transitionEnd();
			})));
		}
		if (Array.isArray(i)) for (a = 0; a < i.length; a += 1) i[a] !== n && i[a] instanceof r && o(i[a]);
		else i instanceof r && n !== i && o(i);
	}
	function s() {
		e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline);
	}
	n("beforeInit", () => {
		if (typeof window < "u" && (typeof e.params.controller.control == "string" || e.params.controller.control instanceof HTMLElement)) {
			(typeof e.params.controller.control == "string" ? [...document.querySelectorAll(e.params.controller.control)] : [e.params.controller.control]).forEach((t) => {
				if (e.controller.control || (e.controller.control = []), t && t.swiper) e.controller.control.push(t.swiper);
				else if (t) {
					let n = `${e.params.eventsPrefix}init`, r = (i) => {
						e.controller.control.push(i.detail[0]), e.update(), t.removeEventListener(n, r);
					};
					t.addEventListener(n, r);
				}
			});
			return;
		}
		e.controller.control = e.params.controller.control;
	}), n("update", () => {
		s();
	}), n("resize", () => {
		s();
	}), n("observerUpdate", () => {
		s();
	}), n("setTranslate", (t, n, r) => {
		!e.controller.control || e.controller.control.destroyed || e.controller.setTranslate(n, r);
	}), n("setTransition", (t, n, r) => {
		!e.controller.control || e.controller.control.destroyed || e.controller.setTransition(n, r);
	}), Object.assign(e.controller, {
		setTranslate: a,
		setTransition: o
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/a11y.mjs
function GH({ swiper: e, extendParams: t, on: n }) {
	t({ a11y: {
		enabled: !0,
		notificationClass: "swiper-notification",
		prevSlideMessage: "Previous slide",
		nextSlideMessage: "Next slide",
		firstSlideMessage: "This is the first slide",
		lastSlideMessage: "This is the last slide",
		paginationBulletMessage: "Go to slide {{index}}",
		slideLabelMessage: "{{index}} / {{slidesLength}}",
		containerMessage: null,
		containerRoleDescriptionMessage: null,
		containerRole: null,
		itemRoleDescriptionMessage: null,
		slideRole: "group",
		id: null,
		scrollOnFocus: !0,
		wrapperLiveRegion: !0
	} }), e.a11y = { clicked: !1 };
	let r = null, i, a, o = (/* @__PURE__ */ new Date()).getTime();
	function s(e) {
		let t = r;
		t.length !== 0 && rV(t, e);
	}
	function c(e = 16) {
		return "x".repeat(e).replace(/x/g, () => Math.round(16 * Math.random()).toString(16));
	}
	function l(e) {
		e = tV(e), e.forEach((e) => {
			e.setAttribute("tabIndex", "0");
		});
	}
	function u(e) {
		e = tV(e), e.forEach((e) => {
			e.setAttribute("tabIndex", "-1");
		});
	}
	function d(e, t) {
		e = tV(e), e.forEach((e) => {
			e.setAttribute("role", t);
		});
	}
	function f(e, t) {
		e = tV(e), e.forEach((e) => {
			e.setAttribute("aria-roledescription", t);
		});
	}
	function p(e, t) {
		e = tV(e), e.forEach((e) => {
			e.setAttribute("aria-label", t);
		});
	}
	function m(e, t) {
		e = tV(e), e.forEach((e) => {
			e.setAttribute("id", t);
		});
	}
	function h(e, t) {
		e = tV(e), e.forEach((e) => {
			e.setAttribute("aria-live", t);
		});
	}
	function g(e) {
		e = tV(e), e.forEach((e) => {
			e.setAttribute("aria-disabled", !0);
		});
	}
	function _(e) {
		e = tV(e), e.forEach((e) => {
			e.removeAttribute("aria-disabled");
		});
	}
	function v(t) {
		if (t.keyCode !== 13 && t.keyCode !== 32) return;
		let n = e.params.a11y, r = t.target;
		if (!(e.pagination && e.pagination.el && (r === e.pagination.el || e.pagination.el.contains(t.target)) && !t.target.matches(zH(e.params.pagination.bulletClass)))) {
			if (e.navigation && e.navigation.prevEl && e.navigation.nextEl) {
				let t = tV(e.navigation.prevEl);
				tV(e.navigation.nextEl).includes(r) && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? s(n.lastSlideMessage) : s(n.nextSlideMessage)), t.includes(r) && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? s(n.firstSlideMessage) : s(n.prevSlideMessage));
			}
			e.pagination && r.matches(zH(e.params.pagination.bulletClass)) && r.click();
		}
	}
	function y() {
		if (e.params.loop || e.params.rewind || !e.navigation) return;
		let { nextEl: t, prevEl: n } = e.navigation;
		n && (e.isBeginning ? (g(n), u(n)) : (_(n), l(n))), t && (e.isEnd ? (g(t), u(t)) : (_(t), l(t)));
	}
	function b() {
		return e.pagination && e.pagination.bullets && e.pagination.bullets.length;
	}
	function x() {
		return b() && e.params.pagination.clickable;
	}
	function S() {
		let t = e.params.a11y;
		b() && e.pagination.bullets.forEach((n) => {
			e.params.pagination.clickable && (l(n), e.params.pagination.renderBullet || (d(n, "button"), p(n, t.paginationBulletMessage.replace(/\{\{index\}\}/, ZB(n) + 1)))), n.matches(zH(e.params.pagination.bulletActiveClass)) ? n.setAttribute("aria-current", "true") : n.removeAttribute("aria-current");
		});
	}
	let C = (e, t, n) => {
		l(e), e.tagName !== "BUTTON" && (d(e, "button"), e.addEventListener("keydown", v)), p(e, n);
	}, w = (t) => {
		a && a !== t.target && !a.contains(t.target) && (i = !0), e.a11y.clicked = !0;
	}, T = () => {
		i = !1, requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				e.destroyed || (e.a11y.clicked = !1);
			});
		});
	}, E = (e) => {
		o = (/* @__PURE__ */ new Date()).getTime();
	}, D = (t) => {
		if (e.a11y.clicked || !e.params.a11y.scrollOnFocus || (/* @__PURE__ */ new Date()).getTime() - o < 100) return;
		let n = t.target.closest(`.${e.params.slideClass}, swiper-slide`);
		if (!n || !e.slides.includes(n)) return;
		a = n;
		let r = e.virtual && e.params.virtual.enabled, s = (r ? parseInt(n.getAttribute("data-swiper-slide-index"), 10) : e.slides.indexOf(n)) === e.activeIndex, c = e.params.watchSlidesProgress && e.visibleSlides && e.visibleSlides.includes(n);
		s || c || t.sourceCapabilities && t.sourceCapabilities.firesTouchEvents || (e.isHorizontal() ? e.el.scrollLeft = 0 : e.el.scrollTop = 0, requestAnimationFrame(() => {
			i ||= (e.params.loop ? e.slideToLoop(e.getSlideIndexWhenGrid(parseInt(n.getAttribute("data-swiper-slide-index"))), 0) : r ? e.slideTo(e.getSlideIndexWhenGrid(parseInt(n.getAttribute("data-swiper-slide-index"), 10)), 0) : e.slideTo(e.getSlideIndexWhenGrid(e.slides.indexOf(n)), 0), !1);
		}));
	}, O = () => {
		let t = e.params.a11y;
		t.itemRoleDescriptionMessage && f(e.slides, t.itemRoleDescriptionMessage), t.slideRole && d(e.slides, t.slideRole);
		let n = e.slides.length;
		t.slideLabelMessage && e.slides.forEach((r, i) => {
			let a = e.params.loop ? parseInt(r.getAttribute("data-swiper-slide-index"), 10) : i;
			p(r, t.slideLabelMessage.replace(/\{\{index\}\}/, a + 1).replace(/\{\{slidesLength\}\}/, n));
		});
	}, ee = () => {
		let t = e.params.a11y;
		e.el.append(r);
		let n = e.el;
		t.containerRoleDescriptionMessage && f(n, t.containerRoleDescriptionMessage), t.containerMessage && p(n, t.containerMessage), t.containerRole && d(n, t.containerRole);
		let i = e.wrapperEl, a = t.id || i.getAttribute("id") || `swiper-wrapper-${c(16)}`;
		m(i, a), t.wrapperLiveRegion && h(i, e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite"), O();
		let { nextEl: o, prevEl: s } = e.navigation ? e.navigation : {};
		o = tV(o), s = tV(s), o && o.forEach((e) => C(e, a, t.nextSlideMessage)), s && s.forEach((e) => C(e, a, t.prevSlideMessage)), x() && tV(e.pagination.el).forEach((e) => {
			e.addEventListener("keydown", v);
		}), DB().addEventListener("visibilitychange", E), e.el.addEventListener("focus", D, !0), e.el.addEventListener("pointerdown", w, !0), e.el.addEventListener("pointerup", T, !0);
	};
	function te() {
		r && r.remove();
		let { nextEl: t, prevEl: n } = e.navigation ? e.navigation : {};
		t = tV(t), n = tV(n), t && t.forEach((e) => e.removeEventListener("keydown", v)), n && n.forEach((e) => e.removeEventListener("keydown", v)), x() && tV(e.pagination.el).forEach((e) => {
			e.removeEventListener("keydown", v);
		}), DB().removeEventListener("visibilitychange", E), e.el && typeof e.el != "string" && (e.el.removeEventListener("focus", D, !0), e.el.removeEventListener("pointerdown", w, !0), e.el.removeEventListener("pointerup", T, !0));
	}
	n("beforeInit", () => {
		r = KB("span", e.params.a11y.notificationClass), r.setAttribute("aria-live", "assertive"), r.setAttribute("aria-atomic", "true");
	}), n("afterInit", () => {
		e.params.a11y.enabled && ee();
	}), n("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
		e.params.a11y.enabled && O();
	}), n("fromEdge toEdge afterInit lock unlock", () => {
		e.params.a11y.enabled && y();
	}), n("paginationUpdate", () => {
		e.params.a11y.enabled && S();
	}), n("destroy", () => {
		e.params.a11y.enabled && te();
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/history.mjs
function KH({ swiper: e, extendParams: t, on: n }) {
	t({ history: {
		enabled: !1,
		root: "",
		replaceState: !1,
		key: "slides",
		keepQuery: !1
	} });
	let r = !1, i = {}, a = (e) => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""), o = (e) => {
		let t = kB(), n;
		n = e ? new URL(e) : t.location;
		let r = n.pathname.slice(1).split("/").filter((e) => e !== ""), i = r.length;
		return {
			key: r[i - 2],
			value: r[i - 1]
		};
	}, s = (t, n) => {
		let i = kB();
		if (!r || !e.params.history.enabled) return;
		let o;
		o = e.params.url ? new URL(e.params.url) : i.location;
		let s = a((e.virtual && e.params.virtual.enabled ? e.slidesEl.querySelector(`[data-swiper-slide-index="${n}"]`) : e.slides[n]).getAttribute("data-history"));
		if (e.params.history.root.length > 0) {
			let n = e.params.history.root;
			n[n.length - 1] === "/" && (n = n.slice(0, n.length - 1)), s = `${n}/${t ? `${t}/` : ""}${s}`;
		} else o.pathname.includes(t) || (s = `${t ? `${t}/` : ""}${s}`);
		e.params.history.keepQuery && (s += o.search);
		let c = i.history.state;
		c && c.value === s || (e.params.history.replaceState ? i.history.replaceState({ value: s }, null, s) : i.history.pushState({ value: s }, null, s));
	}, c = (t, n, r) => {
		if (n) for (let i = 0, o = e.slides.length; i < o; i += 1) {
			let o = e.slides[i];
			if (a(o.getAttribute("data-history")) === n) {
				let n = e.getSlideIndex(o);
				e.slideTo(n, t, r);
			}
		}
		else e.slideTo(0, t, r);
	}, l = () => {
		i = o(e.params.url), c(e.params.speed, i.value, !1);
	}, u = () => {
		let t = kB();
		if (e.params.history) {
			if (!t.history || !t.history.pushState) {
				e.params.history.enabled = !1, e.params.hashNavigation.enabled = !0;
				return;
			}
			if (r = !0, i = o(e.params.url), !i.key && !i.value) {
				e.params.history.replaceState || t.addEventListener("popstate", l);
				return;
			}
			c(0, i.value, e.params.runCallbacksOnInit), e.params.history.replaceState || t.addEventListener("popstate", l);
		}
	}, d = () => {
		let t = kB();
		e.params.history.replaceState || t.removeEventListener("popstate", l);
	};
	n("init", () => {
		e.params.history.enabled && u();
	}), n("destroy", () => {
		e.params.history.enabled && d();
	}), n("transitionEnd _freeModeNoMomentumRelease", () => {
		r && s(e.params.history.key, e.activeIndex);
	}), n("slideChange", () => {
		r && e.params.cssMode && s(e.params.history.key, e.activeIndex);
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/hash-navigation.mjs
function qH({ swiper: e, extendParams: t, emit: n, on: r }) {
	let i = !1, a = DB(), o = kB();
	t({ hashNavigation: {
		enabled: !1,
		replaceState: !1,
		watchState: !1,
		getSlideIndex(t, n) {
			if (e.virtual && e.params.virtual.enabled) {
				let t = e.slides.find((e) => e.getAttribute("data-hash") === n);
				return t ? parseInt(t.getAttribute("data-swiper-slide-index"), 10) : 0;
			}
			return e.getSlideIndex(HB(e.slidesEl, `.${e.params.slideClass}[data-hash="${n}"], swiper-slide[data-hash="${n}"]`)[0]);
		}
	} });
	let s = () => {
		n("hashChange");
		let t = a.location.hash.replace("#", ""), r = e.virtual && e.params.virtual.enabled ? e.slidesEl.querySelector(`[data-swiper-slide-index="${e.activeIndex}"]`) : e.slides[e.activeIndex];
		if (t !== (r ? r.getAttribute("data-hash") : "")) {
			let n = e.params.hashNavigation.getSlideIndex(e, t);
			if (n === void 0 || Number.isNaN(n)) return;
			e.slideTo(n);
		}
	}, c = () => {
		if (!i || !e.params.hashNavigation.enabled) return;
		let t = e.virtual && e.params.virtual.enabled ? e.slidesEl.querySelector(`[data-swiper-slide-index="${e.activeIndex}"]`) : e.slides[e.activeIndex], r = t ? t.getAttribute("data-hash") || t.getAttribute("data-history") : "";
		e.params.hashNavigation.replaceState && o.history && o.history.replaceState ? (o.history.replaceState(null, null, `#${r}` || ""), n("hashSet")) : (a.location.hash = r || "", n("hashSet"));
	}, l = () => {
		if (!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled) return;
		i = !0;
		let t = a.location.hash.replace("#", "");
		if (t) {
			let n = e.params.hashNavigation.getSlideIndex(e, t);
			e.slideTo(n || 0, 0, e.params.runCallbacksOnInit, !0);
		}
		e.params.hashNavigation.watchState && o.addEventListener("hashchange", s);
	}, u = () => {
		e.params.hashNavigation.watchState && o.removeEventListener("hashchange", s);
	};
	r("init", () => {
		e.params.hashNavigation.enabled && l();
	}), r("destroy", () => {
		e.params.hashNavigation.enabled && u();
	}), r("transitionEnd _freeModeNoMomentumRelease", () => {
		i && c();
	}), r("slideChange", () => {
		i && e.params.cssMode && c();
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/autoplay.mjs
function JH({ swiper: e, extendParams: t, on: n, emit: r, params: i }) {
	e.autoplay = {
		running: !1,
		paused: !1,
		timeLeft: 0
	}, t({ autoplay: {
		enabled: !1,
		delay: 3e3,
		waitForTransition: !0,
		disableOnInteraction: !1,
		stopOnLastSlide: !1,
		reverseDirection: !1,
		pauseOnMouseEnter: !1
	} });
	let a, o, s = i && i.autoplay ? i.autoplay.delay : 3e3, c = i && i.autoplay ? i.autoplay.delay : 3e3, l, u = (/* @__PURE__ */ new Date()).getTime(), d, f, p, m, h, g;
	function _(t) {
		!e || e.destroyed || !e.wrapperEl || t.target === e.wrapperEl && (e.wrapperEl.removeEventListener("transitionend", _), !(g || t.detail && t.detail.bySwiperTouchMove) && T());
	}
	let v = () => {
		if (e.destroyed || !e.autoplay.running) return;
		e.autoplay.paused ? d = !0 : d &&= (c = l, !1);
		let t = e.autoplay.paused ? l : u + c - (/* @__PURE__ */ new Date()).getTime();
		e.autoplay.timeLeft = t, r("autoplayTimeLeft", t, t / s), o = requestAnimationFrame(() => {
			v();
		});
	}, y = () => {
		let t;
		if (t = e.virtual && e.params.virtual.enabled ? e.slides.find((e) => e.classList.contains("swiper-slide-active")) : e.slides[e.activeIndex], t) return parseInt(t.getAttribute("data-swiper-autoplay"), 10);
	}, b = () => {
		let t = e.params.autoplay.delay, n = y();
		return !Number.isNaN(n) && n > 0 && (t = n), t;
	}, x = (t) => {
		if (e.destroyed || !e.autoplay.running) return;
		cancelAnimationFrame(o), v();
		let n = t;
		n === void 0 && (n = b(), s = n, c = n), l = n;
		let i = e.params.speed, d = () => {
			!e || e.destroyed || (e.params.autoplay.reverseDirection ? !e.isBeginning || e.params.loop || e.params.rewind ? (e.slidePrev(i, !0, !0), r("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(e.slides.length - 1, i, !0, !0), r("autoplay")) : !e.isEnd || e.params.loop || e.params.rewind ? (e.slideNext(i, !0, !0), r("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(0, i, !0, !0), r("autoplay")), e.params.cssMode && (u = (/* @__PURE__ */ new Date()).getTime(), requestAnimationFrame(() => {
				x();
			})));
		};
		return n > 0 ? (clearTimeout(a), a = setTimeout(() => {
			d();
		}, n)) : requestAnimationFrame(() => {
			d();
		}), n;
	}, S = () => {
		u = (/* @__PURE__ */ new Date()).getTime(), e.autoplay.running = !0, x(), r("autoplayStart");
	}, C = () => {
		e.autoplay.running = !1, clearTimeout(a), cancelAnimationFrame(o), r("autoplayStop");
	}, w = (t, n) => {
		if (e.destroyed || !e.autoplay.running) return;
		clearTimeout(a), t || (h = !0);
		let i = () => {
			r("autoplayPause"), e.params.autoplay.waitForTransition ? e.wrapperEl.addEventListener("transitionend", _) : T();
		};
		if (e.autoplay.paused = !0, n) {
			i();
			return;
		}
		l = (l || e.params.autoplay.delay) - ((/* @__PURE__ */ new Date()).getTime() - u), !(e.isEnd && l < 0 && !e.params.loop) && (l < 0 && (l = 0), i());
	}, T = () => {
		e.isEnd && l < 0 && !e.params.loop || e.destroyed || !e.autoplay.running || (u = (/* @__PURE__ */ new Date()).getTime(), h ? (h = !1, x(l)) : x(), e.autoplay.paused = !1, r("autoplayResume"));
	}, E = () => {
		if (e.destroyed || !e.autoplay.running) return;
		let t = DB();
		t.visibilityState === "hidden" && (h = !0, w(!0)), t.visibilityState === "visible" && T();
	}, D = (t) => {
		t.pointerType === "mouse" && (h = !0, g = !0, !(e.animating || e.autoplay.paused) && w(!0));
	}, O = (t) => {
		t.pointerType === "mouse" && (g = !1, e.autoplay.paused && T());
	}, ee = () => {
		e.params.autoplay.pauseOnMouseEnter && (e.el.addEventListener("pointerenter", D), e.el.addEventListener("pointerleave", O));
	}, te = () => {
		e.el && typeof e.el != "string" && (e.el.removeEventListener("pointerenter", D), e.el.removeEventListener("pointerleave", O));
	}, k = () => {
		DB().addEventListener("visibilitychange", E);
	}, ne = () => {
		DB().removeEventListener("visibilitychange", E);
	};
	n("init", () => {
		e.params.autoplay.enabled && (ee(), k(), S());
	}), n("destroy", () => {
		te(), ne(), e.autoplay.running && C();
	}), n("_freeModeStaticRelease", () => {
		(p || h) && T();
	}), n("_freeModeNoMomentumRelease", () => {
		e.params.autoplay.disableOnInteraction ? C() : w(!0, !0);
	}), n("beforeTransitionStart", (t, n, r) => {
		e.destroyed || !e.autoplay.running || (r || !e.params.autoplay.disableOnInteraction ? w(!0, !0) : C());
	}), n("sliderFirstMove", () => {
		if (!(e.destroyed || !e.autoplay.running)) {
			if (e.params.autoplay.disableOnInteraction) {
				C();
				return;
			}
			f = !0, p = !1, h = !1, m = setTimeout(() => {
				h = !0, p = !0, w(!0);
			}, 200);
		}
	}), n("touchEnd", () => {
		if (!(e.destroyed || !e.autoplay.running || !f)) {
			if (clearTimeout(m), clearTimeout(a), e.params.autoplay.disableOnInteraction) {
				p = !1, f = !1;
				return;
			}
			p && e.params.cssMode && T(), p = !1, f = !1;
		}
	}), n("slideChange", () => {
		e.destroyed || !e.autoplay.running || e.autoplay.paused && (l = b(), s = b());
	}), Object.assign(e.autoplay, {
		start: S,
		stop: C,
		pause: w,
		resume: T
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/thumbs.mjs
function YH({ swiper: e, extendParams: t, on: n }) {
	t({ thumbs: {
		swiper: null,
		multipleActiveThumbs: !0,
		autoScrollOffset: 0,
		slideThumbActiveClass: "swiper-slide-thumb-active",
		thumbsContainerClass: "swiper-thumbs"
	} });
	let r = !1, i = !1;
	e.thumbs = { swiper: null };
	function a() {
		let t = e.thumbs.swiper;
		return !t || t.destroyed ? !1 : t.params.virtual && t.params.virtual.enabled;
	}
	function o() {
		let t = e.thumbs.swiper;
		if (!t || t.destroyed) return;
		let n = t.clickedIndex, r = t.clickedSlide;
		if (r && r.classList.contains(e.params.thumbs.slideThumbActiveClass) || n == null) return;
		let i;
		i = t.params.loop ? parseInt(t.clickedSlide.getAttribute("data-swiper-slide-index"), 10) : n, e.params.loop ? e.slideToLoop(i) : e.slideTo(i);
	}
	function s() {
		let { thumbs: t } = e.params;
		if (r) return !1;
		r = !0;
		let n = e.constructor;
		if (t.swiper instanceof n) {
			if (t.swiper.destroyed) return r = !1, !1;
			e.thumbs.swiper = t.swiper, Object.assign(e.thumbs.swiper.originalParams, {
				watchSlidesProgress: !0,
				slideToClickedSlide: !1
			}), Object.assign(e.thumbs.swiper.params, {
				watchSlidesProgress: !0,
				slideToClickedSlide: !1
			}), e.thumbs.swiper.update();
		} else if (IB(t.swiper)) {
			let r = Object.assign({}, t.swiper);
			Object.assign(r, {
				watchSlidesProgress: !0,
				slideToClickedSlide: !1
			}), e.thumbs.swiper = new n(r), i = !0;
		}
		return e.thumbs.swiper.el.classList.add(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", o), a() && e.thumbs.swiper.on("virtualUpdate", () => {
			c(!1, { autoScroll: !1 });
		}), !0;
	}
	function c(t, n) {
		let r = e.thumbs.swiper;
		if (!r || r.destroyed) return;
		let i = 1, o = e.params.thumbs.slideThumbActiveClass;
		if (e.params.slidesPerView > 1 && !e.params.centeredSlides && (i = e.params.slidesPerView), e.params.thumbs.multipleActiveThumbs || (i = 1), i = Math.floor(i), r.slides.forEach((e) => e.classList.remove(o)), r.params.loop || a()) for (let t = 0; t < i; t += 1) HB(r.slidesEl, `[data-swiper-slide-index="${e.realIndex + t}"]`).forEach((e) => {
			e.classList.add(o);
		});
		else for (let t = 0; t < i; t += 1) r.slides[e.realIndex + t] && r.slides[e.realIndex + t].classList.add(o);
		(n?.autoScroll ?? !0) && l(t ? 0 : void 0);
	}
	function l(t) {
		let n = e.thumbs.swiper;
		if (!n || n.destroyed) return;
		let r = n.params.slidesPerView === "auto" ? n.slidesPerViewDynamic() : n.params.slidesPerView, i = e.params.thumbs.autoScrollOffset, a = i && !n.params.loop;
		if (e.realIndex !== n.realIndex || a) {
			let o = n.activeIndex, s, c;
			if (n.params.loop) {
				let t = n.slides.find((t) => t.getAttribute("data-swiper-slide-index") === `${e.realIndex}`);
				s = n.slides.indexOf(t), c = e.activeIndex > e.previousIndex ? "next" : "prev";
			} else s = e.realIndex, c = s > e.previousIndex ? "next" : "prev";
			a && (s += c === "next" ? i : -1 * i), n.visibleSlidesIndexes && n.visibleSlidesIndexes.indexOf(s) < 0 && (n.params.centeredSlides ? s = s > o ? s - Math.floor(r / 2) + 1 : s + Math.floor(r / 2) - 1 : s > o && n.params.slidesPerGroup, n.slideTo(s, t));
		}
	}
	n("beforeInit", () => {
		let { thumbs: t } = e.params;
		if (!(!t || !t.swiper)) if (typeof t.swiper == "string" || t.swiper instanceof HTMLElement) {
			let n = DB(), r = () => {
				let r = typeof t.swiper == "string" ? n.querySelector(t.swiper) : t.swiper;
				if (r && r.swiper) t.swiper = r.swiper, s(), c(!0);
				else if (r) {
					let n = `${e.params.eventsPrefix}init`, i = (a) => {
						t.swiper = a.detail[0], r.removeEventListener(n, i), s(), c(!0), t.swiper.update(), e.update();
					};
					r.addEventListener(n, i);
				}
				return r;
			}, i = () => {
				e.destroyed || r() || requestAnimationFrame(i);
			};
			requestAnimationFrame(i);
		} else s(), c(!0);
	}), n("slideChange update resize observerUpdate", () => {
		c();
	}), n("setTransition", (t, n) => {
		let r = e.thumbs.swiper;
		!r || r.destroyed || r.setTransition(n);
	}), n("beforeDestroy", () => {
		let t = e.thumbs.swiper;
		!t || t.destroyed || i && t.destroy();
	}), Object.assign(e.thumbs, {
		init: s,
		update: c
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/free-mode.mjs
function XH({ swiper: e, extendParams: t, emit: n, once: r }) {
	t({ freeMode: {
		enabled: !1,
		momentum: !0,
		momentumRatio: 1,
		momentumBounce: !0,
		momentumBounceRatio: 1,
		momentumVelocityRatio: 1,
		sticky: !1,
		minimumVelocity: .02
	} });
	function i() {
		if (e.params.cssMode) return;
		let t = e.getTranslate();
		e.setTranslate(t), e.setTransition(0), e.touchEventsData.velocities.length = 0, e.freeMode.onTouchEnd({ currentPos: e.rtl ? e.translate : -e.translate });
	}
	function a() {
		if (e.params.cssMode) return;
		let { touchEventsData: t, touches: n } = e;
		t.velocities.length === 0 && t.velocities.push({
			position: n[e.isHorizontal() ? "startX" : "startY"],
			time: t.touchStartTime
		}), t.velocities.push({
			position: n[e.isHorizontal() ? "currentX" : "currentY"],
			time: NB()
		});
	}
	function o({ currentPos: t }) {
		if (e.params.cssMode) return;
		let { params: i, wrapperEl: a, rtlTranslate: o, snapGrid: s, touchEventsData: c } = e, l = NB() - c.touchStartTime;
		if (t < -e.minTranslate()) {
			e.slideTo(e.activeIndex);
			return;
		}
		if (t > -e.maxTranslate()) {
			e.slides.length < s.length ? e.slideTo(s.length - 1) : e.slideTo(e.slides.length - 1);
			return;
		}
		if (i.freeMode.momentum) {
			if (c.velocities.length > 1) {
				let t = c.velocities.pop(), n = c.velocities.pop(), r = t.position - n.position, a = t.time - n.time;
				e.velocity = r / a, e.velocity /= 2, Math.abs(e.velocity) < i.freeMode.minimumVelocity && (e.velocity = 0), (a > 150 || NB() - t.time > 300) && (e.velocity = 0);
			} else e.velocity = 0;
			e.velocity *= i.freeMode.momentumVelocityRatio, c.velocities.length = 0;
			let t = 1e3 * i.freeMode.momentumRatio, l = e.velocity * t, u = e.translate + l;
			o && (u = -u);
			let d = !1, f, p = Math.abs(e.velocity) * 20 * i.freeMode.momentumBounceRatio, m;
			if (u < e.maxTranslate()) i.freeMode.momentumBounce ? (u + e.maxTranslate() < -p && (u = e.maxTranslate() - p), f = e.maxTranslate(), d = !0, c.allowMomentumBounce = !0) : u = e.maxTranslate(), i.loop && i.centeredSlides && (m = !0);
			else if (u > e.minTranslate()) i.freeMode.momentumBounce ? (u - e.minTranslate() > p && (u = e.minTranslate() + p), f = e.minTranslate(), d = !0, c.allowMomentumBounce = !0) : u = e.minTranslate(), i.loop && i.centeredSlides && (m = !0);
			else if (i.freeMode.sticky) {
				let t;
				for (let e = 0; e < s.length; e += 1) if (s[e] > -u) {
					t = e;
					break;
				}
				u = Math.abs(s[t] - u) < Math.abs(s[t - 1] - u) || e.swipeDirection === "next" ? s[t] : s[t - 1], u = -u;
			}
			if (m && r("transitionEnd", () => {
				e.loopFix();
			}), e.velocity !== 0) {
				if (t = Math.abs(o ? (-u - e.translate) / e.velocity : (u - e.translate) / e.velocity), i.freeMode.sticky) {
					let n = Math.abs((o ? -u : u) - e.translate), r = e.slidesSizesGrid[e.activeIndex];
					t = n < r ? i.speed : n < 2 * r ? i.speed * 1.5 : i.speed * 2.5;
				}
			} else if (i.freeMode.sticky) {
				e.slideToClosest();
				return;
			}
			i.freeMode.momentumBounce && d ? (e.updateProgress(f), e.setTransition(t), e.setTranslate(u), e.transitionStart(!0, e.swipeDirection), e.animating = !0, $B(a, () => {
				!e || e.destroyed || !c.allowMomentumBounce || (n("momentumBounce"), e.setTransition(i.speed), setTimeout(() => {
					e.setTranslate(f), $B(a, () => {
						!e || e.destroyed || e.transitionEnd();
					});
				}, 0));
			})) : e.velocity ? (n("_freeModeNoMomentumRelease"), e.updateProgress(u), e.setTransition(t), e.setTranslate(u), e.transitionStart(!0, e.swipeDirection), e.animating || (e.animating = !0, $B(a, () => {
				!e || e.destroyed || e.transitionEnd();
			}))) : e.updateProgress(u), e.updateActiveIndex(), e.updateSlidesClasses();
		} else if (i.freeMode.sticky) {
			e.slideToClosest();
			return;
		} else i.freeMode && n("_freeModeNoMomentumRelease");
		(!i.freeMode.momentum || l >= i.longSwipesMs) && (n("_freeModeStaticRelease"), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses());
	}
	Object.assign(e, { freeMode: {
		onTouchStart: i,
		onTouchMove: a,
		onTouchEnd: o
	} });
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/grid.mjs
function ZH({ swiper: e, extendParams: t, on: n }) {
	t({ grid: {
		rows: 1,
		fill: "column"
	} });
	let r, i, a, o, s = () => {
		let t = e.params.spaceBetween;
		return typeof t == "string" && t.indexOf("%") >= 0 ? t = parseFloat(t.replace("%", "")) / 100 * e.size : typeof t == "string" && (t = parseFloat(t)), t;
	};
	n("init", () => {
		o = e.params.grid && e.params.grid.rows > 1;
	}), n("update", () => {
		let { params: t, el: n } = e, r = t.grid && t.grid.rows > 1;
		o && !r ? (n.classList.remove(`${t.containerModifierClass}grid`, `${t.containerModifierClass}grid-column`), a = 1, e.emitContainerClasses()) : !o && r && (n.classList.add(`${t.containerModifierClass}grid`), t.grid.fill === "column" && n.classList.add(`${t.containerModifierClass}grid-column`), e.emitContainerClasses()), o = r;
	}), e.grid = {
		initSlides: (t) => {
			let { slidesPerView: n } = e.params, { rows: o, fill: s } = e.params.grid, c = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : t.length;
			a = Math.floor(c / o), r = Math.floor(c / o) === c / o ? c : Math.ceil(c / o) * o, n !== "auto" && s === "row" && (r = Math.max(r, Math.floor(n) * o)), i = r / o;
		},
		unsetSlides: () => {
			e.slides && e.slides.forEach((t) => {
				t.swiperSlideGridSet && (t.style.height = "", t.style[e.getDirectionLabel("margin-top")] = "");
			});
		},
		updateSlide: (t, n, o) => {
			let { slidesPerGroup: c } = e.params, l = s(), { rows: u, fill: d } = e.params.grid, f = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : o.length, p, m, h;
			if (d === "row" && c > 1) {
				let e = Math.floor(t / (c * u)), i = t - u * c * e, a = e === 0 ? c : Math.min(Math.ceil((f - e * u * c) / u), c);
				h = Math.floor(i / a), m = i - h * a + e * c, p = m + h * r / u, n.style.order = p;
			} else d === "column" ? (m = Math.floor(t / u), h = t - m * u, (m > a || m === a && h === u - 1) && (h += 1, h >= u && (h = 0, m += 1))) : (h = Math.floor(t / i), m = t - h * i);
			n.row = h, n.column = m, n.style.height = `calc((100% - ${(u - 1) * l}px) / ${u})`, n.style[e.getDirectionLabel("margin-top")] = h === 0 ? "" : l && `${l}px`, n.swiperSlideGridSet = !0;
		},
		updateWrapperSize: (t, n) => {
			let { centeredSlides: i, roundLengths: a } = e.params, o = s(), { rows: c } = e.params.grid;
			if (e.virtualSize = (t + o) * r, e.virtualSize = Math.ceil(e.virtualSize / c) - o, e.params.cssMode || (e.wrapperEl.style[e.getDirectionLabel("width")] = `${e.virtualSize + o}px`), i) {
				let t = [];
				for (let r = 0; r < n.length; r += 1) {
					let i = n[r];
					a && (i = Math.floor(i)), n[r] < e.virtualSize + n[0] && t.push(i);
				}
				n.splice(0, n.length), n.push(...t);
			}
		}
	};
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/manipulation.mjs
function QH(e) {
	let t = this, { params: n, slidesEl: r } = t;
	n.loop && t.loopDestroy();
	let i = (e) => {
		if (typeof e == "string") {
			let t = document.createElement("div");
			rV(t, e), r.append(t.children[0]), rV(t, "");
		} else r.append(e);
	};
	if (typeof e == "object" && "length" in e) for (let t = 0; t < e.length; t += 1) e[t] && i(e[t]);
	else i(e);
	t.recalcSlides(), n.loop && t.loopCreate(), (!n.observer || t.isElement) && t.update();
}
function $H(e) {
	let t = this, { params: n, activeIndex: r, slidesEl: i } = t;
	n.loop && t.loopDestroy();
	let a = r + 1, o = (e) => {
		if (typeof e == "string") {
			let t = document.createElement("div");
			rV(t, e), i.prepend(t.children[0]), rV(t, "");
		} else i.prepend(e);
	};
	if (typeof e == "object" && "length" in e) {
		for (let t = 0; t < e.length; t += 1) e[t] && o(e[t]);
		a = r + e.length;
	} else o(e);
	t.recalcSlides(), n.loop && t.loopCreate(), (!n.observer || t.isElement) && t.update(), t.slideTo(a, 0, !1);
}
function eU(e, t) {
	let n = this, { params: r, activeIndex: i, slidesEl: a } = n, o = i;
	r.loop && (o -= n.loopedSlides, n.loopDestroy(), n.recalcSlides());
	let s = n.slides.length;
	if (e <= 0) {
		n.prependSlide(t);
		return;
	}
	if (e >= s) {
		n.appendSlide(t);
		return;
	}
	let c = o > e ? o + 1 : o, l = [];
	for (let t = s - 1; t >= e; --t) {
		let e = n.slides[t];
		e.remove(), l.unshift(e);
	}
	if (typeof t == "object" && "length" in t) {
		for (let e = 0; e < t.length; e += 1) t[e] && a.append(t[e]);
		c = o > e ? o + t.length : o;
	} else a.append(t);
	for (let e = 0; e < l.length; e += 1) a.append(l[e]);
	n.recalcSlides(), r.loop && n.loopCreate(), (!r.observer || n.isElement) && n.update(), r.loop ? n.slideTo(c + n.loopedSlides, 0, !1) : n.slideTo(c, 0, !1);
}
function tU(e) {
	let t = this, { params: n, activeIndex: r } = t, i = r;
	n.loop && (i -= t.loopedSlides, t.loopDestroy());
	let a = i, o;
	if (typeof e == "object" && "length" in e) {
		for (let n = 0; n < e.length; n += 1) o = e[n], t.slides[o] && t.slides[o].remove(), o < a && --a;
		a = Math.max(a, 0);
	} else o = e, t.slides[o] && t.slides[o].remove(), o < a && --a, a = Math.max(a, 0);
	t.recalcSlides(), n.loop && t.loopCreate(), (!n.observer || t.isElement) && t.update(), n.loop ? t.slideTo(a + t.loopedSlides, 0, !1) : t.slideTo(a, 0, !1);
}
function nU() {
	let e = this, t = [];
	for (let n = 0; n < e.slides.length; n += 1) t.push(n);
	e.removeSlide(t);
}
function rU({ swiper: e }) {
	Object.assign(e, {
		appendSlide: QH.bind(e),
		prependSlide: $H.bind(e),
		addSlide: eU.bind(e),
		removeSlide: tU.bind(e),
		removeAllSlides: nU.bind(e)
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/shared/effect-init.mjs
function iU(e) {
	let { effect: t, swiper: n, on: r, setTranslate: i, setTransition: a, overwriteParams: o, perspective: s, recreateShadows: c, getEffectParams: l } = e;
	r("beforeInit", () => {
		if (n.params.effect !== t) return;
		n.classNames.push(`${n.params.containerModifierClass}${t}`), s && s() && n.classNames.push(`${n.params.containerModifierClass}3d`);
		let e = o ? o() : {};
		Object.assign(n.params, e), Object.assign(n.originalParams, e);
	}), r("setTranslate _virtualUpdated", () => {
		n.params.effect === t && i();
	}), r("setTransition", (e, r) => {
		n.params.effect === t && a(r);
	}), r("transitionEnd", () => {
		if (n.params.effect === t && c) {
			if (!l || !l().slideShadows) return;
			n.slides.forEach((e) => {
				e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e) => e.remove());
			}), c();
		}
	});
	let u;
	r("virtualUpdate", () => {
		n.params.effect === t && (n.slides.length || (u = !0), requestAnimationFrame(() => {
			u && n.slides && n.slides.length && (i(), u = !1);
		}));
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/shared/effect-target.mjs
function aU(e, t) {
	let n = VB(t);
	return n !== t && (n.style.backfaceVisibility = "hidden", n.style["-webkit-backface-visibility"] = "hidden"), n;
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/shared/effect-virtual-transition-end.mjs
function oU({ swiper: e, duration: t, transformElements: n, allSlides: r }) {
	let { activeIndex: i } = e, a = (t) => t.parentElement ? t.parentElement : e.slides.find((e) => e.shadowRoot && e.shadowRoot === t.parentNode);
	if (e.params.virtualTranslate && t !== 0) {
		let t = !1, o;
		o = r ? n : n.filter((t) => {
			let n = t.classList.contains("swiper-slide-transform") ? a(t) : t;
			return e.getSlideIndex(n) === i;
		}), o.forEach((n) => {
			$B(n, () => {
				if (t || !e || e.destroyed) return;
				t = !0, e.animating = !1;
				let n = new window.CustomEvent("transitionend", {
					bubbles: !0,
					cancelable: !0
				});
				e.wrapperEl.dispatchEvent(n);
			});
		});
	}
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/effect-fade.mjs
function sU({ swiper: e, extendParams: t, on: n }) {
	t({ fadeEffect: { crossFade: !1 } }), iU({
		effect: "fade",
		swiper: e,
		on: n,
		setTranslate: () => {
			let { slides: t } = e, n = e.params.fadeEffect;
			for (let r = 0; r < t.length; r += 1) {
				let t = e.slides[r], i = -t.swiperSlideOffset;
				e.params.virtualTranslate || (i -= e.translate);
				let a = 0;
				e.isHorizontal() || (a = i, i = 0);
				let o = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(t.progress), 0) : 1 + Math.min(Math.max(t.progress, -1), 0), s = aU(n, t);
				s.style.opacity = o, s.style.transform = `translate3d(${i}px, ${a}px, 0px)`;
			}
		},
		setTransition: (t) => {
			let n = e.slides.map((e) => VB(e));
			n.forEach((e) => {
				e.style.transitionDuration = `${t}ms`;
			}), oU({
				swiper: e,
				duration: t,
				transformElements: n,
				allSlides: !0
			});
		},
		overwriteParams: () => ({
			slidesPerView: 1,
			slidesPerGroup: 1,
			watchSlidesProgress: !0,
			spaceBetween: 0,
			virtualTranslate: !e.params.cssMode
		})
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/effect-cube.mjs
function cU({ swiper: e, extendParams: t, on: n }) {
	t({ cubeEffect: {
		slideShadows: !0,
		shadow: !0,
		shadowOffset: 20,
		shadowScale: .94
	} });
	let r = (e, t, n) => {
		let r = n ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top"), i = n ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
		r || (r = KB("div", `swiper-slide-shadow-cube swiper-slide-shadow-${n ? "left" : "top"}`.split(" ")), e.append(r)), i || (i = KB("div", `swiper-slide-shadow-cube swiper-slide-shadow-${n ? "right" : "bottom"}`.split(" ")), e.append(i)), r && (r.style.opacity = Math.max(-t, 0)), i && (i.style.opacity = Math.max(t, 0));
	};
	iU({
		effect: "cube",
		swiper: e,
		on: n,
		setTranslate: () => {
			let { el: t, wrapperEl: n, slides: i, width: a, height: o, rtlTranslate: s, size: c, browser: l } = e, u = nV(e), d = e.params.cubeEffect, f = e.isHorizontal(), p = e.virtual && e.params.virtual.enabled, m = 0, h;
			d.shadow && (f ? (h = e.wrapperEl.querySelector(".swiper-cube-shadow"), h || (h = KB("div", "swiper-cube-shadow"), e.wrapperEl.append(h)), h.style.height = `${a}px`) : (h = t.querySelector(".swiper-cube-shadow"), h || (h = KB("div", "swiper-cube-shadow"), t.append(h))));
			for (let e = 0; e < i.length; e += 1) {
				let t = i[e], n = e;
				p && (n = parseInt(t.getAttribute("data-swiper-slide-index"), 10));
				let a = n * 90, o = Math.floor(a / 360);
				s && (a = -a, o = Math.floor(-a / 360));
				let l = Math.max(Math.min(t.progress, 1), -1), h = 0, g = 0, _ = 0;
				n % 4 == 0 ? (h = -o * 4 * c, _ = 0) : (n - 1) % 4 == 0 ? (h = 0, _ = -o * 4 * c) : (n - 2) % 4 == 0 ? (h = c + o * 4 * c, _ = c) : (n - 3) % 4 == 0 && (h = -c, _ = 3 * c + c * 4 * o), s && (h = -h), f || (g = h, h = 0);
				let v = `rotateX(${u(f ? 0 : -a)}deg) rotateY(${u(f ? a : 0)}deg) translate3d(${h}px, ${g}px, ${_}px)`;
				l <= 1 && l > -1 && (m = n * 90 + l * 90, s && (m = -n * 90 - l * 90)), t.style.transform = v, d.slideShadows && r(t, l, f);
			}
			if (n.style.transformOrigin = `50% 50% -${c / 2}px`, n.style["-webkit-transform-origin"] = `50% 50% -${c / 2}px`, d.shadow) if (f) h.style.transform = `translate3d(0px, ${a / 2 + d.shadowOffset}px, ${-a / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${d.shadowScale})`;
			else {
				let e = Math.abs(m) - Math.floor(Math.abs(m) / 90) * 90, t = 1.5 - (Math.sin(e * 2 * Math.PI / 360) / 2 + Math.cos(e * 2 * Math.PI / 360) / 2), n = d.shadowScale, r = d.shadowScale / t, i = d.shadowOffset;
				h.style.transform = `scale3d(${n}, 1, ${r}) translate3d(0px, ${o / 2 + i}px, ${-o / 2 / r}px) rotateX(-89.99deg)`;
			}
			let g = (l.isSafari || l.isWebView) && l.needPerspectiveFix ? -c / 2 : 0;
			n.style.transform = `translate3d(0px,0,${g}px) rotateX(${u(e.isHorizontal() ? 0 : m)}deg) rotateY(${u(e.isHorizontal() ? -m : 0)}deg)`, n.style.setProperty("--swiper-cube-translate-z", `${g}px`);
		},
		setTransition: (t) => {
			let { el: n, slides: r } = e;
			if (r.forEach((e) => {
				e.style.transitionDuration = `${t}ms`, e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e) => {
					e.style.transitionDuration = `${t}ms`;
				});
			}), e.params.cubeEffect.shadow && !e.isHorizontal()) {
				let e = n.querySelector(".swiper-cube-shadow");
				e && (e.style.transitionDuration = `${t}ms`);
			}
		},
		recreateShadows: () => {
			let t = e.isHorizontal();
			e.slides.forEach((e) => {
				r(e, Math.max(Math.min(e.progress, 1), -1), t);
			});
		},
		getEffectParams: () => e.params.cubeEffect,
		perspective: () => !0,
		overwriteParams: () => ({
			slidesPerView: 1,
			slidesPerGroup: 1,
			watchSlidesProgress: !0,
			resistanceRatio: 0,
			spaceBetween: 0,
			centeredSlides: !1,
			virtualTranslate: !0
		})
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/shared/create-shadow.mjs
function lU(e, t, n) {
	let r = `swiper-slide-shadow${n ? `-${n}` : ""}${e ? ` swiper-slide-shadow-${e}` : ""}`, i = VB(t), a = i.querySelector(`.${r.split(" ").join(".")}`);
	return a || (a = KB("div", r.split(" ")), i.append(a)), a;
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/effect-flip.mjs
function uU({ swiper: e, extendParams: t, on: n }) {
	t({ flipEffect: {
		slideShadows: !0,
		limitRotation: !0
	} });
	let r = (t, n) => {
		let r = e.isHorizontal() ? t.querySelector(".swiper-slide-shadow-left") : t.querySelector(".swiper-slide-shadow-top"), i = e.isHorizontal() ? t.querySelector(".swiper-slide-shadow-right") : t.querySelector(".swiper-slide-shadow-bottom");
		r ||= lU("flip", t, e.isHorizontal() ? "left" : "top"), i ||= lU("flip", t, e.isHorizontal() ? "right" : "bottom"), r && (r.style.opacity = Math.max(-n, 0)), i && (i.style.opacity = Math.max(n, 0));
	};
	iU({
		effect: "flip",
		swiper: e,
		on: n,
		setTranslate: () => {
			let { slides: t, rtlTranslate: n } = e, i = e.params.flipEffect, a = nV(e);
			for (let o = 0; o < t.length; o += 1) {
				let s = t[o], c = s.progress;
				e.params.flipEffect.limitRotation && (c = Math.max(Math.min(s.progress, 1), -1));
				let l = s.swiperSlideOffset, u = -180 * c, d = 0, f = e.params.cssMode ? -l - e.translate : -l, p = 0;
				e.isHorizontal() ? n && (u = -u) : (p = f, f = 0, d = -u, u = 0), s.style.zIndex = -Math.abs(Math.round(c)) + t.length, i.slideShadows && r(s, c);
				let m = `translate3d(${f}px, ${p}px, 0px) rotateX(${a(d)}deg) rotateY(${a(u)}deg)`, h = aU(i, s);
				h.style.transform = m;
			}
		},
		setTransition: (t) => {
			let n = e.slides.map((e) => VB(e));
			n.forEach((e) => {
				e.style.transitionDuration = `${t}ms`, e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e) => {
					e.style.transitionDuration = `${t}ms`;
				});
			}), oU({
				swiper: e,
				duration: t,
				transformElements: n
			});
		},
		recreateShadows: () => {
			e.params.flipEffect, e.slides.forEach((t) => {
				let n = t.progress;
				e.params.flipEffect.limitRotation && (n = Math.max(Math.min(t.progress, 1), -1)), r(t, n);
			});
		},
		getEffectParams: () => e.params.flipEffect,
		perspective: () => !0,
		overwriteParams: () => ({
			slidesPerView: 1,
			slidesPerGroup: 1,
			watchSlidesProgress: !0,
			spaceBetween: 0,
			virtualTranslate: !e.params.cssMode
		})
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/effect-coverflow.mjs
function dU({ swiper: e, extendParams: t, on: n }) {
	t({ coverflowEffect: {
		rotate: 50,
		stretch: 0,
		depth: 100,
		scale: 1,
		modifier: 1,
		slideShadows: !0
	} }), iU({
		effect: "coverflow",
		swiper: e,
		on: n,
		setTranslate: () => {
			let { width: t, height: n, slides: r, slidesSizesGrid: i } = e, a = e.params.coverflowEffect, o = e.isHorizontal(), s = e.translate, c = o ? -s + t / 2 : -s + n / 2, l = o ? a.rotate : -a.rotate, u = a.depth, d = nV(e);
			for (let e = 0, t = r.length; e < t; e += 1) {
				let t = r[e], n = i[e], s = (c - t.swiperSlideOffset - n / 2) / n, f = typeof a.modifier == "function" ? a.modifier(s) : s * a.modifier, p = o ? l * f : 0, m = o ? 0 : l * f, h = -u * Math.abs(f), g = a.stretch;
				typeof g == "string" && g.indexOf("%") !== -1 && (g = parseFloat(a.stretch) / 100 * n);
				let _ = o ? 0 : g * f, v = o ? g * f : 0, y = 1 - (1 - a.scale) * Math.abs(f);
				Math.abs(v) < .001 && (v = 0), Math.abs(_) < .001 && (_ = 0), Math.abs(h) < .001 && (h = 0), Math.abs(p) < .001 && (p = 0), Math.abs(m) < .001 && (m = 0), Math.abs(y) < .001 && (y = 0);
				let b = `translate3d(${v}px,${_}px,${h}px)  rotateX(${d(m)}deg) rotateY(${d(p)}deg) scale(${y})`, x = aU(a, t);
				if (x.style.transform = b, t.style.zIndex = -Math.abs(Math.round(f)) + 1, a.slideShadows) {
					let e = o ? t.querySelector(".swiper-slide-shadow-left") : t.querySelector(".swiper-slide-shadow-top"), n = o ? t.querySelector(".swiper-slide-shadow-right") : t.querySelector(".swiper-slide-shadow-bottom");
					e ||= lU("coverflow", t, o ? "left" : "top"), n ||= lU("coverflow", t, o ? "right" : "bottom"), e && (e.style.opacity = f > 0 ? f : 0), n && (n.style.opacity = -f > 0 ? -f : 0);
				}
			}
		},
		setTransition: (t) => {
			e.slides.map((e) => VB(e)).forEach((e) => {
				e.style.transitionDuration = `${t}ms`, e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e) => {
					e.style.transitionDuration = `${t}ms`;
				});
			});
		},
		perspective: () => !0,
		overwriteParams: () => ({ watchSlidesProgress: !0 })
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/effect-creative.mjs
function fU({ swiper: e, extendParams: t, on: n }) {
	t({ creativeEffect: {
		limitProgress: 1,
		shadowPerProgress: !1,
		progressMultiplier: 1,
		perspective: !0,
		prev: {
			translate: [
				0,
				0,
				0
			],
			rotate: [
				0,
				0,
				0
			],
			opacity: 1,
			scale: 1
		},
		next: {
			translate: [
				0,
				0,
				0
			],
			rotate: [
				0,
				0,
				0
			],
			opacity: 1,
			scale: 1
		}
	} });
	let r = (e) => typeof e == "string" ? e : `${e}px`;
	iU({
		effect: "creative",
		swiper: e,
		on: n,
		setTranslate: () => {
			let { slides: t, wrapperEl: n, slidesSizesGrid: i } = e, a = e.params.creativeEffect, { progressMultiplier: o } = a, s = e.params.centeredSlides, c = nV(e);
			if (s) {
				let t = i[0] / 2 - e.params.slidesOffsetBefore || 0;
				n.style.transform = `translateX(calc(50% - ${t}px))`;
			}
			for (let n = 0; n < t.length; n += 1) {
				let i = t[n], l = i.progress, u = Math.min(Math.max(i.progress, -a.limitProgress), a.limitProgress), d = u;
				s || (d = Math.min(Math.max(i.originalProgress, -a.limitProgress), a.limitProgress));
				let f = i.swiperSlideOffset, p = [
					e.params.cssMode ? -f - e.translate : -f,
					0,
					0
				], m = [
					0,
					0,
					0
				], h = !1;
				e.isHorizontal() || (p[1] = p[0], p[0] = 0);
				let g = {
					translate: [
						0,
						0,
						0
					],
					rotate: [
						0,
						0,
						0
					],
					scale: 1,
					opacity: 1
				};
				u < 0 ? (g = a.next, h = !0) : u > 0 && (g = a.prev, h = !0), p.forEach((e, t) => {
					p[t] = `calc(${e}px + (${r(g.translate[t])} * ${Math.abs(u * o)}))`;
				}), m.forEach((e, t) => {
					m[t] = g.rotate[t] * Math.abs(u * o);
				}), i.style.zIndex = -Math.abs(Math.round(l)) + t.length;
				let _ = p.join(", "), v = `rotateX(${c(m[0])}deg) rotateY(${c(m[1])}deg) rotateZ(${c(m[2])}deg)`, y = d < 0 ? `scale(${1 + (1 - g.scale) * d * o})` : `scale(${1 - (1 - g.scale) * d * o})`, b = d < 0 ? 1 + (1 - g.opacity) * d * o : 1 - (1 - g.opacity) * d * o, x = `translate3d(${_}) ${v} ${y}`;
				if (h && g.shadow || !h) {
					let e = i.querySelector(".swiper-slide-shadow");
					if (!e && g.shadow && (e = lU("creative", i)), e) {
						let t = a.shadowPerProgress ? u * (1 / a.limitProgress) : u;
						e.style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
					}
				}
				let S = aU(a, i);
				S.style.transform = x, S.style.opacity = b, g.origin && (S.style.transformOrigin = g.origin);
			}
		},
		setTransition: (t) => {
			let n = e.slides.map((e) => VB(e));
			n.forEach((e) => {
				e.style.transitionDuration = `${t}ms`, e.querySelectorAll(".swiper-slide-shadow").forEach((e) => {
					e.style.transitionDuration = `${t}ms`;
				});
			}), oU({
				swiper: e,
				duration: t,
				transformElements: n,
				allSlides: !0
			});
		},
		perspective: () => e.params.creativeEffect.perspective,
		overwriteParams: () => ({
			watchSlidesProgress: !0,
			virtualTranslate: !e.params.cssMode
		})
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/modules/effect-cards.mjs
function pU({ swiper: e, extendParams: t, on: n }) {
	t({ cardsEffect: {
		slideShadows: !0,
		rotate: !0,
		perSlideRotate: 2,
		perSlideOffset: 8
	} }), iU({
		effect: "cards",
		swiper: e,
		on: n,
		setTranslate: () => {
			let { slides: t, activeIndex: n, rtlTranslate: r } = e, i = e.params.cardsEffect, { startTranslate: a, isTouched: o } = e.touchEventsData, s = r ? -e.translate : e.translate;
			for (let c = 0; c < t.length; c += 1) {
				let l = t[c], u = l.progress, d = Math.min(Math.max(u, -4), 4), f = l.swiperSlideOffset;
				e.params.centeredSlides && !e.params.cssMode && (e.wrapperEl.style.transform = `translateX(${e.minTranslate()}px)`), e.params.centeredSlides && e.params.cssMode && (f -= t[0].swiperSlideOffset);
				let p = e.params.cssMode ? -f - e.translate : -f, m = 0, h = -100 * Math.abs(d), g = 1, _ = -i.perSlideRotate * d, v = i.perSlideOffset - Math.abs(d) * .75, y = e.virtual && e.params.virtual.enabled ? e.virtual.from + c : c, b = (y === n || y === n - 1) && d > 0 && d < 1 && (o || e.params.cssMode) && s < a, x = (y === n || y === n + 1) && d < 0 && d > -1 && (o || e.params.cssMode) && s > a;
				if (b || x) {
					let t = (1 - Math.abs((Math.abs(d) - .5) / .5)) ** .5;
					_ += -28 * d * t, g += -.5 * t, v += 96 * t, m = `${(i.rotate || e.isHorizontal() ? -25 : 0) * t * Math.abs(d)}%`;
				}
				if (p = d < 0 ? `calc(${p}px ${r ? "-" : "+"} (${v * Math.abs(d)}%))` : d > 0 ? `calc(${p}px ${r ? "-" : "+"} (-${v * Math.abs(d)}%))` : `${p}px`, !e.isHorizontal()) {
					let e = m;
					m = p, p = e;
				}
				let S = d < 0 ? `${1 + (1 - g) * d}` : `${1 - (1 - g) * d}`, C = `
        translate3d(${p}, ${m}, ${h}px)
        rotateZ(${i.rotate ? r ? -_ : _ : 0}deg)
        scale(${S})
      `;
				if (i.slideShadows) {
					let e = l.querySelector(".swiper-slide-shadow");
					e ||= lU("cards", l), e && (e.style.opacity = Math.min(Math.max((Math.abs(d) - .5) / .5, 0), 1));
				}
				l.style.zIndex = -Math.abs(Math.round(u)) + t.length;
				let w = aU(i, l);
				w.style.transform = C;
			}
		},
		setTransition: (t) => {
			let n = e.slides.map((e) => VB(e));
			n.forEach((e) => {
				e.style.transitionDuration = `${t}ms`, e.querySelectorAll(".swiper-slide-shadow").forEach((e) => {
					e.style.transitionDuration = `${t}ms`;
				});
			}), oU({
				swiper: e,
				duration: t,
				transformElements: n
			});
		},
		perspective: () => !0,
		overwriteParams: () => ({
			_loopSwapReset: !1,
			watchSlidesProgress: !0,
			loopAdditionalSlides: e.params.cardsEffect.rotate ? 3 : 2,
			centeredSlides: !0,
			virtualTranslate: !e.params.cssMode
		})
	});
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/swiper-bundle.mjs
var mU = [
	NH,
	PH,
	FH,
	RH,
	BH,
	VH,
	HH,
	UH,
	WH,
	GH,
	KH,
	qH,
	JH,
	YH,
	XH,
	ZH,
	rU,
	sU,
	cU,
	uU,
	dU,
	fU,
	pU
];
MH.use(mU);
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/shared/update-swiper.mjs
var hU = /* @__PURE__ */ "eventsPrefix.injectStyles.injectStylesUrls.modules.init._direction.oneWayMovement.swiperElementNodeName.touchEventsTarget.initialSlide._speed.cssMode.updateOnWindowResize.resizeObserver.nested.focusableElements._enabled._width._height.preventInteractionOnTransition.userAgent.url._edgeSwipeDetection._edgeSwipeThreshold._freeMode._autoHeight.setWrapperSize.virtualTranslate._effect.breakpoints.breakpointsBase._spaceBetween._slidesPerView.maxBackfaceHiddenSlides._grid._slidesPerGroup._slidesPerGroupSkip._slidesPerGroupAuto._centeredSlides._centeredSlidesBounds._slidesOffsetBefore._slidesOffsetAfter.normalizeSlideIndex._centerInsufficientSlides._snapToSlideEdge._watchOverflow.roundLengths.touchRatio.touchAngle.simulateTouch._shortSwipes._longSwipes.longSwipesRatio.longSwipesMs._followFinger.allowTouchMove._threshold.touchMoveStopPropagation.touchStartPreventDefault.touchStartForcePreventDefault.touchReleaseOnEdges.uniqueNavElements._resistance._resistanceRatio._watchSlidesProgress._grabCursor.preventClicks.preventClicksPropagation._slideToClickedSlide._loop.loopAdditionalSlides.loopAddBlankSlides.loopPreventsSliding._rewind._allowSlidePrev._allowSlideNext._swipeHandler._noSwiping.noSwipingClass.noSwipingSelector.passiveListeners.containerModifierClass.slideClass.slideActiveClass.slideVisibleClass.slideFullyVisibleClass.slideNextClass.slidePrevClass.slideBlankClass.wrapperClass.lazyPreloaderClass.lazyPreloadPrevNext.runCallbacksOnInit.observer.observeParents.observeSlideChildren.a11y._autoplay._controller.coverflowEffect.cubeEffect.fadeEffect.flipEffect.creativeEffect.cardsEffect.hashNavigation.history.keyboard.mousewheel._navigation._pagination.parallax._scrollbar._thumbs.virtual.zoom.control".split(".");
function gU(e) {
	return typeof e == "object" && !!e && e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object" && !e.__swiper__;
}
function _U(e, t) {
	let n = [
		"__proto__",
		"constructor",
		"prototype"
	];
	Object.keys(t).filter((e) => n.indexOf(e) < 0).forEach((n) => {
		e[n] === void 0 ? e[n] = t[n] : gU(t[n]) && gU(e[n]) && Object.keys(t[n]).length > 0 ? t[n].__swiper__ ? e[n] = t[n] : _U(e[n], t[n]) : e[n] = t[n];
	});
}
function vU(e = {}) {
	return e.navigation && e.navigation.nextEl === void 0 && e.navigation.prevEl === void 0;
}
function yU(e = {}) {
	return e.pagination && e.pagination.el === void 0;
}
function bU(e = {}) {
	return e.scrollbar && e.scrollbar.el === void 0;
}
function xU(e = "") {
	return e.replace(/-[a-z]/g, (e) => e.toUpperCase().replace("-", ""));
}
function SU({ swiper: e, slides: t, passedParams: n, changedParams: r, nextEl: i, prevEl: a, scrollbarEl: o, paginationEl: s }) {
	let c = r.filter((e) => e !== "children" && e !== "direction" && e !== "wrapperClass"), { params: l, pagination: u, navigation: d, scrollbar: f, virtual: p, thumbs: m } = e, h, g, _, v, y, b, x, S;
	r.includes("thumbs") && n.thumbs && n.thumbs.swiper && !n.thumbs.swiper.destroyed && l.thumbs && (!l.thumbs.swiper || l.thumbs.swiper.destroyed) && (h = !0), r.includes("controller") && n.controller && n.controller.control && l.controller && !l.controller.control && (g = !0), r.includes("pagination") && n.pagination && (n.pagination.el || s) && (l.pagination || l.pagination === !1) && u && !u.el && (_ = !0), r.includes("scrollbar") && n.scrollbar && (n.scrollbar.el || o) && (l.scrollbar || l.scrollbar === !1) && f && !f.el && (v = !0), r.includes("navigation") && n.navigation && (n.navigation.prevEl || a) && (n.navigation.nextEl || i) && (l.navigation || l.navigation === !1) && d && !d.prevEl && !d.nextEl && (y = !0);
	let C = (t) => {
		e[t] && (e[t].destroy(), t === "navigation" ? (e.isElement && (e[t].prevEl.remove(), e[t].nextEl.remove()), l[t].prevEl = void 0, l[t].nextEl = void 0, e[t].prevEl = void 0, e[t].nextEl = void 0) : (e.isElement && e[t].el.remove(), l[t].el = void 0, e[t].el = void 0));
	};
	r.includes("loop") && e.isElement && (l.loop && !n.loop ? b = !0 : !l.loop && n.loop ? x = !0 : S = !0), c.forEach((e) => {
		if (gU(l[e]) && gU(n[e])) Object.assign(l[e], n[e]), (e === "navigation" || e === "pagination" || e === "scrollbar") && "enabled" in n[e] && !n[e].enabled && C(e);
		else {
			let t = n[e];
			(t === !0 || t === !1) && (e === "navigation" || e === "pagination" || e === "scrollbar") ? t === !1 && C(e) : l[e] = n[e];
		}
	}), c.includes("controller") && !g && e.controller && e.controller.control && l.controller && l.controller.control && (e.controller.control = l.controller.control), r.includes("children") && t && p && l.virtual.enabled ? (p.slides = t, p.update(!0)) : r.includes("virtual") && p && l.virtual.enabled && (t && (p.slides = t), p.update(!0)), r.includes("children") && t && l.loop && (S = !0), h && m.init() && m.update(!0), g && (e.controller.control = l.controller.control), _ && (e.isElement && (!s || typeof s == "string") && (s = document.createElement("div"), s.classList.add("swiper-pagination"), s.part.add("pagination"), e.el.appendChild(s)), s && (l.pagination.el = s), u.init(), u.render(), u.update()), v && (e.isElement && (!o || typeof o == "string") && (o = document.createElement("div"), o.classList.add("swiper-scrollbar"), o.part.add("scrollbar"), e.el.appendChild(o)), o && (l.scrollbar.el = o), f.init(), f.updateSize(), f.setTranslate()), y && (e.isElement && ((!i || typeof i == "string") && (i = document.createElement("div"), i.classList.add("swiper-button-next"), rV(i, e.navigation.arrowSvg), i.part.add("button-next"), e.el.appendChild(i)), (!a || typeof a == "string") && (a = document.createElement("div"), a.classList.add("swiper-button-prev"), rV(a, e.navigation.arrowSvg), a.part.add("button-prev"), e.el.appendChild(a))), i && (l.navigation.nextEl = i), a && (l.navigation.prevEl = a), d.init(), d.update()), r.includes("allowSlideNext") && (e.allowSlideNext = n.allowSlideNext), r.includes("allowSlidePrev") && (e.allowSlidePrev = n.allowSlidePrev), r.includes("direction") && e.changeDirection(n.direction, !1), (b || S) && e.loopDestroy(), (x || S) && e.loopCreate(), e.update();
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/shared/get-element-params.mjs
var CU = (e) => {
	if (parseFloat(e) === Number(e)) return Number(e);
	if (e === "true" || e === "") return !0;
	if (e === "false") return !1;
	if (e === "null") return null;
	if (e !== "undefined") {
		if (typeof e == "string" && e.includes("{") && e.includes("}") && e.includes("\"")) {
			let t;
			try {
				t = JSON.parse(e);
			} catch {
				t = e;
			}
			return t;
		}
		return e;
	}
}, wU = [
	"a11y",
	"autoplay",
	"controller",
	"cards-effect",
	"coverflow-effect",
	"creative-effect",
	"cube-effect",
	"fade-effect",
	"flip-effect",
	"free-mode",
	"grid",
	"hash-navigation",
	"history",
	"keyboard",
	"mousewheel",
	"navigation",
	"pagination",
	"parallax",
	"scrollbar",
	"thumbs",
	"virtual",
	"zoom"
];
function TU(e, t, n) {
	let r = {}, i = {};
	_U(r, OH);
	let a = [...hU, "on"], o = a.map((e) => e.replace(/_/, ""));
	a.forEach((t) => {
		t = t.replace("_", ""), e[t] !== void 0 && (i[t] = e[t]);
	});
	let s = [...e.attributes];
	return typeof t == "string" && n !== void 0 && s.push({
		name: t,
		value: gU(n) ? { ...n } : n
	}), s.forEach((e) => {
		let t = wU.find((t) => e.name.startsWith(`${t}-`));
		if (t) {
			let n = xU(t), r = xU(e.name.split(`${t}-`)[1]);
			i[n] === void 0 && (i[n] = {}), i[n] === !0 && (i[n] = { enabled: !0 }), i[n] === !1 && (i[n] = { enabled: !1 }), i[n][r] = CU(e.value);
		} else {
			let t = xU(e.name);
			if (!o.includes(t)) return;
			let n = CU(e.value);
			i[t] && wU.includes(e.name) && !gU(n) ? (i[t].constructor !== Object && (i[t] = {}), i[t].enabled = !!n) : i[t] = n;
		}
	}), _U(r, i), r.navigation ? r.navigation = {
		prevEl: ".swiper-button-prev",
		nextEl: ".swiper-button-next",
		...r.navigation === !0 ? {} : r.navigation
	} : r.navigation === !1 && delete r.navigation, r.scrollbar ? r.scrollbar = {
		el: ".swiper-scrollbar",
		...r.scrollbar === !0 ? {} : r.scrollbar
	} : r.scrollbar === !1 && delete r.scrollbar, r.pagination ? r.pagination = {
		el: ".swiper-pagination",
		...r.pagination === !0 ? {} : r.pagination
	} : r.pagination === !1 && delete r.pagination, {
		params: r,
		passedParams: i
	};
}
//#endregion
//#region ../../node_modules/.bun/swiper@12.2.0/node_modules/swiper/swiper-element-bundle.mjs
var EU = ":host{--swiper-theme-color:#007aff}:host{display:block;margin-left:auto;margin-right:auto;position:relative;z-index:1}.swiper{display:block;height:100%;list-style:none;margin-left:auto;margin-right:auto;overflow:hidden;padding:0;position:relative;width:100%;z-index:1}.swiper-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{box-sizing:initial;display:flex;height:100%;position:relative;transition-property:transform;transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial);width:100%;z-index:1}.swiper-android ::slotted(swiper-slide),.swiper-ios ::slotted(swiper-slide),.swiper-wrapper{transform:translateZ(0)}.swiper-horizontal{touch-action:pan-y}.swiper-vertical{touch-action:pan-x}::slotted(swiper-slide){display:block;flex-shrink:0;height:100%;position:relative;transition-property:transform;width:100%}::slotted(.swiper-slide-invisible-blank){visibility:hidden}.swiper-autoheight,.swiper-autoheight ::slotted(swiper-slide){height:auto}.swiper-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-backface-hidden ::slotted(swiper-slide){backface-visibility:hidden;transform:translateZ(0)}.swiper-3d.swiper-css-mode .swiper-wrapper{perspective:1200px}.swiper-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-3d{perspective:1200px}.swiper-3d .swiper-cube-shadow,.swiper-3d ::slotted(swiper-slide){transform-style:preserve-3d}.swiper-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-css-mode ::slotted(swiper-slide){scroll-snap-align:start start}.swiper-css-mode.swiper-horizontal>.swiper-wrapper{scroll-snap-type:x mandatory}.swiper-css-mode.swiper-horizontal ::slotted(swiper-slide):first-child{margin-inline-start:var(--swiper-slides-offset-before);scroll-margin-inline-start:var(--swiper-slides-offset-before)}.swiper-css-mode.swiper-horizontal ::slotted(swiper-slide):last-child{margin-inline-end:var(--swiper-slides-offset-after)}.swiper-css-mode.swiper-vertical>.swiper-wrapper{scroll-snap-type:y mandatory}.swiper-css-mode.swiper-vertical ::slotted(swiper-slide):first-child{margin-block-start:var(--swiper-slides-offset-before);scroll-margin-block-start:var(--swiper-slides-offset-before)}.swiper-css-mode.swiper-vertical ::slotted(swiper-slide):last-child{margin-block-end:var(--swiper-slides-offset-after)}.swiper-css-mode.swiper-free-mode>.swiper-wrapper{scroll-snap-type:none}.swiper-css-mode.swiper-free-mode ::slotted(swiper-slide){scroll-snap-align:none}.swiper-css-mode.swiper-centered>.swiper-wrapper:before{content:\"\";flex-shrink:0;order:9999}.swiper-css-mode.swiper-centered ::slotted(swiper-slide){scroll-snap-align:center center;scroll-snap-stop:always}.swiper-css-mode.swiper-centered.swiper-horizontal ::slotted(swiper-slide):first-child{margin-inline-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-horizontal>.swiper-wrapper:before{height:100%;min-height:1px;width:var(--swiper-centered-offset-after)}.swiper-css-mode.swiper-centered.swiper-vertical ::slotted(swiper-slide):first-child{margin-block-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-vertical>.swiper-wrapper:before{height:var(--swiper-centered-offset-after);min-width:1px;width:100%}.swiper-virtual ::slotted(swiper-slide){-webkit-backface-visibility:hidden;transform:translateZ(0)}.swiper-virtual.swiper-css-mode .swiper-wrapper:after{content:\"\";left:0;pointer-events:none;position:absolute;top:0}.swiper-virtual.swiper-css-mode.swiper-horizontal .swiper-wrapper:after{height:1px;width:var(--swiper-virtual-size)}.swiper-virtual.swiper-css-mode.swiper-vertical .swiper-wrapper:after{height:var(--swiper-virtual-size);width:1px}:host{--swiper-navigation-size:44px}.swiper-button-next,.swiper-button-prev{align-items:center;color:var(--swiper-navigation-color,var(--swiper-theme-color));cursor:pointer;display:flex;height:var(--swiper-navigation-size);justify-content:center;position:absolute;width:var(--swiper-navigation-size);z-index:10}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{cursor:auto;opacity:.35;pointer-events:none}.swiper-button-next.swiper-button-hidden,.swiper-button-prev.swiper-button-hidden{cursor:auto;opacity:0;pointer-events:none}.swiper-navigation-disabled .swiper-button-next,.swiper-navigation-disabled .swiper-button-prev{display:none!important}.swiper-button-next ::slotted(svg),.swiper-button-next svg,.swiper-button-prev ::slotted(svg),.swiper-button-prev svg{height:100%;object-fit:contain;transform-origin:center;width:100%;fill:currentColor;pointer-events:none}.swiper-button-lock{display:none}.swiper-button-next,.swiper-button-prev{margin-top:calc(0px - var(--swiper-navigation-size)/2);top:var(--swiper-navigation-top-offset,50%)}.swiper-button-prev{left:var(--swiper-navigation-sides-offset,4px);right:auto}.swiper-button-prev .swiper-navigation-icon,.swiper-button-prev ::slotted(.swiper-navigation-icon){transform:rotate(180deg)}.swiper-button-next{left:auto;right:var(--swiper-navigation-sides-offset,4px)}.swiper-horizontal .swiper-button-next,.swiper-horizontal .swiper-button-prev,.swiper-horizontal~.swiper-button-next,.swiper-horizontal~.swiper-button-prev{margin-left:0;margin-top:calc(0px - var(--swiper-navigation-size)/2);top:var(--swiper-navigation-top-offset,50%)}.swiper-horizontal .swiper-button-prev,.swiper-horizontal.swiper-rtl .swiper-button-next,.swiper-horizontal.swiper-rtl~.swiper-button-next,.swiper-horizontal~.swiper-button-prev{left:var(--swiper-navigation-sides-offset,4px);right:auto}.swiper-horizontal .swiper-button-next,.swiper-horizontal.swiper-rtl .swiper-button-prev,.swiper-horizontal.swiper-rtl~.swiper-button-prev,.swiper-horizontal~.swiper-button-next{left:auto;right:var(--swiper-navigation-sides-offset,4px)}.swiper-horizontal .swiper-button-prev .swiper-navigation-icon,.swiper-horizontal .swiper-button-prev ::slotted(.swiper-navigation-icon),.swiper-horizontal.swiper-rtl .swiper-button-next .swiper-navigation-icon,.swiper-horizontal.swiper-rtl .swiper-button-next ::slotted(.swiper-navigation-icon),.swiper-horizontal.swiper-rtl~.swiper-button-next .swiper-navigation-icon,.swiper-horizontal.swiper-rtl~.swiper-button-next ::slotted(.swiper-navigation-icon),.swiper-horizontal~.swiper-button-prev .swiper-navigation-icon,.swiper-horizontal~.swiper-button-prev ::slotted(.swiper-navigation-icon){transform:rotate(180deg)}.swiper-horizontal.swiper-rtl .swiper-button-prev .swiper-navigation-icon,.swiper-horizontal.swiper-rtl .swiper-button-prev ::slotted(.swiper-navigation-icon),.swiper-horizontal.swiper-rtl~.swiper-button-prev .swiper-navigation-icon,.swiper-horizontal.swiper-rtl~.swiper-button-prev ::slotted(.swiper-navigation-icon){transform:rotate(0deg)}.swiper-vertical .swiper-button-next,.swiper-vertical .swiper-button-prev,.swiper-vertical~.swiper-button-next,.swiper-vertical~.swiper-button-prev{left:var(--swiper-navigation-top-offset,50%);margin-left:calc(0px - var(--swiper-navigation-size)/2);margin-top:0;right:auto}.swiper-vertical .swiper-button-prev,.swiper-vertical~.swiper-button-prev{bottom:auto;top:var(--swiper-navigation-sides-offset,4px)}.swiper-vertical .swiper-button-prev .swiper-navigation-icon,.swiper-vertical .swiper-button-prev ::slotted(.swiper-navigation-icon),.swiper-vertical~.swiper-button-prev .swiper-navigation-icon,.swiper-vertical~.swiper-button-prev ::slotted(.swiper-navigation-icon){transform:rotate(-90deg)}.swiper-vertical .swiper-button-next,.swiper-vertical~.swiper-button-next{bottom:var(--swiper-navigation-sides-offset,4px);top:auto}.swiper-vertical .swiper-button-next .swiper-navigation-icon,.swiper-vertical .swiper-button-next ::slotted(.swiper-navigation-icon),.swiper-vertical~.swiper-button-next .swiper-navigation-icon,.swiper-vertical~.swiper-button-next ::slotted(.swiper-navigation-icon){transform:rotate(90deg)}.swiper-pagination{position:absolute;text-align:center;transform:translateZ(0);transition:opacity .3s;z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-pagination-disabled>.swiper-pagination,.swiper-pagination.swiper-pagination-disabled{display:none!important}.swiper-horizontal>.swiper-pagination-bullets,.swiper-pagination-bullets.swiper-pagination-horizontal,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:var(--swiper-pagination-bottom,8px);left:0;top:var(--swiper-pagination-top,auto);width:100%}.swiper-pagination-bullets-dynamic{font-size:0;overflow:hidden}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{position:relative;transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active,.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{transform:scale(.33)}.swiper-pagination-bullet{background:var(--swiper-pagination-bullet-inactive-color,#000);border-radius:var(--swiper-pagination-bullet-border-radius,50%);display:inline-block;height:var(--swiper-pagination-bullet-height,var(--swiper-pagination-bullet-size,8px));opacity:var(--swiper-pagination-bullet-inactive-opacity,.2);width:var(--swiper-pagination-bullet-width,var(--swiper-pagination-bullet-size,8px))}button.swiper-pagination-bullet{appearance:none;border:none;box-shadow:none;margin:0;padding:0}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet:only-child{display:none!important}.swiper-pagination-bullet-active{background:var(--swiper-pagination-color,var(--swiper-theme-color));opacity:var(--swiper-pagination-bullet-opacity,1)}.swiper-pagination-vertical.swiper-pagination-bullets,.swiper-vertical>.swiper-pagination-bullets{left:var(--swiper-pagination-left,auto);right:var(--swiper-pagination-right,8px);top:50%;transform:translate3d(0,-50%,0)}.swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{display:block;margin:var(--swiper-pagination-bullet-vertical-gap,6px) 0}.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;transform:translateY(-50%);width:8px}.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;transition:transform .2s,top .2s}.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 var(--swiper-pagination-bullet-horizontal-gap,4px)}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;transform:translateX(-50%);white-space:nowrap}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:transform .2s,left .2s}.swiper-horizontal.swiper-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:transform .2s,right .2s}.swiper-pagination-fraction{color:var(--swiper-pagination-fraction-color,inherit)}.swiper-pagination-progressbar{background:var(--swiper-pagination-progressbar-bg-color,#00000040);position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color,var(--swiper-theme-color));height:100%;left:0;position:absolute;top:0;transform:scale(0);transform-origin:left top;width:100%}.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{transform-origin:right top}.swiper-horizontal>.swiper-pagination-progressbar,.swiper-pagination-progressbar.swiper-pagination-horizontal,.swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite,.swiper-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{height:var(--swiper-pagination-progressbar-size,4px);left:0;top:0;width:100%}.swiper-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-vertical,.swiper-vertical>.swiper-pagination-progressbar{height:100%;left:0;top:0;width:var(--swiper-pagination-progressbar-size,4px)}.swiper-pagination-lock{display:none}.swiper-scrollbar{background:var(--swiper-scrollbar-bg-color,#0000001a);border-radius:var(--swiper-scrollbar-border-radius,10px);position:relative;touch-action:none}.swiper-scrollbar-disabled>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-disabled{display:none!important}.swiper-horizontal>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-horizontal{bottom:var(--swiper-scrollbar-bottom,4px);height:var(--swiper-scrollbar-size,4px);left:var(--swiper-scrollbar-sides-offset,1%);position:absolute;top:var(--swiper-scrollbar-top,auto);width:calc(100% - var(--swiper-scrollbar-sides-offset, 1%)*2);z-index:50}.swiper-scrollbar.swiper-scrollbar-vertical,.swiper-vertical>.swiper-scrollbar{height:calc(100% - var(--swiper-scrollbar-sides-offset, 1%)*2);left:var(--swiper-scrollbar-left,auto);position:absolute;right:var(--swiper-scrollbar-right,4px);top:var(--swiper-scrollbar-sides-offset,1%);width:var(--swiper-scrollbar-size,4px);z-index:50}.swiper-scrollbar-drag{background:var(--swiper-scrollbar-drag-bg-color,#00000080);border-radius:var(--swiper-scrollbar-border-radius,10px);height:100%;left:0;position:relative;top:0;width:100%}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}::slotted(.swiper-slide-zoomed){cursor:move;touch-action:none}.swiper .swiper-notification{left:0;opacity:0;pointer-events:none;position:absolute;top:0;z-index:-1000}.swiper-free-mode>.swiper-wrapper{margin:0 auto;transition-timing-function:ease-out}.swiper-grid>.swiper-wrapper{flex-wrap:wrap}.swiper-grid-column>.swiper-wrapper{flex-direction:column;flex-wrap:wrap}.swiper-fade.swiper-free-mode ::slotted(swiper-slide){transition-timing-function:ease-out}.swiper-fade ::slotted(swiper-slide){pointer-events:none;transition-property:opacity}.swiper-fade ::slotted(swiper-slide) ::slotted(swiper-slide){pointer-events:none}.swiper-fade ::slotted(.swiper-slide-active){pointer-events:auto}.swiper-fade ::slotted(.swiper-slide-active) ::slotted(.swiper-slide-active){pointer-events:auto}.swiper.swiper-cube{overflow:visible}.swiper-cube ::slotted(swiper-slide){backface-visibility:hidden;height:100%;pointer-events:none;transform-origin:0 0;visibility:hidden;width:100%;z-index:1}.swiper-cube ::slotted(swiper-slide) ::slotted(swiper-slide){pointer-events:none}.swiper-cube.swiper-rtl ::slotted(swiper-slide){transform-origin:100% 0}.swiper-cube ::slotted(.swiper-slide-active),.swiper-cube ::slotted(.swiper-slide-active) ::slotted(.swiper-slide-active){pointer-events:auto}.swiper-cube ::slotted(.swiper-slide-active),.swiper-cube ::slotted(.swiper-slide-next),.swiper-cube ::slotted(.swiper-slide-prev){pointer-events:auto;visibility:visible}.swiper-cube .swiper-cube-shadow{bottom:0;height:100%;left:0;opacity:.6;position:absolute;width:100%;z-index:0}.swiper-cube .swiper-cube-shadow:before{background:#000;bottom:0;content:\"\";filter:blur(50px);left:0;position:absolute;right:0;top:0}.swiper-cube ::slotted(.swiper-slide-next)+::slotted(swiper-slide){pointer-events:auto;visibility:visible}.swiper.swiper-flip{overflow:visible}.swiper-flip ::slotted(swiper-slide){backface-visibility:hidden;pointer-events:none;z-index:1}.swiper-flip ::slotted(swiper-slide) ::slotted(swiper-slide){pointer-events:none}.swiper-flip ::slotted(.swiper-slide-active),.swiper-flip ::slotted(.swiper-slide-active) ::slotted(.swiper-slide-active){pointer-events:auto}.swiper-creative ::slotted(swiper-slide){backface-visibility:hidden;overflow:hidden;transition-property:transform,opacity,height}.swiper.swiper-cards{overflow:visible}.swiper-cards ::slotted(swiper-slide){backface-visibility:hidden;overflow:hidden;transform-origin:center bottom}", DU = "::slotted(.swiper-slide-shadow),::slotted(.swiper-slide-shadow-bottom),::slotted(.swiper-slide-shadow-left),::slotted(.swiper-slide-shadow-right),::slotted(.swiper-slide-shadow-top){height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%;z-index:10}::slotted(.swiper-slide-shadow){background:#00000026}::slotted(.swiper-slide-shadow-left){background-image:linear-gradient(270deg,#00000080,#0000)}::slotted(.swiper-slide-shadow-right){background-image:linear-gradient(90deg,#00000080,#0000)}::slotted(.swiper-slide-shadow-top){background-image:linear-gradient(0deg,#00000080,#0000)}::slotted(.swiper-slide-shadow-bottom){background-image:linear-gradient(180deg,#00000080,#0000)}.swiper-lazy-preloader{animation:swiper-preloader-spin 1s linear infinite;border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top:4px solid #0000;box-sizing:border-box;height:42px;left:50%;margin-left:-21px;margin-top:-21px;position:absolute;top:50%;transform-origin:50%;width:42px;z-index:10}@keyframes swiper-preloader-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-bottom),::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-left),::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-right),::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-top){backface-visibility:hidden;z-index:0}::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-bottom),::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-left),::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-right),::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-top){backface-visibility:hidden;z-index:0}::slotted(.swiper-zoom-container){align-items:center;display:flex;height:100%;justify-content:center;text-align:center;width:100%}::slotted(.swiper-zoom-container)>canvas,::slotted(.swiper-zoom-container)>img,::slotted(.swiper-zoom-container)>svg{max-height:100%;max-width:100%;object-fit:contain}", OU = typeof window > "u" || typeof HTMLElement > "u" ? class {} : HTMLElement, kU = (e, t) => {
	if (typeof CSSStyleSheet < "u" && e.adoptedStyleSheets) {
		let n = new CSSStyleSheet();
		n.replaceSync(t), e.adoptedStyleSheets = [n];
	} else {
		let n = document.createElement("style");
		n.rel = "stylesheet", n.textContent = t, e.appendChild(n);
	}
}, AU = class extends OU {
	constructor() {
		super(), this.attachShadow({ mode: "open" });
	}
	cssStyles() {
		return [EU, ...this.injectStyles && Array.isArray(this.injectStyles) ? this.injectStyles : []].join("\n");
	}
	cssLinks() {
		return this.injectStylesUrls || [];
	}
	calcSlideSlots() {
		let e = this.slideSlots || 0, t = [...this.querySelectorAll("[slot^=slide-]")].map((e) => parseInt(e.getAttribute("slot").split("slide-")[1], 10));
		if (this.slideSlots = t.length ? Math.max(...t) + 1 : 0, this.rendered) {
			if (this.slideSlots > e) for (let t = e; t < this.slideSlots; t += 1) {
				let e = document.createElement("swiper-slide");
				e.setAttribute("part", `slide slide-${t + 1}`);
				let n = document.createElement("slot");
				n.setAttribute("name", `slide-${t + 1}`), e.appendChild(n), this.shadowRoot.querySelector(".swiper-wrapper").appendChild(e);
			}
			else if (this.slideSlots < e) {
				let e = this.swiper.slides;
				for (let t = e.length - 1; t >= 0; --t) t > this.slideSlots && e[t].remove();
			}
		}
	}
	render() {
		if (this.rendered) return;
		this.calcSlideSlots();
		let e = this.cssStyles();
		this.slideSlots > 0 && (e = e.replace(/::slotted\(([a-z-0-9.]*)\)/g, "$1")), e.length && kU(this.shadowRoot, e), this.cssLinks().forEach((e) => {
			if (this.shadowRoot.querySelector(`link[href="${e}"]`)) return;
			let t = document.createElement("link");
			t.rel = "stylesheet", t.href = e, this.shadowRoot.appendChild(t);
		});
		let t = document.createElement("div");
		t.classList.add("swiper"), t.part = "container", rV(t, `
      <slot name="container-start"></slot>
      <div class="swiper-wrapper" part="wrapper">
        <slot></slot>
        ${Array.from({ length: this.slideSlots }).map((e, t) => `
        <swiper-slide part="slide slide-${t}">
          <slot name="slide-${t}"></slot>
        </swiper-slide>
        `).join("")}
      </div>
      <slot name="container-end"></slot>
      ${vU(this.passedParams) ? "\n        <div part=\"button-prev\" class=\"swiper-button-prev\"><slot name=\"button-prev\"></slot></div>\n        <div part=\"button-next\" class=\"swiper-button-next\"><slot name=\"button-next\"></slot></div>\n      " : ""}
      ${yU(this.passedParams) ? "\n        <div part=\"pagination\" class=\"swiper-pagination\"></div>\n      " : ""}
      ${bU(this.passedParams) ? "\n        <div part=\"scrollbar\" class=\"swiper-scrollbar\"></div>\n      " : ""}
    `), this.shadowRoot.appendChild(t), this.rendered = !0;
	}
	initialize() {
		if (this.swiper && this.swiper.initialized) return;
		let { params: e, passedParams: t } = TU(this);
		this.swiperParams = e, this.passedParams = t, delete this.swiperParams.init, this.render(), this.swiper = new MH(this.shadowRoot.querySelector(".swiper"), {
			...e.virtual ? {} : { observer: !0 },
			...e,
			touchEventsTarget: "container",
			onAny: (t, ...n) => {
				t === "observerUpdate" && this.calcSlideSlots();
				let r = e.eventsPrefix ? `${e.eventsPrefix}${t.toLowerCase()}` : t.toLowerCase(), i = new CustomEvent(r, {
					detail: n,
					bubbles: t !== "hashChange",
					cancelable: !0
				});
				this.dispatchEvent(i);
			}
		});
	}
	connectedCallback() {
		this.swiper && this.swiper.initialized && this.nested && this.closest("swiper-slide") && this.closest("swiper-slide").swiperLoopMoveDOM || this.init === !1 || this.getAttribute("init") === "false" || this.initialize();
	}
	disconnectedCallback() {
		this.nested && this.closest("swiper-slide") && this.closest("swiper-slide").swiperLoopMoveDOM || this.swiper && this.swiper.destroy && this.swiper.destroy();
	}
	updateSwiperOnPropChange(e, t) {
		let { params: n, passedParams: r } = TU(this, e, t);
		this.passedParams = r, this.swiperParams = n, !(this.swiper && this.swiper.params[e] === t) && SU({
			swiper: this.swiper,
			passedParams: this.passedParams,
			changedParams: [xU(e)],
			...e === "navigation" && r[e] ? {
				prevEl: ".swiper-button-prev",
				nextEl: ".swiper-button-next"
			} : {},
			...e === "pagination" && r[e] ? { paginationEl: ".swiper-pagination" } : {},
			...e === "scrollbar" && r[e] ? { scrollbarEl: ".swiper-scrollbar" } : {}
		});
	}
	attributeChangedCallback(e, t, n) {
		this.swiper && this.swiper.initialized && (t === "true" && n === null && (n = !1), this.updateSwiperOnPropChange(e, n));
	}
	static get observedAttributes() {
		return hU.filter((e) => e.includes("_")).map((e) => e.replace(/[A-Z]/g, (e) => `-${e}`).replace("_", "").toLowerCase());
	}
};
hU.forEach((e) => {
	e !== "init" && (e = e.replace("_", ""), Object.defineProperty(AU.prototype, e, {
		configurable: !0,
		get() {
			return (this.passedParams || {})[e];
		},
		set(t) {
			this.passedParams ||= {}, this.passedParams[e] = t, this.swiper && this.swiper.initialized && this.updateSwiperOnPropChange(e, t);
		}
	}));
});
var jU = class extends OU {
	constructor() {
		super(), this.attachShadow({ mode: "open" });
	}
	render() {
		let e = this.lazy || this.getAttribute("lazy") === "" || this.getAttribute("lazy") === "true";
		if (kU(this.shadowRoot, DU), this.shadowRoot.appendChild(document.createElement("slot")), e) {
			let e = document.createElement("div");
			e.classList.add("swiper-lazy-preloader"), e.part.add("preloader"), this.shadowRoot.appendChild(e);
		}
	}
	initialize() {
		this.render();
	}
	connectedCallback() {
		this.swiperLoopMoveDOM || this.initialize();
	}
}, MU = () => {
	typeof window > "u" || (window.customElements.get("swiper-container") || window.customElements.define("swiper-container", AU), window.customElements.get("swiper-slide") || window.customElements.define("swiper-slide", jU));
};
typeof window < "u" && (window.SwiperElementRegisterParams = (e) => {
	hU.push(...e);
});
//#endregion
//#region src/lib/components/banner/BannerInquiry.svelte
var NU = (e, t = D, n = D) => {
	var r = PU();
	K(r, 1, "flex h-full min-h-12 w-full flex-1 items-center justify-center gap-2.5 px-5 lg:min-h-17.5 lg:gap-5 lg:px-7.5");
	var i = L(r), a = L(i);
	M(i);
	var o = R(i, 2), s = L(o, !0);
	M(o), M(r), z(() => {
		q(a, "src", t()), W(s, n());
	}), U(e, r);
}, PU = /* @__PURE__ */ H("<swiper-slide><picture class=\"inline-flex size-7.5 lg:size-12.5\"><img loading=\"lazy\" alt=\"\" class=\"h-full object-cover\"/></picture> <h4 class=\"text-primary text-lg font-bold lg:text-4xl\"> </h4></swiper-slide>", 2), FU = /* @__PURE__ */ H("<section data-scroll=\"slide-up\" class=\"bg-light-blue flex h-120 flex-col rounded-xl bg-(image:--banner-bg) bg-cover bg-center bg-no-repeat p-5 text-white lg:h-165 lg:p-15\"><div><h3 class=\"text-2xl leading-tight font-bold text-white lg:text-5xl\"> </h3> <div><swiper-container></swiper-container> <h3 class=\"text-2xl leading-tight font-bold text-white lg:text-5xl\"> </h3></div> <p class=\"text-2md whitespace-pre-line text-white lg:mt-5 lg:text-2xl\"> </p></div> <div class=\"mt-auto\"><a class=\"text-2md group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white hover:text-black max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:text-lg\"><span> </span> <icon-list></icon-list></a></div></section>", 2);
function IU(e, t) {
	lt(t, !0);
	let n = Y(t, "page", 7, "");
	Xn(() => {
		MU();
	});
	let r = /* @__PURE__ */ F(0), i = /* @__PURE__ */ F(Cn([
		Yv,
		Qv,
		ty,
		iy,
		sy,
		uy,
		py,
		gy,
		yy,
		Sy
	])), a = /* @__PURE__ */ F(Cn([
		sj,
		uj,
		pj,
		gj,
		yj,
		Sj,
		Tj,
		Oj
	])), o = /* @__PURE__ */ N(() => n() === "dao" ? [...V(i)] : n() === "logi" ? [...V(a)] : []), s = /* @__PURE__ */ N(() => n() === "dao" ? "/output/imgs/banner/bg-banner-dao.jpg" : "/output/imgs/banner/bg-banner-logi.jpg"), c = /* @__PURE__ */ N(() => n() === "dao" ? Bv() : n() === "logi" ? QA() : ""), l = /* @__PURE__ */ N(() => n() === "dao" ? Uv() : n() === "logi" ? tj() : ""), u = /* @__PURE__ */ N(() => n() === "dao" ? Kv() : n() === "logi" ? ij() : ""), d = /* @__PURE__ */ N(() => Array.from({ length: V(o).length }).map((e, t) => {
		let r = V(o)[t];
		return {
			img: n() === "dao" ? `/output/imgs/banner/img-banner-dao-slide-${t + 1}.png` : `/output/imgs/banner/img-banner-logi-slide-${t + 1}.png`,
			txt: typeof r == "function" ? r() : ""
		};
	}));
	var f = {
		get page() {
			return n();
		},
		set page(e = "") {
			n(e), P();
		}
	}, p = FU();
	let m;
	var h = L(p), g = L(h), _ = L(g, !0);
	M(g);
	var v = R(g, 2), y = L(v);
	J(y, "loop", !0), J(y, "slides-per-view", 1), J(y, "space-between", V(r)), J(y, "speed", "450"), J(y, "autoplay-delay", "1500"), J(y, "direction", "vertical"), Ni(y, 21, () => V(d), ki, (e, t) => {
		NU(e, () => V(t).img, () => V(t).txt);
	}), M(y);
	var b = R(y, 2), x = L(b, !0);
	M(b), M(v);
	var S = R(v, 2), C = L(S, !0);
	M(S), M(h);
	var w = R(h, 2), T = L(w), E = L(T), D = L(E, !0);
	M(E);
	var O = R(E, 2);
	return J(O, "name", "arrow-right"), K(O, 1, "size-6 stroke-white group-hover:stroke-black"), M(T), M(w), M(p), z((e, t) => {
		m = da(p, "", m, { "--banner-bg": `url(${V(s)})` }), K(h, 1, ia(["flex flex-col gap-2", n() === "logi" ? "space-y-5" : ""])), W(_, V(c)), K(v, 1, ia(["max-lg:space-y-2.5 lg:gap-5", n() === "dao" || n() === "logi" ? "space-y-5" : ""])), K(y, 1, ia(["flex h-12 flex-none justify-between rounded-full bg-white shadow-md lg:h-17.5", n() === "dao" ? "lg:w-107.5" : n() === "logi" ? "lg:w-155" : ""])), W(x, V(l)), W(C, V(u)), q(T, "href", n() === "logi" ? "/contact/contact?selectSolution=LOGI.FINE" : n() === "dao" ? "/contact/contact?selectSolution=DAO" : n() === "dsc" ? "/contact/contact?selectSolution=DSC" : "/contact/contact"), q(T, "aria-label", e), W(D, t);
	}, [() => n() === "logi" ? SP?.() : sP(), () => n() === "logi" ? SP?.() : sP()]), U(e, p), ut(f);
}
Ga(IU, { page: {} }, [], [], { mode: "open" });
//#endregion
//#region src/lib/components/product/Features.svelte
var LU = /* @__PURE__ */ H("<p> </p>"), RU = /* @__PURE__ */ H("<dd class=\"text-2sm text-666 lg:text-lg lg:whitespace-pre-line\"></dd>"), zU = /* @__PURE__ */ H("<dd class=\"text-2sm text-666 lg:text-lg\"> </dd>"), BU = /* @__PURE__ */ H("<li class=\"bg-ebedff lg:text-2md text-2sm text-3f53ff text-primary flex flex-none items-center rounded-full px-5 py-1 font-bold\"> </li>"), VU = /* @__PURE__ */ H("<ul class=\"flex flex-wrap gap-2.5 py-5 lg:pt-5 lg:pb-7.5\"></ul>"), HU = /* @__PURE__ */ H("<img alt=\"logo\" class=\"h-full\"/>"), UU = /* @__PURE__ */ H("<source/>"), WU = /* @__PURE__ */ H("<picture><!> <img alt=\"logo\" class=\"h-full\"/></picture>"), GU = /* @__PURE__ */ H("<picture class=\"aspect-video w-full rounded-2xl object-cover\"><img loading=\"lazy\"/></picture>"), KU = /* @__PURE__ */ H("<video class=\"aspect-video w-full rounded-2xl object-cover\" autoplay=\"\" playsinline=\"\" loop=\"\"><source type=\"video/webm\"/></video>", 2), qU = /* @__PURE__ */ H("<li data-scroll=\"slide-up\" class=\"relative grid gap-5 rounded-xl bg-white p-5 lg:grid-cols-[1fr_fit-content(480px)] lg:flex-row lg:gap-15 lg:p-15 xl:grid-cols-[1fr_fit-content(640px)] xl:gap-50\"><div class=\"flex flex-col justify-between gap-2.5\"><dl class=\"space-y-2.5 lg:space-y-5\"><dt class=\"text-2xl font-bold lg:text-5xl\"> </dt> <!> <!></dl> <div class=\"divide-d9d9d9 divide-y divide-dashed\"><!> <div class=\"pt-5\"><div class=\"bg-ebedff flex min-h-10 items-center gap-2.5 rounded-[1.25rem] px-1.25 py-2.5 lg:p-1.25\"><picture class=\"flex size-7.5\"><!></picture> <p class=\"lg:text-2md text-2sm\"> </p></div></div></div></div> <div><!></div></li>"), JU = /* @__PURE__ */ H("<section class=\"space-y-5 rounded-xl pt-15 lg:space-y-7.5 lg:py-15\"><!> <ul data-scroll=\"slide-up\" class=\"flex flex-col gap-5 lg:gap-7.5\"></ul></section>");
function YU(e, t) {
	lt(t, !0);
	let n = Y(t, "tit", 7, ""), r = Y(t, "txt", 7, ""), i = Y(t, "subTxt", 7, ""), a = Y(t, "lists", 23, () => []), o = Y(t, "page", 7, ""), s = /* @__PURE__ */ N(() => o() === "dao" ? "/output/imgs/logo/logo-dao-only.svg" : o() === "logi" ? "/output/imgs/logo/logo-logi-only.svg" : "/output/imgs/logo/logo-dsc-only.svg"), c = /* @__PURE__ */ F(null);
	Qn(() => {
		V(c) && (V(c).muted = !0, V(c).play().catch(() => {}));
	});
	var l = {
		get tit() {
			return n();
		},
		set tit(e = "") {
			n(e), P();
		},
		get txt() {
			return r();
		},
		set txt(e = "") {
			r(e), P();
		},
		get subTxt() {
			return i();
		},
		set subTxt(e = "") {
			i(e), P();
		},
		get lists() {
			return a();
		},
		set lists(e = []) {
			a(e), P();
		},
		get page() {
			return o();
		},
		set page(e = "") {
			o(e), P();
		}
	}, u = JU(), d = L(u);
	cB(d, {
		get tit() {
			return n();
		},
		get txt() {
			return r();
		},
		get subTxt() {
			return i();
		}
	});
	var f = R(d, 2);
	return Ni(f, 21, a, ki, (e, t) => {
		var n = qU(), r = L(n), i = L(r), a = L(i), o = L(a, !0);
		M(a);
		var l = R(a, 2), u = (e) => {
			var n = RU();
			Ni(n, 21, () => V(t).txt, ki, (e, t) => {
				var n = LU(), r = L(n, !0);
				M(n), z(() => W(r, V(t))), U(e, n);
			}), M(n), U(e, n);
		};
		G(l, (e) => {
			V(t).txt && e(u);
		});
		var d = R(l, 2), f = (e) => {
			var n = zU(), r = L(n, !0);
			M(n), z((e) => W(r, e), [() => _z(V(t).subTxt)]), U(e, n);
		};
		G(d, (e) => {
			V(t).subTxt && e(f);
		}), M(i);
		var p = R(i, 2), m = L(p), h = (e) => {
			var n = VU();
			Ni(n, 21, () => V(t).labels, ki, (e, t, n, r) => {
				var i = BU(), a = L(i, !0);
				M(i), z(() => W(a, V(t))), U(e, i);
			}), M(n), U(e, n);
		};
		G(m, (e) => {
			V(t).labels && e(h);
		});
		var g = R(m, 2), _ = L(g), v = L(_), y = L(v), b = (e) => {
			var t = di(), n = Pn(t), r = (e) => {
				var t = HU();
				z(() => q(t, "src", V(s))), U(e, t);
			};
			G(n, (e) => {
				e(r, -1);
			}), U(e, t);
		}, x = (e) => {
			var t = WU(), n = L(t);
			Ni(n, 17, () => Object.entries(V(s).sources), ki, (e, t) => {
				var n = /* @__PURE__ */ N(() => ne(V(t), 2));
				let r = () => V(n)[0], i = () => V(n)[1];
				var a = UU();
				z(() => {
					q(a, "srcset", i()), q(a, "type", "image/" + r());
				}), U(e, a);
			});
			var r = R(n, 2);
			M(t), z(() => {
				q(r, "src", V(s).img.src), q(r, "width", V(s).img.w), q(r, "height", V(s).img.h);
			}), U(e, t);
		};
		G(y, (e) => {
			typeof V(s) == "string" ? e(b) : e(x, -1);
		}), M(v);
		var S = R(v, 2), C = L(S, !0);
		M(S), M(_), M(g), M(p), M(r);
		var w = R(r, 2), T = L(w), E = (e) => {
			var n = GU(), r = L(n);
			M(n), z(() => {
				q(r, "src", V(t).img), q(r, "alt", V(t).tit);
			}), U(e, n);
		}, D = (e) => {
			var n = KU();
			n.muted = !0;
			var r = L(n);
			M(n), Ma(n, (e) => I(c, e), () => V(c)), z(() => {
				q(n, "poster", V(t).postser), q(r, "src", V(t).video);
			}), U(e, n);
		};
		G(T, (e) => {
			V(t).img ? e(E) : e(D, -1);
		}), M(w), M(n), z((e) => {
			W(o, e), W(C, V(t).logo);
		}, [() => _z(V(t).tit)]), U(e, n);
	}), M(f), M(u), U(e, u), ut(l);
}
Ga(YU, {
	tit: {},
	txt: {},
	subTxt: {},
	lists: {},
	page: {}
}, [], [], { mode: "open" });
//#endregion
//#region src/lib/components/product/Industries.svelte
var XU = (e, t, n, r) => {
	let i = /* @__PURE__ */ zt(() => k(t?.(), "")), a = /* @__PURE__ */ zt(() => k(n?.(), "")), o = /* @__PURE__ */ zt(() => k(r?.(), ""));
	var s = $U(), c = L(s), l = L(c);
	M(c);
	var u = R(c, 2), d = (e) => {
		var t = ZU(), n = L(t, !0);
		M(t), z(() => W(n, V(i))), U(e, t);
	};
	G(u, (e) => {
		V(i) && e(d);
	});
	var f = R(u, 2), p = (e) => {
		var t = QU(), n = L(t, !0);
		M(t), z(() => W(n, V(a))), U(e, t);
	};
	G(f, (e) => {
		V(a) && e(p);
	}), M(s), z(() => {
		q(l, "src", V(o)), q(l, "alt", V(i));
	}), U(e, s);
}, ZU = /* @__PURE__ */ H("<p class=\"text-lg font-bold lg:text-2xl\"> </p>"), QU = /* @__PURE__ */ H("<p class=\"text-2md text-666 lg:text-lg\"> </p>"), $U = /* @__PURE__ */ H("<li data-scroll=\"slide-up\" class=\"bg-ebedff relative grid place-items-center gap-5 rounded-xl p-5 text-center lg:p-7.5\"><picture class=\"grid size-22.5 place-content-center\"><img loading=\"lazy\"/></picture> <!> <!></li>"), eW = /* @__PURE__ */ H("<section><div class=\"space-y-5 rounded-xl bg-white p-5 lg:space-y-15 lg:p-15\"><!> <ul></ul></div></section>");
function tW(e, t) {
	lt(t, !0);
	let n = Y(t, "tit", 7, ""), r = Y(t, "txt", 7, ""), i = Y(t, "subTxt", 7, ""), a = Y(t, "lists", 23, () => []), o = Y(t, "cls", 7, ""), s = Y(t, "page", 7, "");
	var c = {
		get tit() {
			return n();
		},
		set tit(e = "") {
			n(e), P();
		},
		get txt() {
			return r();
		},
		set txt(e = "") {
			r(e), P();
		},
		get subTxt() {
			return i();
		},
		set subTxt(e = "") {
			i(e), P();
		},
		get lists() {
			return a();
		},
		set lists(e = []) {
			a(e), P();
		},
		get cls() {
			return o();
		},
		set cls(e = "") {
			o(e), P();
		},
		get page() {
			return s();
		},
		set page(e = "") {
			s(e), P();
		}
	}, l = eW(), u = L(l), d = L(u);
	cB(d, {
		get tit() {
			return n();
		},
		get txt() {
			return r();
		},
		get subTxt() {
			return i();
		}
	});
	var f = R(d, 2);
	return Ni(f, 21, a, ki, (e, t) => {
		XU(e, () => V(t).tit, () => V(t).txt, () => V(t).img);
	}), M(f), M(u), M(l), z(() => {
		K(l, 1, ia(["space-y-5 overflow-clip pt-15 lg:space-y-7.5", s() === "dsc" ? "lg:pt-15" : "lg:py-0"])), K(f, 1, ia(["grid gap-5", o()]));
	}), U(e, l), ut(c);
}
customElements.define("sub-industries", Ga(tW, {
	tit: {},
	txt: {},
	subTxt: {},
	lists: {},
	cls: {},
	page: {}
}, [], []));
//#endregion
//#region src/lib/components/product/Problem.svelte
var nW = /* @__PURE__ */ H("<icon-list></icon-list>", 2), rW = /* @__PURE__ */ H("<p></p>"), iW = /* @__PURE__ */ H("<div aria-hidden=\"true\" class=\"absolute top-[calc(50%-1.25rem)] left-full z-5 grid size-10 animate-[as-is_5s_ease-in-out_infinite] place-items-center max-lg:hidden\"><div class=\"relative\"><!> <p class=\"relative z-2 size-3 rounded-full bg-white\"></p></div></div>"), aW = /* @__PURE__ */ H("<li data-scroll=\"slide-up\"><button><!> <!> <strong class=\"flex flex-col gap-2.5\"><span class=\"text-2md font-bold lg:text-2xl\"> </span> <span> </span></strong></button> <!></li>"), oW = /* @__PURE__ */ H("<section data-scroll=\"slide-up\"><!> <!> <ol class=\"grid grid-rows-2 gap-5 lg:grid-cols-[1fr_60px_1fr] lg:grid-rows-1 lg:gap-5 2xl:grid-cols-[1fr_12.5rem_1fr] 2xl:gap-25 starting:opacity-0\"><li class=\"divide-d9d9d9 relative grid h-full divide-y divide-dashed rounded-xl bg-white lg:grid-rows-[90px_1fr]\"><header class=\"grid min-h-15 place-content-center text-xl font-bold lg:min-h-22.5 lg:text-4xl\">AS-IS</header> <ul class=\"divide-d9d9d9 grid grid-rows-4 divide-y divide-dashed px-2\"></ul></li> <li class=\"hidden place-content-center lg:grid\"><p class=\"bg-ebedff grid place-items-center rounded-full lg:size-15 xl:size-50\"><icon-list></icon-list></p></li> <li class=\"divide-d9d9d9 bg-3743ff from-primary to-828aff group relative z-3 grid h-full divide-y divide-dashed rounded-xl bg-linear-to-l text-white lg:grid-rows-[90px_1fr]\"><header class=\"grid min-h-15 place-content-center text-xl font-bold lg:min-h-22.5 lg:text-4xl\">TO-BE</header> <ul class=\"divide-d9d9d9 grid grid-rows-4 divide-y divide-dashed px-2 text-left\"></ul></li></ol></section>", 2);
function sW(e, t) {
	lt(t, !0);
	let n = (e, t, n, r, i) => {
		let a = /* @__PURE__ */ zt(() => k(t?.(), "")), o = /* @__PURE__ */ zt(() => k(n?.(), "")), s = /* @__PURE__ */ zt(() => k(r?.(), "")), c = /* @__PURE__ */ zt(() => k(i?.(), 0));
		var l = aW(), u = L(l), d = L(u), p = (e) => {
			var t = nW();
			J(t, "name", "tri-alert"), K(t, 1, "group-aria-current:fill-primary fill-999 relative h-10 w-10.5 flex-none transition-all"), U(e, t);
		};
		G(d, (e) => {
			V(s) === "as" && e(p);
		});
		var m = R(d, 2), h = (e) => {
			var t = nW();
			J(t, "name", "tick-circle"), K(t, 1, "relative h-10 w-10.5 flex-none fill-white/30 transition-all group-aria-current:fill-white"), U(e, t);
		};
		G(m, (e) => {
			V(s) === "to" && e(h);
		});
		var g = R(m, 2), _ = L(g), v = L(_, !0);
		M(_);
		var y = R(_, 2), b = L(y, !0);
		M(y), M(g), M(u);
		var x = R(u, 2), S = (e) => {
			var t = iW(), n = L(t);
			Ni(L(n), 16, () => [
				,
				,
				,
				,
				,
			], ki, (e, t, n) => {
				var r = rW();
				K(r, 1, ia(["border-primary @starting:opacity-0 absolute -top-2.5 -left-2.5 grid animate-[ping-motion_0.6s_cubic-bezier(0,0,0.4,1)_infinite] place-items-center rounded-full border-16 opacity-0", n === 1 ? "animate-[ping-motion_1.1s_cubic-bezier(0,0,0.4,1)_infinite]" : n === 2 ? "animate-[ping-motion_1.1s_cubic-bezier(0,0,0.4,1)_0.6s_infinite]" : n === 3 ? "animate-[ping-motion_1.1s_cubic-bezier(0,0,0.4,1)_1.1s_infinite]" : n === 4 ? "animate-[ping-motion_0.6s_cubic-bezier(0,0,0.4,1)_1.6s_infinite]" : ""])), U(e, r);
			}), Xe(2), M(n), M(t), U(e, t);
		};
		G(x, (e) => {
			V(f) === V(c) && V(s) === "as" && e(S);
		}), M(l), z(() => {
			K(l, 1, ia(["before:bg-primary relative flex py-2 before:top-[calc(50%-0.1563rem)] before:z-5 before:rounded-full before:opacity-0 before:transition-all has-aria-current:before:absolute has-aria-current:before:size-1.25 has-aria-current:before:opacity-100 max-lg:before:hidden! max-lg:after:hidden", V(s) === "as" ? "after:border-primary z-6 after:top-[calc(50%-.0156rem)] after:z-1 after:border-dashed has-aria-current:before:right-0 has-aria-current:after:absolute has-aria-current:after:left-full has-aria-current:after:border lg:has-aria-current:after:w-30 2xl:has-aria-current:after:w-105" : "z-7 delay-500 before:z-6 has-aria-current:before:left-0"])), K(u, 1, ia(["@starting:bg-transparnet group z-3 flex flex-1 grid-rows-2 items-center gap-5 space-y-2.5 rounded-xl p-5 text-left transition-all lg:gap-7.5 lg:py-7.5", V(s) === "as" ? "aria-current:bg-light-blue text-666" : "aria-current:bg-9097ff"])), q(u, "aria-current", V(f) === V(c) ? "true" : void 0), W(v, V(a)), K(y, 1, ia(["text-2md text-666 font-normal lg:text-lg", V(s) === "as" ? " text-666" : "text-white"])), W(b, V(o));
		}), $r("mouseenter", u, () => I(f, V(c), !0)), U(e, l);
	}, r = Y(t, "page", 7, ""), i = /* @__PURE__ */ F(!1);
	Of(), Tf();
	let a = /* @__PURE__ */ F(Cn([
		{
			tit: jf(),
			txt: Pf()
		},
		{
			tit: Lf(),
			txt: Bf()
		},
		{
			tit: Uf(),
			txt: Kf()
		},
		{
			tit: Yf(),
			txt: Qf()
		}
	])), o = /* @__PURE__ */ F(Cn([
		{
			tit: tp(),
			txt: ip()
		},
		{
			tit: sp(),
			txt: up()
		},
		{
			tit: pp(),
			txt: gp()
		},
		{
			tit: yp(),
			txt: Sp()
		}
	])), s = /* @__PURE__ */ F(Cn([
		{
			tit: uT(),
			txt: pT()
		},
		{
			tit: gT(),
			txt: yT()
		},
		{
			tit: ST(),
			txt: TT()
		},
		{
			tit: OT(),
			txt: jT()
		}
	])), c = /* @__PURE__ */ F(Cn([
		{
			tit: PT(),
			txt: LT()
		},
		{
			tit: BT(),
			txt: UT()
		},
		{
			tit: KT(),
			txt: YT()
		},
		{
			tit: QT(),
			txt: tE()
		}
	])), l = /* @__PURE__ */ N(() => r() === "dao" ? V(a) : V(s)), u = /* @__PURE__ */ N(() => r() === "dao" ? V(o) : V(c)), d = (e) => {
		let t = Mc(e, {
			y: [30, 0],
			opacity: [0, 1],
			duration: 400,
			easing: "easeOutQuad",
			autoplay: !1
		}), n = Yc({
			container: document.body,
			target: e,
			enter: "bottom center",
			leave: "top bottom",
			axis: "y",
			onEnter: () => {
				V(i) || (I(i, !0), t.seek(0), t.play());
			},
			onLeaveBackward: () => {
				I(i, !1);
			},
			debug: !1
		});
		return () => n.revert?.();
	}, f = /* @__PURE__ */ F(0);
	var p = {
		get page() {
			return r();
		},
		set page(e = "") {
			r(e), P();
		}
	}, m = oW(), h = L(m), g = (e) => {
		{
			let t = /* @__PURE__ */ N(() => Tf()), n = /* @__PURE__ */ N(() => Of());
			cB(e, {
				get tit() {
					return V(t);
				},
				get txt() {
					return V(n);
				}
			});
		}
	};
	G(h, (e) => {
		r() === "dao" && e(g);
	});
	var _ = R(h, 2), v = (e) => {
		{
			let t = /* @__PURE__ */ N(() => Tf()), n = /* @__PURE__ */ N(() => sT());
			cB(e, {
				get tit() {
					return V(t);
				},
				get txt() {
					return V(n);
				}
			});
		}
	};
	G(_, (e) => {
		r() === "logi" && e(v);
	});
	var y = R(_, 2), b = L(y), x = R(L(b), 2);
	Ni(x, 21, () => V(l), ki, (e, t, r) => {
		n(e, () => V(t).tit, () => V(t).txt, () => "as", () => r);
	}), M(x), M(b);
	var S = R(b, 2), C = L(S), w = L(C);
	J(w, "name", "arrow-as-is"), K(w, 1, "stroke-primary relative w-full max-w-22.5 p-1 transition-all"), M(C), M(S);
	var T = R(S, 2), E = R(L(T), 2);
	return Ni(E, 21, () => V(u), ki, (e, t, r) => {
		n(e, () => V(t).tit, () => V(t).txt, () => "to", () => r);
	}), M(E), M(T), M(y), M(m), ta(m, () => d), z(() => K(m, 1, ia(["space-y-5 py-7.5 lg:space-y-7.5", r() === "dao" ? "py-15" : "lg:pt-7.5 lg:pb-15"]))), U(e, m), ut(p);
}
customElements.define("sub-problem", Ga(sW, { page: {} }, [], []));
//#endregion
//#region src/lib/components/slide/FieldCase.svelte
var cW = (e, t = D, n = D, r = D, i = D, a = D, o = D) => {
	var s = _W();
	K(s, 1, "grid grid-cols-1 items-center gap-5 px-5 pt-5 pb-7.5 lg:grid-cols-[minmax(480px,4fr)_minmax(460px,6fr)] lg:p-7.5 xl:gap-15");
	var c = L(s), l = L(c), u = L(l);
	M(l), M(c);
	var d = R(c, 2), f = L(d), p = (e) => {
		var t = fW();
		Ni(t, 23, n, (e, t) => `case-l-${t}`, (e, t) => {
			var n = dW(), r = Pn(n), i = (e) => {
				var t = lW(), n = L(t), r = L(n);
				J(r, "name", "lock"), K(r, 1, "size-5 fill-white"), Xe(), M(n), M(t), U(e, t);
			};
			G(r, (e) => {
				V(t) === "client" && e(i);
			});
			var a = R(r, 2), o = (e) => {
				var n = uW(), r = L(n);
				M(n), z(() => q(r, "src", V(t))), U(e, n);
			};
			G(a, (e) => {
				V(t) !== "client" && e(o);
			}), U(e, n);
		}), M(t), U(e, t);
	};
	G(f, (e) => {
		n() && e(p);
	});
	var m = R(f, 2), h = L(m, !0);
	M(m);
	var g = R(m, 2), _ = (e) => {
		var t = fW();
		Ni(t, 23, i, (e, t) => `case-b-${t}`, (e, t) => {
			var n = pW(), r = L(n, !0);
			M(n), z(() => W(r, V(t))), U(e, n);
		}), M(t), U(e, t);
	};
	G(g, (e) => {
		i() && e(_);
	});
	var v = R(g, 2);
	Ni(v, 23, a, (e, t) => `case-t-${t}`, (e, t) => {
		var n = mW(), r = L(n, !0);
		M(n), z(() => W(r, V(t))), U(e, n);
	}), M(v);
	var y = R(v, 2);
	Ni(y, 23, o, (e, t) => `case-e-${t}`, (e, t) => {
		var n = gW(), r = L(n);
		J(r, "name", "tick-circle-list"), K(r, 1, "fill-primary size-5 flex-none");
		var i = R(r, 2);
		aB(L(i), {
			get message() {
				return V(t);
			},
			b: (e, t) => {
				let n = () => t?.().children;
				var r = hW();
				Oi(L(r), () => n() ?? D), M(r), U(e, r);
			},
			$$slots: { b: !0 }
		}), M(i), M(n), U(e, n);
	}), M(y);
	var b = R(y, 2), x = (e) => {
		var t = mW(), n = L(t, !0);
		M(t), z((e) => W(n, e), [() => SA()]), U(e, t);
	}, S = /* @__PURE__ */ N(() => n().includes("client"));
	G(b, (e) => {
		V(S) && e(x);
	}), M(d), M(s), z(() => {
		q(u, "src", t()), W(h, r());
	}), U(e, s);
}, lW = /* @__PURE__ */ H("<p><span class=\"text-2md bg-999 inline-flex min-h-7.5 items-center gap-3 rounded-full px-2.5 text-white\"><icon-list></icon-list> Client Confidential</span></p>", 2), uW = /* @__PURE__ */ H("<picture class=\"inline-flex h-7.5 overflow-clip\"><img loading=\"lazy\" alt=\"\" class=\"h-full object-cover\"/></picture>"), dW = /* @__PURE__ */ H("<!> <!>", 1), fW = /* @__PURE__ */ H("<div class=\"inline-flex flex-wrap gap-2.5\"></div>"), pW = /* @__PURE__ */ H("<p class=\"bg-primary/10 text-primary text-2md inline-flex flex-none rounded-full px-5 py-1 font-bold\"> </p>"), mW = /* @__PURE__ */ H("<p class=\"text-2md text-666 lg:text-lg\"> </p>"), hW = /* @__PURE__ */ H("<strong class=\"text-primary font-bold\"><!></strong>"), gW = /* @__PURE__ */ H("<li class=\"flex items-center gap-1.5\"><icon-list></icon-list> <div><!></div></li>", 2), _W = /* @__PURE__ */ H("<swiper-slide><div class=\"relative transition-all max-sm:w-full\"><picture class=\"bg-primary/10 inline-flex min-h-53.75 w-auto overflow-clip rounded-xl max-sm:w-full max-sm:max-w-full lg:h-120\"><img loading=\"lazy\" alt=\"\" class=\"flex-none object-cover max-sm:w-full lg:w-full\"/></picture></div> <div class=\"inline-grid place-content-baseline gap-5\"><!> <h4 class=\"text-lg font-bold lg:text-4xl\"> </h4> <!> <div></div> <ul class=\"text-2md border-t-d9d9d9 space-y-2.5 border-t border-dashed pt-5 text-lg font-bold\"></ul> <!></div></swiper-slide>", 2), vW = /* @__PURE__ */ H("<li class=\"flex-none\"><button type=\"button\" class=\"label-check aria-current:border-primary aria-current:bg-primary flex-none place-items-center rounded-full aria-current:text-white\"><span> </span></button></li>"), yW = /* @__PURE__ */ H("<section data-scroll=\"slide-up\" class=\"divide-d9d9d9 relative divide-y rounded-xl bg-white\"><ul class=\"flex max-w-dvw snap-x snap-start gap-2.5 overflow-auto p-5 lg:gap-5 lg:p-7.5\"></ul> <swiper-container><!></swiper-container></section>", 2);
function bW(e, t) {
	lt(t, !0);
	let n = st("case-list"), r = /* @__PURE__ */ F(null), i = /* @__PURE__ */ N(() => V(r)?.swiper), a = /* @__PURE__ */ F(0);
	Xn(() => {
		if (MU(), V(r)) {
			let e = (e) => {
				Ur();
				let [t] = e.detail;
				I(a, t.realIndex, !0);
			};
			return V(r).addEventListener("swiperslidechange", e), () => {
				V(r)?.removeEventListener("swiperslidechange", e);
			};
		}
	});
	var o = yW(), s = L(o);
	Ni(s, 23, () => n.list, ({ btn: e }, t) => `case-btn-${t}`, (e, t, n) => {
		let r = () => V(t).btn;
		var o = vW(), s = L(o), c = L(s), l = L(c, !0);
		M(c), M(s), M(o), z(() => {
			q(s, "aria-current", V(a) === V(n) ? "true" : void 0), W(l, r());
		}), ei("click", s, (e) => {
			e.preventDefault(), I(a, V(n), !0), V(i)?.slideTo(V(n), 450);
		}), U(e, o);
	}), M(s);
	var c = R(s, 2);
	J(c, "slides-per-view", 1), J(c, "space-between", 10), J(c, "centered-slides", !0), J(c, "speed", "450"), J(c, "autoplay-delay", "5000"), J(c, "pagination", { hideOnClick: !0 }), J(c, "data-scroll", "slide-up");
	var l = L(c), u = (e) => {
		var t = di();
		Ni(Pn(t), 17, () => n.list, (e) => e.id, (e, t) => {
			cW(e, () => V(t).img, () => V(t).logo, () => V(t).tit, () => V(t).badge || [], () => V(t).txt, () => V(t).etc);
		}), U(e, t);
	};
	G(l, (e) => {
		n?.list && e(u);
	}), M(c), Ma(c, (e) => I(r, e), () => V(r)), M(o), U(e, o), ut();
}
ti(["click"]), Ga(bW, {}, [], [], { mode: "open" });
//#endregion
//#region ../../node_modules/.bun/countup.js@2.10.0/node_modules/countup.js/dist/countUp.min.js
var xW = function() {
	return xW = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, xW.apply(this, arguments);
}, SW = function() {
	function e(e, t, n) {
		var r = this;
		this.endVal = t, this.options = n, this.version = "2.10.0", this.defaults = {
			startVal: 0,
			decimalPlaces: 0,
			duration: 2,
			useEasing: !0,
			useGrouping: !0,
			useIndianSeparators: !1,
			smartEasingThreshold: 999,
			smartEasingAmount: 333,
			separator: ",",
			decimal: ".",
			prefix: "",
			suffix: "",
			autoAnimate: !1,
			autoAnimateDelay: 200,
			autoAnimateOnce: !1
		}, this.finalEndVal = null, this.useEasing = !0, this.countDown = !1, this.error = "", this.startVal = 0, this.paused = !0, this.once = !1, this.count = function(e) {
			r.startTime ||= e;
			var t = e - r.startTime;
			r.remaining = r.duration - t, r.useEasing ? r.countDown ? r.frameVal = r.startVal - r.easingFn(t, 0, r.startVal - r.endVal, r.duration) : r.frameVal = r.easingFn(t, r.startVal, r.endVal - r.startVal, r.duration) : r.frameVal = r.startVal + (r.endVal - r.startVal) * (t / r.duration), r.frameVal = (r.countDown ? r.frameVal < r.endVal : r.frameVal > r.endVal) ? r.endVal : r.frameVal, r.frameVal = Number(r.frameVal.toFixed(r.options.decimalPlaces)), r.printValue(r.frameVal), t < r.duration ? r.rAF = requestAnimationFrame(r.count) : r.finalEndVal === null ? r.options.onCompleteCallback && r.options.onCompleteCallback() : r.update(r.finalEndVal);
		}, this.formatNumber = function(e) {
			var t, n, i, a, o = e < 0 ? "-" : "";
			t = Math.abs(e).toFixed(r.options.decimalPlaces);
			var s = (t += "").split(".");
			if (n = s[0], i = s.length > 1 ? r.options.decimal + s[1] : "", r.options.useGrouping) {
				a = "";
				for (var c = 3, l = 0, u = 0, d = n.length; u < d; ++u) r.options.useIndianSeparators && u === 4 && (c = 2, l = 1), u !== 0 && l % c == 0 && (a = r.options.separator + a), l++, a = n[d - u - 1] + a;
				n = a;
			}
			return r.options.numerals && r.options.numerals.length && (n = n.replace(/[0-9]/g, (function(e) {
				return r.options.numerals[+e];
			})), i = i.replace(/[0-9]/g, (function(e) {
				return r.options.numerals[+e];
			}))), o + r.options.prefix + n + i + r.options.suffix;
		}, this.easeOutExpo = function(e, t, n, r) {
			return n * (1 - 2 ** (-10 * e / r)) * 1024 / 1023 + t;
		}, this.options = xW(xW({}, this.defaults), n), this.options.enableScrollSpy && (this.options.autoAnimate = !0), this.options.scrollSpyDelay !== void 0 && (this.options.autoAnimateDelay = this.options.scrollSpyDelay), this.options.scrollSpyOnce && (this.options.autoAnimateOnce = !0), this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber, this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo, this.el = typeof e == "string" ? document.getElementById(e) : e, t ??= this.parse(this.el.innerHTML), this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.endVal = this.validateValue(t), this.options.decimalPlaces = Math.max(this.options.decimalPlaces), this.resetDuration(), this.options.separator = String(this.options.separator), this.useEasing = this.options.useEasing, this.options.separator === "" && (this.options.useGrouping = !1), this.el ? this.printValue(this.startVal) : this.error = "[CountUp] target is null or undefined", typeof window < "u" && this.options.autoAnimate && (this.error || typeof IntersectionObserver > "u" ? this.error ? console.error(this.error, e) : console.error("IntersectionObserver is not supported by this browser") : this.setupObserver());
	}
	return e.prototype.setupObserver = function() {
		var t = this, n = e.observedElements.get(this.el);
		n && n.unobserve(), e.observedElements.set(this.el, this), this.observer = new IntersectionObserver((function(e) {
			for (var n = 0, r = e; n < r.length; n++) {
				var i = r[n];
				i.isIntersecting && t.paused && !t.once ? (t.paused = !1, t.autoAnimateTimeout = setTimeout((function() {
					return t.start();
				}), t.options.autoAnimateDelay), t.options.autoAnimateOnce && (t.once = !0, t.observer.disconnect())) : i.isIntersecting || t.paused || (clearTimeout(t.autoAnimateTimeout), t.reset());
			}
		}), { threshold: 0 }), this.observer.observe(this.el);
	}, e.prototype.unobserve = function() {
		var t;
		clearTimeout(this.autoAnimateTimeout), (t = this.observer) == null || t.disconnect(), e.observedElements.delete(this.el);
	}, e.prototype.onDestroy = function() {
		clearTimeout(this.autoAnimateTimeout), cancelAnimationFrame(this.rAF), this.paused = !0, this.unobserve(), this.options.onCompleteCallback = null, this.options.onStartCallback = null;
	}, e.prototype.determineDirectionAndSmartEasing = function() {
		var e = this.finalEndVal ? this.finalEndVal : this.endVal;
		this.countDown = this.startVal > e;
		var t = e - this.startVal;
		if (Math.abs(t) > this.options.smartEasingThreshold && this.options.useEasing) {
			this.finalEndVal = e;
			var n = this.countDown ? 1 : -1;
			this.endVal = e + n * this.options.smartEasingAmount, this.duration /= 2;
		} else this.endVal = e, this.finalEndVal = null;
		this.finalEndVal === null ? this.useEasing = this.options.useEasing : this.useEasing = !1;
	}, e.prototype.start = function(e) {
		this.error || (this.options.onStartCallback && this.options.onStartCallback(), e && (this.options.onCompleteCallback = e), this.duration > 0 ? (this.determineDirectionAndSmartEasing(), this.paused = !1, this.rAF = requestAnimationFrame(this.count)) : this.printValue(this.endVal));
	}, e.prototype.pauseResume = function() {
		this.paused ? (this.startTime = null, this.duration = this.remaining, this.startVal = this.frameVal, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)) : cancelAnimationFrame(this.rAF), this.paused = !this.paused;
	}, e.prototype.reset = function() {
		clearTimeout(this.autoAnimateTimeout), cancelAnimationFrame(this.rAF), this.paused = !0, this.once = !1, this.resetDuration(), this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.printValue(this.startVal);
	}, e.prototype.update = function(e) {
		cancelAnimationFrame(this.rAF), this.startTime = null, this.endVal = this.validateValue(e), this.endVal !== this.frameVal && (this.startVal = this.frameVal, this.finalEndVal ?? this.resetDuration(), this.finalEndVal = null, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count));
	}, e.prototype.printValue = function(e) {
		if (this.el) {
			var t = this.formattingFn(e);
			this.options.plugin?.render ? this.options.plugin.render(this.el, t) : this.el.tagName === "INPUT" ? this.el.value = t : this.el.tagName === "text" || this.el.tagName === "tspan" ? this.el.textContent = t : this.el.innerHTML = t;
		}
	}, e.prototype.ensureNumber = function(e) {
		return typeof e == "number" && !isNaN(e);
	}, e.prototype.validateValue = function(e) {
		var t = Number(e);
		return this.ensureNumber(t) ? t : (this.error = `[CountUp] invalid start or end value: ${e}`, null);
	}, e.prototype.resetDuration = function() {
		this.startTime = null, this.duration = 1e3 * Number(this.options.duration), this.remaining = this.duration;
	}, e.prototype.parse = function(e) {
		var t = function(e) {
			return e.replace(/([.,'  ])/g, "\\$1");
		}, n = t(this.options.separator), r = t(this.options.decimal), i = e.replace(new RegExp(n, "g"), "").replace(new RegExp(r, "g"), ".");
		return parseFloat(i);
	}, e.observedElements = /* @__PURE__ */ new WeakMap(), e;
}(), CW = /* @__PURE__ */ H("<span class=\"leading-none\"> </span>");
function wW(e, t) {
	lt(t, !0);
	let n = Y(t, "text", 7, 0), r = (e) => {
		let t = new SW(e, Number(n()), {
			duration: 1.5,
			useEasing: !0
		}), r = new IntersectionObserver((e) => {
			e.forEach((e) => {
				e.isIntersecting ? t.error ? console.error(t.error) : t.start() : t.reset();
			});
		}, { threshold: .1 });
		return r.observe(e), () => {
			t.onDestroy(), r.disconnect();
		};
	};
	var i = {
		get text() {
			return n();
		},
		set text(e = 0) {
			n(e), P();
		}
	}, a = di(), o = Pn(a), s = (e) => {
		var t = CW(), i = L(t, !0);
		M(t), ta(t, () => r), z(() => W(i, n())), U(e, t);
	};
	return G(o, (e) => {
		n() && e(s);
	}), U(e, a), ut(i);
}
Ga(wW, { text: {} }, [], [], { mode: "open" });
//#endregion
//#region src/lib/components/product/Results.svelte
var TW = (e, t, n, r, i, a) => {
	let o = /* @__PURE__ */ zt(() => k(t?.(), 0)), s = /* @__PURE__ */ zt(() => k(n?.(), "")), c = /* @__PURE__ */ zt(() => k(r?.(), "")), l = /* @__PURE__ */ zt(() => k(i?.(), "down")), u = /* @__PURE__ */ zt(() => k(a?.(), ""));
	var d = AW(), f = L(d), p = L(f), m = L(p), h = L(m), g = (e) => {
		var t = DW(), n = Pn(t);
		{
			let e = /* @__PURE__ */ N(() => Number(V(o)));
			wW(n, { get text() {
				return V(e);
			} });
		}
		Xe(2), U(e, t);
	}, _ = (e) => {
		U(e, OW());
	};
	G(h, (e) => {
		V(o) ? e(g) : e(_, -1);
	});
	var v = R(h, 2), y = (e) => {
		var t = kW(), n = L(t, !0);
		M(t), z(() => W(n, V(u))), U(e, t);
	};
	G(v, (e) => {
		V(u) && e(y);
	}), M(m);
	var b = R(m, 2), x = L(b, !0);
	M(b);
	var S = R(b, 2), C = L(S);
	z(() => J(C, "name", V(l) === "up" ? "result-up" : V(l) === "chk" ? "result-chk" : V(l) === "down" ? "result-down" : V(l) === "eye" ? "result-eye" : "result-close")), K(C, 1, "size-12.5"), M(S), M(p);
	var w = R(p, 2), T = L(w), E = L(T, !0);
	M(T), M(w), M(f), M(d), z(() => {
		K(d, 1, ia(["h-90.5 overflow-clip rounded-xl p-5  lg:p-7.5 xl:h-111.25", V(l) === "up" ? "bg-ff4000/10" : V(l) === "chk" ? "bg-1bc900/10" : V(l) === "down" ? "bg-primary/10" : "bg-ddd"])), K(m, 1, ia(["relative flex pt-2 pr-15 text-6xl  leading-none font-bold transition-colors lg:text-[90px]", V(l) === "up" ? "text-red" : V(l) === "chk" ? "text-149e00" : V(l) === "down" ? "text-primary" : "text-black"])), W(x, V(s)), K(S, 1, ia(["@starting:rotate-180 absolute top-0 right-0 z-1 grid size-10 scale-100 rotate-0 place-content-center rounded-2xl transition-all delay-1000 lg:size-12.5", V(l) === "up" ? "fill-red" : V(l) === "chk" ? "fill-149e00" : V(l) === "down" ? "fill-primary" : "fill-black"])), W(E, V(c));
	}), U(e, d);
}, EW = (e, t, n = D, r) => {
	let i = /* @__PURE__ */ zt(() => k(t?.(), "")), a = /* @__PURE__ */ zt(() => k(r?.(), ""));
	var o = PW(), s = L(o), c = L(s);
	M(s);
	var l = R(s, 2), u = (e) => {
		var t = jW(), n = L(t, !0);
		M(t), z(() => W(n, V(i))), U(e, t);
	};
	G(l, (e) => {
		V(i) && e(u);
	});
	var d = R(l, 2), f = (e) => {
		var t = NW();
		aB(L(t), {
			get message() {
				return n();
			},
			b: (e, t) => {
				let n = () => t?.().children;
				var r = MW();
				Oi(L(r), () => n() ?? D), M(r), U(e, r);
			},
			$$slots: { b: !0 }
		}), M(t), U(e, t);
	};
	G(d, (e) => {
		n() && e(f);
	}), M(o), z(() => {
		q(c, "src", V(a)), q(c, "alt", V(i));
	}), U(e, o);
}, DW = /* @__PURE__ */ H("<!> <span class=\"leading-none font-bold\">%</span>", 1), OW = /* @__PURE__ */ H("<strong class=\"leading-none font-bold\">ZERO</strong>"), kW = /* @__PURE__ */ H("<strong class=\"leading-none font-bold\"> </strong>"), AW = /* @__PURE__ */ H("<li data-scroll=\"slide-up\"><dl class=\"group/res flex h-full flex-col justify-between\"><dt class=\"relative\"><p><!> <!></p> <p class=\"mt-2.5 text-2xl font-bold lg:text-4xl lg:whitespace-pre-line\"> </p> <div data-scroll=\"scale-up\"><icon-list></icon-list></div></dt> <dd class=\"text-2xl lg:text-4xl lg:whitespace-pre-line\"><p class=\"text-2md text-black lg:text-lg\"> </p></dd></dl></li>", 2), jW = /* @__PURE__ */ H("<p class=\"text-lg font-bold lg:text-2xl\"> </p>"), MW = /* @__PURE__ */ H("<strong class=\"text-primary font-bold\"><!></strong>"), NW = /* @__PURE__ */ H("<p class=\"text-2md text-666 lg:text-lg\"><!></p>"), PW = /* @__PURE__ */ H("<li data-scroll=\"slide-up\" class=\"relative grid place-items-center gap-5 rounded-xl bg-white p-5 text-center opacity-0 lg:p-7.5\"><picture class=\"grid size-22.5 place-content-center\"><img loading=\"lazy\"/></picture> <!> <!></li>"), FW = /* @__PURE__ */ H("<ul class=\"grid grid-cols-1 gap-5 lg:grid-cols-2 xl:min-h-97.25 xl:grid-cols-4\"></ul>"), IW = /* @__PURE__ */ H("<ul class=\"grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5 lg:grid-cols-2 2xl:grid-cols-[repeat(auto-fit,minmax(calc(25%-20px),1fr))]\"></ul>"), LW = /* @__PURE__ */ H("<section class=\"space-y-5 rounded-xl pt-15 lg:space-y-15 lg:py-0\"><!> <!> <!></section>");
function RW(e, t) {
	lt(t, !0);
	let n = Y(t, "tit", 7, ""), r = Y(t, "txt", 7, ""), i = Y(t, "subTxt", 7, ""), a = Y(t, "lists", 23, () => []), o = Y(t, "page", 7, ""), s = /* @__PURE__ */ F(!1), c = (e) => {
		let t = Mc(e.children, {
			y: [50, 0],
			opacity: [0, 1],
			duration: 600,
			delay: Qc(100),
			easing: "easeOutQuad",
			autoplay: !1
		}), n = Yc({
			container: document.body,
			target: e,
			enter: "bottom center",
			leave: "top bottom",
			axis: "y",
			onEnter: () => {
				V(s) || (I(s, !0), t.seek(0), t.play());
			},
			onLeaveBackward: () => {
				I(s, !1);
			},
			debug: !1
		});
		return () => n.revert?.();
	};
	var l = {
		get tit() {
			return n();
		},
		set tit(e = "") {
			n(e), P();
		},
		get txt() {
			return r();
		},
		set txt(e = "") {
			r(e), P();
		},
		get subTxt() {
			return i();
		},
		set subTxt(e = "") {
			i(e), P();
		},
		get lists() {
			return a();
		},
		set lists(e = []) {
			a(e), P();
		},
		get page() {
			return o();
		},
		set page(e = "") {
			o(e), P();
		}
	}, u = LW(), d = L(u);
	cB(d, {
		get tit() {
			return n();
		},
		get txt() {
			return r();
		},
		get subTxt() {
			return i();
		}
	});
	var f = R(d, 2), p = (e) => {
		var t = FW();
		Ni(t, 21, a, ki, (e, t) => {
			EW(e, () => V(t).tit, () => V(t).txt, () => V(t).img);
		}), M(t), ta(t, () => c), U(e, t);
	}, m = (e) => {
		var t = IW();
		Ni(t, 23, a, (e, t) => `result-item-${t}`, (e, t) => {
			TW(e, () => V(t).num, () => V(t).subTit, () => V(t).txt, () => V(t).result, () => V(t).per);
		}), M(t), U(e, t);
	};
	return G(f, (e) => {
		o() === "dsc" ? e(p) : e(m, -1);
	}), bW(R(f, 2), {}), M(u), U(e, u), ut(l);
}
Ga(RW, {
	tit: {},
	txt: {},
	subTxt: {},
	lists: {},
	page: {}
}, [], [], { mode: "open" });
//#endregion
//#region src/lib/components/visual/SubVisual.svelte
var zW = /* @__PURE__ */ H("<div class=\"before:[''] absolute top-0 left-0 h-full w-full object-cover before:absolute before:top-0 before:left-0 before:z-3 before:size-full before:bg-linear-to-l before:from-black/0 before:to-black\"><video class=\"relative z-1 aspect-video h-full w-full object-cover\" autoplay=\"\" playsinline=\"\" loop=\"\"><source type=\"video/webm\"/></video></div>", 2), BW = /* @__PURE__ */ H("<p class=\"before:bg-7cf5a0 inline-flex min-h-7.5 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4.5 py-1 text-xs leading-none font-bold before:size-1.5 before:rounded-full\"> </p>"), VW = /* @__PURE__ */ H("<img class=\"h-full\"/>"), HW = /* @__PURE__ */ H("<source sizes=\"(min-width: 1280px) 60px, 40px\"/>"), UW = /* @__PURE__ */ H("<picture><!> <img class=\"h-full\"/></picture>"), WW = /* @__PURE__ */ H("<picture class=\"flex h-10 lg:h-15\"><!></picture>"), GW = /* @__PURE__ */ H("<p><!></p>"), KW = /* @__PURE__ */ H("<section data-scroll=\"first\" class=\"relative flex max-h-dvh min-h-[70dvh] flex-col justify-between overflow-clip rounded-xl bg-cover bg-center p-5 text-white opacity-100 max-lg:rounded-lg md:min-h-160 lg:p-15 xl:min-h-200 starting:translate-y-0 starting:opacity-0\"><!> <div class=\"relative z-5 starting:opacity-0\"><div><!> <!></div> <h1 class=\"leading-sung mt-5 text-3xl font-bold delay-75 lg:mt-7.5 lg:text-[3.75rem] lg:whitespace-pre-line\"> </h1> <h2 class=\"sr-only\"> </h2></div> <div class=\"ext-2md relative z-5 mt-5 leading-normal text-white lg:text-lg lg:whitespace-pre-line starting:opacity-0\"><!> <div class=\"mt-7.5 flex lg:mt-9\"><a class=\"text-2md group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white hover:text-black max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:text-lg\"><span> </span> <icon-list></icon-list></a></div></div></section>", 2);
function qW(e, t) {
	lt(t, !0);
	let n = Y(t, "videoUrl", 7, ""), r = Y(t, "bg", 7, ""), i = Y(t, "badge", 7, ""), a = Y(t, "logo", 7, ""), o = Y(t, "page", 7, ""), s = Y(t, "logoAlt", 7, ""), c = Y(t, "tit", 7, ""), l = Y(t, "subtit", 7);
	var u = {
		get videoUrl() {
			return n();
		},
		set videoUrl(e = "") {
			n(e), P();
		},
		get bg() {
			return r();
		},
		set bg(e = "") {
			r(e), P();
		},
		get badge() {
			return i();
		},
		set badge(e = "") {
			i(e), P();
		},
		get logo() {
			return a();
		},
		set logo(e = "") {
			a(e), P();
		},
		get page() {
			return o();
		},
		set page(e = "") {
			o(e), P();
		},
		get logoAlt() {
			return s();
		},
		set logoAlt(e = "") {
			s(e), P();
		},
		get tit() {
			return c();
		},
		set tit(e = "") {
			c(e), P();
		},
		get subtit() {
			return l();
		},
		set subtit(e) {
			l(e), P();
		}
	}, d = KW(), f = L(d), p = (e) => {
		var t = zW(), r = L(t);
		r.muted = !0;
		var i = L(r);
		M(r), M(t), z(() => q(i, "src", n())), U(e, t);
	};
	G(f, (e) => {
		n() && e(p);
	});
	var m = R(f, 2), h = L(m), g = L(h), _ = (e) => {
		var t = BW(), n = L(t, !0);
		M(t), z(() => W(n, i())), U(e, t);
	};
	G(g, (e) => {
		i() && e(_);
	});
	var v = R(g, 2), y = (e) => {
		var t = WW(), n = L(t), r = (e) => {
			var t = di(), n = Pn(t), r = (e) => {
				var t = VW();
				z(() => {
					q(t, "src", a()), q(t, "alt", s());
				}), U(e, t);
			};
			G(n, (e) => {
				e(r, -1);
			}), U(e, t);
		}, i = (e) => {
			var t = UW(), n = L(t);
			Ni(n, 17, () => Object.entries(a().sources), ki, (e, t) => {
				var n = /* @__PURE__ */ N(() => ne(V(t), 2));
				let r = () => V(n)[0], i = () => V(n)[1];
				var a = HW();
				z(() => {
					q(a, "srcset", i()), q(a, "type", "image/" + r());
				}), U(e, a);
			});
			var r = R(n, 2);
			M(t), z(() => {
				q(r, "src", a().img.src), q(r, "alt", s()), q(r, "width", a().img.w), q(r, "height", a().img.h);
			}), U(e, t);
		};
		G(n, (e) => {
			typeof a() == "string" ? e(r) : e(i, -1);
		}), M(t), U(e, t);
	};
	G(v, (e) => {
		a() && e(y);
	}), M(h);
	var b = R(h, 2), x = L(b, !0);
	M(b);
	var S = R(b, 2), C = L(S);
	M(S), M(m);
	var w = R(m, 2), T = L(w);
	aB(T, {
		get message() {
			return l();
		},
		p: (e, t) => {
			let n = () => t?.().children;
			var r = GW();
			Oi(L(r), () => n() ?? D), M(r), U(e, r);
		},
		$$slots: { p: !0 }
	});
	var E = R(T, 2), O = L(E), ee = L(O), te = L(ee, !0);
	M(ee);
	var k = R(ee, 2);
	return J(k, "name", "arrow-right"), K(k, 1, "size-6 stroke-white group-hover:stroke-black"), M(O), M(E), M(w), M(d), z((e) => {
		W(x, c()), W(C, `${o() ?? ""} page`), q(O, "href", o() === "logi" ? "https://logifine.deepfine.com/signup/trial" : o() === "dao" ? "/contact/contact?selectSolution=DAO" : o() === "dsc" ? "/contact/contact?selectSolution=DSC" : "/contact/contact"), q(O, "target", o() === "logi" ? "_black" : void 0), q(O, "rel", o() === "logi" ? "noopener noreferrer" : void 0), W(te, e);
	}, [() => sP()]), U(e, d), ut(u);
}
customElements.define("sub-visual", Ga(qW, {
	videoUrl: {},
	bg: {},
	badge: {},
	logo: {},
	page: {},
	logoAlt: {},
	tit: {},
	subtit: {}
}, [], []));
//#endregion
//#region src/lib/components/pages/Dao.svelte
var JW = /* @__PURE__ */ H("<!> <!> <!> <!> <!> <!> <!>", 1);
function YW(e, t) {
	lt(t, !0);
	let n = /* @__PURE__ */ F(Cn([
		{
			img: "/output/imgs/banner/img-banner-dao-1.png",
			tit: Pp()
		},
		{
			img: "/output/imgs/banner/img-banner-dao-2.png",
			tit: Lp()
		},
		{
			img: "/output/imgs/banner/img-banner-dao-3.png",
			tit: Bp()
		},
		{
			img: "/output/imgs/banner/img-banner-dao-4.png",
			tit: Up()
		},
		{
			img: "/output/imgs/banner/img-banner-dao-5.png",
			tit: Kp()
		},
		{
			img: "/output/imgs/banner/img-banner-dao-11.png",
			tit: Yp()
		}
	])), r = /* @__PURE__ */ F(Cn([
		{
			poster: "/output/video/vi-video.jpg",
			video: "/output/video/vi-video.webm",
			tit: im(),
			txt: [sm(), um()],
			logo: pm(),
			labels: [
				gm(),
				ym(),
				Sm(),
				Tm()
			]
		},
		{
			poster: "/output/video/sc-video.jpg",
			video: "/output/video/sc-video.webm",
			tit: Om(),
			txt: [jm()],
			logo: Pm(),
			labels: [Lm(), Bm()]
		},
		{
			poster: "/output/video/workflow-video.jpg",
			video: "/output/video/workflow-video.webm",
			tit: Um(),
			txt: [Km(), Ym()],
			logo: Qm(),
			labels: [
				th(),
				ih(),
				sh(),
				uh()
			]
		},
		{
			poster: "/output/video/remote-video.jpg",
			video: "/output/video/remote-video.webm",
			tit: ph(),
			txt: [gh(), yh()],
			logo: Sh(),
			labels: [
				Th(),
				Oh(),
				jh()
			]
		}
	])), i = /* @__PURE__ */ F(Cn([
		{
			result: "up",
			num: 60,
			subTit: Bh(),
			txt: Uh()
		},
		{
			result: "down",
			num: 25,
			subTit: Kh(),
			txt: Yh()
		},
		{
			result: "down",
			num: 40,
			subTit: Qh(),
			txt: tg()
		},
		{
			result: "chk",
			num: 100,
			subTit: ig(),
			txt: sg()
		}
	])), a = /* @__PURE__ */ F(Cn([
		{
			id: "das-case-5",
			btn: L_(),
			logo: ["client"],
			img: "/output/imgs/case/img-case-dao-5.jpg",
			tit: B_(),
			badge: [U_()],
			txt: [K_(), Y_()],
			etc: [
				Q_,
				tv,
				iv
			]
		},
		{
			id: "das-case-1",
			btn: ug(),
			logo: ["/output/imgs/case/logo-case-dao-1.png"],
			img: "/output/imgs/case/img-case-dao-1.jpg",
			tit: pg(),
			txt: [gg(), yg()],
			etc: [
				Sg,
				Tg,
				Og
			]
		},
		{
			id: "das-case-2",
			btn: jg(),
			logo: ["client"],
			img: "/output/imgs/case/img-case-dao-2.jpg",
			tit: Pg(),
			txt: [Lg(), Bg()],
			etc: [
				Ug,
				Kg,
				Yg
			]
		},
		{
			id: "das-case-3",
			btn: Qg(),
			logo: ["client"],
			img: "/output/imgs/case/img-case-dao-3.jpg",
			tit: t_(),
			txt: [i_(), s_()],
			etc: [
				u_,
				p_,
				g_
			]
		},
		{
			id: "das-case-4",
			btn: y_(),
			logo: ["/output/imgs/case/logo-case-dao-4.png"],
			img: "/output/imgs/case/img-case-dao-4.jpg",
			tit: S_(),
			txt: [T_()],
			etc: [
				O_,
				j_,
				P_
			]
		}
	])), o = /* @__PURE__ */ F(Cn([
		{
			id: "faq-chk-1",
			tit: uv(),
			txt: pv
		},
		{
			id: "faq-chk-2",
			tit: gv(),
			txt: yv
		},
		{
			id: "faq-chk-3",
			tit: Sv(),
			txt: Tv
		},
		{
			id: "faq-chk-4",
			link: "/contact/contact?selectSolution=DAO",
			btn: TP(),
			tit: Ov(),
			txt: jv
		},
		{
			id: "faq-chk-5",
			link: "/contact/contact?selectSolution=DAO",
			btn: OP(),
			tit: Pv(),
			txt: Lv
		}
	]));
	ct("case-list", { get list() {
		return V(a);
	} }), Xn(() => {
		let e = new Zz({ autoRaf: !0 });
		return Qz.setInstance(e), () => {
			Qz.clear();
		};
	});
	var s = JW(), c = Pn(s);
	{
		let e = /* @__PURE__ */ N(() => gf()), t = /* @__PURE__ */ N(() => yf());
		qW(c, {
			get videoUrl() {
				return "/output/video/dao-video.webm";
			},
			get bg() {
				return "/output/imgs/visual/dao-visual.jpg";
			},
			get logo() {
				return "/output/imgs/logo/logo-dao.svg";
			},
			page: "dao",
			get logoAlt() {
				return V(e);
			},
			get tit() {
				return V(t);
			},
			get subtit() {
				return Sf;
			}
		});
	}
	var l = R(c, 2);
	sW(l, { page: "dao" });
	var u = R(l, 2);
	{
		let e = /* @__PURE__ */ N(() => Tp()), t = /* @__PURE__ */ N(() => Op()), r = /* @__PURE__ */ N(() => jp()), i = /* @__PURE__ */ N(() => [...V(n)]);
		tW(u, {
			cls: "lg:grid-cols-[repeat(auto-fit,minmax(calc(33%-10px),1fr))] grid-cols-[repeat(auto-fit,1fr)]",
			get tit() {
				return V(e);
			},
			get txt() {
				return V(t);
			},
			get subTxt() {
				return V(r);
			},
			get lists() {
				return V(i);
			}
		});
	}
	var d = R(u, 2);
	{
		let e = /* @__PURE__ */ N(() => Qp()), t = /* @__PURE__ */ N(() => tm()), n = /* @__PURE__ */ N(() => [...V(r)]);
		YU(d, {
			get tit() {
				return V(e);
			},
			get txt() {
				return V(t);
			},
			get lists() {
				return V(n);
			},
			page: "dao"
		});
	}
	var f = R(d, 2);
	{
		let e = /* @__PURE__ */ N(() => Ph()), t = /* @__PURE__ */ N(() => Lh()), n = /* @__PURE__ */ N(() => [...V(i)]);
		RW(f, {
			get tit() {
				return V(e);
			},
			get txt() {
				return V(t);
			},
			get lists() {
				return V(n);
			}
		});
	}
	var p = R(f, 2);
	{
		let e = /* @__PURE__ */ N(() => sv()), t = /* @__PURE__ */ N(() => [...V(o)]);
		CB(p, {
			tit: "FAQ",
			get txt() {
				return V(e);
			},
			get lists() {
				return V(t);
			}
		});
	}
	IU(R(p, 2), { page: "dao" }), U(e, s), ut();
}
customElements.define("sub-dao", Ga(YW, { videoUrl: {
	attribute: "data-vide-url",
	type: "String"
} }, [], []));
//#endregion
//#region ../../node_modules/.bun/parse-unit@1.0.1/node_modules/parse-unit/index.js
var XW = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e, t) {
		return t ||= [0, ""], e = String(e), t[0] = parseFloat(e, 10), t[1] = e.match(/[\d.\-\+]*\s*(.*)/)[1] || "", t;
	};
})), ZW = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
	var n = XW();
	t.exports = o;
	var r = a("in", document.body);
	function i(e, t) {
		var r = n(getComputedStyle(e).getPropertyValue(t));
		return r[0] * o(r[1], e);
	}
	function a(e, t) {
		var n = document.createElement("div");
		n.style.height = "128" + e, t.appendChild(n);
		var r = i(n, "height") / 128;
		return t.removeChild(n), r;
	}
	function o(e, t) {
		if (!e) return null;
		switch (t ||= document.body, e = (e + "" || "px").trim().toLowerCase(), (t === window || t === document) && (t = document.body), e) {
			case "%": return t.clientHeight / 100;
			case "ch":
			case "ex": return a(e, t);
			case "em": return i(t, "font-size");
			case "rem": return i(document.body, "font-size");
			case "vw": return window.innerWidth / 100;
			case "vh": return window.innerHeight / 100;
			case "vmin": return Math.min(window.innerWidth, window.innerHeight) / 100;
			case "vmax": return Math.max(window.innerWidth, window.innerHeight) / 100;
			case "in": return r;
			case "cm": return r / 2.54;
			case "mm": return r / 25.4;
			case "pt": return r / 72;
			case "pc": return r / 6;
			case "px": return 1;
		}
		var s = n(e);
		if (!isNaN(s[0]) && s[1]) {
			var c = o(s[1], t);
			return typeof c == "number" ? s[0] * c : null;
		}
		return null;
	}
})))()), QW = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"$$host",
	"children",
	"options"
]), $W = /* @__PURE__ */ H("<div><div class=\"glass-non-edge svelte-vgmuls\"><div class=\"glass-edge svelte-vgmuls\"><div class=\"glass-sheen svelte-vgmuls\"><!></div></div></div></div>"), eG = {
	hash: "svelte-vgmuls",
	code: ".glass.svelte-vgmuls {position:relative;overflow:hidden;z-index:1;inset:0;border-radius:inherit;background-color:var(--main-background-color);& :where(.svelte-vgmuls),\n		& :where(.svelte-vgmuls)::before {border-radius:inherit;}.glass-sheen > * {position:relative;z-index:1;}.glass-sheen:where(.svelte-vgmuls)::before {content:'';position:absolute;inset:0;border-radius:inherit;backdrop-filter:blur(var(--sheen-blur));background-color:var(--sheen-background-color);pointer-events:none;z-index:0;-webkit-mask-image:linear-gradient(0deg, #000, transparent var(--sheen-width)),\n				linear-gradient(180deg, #000, transparent var(--sheen-width)),\n				linear-gradient(90deg, #000, transparent var(--sheen-width)),\n				linear-gradient(270deg, #000, transparent var(--sheen-width));mask-image:linear-gradient(0deg, #000, transparent var(--sheen-width)),\n				linear-gradient(180deg, #000, transparent var(--sheen-width)),\n				linear-gradient(90deg, #000, transparent var(--sheen-width)),\n				linear-gradient(270deg, #000, transparent var(--sheen-width));mask-composite:add;mask-type:luminance;pointer-events:none;}.glass-non-edge:where(.svelte-vgmuls)::before {content:'';position:absolute;inset:0;border-radius:inherit;backdrop-filter:blur(var(--main-blur));pointer-events:none;z-index:var(--non-edge-z-index);--gradient:\n				transparent var(--non-edge-width),\n				#000 calc(var(--non-edge-width) + var(--non-edge-gradient-width));-webkit-mask-image:linear-gradient(0deg, var(--gradient)), linear-gradient(180deg, var(--gradient)),\n				linear-gradient(90deg, var(--gradient)), linear-gradient(270deg, var(--gradient));mask-image:linear-gradient(0deg, var(--gradient)), linear-gradient(180deg, var(--gradient)),\n				linear-gradient(90deg, var(--gradient)), linear-gradient(270deg, var(--gradient));mask-composite:intersect;pointer-events:none;}.glass-edge:where(.svelte-vgmuls):before {content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:var(--edge-z-index);background-color:var(--edge-background-color);backdrop-filter:blur(var(--edge-blur));--gradient:\n				#000 var(--edge-width), transparent calc(var(--edge-width) + var(--edge-gradient-width));-webkit-mask-image:linear-gradient(0deg, var(--gradient)), linear-gradient(180deg, var(--gradient)),\n				linear-gradient(90deg, var(--gradient)), linear-gradient(270deg, var(--gradient));mask-image:linear-gradient(0deg, var(--gradient)), linear-gradient(180deg, var(--gradient)),\n				linear-gradient(90deg, var(--gradient)), linear-gradient(270deg, var(--gradient));mask-composite:add;mask-type:luminance;pointer-events:none;}}"
};
function tG(e, t) {
	lt(t, !0), $i(e, eG);
	let n = {
		mainBackgroundColor: "hsla(0, 0%, 75%, 0.1)",
		mainBlur: "1vw",
		edgeBlur: "0.5vw",
		edgeBackgroundColor: "hsla(0, 0%, 100%, 0.1)",
		edgeWidth: "1vw",
		edgeGradientWidth: "1vw",
		sheenBlur: "3vw",
		sheenBackgroundColor: "hsla(0, 0%, 100%, 0.2)",
		sheenWidth: "0.2vw",
		edgeZIndex: 1,
		nonEdgeZIndex: 0,
		nonEdgeGradientWidth: "0px",
		nonEdgeWidth: "0px"
	}, r = Y(t, "children", 7), i = Y(t, "options", 23, () => ({})), { class: a, style: o, ...s } = /* @__PURE__ */ La(t, QW), c = {
		...n,
		...i()
	};
	console.log(c);
	try {
		let e = (0, ZW.default)(c.mainBlur) ?? 0, t = (0, ZW.default)(c.edgeBlur) ?? 0;
		console.log(`mainBlurPx: ${e}, edgeBlurPx: ${t}`), e > t ? (c.nonEdgeGradientWidth = c.edgeGradientWidth, c.edgeGradientWidth = "0.0001px", c.edgeWidth = `calc(${c.edgeWidth} + ${c.mainBlur})`, c.edgeZIndex = -1, c.nonEdgeZIndex = 0) : (c.nonEdgeGradientWidth = "0.0001px", c.edgeZIndex = 0, c.nonEdgeZIndex = -1);
	} catch (e) {
		console.error("Invalid CSS value for blur size:", e);
	}
	console.log(c);
	let l = `--main-background-color:${c.mainBackgroundColor};
--main-blur:${c.mainBlur};
--edge-blur:${c.edgeBlur};
--edge-background-color:${c.edgeBackgroundColor};
--edge-width:${c.edgeWidth};
--edge-gradient-width:${c.edgeGradientWidth};
--non-edge-gradient-width:${c.nonEdgeGradientWidth};
--non-edge-width:calc(${c.nonEdgeWidth});
--sheen-blur:${c.sheenBlur};
--sheen-background-color:${c.sheenBackgroundColor};
--sheen-width:${c.sheenWidth};
--edge-z-index:${c.edgeZIndex};
--non-edge-z-index:${c.nonEdgeZIndex};`;
	var u = {
		get children() {
			return r();
		},
		set children(e) {
			r(e), P();
		},
		get options() {
			return i();
		},
		set options(e = {}) {
			i(e), P();
		}
	}, d = $W();
	Ea(d, () => ({
		class: `glass ${a || ""}`,
		style: `${l} ${o || ""}`,
		...s
	}), void 0, void 0, void 0, "svelte-vgmuls");
	var f = L(d), p = L(f), m = L(p);
	return Oi(L(m), () => r() ?? D), M(m), M(p), M(f), M(d), U(e, d), ut(u);
}
Ga(tG, {
	children: {},
	options: {}
}, [], [], { mode: "open" });
//#endregion
//#region src/lib/components/banner/BannerDsc.svelte
var nG = /* @__PURE__ */ H("<p class=\"text-2md lg:text-lg\"> </p> <div class=\" flex items-end justify-center gap-2.5 text-3xl font-bold lg:mt-2.5 lg:text-[5.625rem]\"><!> <p class=\"text-3xl font-bold\">m²</p></div> <p class=\"text-2md mt-5 lg:mt-2.5 lg:text-lg\"> </p>", 1), rG = /* @__PURE__ */ H("<section data-scroll=\"slide-up\" class=\" gap-5 overflow-clip rounded-xl\"><div class=\"before:bg-primary/50 absolute flex size-full w-full object-cover before:absolute before:z-2 before:size-full\" aria-hidden=\"true\"><video class=\"absoltue z-1 aspect-video h-full w-full object-cover\" preload=\"auto\" autoplay=\"\" loop=\"\" playsinline=\"\"><source type=\"video/webm\"/></video></div> <div class=\"relative z-3 flex flex-col gap-5 p-5 text-center whitespace-pre-line text-white lg:min-h-165 lg:gap-7.5 lg:p-15\"><h3 class=\"text-2xl leading-tight font-bold lg:text-5xl\"> </h3> <p class=\"text-lg lg:text-2xl\"> </p> <div><!></div> <div class=\"mt-auto\"><a href=\"/contact/contact?selectSolution=DSC\" class=\"text-2md group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white hover:text-black max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:text-lg\"><span> </span> <icon-list></icon-list></a></div></div></section>", 2);
function iG(e, t) {
	lt(t, !0);
	var n = rG(), r = L(n), i = L(r);
	i.muted = !0, q(i, "poster", "/output/video/banner-dsc.jpg"), q(L(i), "src", "/output/video/banner-dsc.webm"), M(i), M(r);
	var a = R(r, 2), o = L(a), s = L(o, !0);
	M(o);
	var c = R(o, 2), l = L(c, !0);
	M(c);
	var u = R(c, 2);
	tG(L(u), {
		class: "inline-flex w-full max-w-225 items-center justify-center  rounded-full p-5 ",
		style: "border-radius: 12px;",
		children: (e, t) => {
			var n = nG(), r = Pn(n), i = L(r, !0);
			M(r);
			var a = R(r, 2);
			wW(L(a), { text: 15e5 }), Xe(2), M(a);
			var o = R(a, 2), s = L(o, !0);
			M(o), z((e, t) => {
				W(i, e), W(s, t);
			}, [() => Kw(), () => Yw()]), U(e, n);
		},
		$$slots: { default: !0 }
	}), M(u);
	var d = R(u, 2), f = L(d), p = L(f), m = L(p, !0);
	M(p);
	var h = R(p, 2);
	J(h, "name", "arrow-right"), K(h, 1, "size-6 stroke-white group-hover:stroke-black"), M(f), M(d), M(a), M(n), z((e, t, n) => {
		W(s, e), W(l, t), W(m, n);
	}, [
		() => Bw(),
		() => Uw(),
		() => sP()
	]), U(e, n), ut();
}
Ga(iG, {}, [], [], { mode: "open" });
//#endregion
//#region src/lib/components/pages/Dsc.svelte
var aG = /* @__PURE__ */ H("<!> <!> <!> <!> <!> <!> <!>", 1);
function oG(e, t) {
	lt(t, !0);
	let n = /* @__PURE__ */ F(Cn([
		{
			img: "/output/imgs/banner/img-banner-dsc-8.png",
			tit: jb(),
			txt: Pb()
		},
		{
			img: "/output/imgs/banner/img-banner-dsc-2.png",
			tit: Yy(),
			txt: Qy()
		},
		{
			img: "/output/imgs/banner/img-banner-dsc-3.png",
			tit: tb(),
			txt: ib()
		},
		{
			img: "/output/imgs/banner/img-banner-dsc-1.png",
			tit: Uy(),
			txt: Ky()
		},
		{
			img: "/output/imgs/banner/img-banner-dao-3.png",
			tit: yb(),
			txt: Sb()
		},
		{
			img: "/output/imgs/banner/img-banner-dao-8.png",
			tit: sb(),
			txt: ub()
		},
		{
			img: "/output/imgs/banner/img-banner-dao-9.png",
			tit: pb(),
			txt: gb()
		},
		{
			img: "/output/imgs/banner/img-banner-dao-10.png",
			tit: Tb(),
			txt: Ob()
		}
	])), r = /* @__PURE__ */ F(Cn([
		{
			poster: "/output/video/vps-video.jpg",
			video: "/output/video/vps-video.webm",
			tit: gx(),
			txt: [yx(), Sx()],
			logo: Tx(),
			labels: [
				Ox(),
				jx(),
				Px()
			]
		},
		{
			poster: "/output/video/scan-video.jpg",
			video: "/output/video/scan-video.webm",
			tit: Yb(),
			txt: [Qb(), tx()],
			logo: ix(),
			labels: [
				sx(),
				ux(),
				px()
			]
		},
		{
			img: "/output/imgs/features/logo-features-dsc-3.jpg",
			tit: Lx(),
			txt: [Bx()],
			logo: Ux(),
			labels: [Kx(), Yx()]
		},
		{
			poster: "/output/video/dsc-part2-video-1.jpg",
			video: "/output/video/dsc-part2-video-1.webm",
			tit: Qx(),
			txt: [tS(), iS()],
			logo: sS(),
			labels: [
				uS(),
				pS(),
				gS()
			]
		},
		{
			poster: "/output/video/dsc-part2-video-2.jpg",
			video: "/output/video/dsc-part2-video-2.webm",
			tit: yS(),
			txt: [SS(), TS()],
			logo: OS(),
			labels: [
				jS(),
				PS(),
				LS()
			]
		}
	])), i = /* @__PURE__ */ N(() => V(r).slice(0, 3)), a = /* @__PURE__ */ N(() => V(r).slice(3, 5)), o = /* @__PURE__ */ F(Cn([
		{
			img: "/output/imgs/result/img-result-dsc-1.png",
			tit: KS(),
			txt: YS
		},
		{
			img: "/output/imgs/result/img-result-dsc-2.png",
			tit: QS(),
			txt: tC
		},
		{
			img: "/output/imgs/result/img-result-dsc-3.png",
			tit: iC(),
			txt: sC
		},
		{
			img: "/output/imgs/result/img-result-dsc-4.png",
			tit: uC(),
			txt: pC
		}
	])), s = /* @__PURE__ */ F(Cn([{
		id: "dsc-case-2",
		btn: BC(),
		logo: ["/output/imgs/case/logo-case-dsc-2.png", "client"],
		img: "/output/imgs/case/img-case-dsc-2.jpg",
		tit: UC(),
		badge: [
			KC(),
			YC(),
			QC()
		],
		txt: [tw()],
		etc: [iw, sw]
	}, {
		id: "dsc-case-1",
		btn: gC(),
		logo: ["/output/imgs/case/logo-case-dsc-1.png"],
		img: "/output/imgs/case/img-case-dsc-1.jpg",
		tit: yC(),
		badge: [
			SC(),
			TC(),
			OC()
		],
		txt: [jC()],
		etc: [PC, LC]
	}])), c = /* @__PURE__ */ F(Cn([
		{
			id: "faq-dsc-chk-1",
			tit: uw(),
			txt: pw
		},
		{
			id: "faq-dsc-chk-2",
			tit: gw(),
			txt: yw
		},
		{
			id: "faq-dsc-chk-3",
			tit: Sw(),
			txt: Tw
		},
		{
			id: "faq-dsc-chk-4",
			tit: Ow(),
			txt: jw
		},
		{
			id: "faq-dsc-chk-5",
			link: "/contact/contact?selectSolution=DSC",
			btn: TP(),
			tit: Pw(),
			txt: Lw
		}
	]));
	ct("case-list", { get list() {
		return V(s);
	} }), Xn(() => {
		let e = new Zz({ autoRaf: !0 });
		return Qz.setInstance(e), () => {
			Qz.clear();
		};
	});
	var l = aG(), u = Pn(l);
	{
		let e = /* @__PURE__ */ N(() => Ty()), t = /* @__PURE__ */ N(() => Oy());
		qW(u, {
			get videoUrl() {
				return "/output/video/dsc-video.webm";
			},
			get bg() {
				return "/output/video/dsc-video.jpg";
			},
			get logo() {
				return "/output/imgs/logo/logo-sub-dsc.svg";
			},
			page: "dsc",
			get logoAlt() {
				return V(e);
			},
			get tit() {
				return V(t);
			},
			get subtit() {
				return jy;
			}
		});
	}
	var d = R(u, 2);
	{
		let e = /* @__PURE__ */ N(() => Py()), t = /* @__PURE__ */ N(() => Ly()), r = /* @__PURE__ */ N(() => By()), i = /* @__PURE__ */ N(() => [...V(n)]);
		tW(d, {
			cls: " xl:grid-cols-4 lg:grid-cols-2 grid-cols-[repeat(auto-fit,1fr)]",
			get tit() {
				return V(e);
			},
			get txt() {
				return V(t);
			},
			get subTxt() {
				return V(r);
			},
			get lists() {
				return V(i);
			},
			page: "dsc"
		});
	}
	var f = R(d, 2);
	{
		let e = /* @__PURE__ */ N(() => Lb()), t = /* @__PURE__ */ N(() => Bb()), n = /* @__PURE__ */ N(() => [...V(i)]);
		YU(f, {
			get tit() {
				return V(e);
			},
			get txt() {
				return V(t);
			},
			get lists() {
				return V(n);
			},
			page: "dsc"
		});
	}
	var p = R(f, 2);
	{
		let e = /* @__PURE__ */ N(() => Ub()), t = /* @__PURE__ */ N(() => Kb()), n = /* @__PURE__ */ N(() => [...V(a)]);
		YU(p, {
			get tit() {
				return V(e);
			},
			get txt() {
				return V(t);
			},
			get lists() {
				return V(n);
			},
			page: "dsc"
		});
	}
	var m = R(p, 2);
	{
		let e = /* @__PURE__ */ N(() => BS()), t = /* @__PURE__ */ N(() => US()), n = /* @__PURE__ */ N(() => [...V(o)]);
		RW(m, {
			get tit() {
				return V(e);
			},
			get txt() {
				return V(t);
			},
			get lists() {
				return V(n);
			},
			page: "dsc"
		});
	}
	var h = R(m, 2);
	{
		let e = /* @__PURE__ */ N(() => sv()), t = /* @__PURE__ */ N(() => [...V(c)]);
		CB(h, {
			tit: "FAQ",
			get txt() {
				return V(e);
			},
			get lists() {
				return V(t);
			}
		});
	}
	iG(R(h, 2), {}), U(e, l), ut();
}
customElements.define("sub-dsc", Ga(oG, { videoUrl: {
	attribute: "data-vide-url",
	type: "String"
} }, [], []));
//#endregion
//#region src/lib/components/banner/BannerTrial.svelte
var sG = /* @__PURE__ */ H("<section data-scroll=\"slide-up\" class=\"bg-light-blue relative mt-5 grid min-h-80 grid-cols-1 justify-between overflow-clip rounded-xl bg-(image:--bg-trial) bg-cover bg-center bg-no-repeat px-7.5 whitespace-pre-line lg:mt-7.5 lg:h-81 lg:grid-cols-[1fr_fit-content(640px)] lg:grid-rows-2 lg:px-15\"><picture class=\"absolute top-0 left-0 z-1 grid place-items-center\"><img loading=\"lazy\" alt=\"new\" class=\"h-14 lg:h-20\"/></picture> <div data-scroll=\"slide-up\" class=\"flex flex-1 flex-col justify-between lg:row-span-1\"><div class=\"space-y-2.5 py-7.5 lg:pt-15\"><h4 class=\"text-lg leading-tight font-bold lg:text-4xl\"> </h4> <p> </p></div></div> <div data-scroll=\"slide-left\" class=\"flex justify-center lg:order-2 lg:row-span-2\"><picture class=\"grid place-items-center lg:mt-2 lg:-mr-15\"><img loading=\"lazy\" alt=\"img\" class=\"lg:h-auto\"/></picture></div> <div class=\"relative z-2 flex w-full pb-5 lg:order-3 lg:row-span-1 lg:inline-flex\"><a href=\"https://logifine.deepfine.com/signup/trial\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"group flex h-12 flex-1 items-center justify-between gap-2 rounded-md border border-black px-5 transition-colors hover:border-black hover:bg-black hover:text-white max-lg:justify-between lg:mt-auto lg:min-h-13.5 lg:w-auto lg:flex-none\"><span> </span> <icon-list></icon-list></a></div></section>", 2);
function cG(e, t) {
	lt(t, !0);
	var n = sG();
	da(n, "", {}, { "--bg-trial": "url(/output/imgs/banner/bg-trial.jpg)" });
	var r = L(n);
	q(L(r), "src", "/output/imgs/banner/img-new.png"), M(r);
	var i = R(r, 2), a = L(i), o = L(a), s = L(o, !0);
	M(o);
	var c = R(o, 2), l = L(c, !0);
	M(c), M(a), M(i);
	var u = R(i, 2), d = L(u);
	q(L(d), "src", "/output/imgs/banner/img-tablet.png"), M(d), M(u);
	var f = R(u, 2), p = L(f), m = L(p), h = L(m, !0);
	M(m);
	var g = R(m, 2);
	J(g, "name", "arrow-right"), K(g, 1, "size-6 stroke-black group-hover:stroke-white"), M(p), M(f), M(n), z((e, t, n, r) => {
		W(s, e), W(l, t), q(p, "aria-label", n), W(h, r);
	}, [
		() => gP?.(),
		() => yP?.(),
		() => SP?.() + "page",
		() => SP?.()
	]), U(e, n), ut();
}
Ga(cG, {}, [], [], { mode: "open" });
//#endregion
//#region src/lib/components/pages/Logi.svelte
var lG = /* @__PURE__ */ H("<!> <!> <!> <!> <!> <!> <!> <!>", 1);
function uG(e, t) {
	lt(t, !0);
	let n = /* @__PURE__ */ F(Cn([
		{
			img: "/output/imgs/banner/img-banner-logi-1.png",
			tit: LE(),
			txt: BE()
		},
		{
			img: "/output/imgs/banner/img-banner-logi-2.png",
			tit: pE(),
			txt: gE()
		},
		{
			img: "/output/imgs/banner/img-banner-logi-3.png",
			tit: UE(),
			txt: KE()
		},
		{
			img: "/output/imgs/banner/img-banner-logi-4.png",
			tit: TE(),
			txt: OE()
		},
		{
			img: "/output/imgs/banner/img-banner-logi-5.png",
			tit: jE(),
			txt: PE()
		},
		{
			img: "/output/imgs/banner/img-banner-logi-6.png",
			tit: yE(),
			txt: SE()
		}
	])), r = /* @__PURE__ */ F(Cn([
		{
			img: "/output/imgs/features/logo-features-logi-1.jpg",
			tit: tD(),
			txt: [iD(), sD()],
			logo: uD(),
			labels: [
				pD(),
				gD(),
				yD()
			]
		},
		{
			img: "/output/imgs/features/logo-features-logi-2.jpg",
			tit: SD(),
			txt: [TD(), OD()],
			logo: jD(),
			labels: [
				PD(),
				LD(),
				BD(),
				UD()
			]
		},
		{
			img: "/output/imgs/features/logo-features-logi-3.jpg",
			tit: KD(),
			txt: [YD(), QD()],
			logo: tO(),
			labels: [
				iO(),
				sO(),
				uO()
			]
		},
		{
			img: "/output/imgs/features/logo-features-logi-4.jpg",
			tit: pO(),
			txt: [gO(), yO()],
			logo: SO(),
			labels: [
				TO(),
				OO(),
				jO(),
				PO()
			]
		},
		{
			img: "/output/imgs/features/logo-features-logi-5.jpg",
			tit: LO(),
			txt: [BO()],
			logo: UO(),
			labels: [
				KO(),
				YO(),
				QO(),
				tk()
			]
		}
	])), i = /* @__PURE__ */ F(Cn([
		{
			result: "close",
			subTit: uk(),
			txt: pk()
		},
		{
			result: "up",
			num: 60,
			subTit: gk(),
			txt: yk()
		},
		{
			result: "up",
			num: 18,
			subTit: Sk(),
			txt: Tk()
		},
		{
			result: "chk",
			num: 100,
			subTit: Ok(),
			txt: jk()
		}
	])), a = /* @__PURE__ */ F(Cn([{
		id: "logi-case-1",
		btn: Pk(),
		logo: ["client"],
		img: "/output/imgs/case/img-case-logi-1.jpg",
		tit: Lk(),
		badge: [Bk()],
		txt: [Uk(), Kk()],
		etc: [Yk, Qk]
	}, {
		id: "logi-case-2",
		btn: tA(),
		logo: ["client"],
		img: "/output/imgs/case/img-case-logi-2.jpg",
		tit: iA(),
		badge: [sA()],
		txt: [uA(), pA()],
		etc: [gA, yA]
	}])), o = /* @__PURE__ */ F(Cn([
		{
			id: "faq-logi-chk-1",
			tit: OA(),
			txt: jA
		},
		{
			id: "faq-logi-chk-2",
			tit: PA(),
			txt: LA
		},
		{
			id: "faq-logi-chk-3",
			tit: BA(),
			txt: UA
		},
		{
			id: "faq-logi-chk-4",
			tit: KA(),
			txt: YA
		}
	]));
	ct("case-list", { get list() {
		return V(a);
	} }), Xn(() => {
		let e = new Zz({ autoRaf: !0 });
		return Qz.setInstance(e), () => {
			Qz.clear();
		};
	});
	var s = lG(), c = Pn(s);
	{
		let e = /* @__PURE__ */ N(() => Qw()), t = /* @__PURE__ */ N(() => tT());
		qW(c, {
			get videoUrl() {
				return "/output/video/logi-video.webm";
			},
			get bg() {
				return "/output/video/logi-video.jpg";
			},
			get logo() {
				return "/output/imgs/logo/logo-sub-logi.svg";
			},
			page: "logi",
			get logoAlt() {
				return V(e);
			},
			get tit() {
				return V(t);
			},
			get subtit() {
				return iT;
			}
		});
	}
	var l = R(c, 2);
	cG(l, {});
	var u = R(l, 2);
	sW(u, { page: "logi" });
	var d = R(u, 2);
	{
		let e = /* @__PURE__ */ N(() => iE()), t = /* @__PURE__ */ N(() => sE()), r = /* @__PURE__ */ N(() => uE()), i = /* @__PURE__ */ N(() => [...V(n)]);
		tW(d, {
			cls: "lg:grid-cols-[repeat(auto-fit,minmax(calc(33%-10px),1fr))] grid-cols-[repeat(auto-fit,1fr)]",
			get tit() {
				return V(e);
			},
			get txt() {
				return V(t);
			},
			get subTxt() {
				return V(r);
			},
			get lists() {
				return V(i);
			}
		});
	}
	var f = R(d, 2);
	{
		let e = /* @__PURE__ */ N(() => YE()), t = /* @__PURE__ */ N(() => QE()), n = /* @__PURE__ */ N(() => [...V(r)]);
		YU(f, {
			get tit() {
				return V(e);
			},
			get txt() {
				return V(t);
			},
			get lists() {
				return V(n);
			},
			page: "logi"
		});
	}
	var p = R(f, 2);
	{
		let e = /* @__PURE__ */ N(() => ik()), t = /* @__PURE__ */ N(() => sk()), n = /* @__PURE__ */ N(() => [...V(i)]);
		RW(p, {
			get tit() {
				return V(e);
			},
			get txt() {
				return V(t);
			},
			get lists() {
				return V(n);
			}
		});
	}
	var m = R(p, 2);
	{
		let e = /* @__PURE__ */ N(() => TA()), t = /* @__PURE__ */ N(() => [...V(o)]);
		CB(m, {
			tit: "FAQ",
			get txt() {
				return V(e);
			},
			get lists() {
				return V(t);
			}
		});
	}
	IU(R(m, 2), { page: "logi" }), U(e, s), ut();
}
//#endregion
//#region ../../node_modules/.bun/svelte@5.56.3/node_modules/svelte/src/internal/flags/legacy.js
customElements.define("sub-logi", Ga(uG, { videoUrl: {
	attribute: "data-vide-url",
	type: "String"
} }, [], [])), it();
//#endregion
//#region ../../node_modules/.bun/tailwind-merge@3.6.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs
var dG = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, fG = (e, t) => ({
	classGroupId: e,
	validator: t
}), pG = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), mG = "-", hG = [], gG = "arbitrary..", _G = (e) => {
	let t = bG(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return yG(e);
			let n = e.split(mG);
			return vG(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? dG(i, t) : t : i || hG;
			}
			return n[e] || hG;
		}
	};
}, vG = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = vG(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(mG) : e.slice(t).join(mG), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, yG = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? gG + r : void 0;
})(), bG = (e) => {
	let { theme: t, classGroups: n } = e;
	return xG(n, t);
}, xG = (e, t) => {
	let n = pG();
	for (let r in e) {
		let i = e[r];
		SG(i, n, r, t);
	}
	return n;
}, SG = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		CG(i, t, n, r);
	}
}, CG = (e, t, n, r) => {
	if (typeof e == "string") {
		wG(e, t, n);
		return;
	}
	if (typeof e == "function") {
		TG(e, t, n, r);
		return;
	}
	EG(e, t, n, r);
}, wG = (e, t, n) => {
	let r = e === "" ? t : DG(t, e);
	r.classGroupId = n;
}, TG = (e, t, n, r) => {
	if (OG(e)) {
		SG(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(fG(n, e));
}, EG = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		SG(o, DG(t, a), n, r);
	}
}, DG = (e, t) => {
	let n = e, r = t.split(mG), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = pG(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, OG = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, kG = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, AG = "!", jG = ":", MG = [], NG = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), PG = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === jG) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(AG) ? (c = s.slice(0, -1), l = !0) : s.startsWith(AG) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return NG(t, l, c, u);
	};
	if (t) {
		let e = t + jG, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : NG(MG, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, FG = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, IG = (e) => ({
	cache: kG(e.cacheSize),
	parseClassName: PG(e),
	sortModifiers: FG(e),
	postfixLookupClassGroupIds: LG(e),
	..._G(e)
}), LG = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, RG = /\s+/, zG = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(RG), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			if (g = r(p), !g) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + AG : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, BG = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = VG(n)) && (i && (i += " "), i += r);
	return i;
}, VG = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = VG(e[r])) && (n && (n += " "), n += t);
	return n;
}, HG = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = IG(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = zG(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(BG(...e));
}, UG = [], WG = (e) => {
	let t = (t) => t[e] || UG;
	return t.isThemeGetter = !0, t;
}, GG = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, KG = /^\((?:(\w[\w-]*):)?(.+)\)$/i, qG = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, JG = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, YG = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, XG = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, ZG = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, QG = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, $G = (e) => qG.test(e), eK = (e) => !!e && !Number.isNaN(Number(e)), tK = (e) => !!e && Number.isInteger(Number(e)), nK = (e) => e.endsWith("%") && eK(e.slice(0, -1)), rK = (e) => JG.test(e), iK = () => !0, aK = (e) => YG.test(e) && !XG.test(e), oK = () => !1, sK = (e) => ZG.test(e), cK = (e) => QG.test(e), lK = (e) => !Q(e) && !$(e), uK = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), dK = (e) => EK(e, AK, oK), Q = (e) => GG.test(e), fK = (e) => EK(e, jK, aK), pK = (e) => EK(e, MK, eK), mK = (e) => EK(e, PK, iK), hK = (e) => EK(e, NK, oK), gK = (e) => EK(e, OK, oK), _K = (e) => EK(e, kK, cK), vK = (e) => EK(e, FK, sK), $ = (e) => KG.test(e), yK = (e) => DK(e, jK), bK = (e) => DK(e, NK), xK = (e) => DK(e, OK), SK = (e) => DK(e, AK), CK = (e) => DK(e, kK), wK = (e) => DK(e, FK, !0), TK = (e) => DK(e, PK, !0), EK = (e, t, n) => {
	let r = GG.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, DK = (e, t, n = !1) => {
	let r = KG.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, OK = (e) => e === "position" || e === "percentage", kK = (e) => e === "image" || e === "url", AK = (e) => e === "length" || e === "size" || e === "bg-size", jK = (e) => e === "length", MK = (e) => e === "number", NK = (e) => e === "family-name", PK = (e) => e === "number" || e === "weight", FK = (e) => e === "shadow", IK = /*#__PURE__*/ HG(() => {
	let e = WG("color"), t = WG("font"), n = WG("text"), r = WG("font-weight"), i = WG("tracking"), a = WG("leading"), o = WG("breakpoint"), s = WG("container"), c = WG("spacing"), l = WG("radius"), u = WG("shadow"), d = WG("inset-shadow"), f = WG("text-shadow"), p = WG("drop-shadow"), m = WG("blur"), h = WG("perspective"), g = WG("aspect"), _ = WG("ease"), v = WG("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		$,
		Q
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		$,
		Q,
		c
	], T = () => [
		$G,
		"full",
		"auto",
		...w()
	], E = () => [
		tK,
		"none",
		"subgrid",
		$,
		Q
	], D = () => [
		"auto",
		{ span: [
			"full",
			tK,
			$,
			Q
		] },
		tK,
		$,
		Q
	], O = () => [
		tK,
		"auto",
		$,
		Q
	], ee = () => [
		"auto",
		"min",
		"max",
		"fr",
		$,
		Q
	], te = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], k = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], ne = () => ["auto", ...w()], re = () => [
		$G,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], ie = () => [
		$G,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], ae = () => [
		$G,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], A = () => [
		e,
		$,
		Q
	], oe = () => [
		...b(),
		xK,
		gK,
		{ position: [$, Q] }
	], se = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], ce = () => [
		"auto",
		"cover",
		"contain",
		SK,
		dK,
		{ size: [$, Q] }
	], le = () => [
		nK,
		yK,
		fK
	], ue = () => [
		"",
		"none",
		"full",
		l,
		$,
		Q
	], de = () => [
		"",
		eK,
		yK,
		fK
	], fe = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], pe = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], me = () => [
		eK,
		nK,
		xK,
		gK
	], he = () => [
		"",
		"none",
		m,
		$,
		Q
	], ge = () => [
		"none",
		eK,
		$,
		Q
	], _e = () => [
		"none",
		eK,
		$,
		Q
	], ve = () => [
		eK,
		$,
		Q
	], ye = () => [
		$G,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [rK],
			breakpoint: [rK],
			color: [iK],
			container: [rK],
			"drop-shadow": [rK],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [lK],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [rK],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [rK],
			shadow: [rK],
			spacing: ["px", eK],
			text: [rK],
			"text-shadow": [rK],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				$G,
				Q,
				$,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				$,
				Q
			] }],
			"container-named": [uK],
			columns: [{ columns: [
				eK,
				Q,
				$,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				tK,
				"auto",
				$,
				Q
			] }],
			basis: [{ basis: [
				$G,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				eK,
				$G,
				"auto",
				"initial",
				"none",
				Q
			] }],
			grow: [{ grow: [
				"",
				eK,
				$,
				Q
			] }],
			shrink: [{ shrink: [
				"",
				eK,
				$,
				Q
			] }],
			order: [{ order: [
				tK,
				"first",
				"last",
				"none",
				$,
				Q
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: D() }],
			"col-start": [{ "col-start": O() }],
			"col-end": [{ "col-end": O() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: D() }],
			"row-start": [{ "row-start": O() }],
			"row-end": [{ "row-end": O() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": ee() }],
			"auto-rows": [{ "auto-rows": ee() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...te(), "normal"] }],
			"justify-items": [{ "justify-items": [...k(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...k()] }],
			"align-content": [{ content: ["normal", ...te()] }],
			"align-items": [{ items: [...k(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...k(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": te() }],
			"place-items": [{ "place-items": [...k(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...k()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: ne() }],
			mx: [{ mx: ne() }],
			my: [{ my: ne() }],
			ms: [{ ms: ne() }],
			me: [{ me: ne() }],
			mbs: [{ mbs: ne() }],
			mbe: [{ mbe: ne() }],
			mt: [{ mt: ne() }],
			mr: [{ mr: ne() }],
			mb: [{ mb: ne() }],
			ml: [{ ml: ne() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: re() }],
			"inline-size": [{ inline: ["auto", ...ie()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...ie()] }],
			"max-inline-size": [{ "max-inline": ["none", ...ie()] }],
			"block-size": [{ block: ["auto", ...ae()] }],
			"min-block-size": [{ "min-block": ["auto", ...ae()] }],
			"max-block-size": [{ "max-block": ["none", ...ae()] }],
			w: [{ w: [
				s,
				"screen",
				...re()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...re()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...re()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...re()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...re()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...re()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				yK,
				fK
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				TK,
				mK
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				nK,
				Q
			] }],
			"font-family": [{ font: [
				bK,
				hK,
				t
			] }],
			"font-features": [{ "font-features": [Q] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				$,
				Q
			] }],
			"line-clamp": [{ "line-clamp": [
				eK,
				"none",
				$,
				pK
			] }],
			leading: [{ leading: [a, ...w()] }],
			"list-image": [{ "list-image": [
				"none",
				$,
				Q
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				$,
				Q
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: A() }],
			"text-color": [{ text: A() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...fe(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				eK,
				"from-font",
				"auto",
				$,
				fK
			] }],
			"text-decoration-color": [{ decoration: A() }],
			"underline-offset": [{ "underline-offset": [
				eK,
				"auto",
				$,
				Q
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				tK,
				$,
				Q
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				$,
				Q
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				$,
				Q
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: oe() }],
			"bg-repeat": [{ bg: se() }],
			"bg-size": [{ bg: ce() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						tK,
						$,
						Q
					],
					radial: [
						"",
						$,
						Q
					],
					conic: [
						tK,
						$,
						Q
					]
				},
				CK,
				_K
			] }],
			"bg-color": [{ bg: A() }],
			"gradient-from-pos": [{ from: le() }],
			"gradient-via-pos": [{ via: le() }],
			"gradient-to-pos": [{ to: le() }],
			"gradient-from": [{ from: A() }],
			"gradient-via": [{ via: A() }],
			"gradient-to": [{ to: A() }],
			rounded: [{ rounded: ue() }],
			"rounded-s": [{ "rounded-s": ue() }],
			"rounded-e": [{ "rounded-e": ue() }],
			"rounded-t": [{ "rounded-t": ue() }],
			"rounded-r": [{ "rounded-r": ue() }],
			"rounded-b": [{ "rounded-b": ue() }],
			"rounded-l": [{ "rounded-l": ue() }],
			"rounded-ss": [{ "rounded-ss": ue() }],
			"rounded-se": [{ "rounded-se": ue() }],
			"rounded-ee": [{ "rounded-ee": ue() }],
			"rounded-es": [{ "rounded-es": ue() }],
			"rounded-tl": [{ "rounded-tl": ue() }],
			"rounded-tr": [{ "rounded-tr": ue() }],
			"rounded-br": [{ "rounded-br": ue() }],
			"rounded-bl": [{ "rounded-bl": ue() }],
			"border-w": [{ border: de() }],
			"border-w-x": [{ "border-x": de() }],
			"border-w-y": [{ "border-y": de() }],
			"border-w-s": [{ "border-s": de() }],
			"border-w-e": [{ "border-e": de() }],
			"border-w-bs": [{ "border-bs": de() }],
			"border-w-be": [{ "border-be": de() }],
			"border-w-t": [{ "border-t": de() }],
			"border-w-r": [{ "border-r": de() }],
			"border-w-b": [{ "border-b": de() }],
			"border-w-l": [{ "border-l": de() }],
			"divide-x": [{ "divide-x": de() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": de() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...fe(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...fe(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: A() }],
			"border-color-x": [{ "border-x": A() }],
			"border-color-y": [{ "border-y": A() }],
			"border-color-s": [{ "border-s": A() }],
			"border-color-e": [{ "border-e": A() }],
			"border-color-bs": [{ "border-bs": A() }],
			"border-color-be": [{ "border-be": A() }],
			"border-color-t": [{ "border-t": A() }],
			"border-color-r": [{ "border-r": A() }],
			"border-color-b": [{ "border-b": A() }],
			"border-color-l": [{ "border-l": A() }],
			"divide-color": [{ divide: A() }],
			"outline-style": [{ outline: [
				...fe(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				eK,
				$,
				Q
			] }],
			"outline-w": [{ outline: [
				"",
				eK,
				yK,
				fK
			] }],
			"outline-color": [{ outline: A() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				wK,
				vK
			] }],
			"shadow-color": [{ shadow: A() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				wK,
				vK
			] }],
			"inset-shadow-color": [{ "inset-shadow": A() }],
			"ring-w": [{ ring: de() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: A() }],
			"ring-offset-w": [{ "ring-offset": [eK, fK] }],
			"ring-offset-color": [{ "ring-offset": A() }],
			"inset-ring-w": [{ "inset-ring": de() }],
			"inset-ring-color": [{ "inset-ring": A() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				wK,
				vK
			] }],
			"text-shadow-color": [{ "text-shadow": A() }],
			opacity: [{ opacity: [
				eK,
				$,
				Q
			] }],
			"mix-blend": [{ "mix-blend": [
				...pe(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": pe() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [eK] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": me() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": me() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": A() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": A() }],
			"mask-image-t-from-pos": [{ "mask-t-from": me() }],
			"mask-image-t-to-pos": [{ "mask-t-to": me() }],
			"mask-image-t-from-color": [{ "mask-t-from": A() }],
			"mask-image-t-to-color": [{ "mask-t-to": A() }],
			"mask-image-r-from-pos": [{ "mask-r-from": me() }],
			"mask-image-r-to-pos": [{ "mask-r-to": me() }],
			"mask-image-r-from-color": [{ "mask-r-from": A() }],
			"mask-image-r-to-color": [{ "mask-r-to": A() }],
			"mask-image-b-from-pos": [{ "mask-b-from": me() }],
			"mask-image-b-to-pos": [{ "mask-b-to": me() }],
			"mask-image-b-from-color": [{ "mask-b-from": A() }],
			"mask-image-b-to-color": [{ "mask-b-to": A() }],
			"mask-image-l-from-pos": [{ "mask-l-from": me() }],
			"mask-image-l-to-pos": [{ "mask-l-to": me() }],
			"mask-image-l-from-color": [{ "mask-l-from": A() }],
			"mask-image-l-to-color": [{ "mask-l-to": A() }],
			"mask-image-x-from-pos": [{ "mask-x-from": me() }],
			"mask-image-x-to-pos": [{ "mask-x-to": me() }],
			"mask-image-x-from-color": [{ "mask-x-from": A() }],
			"mask-image-x-to-color": [{ "mask-x-to": A() }],
			"mask-image-y-from-pos": [{ "mask-y-from": me() }],
			"mask-image-y-to-pos": [{ "mask-y-to": me() }],
			"mask-image-y-from-color": [{ "mask-y-from": A() }],
			"mask-image-y-to-color": [{ "mask-y-to": A() }],
			"mask-image-radial": [{ "mask-radial": [$, Q] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": me() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": me() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": A() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": A() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [eK] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": me() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": me() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": A() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": A() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: oe() }],
			"mask-repeat": [{ mask: se() }],
			"mask-size": [{ mask: ce() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				$,
				Q
			] }],
			filter: [{ filter: [
				"",
				"none",
				$,
				Q
			] }],
			blur: [{ blur: he() }],
			brightness: [{ brightness: [
				eK,
				$,
				Q
			] }],
			contrast: [{ contrast: [
				eK,
				$,
				Q
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				wK,
				vK
			] }],
			"drop-shadow-color": [{ "drop-shadow": A() }],
			grayscale: [{ grayscale: [
				"",
				eK,
				$,
				Q
			] }],
			"hue-rotate": [{ "hue-rotate": [
				eK,
				$,
				Q
			] }],
			invert: [{ invert: [
				"",
				eK,
				$,
				Q
			] }],
			saturate: [{ saturate: [
				eK,
				$,
				Q
			] }],
			sepia: [{ sepia: [
				"",
				eK,
				$,
				Q
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				$,
				Q
			] }],
			"backdrop-blur": [{ "backdrop-blur": he() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				eK,
				$,
				Q
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				eK,
				$,
				Q
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				eK,
				$,
				Q
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				eK,
				$,
				Q
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				eK,
				$,
				Q
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				eK,
				$,
				Q
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				eK,
				$,
				Q
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				eK,
				$,
				Q
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				$,
				Q
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				eK,
				"initial",
				$,
				Q
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				$,
				Q
			] }],
			delay: [{ delay: [
				eK,
				$,
				Q
			] }],
			animate: [{ animate: [
				"none",
				v,
				$,
				Q
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				$,
				Q
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: ge() }],
			"rotate-x": [{ "rotate-x": ge() }],
			"rotate-y": [{ "rotate-y": ge() }],
			"rotate-z": [{ "rotate-z": ge() }],
			scale: [{ scale: _e() }],
			"scale-x": [{ "scale-x": _e() }],
			"scale-y": [{ "scale-y": _e() }],
			"scale-z": [{ "scale-z": _e() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: ve() }],
			"skew-x": [{ "skew-x": ve() }],
			"skew-y": [{ "skew-y": ve() }],
			transform: [{ transform: [
				$,
				Q,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: ye() }],
			"translate-x": [{ "translate-x": ye() }],
			"translate-y": [{ "translate-y": ye() }],
			"translate-z": [{ "translate-z": ye() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				tK,
				$,
				Q
			] }],
			accent: [{ accent: A() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: A() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				$,
				Q
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": A() }],
			"scrollbar-track-color": [{ "scrollbar-track": A() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				$,
				Q
			] }],
			fill: [{ fill: ["none", ...A()] }],
			"stroke-w": [{ stroke: [
				eK,
				yK,
				fK,
				pK
			] }],
			stroke: [{ stroke: ["none", ...A()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region ../../node_modules/.bun/@selemondev+svelte-marquee@0.1.1+872307f81fded827/node_modules/@selemondev/svelte-marquee/dist/utils.js
function LK(...e) {
	return IK(ra(e));
}
//#endregion
//#region ../../node_modules/.bun/@selemondev+svelte-marquee@0.1.1+872307f81fded827/node_modules/@selemondev/svelte-marquee/dist/Marquee.svelte
var RK = /* @__PURE__ */ H("<div><!></div>"), zK = /* @__PURE__ */ H("<div></div>");
function BK(e, t) {
	let n = za(za(t, [
		"children",
		"$$slots",
		"$$events",
		"$$legacy",
		"$$host"
	]), [
		"direction",
		"pauseOnHover",
		"reverse",
		"fade",
		"innerClassName",
		"numberOfCopies"
	]);
	lt(t, !1);
	let r = Y(t, "direction", 12, "left"), i = Y(t, "pauseOnHover", 12, !1), a = Y(t, "reverse", 12, !1), o = Y(t, "fade", 12, !1), s = Y(t, "innerClassName", 12, ""), c = Y(t, "numberOfCopies", 12, 2);
	var l = {
		get direction() {
			return r();
		},
		set direction(e) {
			r(e), P();
		},
		get pauseOnHover() {
			return i();
		},
		set pauseOnHover(e) {
			i(e), P();
		},
		get reverse() {
			return a();
		},
		set reverse(e) {
			a(e), P();
		},
		get fade() {
			return o();
		},
		set fade(e) {
			o(e), P();
		},
		get innerClassName() {
			return s();
		},
		set innerClassName(e) {
			s(e), P();
		},
		get numberOfCopies() {
			return c();
		},
		set numberOfCopies(e) {
			c(e), P();
		}
	};
	Pa();
	var u = zK();
	return Ni(u, 5, () => (qr(c()), Kr(() => Array(c()).fill(0))), ki, (e, n) => {
		var o = RK();
		Bi(L(o), t, "default", {}, null), M(o), z((e) => K(o, 1, e), [() => ia((qr(LK), qr(r()), qr(i()), qr(a()), qr(s()), Kr(() => LK("flex justify-around gap-[1rem] [--gap:1rem] shrink-0", r() === "left" ? "animate-marquee-left flex-row" : "animate-marquee-up flex-col", i() && "group-hover:[animation-play-state:paused]", a() && "direction-reverse", s()))))]), U(e, o);
	}), M(u), z((e) => {
		K(u, 1, e), da(u, `mask-image: ${o() ? `linear-gradient(${r() === "left" ? "to right" : "to bottom"}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)` : "none"};
	  -webkit-mask-image: ${o() ? `linear-gradient(${r() === "left" ? "to right" : "to bottom"}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)` : "none"};
	  `);
	}, [() => ia((qr(LK), qr(n), qr(r()), Kr(() => LK(`group flex gap-[1rem] overflow-hidden ${n.class}`, {
		"flex-row": r() === "left",
		"flex-col": r() !== "left"
	}))))]), U(e, u), ut(l);
}
Ga(BK, {
	direction: {},
	pauseOnHover: {},
	reverse: {},
	fade: {},
	innerClassName: {},
	numberOfCopies: {}
}, ["default"], [], { mode: "open" });
//#endregion
//#region src/lib/components/main/Industry.svelte
var VK = /* @__PURE__ */ H("<picture><img loading=\"lazy\" class=\"w-37.5 lg:w-75\"/></picture>"), HK = /* @__PURE__ */ H("<section data-scroll=\"first\" class=\"w-full max-w-dvw space-y-7.5 lg:space-y-15\"><h3 class=\"text-center text-lg lg:text-4xl\"> </h3> <!></section>");
function UK(e, t) {
	lt(t, !0);
	let n = /* @__PURE__ */ F(Cn([
		{
			id: "industry-1",
			alt: "hyosung heavy industrie"
		},
		{
			id: "industry-2",
			alt: "SAMSUNG 삼성전자"
		},
		{
			id: "industry-3",
			alt: "SAMSUNG 상성중공업"
		},
		{
			id: "industry-4",
			alt: "HYUNDAI MOTOR GROUP"
		},
		{
			id: "industry-5",
			alt: "KB증권"
		},
		{
			id: "industry-6",
			alt: "SM Entertainment"
		},
		{
			id: "industry-7",
			alt: "HYUNDAI ENGINEERING &amp; CONSTRUCTION"
		},
		{
			id: "industry-8",
			alt: "YOKOGAWA"
		},
		{
			id: "industry-9",
			alt: "한전 KPS"
		},
		{
			id: "industry-10",
			alt: "한진택배"
		},
		{
			id: "industry-11",
			alt: "LX판토스"
		},
		{
			id: "industry-12",
			alt: "경기도"
		},
		{
			id: "industry-13",
			alt: "한국관광공사 KOREA TOURISM ORGANIZTION"
		},
		{
			id: "industry-14",
			alt: "LG전자"
		},
		{
			id: "industry-15",
			alt: "LG이노텍"
		},
		{
			id: "industry-16",
			alt: "NIA 한국지능정보사회진흥원"
		},
		{
			id: "industry-17",
			alt: "Mercedes-Benz"
		},
		{
			id: "industry-18",
			alt: "DAESANG"
		},
		{
			id: "industry-19",
			alt: "rebellions"
		},
		{
			id: "industry-20",
			alt: "식품의약품안전처"
		},
		{
			id: "industry-21",
			alt: "롯데정보통신"
		},
		{
			id: "industry-22",
			alt: "농심엔지니어링"
		},
		{
			id: "industry-23",
			alt: "IITP 정보통신기획평가원"
		},
		{
			id: "industry-24",
			alt: "과학기술정보통신부"
		},
		{
			id: "industry-25",
			alt: "sunjin"
		},
		{
			id: "industry-26",
			alt: "Pulmuone"
		},
		{
			id: "industry-27",
			alt: "고용노동부"
		}
	]));
	var r = HK(), i = L(r), a = L(i, !0);
	M(i);
	var o = R(i, 2), s = (e) => {
		BK(e, {
			pauseOnHover: !0,
			class: "gap-3.75 lg:gap-7.5",
			innerClassName: "gap-3.75 lg:gap-7.5",
			fade: !0,
			children: (e, t) => {
				var r = di();
				Ni(Pn(r), 17, () => V(n), ({ alt: e, id: t }) => t, (e, t) => {
					let n = () => V(t).alt, r = () => V(t).id;
					var i = VK(), a = L(i);
					M(i), z(() => {
						q(a, "src", `/output/imgs/industry/img-${r() ?? ""}.png`), q(a, "alt", n());
					}), U(e, i);
				}), U(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	G(o, (e) => {
		V(n) && e(s);
	}), M(r), z((e) => W(a, e), [() => Il()]), U(e, r), ut();
}
customElements.define("main-industry", Ga(UK, {}, [], []));
//#endregion
//#region src/lib/components/main/MainNews.svelte
var WK = /* @__PURE__ */ H("<swiper-slide><a class=\"w-full overflow-clip rounded-xl bg-white\"><picture class=\"bg-light-blue flex h-45.5 overflow-clip rounded-t-xl transition-all lg:h-56.25\"><img loading=\"lazy\" class=\"w-full object-cover\"/></picture> <dl class=\"text-2md lg:43.5 flex h-35 flex-col justify-between overflow-clip rounded-b-xl bg-white p-5 text-xl\"><dt class=\"line-clamp-2 text-lg lg:text-2xl\"> </dt> <dd class=\"text-666 text-right\"> </dd></dl></a></swiper-slide>", 2), GK = /* @__PURE__ */ H("<section class=\"max-w-dvw overflow-hidden py-5 max-lg:space-y-5 lg:py-15\"><sub-heading-line></sub-heading-line> <swiper-container></swiper-container></section>", 2);
function KK(e, t) {
	lt(t, !0);
	let n = Y(t, "list", 23, () => []), r = /* @__PURE__ */ N(n);
	var i = {
		get list() {
			return n();
		},
		set list(e = []) {
			n(e), P();
		}
	}, a = GK(), o = L(a);
	J(o, "line", "none"), z(() => J(o, "title", Jd?.())), z(() => J(o, "subTit", Zd?.())), J(o, "btnRender", "link"), J(o, "link", "/news/news");
	var s = R(o, 2);
	return J(s, "slides-per-view", "auto"), J(s, "centered-slides", !1), J(s, "speed", "6000"), J(s, "loop", !0), J(s, "free-mode", !0), J(s, "allow-touch-move", !0), J(s, "space-between", 30), J(s, "autoplay-delay", 1e3), J(s, "autoplay-disable-on-interaction", !1), K(s, 1, "before:from-f0f0f0 after:from-f0f0f0 relative w-[calc(100dvw+40px)] max-w-dvw before:absolute before:left-0 before:z-2 before:h-full before:w-20 before:bg-linear-to-r before:to-transparent after:absolute after:top-0 after:right-10 after:z-2 after:h-full after:w-20 after:bg-linear-to-l after:to-transparent lg:w-[calc(100%+80px)] lg:before:left-0 lg:after:right-20"), Ni(s, 23, () => V(r), ({ link: e, img: t, tit: n, date: r }, i) => `new-slide-${i}`, (e, t) => {
		let n = () => V(t).link, r = () => V(t).img, i = () => V(t).tit, a = () => V(t).date;
		var o = WK();
		K(o, 1, "h-full w-75 select-none lg:w-100");
		var s = L(o), c = L(s), l = L(c);
		M(c);
		var u = R(c, 2), d = L(u), f = L(d, !0);
		M(d);
		var p = R(d, 2), m = L(p, !0);
		M(p), M(u), M(s), M(o), z(() => {
			q(s, "href", n()), q(s, "aria-label", `${i()} page`), q(l, "src", r() ? r() : "/output/imgs/visual/img-none.jpg"), q(l, "alt", `${i()} exemple image`), W(f, i()), W(m, a());
		}), U(e, o);
	}), M(s), M(a), U(e, a), ut(i);
}
customElements.define("main-news", Ga(KK, { list: { type: "Array" } }, [], []));
//#endregion
//#region src/lib/components/main/Operations.svelte
var qK = /* @__PURE__ */ H("<section class=\"relative flex h-90.5 max-w-dvw flex-col justify-between rounded-xl bg-(image:--bg-op) bg-size-[100%_100%] bg-no-repeat p-5 text-white lg:h-165 lg:bg-cover lg:bg-center lg:p-15\"><sub-heading-line></sub-heading-line> <div class=\"mt-7.5 inline-flex w-full gap-5 max-lg:flex-col lg:mt-auto\"><a href=\"/contact/contact\" class=\"text-2md group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold text-white transition-colors hover:bg-white hover:text-black max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:text-lg\"><span> </span> <icon-list></icon-list></a></div></section>", 2);
function JK(e, t) {
	lt(t, !0);
	var n = qK();
	da(n, "", {}, { "--bg-op": "url(/output/imgs/main/work/bg-operations.jpg)" });
	var r = L(n);
	J(r, "line", "none"), z(() => J(r, "title", ef())), z(() => J(r, "subTit", rf())), J(r, "cls", "lg:space-y-5 space-y-2.5");
	var i = R(r, 2), a = L(i), o = L(a), s = L(o, !0);
	M(o);
	var c = R(o, 2);
	J(c, "name", "arrow-right"), K(c, 1, "size-6 stroke-white group-hover:stroke-black"), M(a), M(i), M(n), z((e) => W(s, e), [() => sP()]), U(e, n), ut();
}
customElements.define("main-operations", Ga(JK, {}, [], []));
//#endregion
//#region src/lib/utils/videoObserve.svelte.ts
var YK = (e) => {
	if (!(e instanceof HTMLVideoElement)) return;
	let t = e, n = new IntersectionObserver((e) => {
		e.forEach((e) => {
			e.isIntersecting ? t.readyState >= 3 ? t.play().catch((e) => {
				console.warn("비디오 자동 재생 차단됨:", e);
			}) : t.addEventListener("canplay", () => {
				t.play().catch(() => {});
			}, { once: !0 }) : t.pause();
		});
	}, { threshold: .1 });
	return n.observe(t), () => {
		n.disconnect();
	};
};
function XK(e) {
	e.muted = !0, e.playsInline = !0, e.loop = !0, e.preload = "auto";
	let t = !1, n = () => {
		e.play().then(() => {
			t = !0, window.removeEventListener("touchstart", n), window.removeEventListener("scroll", n);
		}).catch(() => {
			t || (window.addEventListener("touchstart", n, { passive: !0 }), window.addEventListener("scroll", n, { passive: !0 }));
		});
	}, r = new IntersectionObserver((t) => {
		t.forEach((t) => {
			t.isIntersecting ? n() : e.pause();
		});
	}, { threshold: .1 });
	return r.observe(e), { destroy() {
		r.disconnect(), window.removeEventListener("touchstart", n), window.removeEventListener("scroll", n);
	} };
}
//#endregion
//#region src/lib/components/main/OurProducts.svelte
var ZK = /* @__PURE__ */ H("<div class=\"before:[''] absolute top-0 left-0 z-1 size-full object-cover before:absolute before:top-0 before:left-0 before:z-2 before:size-full before:bg-linear-to-l before:from-black/0 before:to-black\"><video class=\"relative z-1 aspect-video h-full w-full object-cover\" preload=\"auto\" playsinline=\"\" loop=\"\" autoplay=\"\"><source type=\"video/mp4\"/> <source type=\"video/webm\"/></video></div>", 2), QK = /* @__PURE__ */ H("<div class=\"before:[''] absolute top-0 left-0 z-1 size-full object-cover transition-all before:absolute before:top-0 before:z-2 before:size-full before:bg-linear-to-r before:from-black before:from-0% before:via-black/0 before:via-120% before:to-transparent before:to-130%\"><video class=\"relative z-1 aspect-video h-full w-full object-cover\" preload=\"auto\" playsinline=\"\" loop=\"\" autoplay=\"\"><source type=\"video/mp4\"/> <source type=\"video/webm\"/></video></div>", 2), $K = /* @__PURE__ */ H("<li data-scroll=\"slide-up\" class=\"group/prod relative flex min-h-[40dvh] flex-[0_0_200px] flex-col overflow-clip rounded-xl transition-all duration-400 has-aria-current:flex-1 lg:h-145\"><!> <!> <a><div class=\"lg:7.5 relative z-2 flex flex-col gap-5\"><picture><source media=\"(min-width: 1024px)\"/> <source media=\"(max-width: 1024px)\"/> <img loading=\"lazy\" alt=\"\" class=\"h-full\"/></picture> <dl class=\"text-2md relative space-y-5 opacity-100 transition-all duration-300 lg:text-lg lg:opacity-0 lg:group-has-aria-current/prod:block lg:group-has-aria-current/prod:opacity-100 @min-xl:group-has-aria-current/prod:max-w-3/5 starting:opacity-0\"><dt class=\"font-bold\"> </dt> <dd class=\"lg:max-w-130\"> </dd></dl></div> <div class=\"z-2 mt-auto opacity-100 transition-all duration-300 lg:opacity-0 lg:group-has-aria-current/prod:flex lg:group-has-aria-current/prod:opacity-100\"><p class=\"text-2md group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white hover:text-black max-lg:justify-between lg:min-h-13.5 lg:w-auto\"><span> </span> <icon-list></icon-list></p></div></a></li>", 2), eq = /* @__PURE__ */ H("<section class=\"relative max-w-dvw py-5 lg:py-15\"><sub-heading-line></sub-heading-line> <ul class=\"flex gap-7.5 max-lg:flex-col lg:flex-row\"></ul> <!></section>", 2);
function tq(e, t) {
	lt(t, !0);
	let n = /* @__PURE__ */ F(Cn([
		{
			id: "our-products1",
			logo: "/output/imgs/logo/logo-main-logi.svg",
			logoPc: "/output/imgs/logo/logo-main-logi-pc.svg",
			tit: Hl?.(),
			txt: Gl?.(),
			link: ""
		},
		{
			id: "our-products2",
			logo: "/output/imgs/logo/logo-main-dao.svg",
			logoPc: "/output/imgs/logo/logo-main-dao-pc.svg",
			tit: Jl?.(),
			txt: Zl?.(),
			link: ""
		},
		{
			id: "our-products3",
			logo: "/output/imgs/logo/logo-main-dsc.svg",
			logoPc: "/output/imgs/logo/logo-main-dsc-pc.svg",
			tit: eu?.(),
			txt: ru?.(),
			link: ""
		}
	])), r = /* @__PURE__ */ F(0), i = /* @__PURE__ */ F(Cn(typeof window < "u" ? window.innerWidth : 0)), a = /* @__PURE__ */ N(() => V(i) >= 1024);
	var o = eq(), s = L(o);
	J(s, "line", "none"), J(s, "title", "Our Products"), z(() => J(s, "subTit", zl()));
	var c = R(s, 2);
	Ni(c, 31, () => V(n), (e) => e.id, (e, t, n) => {
		var i = $K(), o = L(i), s = (e) => {
			var t = ZK(), r = L(t);
			r.muted = !0;
			var i = L(r), a = R(i, 2);
			M(r), ta(r, () => YK), M(t), z(() => {
				q(r, "poster", V(n) === 0 ? "/output/video/logi-video.jpg" : V(n) === 1 ? "/output/video/dao-video.jpg" : V(n) === 2 ? "/output/video/dsc-video.jpg" : ""), q(i, "src", V(n) === 0 ? "/output/video/logi-video.mp4" : V(n) === 1 ? "/output/video/dao-video.mp4" : V(n) === 2 ? "/output/video/dsc-video.mp4" : ""), q(a, "src", V(n) === 0 ? "/output/video/logi-video.webm" : V(n) === 1 ? "/output/video/dao-video.webm" : V(n) === 2 ? "/output/video/dsc-video.webm" : "");
			}), U(e, t);
		};
		G(o, (e) => {
			V(r) === V(n) && V(a) && e(s);
		});
		var c = R(o, 2), l = (e) => {
			var t = QK(), r = L(t);
			r.muted = !0;
			var i = L(r), a = R(i, 2);
			M(r), ea(r, (e) => XK?.(e)), M(t), z(() => {
				q(r, "poster", V(n) === 0 ? "/output/video/logi-video.jpg" : V(n) === 1 || V(n) === 2 ? "/output/video/dsc-video.jpg" : ""), q(i, "src", V(n) === 0 ? "/output/video/logi-video.mp4" : V(n) === 1 ? "/output/video/dao-video.mp4" : V(n) === 2 ? "/output/video/dsc-video.mp4" : ""), q(a, "src", V(n) === 0 ? "/output/video/logi-video.webm" : V(n) === 1 ? "/output/video/dao-video.webm" : V(n) === 2 ? "/output/video/dsc-video.webm" : "");
			}), U(e, t);
		};
		G(c, (e) => {
			V(a) || e(l);
		});
		var u = R(c, 2);
		da(u, "", {}, {
			"--bg-main-logi": "url(/output/imgs/logo/bg-main-logi.jpg)",
			"--bg-main-dao": "url(/output/imgs/logo/bg-main-dao.jpg)",
			"--bg-main-dsc": "url(/output/imgs/logo/bg-main-dsc.jpg)"
		});
		var d = L(u), f = L(d), p = L(f), m = R(p, 2), h = R(m, 2);
		M(f);
		var g = R(f, 2), _ = L(g), v = L(_, !0);
		M(_);
		var y = R(_, 2), b = L(y, !0);
		M(y), M(g), M(d);
		var x = R(d, 2), S = L(x), C = L(S), w = L(C, !0);
		M(C);
		var T = R(C, 2);
		J(T, "name", "arrow-right"), K(T, 1, "size-6 stroke-white group-hover:stroke-black"), M(S), M(x), M(u), M(i), z((e) => {
			q(u, "href", V(n) === 0 ? "/solution/logi" : V(n) === 1 ? "/solution/dao" : V(n) === 2 ? "/solution/dsc" : "/"), K(u, 1, `relative flex size-full flex-1 cursor-pointer flex-col justify-between overflow-clip rounded-xl bg-cover bg-center bg-no-repeat p-5 text-white lg:p-15
							${V(n) === 0 ? "bg-(image:--bg-main-logi)" : ""}
							${V(n) === 1 ? "bg-(image:--bg-main-dao)" : ""}
							${V(n) === 2 ? "bg-(image:--bg-main-dsc)" : ""}`), q(u, "aria-current", V(r) === V(n) ? "true" : V(a) ? void 0 : "true"), K(f, 1, `relative flex min-h-10 opacity-100 @min-xl:group-has-aria-current/prod:opacity-100 starting:opacity-0 ${V(r) === V(n) ? "relative" : "lg:absolute lg:bottom-[calc(100%-20px)] lg:left-[calc(100%-20px)] lg:h-25 lg:max-h-105 lg:w-105 lg:origin-left lg:rotate-90"}`), q(p, "srcset", V(t).logoPc), q(m, "srcset", V(t).logo), q(h, "src", V(t).logo), W(v, V(t).tit), W(b, V(t).txt), W(w, e);
		}, [() => uP?.()]), $r("mouseenter", u, () => I(r, V(n), !0)), $r("focus", u, () => I(r, V(n), !0)), Xi(i, () => uB, null), Zi(1, i, () => gB, () => ({ y: 200 })), Zi(2, i, () => hB), U(e, i);
	}), M(c), cG(R(c, 2), {}), M(o), Na("innerWidth", (e) => I(i, e, !0)), U(e, o), ut();
}
customElements.define("main-our-products", Ga(tq, {}, [], []));
//#endregion
//#region src/lib/components/main/SlideCard.svelte
var nq = /* @__PURE__ */ H("<li class=\"text-primary rounded-xl bg-white px-3 py-1 font-bold\"> </li>"), rq = /* @__PURE__ */ H("<span class=\"block text-center text-sm font-normal lg:text-base\"> </span>"), iq = /* @__PURE__ */ H("<swiper-slide><picture class=\"flex h-47 overflow-clip rounded-xl transition-all group-not-[.swiper-slide-active]:opacity-0 lg:h-56.25\"><img loading=\"lazy\" class=\"w-full object-cover\"/></picture> <ul class=\"flex items-center justify-center gap-3 group-not-[.swiper-slide-active]:opacity-0\"></ul> <div class=\"text-2md flex flex-col justify-between overflow-clip rounded-b-xl text-lg text-white group-not-[.swiper-slide-active]:opacity-0 lg:min-h-35\"><p class=\"text-2md text-center font-bold whitespace-pre-line lg:text-2xl\"> <!></p></div> <p class=\"absolute right-5 bottom-5 text-white/70\"> </p></swiper-slide>", 2), aq = /* @__PURE__ */ H("<p><span class=\"sr-only\"> </span></p>"), oq = /* @__PURE__ */ H("<div class=\"absolute -bottom-1 -left-1 z-1 flex items-center gap-2 rounded-tr-3xl pt-3 lg:bottom-0 lg:left-10 lg:gap-5 lg:px-5\"><button class=\"hover:bg-primary grid size-9 place-content-center rounded-full bg-black transition-colors lg:size-12\"><span class=\"sr-only\">Slide Prev</span> <icon-list></icon-list></button> <button class=\"hover:bg-primary grid size-9 place-content-center rounded-full bg-black transition-colors lg:size-12\"><span class=\"sr-only\">Slide Next</span> <icon-list></icon-list></button></div>", 2), sq = /* @__PURE__ */ H("<section data-scroll=\"slide-up\" class=\"slide-card relative grid max-w-dvw grid-cols-1 gap-5 overflow-hidden rounded-xl bg-white p-5 lg:grid-cols-[1fr_620px] lg:gap-15 lg:p-15\"><div data-scroll=\"slide-up\" class=\"space-y-2.5 lg:space-y-15 lg:whitespace-pre-line\"><h2 class=\"text-3xl leading-tight font-bold transition-all lg:text-6xl\"> </h2> <p class=\"text-666 text-base transition-all lg:text-2xl\"> </p></div> <div data-scroll=\"slide-up\" class=\"relative flex w-full max-w-80.5 items-center justify-center gap-5 not-[:has(.swiper-slide-active)]:hidden empty:hidden max-lg:mx-auto lg:max-w-195\"><swiper-container></swiper-container> <div class=\"absolute bottom-2 z-3 inline-flex gap-1\"></div> <!></div></section>", 2), cq = {
	hash: "svelte-czwfw7",
	code: ""
};
function lq(e, t) {
	lt(t, !0), $i(e, cq);
	let n = /* @__PURE__ */ F(Cn([
		{
			type: "dao",
			badge: [hd()],
			txt: Ad(),
			img: "/output/imgs/main/slide/img-card-1.jpg"
		},
		{
			type: "dao",
			badge: [vd()],
			txt: Nd(),
			img: "/output/imgs/main/slide/img-card-2.jpg"
		},
		{
			type: "logi.fine",
			badge: [xd()],
			txt: [Id()],
			img: "/output/imgs/main/slide/img-card-3.jpg"
		},
		{
			type: "dsc",
			badge: [wd()],
			txt: zd(),
			txt2: Hd(),
			img: "/output/imgs/main/slide/img-card-4.jpg"
		},
		{
			type: "dsc",
			badge: [Dd()],
			txt: [Gd()],
			img: "/output/imgs/main/slide/img-card-5.jpg"
		}
	])), r = /* @__PURE__ */ F(Cn([...V(n), ...V(n)])), i = {
		effect: "cards",
		cardsEffect: {
			rotate: !1,
			perSlideRotate: 0,
			perSlideOffset: 11,
			slideShadows: !1
		},
		initialSlide: 0,
		grabCursor: !1,
		rewind: !1,
		loop: !0,
		slidesPerView: 1,
		slidesPerGroup: 1,
		loopAdditionalSlides: 2,
		autoHeight: !1,
		speed: 300,
		pagination: !1
	}, a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ N(() => V(a)?.swiper), s = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(0), l = async () => {
		await Ur(), V(a) && I(c, V(a).swiper.realIndex % V(n).length);
	};
	Xn(() => {
		if (MU(), I(s, !0), V(a)) return Object.assign(V(a), i), V(a).initialize(), V(a).addEventListener("swiperslidechange", l), () => {
			I(s, !1), V(a) && (V(a).removeEventListener("swiperslidechange", l), I(a, null));
		};
	});
	var u = sq(), d = L(u), f = L(d), p = L(f, !0);
	M(f);
	var m = R(f, 2), h = L(m, !0);
	M(m), M(d);
	var g = R(d, 2), _ = L(g);
	J(_, "init", !1), K(_, 1, "h-96.5 min-h-96.5 w-full max-w-80.5 *:first:opacity-0 *:last:opacity-0 lg:h-150 lg:w-full lg:max-w-125 *:[.swiper-slide-active]:opacity-100 lg:*:[.swiper-slide-next]:opacity-50 lg:*:[.swiper-slide-prev]:opacity-50"), Ni(_, 23, () => V(r), (e, t) => `slide-card-${t}`, (e, t) => {
		var n = iq();
		da(n, "", {}, {
			"--bg-card-mo": "url(/output/imgs/main/slide/bg-card-mo.png)",
			"--bg-card-dao-pc": "url(/output/imgs/main/slide/bg-card-dao.png)",
			"--bg-card-dsc-pc": "url(/output/imgs/main/slide/bg-card-dsc.png)",
			"--bg-card-logi-pc": "url(/output/imgs/main/slide/bg-card-logi.png)"
		});
		var r = L(n), i = L(r);
		M(r);
		var a = R(r, 2);
		Ni(a, 21, () => V(t).badge, ki, (e, t, n, r) => {
			var i = nq(), a = L(i, !0);
			M(i), z(() => W(a, V(t))), U(e, i);
		}), M(a);
		var o = R(a, 2), s = L(o), c = L(s), l = R(c), u = (e) => {
			var n = rq(), r = L(n, !0);
			M(n), z(() => W(r, V(t).txt2)), U(e, n);
		};
		G(l, (e) => {
			V(t).txt2 && e(u);
		}), M(s), M(o);
		var d = R(o, 2), f = L(d, !0);
		M(d), M(n), z((e) => {
			K(n, 1, ia([
				"group  relative h-full min-h-96.5 w-full space-y-2.5 overflow-clip rounded-xl bg-size-[auto_100%] bg-top bg-no-repeat p-2.5 opacity-0 shadow-transparent not-[.swiper-slide-active]:top-2 not-[.swiper-slide-active]:h-[80%] lg:w-125 lg:space-y-5 lg:bg-size-[auto_100%] lg:p-5 lg:nth-[1]:opacity-10 lg:nth-[10]:opacity-10",
				V(t).type === "dao" ? "not-[.swiper-slide-active]:bg-9cc5e8 [.swiper-slide-active]:bg-(image:--bg-card-dao-pc)" : "",
				V(t).type === "dsc" ? "not-[.swiper-slide-active]:bg-e8d5a7 [.swiper-slide-active]:bg-(image:--bg-card-dsc-pc)" : "",
				V(t).type === "logi.fine" ? "not-[.swiper-slide-active]:bg-7785ff [.swiper-slide-active]:bg-(image:--bg-card-logi-pc)" : ""
			])), q(i, "src", V(t).img), q(i, "alt", `${V(t).type} Example image`), W(c, `${V(t).txt ?? ""} `), W(f, e);
		}, [() => V(t).type.toUpperCase()]), U(e, n);
	}), M(_), Ma(_, (e) => I(a, e), () => V(a));
	var v = R(_, 2);
	Ni(v, 23, () => V(n).slice(0, 5), (e, t) => `dot-${t}`, (e, t, n) => {
		var r = aq();
		let i;
		var a = L(r), o = L(a);
		M(a), M(r), z(() => {
			i = K(r, 1, "size-2 rounded-full shadow-md transition-all duration-300", null, i, {
				"bg-white": V(c) === V(n),
				"bg-9097ff": V(c) !== V(n),
				"w-6": V(c) === V(n)
			}), W(o, `${V(n) + 1}번째 슬라이드 구역`);
		}), U(e, r);
	}), M(v);
	var y = R(v, 2), b = (e) => {
		var t = oq(), n = L(t), r = R(L(n), 2);
		J(r, "name", "arrow-right"), K(r, 1, "size-6 rotate-180 stroke-white"), M(n);
		var i = R(n, 2), a = R(L(i), 2);
		J(a, "name", "arrow-right"), K(a, 1, "size-6 stroke-white"), M(i), M(t), ei("click", n, () => {
			V(o)?.slidePrev();
		}), ei("click", i, () => {
			V(o)?.slideNext();
		}), U(e, t);
	};
	G(y, (e) => {
		V(s) && e(b);
	}), M(g), M(u), z((e, t) => {
		W(p, e), W(h, t);
	}, [() => ld(), () => fd()]), U(e, u), ut();
}
ti(["click"]), customElements.define("main-card", Ga(lq, {}, [], []));
//#endregion
//#region src/lib/components/main/Why.svelte
var uq = /* @__PURE__ */ H("<span class=\"leading-none font-normal\">%</span>"), dq = /* @__PURE__ */ H("<strong><!></strong> <!>", 1), fq = /* @__PURE__ */ H("<source type=\"video/mp4\"/>"), pq = /* @__PURE__ */ H("<source type=\"video/webm\"/>"), mq = /* @__PURE__ */ H("<img alt=\"img\" class=\"relative w-full flex-1 max-lg:max-w-59 lg:max-w-118\"/>"), hq = /* @__PURE__ */ H("<source/>"), gq = /* @__PURE__ */ H("<picture><!> <img alt=\"img\" class=\"relative w-full flex-1 max-lg:max-w-59 lg:max-w-118\"/></picture>"), _q = /* @__PURE__ */ H("<picture class=\"relative hidden w-full flex-1 flex-wrap items-end justify-end max-sm:flex\"><!></picture>"), vq = /* @__PURE__ */ H("<div data-scroll=\"slide-up\"><video data-scroll=\"slide-up\" playsinline=\"\" preload=\"metadata\"><!> <!></video> <!></div>", 2), yq = /* @__PURE__ */ H("<div data-scroll=\"slide-up\" class=\"relative flex items-end justify-end\"><picture class=\"frelative flex w-full flex-1 flex-wrap items-end justify-end px-5 lg:p-5\"><!></picture></div>"), bq = /* @__PURE__ */ H("<li data-scroll=\"slide-up\"><dl><dt><!> <strong> </strong></dt> <dd> </dd></dl> <!> <!></li>"), xq = /* @__PURE__ */ H("<section data-scroll=\"slide-up\" class=\"relative max-w-dvw\"><sub-heading-line></sub-heading-line> <ul class=\"grid grid-cols-1 grid-rows-1 gap-7.5 lg:h-200 lg:grid-cols-4 lg:grid-rows-[repeat(2,385px)]\"></ul></section>", 2);
function Sq(e, t) {
	lt(t, !0);
	let n = /* @__PURE__ */ F(Cn([
		{
			id: "why-1",
			poster: "/output/video/img-why-1.png",
			webm: "/output/video/img-why-1.webm",
			video: "/output/video/img-why-1.mp4",
			num: 36,
			txt: Hu?.(),
			font: "90",
			cls: "flex-col bg-(image:--why-1-bg) bg-no-repeat bg-center bg-cover text-white lg:row-span-2"
		},
		{
			id: "why-2",
			poster: "/output/video/img-why-2.png",
			webm: "/output/video/img-why-2.webm",
			video: "/output/video/img-why-2.mp4",
			num: 22e3,
			txt: Gu?.(),
			cls: "flex-col bg-white"
		},
		{
			id: "why-3",
			img: "/output/imgs/main/why/img-why-3.png",
			num: 70,
			txt: Ju?.(),
			font: "90",
			cls: "flex-col bg-linear-to-r from-[#e8eeff] to-[#c5d3f7] lg:col-span-2"
		},
		{
			id: "why-4",
			img: "/output/imgs/main/why/img-why-4.png",
			tit: "No.1",
			txt: Zu?.(),
			font: "90",
			cls: "text-white bg-linear-to-r from-[#3743ff] to-[#90f0ff] lg:flex lg:justify-between lg:col-span-2 @container"
		},
		{
			id: "why-5",
			poster: "/output/video/img-why-5.png",
			webm: "/output/video/img-why-5.webm",
			video: "/output/video/img-why-5.mp4",
			num: 92,
			txt: ed?.(),
			font: "90",
			cls: "flex-col bg-white"
		}
	])), r = /* @__PURE__ */ F(Cn([])), i = /* @__PURE__ */ new Map(), a = async (e) => {
		let t = V(r)[e];
		if (!t || !t.paused) return;
		t.muted = !0;
		let n = t.play();
		i.set(e, n);
		try {
			await n;
		} catch (e) {
			e.name === "AbortError" ? console.warn("호버링 제어가 너무 빨라 play() 연산이 양보되었습니다.") : console.error("비디오 가동 실패:", e);
		} finally {
			i.get(e) === n && i.set(e, null);
		}
	};
	var o = xq(), s = L(o);
	J(s, "line", "none"), z(() => J(s, "title", rd?.())), z(() => J(s, "subTit", od?.()));
	var c = R(s, 2);
	Ni(c, 23, () => V(n), (e) => e.id, (e, t, n) => {
		var i = bq();
		da(i, "", {}, { "--why-1-bg": "url(/output/imgs/main/why/bg-why-1.jpg)" });
		var o = L(i);
		da(o, "", {}, {
			"--why-3-bg": "url(/output/imgs/main/why/img-why-bg-3.png)",
			"--why-3": "url(/output/imgs/main/why/img-why-3.png)"
		});
		var s = L(o), c = L(s), l = (e) => {
			var n = dq(), r = Pn(n), i = L(r);
			{
				let e = /* @__PURE__ */ N(() => Number(V(t).num));
				wW(i, { get text() {
					return V(e);
				} });
			}
			M(r);
			var a = R(r, 2), o = (e) => {
				U(e, uq());
			};
			G(a, (e) => {
				V(t).id === "why-5" && e(o);
			}), z(() => K(r, 1, ia(["inline-flex gap-px leading-none font-bold tracking-tight lg:min-w-29", V(t).id === "why-2" ? "max-xl:text-4xl max-lg:text-5xl" : ""]))), U(e, n);
		}, u = (e) => {
			var n = ui();
			z(() => W(n, V(t).tit)), U(e, n);
		};
		G(c, (e) => {
			V(t).id === "why-4" ? e(u, -1) : e(l);
		});
		var d = R(c, 2), f = L(d, !0);
		M(d), M(s);
		var p = R(s, 2), m = L(p, !0);
		M(p), M(o);
		var h = R(o, 2), g = (e) => {
			var i = vq(), a = L(i);
			a.muted = !0;
			var o = L(a), s = (e) => {
				var n = fq();
				z(() => q(n, "src", V(t).video)), U(e, n);
			};
			G(o, (e) => {
				V(t).video && e(s);
			});
			var c = R(o, 2), l = (e) => {
				var n = pq();
				z(() => q(n, "src", V(t).webm)), U(e, n);
			};
			G(c, (e) => {
				V(t).webm && e(l);
			}), M(a), Ma(a, (e, t) => V(r)[t] = e, (e) => V(r)?.[e], () => [V(n)]);
			var u = R(a, 2), d = (e) => {
				var n = _q(), r = L(n), i = (e) => {
					var n = di(), r = Pn(n), i = (e) => {
						var n = mq();
						z(() => q(n, "src", V(t).poster)), U(e, n);
					};
					G(r, (e) => {
						e(i, -1);
					}), U(e, n);
				}, a = (e) => {
					var n = gq(), r = L(n);
					Ni(r, 17, () => Object.entries(V(t).poster.sources), ki, (e, t) => {
						var n = /* @__PURE__ */ N(() => ne(V(t), 2));
						let r = () => V(n)[0], i = () => V(n)[1];
						var a = hq();
						z(() => {
							q(a, "srcset", i()), q(a, "type", "image/" + r());
						}), U(e, a);
					});
					var i = R(r, 2);
					M(n), z(() => {
						q(i, "src", V(t).poster.img.src), q(i, "width", V(t).poster.img.w), q(i, "height", V(t).poster.img.h);
					}), U(e, n);
				};
				G(r, (e) => {
					typeof V(t).poster == "string" ? e(i) : e(a, -1);
				}), M(n), U(e, n);
			};
			G(u, (e) => {
				V(t).id === "why-1" && e(d);
			}), M(i), z(() => {
				K(i, 1, ia(["relative flex justify-end after:absolute after:z-2 after:flex after:size-full after:bg-transparent ", V(t).id === "why-1" ? "lg:-mr-23.75" : ""])), K(a, 1, ia(["relative z-1", V(t).id === "why-1" ? "h-56.5 max-sm:hidden lg:min-h-131.75 lg:min-w-130" : V(t).id === "why-2" ? "h-53.5 max-w-full lg:h-61.5" : V(t).id === "why-5" ? "h-31.5 w-auto lg:h-48 lg:max-w-85.5" : ""])), q(a, "poster", V(t).poster);
			}), U(e, i);
		};
		G(h, (e) => {
			V(t).video && e(g);
		});
		var _ = R(h, 2), v = (e) => {
			var n = yq(), r = L(n), i = L(r), a = (e) => {
				var n = di(), r = Pn(n), i = (e) => {
					var n = mq();
					z(() => q(n, "src", V(t).img)), U(e, n);
				};
				G(r, (e) => {
					e(i, -1);
				}), U(e, n);
			}, o = (e) => {
				var n = gq(), r = L(n);
				Ni(r, 17, () => Object.entries(V(t).img.sources), ki, (e, t) => {
					var n = /* @__PURE__ */ N(() => ne(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = hq();
					z(() => {
						q(a, "srcset", i()), q(a, "type", "image/" + r());
					}), U(e, a);
				});
				var i = R(r, 2);
				M(n), z(() => {
					q(i, "src", V(t).img.img.src), q(i, "width", V(t).img.img.w), q(i, "height", V(t).img.img.h);
				}), U(e, n);
			};
			G(i, (e) => {
				typeof V(t).img == "string" ? e(a) : e(o, -1);
			}), M(r), M(n), U(e, n);
		};
		G(_, (e) => {
			V(t).id === "why-4" && e(v);
		}), M(i), z(() => {
			q(i, "data-index", V(n)), K(i, 1, ia(["group/why relative flex h-90 w-full justify-between overflow-clip rounded-xl transition-all duration-300 max-lg:flex-col lg:h-full lg:hover:scale-101", V(t).cls])), K(o, 1, ia(["space-y-2.5 p-5", V(t).id === "why-3" ? "h-full bg-(image:--why-3-bg) bg-size-[529.5px_auto] bg-position-[calc(100%+200px)_200px] bg-no-repeat before:absolute before:top-0 before:left-0 before:z-1 before:size-full before:bg-(image:--why-3) before:bg-size-[529.5px_auto] before:bg-position-[calc(100%+200px)_196px] before:bg-no-repeat before:transition-all group-hover/why:before:bg-position-[calc(100%+200px)_190px] lg:bg-size-[1059px_auto] lg:bg-position-[170px_50px] lg:before:bg-size-[1059px_auto] lg:before:bg-position-[170px_46px] lg:group-hover/why:before:bg-position-[170px_30px]" : ""])), K(s, 1, ia(["relative z-3 flex items-center text-5xl leading-none font-bold lg:text-6xl lg:data-[font=90]:text-[90px]", V(t).id === "why-3" ? "text-primary" : ""])), q(s, "data-font", V(t).font), K(d, 1, ia(["text-primary leading-none", V(t).id === "why-2" ? "max-xl:text-4xl max-lg:text-5xl" : ""])), W(f, V(t).id === "why-2" || V(t).id === "why-3" ? "+" : ""), K(p, 1, ia(["text-2md", V(t).id !== "why-3" && V(t).id !== "why-4" ? "relative z-3 lg:text-lg" : "lg:text-2xl"])), W(m, V(t).txt);
		}), $r("pointerenter", i, () => a(V(n))), U(e, i);
	}), M(c), M(o), U(e, o), ut();
}
customElements.define("main-why", Ga(Sq, {}, [], []));
//#endregion
//#region src/lib/components/main/Work.svelte
var Cq = /* @__PURE__ */ H("<li data-scroll=\"slide-up\" class=\"relative flex flex-col gap-2.5 text-center\"><picture data-scroll=\"slide-up\" class=\"grid place-items-center\"><img loading=\"lazy\" alt=\"img\" class=\"w-50 lg:w-90.75\"/></picture> <dl class=\"space-y-2.5\"><dt class=\"text-primary text-lg font-bold lg:text-4xl\"> </dt> <dd class=\"text-2md text-666 lg:text-lg\"> </dd> <dd class=\"text-2md lg:text-lg lg:whitespace-pre-line\"> </dd></dl></li>"), wq = /* @__PURE__ */ H("<section data-scroll=\"slide-up\" class=\"relative max-w-dvw pb-5 lg:pb-15\"><sub-heading-line></sub-heading-line> <dl class=\"space-y-5 rounded-xl bg-(image:--work) bg-cover bg-no-repeat p-5 text-center text-lg text-white lg:h-105 lg:pt-15 lg:pb-50 lg:text-4xl\"><dt class=\"text-lg font-bold lg:text-4xl\">DEEP.FINE SPATIAL INTELLIGENCE AI</dt> <dd class=\"text-2md lg:px-10 lg:text-2xl lg:whitespace-pre-line\"> </dd></dl> <ul class=\"relative grid grid-cols-1 gap-7.5 py-7.5 lg:-mt-37.5 lg:grid-cols-3 lg:py-0\"></ul></section>", 2);
function Tq(e, t) {
	lt(t, !0);
	let n = /* @__PURE__ */ F(Cn([
		{
			id: "work-1",
			img: "/output/imgs/main/work/img-work-1.png",
			tit: hu?.(),
			subTit: vu?.(),
			txt: xu?.()
		},
		{
			id: "work-2",
			img: "/output/imgs/main/work/img-work-2.png",
			tit: wu?.(),
			subTit: Du?.(),
			txt: Au?.()
		},
		{
			id: "work-3",
			img: "/output/imgs/main/work/img-work-3.png",
			tit: Nu?.(),
			subTit: Iu?.(),
			txt: zu?.()
		}
	]));
	var r = wq(), i = L(r);
	J(i, "line", "none"), z(() => J(i, "title", ou?.())), z(() => J(i, "subTit", lu?.()));
	var a = R(i, 2);
	da(a, "", {}, { "--work": "url(/output/imgs/main/work/bg-work.jpg)" });
	var o = R(L(a), 2), s = L(o, !0);
	M(o), M(a);
	var c = R(a, 2);
	Ni(c, 23, () => V(n), (e) => e.id, (e, t, n) => {
		var r = Cq(), i = L(r), a = L(i);
		M(i);
		var o = R(i, 2), s = L(o), c = L(s, !0);
		M(s);
		var l = R(s, 2), u = L(l, !0);
		M(l);
		var d = R(l, 2), f = L(d, !0);
		M(d), M(o), M(r), z(() => {
			q(r, "data-index", V(n)), q(a, "src", V(t).img), W(c, V(t).tit), W(u, V(t).subTit), W(f, V(t).txt);
		}), U(e, r);
	}), M(c), M(r), z((e) => W(s, e), [() => fu()]), U(e, r), ut();
}
customElements.define("main-work", Ga(Tq, {}, [], []));
//#endregion
//#region src/lib/components/visual/MainVisual.svelte
var Eq = /* @__PURE__ */ H("<p>Spatial Intelligence Platform</p>"), Dq = /* @__PURE__ */ H("<section data-scroll=\"first\" class=\"relative flex max-h-dvh min-h-[70dvh] flex-col justify-between overflow-clip rounded-xl bg-cover bg-center p-5 text-white opacity-100 max-lg:rounded-lg md:min-h-160 lg:min-h-200 lg:p-15 starting:translate-y-0 starting:opacity-0\"><div class=\"before:[''] absolute top-0 left-0 h-full w-full object-cover before:absolute before:top-0 before:left-0 before:z-3 before:size-full before:bg-linear-to-l before:from-black/0 before:to-black\"><video class=\"relative z-1 aspect-video h-full w-full object-cover\" preload=\"auto\" autoplay=\"\" loop=\"\" playsinline=\"\"><source type=\"video/mp4\"/> <source type=\"video/webm\"/></video></div> <div class=\"relative z-5 starting:opacity-0\"><div class=\"p-1\"><!></div> <h1 class=\"leading-sung mt-5 text-3xl font-bold delay-75 lg:mt-7.5 lg:text-[3.75rem] lg:whitespace-pre-line\"> </h1> <h2 class=\"sr-only\">main page</h2></div> <div class=\"relative z-5 starting:opacity-0\"><div class=\"text-2md mt-5 text-white lg:text-lg lg:whitespace-pre-line\"><p class=\"leading-relaxed\"> </p> <p class=\"leading-relaxed\"> </p></div> <div class=\"mt-7.5 flex lg:mt-9\"><a href=\"/contact/contact\" class=\"group text-2md inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold transition-colors hover:bg-white hover:text-black max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:text-lg\"><span> </span> <icon-list></icon-list></a></div></div></section>", 2);
function Oq(e, t) {
	lt(t, !0);
	var n = Dq(), r = L(n), i = L(r);
	i.muted = !0, q(i, "poster", "/output/video/main-video.jpg");
	var a = L(i);
	q(a, "src", "/output/video/main-video.mp4"), q(R(a, 2), "src", "/output/video/main-video.webm"), M(i), M(r);
	var o = R(r, 2), s = L(o);
	tG(L(s), {
		class: "inline-flex min-h-12 items-center gap-2 rounded-full px-5 py-1 text-lg leading-none font-bold lg:text-2xl",
		style: "border-radius: 24px;",
		children: (e, t) => {
			U(e, Eq());
		},
		$$slots: { default: !0 }
	}), M(s);
	var c = R(s, 2), l = L(c, !0);
	M(c), Xe(2), M(o);
	var u = R(o, 2), d = L(u), f = L(d), p = L(f, !0);
	M(f);
	var m = R(f, 2), h = L(m, !0);
	M(m), M(d);
	var g = R(d, 2), _ = L(g), v = L(_), y = L(v, !0);
	M(v);
	var b = R(v, 2);
	J(b, "name", "arrow-right"), K(b, 1, "size-6 stroke-white group-hover:stroke-black"), M(_), M(g), M(u), M(n), z((e, t, n, r, i) => {
		W(l, e), W(p, t), W(h, n), q(_, "aria-label", r), W(y, i);
	}, [
		() => Nl(),
		() => tP(),
		() => iP(),
		() => sP(),
		() => sP()
	]), U(e, n), ut();
}
customElements.define("main-visual", Ga(Oq, {}, [], []));
//#endregion
//#region src/lib/components/pages/Main.svelte
var kq = /* @__PURE__ */ H("<main class=\"main\"><!> <!> <!> <!> <!> <!> <!> <!></main>");
function Aq(e, t) {
	lt(t, !0), Xn(() => {
		let e = new Zz({ autoRaf: !0 });
		return Qz.setInstance(e), () => {
			Qz.clear();
		};
	});
	let n = Y(t, "news", 23, () => []);
	var r = {
		get news() {
			return n();
		},
		set news(e = []) {
			n(e), P();
		}
	}, i = kq(), a = L(i);
	Oq(a, {});
	var o = R(a, 2);
	UK(o, {});
	var s = R(o, 2);
	tq(s, {});
	var c = R(s, 2);
	Tq(c, {});
	var l = R(c, 2);
	Sq(l, {});
	var u = R(l, 2);
	lq(u, {});
	var d = R(u, 2);
	return KK(d, { get list() {
		return n();
	} }), JK(R(d, 2), {}), M(i), U(e, i), ut(r);
}
customElements.define("main-home", Ga(Aq, { news: { type: "Array" } }, [], []));
//#endregion
//#region src/lib/components/pages/Term.svelte
var jq = /* @__PURE__ */ H("<sub-heading-line></sub-heading-line> <section class=\"text-2md mt-5 grid gap-5 rounded-xl bg-white p-5 lg:mt-15 lg:gap-15\"><p> </p> <div class=\"space-y-5 whitespace-pre-line lg:space-y-15\"><dl class=\"space-y-2.5 lg:space-y-7.5\"><dt class=\"text-primary text-lg font-bold lg:text-4xl\"> </dt> <dd class=\"inline-grid gap-5 lg:gap-7.5\"><p> </p> <ul class=\"space-y-5 lg:space-y-7.5\"><li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p></li></ul></dd></dl> <dl class=\"space-y-2.5 lg:space-y-7.5\"><dt class=\"text-primary text-lg font-bold lg:text-4xl\"> </dt> <dd class=\"inline-grid gap-5 lg:gap-7.5\"><ul class=\"space-y-5 lg:space-y-7.5\"><li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p> <p> </p></li></ul></dd></dl> <dl class=\"space-y-2.5 lg:space-y-7.5\"><dt class=\"text-primary text-lg font-bold lg:text-4xl\"> </dt> <dd class=\"inline-grid gap-5 lg:gap-7.5\"><p> </p> <p class=\"font-bold lg:text-2xl\"> </p> <ul class=\"space-y-5 lg:space-y-7.5\"><li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong></li></ul></dd></dl> <dl class=\"space-y-2.5 lg:space-y-7.5\"><dt class=\"text-primary text-lg font-bold lg:text-4xl\"> </dt> <dd class=\"inline-grid gap-5 lg:gap-7.5\"><p> </p></dd></dl> <dl class=\"space-y-2.5 lg:space-y-7.5\"><dt class=\"text-primary text-lg font-bold lg:text-4xl\"> </dt> <dd class=\"inline-grid gap-5 lg:gap-7.5\"><ul class=\"space-y-5 lg:space-y-7.5\"><li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p></li></ul></dd></dl> <dl class=\"space-y-2.5 lg:space-y-7.5\"><dt class=\"text-primary text-lg font-bold lg:text-4xl\"> </dt> <dd class=\"inline-grid gap-5 lg:gap-7.5\"><p> </p> <ul class=\"space-y-5 lg:space-y-7.5\"><li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p></li></ul></dd></dl> <dl class=\"space-y-2.5 lg:space-y-7.5\"><dt class=\"text-primary text-lg font-bold lg:text-4xl\"> </dt> <dd class=\"inline-grid gap-5 lg:gap-7.5\"><ul class=\"space-y-5 lg:space-y-7.5\"><li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <p> </p></li></ul></dd></dl> <dl class=\"space-y-2.5 lg:space-y-7.5\"><dt class=\"text-primary text-lg font-bold lg:text-4xl\"> </dt> <dd class=\"inline-grid gap-5 lg:gap-7.5\"><p> </p> <div class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> </strong> <ul class=\"space-y-2.5\"><li> </li> <li> </li> <li> </li> <li> </li> <li> </li></ul></div> <ul class=\"space-y-5 lg:space-y-7.5\"><li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> <a href=\"https://www.kopico.go.kr\" class=\"text-primary underline\" target=\"_blank\" rel=\"noopener noreferrer\">www.kopico.go.kr</a> )</strong></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> <a href=\"https://privacy.kisa.or.kr\" class=\"text-primary underline\" target=\"_blank\" rel=\"noopener noreferrer\">privacy.kisa.or.kr</a> )</strong></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> <a href=\"https://www.spo.go.kr\" class=\"text-primary underline\" target=\"_blank\" rel=\"noopener noreferrer\">www.spo.go.kr</a> )</strong></li> <li class=\"grid gap-2.5\"><strong class=\"lg:text-2xl\"> <a href=\"https://ecrm.cyber.go.kr\" class=\"text-primary underline\" target=\"_blank\" rel=\"noopener noreferrer\">ecrm.cyber.go.kr</a> )</strong></li></ul></dd></dl> <dl class=\"space-y-2.5 lg:space-y-7.5\"><dt class=\"text-primary text-lg font-bold lg:text-4xl\"> </dt> <dd class=\"inline-grid gap-5 lg:gap-7.5\"><p> </p></dd></dl></div></section>", 3);
function Mq(e, t) {
	lt(t, !0);
	var n = jq(), r = Pn(n);
	z(() => J(r, "title", jP())), J(r, "page", "term");
	var i = R(r, 2), a = L(i), o = L(a, !0);
	M(a);
	var s = R(a, 2), c = L(s), l = L(c), u = L(l, !0);
	M(l);
	var d = R(l, 2), f = L(d), p = L(f, !0);
	M(f);
	var m = R(f, 2), h = L(m), g = L(h), _ = L(g, !0);
	M(g);
	var v = R(g, 2), y = L(v, !0);
	M(v), M(h);
	var b = R(h, 2), x = L(b), S = L(x, !0);
	M(x);
	var C = R(x, 2), w = L(C, !0);
	M(C), M(b);
	var T = R(b, 2), E = L(T), D = L(E, !0);
	M(E);
	var O = R(E, 2), ee = L(O, !0);
	M(O), M(T);
	var te = R(T, 2), k = L(te), ne = L(k, !0);
	M(k);
	var re = R(k, 2), ie = L(re, !0);
	M(re), M(te), M(m), M(d), M(c);
	var ae = R(c, 2), A = L(ae), oe = L(A, !0);
	M(A);
	var se = R(A, 2), ce = L(se), le = L(ce), ue = L(le), de = L(ue, !0);
	M(ue), M(le);
	var fe = R(le, 2), pe = L(fe), me = L(pe, !0);
	M(pe);
	var he = R(pe, 2), ge = L(he, !0);
	M(he);
	var _e = R(he, 2), ve = L(_e, !0);
	M(_e), M(fe), M(ce), M(se), M(ae);
	var ye = R(ae, 2), be = L(ye), xe = L(be, !0);
	M(be);
	var Se = R(be, 2), Ce = L(Se), we = L(Ce, !0);
	M(Ce);
	var Te = R(Ce, 2), Ee = L(Te, !0);
	M(Te);
	var De = R(Te, 2), Oe = L(De), ke = L(Oe), Ae = L(ke, !0);
	M(ke), M(Oe);
	var je = R(Oe, 2), Me = L(je), Ne = L(Me, !0);
	M(Me), M(je);
	var Pe = R(je, 2), Fe = L(Pe), Ie = L(Fe, !0);
	M(Fe), M(Pe);
	var Le = R(Pe, 2), Re = L(Le), ze = L(Re, !0);
	M(Re), M(Le);
	var Be = R(Le, 2), Ve = L(Be), He = L(Ve, !0);
	M(Ve), M(Be), M(De), M(Se), M(ye);
	var Ue = R(ye, 2), We = L(Ue), Ge = L(We, !0);
	M(We);
	var j = R(We, 2), Ke = L(j), qe = L(Ke, !0);
	M(Ke), M(j), M(Ue);
	var Je = R(Ue, 2), Ye = L(Je), Ze = L(Ye, !0);
	M(Ye);
	var Qe = R(Ye, 2), $e = L(Qe), et = L($e), tt = L(et), nt = L(tt, !0);
	M(tt), M(et);
	var rt = R(et, 2), it = L(rt), at = L(it, !0);
	M(it), M(rt);
	var ot = R(rt, 2), st = L(ot), ct = L(st, !0);
	M(st);
	var dt = R(st, 2), ft = L(dt, !0);
	M(dt), M(ot), M($e), M(Qe), M(Je);
	var pt = R(Je, 2), mt = L(pt), ht = L(mt, !0);
	M(mt);
	var gt = R(mt, 2), _t = L(gt), vt = L(_t, !0);
	M(_t);
	var yt = R(_t, 2), bt = L(yt), xt = L(bt), St = L(xt, !0);
	M(xt);
	var Ct = R(xt, 2), wt = L(Ct, !0);
	M(Ct), M(bt);
	var Tt = R(bt, 2), Et = L(Tt), Dt = L(Et, !0);
	M(Et);
	var Ot = R(Et, 2), kt = L(Ot, !0);
	M(Ot), M(Tt);
	var At = R(Tt, 2), jt = L(At), Mt = L(jt, !0);
	M(jt);
	var Nt = R(jt, 2), Pt = L(Nt, !0);
	M(Nt), M(At);
	var Ft = R(At, 2), It = L(Ft), Lt = L(It, !0);
	M(It);
	var Rt = R(It, 2), N = L(Rt, !0);
	M(Rt), M(Ft);
	var zt = R(Ft, 2), Bt = L(zt), Vt = L(Bt, !0);
	M(Bt);
	var Ht = R(Bt, 2), Ut = L(Ht, !0);
	M(Ht), M(zt);
	var Wt = R(zt, 2), Gt = L(Wt), Kt = L(Gt, !0);
	M(Gt);
	var qt = R(Gt, 2), Jt = L(qt, !0);
	M(qt), M(Wt);
	var Yt = R(Wt, 2), Xt = L(Yt), Zt = L(Xt, !0);
	M(Xt);
	var Qt = R(Xt, 2), $t = L(Qt, !0);
	M(Qt), M(Yt), M(yt), M(gt), M(pt);
	var en = R(pt, 2), tn = L(en), nn = L(tn, !0);
	M(tn);
	var rn = R(tn, 2), P = L(rn), an = L(P), on = L(an), sn = L(on, !0);
	M(on), M(an);
	var cn = R(an, 2), ln = L(cn), un = L(ln, !0);
	M(ln);
	var dn = R(ln, 2), fn = L(dn, !0);
	M(dn), M(cn), M(P), M(rn), M(en);
	var pn = R(en, 2), mn = L(pn), hn = L(mn, !0);
	M(mn);
	var gn = R(mn, 2), F = L(gn), _n = L(F, !0);
	M(F);
	var I = R(F, 2), vn = L(I), yn = L(vn, !0);
	M(vn);
	var bn = R(vn, 2), xn = L(bn), Sn = L(xn, !0);
	M(xn);
	var Cn = R(xn, 2), wn = L(Cn, !0);
	M(Cn);
	var Tn = R(Cn, 2), En = L(Tn, !0);
	M(Tn);
	var Dn = R(Tn, 2), On = L(Dn, !0);
	M(Dn);
	var kn = R(Dn, 2), An = L(kn, !0);
	M(kn), M(bn), M(I);
	var jn = R(I, 2), Mn = L(jn), Nn = L(Mn), Fn = L(Nn);
	Xe(2), M(Nn), M(Mn);
	var In = R(Mn, 2), Ln = L(In), Rn = L(Ln);
	Xe(2), M(Ln), M(In);
	var zn = R(In, 2), Bn = L(zn), Vn = L(Bn);
	Xe(2), M(Bn), M(zn);
	var Hn = R(zn, 2), Un = L(Hn), Wn = L(Un);
	Xe(2), M(Un), M(Hn), M(jn), M(gn), M(pn);
	var Gn = R(pn, 2), Kn = L(Gn), qn = L(Kn, !0);
	M(Kn);
	var Jn = R(Kn, 2), Yn = L(Jn), Xn = L(Yn, !0);
	M(Yn), M(Jn), M(Gn), M(s), M(i), z((e, t, n, r, i, a, s, c, l, d, f, m, h, g, v, b, x, C, T, E, O, te, k, re, ae, A, se, ce, le, ue, fe, pe, he, _e, ye, be, Se, Ce, Te, De, Oe, ke, je, Me, Pe, Fe, Le, Re, Be, Ve, Ue, We, j, Ke, Je, Ye, M, Xe, Qe, $e, et, tt, rt, it, ot) => {
		W(o, e), W(u, t), W(p, n), W(_, r), W(y, i), W(S, a), W(w, s), W(D, c), W(ee, l), W(ne, d), W(ie, f), W(oe, m), W(de, h), W(me, g), W(ge, v), W(ve, b), W(xe, x), W(we, C), W(Ee, T), W(Ae, E), W(Ne, O), W(Ie, te), W(ze, k), W(He, re), W(Ge, ae), W(qe, A), W(Ze, se), W(nt, ce), W(at, le), W(ct, ue), W(ft, fe), W(ht, pe), W(vt, he), W(St, _e), W(wt, ye), W(Dt, be), W(kt, Se), W(Mt, Ce), W(Pt, Te), W(Lt, De), W(N, Oe), W(Vt, ke), W(Ut, je), W(Kt, Me), W(Jt, Pe), W(Zt, Fe), W($t, Le), W(nn, Re), W(sn, Be), W(un, Ve), W(fn, Ue), W(hn, We), W(_n, j), W(yn, Ke), W(Sn, Je), W(wn, Ye), W(En, M), W(On, Xe), W(An, Qe), W(Fn, `${$e ?? ""} ( `), W(Rn, `${et ?? ""} ( `), W(Vn, `${tt ?? ""} ( `), W(Wn, `${rt ?? ""} ( `), W(qn, it), W(Xn, ot);
	}, [
		() => PP(),
		() => LP(),
		() => BP(),
		() => UP(),
		() => KP(),
		() => YP(),
		() => QP(),
		() => tF(),
		() => iF(),
		() => sF(),
		() => uF(),
		() => pF(),
		() => gF(),
		() => yF(),
		() => SF(),
		() => TF(),
		() => OF(),
		() => jF(),
		() => PF(),
		() => LF(),
		() => BF(),
		() => UF(),
		() => KF(),
		() => YF(),
		() => QF(),
		() => tI(),
		() => iI(),
		() => sI(),
		() => uI(),
		() => pI(),
		() => gI(),
		() => yI(),
		() => SI(),
		() => TI(),
		() => OI(),
		() => jI(),
		() => PI(),
		() => LI(),
		() => BI(),
		() => UI(),
		() => KI(),
		() => YI(),
		() => QI(),
		() => tL(),
		() => iL(),
		() => sL(),
		() => uL(),
		() => pL(),
		() => gL(),
		() => yL(),
		() => SL(),
		() => TL(),
		() => OL(),
		() => jL(),
		() => PL(),
		() => LL(),
		() => BL(),
		() => UL(),
		() => KL(),
		() => YL(),
		() => QL(),
		() => tR(),
		() => iR(),
		() => sR(),
		() => uR()
	]), U(e, n), ut();
}
customElements.define("sub-term", Ga(Mq, {}, [], []));
//#endregion
//#region src/lib/components/modal/ModalMain.svelte
var Nq = /* @__PURE__ */ H("<swiper-slide><picture class=\"rounded-t-xl\"><img loading=\"lazy\" alt=\"\" class=\"lg:h-105 lg:w-90\"/></picture> <div class=\"rounded--b-xl grid w-full grid-cols-1 overflow-clip\"><a class=\"bg-primary grid place-content-center text-2xl font-bold text-white lg:min-h-15\"><span> </span></a></div></swiper-slide>", 2), Pq = /* @__PURE__ */ H("<dialog class=\"backdrop:bg-000/70 top-0 left-0 z-200 m-0 hidden h-dvh max-h-dvh w-dvw max-w-dvw place-content-center gap-5 bg-transparent p-0 open:fixed open:grid\"><div class=\"flex justify-between gap-2 max-lg:px-5\"><label class=\"label gap-2.5\" for=\"contactCheckbox\"><input class=\"peer sr-only\" id=\"contactCheckbox\" type=\"checkbox\"/> <icon-list></icon-list> <span class=\"text-2md text-white\">오늘 하루 보지 않기</span></label> <button class=\"group grid size-9 place-content-center rounded-full bg-white transition-colors hover:bg-black hover:text-white\"><span class=\"sr-only\">Close</span> <icon-list></icon-list></button></div> <section class=\"relative w-dvw rounded-xl lg:w-90\"><swiper-container></swiper-container></section> <div class=\"relative z-1 flex w-full items-center justify-between gap-2 max-lg:px-5\"><button class=\"group grid size-6 place-content-center rounded-full bg-white/20 transition-colors hover:bg-white\"><span class=\"sr-only\">Slide Prev</span> <icon-list></icon-list></button> <p class=\"min-w-18 rounded-full bg-white/20 px-5 py-px text-white\"><strong> </strong> &#47; <span> </span></p> <button class=\"group grid size-6 place-content-center rounded-full bg-white/20 transition-colors hover:bg-white\"><span class=\"sr-only\">Slide Next</span> <icon-list></icon-list></button></div></dialog>", 2);
function Fq(e, t) {
	lt(t, !0);
	let n = Y(t, "list", 7), r = /* @__PURE__ */ N(() => !1);
	MU();
	let i = /* @__PURE__ */ F(null), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ N(() => V(a)?.swiper), s = /* @__PURE__ */ F(0), c = async () => {
		await Ur(), V(a)?.swiper && I(s, V(a).swiper.realIndex, !0);
	}, l = {
		setStorage(e, t) {
			let n = Date.now() + t * 24 * 60 * 60 * 1e3;
			localStorage.setItem(e, n.toString());
		},
		getStorage(e) {
			let t = localStorage.getItem(e);
			if (!t) return !1;
			let n = parseInt(t, 10);
			return isNaN(n) || new Date(n).toDateString() !== (/* @__PURE__ */ new Date()).toDateString() ? (localStorage.removeItem(e), !1) : !0;
		},
		setStorageToMidnight(e) {
			let t = /* @__PURE__ */ new Date(), n = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 23, 59, 59, 999);
			localStorage.setItem(e, n.getTime().toString());
		}
	};
	Qn(() => {
		l.getStorage("main-modal") || (I(r, !0), Ur().then(() => {
			V(i)?.showModal();
		}));
	}), Xn(() => {
		if (V(a)) return V(a).addEventListener("swiperslidechange", c), () => {
			V(a) && V(a).removeEventListener("swiperslidechange", c);
		};
	});
	let u = () => {
		I(r, !1), V(i)?.close();
	};
	var d = {
		get list() {
			return n();
		},
		set list(e) {
			n(e), P();
		}
	}, f = di(), p = Pn(f), m = (e) => {
		var t = Pq(), r = L(t), c = L(r), d = L(c), f = R(d, 2);
		K(f, 1, "peer-checked:bg-primary peer-checked:border-primary size-9 rounded-md border border-white bg-white peer-checked:stroke-white"), J(f, "name", "chk"), Xe(2), M(c);
		var p = R(c, 2), m = R(L(p), 2);
		J(m, "name", "close"), K(m, 1, "size-3 stroke-black group-hover:stroke-white"), M(p), M(r);
		var h = R(r, 2), g = L(h);
		K(g, 1, "w-full lg:min-w-80"), J(g, "pagination", !1), J(g, "slides-per-view", "1"), J(g, "speed", "500"), J(g, "loop", "true"), J(g, "space-between", "10"), Ni(g, 21, n, ki, (e, t) => {
			var n = Nq();
			J(n, "lazy", "true"), K(n, 1, "overflow-clip rounded-xl bg-white max-lg:w-[calc(100dvw-40px)] lg:w-90");
			var r = L(n), i = L(r);
			M(r);
			var a = R(r, 2), o = L(a), s = L(o), c = L(s, !0);
			M(s), M(o), M(a), M(n), z(() => {
				q(i, "src", V(t).img), q(o, "href", V(t).link), q(o, "aria-label", V(t).title), W(c, V(t).title);
			}), U(e, n);
		}), M(g), Ma(g, (e) => I(a, e), () => V(a)), M(h);
		var _ = R(h, 2), v = L(_), y = R(L(v), 2);
		J(y, "name", "arrow-right"), K(y, 1, "size-4 rotate-180 stroke-white group-hover:stroke-black"), M(v);
		var b = R(v, 2), x = L(b), S = L(x, !0);
		M(x);
		var C = R(x, 2), w = L(C, !0);
		M(C), M(b);
		var T = R(b, 2), E = R(L(T), 2);
		J(E, "name", "arrow-right"), K(E, 1, "size-4 stroke-white group-hover:stroke-black"), M(T), M(_), M(t), Ma(t, (e) => I(i, e), () => V(i)), z(() => {
			W(S, V(s) + 1), W(w, V(o)?.slides?.length ?? 0);
		}), ei("change", d, (e) => {
			e.currentTarget.checked && l.setStorageToMidnight("main-modal");
		}), ei("click", p, (e) => {
			e.preventDefault(), u();
		}), $r("slidechange", g, () => {
			I(a, V(a), !0);
		}), ei("click", v, () => {
			V(o)?.slidePrev();
		}), ei("click", T, () => {
			V(o)?.slideNext();
		}), U(e, t);
	};
	return G(p, (e) => {
		V(r) && n().length > 0 && e(m);
	}), U(e, f), ut(d);
}
ti(["change", "click"]), customElements.define("modal-main", Ga(Fq, { list: { type: "Array" } }, [], []));
//#endregion
//#region src/lib/components/banner/BannerFoot.svelte
var Iq = (e) => {
	var t = Lq(), n = L(t);
	q(n, "src", "/output/imgs/logo/logo-logi-only.svg");
	var r = R(n, 2), i = L(r, !0);
	M(r), M(t), z((e) => W(i, e), [() => pR()]), U(e, t);
}, Lq = /* @__PURE__ */ H("<figure class=\"flex flex-none items-center gap-5 text-center text-white\"><img alt=\"logi.fine\" class=\"min-h-12\"/> <figcaption class=\"hidden text-left font-bold group-has-aria-expanded/foot:flex\"> </figcaption></figure>"), Rq = /* @__PURE__ */ H("<button class=\"group grid size-20 place-content-center rounded-xl bg-black/70 p-2.5 backdrop-blur-[20px] transition-colors lg:p-2.5\"><!></button>"), zq = /* @__PURE__ */ H("<span class=\"text-2md font-bold text-white\">N</span>"), Bq = /* @__PURE__ */ H("<icon-list></icon-list>", 2), Vq = /* @__PURE__ */ H("<button><span class=\"sr-only\">Close</span> <!></button>"), Hq = /* @__PURE__ */ H("<section data-section=\"floating\"><div><!> <div class=\"text-2sm whi hidden grid-cols-2 gap-2.5 font-bold group-has-aria-expanded/foot:grid\"><a href=\"https://deepfine.my.salesforce.com/sfc/p/IR000001ZM92/a/TJ00000djirN/Lc54cHS.pbOehXcpItel0OxkWqb66lW7m.7qOou0CU0\" class=\"group flex items-center gap-2.5 rounded-xl bg-white/20 px-2.5 hover:bg-white hover:text-black md:min-h-9\" title=\"새창열림\" target=\"_blank\"><icon-list></icon-list> <span class=\"flex-none\"> </span></a> <a href=\"https://logifine.deepfine.com/signup/trial\" class=\"group flex min-h-9 items-center gap-2.5 rounded-xl bg-white/20 px-2.5 hover:bg-white hover:text-black\" title=\"새창열림\" target=\"_blank\"><icon-list></icon-list> <span class=\"flex-none\"> </span></a></div> <div class=\"absolute -top-2.5 -left-2.5 z-2\"><!></div></div></section>", 2);
function Uq(e, t) {
	lt(t, !0);
	let n = /* @__PURE__ */ F(!1), r = {
		setStorage(e) {
			localStorage.setItem("foot-open", e);
		},
		getStorage() {
			return localStorage.getItem("foot-open");
		}
	};
	Qn(() => {
		if (new URLSearchParams(window.location.search).get("expanded") === "true") {
			I(n, !0);
			return;
		}
		r.getStorage() === "true" && I(n, !0);
	});
	let i = () => {
		I(n, !V(n)), r.setStorage(`${V(n)}`);
	};
	var a = Hq(), o = L(a), s = L(o), c = (e) => {
		Iq(e);
	}, l = (e) => {
		var t = Rq();
		Iq(L(t)), M(t), z(() => q(t, "aria-expanded", V(n) ? "false" : "true")), ei("click", t, i), U(e, t);
	};
	G(s, (e) => {
		V(n) ? e(l, -1) : e(c);
	});
	var u = R(s, 2), d = L(u), f = L(d);
	K(f, 1, "size-6 stroke-white group-hover:stroke-black"), J(f, "name", "import");
	var p = R(f, 2), m = L(p, !0);
	M(p), M(d);
	var h = R(d, 2), g = L(h);
	K(g, 1, "size-6 stroke-white group-hover:stroke-black"), J(g, "name", "arrow-link-underline");
	var _ = R(g, 2), v = L(_, !0);
	M(_), M(h), M(u);
	var y = R(u, 2), b = L(y), x = (e) => {
		var t = Vq(), r = R(L(t), 2), a = (e) => {
			U(e, zq());
		}, o = (e) => {
			var t = Bq();
			J(t, "name", "close"), K(t, 1, "stroke-ccc group-hover:stroke-000 size-3"), U(e, t);
		};
		G(r, (e) => {
			V(n) ? e(a) : e(o, -1);
		}), M(t), z(() => {
			K(t, 1, ia(["group  grid size-7.5 place-content-center rounded-full transition-colors", V(n) ? "bg-ffa100" : "bg-000  border border-white/50 hover:bg-white"])), q(t, "aria-expanded", V(n) ? "false" : "true");
		}), ei("click", t, i), U(e, t);
	}, S = (e) => {
		var t = Vq(), r = R(L(t), 2), a = (e) => {
			U(e, zq());
		}, o = (e) => {
			var t = Bq();
			J(t, "name", "close"), K(t, 1, "stroke-ccc group-hover:stroke-000 size-3"), U(e, t);
		};
		G(r, (e) => {
			V(n) ? e(a) : e(o, -1);
		}), M(t), z(() => {
			K(t, 1, ia(["group  grid size-7.5 place-content-center rounded-full transition-colors", V(n) ? "bg-ffa100" : "bg-000  border border-white/50 hover:bg-white"])), q(t, "aria-expanded", V(n) ? "false" : "true");
		}), ei("click", t, i), U(e, t);
	};
	G(b, (e) => {
		V(n) ? e(S, -1) : e(x);
	}), M(y), M(o), M(a), z((e, t, r) => {
		K(a, 1, ia(["group/foot fixed right-0 bottom-5 z-2 px-5 whitespace-pre-line text-white duration-600 md:right-5", V(n) ? "" : " max-md:w-full "])), K(o, 1, ia(["relative grid  gap-2.5 rounded-xl transition-colors  duration-600", V(n) ? "" : "grid-cols-1 bg-black/70 px-5 py-2.5 backdrop-blur-[20px] md:w-135.75 md:grid-cols-2 md:gap-5 lg:p-5"])), q(d, "download", e), W(m, t), W(v, r);
	}, [
		() => gR(),
		() => gR(),
		() => yR()
	]), U(e, a), ut();
}
ti(["click"]), customElements.define("banner-foot", Ga(Uq, {}, [], []));
//#endregion
//#region src/lib/components/pages/NotFound.svelte
var Wq = /* @__PURE__ */ H("<main class=\"error transition-color flex h-dvh w-dvw flex-col justify-between bg-linear-to-b from-[#3743ff] to-[#4589ff]\"><section class=\"my-auto space-y-2.5 text-center text-white\"><h1 class=\"sr-only\">DEEP.FINE</h1> <h2 class=\"text-3xl font-bold lg:text-7xl\">Page not found!</h2> <div class=\"space-y-5\"><p class=\"text-lg lg:text-2xl\"> </p> <div class=\"flex justify-center max-lg:px-5\"><a href=\"https://www.deepfine.com/\" class=\"group flex min-h-12 items-center gap-2 rounded-md border border-white px-5 transition-colors hover:border-black hover:bg-black hover:text-white max-lg:justify-between lg:min-h-13.5 lg:w-auto lg:flex-none\"><div class=\"flex size-6 stroke-white group-hover:stroke-white\"><svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" class=\"rotate-180\"><path d=\"M14.4302 5.92969L20.5002 11.9997L14.4302 18.0697\" fill=\"none\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M3.5 12H20.33\" fill=\"none\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg></div> <span> </span></a></div></div></section> <picture class=\"grid place-content-center\"><img loading=\"lazy\" alt=\"404\" class=\"w-full lg:w-135\"/></picture></main>");
function Gq(e, t) {
	lt(t, !0);
	var n = Wq(), r = L(n), i = R(L(r), 4), a = L(i), o = L(a, !0);
	M(a);
	var s = R(a, 2), c = L(s), l = R(L(c), 2), u = L(l, !0);
	M(l), M(c), M(s), M(i), M(r);
	var d = R(r, 2);
	q(L(d), "src", "/output/imgs/visual/img-404.png"), M(d), M(n), z((e, t, n) => {
		W(o, e), q(c, "aria-label", t), W(u, n);
	}, [
		() => SR(),
		() => TR(),
		() => TR()
	]), U(e, n), ut();
}
customElements.define("not-found", Ga(Gq, {}, [], []));
//#endregion
//#region src/lib/components/text/TxtNone.svelte
var Kq = /* @__PURE__ */ H("<div class=\"grid min-h-[20dvh] w-full place-content-center rounded-xl bg-white\"><p class=\"text-2md w-full lg:text-2xl\"> </p></div>");
function qq(e, t) {
	lt(t, !0);
	var n = Kq(), r = L(n), i = L(r, !0);
	M(r), M(n), z((e) => W(i, e), [() => OR()]), U(e, n), ut();
}
customElements.define("txt-none", Ga(qq, {}, [], []));
//#endregion
