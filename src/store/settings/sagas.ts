import { takeLatest, call } from 'redux-saga/effects';
import { settingsSlice } from './reducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { NotificationService } from '../../services/notification';

export function* onChangePushNotificationSaga(action: PayloadAction<boolean>) {
  if (action.payload) {
    yield call(NotificationService.subscribeOnAllNotification);
  } else {
    yield call(NotificationService.unsubscribeAllNotification);
  }
}

export function* SettingsSagas() {
  yield takeLatest(
    settingsSlice.actions.setPushNotification,
    onChangePushNotificationSaga,
  );
}
