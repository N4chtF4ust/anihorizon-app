import * as FileSystem from 'expo-file-system';
import { View, Text, ScrollView, Button } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { info } from '@/src/api/info';
import { Root, Data } from '@/src/types/info';

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const cachePath = (id: string) => `${FileSystem.cacheDirectory}anime-${id}.json`;

const Details: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [filteredData, setFilteredData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInfo = useCallback(async () => {
    if (!id) return;
    const path = cachePath(id);
    setLoading(true);

    try {
      // Check if cache file exists
      const fileInfo = await FileSystem.getInfoAsync(path);
      if (fileInfo.exists) {
        const content = await FileSystem.readAsStringAsync(path);
        const { data, timestamp } = JSON.parse(content);
        const isFresh = Date.now() - timestamp < CACHE_DURATION;

        if (isFresh) {
          setFilteredData(data);
          console.log('Loaded from file cache');
          setLoading(false);
          return;
        } else {
          await FileSystem.deleteAsync(path);
          console.log('File cache expired');
        }
      }

      // Fetch from API
      const result: Root = await info(id);
      setFilteredData(result.data);

      // Write cache file
      await FileSystem.writeAsStringAsync(
        path,
        JSON.stringify({ data: result.data, timestamp: Date.now() })
      );
      console.log('Fetched and cached to file');
    } catch (error) {
      console.error('Error fetching info:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  const handleRefresh = async () => {
    if (!id) return;
    await FileSystem.deleteAsync(cachePath(id), { idempotent: true });
    fetchInfo();
  };

  return (
    <View className="bg-black h-full justify-center items-center">
      <ScrollView
        className="w-full px-4"
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        {loading ? (
          <Text className="text-white text-lg font-semibold">Fetching data...</Text>
        ) : filteredData ? (
          <Text className="text-white text-sm">
            {JSON.stringify(filteredData, null, 2)}
          </Text>
        ) : (
          <Text className="text-red-400">No data found.</Text>
        )}

        <View className="mt-4">
          <Button title="Refresh" onPress={handleRefresh} color="#1E90FF" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Details;
