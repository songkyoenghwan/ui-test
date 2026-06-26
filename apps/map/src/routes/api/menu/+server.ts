const menuList = [
	{
		page: '관광솔루션',
		title: '지도',
		subList: [
			{
				text: '지도',
				url: '/CMS-MAP-001/',
			},
		],
	},
	{
		title: '대상지',
		subList: [
			{
				text: '대상지 관리(List)',
				url: '/tour-destinations',
			},
			{
				text: '대상지 상세',
				url: '/CMS-LOC-001/1',
			},
			{
				text: '대상지 등록',
				url: '/CMS-LOC-001/ref',
			},
		],
	},
];

export const GET = async () => {
	return new Response(JSON.stringify(menuList), {
		headers: { 'content-type': 'application/json' },
	});
};
