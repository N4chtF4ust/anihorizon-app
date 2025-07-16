import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';

const Episode = () => {

  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}

export default Episode