# POI 목록(마커) + 키워드(시설 측만)

## Goal

`GET /api/v1/pois` 하나로 마커 아이템 `{ items }`(상한 500)을 제공한다. (`/pois/markers` 제거) 키워드는 시설명·카테고리명(+부모)·시설 태그만 검색하며 **POI 위치명은 제외**한다. 카테고리 칩도 표시명을 `keyword`로 전달한다.

## Contract

```http
GET /api/v1/pois?tourDestinationId=1&language=ko&keyword=안내
```

- 필수: `tourDestinationId`
- 선택: `language`(기본 `ko`), `keyword`
- 응답 항목: `id`, `name`(언어별 POI명), `latitude`, `longitude`, `facilityId`, `categoryId`, `categoryIconKey`, `categoryIconUrl`, `categoryColorCode`, `congestionStatus`
- `keyword` 있음: 매칭 시설이 있는 POI만, 대표 시설도 매칭 시설 중에서 선정
- `keyword` 없음: 공개 카테고리 시설이 있는 POI

### 상세 `GET /pois/:id`

- 쿼리 필터 없음
- `facilityPoiMappings`: 공개 가능한 시설 전부 대상지 정렬 규칙으로 반환
  - `isCustomSortingYn=true`: CMS `sortingNumber` 순
  - `false`: 운영 상태 순(운영 중 → 휴게 → 운영 전 → 종료 → 휴무 → 미운영 → 정보 없음), 동률은 CMS 순

## Implementation

- `poi-search.util.ts` — `buildFacilityKeywordWhere`, `buildMarkerMappingWhere`
- `PoiViewportQueryDto` — optional `keyword`
- `PoisService.findMany` — 마커 목록 조회
- `toPoiDetailResponse` — `compareDestinationFacilityOrder`로 시설 목록 정렬
- `GET /pois/markers` 제거

## Verification

- unit: `poi-search.util.spec.ts`, `poi-detail.util.spec.ts`, `pois.service.spec.ts`
- e2e: `/pois` 마커 응답·keyword, OpenAPI에 `/pois/markers` 없음, `/pois/{id}`는 keyword 없음
- `npm run check`
