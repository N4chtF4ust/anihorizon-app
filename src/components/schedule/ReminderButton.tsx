// ReminderButton.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import { formatTime } from '../../utils/formatTime';
import {
  cancelNotification,
  requestNotificationPermission,
  scheduleNotification,
} from '../../utils/notifications';

interface Anime {
  id: string;
  name: string;
  episode: number;
  time: string; // "HH:mm"
  airingTimestamp: number;
  secondsUntilAiring: number;
}

const ReminderButton = ({
  anime,
  selectedDate,
}: {
  anime: Anime;
  selectedDate: string;
}) => {
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const [isAired, setIsAired] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const [isInitialized, setIsInitialized] = useState(false);
  const storageKey = `reminder-${anime.id}`;

  const airingDateTimeString = `${selectedDate}T${anime.time}`;
  const airingDateTime = new Date(airingDateTimeString);

  useEffect(() => {
    const init = async () => {
      if (isInitialized) return; // Prevent re-initialization
      
      try {
        // Check permission status without requesting
        const { status } = await Notifications.getPermissionsAsync();
        setPermissionStatus(status === 'granted' ? 'granted' : (status === 'denied' ? 'denied' : 'unknown'));

        // Load existing notification ID
        const storedId = await AsyncStorage.getItem(storageKey);
        if (storedId) {
          setNotificationId(storedId);
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing reminder button:', error);
        setIsInitialized(true);
      }
    };

    const checkIfAired = () => {
      const now = new Date();
      if (airingDateTime <= now) {
        setIsAired(true);
      }
    };

    init();
    checkIfAired();
  }, [airingDateTime, storageKey, isInitialized]);

  const openNotificationSettings = () => {
    Alert.alert(
      'Enable Notifications',
      'To receive anime reminders, please enable notifications in your device settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Open Settings', 
          onPress: () => Linking.openSettings()
        }
      ]
    );
  };

  const handleRemind = async () => {
    try {
      if (airingDateTime <= new Date()) {
        Alert.alert('Cannot Set Reminder', 'This anime has already aired.');
        return;
      }

      // Request permission only when user actually wants to set reminder
      if (permissionStatus !== 'granted') {
        const granted = await requestNotificationPermission();
        if (!granted) {
          Alert.alert(
            'Notifications Required',
            'This app needs notification permission to remind you about anime episodes.',
            [
              { text: 'Cancel', style: 'cancel' },
              { 
                text: 'Enable Notifications', 
                onPress: openNotificationSettings
              }
            ]
          );
          setPermissionStatus('denied');
          return;
        }
        setPermissionStatus('granted');
      }

      const id = await scheduleNotification({
        ...anime,
        airingTimestamp: airingDateTime.getTime(),
      });

      setNotificationId(id);
      await AsyncStorage.setItem(storageKey, id);

      Alert.alert(
        'Reminder Set!',
        `We'll remind you when ${anime.name} Episode ${anime.episode} airs at ${formatTime(
          airingDateTimeString
        )}`
      );
    } catch (error: any) {
      console.error('Error scheduling notification:', error);
      Alert.alert('Error', `Failed to schedule reminder: ${error.message}`);
    }
  };

  const handleUnremind = async () => {
    try {
      if (notificationId) {
        await cancelNotification(notificationId);
        await AsyncStorage.removeItem(storageKey);
        setNotificationId(null);
        Alert.alert('Reminder Canceled', 'Your reminder has been removed.');
      }
    } catch (error) {
      console.error('Error canceling notification:', error);
      Alert.alert('Error', 'Failed to cancel reminder');
    }
  };

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <TouchableOpacity
        className="bg-gray-400 px-3 py-1 rounded-md mt-1 self-start"
        disabled={true}
        activeOpacity={1}
      >
        <Text className="text-white text-sm">Loading...</Text>
      </TouchableOpacity>
    );
  }

  if (isAired) {
    return (
      <TouchableOpacity
        className="bg-gray-500 px-3 py-1 rounded-md mt-1 self-start"
        disabled={true}
        activeOpacity={1}
      >
        <Text className="text-white text-sm">Already Aired</Text>
      </TouchableOpacity>
    );
  }

  // Show enable notifications button if permissions are denied
  if (permissionStatus === 'denied' && !notificationId) {
    return (
      <TouchableOpacity
        onPress={openNotificationSettings}
        className="bg-yellow-600 px-3 py-1 rounded-md mt-1 self-start"
        activeOpacity={0.7}
      >
        <Text className="text-white text-sm">Enable Notifications</Text>
      </TouchableOpacity>
    );
  }

  return notificationId ? (
    <TouchableOpacity
      onPress={handleUnremind}
      className="bg-red-600 px-3 py-1 rounded-md mt-1 self-start"
      activeOpacity={0.7}
    >
      <Text className="text-white text-sm">Cancel Reminder</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={handleRemind}
      className="bg-brand-primary px-3 py-1 rounded-md mt-1 self-start"
      activeOpacity={0.7}
    >
      <Text className="text-white text-sm">Remind Me</Text>
    </TouchableOpacity>
  );
};

export default ReminderButton;