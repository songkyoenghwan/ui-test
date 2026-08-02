<svelte:options
	customElement={{
		tag: 'thumbnail-multiple-upload',
		shadow: 'none',
		props: {
			img: { type: 'String' },
			thumbFiles: { type: 'Array' },
			size: { type: 'String' },
			limits: { type: 'String' },
			ratio: { type: 'String' },
			disabled: { type: 'Boolean' },
			multiple: { type: 'Boolean', attribute: 'data-multiple' },
			multipleNumber: { type: 'Number', attribute: 'data-multiple-number' },
			cls: { type: 'String' },
		},
	}}
/>

<script lang="ts">
	import AlertPopup from '@/svelte/alert/AlertPopup.svelte';
	import { Dropzone } from 'flowbite-svelte';
	import { tick } from 'svelte';
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
		img = $bindable(''),
		thumbFiles = $bindable([]),
		size = '',
		limits = '2',
		ratio = '1:1',
		disabled = false,
		multiple = false,
		multipleNumber = 1,
		cls = '',
	}: {
		img: string;
		thumbFiles: FacilityFile[];
		size: string;
		limits?: string;
		ratio?: string;
		disabled?: boolean;
		multiple?: boolean;
		multipleNumber?: number;
		cls: string;
	} = $props();

	let filesInDropzone: FileList | null = $state(null);
	let localFiles: File[] = [];
	let errorMessage = $state('');
	let alertState = $state<'open' | 'close'>('close');

	const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png'];
	const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];
	const objectUrls = new Set<string>();
	const MAX_FILE_SIZE = $derived(Number(limits) * 1024 * 1024);
	const uploadLimit = $derived(Math.max(1, multipleNumber));
	const isMultiple = $derived(multiple || uploadLimit > 1);
	const isAtLimit = $derived(isMultiple && (thumbFiles?.length ?? 0) >= uploadLimit);
	const previewUrl = $derived(thumbFiles?.[0]?.fileUrl || img || '');

	function syncFileList() {
		const transfer = new DataTransfer();
		localFiles.forEach((file) => transfer.items.add(file));
		filesInDropzone = transfer.files;
	}

	function revokeObjectUrl(url?: string) {
		if (url && objectUrls.has(url)) {
			URL.revokeObjectURL(url);
			objectUrls.delete(url);
		}
	}

	function clearFile(input?: HTMLInputElement) {
		thumbFiles.forEach((file) => revokeObjectUrl(file.fileUrl));
		localFiles = [];
		filesInDropzone = null;
		thumbFiles = [];
		img = '';
		if (input) input.value = '';
	}

	function validateImageFile(file: File) {
		const extension = file.name.split('.').pop()?.toLowerCase() ?? '';

		if (!ALLOWED_EXTENSIONS.includes(extension) || !ALLOWED_MIME_TYPES.includes(file.type)) {
			return 'JPG 또는 PNG 파일만 업로드할 수 있습니다.';
		}

		if (file.size > MAX_FILE_SIZE) {
			return `파일 크기가 ${limits}MB를 초과했습니다.`;
		}

		return '';
	}

	function fileKey(file: File) {
		return `${file.name}:${file.size}:${file.type}:${file.lastModified}`;
	}

	async function showError(message: string) {
		errorMessage = message;
		await tick();
		alertState = 'open';
	}

	async function addFiles(incoming: FileList | File[]) {
		const selected = Array.from(incoming);
		const validFiles: File[] = [];

		for (const file of selected) {
			const validationMessage = validateImageFile(file);
			if (validationMessage) {
				await showError(validationMessage);
				return;
			}
		}

		const currentKeys = new Set(localFiles.map(fileKey));
		for (const file of selected) {
			if (!currentKeys.has(fileKey(file))) {
				validFiles.push(file);
				currentKeys.add(fileKey(file));
			}
		}

		if (validFiles.length === 0) return;

		if (!isMultiple) {
			clearFile();
		}

		const remaining = uploadLimit - (thumbFiles?.length ?? 0);
		if (remaining <= 0) {
			await showError(`이미지는 최대 ${uploadLimit}개까지 업로드할 수 있습니다.`);
			return;
		}

		const accepted = validFiles.slice(0, remaining);
		const now = Date.now();
		const newThumbFiles = accepted.map((file, index): FacilityFile => {
			const url = URL.createObjectURL(file);
			objectUrls.add(url);

			return {
				fileMimeType: file.type,
				fileOriginalName: file.name,
				fileSize: file.size,
				fileUploadName: file.name,
				fileUploadPath: '',
				fileUrl: url,
				id: now + index,
			};
		});

		localFiles = [...localFiles, ...accepted];
		thumbFiles = [...(thumbFiles ?? []), ...newThumbFiles];
		img = thumbFiles[0]?.fileUrl ?? '';
		syncFileList();

		if (validFiles.length > accepted.length) {
			await showError(`이미지는 최대 ${uploadLimit}개까지 업로드할 수 있습니다.`);
		}
	}

	async function handleOnChange(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		const target = event.currentTarget as HTMLInputElement;

		if (!target.files?.length) return;

		// bind:files가 먼저 갱신되더라도 localFiles만 이전 선택분의 기준으로 사용
		await addFiles(target.files);
		target.value = '';
	}

	async function handleOnDrop(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();

		if (event.dataTransfer?.files.length) {
			await addFiles(event.dataTransfer.files);
		}
	}

	function removePreview(event: Event, index: number) {
		event.stopPropagation();
		event.preventDefault();

		const removedFile = thumbFiles[index];
		revokeObjectUrl(removedFile?.fileUrl);
		thumbFiles = thumbFiles.filter((_, itemIndex) => itemIndex !== index);

		const localIndex = localFiles.findIndex(
			(file) =>
				file.name === removedFile?.fileOriginalName &&
				file.size === removedFile?.fileSize &&
				file.type === removedFile?.fileMimeType,
		);
		if (localIndex >= 0) {
			localFiles = localFiles.filter((_, itemIndex) => itemIndex !== localIndex);
		}

		syncFileList();
		img = thumbFiles[0]?.fileUrl ?? '';
	}
