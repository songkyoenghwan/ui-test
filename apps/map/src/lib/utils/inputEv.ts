export function onlyNumber(e: Event) {
	const input = e.target as HTMLInputElement;
	let val = input.value.replace(/[^0-9.]/g, '');
	const parts = val.split('.');
	if (parts.length > 2) {
		val = parts[0] + '.' + parts.slice(1).join('');
	}

	return (input.value = val);
}
