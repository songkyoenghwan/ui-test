export function isValidDate(dateString: string): boolean {
	const date = new Date(dateString);
	return date.toString() !== 'Invalid Date';
}

export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toISOString();
}