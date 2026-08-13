export interface ReverseGeocodeQuery {
	/** 위도 (예: 37.5665) */
	lat: number;
	/** 경도 (예: 126.9780) */
	lng: number;
	/** 응답 언어 코드 목록 — 기본값: ['ko', 'en'] / 예: ?languages=ko&languages=en */
	languages?: string[];
}

export interface AddressComponent {
	longName: string;
	shortName: string;
	types: string[];
}

export interface ReverseGeocodeResponse {
	language: string;
	formattedAddress: string;
	placeId: string;
	addressComponents: AddressComponent[];
}
