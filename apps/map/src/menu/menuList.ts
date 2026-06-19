export interface SubItem {
	title?: string;
	text?: string;
	url?: string;
	check?: string;
	etc?: string;
	subtitle?: string;
}

export interface Props {
	items?: MenuItemExtended[]; // optional, 실제 컴포넌트에 따라
}

export interface MenuItemExtended {
	page?: string;
	title?: string;
	subList: SubItem[];
}

export const menuArrays: MenuItemExtended[] = [
	{
		page: '유통물류',
		title: '로그인',
		subList: [
			{
				text: '로그인',
				url: '/CMS_00/',

				etc: 'popup : 서비스 문의, 회원 정보 등록, 비밀번호 찾기, 휴면 계정 안내',
			},
		],
	},
	{
		title: '입고',
		subList: [
			{
				subtitle: '입고 등록',
				text: '입고 등록',
				url: '/CMS_01_1/',
				etc: 'popup : 일반 입고 팝업, 일반 편집 팝업',
			},
		],
	},
	{
		subList: [
			{
				subtitle: '일반 입고',
				text: '일반입고 목록',
				url: '/CMS_01_2/',
			},
			{
				text: '일반입고 상세',
				url: '/CMS_01_2/detail/id-0',
			},
		],
	},
	{
		title: '출고',
		subList: [
			{
				subtitle: '출고 등록',
				text: '출고 등록',
				url: '/CMS_02_1/',
			},
			{
				text: '출고 수기 등록',
				url: '/CMS_02_1/reg',
			},
			{
				text: '출고 편집',
				url: '/CMS_02_1/edit',
			},
			{
				subtitle: '출고 목록',
				text: '출고 목록',
				url: '/CMS_02_2/',
			},
			{
				text: '출고 상세',
				url: '/CMS_02_2/detail/id-0',
			},
			{
				subtitle: '피킹 목록',
				text: '피킹 목록',
				url: '/CMS_02_3/',
			},
		],
	},
	{
		title: '재고',
		subList: [
			{
				subtitle: '재고 관리',
				text: '재고 관리 목록',
				url: '/CMS_03_1/',
			},
			{
				text: '재고 관리 상세',
				url: '/CMS_03_1/detail/id-0',
				etc: 'popup : 재고수량 변경 / 로케이션 이동',
			},
		],
	},
	{
		title: '기준정보',
		subList: [
			{
				subtitle: '고객사 관리',
				text: '고객사 관리',
				url: '/CMS_04_1/',
			},
			{
				text: '고객사 등록/편집',
				url: '/CMS_04_1/reg',
				etc: 'popup : 양식관리',
			},
			{
				text: '고객사 상세',
				url: '/CMS_04_1/detail',
			},
			{
				subtitle: '상품 관리',
				text: '상품 관리',
				url: '/CMS_04_2',
			},
			{
				text: '단일 상품 등록',
				url: '/CMS_04_2/single/reg',
			},
			{
				text: '단일 상품 상품 상세정보',
				url: '/CMS_04_2/single/detail',
			},
			{
				text: '세트 상품 등록',
				url: '/CMS_04_2/set/reg',
				etc: 'popup : 단일상품 조회',
			},
			{
				text: '세트 상품 상품 상세정보',
				url: '/CMS_04_2/set/detail',
			},
		],
	},
	{
		title: '기준정보',
		subList: [
			{
				subtitle: '로케이션 관리',
				text: '로케이션 관리',
				url: '/CMS_04_3/',
			},
		],
	},
	{
		title: '시스템 관리',
		subList: [
			{
				subtitle: '사용자 계정 관리',
				text: '사용자 계정 관리',
				url: '/CMS_05_1/',
			},
			{
				text: '사용자 계정 등록/편집',
				url: '/CMS_05_1/reg',
			},
			{
				text: '사용자 계정 상세',
				url: '/CMS_05_1/detail/id-0',
				etc: 'popup : 메뉴별 접근권한 설정, 임시 비밀번호 재발급',
			},
		],
	},
];

export const currentPath = (pathName: string): string => {
	const normalizedPath = pathName.endsWith('/') ? pathName : `${pathName}/`;
	const allSubMenus = menuArrays.flatMap((menu) => menu.subList);
	const matchedMenu = allSubMenus.find((sub) => {
		const normalizedSubUrl = sub?.url?.endsWith('/') ? sub.url : `${sub.url}/`;
		return normalizedPath === normalizedSubUrl;
	});

	if (!matchedMenu) {
		return '';
	}

	return matchedMenu.text || '';
};
