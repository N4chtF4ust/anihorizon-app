import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Notification behavior for foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, // ✅ Shows the top banner
    shouldShowList: true,   // ✅ Shows in notification center
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


// Request permission once if needed
export const requestNotificationPermission = async (): Promise<boolean> => {


  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  if (existingStatus === 'granted') {
    return true; // Skip request if already granted
  }

  const { status: finalStatus } = await Notifications.requestPermissionsAsync();
  console.log('Notification permission status:', finalStatus);
  return finalStatus === 'granted';
};

// Schedule a notification
export const scheduleNotification = async (anime: any): Promise<string> => {
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) {
    throw new Error('Notification permission denied');
  }

  let airingTime: Date;

  if (anime.airingTimestamp) {
    airingTime = new Date(anime.airingTimestamp);
  } else if (anime.selectedDate && anime.time) {
    airingTime = new Date(`${anime.selectedDate}T${anime.time}`);
  } else {
    throw new Error('Missing valid airing time data.');
  }

  if (isNaN(airingTime.getTime())) {
    throw new Error(`Invalid airing time: ${airingTime}`);
  }

  if (airingTime <= new Date()) {
    throw new Error('Airing time is in the past.');
  }

const notificationId = await Notifications.scheduleNotificationAsync({
  content: {
    title: `⏰ ${anime.name} is airing soon!`,
    body: `Episode ${anime.episode} airs at ${airingTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`,
    sound: 'default',
    data: {
      animeId: anime.id,
    },
  },
  trigger: {
    type: 'date',
    date: airingTime, 
  },
});


  console.log('Scheduled notification at:', airingTime.toISOString());
  console.log('Notification ID:', notificationId);
  

  return notificationId;
};

// Cancel a scheduled notification
export const cancelNotification = async (id: string): Promise<void> => {
  await Notifications.cancelScheduledNotificationAsync(id);
  console.log('Notification canceled:', id);
};
