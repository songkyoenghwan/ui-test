import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { POI_LANGUAGES, type PoiLanguage } from '../constants/poi.constant';

export class PoiViewportQueryDto {
  @ApiProperty({ example: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  tourDestinationId: number;

  @ApiPropertyOptional({
    description: 'POI 이름에 적용할 언어. 해당 언어가 없으면 ko, 그다음 지원 언어 순으로 고릅니다.',
    enum: POI_LANGUAGES,
    default: 'ko',
  })
  @IsOptional()
  @IsIn(POI_LANGUAGES)
  language: PoiLanguage = 'ko';

  @ApiPropertyOptional({
    description:
      '시설명·카테고리명·시설 태그로 매칭 시설이 있는 POI만 조회합니다. 위치명(POI명)은 검색하지 않습니다. 카테고리 칩도 표시명을 keyword로 전달합니다.',
    example: '안내소',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  keyword?: string;
}
