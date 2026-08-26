---
status: implemented
scope: backend
domain: onboarding
created: 2026-08-20
---

# 관광지 기초 설문 스킵·답변 제출 API

## 목표

- 익명 방문자가 관광지 기초 설문을 명시적으로 스킵하거나 답변을 제출하는 API를 제공한다.
- 클라이언트가 생성한 `submissionId`로 네트워크 재시도에 대한 멱등성을 보장한다.
- 제출, 선택지별 답변, 방문자별 최신 설문 상태를 하나의 Prisma 트랜잭션으로 저장한다.
- 질문과 선택지의 전체 번역 JSON을 제출 당시 snapshot으로 보존한다.
- 설문 조회 API와 제출 API가 동일한 대상지·질문·선택지 활성 조건을 사용하게 한다.

## 공개 API 계약

### 스킵

```http
POST /api/v1/tour-destinations/{destinationId}/onboarding/basic-survey/skip
```

```json
{
  "submissionId": "e29053d2-c7af-4eba-8765-b23d9d060072",
  "visitorId": "7074e8be-1c93-41c0-8e4f-a2569f780cbc",
  "languageCode": "ko"
}
```

- `OnboardingSurveySubmission`을 `SKIPPED`로 생성한다.
- 답변 row는 생성하지 않는다.
- `AnalyticsVisitorSurveyStatus`를 `SKIPPED`로 갱신한다.
- `skippedAt`을 기록하고 `submittedAt`은 `null`로 유지한다.

### 답변 제출

```http
POST /api/v1/tour-destinations/{destinationId}/onboarding/basic-survey/answers
```

```json
{
  "submissionId": "e29053d2-c7af-4eba-8765-b23d9d060072",
  "visitorId": "7074e8be-1c93-41c0-8e4f-a2569f780cbc",
  "languageCode": "en",
  "answers": [
    {
      "questionId": 101,
      "optionIds": [1001]
    },
    {
      "questionId": 102,
      "optionIds": [1005, 1006]
    }
  ]
}
```

- `OnboardingSurveySubmission`을 `SUBMITTED`로 생성한다.
- 선택지별 `VisitorOnboardingBasicSurveyAnswer` row를 생성한다.
- `AnalyticsVisitorSurveyStatus`를 `SUBMITTED`로 갱신한다.
- `submittedAt`을 기록하고 `skippedAt`은 `null`로 유지한다.

### 성공 응답

두 API는 멱등 재요청과 최초 요청에서 동일하게 `200 OK`를 반환한다. Controller는 도메인 데이터만 반환하고 전역 interceptor가 `{ success, data }` envelope를 적용한다.

```json
{
  "success": true,
  "data": {
    "submissionId": "e29053d2-c7af-4eba-8765-b23d9d060072",
    "visitorId": "7074e8be-1c93-41c0-8e4f-a2569f780cbc",
    "destinationId": 38,
    "languageCode": "en",
    "status": "SUBMITTED",
    "submittedAt": "2026-08-20T12:00:00.000Z",
    "skippedAt": null
  }
}
```

### 오류 계약

- 입력 DTO 형식 오류: `400 VALIDATION_ERROR`
- 질문·선택지·답변 규칙 위반: `400 BAD_REQUEST`
- 대상지 없음, 비공개, 삭제 또는 운영 기간 밖: `404 NOT_FOUND`
- 유효한 대상지에 활성 설문이 없음: `409 CONFLICT`
- 같은 `submissionId`를 다른 요청 내용에 사용: `409 CONFLICT`

## 변경 대상 파일

- `prisma/schema.prisma`
  - `db:pull`로 생성된 새 모델·enum·필드·관계의 Prisma 이름을 프로젝트 매핑 규칙에 맞게 정리한다.
  - 실제 PostgreSQL 이름과 제약 이름은 `@map`, `@@map`, `map:`으로 보존한다.
  - 이번 DDL과 무관하게 유입된 `FacilityPoiMapping.sorting_number`는 소유 변경 여부를 확인해 이번 브랜치에서 제외하거나 별도 커밋으로 분리한다.
- `src/tour-destinations/constants/tour-destination.constant.ts`
  - 제출 상태와 답변 개수 정책에 필요한 상수를 정의한다.
- `src/tour-destinations/helpers/basic-survey-query.helper.ts`
  - 조회·제출 API가 공유할 대상지, 질문, 선택지 활성 조건을 정의한다.
