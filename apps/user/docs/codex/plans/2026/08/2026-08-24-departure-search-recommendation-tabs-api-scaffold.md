---
status: implemented
scope: fullstack
domain: search
created: 2026-08-24
---

# 길 안내 검색 추천 탭 API 뼈대 구성

## 목표

- `departureSearch` 진입 시 사용하는 최근 검색, AI 추천, 인기 검색어 탭의 데이터 소스를 서로 분리한다.
- 최근 검색 탭은 기존 `recentSearchStore.ts`의 localStorage 기반 저장·조회·삭제 동작을 그대로 재사용한다.
- AI 추천과 인기 검색어는 향후 확정될 각 전용 API를 독립적으로 연결할 수 있도록 타입, 상태, 요청 함수와 탭 소비 경계를 먼저 정의한다.
- 인기 검색어 탭은 항상 노출하고 AI 추천 탭만 현재 대상지가 AI 추천 태그를 사용하는 경우에 노출한다.
- AI 추천과 인기 시설의 본 산정 계약이 확정되기 전까지 명시된 임시 endpoint와 랜덤 응답을 사용한다.

## 현재 상태

- `ViewEx.svelte`의 길 안내 검색 버튼은 `searchViewState`를 `departureSearch`로 전환한다.
- `TabTop.svelte`에는 `recent-searches`, `ai-recommend`, `popularity` 탭 UI가 존재한다.
- `departureSearchTab`이 검색바, 탭과 목록의 공통 선택 상태로 연결되어 있다.
- `SearchList.svelte`는 선택 탭에 따라 최근 검색, AI 추천 시설, 인기 시설 atom을 서로 분리해 소비한다.
- AI 추천과 인기 탭은 모두 검색어가 아닌 시설 목록 타입을 사용하며 각각의 임시 전용 API loader를 연결했다.
- 대상지 상세 응답의 `isAiRecommendYn`은 AI 추천 탭 노출에만 사용하며 인기 검색어 탭 및 집계 조건에는 사용하지 않는다.

## 구현 결과

- `departureSearchTab`을 `recent-searches`, `ai-recommend`, `popularity` 공통 탭 상태로 추가했다.
- 대상지 진입 및 `departureSearch` 진입 시 기본 탭을 최근 검색으로 초기화한다.
- 인기 검색어 탭은 항상 노출하고 `isAiRecommendYn === true`일 때만 기존 AI 추천 탭을 추가 노출한다.
- AI 추천 태그가 비활성화되면 선택값을 최근 검색으로 정규화한다.
- 기존 최근 검색은 `recentSearchStore.ts`를 그대로 사용한다.
- AI 추천 시설과 인기 시설은 각각 독립된 `FacilityListResponse[]` atom으로 관리한다.
- 대상지가 변경되면 두 향후 API 데이터 atom을 초기화해 이전 대상지 결과가 남지 않게 했다.
- 인기 시설은 `GET /api/v1/search/popularity`와 loader, loading/error 상태를 구현했다.
- 상세 노출 집계를 사용할 수 있을 때까지 공개 POI에 연결된 시설을 요청마다 무작위 개수로 최대 10개 반환한다.
- AI 추천 시설은 `GET /api/v1/search/ai-recommendations`와 독립된 loader/loading/error 상태를 사용한다.
- AI 적합도 계약이 확정되기 전까지 공개 POI 연결 시설을 요청마다 랜덤으로 최대 5개 반환한다.
- 메인 AI 화면과 길 안내 검색 화면의 AI/인기 탭은 동일한 `SearchList.svelte` 시설 목록과 선택·길찾기 동작을 재사용한다.

## 탭별 데이터 계약

| 탭          | 노출 조건                                   | 데이터 소스                 | 초기 선택 가능 여부                    |
| ----------- | ------------------------------------------- | --------------------------- | -------------------------------------- |
| 최근 검색   | 항상 노출                                   | 기존 `recentSearchStore.ts` | 항상 가능하며 `departureSearch` 기본값 |
| AI 추천     | 현재 대상지의 AI 추천 태그 사용 값이 `true` | 향후 AI 추천 전용 API       | 노출된 경우에만 선택 가능              |
| 인기 검색어 | 항상 노출                                   | 인기 시설 전용 API          | 항상 선택 가능                         |

## 추천 시설 공통 표시·동작 계약

