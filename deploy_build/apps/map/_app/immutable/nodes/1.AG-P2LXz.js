import { i as d, n as f } from '../chunks/CMYhYntx.js';
import { Vt as a, i as c, G as e, Lt as i, vt as l, J as n, bt as o, K as r, ft as s, It as t, yt as u } from '../chunks/CoJq17Tl.js';
import '../chunks/xihTtKlq.js';

var p = {
	get data() {
		return d.data;
	},
	get error() {
		return d.error;
	},
	get form() {
		return d.form;
	},
	get params() {
		return d.params;
	},
	get route() {
		return d.route;
	},
	get state() {
		return d.state;
	},
	get status() {
		return d.status;
	},
	get url() {
		return d.url;
	},
};
f.updated.check;
var m = p,
	h = n(`<h1> </h1> <p> </p>`, 1);
function g(n, c) {
	i(c, !0);
	var d = h(),
		f = u(d),
		p = l(f, !0);
	a(f);
	var g = o(f, 2),
		_ = l(g, !0);
	(a(g),
		s(() => {
			(e(p, m.status), e(_, m.error?.message));
		}),
		r(n, d),
		t());
}
c(g, {}, [], [], { mode: `open` });
export { g as component };
