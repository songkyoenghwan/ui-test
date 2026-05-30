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
	import Faq from '$/lib/components/faq/Faq.svelte';
	import BannerDsc from '$lib/components/banner/BannerDsc.svelte';
	import Features from '$lib/components/product/Features.svelte';
	import Industries from '$lib/components/product/Industries.svelte';
	import Results from '$lib/components/product/Results.svelte';
	import SubVisual from '$lib/components/visual/SubVisual.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { lenisStore } from '$lib/utils/scrollMove.svelte';
	import Lenis from 'lenis';
	import { setContext } from 'svelte';

	let page = 'dsc';
	const logo = `${__STATIC_URL__}/imgs/logo/logo-sub-${page}.svg`;
	const bg = `${__STATIC_URL__}/video/dsc-video.png`;
	const videoUrl = `${__STATIC_URL__}/video/dsc-video.webm`;

	const industries = $state([
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-${page}-1.png`, tit: m.dsc_industries_list_1(), txt: m.dsc_industries_list_txt_1() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-${page}-2.png`, tit: m.dsc_industries_list_2(), txt: m.dsc_industries_list_txt_2() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-${page}-3.png`, tit: m.dsc_industries_list_3(), txt: m.dsc_industries_list_txt_3() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-dao-8.png`, tit: m.dsc_industries_list_4(), txt: m.dsc_industries_list_txt_4() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-dao-9.png`, tit: m.dsc_industries_list_5(), txt: m.dsc_industries_list_txt_5() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-dao-3.png`, tit: m.dsc_industries_list_6(), txt: m.dsc_industries_list_txt_6() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-dao-10.png`, tit: m.dsc_industries_list_7(), txt: m.dsc_industries_list_txt_7() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-${page}-8.png`, tit: m.dsc_industries_list_8(), txt: m.dsc_industries_list_txt_8() },
	]);
	const feaKeys = $state([
		{
			poster: `${__STATIC_URL__}/video/scan-video.png`,
			video: `${__STATIC_URL__}/video/scan-video.webm`,
			tit: m.dsc_features_tit_1(),
			txt: [m.dsc_features_txt_1(), m.dsc_features_txt_1_2()],
			logo: m.dsc_features_logo_1(),
			labels: [m.dsc_features_list_1_1(), m.dsc_features_list_1_2(), m.dsc_features_list_1_3()],
		},
		{
			poster: `${__STATIC_URL__}/video/vps-video.png`,
			video: `${__STATIC_URL__}/video/vps-video.webm`,
			tit: m.dsc_features_tit_2(),
			txt: [m.dsc_features_txt_2()],
			logo: m.dsc_features_logo_2(),
			labels: [m.dsc_features_list_2_1(), m.dsc_features_list_2_2(), m.dsc_features_list_2_3()],
		},
		{
			tit: m.dsc_features_tit_3(),
			txt: [m.dsc_features_txt_3()],
			logo: m.dsc_features_logo_3(),
			labels: [m.dsc_features_list_3_1(), m.dsc_features_list_3_2()],
		},
		{
			img: `${__STATIC_URL__}/imgs/features/logo-features-dsc-4.png`,
			tit: m.dsc_features_tit_4(),
			txt: [m.dsc_features_txt_4(), m.dsc_features_txt_4_2()],
			logo: m.dsc_features_logo_4(),
			labels: [m.dsc_features_list_4_1(), m.dsc_features_list_4_2(), m.dsc_features_list_4_3()],
		},
		{
			img: `${__STATIC_URL__}/imgs/features/logo-features-dsc-5.png`,
			tit: m.dsc_features_tit_5(),
			txt: [m.dsc_features_txt_5(), m.dsc_features_txt_4_2()],
			logo: m.dsc_features_logo_5(),
			labels: [m.dsc_features_list_5_1(), m.dsc_features_list_5_2(), m.dsc_features_list_5_3()],
		},
	]);
	let featuresPart1 = $derived(feaKeys.slice(0, 3));
	let featuresPart2 = $derived(feaKeys.slice(3, 5));
	const resultKeys = $state([
		{ img: `${__STATIC_URL__}/imgs/result/img-result-${page}-1.png`, tit: m.dsc_result_subTit_1(), txt: m.dsc_result_txt_1() },
		{ img: `${__STATIC_URL__}/imgs/result/img-result-${page}-2.png`, tit: m.dsc_result_subTit_2(), txt: m.dsc_result_txt_2() },
		{ img: `${__STATIC_URL__}/imgs/result/img-result-${page}-3.png`, tit: m.dsc_result_subTit_3(), txt: m.dsc_result_txt_3() },
		{ img: `${__STATIC_URL__}/imgs/result/img-result-${page}-4.png`, tit: m.dsc_result_subTit_4(), txt: m.dsc_result_txt_4() },
	]);
	const caseKeys = $state([
		{
			id: 'dsc-case-1',
			btn: m.dsc_case_btn_1(),
			logo: [`${__STATIC_URL__}/imgs/case/logo-case-${page}-1.png`],
			img: `${__STATIC_URL__}/imgs/case/img-case-${page}-1.png`,
			tit: m.dsc_case_tit_1_1(),
			badge: [m.dsc_case_badge_1_1(), m.dsc_case_badge_1_2(), m.dsc_case_badge_1_3(), m.dsc_case_badge_1_4()],
			txt: [m.dsc_case_txt_1_1()],
			etc: [m.dsc_case_etc_1_1, m.dsc_case_etc_1_2, m.logi_case_etc_1_3],
		},
		{
			id: 'dsc-case-2',
			btn: m.dsc_case_btn_2(),
			logo: [`${__STATIC_URL__}/imgs/case/logo-case-${page}-2.png`, 'client'],
			img: `${__STATIC_URL__}/imgs/case/img-case-${page}-2.png`,
			tit: m.dsc_case_tit_2_1(),
			badge: [m.dsc_case_badge_2_1(), m.dsc_case_badge_2_2(), m.dsc_case_badge_2_3()],
			txt: [m.dsc_case_txt_2_1()],
			etc: [m.dsc_case_etc_2_1, m.dsc_case_etc_2_2],
		},
		{
			id: 'dsc-case-3',
			btn: m.dsc_case_btn_3(),
			logo: ['client'],
			img: `${__STATIC_URL__}/imgs/case/img-case-${page}-3.png`,
			tit: m.dsc_case_tit_3_1(),
			badge: [m.dsc_case_badge_3_1(), m.dsc_case_badge_3_2(), m.dsc_case_badge_3_3()],
			txt: [m.dsc_case_txt_3_1()],
			etc: [m.dsc_case_etc_3_1, m.dsc_case_etc_3_2],
		},
	]);
	const faqtKeys = $state([
		{ id: 'faq-dsc-chk-1', tit: m.dsc_faq_tit_1(), txt: m.dsc_faq_txt_1() },
		{ id: 'faq-dsc-chk-2', tit: m.dsc_faq_tit_2(), txt: m.dsc_faq_txt_2() },
		{ id: 'faq-dsc-chk-3', tit: m.dsc_faq_tit_3(), txt: m.dsc_faq_txt_3() },
		{ id: 'faq-dsc-chk-4', tit: m.dsc_faq_tit_4(), txt: m.dsc_faq_txt_4() },
		{ id: 'faq-dsc-chk-5', link: '/', btn: m.btn_start_trial_free(), tit: m.dsc_faq_tit_5(), txt: m.dsc_faq_txt_5() },
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

<Industries
	cls=" xl:grid-cols-4 lg:grid-cols-2 grid-cols-[repeat(auto-fit,1fr)]"
	tit={m.dsc_industries_title()}
	txt={m.dsc_industries_text()}
	subTxt={m.dsc_industries_subtext()}
	lists={[...industries]}
/>

<Features tit={m.dsc_features_title()} txt={m.dsc_features_text()} lists={[...featuresPart1]} page="dsc" />
<Features tit={m.dsc_features_title_2()} txt={m.dsc_features_text_2()} lists={[...featuresPart2]} page="dsc" />

<Results tit={m.dsc_result_tit()} txt={m.dsc_result_subTit()} lists={[...resultKeys]} page="dsc" />

<Faq tit="FAQ" txt={m.dsc_subtitle_faq()} lists={[...faqtKeys]} />

<BannerDsc />
