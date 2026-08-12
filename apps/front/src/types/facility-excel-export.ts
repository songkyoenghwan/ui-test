export interface FacilityExcelExportDayHours {
    operatingHours: string;
    breakTime: string;
}

export interface FacilityExcelExportExclusiveButton {
    nameKo: string;
    nameEn: string;
    url: string;
}

export interface FacilityExcelExportCommonButtonLink {
    sortingNumber: number;
    tourDestinationCommonButtonId: number;
    url: string;
}

export interface FacilityExcelExportRow {
    facilityId: number;
    nameKo: string;
    nameEn: string;
    parentCategoryNameKo: string;
    childCategoryNameKo: string;
    descriptionKo: string;
    descriptionEn: string;
    contact: string;
    operationInfoType: '직접 입력' | '대상지와 연동' | '등록 안 함';
    operationPeriodType: '' | '상시 운영' | '기간 지정';
    startAt: string | null;
    endAt: string | null;
    regularClosureType: '' | '없음' | '요일' | '날짜';
    regularClosureWeeks: string;
    regularClosureWeekdays: string;
    regularClosureDates: string;
    operatingHoursType: '' | '매일' | '요일별';
    commonOperatingHours: string;
    commonBreakTime: string;
    exclusiveButtons: FacilityExcelExportExclusiveButton[];
    commonButtonLinks: FacilityExcelExportCommonButtonLink[];
    byDay: {
        monday: FacilityExcelExportDayHours;
        tuesday: FacilityExcelExportDayHours;
        wednesday: FacilityExcelExportDayHours;
        thursday: FacilityExcelExportDayHours;
        friday: FacilityExcelExportDayHours;
        saturday: FacilityExcelExportDayHours;
        sunday: FacilityExcelExportDayHours;
    };
}
