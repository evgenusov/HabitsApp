import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HabitType } from '../../types/habits';
import { HabitsSliceState } from './types';

const initialState: HabitsSliceState = {
  state: 'loading',
  data: [],
};

export const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    setHabits: (
      state: HabitsSliceState,
      action: PayloadAction<HabitType[]>,
    ) => {
      state.data = action.payload;
    },
    createHabit: (state: HabitsSliceState) => {
      state.state = 'loading';
    },
    addHabit: (state: HabitsSliceState, action: PayloadAction<HabitType>) => {
      const habit = action.payload;
      state.data!.unshift(habit);
    },
    removeHabit: (state: HabitsSliceState, action: PayloadAction<string>) => {
      state.data = state.data!.filter((habit) => habit.id !== action.payload);
    },
  },
});

export const habitsReducer = habitSlice.reducer;
