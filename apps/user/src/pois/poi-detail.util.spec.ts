import { CongestionStatus } from '../generated/prisma/enums';
import { toPoiDetailResponse, type PoiDetailRow } from './poi-detail.util';

function buildRow(overrides: {
  isCustomSortingYn?: boolean | null;
  isFacilityCongestionYn?: boolean | null;
  isVpsContentsYn?: boolean | null;
  congestionSectionId?: number | null;
  mappings?: PoiDetailRow['facilityPoiMapping'];
  section?: PoiDetailRow['facilityPoiMapping'][number]['facilities'] extends infer F
    ? F extends { congestionSectionFacilitiesCongestionSectionIdTocongestionSection: infer S }
      ? S
      : never
    : never;
  vpsPopups?: NonNullable<
    PoiDetailRow['facilityPoiMapping'][number]['facilities']
  >['facilityVpsPopup'];
}): PoiDetailRow {
  return {
    id: 5,
    tourDestinationId: 3,
    name: { ko: '서울광장' },
    latitude: 37.5665,
    longitude: 126.978,
    address: { ko: '서울' },
    addressDetail: null,
    managementCode: 'POI-005',
    tourDestinations: {
      isCustomSortingYn: overrides.isCustomSortingYn ?? true,
      isFacilityCongestionYn: overrides.isFacilityCongestionYn ?? false,
      isVpsContentsYn: overrides.isVpsContentsYn ?? false,
    },
    facilityPoiMapping: overrides.mappings ?? [
      {
        id: 1,
        facilityId: 11,
        sortingNumber: 1,
        facilities: {
          id: 11,
          name: { ko: '안내소' },
          description: { ko: '설명' },
          contact: '02-0000-0000',
          startAt: null,
          endAt: null,
          congestionSectionId: overrides.congestionSectionId ?? null,
          categories: {
            id: 2,
            name: { ko: '안내' },
            iconKey: 'info',
            categoryColorCodes: { id: 9, colorCode: '#111111' },
            categories: { id: 1, name: { ko: '편의' } },
          },
          facilityFile: [{ id: 1, fileUrl: 'https://cdn.example.com/a.png' }],
          facilityOperatingSchedule: [],
          facilityHolidaySchedule: [],
          facilityButtons: [],
          facilityProductGuideFiles: [],
          facilityProducts: [],
          facilityVpsPopup: overrides.vpsPopups ?? [],
          congestionSectionFacilitiesCongestionSectionIdTocongestionSection:
            overrides.section ?? null,
        },
      },
    ],
  };
}

function mappingStub(input: {
  id: number;
  facilityId: number;
  sortingNumber: number | null;
  operatingSchedules?: NonNullable<
    PoiDetailRow['facilityPoiMapping'][number]['facilities']
  >['facilityOperatingSchedule'];
}): PoiDetailRow['facilityPoiMapping'][number] {
  return {
    id: input.id,
    facilityId: input.facilityId,
    sortingNumber: input.sortingNumber,
    facilities: {
      id: input.facilityId,
      name: { ko: `시설${input.facilityId}` },
      description: null,
      contact: null,
      startAt: null,
      endAt: null,
      congestionSectionId: null,
      categories: {
        id: 2,
        name: { ko: '안내' },
        iconKey: 'info',
        categoryColorCodes: null,
        categories: null,
      },
      facilityFile: [],
      facilityOperatingSchedule: input.operatingSchedules ?? [],
      facilityHolidaySchedule: [],
      facilityButtons: [],
      facilityProductGuideFiles: [],
      facilityProducts: [],
      facilityVpsPopup: [],
      congestionSectionFacilitiesCongestionSectionIdTocongestionSection: null,
    },
  };
}

