import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { enableScreens } from 'react-native-screens';
import { Provider as StoreProvider } from 'react-redux';

import { RootNavigator } from './src/Navigator';
import { store, persistor } from './src/store';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DarkTheme, LightTheme } from './src/themes';
import { ThemeProvider } from 'styled-components/native';
import './src/i18n';
import { NotificationService } from './src/services/notification';

enableScreens();

export const AppRoot = () => {
  const colorScheme = useColorScheme();

  const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  useEffect(() => {
    console.log('asdad')
    NotificationService.register();
  }, []);

  return (
    <>
      <StatusBar barStyle={barStyle} translucent={true} />
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <PaperProvider theme={theme}>
              <RootNavigator theme={theme} />
            </PaperProvider>
          </ThemeProvider>
        </PersistGate>
      </StoreProvider>
    </>
  );
};

const AppearanceApp = () => (
  <AppearanceProvider>
    <AppRoot />
  </AppearanceProvider>
);

export const App = AppearanceApp;
