import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../i18n';

import { Habit } from '../components/Habits';
import styled from 'styled-components/native';
import { HabitCreationForm } from '../components/HabitCreationForm';
import { habitListSelector } from '../store/habits/selector';
import { CalendarHeader } from '../components/CalendarHeader/Header';
import { add, sub, differenceInCalendarDays, format } from 'date-fns';
import { Container, SizedBox } from '../components/Helpers';
import { EmptyList } from '../components/EmptyList';
import { HabitType } from '../types/habits';
import { userSlice } from '../store/users/reducer';
import {
  getCurrentUserSelector,
  signErrorSelector,
} from '../store/users/selector';
import { repeatsSlice } from '../store/repeats/reducer';
import { RootState } from '../store/reducer';
import { capitalize, getWeekDay } from '../utils';
import { Widget, WidgetTitle } from '../components/Widget';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

const HabitsListWrapper = styled.View`
  flex: 1;
`;

export const HomeScreen = ({ navigation }: any) => {
  const today = new Date();
  const [selectedDate, SetSelectedDate] = useState(today);
  const isAuthError = useSelector(signErrorSelector);
  const currentUser = useSelector(getCurrentUserSelector);
  const { t } = useTranslation();
  const habits = useSelector((state: RootState) =>
    habitListSelector(state, selectedDate),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userSlice.actions.checkUserAuth());
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon
            name={'ios-settings-outline'}
            size={24}
            color={COLORS.mainColor}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: getTitle(),
    });
  }, [navigation, selectedDate]);

  const currentDayOfWeek = getWeekDay(selectedDate);

  const filteredHabits = habits.filter((habit) =>
    habit.days.includes(currentDayOfWeek),
  );
  const daysBefore = Array.from(Array(7).keys())
    .splice(1, 7 - 1)
    .reverse()
    .map((days) =>
      sub(today, {
        days,
      }),
    );

  const daysAfter = Array.from(Array(7).keys())
    .splice(1)
    .map((days) =>
      add(today, {
        days,
      }),
    );

  const days = [...daysBefore, ...[today], ...daysAfter];

  const activeDay = days.find(
    (day) => differenceInCalendarDays(day, selectedDate) === 0,
  );

  const selectedDayIndex = activeDay ? days.indexOf(activeDay) : 0;

  const getTitle = () => {
    const date = days[selectedDayIndex];
    const diff = differenceInCalendarDays(today, date);
    if (diff === 1) {
      return t('home.title.yesterday');
    } else if (diff === -1) {
      return t('home.title.tomorrow');
    } else if (diff === 0) {
      return t('home.title.today');
    } else {
      return capitalize(t(format(date, 'iiii').toLowerCase()));
    }
  };

  const onPressHabit = useCallback(
    (habit: HabitType) => {
      navigation.navigate('Habit', {
        habit,
        fromDate: selectedDate.toString(),
      });
    },
    [selectedDate, navigation],
  );

  const onLongPressHabit = useCallback(
    (habit: HabitType) => {
      if (!habit.isCompleted) {
        dispatch(
          repeatsSlice.actions.addRepeat({
            habitId: habit.id!,
            countRepeats: 1,
            date: selectedDate,
            userId: currentUser!.uid,
          }),
        );
      }
    },
    [selectedDate],
  );

  if (isAuthError) {
    return <Text>Something wrong</Text>;
  }

  return (
    <HabitsListWrapper>
      <CalendarHeader
        days={days}
        selectedDayIndex={selectedDayIndex}
        onSelectDay={SetSelectedDate}
      />
      <Container>
        <Widget>
          <FlatList
            bounces={false}
            data={filteredHabits}
            ListHeaderComponent={() => (
              <>
                <SizedBox height={16} />
                <WidgetTitle>{t('home.listHabits.title')}</WidgetTitle>
                <SizedBox height={16} />
              </>
            )}
            ListEmptyComponent={<EmptyList />}
            renderItem={(item) => (
              <Habit
                habit={item.item}
                onPress={onPressHabit}
                onLongPress={onLongPressHabit}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Widget>
      </Container>
      <HabitCreationForm />
    </HabitsListWrapper>
  );
};
