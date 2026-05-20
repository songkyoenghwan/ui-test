export type InspectionStatus = '검수 전' | '검수 중' | '검수 완료' | '검수 중단';
export type InspectionVariant = 'wating' | 'pending' | 'succes';
export type CompletionState = 'complete' | 'incomplete';
export type ButtonState = 'details' | 'begins' | 're';

export interface TableHeader {
	key: string;
	label: string;
	cls?: string;
}

export interface FilterDetail {
	id: string;
	value: string;
}

export interface Product {
	location: string;
	barcode: string;
	name: string;
	scan: number;
	target: number;
}

export interface Inspected {
	orderNumber: string;
	totalProductQuantity: number;
	quantityInspected: number;
	state: CompletionState;
	downloadUrl: string;
	products?: Product[];
}

export interface InspectionBase {
	id: string;
	inspectionType: string;
	inspectionVariant?: InspectionVariant;
	inspectionStatus: InspectionStatus;
	jobNumber: string;
	qrImgUrl: string;
}

export interface InspectionItems extends InspectionBase {
	totalOrderCount: number;
	videoCount: number;
	videoRecord: boolean;
	targetQuantity: number;
	completedQuantity: number;
	buttonState: ButtonState;
	inspected?: Inspected[];
}

export interface Wave {
	waveId: string;
	waveNumber: string;
	status: string;
	completeDt: string;
	inspectionType: string;
	firstStartDt: string;
	lastEndDt: string;
	totalSlipNumberCount: number;
	totalProductCount: number;
	totalInspectionInProgressCount: number;
	totalInspectionCompletedCount: number;
	totalInspectionSkippedCount: number;
	totalInspectionCompletedProductCount: number;
}

export interface WaveDetail {
	waveId: string;
	waveNumber: string;
	status: string;
	inspectionType: string;
	list: Task[];
}

export interface Task {
	slipNumber: string;
	startDt: string;
	endDt: string;
	fileId: string;
	currentSkuCount: number;
	targetSkuCount: number;
	totalProductCount: number;
	totalInspectionCompletedProductCount: number;
}

export interface InspectionProduct {
	supply_bin: string;
	product_code: string;
	product_name: string;
	target_count: number;
	completed_count: number;
}
