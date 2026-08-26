---
status: draft
scope: fullstack
domain: workflow
created: 2026-08-20
---

# Front API·UI CI 및 공유 개발 서버 자동 배포

## 목표

- `develop` 대상 PR에서 API와 UI 검사를 각각 실행하고 실패한 변경의 병합을 차단할 수 있게 합니다.
- `develop` 병합 후 CMS와 동일한 `192.168.1.120` 개발 서버의 `self-hosted-visit` runner에서 Front API와 UI를 함께 자동 배포합니다.
- CMS와 Front의 Compose 프로젝트, 환경 파일, 포트, 네트워크를 분리해 같은 Docker 호스트에서 충돌 없이 운영합니다.
- 기존 UI 기능 코드는 변경하지 않고 UI 검증·이미지·Compose 서비스만 배포 범위에 포함합니다.

## 현재 서버 구성과 격리 원칙

- CMS는 Compose 프로젝트 `visit-servant-cms`, 환경 파일 `/app/visit_servant_cms/.env.docker`, API 포트 `3001`, UI 포트 `5194`를 사용합니다.
- Front는 Compose 프로젝트 `visit-servant-front-development`, 환경 파일 `/app/visit_servant_front/.env.docker`, API 포트 `3011`을 사용합니다.
- 두 프로젝트의 `app` 네트워크는 Compose 프로젝트 접두사로 서로 다른 Docker 네트워크가 됩니다.
- Front 배포 명령은 Front Compose 파일에만 적용하고 공유 호스트 전체의 image/container prune은 실행하지 않습니다.
- PR 검증은 GitHub-hosted runner에서 수행하고, 서버 권한이 있는 self-hosted runner는 병합된 `develop` 배포에만 사용합니다.
- 2026-08-20 GitHub API 확인 기준 Front 저장소에서 접근 가능한 self-hosted runner는 0대이므로, 최초 병합 전에 CMS 서버 runner의 organization 공유 또는 Front 전용 runner 등록이 필요합니다.
- UI PR #10을 재오픈하고 최신 `develop`을 반영한 뒤 병합하여 UI 소스를 CI/CD 작업의 기반으로 사용합니다.

## 변경 대상 파일

- `.github/workflows/ci.yml`
  - `develop` 대상 PR에서 API/UI 검사를 실행하고 개발 배포 workflow에서 재사용합니다.
- `.github/workflows/deploy-development.yml`
  - `develop` push 이후 CI workflow를 호출하고 성공한 경우에만 self-hosted 개발 배포를 실행합니다.
- `Dockerfile`
  - Node.js 22 기반 API build/runtime 다단계 이미지를 정의합니다.
- `.dockerignore`
  - API 이미지 빌드에 필요하지 않은 파일을 제외합니다.
- `.env.docker.example`
  - Front API/UI 개발 배포에 필요한 런타임 값과 호스트 포트 기본값을 제공합니다.
- `Dockerfile.ui`
  - 기존 `ui/` 소스를 빌드하고 Astro standalone server를 실행하는 UI runtime 이미지를 정의합니다.
- `deploy/compose.development.yml`
  - Front 전용 프로젝트명과 API/UI 이미지, 환경 파일, 포트, healthcheck, 내부 네트워크를 정의합니다.
- `.prettierignore`
  - 루트 API 검사에서 별도 UI 프로젝트 생성물을 제외합니다.
- `package-lock.json`
  - Docker의 npm 10에서 `npm ci`가 요구하는 누락된 optional peer 항목을 보완합니다.
- `docs/development-deployment.md`
  - 서버 준비, 격리 규칙, GitHub 설정, 배포 흐름을 문서화합니다.
- `docs/codex/plans/2026/08/2026-08-20-development-ci-deployment.md`
  - 구현 계획, 검증, 위험 요소와 제외 범위를 기록합니다.

## 구현 단계

1. `develop` 최신 커밋에서 인프라 작업 브랜치를 생성합니다.
2. UI PR #10을 재오픈해 UI 소스를 `develop`에 먼저 반영합니다.
3. 루트 API Prettier에서는 `ui/`를 제외하되 UI job에서 UI 자체 formatter, test, production build를 실행합니다.
4. API와 UI runtime Dockerfile 및 Front 전용 development Compose를 작성합니다.
5. UI가 Compose 내부 주소로 API를 호출하고, 외부에는 Front UI 전용 포트로 노출되게 구성합니다.
6. 배포 job을 CMS와 동일한 `self-hosted-visit` runner로 구성합니다.
7. `/app/visit_servant_front/.env.docker`의 존재와 Docker 권한을 컨테이너 교체 전에 확인합니다.
8. 같은 물리 서버의 runner를 Front 저장소에서 사용할 수 있도록 organization 공유 또는 별도 runner 등록을 준비합니다.
9. API/UI Compose config와 두 이미지 build가 성공한 뒤에만 `up -d --wait`를 실행합니다.
10. CMS와 구분되는 프로젝트명·포트·네트워크 및 실패 상태 조회 범위를 검증합니다.
11. API/UI 전체 검사, YAML/Compose 파싱, 실제 Docker 이미지 build와 smoke를 실행합니다.

