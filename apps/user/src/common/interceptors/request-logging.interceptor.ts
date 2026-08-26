import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { RequestWithContext } from '../types/request-with-context.type';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestWithContext>();
    const response = context.switchToHttp().getResponse<Response>();
    const startedAt = performance.now();
    const path = request.originalUrl.split('?')[0];

    const contextData = (statusCode = response.statusCode) => ({
      requestId: request.requestId,
      method: request.method,
      path,
      statusCode,
      durationMs: Number((performance.now() - startedAt).toFixed(2)),
    });

    return next.handle().pipe(
      tap(() => this.logger.log(contextData())),
      catchError((error: unknown) => {
        const statusCode = error instanceof HttpException ? error.getStatus() : 500;
        if (statusCode >= 500) this.logger.error(contextData(statusCode));
        else this.logger.warn(contextData(statusCode));
        return throwError(() => error);
      }),
    );
  }
}
