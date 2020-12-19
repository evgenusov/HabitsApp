import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Habit } from '../components/Habits';
import styled from 'styled-components/native';
import { HabitCreationForm } from '../components/HabitCreationForm';
import { habitListSelector } from '../store/habits/selector';
import { CalendarHeader } from '../components/CalendarHeader/Header';
import { add, sub, differenceInCalendarDays, getDay, format } from 'date-fns';
import { Title } from 'react-native-paper';
import { Container } from '../components/Helpers';
import { EmptyList } from '../components/EmptyList';
import { HabitType } from '../types/habits';
import { userSlice } from '../store/users/reducer';
import {
  getCurrentUserSelector,
  signErrorSelector,
} from '../store/users/selector';
import { repeatsSlice } from '../store/repeats/reducer';

const HabitsListWrapper = styled.View`
  flex: 1;
`;

export const HomeScreen = ({ navigation }: any) => {
  const today = new Date();
  const [selectedDate, SetSelectedDate] = useState(today);
  const isAuthError = useSelector(signErrorSelector);
  const currentUser = useSelector(getCurrentUserSelector);
  const habits = useSelector(habitListSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userSlice.actions.checkUserAuth());
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: getTitle(),
    });
  }, [navigation, selectedDate]);

  const currentDayOfWeek = getDay(selectedDate) - 1;

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
      return 'Yesterday';
    } else if (diff === -1) {
      return 'Tomorrow';
    } else if (diff === 0) {
      return 'Today';
    } else {
      return format(date, 'iiii');
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
      dispatch(
        repeatsSlice.actions.addRepeat({
          habitId: habit.id!,
          countRepeats: 1,
          date: selectedDate,
          userId: currentUser!.uid,
        }),
      );
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
      <FlatList
        bounces={false}
        data={filteredHabits}
        ListHeaderComponent={() => (
          <Container>
            <Title>Your today's habits</Title>
          </Container>
        )}
        contentContainerStyle={styles.habitContent}
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
      <HabitCreationForm />
    </HabitsListWrapper>
  );
};

const styles = StyleSheet.create({
  habitContent: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'rgb(207,214,217)',
    borderWidth: 0.2,
    shadowColor: 'rgb(207,214,217)',
    shadowRadius: 10,
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});
