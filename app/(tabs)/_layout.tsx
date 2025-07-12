import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import IndexScreen from './index';
import SearchScreen from './search';
import WatchlistScreen from './watchlist';
import SettingsScreen from './settings';

// Components
import TabIcon from '../components/tabicon';

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  // Web layout using Drawer
  if (Platform.OS === 'web') {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Drawer.Screen name="Home" component={IndexScreen} />
        <Drawer.Screen name="Search" component={SearchScreen} />
        <Drawer.Screen name="Watchlist" component={WatchlistScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    );
  }

  // Mobile layout using Tabs
  return (
<Tabs
  screenOptions={{
     headerShown: false,
     
    tabBarStyle: {
      backgroundColor: '#0B1D51',
      height: 55 ,
      flexDirection: 'row',
      margin: 10,
      borderRadius: 30,
      position: 'absolute',
      bottom: 10,
      zIndex: 1000,
      overflow: 'hidden',
    },
    tabBarItemStyle: {
    
     
      overflow: 'hidden',
    },
    tabBarActiveBackgroundColor: '#fff',
    tabBarLabelStyle: {
      fontWeight: 'bold',
    },
    tabBarActiveTintColor: '#0B1D51',
    tabBarInactiveTintColor: '#fff',
  }}
>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="search" />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: 'Watchlist',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="add-circle" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="settings" />
          ),
        }}
      />
    </Tabs>
  );
}
