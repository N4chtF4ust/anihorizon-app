import React from 'react';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import TabIcon from './tabicon'; // adjust path if needed

const MobileTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#172554',
            position: 'absolute',

            bottom: 10,
            borderRadius: 30,
            height: "7%",
            borderTopWidth: 0,
            overflow: 'hidden',
            marginLeft: 20,
            marginRight: 20,
          },
          tabBarItemStyle: {
            overflow: 'hidden',
  
             margin: 0,
             borderTopLeftRadius: 30,
             borderTopRightRadius: 30,
             borderBottomRightRadius: 0,
             borderBottomLeftRadius: 0,
             height: 100,
        

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
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="home" />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="search" />,
          }}
        />

             <Tabs.Screen
          name="schedule"
          options={{
            title: 'Schedule',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="calendar" />,
          }}
        />

        <Tabs.Screen
          name="watchlist"
          options={{
            title: 'Watchlist',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="add-circle" />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="settings" />,
          }}
        />
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1D51', // match your tabBar background to avoid white gaps
  },
});

export default MobileTabs;
