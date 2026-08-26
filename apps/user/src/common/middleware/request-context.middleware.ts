import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { NextFunction, Response } from 'express';
import { RequestWithContext } from '../types/request-with-context.type';

const REQUEST_ID_HEADER = 'x-request-id';
const VALID_REQUEST_ID = /^[A-Za-z0-9._:-]{1,128}$/;

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: RequestWithContext, res: Response, next: NextFunction): void {
    const incomingRequestId = req.header(REQUEST_ID_HEADER);
    const requestId =
      incomingRequestId && VALID_REQUEST_ID.test(incomingRequestId)
        ? incomingRequestId
        : randomUUID();

    req.requestId = requestId;
    res.setHeader(REQUEST_ID_HEADER, requestId);
    next();
  }
}