describe('poi-detail.util', () => {
  it('대상지·시설 혼잡이 모두 켜지면 congestionStatus를 채운다', () => {
    const result = toPoiDetailResponse(
      buildRow({
        isFacilityCongestionYn: true,
        congestionSectionId: 7,
        section: {
          isVisible: true,
          isDeleted: false,
          overwriteCongestionStatus: CongestionStatus.CROWDED,
          threshold: 100,
          congestionSensorDevice: { congestionData: [{ countedPeople: 10 }] },
        },
      }),
    );

    expect(result.facilityPoiMappings[0]?.facility?.congestionStatus).toBe(
      CongestionStatus.CROWDED,
    );
    expect(result.facilityPoiMappings[0]?.facility?.isUsingCongestion).toBe(true);
  });

  it('대상지 혼잡이 꺼져 있으면 congestionStatus는 none이다', () => {
    const result = toPoiDetailResponse(
      buildRow({
        isFacilityCongestionYn: false,
        congestionSectionId: 7,
        section: {
          isVisible: true,
          isDeleted: false,
          overwriteCongestionStatus: CongestionStatus.CROWDED,
          threshold: 100,
          congestionSensorDevice: { congestionData: [{ countedPeople: 10 }] },
        },
      }),
    );

    expect(result.facilityPoiMappings[0]?.facility?.congestionStatus).toBe('none');
  });

  it('대상지 VPS가 켜지고 팝업이 있으면 facilityVpsPopups를 채운다', () => {
    const result = toPoiDetailResponse(
      buildRow({
        isVpsContentsYn: true,
        vpsPopups: [
          {
            id: 3,
            name: { ko: 'AR' },
            description: null,
            url: 'https://example.com/vps',
            fileUrl: 'https://cdn.example.com/vps.png',
            poiId: 5,
            isVisible: true,
          },
        ],
      }),
    );

    expect(result.facilityPoiMappings[0]?.facility?.hasVpsPopup).toBe(true);
    expect(result.facilityPoiMappings[0]?.facility?.facilityVpsPopups).toHaveLength(1);
  });

  it('대상지 VPS가 꺼져 있으면 팝업이 있어도 빈 배열이다', () => {
    const result = toPoiDetailResponse(
      buildRow({
        isVpsContentsYn: false,
        vpsPopups: [
          {
            id: 3,
            name: { ko: 'AR' },
            description: null,
            url: 'https://example.com/vps',
            fileUrl: null,
            poiId: 5,
            isVisible: true,
          },
        ],
      }),
    );

    expect(result.facilityPoiMappings[0]?.facility?.hasVpsPopup).toBe(true);
    expect(result.facilityPoiMappings[0]?.facility?.facilityVpsPopups).toEqual([]);
  });

  it('하위 카테고리에 색이 없으면 부모 카테고리 색을 쓴다', () => {
    const result = toPoiDetailResponse(
      buildRow({
        mappings: [
          {
            id: 1,
            facilityId: 194,
            sortingNumber: 1,
            facilities: {
              ...mappingStub({ id: 1, facilityId: 194, sortingNumber: 1 }).facilities,
              categories: {
                id: 50,
                name: { ko: '2-3 하위' },
                iconKey: 'binoculars',
                categoryColorCodes: null,
                categories: {
                  id: 47,
                  name: { ko: '테스트 카테고리 2번' },
                  iconKey: 'binoculars',
                  categoryColorCodes: { id: 2, colorCode: '#FF983D' },
                },
              },
            },
          },
        ],
      }),
    );

    expect(result.facilityPoiMappings[0]?.facility?.category).toMatchObject({
      iconKey: 'binoculars',
      categoryColorCodes: { colorCode: '#FF983D' },
    });
  });

  it('커스텀 정렬이면 CMS sortingNumber 순으로 시설을 나열한다', () => {
    const result = toPoiDetailResponse(
      buildRow({
        isCustomSortingYn: true,
        mappings: [
          mappingStub({ id: 2, facilityId: 20, sortingNumber: 2 }),
          mappingStub({ id: 1, facilityId: 10, sortingNumber: 1 }),
        ],
      }),
    );

    expect(result.facilityPoiMappings.map((item) => item.facilityId)).toEqual([10, 20]);
  });

  it('운영 상태 순이면 운영 중 시설을 앞에 두고 동률은 CMS 순이다', () => {
    const now = new Date('2026-08-19T05:00:00.000Z');
    const operatingSchedule = {
      id: 1,
      dayOfWeek: 3,
      openingTime: '09:00',
      closingTime: '18:00',
      facilityBreakSchedule: [],
    };

    const result = toPoiDetailResponse(
      buildRow({
        isCustomSortingYn: false,
        mappings: [
          mappingStub({ id: 1, facilityId: 10, sortingNumber: 1 }),
          mappingStub({
            id: 3,
            facilityId: 30,
            sortingNumber: 3,
            operatingSchedules: [operatingSchedule],
          }),
          mappingStub({
            id: 2,
            facilityId: 20,
            sortingNumber: 2,
            operatingSchedules: [{ ...operatingSchedule, id: 2 }],
          }),
        ],
      }),
      now,
    );

    expect(result.facilityPoiMappings.map((item) => item.facilityId)).toEqual([20, 30, 10]);
  });
});
