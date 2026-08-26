import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class TourDestinationOnboardingParamsDto {
  @ApiProperty({ description: '관광지 ID', example: 30, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  destinationId: number;
}
