import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import {
  fetchBaseQuery,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import config from '@shared/config/index';
import { logout } from '@store/slices/userSlice';
import { RootState } from '@store/store';

const baseApiUrl = `${config.API_URL}/api`;

export const createCustomBaseQuery = (
  path: string = ''
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const fullBaseUrl = `${baseApiUrl}${path}`;

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: fullBaseUrl,
    credentials: 'include',
  });

  return async (args, api, extraOptions) => {
    const result: any = await rawBaseQuery(args, api, extraOptions);

    if (
      result.error?.status === 503 ||
      result.error?.status === 'FETCH_ERROR' ||
      result?.error?.originalStatus === 503
    ) {
      window.location.href = '/error';
      return result;
    }

    if (result.error?.status === 401) {
      const state = api.getState() as RootState;
      const isAuthenticated = state.user.isAuth;

      if (isAuthenticated) {
        api.dispatch(logout());
      }

      return result;
    }

    return result;
  };
};
