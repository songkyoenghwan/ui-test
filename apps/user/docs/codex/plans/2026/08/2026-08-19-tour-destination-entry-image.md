---
status: implemented
scope: backend
domain: tour-destination
created: 2026-08-19
---

# 광집사 진입 대상지 대표이미지·정렬 반영

## 목표

- `tour_destinations` 테이블에 추가된 파일·정렬 컬럼을 front Prisma 스키마에 반영합니다.
- 광집사 진입 API의 `thumbnailUrl`을 관광지별 `fileUrl`에서 조회합니다.
- 기존 데이터의 `fileUrl`이 `null`인 경우에는 API 계약을 유지하기 위해 기존 placeholder URL을 fallback으로 사용합니다.
- 대상지를 `sortingNumber ASC NULLS LAST`, `id ASC`로 안정적으로 정렬합니다.

## 변경 대상 파일

- `prisma/schema.prisma`
  - DB introspection으로 확인한 대상지 파일 컬럼 6개와 정렬 컬럼을 camelCase + `@map` 규칙으로 반영합니다.
- `src/tour-destinations/tour-destinations.service.ts`
  - `fileUrl`을 `thumbnailUrl`에 우선 적용하고 `sortingNumber`로 정렬합니다.
- `src/tour-destinations/tour-destinations.service.spec.ts`
  - DB 이미지 URL 우선 적용, `null` fallback, 정렬 조건을 검증합니다.
- `test/app.e2e-spec.ts`
  - 실제 API 응답에 대상지별 이미지 URL이 반영되는지 검증합니다.

## 구현 단계

1. 승인된 PostgreSQL DB에서 `npm run db:pull`을 실행합니다.
2. 기능과 무관한 introspection diff를 제외하고 `TourDestination` 파일·정렬 컬럼만 반영합니다.
3. Prisma 필드명을 프로젝트 규칙에 맞게 camelCase로 유지하고 실제 DB 컬럼을 `@map`으로 연결합니다.
4. 진입 목록 조회에 `fileUrl`을 추가하고 `thumbnailUrl`로 변환합니다.
5. 목록을 `sortingNumber` 오름차순, null 마지막, `id` 오름차순으로 정렬합니다.
6. 서비스 단위 테스트와 E2E 기대값을 보완합니다.
7. Prisma 검증·생성과 프로젝트 전체 검증을 실행합니다.

## 테스트 유형

- Prisma 스키마 validation과 client generation
- `fileUrl`이 있을 때 해당 URL을 사용하는 서비스 단위 테스트
- `fileUrl`이 `null`일 때 placeholder를 사용하는 서비스 단위 테스트
- `sortingNumber ASC NULLS LAST`, `id ASC` Prisma 정렬 조건 단위 테스트
- API 성공 envelope의 `thumbnailUrl` E2E 테스트

## 검증 명령

```bash
npm run db:validate
npm run db:generate
npm test -- tour-destinations --runInBand
npm run check
git diff --check
```

## 구현 결과

- DB introspection으로 확인한 `file_original_name`, `file_upload_name`, `file_upload_path`, `file_size`, `file_mime_type`, `file_url`, `sorting_number`를 Prisma에 반영했습니다.
- 진입 API는 관광지의 `fileUrl`을 `thumbnailUrl`로 우선 응답하고, 값이 `null`이면 기존 placeholder를 사용합니다.
- 대상지는 `sortingNumber ASC NULLS LAST`, 동일 정렬값에서 `id ASC`로 조회합니다.
- `npm run db:validate`, Prisma Client 생성, 단위 테스트, 린트, 빌드, E2E를 포함한 `npm run check`, `git diff --check`가 통과했습니다.

## 위험 요소

- 실제 DB의 파일 컬럼은 nullable이므로 기존 관광지 데이터에 대표이미지가 없을 수 있습니다.
- `file_url`이 외부에서 접근 가능한 완전한 URL인지 CMS 파일 저장 규칙과 실제 데이터 확인이 필요합니다.
- `db:pull`에서 이 기능과 무관한 `congestion_analysis_log` 변경도 탐지되었으나 이번 diff에서는 제외합니다.
- `sorting_number`가 `null`인 기존 데이터는 정렬값이 있는 대상지 뒤에 `id ASC`로 노출됩니다.

## 제외 범위

- 실제 DB 컬럼 생성·수정·삭제
- CMS 파일 업로드 구현
- 기능과 무관한 DB 스키마 drift 반영
