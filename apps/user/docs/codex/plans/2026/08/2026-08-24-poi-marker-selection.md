---
status: implemented
scope: fullstack
domain: pois
created: 2026-08-24
---

# 검색·선택 POI 마커 색과 선택 이미지

## 목표

- 검색된 시설만 매핑에 남긴 뒤, 그중 우선순위로 대표 시설을 고른다. 마커 아이콘·혼잡도는 그 대표 시설 값을 쓴다.
- 하위 카테고리에 색·아이콘이 없으면 부모 카테고리 값을 마커에도 쓴다. 검색 목록과 같다.
- 시설 상세 시트가 열려 있을 때만 해당 POI 핀을 퍼블 `current` 이미지로 바꾼다. 색은 카테고리 색이다.
- 상세 시트를 벗어나면 핀은 다시 작은 `category` 아이콘이다.
- 핀·검색 행·기타 시설을 고르면 퍼블대로 시트를 중간 높이로 내린다. 퍼블 컴포넌트에 시트 API를 넣지 않고 `loadPoiDetail`에서 내린다.

```text
검색/핀 목록 → 매칭 시설만 대표 선정 → 아이콘·색·혼잡도
시설 상세 열림 → 해당 핀 current + 카테고리 색
상세 닫힘(뒤로가기·검색 전환) → category 핀
핀/검색/기타 시설 선택 → loadPoiDetail → 시트 mid
```

## 변경 대상 파일

- `src/pois/poi-marker.util.ts` — 부모 카테고리 아이콘·색·파일 fallback
- `src/pois/poi-marker.util.spec.ts` — 부모 fallback 단위 테스트
- `ui/src/stores/pageDataStore.ts` — `loadPoiDetail`에서 `setPointSheetUi('mid')`
- `ui/src/events/mapEvent.ts` — `replaceFacilityPins`에 선택 POI/시설, `current`/`category` 상태
- `ui/src/pages/map/MapCanvas.astro` — `current`·`detailViewState`로 선택 핀 갱신
- `ui/src/components/svelte/pois/PoiPin.svelte` — `current` 핀 채우기/아이콘에 카테고리 색

## 구현 단계

1. 마커 변환에서 하위 `iconKey`/`colorCode`/파일이 없으면 부모 카테고리 값을 쓴다.
2. `loadPoiDetail`이 상세를 열 때 시트를 mid로 맞춘다. `OtherFacilities` 퍼블에는 시트 API를 넣지 않는다.
3. `replaceFacilityPins`가 선택된 `poiId`/`facilityId`면 `makerPin(..., 'current')`, 아니면 `'category'`다.
4. `detailViewState === 'facilities'`일 때만 선택 값을 넘긴다. 아니면 0으로 풀어 작은 핀으로 돌린다.
5. `PoiPin` `current` 핀은 `--base-color` 대신 `--category-color`와 `{color}`를 쓴다.

## 테스트 유형

- poi-marker.util: 하위 카테고리 색·아이콘이 없으면 부모 값이 마커에 들어가는지
- 맵: 검색 후 핀 색이 목록과 같은지
- 맵: 핀/검색/기타 시설 선택 시 큰 핀 + 카테고리 색
- 맵: 상세 시트 이탈 시 작은 핀 복귀

## 검증 명령

```bash
npm test -- src/pois/poi-marker.util.spec.ts --runInBand
git diff -- ui/src/stores/sheetUiStore.ts
```

## 위험 요소

- `PoiPin.svelte`는 퍼블이다. `current` 핀 색만 카테고리 값으로 바인딩한다. 레이아웃·DOM은 유지한다.
- 시트 스냅은 `setPointSheetUi`로만 한다. 퍼블 Svelte에 `setSnapPoint`를 넣지 않는다.
- 마커를 다시 그리면 깜빡일 수 있다. 선택 상태는 `current`/`detailViewState` 구독으로만 갱신한다.

## 제외 범위

- 검색 시트 레이아웃 개편
- 핀 재생성 없이 라벨만 패치하는 최적화
- 대상지 `colorCode` CMS 값 변경
- Nest `GET /facilities/:id` 신규
