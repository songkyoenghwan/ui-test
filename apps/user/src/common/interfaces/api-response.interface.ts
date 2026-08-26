export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export type ErrorDetails = Record<string, unknown>;

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  code: string;
  message: string;
  details: ErrorDetails;
}
