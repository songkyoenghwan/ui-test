export type FacilityBulkUploadCellValue = string | number | boolean | null;

export interface FacilityBulkUploadDayHours {
    operatingHours: FacilityBulkUploadCellValue;
    breakTime: FacilityBulkUploadCellValue;
}

export interface FacilityBulkUploadRow {
    excelRowNumber: number;
    no: FacilityBulkUploadCellValue;
    facilityId: FacilityBulkUploadCellValue;
    name: {
        ko: FacilityBulkUploadCellValue;
        en: FacilityBulkUploadCellValue;
    };
    category: {
        parentName: FacilityBulkUploadCellValue;
        childName: FacilityBulkUploadCellValue;
    };
    description: {
        ko: FacilityBulkUploadCellValue;
        en: FacilityBulkUploadCellValue;
    };
    contact: FacilityBulkUploadCellValue;
    operationInfoType: FacilityBulkUploadCellValue;
    operationPeriod: {
        type: FacilityBulkUploadCellValue;
        startAt: FacilityBulkUploadCellValue;
        endAt: FacilityBulkUploadCellValue;
    };
    regularClosure: {
        type: FacilityBulkUploadCellValue;
        weeks: FacilityBulkUploadCellValue;
        weekdays: FacilityBulkUploadCellValue;
        dates: FacilityBulkUploadCellValue;
    };
    operatingHours: {
        type: FacilityBulkUploadCellValue;
        common: FacilityBulkUploadDayHours;
        byDay: {
            monday: FacilityBulkUploadDayHours;
            tuesday: FacilityBulkUploadDayHours;
            wednesday: FacilityBulkUploadDayHours;
            thursday: FacilityBulkUploadDayHours;
            friday: FacilityBulkUploadDayHours;
            saturday: FacilityBulkUploadDayHours;
            sunday: FacilityBulkUploadDayHours;
        };
    };
}

export interface FacilityBulkUploadLinkButton {
    name: {
        ko: FacilityBulkUploadCellValue;
        en: FacilityBulkUploadCellValue;
    };
    url: FacilityBulkUploadCellValue;
}

export interface FacilityBulkUploadLinkageRow {
    excelRowNumber: number;
    no: FacilityBulkUploadCellValue;
    facilityId: FacilityBulkUploadCellValue;
    name: {
        ko: FacilityBulkUploadCellValue;
        en: FacilityBulkUploadCellValue;
    };
    commonButtonUrl: FacilityBulkUploadCellValue;
    exclusiveButtons: FacilityBulkUploadLinkButton[];
}

export interface FacilityBulkUploadBody {
    tourDestinationId: number;
    facilityRows: FacilityBulkUploadRow[];
    linkageRows: FacilityBulkUploadLinkageRow[];
    commonButtonName: string;
}

export interface FacilityBulkUploadIdMapping {
    no: string;
    facilityId: number;
}

export interface FacilityBulkUploadResponse {
    createdCount: number;
    updatedCount: number;
    idMappings: FacilityBulkUploadIdMapping[];
}
