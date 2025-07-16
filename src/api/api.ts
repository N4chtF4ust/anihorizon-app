import { API_URL, TIMEOUT_MS } from './configuration';

interface FetchOptions {
  path: string;
  query?: Record<string, string>;
}

export const fetchFromApi = async ({ path, query }: FetchOptions) => {
  if (!API_URL) {
    throw new Error('API URL is not configured');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const queryString = query
    ? '?' +
      Object.entries(query)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
        .join('&')
    : '';

  const url = `${API_URL}${path}${queryString}`;
  console.log('API_URL:', API_URL);
  console.log('Full URL:', url);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Server might be down.');
    }
    console.error('Error fetching:', error);
    throw new Error(`Network or server error: ${error.message}`);
  }
};
