import { Prisma } from '../generated/prisma/client';
import { PUBLIC_VISIBILITY, type PoiLanguage } from './constants/poi.constant';

export function normalizeSearchKeyword(keyword?: string | null): string | undefined {
  if (keyword == null) {
    return undefined;
  }

  const trimmed = keyword.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function buildLocalizedNameContains(keyword: string, language: PoiLanguage) {
  return {
    path: [language],
    string_contains: keyword,
  };
}

/** 시설 측 키워드 매칭 (시설명 · 카테고리명 · 부모 카테고리명 · 태그명). 위치명 제외. */
export function buildFacilityKeywordWhere(
  keyword: string,
  language: PoiLanguage,
): Prisma.FacilityWhereInput {
  const nameContains = buildLocalizedNameContains(keyword, language);

  return {
    OR: [
      { name: nameContains },
      {
        categories: {
          is: {
            OR: [{ name: nameContains }, { categories: { is: { name: nameContains } } }],
          },
        },
      },
      {
        facilityKeywordTags: {
          some: {
            ...PUBLIC_VISIBILITY,
            tourDestinationTags: {
              is: {
                ...PUBLIC_VISIBILITY,
                name: nameContains,
              },
            },
          },
        },
      },
    ],
  };
}

/** 공개 매핑 + 공개 시설 + 공개 카테고리 + 선택적 시설 키워드. */
export function buildMarkerMappingWhere(input: {
  keyword?: string;
  language: PoiLanguage;
}): Prisma.FacilityPoiMappingWhereInput {
  const facilityWhere: Prisma.FacilityWhereInput = {
    ...PUBLIC_VISIBILITY,
    categories: {
      is: {
        ...PUBLIC_VISIBILITY,
      },
    },
  };

  if (input.keyword) {
    facilityWhere.AND = [buildFacilityKeywordWhere(input.keyword, input.language)];
  }

  return {
    ...PUBLIC_VISIBILITY,
    facilities: { is: facilityWhere },
  };
}
