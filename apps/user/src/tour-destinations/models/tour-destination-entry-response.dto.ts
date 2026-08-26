import { ApiProperty } from '@nestjs/swagger';
import {
  TOUR_DESTINATION_LANGUAGES,
  type TourDestinationLanguage,
} from '../constants/tour-destination.constant';

export class TourDestinationEntryResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '해운대시장' })
  name: string;

  @ApiProperty({
    example: 'https://placehold.co/640x360/png?text=Tour+Destination',
  })
  thumbnailUrl: string;

  @ApiProperty({ example: true })
  hasOnboarding: boolean;

  @ApiProperty({ example: true })
  hasBasicSurvey: boolean;

  @ApiProperty({
    enum: TOUR_DESTINATION_LANGUAGES,
    isArray: true,
    example: ['ko', 'en'],
  })
  supportedLanguages: TourDestinationLanguage[];
}
