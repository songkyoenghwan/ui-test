---
status: implemented
scope: fullstack
domain: search
created: 2026-08-24
---

# 검색 결과 정렬·시설 목록·상세/길찾기 연동

## 구현 상태

### 상태 판정

- 현재 상태는 `implemented`다.
- 검색 결과 조회·정렬·시설 목록·상세 진입·길찾기 좌표 전달과 위치 권한 안내까지 구현 완료다.
- 운영 상태 캐시 영속화 구조와 갱신 작업은 별도 계획으로 분리했다.

### 구현 완료

- 검색 API 시설 중심 조회와 검색 결과 POI 핀 제한
- `FacilityOperatingStatus` 유효 캐시 우선 조회 및 운영 스케줄 fallback
- 운영시간순, 가까운순, 가나다순과 동률 정렬 규칙
- 검색 응답의 시설명, 카테고리, 썸네일, 혼잡도, 운영 상태, 대표 POI 위치 정보 매핑
- 대표 POI의 `address`, `addressDetail`, `latitude`, `longitude` 응답 및 UI store 연결
- 이미 허용된 위치 권한의 일회성 현재 위치 조회와 단일 `userPosition` 공유
- 현재 위치와 대표 POI 좌표 사이 Haversine 직선거리 계산 및 `m`/`km` 표시
- 공통 `distance` 유틸리티에서 좌표 검증, Haversine 계산과 거리 문자열 포맷 제공
- 현재 언어 기준 `주소 + 상세주소` 결합 표시
- 정렬 선택 시 바텀시트 최대 확장
- 검색 결과 시설 상세 진입 시 검색 결과 핀 유지
- 길찾기 출발지/도착지 좌표 상태 설정
- 브라우저 기본 알럿을 이용한 위치 권한 상태별 안내 및 요청 흐름

### 별도·선택 후속 작업

- `directions` 화면에서 실제 경로 탐색과 길안내 실행
- 위치 이동에 따른 실시간 거리 갱신이 필요할 경우 `locationStore` 단일 watcher 도입

실제 경로 탐색 알고리즘은 이 문서의 제외 범위이고 실시간 위치 갱신은 추가 요구사항이 있을 때 진행한다. 따라서 두 항목은 문서 완료 상태를 막지 않는다.

운영 상태 캐시의 DB 구조, backfill 및 갱신 worker는 [시설 운영 상태 캐시 구조 및 갱신](./2026-08-24-facility-operating-status-cache.md) 계획에서 별도로 관리한다.

## 목표

- 검색어 또는 카테고리를 선택해 검색에 성공하면 검색된 시설과 연결된 POI 핀만 지도에 표시하고 검색 결과 바텀시트를 연다.
- 검색 결과 바텀시트에 `운영시간순`(기본), `가까운순`, `가나다순` 라디오 정렬을 제공하고 선택 즉시 결과에 적용한다.
- 정렬 기준을 누르면 기존 `sheetUiStore.ts`의 `setPointSheetUi('max')`를 호출해 바텀시트를 전체 확장한다.
- 가까운순은 위치 권한이 허용된 경우에만 적용하고, 권한이 없거나 거부되면 위치 정보 허용 알럿을 표시한 뒤 기존 정렬을 유지한다.
- 시설 목록에 시설명, 썸네일, 카테고리, 유효한 혼잡도, 운영 상태, 위치 정보를 표시한다.
- 검색 결과의 위치 정보는 현재 위치 기준 거리와 `주소 + 상세주소`를 한 행에 함께 표시한다.
- 시설을 선택하면 해당 시설 상세로 이동하되 검색 결과 핀 집합은 유지한다.
- 길찾기는 현재 위치를 출발지, 선택 시설의 POI 좌표를 도착지로 설정해 길 안내 화면으로 전환한다.

## 현재 구조와 확인된 차이

### 이미 존재하는 흐름

