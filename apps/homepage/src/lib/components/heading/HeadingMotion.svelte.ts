import { animate, onScroll, stagger } from 'animejs';
import type { Attachment } from 'svelte/attachments';

export const visualMotion: Attachment<HTMLElement> = (el) => {
	const anim = animate(el.children, {
		y: [20, 0],
		opacity: [0, 1],
		duration: 600,
		delay: stagger(70),
		easing: 'easeOutQuad',
		autoplay: false,
	});

	const observer = onScroll({
		container: document.body,
		target: el,
		enter: 'bottom',
		leave: 'top',
		onEnter: () => {
			anim.seek(0);
			anim.play();
		},
		debug: false,
	});

	return () => observer.revert?.();
};
