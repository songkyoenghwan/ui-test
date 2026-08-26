import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { SKIP_RESPONSE_ENVELOPE } from '../decorators/skip-response-envelope.decorator';
import { ApiSuccessResponse } from '../interfaces/api-response.interface';

function serializeBigInt(value: unknown): unknown {
  if (typeof value === 'bigint') return value.toString();
  if (Buffer.isBuffer(value)) return value;
  if (Array.isArray(value)) return value.map(serializeBigInt);
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, serializeBigInt(item)]),
    );
  }
  return value;
}

@Injectable()
export class ResponseEnvelopeInterceptor<T> implements NestInterceptor<
  T,
  ApiSuccessResponse<unknown> | T
> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiSuccessResponse<unknown> | T> {
    const response = context.switchToHttp().getResponse<{ statusCode: number }>();
    const shouldSkip = this.reflector.getAllAndOverride<boolean>(SKIP_RESPONSE_ENVELOPE, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (shouldSkip || response.statusCode === 204) return next.handle();

    return next.handle().pipe(
      map((data) => {
        if (data instanceof StreamableFile) return data;
        return { success: true, data: serializeBigInt(data) };
      }),
    );
  }
}
