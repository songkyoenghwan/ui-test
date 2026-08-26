---
status: implemented
scope: backend
domain: poi
created: 2026-08-20
---

# 지도 대상지 POI 마커 조회 API

## 목표

- 대상지에 매핑된 공개 POI 마커를 한 번에 조회합니다. 뷰포트 좌표 필터는 이후에 추가합니다.
- 카테고리 필터를 통과한 시설 중 대표 시설을 골라 마커 아이콘·색상과 혼잡도 말풍선에 필요한 값을 한 응답으로 제공합니다.
- 대상지 커스텀 정렬이 켜지면 CMS 매핑 순, 꺼지면 접속 시점 운영 상태 순으로 대표 시설을 고릅니다.

## 공개 API

```http
GET /api/v1/pois/markers?tourDestinationId=1&language=ko&categoryIds=3&categoryIds=7
```

- 기존 `GET /api/v1/pois` 페이지 목록은 유지합니다.
- 페이지네이션 없이 `{ items }`를 반환하고 상한은 500입니다.
- 매칭 시설이 없는 POI는 제외하고, 빈 결과는 200 `{ items: [] }`입니다.

## 변경 대상 파일

- `prisma/schema.prisma`
  - `facility_poi_mapping.sorting_number`를 `sortingNumber`로 매핑합니다.
- `src/pois/dto/poi-viewport-query.dto.ts`
  - 대상지와 카테고리 필터 입력을 검증합니다.
- `src/pois/models/poi-viewport-item-response.dto.ts`
- `src/pois/models/poi-viewport-list-response.dto.ts`
  - 마커 응답 계약을 정의합니다.
- `src/pois/constants/poi.constant.ts`
- `src/pois/facility-operating-status.util.ts`
- `src/pois/poi-congestion.util.ts`
- `src/pois/poi-marker.util.ts`
  - 운영 상태, 대표 시설 선정, overwrite/센서 혼잡도를 구현합니다.
- `src/pois/pois.controller.ts`
- `src/pois/pois.service.ts`
- `test/app.e2e-spec.ts`

## 구현 단계

1. `feature/map-pois`에서 매핑 정렬 컬럼을 Prisma에 반영합니다.
2. 대상지 쿼리 DTO와 마커 응답 DTO를 정의합니다.
3. 접속 시점 운영 상태 7단계를 순수 함수로 판정합니다.
4. 커스텀 정렬/운영 상태 순으로 대표 시설을 고르고 아이콘·혼잡도를 조립합니다.
5. 혼잡도는 구간 overwrite가 있으면 그 값, 없으면 최신 센서 인원과 threshold 비율로 분류합니다.
6. `GET /pois/markers`를 기존 목록 API와 분리해 연결합니다.

## 테스트 유형

- 단위 테스트
  - 운영 상태 7단계, 커스텀/상태 정렬, overwrite/threshold 혼잡도, 시설 없는 POI 제외
- E2E 테스트
  - 성공 envelope, 입력 검증 400, OpenAPI `/api/v1/pois/markers`

## 검증 명령

```bash
npm run db:validate
npm test -- pois --runInBand
npm run test:e2e -- --runInBand
npm run check
git diff --check
```

## 위험 요소

- 휴무 스케줄 인코딩이 CMS와 다르면 운영 상태 순위가 어긋날 수 있습니다.
- 혼잡도는 overwrite가 있으면 그 값, 없으면 `countedPeople / threshold`(0–40/40–60/60–70/70+)로 분류합니다. 측정 없음은 CMS와 같이 `none`입니다.

## 제외 범위

- 기존 `GET /pois` 페이지 목록 계약 변경
- 마커 응답에 운영 상태 필드 노출
- POI/시설 상세, 태그 필터, 구간 혼잡 폴리곤
- `prisma migrate` / `db push`
