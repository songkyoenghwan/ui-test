# Visit Servant Front API

관광 서비스의 사용자용 API 서버입니다. 공통 HTTP 계약과 운영 기반은 구성되어 있지만, 실제 비즈니스 도메인은 현재 개발 초기 단계입니다.

## 한눈에 보기

| 항목         | 내용                                                   |
| ------------ | ------------------------------------------------------ |
| Runtime      | Node.js 22 이상, NestJS 11, TypeScript                 |
| Database     | PostgreSQL, Prisma ORM 7, `@prisma/adapter-pg`         |
| API base URL | `http://localhost:3011/api/v1`                         |
| API 문서     | `http://localhost:3011/docs` (개발·테스트 환경만 제공) |
| 상태 확인    | `/health/live`, `/health/ready`                        |
| 전체 검증    | `npm run check`                                        |
| DB 운영 방식 | Database-first (`db pull`), Prisma migration 사용 금지 |

### 현재 구현 상태

- 공통 성공·오류 응답 형식, DTO 검증, 페이지네이션
- 요청 ID 전달·생성 및 구조화된 요청 로그
- CORS, Helmet, URI 버전 관리, 요청 제한
- Liveness 및 PostgreSQL readiness 확인
- Scalar UI와 OpenAPI JSON
- Prisma 연결 풀과 Nest 생명주기 연동
- ESLint, Prettier, Jest, E2E, Husky Git hooks
- POI 도메인은 module/controller/service 뼈대만 존재하며 실제 endpoint는 아직 없습니다.

## 빠른 시작

### 1. 요구사항

- Node.js `>=22`
- npm `>=10`
- 접근 가능한 PostgreSQL 데이터베이스

### 2. 설치 및 환경 설정

```bash
npm ci
cp .env.example .env
```

`.env`의 `DATABASE_URL`을 실제 연결 문자열로 변경합니다. `.env`에는 비밀번호와 API 키가 포함될 수 있으므로 커밋하지 않습니다.

> **DB 접속 정보가 없는 경우**
>
> 프로젝트 관리자 또는 백엔드 담당자에게 개발 DB 주소, 계정, 접근 허용 여부와 VPN 필요 여부를 요청하세요. 전달받은 값은 로컬 `.env` 또는 팀에서 승인한 secret 관리 도구에만 저장합니다. README, Issue, PR, 채팅, 커밋에는 실제 연결 문자열이나 자격 증명을 남기지 않습니다.

### 3. Prisma Client 생성 및 서버 실행

```bash
npm run db:generate
npm run start:dev
```

서버가 실행되면 아래 주소를 확인합니다.

- API: `http://localhost:3011/api/v1`
- Scalar: `http://localhost:3011/docs`
- OpenAPI JSON: `http://localhost:3011/docs/json`
- Liveness: `http://localhost:3011/health/live`
- Readiness: `http://localhost:3011/health/ready`

`/docs`와 `/docs/json`은 `NODE_ENV=production`에서 생성되지 않습니다. Readiness는 실제 DB 연결이 불가능하면 `503`을 반환합니다.

## 요청 처리 흐름

```text
HTTP request
  → RequestContextMiddleware (x-request-id)
  → ThrottlerGuard
  → RequestLoggingInterceptor
  → ResponseEnvelopeInterceptor
  → ClassSerializerInterceptor
  → Controller → Service → PrismaService → PostgreSQL
  → GlobalExceptionFilter (오류 발생 시)
```

부트스트랩, CORS, Helmet, API prefix, 버전 관리, ValidationPipe, Swagger 설정은 `src/config/application.ts`에 모여 있습니다. 전역 guard/interceptor/filter 등록은 `src/app.module.ts`에서 관리합니다.

## HTTP 계약

### 성공 응답

컨트롤러는 비즈니스 데이터만 반환합니다. 전역 interceptor가 응답을 감싸므로 컨트롤러에서 `{ success, data }`를 직접 만들지 않습니다.

```json
{
  "success": true,
  "data": {}
}
```

`bigint`는 응답 경계에서 문자열로 변환됩니다. `204`, `StreamableFile`, health endpoint는 일반 응답 wrapping 규칙의 예외입니다.

### 오류 응답

```json
{
  "success": false,
  "statusCode": 400,
  "code": "VALIDATION_ERROR",
  "message": "요청 값이 올바르지 않습니다.",
  "details": {
    "page": ["page must not be less than 1"]
  }
}
```

예상 가능한 도메인 오류는 `AppException`과 `src/common/constants/error-code.constant.ts`의 안정적인 오류 코드를 사용합니다. 알 수 없는 서버 오류 메시지와 stack trace는 클라이언트에 노출하지 않습니다.

### 페이지네이션

목록 API는 `PaginationQueryDto`를 재사용합니다.

| Query      | 기본값 | 허용 범위 |
| ---------- | -----: | --------: |
| `page`     |    `1` |    1 이상 |
| `pageSize` |   `10` |     1–100 |

