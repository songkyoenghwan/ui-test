import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../constants/error-code.constant';
import { ErrorDetails } from '../interfaces/api-response.interface';

export class AppException extends HttpException {
  constructor(
    message: string,
    readonly code: ErrorCode,
    statusCode: HttpStatus,
    readonly details: ErrorDetails = {},
  ) {
    super(message, statusCode);
  }
}
