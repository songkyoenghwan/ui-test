---
status: implemented
scope: ui
domain: map
created: 2026-08-25
---

# 지도 회전만 TMAP 생성 옵션으로 풀기

방문자 지도는 `lockView()`가 Rotate/Drag/Zoom마다 bearing을 0으로 되돌려 회전이 막혀 있다. 이 계획은 그 잠금을 제거하고, TMAP Map 생성 옵션으로 회전만 허용한다.

## 목표

- `/map`에서 두 손가락 회전이 되고, 손을 떼도 북쪽으로 강제되지 않는다.
- 기울기(pitch)는 0으로 유지한다.
- 한 손가락 이동, 핀치 줌, 마커 클릭은 그대로 둔다.

```text
Tmapv3.Map 생성
  → dragRotate / touchZoomRotate 켜기
  → touchPitch / pitchWithRotate / maxPitch 0
  → lockView 없음
```

## 변경 대상 파일

- `ui/src/events/mapEvent.ts`
  - Map 생성 옵션에 회전 on / 기울기 off 키 추가
  - `lockView()` 호출·메서드와 `isViewLocked` 제거
- `docs/codex/plans/2026/08/2026-08-25-map-rotation-tmap-options.md`
  - 이 계획

## 구현 단계

1. `new Tmapv3.Map`에 `dragRotate`, `touchZoomRotate`, `pitchWithRotate`, `touchPitch`, `pitch`, `maxPitch`를 넣는다.
2. `ConfigLoad`와 `setCenterCoordinates()`의 `lockView()` 호출을 뺀다.
3. 쓰이지 않는 `lockView`와 `isViewLocked`를 삭제한다.

## 테스트 유형

- 브라우저 수동: 회전 가능, 기울기 불가, 이동·줌·마커 클릭 유지

## 검증 명령

```bash
git diff -- ui/src/stores/sheetUiStore.ts
```

## 위험 요소

- TMAP Vector JS가 Mapbox GL 계열 제스처 옵션을 무시하면 회전이 기본값에 의존한다. `lockView`를 제거했으므로 기본이 회전 허용이면 동작한다.
- `maxPitch: 0`이 무시되면 기울기가 열릴 수 있다.

## 제외 범위

- CMS `mapEvent.ts` / `mapStore.ts`
- 줌 범위, 줌 컨트롤 UI
- 대상지별 지도 옵션 플래그
- `setMapInteractionLocked` 오버레이 캡처 잠금
- `sheetUiStore.ts`와 퍼블 레이아웃
