import { fetchFromApi } from '../api';

export const search = async (query: string) => {
   return fetchFromApi({
    path: `/api/v2/hianime/search`,
    query: { q: query },
  });
};
