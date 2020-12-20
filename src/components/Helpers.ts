import styled from 'styled-components/native';
import { ThemeType } from '../themes';

export const Spacer = styled.View`
  flex: 1;
`;

export const SizedBox = styled.View`
  height: ${({ height = 0 }: { height?: number; width?: number }) => height}px;
  width: ${({ width = 0 }: { height?: number; width?: number }) => width}px;
`;

export const BoldText = styled.Text`
  font-weight: bold;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.text};
`;

export const Container = styled.View`
  padding: 16px 8px;
`;

export const SmallText = styled.Text`
  font-size: 11px;
  color: #9bb6e2;
`;

export const CenteredBlock = styled.View`
  justify-content: center;
  align-items: center;
`;
