import { RootState } from '../reducer';
import { formatDate, getWeekDay } from '../../utils';
import { HabitType } from '../../types/habits';

export const habitListSelector = (state: RootState, date: Date) => {
  const formattedDate = formatDate(date);
  const currentDayOfWeek = getWeekDay(date);

  return state.habits.data
    .filter((habit: HabitType) => habit.days.includes(currentDayOfWeek))
    .map((habit) => {
      const done = state.repeats.repeats
        .filter(
          (repeat) =>
            repeat.habitId === habit.id && repeat.date === formattedDate,
        )
        .map((item) => item.repeats)
        .reduce((a, b) => a + b, 0);
      const progress = (done / habit.total) * 100;
      const isCompleted = progress >= 100;

      return {
        ...habit,
        done,
        isCompleted,
        progress,
      };
    })
    .sort((a) => (a.isCompleted ? 1 : -1));
};
export const habitSelector = (state: RootState, habitId: string) =>
  state.habits.data.find((habit) => habit.id === habitId);