- `SearchBar.svelte`와 `Category.svelte`는 `loadKeywordSearch()`를 호출한다.
- `GET /api/v1/search`는 `items`(시설 요약)와 `pois`(검색 결과 핀)를 반환한다.
- `pageDataStore.ts`는 검색 성공 시 `searchResultList`를 갱신하고 `publishPoiList()`로 검색 결과 핀만 지도에 게시한다.
- `SearchSheet.svelte`에는 세 개의 정렬 라디오와 시설 선택 후 `loadPoiDetail()`을 호출하는 골격이 있다.
- `sheetUiStore.ts`에는 `setPointSheetUi('max')`가 이미 있으므로 정렬 선택 이벤트에서 이를 호출할 수 있다.

### 현재 부족한 데이터와 동작

- 검색 시설 응답은 `id`, `name`, `category`, `poiId`만 제공한다.
- 운영 상태/다음 운영 일시, 썸네일, POI 이름·주소·상세주소·좌표, 시설별 혼잡도가 없어 명세대로 표시하거나 정렬할 수 없다.
- 현재 운영시간순은 `startAt` 단일 값 비교이며 7단계 운영 상태 우선순위를 반영하지 않는다.
- 가까운순에 필요한 사용자 위치 상태, 권한 처리, 거리 계산 및 동률 비교가 없다.
- 기존 `Address.svelte`는 시설 행마다 `watchPosition()`을 실행해 목록 개수만큼 위치 감시가 생성되고, 검색 결과 진입만으로 위치 권한 요청이 발생할 수 있다.
- 기존 거리 fallback은 지도 중심 좌표를 사용할 수 있어 사용자의 실제 현재 위치 기준 거리와 다를 수 있다.
- 정렬 변경 시 바텀시트 전체 확장 동작이 없다.
- 검색 결과 시설 선택 후 상세 데이터는 열리지만, 상세 화면에서 검색 핀 집합을 유지한다는 계약이 명시적으로 보호되어 있지 않다.
- `BtnDirections.svelte`는 화면 상태만 `directions`로 전환하며 출발지/도착지 좌표를 설정하지 않는다.

## 운영 상태 및 정렬 계약

### 운영 상태 표시 형식

| 상태            | 표시 형식                       |
| --------------- | ------------------------------- |
| `OUT_OF_PERIOD` | `미운영`                        |
| `HOLIDAY`       | `오늘 휴무`                     |
| `OPERATING`     | `운영 중 · HH:MM 운영 종료`     |
| `BREAK`         | `휴게 시간 · HH:MM 운영 재시작` |
| `BEFORE_OPEN`   | `운영 전 · HH:MM 운영 시작`     |
| `AFTER_CLOSE`   | `오늘 운영 종료`                |

- 표기 시각은 `Asia/Seoul` 기준 24시간제 `HH:MM`이다.
- 운영 중에는 당일 운영 종료 시각, 휴게 시간에는 휴게 종료 시각, 운영 전에는 운영 시작 시각을 `nextTransitionAt`으로 사용한다.
- 검색 결과 운영 상태 옆에 `NORMAL` 등의 혼잡도 enum 원문을 텍스트 배지로 표시하지 않는다.
- `NO_INFO`는 위 6개 상태를 판정할 운영 정보가 없는 예외 상태로 `운영 정보 없음`을 표시한다.

### 운영 상태 모델

검색 API는 `FacilityOperatingStatus` 캐시 테이블의 유효한 값을 1차로 사용하고, 캐시가 없거나 만료되었거나 비정상인 경우에만 시설 운영 스케줄을 계산한다. 두 경로 모두 서버의 대상지 시간대와 조회 시각을 기준으로 다음 값 중 하나를 반환한다.

