import { ApiProperty } from '@nestjs/swagger';
import {
  TOUR_DESTINATION_LANGUAGES,
  type TourDestinationLanguage,
} from '../constants/tour-destination.constant';

export class TourDestinationDetailResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: '해운대시장' })
  name!: string;

  @ApiProperty({ example: 35.1587 })
  latitude!: number;

  @ApiProperty({ example: 129.1604 })
  longitude!: number;

  @ApiProperty({ example: '#274FA8', nullable: true })
  colorCode!: string | null;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z', nullable: true })
  startAt!: Date | null;

  @ApiProperty({ example: '2026-12-31T23:59:59.000Z', nullable: true })
  endAt!: Date | null;

  @ApiProperty({ example: true })
  isAlways!: boolean;

  @ApiProperty({ example: 'https://example.com', nullable: true })
  homepageUrl!: string | null;

  @ApiProperty({ example: 'https://map.example.com', nullable: true })
  mapUrl!: string | null;

  @ApiProperty({
    example: 'https://cdn.example.com/tour-destinations/haeundae.png',
    nullable: true,
  })
  fileUrl!: string | null;

  @ApiProperty({
    enum: TOUR_DESTINATION_LANGUAGES,
    isArray: true,
    example: ['ko', 'en'],
  })
  supportedLanguages!: TourDestinationLanguage[];

  @ApiProperty({ example: true })
  isAiRecommendYn!: boolean;

  @ApiProperty({ example: true })
  isFacilityCongestionYn!: boolean;

  @ApiProperty({ example: false })
  isSectionCongestionYn!: boolean;

  @ApiProperty({ example: false })
  isFacilityAddressYn!: boolean;

  @ApiProperty({ example: true })
  isCustomSortingYn!: boolean;

  @ApiProperty({ example: false })
  isVpsContentsYn!: boolean;
}
