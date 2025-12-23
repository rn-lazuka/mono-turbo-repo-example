import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import config from '@shared/config/index';

export const aweberApi = createApi({
  reducerPath: 'aweberApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${config.API_URL}/api/` }),
  endpoints: (builder) => ({
    subscribeWeeklyUpdates: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: 'subscribe',
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});

export const { useSubscribeWeeklyUpdatesMutation } = aweberApi;
