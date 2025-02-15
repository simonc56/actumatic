import { configureStore } from '@reduxjs/toolkit';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { api } from '../app/services/api';

afterEach(() => {
  cleanup();
});

export function setupApiStore<A extends typeof api>(
  api: A,
  extraReducers?: Record<string, any>,
) {
  const getStore = () =>
    configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
        ...extraReducers,
      },
      middleware: (gdm) =>
        gdm({ serializableCheck: false, immutableCheck: false }).concat(
          api.middleware,
        ),
    });

  const initialStore = getStore();
  const refObj = {
    api,
    store: initialStore,
    reset() {
      refObj.store = getStore();
    },
  };

  return refObj;
}
