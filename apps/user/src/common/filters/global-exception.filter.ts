import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ERROR_CODE, ErrorCode } from '../constants/error-code.constant';
import { AppException } from '../exceptions/app.exception';
import { ApiErrorResponse, ErrorDetails } from '../interfaces/api-response.interface';
import { RequestWithContext } from '../types/request-with-context.type';

const STATUS_CODE_MAP: Partial<Record<HttpStatus, ErrorCode>> = {
  [HttpStatus.BAD_REQUEST]: ERROR_CODE.BAD_REQUEST,
  [HttpStatus.UNAUTHORIZED]: ERROR_CODE.UNAUTHORIZED,
  [HttpStatus.FORBIDDEN]: ERROR_CODE.FORBIDDEN,
  [HttpStatus.NOT_FOUND]: ERROR_CODE.NOT_FOUND,
  [HttpStatus.CONFLICT]: ERROR_CODE.CONFLICT,
  [HttpStatus.TOO_MANY_REQUESTS]: ERROR_CODE.TOO_MANY_REQUESTS,
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const context = host.switchToHttp();
    const request = context.getRequest<RequestWithContext>();
    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (request.path.startsWith('/health/') && exception instanceof HttpException) {
      httpAdapter.reply(context.getResponse(), exception.getResponse(), statusCode);
      return;
    }

    const body: ApiErrorResponse = {
      success: false,
      statusCode,
      code: this.getCode(exception, statusCode),
      message: this.getMessage(exception),
      details: this.getDetails(exception),
    };

    if (!(exception instanceof HttpException) || statusCode >= 500) {
      this.logger.error(
        {
          requestId: request.requestId,
          method: request.method,
          path: request.originalUrl.split('?')[0],
          exception,
        },
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    httpAdapter.reply(context.getResponse(), body, statusCode);
  }

  private getCode(exception: unknown, statusCode: HttpStatus): ErrorCode {
    if (exception instanceof AppException) return exception.code;
    return STATUS_CODE_MAP[statusCode] ?? ERROR_CODE.INTERNAL_SERVER_ERROR;
  }

  private getMessage(exception: unknown): string {
    if (exception instanceof AppException) return exception.message;
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'string') return response;
      if (typeof response === 'object' && response) {
        const message = (response as { message?: unknown }).message;
        if (typeof message === 'string') return message;
      }
      return exception.message;
    }
    return '서버 내부 오류가 발생했습니다.';
  }

  private getDetails(exception: unknown): ErrorDetails {
    return exception instanceof AppException ? exception.details : {};
  }
}
