import styled from 'styled-components/native';
import { ThemeType } from '../themes';

export const Widget = styled.View`
  border-radius: 12px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.card};
  box-shadow: 0 0 10px
    ${({ theme }: { theme: ThemeType }) => theme.colors.shadowColor};
  padding: 16px;
`;

export const WidgetTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.text};
`;
