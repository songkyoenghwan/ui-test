import { sheetMidRatioValue, sheetMinRatioValue } from '@/src/stores/sheetUiStore';
import { mapControllerInstance } from '@/stores/pageDataStore';
import { sheetInstance } from '@/stores/uxStore';

export type PoiMarkerItem = {
	id: number;
	latitude: number;
	longitude: number;
	isVisible?: boolean | null;
};

export type CongestionVertex = { lat: number; lng: number };

export type CongestionSectionItem = {
	id: number;
	coordinates: CongestionVertex[];
	isVisible?: boolean | null;
	memo?: string | null;
	sensorDeviceId?: number | null;
};

export type CongestionSectionRenderOptions = {
	/** true일 때만 호버/클릭 바인딩. 기본 false → /poi/map 표시 전용 유지 */
	interactive?: boolean;
	/** 구역(폴리곤) 클릭 — 시설과 별개 데이터 */
	onSectionSelect?: (sectionId: number) => void | Promise<void>;
	/** 시설 마커와 폴리곤이 겹칠 때 시설 우선 판정 */
	findFacilityIdAt?: (point: { lat: number; lng: number }) => number | null;
	/** 시설(마커) 클릭 — 구역과 별개 데이터 */
	onFacilitySelect?: (facilityId: number) => void | Promise<void>;
};

export type MapInteractionMode = 'poi' | 'congestionDraw';

type CongestionPolygonStyle = {
	strokeColor: string;
	strokeWeight: number;
	fillColor: string;
	fillOpacity: number;
};

export type OverlayCoordinateData = {
	zoom: number;
	widthPx: number;
	heightPx: number;
	center: { lat: number; lng: number };
	sw: { lat: number; lng: number };
	se: { lat: number; lng: number };
	ne: { lat: number; lng: number };
	nw: { lat: number; lng: number };
};

export type OverlayMapItem = {
	id: number;
	fileUrl: string;
	coordinateData?: OverlayCoordinateData | null;
	sortingNumber?: number | null;
};

/** 가이드 미리보기·캡처 시 현재 줌에서 당기는 단계 (가이드 = 중앙 1/2^DELTA) */
const OVERLAY_CAPTURE_ZOOM_DELTA = 1;

/** WebGL 기본은 그리기 직후 버퍼를 비워 canvas 캡처가 하얘짐 → 맵 생성 전에 패치 */
function ensureWebGlPreserveDrawingBuffer() {
	const canvasProto = HTMLCanvasElement.prototype as typeof HTMLCanvasElement.prototype & {
		__visitServantPreserveDrawingBuffer?: boolean;
	};
	if (canvasProto.__visitServantPreserveDrawingBuffer) return;

	const original = canvasProto.getContext;
	canvasProto.getContext = function (this: HTMLCanvasElement, type: string, attributes?: any) {
		if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') {
			return original.call(this, type, { ...(attributes ?? {}), preserveDrawingBuffer: true });
		}
		return original.call(this, type as any, attributes);
	} as typeof original;
	canvasProto.__visitServantPreserveDrawingBuffer = true;
}

const POI_ICON = {
	visible: '/images/poi/poi-visible.png',
	visibleSelected: '/images/poi/poi-visible-select.png',
	hidden: '/images/poi/poi-hidden.png',
	hiddenSelected: '/images/poi/poi-hidden-select.png',
	draft: '/images/poi/poi-center-select.png',
} as const;

const CONGESTION_STYLE = {
	strokeColor: '#00c922',
	strokeWeight: 2,
	fillColor: '#00cc87',
	fillOpacity: 0.2,
} as const;

const SAVED_CONGESTION_STYLE = {
	visible: {
		strokeColor: '#2563eb',
		strokeWeight: 2,
		fillColor: '#3b82f6',
		fillOpacity: 0.18,
	},
	hidden: {
		strokeColor: '#64748b',
		strokeWeight: 2,
		fillColor: '#94a3b8',
		fillOpacity: 0.12,
	},
} as const;

/** 호버 시 외곽 두께만 고정 — 색은 베이스 hue 유지 + 채도 부스트 */
const SAVED_CONGESTION_HOVER_STROKE_WEIGHT = 5;

function clamp01(n: number) {
	return Math.min(1, Math.max(0, n));
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	const raw = hex.trim().replace('#', '');
	const full =
		raw.length === 3
			? raw
					.split('')
					.map((c) => c + c)
					.join('')
			: raw;
	if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
	return {
		r: Number.parseInt(full.slice(0, 2), 16),
		g: Number.parseInt(full.slice(2, 4), 16),
		b: Number.parseInt(full.slice(4, 6), 16),
	};
}

function rgbToHex(r: number, g: number, b: number) {
	const to = (n: number) =>
		Math.round(Math.min(255, Math.max(0, n)))
			.toString(16)
			.padStart(2, '0');
	return `#${to(r)}${to(g)}${to(b)}`;
}

/** 동일 hue 유지, 채도 상승 (+ 살짝 명도) — 하이라이트 체감용 */
function boostColorSaturation(hex: string, saturationBoost = 0.35, lightnessBoost = 0.06): string {
	const rgb = hexToRgb(hex);
	if (!rgb) return hex;

	const r = rgb.r / 255;
	const g = rgb.g / 255;
	const b = rgb.b / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const d = max - min;
	let h = 0;
	let s = 0;
	let l = (max + min) / 2;

	if (d !== 0) {
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			default:
				h = (r - g) / d + 4;
		}
		h /= 6;
	}

	// 회색 계열(채도 거의 0)은 hue가 없어 살짝 푸르게 밀지 않고, 채도만 최소치로 끌어올림
	s = clamp01(s + saturationBoost);
	l = clamp01(l + lightnessBoost);

	const hue2rgb = (p: number, q: number, t: number) => {
		let tt = t;
		if (tt < 0) tt += 1;
		if (tt > 1) tt -= 1;
		if (tt < 1 / 6) return p + (q - p) * 6 * tt;
		if (tt < 1 / 2) return q;
		if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
		return p;
	};

	let rr: number;
	let gg: number;
	let bb: number;
	if (s === 0) {
		rr = gg = bb = l;
	} else {
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		rr = hue2rgb(p, q, h + 1 / 3);
		gg = hue2rgb(p, q, h);
		bb = hue2rgb(p, q, h - 1 / 3);
	}

	return rgbToHex(rr * 255, gg * 255, bb * 255);
}

function applyPolygonStyle(polygon: any, style: CongestionPolygonStyle) {
	if (!polygon) return;
	// Tmap WebGL 폴리곤은 setOptions만으로는 stroke가 안 바뀌는 경우가 있어 setter도 함께 호출
	polygon.setOptions?.({
		strokeColor: style.strokeColor,
		strokeWeight: style.strokeWeight,
		fillColor: style.fillColor,
		fillOpacity: style.fillOpacity,
	});
	polygon.setStrokeColor?.(style.strokeColor);
	polygon.setStrokeWeight?.(style.strokeWeight);
	polygon.setFillColor?.(style.fillColor);
	polygon.setFillOpacity?.(style.fillOpacity);
	polygon.setStrokeOpacity?.(1);
}

