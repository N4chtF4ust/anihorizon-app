import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { formatTime } from '../../utils/formatTime';
import ReminderButton from './ReminderButton';

const ScheduleItem = ({
  anime,
  selectedDate,
}: {
  anime: any;
  selectedDate: string;
}) => {
  if (!anime) return null;

  const handlePress = () => router.push(`/details/${anime.id}`);

  const fullDateTime = `${selectedDate}T${anime.time}`;
  const releaseTimestamp = new Date(fullDateTime).getTime();

  const getRemainingTime = () => {
    const now = new Date().getTime();
    const distance = releaseTimestamp - now;

    if (distance <= 0) return 'Released';

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const [countdown, setCountdown] = useState(getRemainingTime()); // set immediately

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [releaseTimestamp]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-gray-800 p-3 my-2 rounded-xl"
    >
      <Text className="text-white font-bold text-base">
        {anime.name} (EP {anime.episode})
      </Text>

      <Text className="text-gray-300 text-sm">
        Air in: {formatTime(fullDateTime)}
      </Text>

      <Text className="text-brand-pale text-xs mt-1">
        {countdown}
      </Text>

      <Text className="text-gray-500 text-xs italic">{anime.jname}</Text>

      <View className="mt-2">
        <ReminderButton anime={anime} selectedDate={selectedDate} />
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleItem;
