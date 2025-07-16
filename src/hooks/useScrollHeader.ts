// src/hooks/useScrollHeader.ts
import { useRef } from 'react';
import { Animated } from 'react-native';

export default function useScrollHeader(fromColor = 'transparent', toColor = '#0F172A', range = [0, 100]) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: range,
    outputRange: [fromColor, toColor],
    extrapolate: 'clamp',
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false } // Color interpolation requires false
  );

  return { scrollY, onScroll, headerBackgroundColor };
}
