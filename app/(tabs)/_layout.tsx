import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

// Screens
import IndexScreen from './index';
import ScheduleScreen from './schedule';
import SearchScreen from './search';
import SettingsScreen from './settings';
import WatchlistScreen from './watchlist';

// Components
import MobileTabs from '../../src/components/tabs/MobileTabs';

const Drawer = createDrawerNavigator();

// Foreground handler (banner, sound)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
 
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      // Handle background tap or killed state
      const checkInitialNotification = async () => {
        const response = await Notifications.getLastNotificationResponseAsync();
        if (response?.notification?.request?.content?.data?.animeId) {
          router.push(`../details/${response.notification.request.content.data.animeId}`);
        }
      };
      checkInitialNotification();

      // Handle notification tap when app is running or backgrounded
      const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
        const animeId = response.notification.request.content.data.animeId;
        if (animeId) {
          router.push(`../details/${animeId}`);
        }
      });

      // Handle foreground (active) notification
      const receiveListener = Notifications.addNotificationReceivedListener((notification) => {
        console.log('Foreground notification:', notification);
        // You can optionally show a custom UI here
      });

      return () => {
        responseListener.remove();
        receiveListener.remove();
      };
    }
  }, []);

  return (
    <SafeAreaProvider className="bg-black">
      {Platform.OS === 'web' ? (
        <Drawer.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { fontWeight: 'bold' },
          }}
          initialRouteName="Home"
        >
          <Drawer.Screen name="Home" component={IndexScreen} />
          <Drawer.Screen name="Search" component={SearchScreen} />
          <Drawer.Screen name="Schedule" component={ScheduleScreen} />
          <Drawer.Screen name="Watchlist" component={WatchlistScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      ) : (
        <MobileTabs />
      )}
    </SafeAreaProvider>
  );
}
