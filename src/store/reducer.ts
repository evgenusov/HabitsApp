import { combineReducers } from 'redux';
import { habitsReducer } from './habits/reducer';
import { userReducer } from './users/reducer';
import { repeatsReducer } from './repeats/reducer';

export const rootReducer = combineReducers({
  habits: habitsReducer,
  users: userReducer,
  repeats: repeatsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
