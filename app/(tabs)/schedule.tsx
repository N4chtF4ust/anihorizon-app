import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CalendarCard from '@/src/components/schedule/CalendarCard';
import ScheduleList from '@/src/components/schedule/ScheduleList';
import { useSchedule } from '@/src/hooks/useSchedule';
import { useCalendarAnimation } from '@/src/hooks/useCalendarAnimation';

const Schedule = () => {
  const today = useMemo(() => new Date().toLocaleDateString('en-CA'), []);

  const {
    selectedDate,
    schedule,
    loading,
    refreshing,
    error,
    handleDayPress,
    handleRefresh,
  } = useSchedule(today);

  const {
    showCalendar,
    toggleCalendar,
    calendarOpacity,
    calendarTranslateY,
    buttonScale,
    dateMarginTop,
  } = useCalendarAnimation();

  const displayDate = useMemo(() => {
    const date = new Date(selectedDate);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [selectedDate]);

  const showLoadingOverlay = loading && schedule.length === 0;

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#8CCDEB"
            colors={['#8CCDEB']}
          />
        }
        removeClippedSubviews
        maxToRenderPerBatch={10}
        windowSize={10}
      >
        <View className="bg-black pt-10 px-4 items-center w-full min-h-screen space-y-4">
          {/* Toggle Button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }} className="absolute top-12 z-20">
            <Pressable
              onPress={toggleCalendar}
              className="flex-row items-center space-x-2 px-4 py-2 bg-brand-primary rounded-full"
            >
               {/* Icon wrapper with relative position */}
                <View className="relative h-8 w-8 mr-2 justify-center items-center">
                  {/* Calendar icon (background) */}
                  <Ionicons
                    name="calendar"
                    size={18}
                    color="#fff"
                  />
              
                  {/* Ban icon (overlay) - Always rendered but with opacity animation */}
                  <Animated.View
                    style={{
                      position: 'absolute',
                      opacity: showCalendar ? 1 : 0,
                    }}
                    pointerEvents="none"
                  >
                    <Ionicons
                      name="ban-outline"
                      size={30}
                      color="red"
                    />
                  </Animated.View>
                </View>
              
                {/* Label */}
                <Text className="text-white font-semibold">
                  {showCalendar ? 'Hide' : 'Show'}
                </Text>
            </Pressable>
          </Animated.View>

          {/* Calendar */}
          {showCalendar && (
            <Animated.View
              style={{
                opacity: calendarOpacity,
                transform: [{ translateY: calendarTranslateY }],
              }}
              className="w-full"
            >
              <CalendarCard
                selectedDate={selectedDate}
                onDayPress={handleDayPress}
              />
            </Animated.View>
          )}

          {/* Date Display */}
          <Animated.View
            style={{ marginTop: dateMarginTop }}
            className="mt-2"
          >
            <View className="flex-row items-center justify-center mt-2 mb-2 rounded">
              <Ionicons name="time-outline" size={24} color="white" className="mr-2" />
              <Text className="text-gray-300 text-lg font-medium">{displayDate}</Text>
            </View>
          </Animated.View>

          {/* Loading Spinner */}
          {loading && (
            <View className={`flex-row items-center mt-2 h-screen absolute ${showCalendar? "pt-96" : ""}`}>
              <ActivityIndicator size="small" color="#8CCDEB" />
              <Text className="text-gray-400 ml-2">Updating...</Text>
            </View>
          )}

          {/* Schedule List */}
          <ScheduleList
            schedule={schedule}
            loading={loading}
            error={error}
            selectedDate={selectedDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Schedule;