- AI 추천과 인기 탭은 최근 검색 키워드 행이 아닌 시설 카드 목록으로 표시한다.
- 시설명, 썸네일, 카테고리 아이콘·이름, 운영 상태, 현재 위치 기준 거리와 주소·상세 주소를 사용한다.
- 시설명은 한 줄 말줄임 처리하고 썸네일이 없으면 표시하지 않는다.
- 썸네일 우선순위는 시설 대표 이미지 → 카테고리 기본 이미지다.
- 혼잡 단계 데이터는 응답에 유지하되 목록 뱃지 UI는 이번 구현 범위에서 제외한다.
- 시설을 누르면 해당 시설과 대표 POI가 선택된 시설 상세 화면으로 이동한다. 한 POI에 여러 시설이 연결돼도 선택한 시설 ID를 유지한다.
- 추천 목록을 표시하거나 상세로 이동할 때 지도 전체 POI 목록을 추천 결과로 덮어쓰지 않아 지도 영역의 모든 Pin을 유지한다.
- 길찾기는 위치 권한을 확인한 뒤 현재 위치를 출발지, 시설 대표 POI 좌표를 도착지로 설정한다.

### AI 추천 시설

- 최소 1개, 최대 5개이며 가능한 경우 5개를 채운다.
- AI API가 제공하는 적합도 내림차순을 유지한다.
- 임시 endpoint는 `GET /api/v1/search/ai-recommendations`다.
- 현재 공개 POI 연결 시설 랜덤 최대 5개 응답은 API와 UI 연결 확인만을 위한 임시 기능이다.
- 본 구현은 사용자의 기초 설문 응답과 사용자가 수동으로 추가한 AI 추천 태그를 함께 입력으로 사용한다.
- **TODO(ai-recommendation):** 두 입력의 매칭·가중치·적합도 및 동점 정렬 계약을 확정하고 랜덤 산정을 교체한다.

### 인기 시설

- 본 구현은 최신 한 달 상세 노출 횟수 상위 10개이며 카테고리와 무관하다.
- 노출 횟수 내림차순, 동수이면 가나다순이다.
- AnalyticsEvent 계약 확정 전에는 공개 POI 연결 시설을 무작위 개수로 최대 10개 반환하는 임시 응답을 사용한다.

- 탭별 목록, loading, error, loaded 상태를 분리하여 한 API의 응답이나 실패가 다른 탭에 섞이지 않게 한다.
- AI 추천 탭이 숨겨진 상태에서 선택값이 `ai-recommend`이면 `recent-searches`로 정규화한다. `popularity` 선택은 유지한다.
- 대상지 변경 시 AI 추천 사용 여부와 두 API의 캐시 키를 새 대상지 ID 기준으로 다시 평가한다.
- API 명세 확정 후 필요하면 언어 코드, 대상지 ID, visitor ID, pagination 조건을 각 요청 인자로 추가한다.

## API 호출 정책

- 최근 검색: 탭 진입 시 기존 `loadRecentSearches()`를 호출하며 네트워크 요청을 추가하지 않는다.
- AI 추천: 대상지별 최초 선택 시 전용 요청 함수를 호출하고 성공 결과를 대상지 ID 기준으로 캐시한다.
- 인기 검색어: 대상지별 최초 선택 시 `GET /api/v1/search/popularity`를 호출하고 성공 결과를 캐시한다.
- 메인 AI 화면과 길 안내 검색은 같은 `pageDataStore` 캐시를 소비하므로 같은 대상지에서는 동일한 AI/인기 시설 목록을 표시한다.
- 대상지 변경, 페이지 새로고침 또는 향후 명시적 재추천 동작에서 캐시를 비운 뒤 다시 무작위 조회한다.
- 늦게 도착한 이전 대상지 응답이 현재 탭 상태를 덮어쓰지 않도록 요청 버전 또는 `AbortSignal`을 사용한다.

## 인기 검색어 산정 계약

### 현재 임시 구현

- 현재 대상지에 속하고 공개 상태인 시설만 조회한다.
- 공개 상태의 POI와 공개 매핑으로 연결된 시설만 후보에 포함한다.
- 카테고리, 운영 상태, 혼잡 단계는 후보 필터에 사용하지 않는다.
- 후보를 서버에서 요청마다 무작위로 섞고 노출 개수도 `1~min(10, 후보 수)` 범위에서 무작위로 정한다.
- UI는 대상지별 첫 요청 결과를 공유해 메인 AI 화면과 길 안내 검색에 동일한 목록을 제공한다.

### 향후 AnalyticsEvent 기반 본 구현

