import { animate, onScroll, stagger } from 'animejs';
import { inView } from 'motion';
import type { Attachment } from 'svelte/attachments';

let played = $state(false);

const visualTextMotion: Attachment<HTMLElement> = (elm) => {
	const stop = inView(elm, (element) => {
		[...element.children].forEach((child, i) => {
			const target = child as HTMLElement;

			target.animate(
				{ opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0px)'] },
				{
					duration: 600,
					delay: i * 200,
					easing: 'ease-in',
					fill: 'forwards',
				},
			);
		});
	});

	return stop;
};

const indMotion: Attachment<HTMLElement> = (el) => {
	const animation = animate(el.children, {
		y: [10, 0],
		opacity: [0, 1],
		duration: 600,
		delay: stagger(100),
		easing: 'easeOutQuad',
		autoplay: false,
	});

	const observer = onScroll({
		container: document.body,
		target: el,
		enter: 'bottom center',
		leave: 'top bottom',
		axis: 'y',
		onEnter: () => {
			if (played) return;
			played = true;
			animation.seek(0);
			animation.play();
		},
		onLeaveBackward: () => {
			played = false;
		},
		debug: false,
	});

	return () => observer.revert?.();
};
