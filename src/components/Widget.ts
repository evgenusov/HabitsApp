import styled from 'styled-components/native';
import { COLORS } from '../constants';

export const Widget = styled.View`
  border-radius: 12px;
  background-color: ${COLORS.white};
  box-shadow: 0 0 10px ${COLORS.shadowColor};
  padding: 16px;
`;

export const WidgetTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
