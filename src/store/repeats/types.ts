export type HabitRepeatType = {
  habitId: string;
  repeats: number;
  date: string;
  userId: string;
};

export type AddRepeatType = {
  habitId: string;
  date: Date;
  countRepeats: number;
  userId: string;
};

export type HabitRepeatsState = {
  repeats: HabitRepeatType[];
};
