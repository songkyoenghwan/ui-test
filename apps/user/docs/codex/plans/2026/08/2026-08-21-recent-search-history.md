---
status: implemented
scope: ui
domain: search
created: 2026-08-21
---

# 지도 최근 검색 키워드·시설 저장 및 조회

## 목표

- 지도 검색바에서 정상 처리된 검색 키워드와 검색 결과에서 선택한 시설을 브라우저 `localStorage`에 저장한다.
- 새로고침하거나 지도 페이지에 다시 진입해도 최근 검색 기록을 복원한다.
- 일반 검색 화면과 길 안내 검색 화면에서 같은 최근 검색 목록을 최신순으로 표시한다.
- 키워드를 선택하면 검색창에 반영하고 기존 시설 키워드 검색을 다시 실행한다.
- 시설을 선택하면 해당 시설 상세 화면으로 이동한다.
- 기존 닫기 버튼으로 최근 검색 기록을 즉시 개별 삭제한다.
- 기존 컴포넌트 DOM 구조, 클래스, 스타일 및 bottom sheet 동작은 유지한다.

## 확인된 현재 동작

- 검색어 입력값은 `globalStore.ts`의 일반 atom인 `categoryState`에만 보관되므로 새로고침하면 사라진다.
- `loadKeywordSearch()`는 API 요청과 결과 상태만 관리하며 검색 이력은 저장하지 않는다.
- `search` 화면은 최근 검색 영역으로 사용되지만 `SearchList.svelte`는 현재 `searchList`의 시설 목록을 표시한다.
- 목록에는 항목 선택 버튼과 `data-btn="del"` 삭제 버튼이 이미 있으나, 삭제 버튼에는 동작이 연결되어 있지 않다.
- `recent-searches` 탭은 표시 상태만 존재하고 검색 이력을 공급하는 store는 없다.

## 저장 정책

- 저장소: 브라우저 `localStorage`
- 저장 키: 다른 상태와 충돌하지 않는 버전 포함 키(예: `mapRecentSearches:v1`)
- 공통 항목: `type`, `id`, `tourDestinationId`, `searchedAt`
- 키워드 항목:
  - `type: 'keyword'`
  - `keyword`: trim한 표시용 검색어
- 시설 항목:
  - `type: 'facility'`
  - `facilityId`, `poiId`: 상세 화면 진입에 필요한 식별자
  - `name`, `iconKey`, `colorCode`: 기존 목록 구조에 표시할 시설명과 카테고리 아이콘 정보
- 키워드 저장 시점: 빈 문자열이 아니며 검색 API가 정상 응답한 경우
  - 검색 결과가 0건이어도 HTTP/응답 계약이 정상이면 저장한다.
  - 요청 실패, 취소, 유효하지 않은 응답은 저장하지 않는다.
- 시설 저장 시점: 키워드 검색 결과 목록에서 시설 상세 항목을 선택한 경우
- 키워드 중복 기준: `tourDestinationId + 정규화된 keyword`
  - 앞뒤 공백을 제거하고 비교용 keyword는 대소문자를 구분하지 않는다.
- 시설 중복 기준: `tourDestinationId + facilityId`
- 같은 유형의 중복 기록은 기존 항목을 제거하고 최신 입력 시각으로 맨 앞으로 이동한다.
- 키워드와 시설을 합쳐 전체 최대 30개를 최신순으로 유지한다.
- 손상 데이터: JSON 파싱 실패 또는 필수 필드가 잘못된 항목은 버리고 빈 배열로 복구한다.

## 조회 및 화면 동작

- `searchViewState`가 `search` 또는 `departureSearch`일 때 현재 대상지의 최근 키워드·시설을 최신순으로 표시한다.
- 키워드 항목 선택 시:
  1. 저장된 keyword를 `categoryState`에 반영한다.
  2. 저장 항목의 언어가 아니라 현재 화면 언어와 현재 대상지 ID로 `loadKeywordSearch()`를 호출한다.
  3. 성공하면 기존과 동일하게 `detail: 'search'`, `search: 'searchResult'`로 전환해 bottom sheet를 표시한다.
  4. 재검색이 정상 처리되면 선택 항목을 최신 검색으로 갱신한다.
- 시설 항목 선택 시:
  1. 저장된 `facilityId`, `poiId`를 현재 선택 상태에 반영한다.
  2. 기존 `loadPoiDetail()`을 호출한다.
  3. 선택 시설의 상세 화면으로 이동한다.
- 삭제 버튼 선택 시 해당 항목만 제거하고 검색 실행이나 화면 전환은 발생하지 않는다.
- 현재 대상지와 다른 대상지의 검색 기록은 저장 상태에는 유지하되 목록에서는 표시하지 않는다.
- `ai-recommend`, `popularity` 데이터에는 최근 검색 상태를 연결하지 않는다.

## 변경 대상 파일

- `ui/src/types/search.ts`
  - 키워드·시설 union인 `RecentSearchItem`을 정의한다.
- `ui/src/stores/recentSearchStore.ts` (신규)
  - localStorage encode/decode, 런타임 검증, 최신순 정렬, 중복 제거, 최대 개수 제한을 관리한다.
  - 키워드/시설 추가, 대상지별 조회, 개별 삭제 함수를 제공한다.
