import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import ShimmerPlaceholder from '@/src/components/details/ShimmerPlaceholder';
import { Anime } from '@/src/types/info';
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
} from '@expo/vector-icons';

interface DetailsProps {
  anime: Anime;
}

const AnimeDetails: React.FC<DetailsProps> = ({ anime }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const hasCharacters =
    Array.isArray(anime.info.charactersVoiceActors) &&
    anime.info.charactersVoiceActors.some(
      (pair) => pair.character?.name && pair.voiceActor?.name
    );

  return (
    <>
      {/* Banner */}
      <View className="flex-row bg-brand-primary rounded-xl overflow-hidden mt-4 ">
        <View className="flex-1 p-4 justify-center">
          <Text className="text-white text-xl font-bold" numberOfLines={2}>
            {anime.info.name}
          </Text>
          <Text className="text-gray-300 text-sm mt-1 italic">
            {anime.moreInfo?.japanese || 'Japanese title not available'}
          </Text>
          <Text className="text-white text-xs mt-1 font-medium">
            {(anime.moreInfo?.status || 'Unknown')} • {(anime.moreInfo?.duration || 'N/A')}
          </Text>
        </View>

        <View className="w-32 h-48 relative">
          {!loaded && (
            <View className="absolute w-full h-full rounded-l-md overflow-hidden z-10">
              <ShimmerPlaceholder />
            </View>
          )}
          <Image
            source={{ uri: anime.info.poster }}
            className="w-full h-full rounded-l-md"
            resizeMode="cover"
            onLoadEnd={() => setLoaded(true)}
            onError={() => setLoaded(true)}
          />
        </View>
      </View>

      {/* Description */}
      <View className="mt-5 ">
        <View className="flex-row items-center mb-1">
          <MaterialIcons name="description" size={18} color="white" />
          <Text className="text-white font-semibold ml-2">Description</Text>
        </View>
        {anime.info.description ? (
          <>
            <Text className="text-gray-300 text-sm leading-relaxed">
              {showFullDesc
                ? anime.info.description
                : anime.info.description.slice(0, 300) +
                  (anime.info.description.length > 300 ? '...' : '')}
            </Text>
            {anime.info.description.length > 300 && (
              <Text
                onPress={() => setShowFullDesc(!showFullDesc)}
                className="text-blue-400 mt-1 text-sm font-medium"
              >
                {showFullDesc ? 'See Less' : 'See More'}
              </Text>
            )}
          </>
        ) : (
          <Text className="text-gray-500 italic">No description available.</Text>
        )}
      </View>

     {/* Stats */}
<View className="mt-5">
  <View className="flex-row items-center mb-2">
    <Ionicons name="stats-chart" size={18} color="white" />
    <Text className="text-white font-semibold ml-2">Stats</Text>
  </View>

  {anime.info.stats ? (
    <View className="flex-row flex-wrap gap-x-5 gap-y-3 mt-2">
      <View className="flex-row items-center space-x-1">
        <Ionicons name="star" size={16} color="#FACC15" />
        <Text className="text-gray-300 text-sm">{anime.info.stats.rating || 'N/A'}</Text>
      </View>

      <View className="flex-row items-center space-x-1">
        <Ionicons name="tv" size={16} color="#60A5FA" />
        <Text className="text-gray-300 text-sm">{anime.info.stats.quality || 'N/A'}</Text>
      </View>

      <View className="flex-row items-center space-x-1">
        <Ionicons name="mic" size={16} color="#34D399" />
        <Text className="text-gray-300 text-sm">
          Sub {anime.info.stats.episodes?.sub ?? '0'}, Dub {anime.info.stats.episodes?.dub ?? '0'}
        </Text>
      </View>

      <View className="flex-row items-center space-x-1">
        <Ionicons name="videocam" size={16} color="#F87171" />
        <Text className="text-gray-300 text-sm">{anime.info.stats.type || 'N/A'}</Text>
      </View>
    </View>
  ) : (
    <Text className="text-gray-500 italic">No stats available.</Text>
  )}
</View>


      {/* Genres */}
      <View className="mt-5">
        <View className="flex-row items-center mb-2">
          <Ionicons name="pricetags" size={18} color="white" />
          <Text className="text-white font-semibold ml-2">Genres</Text>
        </View>
        {Array.isArray(anime.moreInfo?.genres) && anime.moreInfo.genres.length > 0 ? (
          <View className="flex-row flex-wrap gap-2">
            {anime.moreInfo.genres.map((genre, idx) => (
              <View
                key={idx}
                className="bg-brand-primary px-3 py-1 rounded-full"
              >
                <Text className="text-white text-xs font-medium">{genre}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text className="text-gray-500 italic">No genres available.</Text>
        )}
      </View>

      {/* Characters & Voice Actors */}
      <View className="mt-6">
        <View className="flex-row items-center mb-2">
          <FontAwesome5 name="users" size={16} color="white" />
          <Text className="text-white font-semibold ml-2">Characters & Voice Actors</Text>
        </View>
        {hasCharacters ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {anime.info.charactersVoiceActors.map((pair, idx) => {
              if (!pair.character?.name || !pair.voiceActor?.name) return null;
              return (
                <View key={idx} className="mr-3 items-center">
                  <Image
                    source={{ uri: pair.character.poster }}
                    className="w-20 h-28 rounded-md"
                  />
                  <View className="w-20 items-center px-1 mt-1">
                    <Text
                      className="text-white text-xs text-center"
                      numberOfLines={10}
                      ellipsizeMode="tail"
                    >
                      {pair.character.name}
                    </Text>
                    <Text
                      className="text-gray-400 text-xs text-center mt-0.5"
                      numberOfLines={10}
                      ellipsizeMode="tail"
                    >
                      VA: {pair.voiceActor.name}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <Text className="text-gray-500 italic">No characters or voice actors found.</Text>
        )}
      </View>
    </>
  );
};

export default AnimeDetails;
