import Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().port().default(3011),
  API_PREFIX: Joi.string().default('api'),
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['postgresql', 'postgres'] })
    .required(),
  CORS_ALLOWED_ORIGINS: Joi.string().allow('').default(''),
  TRUST_PROXY_HOPS: Joi.number().integer().min(0).default(0),
  RATE_LIMIT_TTL_MS: Joi.number().integer().min(1).default(60000),
  RATE_LIMIT_MAX: Joi.number().integer().min(1).default(100),
  AWS_S3_PUBLIC_BASE_URL: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required(),
  DB_POOL_MAX: Joi.number().integer().min(1).default(10),
  DB_CONNECTION_TIMEOUT_MS: Joi.number().integer().min(1).default(5000),
  DB_IDLE_TIMEOUT_MS: Joi.number().integer().min(1).default(30000),
});
