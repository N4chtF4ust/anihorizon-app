import React from 'react';
import { ActivityIndicator, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // optional icon usage

const LoadingOverlay = () => (
  <View className="absolute inset-0 flex-1 justify-center items-center bg-black/60 z-50">
    <View className=" rounded-3xl p-8 items-center shadow-2xl shadow-black w-72">
      <ActivityIndicator size="large" color="#8CCDEB" />
      <View className="flex-row items-center mt-4">
      
        <Text className="text-white ml-2 text-base font-medium tracking-wide">
          Loading schedule...
        </Text>
      </View>
    </View>
  </View>
);

export default React.memo(LoadingOverlay);
