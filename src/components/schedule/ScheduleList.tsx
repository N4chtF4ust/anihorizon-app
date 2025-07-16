import React from 'react';
import { View, Text, Image } from 'react-native';
import ScheduleItem from './ScheduleItem';
import { Root, ScheduledAnime } from '@/src/types/schedule'; // adjust path if needed

interface ScheduleListProps {
  scheduleData: Root | null;
  loading: boolean;
  error: string | null;
  selectedDate: string;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  scheduleData,
  loading,
  error,
  selectedDate,
}) => {
  if (loading || !scheduleData) return null;

  if (error) {
    return (
      <>
        <Image
          source={require('@/assets/images/internalServerError.png')}
          className="size-72"
        />
        <Text className="text-red-500 mt-4 text-center">
          {error}
        </Text>
      </>
    );
  }

  const scheduledAnimes = scheduleData?.data?.scheduledAnimes ?? [];
  
  if (scheduledAnimes.length === 0) {
    return (
      <Text className="text-gray-400 mt-4 text-center">
        No schedule available for this date.
      </Text>
    );
  }

  return (
    <View className="flex-1 gap-2 w-full w-[95%]">
      {scheduledAnimes.map((anime: ScheduledAnime, index: number) => (
        <ScheduleItem
          key={`${anime.id}-${anime.time}-${index}`}
          anime={anime}
          selectedDate={selectedDate}
        />
      ))}
    </View>
  );
};

export default ScheduleList;
