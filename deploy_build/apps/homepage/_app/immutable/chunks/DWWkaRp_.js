var e = Object.create,
	t = Object.defineProperty,
	n = Object.getOwnPropertyDescriptor,
	r = Object.getOwnPropertyNames,
	i = Object.getPrototypeOf,
	a = Object.prototype.hasOwnProperty,
	o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), (e = null)), t.exports),
	s = (e, n) => {
		let r = {};
		for (var i in e) t(r, i, { get: e[i], enumerable: !0 });
		return (n || t(r, Symbol.toStringTag, { value: `Module` }), r);
	},
	c = (e, i, o, s) => {
		if ((i && typeof i == `object`) || typeof i == `function`)
			for (var c = r(i), l = 0, u = c.length, d; l < u; l++)
				((d = c[l]), !a.call(e, d) && d !== o && t(e, d, { get: ((e) => i[e]).bind(null, d), enumerable: !(s = n(i, d)) || s.enumerable }));
		return e;
	},
	l = (n, r, a) => ((a = n == null ? {} : e(i(n))), c(r || !n || !n.__esModule ? t(a, `default`, { value: n, enumerable: !0 }) : a, n)),
	u = Array.isArray,
	d = Array.prototype.indexOf,
	f = Array.prototype.includes,
	p = Array.from,
	m = Object.keys,
	h = Object.defineProperty,
	g = Object.getOwnPropertyDescriptor,
	_ = Object.getOwnPropertyDescriptors,
	v = Object.prototype,
	y = Array.prototype,
	b = Object.getPrototypeOf,
	x = Object.isExtensible;
function S(e) {
	return typeof e == `function`;
}
var C = () => {};
function ee(e) {
	return e();
}
function te(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function ne() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			((e = n), (t = r));
		}),
		resolve: e,
		reject: t,
	};
}
function re(e, t, n = !1) {
	return e === void 0 ? (n ? t() : t) : e;
}
function ie(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if ((n.push(r), n.length === t)) break;
	return n;
}
var ae = 1 << 24,
	w = 1024,
	T = 2048,
	oe = 4096,
	se = 8192,
	ce = 16384,
	le = 32768,
	ue = 1 << 25,
	de = 65536,
	fe = 1 << 19,
	pe = 1 << 20,
	me = 1 << 25,
	he = 65536,
	ge = 1 << 21,
	_e = 1 << 22,
	ve = 1 << 23,
	ye = Symbol(`$state`),
	be = Symbol(`legacy props`),
	xe = Symbol(``),
	Se = Symbol(`attributes`),
	Ce = Symbol(`class`),
	we = Symbol(`style`),
	Te = Symbol(`text`),
	Ee = Symbol(`form reset`),
	De = new (class extends Error {
		name = `StaleReactionError`;
		message = 'The reaction that called `getAbortSignal()` was re-run or destroyed';
	})(),
	Oe = !!globalThis.document?.contentType && globalThis.document.contentType.includes(`xml`);
function ke(e) {
	throw Error(`https://svelte.dev/e/experimental_async_required`);
}
function Ae(e) {
	throw Error(`https://svelte.dev/e/lifecycle_outside_component`);
}
function je() {
	throw Error(`https://svelte.dev/e/missing_context`);
}
function Me() {
	throw Error(`https://svelte.dev/e/async_derived_orphan`);
}
function Ne(e, t, n) {
	throw Error(`https://svelte.dev/e/each_key_duplicate`);
}
function Pe(e) {
	throw Error(`https://svelte.dev/e/effect_in_teardown`);
}
function Fe() {
	throw Error(`https://svelte.dev/e/effect_in_unowned_derived`);
}
function Ie(e) {
	throw Error(`https://svelte.dev/e/effect_orphan`);
}
function Le() {
	throw Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
}
function Re() {
	throw Error(`https://svelte.dev/e/fork_discarded`);
}
function ze() {
	throw Error(`https://svelte.dev/e/fork_timing`);
}
function Be() {
	throw Error(`https://svelte.dev/e/get_abort_signal_outside_reaction`);
}
function Ve() {
	throw Error(`https://svelte.dev/e/hydration_failed`);
}
function He(e) {
	throw Error(`https://svelte.dev/e/lifecycle_legacy_only`);
}
function Ue(e) {
	throw Error(`https://svelte.dev/e/props_invalid_value`);
}
function We() {
	throw Error(`https://svelte.dev/e/set_context_after_init`);
}
function Ge() {
	throw Error(`https://svelte.dev/e/state_descriptors_fixed`);
}
function Ke() {
	throw Error(`https://svelte.dev/e/state_prototype_fixed`);
}
function qe() {
	throw Error(`https://svelte.dev/e/state_unsafe_mutation`);
}
function Je() {
	throw Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
}
var Ye = {},
	E = Symbol(`uninitialized`),
	Xe = `http://www.w3.org/1999/xhtml`,
	Ze = `http://www.w3.org/2000/svg`,
	Qe = `http://www.w3.org/1998/Math/MathML`;
function $e() {
	console.warn(`https://svelte.dev/e/derived_inert`);
}
function et(e) {
	console.warn(`https://svelte.dev/e/hydratable_missing_but_expected`);
}
function tt(e) {
	console.warn(`https://svelte.dev/e/hydration_mismatch`);
}
function nt() {
	console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
}
function rt() {
	console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
}
var D = !1;
function O(e) {
	D = e;
}
var k;
function A(e) {
	if (e === null) throw (tt(), Ye);
	return (k = e);
}
function it() {
	return A(B(k));
}
function at(e) {
	if (D) {
		if (B(k) !== null) throw (tt(), Ye);
		k = e;
	}
}
function ot(e = 1) {
	if (D) {
		for (var t = e, n = k; t--; ) n = B(n);
		k = n;
	}
}
function st(e = !0) {
	for (var t = 0, n = k; ; ) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === `]`) {
				if (t === 0) return n;
				--t;
			} else (r === `[` || r === `[!` || (r[0] === `[` && !isNaN(Number(r.slice(1))))) && (t += 1);
		}
		var i = B(n);
		(e && n.remove(), (n = i));
	}
}
function ct(e) {
	if (!e || e.nodeType !== 8) throw (tt(), Ye);
	return e.data;
}
function lt(e) {
	return e === this.v;
}
function ut(e, t) {
	return e == e ? e !== t || (typeof e == `object` && !!e) || typeof e == `function` : t == t;
}
function dt(e) {
	return !ut(e, this.v);
}
var j = !1,
	ft = !1;
