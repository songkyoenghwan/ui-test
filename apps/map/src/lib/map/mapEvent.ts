export default class MapController {
	private map: any;
	private containerId: string;
	private defaultCenter: { lat: number; lng: number };
	private defaultZoom: number;

	constructor(
		containerId = 'map_div',
		options?: {
			center?: { lat: number; lng: number };
			zoom?: number;
		},
	) {
		this.containerId = containerId;
		this.defaultCenter = options?.center ?? { lat: 37.566481622437934, lng: 126.98502302169841 };
		this.defaultZoom = options?.zoom ?? 18;
		this.map = null;
	}

	init() {
		// Tmapv3 전역 객체가 존재한다고 가정
		if (typeof Tmapv3 === 'undefined') {
			throw new Error('Tmapv3 is not loaded');
		}

		this.map = new Tmapv3.Map(this.containerId, {
			httpsMode: true,
			mapType: 'PUBLIC',
			center: new Tmapv3.LatLng(this.defaultCenter.lat, this.defaultCenter.lng),
			width: '100%',
			height: '100%',
			zoom: this.defaultZoom,
		});

		return this.map;
	}

	setMapType(type: 'HYBRID' | 'ROAD' | 'PUBLIC' | 'NIGHT') {
		if (!this.map) {
			console.warn('Map not initialized yet. Call init() first.');
			return;
		}

		const upper = String(type).toUpperCase();
		if (['HYBRID', 'ROAD', 'PUBLIC', 'NIGHT'].includes(upper)) {
			this.map.setMapType(upper);
		} else {
			console.warn('Unknown map type:', type);
		}
	}

	// 필요하면 getter 제공
	getMapInstance() {
		return this.map;
	}

	// 중심 좌표 재설정 유틸
	setCenter(lat: number, lng: number) {
		if (!this.map) return;
		this.map.setCenter(new Tmapv3.LatLng(lat, lng));
	}

	setZoom(zoom: number) {
		if (!this.map) return;
		this.map.setZoom(zoom);
	}
}
