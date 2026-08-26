import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import {
  TOUR_DESTINATION_LANGUAGES,
  type TourDestinationLanguage,
} from '../../tour-destinations/constants/tour-destination.constant';

export class SearchQueryDto {
  @ApiProperty({ example: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  tourDestinationId: number;

  @ApiProperty({
    description: '카테고리명, 시설명, 위치명, 해시태그명, 상품명에 적용할 검색어',
    example: '망원',
  })
  @Transform(({ value }: TransformFnParams): unknown => {
    const input: unknown = value;
    return typeof input === 'string' ? input.trim() : input;
  })
  @IsString()
  @IsNotEmpty()
  keyword: string;

  @ApiPropertyOptional({
    description: '다국어 이름 검색 및 응답에 적용할 언어',
    enum: TOUR_DESTINATION_LANGUAGES,
    default: 'ko',
  })
  @IsIn(TOUR_DESTINATION_LANGUAGES)
  language: TourDestinationLanguage = 'ko';
}
