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
			if (!this.map) return;
			this.map.setCenter(new Tmapv3.LatLng(lat, lng));
			this.center.lat = lat;
			this.center.lng = lng;
		},

		setZoom(zoom) {
			if (!this.map) return;
			this.map.setZoom(zoom);
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

			container.addEventListener('contextmenu', (evt) => {
				evt.preventDefault();
				evt.stopPropagation();

				const rect = container.getBoundingClientRect();
				const x = evt.clientX - rect.left;
				const y = evt.clientY - rect.top;

				if (!this.map?.project?.inverse) return;

				const lngLat = this.map.project.inverse([x, y]);
				const lat = lngLat?._lat ?? lngLat?.lat;
				const lng = lngLat?._lng ?? lngLat?.lng;

				if (lat == null || lng == null) return;

				if (this.marker) {
					this.marker.setMap?.(null);
				}

				this.marker = new Tmapv3.Marker({
					position: new Tmapv3.LatLng(lat, lng),
					icon: '/images/poi/poi-center-select.png',
					map: this.map,
				});

				this.markers = [this.marker];
				this.center.lat = lat;
				this.center.lng = lng;
			});
		},

		openCenterPicker(options = {}) {
			if (options.containerId) {
				this.containerId = options.containerId;
			}

			if (options.center) {
				this.defaultCenter = options.center;
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
	});
});
