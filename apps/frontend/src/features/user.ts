import { enhancedApi } from '../app/services/api';
import { IUser, IUserDto } from '@shared-libs';

const userApi = enhancedApi
  .enhanceEndpoints({ addTagTypes: ['Users'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query<IUser[], void>({
        query: () => 'users',
        providesTags: ['Users'],
      }),
      getUser: builder.query<IUser, string>({
        query: (id: string) => `users/${id}`,
        providesTags: ['Users'],
      }),
      createUser: builder.mutation<IUser, IUserDto>({
        query: (user) => ({
          url: `users`,
          method: 'POST',
          body: user,
        }),
        invalidatesTags: ['Users'],
      }),
    }),
  });

export const { useGetUsersQuery, useGetUserQuery, useCreateUserMutation } =
  userApi;
