import styled from 'styled-components/native';
import { BoldText } from '../Helpers';

export const HeaderWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 8px 0;
  min-height: 100px;
  background-color: white;
`;

export const CalendarDay = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 32px;
  min-width: 42px;
  padding: 4px;
  margin: 0 8px;
  border-bottom-width: 5px;
  border-color: ${({ active }: { active: boolean }) =>
    active ? '#9bb6e2' : 'transparent'};
`;

export const CalendarDayNumber = styled(BoldText)`
  font-size: 16px;
`;

export const CalendarDayName = styled.Text`
  color: #ccc;
`;
