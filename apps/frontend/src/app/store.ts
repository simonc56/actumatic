import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { IProviderDto } from '@shared-libs';
import { enhancedApi } from './services/api';
import settingsReducer from './services/settingsSlice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    [enhancedApi.reducerPath]: enhancedApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(enhancedApi.middleware),
  devTools: true,
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// selector to get a category from its id
export const selectCategoryByIdOrSlug =
  (categoryId: string) => (state: RootState) =>
    state.settings.categories.find(
      (category) => category.id === categoryId || category.slug === categoryId,
    );

// selector to get a provider from its id
export const selectProviderByIdOrSlug =
  (providerId: string) => (state: RootState) =>
    state.settings.providers.find(
      (provider) => provider.id === providerId || provider.slug === providerId,
    );

export const selectCategoryByProviderIdOrSlug =
  (providerId: string) => (state: RootState) =>
    state.settings.categories.find((category) =>
      category.providers.some(
        (provider: Omit<IProviderDto, 'categoryId'>) =>
          provider.id === providerId || provider.slug === providerId,
      ),
    );

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