| 우선순위 | 상태            | 의미           | 동일 상태 2순위                           |
| -------: | --------------- | -------------- | ----------------------------------------- |
|        1 | `OPERATING`     | 운영 중        | 가나다순                                  |
|        2 | `BREAK`         | 휴게 시간      | 휴게 종료 일시가 가까운 순, 이후 가나다순 |
|        3 | `BEFORE_OPEN`   | 운영 전        | 운영 시작 일시가 가까운 순, 이후 가나다순 |
|        4 | `AFTER_CLOSE`   | 당일 운영 종료 | 가나다순                                  |
|        5 | `HOLIDAY`       | 휴무일         | 가나다순                                  |
|        6 | `OUT_OF_PERIOD` | 운영 기간 밖   | 가나다순                                  |
|        7 | `NO_INFO`       | 운영 정보 없음 | 가나다순                                  |

- 상태 값과 우선순위는 기존 `FacilityOperatingStatus`, `FACILITY_OPERATING_STATUS_RANK`를 그대로 사용한다.
- fallback 판정은 기존 `resolveFacilityOperatingStatus()`를 검색 전용으로 중복 구현하지 않고, 상태와 다음 전환 일시를 함께 반환하는 공통 snapshot 계산으로 확장한다.
- `BREAK`에는 다음 휴게 종료 일시, `BEFORE_OPEN`에는 다음 운영 시작 일시를 `nextTransitionAt` ISO 일시로 함께 반환한다.
- 일시 비교에는 대상지 시간대, 자정을 넘는 영업시간, 휴일, 운영 기간 시작/종료 경계를 포함한다.
- 모든 정렬의 최종 안정화 키는 `facilityId ASC`로 둔다.

### 운영 상태 캐시 우선 조회

`FacilityOperatingStatus`는 운영 스케줄 원본이 아니라 계산 결과를 보관하는 read cache로 취급한다.

```text
공개·미삭제 FacilityOperatingStatus 조회
  ├─ 알려진 status이고 cacheNextRefreshAt > now
  │    → 캐시 status/nextTransitionAt 사용
  └─ 누락/만료/비정상
       → 운영 기간·스케줄·휴무·휴게 정보로 snapshot 계산
       → 현재 응답과 정렬에는 계산 결과 사용
       → 비동기 캐시 갱신 대상으로 등록
```

- 유효 캐시 조건은 공개·미삭제, 알려진 상태 enum, `cacheNextRefreshAt > now`를 모두 만족하는 것이다.
- 만료되거나 알 수 없는 상태 값은 사용자 응답에 그대로 노출하지 않는다.
- 검색 GET 요청에서 캐시를 동기 갱신하지 않는다. 동시 검색 시 동일 시설에 대한 쓰기 경쟁과 응답 지연을 막기 위해 fallback 결과만 즉시 사용하고 갱신은 별도 작업으로 처리한다.
- 캐시 사용 여부와 관계없이 응답 DTO는 동일한 `status`, `nextTransitionAt` 계약을 사용한다.
- 검색 서비스는 시설 목록을 조회하면서 캐시를 relation `select`로 함께 가져오며 시설별 추가 조회를 만들지 않는다.

### 정렬 규칙

1. `hours`(기본)
   - 위 운영 상태 우선순위로 정렬한다.
   - `BREAK`와 `BEFORE_OPEN`은 각각 의미가 다른 동일 필드 `nextTransitionAt ASC`를 적용한다.
   - 나머지 상태 및 일시가 같은 경우 현재 언어의 시설명 가나다순, 마지막으로 시설 ID 순을 적용한다.
2. `proximity`
   - 사용자 현재 위치와 시설이 연결된 대표 POI 좌표 간 직선거리를 미터 단위로 계산해 오름차순 정렬한다.
   - 거리가 같으면 운영시간순 전체 비교 규칙, 시설명, 시설 ID 순을 적용한다.
   - 거리 계산은 브라우저에서 Haversine 방식으로 수행하고 API에 사용자 위치를 전송하지 않는다.
