import * as FileSystem from 'expo-file-system';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { info } from '@/src/api/info';
import { Root, Data } from '@/src/types/info';
import { Ionicons } from '@expo/vector-icons';
import ScrollViewVertical from '@/src/components/scroll/ScrollViewVertical';
import AnimeDetails from '@/src/components/details/AnimeDetails';

const CACHE_DURATION = 24 * 60 * 60 * 1000;
const cachePath = (id: string) => `${FileSystem.cacheDirectory}anime-${id}.json`;

const LoadingView = React.memo(() => (
  <View className="flex-1 justify-center items-center bg-black">
    <ActivityIndicator size="large" color="#1E90FF" />
    <Text className="text-white mt-4">Fetching data...</Text>
  </View>
));

const ErrorView = React.memo<{ error: string }>(({ error }) => (
  <View className="flex-1 justify-center items-center bg-black p-4">
    <Text className="text-red-400 text-center">{error}</Text>
  </View>
));

const EmptyView = React.memo(() => (
  <View className="flex-1 justify-center items-center bg-black p-4">
    <Text className="text-red-400">No data found.</Text>
  </View>
));

const AnimeSection = React.memo<{ title: string; animes?: any[] }>(({ title, animes }) => {
  if (!Array.isArray(animes) || animes.length === 0) {
    return (
      <View className="mt-5">
        <Text className="text-white font-semibold mb-2">{title}</Text>
        <Text className="text-gray-400 text-sm">No items available.</Text>
      </View>
    );
  }

  return (
    <View className="mt-5">
      <Text className="text-white font-semibold mb-2">{title}</Text>
      <ScrollViewVertical relatedAnimes={animes} />
    </View>
  );
});

const Details: React.FC = () => {
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
    console.log(`Play button pressed to ${id} episodes list`);
  }, [id]);

  const headerRight = useMemo(() => (
    <Pressable onPress={handleRefresh} className="mr-4">
      <Ionicons name="refresh" size={24} color="white" />
    </Pressable>
  ), [handleRefresh]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRight,
    });
  }, [navigation, headerRight]);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  if (loading && !filteredData) return <LoadingView />;
  if (error) return <ErrorView error={error} />;
  if (!filteredData) return <EmptyView />;

  const { anime, relatedAnimes, recommendedAnimes } = filteredData;

  return (
    <View className="flex-1 bg-pink-500 relative">
      <ScrollView
        className="flex-1 bg-black"
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#1E90FF"
            colors={['#1E90FF']}
          />
        }
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      >
        <AnimeDetails anime={anime} />
        <AnimeSection title="Related Animes" animes={relatedAnimes} />
        <AnimeSection title="Recommended Animes" animes={recommendedAnimes} />
      </ScrollView>

      <View className="rounded-full overflow-hidden absolute bottom-3 right-6">
        <Pressable
          onPress={handlePlayPress}
          className="bg-brand-primary flex-row items-center px-4 py-2"
          android_ripple={{
            color: 'rgba(255,255,255,0.2)',
            foreground: false,
          }}
        >
          <Ionicons name="play" size={16} color="white" />
          <Text className="text-white ml-2 font-semibold">Play</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Details;
