---
status: implemented
scope: ui
domain: search
created: 2026-08-24
---

# 검색 시설 위치 권한별 거리·주소 표시

## 목표

- 검색 결과 시설 목록의 위치 행을 브라우저 위치 권한 상태에 맞게 표시한다.
- 위치 권한이 허용되지 않은 경우 거리, 주소, 상세주소를 모두 숨기고 `usr_map_002_44` 문구만 표시한다.
- 위치 권한이 허용된 경우 기존 현재 위치 기준 거리와 주소·상세주소 표시를 유지한다.
- 기존 `Address.svelte`의 위치 행 DOM 구조, 클래스와 스타일은 변경하지 않는다.

## 표시 계약

| 위치 상태                              | 표시 내용                                    |
| -------------------------------------- | -------------------------------------------- |
| `granted`이고 현재 위치·시설 좌표 있음 | `거리 · 주소 상세주소`                       |
| `granted`이나 거리 계산 불가           | 기존 주소·상세주소 fallback                  |
| `prompt`                               | `usr_map_002_44`만 표시                      |
| `denied`                               | `usr_map_002_44`만 표시                      |
| `unsupported`                          | `usr_map_002_44`만 표시                      |
| `unknown`                              | 권한 확인 전이므로 기존 주소 fallback을 유지 |

- 권한 미허용 상태에서는 주소나 상세주소 데이터가 있어도 노출하지 않는다.
- `usr_map_002_44`는 현재 언어의 Paraglide 메시지를 사용한다.
- 한국어 문구는 `위치 권한이 없어요`다.
- 권한 상태 변경으로 `granted`가 되면 같은 행에서 기존 거리·주소 표시로 자동 전환한다.

## 변경 대상 파일

- `ui/src/components/svelte/facility/Address.svelte`
  - 권한 미허용 여부를 주소 유무와 무관하게 판정한다.
  - 권한 미허용 시 거리·주소 분기를 건너뛰고 `usr_map_002_44`만 바인딩한다.
- `docs/codex/plans/2026/08/2026-08-24-search-result-sorting-facility-list.md`
  - 기존 주소 fallback 계약을 새 권한 표시 계약으로 갱신한다.

## 구현 단계

1. `prompt`, `denied`, `unsupported`를 위치 권한 미허용 상태로 정의한다.
2. 권한 미허용 상태에서는 위치 행을 항상 노출한다.
3. 기존 위치 아이콘과 행 class를 유지하면서 `usr_map_002_44`만 표시한다.
4. `granted` 또는 `unknown`에서는 기존 거리·주소 계산과 표시를 유지한다.
5. UI 포맷, 테스트와 Astro 빌드를 검증한다.

## 테스트 유형

- `prompt`, `denied`, `unsupported`에서 주소 데이터 유무와 관계없이 권한 문구만 표시
- `granted`에서 거리와 주소·상세주소 표시 유지
- 권한 문구의 현재 언어 메시지 적용
- 기존 위치 행 class와 `sheetUiStore.ts` 무변경 확인

## 검증 명령

```bash
cd ui && bun run fmt:check
cd ui && bun test
cd ui && bun x astro build
git diff -- ui/src/stores/sheetUiStore.ts
git diff --check
```

## 위험 요소

- 권한 확인 전 `unknown` 상태를 미허용으로 취급하면 화면 진입 직후 권한 문구가 잠깐 표시될 수 있으므로 기존 주소 fallback을 유지한다.
- Permissions API 미지원 환경은 실제 브라우저 권한 여부를 선확인할 수 없으므로 현재 정책대로 `unsupported` 안내를 표시한다.

## 제외 범위

- 위치 권한 요청 알럿과 브라우저 설정 이동 방식 변경
- 거리 계산 공식과 단위 포맷 변경
- 주소·상세주소 API 계약 변경
- 위치 행 DOM 구조, class와 스타일 변경
