import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PoiParamsDto {
  @ApiProperty({ description: 'POI ID', example: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id!: number;
}
