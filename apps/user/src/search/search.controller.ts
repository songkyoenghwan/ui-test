import { Controller, Get, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PoiViewportItemResponseDto } from '../pois/models/poi-viewport-item-response.dto';
import {
  ApiCommonErrorResponses,
  ApiOkEnvelope,
} from '../common/decorators/api-response.decorator';
import { SearchQueryDto } from './dto/search-query.dto';
import { PopularitySearchQueryDto } from './dto/popularity-search-query.dto';
import { SearchListResponseDto } from './dto/search-response.dto';
import { SearchService } from './search.service';

@ApiTags('Search')
@ApiExtraModels(PoiViewportItemResponseDto)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('ai-recommendations')
  @ApiOperation({
    summary: 'AI 추천 시설 검색 (임시)',
    description:
      '임시 기능입니다. 본 구현은 기초 설문 응답과 사용자가 수동으로 추가한 AI 추천 태그를 기준으로 적합도를 계산합니다. 현재는 공개 POI 연결 시설을 요청마다 무작위로 최대 5개 반환합니다.',
  })
  @ApiOkEnvelope(SearchListResponseDto)
  @ApiCommonErrorResponses()
  aiRecommendations(@Query() query: PopularitySearchQueryDto): Promise<SearchListResponseDto> {
    return this.searchService.aiRecommendations(query);
  }

  @Get('popularity')
  @ApiOperation({
    summary: '인기 시설 검색',
    description:
      '임시 기능입니다. 현재 대상지의 공개 POI에 연결된 시설을 요청할 때마다 무작위 개수로 최대 10개 반환합니다.',
  })
  @ApiOkEnvelope(SearchListResponseDto)
  @ApiCommonErrorResponses()
  popularity(@Query() query: PopularitySearchQueryDto): Promise<SearchListResponseDto> {
    return this.searchService.popularity(query);
  }

  @Get()
  @ApiOperation({
    summary: '통합 검색',
    description:
      '대상지 내 공개 POI에 연결된 시설을 카테고리명, 시설명, 위치명, 해시태그명, 상품명으로 검색합니다.',
  })
  @ApiOkEnvelope(SearchListResponseDto)
  @ApiCommonErrorResponses()
  search(@Query() query: SearchQueryDto): Promise<SearchListResponseDto> {
    return this.searchService.search(query);
  }
}
