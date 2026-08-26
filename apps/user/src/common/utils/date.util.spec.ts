import { nowKST } from './date.util';

describe('nowKST', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('현재 UTC 시각을 9시간 이동한 KST 벽시계 값으로 반환한다', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-08-20T03:00:00.000Z'));

    expect(nowKST()).toEqual(new Date('2026-08-20T12:00:00.000Z'));
  });
});
