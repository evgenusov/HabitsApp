import { persistStore, persistReducer } from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import createSagaMiddleware from 'redux-saga';
import { allSagas } from './sagas';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = { storage: AsyncStorage, key: 'root' };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

// @ts-ignore
export const persistor = persistStore(store);

sagaMiddleware.run(allSagas);
