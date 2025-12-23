import { createApi } from '@reduxjs/toolkit/query/react';

import {
  YieldFiltersResponse,
  YieldPoolResponse,
  YieldPoolsFilters,
  YieldPoolsData,
  YieldTrendingFiltersResponse,
  YieldTopMetricsResponse,
  SavedFiltersResponse,
  TrackerViewItem,
  SavedTrackerViewItem,
} from '@shared/types/tracker';
import { createCustomBaseQuery } from '@store/api/baseQuery';
import { addFilters, setSavedViews, updateTrackerDataTimestamp } from '@store/slices/trackerSlice';

export const trackerApi = createApi({
  reducerPath: 'trackerApi',
  baseQuery: createCustomBaseQuery('/tracker'),
  endpoints: (builder) => ({
    getYieldPools: builder.query<YieldPoolsData, YieldPoolsFilters | void>({
      query: (params) => ({
        url: 'yield/pools',
        params: params ?? {},
      }),
      transformResponse: (response: YieldPoolResponse): YieldPoolsData => {
        return {
          updatedAt: response.lastUpdateAt,
          pools: response.poolsGroupedByToken.map((group, index) => {
            const [primary, ...breakdown] = group.pools;
            return {
              id: index,
              tokenSymbol: primary.tokenSymbol,
              baseApy: primary.baseApy,
              rewardApy: primary.rewardApy,
              apy: primary.apy,
              apy7d: primary.apy7d,
              apy30d: primary.apy30d,
              protocolName: primary.protocolName,
              chainName: primary.chainName,
              url: primary.url,
              tvl: primary.tvl,
              breakdown: breakdown.map((item, i) => ({
                id: i,
                tokenSymbol: item.tokenSymbol,
                baseApy: item.baseApy,
                rewardApy: item.rewardApy,
                apy: item.apy,
                apy7d: item.apy7d,
                apy30d: item.apy30d,
                protocolName: item.protocolName,
                chainName: item.chainName,
                url: item.url,
                tvl: item.tvl,
              })),
            };
          }),
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateTrackerDataTimestamp(data.updatedAt));
        } catch (error) {
          console.error('Failed to fetch yield data', error);
        }
      },
    }),
    getYieldFilters: builder.query<YieldFiltersResponse, void>({
      query: () => ({
        url: 'yield/filters',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            addFilters({
              defaultAPY: [Math.floor(data.apyMin * 10) / 10, Math.floor(data.apyMax * 10) / 10],
            })
          );
        } catch (error) {
          console.error('Failed to fetch yield filters', error);
        }
      },
    }),
    getYieldTrendingFilters: builder.query<YieldTrendingFiltersResponse, void>({
      query: () => ({ url: 'trending-filters' }),
    }),
    getYieldTopMetrics: builder.query<YieldTopMetricsResponse, void>({
      query: () => ({ url: 'top-metrics' }),
    }),
    getSavedFilters: builder.query<SavedFiltersResponse, void>({
      query: () => ({ url: 'saved-filters' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const preparedData: SavedTrackerViewItem[] = data.map(({ filter, ...filterData }) => ({
            ...filterData,
            filters: filter,
          }));
          dispatch(setSavedViews(preparedData));
        } catch (error) {
          console.error('Failed to fetch saved views data', error);
        }
      },
    }),
    saveTrackerView: builder.mutation<SavedTrackerViewItem, TrackerViewItem>({
      query: (item) => ({
        url: 'saved-filters',
        method: 'POST',
        body: item,
      }),
    }),
    deleteSavedFilter: builder.mutation<void, number>({
      query: (id) => ({
        url: `saved-filters/${id}`,
        method: 'DELETE',
      }),
    }),
    updateTrackerViewName: builder.mutation<void, { id: number; name: string }>({
      query: (payload) => ({
        url: 'saved-filters',
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetYieldPoolsQuery,
  useGetYieldFiltersQuery,
  useGetYieldTrendingFiltersQuery,
  useGetYieldTopMetricsQuery,
  useGetSavedFiltersQuery,
  useSaveTrackerViewMutation,
  useDeleteSavedFilterMutation,
  useUpdateTrackerViewNameMutation,
} = trackerApi;
