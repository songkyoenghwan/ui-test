interface WatchScrollOptions {
	element: HTMLElement;
	onEnter: () => void;
	onLeave: () => void;
	onDisconnect: () => void;
	threshold?: number;
}

export function watchScroll({ element, onEnter, onLeave, onDisconnect, threshold = 0.1 }: WatchScrollOptions) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					onEnter();
				} else {
					onLeave();
				}
			});
		},
		{ threshold },
	);

	observer.observe(element);

	return () => {
		onDisconnect();
		observer.disconnect();
	};
}
