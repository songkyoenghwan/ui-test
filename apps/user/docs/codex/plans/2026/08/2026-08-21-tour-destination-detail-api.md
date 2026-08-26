# 대상지 상세(메타) API + UI 초기 분기

## Goal

맵 첫 진입 시 `GET /api/v1/tour-destinations/:destinationId`로 대상지 스칼라 메타를 1회 조회·보관하고, 중심좌표·가이드 색·AI 바텀시트·혼잡 우하단 버튼을 초기 적용한다.

## Contract

```http
GET /api/v1/tour-destinations/1
```

- 공개 + 활성 대상지 (`isVisible`, `!isDeleted`, `isAlways` 또는 운영 기간)
- 없으면 `NOT_FOUND`
- Nest 캐시 없음 (요청마다 DB)

응답: `id`, `name`, `latitude`, `longitude`, `colorCode`, `startAt`, `endAt`, `isAlways`, `homepageUrl`, `mapUrl`, `fileUrl`, `supportedLanguages`, `isAiRecommendYn`, `isFacilityCongestionYn`, `isSectionCongestionYn`, `isFacilityAddressYn`, `isCustomSortingYn`, `isVpsContentsYn`

## UI

- 진입 1회 fetch → `destinationDetail` (`pageDataStore.ts`)
- 중심 → 맵 기본 좌표 (`MapCanvas.astro`)
- `colorCode` → `--base-color`
- `isAiRecommendYn` → `detailViewState` ai / default (`MapCanvas.astro`)
- POI → `GET /api/v1/pois` 후 레거시 `facilityPoiMappings` 어댑트
- 혼잡 → Sheet가 `ControlGroup`에 `showConfusion` prop 전달

### Svelte (필요 시만, prop으로)

| 파일                  | 변경                                                    |
| --------------------- | ------------------------------------------------------- |
| `ControlGroup.svelte` | `showConfusion?: boolean` — true일 때만 `<Confusion />` |
| `Sheet.svelte`        | `showConfusion` 전달 + ControlGroup 조건에 `'default'`  |

```svelte
<ControlGroup
  showConfusion={Boolean(
    $destinationDetail?.isFacilityCongestionYn || $destinationDetail?.isSectionCongestionYn,
  )}
/>
```

## Verification

- unit / e2e / OpenAPI
- 맵 진입 시 중심·색·시트·혼잡 버튼 분기 확인
