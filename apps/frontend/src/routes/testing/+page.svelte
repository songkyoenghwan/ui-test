<script lang="ts">
	import { socketManager } from '@/lib/socket.svelte';

	// 상태
	let boxs = $state<string>('');
	let odeerNumber = $state<string>('');
	let inputOrderMessage = $state('');
	let inputMessage = $state('');

	// 소켓 리스너 등록 및 데이터 업데이트
	$effect(() => {
		const instance = socketManager.instance;
		if (!instance) return;

		// 박스 정보 수신
		instance.on('box', (data: string) => {
			boxs = data;
			console.log('박스 정보 업데이트:', data);
		});

		// 스캔 상태 수신
		instance.on('scan', (data: string) => {
			console.log('스캔 데이터 수신:', data);
		});

		return () => {
			instance.off('box');
			instance.off('scan');
		};
	});

	// 동작 함수inputOrderMessage = '';

	function sendMessage() {
		if (inputMessage.trim() && socketManager.instance) {
			socketManager.emit('box', inputMessage.trim());
			inputMessage = '';
		}
	}
	function sendScan() {
		if (odeerNumber.trim() && socketManager.instance) return;

		socketManager.emit('scan', inputOrderMessage.trim());
		inputOrderMessage = '';
	}
</script>

<div class="flex flex-col gap-6 p-6">
	<div class="flex items-center gap-4 rounded-xl border bg-gray-50 p-4">
		<div class="flex items-center gap-2">
			<span class="size-3 rounded-full {socketManager.isConnected ? 'bg-green-500' : 'bg-red-500'}"></span>
			<p class="text-sm font-bold">시스템: {socketManager.isConnected ? '연결됨' : '끊김'}</p>
		</div>
		<div class="h-4 w-px bg-gray-300"></div>
		<p class="text-sm">
			현재 주문번호: <span class="text-primary font-bold">{inputOrderMessage || '없음'}</span>
		</p>
		<p class="text-sm">
			현재 박스: <span class="text-primary font-bold">{inputMessage || '없음'}</span>
		</p>
	</div>

	<div class="flex flex-col gap-4">
		<div class="grid grid-cols-[1fr_auto] gap-3">
			<input
				bind:value={inputOrderMessage}
				placeholder="주문번호"
				class="focus:outline-primary rounded-lg border p-3 shadow-sm"
				onkeydown={(e) => e.key === 'Enter' && sendScan()}
			/>
			<button onclick={sendScan} disabled={!socketManager.isConnected} class="rounded-lg bg-black px-8 py-3 font-bold text-white disabled:bg-gray-300">전송</button>
		</div>

		<div class="grid grid-cols-[1fr_auto] gap-3">
			<input
				bind:value={inputMessage}
				placeholder="바코드 번호"
				class="focus:outline-primary rounded-lg border p-3 shadow-sm"
				onkeydown={(e) => e.key === 'Enter' && sendMessage()}
			/>
			<button onclick={sendMessage} disabled={!socketManager.isConnected} class="rounded-lg bg-black px-8 py-3 font-bold text-white disabled:bg-gray-300">전송</button>
		</div>
	</div>
</div>
