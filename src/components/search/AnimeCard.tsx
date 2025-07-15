import { Anime } from '@/src/types/search';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const AnimeCard: React.FC<{ anime: Anime; isLast?: boolean }> = ({ anime, isLast }) => {
  const handlePress = () => router.push(`/details/${anime.id}`);

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-gray-800 my-2 rounded-xl ${isLast ? 'mb-28' : ''}`}
    >
      <View className="flex-row gap-3 p-3">
        <Image
          source={{ uri: anime.poster }}
          className="w-16 h-24 rounded-md bg-gray-300 self-center"
          resizeMode="cover"
        />

        <View className="flex-1 justify-between">
          {/* Title & Japanese Title */}
          <View>
            <Text
              className="text-brand-pale text-base font-semibold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {anime.name}
            </Text>
            <Text
              className="text-brand-light text-xs"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {anime.jname}
            </Text>
          </View>

          {/* Extra Metadata */}
          <View className="flex-row flex-wrap gap-x-2 mt-1">
            {/* Type */}
            <View className="flex-row items-center gap-1">
              <MaterialIcons name="category" size={14} color="#ccc" />
              <Text className="text-xs text-gray-300">{anime.type}</Text>
            </View>

            {/* Duration */}
            <View className="flex-row items-center gap-1">
              <MaterialCommunityIcons name="clock-outline" size={14} color="#ccc" />
              <Text className="text-xs text-gray-300">{anime.duration}</Text>
            </View>

            {/* Rating (if available) */}
            {anime.rating && (
              <View className="flex-row items-center gap-1">
                <MaterialIcons name="star" size={14} color="#facc15" />
                <Text className="text-xs text-yellow-300">{anime.rating}</Text>
              </View>
            )}
          </View>

          {/* Subtitle & Dub Info */}
          <View className="flex-row gap-3 mt-2">
            {anime.episodes.sub !== undefined && (
              <View className="flex-row items-center gap-1">
                <MaterialCommunityIcons name="subtitles" size={16} color="white" />
                <Text className="text-white text-xs">{anime.episodes.sub}</Text>
              </View>
            )}
            {anime.episodes.dub !== undefined && (
              <View className="flex-row items-center gap-1">
                <Entypo name="mic" size={14} color="white" />
                <Text className="text-white text-xs">{anime.episodes.dub}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AnimeCard;
