import type { Attachment } from 'svelte/attachments';

export const videoObserver: Attachment = (element: Element) => {
	if (!(element instanceof HTMLVideoElement)) {
		return;
	}

	const video = element;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (video.readyState >= 3) {
						video.play().catch((err) => {
							console.warn('비디오 자동 재생 차단됨:', err);
						});
					} else {
						// 아직 로딩이 덜 되었다면, 대기하고 있다가 재생 준비 완료(canplay) 경보가 울리는 즉시 점화!
						video.addEventListener(
							'canplay',
							() => {
								video.play().catch(() => {});
							},
							{ once: true },
						); // 메모리 누수 방지를 위해 딱 1번만 실행 후 폐쇄
					}
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

export function initLoopVideo(node: HTMLVideoElement) {
	node.muted = true;
	node.playsInline = true;
	node.loop = false;

	if (node.readyState >= 3) {
		node.play().catch(() => {});
	} else {
		node.addEventListener(
			'canplay',
			() => {
				node.play().catch(() => {});
			},
			{ once: true },
		);
	}
}

export function initLoopMo(node: HTMLVideoElement) {
	node.muted = true;
	node.playsInline = true;
	node.loop = true;
	node.preload = 'auto';

	let hasPlayedOnce = false;

	const playVideo = () => {
		node.play()
			.then(() => {
				hasPlayedOnce = true;
				window.removeEventListener('touchstart', playVideo);
				window.removeEventListener('scroll', playVideo);
			})
			.catch(() => {
				if (!hasPlayedOnce) {
					window.addEventListener('touchstart', playVideo, { passive: true });
					window.addEventListener('scroll', playVideo, { passive: true });
				}
			});
	};

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					playVideo();
				} else {
					node.pause();
				}
			});
		},
		{
			threshold: 0.1,
		},
	);

	// 감시 시작
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
			window.removeEventListener('touchstart', playVideo);
			window.removeEventListener('scroll', playVideo);
		},
	};
}
