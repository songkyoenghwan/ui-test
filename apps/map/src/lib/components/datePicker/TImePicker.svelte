<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import Picker from 'pickerjs';
	import 'pickerjs/dist/picker.min.css';

	let instance = $state<Picker | null>(null);

	const timeAttach: Attachment<HTMLInputElement> = (element) => {
		instance = new Picker(element, {
			language: 'ko',
			format: 'HH:mm',
			headers: true,
			text: {
				title: '시간 선택',
				cancel: '취소',
				confirm: '확인',
				hour: '시',
				minute: '분',
				year: '년',
				month: '월',
				day: '일',
				second: '초',
			},
			controls: true,
			inline: true,
		});

		return () => {
			if (instance) {
				instance.destroy();
				instance = null;
			}
		};
	};
</script>

<input {@attach timeAttach} type="text" class="input-time m w-22" value="00:00" readonly />
