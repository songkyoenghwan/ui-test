import { describe, expect, mock, test } from 'bun:test';

import { getOrCreateVisitorId } from '../src/utils/visitor-id';

const existingVisitorId = '7074e8be-1c93-41c0-8e4f-a2569f780cbc';
const generatedVisitorId = 'e29053d2-c7af-4eba-8765-b23d9d060072';

const createStorage = (storedValue: string | null) => ({
	getItem: mock((_key: string) => storedValue),
	setItem: mock((_key: string, _value: string) => undefined),
});

describe('getOrCreateVisitorId', () => {
	test('저장된 UUID v4를 재사용한다', () => {
		const storage = createStorage(existingVisitorId);
		const createUuid = mock(() => generatedVisitorId);

		expect(getOrCreateVisitorId(storage, createUuid)).toBe(existingVisitorId);
		expect(createUuid).not.toHaveBeenCalled();
		expect(storage.setItem).not.toHaveBeenCalled();
	});

	test.each([null, '', 'invalid-visitor-id'])('값이 없거나 잘못되면 UUID v4를 발급한다', (storedValue: string | null) => {
		const storage = createStorage(storedValue);

		expect(getOrCreateVisitorId(storage, () => generatedVisitorId)).toBe(generatedVisitorId);
		expect(storage.setItem).toHaveBeenCalledWith('visitorId', generatedVisitorId);
	});
});
