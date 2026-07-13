document.addEventListener('alpine:init', () => {
	if (Alpine.store('map')) return;
	Alpine.store('map', {
		map: null,
		marker: null,
		markers: [],
		containerId: 'map_div',
		defaultCenter: {
			lat: 37.52761415838989,
			lng: 126.96885721723763,
		},
		defaultZoom: 18,
		isViewLocked: false,
		isContextMenuBound: false,
		center: {
			lat: null,
			lng: null,
		},
		searchKeyword: '',
		selectedAddress: '',

		init(options = {}) {
			this.containerId = options.containerId ?? this.containerId;
			this.defaultCenter = options.center ?? this.defaultCenter;
			this.defaultZoom = options.zoom ?? this.defaultZoom;
		},

		initMap() {
			if (this.map) return this.map;

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

			return this.map;
		},

		getMapInstance() {
			return this.map;
		},

		setMapType(type) {
			if (!this.map) return;

			const upper = String(type).toUpperCase();
			if (['HYBRID', 'ROAD', 'PUBLIC', 'NIGHT'].includes(upper)) {
				this.map.setMapType(upper);
			}
		},

		setCenter(lat, lng) {
			this.center.lat = lat;
			this.center.lng = lng;
			console.log('[map:center] set', {
				lat,
				lng,
				hasMap: Boolean(this.map),
			});

			if (!this.map) return;
			this.map.setCenter(new Tmapv3.LatLng(lat, lng));
		},

		setMarker(lat, lng) {
			if (!this.map) return;

			if (this.marker) {
				this.marker.setMap?.(null);
			}

			this.marker = new Tmapv3.Marker({
				position: new Tmapv3.LatLng(lat, lng),
				icon: '/images/poi/poi-center-select.png',
				map: this.map,
			});

			this.markers = [this.marker];
		},

		selectCenter(lat, lng) {
			const nextLat = Number(lat);
			const nextLng = Number(lng);

			if (!Number.isFinite(nextLat) || !Number.isFinite(nextLng)) return;

			this.setCenter(nextLat, nextLng);
			this.setMarker(nextLat, nextLng);
		},

		buildAddressResult(item = {}) {
			const point = Array.isArray(item.geometry?.coordinates) ? item.geometry.coordinates : [];
			const toCoordinate = (...values) => {
				for (const value of values) {
					if (value === null || value === undefined || value === '') continue;

					const num = Number(value);
					if (Number.isFinite(num)) return num;
				}

				return null;
			};
			const lat = toCoordinate(item.lat, item.newLat, item.frontLat, item.noorLat, item.latitude, point[1]);
			const lng = toCoordinate(item.lon, item.newLon, item.frontLon, item.noorLon, item.longitude, point[0]);

			if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

			return { lat, lng };
		},

		setSelectedAddress(address = '') {
			this.searchKeyword = address;
			this.selectedAddress = address;
		},

		buildReverseAddress(data = {}) {
			const info = data?.addressInfo ?? data?.features?.[0]?.properties ?? data;
			const roadAddress = [info.city_do, info.gu_gun, info.eup_myun, info.roadName, info.buildingIndex]
				.filter(Boolean)
				.join(' ');
			const jibunAddress = [
				info.city_do,
				info.gu_gun,
				info.legalDong || info.adminDong || info.eup_myun,
				info.ri,
				info.bunji,
			]
				.filter(Boolean)
				.join(' ');

			return info.fullAddress || info.roadAddress || info.newAddress || roadAddress || info.address || jibunAddress || '';
		},

		normalizeAddressPayload(payload = '') {
			if (typeof payload === 'string') {
				return {
					selectedAddress: payload,
					candidates: payload ? [payload] : [],
					zonecode: '',
				};
			}

			const candidates = [payload.roadAddress, payload.jibunAddress]
				.filter(Boolean)
				.filter((value, index, arr) => arr.indexOf(value) === index);
			const selectedAddress = payload.address || candidates[0] || '';

			return {
				selectedAddress,
				candidates: candidates.length ? candidates : selectedAddress ? [selectedAddress] : [],
				zonecode: payload.zonecode ?? '',
			};
		},

		async fetchTmapJson(path, params, label = '[tmap:address-geocode]') {
			const url = new URL(`/api/tmap/${path}`, window.location.origin);
			Object.entries(params).forEach(([key, value]) => {
				if (value != null && value !== '') {
					url.searchParams.set(key, value);
				}
			});
			console.log(`${label} request`, url.toString());

			const res = await fetch(url.toString());
			console.log(`${label} response`, {
				status: res.status,
				statusText: res.statusText,
				ok: res.ok,
			});
			if (!res.ok) {
				throw new Error(`Tmap API 요청 실패: ${res.status}`);
			}

			if (res.status === 204) return {};

			return res.json();
		},

		async geocodeAddress(address, zonecode = '') {
			const data = await this.fetchTmapJson('geo/fullAddrGeo', {
				version: '1',
				format: 'json',
				coordType: 'WGS84GEO',
				fullAddr: address,
			});
			const coordinates =
				data?.coordinateInfo?.coordinate ?? data?.coordinates ?? data?.features ?? data?.searchPoiInfo?.pois?.poi ?? [];
			console.log('[tmap:address-geocode] data', { address, zonecode, data });
			console.log('[tmap:address-geocode] coordinates', coordinates);

			return (
				(Array.isArray(coordinates) ? coordinates : [coordinates])
					.map((item) => this.buildAddressResult(item))
					.find(Boolean) ?? null
			);
		},

		async reverseGeocodeCenter(lat, lng) {
			const nextLat = Number(lat);
			const nextLng = Number(lng);

			if (!Number.isFinite(nextLat) || !Number.isFinite(nextLng)) return;

			this.selectCenter(nextLat, nextLng);

			try {
				const data = await this.fetchTmapJson(
					'geo/reversegeocoding',
					{
						version: '1',
						format: 'json',
						coordType: 'WGS84GEO',
						addressType: 'A04',
						lat: nextLat,
						lon: nextLng,
					},
					'[tmap:reverse-geocode]',
				);
				const address = this.buildReverseAddress(data);

				console.log('[tmap:reverse-geocode] data', data);
				console.log('[tmap:reverse-geocode] parsed', { address });

				if (address) {
					this.setSelectedAddress(address);
				}
			} catch (error) {
				console.error('[tmap:reverse-geocode] failed', error);
			}
		},

		async selectAddress(payload = '') {
			const { selectedAddress, candidates, zonecode } = this.normalizeAddressPayload(payload);
			this.setSelectedAddress(selectedAddress);
			console.log('[tmap:address-geocode] selectAddress', {
				selectedAddress,
				candidates,
				zonecode,
				centerBefore: { ...this.center },
			});

			if (!candidates.length) return;

			try {
				for (const address of candidates) {
					const result = await this.geocodeAddress(address, zonecode);
					if (!result) {
						console.warn('[tmap:address-geocode] 좌표를 찾지 못했습니다.', { address, zonecode });
						continue;
					}

					console.log('[tmap:address-geocode] parsed', result);
					this.selectCenter(result.lat, result.lng);
					return;
				}

				console.warn('[tmap:address-geocode] 모든 주소 후보에서 좌표를 찾지 못했습니다.', { candidates, zonecode });
			} catch (error) {
				console.error('[tmap:address-geocode] failed', error);
			}
		},

		confirmCenterPicker() {
			if (this.center.lat == null || this.center.lng == null) {
				alert('중심 좌표를 선택해 주세요.');
				return;
			}

			const dataStore = Alpine.store('data');
			if (dataStore?.data) {
				dataStore.data.latitude = Number(this.center.lat);
				dataStore.data.longitude = Number(this.center.lng);
				dataStore.data.address = this.selectedAddress;
			}

			Alpine.store('modal')?.close();
		},

		setZoom(zoom) {
			if (!this.map) return;
			this.map.setZoom(zoom);
		},

		getZoom() {
			return Number(this.map?.getZoom?.() ?? this.defaultZoom);
		},

		zoomIn() {
			if (!this.map) return;
			this.setZoom(this.getZoom() + 1);
		},

		zoomOut() {
			if (!this.map) return;
			this.setZoom(this.getZoom() - 1);
		},

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
		},

		setCenterCoordinates() {
			this.initMap();

			if (this.isContextMenuBound) return;
			this.isContextMenuBound = true;

			const container = document.getElementById(this.containerId);
			if (!container) return;

			const selectLngLat = (lngLat) => {
				const lat = lngLat?._lat ?? lngLat?.lat ?? lngLat?.latitude;
				const lng = lngLat?._lng ?? lngLat?.lng ?? lngLat?.longitude;

				if (lat == null || lng == null) return false;

				this.selectCenter(lat, lng);
				return true;
			};

			const selectMousePoint = (evt) => {
				if (evt?.clientX == null || evt?.clientY == null) return false;

				const rect = container.getBoundingClientRect();
				const x = evt.clientX - rect.left;
				const y = evt.clientY - rect.top;

				if (!this.map?.project?.inverse) return false;

				const lngLat = this.map.project.inverse([x, y]);
				return selectLngLat(lngLat);
			};

			const handleContextMenu = (evt) => {
				evt?.preventDefault?.();
				evt?.stopPropagation?.();

				const lngLat = evt?.data?.lngLat ?? evt?.lngLat ?? evt?.latLng;
				if (selectLngLat(lngLat)) return;

				selectMousePoint(evt?.originalEvent ?? evt);
			};

			this.map?.on?.('contextmenu', handleContextMenu);
			this.map?.on?.('ContextMenu', handleContextMenu);

			container.addEventListener(
				'contextmenu',
				(evt) => {
					evt.preventDefault();
					evt.stopPropagation();
					selectMousePoint(evt);
				},
				true,
			);

			container.addEventListener(
				'mousedown',
				(evt) => {
					if (evt.button !== 2) return;

					evt.preventDefault();
					evt.stopPropagation();
					selectMousePoint(evt);
				},
				true,
			);
		},

		openCenterPicker(options = {}) {
			if (options.containerId) {
				this.containerId = options.containerId;
			}

			const dataStore = Alpine.store('data');
			const dataLat = Number(dataStore?.data?.latitude);
			const dataLng = Number(dataStore?.data?.longitude);
			const dataCenter = Number.isFinite(dataLat) && Number.isFinite(dataLng) ? { lat: dataLat, lng: dataLng } : null;

			if (options.center || dataCenter) {
				this.defaultCenter = options.center ?? dataCenter;
			}

			if (options.zoom) {
				this.defaultZoom = options.zoom;
			}

			const container = document.getElementById(this.containerId);
			if (!container) return;

			if (!container.offsetWidth || !container.offsetHeight) {
				setTimeout(() => this.openCenterPicker(options), 100);
				return;
			}

			this.initMap();
			this.setCenterCoordinates();
			this.selectCenter(this.defaultCenter.lat, this.defaultCenter.lng);
		},

		clearMarker() {
			if (this.marker) {
				this.marker.setMap?.(null);
				this.marker = null;
			}

			this.markers = [];
			this.center.lat = null;
			this.center.lng = null;
		},

		resetCenterPicker() {
			this.clearMarker();
			this.selectCenter(this.defaultCenter.lat, this.defaultCenter.lng);
			this.setZoom(this.defaultZoom);
		},
	});
});
