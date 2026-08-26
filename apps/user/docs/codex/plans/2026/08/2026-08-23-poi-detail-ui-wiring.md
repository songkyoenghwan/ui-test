---
status: implemented
scope: fullstack
domain: pois
created: 2026-08-23
---

# 검색/핀 선택 = 같은 POI 상세, 메인 시설만 다름

## 목표

- 핀 클릭과 검색 시설 클릭 모두 `GET /api/v1/pois/:id`를 연다. 페이로드는 같고 `current.facility`만 앞에서 고른 시설이다.
- 검색 `items`에 `poiId`를 넣어 목록에서 POI를 연다.
- 매핑에서 선택한 시설을 `facility` / `facilityDetail`에 넣고, 나머지는 `facilityOtherList`에 둔다.
- 시트 필드명에 맞게 매핑만 한다. 퍼블 레이아웃은 유지한다.

```text
핀 클릭 / 검색 행 클릭 / 기타 시설 클릭
  → current.poi + current.facility
  → GET /pois/:id
  → 메인 시설 + 기타 시설
  → 기존 Facility 시트
```

## 변경 대상 파일

- `src/search/dto/search-response.dto.ts` — `poiId: number | null`
- `src/search/search.service.ts` — 공개 매핑 중 첫 POI id
- `ui/src/types/search.ts` — `poiId`
- `ui/src/types/pois.ts` — Nest 상세 시설 타입
- `ui/src/stores/pageDataStore.ts` — `loadPoiDetail`, 스케줄/상품/버튼/파일 매핑
- `ui/src/pages/map/MapCanvas.astro` — 핀 클릭 → `loadPoiDetail`
- `ui/src/components/svelte/sheet/SearchSheet.svelte` — 행 클릭 → `loadPoiDetail`
- `ui/src/components/svelte/facility/OtherFacilities.svelte` — 기타 시설 클릭으로 메인 교체
- `ui/src/components/svelte/facility/Overview.svelte` / `Info.svelte` — 상세 썸네일·아이콘 바인딩

## 구현 단계

1. 검색 시설 항목에 공개 POI id를 넣는다.
2. `loadPoiDetail(poiId, selectedFacilityId)`가 `/api/v1/pois/:id`를 호출한다.
3. `facilityPoiMappings`에서 선택 시설을 메인, 나머지를 other로 나눈다.
4. 운영시간, 휴게, 연락처, 소개, 상품, 버튼, 이미지를 퍼블 필드명으로 옮긴다.
5. 하위 카테고리 아이콘/색이 없으면 부모 값을 쓴다.
6. 핀과 검색 행과 기타 시설 카드가 같은 `loadPoiDetail`을 쓴다.
7. 리스트에서 고르면 퍼블대로 시트를 중간 높이로 내린다.

## 테스트 유형

- SearchService: item에 `poiId`가 붙는지
- pageDataStore: 선택한 시설이 메인, 나머지가 other인지, 카테고리 아이콘·운영시간·상품이 남는지

## 검증 명령

```bash
npm test -- src/search/search.service.spec.ts src/pois/poi-detail.util.spec.ts
cd ui && bun test src/stores/pageDataStore.test.ts
git diff -- ui/src/stores/sheetUiStore.ts
```

## 위험 요소

- 레거시 `GET /api/facilities/:id`를 쓰면 503이 난다. 상세는 Nest POI만 쓴다.
- 대상지 공통 버튼 아이콘은 v1 대상지 상세에 목록이 없어 시트에 안 붙는다.
- 검색/카테고리 클릭은 Svelte 아일랜드에 있어서 Astro만으로는 받을 수 없다. 스토어 호출은 해당 Svelte에 둔다.

## 제외 범위

- Nest `GET /facilities/:id` 신규
- 검색 시트 레이아웃 개편
- 최근 검색 이력
- 대상지 공통 버튼 API 추가
