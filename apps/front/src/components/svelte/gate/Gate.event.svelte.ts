import * as m from '@/paraglide/messages.js';

export type FunctionKeys<T> = {
	[K in keyof T]: T[K] extends (...args: never[]) => unknown ? K : never;
}[keyof T];

export type MessageKey = FunctionKeys<typeof m>;

export type GateItem = {
	name: MessageKey;
	img: string;
	href: string;
	code: 1 | 2 | 3 | 4 | 5 | 6;
};
