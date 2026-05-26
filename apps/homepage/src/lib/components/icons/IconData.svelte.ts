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
			name: 'arrow-right',
			size: '24',
			html: /* HTML */ `
				<path d="M14.4302 5.92969L20.5002 11.9997L14.4302 18.0697" fill="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M3.5 12H20.33" fill="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
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

		{
			name: 'result-up',
			size: '50',
			html: /* HTML */ `
				<path
					d="M35.475 0H14.525C5.425 0 0 5.425 0 14.525V35.45C0 44.575 5.425 50 14.525 50H35.45C44.55 50 49.975 44.575 49.975 35.475V14.525C50 5.425 44.575 0 35.475 0ZM38.125 25.825C38.125 26.85 37.275 27.7 36.25 27.7C35.225 27.7 34.375 26.85 34.375 25.825V18.275L15.075 37.575C14.7 37.95 14.225 38.125 13.75 38.125C13.275 38.125 12.8 37.95 12.425 37.575C11.7 36.85 11.7 35.65 12.425 34.925L31.725 15.625H24.175C23.15 15.625 22.3 14.775 22.3 13.75C22.3 12.725 23.15 11.875 24.175 11.875H36.25C37.275 11.875 38.125 12.725 38.125 13.75V25.825Z"
					stroke="none"
				/>
			`,
		},
		{
			name: 'result-down',
			size: '50',
			html: /* HTML */ `
				<path
					d="M35.475 50H14.525C5.425 50 0 44.575 0 35.475V14.55C0 5.425 5.425 0 14.525 0H35.45C44.55 0 49.975 5.425 49.975 14.525V35.475C50 44.575 44.575 50 35.475 50ZM38.125 24.175C38.125 23.15 37.275 22.3 36.25 22.3C35.225 22.3 34.375 23.15 34.375 24.175V31.725L15.075 12.425C14.7 12.05 14.225 11.875 13.75 11.875C13.275 11.875 12.8 12.05 12.425 12.425C11.7 13.15 11.7 14.35 12.425 15.075L31.725 34.375H24.175C23.15 34.375 22.3 35.225 22.3 36.25C22.3 37.275 23.15 38.125 24.175 38.125H36.25C37.275 38.125 38.125 37.275 38.125 36.25V24.175Z"
					stroke="none"
				/>
			`,
		},
		{
			name: 'result-chk',
			size: '50',
			html: /* HTML */ `
				<path
					d="M35.475 0H14.525C5.425 0 0 5.425 0 14.525V35.45C0 44.575 5.425 50 14.525 50H35.45C44.55 50 49.975 44.575 49.975 35.475V14.525C50 5.425 44.575 0 35.475 0ZM36.95 19.25L22.775 33.425C22.425 33.775 21.95 33.975 21.45 33.975C20.95 33.975 20.475 33.775 20.125 33.425L13.05 26.35C12.325 25.625 12.325 24.425 13.05 23.7C13.775 22.975 14.975 22.975 15.7 23.7L21.45 29.45L34.3 16.6C35.025 15.875 36.225 15.875 36.95 16.6C37.675 17.325 37.675 18.5 36.95 19.25Z"
					stroke="none"
				/>
			`,
		},
		{
			name: 'result-close',
			size: '50',
			html: /* HTML */ `
				<path
					d="M47.8 12.45L37.55 2.2C36.35 1 33.95 0 32.25 0H17.75C16.05 0 13.65 1 12.45 2.2L2.2 12.45C1 13.65 0 16.05 0 17.75V32.25C0 33.95 1 36.35 2.2 37.55L12.45 47.8C13.65 49 16.05 50 17.75 50H32.25C33.95 50 36.35 49 37.55 47.8L47.8 37.55C49 36.35 50 33.95 50 32.25V17.75C50 16.05 49 13.65 47.8 12.45ZM35.075 32.425C35.8 33.15 35.8 34.35 35.075 35.075C34.7 35.45 34.225 35.625 33.75 35.625C33.275 35.625 32.8 35.45 32.425 35.075L25 27.65L17.575 35.075C17.2 35.45 16.725 35.625 16.25 35.625C15.775 35.625 15.3 35.45 14.925 35.075C14.2 34.35 14.2 33.15 14.925 32.425L22.35 25L14.925 17.575C14.2 16.85 14.2 15.65 14.925 14.925C15.65 14.2 16.85 14.2 17.575 14.925L25 22.35L32.425 14.925C33.15 14.2 34.35 14.2 35.075 14.925C35.8 15.65 35.8 16.85 35.075 17.575L27.65 25L35.075 32.425Z"
					stroke="none"
				/>
			`,
		},
		{
			name: 'result-eye',
			size: '50 42',
			html: /* HTML */ `
				<path
					d="M48.125 14.3C42.35 5.225 33.9 0 25 0C20.55 0 16.225 1.3 12.275 3.725C8.325 6.175 4.775 9.75 1.875 14.3C-0.625 18.225 -0.625 24.6 1.875 28.525C7.65 37.625 16.1 42.825 25 42.825C29.45 42.825 33.775 41.525 37.725 39.1C41.675 36.65 45.225 33.075 48.125 28.525C50.625 24.625 50.625 18.225 48.125 14.3ZM25 31.525C19.4 31.525 14.9 27 14.9 21.425C14.9 15.85 19.4 11.325 25 11.325C30.6 11.325 35.1 15.85 35.1 21.425C35.1 27 30.6 31.525 25 31.525Z"
					stroke="none"
				/>
			`,
		},
		{
			name: 'tick-circle-list',
			size: '20',
			html: /* HTML */ `
				<path
					d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
					stroke="none"
				/>
			`,
		},
	];
};
