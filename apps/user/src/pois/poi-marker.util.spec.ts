import { CongestionStatus } from '../generated/prisma/enums';
import { FACILITY_OPERATING_STATUS_RANK } from './constants/poi.constant';
import { getLocalizedName, pickRepresentativeFacility, toPoiViewportItem } from './poi-marker.util';

type RankedFacility = NonNullable<ReturnType<typeof pickRepresentativeFacility>>;

describe('poi-marker.util', () => {
  const now = new Date('2026-08-19T03:30:00.000Z');

  it('요청 언어가 없으면 ko와 고정 언어 순으로 이름을 고른다', () => {
    expect(getLocalizedName({ en: 'Gate', ko: '입구' }, 'ja')).toBe('입구');
    expect(getLocalizedName({ en: 'Gate' }, 'ko')).toBe('Gate');
    expect(getLocalizedName(null, 'ko')).toBe('');
  });

  it('커스텀 정렬이면 매핑 sortingNumber가 작은 시설을 고른다', () => {
    const picked = pickRepresentativeFacility([ranked(2, 20, 1), ranked(1, 10, 1)], true);

    expect(picked?.facility.id).toBe(10);
  });

  it('운영 상태 순이면 상태 순위가 앞선 시설을 고르고 동률이면 CMS 순이다', () => {
    const picked = pickRepresentativeFacility(
      [
        ranked(1, 10, FACILITY_OPERATING_STATUS_RANK.AFTER_CLOSE),
        ranked(3, 30, FACILITY_OPERATING_STATUS_RANK.OPERATING),
        ranked(2, 20, FACILITY_OPERATING_STATUS_RANK.OPERATING),
      ],
      false,
    );

    expect(picked?.facility.id).toBe(20);
  });

  it('대표 시설의 카테고리 아이콘과 혼잡도를 마커에 넣는다', () => {
    const item = toPoiViewportItem(
      {
        id: 12,
        name: { ko: '해운대시장 입구', en: 'Haeundae Gate' },
        latitude: 35.158,
        longitude: 129.16,
        tourDestinations: {
          isCustomSortingYn: true,
          isFacilityCongestionYn: true,
        },
        facilityPoiMapping: [
          {
            sortingNumber: 1,
            isVisible: true,
            isDeleted: false,
            facilities: {
              id: 45,
              name: { ko: '해운대 횟집', en: 'Haeundae Restaurant' },
              isVisible: true,
              isDeleted: false,
              startAt: null,
              endAt: null,
              categoryId: 3,
              categories: {
                id: 3,
                isVisible: true,
                isDeleted: false,
                iconKey: 'food',
                categoryColorCodes: {
                  isVisible: true,
                  isDeleted: false,
                  colorCode: '#FF8A00',
                },
                categoryFile: [{ fileUrl: 'https://cdn.example.com/categories/food.png' }],
                categories: null,
              },
              facilityOperatingSchedule: [],
              facilityHolidaySchedule: [],
              congestionSectionFacilitiesCongestionSectionIdTocongestionSection: {
                isVisible: true,
                isDeleted: false,
                overwriteCongestionStatus: CongestionStatus.CROWDED,
                threshold: 100,
                sensorDeviceId: 8,
                congestionSensorDevice: {
                  congestionData: [{ countedPeople: 10 }],
                },
              },
            },
          },
        ],
      },
      'en',
      now,
    );

    expect(item).toEqual({
      id: 12,
      name: 'Haeundae Gate',
      latitude: 35.158,
      longitude: 129.16,
      facilityId: 45,
      facilityName: 'Haeundae Restaurant',
      categoryId: 3,
      categoryIconKey: 'food',
      categoryIconUrl: 'https://cdn.example.com/categories/food.png',
      categoryColorCode: '#FF8A00',
      congestionStatus: CongestionStatus.CROWDED,
    });
  });

  it('필터된 매핑 중 정렬 순위가 높은 시설의 이름을 대표 시설명으로 넣는다', () => {
    const item = toPoiViewportItem(
      {
        id: 12,
        name: { ko: '해운대시장 입구' },
        latitude: 35.158,
        longitude: 129.16,
        tourDestinations: {
          isCustomSortingYn: true,
          isFacilityCongestionYn: false,
        },
        facilityPoiMapping: [
          {
            sortingNumber: 2,
            isVisible: true,
            isDeleted: false,
            facilities: {
              id: 46,
              name: { ko: '낮은 순위 시설' },
              isVisible: true,
              isDeleted: false,
              startAt: null,
              endAt: null,
              categoryId: 3,
              categories: {
                id: 3,
                isVisible: true,
                isDeleted: false,
                iconKey: 'cafe',
                categoryColorCodes: { isVisible: true, isDeleted: false, colorCode: '#111111' },
                categoryFile: [],
                categories: null,
              },
              facilityOperatingSchedule: [],
              facilityHolidaySchedule: [],
              congestionSectionFacilitiesCongestionSectionIdTocongestionSection: null,
            },
          },
          {
            sortingNumber: 1,
            isVisible: true,
            isDeleted: false,
            facilities: {
              id: 45,
              name: { ko: '아이콘 시설' },
              isVisible: true,
              isDeleted: false,
              startAt: null,
              endAt: null,
              categoryId: 4,
              categories: {
                id: 4,
                isVisible: true,
                isDeleted: false,
                iconKey: 'food',
                categoryColorCodes: { isVisible: true, isDeleted: false, colorCode: '#FF8A00' },
                categoryFile: [],
                categories: null,
              },
              facilityOperatingSchedule: [],
              facilityHolidaySchedule: [],
              congestionSectionFacilitiesCongestionSectionIdTocongestionSection: null,
            },
          },
        ],
      },
      'ko',
      now,
    );

    expect(item).toMatchObject({
      facilityId: 45,
      facilityName: '아이콘 시설',
      categoryIconKey: 'food',
    });
  });

  it('overwrite가 없으면 최신 센서 인원과 threshold로 혼잡도를 분류한다', () => {
    const item = toPoiViewportItem(
      {
        id: 12,
        name: { ko: '해운대시장 입구' },
        latitude: 35.158,
        longitude: 129.16,
        tourDestinations: {
          isCustomSortingYn: true,
          isFacilityCongestionYn: true,
        },
        facilityPoiMapping: [
          {
            sortingNumber: 1,
            isVisible: true,
            isDeleted: false,
            facilities: {
              id: 45,
              isVisible: true,
              isDeleted: false,
              startAt: null,
              endAt: null,
              categoryId: 3,
              categories: {
                id: 3,
                isVisible: true,
                isDeleted: false,
                iconKey: 'food',
                categoryColorCodes: {
                  isVisible: true,
                  isDeleted: false,
                  colorCode: '#FF8A00',
                },
                categoryFile: [{ fileUrl: 'https://cdn.example.com/categories/food.png' }],
                categories: null,
              },
              facilityOperatingSchedule: [],
              facilityHolidaySchedule: [],
              congestionSectionFacilitiesCongestionSectionIdTocongestionSection: {
                isVisible: true,
                isDeleted: false,
                overwriteCongestionStatus: null,
                threshold: 100,
                sensorDeviceId: 8,
                congestionSensorDevice: {
                  congestionData: [{ countedPeople: 45 }],
                },
              },
            },
          },
        ],
      },
      'ko',
      now,
    );

    expect(item?.congestionStatus).toBe(CongestionStatus.NORMAL);
  });

  it('카테고리 색이 비공개이거나 없으면 null이다', () => {
    const item = toPoiViewportItem(
      {
        id: 12,
        name: { ko: '해운대시장 입구' },
        latitude: 35.158,
        longitude: 129.16,
        tourDestinations: {
          isCustomSortingYn: true,
          isFacilityCongestionYn: false,
        },
        facilityPoiMapping: [
          {
            sortingNumber: 1,
            isVisible: true,
            isDeleted: false,
            facilities: {
              id: 45,
              isVisible: true,
              isDeleted: false,
              startAt: null,
              endAt: null,
              categoryId: 3,
              categories: {
                id: 3,
                isVisible: true,
                isDeleted: false,
                iconKey: 'food',
                categoryColorCodes: {
                  isVisible: false,
                  isDeleted: false,
                  colorCode: '#FF8A00',
                },
                categoryFile: [],
                categories: null,
              },
              facilityOperatingSchedule: [],
              facilityHolidaySchedule: [],
              congestionSectionFacilitiesCongestionSectionIdTocongestionSection: null,
            },
          },
        ],
      },
      'ko',
      now,
    );

    expect(item?.categoryColorCode).toBeNull();
    expect(item?.congestionStatus).toBe('none');
  });

  it('하위 카테고리 색·아이콘이 없으면 부모 값을 쓴다', () => {
    const item = toPoiViewportItem(
      {
        id: 12,
        name: { ko: '해운대시장 입구' },
        latitude: 35.158,
        longitude: 129.16,
        tourDestinations: {
          isCustomSortingYn: true,
          isFacilityCongestionYn: false,
        },
        facilityPoiMapping: [
          {
            sortingNumber: 1,
            isVisible: true,
            isDeleted: false,
            facilities: {
              id: 45,
              isVisible: true,
              isDeleted: false,
              startAt: null,
              endAt: null,
              categoryId: 8,
              categories: {
                id: 8,
                isVisible: true,
                isDeleted: false,
                iconKey: null,
                categoryColorCodes: null,
                categoryFile: [],
                categories: {
                  iconKey: 'binoculars',
                  categoryColorCodes: {
                    isVisible: true,
                    isDeleted: false,
                    colorCode: '#274FA8',
                  },
                  categoryFile: [{ fileUrl: 'https://cdn.example.com/categories/binoculars.png' }],
                },
              },
              facilityOperatingSchedule: [],
              facilityHolidaySchedule: [],
              congestionSectionFacilitiesCongestionSectionIdTocongestionSection: null,
            },
          },
        ],
      },
      'ko',
      now,
    );

    expect(item).toMatchObject({
      categoryIconKey: 'binoculars',
      categoryIconUrl: 'https://cdn.example.com/categories/binoculars.png',
      categoryColorCode: '#274FA8',
    });
  });

  it('공개 카테고리가 없는 시설은 마커에서 뺀다', () => {
    expect(
      toPoiViewportItem(
        {
          id: 1,
          name: { ko: '카테고리 없는 POI' },
          latitude: 35,
          longitude: 129,
          tourDestinations: { isCustomSortingYn: false, isFacilityCongestionYn: false },
          facilityPoiMapping: [
            {
              sortingNumber: 1,
              isVisible: true,
              isDeleted: false,
              facilities: {
                id: 45,
                isVisible: true,
                isDeleted: false,
                startAt: null,
                endAt: null,
                categoryId: null,
                categories: null,
                facilityOperatingSchedule: [],
                facilityHolidaySchedule: [],
                congestionSectionFacilitiesCongestionSectionIdTocongestionSection: null,
              },
            },
          ],
        },
        'ko',
        now,
      ),
    ).toBeNull();
  });

  it('삭제되거나 비노출인 시설·매핑은 마커에서 뺀다', () => {
    expect(
      toPoiViewportItem(
        {
          id: 1,
          name: { ko: '숨긴 시설 POI' },
          latitude: 35,
          longitude: 129,
          tourDestinations: { isCustomSortingYn: false, isFacilityCongestionYn: false },
          facilityPoiMapping: [
            {
              sortingNumber: 1,
              isVisible: true,
              isDeleted: false,
              facilities: {
                id: 45,
                isVisible: false,
                isDeleted: false,
                startAt: null,
                endAt: null,
                categoryId: 3,
                categories: {
                  id: 3,
                  isVisible: true,
                  isDeleted: false,
                  iconKey: 'food',
                  categoryColorCodes: null,
                  categoryFile: [],
                  categories: null,
                },
                facilityOperatingSchedule: [],
                facilityHolidaySchedule: [],
                congestionSectionFacilitiesCongestionSectionIdTocongestionSection: null,
              },
            },
            {
              sortingNumber: 2,
              isVisible: true,
              isDeleted: true,
              facilities: {
                id: 46,
                isVisible: true,
                isDeleted: false,
                startAt: null,
                endAt: null,
                categoryId: 3,
                categories: {
                  id: 3,
                  isVisible: true,
                  isDeleted: false,
                  iconKey: 'food',
                  categoryColorCodes: null,
                  categoryFile: [],
                  categories: null,
                },
                facilityOperatingSchedule: [],
                facilityHolidaySchedule: [],
                congestionSectionFacilitiesCongestionSectionIdTocongestionSection: null,
              },
            },
          ],
        },
        'ko',
        now,
      ),
    ).toBeNull();
  });

  it('매칭 시설이 없으면 마커를 만들지 않는다', () => {
    expect(
      toPoiViewportItem(
        {
          id: 1,
          name: { ko: '빈 POI' },
          latitude: 35,
          longitude: 129,
          tourDestinations: { isCustomSortingYn: false, isFacilityCongestionYn: false },
          facilityPoiMapping: [],
        },
        'ko',
        now,
      ),
    ).toBeNull();
  });
});

function ranked(sortingNumber: number, facilityId: number, rank: number): RankedFacility {
  return {
    mapping: { sortingNumber },
    facility: { id: facilityId },
    rank,
  } as RankedFacility;
}
