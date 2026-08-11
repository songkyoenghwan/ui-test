import { iconAi } from './iconAi';
import { iconCategory } from './iconCategory';
import { iconFacilities } from './iconFacilities';

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
			name: 'arrow-left',
			size: '20',
			html: /* HTML */ `
				<path
					d="M12.0398 15.9357L6.82384 10.7197C6.20784 10.1037 6.20784 9.09567 6.82384 8.47967L12.0398 3.26367"
					fill="none"
					stroke-width="1.2"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			`,
		},
		{
			name: 'close-circle',
			size: '20',
			html: /* HTML */ `
				<path
					d="M3.33203 16.6693L16.6654 3.33594"
					fill="none"
					stroke-width="1.25"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M16.6654 16.6693L3.33203 3.33594"
					fill="none"
					stroke-width="1.25"
					stroke-linecap="round"
					stroke-linejoin="round"
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
		{
			name: 'map-start',
			size: '13',
			html: /* HTML */ `
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M11.7135 0.0489328C12.3504 -0.180347 12.9665 0.435713 12.7372 1.07262L8.7108 12.2571C8.46054 12.9522 7.48234 12.9656 7.21307 12.2776L5.3274 7.45871L0.508482 5.57304C-0.179531 5.30384 -0.166098 4.3256 0.529029 4.07535L11.7135 0.0489328Z"
					stroke="none"
				/>
			`,
		},
		{
			name: 'search',
			size: '20',
			html: /* HTML */ `
				<path
					d="M9.16699 1.875C13.1938 1.87518 16.4578 5.14017 16.458 9.16699C16.4579 10.9551 15.8123 12.5911 14.7441 13.8594L17.9424 17.0576C18.1864 17.3017 18.1864 17.6983 17.9424 17.9424C17.6983 18.1865 17.3017 18.1865 17.0576 17.9424L13.8594 14.7441C12.5911 15.8123 10.9551 16.4579 9.16699 16.458C5.14017 16.4578 1.87518 13.1938 1.875 9.16699C1.87518 5.14017 5.14017 1.87518 9.16699 1.875ZM9.16699 3.125C5.83053 3.12518 3.12518 5.83053 3.125 9.16699C3.12518 12.5035 5.83053 15.2078 9.16699 15.208C10.8116 15.2079 12.3013 14.5494 13.3906 13.4834C13.4043 13.4665 13.4169 13.4483 13.4326 13.4326C13.4483 13.4169 13.4665 13.4043 13.4834 13.3906C14.5494 12.3013 15.2079 10.8116 15.208 9.16699C15.2078 5.83053 12.5035 3.12518 9.16699 3.125Z"
					stroke="none"
				/>
			`,
		},
		{
			name: 'menu',
			size: '24',
			html: /* HTML */ `
				<path d="M2.40625 6H21.5924" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M2.40625 12H21.5924" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M2.40625 18H21.5924" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			`,
		},
		{
			name: 'back',
			size: '24',
			html: /* HTML */ `
				<path
					d="M9.57 5.92969L3.5 11.9997L9.57 18.0697"
					fill="none"
					stroke-width="1.5"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M20.4999 12H3.66992"
					fill="none"
					stroke-width="1.5"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			`,
		},
		{
			name: 'refresh',
			size: '22',
			html: /* HTML */ `
				<path
					d="M19.9999 10.9083C19.9999 15.9265 15.9272 19.9992 10.909 19.9992C5.89084 19.9992 2.82721 14.9447 2.82721 14.9447M2.82721 19.4901V14.9447H6.9363M1.81812 10.9083C1.81812 5.89011 5.85448 1.81738 10.909 1.81738C16.9727 1.81738 19.9999 6.87193 19.9999 6.87193M15.9636 6.87193H19.9999V2.32647"
					fill="none"
					stroke-width="1.36364"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			`,
		},
		{
			name: 'gpe',
			size: '26',
			html: /* HTML */ `
				<path
					d="M12.7279 21.5658C17.6092 21.5658 21.5663 17.6087 21.5663 12.7274C21.5663 7.84612 17.6092 3.88904 12.7279 3.88904C7.84664 3.88904 3.88956 7.84612 3.88956 12.7274C3.88956 17.6087 7.84664 21.5658 12.7279 21.5658Z"
					fill="none"
					stroke-width="1.36364"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M12.7283 6.36375V1.8183"
					fill="none"
					stroke-width="1.36364"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M6.3647 12.7274H1.81924"
					fill="none"
					stroke-width="1.36364"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M12.7283 23.6365V19.091"
					fill="none"
					stroke-width="1.36364"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M23.6374 12.7274H19.092"
					fill="none"
					stroke-width="1.36364"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			`,
		},
		...iconCategory,
		...iconFacilities,
		...iconAi(_id),

		{
			name: '',
			size: '16',
			html: /* HTML */ ``,
		},
	];
};
