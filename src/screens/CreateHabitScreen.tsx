import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { DaysPicker } from '../components/DaysPicker';
import { Button, TextInput as RNPTextInput } from 'react-native-paper';
import { SizedBox, Spacer } from '../components/Helpers';
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { HabitDayEnum, HabitType } from '../types/habits';
import { useDispatch } from 'react-redux';
import { habitSlice } from '../store/habits/reducer';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks';

const FormWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 16px;
`;

export const HabitCreationScreen = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const theme = useTheme();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [isFormValid, SetFormValid] = useState(false);
  const [days, setDays] = useState([
    HabitDayEnum.MONDAY,
    HabitDayEnum.TUESDAY,
    HabitDayEnum.WEDNESDAY,
    null,
    null,
    null,
    null,
  ]);

  const [repeats, setRepeats] = useState<number | string>(3);

  const onRepeatsChange = useCallback(
    (text) => {
      const numRepeats = parseInt(text, 0);
      if (!isNaN(numRepeats)) {
        setRepeats(numRepeats);
      } else {
        setRepeats('');
      }
    },
    [repeats],
  );

  const onDaysChange = useCallback((newDays: (number | null)[]) => {
    setDays(newDays);
  }, []);

  useEffect(() => {
    const hasTitle: boolean = !!title && title.length > 0;
    const hasDays: boolean = days.filter((day) => day != null).length > 0;
    const hasRepeats: boolean = !!repeats && repeats > 0;
    SetFormValid(hasTitle && hasDays && hasRepeats);
  }, [title, days, repeats]);

  const onSubmitForm = useCallback(() => {
    const newHabit: HabitType = {
      name: title,
      days,
      total: typeof repeats === 'number' ? repeats : 0,
      isCompleted: false,
      progress: 0,
      done: 0,
    };
    // @ts-ignore
    dispatch(habitSlice.actions.createHabit(newHabit));
    navigation.goBack();
  }, [title, days, repeats]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <FormWrapper>
        <Spacer />
        <TextInput
          autoFocus={true}
          value={title}
          onChangeText={setTitle}
          placeholder={t('input.newHabit.placeholder')}
          placeholderTextColor={COLORS.gray}
          style={{
            fontSize: 32,
            marginVertical: 16,
            color: theme.colors.text,
          }}
        />
        <DaysPicker items={days} onSelectDays={onDaysChange} />
        <SizedBox height={16} />
        <RNPTextInput
          value={repeats.toString()}
          onChangeText={onRepeatsChange}
          dense={true}
          mode={'outlined'}
          label={t('input.countRepeats.labels')}
          style={{
            textAlign: 'center',
          }}
          keyboardType={'number-pad'}
          returnKeyType={'done'}
        />
        <Spacer />
        <Button
          mode={'contained'}
          disabled={!isFormValid}
          onPress={onSubmitForm}>
          Add new habit
        </Button>
        <SizedBox height={96} />
      </FormWrapper>
    </KeyboardAvoidingView>
  );
};
