import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import {
  TOUR_DESTINATION_LANGUAGES,
  type TourDestinationLanguage,
} from '../constants/tour-destination.constant';

export class TourDestinationOnboardingQueryDto {
  @ApiPropertyOptional({
    description: '온보딩 제목과 설명에 적용할 언어',
    enum: TOUR_DESTINATION_LANGUAGES,
    default: 'ko',
  })
  @IsOptional()
  @IsIn(TOUR_DESTINATION_LANGUAGES)
  language: TourDestinationLanguage = 'ko';
}
