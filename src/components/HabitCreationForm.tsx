import React from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';
import { useTranslation } from 'react-i18next';

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

const FormButton = styled(Button)`
  box-shadow: 0 0 50px ${COLORS.mainColorOpacity};
`;

export const HabitCreationForm = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const onPress = () => {
    navigation.navigate('Create');
  };

  return (
    <Form>
      <FormButton mode={'contained'} onPress={onPress}>
        {t('buttons.createHabit')}
      </FormButton>
    </Form>
  );
};
