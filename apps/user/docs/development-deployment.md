# 개발 서버 CI/CD

`ci.yml`은 `develop` 대상 PR에서 GitHub-hosted runner로 API와 UI 검사를 독립적으로 실행합니다. `deploy-development.yml`은 `develop`에 병합된 커밋에서 같은 reusable CI workflow를 다시 통과한 뒤 CMS와 동일한 개발 서버의 `self-hosted-visit` runner에서 API와 UI 이미지를 모두 빌드하고 Docker Compose 서비스를 함께 갱신합니다. `main` CI/CD는 이번 개발 배포 범위에 포함하지 않습니다.

## CMS와 공유하는 개발 서버

이 배포는 `visit_servant_cms`와 동일한 Docker 호스트를 사용하지만 다음 리소스를 분리합니다.

| 구분             | Front                                  | CMS                                  |
| ---------------- | -------------------------------------- | ------------------------------------ |
| Compose 프로젝트 | `visit-servant-front-development`      | `visit-servant-cms`                  |
| 환경 파일        | `/app/visit_servant_front/.env.docker` | `/app/visit_servant_cms/.env.docker` |
| 기본 공개 포트   | API `3011`, UI `5195`                  | API `3001`, UI `5194`                |
| Docker 네트워크  | 프로젝트 전용 `app`                    | 프로젝트 전용 `app`                  |

Compose 프로젝트가 다르므로 서비스·네트워크 이름이 분리됩니다. Front 배포에서는 공유 호스트의 CMS 이미지를 건드릴 수 있는 전역 `docker image prune`을 실행하지 않습니다.

## GitHub 설정

저장소에 `development` Environment를 만들고 deployment branch에는 `develop`만 허용합니다. 배포 job은 기존 개발 서버 runner의 `self-hosted`, `Linux`, `X64`, `self-hosted-visit` 라벨을 사용하므로 별도 SSH Secret은 필요하지 않습니다.

`develop` 브랜치 보호 규칙에는 `API`와 `UI` 상태 검사를 모두 필수로 등록해야 CI를 통과하지 않은 PR의 병합을 막을 수 있습니다. PR 코드는 서버 권한을 가진 self-hosted runner에서 실행하지 않고, 병합된 `develop` 코드만 배포 job에서 실행합니다.

2026-08-20 확인 기준으로 `deepfine/visit_servant_front` 저장소에서 사용 가능한 self-hosted runner는 0대입니다. 최초 병합 전에 다음 중 하나를 완료해야 합니다.

- CMS 서버 runner를 organization runner로 등록하고 Front 저장소 접근을 허용합니다.
- 같은 물리 서버에 Front 저장소 전용 runner 서비스와 작업 디렉터리를 별도로 등록합니다.

어느 방식을 사용하든 `self-hosted-visit` 라벨과 Docker 실행 권한이 필요합니다. 저장소 전용 runner를 추가할 때 CMS runner의 등록 정보나 작업 디렉터리를 동시에 재사용하지 않습니다.

## 개발 서버 준비

서버에는 Docker Engine과 `docker compose` 플러그인이 설치되어 있어야 합니다. `self-hosted-visit` runner 서비스 사용자는 Docker 실행 권한과 아래 환경 파일 읽기 권한이 필요합니다.

`.env.docker.example`을 `/app/visit_servant_front/.env.docker`로 복사한 뒤 실제 개발 서버 값으로 교체합니다. 완성된 파일은 서버에서만 관리하고 Git에 포함하지 않습니다. CMS의 `/app/visit_servant_cms/.env.docker`를 재사용하지 않습니다. 배포 명령은 이 파일을 Compose `--env-file`과 각 서비스의 `env_file`로 함께 사용하므로 런타임 설정과 포트 보간에 모두 적용됩니다.

```dotenv
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public
CORS_ALLOWED_ORIGINS=https://dev.example.com
TRUST_PROXY_HOPS=1
AWS_S3_PUBLIC_BASE_URL=https://dev-assets.example.com
UI_API_LEGACY_TARGET=http://192.168.1.120:3001
UI_API_LEGACY_LOGIN_ACCOUNT=LEGACY_ACCOUNT
UI_API_LEGACY_PASSWORD=LEGACY_PASSWORD
TMAP_APP_KEY=TMAP_APP_KEY
```

필요하면 외부 공개 포트를 변경할 수 있습니다.

```dotenv
API_BIND_ADDRESS=127.0.0.1
API_PORT=3011
UI_BIND_ADDRESS=127.0.0.1
UI_PORT=5195
```

기본 바인딩은 loopback이므로 외부 접속에는 서버의 Nginx 또는 다른 reverse proxy 설정이 필요합니다. 애플리케이션 비밀값과 데이터베이스 자격 증명은 Git 저장소나 GitHub Actions 로그에 기록하지 않습니다.

LAN에서 직접 접근해야 하고 방화벽 정책상 허용된 경우에만 API 또는 UI의 bind address를 `0.0.0.0`으로 변경합니다.

## 실행 흐름

1. `develop` 대상 PR에서 `API`와 `UI` 검사를 병렬 실행합니다.
2. 두 필수 상태 검사가 모두 성공한 PR만 `develop`에 병합합니다.
3. `develop` push에서 두 검사를 다시 실행합니다.
4. `self-hosted-visit` runner에서 API와 UI runtime 이미지를 모두 빌드합니다.
5. 두 이미지 빌드가 모두 성공한 경우에만 Front 전용 Compose 프로젝트를 `docker compose up --wait`로 함께 갱신합니다.

이 저장소의 배포는 동시에 하나만 실행되며, 이미 시작된 배포는 이후 push가 들어와도 취소하지 않습니다. GitHub concurrency는 저장소 단위이므로 CMS 배포와 동시에 실행될 수 있으며, 최초 운영 확인 시 CPU·메모리·Docker build 부하를 함께 점검합니다.
