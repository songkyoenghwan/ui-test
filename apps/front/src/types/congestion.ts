export interface FacilitySensorDevice {
	sensorDeviceId: number;
	memo: string;
	isMapped: boolean;
	/** FACILITY→facilityId / SECTION→sectionId */
	mappedTargetId: number | null;
}

/** 혼잡도 현황 우측 목록 아이템 (구역/시설 공통) */
export type CongestionStatusLevel = 'VERY_CROWDED' | 'CROWDED' | 'NORMAL' | 'RELAXED' | 'none';

export interface CongestionStatusListItem {
	id: number;
	name: string;
	/** 시설: 연동 POI 노출 여부 / 구역: section.isVisible */
	isVisible: boolean;
	/** 시설: 삭제되지 않은 POI 매칭 여부 / 구역: 센서 매칭 여부 */
	isMatched: boolean;
	level: CongestionStatusLevel;
	/** section.overwriteCongestionStatus 적용 여부 */
	isOverridden?: boolean;
	/** 매칭된 센서 ID (이력 select 초기값) */
	sensorDeviceId?: number | null;
	/** 맵 마커용 (시설+POI 매칭 시) */
	latitude?: number | null;
	longitude?: number | null;
	poiId?: number | null;
}

/** 현황 패널 하단 매칭 전 센서 목록 */
export interface CongestionUnmatchedSensorItem {
	sensorDeviceId: number;
	name: string;
	isVisible: boolean;
	isMatched: false;
	level: CongestionStatusLevel;
}

export interface CongestionHistoryItem {
	recordedAt: string;
	level: CongestionStatusLevel;
	countedPeople: number | null;
}

export interface ReplaceFacilityCongestionSectionBody {
	sensorDeviceId: number | null;
}

export interface FacilityCongestionSelection {
	facilityId: number;
	congestionSectionId: number | null;
	sensorDeviceId: number | null;
	name: string | null;
}
