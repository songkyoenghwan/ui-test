export interface PaginationQuery {
	/** @minimum 1 @default 1 */
	page?: number;
	/** @minimum 1 @maximum 100 @default 10 */
	pageSize?: number;
}

// 페이지네이션 기본값
export const PAGINATION_DEFAULTS = {
	page: 1,
	pageSize: 10,
} as const;

export interface PaginatedResponse<T> {
	items: T[];
	totalCount: number;
	page: number;
	pageSize: number;
	totalPages: number;
}
