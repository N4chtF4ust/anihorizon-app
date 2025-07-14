import { fetchSchedule } from '@/src/api/schedule';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

import ScheduleList from '../../src/components/schedule/ScheduleList';


const Schedule = () => {
  // ✅ Use local timezone-aware date in YYYY-MM-DD format
  const today = new Date().toLocaleDateString('en-CA'); // e.g., "2025-07-13"
  const [selectedDate, setSelectedDate] = useState(today);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

const handleDayPress = (day: any) => {
  const newDate = day.dateString;
  if (newDate === selectedDate) return; // Prevent re-triggering fetch
  setSchedule([]); // Clear old data
  setSelectedDate(newDate); // Triggers fetch
};


  // 🔁 Fetch schedule when selectedDate changes
  useEffect(() => {
    const loadSchedule = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching schedule for:', selectedDate);
        const data = await fetchSchedule(selectedDate);
        console.log('Fetched data:', data);
        setSchedule(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    loadSchedule();
  }, [selectedDate]);

  // ✅ Simulate pressing today on mount (in user's local timezone)
  useEffect(() => {
    handleDayPress({ dateString: today });
  }, []);

  return (
    <SafeAreaView className="bg-black  h-full">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} 
    
      showsVerticalScrollIndicator={false}>
        <View className="bg-black pt-10 ">
          {/* Calendar */}
          <View className="rounded-2xl bg-brand-dark p-4 mb-4">
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: '#725CAD',
                  selectedTextColor: '#FFF',
                },
              }}
              disableAllTouchEventsForInactiveDays
              theme={{
                selectedDayBackgroundColor: '#3B82F6',
                todayTextColor: '#3B82F6',
                arrowColor: '#8CCDEB',
                textSectionTitleColor: '#FFF',
                calendarBackground: 'transparent',
                textDayFontFamily: 'System',
                textMonthFontWeight: 'bold',
                monthTextColor: '#FFF',
                textDayStyle: { color: '#FFF' },
                textDisabledColor: '#9CA3AF',
              }}
            />
          </View>

          {/* Selected Date */}
          <Text className="text-center mt-4 text-gray-300 text-lg">
            {selectedDate ? formatDisplayDate(selectedDate) : 'Please select a date'}
          </Text>

          {loading && <ActivityIndicator size="large" color="#8CCDEB" className='top-1/3' />}
          {error && <Text className="text-red-500 text-center">{error}</Text>}

          {/* List */}
          <ScheduleList schedule={schedule} loading={loading} error={error} selectedDate={selectedDate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Schedule;
