import React, { useEffect, useRef } from 'react';
import {
  Text,
  FlatList,
  ActivityIndicator,
  View,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import AnimeCard from './AnimeCard';
import { Anime } from '@/src/types/search';

interface SearchContentProps {
  query: string;
  loading: boolean;
  data: Anime[];
  error: string;
}

const SearchContent: React.FC<SearchContentProps> = ({ query, loading, data,error }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      fadeAnim.setValue(1); // reset when not loading
    }
  }, [loading]);

  if (query.trim() === '') {
    return (
      <Text className="text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Search for your favorite anime...
      </Text>
    );
  }

  if (loading) {
    return (
      <View className="items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ActivityIndicator size="large" color="#60A5FA" />
        <Animated.Text
          style={{ opacity: fadeAnim }}
          className="text-blue-400 mt-2"
        >
          Searching...
        </Animated.Text>
      </View>
    );
  }

  if (!loading && data.length === 0 ) {
    return (
<View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">

{error ? (

  <>

    <Image
    source={require('@/assets/images/internalServerError.png')}
    className="size-72"

  />
  <Text className="text-red-500 text-center">{error}</Text>
    </>
) : (

  <>
  
    <Image
    source={require('@/assets/images/cry.png')}
    className="size-72"

  />
  <Text className="text-red-400 mt-2">No results found</Text>

  </>
)}

</View>

    );
  }

return (
  <ScrollView className="w-full h-auto ">
    <View className="flex flex-col">
      {data.map((item, index) => (
        <AnimeCard
          key={item.id}
          anime={item}
          isLast={index === data.length - 1}
        />
      ))}
    </View>
  </ScrollView>
)
};

export default SearchContent;
