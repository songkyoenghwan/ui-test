<script lang="ts">
	import counterUp from 'counterup2';
	import type { Attachment } from 'svelte/attachments';

	let { txt = 0 } = $props();

	function countUp(value: string): Attachment<HTMLElement> {
		return (node) => {
			const num = Number(value);
			node.textContent = Number.isFinite(num) ? num.toLocaleString() : '0';

			counterUp(node, {
				duration: 400,
				delay: 16,
			});

			return () => {
				counterUp(node, { action: 'stop' });
			};
		};
	}
</script>

<span class="inline-block tabular-nums" {@attach countUp(String(txt))}>{txt.toLocaleString()}</span>
