import { fetchFromApi } from '../api';

// Get anime episodes
export const getAnimeEpisodes = (animeId: string) => {
  return fetchFromApi({
    path: `/api/v2/hianime/anime/${animeId}/episodes`,
  });
};