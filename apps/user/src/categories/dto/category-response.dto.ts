import { ApiProperty } from '@nestjs/swagger';

export class CategoryColorCodeResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: null, nullable: true })
  paletteNumber!: number | null;

  @ApiProperty({ example: null, nullable: true })
  sortingNumber!: number | null;

  @ApiProperty({ example: null, nullable: true })
  colorCode!: string | null;
}

export class CategoryFacilitiesCountResponseDto {
  @ApiProperty({ example: 1 })
  facilities!: number;
}

export class CategoryResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: { ko: '음식점', en: 'Restaurant' },
  })
  name!: unknown;

  @ApiProperty({ example: 'restaurant', nullable: true })
  iconKey!: string | null;

  @ApiProperty({ example: null, nullable: true })
  parentId!: number | null;

  @ApiProperty({ example: null, nullable: true })
  sortingNumber!: number | null;

  @ApiProperty({ example: null, nullable: true })
  isEventCategory!: boolean | null;

  @ApiProperty({ example: null, nullable: true })
  isAiRecommendationEnabled!: boolean | null;

  @ApiProperty({ type: CategoryColorCodeResponseDto, nullable: true })
  categoryColorCodes!: CategoryColorCodeResponseDto | null;

  @ApiProperty({ type: CategoryFacilitiesCountResponseDto })
  _count!: CategoryFacilitiesCountResponseDto;
}
