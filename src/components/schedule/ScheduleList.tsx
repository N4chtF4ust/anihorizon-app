import React from 'react';
import { View, Text } from 'react-native';
import ScheduleItem from './ScheduleItem';

interface ScheduleListProps {
  schedule: any;
  loading: boolean;
  error: string | null;
  selectedDate: string;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  schedule,
  loading,
  error,
  selectedDate,
}) => {
  if (loading || !schedule) return null;

  if (error) {
    return (
      <Text className="text-red-500 mt-4 text-center">
        Failed to load schedule: {error}
      </Text>
    );
  }

  const scheduledAnimes = schedule?.data?.scheduledAnimes;

  if (Array.isArray(scheduledAnimes) && scheduledAnimes.length === 0) {
    return (
      <Text className="text-gray-400 mt-4 text-center">
        No schedule available for this date.
      </Text>
    );
  }

  return (
    <View className="mt-4">
      {scheduledAnimes?.map((anime: any, index: number) => (
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
