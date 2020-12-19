import { RootState } from '../reducer';

export const signErrorSelector = (state: RootState) => {
  return state.users.state === 'error';
};

export const getCurrentUserSelector = (state: RootState) => state.users.data;
