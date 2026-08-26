---
status: implemented
scope: ui
domain: pois
created: 2026-08-25
---

# 길찾기 경로 바운드에서 위아래 UI 가림 제외

선행 계획 `2026-08-24-walking-directions-button-and-search.md`가 도보 경로를 지도에 그린다. 이 계획은 경로 `fitBounds`가 위 길찾기 헤더와 아래 거리 안내 패널에 가리지 않게 맞추는 범위를 적는다.

## 목표

- 도보 경로가 나오면 지도 바운드를 경로 좌표에 맞춘다.
- 맞출 때 화면 전체가 아니라, 위 헤더와 아래 안내 패널이 가리는 영역을 뺀 지도에 넣는다.
- 헤더·패널 높이는 그려진 DOM에서 읽고, 아직 없으면 퍼블 크기에 가까운 기본값을 쓴다.
- 퍼블 레이아웃과 `sheetUiStore.ts`는 바꾸지 않는다.

```text
경로 FeatureCollection
  → 폴리라인 표시
  → 위 헤더·아래 DistanceGuide 높이 측정
  → 가린 픽셀만큼 위경도 바운드 확장
  → fitBounds
```

## 변경 대상 파일

- `ui/src/utils/map-bounds.ts` (신규)
  - `boundsFromPoints`: 경로 점의 최소·최대 좌표
  - `expandBoundsForOverlayPadding`: 맵 크기와 상하좌우 패딩(px)으로 바운드 확장
  - `measureWalkingRouteOverlayPadding`: 고정 헤더·하단 패널 높이 측정. 없으면 top 80 / bottom 148 / 좌우 24
- `ui/src/utils/map-bounds.test.ts` (신규)
  - 위아래·좌우 패딩 확장과 점 범위 계산
- `ui/src/events/mapEvent.ts`
  - `drawWalkingRoute` 후 두 프레임 뒤에 `fitWalkingRouteInVisibleArea`
  - `clearWalkingRoute`에서 예약된 fit 프레임도 취소

## 구현 단계

1. 경로 좌표의 raw bounds를 구한다.
2. 맵 컨테이너 크기와 위 헤더·아래 `div.fixed.bottom-0` 높이를 읽는다. 없으면 fallback을 쓴다.
3. 가린 높이/너비 비율만큼 위경도를 늘린 바운드로 `fitBounds`한다.
4. 안내 패널은 경로 상태 갱신 뒤에 그려지므로 `requestAnimationFrame`을 두 번 기다린다.

## 테스트 유형

- 위 80px·아래 160px일 때 위도 확장량이 `span * (H / visibleH) * padding / H`인지
- 좌우 패딩이 경도만 늘리는지
- 점 목록에서 min/max lat·lng가 나오는지

## 검증 명령

```bash
cd ui && bun test src/utils/map-bounds.test.ts
git diff -- ui/src/stores/sheetUiStore.ts
```

## 위험 요소

- TMAP `fitBounds` 패딩 인자는 문서가 불안정해서 쓰지 않는다. 좌표 확장으로만 여백을 만든다.
- 하단 패널을 `div.fixed.bottom-0`으로 찾는다. 높이 제한(맵의 45%)을 넘는 요소는 무시한다.
- 패널이 늦게 뜨면 fallback 높이로 한 번 맞춘다. 실제 높이와 다르면 여백이 조금 남거나 부족할 수 있다.
- `sheetUiStore.ts`와 퍼블 마크업은 변경하지 않는다.

## 제외 범위

- 차량 길찾기 바운드
- 턴바이턴 목록 UI
- 시트 스냅 높이 변경
- TMAP SDK `fitBounds` 패딩 옵션 연동