function pt() {
	ft = !0;
}
var M = null;
function mt(e) {
	M = e;
}
function ht() {
	let e = {};
	return [() => (vt(e) || je(), gt(e)), (t) => _t(e, t)];
}
function gt(e) {
	return Ct(`getContext`).get(e);
}
function _t(e, t) {
	let n = Ct(`setContext`);
	if (j) {
		var r = q.f;
		(!W && r & 32 && !M.i) || We();
	}
	return (n.set(e, t), t);
}
function vt(e) {
	return Ct(`hasContext`).has(e);
}
function yt() {
	return Ct(`getAllContexts`);
}
function bt(e, t = !1, n) {
	M = { p: M, i: !1, c: null, e: null, s: e, x: null, r: q, l: ft && !t ? { s: null, u: null, $: [] } : null };
}
function xt(e) {
	var t = M,
		n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) ur(r);
	}
	return (e !== void 0 && (t.x = e), (t.i = !0), (M = t.p), e ?? {});
}
function St() {
	return !ft || (M !== null && M.l === null);
}
function Ct(e) {
	return (M === null && Ae(e), (M.c ??= new Map(wt(M) || void 0)));
}
function wt(e) {
	let t = e.p;
	for (; t !== null; ) {
		let e = t.c;
		if (e !== null) return e;
		t = t.p;
	}
	return null;
}
var Tt = [];
function Et() {
	var e = Tt;
	((Tt = []), te(e));
}
function N(e) {
	if (Tt.length === 0 && !cn) {
		var t = Tt;
		queueMicrotask(() => {
			t === Tt && Et();
		});
	}
	Tt.push(e);
}
function Dt() {
	for (; Tt.length > 0; ) Et();
}
function Ot(e) {
	var t = q;
	if (t === null) return ((W.f |= ve), e);
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	kt(e, t);
}
function kt(e, t) {
	if (!(t !== null && t.f & 16384)) {
		for (; t !== null; ) {
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
var At = ~(T | oe | w);
function P(e, t) {
	e.f = (e.f & At) | t;
}
function jt(e) {
	e.f & 512 || e.deps === null ? P(e, w) : P(e, oe);
}
function Mt(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || ((t.f ^= he), Mt(t.deps));
}
function Nt(e, t, n) {
	(e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Mt(e.deps), P(e, w));
}
var Pt = [];
function Ft(e, t = C) {
	let n = null,
		r = new Set();
	function i(t) {
		if (ut(e, t) && ((e = t), n)) {
			let t = !Pt.length;
			for (let t of r) (t[1](), Pt.push(t, e));
			if (t) {
				for (let e = 0; e < Pt.length; e += 2) Pt[e][0](Pt[e + 1]);
				Pt.length = 0;
			}
		}
	}
	function a(t) {
		i(t(e));
	}
	function o(o, s = C) {
		let c = [o, s];
		return (
			r.add(c),
			r.size === 1 && (n = t(i, a) || C),
			o(e),
			() => {
				(r.delete(c), r.size === 0 && n && (n(), (n = null)));
			}
		);
	}
	return { set: i, update: a, subscribe: o };
}
var It = !1,
	Lt = !1;
function Rt(e) {
	var t = Lt;
	try {
		return ((Lt = !1), [e(), Lt]);
	} finally {
		Lt = t;
	}
}
function zt(e) {
	let t = 0,
		n = An(0),
		r;
	return () => {
		sr() &&
			(Q(n),
			gr(
				() => (
					t === 0 && (r = Qr(() => e(() => In(n)))),
					(t += 1),
					() => {
						N(() => {
							(--t, t === 0 && (r?.(), (r = void 0), In(n)));
						});
					}
				),
			));
	};
}
var Bt = de | fe;
function Vt(e, t, n, r) {
	new Ht(e, t, n, r);
}
var Ht = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = D ? k : null;
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
	#f = new Set();
	#p = new Set();
	#m = null;
	#h = zt(
		() => (
			(this.#m = An(this.#l)),
			() => {
				this.#m = null;
			}
		),
	);
	constructor(e, t, n, r) {
		((this.#e = e),
			(this.#n = t),
			(this.#r = (e) => {
				var t = q;
				((t.b = this), (t.f |= 128), n(e));
			}),
			(this.parent = q.b),
			(this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e)),
			(this.#i = vr(() => {
				if (D) {
					let e = this.#t;
					it();
					let t = e.data === `[!`;
					if (e.data.startsWith(`[?`)) {
						let t = JSON.parse(e.data.slice(2));
						this.#_(t);
					} else t ? this.#v() : this.#g();
				} else this.#y();
			}, Bt)),
			D && (this.#e = k));
	}
	#g() {
		try {
			this.#a = H(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t &&
			(this.#s = H(() => {
				t(
					this.#e,
					() => e,
					() => () => {},
				);
			}));
	}
	#v() {
		let e = this.#n.pending;
		e &&
			((this.is_pending = !0),
			(this.#o = H(() => e(this.#e))),
			N(() => {
				var e = (this.#c = document.createDocumentFragment()),
					t = R();
				(e.append(t),
					(this.#a = this.#x(() => H(() => this.#r(t)))),
					this.#u === 0 &&
						(this.#e.before(e),
						(this.#c = null),
						Tr(this.#o, () => {
							this.#o = null;
						}),
						this.#b(F)));
			}));
	}
	#y() {
		try {
			if (
				((this.is_pending = this.has_pending_snippet()),
				(this.#u = 0),
				(this.#l = 0),
				(this.#a = H(() => {
					this.#r(this.#e);
				})),
				this.#u > 0)
			) {
				var e = (this.#c = document.createDocumentFragment());
				kr(this.#a, e);
				let t = this.#n.pending;
				this.#o = H(() => t(this.#e));
			} else this.#b(F);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		((this.is_pending = !1), e.transfer_effects(this.#f, this.#p));
	}
	defer_effect(e) {
		Nt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = q,
			n = W,
			r = M;
		(J(this.#i), K(this.#i), mt(this.#i.ctx));
		try {
			return (mn.ensure(), e());
		} catch (e) {
			return (Ot(e), null);
		} finally {
			(J(t), K(n), mt(r));
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		((this.#u += e),
			this.#u === 0 &&
				(this.#b(t),
				this.#o &&
					Tr(this.#o, () => {
						this.#o = null;
					}),
				(this.#c &&= (this.#e.before(this.#c), null))));
	}
	update_pending_count(e, t) {
		(this.#S(e, t),
			(this.#l += e),
			!(!this.#m || this.#d) &&
				((this.#d = !0),
				N(() => {
					((this.#d = !1), this.#m && Nn(this.#m, this.#l));
				})));
	}
	get_effect_pending() {
		return (this.#h(), Q(this.#m));
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		F?.is_fork
			? (this.#a && F.skip_effect(this.#a),
				this.#o && F.skip_effect(this.#o),
				this.#s && F.skip_effect(this.#s),
				F.oncommit(() => {
					this.#C(e);
				}))
			: this.#C(e);
	}
	#C(e) {
		((this.#a &&= (U(this.#a), null)), (this.#o &&= (U(this.#o), null)), (this.#s &&= (U(this.#s), null)), D && (A(this.#t), ot(), A(st())));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1,
			i = !1;
		let a = () => {
				if (r) {
					rt();
					return;
				}
				((r = !0),
					i && Je(),
					this.#s !== null &&
						Tr(this.#s, () => {
							this.#s = null;
						}),
					this.#x(() => {
						this.#y();
					}));
			},
			o = (e) => {
				try {
					((i = !0), t?.(e, a), (i = !1));
				} catch (e) {
					kt(e, this.#i && this.#i.parent);
				}
				n &&
					(this.#s = this.#x(() => {
						try {
							return H(() => {
								var t = q;
								((t.b = this),
									(t.f |= 128),
									n(
										this.#e,
										() => e,
										() => a,
									));
							});
						} catch (e) {
							return (kt(e, this.#i.parent), null);
						}
					}));
			};
		N(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				kt(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == `object` && t && typeof t.then == `function` ? t.then(o, (e) => kt(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
function Ut(e, t, n, r) {
	let i = St() ? qt : Zt;
	var a = e.filter((e) => !e.settled),
		o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = q,
		c = Wt(),
		l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				kt(e, s);
			}
			Gt();
		}
	}
	var d = Kt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => Yt(e)))
			.then(u)
			.catch((e) => kt(e, s))
			.finally(d);
	}
	l
		? l.then(() => {
				(c(), f(), Gt());
			})
		: f();
}
function Wt() {
	var e = q,
		t = W,
		n = M,
		r = F;
	return function (i = !0) {
		(J(e), K(t), mt(n), i && !(e.f & 16384) && (r?.activate(), r?.apply()));
	};
}
function Gt(e = !0) {
	(J(null), K(null), mt(null), e && F?.deactivate());
}
function Kt() {
	var e = q,
		t = e.b,
		n = F,
		r = !!t?.is_rendered();
	return (
		t?.update_pending_count(1, n),
		n.increment(r, e),
		() => {
			(t?.update_pending_count(-1, n), n.decrement(r, e));
		}
	);
}
function qt(e) {
	var t = 2 | T;
	return (q !== null && (q.f |= fe), { ctx: M, deps: null, effects: null, equals: lt, f: t, fn: e, reactions: null, rv: 0, v: E, wv: 0, parent: q, ac: null });
}
var Jt = Symbol(`obsolete`);
function Yt(e, t, n) {
	let r = q;
	r === null && Me();
	var i = void 0,
		a = An(E),
		o = !W,
		s = new Set();
	return (
		hr(() => {
			var t = q,
				n = ne();
			i = n.promise;
			try {
				Promise.resolve(e())
					.then(n.resolve, (e) => {
						e !== De && n.reject(e);
					})
					.finally(Gt);
			} catch (e) {
				(n.reject(e), Gt());
			}
			var c = F;
			if (o) {
				if (t.f & 32768) var l = Kt();
				if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(Jt);
				else for (let e of s.values()) e.reject(Jt);
				(s.add(n), c.async_deriveds.set(t, n));
			}
			let u = (e, t = void 0) => {
				(l?.(), s.delete(n), t !== Jt && (c.activate(), t ? ((a.f |= ve), Nn(a, t)) : (a.f & 8388608 && (a.f ^= ve), Nn(a, e)), c.deactivate()));
			};
			n.promise.then(u, (e) => u(null, e || `unknown`));
		}),
		cr(() => {
			for (let e of s) e.reject(Jt);
		}),
		new Promise((e) => {
			function t(n) {
				function r() {
					n === i ? e(a) : t(i);
				}
				n.then(r, r);
			}
			t(i);
		})
	);
}
function Xt(e) {
	let t = qt(e);
	return (j || Fr(t), t);
}
function Zt(e) {
	let t = qt(e);
	return ((t.equals = dt), t);
}
function Qt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) U(t[n]);
	}
}
function $t(e) {
	var t,
		n = q,
		r = e.parent;
	if (!Mr && r !== null && e.v !== E && r.f & 24576) return ($e(), e.v);
	J(r);
	try {
		((e.f &= ~he), Qt(e), (t = Wr(e)));
	} finally {
		J(n);
	}
	return t;
}
function en(e) {
	var t = $t(e);
	if (!e.equals(t) && ((e.wv = Vr()), (!F?.is_fork || e.deps === null) && (F === null ? (e.v = t) : (F.capture(e, t, !0), on?.capture(e, t, !0)), e.deps === null))) {
		P(e, w);
		return;
	}
	Mr || (I === null ? jt(e) : (sr() || F?.is_fork) && I.set(e, t));
}
function tn(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(De), t.fn !== null && (t.teardown = C), (t.ac = null), Kr(t, 0), xr(t));
}
function nn(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && qr(t);
}
var rn = null,
	an = null,
	F = null,
	on = null,
	I = null,
	sn = null,
	cn = !1,
	ln = !1,
	un = null,
	dn = null,
	fn = 0,
	pn = 1,
	mn = class e {
		id = pn++;
		#e = !1;
		linked = !0;
		#t = null;
		#n = null;
		async_deriveds = new Map();
		current = new Map();
		previous = new Map();
		#r = new Set();
		#i = new Set();
		#a = 0;
		#o = new Map();
		#s = null;
		#c = [];
		#l = [];
		#u = new Set();
		#d = new Set();
		#f = new Map();
		#p = new Set();
		is_fork = !1;
		#m = !1;
		constructor() {
			(an === null ? (rn = an = this) : ((an.#n = this), (this.#t = an)), (an = this));
		}
		#h() {
			if (this.is_fork) return !0;
			for (let n of this.#o.keys()) {
				for (var e = n, t = !1; e.parent !== null; ) {
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
			(this.#f.has(e) || this.#f.set(e, { d: [], m: [] }), this.#p.delete(e));
		}
		unskip_effect(e, t = (e) => this.schedule(e)) {
			var n = this.#f.get(e);
			if (n) {
				this.#f.delete(e);
				for (var r of n.d) (P(r, T), t(r));
				for (r of n.m) (P(r, oe), t(r));
			}
			this.#p.add(e);
		}
		#g() {
			((this.#e = !0), fn++ > 1e3 && (this.#S(), gn()));
			for (let e of this.#u) (this.#d.delete(e), P(e, T), this.schedule(e));
			for (let e of this.#d) (P(e, oe), this.schedule(e));
			let t = this.#c;
			((this.#c = []), this.apply());
			var n = (un = []),
				r = [],
				i = (dn = []);
			for (let e of t)
				try {
					this.#_(e, n, r);
				} catch (t) {
					throw (wn(e), this.#h() || this.discard(), t);
				}
			if (((F = null), i.length > 0)) {
				var a = e.ensure();
				for (let e of i) a.schedule(e);
			}
			if (((un = null), (dn = null), this.#h())) {
				(this.#b(r), this.#b(n));
				for (let [e, t] of this.#f) Cn(e, t);
				i.length > 0 && F.#g();
				return;
			}
			let o = this.#v();
			if (o) {
				(this.#b(r), this.#b(n), o.#y(this));
				return;
			}
			(this.#u.clear(), this.#d.clear());
			for (let e of this.#r) e(this);
			(this.#r.clear(), (on = this), vn(r), vn(n), (on = null), this.#s?.resolve());
			var s = F;
			if ((this.#a === 0 && (this.#c.length === 0 || s !== null) && (this.#S(), j && (this.#x(), (F = s))), this.#c.length > 0))
				if (s !== null) {
					let e = s;
					e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
				} else s = this;
			s !== null && s.#g();
		}
		#_(e, t, n) {
			e.f ^= w;
			for (var r = e.first; r !== null; ) {
				var i = r.f,
					a = (i & 96) != 0;
				if (!((a && i & 1024) || i & 8192 || this.#f.has(r)) && r.fn !== null) {
					a ? (r.f ^= w) : i & 4 ? t.push(r) : j && i & 16777224 ? n.push(r) : Hr(r) && (i & 16 && this.#d.add(r), qr(r));
					var o = r.first;
					if (o !== null) {
						r = o;
						continue;
					}
				}
				for (; r !== null; ) {
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
			for (var e = this.#t; e !== null; ) {
				if (!e.is_fork) {
					for (let [t, [, n]] of this.current) if (e.current.has(t) && !n) return e;
				}
				e = e.#t;
			}
			return null;
		}
		#y(e) {
			for (let [t, n] of e.current) (!this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n));
			for (let [t, n] of e.async_deriveds) {
				let e = this.async_deriveds.get(t);
				e && n.promise.then(e.resolve).catch(e.reject);
			}
			(e.async_deriveds.clear(), this.transfer_effects(e.#u, e.#d));
			let t = (e) => {
				var n = e.reactions;
				if (n !== null)
					for (let e of n) {
						var r = e.f;
						if (r & 2) t(e);
						else {
							var i = e;
							r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), P(i, T), this.schedule(i));
						}
					}
			};
			for (let e of this.current.keys()) t(e);
			(this.oncommit(() => e.discard()), e.#S(), (F = this), this.#g());
		}
		#b(e) {
			for (var t = 0; t < e.length; t += 1) Nt(e[t], this.#u, this.#d);
		}
		capture(e, t, n = !1) {
			(e.v !== E && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), I?.set(e, t)), this.is_fork || (e.v = t));
		}
		activate() {
			F = this;
		}
		deactivate() {
			((F = null), (I = null));
		}
		flush() {
			try {
				((ln = !0), (F = this), this.#g());
			} finally {
				((fn = 0), (sn = null), (un = null), (dn = null), (ln = !1), (F = null), (I = null), Dn.clear());
			}
		}
		discard() {
			for (let e of this.#i) e(this);
			this.#i.clear();
			for (let e of this.async_deriveds.values()) e.reject(Jt);
			(this.#S(), this.#s?.resolve());
		}
		register_created_effect(e) {
			this.#l.push(e);
		}
		#x() {
			for (let u = rn; u !== null; u = u.#n) {
				var e = u.id < this.id,
					t = [];
				for (let [r, [i, a]] of this.current) {
					if (u.current.has(r)) {
						var n = u.current.get(r)[0];
						if (e && i !== n) u.current.set(r, [i, a]);
						else continue;
					}
					t.push(r);
				}
				if (e)
					for (let [e, t] of this.async_deriveds) {
						let n = u.async_deriveds.get(e);
						n && t.promise.then(n.resolve).catch(n.reject);
					}
				var r = [...u.current.keys()].filter((e) => !u.current.get(e)[1]);
				if (!(!u.#e || r.length === 0)) {
					var i = r.filter((e) => !this.current.has(e));
					if (i.length === 0) e && u.discard();
					else if (t.length > 0) {
						if (e)
							for (let e of this.#p)
								u.unskip_effect(e, (e) => {
									e.f & 4194320 ? u.schedule(e) : u.#b([e]);
								});
						u.activate();
						var a = new Set(),
							o = new Map();
						for (var s of t) yn(s, i, a, o);
						o = new Map();
						var c = [...u.current]
							.filter(([e, t]) => {
								let n = this.current.get(e);
								return n ? n[0] !== t[0] || n[1] !== t[1] : !0;
							})
							.map(([e]) => e);
						if (c.length > 0) for (let e of this.#l) !(e.f & 155648) && xn(e, c, o) && (e.f & 4194320 ? (P(e, T), u.schedule(e)) : u.#u.add(e));
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
			if (((this.#a += 1), e)) {
				let e = this.#o.get(t) ?? 0;
				this.#o.set(t, e + 1);
			}
		}
		decrement(e, t) {
			if ((--this.#a, e)) {
				let e = this.#o.get(t) ?? 0;
				e === 1 ? this.#o.delete(t) : this.#o.set(t, e - 1);
			}
			this.#m ||
				((this.#m = !0),
				N(() => {
					((this.#m = !1), this.linked && this.flush());
				}));
		}
		transfer_effects(e, t) {
			for (let t of e) this.#u.add(t);
			for (let e of t) this.#d.add(e);
			(e.clear(), t.clear());
		}
		oncommit(e) {
			this.#r.add(e);
		}
		ondiscard(e) {
			this.#i.add(e);
		}
		settled() {
			return (this.#s ??= ne()).promise;
		}
		static ensure() {
			if (F === null) {
				let t = (F = new e());
				!ln &&
					!cn &&
					N(() => {
						t.#e || t.flush();
					});
			}
			return F;
		}
		apply() {
			if (!j || (!this.is_fork && this.#t === null && this.#n === null)) {
				I = null;
				return;
			}
			I = new Map();
			for (let [e, [t]] of this.current) I.set(e, t);
			for (let t = rn; t !== null; t = t.#n)
				if (!(t === this || t.is_fork)) {
					var e = !1;
					if (t.id < this.id) {
						for (let [n, [, r]] of t.current)
							if (!r && this.current.has(n)) {
								e = !0;
								break;
							}
					}
					if (!e) for (let [e, n] of t.previous) I.has(e) || I.set(e, n);
				}
		}
		schedule(e) {
			if (((sn = e), e.b?.is_pending && e.f & 16777228 && !(e.f & 32768))) {
				e.b.defer_effect(e);
				return;
			}
			for (var t = e; t.parent !== null; ) {
				t = t.parent;
				var n = t.f;
				if (un !== null && t === q && (j || ((W === null || !(W.f & 2)) && !It))) return;
				if (n & 96) {
					if (!(n & 1024)) return;
					t.f ^= w;
				}
			}
			this.#c.push(t);
		}
		#S() {
			if (this.linked) {
				var e = this.#t,
					t = this.#n;
				(e === null ? (rn = t) : (e.#n = t), t === null ? (an = e) : (t.#t = e), (this.linked = !1));
			}
		}
	};
function hn(e) {
	var t = cn;
	cn = !0;
	try {
		var n;
		for (e && (F !== null && !F.is_fork && F.flush(), (n = e())); ; ) {
			if ((Dt(), F === null)) return n;
			F.flush();
		}
	} finally {
		cn = t;
	}
}
function gn() {
	try {
		Le();
	} catch (e) {
		kt(e, sn);
	}
}
var _n = null;
function vn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t; ) {
			var r = e[n++];
			if (
				!(r.f & 24576) &&
				Hr(r) &&
				((_n = new Set()), qr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && wr(r), _n?.size > 0)
			) {
				Dn.clear();
				for (let e of _n) {
					if (e.f & 24576) continue;
					let t = [e],
						n = e.parent;
					for (; n !== null; ) (_n.has(n) && (_n.delete(n), t.push(n)), (n = n.parent));
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || qr(n);
					}
				}
				_n.clear();
			}
		}
		_n = null;
	}
}
function yn(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null))
		for (let i of e.reactions) {
			let e = i.f;
			e & 2 ? yn(i, t, n, r) : e & 4194320 && !(e & 2048) && xn(i, t, r) && (P(i, T), Sn(i));
		}
}
function bn(e, t) {
	if (e.reactions !== null)
		for (let n of e.reactions) {
			let e = n.f;
			e & 2 ? bn(n, t) : e & 131072 && (P(n, T), t.add(n));
		}
}
function xn(e, t, n) {
	let r = n.get(e);
	if (r !== void 0) return r;
	if (e.deps !== null)
		for (let r of e.deps) {
			if (f.call(t, r)) return !0;
			if (r.f & 2 && xn(r, t, n)) return (n.set(r, !0), !0);
		}
	return (n.set(e, !1), !1);
}
function Sn(e) {
	F.schedule(e);
}
function Cn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		(e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), P(e, w));
		for (var n = e.first; n !== null; ) (Cn(n, t), (n = n.next));
	}
}
function wn(e) {
	P(e, w);
	for (var t = e.first; t !== null; ) (wn(t), (t = t.next));
}
function Tn(e) {
	(j || ke(`fork`), F !== null && ze());
	var t = mn.ensure();
	((t.is_fork = !0), (I = new Map()));
	var n = !1,
		r = t.settled();
	return (
		hn(e),
		{
			commit: async () => {
				if (n) {
					await r;
					return;
				}
				(t.linked || Re(), (n = !0), (t.is_fork = !1));
				for (var [e, [i]] of t.current) ((e.v = i), (e.wv = Vr()));
				(hn(() => {
					var e = new Set();
					for (var n of t.current.keys()) bn(n, e);
					(On(e), Pn());
				}),
					t.flush(),
					await r);
			},
			discard: () => {
				for (var e of t.current.keys()) e.wv = Vr();
				!n && t.linked && t.discard();
			},
		}
	);
}
var En = new Set(),
	Dn = new Map();
function On(e) {
	En = e;
}
var kn = !1;
function An(e, t) {
	return { f: 0, v: e, reactions: null, equals: lt, rv: 0, wv: 0 };
}
function jn(e, t) {
	let n = An(e, t);
	return (Fr(n), n);
}
function Mn(e, t = !1, n = !0) {
	let r = An(e);
	return (t || (r.equals = dt), ft && n && M !== null && M.l !== null && (M.l.s ??= []).push(r), r);
}
function L(e, t, n = !1) {
	return (W !== null && (!G || W.f & 131072) && St() && W.f & 4325394 && (Pr === null || !Pr.has(e)) && qe(), Nn(e, n ? Rn(t) : t, dn));
}
function Nn(e, t, n = null) {
	if (!e.equals(t)) {
		Dn.set(e, Mr ? t : e.v);
		var r = mn.ensure();
		if ((r.capture(e, t), e.f & 2)) {
			let t = e;
			(e.f & 2048 && $t(t), I === null && jt(t));
		}
		((e.wv = Vr()), Ln(e, T, n), St() && q !== null && q.f & 1024 && !(q.f & 96) && (Z === null ? Ir([e]) : Z.push(e)), !r.is_fork && En.size > 0 && !kn && Pn());
	}
	return t;
}
function Pn() {
	kn = !1;
	for (let e of En) {
		e.f & 1024 && P(e, oe);
		let t;
		try {
			t = Hr(e);
		} catch {
			t = !0;
		}
		t && qr(e);
	}
	En.clear();
}
function Fn(e, t = 1) {
	var n = Q(e),
		r = t === 1 ? n++ : n--;
	return (L(e, n), r);
}
function In(e) {
	L(e, e.v + 1);
}
function Ln(e, t, n) {
	var r = e.reactions;
	if (r !== null)
		for (var i = St(), a = r.length, o = 0; o < a; o++) {
			var s = r[o],
				c = s.f;
			if (!(!i && s === q)) {
				var l = (c & T) === 0;
				if ((l && P(s, t), c & 131072)) En.add(s);
				else if (c & 2) {
					var u = s;
					(I?.delete(u), c & 65536 || (c & 512 && (q === null || !(q.f & 2097152)) && (s.f |= he), Ln(u, oe, n)));
				} else if (l) {
					var d = s;
					(c & 16 && _n !== null && _n.add(d), n === null ? Sn(d) : n.push(d));
				}
			}
		}
}
function Rn(e) {
	if (typeof e != `object` || !e || ye in e) return e;
	let t = b(e);
	if (t !== v && t !== y) return e;
	var n = new Map(),
		r = u(e),
		i = jn(0),
		a = null,
		o = zr,
		s = (e) => {
			if (zr === o) return e();
			var t = W,
				n = zr;
			(K(null), Br(o));
			var r = e();
			return (K(t), Br(n), r);
		};
	return (
		r && n.set(`length`, jn(e.length, a)),
		new Proxy(e, {
			defineProperty(e, t, r) {
				(!(`value` in r) || r.configurable === !1 || r.enumerable === !1 || r.writable === !1) && Ge();
				var i = n.get(t);
				return (
					i === void 0
						? s(() => {
								var e = jn(r.value, a);
								return (n.set(t, e), e);
							})
						: L(i, r.value, !0),
					!0
				);
			},
			deleteProperty(e, t) {
				var r = n.get(t);
				if (r === void 0) {
					if (t in e) {
						let e = s(() => jn(E, a));
						(n.set(t, e), In(i));
					}
				} else (L(r, E), In(i));
				return !0;
			},
			get(t, r, i) {
				if (r === ye) return e;
				var o = n.get(r),
					c = r in t;
				if ((o === void 0 && (!c || g(t, r)?.writable) && ((o = s(() => jn(Rn(c ? t[r] : E), a))), n.set(r, o)), o !== void 0)) {
					var l = Q(o);
					return l === E ? void 0 : l;
				}
				return Reflect.get(t, r, i);
			},
			getOwnPropertyDescriptor(e, t) {
				var r = Reflect.getOwnPropertyDescriptor(e, t);
				if (r && `value` in r) {
					var i = n.get(t);
					i && (r.value = Q(i));
				} else if (r === void 0) {
					var a = n.get(t),
						o = a?.v;
					if (a !== void 0 && o !== E) return { enumerable: !0, configurable: !0, value: o, writable: !0 };
				}
				return r;
			},
			has(e, t) {
				if (t === ye) return !0;
				var r = n.get(t),
					i = (r !== void 0 && r.v !== E) || Reflect.has(e, t);
				return (r !== void 0 || (q !== null && (!i || g(e, t)?.writable))) && (r === void 0 && ((r = s(() => jn(i ? Rn(e[t]) : E, a))), n.set(t, r)), Q(r) === E) ? !1 : i;
			},
			set(e, t, o, c) {
				var l = n.get(t),
					u = t in e;
				if (r && t === `length`)
					for (var d = o; d < l.v; d += 1) {
						var f = n.get(d + ``);
						f === void 0 ? d in e && ((f = s(() => jn(E, a))), n.set(d + ``, f)) : L(f, E);
					}
				if (l === void 0) (!u || g(e, t)?.writable) && ((l = s(() => jn(void 0, a))), L(l, Rn(o)), n.set(t, l));
				else {
					u = l.v !== E;
					var p = s(() => Rn(o));
					L(l, p);
				}
				var m = Reflect.getOwnPropertyDescriptor(e, t);
				if ((m?.set && m.set.call(c, o), !u)) {
					if (r && typeof t == `string`) {
						var h = n.get(`length`),
							_ = Number(t);
						Number.isInteger(_) && _ >= h.v && L(h, _ + 1);
					}
					In(i);
				}
				return !0;
			},
			ownKeys(e) {
				Q(i);
				var t = Reflect.ownKeys(e).filter((e) => {
					var t = n.get(e);
					return t === void 0 || t.v !== E;
				});
				for (var [r, a] of n) a.v !== E && !(r in e) && t.push(r);
				return t;
			},
			setPrototypeOf() {
				Ke();
			},
		})
	);
}
function zn(e) {
	try {
		if (typeof e == `object` && e && ye in e) return e[ye];
	} catch {}
	return e;
}
function Bn(e, t) {
	return Object.is(zn(e), zn(t));
}
new Set([`copyWithin`, `fill`, `pop`, `push`, `reverse`, `shift`, `sort`, `splice`, `unshift`]);
var Vn, Hn, Un, Wn;
function Gn() {
	if (Vn === void 0) {
		((Vn = window), (Hn = /Firefox/.test(navigator.userAgent)));
		var e = Element.prototype,
			t = Node.prototype,
			n = Text.prototype;
		((Un = g(t, `firstChild`).get), (Wn = g(t, `nextSibling`).get), x(e) && ((e[Ce] = void 0), (e[Se] = null), (e[we] = void 0), (e.__e = void 0)), x(n) && (n[Te] = void 0));
	}
}
function R(e = ``) {
	return document.createTextNode(e);
}
function z(e) {
	return Un.call(e);
}
function B(e) {
	return Wn.call(e);
}
function Kn(e, t) {
	if (!D) return z(e);
	var n = z(k);
	if (n === null) n = k.appendChild(R());
	else if (t && n.nodeType !== 3) {
		var r = R();
		return (n?.before(r), A(r), r);
	}
	return (t && Qn(n), A(n), n);
}
function qn(e, t = !1) {
	if (!D) {
		var n = z(e);
		return n instanceof Comment && n.data === `` ? B(n) : n;
	}
	if (t) {
		if (k?.nodeType !== 3) {
			var r = R();
			return (k?.before(r), A(r), r);
		}
		Qn(k);
	}
	return k;
}
function Jn(e, t = 1, n = !1) {
	let r = D ? k : e;
	for (var i; t--; ) ((i = r), (r = B(r)));
	if (!D) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = R();
			return (r === null ? i?.after(a) : r.before(a), A(a), a);
		}
		Qn(r);
	}
	return (A(r), r);
}
function Yn(e) {
	e.textContent = ``;
}
function Xn() {
	return !j || _n !== null ? !1 : (q.f & le) !== 0;
}
function Zn(e, t, n) {
	return t == null || t === `http://www.w3.org/1999/xhtml`
		? n
			? document.createElement(e, { is: n })
			: document.createElement(e)
		: n
			? document.createElementNS(t, e, { is: n })
			: document.createElementNS(t, e);
}
function Qn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3; ) (t.remove(), (e.nodeValue += t.nodeValue), (t = e.nextSibling));
}
function $n(e, t) {
	if (t) {
		let t = document.body;
		((e.autofocus = !0),
			N(() => {
				document.activeElement === t && e.focus();
			}));
	}
}
var er = !1;
function tr() {
	er ||
		((er = !0),
		document.addEventListener(
			`reset`,
			(e) => {
				Promise.resolve().then(() => {
					if (!e.defaultPrevented) for (let t of e.target.elements) t[Ee]?.();
				});
			},
			{ capture: !0 },
		));
}
function nr(e, t, n, r = !0) {
	r && n();
	for (var i of t) e.addEventListener(i, n);
	cr(() => {
		for (var r of t) e.removeEventListener(r, n);
	});
}
function rr(e) {
	var t = W,
		n = q;
	(K(null), J(null));
	try {
		return e();
	} finally {
		(K(t), J(n));
	}
}
function ir(e, t, n, r = n) {
	e.addEventListener(t, () => rr(n));
	let i = e[Ee];
	(i
		? (e[Ee] = () => {
				(i(), r(!0));
			})
		: (e[Ee] = () => r(!0)),
		tr());
}
function ar(e) {
	(q === null && (W === null && Ie(e), Fe()), Mr && Pe(e));
}
function or(e, t) {
	var n = t.last;
	n === null ? (t.last = t.first = e) : ((n.next = e), (e.prev = n), (t.last = e));
}
function V(e, t) {
	var n = q;
	n !== null && n.f & 8192 && (e |= se);
	var r = { ctx: M, deps: null, nodes: null, f: e | T | 512, first: null, fn: t, last: null, next: null, parent: n, b: n && n.b, prev: null, teardown: null, wv: 0, ac: null };
	F?.register_created_effect(r);
	var i = r;
	if (e & 4) un === null ? mn.ensure().schedule(r) : un.push(r);
	else if (t !== null) {
		try {
			qr(r);
		} catch (e) {
			throw (U(r), e);
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && ((i = i.first), e & 16 && e & 65536 && i !== null && (i.f |= de));
	}
	if (i !== null && ((i.parent = n), n !== null && or(i, n), W !== null && W.f & 2 && !(e & 64))) {
		var a = W;
		(a.effects ??= []).push(i);
	}
	return r;
}
function sr() {
	return W !== null && !G;
}
function cr(e) {
	let t = V(8, null);
	return (P(t, w), (t.teardown = e), t);
}
function lr(e) {
	ar(`$effect`);
	var t = q.f;
	if (!W && t & 32 && M !== null && !M.i) {
		var n = M;
		(n.e ??= []).push(e);
	} else return ur(e);
}
function ur(e) {
	return V(4 | pe, e);
}
function dr(e) {
	return (ar(`$effect.pre`), V(8 | pe, e));
}
function fr(e) {
	mn.ensure();
	let t = V(64 | fe, e);
	return () => {
		U(t);
	};
}
function pr(e) {
	mn.ensure();
	let t = V(64 | fe, e);
	return (e = {}) =>
		new Promise((n) => {
			e.outro
				? Tr(t, () => {
						(U(t), n(void 0));
					})
				: (U(t), n(void 0));
		});
}
function mr(e) {
	return V(4, e);
}
function hr(e) {
	return V(_e | fe, e);
}
function gr(e, t = 0) {
	return V(8 | t, e);
}
function _r(e, t = [], n = [], r = []) {
	Ut(r, t, n, (t) => {
		V(8, () => {
			e(...t.map(Q));
		});
	});
}
function vr(e, t = 0) {
	return V(16 | t, e);
}
function yr(e, t = 0) {
	return V(ae | t, e);
}
function H(e) {
	return V(32 | fe, e);
}
function br(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Mr,
			n = W;
		(Nr(!0), K(null));
		try {
			t.call(null);
		} finally {
			(Nr(e), K(n));
		}
	}
}
function xr(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null; ) {
		let e = n.ac;
		e !== null &&
			rr(() => {
				e.abort(De);
			});
		var r = n.next;
		(n.f & 64 ? (n.parent = null) : U(n, t), (n = r));
	}
}
function Sr(e) {
	for (var t = e.first; t !== null; ) {
		var n = t.next;
		(t.f & 32 || U(t), (t = n));
	}
}
function U(e, t = !0) {
	var n = !1;
	((t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Cr(e.nodes.start, e.nodes.end), (n = !0)), (e.f |= ue), xr(e, t && !n), Kr(e, 0));
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	(br(e), (e.f ^= ue), (e.f |= ce));
	var i = e.parent;
	(i !== null && i.first !== null && wr(e), (e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null));
}
function Cr(e, t) {
	for (; e !== null; ) {
		var n = e === t ? null : B(e);
		(e.remove(), (e = n));
	}
}
function wr(e) {
	var t = e.parent,
		n = e.prev,
		r = e.next;
	(n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n)));
}
function Tr(e, t, n = !0) {
	var r = [];
	Er(e, r, !0);
	var i = () => {
			(n && U(e), t && t());
		},
		a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Er(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= se;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null; ) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || ((i.f & 32) != 0 && (e.f & 16) != 0);
				Er(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Dr(e) {
	Or(e, !0);
}
function Or(e, t) {
	if (e.f & 8192) {
		((e.f ^= se), e.f & 1024 || (P(e, T), mn.ensure().schedule(e)));
		for (var n = e.first; n !== null; ) {
			var r = n.next,
				i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			(Or(n, i ? t : !1), (n = r));
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function kr(e, t) {
	if (e.nodes)
		for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
			var i = n === r ? null : B(n);
			(t.append(n), (n = i));
		}
}
var Ar = null,
	jr = !1,
	Mr = !1;
function Nr(e) {
	Mr = e;
}
var W = null,
	G = !1;
function K(e) {
	W = e;
}
var q = null;
function J(e) {
	q = e;
}
var Pr = null;
function Fr(e) {
	W !== null && (!j || W.f & 2) && (Pr ??= new Set()).add(e);
}
var Y = null,
	X = 0,
	Z = null;
function Ir(e) {
	Z = e;
}
var Lr = 1,
	Rr = 0,
	zr = Rr;
function Br(e) {
	zr = e;
}
function Vr() {
	return ++Lr;
}
function Hr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if ((t & 2 && (e.f &= ~he), t & 4096)) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if ((Hr(a) && en(a), a.wv > e.wv)) return !0;
		}
		t & 512 && I === null && P(e, w);
	}
	return !1;
}
function Ur(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(!j && Pr !== null && Pr.has(e)))
		for (var i = 0; i < r.length; i++) {
			var a = r[i];
			a.f & 2 ? Ur(a, t, !1) : t === a && (n ? P(a, T) : a.f & 1024 && P(a, oe), Sn(a));
		}
}
function Wr(e) {
	var t = Y,
		n = X,
		r = Z,
		i = W,
		a = Pr,
		o = M,
		s = G,
		c = zr,
		l = e.f;
	((Y = null),
		(X = 0),
		(Z = null),
		(W = l & 96 ? null : e),
		(Pr = null),
		mt(e.ctx),
		(G = !1),
		(zr = ++Rr),
		e.ac !== null &&
			(rr(() => {
				e.ac.abort(De);
			}),
			(e.ac = null)));
	try {
		e.f |= ge;
		var u = e.fn,
			d = u();
		e.f |= le;
		var f = e.deps,
			p = F?.is_fork;
		if (Y !== null) {
			var m;
			if ((p || Kr(e, X), f !== null && X > 0)) for (f.length = X + Y.length, m = 0; m < Y.length; m++) f[X + m] = Y[m];
			else e.deps = f = Y;
			if (sr() && e.f & 512) for (m = X; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && X < f.length && (Kr(e, X), (f.length = X));
		if (St() && Z !== null && !G && f !== null && !(e.f & 6146)) for (m = 0; m < Z.length; m++) Ur(Z[m], e);
		if (i !== null && i !== e) {
			if ((Rr++, i.deps !== null)) for (let e = 0; e < n; e += 1) i.deps[e].rv = Rr;
			if (t !== null) for (let e of t) e.rv = Rr;
			Z !== null && (r === null ? (r = Z) : r.push(...Z));
		}
		return (e.f & 8388608 && (e.f ^= ve), d);
	} catch (e) {
		return Ot(e);
	} finally {
		((e.f ^= ge), (Y = t), (X = n), (Z = r), (W = i), (Pr = a), mt(o), (G = s), (zr = c));
	}
}
function Gr(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = d.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? (n = t.reactions = null) : ((n[r] = n[i]), n.pop());
		}
	}
	if (n === null && t.f & 2 && (Y === null || !f.call(Y, t))) {
		var a = t;
		(a.f & 512 && ((a.f ^= 512), (a.f &= ~he)), a.v !== E && jt(a), tn(a), Kr(a, 0));
	}
}
function Kr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Gr(e, n[r]);
}
function qr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		P(e, w);
		var n = q,
			r = jr;
		((q = e), (jr = !0));
		try {
			(t & 16777232 ? Sr(e) : xr(e), br(e));
			var i = Wr(e);
			((e.teardown = typeof i == `function` ? i : null), (e.wv = Lr));
		} finally {
			((jr = r), (q = n));
		}
	}
}
async function Jr() {
	if (j)
		return new Promise((e) => {
			(requestAnimationFrame(() => e()), setTimeout(() => e()));
		});
	(await Promise.resolve(), hn());
}
function Yr() {
	return mn.ensure().settled();
}
function Q(e) {
	var t = (e.f & 2) != 0;
	if ((Ar?.add(e), W !== null && !G && !(q !== null && q.f & 16384) && (Pr === null || !Pr.has(e)))) {
		var n = W.deps;
		if (W.f & 2097152) e.rv < Rr && ((e.rv = Rr), Y === null && n !== null && n[X] === e ? X++ : Y === null ? (Y = [e]) : Y.push(e));
		else {
			((W.deps ??= []), f.call(W.deps, e) || W.deps.push(e));
			var r = e.reactions;
			r === null ? (e.reactions = [W]) : f.call(r, W) || r.push(W);
		}
	}
	if (Mr && Dn.has(e)) return Dn.get(e);
	if (t) {
		var i = e;
		if (Mr) {
			var a = i.v;
			return (((!(i.f & 1024) && i.reactions !== null) || Zr(i)) && (a = $t(i)), Dn.set(i, a), a);
		}
		var o = (i.f & 512) == 0 && !G && W !== null && (jr || (W.f & 512) != 0),
			s = (i.f & le) === 0;
		(Hr(i) && (o && (i.f |= 512), en(i)), o && !s && (nn(i), Xr(i)));
	}
	if (I?.has(e)) return I.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Xr(e) {
	if (((e.f |= 512), e.deps !== null)) for (let t of e.deps) ((t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (nn(t), Xr(t)));
}
function Zr(e) {
	if (e.v === E) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Dn.has(t) || (t.f & 2 && Zr(t))) return !0;
	return !1;
}
function Qr(e) {
	var t = G;
	try {
		return ((G = !0), e());
	} finally {
		G = t;
	}
}
function $r(e) {
	if (!(typeof e != `object` || !e || e instanceof EventTarget)) {
		if (ye in e) ei(e);
		else if (!Array.isArray(e))
			for (let t in e) {
				let n = e[t];
				typeof n == `object` && n && ye in n && ei(n);
			}
	}
}
function ei(e, t = new Set()) {
	if (typeof e == `object` && e && !(e instanceof EventTarget) && !t.has(e)) {
		(t.add(e), e instanceof Date && e.getTime());
		for (let n in e)
			try {
				ei(e[n], t);
			} catch {}
		let n = b(e);
		if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
			let t = _(n);
			for (let n in t) {
				let r = t[n].get;
				if (r)
					try {
						r.call(e);
					} catch {}
			}
		}
	}
}
function ti(e) {
	return e.endsWith(`capture`) && e !== `gotpointercapture` && e !== `lostpointercapture`;
}
var ni = [
	`beforeinput`,
	`click`,
	`change`,
	`dblclick`,
	`contextmenu`,
	`focusin`,
	`focusout`,
	`input`,
	`keydown`,
	`keyup`,
	`mousedown`,
	`mousemove`,
	`mouseout`,
	`mouseover`,
	`mouseup`,
	`pointerdown`,
	`pointermove`,
	`pointerout`,
	`pointerover`,
	`pointerup`,
	`touchend`,
	`touchmove`,
	`touchstart`,
];
function ri(e) {
	return ni.includes(e);
}
var ii =
		`allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback`.split(
			`.`,
		),
	ai = {
		formnovalidate: `formNoValidate`,
		ismap: `isMap`,
		nomodule: `noModule`,
		playsinline: `playsInline`,
		readonly: `readOnly`,
		defaultvalue: `defaultValue`,
		defaultchecked: `defaultChecked`,
		srcobject: `srcObject`,
		novalidate: `noValidate`,
		allowfullscreen: `allowFullscreen`,
		disablepictureinpicture: `disablePictureInPicture`,
		disableremoteplayback: `disableRemotePlayback`,
	};
function oi(e) {
	return ((e = e.toLowerCase()), ai[e] ?? e);
}
[...ii];
var si = [`touchstart`, `touchmove`];
function ci(e) {
	return si.includes(e);
}
var li = Symbol(`events`),
	ui = new Set(),
	di = new Set();
function fi(e, t, n, r = {}) {
	function i(e) {
		if ((r.capture || _i.call(t, e), !e.cancelBubble)) return rr(() => n?.call(this, e));
	}
	return (
		e.startsWith(`pointer`) || e.startsWith(`touch`) || e === `wheel`
			? N(() => {
					t.addEventListener(e, i, r);
				})
			: t.addEventListener(e, i, r),
		i
	);
}
function pi(e, t, n, r, i) {
	var a = { capture: r, passive: i },
		o = fi(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) &&
		cr(() => {
			t.removeEventListener(e, o, a);
		});
}
function mi(e, t, n) {
	(t[li] ??= {})[e] = n;
}
function hi(e) {
	for (var t = 0; t < e.length; t++) ui.add(e[t]);
	for (var n of di) n(e);
}
var gi = null;
function _i(e) {
	var t = this,
		n = t.ownerDocument,
		r = e.type,
		i = e.composedPath?.() || [],
		a = i[0] || e.target;
	gi = e;
	var o = 0,
		s = gi === e && e[li];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[li] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (((a = i[o] || e.target), a !== t)) {
		h(e, `currentTarget`, {
			configurable: !0,
			get() {
				return a || n;
			},
		});
		var u = W,
			d = q;
		(K(null), J(null));
		try {
			for (var f, p = []; a !== null && a !== t; ) {
				try {
					var m = a[li]?.[r];
					m != null && (!a.disabled || e.target === a) && m.call(a, e);
				} catch (e) {
					f ? p.push(e) : (f = e);
				}
				if (e.cancelBubble) break;
				(o++, (a = o < i.length ? i[o] : null));
			}
			if (f) {
				for (let e of p)
					queueMicrotask(() => {
						throw e;
					});
				throw f;
			}
		} finally {
			((e[li] = t), delete e.currentTarget, K(u), J(d));
		}
	}
}
var vi = globalThis?.window?.trustedTypes && globalThis.window.trustedTypes.createPolicy(`svelte-trusted-html`, { createHTML: (e) => e });
function yi(e) {
	return vi?.createHTML(e) ?? e;
}
function bi(e) {
	var t = Zn(`template`);
	return ((t.innerHTML = yi(e.replaceAll(`<!>`, `<!---->`))), t.content);
}
function $(e, t) {
	var n = q;
	n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
function xi(e, t) {
	var n = (t & 1) != 0,
		r = (t & 2) != 0,
		i,
		a = !e.startsWith(`<!>`);
	return () => {
		if (D) return ($(k, null), k);
		i === void 0 && ((i = bi(a ? e : `<!>` + e)), n || (i = z(i)));
		var t = r || Hn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = z(t),
				s = t.lastChild;
			$(o, s);
		} else $(t, t);
		return t;
	};
}
function Si(e, t, n = `svg`) {
	var r = !e.startsWith(`<!>`),
		i = (t & 1) != 0,
		a = `<${n}>${r ? e : `<!>` + e}</${n}>`,
		o;
	return () => {
		if (D) return ($(k, null), k);
		if (!o) {
			var e = z(bi(a));
			if (i) for (o = document.createDocumentFragment(); z(e); ) o.appendChild(z(e));
			else o = z(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = z(t),
				r = t.lastChild;
			$(n, r);
		} else $(t, t);
		return t;
	};
}
function Ci(e, t) {
	return Si(e, t, `svg`);
}
function wi(e = ``) {
	if (!D) {
		var t = R(e + ``);
		return ($(t, t), t);
	}
	var n = k;
	return (n.nodeType === 3 ? Qn(n) : (n.before((n = R())), A(n)), $(n, n), n);
}
function Ti() {
	if (D) return ($(k, null), k);
	var e = document.createDocumentFragment(),
		t = document.createComment(``),
		n = R();
	return (e.append(t, n), $(t, n), e);
}
function Ei(e, t) {
	if (D) {
		var n = q;
		((!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = k), it());
		return;
	}
	e !== null && e.before(t);
}
var Di = !0;
function Oi(e, t) {
	var n = t == null ? `` : typeof t == `object` ? `${t}` : t;
	n !== (e[Te] ??= e.nodeValue) && ((e[Te] = n), (e.nodeValue = `${n}`));
}
function ki(e, t) {
	return Mi(e, t);
}
function Ai(e, t) {
	(Gn(), (t.intro = t.intro ?? !1));
	let n = t.target,
		r = D,
		i = k;
	try {
		for (var a = z(n); a && (a.nodeType !== 8 || a.data !== `[`); ) a = B(a);
		if (!a) throw Ye;
		(O(!0), A(a));
		let r = Mi(e, { ...t, anchor: a });
		return (O(!1), r);
	} catch (r) {
		if (
			r instanceof Error &&
			r.message
				.split(
					`
`,
				)
				.some((e) => e.startsWith(`https://svelte.dev/e/`))
		)
			throw r;
		return (r !== Ye && console.warn(`Failed to hydrate: `, r), t.recover === !1 && Ve(), Gn(), Yn(n), O(!1), ki(e, t));
	} finally {
		(O(r), A(i));
	}
}
var ji = new Map();
function Mi(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	Gn();
	var c = void 0,
		l = pr(() => {
			var l = n ?? t.appendChild(R());
			Vt(
				l,
				{ pending: () => {} },
				(t) => {
					bt({});
					var n = M;
					if (
						(a && (n.c = a),
						i && (r.$$events = i),
						D && $(t, null),
						(Di = o),
						(c = e(t, r) || {}),
						(Di = !0),
						D && ((q.nodes.end = k), k === null || k.nodeType !== 8 || k.data !== `]`))
					)
						throw (tt(), Ye);
					xt();
				},
				s,
			);
			var u = new Set(),
				d = (e) => {
					for (var n = 0; n < e.length; n++) {
						var r = e[n];
						if (!u.has(r)) {
							u.add(r);
							var i = ci(r);
							for (let e of [t, document]) {
								var a = ji.get(e);
								a === void 0 && ((a = new Map()), ji.set(e, a));
								var o = a.get(r);
								o === void 0 ? (e.addEventListener(r, _i, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
							}
						}
					}
				};
			return (
				d(p(ui)),
				di.add(d),
				() => {
					for (var e of u)
						for (let n of [t, document]) {
							var r = ji.get(n),
								i = r.get(e);
							--i == 0 ? (n.removeEventListener(e, _i), r.delete(e), r.size === 0 && ji.delete(n)) : r.set(e, i);
						}
					(di.delete(d), l !== n && l.parentNode?.removeChild(l));
				}
			);
		});
	return (Ni.set(c, l), c);
}
var Ni = new WeakMap();
function Pi(e, t) {
	let n = Ni.get(e);
	return n ? (Ni.delete(e), n(t)) : Promise.resolve();
}
var Fi = class {
	anchor;
	#e = new Map();
	#t = new Map();
	#n = new Map();
	#r = new Set();
	#i = !0;
	constructor(e, t = !0) {
		((this.anchor = e), (this.#i = t));
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e),
				n = this.#t.get(t);
			if (n) (Dr(n), this.#r.delete(t));
			else {
				var r = this.#n.get(t);
				r && (Dr(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), (n = r.effect));
			}
			for (let [t, n] of this.#e) {
				if ((this.#e.delete(t), t === e)) break;
				let r = this.#n.get(n);
				r && (U(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						(kr(r, t), t.append(R()), this.#n.set(e, { effect: r, fragment: t }));
					} else U(r);
					(this.#r.delete(e), this.#t.delete(e));
				};
				this.#i || !n ? (this.#r.add(e), Tr(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (U(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = F,
			r = Xn();
		if (t && !this.#t.has(e) && !this.#n.has(e))
			if (r) {
				var i = document.createDocumentFragment(),
					a = R();
				(i.append(a), this.#n.set(e, { effect: H(() => t(a)), fragment: i }));
			} else
				this.#t.set(
					e,
					H(() => t(this.anchor)),
				);
		if ((this.#e.set(n, e), r)) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			(n.oncommit(this.#a), n.ondiscard(this.#o));
		} else (D && (this.anchor = k), this.#a(n));
	}
};
function Ii(e, t, n = !1) {
	var r;
	D && ((r = k), it());
	var i = new Fi(e),
		a = n ? de : 0;
	function o(e, t) {
		if (D) {
			var n = ct(r);
			if (e !== parseInt(n.substring(1))) {
				var a = st();
				(A(a), (i.anchor = a), O(!1), i.ensure(e, t), O(!0));
				return;
			}
		}
		i.ensure(e, t);
	}
	vr(() => {
		var e = !1;
		(t((t, n = 0) => {
			((e = !0), o(n, t));
		}),
			e || o(-1, null));
	}, a);
}
function Li(e, t) {
	return t;
}
function Ri(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Tr(
			n,
			() => {
				if (a) {
					if ((a.pending.delete(n), a.done.add(n), a.pending.size === 0)) {
						var t = e.outrogroups;
						(zi(e, p(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null));
					}
				} else --o;
			},
			!1,
		);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null;
		if (c) {
			var l = n,
				u = l.parentNode;
			(Yn(u), u.append(l), e.items.clear());
		}
		zi(e, t, !c);
	} else ((a = { pending: new Set(t), done: new Set() }), (e.outrogroups ??= new Set()).add(a));
}
function zi(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? ((a.f |= me), kr(a, document.createDocumentFragment())) : U(t[i], n);
	}
}
var Bi;
function Vi(e, t, n, r, i, a = null) {
	var o = e,
		s = new Map();
	if (t & 4) {
		var c = e;
		o = D ? A(z(c)) : c.appendChild(R());
	}
	D && it();
	var l = null,
		d = Zt(() => {
			var e = n();
			return u(e) ? e : e == null ? [] : p(e);
		}),
		f,
		m = new Map(),
		h = !0;
	function g(e) {
		v.effect.f & 16384 ||
			(v.pending.delete(e),
			(v.fallback = l),
			Ui(v, f, o, t, r),
			l !== null &&
				(f.length === 0
					? l.f & 33554432
						? ((l.f ^= me), Gi(l, null, o))
						: Dr(l)
					: Tr(l, () => {
							l = null;
						})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: vr(() => {
			f = Q(d);
			var e = f.length;
			let c = !1;
			D && (ct(o) === `[!`) != (e === 0) && ((o = st()), A(o), O(!1), (c = !0));
			for (var u = new Set(), p = F, v = Xn(), y = 0; y < e; y += 1) {
				D && k.nodeType === 8 && k.data === `]` && ((o = k), (c = !0), O(!1));
				var b = f[y],
					x = r(b, y),
					S = h ? null : s.get(x);
				(S ? (S.v && Nn(S.v, b), S.i && Nn(S.i, y), v && p.unskip_effect(S.e)) : ((S = Wi(s, h ? o : (Bi ??= R()), b, x, y, i, t, n)), h || (S.e.f |= me), s.set(x, S)),
					u.add(x));
			}
			if ((e === 0 && a && !l && (h ? (l = H(() => a(o))) : ((l = H(() => a((Bi ??= R())))), (l.f |= me))), e > u.size && Ne(``, ``, ``), D && e > 0 && A(st()), !h))
				if ((m.set(p, u), v)) {
					for (let [e, t] of s) u.has(e) || p.skip_effect(t.e);
					(p.oncommit(g), p.ondiscard(_));
				} else g(p);
			(c && O(!0), Q(d));
		}),
		flags: t,
		items: s,
		pending: m,
		outrogroups: null,
		fallback: l,
	};
	((h = !1), D && (o = k));
}
function Hi(e) {
	for (; e !== null && !(e.f & 32); ) e = e.next;
	return e;
}
function Ui(e, t, n, r, i) {
	var a = (r & 8) != 0,
		o = t.length,
		s = e.items,
		c = Hi(e.effect.first),
		l,
		u = null,
		d,
		f = [],
		m = [],
		h,
		g,
		_,
		v;
	if (a) for (v = 0; v < o; v += 1) ((h = t[v]), (g = i(h, v)), (_ = s.get(g).e), _.f & 33554432 || (_.nodes?.a?.measure(), (d ??= new Set()).add(_)));
	for (v = 0; v < o; v += 1) {
		if (((h = t[v]), (g = i(h, v)), (_ = s.get(g).e), e.outrogroups !== null)) for (let t of e.outrogroups) (t.pending.delete(_), t.done.delete(_));
		if ((_.f & 8192 && (Dr(_), a && (_.nodes?.a?.unfix(), (d ??= new Set()).delete(_))), _.f & 33554432))
			if (((_.f ^= me), _ === c)) Gi(_, null, n);
			else {
				var y = u ? u.next : c;
				(_ === e.effect.last && (e.effect.last = _.prev),
					_.prev && (_.prev.next = _.next),
					_.next && (_.next.prev = _.prev),
					Ki(e, u, _),
					Ki(e, _, y),
					Gi(_, y, n),
					(u = _),
					(f = []),
					(m = []),
					(c = Hi(u.next)));
				continue;
			}
		if (_ !== c) {
			if (l !== void 0 && l.has(_)) {
				if (f.length < m.length) {
					var b = m[0],
						x;
					u = b.prev;
					var S = f[0],
						C = f[f.length - 1];
					for (x = 0; x < f.length; x += 1) Gi(f[x], b, n);
					for (x = 0; x < m.length; x += 1) l.delete(m[x]);
					(Ki(e, S.prev, C.next), Ki(e, u, S), Ki(e, C, b), (c = b), (u = C), --v, (f = []), (m = []));
				} else (l.delete(_), Gi(_, c, n), Ki(e, _.prev, _.next), Ki(e, _, u === null ? e.effect.first : u.next), Ki(e, u, _), (u = _));
				continue;
			}
			for (f = [], m = []; c !== null && c !== _; ) ((l ??= new Set()).add(c), m.push(c), (c = Hi(c.next)));
			if (c === null) continue;
		}
		(_.f & 33554432 || f.push(_), (u = _), (c = Hi(_.next)));
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (zi(e, p(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var ee = [];
		if (l !== void 0) for (_ of l) _.f & 8192 || ee.push(_);
		for (; c !== null; ) (!(c.f & 8192) && c !== e.fallback && ee.push(c), (c = Hi(c.next)));
		var te = ee.length;
		if (te > 0) {
			var ne = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.fix();
			}
			Ri(e, ee, ne);
		}
	}
	a &&
		N(() => {
			if (d !== void 0) for (_ of d) _.nodes?.a?.apply();
		});
}
function Wi(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? (o & 16 ? An(n) : Mn(n, !1, !1)) : null,
		l = o & 2 ? An(i) : null;
	return {
		v: c,
		i: l,
		e: H(
			() => (
				a(t, c ?? n, l ?? i, s),
				() => {
					e.delete(r);
				}
			),
		),
	};
}
function Gi(e, t, n) {
	if (e.nodes)
		for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null; ) {
			var o = B(r);
			if ((a.before(r), r === i)) return;
			r = o;
		}
}
function Ki(e, t, n) {
	(t === null ? (e.effect.first = n) : (t.next = n), n === null ? (e.effect.last = t) : (n.prev = t));
}
function qi(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e,
		s = ``;
	if (n) {
		var c = e;
		D && (o = A(z(c)));
	}
	_r(() => {
		var e = q;
		if (s === (s = t() ?? ``)) {
			D && it();
			return;
		}
		if (n && !D) {
			((e.nodes = null), (c.innerHTML = s), s !== `` && $(z(c), c.lastChild));
			return;
		}
		if ((e.nodes !== null && (Cr(e.nodes.start, e.nodes.end), (e.nodes = null)), s !== ``)) {
			if (D) {
				for (var a = k.data, l = it(), u = l; l !== null && (l.nodeType !== 8 || l.data !== ``); ) ((u = l), (l = B(l)));
				if (l === null) throw (tt(), Ye);
				($(k, u), (o = A(l)));
				return;
			}
			var d = Zn(r ? `svg` : i ? `math` : `template`, r ? Ze : i ? Qe : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (($(z(f), f.lastChild), r || i)) for (; z(f); ) o.before(z(f));
			else o.before(f);
		}
	});
}
function Ji(e, t, n, r, i) {
	D && it();
	var a = t.$$slots?.[n],
		o = !1;
	(a === !0 && ((a = t[n === 'default' ? `children` : n]), (o = !0)), a === void 0 ? i !== null && i(e) : a(e, o ? () => r : r));
}
function Yi(e, t, ...n) {
	var r = new Fi(e);
	vr(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, de);
}
function Xi(e) {
	return (t, ...n) => {
		var r = e(...n),
			i;
		D ? ((i = k), it()) : ((i = z(bi(r.render().trim()))), t.before(i));
		let a = r.setup?.(i);
		($(i, i), typeof a == `function` && cr(a));
	};
}
function Zi(e, t, n) {
	var r;
	D && ((r = k), it());
	var i = new Fi(e);
	vr(() => {
		var e = t() ?? null;
		if (D && (ct(r) === `[`) != (e !== null)) {
			var a = st();
			(A(a), (i.anchor = a), O(!1), i.ensure(e, e && ((t) => n(t, e))), O(!0));
			return;
		}
		i.ensure(e, e && ((t) => n(t, e)));
	}, de);
}
var Qi = () => performance.now(),
	$i = { tick: (e) => requestAnimationFrame(e), now: () => Qi(), tasks: new Set() };
function ea() {
	let e = $i.now();
	($i.tasks.forEach((t) => {
		t.c(e) || ($i.tasks.delete(t), t.f());
	}),
		$i.tasks.size !== 0 && $i.tick(ea));
}
function ta(e) {
	let t;
	return (
		$i.tasks.size === 0 && $i.tick(ea),
		{
			promise: new Promise((n) => {
				$i.tasks.add((t = { c: e, f: n }));
			}),
			abort() {
				$i.tasks.delete(t);
			},
		}
	);
}
function na(e, t) {
	rr(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function ra(e) {
	if (e === `float`) return `cssFloat`;
	if (e === `offset`) return `cssOffset`;
	if (e.startsWith(`--`)) return e;
	let t = e.split(`-`);
	return t.length === 1
		? t[0]
		: t[0] +
				t
					.slice(1)
					.map((e) => e[0].toUpperCase() + e.slice(1))
					.join(``);
}
function ia(e) {
	let t = {},
		n = e.split(`;`);
	for (let e of n) {
		let [n, r] = e.split(`:`);
		if (!n || r === void 0) break;
		let i = ra(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var aa = (e) => e,
	oa = null;
function sa(e, t, n) {
	var r = (oa ?? q).nodes,
		i,
		a,
		o,
		s = null;
	((r.a ??= {
		element: e,
		measure() {
			i = this.element.getBoundingClientRect();
		},
		apply() {
			if ((o?.abort(), (a = this.element.getBoundingClientRect()), i.left !== a.left || i.right !== a.right || i.top !== a.top || i.bottom !== a.bottom)) {
				let e = t()(this.element, { from: i, to: a }, n?.());
				o = la(
					this.element,
					e,
					void 0,
					1,
					() => {},
					() => {
						(o?.abort(), (o = void 0));
					},
				);
			}
		},
		fix() {
			if (!e.getAnimations().length) {
				var { position: t, width: n, height: r } = getComputedStyle(e);
				if (t !== `absolute` && t !== `fixed`) {
					var a = e.style;
					((s = { position: a.position, width: a.width, height: a.height, transform: a.transform }), (a.position = `absolute`), (a.width = n), (a.height = r));
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
				((t.position = s.position), (t.width = s.width), (t.height = s.height), (t.transform = s.transform));
			}
		},
	}),
		(r.a.element = e));
}
function ca(e, t, n, r) {
	var i = (e & 1) != 0,
		a = (e & 2) != 0,
		o = i && a,
		s = (e & 4) != 0,
		c = o ? `both` : i ? `in` : `out`,
		l,
		u = t.inert,
		d = t.style.overflow,
		f,
		p;
	function m() {
		return rr(() => (l ??= n()(t, r?.() ?? {}, { direction: c })));
	}
	var h = {
			is_global: s,
			in() {
				if (((t.inert = u), !i)) {
					(p?.abort(), p?.reset?.());
					return;
				}
				(a || f?.abort(),
					(f = la(
						t,
						m(),
						p,
						1,
						() => {
							na(t, `introstart`);
						},
						() => {
							(na(t, `introend`), f?.abort(), (f = l = void 0), (t.style.overflow = d));
						},
					)));
			},
			out(e) {
				if (!a) {
					(e?.(), (l = void 0));
					return;
				}
				((t.inert = !0),
					(p = la(
						t,
						m(),
						f,
						0,
						() => {
							na(t, `outrostart`);
						},
						() => {
							(na(t, `outroend`), e?.());
						},
					)));
			},
			stop: () => {
				(f?.abort(), p?.abort());
			},
		},
		g = q;
	if (((g.nodes.t ??= []).push(h), i && Di)) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536; ) for (; (v = v.parent) && !(v.f & 16); );
			_ = !v || (v.f & 32768) != 0;
		}
		_ &&
			mr(() => {
				Qr(() => h.in());
			});
	}
}
function la(e, t, n, r, i, a) {
	var o = r === 1;
	if (S(t)) {
		var s,
			c = !1;
		return (
			N(() => {
				c || (s = la(e, t({ direction: o ? `in` : `out` }), n, r, i, a));
			}),
			{
				abort: () => {
					((c = !0), s?.abort());
				},
				deactivate: () => s.deactivate(),
				reset: () => s.reset(),
				t: () => s.t(),
			}
		);
	}
	if ((n?.deactivate(), !t?.duration && !t?.delay)) return (i(), a(), { abort: C, deactivate: C, reset: C, t: () => r });
	let { delay: l = 0, css: u, tick: d, easing: f = aa } = t;
	var p = [];
	if (o && n === void 0 && (d && d(0, 1), u)) {
		var m = ia(u(0, 1));
		p.push(m, m);
	}
	var h = () => 1 - r,
		g = e.animate(p, { duration: l, fill: `forwards` });
	return (
		(g.onfinish = () => {
			(g.cancel(), i());
			var o = n?.t() ?? 1 - r;
			n?.abort();
			var s = r - o,
				c = t.duration * Math.abs(s),
				l = [];
			if (c > 0) {
				var p = !1;
				if (u)
					for (var m = Math.ceil(c / (1e3 / 60)), _ = 0; _ <= m; _ += 1) {
						var v = o + s * f(_ / m),
							y = ia(u(v, 1 - v));
						(l.push(y), (p ||= y.overflow === `hidden`));
					}
				(p && (e.style.overflow = `hidden`),
					(h = () => {
						var e = g.currentTime;
						return o + s * f(e / c);
					}),
					d &&
						ta(() => {
							if (g.playState !== `running`) return !1;
							var e = h();
							return (d(e, 1 - e), !0);
						}));
			}
			((g = e.animate(l, { duration: c, fill: `forwards` })),
				(g.onfinish = () => {
					((h = () => r), d?.(r, 1 - r), a());
				}));
		}),
		{
			abort: () => {
				g && (g.cancel(), (g.effect = null), (g.onfinish = C));
			},
			deactivate: () => {
				a = C;
			},
			reset: () => {
				r === 0 && d?.(1, 0);
			},
			t: () => h(),
		}
	);
}
function ua(e, t) {
	mr(() => {
		var n = e.getRootNode(),
			r = n.host ? n : (n.head ?? n.ownerDocument.head);
		if (!r.querySelector(`#` + t.hash)) {
			let e = Zn(`style`);
			((e.id = t.hash), (e.textContent = t.code), r.appendChild(e));
		}
	});
}
function da(e, t, n) {
	mr(() => {
		var r = Qr(() => t(e, n?.()) || {});
		if (n && r?.update) {
			var i = !1,
				a = {};
			(gr(() => {
				var e = n();
				($r(e), i && ut(a, e) && ((a = e), r.update(e)));
			}),
				(i = !0));
		}
		if (r?.destroy) return () => r.destroy();
	});
}
function fa(e, t) {
	var n = void 0,
		r;
	yr(() => {
		n !== (n = t()) &&
			((r &&= (U(r), null)),
			n &&
				(r = H(() => {
					mr(() => n(e));
				})));
	});
}
function pa(e) {
	var t,
		n,
		r = ``;
	if (typeof e == `string` || typeof e == `number`) r += e;
	else if (typeof e == `object`)
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = pa(e[t])) && (r && (r += ` `), (r += n));
		} else for (n in e) e[n] && (r && (r += ` `), (r += n));
	return r;
}
function ma() {
	for (var e, t, n = 0, r = ``, i = arguments.length; n < i; n++) (e = arguments[n]) && (t = pa(e)) && (r && (r += ` `), (r += t));
	return r;
}
function ha(e) {
	return typeof e == `object` ? ma(e) : (e ?? ``);
}
var ga = [
	...` 	
\r\f\xA0\v﻿`,
];
function _a(e, t, n) {
	var r = e == null ? `` : `` + e;
	if ((t && (r = r ? r + ` ` + t : t), n)) {
		for (var i of Object.keys(n))
			if (n[i]) r = r ? r + ` ` + i : i;
			else if (r.length)
				for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0; ) {
					var s = o + a;
					(o === 0 || ga.includes(r[o - 1])) && (s === r.length || ga.includes(r[s])) ? (r = (o === 0 ? `` : r.substring(0, o)) + r.substring(s + 1)) : (o = s);
				}
	}
	return r === `` ? null : r;
}
function va(e, t = !1) {
	var n = t ? ` !important;` : `;`,
		r = ``;
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== `` && (r += ` ` + i + `: ` + a + n);
	}
	return r;
}
function ya(e) {
	return e[0] !== `-` || e[1] !== `-` ? e.toLowerCase() : e;
}
function ba(e, t) {
	if (t) {
		var n = ``,
			r,
			i;
		if ((Array.isArray(t) ? ((r = t[0]), (i = t[1])) : (r = t), e)) {
			e = String(e)
				.replaceAll(/\s*\/\*.*?\*\/\s*/g, ``)
				.trim();
			var a = !1,
				o = 0,
				s = !1,
				c = [];
			(r && c.push(...Object.keys(r).map(ya)), i && c.push(...Object.keys(i).map(ya)));
			var l = 0,
				u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (
					(s
						? f === `/` && e[d - 1] === `*` && (s = !1)
						: a
							? a === f && (a = !1)
							: f === `/` && e[d + 1] === `*`
								? (s = !0)
								: f === `"` || f === `'`
									? (a = f)
									: f === `(`
										? o++
										: f === `)` && o--,
					!s && a === !1 && o === 0)
				) {
					if (f === `:` && u === -1) u = d;
					else if (f === `;` || d === t - 1) {
						if (u !== -1) {
							var p = ya(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== `;` && d++;
								var m = e.substring(l, d).trim();
								n += ` ` + m + `;`;
							}
						}
						((l = d + 1), (u = -1));
					}
				}
			}
		}
		return (r && (n += va(r)), i && (n += va(i, !0)), (n = n.trim()), n === `` ? null : n);
	}
	return e == null ? null : String(e);
}
function xa(e, t, n, r, i, a) {
	var o = e[Ce];
	if (D || o !== n || o === void 0) {
		var s = _a(n, r, a);
		((!D || s !== e.getAttribute(`class`)) && (s == null ? e.removeAttribute(`class`) : t ? (e.className = s) : e.setAttribute(`class`, s)), (e[Ce] = n));
	} else if (a && i !== a)
		for (var c in a) {
			var l = !!a[c];
			(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
		}
	return a;
}
function Sa(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Ca(e, t, n, r) {
	var i = e[we];
	if (D || i !== t) {
		var a = ba(t, r);
		((!D || a !== e.getAttribute(`style`)) && (a == null ? e.removeAttribute(`style`) : (e.style.cssText = a)), (e[we] = t));
	} else r && (Array.isArray(r) ? (Sa(e, n?.[0], r[0]), Sa(e, n?.[1], r[1], `important`)) : Sa(e, n, r));
	return r;
}
function wa(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!u(t)) return nt();
		for (var r of e.options) r.selected = t.includes(Ea(r));
		return;
	}
	for (r of e.options)
		if (Bn(Ea(r), t)) {
			r.selected = !0;
			return;
		}
	(!n || t !== void 0) && (e.selectedIndex = -1);
}
function Ta(e) {
	var t = new MutationObserver(() => {
		wa(e, e.__value);
	});
	(t.observe(e, { childList: !0, subtree: !0, attributes: !0, attributeFilter: [`value`] }),
		cr(() => {
			t.disconnect();
		}));
}
function Ea(e) {
	return `__value` in e ? e.__value : e.value;
}
var Da = Symbol(`class`),
	Oa = Symbol(`style`),
	ka = Symbol(`is custom element`),
	Aa = Symbol(`is html`),
	ja = Oe ? `link` : `LINK`,
	Ma = Oe ? `input` : `INPUT`,
	Na = Oe ? `option` : `OPTION`,
	Pa = Oe ? `select` : `SELECT`;
function Fa(e) {
	if (D) {
		var t = !1,
			n = () => {
				if (!t) {
					if (((t = !0), e.hasAttribute(`value`))) {
						var n = e.value;
						(La(e, `value`, null), (e.value = n));
					}
					if (e.hasAttribute(`checked`)) {
						var r = e.checked;
						(La(e, `checked`, null), (e.checked = r));
					}
				}
			};
		((e[Ee] = n), N(n), tr());
	}
}
function Ia(e, t) {
	t ? e.hasAttribute(`selected`) || e.setAttribute(`selected`, ``) : e.removeAttribute(`selected`);
}
function La(e, t, n, r) {
	var i = Va(e);
	(D && ((i[t] = e.getAttribute(t)), t === `src` || t === `srcset` || (t === `href` && e.nodeName === ja))) ||
		(i[t] !== (i[t] = n) && (t === `loading` && (e[xe] = n), n == null ? e.removeAttribute(t) : typeof n != `string` && Ua(e).includes(t) ? (e[t] = n) : e.setAttribute(t, n)));
}
function Ra(e, t, n) {
	var r = W,
		i = q;
	let a = D;
	(D && O(!1), K(null), J(null));
	try {
		t !== `style` &&
		(Ha.has(e.getAttribute(`is`) || e.nodeName) || !customElements || customElements.get(e.getAttribute(`is`) || e.nodeName.toLowerCase())
			? Ua(e).includes(t)
			: n && typeof n == `object`)
			? (e[t] = n)
			: La(e, t, n == null ? n : String(n));
	} finally {
		(K(r), J(i), a && O(!0));
	}
}
function za(e, t, n, r, i = !1, a = !1) {
	if (D && i && e.nodeName === Ma) {
		var o = e;
		(o.type === `checkbox` ? `defaultChecked` : `defaultValue`) in n || Fa(o);
	}
	var s = Va(e),
		c = s[ka],
		l = !s[Aa];
	let u = D && c;
	u && O(!1);
	var d = t || {},
		f = e.nodeName === Na;
	for (var p in t) p in n || (n[p] = null);
	(n.class ? (n.class = ha(n.class)) : (r || n[Da]) && (n.class = null), n[Oa] && (n.style ??= null));
	var m = Ua(e);
	if (e.nodeName === Ma && `type` in n && (`value` in n || `__value` in n)) {
		var h = n.type;
		(h !== d.type || (h === void 0 && e.hasAttribute(`type`))) && ((d.type = h), La(e, `type`, h, a));
	}
	for (let i in n) {
		let o = n[i];
		if (f && i === `value` && o == null) {
			((e.value = e.__value = ``), (d[i] = o));
			continue;
		}
		if (i === `class`) {
			(xa(e, e.namespaceURI === `http://www.w3.org/1999/xhtml`, o, r, t?.[Da], n[Da]), (d[i] = o), (d[Da] = n[Da]));
			continue;
		}
		if (i === `style`) {
			(Ca(e, o, t?.[Oa], n[Oa]), (d[i] = o), (d[Oa] = n[Oa]));
			continue;
		}
		var g = d[i];
		if (!(o === g && !(o === void 0 && e.hasAttribute(i)))) {
			d[i] = o;
			var _ = i[0] + i[1];
			if (_ !== `$$`)
				if (_ === `on`) {
					let t = {},
						n = `$$` + i,
						r = i.slice(2);
					var v = ri(r);
					if ((ti(r) && ((r = r.slice(0, -7)), (t.capture = !0)), !v && g)) {
						if (o != null) continue;
						(e.removeEventListener(r, d[n], t), (d[n] = null));
					}
					if (v) (mi(r, e, o), hi([r]));
					else if (o != null) {
						function a(e) {
							d[i].call(this, e);
						}
						d[n] = fi(r, e, a, t);
					}
				} else if (i === `style`) La(e, i, o);
				else if (i === `autofocus`) $n(e, !!o);
				else if (!c && (i === `__value` || (i === `value` && o != null))) e.value = e.__value = o;
				else if (i === `selected` && f) Ia(e, o);
				else {
					var y = i;
					l || (y = oi(y));
					var b = y === `defaultValue` || y === `defaultChecked`;
					if (o == null && !c && !b)
						if (((s[i] = null), y === `value` || y === `checked`)) {
							let n = e,
								r = t === void 0;
							if (y === `value`) {
								let e = n.defaultValue;
								(n.removeAttribute(y), (n.defaultValue = e), (n.value = n.__value = r ? e : null));
							} else {
								let e = n.defaultChecked;
								(n.removeAttribute(y), (n.defaultChecked = e), (n.checked = r ? e : !1));
							}
						} else e.removeAttribute(i);
					else b || (m.includes(y) && (c || typeof o != `string`)) ? ((e[y] = o), y in s && (s[y] = E)) : typeof o != `function` && La(e, y, o, a);
				}
		}
	}
	return (u && O(!0), d);
}
function Ba(e, t, n = [], r = [], i = [], a, o = !1, s = !1) {
	Ut(i, n, r, (n) => {
		var r = void 0,
			i = {},
			c = e.nodeName === Pa,
			l = !1;
		if (
			(yr(() => {
				var u = t(...n.map(Q)),
					d = za(e, r, u, a, o, s);
				l && c && `value` in u && wa(e, u.value);
				for (let e of Object.getOwnPropertySymbols(i)) u[e] || U(i[e]);
				for (let t of Object.getOwnPropertySymbols(u)) {
					var f = u[t];
					(t.description === `@attach` && (!r || f !== r[t]) && (i[t] && U(i[t]), (i[t] = H(() => fa(e, () => f)))), (d[t] = f));
				}
				r = d;
			}),
			c)
		) {
			var u = e;
			mr(() => {
				(wa(u, r.value, !0), Ta(u));
			});
		}
		l = !0;
	});
}
function Va(e) {
	return (e[Se] ??= { [ka]: e.nodeName.includes(`-`), [Aa]: e.namespaceURI === Xe });
}
var Ha = new Map();
function Ua(e) {
	var t = e.getAttribute(`is`) || e.nodeName,
		n = Ha.get(t);
	if (n) return n;
	Ha.set(t, (n = []));
	for (var r, i = e, a = Element.prototype; a !== i; ) {
		for (var o in ((r = _(i)), r)) r[o].set && o !== `innerHTML` && o !== `textContent` && o !== `innerText` && n.push(o);
		i = b(i);
	}
	return n;
}
function Wa(e, t, n = t) {
	(ir(e, `change`, (t) => {
		n(t ? e.defaultChecked : e.checked);
	}),
		((D && e.defaultChecked !== e.checked) || Qr(t) == null) && n(e.checked),
		gr(() => {
			e.checked = !!t();
		}));
}
function Ga(e, t) {
	return e === t || e?.[ye] === t;
}
function Ka(e = {}, t, n, r) {
	var i = M.r,
		a = q;
	return (
		mr(() => {
			var o, s;
			return (
				gr(() => {
					((o = s),
						(s = r?.() || []),
						Qr(() => {
							Ga(n(...s), e) || (t(e, ...s), o && Ga(n(...o), e) && t(null, ...o));
						}));
				}),
				() => {
					let r = a;
					for (; r !== i && r.parent !== null && r.parent.f & 33554432; ) r = r.parent;
					let o = () => {
							s && Ga(n(...s), e) && t(null, ...s);
						},
						c = r.teardown;
					r.teardown = () => {
						(o(), c?.());
					};
				}
			);
		}),
		e
	);
}
function qa(e, t) {
	nr(window, [`resize`], () => rr(() => t(window[e])));
}
function Ja(e = !1) {
	let t = M,
		n = t.l.u;
	if (!n) return;
	let r = () => $r(t.s);
	if (e) {
		let e = 0,
			n = {},
			i = qt(() => {
				let r = !1,
					i = t.s;
				for (let e in i) i[e] !== n[e] && ((n[e] = i[e]), (r = !0));
				return (r && e++, e);
			});
		r = () => Q(i);
	}
	(n.b.length &&
		dr(() => {
			(Ya(t, r), te(n.b));
		}),
		lr(() => {
			let e = Qr(() => n.m.map(ee));
			return () => {
				for (let t of e) typeof t == `function` && t();
			};
		}),
		n.a.length &&
			lr(() => {
				(Ya(t, r), te(n.a));
			}));
}
function Ya(e, t) {
	if (e.l.s) for (let t of e.l.s) Q(t);
	t();
}
var Xa = {
	get(e, t) {
		if (!e.exclude.has(t)) return e.props[t];
	},
	set(e, t) {
		return !1;
	},
	getOwnPropertyDescriptor(e, t) {
		if (!e.exclude.has(t) && t in e.props) return { enumerable: !0, configurable: !0, value: e.props[t] };
	},
	has(e, t) {
		return e.exclude.has(t) ? !1 : t in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((t) => !e.exclude.has(t));
	},
};
function Za(e, t, n) {
	return new Proxy({ props: e, exclude: t }, Xa);
}
var Qa = {
	get(e, t) {
		if (!e.exclude.includes(t)) return (Q(e.version), t in e.special ? e.special[t]() : e.props[t]);
	},
	set(e, t, n) {
		if (!(t in e.special)) {
			var r = q;
			try {
				(J(e.parent_effect),
					(e.special[t] = eo(
						{
							get [t]() {
								return e.props[t];
							},
						},
						t,
						4,
					)));
			} finally {
				J(r);
			}
		}
		return (e.special[t](n), Fn(e.version), !0);
	},
	getOwnPropertyDescriptor(e, t) {
		if (!e.exclude.includes(t) && t in e.props) return { enumerable: !0, configurable: !0, value: e.props[t] };
	},
	deleteProperty(e, t) {
		return e.exclude.includes(t) ? !0 : (e.exclude.push(t), Fn(e.version), !0);
	},
	has(e, t) {
		return e.exclude.includes(t) ? !1 : t in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((t) => !e.exclude.includes(t));
	},
};
function $a(e, t) {
	return new Proxy({ props: e, exclude: t, special: {}, version: An(0), parent_effect: q }, Qa);
}
function eo(e, t, n, r) {
	var i = !ft || (n & 2) != 0,
		a = (n & 8) != 0,
		o = (n & 16) != 0,
		s = r,
		c = !0,
		l = void 0,
		u = () => (o && i ? ((l ??= qt(r)), Q(l)) : (c && ((c = !1), (s = o ? Qr(r) : r)), s));
	let d;
	if (a) {
		var f = ye in e || be in e;
		d = g(e, t)?.set ?? (f && t in e ? (n) => (e[t] = n) : void 0);
	}
	var p,
		m = !1;
	(a ? ([p, m] = Rt(() => e[t])) : (p = e[t]), p === void 0 && r !== void 0 && ((p = u()), d && (i && Ue(t), d(p))));
	var h = i
		? () => {
				var n = e[t];
				return n === void 0 ? u() : ((c = !0), n);
			}
		: () => {
				var n = e[t];
				return (n !== void 0 && (s = void 0), n === void 0 ? s : n);
			};
	if (i && !(n & 4)) return h;
	if (d) {
		var _ = e.$$legacy;
		return function (e, t) {
			return arguments.length > 0 ? ((!i || !t || _ || m) && d(t ? h() : e), e) : h();
		};
	}
	var v = !1,
		y = (n & 1 ? qt : Zt)(() => ((v = !1), h()));
	a && Q(y);
	var b = q;
	return function (e, t) {
		if (arguments.length > 0) {
			let n = t ? Q(y) : i && a ? Rn(e) : e;
			return (L(y, n), (v = !0), s !== void 0 && (s = n), e);
		}
		return (Mr && v) || b.f & 16384 ? y.v : Q(y);
	};
}
function to(e) {
	return new ro(e);
}
function no(e) {
	return class extends ro {
		constructor(t) {
			super({ component: e, ...t });
		}
	};
}
var ro = class {
		#e;
		#t;
		constructor(e) {
			var t = new Map(),
				n = (e, n) => {
					var r = Mn(n, !1, !1);
					return (t.set(e, r), r);
				};
			let r = new Proxy(
				{ ...(e.props || {}), $$events: {} },
				{
					get(e, r) {
						return Q(t.get(r) ?? n(r, Reflect.get(e, r)));
					},
					has(e, r) {
						return r === be ? !0 : (Q(t.get(r) ?? n(r, Reflect.get(e, r))), Reflect.has(e, r));
					},
					set(e, r, i) {
						return (L(t.get(r) ?? n(r, i), i), Reflect.set(e, r, i));
					},
				},
			);
			((this.#t = (e.hydrate ? Ai : ki)(e.component, {
				target: e.target,
				anchor: e.anchor,
				props: r,
				context: e.context,
				intro: e.intro ?? !1,
				recover: e.recover,
				transformError: e.transformError,
			})),
				!j && (!e?.props?.$$host || e.sync === !1) && hn(),
				(this.#e = r.$$events));
			for (let e of Object.keys(this.#t))
				e === `$set` ||
					e === `$destroy` ||
					e === `$on` ||
					h(this, e, {
						get() {
							return this.#t[e];
						},
						set(t) {
							this.#t[e] = t;
						},
						enumerable: !0,
					});
			((this.#t.$set = (e) => {
				Object.assign(r, e);
			}),
				(this.#t.$destroy = () => {
					Pi(this.#t);
				}));
		}
		$set(e) {
			this.#t.$set(e);
		}
		$on(e, t) {
			this.#e[e] = this.#e[e] || [];
			let n = (...e) => t.call(this, ...e);
			return (
				this.#e[e].push(n),
				() => {
					this.#e[e] = this.#e[e].filter((e) => e !== n);
				}
			);
		}
		$destroy() {
			this.#t.$destroy();
		}
	},
	io;
typeof HTMLElement == `function` &&
	(io = class extends HTMLElement {
		$$ctor;
		$$s;
		$$c;
		$$cn = !1;
		$$d = {};
		$$r = !1;
		$$p_d = {};
		$$l = {};
		$$l_u = new Map();
		$$me;
		$$shadowRoot = null;
		constructor(e, t, n) {
			(super(), (this.$$ctor = e), (this.$$s = t), n && (this.$$shadowRoot = this.attachShadow(n)));
		}
		addEventListener(e, t, n) {
			if (((this.$$l[e] = this.$$l[e] || []), this.$$l[e].push(t), this.$$c)) {
				let n = this.$$c.$on(e, t);
				this.$$l_u.set(t, n);
			}
			super.addEventListener(e, t, n);
		}
		removeEventListener(e, t, n) {
			if ((super.removeEventListener(e, t, n), this.$$c)) {
				let e = this.$$l_u.get(t);
				e && (e(), this.$$l_u.delete(t));
			}
		}
		async connectedCallback() {
			if (((this.$$cn = !0), !this.$$c)) {
				if ((await Promise.resolve(), !this.$$cn || this.$$c)) return;
				function e(e) {
					return (t) => {
						let n = Zn(`slot`);
						(e !== 'default' && (n.name = e), Ei(t, n));
					};
				}
				let t = {},
					n = oo(this);
				for (let r of this.$$s) r in n && (r === 'default' && !this.$$d.children ? ((this.$$d.children = e(r)), (t.default = !0)) : (t[r] = e(r)));
				for (let e of this.attributes) {
					let t = this.$$g_p(e.name);
					t in this.$$d || (this.$$d[t] = ao(t, e.value, this.$$p_d, `toProp`));
				}
				for (let e in this.$$p_d) !(e in this.$$d) && this[e] !== void 0 && ((this.$$d[e] = this[e]), delete this[e]);
				((this.$$c = to({ component: this.$$ctor, target: this.$$shadowRoot || this, props: { ...this.$$d, $$slots: t, $$host: this } })),
					(this.$$me = fr(() => {
						gr(() => {
							this.$$r = !0;
							for (let e of m(this.$$c)) {
								if (!this.$$p_d[e]?.reflect) continue;
								this.$$d[e] = this.$$c[e];
								let t = ao(e, this.$$d[e], this.$$p_d, `toAttribute`);
								t == null ? this.removeAttribute(this.$$p_d[e].attribute || e) : this.setAttribute(this.$$p_d[e].attribute || e, t);
							}
							this.$$r = !1;
						});
					})));
				for (let e in this.$$l)
					for (let t of this.$$l[e]) {
						let n = this.$$c.$on(e, t);
						this.$$l_u.set(t, n);
					}
				this.$$l = {};
			}
		}
		attributeChangedCallback(e, t, n) {
			this.$$r || ((e = this.$$g_p(e)), (this.$$d[e] = ao(e, n, this.$$p_d, `toProp`)), this.$$c?.$set({ [e]: this.$$d[e] }));
		}
		disconnectedCallback() {
			((this.$$cn = !1),
				Promise.resolve().then(() => {
					!this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), (this.$$c = void 0));
				}));
		}
		$$g_p(e) {
			return m(this.$$p_d).find((t) => this.$$p_d[t].attribute === e || (!this.$$p_d[t].attribute && t.toLowerCase() === e)) || e;
		}
	});
function ao(e, t, n, r) {
	let i = n[e]?.type;
	if (((t = i === `Boolean` && typeof t != `boolean` ? t != null : t), !r || !n[e])) return t;
	if (r === `toAttribute`)
		switch (i) {
			case `Object`:
			case `Array`:
				return t == null ? null : JSON.stringify(t);
			case `Boolean`:
				return t ? `` : null;
			case `Number`:
				return t ?? null;
			default:
				return t;
		}
	else
		switch (i) {
			case `Object`:
			case `Array`:
				return t && JSON.parse(t);
			case `Boolean`:
				return t;
			case `Number`:
				return t == null ? t : +t;
			default:
				return t;
		}
}
function oo(e) {
	let t = {};
	return (
		e.childNodes.forEach((e) => {
			t[e.slot || `default`] = !0;
		}),
		t
	);
}
function so(e, t, n, r, i, a) {
	let o = class extends io {
		constructor() {
			(super(e, n, i), (this.$$p_d = t));
		}
		static get observedAttributes() {
			return m(t).map((e) => (t[e].attribute || e).toLowerCase());
		}
	};
	return (
		m(t).forEach((e) => {
			h(o.prototype, e, {
				get() {
					return this.$$c && e in this.$$c ? this.$$c[e] : this.$$d[e];
				},
				set(n) {
					((n = ao(e, n, t)), (this.$$d[e] = n));
					var r = this.$$c;
					r && (g(r, e)?.get ? (r[e] = n) : r.$set({ [e]: n }));
				},
			});
		}),
		r.forEach((e) => {
			h(o.prototype, e, {
				get() {
					return this.$$c?.[e];
				},
			});
		}),
		a && (o = a(o)),
		(e.element = o),
		o
	);
}
function co(e, t) {
	if ((j || ke(`hydratable`), D)) {
		let t = window.__svelte?.h;
		if (t?.has(e)) return t.get(e);
		et(e);
	}
	return t();
}
var lo = s({
	afterUpdate: () => _o,
	beforeUpdate: () => go,
	createContext: () => ht,
	createEventDispatcher: () => ho,
	createRawSnippet: () => Xi,
	flushSync: () => hn,
	fork: () => Tn,
	getAbortSignal: () => uo,
	getAllContexts: () => yt,
	getContext: () => gt,
	hasContext: () => vt,
	hydratable: () => co,
	hydrate: () => Ai,
	mount: () => ki,
	onDestroy: () => po,
	onMount: () => fo,
	setContext: () => _t,
	settled: () => Yr,
	tick: () => Jr,
	unmount: () => Pi,
	untrack: () => Qr,
});
function uo() {
	return (W === null && Be(), (W.ac ??= new AbortController()).signal);
}
function fo(e) {
	(M === null && Ae(`onMount`),
		ft && M.l !== null
			? vo(M).m.push(e)
			: lr(() => {
					let t = Qr(e);
					if (typeof t == `function`) return t;
				}));
}
function po(e) {
	(M === null && Ae(`onDestroy`), fo(() => () => Qr(e)));
}
function mo(e, t, { bubbles: n = !1, cancelable: r = !1 } = {}) {
	return new CustomEvent(e, { detail: t, bubbles: n, cancelable: r });
}
function ho() {
	let e = M;
	return (
		e === null && Ae(`createEventDispatcher`),
		(t, n, r) => {
			let i = e.s.$$events?.[t];
			if (i) {
				let a = u(i) ? i.slice() : [i],
					o = mo(t, n, r);
				for (let t of a) t.call(e.x, o);
				return !o.defaultPrevented;
			}
			return !0;
		}
	);
}
function go(e) {
	(M === null && Ae(`beforeUpdate`), M.l === null && He(`beforeUpdate`), vo(M).b.push(e));
}
function _o(e) {
	(M === null && Ae(`afterUpdate`), M.l === null && He(`afterUpdate`), vo(M).a.push(e));
}
function vo(e) {
	var t = e.l;
	return (t.u ??= { a: [], b: [], m: [] });
}
export {
	L as $,
	Li as A,
	pi as B,
	sa as C,
	Ji as D,
	Yi as E,
	xi as F,
	Qr as G,
	Q as H,
	Ci as I,
	dr as J,
	_r as K,
	wi as L,
	Oi as M,
	Ei as N,
	qi as O,
	Ti as P,
	Rn as Q,
	hi as R,
	ua as S,
	Zi as T,
	Yr as U,
	$r as V,
	Jr as W,
	qn as X,
	Kn as Y,
	Jn as Z,
	xa as _,
	l as _t,
	$a as a,
	gt as at,
	fa as b,
	Ja as c,
	_t as ct,
	Wa as d,
	at as dt,
	jn as et,
	Ba as f,
	re as ft,
	Ca as g,
	s as gt,
	Ra as h,
	o as ht,
	no as i,
	Ft as it,
	Ii as j,
	Vi as k,
	qa as l,
	pt as lt,
	La as m,
	ie as mt,
	fo as n,
	Zt as nt,
	eo as o,
	xt as ot,
	Fa as p,
	C as pt,
	lr as q,
	so as r,
	Xt as rt,
	Za as s,
	bt as st,
	lo as t,
	hn as tt,
	Ka as u,
	ot as ut,
	ha as v,
	ca as w,
	da as x,
	ma as y,
	mi as z,
};
