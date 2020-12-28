import React, { useCallback, useEffect, useRef } from 'react';
import { format, differenceInCalendarDays } from 'date-fns';
import { useTranslation } from 'react-i18next';
import {
  CalendarDay,
  CalendarDayName,
  CalendarDayNumber,
  HeaderWrapper,
  CalendarTodayIndicator,
} from './Header.styles';
import { FlatList, Platform } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type CalendarHeaderType = {
  days: Date[];
  selectedDayIndex: number;
  onSelectDay: (day: Date) => void;
};

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

export const CalendarHeader = ({
  days,
  selectedDayIndex,
  onSelectDay,
}: CalendarHeaderType) => {
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);
  const today = new Date();

  useEffect(() => {
    setTimeout(() => {
      scrollToIndex(selectedDayIndex);
    }, 300);
  }, []);

  const onScroll = () => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('selection', options);
    }
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index: index,
      viewPosition: 1.05,
      animated: true,
    });
  };

  const callbackSelectDate = useCallback(
    (date) => {
      onSelectDay(date);
    },
    [onSelectDay],
  );

  const isToday = (date: Date) => differenceInCalendarDays(today, date) === 0;

  return (
    <HeaderWrapper>
      <FlatList
        data={days}
        horizontal={true}
        bounces={false}
        ref={flatListRef}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => {
          return { length: 86, index, offset: 86 * index };
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => (
          <CalendarDay
            onPress={() => callbackSelectDate(item.item)}
            active={item.index === selectedDayIndex}>
            {isToday(item.item) && <CalendarTodayIndicator />}
            <CalendarDayName active={item.index === selectedDayIndex}>
              {t(format(item.item, 'EEEEEE').toLocaleLowerCase())}
            </CalendarDayName>
            <CalendarDayNumber>{format(item.item, 'dd')}</CalendarDayNumber>
          </CalendarDay>
        )}
      />
    </HeaderWrapper>
  );
};
