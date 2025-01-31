import { IUserDto } from '@shared-libs';
import { IUser } from 'src/@types/user';
import { enhancedApi } from '../app/services/api';

const userApi = enhancedApi
  .enhanceEndpoints({ addTagTypes: ['User', 'Users'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query<IUser[], void>({
        query: () => 'user',
        providesTags: ['Users'],
      }),
      getUser: builder.query<IUser, string>({
        query: (id: string) => `user/${id}`,
        providesTags: ['User'],
      }),
      createUser: builder.mutation<IUser, IUserDto>({
        query: (user) => ({
          url: `user`,
          method: 'POST',
          body: user,
        }),
        invalidatesTags: ['Users'],
      }),
    }),
  });

export const { useGetUsersQuery, useGetUserQuery, useCreateUserMutation } =
  userApi;
