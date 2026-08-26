---
status: implemented
scope: backend
domain: categories
created: 2026-08-19
---

# 대상지별 카테고리 목록 API

## 목표

- 비로그인 사용자가 선택한 관광지의 공개 카테고리를 조회할 수 있는 목록 API를 제공합니다.
- 카테고리 이름, 계층, 정렬, 아이콘, 기능 플래그, 색상과 시설 수를 한 번의 배열 응답으로 제공합니다.
- 기존 `Category`, `CategoryColorCode`, `Facility` 관계를 사용하며 Prisma 스키마는 변경하지 않습니다.

## 공개 API

```http
GET /api/v1/categories?tourDestinationId=1
```

- `tourDestinationId`: 1 이상의 필수 정수
- 인증 없이 호출 가능한 공개 API로 구성합니다.
- 결과가 없으면 404가 아닌 빈 배열을 200으로 반환합니다.
- 성공 응답은 전역 interceptor가 `{ success, data }` 형식으로 감쌉니다.

## 응답 필드

- `id`: 카테고리 ID
- `parentId`: 상위 카테고리 ID
- `sortingNumber`: 정렬 번호
- `name`: 다국어 이름 JSON
- `iconKey`: UI 아이콘 식별자
- `isEventCategory`: 이벤트 카테고리 여부
- `isAiRecommendationEnabled`: AI 추천 사용 여부
- `isNavigationProvided`: 길안내 제공 여부
- `categoryColorCodes`: 연결된 색상의 `id`, `paletteNumber`, `sortingNumber`, `colorCode`
- `_count.facilities`: 연결된 시설 수

## 변경 대상 파일

- `src/common/decorators/api-response.decorator.ts`
  - 공통 success envelope의 `data`가 배열인 OpenAPI 응답 decorator를 제공합니다.
- `src/app.module.ts`
  - `CategoriesModule`을 애플리케이션에 연결합니다.
- `src/categories/categories.module.ts`
  - 카테고리 도메인과 `PrismaModule` 의존성을 정의합니다.
- `src/categories/categories.controller.ts`
  - 대상지별 카테고리 목록 라우트와 OpenAPI 계약을 정의합니다.
- `src/categories/categories.service.ts`
  - 공개 필터, 관계 조회와 정렬을 구현합니다.
- `src/categories/dto/find-many-categories-query.dto.ts`
  - 대상지 ID 입력 계약을 정의합니다.
- `src/categories/dto/category-response.dto.ts`
  - 공개 카테고리 응답 모델을 정의합니다.
- `src/categories/categories.controller.spec.ts`
- `src/categories/categories.service.spec.ts`
  - 컨트롤러 위임과 Prisma 조회·응답 변환 규칙을 검증합니다.
- `test/app.e2e-spec.ts`
  - 실제 라우트, validation, 배열 응답 envelope와 OpenAPI 경로를 검증합니다.

## 구현 단계

1. Nest CLI로 `categories` module, controller, service와 단위 테스트를 생성합니다.
2. 도메인 모듈에 `PrismaModule`을 추가하고 루트 `AppModule`에 연결합니다.
3. 1 이상의 `tourDestinationId`를 검증하는 대상지별 조회 DTO를 정의합니다.
4. 구체적인 카테고리·색상·시설 수 응답 DTO와 Swagger 배열 envelope를 정의합니다.
5. `tourDestinationId`, `isVisible = true`, `isDeleted = false` 조건으로 목록을 조회합니다.
6. `sortingNumber ASC NULLS LAST`, `id ASC`로 결과를 안정적으로 정렬합니다.
7. 색상 코드와 시설 수를 관계 select와 `_count`로 함께 조회하여 N+1 쿼리를 방지합니다.
8. nullable 필드는 변환하지 않고 DB 값을 그대로 반환합니다.
9. 단위 테스트와 E2E/OpenAPI 배열 계약 검증을 실행합니다.

## 검증 명령

```bash
npm run lint:fix
npm run format
npm test -- categories --runInBand
npm run test:e2e -- --runInBand
npm run check
git diff --check
```

## 구현 결과

- `GET /api/v1/categories`에서 대상지별 공개·미삭제 카테고리를 배열로 반환합니다.
- 색상 상세와 시설 수를 각각 관계 select와 `_count`로 함께 조회합니다.
- 카테고리 단위 테스트 5개와 공통 E2E 테스트 12개가 통과했습니다.
- 린트, Prettier 검사, Prisma mapping 검사와 client 생성, Nest 빌드를 포함한 `npm run check`가 통과했습니다.
- Prisma 스키마, 실제 DB, migration과 UI 코드는 변경하지 않았습니다.

## 위험 요소

- 카테고리 이름은 다국어 JSON 원본을 반환하므로 클라이언트가 언어를 선택해야 합니다.
- 연결된 색상 코드가 없으면 `categoryColorCodes`는 `null`을 반환합니다.
- `_count.facilities`는 연결된 전체 시설 수이며 시설의 공개·삭제 상태로 추가 필터링하지 않습니다.

## 제외 범위

- 카테고리 생성·수정·삭제 API
- 카테고리 트리 재구성
- 언어별 이름 문자열 변환
- Prisma 스키마와 실제 DB 변경
- UI 컴포넌트와 사용자 인터랙션 변경
