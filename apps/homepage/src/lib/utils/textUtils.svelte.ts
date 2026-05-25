export function parseBreakline(txt: string | null | undefined): string {
	if (!txt) return '';
	return txt.replace(/\\n/g, '<br />');
}
