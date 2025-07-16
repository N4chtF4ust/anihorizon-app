import { Ionicons } from '@expo/vector-icons';
import { useLayoutEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';

import { useAnimeDetails } from '@/src/hooks/useAnimeDetails';
import useScrollHeader from '@/src/hooks/useScrollHeader';
import AnimeDetails from '@/src/components/details/AnimeDetails';
import ScrollViewVertical from '@/src/components/scroll/ScrollViewVertical';
import AnimatedHeader from '@/src/components/layout/AnimatedHeader';

const FullScreenView = ({ children }: { children: React.ReactNode }) => (
  <View
    className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black z-50"
    style={{ flex: 1 }}
  >
    {children}
  </View>
);

const LoadingView = () => (
  <FullScreenView>
    <ActivityIndicator size="large" color="#1E90FF" />
    <Text className="text-white mt-4">Fetching data...</Text>
  </FullScreenView>
);

const ErrorView = ({ error }: { error: string }) => (
  <FullScreenView>

      <Image
                  source={require('@/assets/images/internalServerError.png')}
                  className="size-72"
                  resizeMode="contain"
                />
    <Text className="text-red-400 text-center px-4">{error}</Text>
  </FullScreenView>
);

const EmptyView = () => (
  <FullScreenView>
    <Text className="text-red-400">No data found.</Text>
  </FullScreenView>
);

const AnimeSection = ({ title, animes }: { title: string; animes?: any[] }) => {
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
};

const Details: React.FC = () => {
  const {
    id,
    navigation,
    filteredData,
    loading,
    refreshing,
    error,
    handleRefresh,
    handlePlayPress,
  } = useAnimeDetails();

  const { onScroll, headerBackgroundColor } = useScrollHeader('transparent', '#0B1D51');

  const headerRight = useMemo(
    () => (
      <Pressable onPress={handleRefresh} className="mr-4">
        <Ionicons name="refresh" size={24} color="white" />
      </Pressable>
    ),
    [handleRefresh]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRight,
    });
  }, [navigation, headerRight]);

  // Conditional screens
  if (loading && !filteredData) return <LoadingView />;
  if (error) return <ErrorView error={error} />;
  if (!filteredData) return <EmptyView />;

  const { anime, relatedAnimes, recommendedAnimes } = filteredData;

  return (
    <View className="flex-1 relative bg-black">
      <AnimatedHeader backgroundColor={headerBackgroundColor} />

      <View className="flex-1">
        <Animated.ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingTop: 112,
            paddingBottom: 80,
            paddingHorizontal: 16,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#1E90FF"
              colors={['#1E90FF']}
            />
          }
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        >
          {/* Background Image */}
          <View className="w-screen h-1/2 absolute top-0 z-0 overflow-hidden">
            {anime?.info?.poster && (
              <>
                <Image
                  source={{ uri: anime.info.poster }}
                  resizeMode="cover"
                  className="w-full h-full"
                  style={{ opacity: 0.65 }}
                />
                <Image
                  source={require('@/assets/images/black_vertical_gradient.png')}
                  resizeMode="stretch"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </>
            )}
          </View>

          {/* Anime Content */}
          <AnimeDetails anime={anime} />
          <AnimeSection title="Related Animes" animes={relatedAnimes} />
          <AnimeSection title="Recommended Animes" animes={recommendedAnimes} />
        </Animated.ScrollView>
      </View>

      {/* Play Button */}
      <View className="rounded-full overflow-hidden absolute bottom-12 right-6">
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
