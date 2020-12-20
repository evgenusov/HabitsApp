import { useColorScheme } from 'react-native-appearance';
import { DarkTheme, LightTheme, ThemeType } from './themes';

export const useTheme = (): ThemeType => {
  const colorScheme = useColorScheme();

  return colorScheme === 'dark' ? DarkTheme : LightTheme;
};
