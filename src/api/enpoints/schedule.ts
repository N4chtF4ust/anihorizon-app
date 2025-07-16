import { fetchFromApi } from '../api';

export const fetchSchedule = async (date: string) => {
    return fetchFromApi({
    path: `/api/v2/hianime/schedule`,
    query: { date },
  });
};
