export function formatDate(dateStr) {
    if (!dateStr) return '-';

    const date = new Date(dateStr);

    // UTC → KST (UTC+9)
    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

    const yyyy = kstDate.getFullYear();
    const mm = String(kstDate.getMonth() + 1).padStart(2, '0');
    const dd = String(kstDate.getDate()).padStart(2, '0');
    const hh = String(kstDate.getHours()).padStart(2, '0');
    const mi = String(kstDate.getMinutes()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}

export function defaultFormatDate(dateStr) {
    if (!dateStr) return '-';

    const date = new Date(dateStr);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}