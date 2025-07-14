import { Anime } from '@/src/types/search';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
const AnimeCard: React.FC<{ anime: Anime; isLast?: boolean }> = ({ anime, isLast }) => {
    const handlePress = () => router.push(`/details/${anime.id}`);

    return (
        <TouchableOpacity
            onPress={handlePress}
            className={`bg-gray-800 p-3 my-2 rounded-xl ${isLast ? 'mb-28' : ''}`}
        >
            <View className="flex-row gap-3 p-3 border-b border-brand-light">
                <Image
                    source={{ uri: anime.poster }}
                    className="w-16 h-24 rounded-md bg-gray-300 self-center"
                    resizeMode="cover"
                />

                <View className="flex-1 justify-between gap-1">
                    <Text className="text-brand-pale text-base font-semibold">
                        {anime.name}
                    </Text>
                    <Text className="text-brand-light text-xs">{anime.jname}</Text>

                    <View className="flex-row flex-wrap items-center gap-x-2 mt-1">
                        <Text className="text-white text-xs px-2 py-1 bg-brand-primary rounded-full">
                            {anime.type}
                        </Text>
                        <Text className="text-white text-xs">{anime.duration}</Text>

                        {anime.rating && (
                            <Text className="text-brand-pale text-xs font-medium">
                                Rated {anime.rating}
                            </Text>
                        )}
                    </View>

                    <View className="flex-row gap-2 mt-1">
                        {anime.episodes.sub !== undefined && (
                            <View
                                className="flex flex-row items-center content-center"
                                style={{ flexWrap: 'wrap' }}
                            >
                                <MaterialCommunityIcons name="subtitles" size={20} color="white" />
                                <Text className="text-white text-xs">: {anime.episodes.sub}</Text>
                            </View>
                        )}
                        {anime.episodes.dub !== undefined && (
                            <View
                                className="content-center flex flex-row items-center"
                                style={{ flexWrap: 'wrap' }}
                            >
                                <Entypo name="mic" size={15} color="white" />
                                <Text className="text-white text-xs">: {anime.episodes.dub}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default AnimeCard;
