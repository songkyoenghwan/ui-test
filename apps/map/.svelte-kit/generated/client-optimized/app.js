// in dev, this makes Vite inject its client as this module's first dependency,
// so that global constant replacements are installed before any other module
// (including user hooks) evaluates. In build it's inert.
import.meta.hot;




export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22')
];

export const server_loads = [];

export const dictionary = {
		"/(page)": [5,[3]],
		"/(page)/CMS-CON-001": [6,[3]],
		"/(page)/CMS-LOC-001-1": [10,[3]],
		"/(page)/CMS-LOC-001-1/reg": [11,[3]],
		"/(page)/CMS-LOC-001-1/[...id]/detail": [12,[3]],
		"/(page)/CMS-LOC-001-1/[...id]/edit": [13,[3]],
		"/(page)/CMS-LOC-001": [7,[3]],
		"/(page)/CMS-LOC-001/[view]": [8,[3]],
		"/(page)/CMS-LOC-001/[view]/[...id]": [9,[3]],
		"/(page)/CMS-MAP-001": [14,[3]],
		"/(page)/CMS-MAP-002": [15,[3]],
		"/(page)/CMS-MAP-003": [16,[3]],
		"/(page)/CMS-MAP-004": [17,[3]],
		"/(page)/CMS-OBD-001": [18,[3]],
		"/(page)/CMS-OBD-002": [19,[3]],
		"/(page)/CMS-STA-001": [20,[3]],
		"/(page)/CMS-STA-002": [21,[3]],
		"/(page)/CMS-UI": [22,[3]],
		"/(menulist)/menulist": [4,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';

export const get_error_template = () => import('../shared/error-template.js').then(m => m.default);