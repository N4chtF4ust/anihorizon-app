import React, { useState, useEffect } from 'react';
import {
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { search } from '../../src/api/search';
import { Root, Anime } from '../../src/types/search';
import SearchContent from '../../src/components/search/SearchContent';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== '') {
        handleSearch(query);
      } else {
        setFilteredData([]);
      }
    }, 500); // debounce delay

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSearch = async (text: string) => {
    try {
      setLoading(true);
      const results: Root = await search(text);
      setFilteredData(results.data.animes);
     // console.log('Search results:', JSON.stringify(results.data.animes, null, 2)); //remove if you don't need this log
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-black flex-1 pl-2 pr-2 ">
      <TextInput
        className="bg-white rounded-lg px-4 py-2 text-black mt-4 mb-2"
        placeholder="Search anime..."
        placeholderTextColor="#999"
        value={query}
        onChangeText={setQuery}
      />
      <SearchContent query={query} loading={loading} data={filteredData}  />
    </SafeAreaView>
  );
};

export default SearchScreen;
