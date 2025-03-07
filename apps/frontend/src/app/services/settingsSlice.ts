import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  reducers: {
    resetSettings: () => getInitialSettingsState(),
    setDate: (state, action: PayloadAction<string>) => {
      const allowedDates = ['today', 'yesterday', 'all-time'];
      if (
        !allowedDates.includes(
          action.payload.toLowerCase().replace(/[^a-z]/g, ''),
        )
      ) {
        return;
      }
      state.date = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
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

export const { resetSettings, setDate, setFilter } = settingsSlice.actions;

export default settingsSlice.reducer;
