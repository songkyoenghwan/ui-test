export async function download(url) {
	const response = await fetch(url);

	if (!response.ok) {
		return alert('파일 다운로드에 실패했습니다.');
	}

	const disposition = response.headers.get('content-disposition') ?? '';
	const params = new URLSearchParams(disposition.replace(/^[^;]+;?\s*/, '').replaceAll('; ', '&'));
	const utf8 = params.get("filename*");
	const filename = utf8 ? decodeURIComponent(utf8.replace(/UTF-8''/i, '')) : params.get("filename");

	const blob = await response.blob();
	const tmp = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = tmp;
	a.download = filename ?? 'download';
	a.click();
	URL.revokeObjectURL(tmp);
}