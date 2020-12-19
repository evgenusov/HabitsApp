import { takeLatest, put, call, select } from 'redux-saga/effects';
import { habitSlice } from './reducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { HabitType, AddHabitRepeatType } from '../../types/habits';
import { HabitsModel } from '../../database/HabitsModel';
import { getCurrentUserSelector } from '../users/selector';
import { CurrentUserType } from '../../types/users';
import { userSlice } from '../users/reducer';
import { RepeatsModel } from '../../database/RepeatsModel';

export function* createHabitSaga(action: PayloadAction<HabitType>) {
  try {
    const currentUser = yield select(getCurrentUserSelector);
    const newHabit = yield call(
      HabitsModel.add,
      currentUser!.uid,
      action.payload,
    );
    yield put(habitSlice.actions.addHabit(newHabit));
  } catch (e) {
    console.error(e);
  }
}

export function* syncUserHabits(action: PayloadAction<CurrentUserType>) {
  try {
    const userHabits = yield call(
      HabitsModel.getUserHabits,
      action.payload.uid,
    );

    yield put(habitSlice.actions.setHabits(userHabits));
  } catch (e) {
    console.error(e);
  }
}

export function* deleteHabitSaga(action: PayloadAction<string>) {
  try {
    yield call(HabitsModel.deleteHabit, action.payload);
  } catch (e) {
    console.error(e);
  }
}

export function* HabitSagas() {
  yield takeLatest(userSlice.actions.setCurrentUser, syncUserHabits);
  yield takeLatest(habitSlice.actions.createHabit, createHabitSaga);
  yield takeLatest(habitSlice.actions.removeHabit, deleteHabitSaga);
}
