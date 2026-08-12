import type { FileItemInput } from './common/file';

export interface OverlayLatLng {
    lat: number;
    lng: number;
}

export interface OverlayCoordinateData {
    zoom: number;
    widthPx: number;
    heightPx: number;
    center: OverlayLatLng;
    sw: OverlayLatLng;
    se: OverlayLatLng;
    ne: OverlayLatLng;
    nw: OverlayLatLng;
}

export interface TourDestinationOverlayListQuery {
    tourDestinationId: number;
}

export interface TourDestinationOverlayListResponse {
    id: number;
    tourDestinationId: number | null;
    fileOriginalName: string;
    fileUploadName: string;
    fileUploadPath: string;
    fileSize: number;
    fileMimeType: string;
    fileUrl: string;
    coordinateData: unknown;
    overlayType: number | null;
    sortingNumber: number | null;
    isVisible: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface CreateTourDestinationOverlayBody extends FileItemInput {
    tourDestinationId: number;
    coordinateData: OverlayCoordinateData;
    overlayType?: number | null;
    isVisible?: boolean;
}

export interface ReorderTourDestinationOverlaysBody {
    tourDestinationId: number;
    orderedIds: number[];
}
