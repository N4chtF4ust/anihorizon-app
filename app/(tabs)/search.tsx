import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { search } from '../../src/api/enpoints/search';
import SearchContent from '../../src/components/search/SearchContent';
import { Anime, Root } from '../../src/types/search';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== '') {
        handleSearch(query);
      } else {
        setFilteredData([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSearch = async (text: string) => {
    try {
      setLoading(true);
      setError(null);
      const results: Root = await search(text);
      setFilteredData(results.data.animes);
    } catch (err: unknown) {
      console.error('Error searching:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-black flex-1 items-center w-full ">
      {/* Search + Filter Row */}
      <View className="flex-row items-center space-x-2 mt-4 mb-4 p-2 gap-3 ">
        {/* Search Input */}
        <View className="flex-1 flex-row items-center bg-brand-dark rounded-full p-2">
          <Ionicons name="search-outline" size={20} color="#FFFF" className="mr-2 ml-2" />
          <TextInput
            className="flex-1 text-white"
            placeholder="Search anime..."
            placeholderTextColor="#FFFF"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Filter Button */}
        <TouchableOpacity className="bg-brand-primary px-3 py-2 rounded-full flex-row items-center">
          <Feather name="filter" size={18} color="#fff" />
        </TouchableOpacity>
      </View>


      {/* Search Results */}
      <SearchContent
        query={query}
        loading={loading}
        data={filteredData}
        error={error ?? ''}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
