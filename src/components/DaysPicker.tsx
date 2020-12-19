import React, { useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { HabitDayEnum } from '../types/habits';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const DaysRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 58px;
  margin: 10px 0;
`;

export const DayItem = styled.TouchableOpacity`
  flex: 1;
  min-height: 46px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(234, 241, 244);
  margin: 0 5px;
  padding: 3px;
  border-radius: 12px;
  background: ${({ active }: { active: boolean }) =>
    active ? 'rgb(234, 241, 244)' : 'transparent'};
`;

export type DatePickerType = {
  items?: (HabitDayEnum | null)[];
  onSelectDays?: (days: (number | null)[]) => void;
};

export const DayEventsRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 5px 0;
  height: 20px;
`;

export type DayEventType = {
  color: string;
};

export const DayEvent = styled.View`
  width: 3px;
  height: 3px;
  border-radius: 7px;
  margin: 3px;
  background-color: ${(props: DayEventType) => props.color};
`;

export const DaysPicker = ({ items = [], onSelectDays }: DatePickerType) => {
  const [selectedDays, setSelectedDays] = useState([
    items[0] === HabitDayEnum.MONDAY,
    items[1] === HabitDayEnum.TUESDAY,
    items[2] === HabitDayEnum.WEDNESDAY,
    items[3] === HabitDayEnum.THURSDAY,
    items[4] === HabitDayEnum.FRIDAY,
    items[5] === HabitDayEnum.SATURDAY,
    items[6] === HabitDayEnum.SUNDAY,
  ]);

  const toggleDay = (day: number) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[day] = !newSelectedDays[day];
    setSelectedDays(newSelectedDays);
    onSelectDays &&
      onSelectDays(newSelectedDays.map((item, index) => (item ? index : null)));
  };

  return (
    <DaysRow>
      {selectedDays.map((day, index) => (
        <DayItem active={day} onPress={() => toggleDay(index)}>
          <Text style={{ fontWeight: 'bold' }}>{days[index]}</Text>
        </DayItem>
      ))}
    </DaysRow>
  );
};
