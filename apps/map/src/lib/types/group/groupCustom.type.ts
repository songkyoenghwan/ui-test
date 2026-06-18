import * as z from 'zod';

// ... (RadioOptionSchema, BtnLinkSchema 등은 그대로 유지) ...
export const RadioOptionSchema = z.object({
	id: z.string(),
	txt: z.string(),
	value: z.enum(['MANUAL', 'STATUS']),
});

export const BtnLinkSchema = z.object({
	id: z.string(),
	lang: z.any(),
	img: z.string(),
});

//  2-Depth 하위 스키마 분리 조립
export const FeaturesSchema = z.object({
	ai: z.boolean().optional(),
	zone: z.boolean().optional(),
	zoneUse: z.string().optional(),
	facility: z.boolean().optional(),
	facilityUse: z.string().optional(),
});

export const InformationSchema = z.object({
	location: z.boolean().optional(),
	locationUse: z.string().optional(),
	address: z.boolean().optional(),
	sorting: z.string().optional(),
});

// . 최상위(Root) 스키마 결착
export const ConfigResultSchema = z.object({
	color: z.string().optional(),
	features: FeaturesSchema.optional(), // 중첩 결착
	information: InformationSchema.optional(), // 중첩 결착
	btnLink: z.array(BtnLinkSchema).optional(),
});

export type RadioOption = z.infer<typeof RadioOptionSchema>;
export type BtnLink = z.infer<typeof BtnLinkSchema>;
export type FeaturesConfig = z.infer<typeof FeaturesSchema>;
export type InformationConfig = z.infer<typeof InformationSchema>;
export type ConfigResult = z.infer<typeof ConfigResultSchema>;

export interface Props {
	result?: ConfigResult;
	view?: 'reg' | 'detail';
}

//  무결점 팩토리 함수 (객체 붕괴 방어막)
export const createDefaultConfigResult = (): ConfigResult => ({
	color: '#16b17d',

	//  2-Depth 객체가 undefined가 되어 화면이 뻗는 것을 원천 봉쇄합니다.
	features: {
		ai: false,
		zone: false,
		zoneUse: '',
		facility: false,
		facilityUse: '',
	},

	information: {
		location: false,
		locationUse: '',
		address: false,
		sorting: 'Y', // 기본 정렬값 세팅
	},

	btnLink: [],
});