/** ray-casting point-in-polygon (lng=x, lat=y) */
function isPointInPolygon(point: { lat: number; lng: number }, ring: CongestionVertex[]): boolean {
	if (ring.length < 3) return false;
	let inside = false;
	for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
		const xi = ring[i].lng;
		const yi = ring[i].lat;
		const xj = ring[j].lng;
		const yj = ring[j].lat;
		const intersect =
			yi > point.lat !== yj > point.lat && point.lng < ((xj - xi) * (point.lat - yi)) / (yj - yi + Number.EPSILON) + xi;
		if (intersect) inside = !inside;
	}
	return inside;
}

function resolveLngLat(lngLat: any): { lat: number; lng: number } | null {
	const rawLat = lngLat?._lat ?? lngLat?.latitude ?? (typeof lngLat?.lat === 'function' ? lngLat.lat() : lngLat?.lat);
	const rawLng = lngLat?._lng ?? lngLat?.longitude ?? (typeof lngLat?.lng === 'function' ? lngLat.lng() : lngLat?.lng);
	const lat = Number(rawLat);
	const lng = Number(rawLng);
	if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
	return { lat, lng };
}

function getPoiIcon(isVisible: boolean | null | undefined, selected: boolean) {
	const visible = isVisible !== false;
	if (selected) return visible ? POI_ICON.visibleSelected : POI_ICON.hiddenSelected;
	return visible ? POI_ICON.visible : POI_ICON.hidden;
}

function getPoiPin(isVisible: boolean | null | undefined, selected: boolean) {
	const visible = isVisible !== false;
	if (selected) return visible ? 'current' : 'category';
	return visible ? 'current' : 'category';
}

function vertexIconHtml() {
	return `<div style="width:12px;height:12px;border-radius:9999px;background:#00c922;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.25)"></div>`;
}

function savedVertexSnapIconHtml() {
	return `<div style="width:12px;height:12px;border-radius:9999px;background:#3b82f6;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.25)"></div>`;
}

function vertexKey(point: CongestionVertex) {
	return `${point.lat.toFixed(7)},${point.lng.toFixed(7)}`;
}

export default class MapController {
	// oxlint-disable-next-line typescript/no-explicit-any
	public map: any;
	public marker?: any;
	public markers: any[];
	public poiMarkers: Map<number, any>;
	public selectedPoiId: number | null;
	public containerId: string;
	public defaultCenter: { lat: number; lng: number };
	public defaultZoom: number;
	public isViewLocked = false;
	public isContextMenuBound = false;
	public groundOverlay = null;
	public onPointSelect?: (lat: number, lng: number) => void | Promise<void>;
	public onPoiSelect?: (poiId: number) => void | Promise<void>;
	public onCongestionPolygonChange?: (coords: CongestionVertex[]) => void | Promise<void>;
	public onCongestionCompleteFailed?: (reason: string) => void;
	public interactionMode: MapInteractionMode = 'poi';
	/** overlay / confusion 등에서 위치 등록·수정 진입 차단 */
	public poiEditLocked = false;
	public congestionVertices: CongestionVertex[] = [];
	public congestionCompleted = false;
	public isStyleReady = false;
	private ignoreNextMapClick = false;
	private congestionVertexMarkers: any[] = [];
	private congestionPolyline: any = null;
	private congestionPolygon: any = null;
	private savedCongestionPolygons: Map<number, any> = new Map();
	private savedCongestionSectionItems: CongestionSectionItem[] = [];
	private savedVertexSnapMarkers: any[] = [];
	private pendingPoiItems: PoiMarkerItem[] | null = null;
	private pendingPoiSelectedId: number | null = null;
	private pendingCongestionSections: CongestionSectionItem[] | null = null;
	private pendingCongestionSectionOptions: CongestionSectionRenderOptions | null = null;
	/** 현황 화면: GroundOverlay 위에서도 구역 히트테스트 */
	private sectionInteractive = false;
	private onCongestionSectionSelect?: (sectionId: number) => void | Promise<void>;
	private onCongestionFacilitySelect?: (facilityId: number) => void | Promise<void>;
	private findFacilityIdAtPoint?: (point: { lat: number; lng: number }) => number | null;
	private hoveredSectionId: number | null = null;
	/** setOptions가 무시될 때를 대비한 호버 전용 오버레이 폴리곤 */
	private hoverHighlightPolygon: any = null;
	private sectionDomListenersBound = false;
	private sectionDomMouseMoveHandler: ((event: MouseEvent) => void) | null = null;
	private sectionMapMouseMoveBound = false;
	private readyWaiters: Array<() => void> = [];
	private congestionKeyHandler: ((event: KeyboardEvent) => void) | null = null;
	private congestionContextMenuHandler: ((event: MouseEvent) => void) | null = null;
	private mapClickBound = false;
	private mapContextMenuBound = false;
	private guideActive = false;
	private guideFixed = false;
	private guideElement: HTMLDivElement | null = null;
	private guideMapListenersBound = false;
	private interactionLocked = false;
	private lockedCenter: { lat: number; lng: number } | null = null;
	private lockedZoom: number | null = null;
	private interactionLockHandler: (() => void) | null = null;
	private wheelLockHandler: ((event: WheelEvent) => void) | null = null;
	private guideSnapshot: OverlayCoordinateData | null = null;
	private overlayLayers: Map<number, any> = new Map();
	private overlayHiddenIds: Set<number> = new Set();
	private draftOverlay: any = null;
	private isCapturingOverlay = false;

	constructor(
		containerId = 'map_div',
		options?: {
			center?: { lat: number; lng: number };
			zoom?: number;
			onPointSelect?: (lat: number, lng: number) => void | Promise<void>;
			onPoiSelect?: (poiId: number) => void | Promise<void>;
			onCongestionPolygonChange?: (coords: CongestionVertex[]) => void | Promise<void>;
			onCongestionCompleteFailed?: (reason: string) => void;
		},
	) {
		this.containerId = containerId;
		this.defaultCenter = options?.center ?? { lat: 37.52761415838989, lng: 126.96885721723763 };
		this.defaultZoom = options?.zoom ?? 16;
		this.onPointSelect = options?.onPointSelect;
		this.onPoiSelect = options?.onPoiSelect;
		this.onCongestionPolygonChange = options?.onCongestionPolygonChange;
		this.onCongestionCompleteFailed = options?.onCongestionCompleteFailed;
		this.map = null;
		this.markers = [];
		this.poiMarkers = new Map();
		this.selectedPoiId = null;
	}

	init() {
		if (typeof Tmapv3 === 'undefined') {
			throw new Error('Tmapv3 is not loaded');
		}

		// SDK가 Map 옵션의 preserveDrawingBuffer를 무시해도 캡처되도록 getContext 단계에서 강제
		ensureWebGlPreserveDrawingBuffer();

		this.map = new Tmapv3.Map(this.containerId, {
			httpsMode: true,
			mapType: 'PUBLIC',
			center: new Tmapv3.LatLng(this.defaultCenter.lat, this.defaultCenter.lng),
			width: '100%',
			height: '100%',
			zoom: this.defaultZoom,
			preserveDrawingBuffer: true,
		});

		this.map.on('ConfigLoad', () => {
			this.isStyleReady = true;
			this.lockView();
			this.setCenterCoordinates();
			this.flushPendingLayers();
			const waiters = this.readyWaiters.splice(0);
			waiters.forEach((fn) => fn());
		});

		this.map.on('Click', () => {
			sheetInstance.get()?.setSnapPoint(sheetMinRatioValue.get());
		});

		mapControllerInstance.set(this.map);

		return this.map;
	}

