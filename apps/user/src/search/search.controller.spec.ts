import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

describe('SearchController', () => {
  let controller: SearchController;
  const search = jest.fn().mockResolvedValue({ items: [], pois: [] });
  const popularity = jest.fn().mockResolvedValue({ items: [], pois: [] });
  const aiRecommendations = jest.fn().mockResolvedValue({ items: [], pois: [] });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [{ provide: SearchService, useValue: { search, popularity, aiRecommendations } }],
    }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  it('검색 요청을 서비스에 위임한다', async () => {
    const query = { tourDestinationId: 1, keyword: '망원', language: 'ko' as const };

    await expect(controller.search(query)).resolves.toEqual({ items: [], pois: [] });
    expect(search).toHaveBeenCalledWith(query);
  });

  it('인기 시설 요청을 서비스에 위임한다', async () => {
    const query = { tourDestinationId: 37, language: 'ko' as const };

    await expect(controller.popularity(query)).resolves.toEqual({ items: [], pois: [] });
    expect(popularity).toHaveBeenCalledWith(query);
  });

  it('AI 추천 시설 요청을 서비스에 위임한다', async () => {
    const query = { tourDestinationId: 37, language: 'ko' as const };

    await expect(controller.aiRecommendations(query)).resolves.toEqual({ items: [], pois: [] });
    expect(aiRecommendations).toHaveBeenCalledWith(query);
  });
});
