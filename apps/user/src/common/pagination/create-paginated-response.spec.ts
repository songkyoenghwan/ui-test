import { createPaginatedResponse } from './create-paginated-response';

describe('createPaginatedResponse', () => {
  it('전체 개수를 기준으로 전체 페이지 수를 계산한다', () => {
    expect(createPaginatedResponse(['item'], 25, 2, 10)).toEqual({
      items: ['item'],
      totalCount: 25,
      page: 2,
      pageSize: 10,
      totalPages: 3,
    });
  });

  it('데이터가 없으면 전체 페이지 수는 0이다', () => {
    expect(createPaginatedResponse([], 0, 1, 10).totalPages).toBe(0);
  });
});
