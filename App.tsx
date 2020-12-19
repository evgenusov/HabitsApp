import 'react-native-gesture-handler';

import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import { Provider as StoreProvider } from 'react-redux';

import { RootNavigator } from './src/Navigator';
import { store, persistor } from './src/store';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { COLORS } from './src/constants';

enableScreens();

export const MainTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.mainColor,
  },
};

const App = () => (
  <>
    <StatusBar barStyle={'dark-content'} />
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={MainTheme}>
          <RootNavigator />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  </>
);

export default App;
