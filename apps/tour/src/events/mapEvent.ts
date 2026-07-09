export default class MapController {
	// oxlint-disable-next-line typescript/no-explicit-any
	private map: any;
	private marker?: any;
	private markers: any[];
	private containerId: string;
	private defaultCenter: { lat: number; lng: number };
	private defaultZoom: number;
	private isViewLocked = false;
	private isContextMenuBound = false;

	constructor(
		containerId = 'map_div',
		options?: {
			center?: { lat: number; lng: number };
			zoom?: number;
		},
	) {
		this.containerId = containerId;
		this.defaultCenter = options?.center ?? { lat: 37.52761415838989, lng: 126.96885721723763 };
		this.defaultZoom = options?.zoom ?? 18;
		this.map = null;
		this.markers = [];
	}

	init() {
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

		this.lockView();
		this.setCenterCoordinates();

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

	getMapInstance() {
		return this.map;
	}

	setCenter(lat: number, lng: number) {
		if (!this.map) return;
		this.map.setCenter(new Tmapv3.LatLng(lat, lng));
	}

	setZoom(zoom: number) {
		if (!this.map) return;
		this.map.setZoom(zoom);
	}

	lockView() {
		if (!this.map || this.isViewLocked) return;
		this.isViewLocked = true;

		this.map.setBearing(0);
		this.map.setPitch(0);

		const resetView = () => {
			if (!this.map) return;

			if (this.map.getBearing?.() !== 0) {
				this.map.setBearing(0);
			}

			if (this.map.getPitch?.() !== 0) {
				this.map.setPitch(0);
			}
		};

		this.map.on('Rotate', resetView);
		this.map.on('Pitch', resetView);
		this.map.on('Drag', resetView);
		this.map.on('Zoom', resetView);
	}

	setCenterCoordinates() {
		if (!this.map) {
			console.warn('Map not initialized yet. Call init() first.');
			return;
		}
		this.lockView();

		if (this.isContextMenuBound) return;
		this.isContextMenuBound = true;

		this.map.on('contextmenu', (evt: any) => {
			evt?.preventDefault?.();
			evt?.stopPropagation?.();

			const lngLat = evt?.data?.lngLat;
			if (!lngLat) return;

			if (this.marker) {
				this.marker.setMap?.(null);
			}

			this.marker = new Tmapv3.Marker({
				position: new Tmapv3.LatLng(lngLat._lat, lngLat._lng),
				icon: '/images/poi/poi-center-select.png',
				map: this.map,
			});

			this.markers = [this.marker];
			console.log('right click lngLat:', lngLat);
		});
	}
}
