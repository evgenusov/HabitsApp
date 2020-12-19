import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Form = styled.View`
  flex: 1;
  padding: 8px;
  background-color: transparent;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 48px;
  left: 0;
  right: 0;
`;

const FormInput = styled.TouchableOpacity`
  width: 200px;
  height: 40px;
  background-color: white;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: rgba(95, 158, 160, 0.35);
`;

export const HabitCreationForm = () => {
  const navigation = useNavigation();

  const onPressInput = () => {
    navigation.navigate('Create');
  };

  return (
    <Form>
      <FormInput onPress={onPressInput}>
        <Text>Add new habit</Text>
      </FormInput>
    </Form>
  );
};
