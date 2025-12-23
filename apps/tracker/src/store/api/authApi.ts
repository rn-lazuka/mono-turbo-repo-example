import { createApi } from '@reduxjs/toolkit/query/react';

import { AuthCheckResponse } from '@shared/types/auth';
import { createCustomBaseQuery } from '@store/api/baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: createCustomBaseQuery('/auth'),
  endpoints: (builder) => ({
    getAuthStatus: builder.query<AuthCheckResponse, void>({
      query: () => ({
        url: '/check',
      }),
      keepUnusedDataFor: 0,
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetAuthStatusQuery, useLogoutUserMutation } = authApi;
