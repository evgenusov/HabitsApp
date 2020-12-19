import { takeLatest, call, put } from 'redux-saga/effects';
import { userSlice } from './reducer';
import { UserModel } from '../../database/UserModel';

export function* getCurrentUserSaga() {
  try {
    const currentUser = UserModel.getCurrentUser();
    if (!currentUser) {
      yield call(UserModel.guestSignIn);

      yield put(
        userSlice.actions.setCurrentUser({
          uid: UserModel.getCurrentUser()!.uid,
          isGuest: true,
        }),
      );
    } else {
      yield put(
        userSlice.actions.setCurrentUser({
          uid: currentUser.uid,
          isGuest: true,
        }),
      );
    }
  } catch (e) {
    console.error(e);
    yield put(userSlice.actions.getCurrentUserError());
  }
}

export function* UsersSagas() {
  yield takeLatest(userSlice.actions.checkUserAuth, getCurrentUserSaga);
}
