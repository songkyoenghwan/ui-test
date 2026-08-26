export interface TmapPedestrianFeatureProperties {
	totalDistance?: number | string;
	totalTime?: number | string;
	description?: string;
	turnType?: number | string;
	pointType?: string;
}

export interface TmapPedestrianGeometry {
	type?: string;
	coordinates?: unknown;
}

export interface TmapPedestrianFeature {
	type?: string;
	geometry?: TmapPedestrianGeometry;
	properties?: TmapPedestrianFeatureProperties;
}

export interface TmapPedestrianResponse {
	type?: string;
	features?: TmapPedestrianFeature[];
	error?: {
		code?: string;
		message?: string;
	};
	errorCode?: string;
	errorMessage?: string;
}

export interface WalkingTurn {
	description: string;
}

export interface WalkingPathPoint {
	latitude: number;
	longitude: number;
}

export interface MappedWalkingRoute {
	path: WalkingPathPoint[];
	turns: WalkingTurn[];
	totalDistance: number;
	totalTimeMinutes: number;
	step: number;
}
