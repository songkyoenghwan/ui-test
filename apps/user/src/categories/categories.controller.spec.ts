import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { FindManyCategoriesQueryDto } from './dto/find-many-categories-query.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  const findMany = jest.fn();

  beforeEach(async () => {
    findMany.mockReset();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [{ provide: CategoriesService, useValue: { findMany } }],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('대상지별 카테고리 목록 조회를 서비스에 위임한다', async () => {
    const query = Object.assign(new FindManyCategoriesQueryDto(), {
      tourDestinationId: 3,
    });
    const result: [] = [];
    findMany.mockResolvedValue(result);

    await expect(controller.findMany(query)).resolves.toBe(result);
    expect(findMany).toHaveBeenCalledWith(query);
  });
});
