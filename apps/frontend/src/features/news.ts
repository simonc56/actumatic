import { INewsDto, IProviderNewsDto } from '@shared-libs';
import { INews, ISortedNews, NewsParamsType } from 'src/@types/news';
import { enhancedApi } from '../app/services/api';

const newsApi = enhancedApi
  .enhanceEndpoints({
    addTagTypes: ['News', 'AllNews', 'ProviderNews', 'SortedNews'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllNews: builder.query<INews[], NewsParamsType>({
        query: ({ begin, end }) => {
          return { url: `news/all`, params: { begin, end } };
        },
        providesTags: ['AllNews'],
      }),
      getSortedNews: builder.query<ISortedNews, NewsParamsType>({
        query: ({ begin, end }) => {
          return { url: `news/sorted`, params: { begin, end } };
        },
        providesTags: ['SortedNews'],
      }),
      getAllNewsByProvider: builder.query<IProviderNewsDto, NewsParamsType>({
        query: ({ providerId, begin, end }) => {
          return {
            url: `provider/${providerId}/news`,
            params: { begin, end },
          };
        },
        providesTags: ['ProviderNews'],
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
