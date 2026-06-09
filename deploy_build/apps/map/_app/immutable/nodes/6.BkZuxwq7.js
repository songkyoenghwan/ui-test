import { i as a, A as e, Lt as i, J as n, K as r, It as t } from '../chunks/CoJq17Tl.js';
import '../chunks/xihTtKlq.js';

var o = n(`<section id="map_div" data-map="init"></section>`);
function s(n, a) {
	i(a, !0);
	function s() {
		new Tmapv3.Map(`map_div`, {
			httpsMode: !0,
			mapType: `NIGHT`,
			center: new Tmapv3.LatLng(37.566481622437934, 126.98502302169841),
			width: `890px`,
			height: `400px`,
			zoom: 18,
		});
	}
	var c = o();
	(e(c, () => s), r(n, c), t());
}
a(s, {}, [], [], { mode: `open` });
export { s as component };
