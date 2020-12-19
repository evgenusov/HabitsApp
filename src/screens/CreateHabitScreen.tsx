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

const FormWrapper = styled.View`
  background: white;
  flex: 1;
  flex-direction: column;
  padding: 16px;
`;

export const HabitCreationScreen = () => {
  const dispatch = useDispatch();
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

  const [repeats, setRepeats] = useState(3);

  const onRepeatsChange = useCallback(
    (text) => {
      const numRepeats = parseInt(text, 0);
      if (isNaN(numRepeats)) {
        setRepeats(1);
      } else {
        setRepeats(numRepeats);
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
      total: repeats,
      done: 0,
    };
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
          value={title}
          onChangeText={setTitle}
          placeholder={'Your new habit'}
          style={{
            fontSize: 32,
            marginVertical: 16,
          }}
        />
        <DaysPicker items={days} onSelectDays={onDaysChange} />
        <SizedBox height={16} />
        <RNPTextInput
          value={repeats.toString()}
          onChangeText={onRepeatsChange}
          dense={true}
          mode={'outlined'}
          label={'Repeats / day'}
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
