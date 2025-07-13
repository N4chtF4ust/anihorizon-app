import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { fetchSchedule } from '@/api/schedule'; // Adjust path as needed
import { Link, router } from 'expo-router';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [schedule, setSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchedule = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSchedule(selectedDate);
        console.log(`Selected date is ${selectedDate}`);
        console.log('Schedule data:', data);
        setSchedule(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadSchedule();
  }, [selectedDate]);

  const handleAnimePress = (animeId: string) => {
    router.push(`/details/${animeId}`);
  };

  return (
    <SafeAreaView className="bg-black pt-10 h-full">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-black p-4">
          {/* Calendar */}
          <View className="rounded-2xl bg-brand-dark p-4 mb-4">
            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: '#8CCDEB',
                  selectedTextColor: '#0B1D51',
                },
              }}
              disableAllTouchEventsForInactiveDays={true}
              theme={{
                selectedDayBackgroundColor: '#3B82F6',
                todayTextColor: '#3B82F6',
                arrowColor: '#8CCDEB',
                textSectionTitleColor: '#FFF',
                calendarBackground: 'transparent',
                textDayFontFamily: 'System',
                textMonthFontWeight: 'bold',
                monthTextColor: '#FFF',
                textDayStyle: {
                  color: '#FFF',
                },
                textDisabledColor: '#9CA3AF',
              }}
            />
          </View>

          {/* Loading / Error */}
          {loading && <ActivityIndicator size="large" color="#8CCDEB" />}
          {error && <Text className="text-red-500 text-center">{error}</Text>}

          {/* Selected Date */}
          <Text className="text-center mt-4 text-gray-300">
            {selectedDate ? `Selected: ${selectedDate}` : 'Please select a date'}
          </Text>

          {/* Schedule List - Method 1: Using router.push */}
          {schedule && (
            <View className="mt-4">
              {schedule?.data?.scheduledAnimes?.length > 0 ? (
                schedule.data.scheduledAnimes.map((anime: any, index: number) => (
                  <TouchableOpacity
                    key={`${anime.id}-${anime.time}-${index}`}
                    onPress={() => handleAnimePress(anime.id)}
                    className="bg-gray-800 p-3 my-2 rounded-xl"
                  >
                    <Text className="text-white font-bold text-base">
                      {anime.name} (EP {anime.episode})
                    </Text>
                    <Text className="text-gray-300 text-sm">
                      Time: {anime.time}
                    </Text>
                    <Text className="text-gray-500 text-xs italic">
                      {anime.jname}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text className="text-gray-400 mt-4 text-center">
                  No schedule available for this date.
                </Text>
              )}
            </View>
          )}

          {/* Fallback for no schedule */}
          {!schedule && !loading && !error && (
            <Text className="text-gray-400 text-center mt-10">
              No schedule data available.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Schedule;