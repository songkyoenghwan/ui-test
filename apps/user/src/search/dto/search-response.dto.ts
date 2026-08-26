import { ApiProperty } from '@nestjs/swagger';
import { PoiViewportItemResponseDto } from '../../pois/models/poi-viewport-item-response.dto';
import { POI_CONGESTION_LEVELS } from '../../pois/constants/poi.constant';

export class SearchCategoryColorCodeResponseDto {
  @ApiProperty({ example: '#274FA8', nullable: true })
  colorCode: string | null;
}

export class SearchCategoryResponseDto {
  @ApiProperty({ example: 3 })
  id: number;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: { ko: '음식점', en: 'Restaurant' },
  })
  name: unknown;

  @ApiProperty({ example: 'restaurant', nullable: true })
  iconKey: string | null;

  @ApiProperty({ type: SearchCategoryColorCodeResponseDto, nullable: true })
  categoryColorCodes: SearchCategoryColorCodeResponseDto | null;
}

export class SearchResultResponseDto {
  @ApiProperty({ example: 1, description: '시설 ID' })
  id: number;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: { ko: '망원시장 안내소', en: 'Mangwon Market Information Center' },
  })
  name: unknown;

  @ApiProperty({ type: SearchCategoryResponseDto, nullable: true })
  category: SearchCategoryResponseDto | null;

  @ApiProperty({ example: 12, nullable: true, description: '이 시설이 매핑된 공개 POI ID' })
  poiId: number | null;

  @ApiProperty({ type: 'object', nullable: true, additionalProperties: true })
  poiName: unknown;

  @ApiProperty({ type: 'object', nullable: true, additionalProperties: true })
  address: unknown;

  @ApiProperty({ type: 'object', nullable: true, additionalProperties: true })
  addressDetail: unknown;

  @ApiProperty({ example: 37.556, nullable: true })
  latitude: number | null;

  @ApiProperty({ example: 126.905, nullable: true })
  longitude: number | null;

  @ApiProperty({ example: 'https://cdn.example.com/facility.jpg', nullable: true })
  thumbnailUrl: string | null;

  @ApiProperty({ enum: POI_CONGESTION_LEVELS, example: 'none' })
  congestionStatus: (typeof POI_CONGESTION_LEVELS)[number];

  @ApiProperty({
    example: { status: 'OPERATING', nextTransitionAt: null },
  })
  operation: {
    status: string;
    nextTransitionAt: Date | null;
  };
}

export class SearchListResponseDto {
  @ApiProperty({ type: () => [SearchResultResponseDto] })
  items: SearchResultResponseDto[];

  @ApiProperty({ type: () => [PoiViewportItemResponseDto] })
  pois: PoiViewportItemResponseDto[];
}
