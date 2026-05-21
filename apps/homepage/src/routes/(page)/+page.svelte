<script lang="ts">
	import MainVisual from '$lib/components/visual/MainVisual.svelte';
	import Industry from '$lib/components/main/Industry.svelte';
	import OurProducts from '$lib/components/main/OurProducts.svelte';
	import logo from '$lib/imgs/logo/logo-dao.svg';
	import bg from '$lib/imgs/visual/dao-visual.jpg';
	import { m } from '$lib/paraglide/messages.js';

	import visualVideo from '$lib/assets/main-video.webm';

	const visuel = {
		logoText: m.main_visual_badge(),
		title: m.main_visual_title(),
		subtitle: m.main_visual_subtitle(),
		btnText: m.product_visual_btn(),
	};
</script>

<main class="main">
	<MainVisual videoUrl={visualVideo} {bg} {logo} logoAlt={visuel.logoText} tit={visuel.title} subtit={visuel.subtitle} btnTxt={visuel.btnText}></MainVisual>

	<Industry />

	<OurProducts />

	<section>
		<sub-heading-line
			line="none"
			title="We Transform \n How Industrial Sites Work"
			text="공간을 인식하고, 작업을 데이터화하며, 산업 운영의 AX 전환을 가속합니다."
		></sub-heading-line>
	</section>

	<section>
		<sub-heading-line line="none" title="Why DEEP.FINE" text="실제 산업 현장에서 축적한 작업·공간·운영 데이터가 딥파인의 차별화된 AI 경쟁력입니다."></sub-heading-line>
	</section>

	<section>
		<sub-heading-line line="none" title="DEEP.FINE NEWS" text="딥파인의 산업 AI, 공간지능, 스마트글라스 솔루션 적용 사례와 최신 소식을 확인하세요."></sub-heading-line>
	</section>
</main>
