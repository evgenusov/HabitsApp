import { all } from 'redux-saga/effects';
import { HabitSagas } from './habits/sagas';
import { UsersSagas } from './users/sagas';
import { RepeatsSagas } from './repeats/sagas';

export function* allSagas() {
  yield all([HabitSagas(), UsersSagas(), RepeatsSagas()]);
}
