export const getIconData = () => {
	// 간단한 대체 UUID 생성 함수 예시 (RFC4122 버전 4)
	function uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			const r = (Math.random() * 16) | 0,
				v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}
	const _id = uuidv4();
	return [
		{
			name: 'svg',
			size: '20',
			html: /* HTML */ `
				${_id}
			`,
		},
		{
			name: 'global',
			size: '20',
			html: /* HTML */ `
				<path
					d="M10.0013 18.3337C14.6037 18.3337 18.3346 14.6027 18.3346 10.0003C18.3346 5.39795 14.6037 1.66699 10.0013 1.66699C5.39893 1.66699 1.66797 5.39795 1.66797 10.0003C1.66797 14.6027 5.39893 18.3337 10.0013 18.3337Z"
					fill="none"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M6.66667 2.5H7.5C5.875 7.36667 5.875 12.6333 7.5 17.5H6.66667"
					fill="none"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M12.5 2.5C14.125 7.36667 14.125 12.6333 12.5 17.5"
					fill="none"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M2.5 13.3333V12.5C7.36667 14.125 12.6333 14.125 17.5 12.5V13.3333"
					fill="none"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M2.5 7.5C7.36667 5.875 12.6333 5.875 17.5 7.5"
					fill="none"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			`,
		},
		{
			name: 'arrow-circle',
			size: '10',
			html: /* HTML */ `
				<path
					d="M5 0C2.245 0 0 2.245 0 5C0 7.755 2.245 10 5 10C7.755 10 10 7.755 10 5C10 2.245 7.755 0 5 0ZM6.395 5.265L4.63 7.03C4.555 7.105 4.46 7.14 4.365 7.14C4.27 7.14 4.175 7.105 4.1 7.03C3.955 6.885 3.955 6.645 4.1 6.5L5.6 5L4.1 3.5C3.955 3.355 3.955 3.115 4.1 2.97C4.245 2.825 4.485 2.825 4.63 2.97L6.395 4.735C6.545 4.88 6.545 5.12 6.395 5.265Z"
					stroke="none"
				/>
			`,
		},
	];
};
