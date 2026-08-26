import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  ApiArrayEnvelope,
  ApiCommonErrorResponses,
} from '../common/decorators/api-response.decorator';
import { CategoriesService } from './categories.service';
import { CategoryResponseDto } from './dto/category-response.dto';
import { FindManyCategoriesQueryDto } from './dto/find-many-categories-query.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: '대상지별 카테고리 목록 조회' })
  @ApiQuery({ name: 'tourDestinationId', type: Number, required: true, minimum: 1 })
  @ApiArrayEnvelope(CategoryResponseDto)
  @ApiCommonErrorResponses()
  findMany(@Query() query: FindManyCategoriesQueryDto): Promise<CategoryResponseDto[]> {
    return this.categoriesService.findMany(query);
  }
}
