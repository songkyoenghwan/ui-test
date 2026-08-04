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
		{
			name: 'arrow-slide',
			size: '22 42',
			html: /* HTML */ `
				<path
					d="M0.964844 0.964844L20.3998 19.6531C21.1532 20.3776 21.1532 21.5521 20.3998 22.2766L0.964844 40.9648"
					fill="none"
					stroke-width="1.92919"
					stroke-linecap="round"
				/>
			`,
		},
		{
			name: 'input-chk-off',
			size: '18',
			html: /* HTML */ `
				<path
					d="M8.95833 17.2917C13.5607 17.2917 17.2917 13.5607 17.2917 8.95833C17.2917 4.35596 13.5607 0.625 8.95833 0.625C4.35596 0.625 0.625 4.35596 0.625 8.95833C0.625 13.5607 4.35596 17.2917 8.95833 17.2917Z"
					fill="none"
					stroke-width="1.25"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			`,
		},
		{
			name: 'input-chk-on',
			size: '18',
			html: /* HTML */ `
				<path
					d="M8.33301 0C12.9246 0 16.6668 3.74149 16.667 8.33301C16.667 12.9247 12.9247 16.667 8.33301 16.667C3.74149 16.6668 0 12.9246 0 8.33301C0.000176727 3.7416 3.7416 0.000176724 8.33301 0ZM11.6836 5.38379C11.4358 5.14354 11.0401 5.14881 10.7998 5.39648L6.39941 9.93359L5.03027 8.52148C4.78994 8.27413 4.39414 8.26864 4.14648 8.50879C3.89913 8.74913 3.89364 9.14493 4.13379 9.39258L5.95117 11.2676C6.06888 11.3889 6.23132 11.457 6.40039 11.457C6.56925 11.457 6.73099 11.3887 6.84863 11.2676L11.6973 6.26758C11.9375 6.01982 11.9313 5.62409 11.6836 5.38379Z"
					stroke="none"
				/>
			`,
		},
	];
};
