import auth from '@react-native-firebase/auth';

export class UserModel {
  static getCurrentUser() {
    return auth().currentUser;
  }

  static guestSignIn() {
    return auth().signInAnonymously();
  }
}
