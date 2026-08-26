import Toastify from 'toastify-js';

import 'toastify-js/src/toastify.css';

export type ToastVariant = 'primary' | 'error';
const MAX_TOAST_COUNT = 7;

export interface ShowToastOptions {
	txt: string;
	variant?: ToastVariant;
	duration?: number;
}

function trimToasts(max = MAX_TOAST_COUNT) {
	const toasts = Array.from(document.querySelectorAll<HTMLElement>('.toastify'));

	if (toasts.length < max) return;

	const removeCount = toasts.length - max + 1;

	for (let i = 0; i < removeCount; i++) {
		toasts[i]?.remove();
	}
}

export function showToast({ txt, variant = 'primary', duration = 3000 }: ShowToastOptions) {
	const node = document.createElement('toast-txt') as HTMLElement & {
		variant: ToastVariant;
		txt: string;
	};

	trimToasts(7);

	node.setAttribute('variant', variant);
	node.setAttribute('txt', txt);

	Toastify({
		node,
		duration,
		close: false,
		gravity: 'bottom',
		position: 'left',
		stopOnFocus: true,
		offset: {
			x: 0,
			y: 0,
		},
		className: 'toastify-reset',
		style: {
			background: 'transparent',
			boxShadow: 'none',
			padding: '20px',
		},
	}).showToast();
}

export const toast = {
	show: showToast,
	success(txt: string, duration = 3000) {
		showToast({ txt, variant: 'primary', duration });
	},
	error(txt: string, duration = 3000) {
		showToast({ txt, variant: 'error', duration });
	},
};

declare global {
	interface Window {
		toast: typeof toast;
	}
}

window.toast = toast;
