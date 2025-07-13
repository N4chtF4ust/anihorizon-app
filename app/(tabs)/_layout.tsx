import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens
import IndexScreen from './index';
import SearchScreen from './search';
import WatchlistScreen from './watchlist';
import SettingsScreen from './settings';
import ScheduleScreen from './schedule';

// Components
import TabIcon from '../src/components/tabs/tabicon';
import MobileTabs from '../src/components/tabs/MobileTabs';

const Drawer = createDrawerNavigator();



export default function RootLayout() {
  return (
    <SafeAreaProvider className='bg-black'>
      {Platform.OS === 'web' ? (
        <Drawer.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { fontWeight: 'bold' },
          }}
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
