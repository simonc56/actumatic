import { ICategoryDto } from '@shared-libs';
import { ICategory } from 'src/@types/category';
import { enhancedApi } from '../app/services/api';

const providerApi = enhancedApi
  .enhanceEndpoints({ addTagTypes: ['Category', 'Categories'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCategories: builder.query<ICategory[], void>({
        query: () => 'category',
        providesTags: ['Categories'],
      }),
      getCategory: builder.query<ICategory, string>({
        query: (id: string) => `category/${id}`,
        providesTags: ['Category'],
      }),
      createCategory: builder.mutation<ICategory, ICategoryDto>({
        query: (provider) => ({
          url: `category`,
          method: 'POST',
          body: provider,
        }),
        invalidatesTags: ['Categories'],
      }),
    }),
  });

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
} = providerApi;
