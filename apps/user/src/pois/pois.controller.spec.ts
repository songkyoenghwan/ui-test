import { Test, TestingModule } from '@nestjs/testing';
import { PoiParamsDto } from './dto/poi-params.dto';
import { PoiViewportQueryDto } from './dto/poi-viewport-query.dto';
import { PoisController } from './pois.controller';
import { PoisService } from './pois.service';

describe('PoisController', () => {
  let controller: PoisController;
  const findMany = jest.fn();
  const findOne = jest.fn();

  beforeEach(async () => {
    findMany.mockReset();
    findOne.mockReset();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoisController],
      providers: [{ provide: PoisService, useValue: { findMany, findOne } }],
    }).compile();

    controller = module.get<PoisController>(PoisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('대상지별 POI 목록 조회를 서비스에 위임한다', async () => {
    const query = Object.assign(new PoiViewportQueryDto(), {
      tourDestinationId: 3,
      language: 'ko',
      keyword: '안내',
    });
    const result = { items: [] };
    findMany.mockResolvedValue(result);

    await expect(controller.findMany(query)).resolves.toBe(result);
    expect(findMany).toHaveBeenCalledWith(query);
  });

  it('POI 상세 조회를 서비스에 위임한다', async () => {
    const params = Object.assign(new PoiParamsDto(), { id: 5 });
    const result = { id: 5, facilityPoiMappings: [] };
    findOne.mockResolvedValue(result);

    await expect(controller.findOne(params)).resolves.toBe(result);
    expect(findOne).toHaveBeenCalledWith(5);
  });
});
