import { atom, map } from 'nanostores';

export const searchList = atom([]);
export const searchResultList = atom([]);
export const categoryList = atom([]);
export const facilityList = atom([]);
export const pathList = atom([]);
export const recommendList = atom([]);
export const distance = map({
	start: '',
	end: '',
	step: 0,
	totalDistance: 0,
	time: 0,
});
