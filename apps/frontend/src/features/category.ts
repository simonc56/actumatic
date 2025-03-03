import { ICategoriesAndProvidersDto, ICategoryDto } from '@shared-libs';
import { ICategory } from 'src/@types/category';
import { enhancedApi } from '../app/services/api';

const categoryApi = enhancedApi
  .enhanceEndpoints({
    addTagTypes: ['Category', 'Categories', 'CategoriesAndProviders'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCategories: builder.query<ICategory[], void>({
        query: () => 'category',
        providesTags: ['Categories'],
      }),
      getCategoriesAndProviders: builder.query<
        ICategoriesAndProvidersDto,
        void
      >({
        query: () => 'category/provider',
        providesTags: ['CategoriesAndProviders'],
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
  useGetCategoriesAndProvidersQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
} = categoryApi;

export default categoryApi;
