import { INewsDto } from '@shared-libs';
import { INews, ISortedNews, NewsParamsType } from 'src/@types/news';
import { enhancedApi } from '../app/services/api';

const newsApi = enhancedApi
  .enhanceEndpoints({ addTagTypes: ['News', 'AllNews', 'SortedNews'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllNews: builder.query<INews[], NewsParamsType>({
        query: ({ after, before }) => {
          return { url: `news/all`, params: { after, before } };
        },
        providesTags: ['AllNews'],
      }),
      getSortedNews: builder.query<ISortedNews, NewsParamsType>({
        query: ({ after, before }) => {
          return { url: `news/sorted`, params: { after, before } };
        },
        providesTags: ['SortedNews'],
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
  useGetSortedNewsQuery,
  useGetAllNewsByProviderQuery,
  useGetNewsQuery,
  useCreateNewsMutation,
} = newsApi;