	whenReady(fn: () => void) {
		if (this.isStyleReady) {
			fn();
			return;
		}
		this.readyWaiters.push(fn);
	}

	private flushPendingLayers() {
		if (this.pendingPoiItems) {
			const items = this.pendingPoiItems;
			const selected = this.pendingPoiSelectedId;
			this.pendingPoiItems = null;
			this.pendingPoiSelectedId = null;
			this.renderPois(items, selected);
		}
		if (this.pendingCongestionSections) {
			const sections = this.pendingCongestionSections;
			const options = this.pendingCongestionSectionOptions;
			this.pendingCongestionSections = null;
			this.pendingCongestionSectionOptions = null;
			this.renderCongestionSections(sections, options ?? undefined);
		}
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

	getCenterCoordinates() {
		return this.getCenterLatLng();
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

	clearDraftMarker() {
		if (this.marker) {
			this.marker.setMap?.(null);
			this.marker = null;
		}
	}

	clearPoiMarkers() {
		this.poiMarkers.forEach((marker) => marker?.setMap?.(null));
		this.poiMarkers.clear();
		this.selectedPoiId = null;
	}

	setSelectedPoiId(poiId: number | null, items: PoiMarkerItem[] = []) {
		this.selectedPoiId = poiId;
		if (items.length > 0) {
			this.renderPois(items, poiId);
			return;
		}

		this.poiMarkers.forEach((marker, id) => {
			const isVisible = marker.__poiIsVisible;
			marker.setIcon?.(getPoiIcon(isVisible, id === poiId));
		});
	}

	setSelectedPoiPinId(poiId: number | null, items: PoiMarkerItem[] = []) {
		this.selectedPoiId = poiId;
		if (items.length > 0) {
			this.renderPois(items, poiId);
			return;
		}

		this.poiMarkers.forEach((marker, id) => {
			const isVisible = marker.__poiIsVisible;
		});
	}

	renderPois(items: PoiMarkerItem[], selectedPoiId: number | null = this.selectedPoiId) {
		if (!this.map) return;
		if (!this.isStyleReady) {
			this.pendingPoiItems = items;
			this.pendingPoiSelectedId = selectedPoiId;
			return;
		}

		this.clearPoiMarkers();
		this.selectedPoiId = selectedPoiId;

		for (const item of items) {
			const lat = Number(item.latitude);
			const lng = Number(item.longitude);
			if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

			const selected = item.id === selectedPoiId;
			const marker = new Tmapv3.Marker({
				position: new Tmapv3.LatLng(lat, lng),
				icon: getPoiIcon(item.isVisible, selected),
				map: this.map,
			});
			marker.__poiId = item.id;
			marker.__poiIsVisible = item.isVisible;

			marker.on?.('Click', (evt: any) => {
				if (this.interactionMode === 'congestionDraw' || this.poiEditLocked) return;
				evt?.preventDefault?.();
				evt?.stopPropagation?.();
				this.ignoreNextMapClick = true;
				this.clearDraftMarker();
				// 등록/수정 중에도 활성 마커는 항상 1개만 selected 아이콘
				this.setSelectedPoiId(item.id);
				void this.onPoiSelect?.(item.id);
			});

			this.poiMarkers.set(item.id, marker);
		}
	}

	clearCongestionSections() {
		this.clearSectionHover();
		this.savedCongestionPolygons.forEach((polygon) => polygon?.setMap?.(null));
		this.savedCongestionPolygons.clear();
		this.savedCongestionSectionItems = [];
		this.clearSavedVertexSnapTargets();
	}

	/** 저장된 혼잡 구역 표시. interactive 옵션으로 현황 화면 호버/클릭만 opt-in. */
	renderCongestionSections(items: CongestionSectionItem[], options?: CongestionSectionRenderOptions) {
		if (!this.map) return;
		if (!this.isStyleReady) {
			this.pendingCongestionSections = items;
			this.pendingCongestionSectionOptions = options ?? null;
			return;
		}

		this.clearCongestionSections();

		const interactive = options?.interactive === true;
		const onSectionSelect = options?.onSectionSelect;
		this.sectionInteractive = interactive;
		this.onCongestionSectionSelect = onSectionSelect;
		this.onCongestionFacilitySelect = options?.onFacilitySelect;
		this.findFacilityIdAtPoint = options?.findFacilityIdAt;

		const normalized: CongestionSectionItem[] = [];
		for (const item of items) {
			const coords = (item.coordinates ?? [])
				.map((point) => ({ lat: Number(point.lat), lng: Number(point.lng) }))
				.filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng));
			if (coords.length < 3) continue;

			const baseStyle: CongestionPolygonStyle =
				item.isVisible === false ? { ...SAVED_CONGESTION_STYLE.hidden } : { ...SAVED_CONGESTION_STYLE.visible };
			const polygon = new Tmapv3.Polygon({
				paths: coords.map((point) => new Tmapv3.LatLng(point.lat, point.lng)),
				strokeColor: baseStyle.strokeColor,
				strokeWeight: baseStyle.strokeWeight,
				fillColor: baseStyle.fillColor,
				fillOpacity: baseStyle.fillOpacity,
				clickable: true,
				zIndex: 200,
				map: this.map,
			});
			polygon.__congestionSectionId = item.id;
			polygon.__congestionBaseStyle = baseStyle;
			polygon.setZIndex?.(200);
			polygon.setOptions?.({ clickable: true, zIndex: 200 });

			if (interactive) {
				const hoverIn = () => this.setHoveredSection(item.id);
				const hoverOut = () => {
					if (this.hoveredSectionId === item.id) this.setHoveredSection(null);
				};
				const onClick = (evt: any) => {
					evt?.preventDefault?.();
					evt?.stopPropagation?.();
					this.ignoreNextMapClick = true;
					void this.onCongestionSectionSelect?.(item.id);
				};
				// Tmap 이벤트명 케이싱 편차 대응
				polygon.on?.('MouseOver', hoverIn);
				polygon.on?.('mouseover', hoverIn);
				polygon.on?.('MouseOut', hoverOut);
				polygon.on?.('mouseout', hoverOut);
				polygon.on?.('Click', onClick);
				polygon.on?.('click', onClick);
			}

			this.savedCongestionPolygons.set(item.id, polygon);
			normalized.push({ ...item, coordinates: coords });
		}
		this.savedCongestionSectionItems = normalized;
		this.refreshSavedVertexSnapTargets();

		if (interactive) {
			this.ensureSectionHitTestBound();
			this.makeOverlayLayersPassThrough();
		}
	}

	private makeOverlayLayersPassThrough() {
		this.overlayLayers.forEach((layer) => {
			layer?.setClickable?.(false);
			layer?.setOptions?.({ clickable: false });
			layer?.setZIndex?.(1);
		});
	}

	private resolveContainerPointerLatLng(event: MouseEvent, container: HTMLElement) {
		const rect = container.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		return (
			this.screenToLatLng(x, y) ??
			this.screenToLatLng(x * (window.devicePixelRatio || 1), y * (window.devicePixelRatio || 1))
		);
	}

