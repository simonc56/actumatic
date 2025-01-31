import { IProviderDto } from '@shared-libs';
import { IProvider } from 'src/@types/provider';
import { enhancedApi } from '../app/services/api';

const providerApi = enhancedApi
  .enhanceEndpoints({ addTagTypes: ['Provider', 'Providers'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProviders: builder.query<IProvider[], void>({
        query: () => 'provider',
        providesTags: ['Providers'],
      }),
      getProvider: builder.query<IProvider, string>({
        query: (id: string) => `provider/${id}`,
        providesTags: ['Provider'],
      }),
      createProvider: builder.mutation<IProvider, IProviderDto>({
        query: (provider) => ({
          url: `provider`,
          method: 'POST',
          body: provider,
        }),
        invalidatesTags: ['Providers'],
      }),
    }),
  });

export const {
  useGetProvidersQuery,
  useGetProviderQuery,
  useCreateProviderMutation,
} = providerApi;
