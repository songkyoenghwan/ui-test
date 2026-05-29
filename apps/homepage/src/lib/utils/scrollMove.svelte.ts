import Lenis from 'lenis';

class LenisStore {
	instance = $state<Lenis | null>(null);

	setInstance(lenis: Lenis) {
		this.instance = lenis;
	}

	clear() {
		if (this.instance) {
			this.instance.destroy();
			this.instance = null;
		}
	}
}

export const lenisStore = new LenisStore();
