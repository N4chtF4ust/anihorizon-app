import React from 'react';
import { View } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';

interface CalendarCardProps {
  selectedDate: string;
  onDayPress: (day: DateObject) => void;
}

const CalendarCard: React.FC<CalendarCardProps> = ({ selectedDate, onDayPress }) => {
  const markedDates = {
    [selectedDate]: {
      selected: true,
      marked: true,
      selectedColor: '#725CAD',
      selectedTextColor: '#FFF',
    },
  };

  const calendarTheme = {
    selectedDayBackgroundColor: '#3B82F6',
    todayTextColor: '#3B82F6',
    arrowColor: '#8CCDEB',
    textSectionTitleColor: '#FFF',
    calendarBackground: 'transparent',
    textDayFontFamily: 'System',
    textMonthFontWeight: 'bold',
    monthTextColor: '#FFF',
    textDayStyle: { color: '#FFF' },
    textDisabledColor: '#9CA3AF',
  };

  return (
    <View className="rounded-2xl bg-brand-dark  p-4 pt-10 ">
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        theme={calendarTheme}
        enableSwipeMonths
        disableAllTouchEventsForInactiveDays
        hideExtraDays
        showWeekNumbers={false}
        firstDay={1}
      />
    </View>
  );
};

export default CalendarCard;
