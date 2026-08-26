'use strict';

const { spawnSync } = require('node:child_process');

const R = '\x1b[31m';
const B = '\x1b[1m';
const X = '\x1b[0m';

const FORBIDDEN = [
  { pattern: /^migrate/, example: 'prisma migrate dev / deploy / reset' },
  { pattern: /^db\s+push/, example: 'prisma db push' },
  { pattern: /^db\s+execute/, example: 'prisma db execute' },
];

const args = process.argv.slice(2);
const subcommand = args.join(' ').trim();
const matched = FORBIDDEN.find(({ pattern }) => pattern.test(subcommand));

if (matched) {
  console.error(`
${R}${B}┌─────────────────────────────────────────────────────────┐
│                    ⛔  실행 금지                          │
├─────────────────────────────────────────────────────────┤
│  ${matched.example.padEnd(55)}│
│  는 이 프로젝트에서 금지된 명령어입니다.                 │
│                                                         │
│  DB 스키마 변경은 DBA가 직접 수행합니다.                 │
│                                                         │
│  허용된 명령어:                                          │
│    npm run db:pull      →  prisma db pull               │
│    npm run db:generate  →  prisma generate              │
└─────────────────────────────────────────────────────────┘${X}
`);
  process.exit(1);
}

const npxCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const result = spawnSync(npxCommand, ['--no-install', 'prisma', ...args], { stdio: 'inherit' });

if (result.error) {
  console.error(result.error.message);
}

process.exit(result.status ?? 1);
