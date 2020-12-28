import React, { useCallback } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { HabitDayEnum, HabitType } from '../types/habits';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { BoldText, Spacer, SizedBox, SmallText } from './Helpers';
import { COLORS } from '../constants';
import { ThemeType } from '../themes';
import { useTranslation } from 'react-i18next';

type HabitViewProps = { theme: ThemeType; completed: boolean };

const HabitView = styled.View`
  height: 60px;
  background: ${({ theme }: HabitViewProps) => theme.colors.card};
  border-bottom-color: rgba(234, 241, 244, 0.1);
  border-bottom-width: 0.5px;
  padding: 8px 0;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  opacity: ${({ completed }) => (completed ? 0.3 : 1)};
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
  const { t } = useTranslation();
  const daysNames = {
    [HabitDayEnum.MONDAY]: t('mo'),
    [HabitDayEnum.TUESDAY]: t('tu'),
    [HabitDayEnum.WEDNESDAY]: t('we'),
    [HabitDayEnum.THURSDAY]: t('th'),
    [HabitDayEnum.FRIDAY]: t('fr'),
    [HabitDayEnum.SATURDAY]: t('sa'),
    [HabitDayEnum.SUNDAY]: t('su'),
  };

  const _onPress = useCallback(() => {
    onPress(habit);
  }, [habit]);

  const _onLongPress = useCallback(() => {
    onLongPress(habit);
  }, [habit]);

  return (
    <TouchableWithoutFeedback onPress={_onPress} onLongPress={_onLongPress}>
      <HabitView completed={habit.isCompleted}>
        <View>
          <BoldText style={{ fontSize: 19 }}>{habit.name}</BoldText>
          <HabitDays>
            {habit.days
              .filter((day) => day !== null)
              .map((day, index) => (
                // @ts-ignore
                <HabitDayText key={index}>{daysNames[day]}</HabitDayText>
              ))}
          </HabitDays>
        </View>
        <Spacer />
        <SizedBox width={16} />
        {habit.progress < 100 && (
          <AnimatedCircularProgress
            fill={habit.progress}
            tintColor={COLORS.mainColor}
            backgroundColor="transparent"
            size={36}
            width={5}>
            {() => (
              <SmallText numberOfLines={1}>
                {habit.progress.toFixed(0)}%
              </SmallText>
            )}
          </AnimatedCircularProgress>
        )}
        {habit.isCompleted && <HabitStroke />}
      </HabitView>
    </TouchableWithoutFeedback>
  );
};
