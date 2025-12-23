import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { authApi } from './api/authApi';
import { aweberApi } from './api/aweberApi';
import { trackerApi } from './api/trackerApi';
import serviceModalReducer from './slices/serviceModalSlice';
import snackbarReducer from './slices/snackbarSlice';
import trackerReducer from './slices/trackerSlice';
import userReducer from './slices/userSlice';

import config from '../shared/config';

const rootReducer = combineReducers({
  // Reducers
  serviceModal: serviceModalReducer,
  snackbar: snackbarReducer,
  tracker: trackerReducer,
  user: userReducer,
  // Api
  [authApi.reducerPath]: authApi.reducer,
  [trackerApi.reducerPath]: trackerApi.reducer,
  [aweberApi.reducerPath]: aweberApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([
      // Additional middlewares
      authApi.middleware,
      trackerApi.middleware,
      aweberApi.middleware,
    ]),
  devTools: !config.isProduction,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
