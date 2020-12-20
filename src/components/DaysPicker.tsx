import React, { useState } from 'react';
import styled from 'styled-components/native';
import { HabitDayEnum } from '../types/habits';
import { BoldText } from './Helpers';
import { ThemeType } from '../themes';
import { useTranslation } from 'react-i18next';

type DayItemProps = {
  active: boolean;
  theme: ThemeType;
};

const days = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

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
  border: 0.5px solid ${({ theme }) => theme.colors.card};
  margin: 0 5px;
  padding: 3px;
  border-radius: 12px;
  background: ${({ theme, active }: DayItemProps) =>
    active ? theme.colors.card : 'transparent'};
`;

export type DatePickerType = {
  items?: (HabitDayEnum | null)[];
  onSelectDays?: (days: (number | null)[]) => void;
};

export const DaysPicker = ({ items = [], onSelectDays }: DatePickerType) => {
  const { t } = useTranslation();
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
          <BoldText>{t(days[index]).toUpperCase()}</BoldText>
        </DayItem>
      ))}
    </DaysRow>
  );
};
