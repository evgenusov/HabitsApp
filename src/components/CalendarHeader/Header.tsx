import React, { useCallback, useEffect, useRef } from 'react';
import { format, differenceInCalendarDays, parse } from 'date-fns';
import {
  CalendarDay,
  CalendarDayName,
  CalendarDayNumber,
  HeaderWrapper,
} from './Header.styles';
import { FlatList } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export type CalendarDayType = {
  date: Date;
  dots: Array<string>;
};

type CalendarHeaderType = {
  days: Date[];
  selectedDayIndex: number;
  onSelectDay: (day: Date) => void;
};

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const CalendarHeader = ({
  days,
  selectedDayIndex,
  onSelectDay,
}: CalendarHeaderType) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: selectedDayIndex,
        viewPosition: 0.5,
        animated: false,
      });
    }, 100);
  }, []);

  const onScroll = () => {
    ReactNativeHapticFeedback.trigger('selection', options);
  };

  const callbackSelectDate = useCallback(
    (date) => {
      onSelectDay(date);
    },
    [onSelectDay],
  );

  return (
    <HeaderWrapper>
      <FlatList
        data={days}
        horizontal={true}
        bounces={false}
        contentContainerStyle={{
          paddingHorizontal: 32,
        }}
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
            <CalendarDayName>{format(item.item, 'iii')}</CalendarDayName>
            <CalendarDayNumber>{format(item.item, 'dd')}</CalendarDayNumber>
          </CalendarDay>
        )}
      />
    </HeaderWrapper>
  );
};
