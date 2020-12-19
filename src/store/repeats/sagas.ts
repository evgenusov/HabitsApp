import { takeLatest, call, select } from 'redux-saga/effects';
import { repeatsSlice } from './reducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { AddRepeatType } from './types';
import { RepeatsModel } from '../../database/RepeatsModel';
import { getCurrentUserSelector } from '../users/selector';

export function* addRepeatsSaga(action: PayloadAction<AddRepeatType>) {
  try {
    try {
      const currentUser = yield select(getCurrentUserSelector);

      yield call(
        RepeatsModel.addRepeat,
        action.payload.habitId,
        currentUser!.uid,
        action.payload.countRepeats,
        action.payload.date,
      );
    } catch (e) {
      console.error(e);
    }
  } catch (e) {
    console.error(e);
  }
}

export function* RepeatsSagas() {
  yield takeLatest(repeatsSlice.actions.addRepeat, addRepeatsSaga);
}
