import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  ApiCommonErrorResponses,
  ApiOkEnvelope,
} from '../common/decorators/api-response.decorator';
import { PoiDetailResponseDto } from './dto/poi-detail-response.dto';
import { PoiParamsDto } from './dto/poi-params.dto';
import { PoiViewportQueryDto } from './dto/poi-viewport-query.dto';
import { PoiViewportItemResponseDto } from './models/poi-viewport-item-response.dto';
import { PoiViewportListResponseDto } from './models/poi-viewport-list-response.dto';
import { PoisService } from './pois.service';

@ApiTags('POI')
@ApiExtraModels(PoiViewportItemResponseDto)
@Controller('pois')
export class PoisController {
  constructor(private readonly poisService: PoisService) {}

  @Get()
  @ApiOperation({
    summary: '대상지별 POI 마커 목록 조회',
    description:
      '대표 시설 기준 마커 아이템 목록을 반환합니다. keyword로 시설명·카테고리명·시설 태그를 검색합니다.',
  })
  @ApiOkEnvelope(PoiViewportListResponseDto)
  @ApiCommonErrorResponses()
  findMany(@Query() query: PoiViewportQueryDto): Promise<PoiViewportListResponseDto> {
    return this.poisService.findMany(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'POI 상세 조회',
    description:
      '이 위치의 시설 목록(facilityPoiMappings)은 공개 가능한 시설을 대상지 정렬 규칙(CMS 순 또는 운영 상태 순)으로 반환합니다.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'POI ID', example: 1 })
  @ApiOkEnvelope(PoiDetailResponseDto)
  @ApiCommonErrorResponses()
  findOne(@Param() params: PoiParamsDto): Promise<PoiDetailResponseDto> {
    return this.poisService.findOne(params.id);
  }
}
