import styled from 'styled-components/native';
import { BoldText } from '../Helpers';
import { ThemeType } from '../../themes';
import { COLORS } from '../../constants';

export type CalendarDayProps = {
  active: boolean;
  theme: ThemeType;
};

export const HeaderWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 8px 0;
  min-height: 100px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.card};
`;

export const CalendarDay = styled.TouchableOpacity`
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70px;
  width: 42px;
  padding: 4px;
  margin: 0 8px;
  background-color: ${({ active, theme }: CalendarDayProps) =>
    active ? theme.colors.primary : 'transparent'};
  border-radius: 20px;
`;

export const CalendarDayNumber = styled(BoldText)`
  font-size: 16px;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.text};
`;

export const CalendarDayName = styled.Text`
  color: ${(props: CalendarDayProps) =>
    props.active ? props.theme.colors.text : COLORS.gray};
  text-transform: capitalize;
`;

export const CalendarTodayIndicator = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${COLORS.mainColor};
  position: absolute;
  top: 10px;
`;
