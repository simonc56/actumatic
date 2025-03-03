import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICategoryDetailedDto, IProviderDto } from '@shared-libs';
import categoryApi from 'src/features/category';
import { getInitialSettingsState } from './localStorage';

export const fetchCategoriesAndProviders = createAsyncThunk(
  'settings/fetchCategoriesAndProviders',
  async (_, { dispatch }) => {
    const result = await dispatch(
      categoryApi.endpoints.getCategoriesAndProviders.initiate(),
    );
    return result.data;
  },
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: getInitialSettingsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAndProviders.fulfilled, (state, action) => {
        state.categories = action.payload?.categories || [];
        if (!state.categories.length) return;
        const providers = state.categories.reduce(
          (
            acc: Omit<IProviderDto, 'categoryId'>[],
            category: ICategoryDetailedDto,
          ) => {
            return [...acc, ...(category.providers || [])];
          },
          [],
        );
        state.providers = providers;
      })
      .addCase(fetchCategoriesAndProviders.rejected, (state) => {
        state.categories = [];
      });
  },
});

export default settingsSlice.reducer;