	private ensureSectionHitTestBound() {
		const container = this.getMapContainer();
		if (!container) return;

		if (!this.sectionDomListenersBound) {
			this.sectionDomListenersBound = true;

			this.sectionDomMouseMoveHandler = (event: MouseEvent) => {
				if (!this.sectionInteractive) return;
				const point = this.resolveContainerPointerLatLng(event, container);
				if (!point) return;
				this.setHoveredSection(this.findSectionIdAt(point));
			};
			container.addEventListener('pointermove', this.sectionDomMouseMoveHandler, { passive: true });
			container.addEventListener('mousemove', this.sectionDomMouseMoveHandler, { passive: true });

			// GroundOverlay가 폴리곤/맵 Click을 가로채도 DOM 클릭으로 구역 선택
			container.addEventListener(
				'click',
				(event: MouseEvent) => {
					if (!this.sectionInteractive) return;
					const target = event.target as Element | null;
					if (
						target?.closest?.(
							'[data-facility-marker-id], .marker-image-with-label, .tooltip-label, .tooltip-label-text',
						)
					) {
						return;
					}
					const point = this.resolveContainerPointerLatLng(event, container);
					if (!point) return;
					if (this.trySelectSectionAt(point)) {
						this.ignoreNextMapClick = true;
					}
				},
				true,
			);
		}

		if (!this.sectionMapMouseMoveBound && this.map) {
			this.sectionMapMouseMoveBound = true;
			const onMove = (evt: any) => {
				if (!this.sectionInteractive) return;
				const point = resolveLngLat(evt?.data?.lngLat ?? evt?.lngLat);
				if (!point) return;
				this.setHoveredSection(this.findSectionIdAt(point));
			};
			this.map.on?.('MouseMove', onMove);
			this.map.on?.('mousemove', onMove);
			this.map.on?.('MouseOver', onMove);
		}
	}

	private findSectionIdAt(point: { lat: number; lng: number }): number | null {
		// 나중에 그린(위에 있는) 구역 우선
		for (let i = this.savedCongestionSectionItems.length - 1; i >= 0; i--) {
			const item = this.savedCongestionSectionItems[i];
			if (isPointInPolygon(point, item.coordinates)) return item.id;
		}
		return null;
	}

	private clearHoverHighlightOverlay() {
		if (this.hoverHighlightPolygon) {
			this.hoverHighlightPolygon.setMap?.(null);
			this.hoverHighlightPolygon = null;
		}
	}

	private setHoveredSection(sectionId: number | null) {
		if (this.hoveredSectionId === sectionId) return;

		if (this.hoveredSectionId != null) {
			const prev = this.savedCongestionPolygons.get(this.hoveredSectionId);
			if (prev?.__congestionBaseStyle) applyPolygonStyle(prev, prev.__congestionBaseStyle);
		}

		this.clearHoverHighlightOverlay();
		this.hoveredSectionId = sectionId;

		if (sectionId == null || !this.map) return;

		const next = this.savedCongestionPolygons.get(sectionId);
		const base = next?.__congestionBaseStyle as CongestionPolygonStyle | undefined;
		if (!base) return;

		const hoverStroke = boostColorSaturation(base.strokeColor);
		const hoverFill = boostColorSaturation(base.fillColor);

		if (next) {
			applyPolygonStyle(next, {
				...base,
				strokeColor: hoverStroke,
				strokeWeight: SAVED_CONGESTION_HOVER_STROKE_WEIGHT,
				fillColor: hoverFill,
				fillOpacity: Math.min(0.35, base.fillOpacity + 0.1),
			});
		}

		// setOptions가 무시되는 Tmap 환경 대비: 같은 색(채도↑) 하이라이트 폴리곤을 위에 그림
		const item = this.savedCongestionSectionItems.find((section) => section.id === sectionId);
		const coords = item?.coordinates ?? [];
		if (coords.length < 3) return;

		this.hoverHighlightPolygon = new Tmapv3.Polygon({
			paths: coords.map((point) => new Tmapv3.LatLng(point.lat, point.lng)),
			strokeColor: hoverStroke,
			strokeWeight: SAVED_CONGESTION_HOVER_STROKE_WEIGHT,
			strokeOpacity: 1,
			fillColor: hoverFill,
			fillOpacity: Math.min(0.22, base.fillOpacity + 0.08),
			clickable: false,
			zIndex: 260,
			map: this.map,
		});
		this.hoverHighlightPolygon.setZIndex?.(260);
	}

	private clearSectionHover() {
		if (this.hoveredSectionId != null) {
			const prev = this.savedCongestionPolygons.get(this.hoveredSectionId);
			if (prev?.__congestionBaseStyle) applyPolygonStyle(prev, prev.__congestionBaseStyle);
		}
		this.clearHoverHighlightOverlay();
		this.hoveredSectionId = null;
	}

	/**
	 * 맵 클릭 좌표로 시설(마커) 또는 구역(폴리곤) 선택.
	 * 시설·구역은 별개 데이터 — 마커 근처면 시설 우선.
	 */
	trySelectSectionAt(point: { lat: number; lng: number }): boolean {
		if (!this.sectionInteractive) return false;

		const facilityId = this.findFacilityIdAtPoint?.(point) ?? null;
		if (facilityId != null) {
			void this.onCongestionFacilitySelect?.(facilityId);
			return true;
		}

		const sectionId = this.findSectionIdAt(point);
		if (sectionId == null) return false;
		void this.onCongestionSectionSelect?.(sectionId);
		return true;
	}

	/** 마커 클릭 직후 맵/구역 히트테스트 Click이 중복 처리되지 않게 */
	suppressNextMapClick() {
		this.ignoreNextMapClick = true;
	}

	setInteractionMode(mode: MapInteractionMode) {
		if (mode === this.interactionMode && mode === 'congestionDraw') {
			this.bindCongestionHandlers();
			this.refreshSavedVertexSnapTargets();
			return;
		}

		if (mode === 'poi') {
			this.clearCongestionDraft();
			this.clearSavedVertexSnapTargets();
			this.unbindCongestionHandlers();
			this.interactionMode = 'poi';
			return;
		}

		this.clearDraftMarker();
		this.clearCongestionDraft();
		this.interactionMode = 'congestionDraw';
		this.bindCongestionHandlers();
		this.refreshSavedVertexSnapTargets();
	}

	private clearSavedVertexSnapTargets() {
		this.savedVertexSnapMarkers.forEach((marker) => marker?.setMap?.(null));
		this.savedVertexSnapMarkers = [];
	}

	/** 그리기 모드에서만: 기존 구역 꼭짓점을 마그네틱 스냅 타겟으로 표시 */
	private refreshSavedVertexSnapTargets() {
		this.clearSavedVertexSnapTargets();
		if (!this.map || !this.isStyleReady) return;
		if (this.interactionMode !== 'congestionDraw' || this.congestionCompleted) return;

		const unique = new Map<string, CongestionVertex>();
		for (const section of this.savedCongestionSectionItems) {
			for (const point of section.coordinates ?? []) {
				const lat = Number(point.lat);
				const lng = Number(point.lng);
				if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
				unique.set(vertexKey({ lat, lng }), { lat, lng });
			}
		}

		unique.forEach((point) => {
			const marker = new Tmapv3.Marker({
				position: new Tmapv3.LatLng(point.lat, point.lng),
				iconHTML: savedVertexSnapIconHtml(),
				map: this.map,
			});
			marker.__savedCongestionSnap = true;
			marker.on?.('Click', (evt: any) => {
				if (this.interactionMode !== 'congestionDraw' || this.congestionCompleted) return;
				evt?.preventDefault?.();
				evt?.stopPropagation?.();
				this.ignoreNextMapClick = true;
				this.snapCongestionVertex(point);
			});
			this.savedVertexSnapMarkers.push(marker);
		});
	}