3. `alphabetical`
   - 현재 표시 언어의 시설명을 `Intl.Collator`로 오름차순 정렬하고 시설 ID로 안정화한다.
   - 언어가 바뀌면 현재 정렬 기준을 유지한 채 다시 정렬한다.

## 위치 권한 정책

- 검색 결과 진입 시 권한이 이미 `granted`이면 사용자 알럿 없이 현재 위치를 한 번 조회해 각 시설의 거리를 표시한다.
- 검색 결과 진입 시 권한이 `prompt` 또는 `denied`이면 자동으로 권한을 요청하지 않고 거리·주소·상세주소 대신 `usr_map_002_44`만 표시한다.
- 새로운 권한 요청은 가까운순 또는 길찾기를 선택한 시점에만 수행한다. 일반 검색만으로 브라우저 권한 팝업을 띄우지 않는다.
- `navigator.permissions`가 지원되면 `geolocation` 상태를 먼저 확인한다.
  - `granted`: 현재 위치를 조회하고 가까운순을 적용한다.
  - `prompt`: 제품 문구 `[P] 위치 정보 허용 알럿`을 노출하고 사용자 확인 후 브라우저 위치 권한을 요청한다.
  - `denied`: 허용 알럿/설정 안내를 표시하고 이전 정렬을 유지한다.
- Permissions API 미지원 환경은 `navigator.geolocation.getCurrentPosition()` 결과로 분기한다.
- 조회 중에는 중복 요청을 막고, 실패·시간 초과·정확하지 않은 좌표·Geolocation 미지원 시 이전 정렬과 기존 목록 순서를 유지한다.
- 사용자의 좌표는 메모리 store에만 보관하며 localStorage나 서버에는 저장하지 않는다.
- 시설 행마다 `watchPosition()`을 생성하지 않는다. 검색 목록은 `locationStore`의 단일 `userPosition`을 공유하고 `getCurrentPosition()`의 일회성 결과를 사용한다.
- 이동 중 실시간 거리 갱신이 후속 요구사항으로 추가되면 `locationStore`에서 단 하나의 `watchPosition()`만 소유하고 모든 행이 그 값을 구독한다.
- 실제 알럿 문구와 설정 이동 방식은 `[P]` 디자인/제품 문구가 확정되면 기존 공통 알럿 컴포넌트에 연결한다.

## 거리 및 주소 표시 계약

- 이 기능의 거리는 도로망, 보행로, 교통 상황을 반영하지 않는 두 GPS 좌표 사이의 단순 직선거리다.
- 실제 이동거리나 예상 이동시간이 아니며, 검색 목록 표시와 가까운순 정렬에만 사용한다.
- 검색 시설의 위치 정보는 `거리 · 주소 상세주소` 순서로 표시한다.
- 주소와 상세주소는 현재 언어로 각각 변환한 뒤 빈 값은 제외하고 공백 하나로 결합한다.
- `address`가 없고 `addressDetail`만 있으면 상세주소만 표시한다.
- 위치 권한이 `prompt`, `denied`, `unsupported`이면 주소·상세주소 유무와 관계없이 거리와 주소를 숨기고 `usr_map_002_44`만 표시한다.
- 위치 권한이 허용되고 현재 위치와 대표 POI 좌표가 유효하면 거리 영역과 주소 영역을 함께 표시한다.
- 거리는 사용자 현재 위치와 검색 시설의 대표 POI 좌표 사이를 Haversine 공식으로 계산한다.
- Haversine 계산은 지구를 반지름 6,371km의 구로 가정한 대권거리이며 화면에서는 직선거리로 안내한다.
- 현 위치부터의 거리가 0m 이상 1,000m 미만이면 소수점을 버린 정수 `m` 단위로 표시한다.
- 현 위치부터의 거리가 1,000m 이상이면 km로 변환하고 반올림해 소수점 첫째 자리까지 표시한다. 예: `1.0km`, `1.2km`.
- 사용자 위치가 없거나 시설 좌표가 유효하지 않으면 임의의 지도 중심 좌표로 계산하지 않는다.
- 거리 계산은 브라우저에서만 수행하며 현재 위치 좌표를 검색 API나 서버 로그로 전송하지 않는다.
- 거리 계산과 `m`/`km` 포맷은 검색 전용 컴포넌트에 중복 구현하지 않고 `ui/src/utils/distance.ts`의 공통 함수로 제공한다.
- 검색 결과 행은 검색 API의 `address`, `addressDetail`, `latitude`, `longitude`를 직접 사용한다. 검색 핀용 레거시 `poiList`의 빈 주소 데이터를 다시 조회하거나 덮어쓰지 않는다.