## 테스트 유형

- ESLint와 Prettier 정적 검사
- 스크립트 및 API 단위 테스트
- NestJS build와 E2E 테스트
- UI formatter, Bun test와 Astro production build
- GitHub Actions 및 Compose YAML 파싱
- development Compose config 검증
- API/UI runtime Docker 이미지 build
- 최초 병합 후 self-hosted runner의 API readiness와 UI HTTP smoke 검증

## 검증 명령

```bash
npm run check
cd ui && bun install --frozen-lockfile
cd ui && bun run fmt:check && bun test
cd ui && bun x paraglide-js compile --project ./project.inlang --outdir ./src/paraglide && bun x astro build
npx prettier --check .github/workflows/ci.yml .github/workflows/deploy-development.yml deploy/compose.development.yml docs/development-deployment.md
DOCKER_ENV_FILE=../.env.docker.example API_IMAGE=visit-servant-front-api:test UI_IMAGE=visit-servant-front-ui:test \
  docker compose --env-file .env.docker.example -f deploy/compose.development.yml config --quiet
DOCKER_ENV_FILE=../.env.docker.example \
  docker compose --env-file .env.docker.example -f deploy/compose.development.yml build
git diff --check
```

## 현재 확인 결과

- API unit 10 suites/50 tests와 E2E 27 tests를 포함한 `npm run check`가 통과했습니다.
- UI formatter, Bun test, Astro production build가 통과했습니다.
- Docker npm 10의 lockfile 누락 항목을 보완한 뒤 API와 UI runtime 이미지 build가 모두 통과했습니다.
- UI runtime 이미지의 HTTP 응답과 Docker healthcheck `healthy` 상태를 확인했습니다.
- Front 전용 Compose config와 workflow/Compose YAML 파싱이 통과했습니다.
- UI PR #10이 `develop`에 병합되었고 CI/CD 브랜치를 해당 merge commit으로 갱신했습니다.
- API와 UI 검사를 reusable CI workflow의 별도 job으로 실행하고 두 job 성공 후에만 개발 배포 workflow의 배포 job이 실행됩니다.
- 배포 job은 API와 UI 이미지 빌드를 모두 완료한 뒤 Compose 서비스를 함께 갱신합니다.
- GitHub API로 Front 저장소의 self-hosted runner가 아직 0대임을 확인하고, 최초 배포 선행 조건으로 문서화했습니다.
- 실제 서버 배포와 readiness 확인은 workflow가 `develop`에 병합된 뒤 최초 실행에서 검증합니다.

## 위험 요소

- GitHub concurrency group은 저장소 단위이므로 CMS와 Front 이미지 build가 동시에 실행되어 공유 서버 자원을 경합할 수 있습니다.
- 기본 바인딩 API `127.0.0.1:3011`, UI `127.0.0.1:5195`는 reverse proxy를 전제로 하며, 직접 LAN 공개가 필요하면 서버 환경 파일에서 명시적으로 변경해야 합니다.
- readiness는 실제 PostgreSQL 연결에 의존하므로 DB 또는 네트워크 장애 시 새 컨테이너 배포가 실패합니다.
- 첫 버전에는 자동 rollback이 없으며, 실패 시 Front Compose 상태를 출력하고 기존 이미지 복구는 운영자가 수행합니다.
- self-hosted runner의 Docker 권한은 서버 제어 권한과 유사하므로 `develop` 보호 규칙이 필수입니다.
- Front 저장소에서 접근 가능한 runner를 등록하지 않고 병합하면 deploy job이 runner를 기다리며 시작되지 않습니다.
- 현재 UI의 `check` 스크립트는 선언되지 않은 `svelte-kit` 실행 파일에 의존하고 `lint`에는 기존 오류가 남아 있어, 첫 UI CI는 formatter·Bun test·production build를 필수 검사로 사용합니다. 타입 검사와 lint 활성화는 UI 코드 정리 PR에서 별도로 처리해야 합니다.

## 제외 범위

- 기존 `ui/` 화면·컴포넌트·비즈니스 로직 변경
- CMS Compose 파일과 CMS 컨테이너 변경
- PostgreSQL schema migration 또는 `prisma db push`
- reverse proxy, DNS, TLS, 방화벽 설정
- 자동 rollback, blue-green 또는 무중단 배포
- GitHub Environment와 branch protection의 실제 생성·변경
- self-hosted runner의 organization/repository 등록과 서비스 설치
