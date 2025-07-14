import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl;

export const search = async (query: string) => {
  console.log('API_URL:', API_URL);
  console.log('Full URL:', `${API_URL}/api/v2/hianime/search?q=${query}`);

  if (!API_URL) {
    throw new Error('API URL is not configured');
  }

  try {
    const response = await fetch(`${API_URL}/api/v2/hianime/search?q=${query}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch schedule: ${response.status}`);
    }

    const data = await response.json(); // ✅ Get the JSON body
  //  console.log('Search results:', JSON.stringify(data, null, 2));
    return data; // ✅ Return it to the caller
  } catch (error) {
    console.error('Error fetching schedule:', error);
    throw error;
  }
};
