<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import '@/lib/styles/index.css';

	let { data } = $props();

	const handleBack = () => {
		goto('/', { replaceState: true });
	};
</script>

<main class="gap-container transition-color h-dvh place-content-center">
	<section class="bg-bkg p-section space-y-heading mx-auto w-150 rounded-xl text-center shadow-[0_0_10px_0_rbga(0,0,0,0.1)]">
		<h1 class="text-3xl font-bold">
			{page.status}
			<br />
			{page.error?.message ? '페이지를 찾을 수 없습니다.' : ''}
		</h1>

		<button aria-label={data?.user?.name || ''} onclick={handleBack} class="text-primary text-4xl font-bold hover:underline">이전 페이지로</button>
	</section>
</main>
