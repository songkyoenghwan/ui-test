<script lang="ts">
	import { Dropzone } from 'flowbite-svelte';
	import { v4 as uuidv4 } from 'uuid';

	let { img = $bindable(), onUpdate }: { img: string; onUpdate: (newImg: string) => void } = $props();
	let filesInDropzone: FileList | null = $state(null);
	let previewUrl = $state('');
	let errorMessage = $state('');
	const MAX_FILE_SIZE = 100 * 1024;

	$effect(() => {
		if (filesInDropzone && filesInDropzone.length > 0) {
			const file = filesInDropzone[0];
			const url = URL.createObjectURL(file);
			previewUrl = url;

			return () => URL.revokeObjectURL(url);
		} else {
			previewUrl = '';
		}
	});

	function handleOnChange(event: Event) {
		const target = event.target as HTMLInputElement;

		if (target.files && target.files.length > 0) {
			const file = target.files[0];

			if (file.size > MAX_FILE_SIZE) {
				errorMessage = '파일 크기가 100KB를 초과했습니다.';
				filesInDropzone = null;
				target.value = ''; // 브라우저 자체 인풋 캐시 초기화
				return;
			}

			// 용량 통과 시
			errorMessage = '';
			filesInDropzone = target.files;
			const url = URL.createObjectURL(file);
			img = url; // 로컬 미리보기
			onUpdate(url); // 부모의 btn.img를 업데이트!
		}
	}

	function handleOnDrop(event: DragEvent) {
		event.preventDefault();

		if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
			const file = event.dataTransfer.files[0];

			if (file.size > MAX_FILE_SIZE) {
				errorMessage = '파일 크기가 100KB를 초과했습니다.';
				filesInDropzone = null;
				return;
			}

			// 용량 통과 시
			errorMessage = '';
			filesInDropzone = event.dataTransfer.files;
			const url = URL.createObjectURL(file);
			img = url; // 로컬 미리보기
			onUpdate(url); // 부모의 btn.img를 업데이트!
		}
	}
</script>

<Dropzone
	id={uuidv4()}
	bind:files={filesInDropzone}
	onChange={handleOnChange}
	onDrop={handleOnDrop}
	accept=".png"
	class="relative size-30"
>
	{#if !filesInDropzone || filesInDropzone.length === 0}
		<icon-list data-name="gallery" class="icon size-8 fill-slate-500"></icon-list>
		<p class="mt-2 text-center text-slate-600">
			16×16px
			<br />
			PNG 아이콘
		</p>
	{:else}
		<div class="flex flex-col items-center gap-2">
			<picture
				class="flex size-30 items-center justify-center overflow-hidden rounded border-2 border-dashed border-slate-200 bg-slate-100"
				aria-label={filesInDropzone[0].name}
			>
				<img src={previewUrl} alt="PNG 미리보기" class="max-w-auto max-h-full min-h-30 object-cover" />
			</picture>

			<button type="button" class="absolute top-0 right-0 size-7" onclick={() => (filesInDropzone = null)}>
				<span class="sr-only">Clear File</span>
				<icon-list data-name="btn-del" class="icon fill-error size-8"></icon-list>
			</button>
		</div>
	{/if}
</Dropzone>
