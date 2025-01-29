import { enhancedApi } from '../app/services/api';

const userApi = enhancedApi
  .enhanceEndpoints({ addTagTypes: ['Users'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query<User[], void>({
        query: () => 'users',
        providesTags: ['Users'],
      }),
      getUser: builder.query<User, string>({
        query: (id: string) => `users/${id}`,
        providesTags: ['Users'],
      }),
      createUser: builder.mutation<User, IUserDto>({
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
