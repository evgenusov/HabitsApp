import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppSettingsType } from './types';

const initialState: AppSettingsType = {
  enabledPushNotification: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPushNotification: (
      state: AppSettingsType,
      action: PayloadAction<boolean>,
    ) => {
      state.enabledPushNotification = action.payload;
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