```json
{
  "success": true,
  "data": {
    "items": [],
    "totalCount": 0,
    "page": 1,
    "pageSize": 10,
    "totalPages": 0
  }
}
```

## 프로젝트 구조

```text
src/
├── common/       공통 decorator, exception, filter, interceptor, pagination
├── config/       환경 설정, HTTP bootstrap, Swagger
├── database/     공유 PrismaModule/PrismaService
├── generated/    생성된 Prisma Client (수정·커밋 금지)
├── health/       liveness/readiness endpoint
├── pois/         POI 도메인 뼈대 (endpoint 미구현)
├── app.module.ts 전역 module/provider 연결
└── main.ts       애플리케이션 시작점
prisma/
└── schema.prisma DB에서 introspection한 Prisma schema
test/
└── app.e2e-spec.ts 공통 HTTP 계약 E2E
```

새 기능은 `src/<plural-kebab-case-domain>`에 두고 controller는 HTTP 계약과 service 호출만 담당합니다. 비즈니스 규칙은 service에, 공통 기능은 `src/common` 또는 `src/config`에 둡니다.

## Prisma와 데이터베이스

이 프로젝트는 **database-first**입니다. 실제 PostgreSQL schema가 source of truth입니다.

```text
PostgreSQL schema 변경
  → npm run db:pull
  → @map/@@map 및 introspection diff 검토
  → npm run db:validate
  → npm run db:generate
  → 애플리케이션 코드와 테스트 수정
```

Prisma API에서는 단수 PascalCase model과 camelCase field를 사용하고, 기존 PostgreSQL의 snake_case 테이블·컬럼은 `@@map`과 `@map`으로 보존합니다.

```prisma
model TourDestination {
  id        Int     @id
  createdAt DateTime @map("created_at")

  @@map("tour_destinations")
}
```

주의사항:

- `prisma migrate`, `prisma db push`를 사용하지 않습니다.
- `prisma/migrations` 파일을 만들거나 커밋하지 않습니다.
- `src/generated/prisma`는 직접 수정하지 않습니다.
- `db:pull` 후 기존 Prisma-side 이름과 `@map`/`@@map`이 유지되는지 반드시 검토합니다.

## 환경 변수

| 변수                       | 필수   | 기본값        | 설명                                |
| -------------------------- | ------ | ------------- | ----------------------------------- |
| `DATABASE_URL`             | 예     | 없음          | PostgreSQL 연결 문자열              |
| `NODE_ENV`                 | 아니요 | `development` | `development`, `test`, `production` |
| `PORT`                     | 아니요 | `3011`        | HTTP 포트                           |
| `API_PREFIX`               | 아니요 | `api`         | 전역 API prefix                     |
| `CORS_ALLOWED_ORIGINS`     | 아니요 | 빈 값         | 쉼표로 구분한 Origin allowlist      |
| `TRUST_PROXY_HOPS`         | 아니요 | `0`           | 신뢰할 reverse proxy hop 수         |
| `RATE_LIMIT_TTL_MS`        | 아니요 | `60000`       | 요청 제한 구간(ms)                  |
| `RATE_LIMIT_MAX`           | 아니요 | `100`         | 구간 내 최대 요청 수                |
| `DB_POOL_MAX`              | 아니요 | `10`          | DB pool 최대 연결 수                |
| `DB_CONNECTION_TIMEOUT_MS` | 아니요 | `5000`        | DB 연결 timeout(ms)                 |
| `DB_IDLE_TIMEOUT_MS`       | 아니요 | `30000`       | 유휴 연결 timeout(ms)               |

`.env.example`에는 Google Cloud, Google Maps, AWS S3, TMAP용 변수도 준비되어 있지만 현재 `src`에서는 아직 사용하거나 Joi로 검증하지 않습니다. 해당 연동을 구현할 때 config namespace와 환경 검증을 함께 추가해야 합니다.

## 개발 명령어

| 명령어                 | 설명                                         |
| ---------------------- | -------------------------------------------- |
| `npm run start:dev`    | watch mode 개발 서버                         |
| `npm run start:debug`  | debugger를 연결할 수 있는 watch mode         |
| `npm run build`        | Prisma Client 생성 후 Nest 빌드              |
| `npm run start:prod`   | `dist/main` 실행                             |
| `npm run lint`         | type-aware ESLint 검사, warning도 실패 처리  |
| `npm run lint:fix`     | 자동 수정 가능한 lint 문제 수정              |
| `npm run format`       | Prettier로 프로젝트 포맷                     |
| `npm run format:check` | 포맷 변경 없이 검사                          |
| `npm test`             | 단위 테스트                                  |
| `npm run test:e2e`     | 공통 HTTP 계약 E2E                           |
| `npm run test:cov`     | 테스트 coverage 생성                         |
| `npm run check`        | lint → format → unit → build → E2E 전체 gate |
| `npm run db:validate`  | Prisma schema 검증                           |
| `npm run db:generate`  | `src/generated/prisma`에 client 생성         |
| `npm run db:pull`      | 승인된 DB schema introspection               |
| `npm run db:studio`    | Prisma Studio                                |