## 검색 결과 API 계약 확장

`GET /api/v1/search`의 각 `items[]`에 목록 표시와 정렬에 필요한 값을 추가한다.

```ts
interface SearchResultItem {
  id: number;
  name: LocalizedText | null;
  poiId: number;
  poiName: LocalizedText | null;
  address: LocalizedText | null;
  addressDetail: LocalizedText | null;
  latitude: number;
  longitude: number;
  thumbnailUrl: string | null;
  category: {
    id: number;
    name: LocalizedText | null;
    iconKey: string | null;
  } | null;
  congestionStatus: 'none' | 'RELAXED' | 'NORMAL' | 'CROWDED' | 'VERY_CROWDED';
  operation: {
    status:
      | 'OPERATING'
      | 'BREAK'
      | 'BEFORE_OPEN'
      | 'AFTER_CLOSE'
      | 'HOLIDAY'
      | 'OUT_OF_PERIOD'
      | 'NO_INFO';
    nextTransitionAt: string | null;
  };
}
```

- `thumbnailUrl`은 공개·미삭제 시설 파일의 대표 순서가 우선이며, 없으면 공개 카테고리 기본 썸네일을 사용하고 둘 다 없으면 `null`이다.
- `poiId`와 좌표는 공개·미삭제 시설 매핑 중 현재 검색 결과 핀과 동일한 대표 POI에서 가져온다.
- `address`, `addressDetail`도 동일한 대표 POI에서 가져오며 UI에서 현재 언어로 결합한다.
- 혼잡도는 대상지/시설 설정과 현재 혼잡 데이터 매칭 규칙을 거쳐 유효한 네 값만 반환한다. 알 수 없거나 비정상 값은 `none`으로 정규화해 UI에서 배지를 숨긴다.
- `operation`은 유효한 `FacilityOperatingStatus` 캐시를 우선 사용하고, 사용할 수 없으면 공통 snapshot 계산 결과를 사용한다.
- 목록 응답과 `pois`의 `facilityId`, `poiId`, 좌표가 서로 어긋나지 않도록 동일한 대표 매핑 선택 함수를 사용한다.

## 상태 및 이벤트 흐름

```text
검색어/카테고리 선택
  → pageDataStore.loadKeywordSearch()
  → address/addressDetail/latitude/longitude를 포함한 searchResultList 갱신
  → 검색 결과 POI만 publishPoiList()
  → detail/searchResult 상태 + 검색 결과 바텀시트
  → 위치 권한이 이미 granted이면 locationStore가 현재 위치를 한 번 조회
  → Address.svelte가 현재 위치와 대표 POI 좌표로 거리 계산
  → 거리 + 주소 + 상세주소 표시

정렬 라디오 선택
  → setPointSheetUi('max')
  → hours/alphabetical: 즉시 정렬
  → proximity: 위치 권한 확인 → 현재 위치 계산 → 거리순 정렬

시설 목록 선택
  → current.poi/current.facility 설정
  → loadPoiDetail(poiId, facilityId)
  → 시설 상세 화면 전환
  → poiList는 검색 결과 핀 집합 그대로 유지

길찾기 선택
  → 위치 권한 확인 및 현재 위치 갱신
  → routeStore 출발지=currentPosition, 도착지=선택 POI 좌표
  → directions 화면 전환
```