	/** 직전 꼭짓점과 같으면 무시, 아니면 해당 좌표로 꼭짓점 추가 */
	private snapCongestionVertex(point: CongestionVertex) {
		const last = this.congestionVertices[this.congestionVertices.length - 1];
		if (last && vertexKey(last) === vertexKey(point)) return;
		this.addCongestionVertex(point);
	}

	clearCongestionDraft() {
		this.congestionCompleted = false;
		this.congestionVertices = [];
		this.congestionVertexMarkers.forEach((marker) => marker?.setMap?.(null));
		this.congestionVertexMarkers = [];
		if (this.congestionPolyline) {
			this.congestionPolyline.setMap?.(null);
			this.congestionPolyline = null;
		}
		if (this.congestionPolygon) {
			this.congestionPolygon.setMap?.(null);
			this.congestionPolygon = null;
		}
		void this.onCongestionPolygonChange?.([]);
	}

	undoLastVertex() {
		if (this.interactionMode !== 'congestionDraw' || this.congestionCompleted) return;
		if (this.congestionVertices.length === 0) return;
		this.congestionVertices.pop();
		this.redrawCongestionPreview();
		void this.onCongestionPolygonChange?.([...this.congestionVertices]);
	}

	completeCongestionPolygon() {
		if (this.interactionMode !== 'congestionDraw' || this.congestionCompleted) return false;
		if (this.congestionVertices.length < 3) {
			this.onCongestionCompleteFailed?.('혼잡 구역은 꼭짓점 3개 이상이어야 합니다.');
			return false;
		}
		this.congestionCompleted = true;
		this.redrawCongestionPreview();
		this.clearSavedVertexSnapTargets();
		void this.onCongestionPolygonChange?.([...this.congestionVertices]);
		return true;
	}

	getCongestionCoordinates(): CongestionVertex[] {
		return [...this.congestionVertices];
	}

	private bindCongestionHandlers() {
		if (!this.congestionKeyHandler) {
			this.congestionKeyHandler = (event: KeyboardEvent) => {
				if (this.interactionMode !== 'congestionDraw' || this.congestionCompleted) return;
				if (event.key !== 'Backspace') return;
				const target = event.target as HTMLElement | null;
				const tag = target?.tagName?.toLowerCase();
				if (tag === 'input' || tag === 'textarea' || tag === 'select' || target?.isContentEditable) {
					return;
				}
				event.preventDefault();
				this.undoLastVertex();
			};
			window.addEventListener('keydown', this.congestionKeyHandler);
		}

		if (!this.congestionContextMenuHandler) {
			this.congestionContextMenuHandler = (event: MouseEvent) => {
				if (this.interactionMode !== 'congestionDraw') return;
				const mapEl = document.getElementById(this.containerId);
				if (!mapEl || !mapEl.contains(event.target as Node)) return;
				event.preventDefault();
				this.completeCongestionPolygon();
			};
			document.addEventListener('contextmenu', this.congestionContextMenuHandler, true);
		}

		if (this.map && !this.mapContextMenuBound) {
			this.mapContextMenuBound = true;
			this.map.on('ContextMenu', (evt: any) => {
				if (this.interactionMode !== 'congestionDraw') return;
				evt?.preventDefault?.();
				evt?.stopPropagation?.();
				this.completeCongestionPolygon();
			});
		}
	}

	private unbindCongestionHandlers() {
		if (this.congestionKeyHandler) {
			window.removeEventListener('keydown', this.congestionKeyHandler);
			this.congestionKeyHandler = null;
		}
		if (this.congestionContextMenuHandler) {
			document.removeEventListener('contextmenu', this.congestionContextMenuHandler, true);
			this.congestionContextMenuHandler = null;
		}
	}

	private addCongestionVertex(point: CongestionVertex) {
		if (this.congestionCompleted) return;
		this.congestionVertices.push({ lat: point.lat, lng: point.lng });
		this.redrawCongestionPreview();
		void this.onCongestionPolygonChange?.([...this.congestionVertices]);
	}

	private redrawCongestionPreview() {
		if (!this.map || !this.isStyleReady) return;

		this.congestionVertexMarkers.forEach((marker) => marker?.setMap?.(null));
		this.congestionVertexMarkers = [];
		if (this.congestionPolyline) {
			this.congestionPolyline.setMap?.(null);
			this.congestionPolyline = null;
		}
		if (this.congestionPolygon) {
			this.congestionPolygon.setMap?.(null);
			this.congestionPolygon = null;
		}

		const points = this.congestionVertices;
		points.forEach((point, index) => {
			const marker = new Tmapv3.Marker({
				position: new Tmapv3.LatLng(point.lat, point.lng),
				iconHTML: vertexIconHtml(),
				map: this.map,
			});
			marker.__congestionVertexIndex = index;
			marker.on?.('Click', (evt: any) => {
				if (this.interactionMode !== 'congestionDraw' || this.congestionCompleted) return;
				evt?.preventDefault?.();
				evt?.stopPropagation?.();
				this.ignoreNextMapClick = true;
				const lastIndex = this.congestionVertices.length - 1;
				if (index === lastIndex) return;
				const target = this.congestionVertices[index];
				if (!target) return;
				this.snapCongestionVertex(target);
			});
			this.congestionVertexMarkers.push(marker);
		});

		if (points.length >= 3) {
			this.congestionPolygon = new Tmapv3.Polygon({
				paths: points.map((point) => new Tmapv3.LatLng(point.lat, point.lng)),
				strokeColor: CONGESTION_STYLE.strokeColor,
				strokeWeight: CONGESTION_STYLE.strokeWeight,
				fillColor: CONGESTION_STYLE.fillColor,
				fillOpacity: CONGESTION_STYLE.fillOpacity,
				map: this.map,
			});
			return;
		}

		if (points.length >= 2) {
			this.congestionPolyline = new Tmapv3.Polyline({
				path: points.map((point) => new Tmapv3.LatLng(point.lat, point.lng)),
				strokeColor: CONGESTION_STYLE.strokeColor,
				strokeWeight: CONGESTION_STYLE.strokeWeight,
				map: this.map,
			});
		}
	}

	setCenterCoordinates() {
		if (!this.map) {
			console.warn('Map not initialized yet. Call init() first.');
			return;
		}
		this.lockView();

		if (this.mapClickBound) return;
		this.mapClickBound = true;
		this.isContextMenuBound = true;

		this.map.on('Click', (evt: any) => {
			if (this.ignoreNextMapClick) {
				this.ignoreNextMapClick = false;
				return;
			}

			evt?.preventDefault?.();
			evt?.stopPropagation?.();

			const point = resolveLngLat(evt?.data?.lngLat);
			if (!point) return;

			if (this.interactionMode === 'congestionDraw') {
				this.addCongestionVertex(point);
				return;
			}

			// 현황 화면: overlay가 폴리곤 이벤트를 가려도 맵 클릭으로 구역 선택
			if (this.trySelectSectionAt(point)) return;

			if (this.poiEditLocked) return;

			// 새 위치 등록(draft) 시 기존 활성 POI 마커는 전부 비활성 아이콘으로
			this.setSelectedPoiId(null);
			this.clearDraftMarker();
			// 현재 버전 어드민 마커 추가 부분 주석 처리
			// this.marker = new Tmapv3.Marker({
			// 	position: new Tmapv3.LatLng(point.lat, point.lng),
			// 	icon: POI_ICON.draft,
			// 	map: this.map,
			// });

			// this.markers = [this.marker];
			void this.onPointSelect?.(point.lat, point.lng);
		});
	}

