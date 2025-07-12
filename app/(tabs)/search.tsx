import { View, TextInput, FlatList, Text } from 'react-native';
import React, { useState } from 'react';

const animeList = [
  'Naruto',
  'One Piece',
  'Bleach',
  'Attack on Titan',
  'My Hero Academia',
  'Jujutsu Kaisen',
  'Demon Slayer',
];

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(animeList);

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = animeList.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <View className="flex-1 bg-orange-200 p-4">
      <TextInput
        className="bg-white rounded-lg px-4 py-2 text-black mb-4"
        placeholder="Search anime..."
        placeholderTextColor="#999"
        value={query}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text className="text-black text-base py-2 border-b border-orange-400">
            {item}
          </Text>
        )}
      />
    </View>
  );
};

export default SearchScreen
