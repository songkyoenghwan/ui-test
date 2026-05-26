const industriesArr = industries.map((ind) => ({
	txt: m[ind](),
}));

export const feaKeysList = feaKeys.map((item, i) => ({
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
type MsgKey = keyof typeof m;

export type FeatureItem = {
	tit: string;
	txt: string;
	subTxt?: string;
	logo: string;
	labels: number;
};
