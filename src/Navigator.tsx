import React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { HomeScreen } from './screens/HomeScreen';
import { HabitCreationScreen } from './screens/CreateHabitScreen';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { HabitScreen } from './screens/HabitScreen';
import { SettingsScreen } from './screens/Settings';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          headerShown: true,
          headerLargeTitle: true,
          headerHideShadow: true,
        }}
      />
      <Stack.Screen
        name={'Habit'}
        component={HabitScreen}
        options={{
          headerShown: true,
          headerLargeTitle: true,
          headerHideShadow: false,
        }}
      />
      <Stack.Screen
        name={'Settings'}
        component={SettingsScreen}
        options={{
          headerTitle: t('screens.settings.title'),
          headerShown: true,
          headerLargeTitle: true,
          headerHideShadow: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const RootNavigator = ({ theme }: { theme: Theme }) => (
  <NavigationContainer theme={theme}>
    <Stack.Navigator
      screenOptions={{
        stackPresentation: 'modal',
        headerShown: false,
      }}>
      <Stack.Screen name={'Main'} component={HomeStackNavigator} />
      <Stack.Screen name={'Create'} component={HabitCreationScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