> **TODO(search-popularity):** `AnalyticsEvent`의 시설 상세 노출 이벤트 적재 및
> `facilityId` 식별 계약이 확정되면 현재 랜덤 최대 10개 임시 구현을 아래 집계 방식으로 교체한다.
> 이 TODO가 완료되기 전까지 인기 결과는 실제 인기도를 의미하지 않는다.

- 집계 대상은 현재 대상지에 속한 전체 공개 시설이며 카테고리와 무관하다.
- 집계 기간은 접속 시각을 기준으로 전월 동일 날짜부터 접속일까지의 최신 한 달이다.
  - 서버 기준 시간대는 서비스 기준 시간대로 고정해야 하며 1차 후보는 `Asia/Seoul`이다.
  - 시작 경계는 `접속일 - 1 calendar month`의 해당 일자 00:00:00 이상, 종료 경계는 실제 접속 시각 이하로 정의하는 방안을 API 계약에서 확정한다.
  - 전월에 동일 날짜가 없는 월말(예: 3월 31일)의 시작일 보정 규칙은 API 명세에서 확정한다.
- 시설 상세 정보 화면 노출 이벤트 횟수를 시설별로 집계한다.
- 운영 상태와 혼잡 단계는 필터 및 정렬에 사용하지 않는다.
- 1차 정렬은 상세 화면 노출 횟수 내림차순이다.
- 노출 횟수가 같으면 시설 한국어 이름 기준 가나다순으로 정렬한다.
- 최종 상위 10개 시설만 응답한다.
- 같은 방문자나 세션의 반복 노출도 각각 1회로 계산하는지, 중복 제거할지는 이벤트 명세에서 확정한다. 현재 요구사항 문구대로라면 이벤트 row 수를 그대로 합산하는 것이 1차안이다.

## Prisma 스키마 검토 결과

현재 `prisma/schema.prisma`에는 인기 검색 시설 집계에 활용할 수 있는 다음 필드와 관계가 있다.

| 모델             | 활용 필드/관계                                                            | 판단                                         |
| ---------------- | ------------------------------------------------------------------------- | -------------------------------------------- |
| `AnalyticsEvent` | `eventName`, `occurredAt`, `facilityId`, `isVisible`, `isDeleted`         | 기간 내 시설 상세 노출 횟수 집계 후보        |
| `Facility`       | `id`, `name`, `tourDestinationId`, `categoryId`, `isVisible`, `isDeleted` | 대상지 및 공개 시설 필터, 가나다순 이름 제공 |

- `AnalyticsEvent.facilityId`는 `String?`, `Facility.id`는 `Int`이며 Prisma relation이 없다. 따라서 Prisma Client만 사용할 경우 한 번의 relation 집계는 불가능하다.
- 현재 인덱스 `AnalyticsEvent.[occurredAt, eventName]`은 기간·이벤트명 필터에 활용할 수 있다.
- `facilityId`를 포함한 집계 전용 복합 인덱스는 현재 스키마에 없다. 실제 데이터량과 실행 계획을 확인한 뒤 필요하면 데이터베이스 원본에 인덱스를 추가하고 `db pull`로 반영해야 한다.
- 실제 DB 조회 결과 시설 상세 노출 이벤트는 `eventName = 'facility_view'`로 적재되어 있어 인기 API 상수로 확정했다. 이벤트 적재 주체와 `facilityId`가 항상 숫자 문자열인지에 대한 운영 계약은 추가 확인이 필요하다.
- 위 이벤트 데이터가 실제로 적재되고 식별 규칙이 확정되어야 인기 검색어 API가 의미 있는 결과를 만들 수 있다.

## 인기 검색어 조회 뼈대

Prisma relation 부재를 고려한 1차 구현안은 다음의 2단계 조회다.

1. `AnalyticsEvent.groupBy({ by: ['facilityId'] })`로 확정된 시설 상세 노출 `eventName`, 기간, `isVisible: true`, `isDeleted: false` 이벤트를 필터하고 시설별 `_count`를 구한다.
2. 숫자 문자열인 `facilityId`만 안전하게 `Int`로 변환한다. null, 빈 문자열, 비정상 값, Int 범위 밖 값은 제외한다.
3. 집계된 ID를 사용해 `Facility.findMany`를 호출한다.
   - 현재 `tourDestinationId`와 일치
   - 시설 `isVisible: true`, `isDeleted: false`
   - 카테고리는 필터 조건으로 사용하지 않음
