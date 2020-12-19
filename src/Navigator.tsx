import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './screens/HomeScreen';
import { HabitCreationScreen } from './screens/CreateHabitScreen';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { HabitScreen } from './screens/HabitScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
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
    </Stack.Navigator>
  );
};

export const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        stackPresentation: 'modal',
        headerShown: false,
      }}>
      <Stack.Screen name={'Main'} component={MainStackNavigator} />
      <Stack.Screen name={'Create'} component={HabitCreationScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
