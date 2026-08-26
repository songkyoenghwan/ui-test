import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiResponse, getSchemaPath } from '@nestjs/swagger';

const successEnvelope = (data: Record<string, unknown>) => ({
  type: 'object',
  required: ['success', 'data'],
  properties: {
    success: { type: 'boolean', example: true },
    data,
  },
});

const errorEnvelope = {
  type: 'object',
  required: ['success', 'statusCode', 'code', 'message', 'details'],
  properties: {
    success: { type: 'boolean', example: false },
    statusCode: { type: 'integer', example: 400 },
    code: { type: 'string', example: 'VALIDATION_ERROR' },
    message: { type: 'string', example: '요청 값이 올바르지 않습니다.' },
    details: {
      type: 'object',
      example: { name: ['name should not be empty'] },
    },
  },
};

export function ApiOkEnvelope<TModel extends Type<unknown>>(model: TModel) {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: successEnvelope({ $ref: getSchemaPath(model) }),
    }),
  );
}

export function ApiArrayEnvelope<TModel extends Type<unknown>>(model: TModel) {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: successEnvelope({
        type: 'array',
        items: { $ref: getSchemaPath(model) },
      }),
    }),
  );
}

export function ApiPaginatedEnvelope<TModel extends Type<unknown>>(model: TModel) {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: successEnvelope({
        type: 'object',
        required: ['items', 'totalCount', 'page', 'pageSize', 'totalPages'],
        properties: {
          items: { type: 'array', items: { $ref: getSchemaPath(model) } },
          totalCount: { type: 'integer', example: 25 },
          page: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 10 },
          totalPages: { type: 'integer', example: 3 },
        },
      }),
    }),
  );
}

export function ApiCommonErrorResponses() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: '잘못된 요청',
      schema: errorEnvelope,
    }),
    ApiResponse({
      status: 404,
      description: '리소스를 찾을 수 없음',
      schema: errorEnvelope,
    }),
    ApiResponse({
      status: 429,
      description: '요청 횟수 초과',
      schema: errorEnvelope,
    }),
    ApiResponse({
      status: 500,
      description: '서버 내부 오류',
      schema: errorEnvelope,
    }),
  );
}

export function ApiConflictErrorResponse() {
  return ApiResponse({
    status: 409,
    description: '현재 상태와 충돌하는 요청',
    schema: errorEnvelope,
  });
}
