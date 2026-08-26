import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const findMany = jest.fn();

  beforeEach(async () => {
    findMany.mockReset();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: PrismaService, useValue: { category: { findMany } } },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('대상지의 공개·미삭제 카테고리를 요청한 응답 형태로 조회한다', async () => {
    const categories = [
      {
        id: 1,
        name: null,
        iconKey: null,
        parentId: null,
        sortingNumber: null,
        isEventCategory: null,
        isAiRecommendationEnabled: null,
        categoryColorCodes: {
          id: 1,
          paletteNumber: null,
          sortingNumber: null,
          colorCode: null,
        },
        _count: { facilities: 1 },
      },
    ];
    findMany.mockResolvedValue(categories);

    await expect(service.findMany({ tourDestinationId: 7 })).resolves.toBe(categories);

    expect(findMany).toHaveBeenCalledWith({
      where: {
        tourDestinationId: 7,
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
      select: {
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
        _count: { select: { facilities: true } },
      },
      orderBy: [{ sortingNumber: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
    });
  });

  it('조회 결과가 없으면 빈 배열을 반환한다', async () => {
    findMany.mockResolvedValue([]);

    await expect(service.findMany({ tourDestinationId: 7 })).resolves.toEqual([]);
  });
});
