---
status: implemented
scope: fullstack
domain: pois
created: 2026-08-24
---

# 길찾기 버튼 이벤트와 검색 선택 도보 안내

선행 커밋 `15556b1`이 POI 상세 출발/도착과 TMAP 도보 경로를 연결했다. 이 계획은 그 위에 목록 길찾기 버튼, 검색으로 장소 고르기, 현위치 바로 안내를 추가한 범위를 적는다.

## 목표

- 추천/인기 목록의 길찾기 버튼을 누르면, 위치가 이미 허용된 경우 현위치를 출발지·해당 시설을 도착지로 넣고 도보 안내로 바로 들어간다.
- 출발/도착은 검색창, 최근 검색, 추천/인기 탭, 현위치, 지도 핀으로 고른다.
- 목록 길찾기 버튼 클릭 이벤트를 등록한다. 키워드 검색 결과와 출발/도착 검색 목록에서는 버튼을 숨긴다.
- 바로 길찾기 후 X를 누르면 검색바와 시트가 있는 지도 홈으로 돌아간다. 지도만 남지 않는다.
- 출발/도착 칸에는 시설명을 넣는다. 상세에서 시작하면 보고 있는 시설, 핀/목록에서 고르면 해당 POI의 대표 시설이다.

```text
추천/인기 길찾기 + 위치 허용
  → 현위치 출발 + 시설 도착
  → POST /api/tmap/routes/pedestrian
  → 안내 화면
  → X → 지도 홈(검색바 + 시트)

상세 출발/도착 또는 위치 미허용 길찾기
  → 한쪽만 채운 선택 화면
  → 검색/핀/현위치로 나머지 지정
  → 같은 TMAP 도보 요청
```

## 변경 대상 파일

- `ui/src/stores/pageDataStore.ts`
  - `startWalkingFromUserLocation`: 허용된 현위치면 바로 경로 요청, 아니면 도착지만 넣고 출발지 선택
  - `requestWalkingRoute`: `updateViewState`로 현재 화면을 스택에 남긴다
  - `closeWalkingRoute`: 길찾기 이전 지도 홈으로 복귀. 빈 스택이면 `default`/`ai`/`default`
- `ui/src/stores/pageDataStore.test.ts`
  - 현위치 바로 안내, 권한 없음, 같은 장소 토스트, X 복귀
- `ui/src/utils/route-place.ts`
  - `facilityDisplayName`로 시설명 표시
- `src/pois/poi-marker.util.ts`, `src/pois/models/poi-viewport-item-response.dto.ts`, `ui/src/types/pois.ts`
  - 마커 대표 시설명 `facilityName`
- `ui/src/components/svelte/map/SearchList.svelte`
  - 추천/인기 길찾기 → `startWalkingFromUserLocation`
  - 출발/도착 검색 목록에는 길찾기 핸들러를 넘기지 않음
- `ui/src/components/svelte/sheet/SearchSheet.svelte`
  - 키워드 검색 결과에서 길찾기 버튼 제거. 행 클릭은 `assignRoutePlace`
- `ui/src/components/svelte/facility/Info.svelte`
  - `onDirections`가 있을 때만 길찾기 버튼 렌더
- `ui/src/components/svelte/map/SearchBar.svelte`
  - 출발/도착 검색 placeholder, 입력 글자색, 현위치 버튼
- `ui/src/components/svelte/directions/Directions.svelte`
  - 출발/도착 입력 클릭 시 장소 검색
- `ui/src/components/svelte/sheet/BtnDirections.svelte`, `ui/src/pages/map/MapCanvas.astro`
  - 상세 출발/도착·핀 선택 시 시설명 바인딩
- `src/pois/poi-marker.util.spec.ts`, `test/app.e2e-spec.ts`, `ui/src/utils/route-place.test.ts`

## 구현 단계

1. 마커 응답에 대표 시설명 `facilityName`을 넣는다.
2. 출발/도착 이름은 상세 시설 또는 대표 시설로 맞춘다.
3. 추천/인기 길찾기는 허용된 현위치가 있으면 바로 TMAP을 호출한다. 없으면 도착지만 넣고 선택 화면으로 간다.
4. 출발/도착 검색은 기존 `GET /api/v1/search`와 핀/현위치 `assignRoutePlace`를 재사용한다.
5. 검색 결과·출발/도착 검색 목록에서는 길찾기 버튼을 숨기고, 추천/인기 목록에만 이벤트를 단다.
6. 경로 요청은 화면 스택을 남기고, X는 검색바/시트가 있는 홈으로 돌아간다.

## 테스트 유형

- 위치 허용 시 현위치 출발 + TMAP 호출
- 위치 미허용 시 도착지만 채우고 출발지 선택
- 현위치와 도착지가 같으면 TMAP을 호출하지 않고 같은 장소 토스트
- 바로 길찾기 후 X → 검색바/시트 홈. 빈 히스토리여도 지도만 남지 않음
- 마커 `facilityName` 단위·e2e

## 검증 명령

```bash
cd ui && bun test src/stores/pageDataStore.test.ts src/utils/route-place.test.ts
npm test -- src/pois/poi-marker.util.spec.ts --runInBand
git diff -- ui/src/stores/sheetUiStore.ts
```

## 위험 요소

- `sheetUiStore.ts`는 변경하지 않는다.
- 길찾기 버튼 숨김, 출발/도착 검색창 글자색·placeholder는 화면 동작을 위해 퍼블 조건을 바꿨다. `ui-api-wiring`의 기본 금지와 충돌하므로 이 범위만 예외로 둔다.
- 바로 길찾기가 `updateViewState` 없이 화면만 바꾸면 X 이후 검색바·시트가 사라진다. 경로 요청은 스택을 남긴다.
- 위치 미허용 길찾기는 권한을 다시 묻지 않는다. 선택 화면의 현위치 버튼에서 요청한다.

## 제외 범위

- 차량 길찾기, 턴바이턴 목록 UI 신규
- 위치 권한 알럿 문구·흐름 개편
- `sheetUiStore.ts` 변경
- 검색 시트 레이아웃 개편
