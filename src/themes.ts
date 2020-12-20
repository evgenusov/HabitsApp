import { DefaultTheme } from 'react-native-paper';
import { DefaultTheme as ReactNavigationTheme } from '@react-navigation/native';

import { COLORS } from './constants';

export const LightTheme = {
  ...DefaultTheme,
  ...ReactNavigationTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...ReactNavigationTheme.colors,
    primary: COLORS.mainColor,
    card: COLORS.white,
    shadowColor: COLORS.shadowColor,
    background: COLORS.lightGray,
  },
};

export const DarkTheme = {
  ...DefaultTheme,
  ...ReactNavigationTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    ...ReactNavigationTheme.colors,
    primary: COLORS.mainColor,
    card: COLORS.dark,
    shadowColor: COLORS.darkShadowColor,
    text: COLORS.white,
    background: COLORS.background,
  },
};

export type ThemeType = typeof LightTheme;
