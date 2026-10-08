<script lang="ts">
	import { enhance } from '$app/forms';
	import { showErrorAlert, showSuccessAlert } from '$lib/utils/alert';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Datepicker, Dropzone } from 'flowbite-svelte';

	let workType = $state<string>('피킹');
	let inspectionType = $state<string>('N');
	let jobNumber = $state<string>('');
	let selectedDate = $state<Date | undefined>(undefined);

	const states = {
		get workType() {
			return workType;
		},
		set workType(v) {
			workType = v;
		},
		get inspectionType() {
			return inspectionType;
		},
		set inspectionType(v) {
			inspectionType = v;
		},
	};

	let filesInDropzone: FileList | null = $state(null);

	function handleOnChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			const file = target.files[0];
			const ext = file.name.split('.').pop()?.toLowerCase();
			if (['xlsx', 'xls'].includes(ext || '')) {
				const dataTransfer = new DataTransfer();
				dataTransfer.items.add(file);
				filesInDropzone = dataTransfer.files;
			} else {
				alert('엑셀 파일만 업로드 가능합니다.');
				filesInDropzone = null;
				target.value = ''; // input 초기화
			}
		}
	}

	function handleOnDrop(event: DragEvent) {
		console.log('handleOnDrop fired.');
		event.preventDefault();
		const droppedFiles = event.dataTransfer?.files;
		if (!droppedFiles) return;

		const allowedExtensions = ['xlsx', 'xls'];
		const filteredFiles = Array.from(droppedFiles).filter((file) => {
			const extension = file.name.split('.').pop()?.toLowerCase();
			return extension && allowedExtensions.includes(extension);
		});

		if (filteredFiles.length === 0) {
			filesInDropzone = null;
			alert('엑셀 파일(.xlsx, .xls)만 업로드 가능합니다.');
			return;
		}

		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(filteredFiles[0]);

		filesInDropzone = dataTransfer.files;
	}

	function showFiles(files: FileList | null): string {
		console.log('showFiles fired.');
		if (!files || files.length === 0) return 'No files selected.';
		return Array.from(files)
			.map((file) => file.name)
			.join(', ');
	}

	const handleResult: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				await showErrorAlert('작업지시서 업로드 실패', String(result.data?.message));
			}

			if (result.type === 'success') {
				const swalResult = await showSuccessAlert('작업지시서 업로드 성공', String(result.data?.message));
				if (swalResult.isConfirmed) {
					location.reload();
					return;
				}
			}

			await update();
		};
	};
</script>

