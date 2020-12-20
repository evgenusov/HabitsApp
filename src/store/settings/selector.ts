import { RootState } from '../reducer';

export const pushNotificationSettingsSelector = (state: RootState) =>
  state.settings.enabledPushNotification;
