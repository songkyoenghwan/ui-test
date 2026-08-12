export interface ApiSuccessResponse<T> {
    success: boolean;
    data: T;
}

export interface ApiErrorResponse {
    success: boolean;
    message: string;
    details?: Record<string, { message: string; value?: unknown }>;
}

export const createSuccessResponse = <T>(data: T): ApiSuccessResponse<T> => ({
    success: true,
    data,
});

export const createErrorResponse = (
    message: string,
    details?: Record<string, { message: string; value?: unknown }>,
): ApiErrorResponse => ({
    success: false,
    message,
    details,
});
