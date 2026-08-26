import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';
import {
  TOUR_DESTINATION_LANGUAGES,
  type TourDestinationLanguage,
} from '../constants/tour-destination.constant';

export class TourDestinationEntryQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: '관광지 이름에 적용할 언어',
    enum: TOUR_DESTINATION_LANGUAGES,
    default: 'ko',
  })
  @IsOptional()
  @IsIn(TOUR_DESTINATION_LANGUAGES)
  language: TourDestinationLanguage = 'ko';
}
