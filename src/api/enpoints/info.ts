import { fetchFromApi } from '../api';

export const info = async (animeId: string) => {
  return fetchFromApi({
    path: `/api/v2/hianime/anime/${animeId}`,
  });
};