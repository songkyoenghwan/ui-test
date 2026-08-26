---
status: implemented
scope: fullstack
domain: search
created: 2026-08-23
---

# 검색 1회로 시설 목록 + 맵 POI 갱신

## 목표

- 첫 진입 맵 핀은 `GET /api/v1/pois`(keyword 없음)를 유지한다.
- 검색 Enter와 카테고리 칩은 `GET /api/v1/search` **한 번**으로 시설 목록과 매칭 POI 마커를 같이 받는다.
- 이 플로우에서 `/pois?keyword=`는 호출하지 않는다.
- 빈 검색어(검색 뒤로가기 포함)는 검색 결과를 비우고 `poiListAll`로 핀을 복원한다.

```text
맵 첫 진입 → GET /pois → poiListAll + 전체 핀
Enter/카테고리 → GET /search → items(시트) + pois(맵 핀)
검색어 비움 → poiList = poiListAll
```

## 변경 대상 파일

- `src/search/dto/search-response.dto.ts` — `items` + `pois`
- `src/search/search.service.ts` — 매칭 시설 ID로 `PoisService.findManyByFacilityIds`
- `src/search/search.service.spec.ts`
- `ui/src/types/search.ts` — `pois: PoiMarkerResponse[]`, `poiId`
- `ui/src/stores/pageDataStore.ts` — `poiListAll`, `publishPoiList`, `loadKeywordSearch`
- `ui/src/pages/map/MapCanvas.astro` — `poiList` 구독 + `visit:poi-list`로 핀 교체
- `ui/src/components/svelte/map/SearchBar.svelte` — Enter 검색, 뒤로가기 시 빈 키워드 복원
- `ui/src/components/svelte/map/Category.svelte` — 칩 클릭이 Enter와 같은 `loadKeywordSearch`

## 구현 단계

1. 시설 검색 조건은 유지하고, 매칭 시설의 POI 마커만 `pois`에 넣는다.
2. 대표 시설은 검색된 시설 중에서 고른다. 시설 0건이면 `items: []`, `pois: []`.
3. 하위 카테고리에 색/아이콘이 없으면 부모 카테고리 값을 쓴다.
4. UI는 `/search`만 호출하고 `items`는 시트, `pois`는 `toLegacyPoiListItem` → `poiList`로 넣는다.
5. Astro 스크립트와 Svelte 스토어가 같은 `poiList`를 보도록 `globalThis` 싱글톤과 `visit:poi-list`를 쓴다.

## 테스트 유형

- SearchService: 매칭 시설 POI만 `pois`에 들어가는지, 0건이면 빈 배열인지
- pageDataStore: 검색 시 `/pois` 미호출, `poiList`가 `pois`로 바뀌는지, 빈 검색어 스냅샷 복원

## 검증 명령

```bash
npm test -- src/search/search.service.spec.ts
cd ui && bun test src/stores/pageDataStore.test.ts
git diff -- ui/src/stores/sheetUiStore.ts
```

## 위험 요소

- Astro inline script와 Svelte island이 모듈 인스턴스를 따로 가지면 핀이 안 바뀐다. `poiList`는 `globalThis`로 공유한다.
- 공개 POI가 1개인 대상지에서는 검색 후 핀 개수가 같아 보일 수 있다.

## 제외 범위

- `GET /pois` 제거 또는 검색으로 대체
- 검색 Enter 때 `/pois?keyword=` 병행 호출
- 최근 검색 이력 저장 (별도 draft: [2026-08-21-recent-search-history.md](./2026-08-21-recent-search-history.md))
