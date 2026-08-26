import { PaginatedResponse } from './paginated-response.interface';

export function createPaginatedResponse<T>(
  items: T[],
  totalCount: number,
  page: number,
  pageSize: number,
): PaginatedResponse<T> {
  return {
    items,
    totalCount,
    page,
    pageSize,
    totalPages: totalCount === 0 ? 0 : Math.ceil(totalCount / pageSize),
  };
}
