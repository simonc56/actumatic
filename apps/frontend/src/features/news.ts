import { INewsDto } from '@shared-libs';
import { INews } from 'src/@types/news';
import { enhancedApi } from '../app/services/api';

const newsApi = enhancedApi
  .enhanceEndpoints({ addTagTypes: ['News', 'AllNews'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllNews: builder.query<INews[], void>({
        query: () => 'news',
        providesTags: ['AllNews'],
      }),
      getNews: builder.query<INews, string>({
        query: (id: string) => `news/${id}`,
        providesTags: ['News'],
      }),
      createNews: builder.mutation<INews, INewsDto>({
        query: (news) => ({
          url: `news`,
          method: 'POST',
          body: news,
        }),
        invalidatesTags: ['AllNews'],
      }),
    }),
  });

export const { useGetAllNewsQuery, useGetNewsQuery, useCreateNewsMutation } =
  newsApi;