- `src/tour-destinations/dto/basic-survey-skip.dto.ts`
  - 스킵 요청의 `submissionId`, `visitorId`, `languageCode`를 검증한다.
- `src/tour-destinations/dto/basic-survey-submit.dto.ts`
  - 제출 요청과 질문별 선택지 배열을 검증한다.
- `src/tour-destinations/models/basic-survey-submission-response.dto.ts`
  - 스킵과 제출의 공통 응답 및 Swagger schema를 정의한다.
- `src/tour-destinations/tour-destination-basic-survey-submission.service.ts`
  - 멱등성, 도메인 검증, snapshot 구성, 트랜잭션 저장, 분석 상태 갱신을 담당한다.
- `src/tour-destinations/tour-destinations.service.ts`
  - 기존 private 활성 조건을 공통 helper로 교체해 조회 동작을 유지한다.
- `src/tour-destinations/tour-destinations.controller.ts`
  - 스킵·제출 operation과 DTO 경계를 추가한다.
- `src/tour-destinations/tour-destinations.module.ts`
  - 쓰기 전용 Service를 provider로 등록한다.
- `src/tour-destinations/tour-destinations.service.spec.ts`
  - 공통 조회 조건 추출에 대한 기존 조회 API 회귀를 검증한다.
- `src/tour-destinations/tour-destination-basic-survey-submission.service.spec.ts`
  - 스킵, 제출, 검증, 멱등성, 트랜잭션 orchestration을 검증한다.
- `src/tour-destinations/tour-destinations.controller.spec.ts`
  - Controller 위임과 HTTP 응답 계약을 검증한다.
- `test/app.e2e-spec.ts`
  - validation, envelope, 오류 계약, Swagger 문서를 검증한다.

## 구현 단계

1. Prisma 매핑을 정리한다.
   - `onboarding_survey_submissions`를 `OnboardingSurveySubmission`으로 변경하고 `@@map`을 유지한다.
   - `visitor_onboarding_basic_survey_answers`를 `VisitorOnboardingBasicSurveyAnswer`로 변경하고 `@@map`을 유지한다.
   - enum을 `AnalyticsVisitorSurveyStatusType`, `OnboardingSurveySubmissionStatus`로 변경하고 `@@map`을 유지한다.
   - snake_case scalar field는 camelCase와 `@map` 조합으로 변경한다.
   - relation field는 camelCase로 변경하며 `@map`을 사용하지 않는다.
   - `npm run db:validate`, `npm run db:generate`를 통과시킨다.
2. 공통 설문 조회 조건을 추출한다.
   - 공개·미삭제·운영 중 대상지 조건을 공유한다.
   - `DEPLOYING`, 배포 기간 내, `SINGLE | MULTI`, 활성 선택지 존재 조건을 공유한다.
   - 질문 최대 10개와 선택지 최대 8개를 조회·제출 모두 동일하게 적용한다.
3. DTO와 응답 계약을 구현한다.
   - `submissionId`, `visitorId`는 UUID v4로 검증한다.
   - `languageCode`는 `ko | en | ja | zh | th | vi`로 제한한다.
   - 질문은 1~~10개, 선택지는 1~~8개로 구조 검증한다.
   - 질문 유형별 선택 개수와 전체 질문 답변 여부는 Service에서 검증한다.
4. 스킵 흐름을 구현한다.
   - 기존 `submissionId`를 확인하고 같은 요청이면 기존 결과를 반환한다.
   - 방문자를 upsert하고 대상지와 활성 설문 존재를 검증한다.
   - `SKIPPED` 제출만 생성하고 답변은 생성하지 않는다.
   - 최신 분석 상태를 `SKIPPED`로 갱신한다.
5. 답변 제출 흐름을 구현한다.
   - 조회 화면에 노출되는 모든 질문에 정확히 한 번 답했는지 검증한다.
   - 질문과 선택지의 대상지·소속·공개·삭제·활성 상태를 검증한다.
   - `SINGLE`은 정확히 1개, `MULTI`는 2~8개 선택지를 허용한다.
   - 클라이언트 문구가 아닌 DB 질문·선택지의 전체 번역 JSON을 snapshot으로 저장한다.
   - 원본 JSON이 `null`이면 `{}`로 저장하고 요청당 최대 한 번 경고 로그를 남긴다.
6. 멱등성과 동시 요청을 처리한다.
   - 같은 `submissionId`와 같은 정규화 payload는 기존 결과를 반환한다.
   - 방문자, 대상지, 언어, 상태 또는 답변이 다르면 `409 CONFLICT`를 반환한다.
   - unique 충돌 시 기존 제출을 다시 읽어 동일성을 판정한다.
