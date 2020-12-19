import { RootState } from '../reducer';

export const getHabitRepeats = (state: RootState, habitId: string) => {
  return state.repeats.repeats.filter((habit) => habit.habitId === habitId);
};