4. 시설에 집계 횟수를 결합하고 `노출 횟수 DESC → 한국어 시설명 가나다순 → facilityId ASC`로 안정 정렬한다.
5. 대상지 및 공개 시설 필터와 정렬을 모두 마친 뒤 상위 10개를 반환한다.

- JSON 다국어 이름과 문자열/정수 ID 변환 때문에 Prisma `groupBy` 결과와 시설 조회를 애플리케이션에서 결합하는 방식을 우선한다.
- 한 달 이벤트 cardinality가 커서 group 결과 전체를 메모리에 올리는 비용이 문제가 되면, 파라미터화된 raw SQL이나 집계 캐시 테이블을 별도 설계한다. 이는 실행 계획 확인 후 결정하며 처음부터 raw SQL을 가정하지 않는다.
- 실제 구현에서는 공유 `PrismaService`만 사용하고 별도 Prisma Client를 만들지 않는다.

## 상태 뼈대

API 명세 확정 후 `pageDataStore.ts`에 다음 역할의 상태와 함수를 추가한다. 실제 타입명과 필드는 계약에 맞춰 확정한다.

```text
AI 추천
- aiRecommendationFacilityItems
- aiRecommendationLoading
- aiRecommendationError
- loadAiRecommendationFacilities(...)

인기 검색어
- popularSearchItems
- popularSearchLoading
- popularSearchError
- loadPopularSearches(...)
```

- 컴포넌트에서 `fetch`를 직접 호출하지 않는다.
- 최근 검색 데이터는 `pageDataStore.ts`로 복제하거나 옮기지 않는다.
- 두 API의 응답 타입은 `ui/src/types/search.ts` 또는 API 계약에 맞는 별도 검색 타입 파일에 둔다.
- Nest 응답 envelope가 적용되는 경우 기존 `ApiSuccessResponse<T>` 처리 방식을 따른다.

## 동적 추천 탭 정책

- 1차 후보 기준은 현재 대상지 상세의 `isAiRecommendYn === true`다.
- 대상지 상세가 아직 로딩 중이거나 값이 없으면 AI 추천 탭만 우선 숨기고 최근 검색과 인기 검색어 탭은 노출한다.
- 값이 `true`로 확정되면 AI 추천 탭을 추가 노출하지만 현재 선택 탭을 자동 변경하지 않는다.
- 값이 `false`로 바뀌거나 대상지 변경으로 AI 추천 탭이 숨겨질 때 AI 추천 결과 상태는 화면에서 소비하지 않으며 AI API도 호출하지 않는다. 인기 검색어 선택과 데이터는 유지한다.
- 탭 개수는 AI 추천 태그 사용 대상지에서 3개, 미사용 대상지에서 최근 검색과 인기 검색어 2개가 된다. 이 동적 요소 수 변경만 사용자가 명시적으로 허용한 UI 예외이며, 기존 탭의 순서·아이콘·문구·클래스·스타일은 변경하지 않는다.

## 변경 대상 파일

- `src/search/dto/popularity-search-query.dto.ts`
  - 인기 시설 대상지 ID와 언어 query를 검증한다.
- `src/search/search.controller.ts`
  - `GET /api/v1/search/popularity` 계약과 OpenAPI 응답을 선언한다.
- `src/search/search.service.ts`
  - `facility_view` 집계, 대상지·공개 시설 필터, 정렬과 상위 10개 응답을 구현한다.
- `src/search/search.service.spec.ts` / `src/search/search.controller.spec.ts`
  - 기간 경계, 월말 보정, 집계 정렬과 컨트롤러 위임을 검증한다.
- `ui/src/types/search.ts`
  - 확정된 AI 추천 및 인기 검색어 응답 타입을 각각 추가한다.
- `ui/src/stores/pageDataStore.ts`
  - 공통 탭 상태와 두 API용 독립 데이터 atom을 추가한다.
  - 인기 시설 loading/error/loaded 상태와 요청 함수를 추가한다.
  - AI 추천 시설 임시 요청 상태와 함수가 있으며 본 산정 계약 확정 후 응답 계약을 보완한다.
- `ui/src/components/svelte/sheet/TabTop.svelte`
  - 인기 검색어 탭은 항상 유지하고 현재 대상지의 AI 추천 태그 사용 여부에 따라 기존 AI 추천 탭만 조건부 노출한다.
  - 기존 탭의 DOM, 아이콘, 문구와 class는 유지한다.
