<svelte:options
	customElement={{
		tag: 'thumbnail-upload',
		shadow: 'none',
		props: {
			img: { type: 'String' },
			thumbFiles: { type: 'Array' },
			thumbFilesValue: { type: 'Array' },
		},
	}}
/>

<script lang="ts">
	import { Dropzone } from 'flowbite-svelte';
	import { v4 as uuidv4 } from 'uuid';

	type FacilityFile = {
		fileMimeType: string;
		fileOriginalName: string;
		fileSize: number;
		fileUploadName: string;
		fileUploadPath: string;
		fileUrl: string;
		id: number;
	};

	let {
		img = $bindable(),
		thumbFiles = $bindable(),
		thumbFilesValue = $bindable(),
	}: { img: string; thumbFiles: FacilityFile[]; thumbFilesValue: FacilityFile[] } = $props();
	let filesInDropzone: FileList | null = $state(null);
	let previewUrl = $state('');
	let errorMessage = $state('');
	const MAX_FILE_SIZE = 2 * 1024 * 1024;

	$effect(() => {
		if (filesInDropzone && filesInDropzone.length > 0) {
			const file = filesInDropzone[0];
			const url = URL.createObjectURL(file);
			previewUrl = url;

			return () => URL.revokeObjectURL(url);
		} else {
			previewUrl = thumbFiles?.[0]?.fileUrl ?? img ?? '';
		}
	});

	function handleOnChange(event: Event) {
		const target = event.target as HTMLInputElement;

		if (target.files && target.files.length > 0) {
			const file = target.files[0];

			if (file.size > MAX_FILE_SIZE) {
				errorMessage = '파일 크기가 2MB를 초과했습니다.';
				filesInDropzone = null;
				target.value = ''; // 브라우저 자체 인풋 캐시 초기화
				return;
			}

			// 용량 통과 시
			errorMessage = '';
			filesInDropzone = target.files;
			const url = URL.createObjectURL(file);
			img = url; // 로컬 미리보기

			thumbFiles = [
				{
					fileMimeType: file.type,
					fileOriginalName: file.name,
					fileSize: file.size,
					fileUploadName: file.name,
					fileUploadPath: '',
					fileUrl: url,
					id: thumbFiles?.[0]?.id ?? Date.now(),
				},
			];
		}
	}

	function handleOnDrop(event: DragEvent) {
		event.preventDefault();

		if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
			const file = event.dataTransfer.files[0];

			if (file.size > MAX_FILE_SIZE) {
				errorMessage = '파일 크기가 2MB를 초과했습니다.';
				filesInDropzone = null;
				return;
			}

			// 용량 통과 시
			errorMessage = '';
			filesInDropzone = event.dataTransfer.files;
			const url = URL.createObjectURL(file);
			img = url; // 로컬 미리보기

			thumbFiles = [
				{
					fileMimeType: file.type,
					fileOriginalName: file.name,
					fileSize: file.size,
					fileUploadName: file.name,
					fileUploadPath: '',
					fileUrl: url,
					id: thumbFiles?.[0]?.id ?? Date.now(),
				},
			];
		}
	}

	$effect(() => {
		const payload = $state.snapshot(thumbFiles);

		if (!Array.isArray(payload)) return;
		thumbFilesValue = payload;
	});
</script>

<Dropzone
	id={uuidv4()}
	bind:files={filesInDropzone}
	onChange={handleOnChange}
	onDrop={handleOnDrop}
	accept=".png"
	class="relative size-22.5"
>
	{#if filesInDropzone && filesInDropzone.length > 0}
		<div class="flex flex-col items-center gap-2">
			<picture
				class="flex size-22.5 items-center justify-center overflow-hidden rounded border-2 border-dashed border-slate-200 bg-slate-100"
				aria-label={filesInDropzone[0].name}
			>
				<img src={previewUrl} alt="PNG 미리보기" class="max-w-auto min-h-30 object-cover" />
			</picture>

			<button
				type="button"
				class="bg-f5f5f5 absolute top-2 right-2 size-5 rounded-sm transition-all hover:scale-105"
				onclick={() => {
					filesInDropzone = null;
					previewUrl = '';
					thumbFiles = [];
					thumbFilesValue = [];
				}}
			>
				<span class="sr-only">Clear File</span>
				<icon-list data-name="btn-del" class="icon size-8 fill-slate-500"></icon-list>
			</button>
		</div>
	{:else if previewUrl}
		<div class="flex flex-col items-center gap-2">
			<picture
				class="flex size-22.5 items-center justify-center overflow-hidden rounded border-2 border-dashed border-slate-200 bg-slate-100"
				aria-label="기존 이미지"
			>
				<img src={previewUrl} alt="기존 PNG 미리보기" class="max-w-auto min-h-30 object-cover" />
			</picture>

			<button
				type="button"
				class="bg-f5f5f5 absolute top-2 right-2 size-5 rounded-sm transition-all hover:scale-105"
				onclick={() => {
					filesInDropzone = null;
					previewUrl = '';
					thumbFiles = [];
					thumbFilesValue = [];
					img = '';
				}}
			>
				<span class="sr-only">Clear File</span>
				<icon-list data-name="btn-del" class="icon size-8 fill-slate-500"></icon-list>
			</button>
		</div>
	{:else}
		<icon-list data-name="gallery" class="icon size-5 fill-slate-500"></icon-list>
		<p class="mt-1 text-center text-xs text-slate-600">드래그 혹은 클릭</p>
		<p class="mt-0.5 text-center text-[10px] text-slate-500">
			JPG, PNG
			<br />
			최대 2MB 1:1 비율
		</p>
	{/if}
</Dropzone>
