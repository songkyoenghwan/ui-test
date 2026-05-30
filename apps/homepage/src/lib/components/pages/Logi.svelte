<svelte:options
	customElement={{
		tag: 'sub-dsc',
		shadow: 'none',
		props: {
			videoUrl: { type: 'String', attribute: 'data-vide-url' },
		},
	}}
/>

<script lang="ts">
	import BannerTrial from '$lib/components/banner/BannerTrial.svelte';
	import Faq from '$/lib/components/faq/Faq.svelte';
	import BannerInquiry from '$lib/components/banner/BannerInquiry.svelte';
	import Features from '$lib/components/product/Features.svelte';
	import Industries from '$lib/components/product/Industries.svelte';
	import Problem from '$lib/components/product/Problem.svelte';
	import Results from '$lib/components/product/Results.svelte';
	import SubVisual from '$lib/components/visual/SubVisual.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { lenisStore } from '$lib/utils/scrollMove.svelte';
	import Lenis from 'lenis';
	import { setContext } from 'svelte';

	const logo = `${__STATIC_URL__}/imgs/logo/logo-sub-logi.svg`;
	const bg = `${__STATIC_URL__}/imgs/visual/logi-visual.jpg`;
	const videoUrl = `${__STATIC_URL__}/video/logi-video.webm`;

	const industries = $state([
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-logi-1.png`, tit: m.logi_industries_list_1(), txt: m.logi_industries_list_txt_1() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-logi-2.png`, tit: m.logi_industries_list_2(), txt: m.logi_industries_list_txt_2() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-logi-3.png`, tit: m.logi_industries_list_3(), txt: m.logi_industries_list_txt_3() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-logi-4.png`, tit: m.logi_industries_list_4(), txt: m.logi_industries_list_txt_4() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-logi-5.png`, tit: m.logi_industries_list_5(), txt: m.logi_industries_list_txt_5() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-logi-6.png`, tit: m.logi_industries_list_6(), txt: m.logi_industries_list_txt_6() },
	]);
	const feaKeys = $state([
		{
			img: `${__STATIC_URL__}/imgs/features/logo-features-logi-1.png`,
			tit: m.logi_features_tit_1(),
			txt: [m.logi_features_txt_1(), m.logi_features_txt_1_2()],
			logo: m.logi_features_logo_1(),
			labels: [m.logi_features_list_1_1(), m.logi_features_list_1_2(), m.logi_features_list_1_3()],
		},
		{
			img: `${__STATIC_URL__}/imgs/features/logo-features-logi-2.png`,
			tit: m.logi_features_tit_2(),
			txt: [m.logi_features_txt_2()],
			logo: m.logi_features_logo_2(),
			labels: [m.logi_features_list_2_1(), m.logi_features_list_2_2(), m.logi_features_list_2_3(), m.logi_features_list_2_4()],
		},
		{
			img: `${__STATIC_URL__}/imgs/features/logo-features-logi-3.png`,
			tit: m.logi_features_tit_3(),
			txt: [m.logi_features_txt_3(), m.logi_features_txt_3_2()],
			logo: m.logi_features_logo_3(),
			labels: [m.logi_features_list_3_1(), m.logi_features_list_3_2(), m.logi_features_list_3_3()],
		},
		{
			img: `${__STATIC_URL__}/imgs/features/logo-features-logi-4.png`,
			tit: m.logi_features_tit_4(),
			txt: [m.logi_features_txt_4(), m.logi_features_txt_4_2()],
			logo: m.logi_features_logo_4(),
			labels: [m.logi_features_list_4_1(), m.logi_features_list_4_2(), m.logi_features_list_4_3()],
		},
		{
			img: `${__STATIC_URL__}/imgs/features/logo-features-logi-5.png`,
			tit: m.logi_features_tit_5(),
			txt: [m.logi_features_txt_5(), m.logi_features_txt_4_2()],
			logo: m.logi_features_logo_5(),
			labels: [m.logi_features_list_5_1(), m.logi_features_list_5_2(), m.logi_features_list_5_3(), m.logi_features_list_5_4()],
		},
	]);
	const resultKeys = $state([
		{ result: 'close', subTit: m.logi_result_subTit_1(), txt: m.logi_result_txt_1() },
		{ result: 'up', num: 25, subTit: m.logi_result_subTit_2(), txt: m.logi_result_txt_2() },
		{ result: 'eye', subTit: m.logi_result_subTit_3(), txt: m.logi_result_txt_3() },
		{ result: 'chk', num: 100, subTit: m.logi_result_subTit_4(), txt: m.logi_result_txt_4() },
	]);
	const caseKeys = $state([
		{
			id: 'logi-case-1',
			btn: m.logi_case_btn_1(),
			logo: `${__STATIC_URL__}/imgs/case/logo-case-logi-1.png`,
			img: `${__STATIC_URL__}/imgs/case/img-case-logi-1.png`,
			tit: m.logi_case_tit_1_1(),
			txt: [m.logi_case_txt_1_1(), m.logi_case_txt_1_2()],
			etc: [m.logi_case_etc_1_1, m.logi_case_etc_1_2, m.logi_case_etc_1_3],
		},
		{
			id: 'logi-case-2',
			btn: m.logi_case_btn_2(),
			logo: `${__STATIC_URL__}/imgs/case/logo-case-logi-2.png`,
			img: `${__STATIC_URL__}/imgs/case/img-case-logi-2.png`,
			tit: m.logi_case_tit_2_1(),
			txt: [m.logi_case_txt_2_1(), m.logi_case_txt_1_2()],
			etc: [m.logi_case_etc_2_1, m.logi_case_etc_2_2, m.logi_case_etc_2_3],
		},
	]);
	const faqtKeys = $state([
		{ id: 'faq-logi-chk-1', tit: m.logi_faq_tit_1(), txt: m.logi_faq_txt_1() },
		{ id: 'faq-logi-chk-2', tit: m.logi_faq_tit_2(), txt: m.logi_faq_txt_2() },
		{ id: 'faq-logi-chk-3', tit: m.logi_faq_tit_3(), txt: m.logi_faq_txt_3() },
		{ id: 'faq-logi-chk-4', tit: m.logi_faq_tit_4(), txt: m.logi_faq_txt_4() },
	]);

	setContext('case-list', {
		get list() {
			return caseKeys;
		},
	});

	$effect(() => {
		const lenis = new Lenis({
			autoRaf: true,
		});

		lenisStore.setInstance(lenis);

		return () => {
			lenisStore.clear();
		};
	});
</script>

<SubVisual {videoUrl} {bg} {logo} logoAlt={m.logi_visual_badge()} tit={m.logi_visual_title()} subtit={m.logi_visual_subtitle}></SubVisual>

<BannerTrial />

<Problem page="logi" />

<Industries
	cls="lg:grid-cols-[repeat(auto-fit,minmax(calc(33%-10px),1fr))] grid-cols-[repeat(auto-fit,1fr)]"
	tit={m.logi_industries_title()}
	txt={m.logi_industries_text()}
	subTxt={m.logi_industries_subtext()}
	lists={[...industries]}
/>

<Features tit={m.logi_features_title()} txt={m.logi_features_text()} lists={[...feaKeys]} page="logi" />

<Results tit={m.logi_result_tit()} txt={m.logi_result_subTit()} lists={[...resultKeys]} />

<Faq tit="FAQ" txt={m.logi_subtitle_faq()} lists={[...faqtKeys]} />

<BannerInquiry page="logi" />
