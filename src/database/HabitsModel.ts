import firestore from '@react-native-firebase/firestore';
import { HabitType } from '../types/habits';

const COLLECTION_NAME = 'Habits';

export class HabitsModel {
  static async add(userId: string, habit: HabitType) {
    const newHabit = await firestore()
      .collection(COLLECTION_NAME)
      .add({
        ...habit,
        userId,
      });

    return {
      ...habit,
      id: newHabit.id,
    };
  }

  static async getUserHabits(userId: string): Promise<HabitType[]> {
    const snapshot = await firestore()
      .collection(COLLECTION_NAME)
      .where('userId', '==', userId)
      .limit(100)
      .get();

    return snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        name: docData.name,
        done: docData.done,
        total: docData.total,
        days: docData.days,
      };
    });
  }

  static deleteHabit(habitId: string) {
    return firestore().collection(COLLECTION_NAME).doc(habitId).delete();
  }
}