- `ui/src/components/svelte/map/SearchBar.svelte`
  - `departureSearch`의 선택 탭을 단일 상태로 관리하고 숨겨진 AI 추천 탭 선택만 최근 검색으로 정규화한다.
- `ui/src/components/svelte/map/SearchArea.svelte`
  - 선택된 탭 값을 기존 목록 영역에 전달한다.
- `ui/src/components/svelte/map/SearchList.svelte`
  - 최근 검색은 기존 store, AI 추천과 인기 검색어는 각각의 `pageDataStore` 상태를 소비한다.
  - 각 화면에서 선택된 추천 탭에 해당하는 요청 함수만 호출한다.
- `ui/src/components/svelte/sheet/TabAi.svelte`
  - 메인 AI 화면의 선택 탭을 `SearchList.svelte`에 전달해 길 안내 검색 화면과 동일한 시설 목록을 표시한다.
- `ui/src/stores/pageDataStore.test.ts`
  - 두 전용 요청의 상태 분리, 대상지 변경, 실패 및 오래된 응답 무시 동작을 검증한다.
- 별도 UI 단위 테스트 파일
  - 프로젝트의 Svelte 테스트 방식이 마련되어 있으면 AI 추천·인기 검색어 탭 동적 노출과 탭별 데이터 선택을 검증한다.

## 구현 단계

1. 공통 탭 타입과 선택 상태를 추가한다. — 완료
2. `departureSearch`가 사용하는 선택 탭 상태를 검색바, 탭, 목록이 함께 소비하도록 연결한다. — 완료
3. 최근 검색 분기는 기존 `recentSearchStore.ts` 동작을 그대로 유지한다. — 완료
4. AI 추천 시설과 인기 시설의 타입 및 atom을 서로 분리한다. — 완료
5. 인기 검색어 탭은 항상 노출하고 AI 추천 탭만 대상지의 AI 추천 태그 사용 여부에 따라 조건부 노출한다. — 완료
6. 숨김 전환 및 대상지 변경 시 선택값과 이전 대상지 데이터를 초기화한다. — 완료
7. 기존 탭 순서, 아이콘, 문구와 `sheetUiStore.ts` 무변경을 확인한다. — 완료
8. 인기 시설 endpoint, DTO, 공개 POI 연결 시설 랜덤 최대 10개 조회와 대상지별 공유 loader를 추가한다. — 완료
9. AI 추천 시설 임시 endpoint, 최대 5개 제한, envelope와 빈 결과 계약을 구현한다. — 완료
10. AI 추천 시설 loading·error 상태와 loader를 연결한다. — 완료
11. AI 적합도 필드와 동점 정렬 계약을 확정하고 랜덤 산정을 교체한다. — 후속 작업

## API 명세 확정 체크리스트

- [ ] **TODO(search-popularity):** `AnalyticsEvent` 기반 최신 한 달 인기 시설 집계로 임시 랜덤 조회 교체
- [ ] **TODO(ai-recommendation):** 기초 설문 응답 조회 및 추천 입력 변환 계약 확정
- [ ] **TODO(ai-recommendation):** 사용자가 수동 추가한 AI 추천 태그 저장·조회 계약 확정
- [ ] **TODO(ai-recommendation):** 설문 응답과 수동 태그의 매칭, 가중치, 적합도 및 동점 정렬 규칙 확정
- [ ] **TODO(ai-recommendation):** 위 계약을 적용해 임시 랜덤 최대 5개 산정을 실제 추천 1~5개 산정으로 교체
- [ ] 시설 상세 노출 이벤트의 적재 주체와 누락·중복 처리 기준 확정
- [ ] `AnalyticsEvent.facilityId`가 숫자형 시설 ID 문자열임을 보장하거나 DB FK/relation 구조 확정
- [ ] 서비스 기준 시간대와 전월 동일 날짜·월말 시작 경계 확정
- [ ] `facility_view` 이벤트를 방문자/세션 단위로 중복 제거할지 row 단위로 집계할지 확정