	getBoundsFromCenterSize(lat: number, lng: number, widthMeters: number, heightMeters: number) {
		const halfWidth = widthMeters / 2;
		const halfHeight = heightMeters / 2;

		const latOffset = halfHeight / 111111;
		const lngOffset = halfWidth / (111111 * Math.cos((lat * Math.PI) / 180));

		return new Tmapv3.LatLngBounds(
			new Tmapv3.LatLng(lat - latOffset, lng - lngOffset),
			new Tmapv3.LatLng(lat + latOffset, lng + lngOffset),
		);
	}

	private getMapContainer(): HTMLElement | null {
		return document.getElementById(this.containerId);
	}

	private getCenterLatLng(): { lat: number; lng: number } | null {
		if (!this.map) return null;
		return resolveLngLat(this.map.getCenter?.()) ?? this.defaultCenter;
	}

	private getZoomLevel(): number {
		const zoom = Number(this.map?.getZoom?.());
		return Number.isFinite(zoom) ? zoom : this.defaultZoom;
	}

	private screenToLatLng(x: number, y: number): { lat: number; lng: number } | null {
		if (!this.map) return null;

		if (typeof this.map.screenToReal === 'function' && typeof Tmapv3 !== 'undefined') {
			try {
				const latLng = this.map.screenToReal(new Tmapv3.Point(x, y));
				const resolved = resolveLngLat(latLng);
				if (resolved) return resolved;
			} catch {
				// fall through
			}
		}

		if (this.map.project?.inverse) {
			const lngLat = this.map.project.inverse([x, y]);
			return resolveLngLat(lngLat);
		}

		return null;
	}

	/**
	 * 가이드 = 현재 줌에서 Z+DELTA 풀 뷰 미리보기(화면 중앙 1/2^DELTA).
	 * width/height는 캡처 시 맵 컨테이너 크기(예상 PNG 크기).
	 */
	computeGuideCoordinateData(): OverlayCoordinateData | null {
		if (!this.map) return null;

		const container = this.getMapContainer();
		if (!container) return null;

		const center = this.getCenterLatLng();
		if (!center) return null;

		const cw = Math.max(1, container.clientWidth);
		const ch = Math.max(1, container.clientHeight);
		const currentZoom = this.getZoomLevel();
		const captureZoom = Math.min(19, currentZoom + OVERLAY_CAPTURE_ZOOM_DELTA);
		const scale = 2 ** OVERLAY_CAPTURE_ZOOM_DELTA;
		const guideW = cw / scale;
		const guideH = ch / scale;

		const left = (cw - guideW) / 2;
		const top = (ch - guideH) / 2;

		const nw = this.screenToLatLng(left, top);
		const ne = this.screenToLatLng(left + guideW, top);
		const se = this.screenToLatLng(left + guideW, top + guideH);
		const sw = this.screenToLatLng(left, top + guideH);
		if (!nw || !ne || !se || !sw) return null;

		return {
			zoom: captureZoom,
			widthPx: Math.round(cw),
			heightPx: Math.round(ch),
			center,
			nw,
			ne,
			se,
			sw,
		};
	}

	getGuideSnapshot(): OverlayCoordinateData | null {
		return this.guideSnapshot ? { ...this.guideSnapshot, center: { ...this.guideSnapshot.center } } : null;
	}

	private ensureGuideElement() {
		const container = this.getMapContainer();
		if (!container) return;

		if (!this.guideElement) {
			const el = document.createElement('div');
			el.dataset.mapGuide = 'overlay-capture';
			el.style.cssText = [
				'position:absolute',
				'pointer-events:none',
				'z-index:4',
				'border:2px dashed #ef4444',
				'box-shadow:0 0 0 9999px rgba(15,23,42,0.28)',
				'border-radius:2px',
			].join(';');
			const style = getComputedStyle(container);
			if (style.position === 'static') {
				container.style.position = 'relative';
			}
			container.appendChild(el);
			this.guideElement = el;
		}
	}

	private updateGuideElementSize() {
		if (!this.guideElement) return;
		const container = this.getMapContainer();
		if (!container) return;

		const scale = 2 ** OVERLAY_CAPTURE_ZOOM_DELTA;
		const guideW = container.clientWidth / scale;
		const guideH = container.clientHeight / scale;
		this.guideElement.style.width = `${guideW}px`;
		this.guideElement.style.height = `${guideH}px`;
		this.guideElement.style.left = `${(container.clientWidth - guideW) / 2}px`;
		this.guideElement.style.top = `${(container.clientHeight - guideH) / 2}px`;
	}

	private waitForMapSettle(extraDelayMs = 500, timeoutMs = 8000): Promise<void> {
		return new Promise((resolve) => {
			if (!this.map) {
				resolve();
				return;
			}

			let done = false;
			const finish = () => {
				if (done) return;
				done = true;
				this.map.off?.('Idle', onIdle);
				window.clearTimeout(timer);
				window.setTimeout(resolve, extraDelayMs);
			};
			const onIdle = () => finish();
			this.map.on?.('Idle', onIdle);
			const timer = window.setTimeout(finish, timeoutMs);
		});
	}

	private isMostlyBlankCanvas(ctx: CanvasRenderingContext2D, width: number, height: number): boolean {
		const sw = Math.min(64, width);
		const sh = Math.min(64, height);
		const { data } = ctx.getImageData(0, 0, sw, sh);
		let ink = 0;
		for (let i = 0; i < data.length; i += 4) {
			const r = data[i] ?? 255;
			const g = data[i + 1] ?? 255;
			const b = data[i + 2] ?? 255;
			const a = data[i + 3] ?? 0;
			if (a > 8 && (r < 250 || g < 250 || b < 250)) ink += 1;
		}
		return ink < 12;
	}

