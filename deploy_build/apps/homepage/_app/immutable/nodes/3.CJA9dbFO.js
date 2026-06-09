import { ot as a, st as c, F as e, h as i, X as n, q as o, Z as r, r as s, N as t } from '../chunks/DWWkaRp_.js';
import '../chunks/xihTtKlq.js';

var l = e(`<main-home></main-home> <modal-main></modal-main>`, 3);
function u(e, s) {
	(c(s, !0),
		o(() => {
			let e = document?.querySelector(`main-home`);
			if (!e) return;
			e.news = [
				...Array.from({ length: 10 }).map((e) => ({
					link: `https://www.deepfine.com/news/news-detail`,
					img: `https://www.deepfine.com/filestorage/2026/1/23/1aeaeb1a-8e4c-4042-8bea-8cdf124e1515.png`,
					tit: `https://www.deepfine.com/filestorage/2026/1/23/1aeaeb1a-8e4c-4042-8bea-8cdf124e1515.pnghttps://www.deepfine.com/filestorage/2026/1/23/1aeaeb1a-8e4c-4042-8bea-8cdf124e1515.pnghttps://www.deepfine.com/filestorage/2026/1/23/1aeaeb1a-8e4c-4042-8bea-8cdf124e1515.png`,
					date: `2025.12.08`,
				})),
			];
			let t = document?.querySelector(`modal-main`);
			t && (t.list = [...Array.from({ length: 3 }).map((e) => ({ link: `https://www.deepfine.com/news/news-detail`, img: `/imgs/popup/main-popup.jpg`, tit: `title` }))]);
		}));
	var u = l();
	(i(r(n(u), 2), `open`, `open`), t(e, u), a());
}
s(u, {}, [], [], { mode: `open` });
export { u as component };