- AI 추천 본 endpoint 유지 여부와 HTTP method — 임시는 `GET /api/v1/search/ai-recommendations`
- 인기 검색어 endpoint와 HTTP method — `GET /api/v1/search/popularity`로 확정
- 시설 상세 노출 이벤트의 확정 `eventName` — `facility_view`로 확인
- 시설 상세 노출 이벤트 발생 시점과 적재 주체
- `AnalyticsEvent.facilityId`의 값 형식과 시설 ID 일치 보장
- 반복 노출을 event row 단위로 모두 집계할지 visitor/session 단위로 중복 제거할지
- 최신 한 달의 서버 시간대, 시작·종료 경계와 월말 보정 규칙
- 공통/개별 요청 parameter: 대상지 ID, 언어, visitor ID, page, pageSize
- 각 응답 item의 식별자, 표시 문구, 아이콘/카테고리, 시설 또는 검색 실행 연결 정보
- 정렬 순서와 중복 처리 기준
- 빈 결과와 오류 응답 계약
- pagination 또는 최대 노출 개수
- 캐시 및 갱신 주기
- AI 추천 태그 사용 여부 필드와 AI 추천 탭의 노출 기준 및 조회 시점
- 항목 선택 시 시설 상세 이동인지 검색 실행인지에 대한 동작 계약

## 테스트 유형

- `pageDataStore` 단위 테스트
  - AI 추천과 인기 검색어 응답이 서로 다른 상태에 저장됨
  - 한 API의 loading/error가 다른 탭 상태에 영향을 주지 않음
  - 같은 대상지에서도 인기 탭 진입 시마다 다시 요청함
  - 이전 대상지의 지연 응답을 무시함
- 인기 검색어 서비스 단위 테스트
  - 현재 대상지의 공개 시설 중 공개 POI 연결 시설만 포함
  - 운영 상태와 혼잡 단계에 관계없이 포함
  - 요청마다 후보와 노출 개수를 무작위로 정하고 1~10개만 반환
- 탭 상태 테스트
  - AI 추천 태그 사용 대상지는 3개 탭, 미사용 대상지는 최근 검색과 인기 검색어 2개 탭 노출
  - 숨겨진 AI 추천 탭이 선택값으로 남지 않고 인기 검색어 선택은 유지됨
  - `departureSearch` 최초 진입은 최근 검색 탭을 선택
- 회귀 테스트
  - 기존 최근 검색 조회, 키워드/시설 선택, 단건 삭제 동작 유지
  - 기존 탭 아이콘, 문구, class와 배치 유지
  - `sheetUiStore.ts` 무변경

## 검증 명령

```bash
cd ui && bun run fmt:check
cd ui && bun test
cd ui && bun x astro build
git diff -- ui/src/stores/sheetUiStore.ts
git diff --check
```

## 위험 요소

- `SearchBar.svelte`와 `SearchArea.svelte`가 각각 탭 상태를 만들고 있어 단일 선택 상태로 연결하지 않으면 표시 탭과 목록 데이터가 어긋날 수 있다.
- 대상지 상세 로딩 전 AI 추천 탭을 노출하면 미지원 대상지에서 잠깐 보일 수 있으므로 AI 추천 탭만 우선 숨긴다.
- API 명세 전에 공용 item 타입을 만들면 AI 추천과 인기 검색어의 서로 다른 선택 동작을 잘못 합칠 수 있다.
- 명시적 재추천·새로고침 UI가 추가되면 대상지별 캐시 무효화 시점을 함께 정의해야 한다.
- 추천/인기 항목의 선택 결과가 시설 상세인지 검색 실행인지 확정되지 않았으므로 클릭 동작을 미리 구현하면 안 된다.
- 시설 상세 노출 이벤트가 적재되지 않거나 `eventName`이 일관되지 않으면 인기 검색 결과가 비거나 왜곡된다.
- `AnalyticsEvent.facilityId`와 `Facility.id`의 타입이 다르고 relation이 없어 애플리케이션 결합 비용이 발생한다.
- 다국어 JSON 이름은 DB의 일반 문자열 정렬과 동일하게 가나다순 정렬되지 않을 수 있으므로 한국어 이름 추출 및 locale 비교 규칙을 고정해야 한다.
- 전월 동일 날짜가 없는 월말과 시간대 정의가 없으면 조회 구간이 구현별로 달라질 수 있다.

## 제외 범위

- AI 추천 시설의 실제 적합도 산정 구현
- AI 추천 모델과 추천 결과 산정 방식
- AnalyticsEvent 적재 파이프라인 신규 구현 및 과거 상세 노출 데이터 보정
- 데이터베이스 인덱스, relation 또는 집계 캐시 테이블 변경
- AI 추천 시설 본 계약의 미확정 DTO 필드와 pagination 구현
- 최근 검색 localStorage 저장 구조와 정책 변경
- 탭 및 목록의 디자인, 아이콘, 문구, class, 레이아웃 변경
- `sheetUiStore.ts` 변경
- 추천/인기 항목 클릭 후 이동 동작 구현
