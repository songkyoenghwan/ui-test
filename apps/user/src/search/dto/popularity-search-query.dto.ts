import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, Min } from 'class-validator';
import {
  TOUR_DESTINATION_LANGUAGES,
  type TourDestinationLanguage,
} from '../../tour-destinations/constants/tour-destination.constant';

export class PopularitySearchQueryDto {
  @ApiProperty({ example: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  tourDestinationId: number;

  @ApiPropertyOptional({
    description: '시설 및 위치 정보에 적용할 언어',
    enum: TOUR_DESTINATION_LANGUAGES,
    default: 'ko',
  })
  @IsIn(TOUR_DESTINATION_LANGUAGES)
  language: TourDestinationLanguage = 'ko';
}
