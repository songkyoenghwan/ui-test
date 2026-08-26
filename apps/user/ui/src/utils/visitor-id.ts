import { v4 as uuidv4 } from 'uuid';

const VISITOR_ID_STORAGE_KEY = 'visitorId';
const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type VisitorIdStorage = Pick<Storage, 'getItem' | 'setItem'>;

export const getOrCreateVisitorId = (storage: VisitorIdStorage = localStorage, createUuid: () => string = uuidv4) => {
	const visitorId = storage.getItem(VISITOR_ID_STORAGE_KEY);
	if (visitorId && UUID_V4_PATTERN.test(visitorId)) {
		return visitorId;
	}

	const nextVisitorId = createUuid();
	storage.setItem(VISITOR_ID_STORAGE_KEY, nextVisitorId);
	return nextVisitorId;
};
