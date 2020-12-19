import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersSliceState } from './types';
import { CurrentUserType } from '../../types/users';

const initialState: UsersSliceState = {
  state: 'loading',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser(
      state: UsersSliceState,
      action: PayloadAction<CurrentUserType>,
    ) {
      state.state = 'success';
      state.data = action.payload;
    },
    checkUserAuth(state: UsersSliceState) {
      state.state = 'loading';
    },
    getCurrentUserError(state: UsersSliceState) {
      state.state = 'error';
    },
  },
});

export const userReducer = userSlice.reducer;