변경을 마치기 전에는 다음을 실행합니다.

```bash
npm run check
git diff --check
```

## AI Agent로 개발하기

이 저장소는 Codex, Claude Code 등 repository instruction을 지원하는 AI coding agent가 프로젝트 규칙을 읽고 작업할 수 있도록 구성되어 있습니다.

| 파일                                            | 역할                                                          |
| ----------------------------------------------- | ------------------------------------------------------------- |
| `AGENTS.md`                                     | 프로젝트 구조, 명령어, DB 정책, HTTP 계약 등 저장소 전체 규칙 |
| `.agents/skills/visit-servant-backend/SKILL.md` | NestJS backend 구현·검증 workflow                             |
| `.agents/skills/nest-domain-scaffold/SKILL.md`  | 새 domain 생성과 Swagger 노출을 보장하는 workflow             |

### 시작 방법

1. AI Agent에서 이 저장소 루트를 workspace로 엽니다.
2. 작업을 요청할 때 관련 스킬을 이름 또는 경로로 지정합니다.
3. Agent가 변경 전 `AGENTS.md`와 해당 `SKILL.md`를 읽었는지 확인합니다.
4. 완료 보고에서 변경 파일과 `npm run check` 결과를 확인한 뒤 사람이 diff를 검토합니다.

복사해서 사용할 수 있는 요청 예시:

```text
visit-servant-backend 스킬을 사용해 POI 목록 API를 구현해줘.
먼저 현재 schema와 API 계약을 확인하고 DTO, Prisma select,
페이지네이션, Swagger, 단위/E2E 테스트까지 처리해줘.
완료 전에 npm run check와 git diff --check를 실행해줘.
```

```text
/nest-domain-scaffold facilities

최초 operation은 GET /facilities 목록 조회이고,
공개 응답 필드는 id, name, categoryId야.
페이지네이션과 Swagger 문서 및 E2E 테스트까지 생성해줘.
```

```text
이 변경을 진단만 해줘. 파일을 수정하거나 DB 명령을 실행하지 말고,
원인과 권장 수정안을 근거 파일 위치와 함께 알려줘.
```

### Agent 작업 안전 규칙

- `.env`의 값이나 secret을 출력·문서화·커밋하도록 요청하지 않습니다.
- DB schema 동기화는 승인된 DB에 대해 `npm run db:pull`만 사용합니다.
- `prisma migrate`, `prisma db push`, destructive SQL은 사용하지 않습니다.
- 생성된 `src/generated/prisma`를 직접 수정하지 않습니다.
- Agent의 완료 보고만 믿지 않고 `git diff`와 테스트 결과를 사람이 확인합니다.
- 배포, push, 외부 메시지 전송처럼 저장소 밖에 영향을 주는 작업은 별도로 명시하고 검토합니다.

반복 가능한 작업은 `.agents/skills`의 프로젝트 스킬로 관리합니다. Codex는 반복 workflow를 스킬로 저장해 활용할 수 있으며, 이 프로젝트에서는 backend 계약과 domain scaffold 규칙을 이미 스킬로 제공하고 있습니다.

## 새 도메인 추가

AI Agent에서 다음 프로젝트 스킬을 사용할 수 있습니다.

```text
/nest-domain-scaffold <domain-name>
```

도메인명은 기본적으로 복수형 kebab-case를 사용합니다. 스킬은 module/controller/service 생성, `AppModule`과 `PrismaModule` 연결, 최초 실제 operation과 DTO, Swagger 문서 및 테스트까지 구성합니다. API 계약 없이 문서 노출만을 위한 가짜 endpoint는 만들지 않습니다.

직접 생성하는 경우:

```bash
DOMAIN=facilities
npx nest g module ${DOMAIN}
npx nest g controller ${DOMAIN}
npx nest g service ${DOMAIN}
```

생성 후 반드시 확인할 사항:

- feature module이 `AppModule.imports`에 등록되었는가
- feature module이 `PrismaModule`을 import하는가
- controller에 실제 HTTP operation과 `@ApiTags`가 있는가
- request/response가 구체적인 class DTO로 정의됐는가
- `ApiOkEnvelope` 또는 `ApiPaginatedEnvelope`를 적용했는가
- `/docs/json`에 경로와 HTTP method가 나타나는가
- service 및 API 계약 테스트가 추가됐는가

## Git 규칙

`npm ci`가 Husky를 활성화합니다.

- `pre-commit`: staged 파일 lint/format, `prisma/migrations` 커밋 차단
- `commit-msg`: Conventional Commits 검사
- `pre-push`: branch 이름 검사, `develop` 및 `release/*` 직접 push 차단
- PR 대상: 일반 작업 → `develop`; 운영 반영·긴급 수정 → `main`
- 작업 브랜치: `feature/*`, `fix/*`, `hotfix/*`, `chore/*`, `refactor/*`

이 프로젝트는 비공개이며 별도 라이선스가 부여되지 않았습니다.
