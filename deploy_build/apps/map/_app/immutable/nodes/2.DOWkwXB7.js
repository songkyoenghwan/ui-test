import { Vt as a, vt as c, It as e, Tt as i, z as l, K as n, i as o, Lt as r, o as s, J as t } from '../chunks/CoJq17Tl.js';
import '../chunks/xihTtKlq.js';

var u = t(`<div><!></div>`);
function d(t, o) {
	r(o, !0);
	let d = s(o, `children`, 7),
		f = s(o, `data`, 7);
	var p = {
			get children() {
				return d();
			},
			set children(e) {
				(d(e), i());
			},
			get data() {
				return f();
			},
			set data(e) {
				(f(e), i());
			},
		},
		m = u();
	return (l(c(m), d), a(m), n(t, m), e(p));
}
o(d, { children: {}, data: {} }, [], [], { mode: `open` });
export { d as component };
