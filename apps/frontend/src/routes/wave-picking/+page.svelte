<script lang="ts">
	import { deserialize } from '$app/forms';
	import { JOB_STATUS } from '$lib/constants/options';
	import '$lib/styles/wave.css';
	import { download } from '$lib/utils/file';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const originalList = $derived(data.pickings);
	let filteredList = $state([]);
	let inputWorkNumber = $state('');

	$effect.pre(() => {
		filteredList = [...originalList];
	});

	const handleFilter = () => {
		filteredList = originalList.filter((item) => {
			return !inputWorkNumber || item.waveNumber.includes(inputWorkNumber);
		});
	};

	async function onUploadFileDownload(data) {
		await download(`/download?type=uploadFile&wave_id=${data.waveId}&complete_file_id=${data.uploadFileId}`);
	}

	async function onPhotoDownload(data) {
		if (data.taskStatus !== 'C') {
			return alert('작업완료 상태가 아니여서 파일 다운로드 하실 수 없습니다.');
		}
		await download(`/download?type=photo&wave_id=${data.waveId}&complete_file_id=${data.completeFileId}`);
	}

	async function onResultDownload(data) {
		if (data.taskStatus !== 'C') {
			return alert('작업완료 상태가 아니여서 파일 다운로드 하실 수 없습니다.');
		}
		await download(`/download?type=result&wave_id=${data.waveId}&wave_number=${data.waveNumber}`);
	}

	async function onDeleteWave(data) {
		const taskStatus = JOB_STATUS.find((o) => o.value === data.taskStatus)?.label ?? '-';
		const deleteMsg = `웨이브번호 [${data.waveNumber}]\n작업상태 [${taskStatus}]\n정말 삭제하시겠습니까?`;
		if (!confirm(deleteMsg)) {
			return;
		}

		const formData = new FormData();
		formData.append('waveId', data.waveId);
		formData.append('waveNumber', data.waveNumber);

		const response = await fetch('?/deleteWave', {
			method: 'POST',
			body: formData,
		});
		const result = deserialize(await response.text());

		if (result.type === 'failure') {
			return alert(result.data?.message);
		}

		alert('정상적으로 삭제되었습니다');

		filteredList = originalList.filter((item) => item.waveId !== data.waveId);
	}
</script>

<main class="page-main list-main w-full p-0">
	<section class="card table-card">
		<div class="card-header-line">
			<h2 class="text-primary text-3xl font-bold max-sm:text-xl">피킹 리스트</h2>
			<div class="search-box">
				<input
					type="number"
					id="search-input"
					class="search-input"
					placeholder="작업 번호를 입력하세요."
					required
					min="1"
					step="1"
					bind:value={inputWorkNumber}
					onkeydown={(e: KeyboardEvent) => {
						if (e.key === 'Enter') handleFilter();
					}}
				/>
				<button
					class="focus:outline-primary/10 hover:outline-primary disabled:bg-muted disabled:border-muted disabled:text-muted-frg disabled:hover:bg-muted group/btn border-primary hover:bg-primary/5 active:bg-primary/5 text-primary relative inline-flex min-h-10 min-w-10 flex-none items-center justify-center gap-1.25 rounded-full border bg-white px-3 py-1 text-base font-medium focus:outline disabled:cursor-not-allowed"
					id="taskNameSearchBtn"
				>
					검색
				</button>
			</div>
		</div>

		<div class="table-wrapper">
			<div class="table-scroll">
				<table class="job-list-table">
					<thead>
						<tr>
							<th>순번</th>
							<th>작업 번호</th>
							<th>작업 상태</th>
							<th>작업자</th>
							<th>진행률</th>
							<th>피킹 시작 일시</th>
							<!-- <th>박스 매칭 완료 일시</th> -->
							<th>피킹 완료 일시</th>
							<th>업로드 파일</th>
							<th>다운로드</th>
							<th>삭제</th>
						</tr>
					</thead>
					<tbody>
						{#each filteredList as item, i}
							<tr>
								<td>{i + 1}</td>
								<td class={item.colorClass}>{item.waveNumber}</td>
								<td>{item.jobStatus}</td>
								<td>{item.jobUserName}</td>
								<td>{item.progressRate}%</td>
								<td>{item.startDt}</td>
								<!-- <td>{item.taskBoxMatchingDt}</td> -->
								<td>{item.endDt}</td>
								<td>
									<button class="table-action-btn upload-file-btn-row" onclick={() => onUploadFileDownload(item)}>다운로드</button>
								</td>
								<td>
									<div class="download-btn-group">
										{#if item.taskStatus === 'C'}
											{#if item.completeFileSize > 50}
												<button class="table-action-btn photo-btn" onclick={() => onPhotoDownload(item)}>사진 다운로드</button>
											{/if}
											<button class="table-action-btn result-btn" onclick={() => onResultDownload(item)}>결과 다운로드</button>
										{/if}
									</div>
								</td>
								<td>
									<button class="table-action-btn delete-btn-row" onclick={() => onDeleteWave(item)}>삭제</button>
								</td>
							</tr>
						{/each}
						{#if filteredList.length === 0}
							<tr class="no-data">
								<td colspan="10">데이터가 없습니다.</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</section>
</main>

<style>
</style>
