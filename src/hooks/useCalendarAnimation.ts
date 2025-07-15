import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useCalendarAnimation = () => {
  const [showCalendar, setShowCalendar] = useState(true);

  const calendarOpacity = useRef(new Animated.Value(1)).current;
  const calendarTranslateY = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const dateMarginTop = useRef(new Animated.Value(0)).current;

  const toggleCalendar = () => {
    // Animate the button press
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (showCalendar) {
      // Hide the calendar
      Animated.parallel([
        Animated.timing(calendarOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(calendarTranslateY, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dateMarginTop, {
          toValue: 64,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setShowCalendar(false);
      });
    } else {
      // Show the calendar
      setShowCalendar(true);
      calendarTranslateY.setValue(-50);
      Animated.parallel([
        Animated.timing(calendarOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(calendarTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dateMarginTop, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return {
    showCalendar,
    toggleCalendar,
    calendarOpacity,
    calendarTranslateY,
    buttonScale,
    dateMarginTop,
  };
};
