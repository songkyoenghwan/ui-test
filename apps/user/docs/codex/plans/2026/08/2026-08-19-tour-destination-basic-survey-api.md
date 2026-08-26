---
status: implemented
scope: backend
domain: onboarding
created: 2026-08-19
---

# 관광지 기초 설문 조회 API

## 목표

- 공개·운영 중인 대상지의 배포 중 기초 설문 질문과 활성 선택지를 조회하는 API를 제공한다.
- 질문별 AI 추천 여부와 다국어 문구를 프론트 화면 계약에 맞게 반환한다.
- 진입·온보딩·기초 설문 API가 동일한 설문 활성 조건을 사용하도록 공통화한다.

## 변경 대상 파일

- `src/tour-destinations/constants/tour-destination.constant.ts`
  - 설문 유형과 질문·선택지 최대 개수를 정의한다.
- `src/tour-destinations/models/tour-destination-basic-survey-response.dto.ts`
  - 기초 설문 조회 응답과 Swagger 스키마를 정의한다.
- `src/tour-destinations/tour-destinations.controller.ts`
  - 기초 설문 조회 operation과 API 문서를 추가한다.
- `src/tour-destinations/tour-destinations.service.ts`
  - 대상지·질문·선택지 조회, 다국어 변환, 공통 활성 조건을 구현한다.
- `src/tour-destinations/*.spec.ts`, `test/app.e2e-spec.ts`
  - 서비스·Controller·HTTP·OpenAPI 계약을 검증한다.

## 구현 단계

1. `GET /api/v1/tour-destinations/{destinationId}/onboarding/basic-survey` 계약과 응답 DTO를 추가한다.
2. `SINGLE`, `MULTI` 질문 유형과 질문 10개·선택지 8개 제한을 상수로 정의한다.
3. 서비스 내부에 활성 질문·선택지 Prisma 조건 helper를 만들고 기존 두 API에도 적용한다.
4. 대상지와 설문을 한 번의 Prisma 조회로 가져와 정렬·제한·다국어·AI 추천 값을 응답으로 변환한다.
5. 비정상 문구는 빈 문자열로 유지하고 식별자만 경고 로그에 기록한다.
6. 단위 테스트와 E2E/OpenAPI 계약 테스트를 추가한다.

## 테스트 유형

- 서비스 및 Controller 단위 테스트
- HTTP validation·success envelope·공통 오류 E2E 테스트
- OpenAPI 경로 및 응답 DTO 스키마 테스트
- 기존 관광지 진입·온보딩 API 회귀 테스트

## 검증 명령

```bash
npm test -- tour-destinations --runInBand
npm run test:e2e
npm run check
git diff --check
```

## 위험 요소

- DB의 설문 유형은 Prisma enum이 아니라 nullable 문자열이므로 허용 유형을 조회 조건에서 제한한다.
- CMS가 최대 개수를 초과해 저장하면 API는 질문 10개·선택지 8개까지만 반환한다.
- 현재 브랜치는 미병합 온보딩 API 브랜치에서 분기되어 해당 커밋에 의존한다.

## 제외 범위

- 설문 답변 저장 및 필수 응답 검증
- AI 추천 결과 생성
- 프론트 진행 상태 및 CMS 기능 변경
- Prisma 스키마, migration, DB 데이터 변경
- 브랜치 merge/rebase, push, PR 생성과 base 조정
