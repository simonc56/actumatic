import { INewsDto } from '@shared-libs';
import { INews, NewsParamsType } from 'src/@types/news';
import { enhancedApi } from '../app/services/api';

const newsApi = enhancedApi
  .enhanceEndpoints({ addTagTypes: ['News', 'AllNews'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllNews: builder.query<INews[], NewsParamsType>({
        query: ({ after, before }) => {
          return { url: `news`, params: { after, before } };
        },
        providesTags: ['AllNews'],
      }),
      getAllNewsByProvider: builder.query<INews[], NewsParamsType>({
        query: ({ providerId, after, before }) => {
          return {
            url: `provider/${providerId}/news`,
            params: { after, before },
          };
        },
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

export const {
  useGetAllNewsQuery,
  useGetAllNewsByProviderQuery,
  useGetNewsQuery,
  useCreateNewsMutation,
} = newsApi;