{#snippet label(id = '', name = '', text = '', value = '')}
	<label for={id} class="rounedd-lg border-input h-input has-checked:border-primary grid flex-1 place-content-center rounded-lg border">
		<input type="radio" {id} {name} class="peer sr-only" data-check-tab="btn" {value} bind:group={states[name as keyof typeof states]} />
		<span class="text-muted-frg peer-checked:text-primary">{text}</span>
	</label>
{/snippet}

<article class="grid place-content-center">
	<form
		method="POST"
		action="/"
		use:enhance={handleResult}
		class="bg-bkg p-section max-sm:p-card space-y-heading mx-auto w-150 rounded-xl shadow-[0_0_10px_0_rbga(0,0,0,0.1)]"
		enctype="multipart/form-data"
		data-upload="dom"
	>
		<h2 class="text-primary text-center text-3xl font-bold max-sm:text-xl">작업지시서 업로드</h2>

		<ul class="group/upload lg:gap-section-gap gap-card flex flex-col">
			<li class="flex flex-col gap-3">
				<p class="text-lg">작업종류</p>
				<div class="gap-card flex items-center">
					{@render label('work-1', 'workType', '피킹', '피킹')}
					{@render label('work-2', 'workType', 'DAS', 'DAS')}
				</div>
			</li>

			{#if workType === '피킹'}
				<li class="flex flex-col gap-3">
					<p class="text-lg">검수유형</p>
					<div class="gap-card flex items-center">
						{@render label('insp-y', 'inspectionType', 'N', 'N')}
						{@render label('insp-n', 'inspectionType', 'SAME', 'SAME')}
					</div>
				</li>
			{/if}

			<li class="flex flex-col gap-3">
				<label for="jobNumber" class="text-lg">작업번호</label>
				<div class="gap-card flex items-center">
					<input
						type="number"
						id="jobNumber"
						name="waveNumber"
						placeholder="예: 202603180001"
						class="rounedd-lg border-input h-input text-999 grid flex-1 place-content-center rounded-lg border px-4"
						bind:value={jobNumber}
						onkeydown={({ target }) => {
							if (target.value.length > 12) {
								target.value = target.value.slice(0, 12);
							}
						}}
					/>
				</div>
			</li>

			<li class="flex flex-col gap-3">
				<p class="text-lg">등록일자</p>
				<div>
					<Datepicker
						id="selectedDate"
						placeholder="연도-월-일"
						bind:value={selectedDate}
						locale="ko"
						dateFormat={{ year: 'numeric', month: 'short', day: '2-digit' }}
						inputClass="rounedd-lg border-input h-input text-999 grid flex-1 place-content-center rounded-lg border px-4 w-full text-lg max-sm:text-sm dark:border-input dark:text-999 dark:bg-white"
					/>
					<input type="hidden" name="waveDate" value={selectedDate} />
				</div>
			</li>

			<li class="flex flex-col gap-3">
				<p class="text-lg">작업 지시서 엑셀 파일 업로드</p>
				<Dropzone
					id="xlUpload"
					name="file"
					bind:files={filesInDropzone}
					onChange={handleOnChange}
					onDrop={handleOnDrop}
					multiple
					accept=".xlsx, .xls"
					class="rounedd-lg h-input border-primary has-checked:text-primary hover:bg-primary/5 dark:border-input dark:text-999 grid flex-1 place-content-center rounded-lg border border-solid bg-white p-4 dark:bg-white  dark:hover:bg-white"
				>
					{#if !filesInDropzone || filesInDropzone.length === 0}
						<p class="text-primary">파일 선택</p>
					{:else}
						<p class="text-primary text-sm">{showFiles(filesInDropzone)}</p>
						<button class="text-primary mt-2 text-sm hover:underline" onclick={() => (filesInDropzone = null)}>삭제</button>
					{/if}
				</Dropzone>

				<p class="text-muted-frg text-base">*.xlsx, *.xls 형식의 파일만 업로드 가능합니다.</p>
			</li>
		</ul>

		<div class="gap-card flex items-center">
			<button
				type="submit"
				class="text-primary-frg bg-primary disabled:bg-muted disabled:text-muted-frg flex h-15 flex-1 items-center justify-center rounded-lg text-xl font-semibold"
			>
				<span>업로드</span>
			</button>
		</div>
	</form>
</article>

<style>
	:global([aria-haspopup='dialog']) {
		background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.6641 2.66675V6.66675' stroke='%23292D32' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M21.3359 2.66675V6.66675' stroke='%23292D32' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.66406 12.1201H27.3307' stroke='%23292D32' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M28 11.3334V22.6667C28 26.6667 26 29.3334 21.3333 29.3334H10.6667C6 29.3334 4 26.6667 4 22.6667V11.3334C4 7.33341 6 4.66675 10.6667 4.66675H21.3333C26 4.66675 28 7.33341 28 11.3334Z' stroke='%23292D32' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M20.925 18.2668H20.9369' stroke='%23292D32' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M20.925 22.2668H20.9369' stroke='%23292D32' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15.9953 18.2668H16.0073' stroke='%23292D32' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15.9953 22.2668H16.0073' stroke='%23292D32' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.0578 18.2668H11.0698' stroke='%23292D32' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.0578 22.2668H11.0698' stroke='%23292D32' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
		background-position: calc(100% - 0.625rem) 50%;
		background-size: 2rem 2rem;
		background-repeat: no-repeat;
	}

	:global([aria-label='Open date picker']),
	:global([aria-label='Close date picker']) {
		& > svg {
			display: none !important;
		}
	}
</style>
