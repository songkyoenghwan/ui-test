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
	import SubVisual from '$lib/components/visual/SubVisual.svelte';
	import logo from '$lib/assets/imgs/logo/logo-dao.svg';
	import bg from '$lib/assets/imgs/visual/dao-visual.jpg';
	import { m } from '$lib/paraglide/messages.js';

	let { videoUrl = '' } = $props();

	const visual = {
		logoText: m.product_visual_badge(),
		title: m.product_visual_title(),
		subtitle: m.product_visual_subtitle(),
		btnText: m.product_visual_btn(),
	};
	const industries = [
		'product_industries_list_1',
		'product_industries_list_2',
		'product_industries_list_3',
		'product_industries_list_4',
		'product_industries_list_5',
		'product_industries_list_6',
	] as const;
	const industriesArr = industries.map((ind) => ({
		txt: m[ind](),
	}));

	type FeatureItem = {
		tit: string;
		txt: string;
		subTxt?: string;
		logo: string;
		labels: number;
	};
	type MsgKey = keyof typeof m;

	const feature = {
		tit: m.product_features_title(),
		txt: m.product_features_text(),
	};
	const feaKeys: FeatureItem[] = [
		{
			tit: 'product_features_tit_1',
			txt: 'product_features_txt_1',
			logo: 'product_features_logo_1',
			labels: 4,
		},
		{
			tit: 'product_features_tit_2',
			txt: 'product_features_txt_2',
			logo: 'product_features_logo_2',
			labels: 2,
		},
		{
			tit: 'product_features_tit_3',
			txt: 'product_features_txt_3',
			logo: 'product_features_logo_3',
			labels: 4,
		},
		{
			tit: 'product_features_tit_4',
			txt: 'product_features_txt_4',
			logo: 'product_features_logo_4',
			labels: 3,
		},
	] as const;
	const feaKeysList = feaKeys.map((item, i) => ({
		tit: m[item.tit as MsgKey]({ name: '' }),
		txt: m[item.txt as MsgKey]({ name: '' }),
		subTxt: 'subTxt' in item ? m[item.subTxt as MsgKey]({ name: '' }) : undefined,
		logo: m[item.logo as MsgKey]({ name: '' }),
		labels: Array.from({ length: item.labels }, (_, y) => {
			const key = `product_features_list_${i + 1}_${y + 1}` as MsgKey;
			const value = m[key]?.({ name: '' });
			return value ?? '';
		}),
	}));
</script>

<SubVisual {videoUrl} {bg} {logo} logoAlt={visual.logoText} tit={visual.title} subtit={visual.subtitle} btnTxt={visual.btnText}></SubVisual>

<Problem />

<Industries
	cls="lg:grid-cols-[repeat(auto-fit,minmax(calc(33%-10px),1fr))] grid-cols-[repeat(auto-fit,1fr)]"
	tit={m.product_industries_title()}
	txt={m.product_industries_text()}
	subTxt={m.product_industries_subtext()}
	lists={industriesArr}
/>

<Features tit={feature.tit} txt={feature.txt} lists={feaKeysList} />

<Results tit={feature.tit} txt={feature.txt} />
