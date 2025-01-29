import { enhancedApi } from '../app/services/api';

export const userApi = enhancedApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => 'users',
    }),
  }),
});
