# Codex 계획 문서

코드 또는 설정 변경 전에 작성하는 승인용 계획 문서를 관리합니다. 상세 승인 절차와 예외는 저장소 루트의 `AGENTS.md`를 따릅니다.

## 디렉터리 구조

```text
docs/codex/plans/
├── README.md
├── _template.md
└── YYYY/
    └── MM/
        └── YYYY-MM-DD-task-name.md
```

- 연도와 월은 계획을 처음 작성한 날짜를 사용합니다.
- 파일명은 `YYYY-MM-DD-`와 영문 kebab-case 작업명을 조합합니다.
- 계획 문서는 생성 후 다른 디렉터리로 이동하지 않습니다.
- 완료 문서를 별도 archive 디렉터리로 이동하지 않습니다.

## Frontmatter

새 계획 문서는 다음 frontmatter를 필수로 포함합니다.

```yaml
---
status: draft
scope: fullstack
domain: facility
created: 2026-07-27
---
```

### status

- `draft`: 조사와 계획 작성이 끝났지만 아직 승인되지 않음
- `approved`: 사용자가 구현을 승인함
- `implemented`: 승인 범위 구현과 필수 검증을 완료함
- `cancelled`: 구현하지 않고 취소됨
- `superseded`: 다른 계획으로 대체됨

### scope

대표 값은 `backend`, `ui`, `fullstack`, `infra`, `docs`입니다. 작업의 주된 변경 범위를 하나 선택합니다.

### domain

대표 값은 `facility`, `category`, `auth`, `onboarding`, `tour-destination`, `workflow`입니다. 여러 도메인에 걸치면 주된 사용자 기능을 선택합니다.

## 상태 전환

```text
draft → approved → implemented
   └────────────→ cancelled
   └────────────→ superseded
```

1. 계획 생성 시 `draft`로 작성합니다.
2. 사용자 승인 후 구현을 시작할 때 `approved`로 변경합니다.
3. 구현과 필수 검증이 모두 끝난 뒤 `implemented`로 변경합니다.
4. 계획이 대체되거나 취소되어도 파일을 삭제하지 않습니다.

## 필수 섹션

- 목표
- 변경 대상 파일
- 구현 단계
- 테스트 유형
- 검증 명령
- 위험 요소
- 제외 범위

새 계획은 [_template.md](./_template.md)를 복사해 작성합니다.
