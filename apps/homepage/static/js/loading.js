const loadingClass = {
	loadingRound: 'loading-round',

	async init(checkInit, checkSec) {
		const loadImage = await this.event(checkInit, checkSec);

		return loadImage;
	},

	event(checkEvent, checkSecond) {
		return new Promise((resolve, reject) => {
			if (checkEvent === 'open') {
				resolve(checkSecond);
			} else if (checkEvent === 'remove') {
				reject();
			}
		})
			.then(() => {
				document.body.insertAdjacentHTML(
					'beforeend',
					`<div class="${this.loadingRound}">
                        <svg
                            width="56"
                            height="56"
                            xmlns="http://www.w3.org/2000/svg"
                            class="loading-round__icon"
                        >
                            <path
                                d="M28 53a24.922 24.922 0 0 0 17.678-7.322A24.922 24.922 0 0 0 53 28a24.922 24.922 0 0 0-7.322-17.678A24.922 24.922 0 0 0 28 3a24.922 24.922 0 0 0-17.678 7.322A24.922 24.922 0 0 0 3 28a24.922 24.922 0 0 0 7.322 17.678"
                                stroke="#1e00db"
                                stroke-width="6"
                                fill="none"
                                fill-rule="evenodd"
                                stroke-linecap="round"
                            />
                        </svg>
                    </div>`,
				);

				if (checkSecond) {
					setTimeout(() => {
						this.removeLoading();
					}, checkSecond);
				}
			})
			.catch(() => {
				this.removeLoading();
			});
	},

	removeLoading() {
		if (document.querySelector(`.${this.loadingRound}`)) {
			document.querySelector(`.${this.loadingRound}`).remove();
		}
	},
};
