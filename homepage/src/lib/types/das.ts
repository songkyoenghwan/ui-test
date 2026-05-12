export type DasStatus = '대기' | '진행 중' | '분류 완료';
export type DasVariant = 'wating' | 'pending' | 'succes';
export type CompletionState = 'complete' | 'incomplete';
export type ButtonState = 'details' | 'begins' | 're';

export interface DasWorkStatus {
	orderNumber: string;
	boxNumber: string;
	barcode: string;
	productName: string;
	totalProductQuantity: number;
	quantityInspected: number;
	state: CompletionState;
}

export interface DasBase {
	id: string;
	dasVariant?: DasVariant;
	dasStatus: DasStatus;
	jobNumber: string;
	qrImgUrl: string;
}

export interface DasItems extends DasBase {
	totalOrderCount: number;
	videoCount: number;
	videoRecord: boolean;
	targetQuantity: number;
	completedQuantity: number;
	buttonState: ButtonState;
	dasWorkStatus?: DasWorkStatus[];
}
