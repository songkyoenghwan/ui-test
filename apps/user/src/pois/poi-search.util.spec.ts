import {
  buildFacilityKeywordWhere,
  buildMarkerMappingWhere,
  normalizeSearchKeyword,
} from './poi-search.util';

describe('poi-search.util', () => {
  it('공백 keyword는 미적용으로 정규화한다', () => {
    expect(normalizeSearchKeyword(undefined)).toBeUndefined();
    expect(normalizeSearchKeyword('')).toBeUndefined();
    expect(normalizeSearchKeyword('  ')).toBeUndefined();
    expect(normalizeSearchKeyword(' 안내 ')).toBe('안내');
  });

  it('시설 키워드 where에 시설명·카테고리·태그만 포함하고 위치명은 없다', () => {
    const where = buildFacilityKeywordWhere('안내', 'ko');
    expect(where.OR).toHaveLength(3);
    expect(where.OR?.[0]).toEqual({ name: { path: ['ko'], string_contains: '안내' } });
    expect(where.OR?.[1]).toHaveProperty('categories');
    expect(where.OR?.[2]).toHaveProperty('facilityKeywordTags');
  });

  it('마커 매핑 where는 keyword가 있으면 시설 측 매칭만 넣는다', () => {
    expect(
      buildMarkerMappingWhere({
        language: 'ko',
      }),
    ).toEqual({
      isVisible: true,
      isDeleted: false,
      facilities: {
        is: {
          isVisible: true,
          isDeleted: false,
          categories: {
            is: {
              isVisible: true,
              isDeleted: false,
            },
          },
        },
      },
    });

    const withKeyword = buildMarkerMappingWhere({
      keyword: '광장',
      language: 'en',
    });
    expect(withKeyword.facilities).toEqual({
      is: {
        isVisible: true,
        isDeleted: false,
        categories: {
          is: {
            isVisible: true,
            isDeleted: false,
          },
        },
        AND: [buildFacilityKeywordWhere('광장', 'en')],
      },
    });
  });
});
