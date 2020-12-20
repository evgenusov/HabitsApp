import { combineReducers } from 'redux';
import { habitsReducer } from './habits/reducer';
import { userReducer } from './users/reducer';
import { repeatsReducer } from './repeats/reducer';
import { settingsReducer } from './settings/reducer';

export const rootReducer = combineReducers({
  habits: habitsReducer,
  users: userReducer,
  repeats: repeatsReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
