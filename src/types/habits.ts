export enum HabitDayEnum {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

export type HabitType = {
  id?: string;
  name: string;
  total: number;
  done: number;
  days: (HabitDayEnum | null)[];
};

export type AddHabitRepeatType = {
  habitId: string;
  countRepeats: number;
  date: Date;
};
