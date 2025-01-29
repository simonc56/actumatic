import { configureStore } from '@reduxjs/toolkit';
import { enhancedApi } from './services/api';

const store = configureStore({
  reducer: {
    [enhancedApi.reducerPath]: enhancedApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(enhancedApi.middleware),
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
