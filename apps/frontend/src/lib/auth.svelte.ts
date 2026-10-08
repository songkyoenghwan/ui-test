import { browser } from '$app/environment';

class AuthManager {
	#userName = $state('');
	#userPassword = $state('');

	constructor() {
		this.init();
	}

	get userName() {
		return this.#userName;
	}
	get userPassword() {
		return this.#userPassword;
	}

	setCredentials(name: string, pass: string) {
		this.#userName = name;
		this.#userPassword = pass;

		if (browser) {
			document.cookie = `userName=${name}; path=/; SameSite=Lax;`;
		}
	}

	private init() {
		this.#userName = '';
		this.#userPassword = '';
	}
}

// 4. 싱글톤 인스턴스 내보내기
export const auth = new AuthManager();
