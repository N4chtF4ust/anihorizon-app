import {API_URL,TIMEOUT_MS} from './configuration';

export const search = async (query: string) => {
  if (!API_URL) {
    throw new Error('API URL is not configured');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const url = `${API_URL}/api/v2/hianime/search?q=${encodeURIComponent(query)}`;
  console.log('API_URL:', API_URL);
  console.log('Full URL:', url);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeout); // Clear timeout on success

    if (!response.ok) {
      throw new Error(`Failed to fetch search: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Server might be down.');
    }
    console.error('Error fetching search:', error);
    throw new Error(`Network or server error: ${error.message}`);
  }
};
