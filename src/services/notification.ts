import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import i18next from '../i18n';

export class NotificationService {
  static async register() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function () {
        PushNotification.createChannel(
          {
            channelId: 'habits', // (required)
            channelName: 'Habits', // (required)
            channelDescription: 'Channel for all notifications', // (optional) default: undefined.
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
          },
          () => {},
        );
        NotificationService.subscribeOnAllNotification();
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function () {},

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }

  static async requestPermissions() {
    return PushNotification.requestPermissions();
  }

  static async unsubscribeAllNotification() {
    PushNotification.cancelAllLocalNotifications();
  }

  static async subscribeOnAllNotification() {
    await NotificationService.subscribeOnReminders();
  }

  static async subscribeOnReminders() {
    PushNotification.getScheduledLocalNotifications((notifications) => {
      if (notifications.length === 0) {
        PushNotification.localNotificationSchedule({
          channelId: 'habits',
          id: 1,
          ignoreInForeground: true,
          largeIcon: '',
          title: i18next.t('notification.reminder.title'),
          message: i18next.t('notification.reminder.message'), // (required)
          date: new Date(Date.now() + 60 * 1000), // in 60 secs
          repeatType: 'day',
          allowWhileIdle: true,
        });
      }
    });
  }
}