## 변경 대상 파일

### 백엔드

- `src/search/dto/search-response.dto.ts`
  - 검색 목록용 POI명, 주소, 상세주소, 좌표, 썸네일, 혼잡도, 운영 상태 응답 DTO를 추가한다.
- `src/search/search.service.ts`
  - 시설 파일, 카테고리 기본 파일, 운영 상태 캐시, fallback용 운영 스케줄/휴일/기간, 혼잡도 및 대표 POI를 함께 조회하고 응답을 조립한다.
  - 검색 시설의 대표 POI에서 `address`, `addressDetail`, `latitude`, `longitude`를 함께 선택한다.
  - 유효 캐시를 우선 사용하고 누락·만료·비정상 캐시만 공통 snapshot 계산으로 fallback한다.
  - Prisma 조회 단계에서 공개·미삭제 조건을 유지하고 N+1 조회를 만들지 않는다.
- `src/search/search.service.spec.ts`
  - 대표 POI/썸네일 우선순위, 캐시 우선/fallback 운영 상태, 혼잡도 정규화, 응답 매핑을 검증한다.
- `src/pois/facility-operating-status.util.ts`
  - 기존 상태 판정과 함께 `nextTransitionAt`을 반환하는 snapshot 계산 함수를 추가하고 기존 함수는 이를 재사용한다.
- 운영 상태 캐시 DB 및 갱신 작업은 별도 캐시 계획 문서에서 관리한다.

### UI 상태/타입

- `ui/src/types/search.ts`
  - 확장된 검색 응답, 운영 상태, 좌표, 혼잡도 타입을 정의한다.
- `ui/src/stores/pageDataStore.ts`
  - 검색 결과를 임시 `FacilityListResponse`로 채우는 어댑터를 제거하고 검색 전용 타입을 유지한다.
  - 검색 결과 핀 원본과 선택 시설의 대표 POI 좌표가 상세/길찾기 전환 중 유지되도록 한다.
- 신규 위치/경로 상태 모듈 또는 기존 경로 store
  - 현재 위치, 권한/로딩/오류, 출발지·도착지를 관리한다.
  - 이미 허용된 위치 권한은 검색 결과 진입 시 알럿 없이 일회성으로 조회한다.
  - 시설 행별 watcher 대신 단일 `userPosition`을 공유한다.
  - `sheetUiStore.ts`는 수정하지 않는다.
- 신규 검색 정렬 유틸리티
  - 운영시간순 비교, 거리 계산, 가나다순 비교를 순수 함수로 분리한다.

### UI 컴포넌트

- `ui/src/components/svelte/sheet/SearchSheet.svelte`
  - 기존 라디오 선택 이벤트에서 `setPointSheetUi('max')`를 호출한다.
  - 위치 권한 성공 후에만 `proximity`를 확정하고, 실패하면 직전 정렬값으로 되돌린다.
  - TanStack 단일 accessor 정렬 대신 명세의 다중 비교 함수를 적용한다.
  - 결과 행에 필요한 검색 전용 데이터와 시설 선택 이벤트를 연결한다.
- `ui/src/components/svelte/facility/Info.svelte`
  - 기존 `variant="list"` 구조 안에서 시설명 한 줄 말줄임, 선택적 썸네일, 카테고리, 유효 혼잡 배지, 운영 상태, 위치 정보를 바인딩한다.
  - 썸네일이 `null`이면 이미지 영역을 노출하지 않는다.
- `ui/src/components/svelte/facility/Address.svelte`
  - 검색 결과에서는 `searchResultList` 항목의 대표 POI 주소·상세주소·좌표를 직접 사용한다.
  - 실제 사용자 위치가 있을 때만 Haversine 거리를 계산하고 `m`/`km` 단위로 표시한다.
  - 주소와 상세주소를 현재 언어 기준으로 결합한다.
  - 컴포넌트별 `watchPosition()`과 지도 중심 좌표 fallback을 제거한다.
