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

import {ScheduledAnime} from "@/src/types/schedule"



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
    removeClippedSubviews={true} // keep this if needed
  >
        <View className="bg-black  items-center w-full min-h-screen gap-3">
          {/* Toggle Button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }} className="absolute top-16 z-20 right-2">
            <Pressable
              onPress={toggleCalendar}
              className="flex-row items-center w-full px-4 py-2 bg-brand-primary rounded-xl"
            >
               {/* Icon wrapper with relative position */}
                <View className="relative h-8 w-8 mr-1 justify-center items-center">
                  {/* Calendar icon (background) */}
                  <Ionicons
                    name="calendar"
                    size={15}
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
                      color="#0B1D51"
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
            className=""
          >
            <View className="flex-row  mt-2 mb-2 pl-2 w-screen">
              <Ionicons name="time" size={24} color="#FFE3A9" className="mr-2" />
              <Text className="text-brand-pale text-lg font-medium ">{displayDate}</Text>
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
            scheduleData={schedule}
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