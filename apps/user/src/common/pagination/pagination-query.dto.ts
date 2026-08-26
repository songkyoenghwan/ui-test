import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';
import { PAGINATION_DEFAULTS, PAGINATION_MAX_PAGE_SIZE } from './pagination.constant';

export class PaginationQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = PAGINATION_DEFAULTS.page;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(PAGINATION_MAX_PAGE_SIZE)
  pageSize: number = PAGINATION_DEFAULTS.pageSize;
}
