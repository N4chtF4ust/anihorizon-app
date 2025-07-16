// notifications.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Notification behavior for foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Global permission state to prevent multiple simultaneous requests
let permissionPromise: Promise<boolean> | null = null;

// Request permission once if needed - prevents multiple calls
export const requestNotificationPermission = async (): Promise<boolean> => {
  // If there's already a permission request in progress, wait for it
  if (permissionPromise) {
    return permissionPromise;
  }

  // Create a new permission request promise
  permissionPromise = (async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      
      if (existingStatus === 'granted') {
        return true;
      }

      // Only request if not already granted and not denied
      if (existingStatus === 'undetermined') {
        const { status: finalStatus } = await Notifications.requestPermissionsAsync();
        console.log('Notification permission status:', finalStatus);
        return finalStatus === 'granted';
      }

      // If denied, return false
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    } finally {
      // Clear the promise after completion
      permissionPromise = null;
    }
  })();

  return permissionPromise;
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
      date: airingTime, //new Date(Date.now()+5000) //Testing Purposes 
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