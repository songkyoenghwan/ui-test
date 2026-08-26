---
status: superseded
scope: fullstack
domain: search
created: 2026-08-21
---

# 지도 검색바 통합 검색 API 연동

## 목표

- 지도 페이지의 기존 검색바 입력값을 `GET /api/v1/search`의 `keyword` 쿼리로 전달한다.
- 현재 대상지 ID와 언어를 각각 `tourDestinationId`, `language`로 함께 전달한다.
- 성공 응답의 `data.items`를 검색 결과 전용 상태에 저장하고 현재 검색 결과 화면에 표시한다.
- 통합 검색 결과와 `ai-recommend`, `popularity`, `recent-searches` 탭 데이터를 서로 다른 상태와 계약으로 분리한다.
- 기존 지도 화면의 레이아웃, DOM 구조, 스타일, 검색 외 상태 전환은 유지한다.

## 확인된 현재 계약과 문제

### 통합 검색 API

- 요청: `GET /api/v1/search?tourDestinationId={id}&keyword={text}&language={ko|en|ja|zh}`
- 성공 envelope: `{ success: true, data: { items: SearchResult[] } }`
- `SearchResult`는 시설 ID, 다국어 시설명, 카테고리명·아이콘·색상 정보를 반환한다.
- 검색 범위는 시설명, 카테고리명, 해시태그명, 상품명 및 연결된 POI명/주소다.
- 최대 500건을 반환하며 페이지네이션 응답은 아니다.

### 현재 UI와의 불일치

- `searchList`와 `searchResultList`는 모두 `FacilityListResponse[]`로 선언되어 있다.
- `SearchList.svelte`는 시설의 `category.iconKey`, `categoryColorCodes`, 다국어 `name` 구조를 전제로 한다.
- 검색 API도 동일한 표시 필드를 가진 시설 검색 결과를 반환하되, 다른 목록 상태와 섞이지 않도록 검색 전용 타입과 상태를 둔다.
- `ai-recommend`, `popularity`, `recent-searches`는 현재 `TabTop.svelte`의 표시 상태만 존재한다. 각 탭을 공급하는 별도 API/응답 계약은 현재 저장소에 없고, `SearchBar.svelte`와 `SearchArea.svelte`의 탭 상태도 서로 독립적이다.

## 응답 및 상태 분리 원칙

| 구분             | 데이터 계약                     | 저장 상태                          | 이번 연동 동작                 |
| ---------------- | ------------------------------- | ---------------------------------- | ------------------------------ |
| 키워드 통합 검색 | `SearchResultResponse[]` (시설) | 신규 검색 결과 전용 atom           | `/api/v1/search` 결과로 갱신   |
| AI 추천          | 향후 AI 추천 전용 계약          | 기존/향후 추천 전용 atom           | 통합 검색 응답을 대입하지 않음 |
| 인기             | 향후 인기 전용 계약             | 신규 또는 향후 인기 전용 atom      | 통합 검색 응답을 대입하지 않음 |
| 최근 검색        | 사용자 검색 이력 전용 모델      | 신규 또는 향후 최근 검색 전용 atom | 서버 검색 결과를 대입하지 않음 |

- 세 탭의 실제 데이터를 구현하려면 각 기능의 API 계약 또는 최근 검색의 저장 정책(로컬/서버)이 별도로 정해져야 한다.
- 이번 작업에서는 존재하지 않는 API나 순위/추천 규칙을 추측하지 않는다.

## 변경 대상 파일

- `src/search/search.service.ts`
  - `Facility`을 기준으로 시설명, 카테고리명, 태그명, 상품명, 연결 POI 위치명을 검색한다.
- `src/search/dto/search-response.dto.ts`
  - 시설 ID, 다국어 시설명, 카테고리 아이콘/색상 응답 계약을 정의한다.
- `src/search/search.controller.ts`
  - OpenAPI 설명을 시설 검색 계약에 맞춘다.
- `src/search/search.service.spec.ts`
  - 시설 기준 Prisma 필터와 응답 매핑을 검증한다.
- `ui/src/types/search.ts` (신규)
  - 백엔드 `SearchResultResponseDto`, `SearchListResponseDto`와 성공 envelope에 대응하는 UI 타입을 정의한다.
- `ui/src/stores/pageDataStore.ts`
  - 검색 결과, 로딩, 오류 상태를 추가한다.
  - 입력값을 `URLSearchParams`로 인코딩해 `/api/v1/search`를 호출하는 함수를 추가한다.
  - 빈 검색어는 요청하지 않고 검색 결과 상태를 초기화한다.
  - 실패 시 이전 요청의 결과가 현재 검색어의 결과처럼 남지 않도록 오류/결과 상태를 일관되게 갱신한다.
