import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { searchReducer } from './slices/searchSlice';
import { userReducer } from './slices/userSlice';

const rootReducer = combineReducers({
  userReducer,
  searchReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
