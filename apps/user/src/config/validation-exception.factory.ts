import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ERROR_CODE } from '../common/constants/error-code.constant';
import { AppException } from '../common/exceptions/app.exception';

function collectValidationErrors(
  errors: ValidationError[],
  parentPath = '',
): Record<string, string[]> {
  return errors.reduce<Record<string, string[]>>((details, error) => {
    const path = parentPath ? `${parentPath}.${error.property}` : error.property;
    if (error.constraints) details[path] = Object.values(error.constraints);
    if (error.children?.length) {
      Object.assign(details, collectValidationErrors(error.children, path));
    }
    return details;
  }, {});
}

export function validationExceptionFactory(errors: ValidationError[]): AppException {
  return new AppException(
    '요청 값이 올바르지 않습니다.',
    ERROR_CODE.VALIDATION_ERROR,
    HttpStatus.BAD_REQUEST,
    collectValidationErrors(errors),
  );
}
