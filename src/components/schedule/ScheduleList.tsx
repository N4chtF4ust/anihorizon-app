import React from 'react';
import { View, Text,Image } from 'react-native';
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

  const scheduledAnimes = schedule?.data?.scheduledAnimes;

  if (Array.isArray(scheduledAnimes) && scheduledAnimes.length === 0) {
    return (
      <Text className="text-gray-400 mt-4 text-center">
        No schedule available for this date.
      </Text>
    );
  }

  return (
    <View className="   flex-1 w-full">
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
