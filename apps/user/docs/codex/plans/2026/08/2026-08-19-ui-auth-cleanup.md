---
status: implemented
scope: frontend
domain: auth
created: 2026-08-19
---

# UI 비로그인 전환을 위한 인증 흔적 정리

## 목표

- 현재 UI에서 사용하지 않는 인증 타입과 Express 요청 확장을 제거합니다.
- JSON Server의 로그인 사용자 mock 라우트와 인증 데이터를 제거합니다.
- 공개 API 요청이 인증 쿠키를 명시적으로 포함하지 않도록 정리합니다.
- 기존 화면 구성, 컴포넌트, 사용자 인터랙션은 변경하지 않습니다.

## 변경 대상 파일

- `ui/src/types/auth.ts`
  - 사용되지 않는 로그인, 사용자, 권한, JWT 타입을 삭제합니다.
- `ui/src/types/express.d.ts`
  - JWT 사용자 정보를 주입하던 Express `Request` 타입 확장을 삭제합니다.
- `ui/src/mocks/routes.json`
  - `/auth/me`를 인증 mock 데이터에 연결하던 라우트 파일을 삭제합니다.
- `ui/src/mocks/db.json`
  - 로그인 사용자, 접근 대상지, 메뉴 권한을 포함한 최상위 `auth` mock 데이터를 제거합니다.
- `ui/package.json`
  - 삭제한 mock routes 파일을 참조하지 않도록 `mock` 명령을 정리합니다.
- `ui/src/stores/pageDataStore.ts`
  - 대상지, POI, 시설 API 요청에서 `credentials: 'include'` 옵션을 제거합니다.

## 구현 단계

1. UI 소스에서 로그인, JWT, 인증 쿠키, `/auth` 참조를 확인합니다.
2. 실제 사용처가 없는 인증 타입과 Express 타입 확장 파일을 삭제합니다.
3. JSON Server의 `/auth/me` 라우트와 `auth` 응답 데이터를 삭제합니다.
4. mock 실행 명령에서 삭제된 routes 파일 참조를 제거합니다.
5. 공개 데이터 요청에 명시된 인증 쿠키 포함 옵션을 제거합니다.
6. JSON 유효성, 인증 참조 잔존 여부, Git diff 형식을 검증합니다.

## 구현 결과

- UI 소스의 로그인, JWT, `/auth` 및 명시적인 인증 쿠키 포함 코드가 제거되었습니다.
- JSON Server는 인증 전용 routes 파일 없이 기존 공개 데이터 mock을 제공합니다.
- 화면 컴포넌트와 화면 인터랙션 코드는 변경하지 않았습니다.

## 검증 항목

```bash
node -e "JSON.parse(require('fs').readFileSync('ui/src/mocks/db.json', 'utf8'))"
rg -n -i "auth|login|logout|jwt|credentials\\s*:|/auth" ui/src ui/package.json
git diff --check
```

## 제외 범위

- 화면 레이아웃과 스타일
- Svelte 및 Astro 컴포넌트
- 버튼, 지도, 목록 등 사용자 인터랙션
- 일반 API 프록시와 백엔드 연결 경로 변경
- TMAP 프록시 구현 변경
