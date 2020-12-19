import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns';
const COLLECTION_NAME = 'Repeats';

export class RepeatsModel {
  static async addRepeat(
    habitId: string,
    userId: string,
    countRepeats: number = 1,
    date: Date,
  ) {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const snapshot = await firestore()
      .collection(COLLECTION_NAME)
      .where('date', '==', formattedDate)
      .where('habitId', '==', habitId)
      .where('userId', '==', userId)
      .get();

    if (snapshot.size > 0) {
      return firestore()
        .collection(COLLECTION_NAME)
        .doc(snapshot.docs[0].id)
        .update({
          repeats: firestore.FieldValue.increment(countRepeats),
        });
    } else {
      return firestore().collection(COLLECTION_NAME).add({
        repeats: countRepeats,
        date: formattedDate,
        userId,
        habitId,
      });
    }
  }

  static async getUserRepeats() {}
}
