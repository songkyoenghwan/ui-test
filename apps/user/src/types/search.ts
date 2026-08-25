export type SearchLanguage = 'ko' | 'en' | 'ja' | 'zh' | 'th' | 'vi';

export interface SearchResultResponse {
	id: number;
	name: unknown;
	category: {
		name: unknown;
		iconKey: string | null;
		categoryColorCodes: {
			colorCode: string | null;
		} | null;
	} | null;
}

export interface SearchListResponse {
	items: SearchResultResponse[];
}

export interface SearchSuccessResponse {
	success: true;
	data: SearchListResponse;
}
