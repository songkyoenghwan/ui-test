async function loadCmsLoc001() {
	const res = await fetch('http://localhost:5185/CMS-LOC-001');
	if (!res.ok) {
		throw new Error('Failed to load json');
	}
	const data = await res.json();
	console.log(data[0]);
	if (!data || data.length === 0) {
		throw new Error('Not found');
	}
	return data;
}

document.addEventListener('alpine:init', () => {
	const detail = import('alpinejs').Alpine.store('detail');
	import('alpinejs').Alpine.store('detail', {
		list: [],
		address: '서울특별시 용산구 이태원로 29 (한강로1가)',
		closingDay: {
			allWeek: '',
			day: '',
			dayWeek: ['wed', 'fri'],
			status: 'week',
			week: ['2', '3', '4'],
		},
		custom: {
			btnLink: [
				{
					en: {
						error: false,
						value: '송도센트럴파크2',
					},
					ja: {
						error: false,
						value: '송도센트럴파크4',
					},
					ko: {
						error: false,
						value: '송도센트럴파크1',
					},
					th: {
						error: false,
						value: '송도센트럴파크5',
					},
					vi: {
						error: false,
						value: '송도센트럴파크6',
					},
					zh: {
						error: false,
						value: '송도센트럴파크3',
					},
				},
			],
			color: '#000000',
			features: {
				ai: true,
				facility: true,
				facilityUse: '10',
				zone: true,
				zoneUse: '10',
			},
			information: {
				address: false,
				location: true,
				locationUse: '10',
				sorting: 'MANUAL',
			},
		},
		editTime: '2026-06-12 08:48',
		hours: '요일별 상이',
		id: 'CMS-LOC-001-detail-01',
		language: {
			en: true,
			ja: true,
			ko: true,
			th: true,
			vi: true,
			zh: true,
		},
		linkHomepage: 'https://naver.com',
		linkMap: 'https://naver.com',
		name: {
			en: {
				error: false,
				value: '송도센트럴파크2',
			},
			ja: {
				error: false,
				value: '송도센트럴파크4',
			},
			ko: {
				error: false,
				value: '송도센트럴파크1',
			},
			th: {
				error: false,
				value: '송도센트럴파크5',
			},
			vi: {
				error: false,
				value: '송도센트럴파크6',
			},
			zh: {
				error: false,
				value: '송도센트럴파크3',
			},
		},
		operatingHours: {
			cols: [
				{
					dayWeek: ['mon'],
					id: 'uniqueId2',
					time: {
						error: false,
						rest: false,
						restEnd: '',
						restStart: '',
						timeEnd: '01:00',
						timeStart: '00:00',
					},
				},
				{
					dayWeek: ['wed', 'fri'],
					id: 'uniqueId',
					time: {
						error: false,
						rest: false,
						restEnd: '',
						restStart: '',
						timeEnd: '01:00',
						timeStart: '00:00',
					},
				},
				{
					dayWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
					id: 'uniqueId',
					time: {
						error: false,
						rest: false,
						restEnd: '',
						restStart: '',
						timeEnd: '01:00',
						timeStart: '00:00',
					},
				},
				{
					dayWeek: ['sat', 'sun'],
					id: 'uniqueId',
					time: {
						error: false,
						rest: false,
						restEnd: '',
						restStart: '',
						timeEnd: '01:00',
						timeStart: '00:00',
					},
				},
			],
			status: 'week',
		},
		operationGuide: {
			en: {
				error: false,
				value: '송도센트럴파크2',
			},
			ja: {
				error: false,
				value: '송도센트럴파크4',
			},
			ko: {
				error: false,
				value: '송도센트럴파크1',
			},
			th: {
				error: false,
				value: '송도센트럴파크5',
			},
			vi: {
				error: false,
				value: '송도센트럴파크6',
			},
			zh: {
				error: false,
				value: '송도센트럴파크3',
			},
		},
		period: '상시 운영',
		status: '운영중',
	});
});

document.addEventListener('DOMContentLoaded', async () => {
	const detail = import('alpinejs').Alpine.store('detail');
	const pageId = 'CMS_01_2';

	try {
		if (detail) {
			const data = await loadCmsLoc001();
			detail.list = data;
			detail.language = data?.[0]?.language;
			detail.name = data?.[0]?.name;
			detail.address = data?.[0]?.address;
			detail.period = data?.[0]?.period;
			detail.closingDay = data?.[0]?.closingDay;
			detail.operationGuide = data?.[0]?.operationGuide;
			detail.linkHomepage = data?.[0]?.linkHomepage;
			detail.linkMap = data?.[0]?.linkMap;
		}
	} catch (error) {
		console.error('초기 데이터 설정 실패:', error);
	}
});
