import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import ShimmerPlaceholder from '@/src/components/details/ShimmerPlaceholder';
import { RelatedAnime } from '@/src/types/info';

interface ScrollViewVerticalProps {
  relatedAnimes?: RelatedAnime[]; // ✅ optional, safe typing
}

const RelatedAnimeCard: React.FC<{ anime: RelatedAnime }> = ({ anime }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <View className="items-center m-1 w-40">
      {!loaded && (
        <View className="w-40 h-52 rounded-md overflow-hidden absolute">
          <ShimmerPlaceholder />
        </View>
      )}

      <Image
        source={{ uri: anime.poster }}
        className="w-40 h-52 rounded-md"
        onLoadEnd={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />

      <Text className="text-white text-xs mt-1 text-center w-24">
        {anime.name}
      </Text>
    </View>
  );
};

const ScrollViewVertical: React.FC<ScrollViewVerticalProps> = ({ relatedAnimes }) => {
  if (!Array.isArray(relatedAnimes) || relatedAnimes.length === 0) {
    return (
      <Text className="text-gray-400 text-sm px-2">No related anime found.</Text>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row space-x-10"
    >
      {relatedAnimes.map((anime, idx) => (
        <RelatedAnimeCard key={idx} anime={anime} />
      ))}
    </ScrollView>
  );
};

export default ScrollViewVertical;
