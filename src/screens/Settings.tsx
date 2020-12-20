import React, { useCallback } from 'react';
import { List, Switch } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { pushNotificationSettingsSelector } from '../store/settings/selector';
import { settingsSlice } from '../store/settings/reducer';
import { useTranslation } from 'react-i18next';

export const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const enabledPushNotification = useSelector(pushNotificationSettingsSelector);

  const onChangePushNotification = useCallback(() => {
    dispatch(
      settingsSlice.actions.setPushNotification(!enabledPushNotification),
    );
  }, [enabledPushNotification]);

  return (
    <List.Item
      title={t('settings.notifications.title')}
      description={t('settings.notifications.description')}
      left={() => <List.Icon icon="bell" />}
      right={() => (
        <Switch
          value={enabledPushNotification}
          onValueChange={onChangePushNotification}
        />
      )}
    />
  );
};