- `ui/src/components/svelte/map/SearchBar.svelte`
  - 기존 input과 `$categoryState` 바인딩을 유지한다.
  - 검색 실행 시 현재 `current.destination`, `$langState`, trim한 입력값을 store 함수에 전달한다.
  - 요청 성공 시 기존 `searchResult` 화면 상태로 전환한다.
  - 중복 제출 및 빈 문자열 제출을 막는다.
- `ui/src/components/svelte/map/SearchList.svelte`
  - `searchResult` 상태에서는 검색 API의 시설 결과를 소비한다.
  - 기존 목록 DOM 안에서 시설명과 카테고리 아이콘/색상을 표시하도록 데이터 표현식만 분기한다.
  - AI 추천, 인기, 최근 검색 표시 분기는 통합 검색 결과 상태와 분리한다.
- `ui/src/stores/pageDataStore.test.ts` 또는 저장소의 UI 테스트 관례에 맞는 인접 테스트 (신규 가능)
  - 요청 URL, envelope 매핑, 빈 검색어, 실패 응답, 연속 요청 처리 동작을 검증한다.

## 구현 단계

1. 백엔드 검색 기준과 응답을 시설 중심 계약으로 구현한다.
2. 백엔드 DTO와 동일한 검색 응답 타입을 UI에 추가한다.
3. `pageDataStore.ts`에 키워드 검색 함수와 검색 전용 atom을 추가한다.
4. 검색 함수에서 현재 대상지 ID, trim한 키워드, 현재 언어를 쿼리 문자열로 만들고 성공 envelope의 `data.items`만 매핑한다.
5. 빠르게 연속 검색할 때 늦게 도착한 이전 응답이 최신 결과를 덮어쓰지 않도록 요청 식별자 또는 `AbortController`를 적용한다.
6. 기존 input에서 Enter 검색을 실행하고, 성공한 검색만 `searchResult` 화면으로 연결한다. 클릭만으로는 빈 검색 요청을 보내지 않는다.
7. `SearchList.svelte`의 `searchResult` 데이터 소스를 검색 전용 atom으로 교체하고, 시설명과 카테고리 정보를 표시한다.
8. AI 추천, 인기, 최근 검색 상태에는 통합 검색 응답이 유입되지 않는지 확인한다.
9. 관련 테스트와 UI 정적 검사를 실행하고 변경 범위를 검토한다.

## 테스트 유형

- 스토어 단위 테스트
  - 한글 및 공백이 포함된 keyword가 안전하게 인코딩되는지 확인
  - `tourDestinationId`, `keyword`, `language` 전달 확인
  - `{ success: true, data: { items } }` 매핑 확인
  - 빈 keyword 요청 차단 및 결과 초기화 확인
  - HTTP 오류와 잘못된 payload 처리 확인
  - 연속 요청 시 최신 응답만 반영되는지 확인
- 컴포넌트/수동 smoke 테스트
  - 검색바 Enter 입력 후 결과 화면 전환 확인
  - 시설명, 카테고리 아이콘/색상, 빈 결과 메시지 확인
  - 뒤로 가기와 카테고리 검색이 기존대로 동작하는지 확인
  - `ai-recommend`, `popularity`, `recent-searches` 전환 시 키워드 검색 결과가 섞이지 않는지 확인

## 검증 명령

```bash
cd ui && bun run check
cd ui && bun run lint
cd ui && bun run fmt:check
cd ui && bun test <추가한-검색-스토어-테스트-경로>
git diff -- ui/src/stores/sheetUiStore.ts
git diff --check
```

- `sheetUiStore.ts` diff는 비어 있어야 한다.
- 컴포넌트 diff에는 데이터 바인딩과 이벤트 처리 외 DOM 배치, 클래스, 스타일 변경이 없어야 한다.

## 위험 요소

- 검색 API의 ID는 시설 ID이며, 연결된 POI는 위치명/주소 검색 조건에만 사용한다.
- 현재 `language` DTO는 `ko`, `en`, `ja`, `zh`만 허용한다. UI 언어 상태가 이 집합 외 값을 가질 수 있다면 호출 전 명시적 fallback이 필요하다.
- 최근 검색은 검색 결과가 아니라 사용자가 제출한 검색어 이력이다. 보존 기간, 중복 제거, 최대 개수, 저장 위치가 정해지지 않으면 영속 구현을 확정할 수 없다.
- 인기/AI 추천은 정렬 또는 추천 근거가 없으므로 시설 전체 목록을 재사용하면 의미가 왜곡된다.

## 제외 범위

- AI 추천 및 인기 순위 산정 로직과 신규 백엔드 API 개발
- 최근 검색 이력의 서버 저장, 로컬 저장 정책 및 삭제 기능 구현
- 검색 결과 클릭 후 지도 중심 이동 또는 시설 상세 진입 동작 확정
- 검색 자동완성, 입력 debounce 검색, 서버 페이지네이션
- 지도/시트 레이아웃, DOM 구조, 스타일, 애니메이션 변경
- API 프록시와 빌드 설정 변경
