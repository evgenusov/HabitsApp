import React, { useCallback } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { HabitDayEnum, HabitType } from '../types/habits';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { BoldText, Spacer, SizedBox, SmallText } from './Helpers';
import { COLORS } from '../constants';
import {useSelector} from "react-redux";

const HabitView = styled.View`
  height: 60px;
  background: white;
  border-bottom-color: rgba(234, 241, 244, 0.5);
  border-bottom-width: 1px;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  opacity: ${({ completed }: { completed: boolean }) => (completed ? 0.3 : 1)};
`;

const HabitDays = styled.View`
  flex-direction: row;
  margin-top: 4px;
`;

const HabitDayText = styled.Text`
  font-size: 11px;
  margin-right: 8px;
  text-transform: capitalize;
  color: gray;
  font-weight: 300;
`;

const HabitStroke = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 90%;
  height: 2px;
  background: #444;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

type HabitProps = {
  habit: HabitType;
  onPress: (habit: HabitType) => void;
  onLongPress: (habit: HabitType) => void;
};

export const Habit = ({ habit, onLongPress, onPress }: HabitProps) => {
  const daysNames = {
    [HabitDayEnum.MONDAY]: 'MO',
    [HabitDayEnum.TUESDAY]: 'TU',
    [HabitDayEnum.WEDNESDAY]: 'WE',
    [HabitDayEnum.THURSDAY]: 'TH',
    [HabitDayEnum.FRIDAY]: 'FR',
    [HabitDayEnum.SATURDAY]: 'SA',
    [HabitDayEnum.SUNDAY]: 'SU',
  };

  const completePercent = (habit.done / habit.total) * 100;

  const _onPress = useCallback(() => {
    onPress(habit);
  }, [habit]);

  const _onLongPress = useCallback(() => {
    onLongPress(habit);
  }, [habit]);

  const isCompleted = completePercent === 100;

  return (
    <TouchableWithoutFeedback onPress={_onPress} onLongPress={_onLongPress}>
      <HabitView completed={isCompleted}>
        <View>
          <BoldText>{habit.name}</BoldText>
          <HabitDays>
            {habit.days
              .filter((day) => day !== null)
              .map((day) => (
                // @ts-ignore
                <HabitDayText>{daysNames[day]}</HabitDayText>
              ))}
          </HabitDays>
        </View>
        <Spacer />

        <SizedBox width={16} />
        {completePercent < 100 && (
          <AnimatedCircularProgress
            fill={completePercent}
            tintColor={COLORS.mainColor}
            backgroundColor="transparent"
            size={36}
            width={3}>
            {() => (
              <SmallText numberOfLines={1}>
                {completePercent.toFixed(0)}%
              </SmallText>
            )}
          </AnimatedCircularProgress>
        )}

        {isCompleted && <HabitStroke />}
      </HabitView>
    </TouchableWithoutFeedback>
  );
};
