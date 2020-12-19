import { RootState } from '../reducer';

export const habitListSelector = (state: RootState) => state.habits.data;
export const habitSelector = (state: RootState, habitId: string) =>
  state.habits.data.find((habit) => habit.id === habitId);