	private async captureContainerToBlob(): Promise<{ blob: Blob; widthPx: number; heightPx: number }> {
		const container = this.getMapContainer();
		if (!container) throw new Error('맵 컨테이너를 찾을 수 없습니다.');

		const widthPx = Math.max(1, Math.round(container.clientWidth));
		const heightPx = Math.max(1, Math.round(container.clientHeight));
		const out = document.createElement('canvas');
		out.width = widthPx;
		out.height = heightPx;
		const ctx = out.getContext('2d', { willReadFrequently: true });
		if (!ctx) throw new Error('캔버스를 생성할 수 없습니다.');

		this.map?.triggerRepaint?.();
		await new Promise<void>((resolve) => {
			requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
		});

		const mapCanvas =
			(typeof this.map?.getCanvas === 'function' ? this.map.getCanvas() : null) ?? container.querySelector('canvas');
		const canvases = (
			mapCanvas
				? [
						mapCanvas as HTMLCanvasElement,
						...Array.from(container.querySelectorAll('canvas')).filter((c) => c !== mapCanvas),
					]
				: Array.from(container.querySelectorAll('canvas'))
		) as HTMLCanvasElement[];

		if (canvases.length === 0) {
			throw new Error('맵 캔버스를 찾을 수 없습니다.');
		}

		const containerRect = container.getBoundingClientRect();
		let drew = false;
		for (const canvas of canvases) {
			const rect = canvas.getBoundingClientRect();
			if (rect.width < 2 || rect.height < 2) continue;
			try {
				// CSS 픽셀 크기로 맞춰 그려 가이드·꼭짓점과 동일 좌표계 유지
				ctx.drawImage(
					canvas,
					0,
					0,
					canvas.width,
					canvas.height,
					rect.left - containerRect.left,
					rect.top - containerRect.top,
					rect.width,
					rect.height,
				);
				drew = true;
			} catch {
				try {
					const dataUrl = canvas.toDataURL('image/png');
					if (!dataUrl.startsWith('data:image')) continue;
					const img = await new Promise<HTMLImageElement>((resolve, reject) => {
						const image = new Image();
						image.onload = () => resolve(image);
						image.onerror = () => reject(new Error('캔버스 이미지 변환 실패'));
						image.src = dataUrl;
					});
					ctx.drawImage(img, rect.left - containerRect.left, rect.top - containerRect.top, rect.width, rect.height);
					drew = true;
				} catch {
					// 다음 캔버스 시도
				}
			}
		}

		if (!drew || this.isMostlyBlankCanvas(ctx, widthPx, heightPx)) {
			throw new Error('지도 화면 캡처에 실패했습니다. 페이지를 새로고침한 뒤 다시 시도해 주세요.');
		}

		const blob = await new Promise<Blob>((resolve, reject) => {
			out.toBlob((result) => (result ? resolve(result) : reject(new Error('PNG 생성에 실패했습니다.'))), 'image/png');
		});

		return { blob, widthPx, heightPx };
	}

	/**
	 * 라이브맵을 Z+DELTA로 맞춘 뒤 풀 뷰를 캡처하고, zoom/center를 원복한다.
	 */
	async captureOverlayMapImage(): Promise<{ coordinateData: OverlayCoordinateData; blob: Blob }> {
		if (!this.map) throw new Error('지도가 준비되지 않았습니다.');

		const prevCenter = this.getCenterLatLng();
		const prevZoom = this.getZoomLevel();
		if (!prevCenter) throw new Error('지도 중심을 읽을 수 없습니다.');

		const wasGuideVisible = Boolean(this.guideElement && this.guideElement.style.display !== 'none');
		const captureZoom = Math.min(19, prevZoom + OVERLAY_CAPTURE_ZOOM_DELTA);

		this.isCapturingOverlay = true;
		try {
			if (this.guideElement) this.guideElement.style.display = 'none';

			this.setCenter(prevCenter.lat, prevCenter.lng);
			this.setZoom(captureZoom);
			await this.waitForMapSettle();

			await new Promise<void>((resolve) => {
				requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
			});

			const { blob, widthPx, heightPx } = await this.captureContainerToBlob();

			const nw = this.screenToLatLng(0, 0);
			const ne = this.screenToLatLng(widthPx, 0);
			const se = this.screenToLatLng(widthPx, heightPx);
			const sw = this.screenToLatLng(0, heightPx);
			if (!nw || !ne || !se || !sw) {
				throw new Error('캡처 영역 좌표를 계산할 수 없습니다.');
			}

			const center = this.getCenterLatLng() ?? prevCenter;
			const coordinateData: OverlayCoordinateData = {
				zoom: captureZoom,
				widthPx,
				heightPx,
				center,
				nw,
				ne,
				se,
				sw,
			};
			this.guideSnapshot = coordinateData;
			return { coordinateData, blob };
		} finally {
			this.setCenter(prevCenter.lat, prevCenter.lng);
			this.setZoom(prevZoom);
			await this.waitForMapSettle(200, 4000).catch(() => undefined);

			if (wasGuideVisible && this.guideElement) {
				this.guideElement.style.display = 'block';
				this.updateGuideElementSize();
			}

			this.isCapturingOverlay = false;

			if (this.interactionLocked) {
				this.lockedCenter = { ...prevCenter };
				this.lockedZoom = prevZoom;
				this.map.setCenter?.(new Tmapv3.LatLng(prevCenter.lat, prevCenter.lng));
				this.map.setZoom?.(prevZoom);
			}
		}
	}

	private bindGuideMapEvents() {
		if (!this.map || this.guideMapListenersBound) return;
		this.guideMapListenersBound = true;
		const refresh = () => {
			if (!this.guideActive || this.guideFixed) return;
			this.refreshGuideSnapshot();
		};
		this.map.on?.('Drag', refresh);
		this.map.on?.('Zoom', refresh);
		this.map.on?.('Idle', refresh);
	}

	refreshGuideSnapshot() {
		const data = this.computeGuideCoordinateData();
		if (!data) return;
		this.guideSnapshot = data;
		this.updateGuideElementSize();
	}

	showCaptureGuide() {
		this.guideActive = true;
		this.ensureGuideElement();
		this.bindGuideMapEvents();
		this.refreshGuideSnapshot();
		if (this.guideElement) this.guideElement.style.display = 'block';
	}

	hideCaptureGuide() {
		this.guideActive = false;
		this.guideFixed = false;
		this.guideSnapshot = null;
		this.setMapInteractionLocked(false);
		if (this.guideElement) {
			this.guideElement.style.display = 'none';
		}
	}

	setGuideFixed(fixed: boolean) {
		this.guideFixed = fixed;
		if (fixed) {
			this.refreshGuideSnapshot();
			this.setMapInteractionLocked(true);
		} else {
			this.setMapInteractionLocked(false);
			if (this.guideActive) this.refreshGuideSnapshot();
		}
	}

	setMapInteractionLocked(locked: boolean) {
		if (!this.map) return;

		if (!locked) {
			this.interactionLocked = false;
			this.lockedCenter = null;
			this.lockedZoom = null;
			if (this.interactionLockHandler) {
				this.map.off?.('Drag', this.interactionLockHandler);
				this.map.off?.('Zoom', this.interactionLockHandler);
				this.map.off?.('Idle', this.interactionLockHandler);
				this.interactionLockHandler = null;
			}
			if (this.wheelLockHandler) {
				this.getMapContainer()?.removeEventListener('wheel', this.wheelLockHandler, true);
				this.wheelLockHandler = null;
			}
			this.map.setDraggable?.(true);
			this.map.setZoomable?.(true);
			return;
		}

		const center = this.getCenterLatLng();
		const zoom = this.getZoomLevel();
		if (!center) return;

		this.interactionLocked = true;
		this.lockedCenter = center;
		this.lockedZoom = zoom;
		this.map.setDraggable?.(false);
		this.map.setZoomable?.(false);

		if (!this.interactionLockHandler) {
			this.interactionLockHandler = () => {
				if (
					this.isCapturingOverlay ||
					!this.interactionLocked ||
					!this.map ||
					!this.lockedCenter ||
					this.lockedZoom == null
				) {
					return;
				}
				const current = this.getCenterLatLng();
				const currentZoom = this.getZoomLevel();
				if (
					!current ||
					Math.abs(current.lat - this.lockedCenter.lat) > 1e-9 ||
					Math.abs(current.lng - this.lockedCenter.lng) > 1e-9
				) {
					this.map.setCenter(new Tmapv3.LatLng(this.lockedCenter.lat, this.lockedCenter.lng));
				}
				if (currentZoom !== this.lockedZoom) {
					this.map.setZoom(this.lockedZoom);
				}
			};
			this.map.on?.('Drag', this.interactionLockHandler);
			this.map.on?.('Zoom', this.interactionLockHandler);
			this.map.on?.('Idle', this.interactionLockHandler);
		}

		if (!this.wheelLockHandler) {
			this.wheelLockHandler = (event: WheelEvent) => {
				if (!this.interactionLocked) return;
				event.preventDefault();
				event.stopPropagation();
			};
			this.getMapContainer()?.addEventListener('wheel', this.wheelLockHandler, {
				capture: true,
				passive: false,
			});
		}
	}

