export const createSingleFlight = <Key extends object, Result>(operation: (key: Key) => Promise<Result>) => {
	const inFlight = new WeakMap<Key, Promise<Result>>();

	return (key: Key): Promise<Result> => {
		const existing = inFlight.get(key);
		if (existing) {
			return existing;
		}

		const current = operation(key);
		inFlight.set(key, current);

		return current;
	};
};
