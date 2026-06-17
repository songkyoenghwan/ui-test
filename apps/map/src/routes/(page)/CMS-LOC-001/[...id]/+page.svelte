<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex max-w-[calc(100dvw-80px)] min-w-5xl flex-col gap-3 p-5">
	<section class="static flex items-center justify-between">
		<ui-tit tit="$한국어 대상지명(최대 50자)$"></ui-tit>
		<div>
			<ui-btn variant="primary" size="lg" txt="저장" class="w-20"></ui-btn>
		</div>
	</section>

	<section class="flex items-center">
		<ui-tit tit="섹션" class="px-4.5"></ui-tit>
	</section>

	<section class="shadow-1xs rounded-lg bg-white px-5 py-4">
		<header>
			<h4 class="tit lg sr-only px-4.5">대상지 정보</h4>
		</header>

		<ul>
			<li>
				<div class="grid max-w-375 grid-cols-[120px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="제공 언어"></ui-tit>
					<lang-chk class="flex flex-wrap items-center gap-5" view="detail" lang={data.item.language}></lang-chk>
				</div>
			</li>
			<li>
				<div class="grid max-w-375 grid-cols-[120px_1fr] gap-5 px-4 py-4">
					<ui-tit tit="대상지명"></ui-tit>
					<lang-translate class="flex-1" view="detail" lang={data.item.targetName}></lang-translate>
				</div>
			</li>
		</ul>
	</section>
</div>