</script>

{#snippet btnDel(size: string = '', idx?: number)}
	<button
		type="button"
		class={[
			'border-error size-5 rounded-sm border bg-white transition-all hover:scale-105',
			size === 'onboarding' ? '' : 'absolute top-2 right-2',
		]}
		onclick={(event) => (typeof idx === 'number' ? removePreview(event, idx) : clearFile())}
	>
		<span class="sr-only">파일 삭제</span>
		<icon-list data-name="btn-del" class="icon fill-error size-4"></icon-list>
	</button>
{/snippet}

{#if isMultiple && thumbFiles?.length}
	<div class="grid w-full grid-cols-3 items-center gap-2">
		{#each thumbFiles as item, idx (item.id)}
			<div
				class={[
					'has-border-slate-100 relative flex flex-col items-center gap-2 tracking-tight has-disabled:cursor-no-drop has-disabled:bg-slate-100',
					cls || 'size-full',
				]}
			>
				<picture
					class="flex size-full items-center justify-center overflow-hidden rounded bg-slate-100"
					aria-label={item.fileOriginalName}
				>
					<img src={item.fileUrl} alt={item.fileOriginalName} class="max-w-auto min-h-30 object-cover" />
				</picture>
				{@render btnDel(size, idx)}
			</div>
		{/each}
	</div>
{/if}

{#if !isAtLimit}
	<Dropzone
		id={uuidv4()}
		bind:files={filesInDropzone}
		onChange={handleOnChange}
		onDrop={handleOnDrop}
		accept=".png, .jpg, .jpeg"
		{disabled}
		multiple={isMultiple}
		class={[
			!isMultiple
				? 'has-border-slate-100 relative tracking-tight has-disabled:cursor-no-drop has-disabled:bg-slate-100'
				: '',
			!isMultiple && cls ? cls : 'size-25',
			!isMultiple && previewUrl ? 'border' : 'border-2 border-dashed',
			isMultiple ? 'h-min w-full border-0 bg-transparent' : '',
		]}
	>
		{#if !isMultiple && previewUrl}
			{#if size === 'onboarding'}
				<div class="flex w-full gap-2 px-5">
					<p class="line-clamp-2 flex-1 text-left text-sm text-slate-600">
						{thumbFiles[0]?.fileUploadName}
					</p>
					{@render btnDel(size)}
				</div>
			{:else}
				<div class="flex size-full flex-col items-center gap-2">
					<picture
						class="flex size-full items-center justify-center overflow-hidden rounded bg-slate-100"
						aria-label={thumbFiles[0]?.fileOriginalName || '미리보기'}
					>
						<img
							src={previewUrl}
							alt={thumbFiles[0]?.fileOriginalName || '이미지 미리보기'}
							class="max-w-auto min-h-30 object-cover"
						/>
					</picture>
					{@render btnDel(size)}
				</div>
			{/if}
		{:else}
			<icon-list data-name="gallery" class="icon size-5 fill-slate-500"></icon-list>
			<p class="mt-1 text-center text-xs text-slate-600">드래그하거나 클릭하여 업로드</p>
			<p class="mt-px text-center text-[10px] text-slate-500">
				JPG, PNG / 최대 {limits}MB / {ratio} 비율 권장
				{#if isMultiple}
					/ {thumbFiles?.length ?? 0}/{uploadLimit}개{/if}
			</p>
		{/if}
	</Dropzone>
{/if}

<AlertPopup bind:open={alertState} txt={errorMessage} cancel="" />