- 공통 알럿 컴포넌트
  - `[P] 위치 정보 허용 알럿`의 확정 문구와 동작을 연결한다.
- `ui/src/components/svelte/sheet/BtnDirections.svelte`
  - 현재 선택 시설의 POI 좌표와 현재 위치를 경로 상태에 넣은 후 길 안내 화면으로 전환한다.
- 지도 핀 소비부
  - 시설 상세 전환 시 `loadPois()`를 다시 호출하지 않고 검색 결과 `poiList`를 유지하는지 확인한다.

## 구현 단계

1. [x] 기존 운영 상태 유틸리티를 `status + nextTransitionAt` snapshot 계산으로 확장하고 기존 POI 호출부의 회귀 테스트를 유지한다.
2. [x] 검색 DTO와 서비스 조회를 확장하고 유효 캐시 우선, 스케줄 계산 fallback으로 대표 POI, 썸네일, 운영 상태, 혼잡도를 조립한다.
3. [x] 백엔드 단위 테스트로 캐시 유효/만료/누락/비정상 분기, 공개 조건, 썸네일 우선순위, 7단계 상태와 혼잡도 처리를 고정한다.
4. [x] UI 검색 타입과 `pageDataStore` 검색 결과 매핑을 확장한다.
5. [x] 운영시간순·가나다순·거리순 비교 함수 및 동률 규칙을 순수 함수로 구현하고 단위 테스트를 작성한다.
6. [x] 위치 권한 요청/거부/실패 상태를 구현하고 가까운순 선택에 연결한다.
7. [x] 정렬 선택 시 `setPointSheetUi('max')`를 호출하되 `sheetUiStore.ts` 파일 자체는 변경하지 않는다.
8. [x] 검색 API와 UI 타입에 대표 POI의 주소, 상세주소와 좌표를 추가한다.
9. [x] 검색 결과 진입 시 이미 허용된 위치 권한만 조용히 재사용해 현재 위치를 메모리 store에 저장한다.
10. [x] 기존 시설 목록 행에 썸네일·카테고리·혼잡·운영·거리·주소·상세주소 데이터를 바인딩한다.
11. [x] 시설 선택 시 상세 화면으로 전환하면서 검색 결과 핀을 유지한다.
12. [x] 길찾기 버튼에서 위치 권한을 재사용하고 출발지/도착지 설정 후 길 안내 화면으로 전환한다.
13. [x] 위치 권한 상태별 안내를 기존 브라우저 기본 알럿으로 제공한다.

## 테스트 항목

### 백엔드

- 공개 POI와 연결된 시설만 검색 목록에 포함된다.
- 시설 썸네일이 카테고리 기본 썸네일보다 우선한다.
- 둘 다 없으면 `thumbnailUrl: null`이다.
- 유효한 혼잡도만 반환하고 비정상 값은 `none`이다.
- 유효하고 만료되지 않은 운영 상태 캐시가 있으면 운영 스케줄을 재계산하지 않고 캐시를 사용한다.
- 캐시 누락, 만료, 알 수 없는 status는 스케줄 snapshot 계산으로 fallback한다.
- 동일 시설에 복수의 활성 캐시 행이 생성되지 않는다.
- 운영 중 → 휴게 → 운영 전 → 운영 종료 → 휴무 → 기간 밖 → 정보 없음 상태 판정이 정확하다.
- 휴게 종료/운영 시작 일시가 대상지 시간대와 자정 경계에서 정확하다.
- 검색 결과의 주소, 상세주소와 좌표가 동일한 대표 POI에서 반환된다.

### UI 단위 테스트

