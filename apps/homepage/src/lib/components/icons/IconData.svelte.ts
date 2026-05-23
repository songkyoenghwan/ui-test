// 간단한 대체 UUID 생성 함수 예시 (RFC4122 버전 4)
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
const _id = uuidv4();

export const getIconData = () => {
	return [
		{
			name: 'svg',
			size: '20',
			html: /* HTML */ `
				${_id}
			`,
		},
		{
			name: 'add',
			size: '24',
			html: /* HTML */ `
				<path d="M6 12H18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M12 18V6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			`,
		},
		{
			name: 'undo',
			size: '24',
			html: /* HTML */ `
				<path
					d="M7.13086 18.3101H15.1309C17.8909 18.3101 20.1309 16.0701 20.1309 13.3101C20.1309 10.5501 17.8909 8.31006 15.1309 8.31006H4.13086"
					fill="none"
					stroke-width="1.5"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path d="M6.42914 10.8099L3.86914 8.24994L6.42914 5.68994" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			`,
		},
		{
			name: 'tick-circle',
			size: '24',
			html: /* HTML */ `
				<path
					d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
				/>
			`,
		},
		{
			name: 'arrow-down',
			size: '20',
			html: /* HTML */ `
				<path
					d="M16.6 12.5416L11.1667 7.10829C10.525 6.46663 9.47502 6.46663 8.83336 7.10829L3.40002 12.5416"
					fill="none"
					stroke-width="1.5"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			`,
		},
		{
			name: 'arrow-new-link',
			size: '20',
			html: /* HTML */ `
				<path d="M20.5 22H3.5" fill="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M19 3.5L5 17.5" fill="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M19 13.77V3.5H8.73" fill="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
			`,
		},
		{
			name: 'menu',
			size: '24',
			html: /* HTML */ `
				<path d="M3 7H21" fill="none" stroke-width="1.5" stroke-linecap="round" />
				<path d="M3 12H21" fill="none" stroke-width="1.5" stroke-linecap="round" />
				<path d="M3 17H21" fill="none" stroke-width="1.5" stroke-linecap="round" />
			`,
		},
		{
			name: 'import',
			size: '24',
			html: /* HTML */ `
				<path d="M9.32007 11.6799L11.8801 14.2399L14.4401 11.6799" fill="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M11.8799 4V14.17" fill="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
				<path
					d="M20 12.1799C20 16.5999 17 20.1799 12 20.1799C7 20.1799 4 16.5999 4 12.1799"
					fill="none"
					stroke-width="1.5"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			`,
		},
		{
			name: 'close',
			size: '24',
			html: /* HTML */ `
				<path d="M4 20L20 4" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M20 20L4 4" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			`,
		},
	];
};
