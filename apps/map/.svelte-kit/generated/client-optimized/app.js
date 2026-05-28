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
	() => import('./nodes/16')
];

export const server_loads = [];

export const dictionary = {
		"/(page)": [5,[3]],
		"/(page)/CMS-CON-001": [6,[3]],
		"/(page)/CMS-LOC-001": [7,[3]],
		"/(page)/CMS-MAP-001": [8,[3]],
		"/(page)/CMS-MAP-002": [9,[3]],
		"/(page)/CMS-MAP-003": [10,[3]],
		"/(page)/CMS-MAP-004": [11,[3]],
		"/(page)/CMS-OBD-001": [12,[3]],
		"/(page)/CMS-OBD-002": [13,[3]],
		"/(page)/CMS-STA-001": [14,[3]],
		"/(page)/CMS-STA-002": [15,[3]],
		"/(page)/CMS-UI": [16,[3]],
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