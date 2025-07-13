import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Details = () => {
  const {id}=useLocalSearchParams();
  return (
    <View className='bg-black h-full '>
      <Text className='text-white'>Details for anime ID: {id}</Text>
    </View>
  )
}

export default Details