7. Swagger와 테스트를 추가한다.
   - `ApiOkEnvelope`와 공통 오류 문서를 적용한다.
   - `/docs/json`에 실제 DTO와 enum이 노출되는지 검증한다.
   - 기존 진입·온보딩·기초 설문 조회 API 회귀를 검증한다.

## 트랜잭션 및 상태 정책

- 제출 또는 스킵 시 `AnalyticsVisitor`를 먼저 upsert한다.
  - 최초 생성: `firstSeenAt`, `lastSeenAt`을 현재 시각으로 기록한다.
  - 기존 방문자: `lastSeenAt`을 갱신한다.
- 답변 제출은 하나의 interactive Prisma transaction에서 제출 row, 답변 rows, 분석 상태를 함께 저장한다.
- 스킵도 하나의 transaction에서 제출 row와 분석 상태를 함께 저장한다.
- `AnalyticsVisitorSurveyStatus`가 없으면 `firstSeenAt`을 최초 스킵 또는 제출 시각으로 생성한다.
- 상태 row가 없으면 아직 명시적인 스킵·제출 행동이 없는 것으로 간주한다.
- `NOT_SUBMITTED` 상태는 이번 기능에서 생성하지 않는다.
- 상태 갱신 시 기존 `firstSeenAt`을 보존하고 반대 상태의 시각 필드는 `null`로 초기화한다.
- 소프트 삭제된 상태 row는 동일 unique key 때문에 새 row를 만들지 않고 복구하여 갱신한다.

## 테스트 유형

### 단위 테스트

- Prisma 모델·field·relation·enum 매핑 검증
- 기존 기초 설문 조회 조건 회귀
- 정상 `SKIPPED`, `SUBMITTED` 저장
- 스킵 시 답변 row 미생성
- 질문 누락, 중복, 미등록 질문 거부
- 다른 질문에 속한 선택지 및 비활성 선택지 거부
- `SINGLE` 1개, `MULTI` 2~8개 규칙
- 질문·선택지 전체 번역 JSON snapshot
- 제출 언어 저장
- 방문자 upsert와 최신 분석 상태 갱신
- 동일 요청 재시도와 다른 payload 충돌
- transaction 중간 실패 시 전체 롤백

### E2E 테스트

- 스킵·제출 성공 envelope와 `200 OK`
- 잘못된 destination ID, UUID, 언어, 배열의 `400`
- 대상지 없음의 `404`
- 활성 설문 없음의 `409`
- `submissionId` 충돌의 `409`
- `/docs/json` operation과 구체적인 응답 schema
- 기존 조회 API 회귀

## 검증 명령

```bash
npm run db:validate
npm run db:generate
npm test -- tour-destinations --runInBand
npm run test:e2e
npm run check
git diff --check
```

## 위험 요소

- 현재 `db:pull` 결과는 mapping guard를 통과하지 않으므로 코드 구현보다 Prisma 이름 정리가 선행되어야 한다.
- `AnalyticsVisitorSurveyStatus`의 `(visitorId, tourDestinationId)` unique 관계는 nullable 대상지인 기존 row와 신규 대상지별 상태가 함께 존재할 수 있다. 신규 API는 항상 대상지 ID를 기록한다.
- `submissionId` 확인과 생성 사이의 동시 요청은 DB unique 제약 오류가 발생할 수 있으므로 오류 후 재조회 경로가 필요하다.
- 기존 설문 조회 조건과 제출 검증 조건이 달라지면 화면에 보인 답변을 제출할 수 없는 문제가 발생하므로 공통 helper와 회귀 테스트가 필요하다.
- 익명 방문자가 생성한 row의 `createdBy`는 DB 기본값 `0`을 사용하며 방문자 UUID는 `visitorId`로만 관리한다.

## 제외 범위

- 설문 노출 `/view` API
- 아무 행동 없이 이탈한 방문자 상태 저장
- `NOT_SUBMITTED` 상태 생성과 이탈률 분석
- 이벤트 로그의 `surveyId`, `answerId` 적재
- AI 추천 결과 생성
- 프론트 localStorage 구현
- 기존 `user_onboarding_basic_survey_answers` rename, 삭제 또는 데이터 이관
- `FacilityPoiMapping.sorting_number`를 사용하는 기능 구현
