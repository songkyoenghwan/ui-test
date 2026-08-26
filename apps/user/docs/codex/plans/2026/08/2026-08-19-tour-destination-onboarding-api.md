---
status: implemented
scope: backend
domain: onboarding
created: 2026-08-19
---

# 온보딩 조회 API 구현

## 목표

- 공개·운영 중인 대상지의 배포 중 온보딩을 CMS 순서대로 최대 10개 제공합니다.
- 요청 언어에 맞는 제목·설명과 기초 설문 존재 여부, 언어별 메인·서브 이미지를 반환합니다.
- 상대 파일 경로를 공개 S3 base URL과 결합해 클라이언트가 사용할 수 있는 URL로 정규화합니다.

## 변경 대상 파일

- `src/tour-destinations`
  - 기존 Controller와 Service에 온보딩 조회 operation, 요청·응답 DTO, 이미지 선택 정책을 추가합니다.
- `src/config`
  - `AWS_S3_PUBLIC_BASE_URL`을 애플리케이션 설정과 환경 검증에 등록합니다.
- `prisma/schema.prisma`
  - `onboarding_files.file_type`을 `OnboardingFileType` enum으로 매핑합니다.
  - DB enum 타입 `onboarding_file_type`과 Prisma enum의 매핑을 `@@map`으로 명시합니다.
- `test/app.e2e-spec.ts`
  - 성공·검증 오류·대상지 없음·OpenAPI 계약을 검증합니다.

## 구현 단계

1. `GET /api/v1/tour-destinations/:destinationId/onboardings` 계약과 DTO를 정의합니다.
2. 대상지, 온보딩, 기초 설문, 파일을 한 번의 Prisma 조회로 가져옵니다.
3. 다국어 fallback, 유형별 최신 파일 선택, public URL 정규화를 적용합니다.
4. 실제 DB의 `onboarding_files.file_type`을 `onboarding_file_type` enum으로 변경합니다.
5. `npm run db:pull` 결과에서 기능과 무관한 schema drift를 제외하고 온보딩 파일 enum 매핑만 반영합니다.
6. Service·Controller 단위 테스트와 E2E·OpenAPI 검증을 추가합니다.
7. 전체 프로젝트 검증을 통과한 뒤 문서 상태를 `implemented`로 변경합니다.

## 테스트 유형

- Prisma 조회 조건과 응답 변환 Service 단위 테스트
- Controller 위임 단위 테스트
- 성공 envelope, 400, 404, 빈 목록 및 OpenAPI E2E 테스트
- 기존 진입 목록 API 회귀 테스트

## 검증 명령

```bash
npm test -- tour-destinations --runInBand
npm run db:validate
npm run db:generate
npm run test:e2e
npm run check
git diff --check
```

## 위험 요소

- 배포 환경에 `AWS_S3_PUBLIC_BASE_URL`이 없으면 애플리케이션 시작이 실패합니다.
- 동일 파일 유형이 여러 건이면 공개·미삭제·비어 있지 않은 URL 중 가장 큰 ID를 대표 파일로 사용합니다.
- 온보딩 파일 URL의 절대·상대 경로가 혼재하므로 URL 결합 시 슬래시를 정규화해야 합니다.
- DB-first 규칙에 따라 enum 변경은 실제 DB를 먼저 변경한 후 `db:pull`로 Prisma에 반영해야 합니다.
- `db:pull`에서 발견된 `congestion_analysis_log` 등 기능과 무관한 schema drift는 이번 변경에서 제외합니다.

## 제외 범위

- CMS 파일 업로드와 동일 유형 다중 이미지 응답
- 프론트 화면, 설문 응답 저장, 이벤트 로그
- 기존 진입 API `thumbnailUrl`의 URL 정규화

## 구현 결과

- 온보딩 조회 API, 요청·응답 DTO, 다국어 fallback 및 이미지 선택·URL 정규화를 구현했습니다.
- 대상지·온보딩·기초 설문·파일을 단일 Prisma 조회로 가져오도록 구성했습니다.
- 실제 DB의 `onboarding_files.file_type`을 `MAIN`, `MAIN_GLOBAL`, `THUMBNAIL`, `THUMBNAIL_GLOBAL` enum 값으로 관리하도록 변경했습니다.
- `prisma/schema.prisma`에 `OnboardingFileType`과 `@@map("onboarding_file_type")`을 반영하고, 무관한 introspection 변경은 제외했습니다.
- 환경변수 검증, Service·Controller 단위 테스트, E2E 및 OpenAPI 회귀 테스트를 추가했습니다.
- `npm run db:validate`, `npm run db:generate`, 대상 도메인 테스트 17개와 `git diff --check`를 통과했습니다.
- 기존 온보딩 API 구현 시점에 `npm run check`도 통과했습니다.
