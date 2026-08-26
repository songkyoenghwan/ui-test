import { registerAs } from '@nestjs/config';

function toInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : fallback;
}

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: toInteger(process.env.PORT, 3011),
  apiPrefix: process.env.API_PREFIX ?? 'api',
  corsAllowedOrigins: (process.env.CORS_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  trustProxyHops: toInteger(process.env.TRUST_PROXY_HOPS, 0),
  rateLimitTtlMs: toInteger(process.env.RATE_LIMIT_TTL_MS, 60_000),
  rateLimitMax: toInteger(process.env.RATE_LIMIT_MAX, 100),
  awsS3PublicBaseUrl: process.env.AWS_S3_PUBLIC_BASE_URL,
  database: {
    poolMax: toInteger(process.env.DB_POOL_MAX, 10),
    connectionTimeoutMs: toInteger(process.env.DB_CONNECTION_TIMEOUT_MS, 5_000),
    idleTimeoutMs: toInteger(process.env.DB_IDLE_TIMEOUT_MS, 30_000),
  },
}));
