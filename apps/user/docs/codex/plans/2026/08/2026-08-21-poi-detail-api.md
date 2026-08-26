---
status: implemented
scope: backend
domain: pois
ticket: USE-9
created: 2026-08-21
---

# POI 상세조회 API (USE-9)

## 목표

- `GET /api/v1/pois/:id`로 공개 POI 단건과 매핑된 시설 상세를 한 번에 반환한다.
- 방문객 맵 시트(`ui` Facility sheet)가 `GET /facilities/:id` N번으로 읽던 필드를 임베드한다.
- VPS·혼잡은 응답 키를 항상 두고, 대상지 기능 ON ∧ 시설 활성화일 때만 채운다.

## 공개 API

```http
GET /api/v1/pois/:id
```

- 인증 없음
- POI가 없거나 비공개/삭제면 `NOT_FOUND`
- 성공은 `{ success, data }` envelope

## POI 응답

- `id`, `tourDestinationId`, `name`, `latitude`, `longitude`
- `address`, `addressDetail` (Json)
- `managementCode`
- `facilityPoiMappings[]` — 공개 매핑만, `sortingNumber ASC NULLS LAST`, `id ASC`

## 매핑·시설 필드

매핑: `id`, `facilityId`, `sortingNumber`, `facility`

시설(시트 기준):

- 기본: `id`, `name`, `description`, `contact`, `startAt`, `endAt`
- `category`: `id`, `name`, `iconKey`, `categoryColorCodes`, `parent`
- `facilityFiles`, `facilityOperatingSchedules`(+ break), `facilityHolidaySchedules`
- `facilityButtons`, `facilityProductGuideFiles`, `facilityProducts`(+ files)
- 게이트 키: `facilityVpsPopups`, `congestionStatus`, `isUsingCongestion`, `hasVpsPopup`

## VPS·혼잡 게이트

| 기능 | 대상지                   | 시설                          | ON                      | OFF      |
| ---- | ------------------------ | ----------------------------- | ----------------------- | -------- |
| 혼잡 | `isFacilityCongestionYn` | `congestionSectionId != null` | `congestionStatus` 계산 | `"none"` |
| VPS  | `isVpsContentsYn`        | 공개 VPS 팝업 존재            | `facilityVpsPopups[]`   | `[]`     |

혼잡 계산: 공개 섹션 → overwrite → countedPeople/threshold → 없으면 `none`.

## 제외

- `facilityVpsPopups`/`congestionStatus` 키 자체는 제외하지 않음
- 관리용 `congestionSections` raw, `isOperationInfoSynced`, `linkButton`
- 구역 혼잡(`isSectionCongestionYn`)
- UI 와이어링 변경, `GET /facilities/:id` Nest, 마커 API

## 스키마

- `FacilityPoiMapping.sortingNumber` (`sorting_number`) — `db:pull` 반영

## 검증

```bash
npm test -- pois --runInBand
npm run test:e2e -- --runInBand
npm run check
```
