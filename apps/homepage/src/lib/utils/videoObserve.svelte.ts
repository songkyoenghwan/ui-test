import type { Attachment } from 'svelte/attachments';

export const videoObserve: Attachment = (element: Element) => {
	if (!(element instanceof HTMLVideoElement)) {
		return;
	}

	const video = element;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					video.play().catch((err) => {
						console.warn('비디오 자동 재생이 브라우저에 의해 차단됨 (muted 속성을 확인하세요):', err);
					});
				} else {
					video.pause();
				}
			});
		},
		{
			threshold: 0.1,
		},
	);

	observer.observe(video);

	return () => {
		observer.disconnect();
	};
};