	private boundsFromCoordinateData(data: OverlayCoordinateData) {
		return new Tmapv3.LatLngBounds(new Tmapv3.LatLng(data.sw.lat, data.sw.lng), new Tmapv3.LatLng(data.ne.lat, data.ne.lng));
	}

	clearDraftOverlay() {
		if (this.draftOverlay) {
			this.draftOverlay.setMap?.(null);
			this.draftOverlay = null;
		}
	}

	showDraftOverlay(imageUrl: string, data: OverlayCoordinateData) {
		if (!this.map || !imageUrl) return null;
		this.clearDraftOverlay();
		this.draftOverlay = new Tmapv3.GroundOverlay({
			bounds: this.boundsFromCoordinateData(data),
			url: imageUrl,
			opacity: 1,
			map: this.map,
		});
		return this.draftOverlay;
	}

	clearOverlayLayers() {
		this.overlayLayers.forEach((layer) => layer?.setMap?.(null));
		this.overlayLayers.clear();
	}

	setOverlayPreviewHidden(id: number, hidden: boolean) {
		if (hidden) this.overlayHiddenIds.add(id);
		else this.overlayHiddenIds.delete(id);

		const layer = this.overlayLayers.get(id);
		if (!layer) return;
		if (hidden) layer.setMap?.(null);
		else layer.setMap?.(this.map);
	}

	renderOverlayLayers(items: OverlayMapItem[]) {
		if (!this.map) return;
		if (!this.isStyleReady) return;

		const nextIds = new Set(items.map((item) => item.id));
		this.overlayLayers.forEach((layer, id) => {
			if (!nextIds.has(id)) {
				layer?.setMap?.(null);
				this.overlayLayers.delete(id);
			}
		});

		const ordered = [...items].sort((a, b) => (a.sortingNumber ?? 0) - (b.sortingNumber ?? 0) || a.id - b.id);

		for (const item of ordered) {
			const data = item.coordinateData;
			if (!data?.sw || !data?.ne || !item.fileUrl) continue;

			const existing = this.overlayLayers.get(item.id);
			if (existing) {
				existing.setMap?.(null);
				this.overlayLayers.delete(item.id);
			}

			const layer = new Tmapv3.GroundOverlay({
				bounds: this.boundsFromCoordinateData(data),
				url: item.fileUrl,
				opacity: 1,
				clickable: this.sectionInteractive ? false : undefined,
				zIndex: this.sectionInteractive ? 1 : undefined,
				map: this.overlayHiddenIds.has(item.id) ? null : this.map,
			});
			if (this.sectionInteractive) {
				layer?.setClickable?.(false);
				layer?.setOptions?.({ clickable: false });
				layer?.setZIndex?.(1);
			}
			this.overlayLayers.set(item.id, layer);
		}
	}

	groundOverlayInit(img = '') {
		if (!this.map) return null;

		const bounds = this.getBoundsFromCenterSize(this.defaultCenter.lat, this.defaultCenter.lng, 744, 489);

		if (this.groundOverlay) {
			this.groundOverlay.setMap(null);
			this.groundOverlay = null;
		}

		this.groundOverlay = new Tmapv3.GroundOverlay({
			bounds,
			url: img,
			opacity: 1,
			map: this.map,
		});
		return this.groundOverlay;
	}

	makerToolTip(
		lat = this.defaultCenter.lat,
		lng = this.defaultCenter.lng,
		icon = '',
		text = '매우 혼잡',
		color = 'red',
		label = '',
		/** 라벨 래퍼 data-facility-marker-id — 현황 마커 호버 타깃용 */
		markerKey = '',
	) {
		if (!this.map) return null;

		const badgeHtml =
			color !== ''
				? /* HTML */ `
						<span class="tooltip-label tooltip-label--marker tooltip-label--${color} peer">
							${text}

							<svg
								class="tooltip-label-arrow"
								width="14"
								height="9"
								viewBox="0 0 14 9"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.21178 8.28588C7.42715 9.08893 6.13535 9.08893 5.35072 8.28587L0.574711 3.3977C-0.662706 2.13123 0.234605 3.73372e-07 2.00524 5.28166e-07L11.5573 1.36323e-06C13.3279 1.51802e-06 14.2252 2.13123 12.9878 3.39771L8.21178 8.28588Z"
								/>
							</svg>
						</span>
					`
				: '';
		const labelHtml =
			label !== ''
				? /* HTML */ `
						<span class="tooltip-label-text">${label}</span>
					`
				: '';
		const key = String(markerKey).replace(/"/g, '');
		const labelContent =
			key !== ''
				? /* HTML */ `
						<span class="marker-image-with-label" data-facility-marker-id="${key}">${badgeHtml}${labelHtml}</span>
					`
				: /* HTML */ `
						${badgeHtml}
					`;

		return new Tmapv3.Marker({
			position: new Tmapv3.LatLng(lat, lng),
			icon: icon,
			draggable: false,
			label: labelContent,
			map: this.map,
		});
	}

	makerPin(
		lat = this.defaultCenter.lat,
		lng = this.defaultCenter.lng,
		category = '',
		congestion = '',
		color = 'var(--base-color)',
		label = '',
		/** 라벨 래퍼 data-facility-marker-id — 현황 마커 호버 타깃용 */
		state = '',
		markerKey = '',
	) {
		if (!this.map) return null;
		const key = String(markerKey).replace(/"/g, '');

		const poiHtml =
			state === 'current'
				? /* HTML */ `
						<poi-pin
							class="marker-image-with-label"
							data-tooltip-type="${state}"
							data-category="${category}"
							data-color="${color}"
							data-label="${label}"
							data-congestion="${congestion}"
							data-facility-marker-id="${key}"
						></poi-pin>
					`
				: state === 'category'
					? /* HTML */ `
							<poi-pin
								class="marker-image-with-label"
								data-tooltip-type="${state}"
								data-category="${category}"
								data-color="${color}"
								data-label="${label}"
								data-congestion="${congestion}"
								data-facility-marker-id="${key}"
							></poi-pin>
						`
					: '';
		const labelContent =
			key !== ''
				? /* HTML */ `
						<span class="marker-image-with-label" data-facility-marker-id="${key}">${poiHtml}</span>
					`
				: /* HTML */ `
						${poiHtml}
					`;

		return new Tmapv3.Marker({
			position: new Tmapv3.LatLng(lat, lng),
			icon: POI_ICON.hidden,
			draggable: false,
			label: labelContent,
			map: this.map,
		});
	}
}
