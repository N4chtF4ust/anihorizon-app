import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
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

  const [countdown, setCountdown] = useState(getRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [releaseTimestamp]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-gray-800 p-3 mb-2 rounded-xl flex-row items-center"
    >
      {/* LEFT: Text Content */}
      <View className="flex-1 pr-3">
        <Text className="text-white font-bold text-base">
          {anime.name} (EP {anime.episode})
        </Text>

        <Text className="text-gray-300 text-sm">
          Air in: {formatTime(fullDateTime)}
        </Text>

        <Text className="text-brand-pale text-xs mt-1">{countdown}</Text>

        <Text className="text-gray-500 text-xs italic">{anime.jname}</Text>

        <View className="mt-2">
          <ReminderButton anime={anime} selectedDate={selectedDate} />
        </View>
      </View>

      {/* RIGHT: Image */}
      {anime.poster && (
        <Image
          source={{ uri: anime.poster }}
          style={{ width: 80, height: 100, borderRadius: 8 }}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
};

export default ScheduleItem;
