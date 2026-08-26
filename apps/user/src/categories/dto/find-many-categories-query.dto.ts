import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class FindManyCategoriesQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  tourDestinationId!: number;
}
