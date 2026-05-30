<svelte:options
	customElement={{
		tag: 'sub-dao',
		shadow: 'none',
		props: {
			videoUrl: { type: 'String', attribute: 'data-vide-url' },
		},
	}}
/>

<script lang="ts">
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

	const logo = `${__STATIC_URL__}/imgs/logo/logo-dao.svg`;
	const bg = `${__STATIC_URL__}/imgs/visual/dao-visual.jpg`;
	const videoUrl = `${__STATIC_URL__}/video/dao-video.webm`;

	const industries = $state([
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-dao-1.png`, tit: m.dao_industries_list_1() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-dao-2.png`, tit: m.dao_industries_list_2() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-dao-3.png`, tit: m.dao_industries_list_3() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-dao-4.png`, tit: m.dao_industries_list_4() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-dao-5.png`, tit: m.dao_industries_list_5() },
		{ img: `${__STATIC_URL__}/imgs/banner/img-banner-dao-11.png`, tit: m.dao_industries_list_6() },
	]);
	const feaKeys = $state([
		{
			tit: m.dao_features_tit_1(),
			txt: [m.dao_features_txt_1(), m.dao_features_txt_1_2()],
			logo: m.dao_features_logo_1(),
			labels: [m.dao_features_list_1_1(), m.dao_features_list_1_2(), m.dao_features_list_1_3(), m.dao_features_list_1_4()],
		},
		{
			tit: m.dao_features_tit_2(),
			txt: [m.dao_features_txt_2()],
			logo: m.dao_features_logo_2(),
			labels: [m.dao_features_list_2_1(), m.dao_features_list_2_2()],
		},
		{
			poster: `${__STATIC_URL__}/video/workflow-video.png`,
			video: `${__STATIC_URL__}/video/workflow-video.webm`,
			tit: m.dao_features_tit_3(),
			txt: [m.dao_features_txt_3(), m.dao_features_txt_3_2()],
			logo: m.dao_features_logo_3(),
			labels: [m.dao_features_list_3_1(), m.dao_features_list_3_2(), m.dao_features_list_3_3(), m.dao_features_list_3_4()],
		},
		{
			poster: `${__STATIC_URL__}/video/remote-video.png`,
			video: `${__STATIC_URL__}/video/remote-video.webm`,
			tit: m.dao_features_tit_4(),
			txt: [m.dao_features_txt_4(), m.dao_features_txt_4_2()],
			logo: m.dao_features_logo_4(),
			labels: [m.dao_features_list_4_1(), m.dao_features_list_4_2(), m.dao_features_list_4_3()],
		},
	]);
	const resultKeys = $state([
		{ result: 'up', num: 60, subTit: m.dao_result_subTit_1(), txt: m.dao_result_txt_1() },
		{ result: 'down', num: 25, subTit: m.dao_result_subTit_2(), txt: m.dao_result_txt_2() },
		{ result: 'down', num: 40, subTit: m.dao_result_subTit_3(), txt: m.dao_result_txt_3() },
		{ result: 'chk', num: 100, subTit: m.dao_result_subTit_4(), txt: m.dao_result_txt_4() },
	]);
	const caseKeys = $state([
		{
			id: 'das-case-1',
			btn: m.dao_case_btn_1(),
			logo: [`${__STATIC_URL__}/imgs/case/logo-case-dao-1.png`],
			img: `${__STATIC_URL__}/imgs/case/img-case-dao-1.png`,
			tit: m.dao_case_tit_1_1(),
			txt: [m.dao_case_txt_1_1(), m.dao_case_txt_1_2()],
			etc: [m.dao_case_etc_1_1, m.dao_case_etc_1_2, m.dao_case_etc_1_3],
		},
		{
			id: 'das-case-2',
			btn: m.dao_case_btn_2(),
			logo: ['client'],
			img: 'https://www.dummyimage.com/720X480/000/fff',
			tit: m.dao_case_tit_2_1(),
			txt: [m.dao_case_txt_2_1(), m.dao_case_txt_2_2()],
			etc: [m.dao_case_etc_2_1, m.dao_case_etc_2_2, m.dao_case_etc_2_3],
		},
		{
			id: 'das-case-3',
			btn: m.dao_case_btn_3(),
			logo: ['client'],
			img: 'https://www.dummyimage.com/720X480/000/fff',
			tit: m.dao_case_tit_3_1(),
			txt: [m.dao_case_txt_3_1(), m.dao_case_txt_3_2()],
			etc: [m.dao_case_etc_3_1, m.dao_case_etc_3_2, m.dao_case_etc_3_3],
		},
		{
			id: 'das-case-4',
			btn: m.dao_case_btn_4(),
			logo: [`${__STATIC_URL__}/imgs/case/logo-case-dao-4.png`],
			img: `${__STATIC_URL__}/imgs/case/img-case-dao-4.png`,
			tit: m.dao_case_tit_4_1(),
			txt: [m.dao_case_txt_4_1()],
			etc: [m.dao_case_etc_4_1, m.dao_case_etc_4_2, m.dao_case_etc_4_3],
		},
		{
			id: 'das-case-5',
			btn: m.dao_case_btn_5(),
			logo: ['client'],
			img: `${__STATIC_URL__}/imgs/case/img-case-dao-5.png`,
			tit: m.dao_case_tit_5_1(),
			badge: [m.dao_case_badge_5_1()],
			txt: [m.dao_case_txt_5_1(), m.dao_case_txt_5_2()],
			etc: [m.dao_case_etc_5_1, m.dao_case_etc_5_2, m.dao_case_etc_5_3],
		},
	]);

	const faqtKeys = $state([
		{ id: 'faq-chk-1', tit: m.dao_faq_tit_1(), txt: m.dao_faq_txt_1() },
		{ id: 'faq-chk-2', tit: m.dao_faq_tit_2(), txt: m.dao_faq_txt_2() },
		{ id: 'faq-chk-3', tit: m.dao_faq_tit_3(), txt: m.dao_faq_txt_3() },
		{ id: 'faq-chk-4', link: '/', btn: m.btn_start_trial_free(), tit: m.dao_faq_tit_4(), txt: m.dao_faq_txt_4() },
		{ id: 'faq-chk-5', link: '/', btn: m.btn_quote(), tit: m.dao_faq_tit_5(), txt: m.dao_faq_txt_5() },
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

<SubVisual {videoUrl} {bg} {logo} logoAlt={m.dao_visual_badge()} tit={m.dao_visual_title()} subtit={m.dao_visual_subtitle}></SubVisual>

<Problem page="dao" />

<Industries
	cls="lg:grid-cols-[repeat(auto-fit,minmax(calc(33%-10px),1fr))] grid-cols-[repeat(auto-fit,1fr)]"
	tit={m.dao_industries_title()}
	txt={m.dao_industries_text()}
	subTxt={m.dao_industries_subtext()}
	lists={[...industries]}
/>

<Features tit={m.dao_features_title()} txt={m.dao_features_text()} lists={[...feaKeys]} page="dao" />

<Results tit={m.dao_result_tit()} txt={m.dao_result_subTit()} lists={[...resultKeys]} />

<Faq tit="Proven Results" txt={m.dao_subtitle_faq()} lists={[...faqtKeys]} />

<BannerInquiry page="dao" />
