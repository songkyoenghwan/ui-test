export interface FacilitySensorDeviceResponse {
	sensorDeviceId: number;
	memo: string;
	isMapped: boolean;
}

export interface ReplaceFacilityCongestionSectionBody {
	sensorDeviceId: number | null;
}

export interface CreateCongestionDataBody {
	countedPeople: number;
	congestionSensorDeviceId: number;
}

export interface CongestionDataResponse {
	id: number;
	countedPeople: number;
	congestionSensorDeviceId: number;
	createdAt: Date;
}

export interface FacilityCongestionSelectionResponse {
	facilityId: number;
	congestionSectionId: number | null;
	sensorDeviceId: number | null;
	name: string | null;
}

export interface CongestionSectionCoordinate {
	lat: number;
	lng: number;
}

export interface CreateCongestionSectionBody {
	tourDestinationId: number;
	/** 폴리곤 꼭짓점 (개환 가능, 최소 3개) */
	coordinates: CongestionSectionCoordinate[];
	sensorDeviceId?: number | null;
	isVisible?: boolean;
	memo?: string;
}

/** 혼잡 구역 메타 수정 (좌표 재편집은 후속) */
export interface UpdateCongestionSectionBody {
	sensorDeviceId?: number | null;
	isVisible?: boolean;
	memo?: string | null;
}

export interface CongestionSectionListQuery {
	tourDestinationId: number;
}

export interface CongestionSectionResponse {
	id: number;
	tourDestinationId: number | null;
	sensorDeviceId: number | null;
	isVisible: boolean | null;
	memo: string | null;
	coordinates: CongestionSectionCoordinate[];
}
