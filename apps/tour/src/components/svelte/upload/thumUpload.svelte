<svelte:options
	customElement={{
		tag: 'thumbnail-upload',
		shadow: 'none',
		props: {
			img: { type: 'String' },
			thumbFiles: { type: 'Array' },
			size: { type: 'String' },
			cls: { type: 'String' },
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
		size = '',
		cls = '',
	}: { img: string; thumbFiles: FacilityFile[]; size: string; cls: string } = $props();
	let filesInDropzone: FileList | null = $state(null);
	let errorMessage = $state('');
	const MAX_FILE_SIZE = 2 * 1024 * 1024;
	let localPreviewUrl = $state('');

	const previewUrl = $derived(localPreviewUrl || img || thumbFiles?.[0]?.fileUrl || '');

	function clearFile(input?: HTMLInputElement) {
		filesInDropzone = null;
		localPreviewUrl = '';
		thumbFiles = [];
		img = '';
		errorMessage = '';
		if (input) input.value = '';
	}

	function handleOnChange(event: Event) {
		const target = event.target as HTMLInputElement;

		if (target.files && target.files.length > 0) {
			const file = target.files[0];

			if (file.size > MAX_FILE_SIZE) {
				errorMessage = '파일 크기가 2MB를 초과했습니다.';
				clearFile(target);
				return;
			}

			errorMessage = '';
			filesInDropzone = target.files;
			const url = URL.createObjectURL(file);
			localPreviewUrl = url;
			img = url;

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
				clearFile();
				return;
			}

			errorMessage = '';
			filesInDropzone = event.dataTransfer.files;
			const url = URL.createObjectURL(file);
			localPreviewUrl = url;
			img = url;

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
		const url = localPreviewUrl;
		if (!url) return;

		return () => URL.revokeObjectURL(url);
	});
</script>

{#snippet btnDel(size: string = '')}
	<button
		type="button"
		class={[
			'border-error  size-5 rounded-sm border bg-white transition-all hover:scale-105',
			size === 'onboarding' ? '' : 'absolute top-2 right-2',
		]}
		onclick={() => clearFile()}
	>
		<span class="sr-only">Clear File</span>
		<icon-list data-name="btn-del" class="icon fill-error size-4"></icon-list>
	</button>
{/snippet}

<Dropzone
	id={uuidv4()}
	bind:files={filesInDropzone}
	onChange={handleOnChange}
	onDrop={handleOnDrop}
	accept=".png"
	class={['relative tracking-tight', cls ? cls : 'size-25', previewUrl ? 'border' : 'border-2 border-dashed']}
>
	{#if (filesInDropzone && filesInDropzone.length > 0) || previewUrl}
		{#if size === 'onboarding'}
			<div class="flex w-full gap-2 px-5">
				{#each thumbFiles as item}
					<p class="line-clamp-2 flex-1 text-left text-sm text-slate-600">{item.fileUploadName}</p>
				{/each}

				{@render btnDel(size)}
			</div>
		{:else}
			<div class="flex size-full flex-col items-center gap-2">
				<picture
					class={['flex size-full items-center justify-center overflow-hidden rounded  bg-slate-100']}
					aria-label={previewUrl}
				>
					<img src={previewUrl} alt="PNG 미리보기" class="max-w-auto min-h-30 object-cover" />
				</picture>

				{@render btnDel(size)}
			</div>
		{/if}
	{:else}
		<icon-list data-name="gallery" class="icon size-5 fill-slate-500"></icon-list>
		{#if size === 'full'}
			<p class="mt-1 text-center text-xs text-slate-600">이미지를 드래그하거나 클릭하여 업로드</p>
			<p class="mt-px text-center text-[10px] text-slate-500">JPG, PNG / 최대 2MB / 1:1 비율 권장</p>
		{:else if size === 'product'}
			<p class="mt-1 text-center text-[10px] text-slate-600">드래그 혹은 클릭</p>
			<p class="mt-px text-center text-[8px] text-slate-500">
				JPG, PNG 최대 2MB <br />
				 1:1 비율 권장
			</p>
		{:else if size === 'onboarding'}
			<p class="mt-1 text-center text-xs text-slate-600">이미지를 드래그하거나 클릭하여 업로드</p>
			<p class="mt-px text-center text-[10px] text-slate-500">PNG / 최대 2MB / 1:1 비율</p>
		{:else}
			<p class="mt-1 text-center text-xs text-slate-600">드래그 혹은 클릭</p>
			<p class="mt-px text-center text-[10px] text-slate-500">
				JPG, PNG
				<br />
				최대 2MB
				<br />
				1:1 비율 권장
			</p>
		{/if}
	{/if}
</Dropzone>
