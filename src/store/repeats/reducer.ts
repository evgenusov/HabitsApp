import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HabitRepeatsState, AddRepeatType } from './types';
import { format } from 'date-fns';

const initialState: HabitRepeatsState = {
  repeats: [],
};

export const repeatsSlice = createSlice({
  name: 'repeats',
  initialState,
  reducers: {
    addRepeat(state: HabitRepeatsState, action: PayloadAction<AddRepeatType>) {
      const formattedDate = format(action.payload.date, 'yyyy-MM-dd');

      const repeat = state.repeats.find(
        (item) =>
          item.habitId === action.payload.habitId &&
          item.date === formattedDate,
      );

      if (repeat) {
        state.repeats = state.repeats.map((item) => {
          if (item.habitId === repeat.habitId) {
            item.repeats += action.payload.countRepeats;
            return item;
          }
          return item;
        });
      } else {
        state.repeats.push({
          ...action.payload,
          repeats: action.payload.countRepeats,
          date: formattedDate,
        });
      }
    },
  },
});

export const repeatsReducer = repeatsSlice.reducer;
