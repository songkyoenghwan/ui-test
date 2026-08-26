---
status: implemented
scope: backend
domain: tour-destination
created: 2026-08-18
---

# 광집사 진입 창구 API

## 목표

- 비로그인 사용자가 광집사 지도 서비스에 진입하기 전 관광지를 선택할 수 있도록 목록 API를 제공합니다.
- 관광지별 지원 언어와 사용자 언어에 맞는 이름, 온보딩·기초 설문 존재 여부를 한 번의 응답으로 제공합니다.
- DB 스키마를 변경하지 않고 기존 관광지, 온보딩, 기초 설문 모델을 조회합니다.

## 공개 API

```http
GET /api/v1/tour-destinations/entry?page=1&pageSize=10&language=ko
```

- `language`: `ko | en | ja | zh | th | vi`, 기본값 `ko`
- 프로젝트 공통 `PaginationQueryDto`를 적용합니다.
- 응답은 전역 interceptor가 `{ success, data }` 형식으로 감쌉니다.
- 요청 언어의 이름이 없으면 `ko`, 지원 언어 고정 순서의 첫 번째 비어 있지 않은 번역, 빈 문자열 순으로 fallback합니다.
- 결과가 없으면 404가 아닌 0건의 빈 페이지를 200으로 반환합니다.

## 변경 대상 파일

- `src/app.module.ts`
  - `TourDestinationsModule`을 애플리케이션에 연결합니다.
- `src/tour-destinations/tour-destinations.module.ts`
  - 관광지 도메인 모듈과 `PrismaModule` 의존성을 정의합니다.
- `src/tour-destinations/tour-destinations.controller.ts`
  - 진입 목록 라우트와 Swagger 문서를 정의합니다.
- `src/tour-destinations/tour-destinations.service.ts`
  - 관광지 필터, 관계 존재 여부, 언어 fallback, 페이지네이션을 구현합니다.
- `src/tour-destinations/constants/tour-destination.constant.ts`
  - 지원 언어, 활성 배포 상태, 임시 썸네일 상수를 정의합니다.
- `src/tour-destinations/dto/tour-destination-entry-query.dto.ts`
  - 언어와 페이지네이션 입력 계약을 정의합니다.
- `src/tour-destinations/models/tour-destination-entry-response.dto.ts`
  - Swagger에 노출할 목록 항목 응답 계약을 정의합니다.
- `src/tour-destinations/tour-destinations.controller.spec.ts`
- `src/tour-destinations/tour-destinations.service.spec.ts`
  - 컨트롤러 위임과 서비스 조회·변환 규칙을 검증합니다.
- `test/app.e2e-spec.ts`
  - 실제 라우트, 응답 envelope, 입력 검증, OpenAPI 문서를 검증합니다.

## 구현 단계

1. `develop`에서 `feature/tour-destination-entry-api` 브랜치를 생성합니다.
2. `/nest-domain-scaffold tour-destinations` 규칙에 따라 module, controller, service, 단위 테스트를 생성합니다.
3. `GET /tour-destinations/entry` 쿼리·응답 DTO와 Swagger 계약을 정의합니다.
4. `isVisible = true`, `isDeleted = false`이며 `isAlways = true` 또는 운영 기간 내인 관광지만 조회합니다.
5. 동일한 필터의 `findMany`와 `count`를 read transaction으로 실행하고 `id ASC`로 정렬합니다.
6. 관계를 각각 `take: 1`로 조회하여 N+1 쿼리 없이 존재 여부를 계산합니다.
   - 온보딩: 공개·미삭제, `DEPLOYING`
   - 기초 설문: 공개·미삭제, `DEPLOYING`, 배포 기간 내, 활성 선택지 존재
7. 관광지 이름 fallback과 `supportedLanguages` JSON 변환을 적용합니다.
8. DB 이미지 필드 대신 `DEFAULT_ENTRY_THUMBNAIL_URL`을 응답하고 후속 교체 TODO를 남깁니다.
9. 단위 테스트와 E2E, 프로젝트 전체 검증을 실행합니다.

## 테스트 유형

- 단위 테스트
  - 관광지 공개·삭제·운영 기간 필터와 `isAlways` 조건
  - `id ASC`, 페이지네이션, `findMany`/`count` 동일 필터
  - `DEPLOYING` 온보딩·기초 설문과 활성 선택지 조건
  - 언어 선택·fallback, 지원 언어 변환, 고정 썸네일
  - 빈 목록 페이지
- E2E 테스트
  - 성공 envelope와 응답 형식
  - 잘못된 pagination/language의 400 응답
  - `/docs/json` API 경로와 응답 DTO

## 검증 명령

```bash
npm test -- tour-destinations --runInBand
npm run test:e2e -- --runInBand
npm run check
git diff --check
```

## 구현 결과

- 단위 테스트 12개와 E2E 테스트 8개가 통과했습니다.
- 린트, Prettier 검사, Prisma Client 생성, Nest 빌드가 통과했습니다.
- Prisma 스키마, 생성 클라이언트, migration은 변경하지 않았습니다.

## 위험 요소

- `DEPLOYING`을 사용자에게 노출 가능한 활성 상태로 간주했습니다. CMS 정책이 바뀌면 조회 조건을 수정해야 합니다.
- `id ASC` 정렬은 CMS 정렬 필드가 확정되기 전까지의 임시 정책입니다.
- 썸네일은 외부 placeholder URL로 고정되어 있으며, 이미지 정책 확정 후 CMS 데이터로 교체해야 합니다.
- 기초 설문은 `deployedAt <= now <= deploymentEndedAt`을 모두 충족할 때만 있는 것으로 판정합니다. 배포 종료일이 없는 무기한 배포를 허용하려면 정책 변경이 필요합니다.
- `name`/`supportedLanguages` JSON 데이터가 기대한 객체 형식이 아니면 빈 이름 또는 빈 지원 언어 목록을 반환합니다.

## 제외 범위

- 관광지 정렬 필드 및 CMS 정렬 기능
- 관광지별 썸네일 DB 컬럼·파일 관계·CMS 입력 기능
- 온보딩 상세 조회
- 기초 설문 응답 저장
- 지도, POI, 이벤트 로그 기능
- Prisma 스키마, 실제 DB, migration 변경
