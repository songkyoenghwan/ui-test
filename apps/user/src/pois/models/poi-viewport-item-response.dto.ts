import { ApiProperty } from '@nestjs/swagger';
import { POI_CONGESTION_LEVELS, type PoiCongestionLevel } from '../constants/poi.constant';

export class PoiViewportItemResponseDto {
  @ApiProperty({ example: 12 })
  id: number;

  @ApiProperty({ example: '해운대시장 입구' })
  name: string;

  @ApiProperty({ example: 35.158 })
  latitude: number;

  @ApiProperty({ example: 129.16 })
  longitude: number;

  @ApiProperty({ example: 45 })
  facilityId: number;

  @ApiProperty({ example: '해운대 횟집', description: '마커 아이콘에 쓰인 대표 시설명' })
  facilityName: string;

  @ApiProperty({ example: 3, description: '대표 시설 카테고리 ID' })
  categoryId: number;

  @ApiProperty({ example: 'food', nullable: true })
  categoryIconKey: string | null;

  @ApiProperty({
    example: 'https://cdn.example.com/categories/food.png',
    nullable: true,
  })
  categoryIconUrl: string | null;

  @ApiProperty({
    example: '#FF8A00',
    nullable: true,
    description: '대표 시설 카테고리 색상 코드',
  })
  categoryColorCode: string | null;

  @ApiProperty({
    enum: POI_CONGESTION_LEVELS,
    example: 'CROWDED',
    description:
      '대표 시설 혼잡도. CMS와 동일하게 RELAXED/NORMAL/CROWDED/VERY_CROWDED, 측정 없음은 none',
  })
  congestionStatus: PoiCongestionLevel;
}
