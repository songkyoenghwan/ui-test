export function getApiHeaders() {
    return {
        'Content-Type': 'application/json',
        'X-Device-Type': 'web'
    };
}

export function toQueryString(params) {
    return Object.entries(params)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
        .join('&');
}

export function toPostBody(params) {
    return JSON.stringify(params);
}

export async function fetchJson(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const text = await response.text();

        if (response.status === 401 && url !== '/auth/login') {
            const refreshResponse = await fetch('/auth/refresh', { method: 'POST' });

            if (refreshResponse.status === 401) {
                window.location.href = '/auth/login';
                return;
            }

            const retryResponse = await fetch(url, options);
            const retryText = await retryResponse.text();

            if (!retryResponse.ok) {
                throw new Error(`서버 오류 ${retryResponse.status} - ${retryText}`);
            }

            return JSON.parse(retryText);
        }

        if (!response.ok) {
            throw new Error(`서버 오류 ${response.status} - ${text}`);
        }

        return JSON.parse(text);
    } catch (error) {
        console.log(`에러 발생: ${error.message}`);
        throw error;  // 필요 시 상위에서 다시 처리할 수 있게 던짐
    }
}