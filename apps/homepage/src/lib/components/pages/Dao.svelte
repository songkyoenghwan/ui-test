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
	import Features from '$lib/components/product/Features.svelte';
	import Industries from '$lib/components/product/Industries.svelte';
	import Problem from '$lib/components/product/Problem.svelte';
	import Results from '$lib/components/product/Results.svelte';
	import FieldCase from '$/lib/components/slide/FieldCase.svelte';
	import Faq from '$/lib/components/faq/Faq.svelte';
	import SubVisual from '$lib/components/visual/SubVisual.svelte';
	import BannerInquiry from '$lib/components/banner/BannerInquiry.svelte';

	import logo from '$lib/assets/imgs/logo/logo-dao.svg';
	import bg from '$lib/assets/imgs/visual/dao-visual.jpg';
	import { m } from '$lib/paraglide/messages.js';

	let { videoUrl = '' } = $props();

	const industries = [
		{ txt: m.product_industries_list_1?.() },
		{ txt: m.product_industries_list_2?.() },
		{ txt: m.product_industries_list_3?.() },
		{ txt: m.product_industries_list_4?.() },
		{ txt: m.product_industries_list_5?.() },
		{ txt: m.product_industries_list_6?.() },
	] as const;

	const feature = {
		tit: m.product_features_title(),
		txt: m.product_features_text(),
	};
	const feaKeys = [
		{
			tit: m.product_features_tit_1?.(),
			txt: m.product_features_txt_1?.(),
			logo: m.product_features_logo_1?.(),
			labels: 4,
		},
		{
			tit: m.product_features_tit_2?.(),
			txt: m.product_features_txt_2?.(),
			logo: m.product_features_logo_2?.(),
			labels: 2,
		},
		{
			tit: m.product_features_tit_3?.(),
			txt: m.product_features_txt_3?.(),
			logo: m.product_features_logo_3?.(),
			labels: 4,
		},
		{
			tit: m.product_features_tit_4?.(),
			txt: m.product_features_txt_4?.(),
			logo: m.product_features_logo_4?.(),
			labels: 3,
		},
	] as const;

	const resultKeys = [
		{ result: 'up', num: 60, subTit: m.dao_result_subTit_1?.(), txt: m.dao_result_txt_1?.() },
		{ result: 'down', num: 25, subTit: m.dao_result_subTit_2?.(), txt: m.dao_result_txt_2?.() },
		{ result: 'down', num: 40, subTit: m.dao_result_subTit_3?.(), txt: m.dao_result_txt_3?.() },
		{ result: 'chk', num: 100, subTit: m.dao_result_subTit_4?.(), txt: m.dao_result_txt_4?.() },
	];

	const caseKeys = [
		{
			id: 'das-case-1',
			btn: m.dao_case_btn_1?.(),
			logo: 'https://www.dummyimage.com/600x400/000/fff',
			img: 'https://www.dummyimage.com/720X480/000/fff',
			tit: m.dao_case_tit_1_1?.(),
			txt: [m.dao_case_txt_1_1?.(), m.dao_case_txt_1_2?.()],
			etc: [m.dao_case_etc_1_1?.(), m.dao_case_etc_1_2?.(), m.dao_case_etc_1_3?.()],
		},
		{
			id: 'das-case-2',
			btn: m.dao_case_btn_2?.(),
			logo: 'https://www.dummyimage.com/600x400/000/fff',
			img: 'https://www.dummyimage.com/720X480/000/fff',
			tit: m.dao_case_tit_2_1?.(),
			txt: [m.dao_case_txt_2_1?.(), m.dao_case_txt_2_2?.()],
			etc: [m.dao_case_etc_2_1?.(), m.dao_case_etc_2_2?.(), m.dao_case_etc_2_3?.()],
		},
		{
			id: 'das-case-3',
			btn: m.dao_case_btn_3?.(),
			logo: 'https://www.dummyimage.com/600x400/000/fff',
			img: 'https://www.dummyimage.com/720X480/000/fff',
			tit: m.dao_case_tit_3_1?.(),
			txt: [m.dao_case_txt_3_1?.(), m.dao_case_txt_3_2?.()],
			etc: [m.dao_case_etc_3_1?.(), m.dao_case_etc_3_2?.(), m.dao_case_etc_3_3?.()],
		},
		{
			id: 'das-case-2',
			btn: m.dao_case_btn_4?.(),
			logo: 'https://www.dummyimage.com/600x400/000/fff',
			img: 'https://www.dummyimage.com/720X480/000/fff',
			tit: m.dao_case_tit_4_1?.(),
			txt: [m.dao_case_txt_4_1?.()],
			etc: [m.dao_case_etc_4_1?.(), m.dao_case_etc_4_2?.(), m.dao_case_etc_4_3?.()],
		},
		{
			id: 'das-case-2',
			btn: m.dao_case_btn_5?.(),
			logo: 'https://www.dummyimage.com/600x400/000/fff',
			img: 'https://www.dummyimage.com/720X480/000/fff',
			tit: m.dao_case_tit_5_1?.(),
			txt: [m.dao_case_txt_5_1?.(), m.dao_case_txt_5_2?.()],
			etc: [m.dao_case_etc_5_1?.(), m.dao_case_etc_5_2?.(), m.dao_case_etc_5_3?.()],
		},
	] as const;
</script>

<SubVisual {videoUrl} {bg} {logo} logoAlt={m.product_visual_badge()} tit={m.product_visual_title()} subtit={m.product_visual_subtitle()}></SubVisual>

<Problem />

<Industries
	cls="lg:grid-cols-[repeat(auto-fit,minmax(calc(33%-10px),1fr))] grid-cols-[repeat(auto-fit,1fr)]"
	tit={m.product_industries_title()}
	txt={m.product_industries_text()}
	subTxt={m.product_industries_subtext()}
	lists={[...industries]}
/>

<Features tit={m.product_features_title()} txt={m.product_features_text()} lists={[...feaKeys]} />

<Results tit={feature.tit} txt={feature.txt} lists={[...resultKeys]} />

<FieldCase lists={[...caseKeys]} />

<Faq tit="Proven Results" txt={m.dao_subtitle_faq?.()} lists={[...resultKeys]} />

<BannerInquiry page="dao" />
