import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CategoryResponseDto } from './dto/category-response.dto';
import { FindManyCategoriesQueryDto } from './dto/find-many-categories-query.dto';

const CATEGORY_PUBLIC_SELECT = {
  id: true,
  name: true,
  iconKey: true,
  parentId: true,
  sortingNumber: true,
  isEventCategory: true,
  isAiRecommendationEnabled: true,
  categoryColorCodes: {
    select: {
      id: true,
      paletteNumber: true,
      sortingNumber: true,
      colorCode: true,
    },
  },
  _count: {
    select: { facilities: true },
  },
} as const;

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(query: FindManyCategoriesQueryDto): Promise<CategoryResponseDto[]> {
    const { tourDestinationId } = query;

    return this.prisma.category.findMany({
      where: {
        tourDestinationId,
        isVisible: true,
        isDeleted: false,
        parentId: null,
        facilities: {
          some: {
            isVisible: true,
            isDeleted: false,
          },
        },
      },
      select: CATEGORY_PUBLIC_SELECT,
      orderBy: [{ sortingNumber: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
    });
  }
}
