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
			view: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	import * as z from 'zod';
	interface Props {
		itemId?: string;
		type?: string;
		value?: string;
		placeholder?: string;
		error?: string;
		readonly?: boolean;
		cls?: string;
		view: string;
		input?: (event: Event) => void;
		onclick?: (event: Event) => void;
	}
	let {
		itemId = '',
		type = 'text',
		value = $bindable(''),
		placeholder,
		error = $bindable(''),
		readonly,
		cls = '',
		view,
		input,
		onclick,
	}: Props = $props();
	const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
	const urlSchema = z.string().url({ message: '올바른 형식이 아닙니다. https://(또는 http://)를 포함해 주세요.' });
	$effect(() => {
		if (type === 'url') {
			if (value.trim().length > 0) {
				const result = urlSchema.safeParse(value);
				error = result.success ? '' : result.error.issues[0].message;
			} else {
				error = ''; // 비어있으면 에러 리셋
			}
		}
	});
</script>

<div class="space-y-2">
	<input
		id={itemId}
		{type}
		class={[
			'input-text w-full read-only:border-slate-300 read-only:bg-white',
			error ? 'error border-error! outline-error' : '',
			cls,
		]}
		{placeholder}
		{readonly}
		bind:value
		oninput={input}
		{onclick}
	/>

	{#if type === 'url' && error}
		<ui-txt size="sm" txt={error} cls="text-error"></ui-txt>
	{/if}
</div>
