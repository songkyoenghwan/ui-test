import type { PageServerLoad } from './$types';
import { error, isHttpError, isRedirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	try {
		let simulation = [
			{
				id: 'GLASS-01',
				name: '홍길동',
				line: 'line-a',
				current_state: 'TL-16',
				route: ['TL-01', 'TL-02', 'TL-03', 'TL-01', 'TL-02', 'TL-03'],
			},
			{
				id: 'GLASS-02',
				name: '',
				line: '',
				current_state: '',
				route: [],
			},
			{
				id: 'GLASS-03',
				name: '',
				line: '',
				current_state: '',
				route: [],
			},
			{
				id: 'GLASS-04',
				name: '',
				line: '',
				current_state: '',
				route: [],
			},
		];

		return {
			simulation,
		};
	} catch (err) {
		if (isRedirect(err) || isHttpError(err)) {
			throw err;
		}
	}
};
