// src/components/layout/AnimatedHeader.tsx
import React from 'react';
import { Animated, ViewStyle } from 'react-native';

interface AnimatedHeaderProps {
  height?: number;
  backgroundColor: Animated.AnimatedInterpolation<string>;
  style?: ViewStyle;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  height = 90,
  backgroundColor,
  style,
}) => {
  return (
    <Animated.View
      className="absolute top-0 left-0 right-0 z-20 h-28"
      style={[
        {  backgroundColor },
        style,
      ]}
    />
  );
};

export default AnimatedHeader;
