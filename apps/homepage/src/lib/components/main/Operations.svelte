<svelte:options
	customElement={{
		tag: 'main-operations',
		shadow: 'none',
	}}
/>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import bgOp from '$static/imgs/main/work/bg-operations.png?url';
</script>

<section class="relative max-w-dvw rounded-xl bg-(image:--bg-op) bg-cover bg-center bg-no-repeat p-5 text-white lg:p-15" style="--bg-op: url('{bgOp}');">
	<sub-heading-line line="none" title={m.main_title_ai()} subTit={m.main_subtitle_ai()}></sub-heading-line>
	<div class="mt-7.5 inline-flex w-full gap-5 max-lg:flex-col lg:mt-9">
		<a
			href="/"
			class="hover:text-3743ff text-2md group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold text-white transition-colors hover:bg-white max-lg:justify-between lg:min-h-13.5 lg:w-auto"
		>
			<span>{m.btn_inquiry()}</span>
			<icon-list name="arrow-right" class="group-hover:stroke-primary size-6 stroke-white"></icon-list>
		</a>

		<a
			href="/static/pdf/Company_Introduction_DEEPFINE_kr.pdf"
			download="딥파인 회사소개서"
			class="hover:text-3743ff text-2md group inline-flex min-h-12 w-full items-center gap-2.5 rounded-md border border-white px-5 text-left font-bold text-white transition-colors hover:bg-white max-lg:justify-between lg:min-h-13.5 lg:w-auto"
			title={m.btn_introduction()}
			target="_blank"
		>
			<span>
				{m.btn_introduction()}
			</span>
			<icon-list name="import" class="group-hover:stroke-primary size-6 stroke-white"></icon-list>
		</a>
	</div>
</section>
