// src/hooks/useAnimeDetails.ts
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { useLocalSearchParams, useNavigation, router } from 'expo-router';
import { info } from '@/src/api/enpoints/info';
import { Root, Data } from '@/src/types/info';

const CACHE_DURATION = 24 * 60 * 60 * 1000;
const cachePath = (id: string) => `${FileSystem.cacheDirectory}anime-${id}.json`;

export function useAnimeDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [filteredData, setFilteredData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cacheFilePath = useMemo(() => (id ? cachePath(id) : null), [id]);

  const fetchInfo = useCallback(async (forceRefresh = false) => {
    if (!id || !cacheFilePath) return;

    setLoading(true);
    setError(null);

    try {
      if (!forceRefresh) {
        const fileInfo = await FileSystem.getInfoAsync(cacheFilePath);
        if (fileInfo.exists) {
          const content = await FileSystem.readAsStringAsync(cacheFilePath);
          const { data, timestamp } = JSON.parse(content);
          const isFresh = Date.now() - timestamp < CACHE_DURATION;

          if (isFresh) {
            setFilteredData(data);
            setLoading(false);
            return;
          } else {
            await FileSystem.deleteAsync(cacheFilePath).catch(() => {});
          }
        }
      }

      const result: Root = await info(id);
      setFilteredData(result.data);

      await FileSystem.writeAsStringAsync(
        cacheFilePath,
        JSON.stringify({ data: result.data, timestamp: Date.now() })
      ).catch(err => console.warn('Cache write failed:', err));
    } catch (err: unknown) {
      console.error('Error fetching:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [id, cacheFilePath]);

  const handleRefresh = useCallback(async () => {
    if (!id || !cacheFilePath) return;

    setRefreshing(true);
    try {
      await FileSystem.deleteAsync(cacheFilePath, { idempotent: true });
      await fetchInfo(true);
    } finally {
      setRefreshing(false);
    }
  }, [id, cacheFilePath, fetchInfo]);

  const handlePlayPress = useCallback(() => {
    router.push({
  pathname: '/episodes/[id]',
  params: { id: String(id) },
});

  }, [id]);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  return {
    id,
    navigation,
    filteredData,
    loading,
    refreshing,
    error,
    handleRefresh,
    handlePlayPress,
  };
}
