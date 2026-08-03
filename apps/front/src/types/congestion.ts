export interface FacilitySensorDevice {
	sensorDeviceId: number;
	memo: string;
	isMapped: boolean;
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