- 운영 상태 우선순위와 상태별 2순위/3순위 정렬을 검증한다.
- 거리 동률에서 운영시간순, 가나다순, ID 순으로 안정화된다.
- 현재 언어 기준 `Intl.Collator` 정렬이 적용된다.
- 위치 권한 허용 시에만 가까운순이 확정된다.
- 권한 거부·위치 조회 실패 시 이전 정렬과 목록이 유지된다.
- 권한이 이미 허용된 경우 검색 결과 진입만으로 현재 위치를 조회하고 권한 알럿을 표시하지 않는다.
- 권한이 `prompt` 또는 `denied`이면 일반 검색에서 위치 요청을 실행하지 않는다.
- 주소·상세주소 빈 값 제거 및 현재 언어 결합이 정확하다.
- 거리 표시는 `0~999m` 구간은 정수 `m`, `1,000m 이상`은 반올림한 소수점 첫째 자리 `km` 규칙을 따른다.
- 여러 시설 행이 렌더링되어도 행별 `watchPosition()`이 생성되지 않는다.
- 비정상 혼잡도와 `none`은 배지가 노출되지 않는다.

### 통합/수동 검증

- 검색 성공 후 검색 결과 시설의 핀만 표시된다.
- 정렬 라디오를 누르면 바텀시트가 최대 높이로 전환된다.
- 시설명은 한 줄을 넘으면 말줄임 처리되고 썸네일이 없으면 이미지 영역이 없다.
- 위치 권한이 허용된 검색 결과는 `거리 · 주소 상세주소`를 함께 표시한다.
- 주소 또는 상세주소만 있는 경우 존재하는 값만 표시하고 둘 다 없으면 위치 행을 숨긴다.
- 시설 선택 후 올바른 시설 상세가 열리고 검색 결과 핀 집합은 유지된다.
- 길찾기에서 현재 위치가 출발지, 선택 POI가 도착지로 설정된다.
- 위치 권한 prompt/허용/거부 및 Geolocation 미지원 환경을 각각 확인한다.

## 검증 명령

```bash
npm test -- src/search/search.service.spec.ts
npm test -- src/pois/facility-operating-status.util.spec.ts
npm run db:validate
npm run db:generate
npm run lint
npm run format:check
npm run build
cd ui && bun test
cd ui && bun run check
cd ui && bun run lint
git diff -- ui/src/stores/sheetUiStore.ts
git diff --check
```

- `ui/src/stores/sheetUiStore.ts` diff는 반드시 비어 있어야 한다.
- 기존 사용자 변경인 `ui/src/pages/map/MapCanvas.astro`의 작업 중 diff는 이 작업에서 덮어쓰거나 함께 포맷하지 않는다.

## 선행 확인 사항

- `[P] 위치 정보 허용 알럿`의 최종 문구, 버튼 구성, OS 설정 이동 안내 범위를 확정해야 한다.
- 카테고리 default 썸네일에 해당하는 실제 DB 컬럼과 공개/정렬 규칙을 확인해야 한다.
- 검색 결과 위치 정보는 `현재 위치 기준 거리 + 주소 + 상세주소` 조합으로 확정한다. POI명은 응답에 유지하되 현재 위치 행에는 표시하지 않는다.
- 길 안내 화면이 내부 경로 계산을 사용하는지 외부 지도 딥링크를 사용하는지 확인해야 한다. 본 계획은 현재 `directions` 화면의 내부 경로 상태를 우선한다.

## 제외 범위

- AI 추천과 인기 검색의 순위 산정 변경
- 검색 결과 서버 페이지네이션 또는 무한 스크롤 API 도입
- 사용자 위치의 서버 저장 및 검색 기록과의 결합
- 지도 엔진의 실제 경로 탐색 알고리즘 신규 개발
- 도보·차량 경로 기반 실제 이동거리와 예상 이동시간 계산
- `sheetUiStore.ts`의 구조, snap point 계산 및 스타일 변경
- 공통 위치 권한 모달 신규 추가와 기존 화면 DOM/CSS 변경
