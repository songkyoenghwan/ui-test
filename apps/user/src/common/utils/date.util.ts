const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

/**
 * `timestamp without time zone` 컬럼에 저장할 현재 KST 벽시계 시각을 반환한다.
 *
 * Prisma PostgreSQL 어댑터가 `Date`를 UTC 기준 문자열로 직렬화하므로,
 * UTC+9만큼 이동한 값을 전달해 데이터베이스에 KST 시각을 저장한다.
 */
export function nowKST(): Date {
  return new Date(Date.now() + KST_OFFSET_MS);
}