- `ui/src/stores/pageDataStore.ts`
  - `loadKeywordSearch()` 성공 시 최근 검색 저장 함수를 호출한다.
  - 취소, 실패, 빈 검색어에서는 기록하지 않는다.
- `ui/src/components/svelte/map/SearchList.svelte`
  - `search`, `departureSearch` 상태에서 현재 대상지의 최근 검색 기록을 소비한다.
  - 키워드는 검색 아이콘, 시설은 저장된 카테고리 아이콘을 기존 `IconCategory`로 표시한다.
  - 기존 항목 버튼으로 키워드 재검색 또는 시설 상세 진입을 수행하고 삭제 버튼으로 해당 기록을 삭제한다.
  - 이벤트 전파를 막아 삭제가 재검색을 함께 실행하지 않게 한다.
- `ui/src/stores/recentSearchStore.test.ts` (신규)
  - 저장/복원, 중복 갱신, 최대 개수, 대상지 필터, 삭제, 손상 데이터 복구를 검증한다.
- `ui/src/stores/pageDataStore.test.ts`
  - 성공 응답에만 검색 기록이 추가되고 실패·취소·빈 검색어에는 추가되지 않는지 검증한다.

## 구현 단계

1. 최근 검색 항목 타입과 localStorage 키를 정의한다.
2. 브라우저와 테스트 환경 모두에서 안전하게 동작하는 영속 store를 구현한다.
3. 저장 데이터 decode 시 배열 및 각 필수 필드를 검증하고 유효한 항목만 복원한다.
4. 추가 함수에 trim, 유형별 중복 제거, 최신순 이동, 최대 30개 제한을 적용한다.
5. `loadKeywordSearch()`의 최신 요청이 성공한 지점에서만 최근 검색을 저장한다.
6. 검색 결과 시설 상세 선택 시 시설 기록을 저장한다.
7. `SearchList.svelte`의 `search`, `departureSearch` 데이터 소스를 최근 검색 store로 교체한다.
8. 키워드 선택은 기존 검색 API, 시설 선택은 기존 상세 API와 화면 전환을 재사용한다.
9. 기존 삭제 버튼에 개별 삭제를 연결하고 클릭 이벤트가 부모 검색 버튼으로 전달되지 않게 한다.
10. store 및 API 연동 테스트와 UI 정적 검사를 실행한다.

## 테스트 유형

- 최근 검색 store 단위 테스트
  - 정상 항목 저장 및 최신순 조회
  - 공백 정규화 및 대소문자 중복 제거
  - 동일 검색어 재검색 시 최상단 이동과 `searchedAt` 갱신
  - 키워드·시설 유형별 중복 갱신
  - 최대 30개 초과 시 가장 오래된 항목 제거
  - 대상지별 목록 필터
  - 개별 항목 삭제
  - 잘못된 JSON 및 유효하지 않은 항목 복구
- 검색 API store 테스트
  - 성공 및 0건 성공 응답 시 저장
  - 빈 검색어, HTTP 실패, 잘못된 payload, 취소 요청 미저장
- 컴포넌트/수동 smoke 테스트
  - 새로고침 후 최근 키워드·시설 유지
  - 일반 검색과 길 안내 검색 화면에서 같은 목록 표시
  - 최근 키워드 선택 후 bottom sheet 검색 결과 표시
  - 최근 시설 선택 후 시설 상세 표시
  - 삭제 버튼 선택 시 해당 항목만 제거
  - 다른 대상지 검색 기록이 현재 목록에 노출되지 않음

## 검증 명령

```bash
cd ui && bun x paraglide-js compile --project ./project.inlang --outdir ./src/paraglide
cd ui && bun test src/stores/recentSearchStore.test.ts src/stores/pageDataStore.test.ts
cd ui && bun run fmt:check
cd ui && bun x astro build
git diff -- ui/src/stores/sheetUiStore.ts
git diff --check
```

- `sheetUiStore.ts` diff는 비어 있어야 한다.
- `SearchList.svelte` diff에는 데이터 소스와 기존 버튼 이벤트 변경만 포함하고 DOM 구조, 클래스, 스타일은 변경하지 않는다.

## 위험 요소

- localStorage는 브라우저와 동일 origin에 종속되므로 다른 도메인·브라우저·기기에는 이력이 공유되지 않는다.
- private browsing, 저장 공간 제한, 사용자의 사이트 데이터 삭제로 기록이 사라질 수 있다.
- 저장 모델을 변경할 때 기존 데이터와 충돌하지 않도록 키 버전을 올리거나 명시적인 migration이 필요하다.
- 검색어는 사용자 입력 데이터이므로 DOM에 HTML로 삽입하지 않고 Svelte 텍스트 바인딩으로만 표시해야 한다.
- 현재 언어로 재검색하므로 저장 당시와 다른 언어로 전환한 뒤 선택하면 검색 결과가 달라질 수 있다.

## 제외 범위

- 서버 또는 사용자 계정 기반 검색 이력 동기화
- 여러 브라우저·기기 간 최근 검색 공유
- 전체 삭제 버튼 및 자동 만료 정책
- AI 추천 및 인기 검색 데이터 저장
- 검색 결과 시설 목록 전체의 localStorage 저장
- 검색어 자동완성, 추천 검색어, 검색 분석 이벤트
- 기존 UI DOM 구조, CSS, 애니메이션 변경
