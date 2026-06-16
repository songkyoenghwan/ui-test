<svelte:options
	customElement={{
		tag: 'input-text',
		shadow: 'none',
		props: {
			itemId: { type: 'String', reflect: true },
			type: { type: 'String', attribute: 'data-type' },
			value: { type: 'String', reflect: true },
			error: { reflect: true, type: 'String', attribute: 'error' },
			placeholder: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	interface Props {
		itemId?: string;
		type?: string;
		value?: string;
		placeholder?: string;
		error?: string;
		cls?: string;
		input?: (event: Event) => void;
	}
	let { itemId = '', type = 'text', value = $bindable(''), placeholder, error, cls = '', input }: Props = $props();
	const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
	$effect(() => {
		if (type === 'url') {
			const isInvalid = value.trim().length > 0 && !urlPattern.test(value);

			if (isInvalid) {
				// 규격에 어긋나면 error 속성에 경고등을 켭니다. (삼항 연산자 조건문과 즉시 동조)
				error = 'true';
			} else if (error === 'true') {
				// 유저가 다시 올바르게 고쳐 쓰면 에러 장부를 청정하게 리셋합니다.
				error = '';
			}
		}
	});
</script>

<div class="space-y-2">
	<input
		id={itemId}
		{type}
		class={['input-text w-full read-only:border-slate-300 read-only:bg-white', error ? 'error border-error! outline-error' : '', cls]}
		{placeholder}
		bind:value
		oninput={input}
	/>

	{#if type === 'url' && error}
		<ui-txt size="sm" txt="올바른 형식이 아닙니다. https://(또는 http://)를 포함해 주세요." cls="text-error"></ui-txt>
	{/if}
</div>
