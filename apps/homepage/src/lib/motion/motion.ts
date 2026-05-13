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
