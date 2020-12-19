import { HabitType } from '../../types/habits';

export type HabitsSliceState = {
  state: 'loading' | 'success' | 'error';
  data: HabitType[];
};
