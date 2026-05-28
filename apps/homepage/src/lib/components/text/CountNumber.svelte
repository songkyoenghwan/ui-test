<script lang="ts">
	import { CountUp } from 'countUp.js';
	import type { Attachment } from 'svelte/attachments';

	let { text = 0 } = $props();

	const countUpAttachment: Attachment = (element: Element) => {
		const countUp = new CountUp(element as HTMLElement, Number(text), {
			duration: 1.5,
			useEasing: true,
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (!countUp.error) {
							countUp.start();
						} else {
							console.error(countUp.error);
						}
					} else {
						countUp.reset();
					}
				});
			},
			{
				threshold: 0.1,
			},
		);

		observer.observe(element);

		return () => {
			countUp.onDestroy();
			observer.disconnect();
		};
	};
</script>

{#if text}
	<span {@attach countUpAttachment}>
		{text}
	</span>
{/if}
