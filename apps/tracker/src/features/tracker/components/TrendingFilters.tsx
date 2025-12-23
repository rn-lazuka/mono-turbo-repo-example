import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router';

import { filtersToSearchParams } from '@features/tracker/utils/filtersToSearchParams';
import { logEvent } from '@shared/lib/analytics/googleAnalitics';
import { YieldPoolsFilters } from '@shared/types/tracker';
import { useGetYieldTrendingFiltersQuery } from '@store/api/trackerApi';
import { selectTrackerFilters } from '@store/selectors/trackerSlice';
import { setFilters } from '@store/slices/trackerSlice';
import { useAppDispatch } from '@store/store';

const TrendingFilters = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tableFilters = selectTrackerFilters();

  const { data, isLoading, isFetching } = useGetYieldTrendingFiltersQuery();

  const handleClickFilter = (filters: YieldPoolsFilters, name: string) => {
    logEvent('Trending Filter', 'trending_filter_click', name);

    const newSearchParams = filtersToSearchParams({
      defaultAPY: tableFilters.defaultAPY,
      ...filters,
    });
    navigate({ search: newSearchParams.toString() }, { replace: true });
    dispatch(setFilters(filters));
  };

  return (
    <Box mt={{ xs: 2, md: 3 }} gap={1} display="flex" flexWrap="wrap">
      {isLoading || isFetching || !data
        ? Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" width={120} height={36} sx={{ borderRadius: 1 }} />
          ))
        : data.map(({ name, tooltipName, filters }) => (
            <Tooltip key={name} title={tooltipName} arrow placement="top-end">
              <Button
                variant="outlined"
                size="medium"
                onClick={() => handleClickFilter(filters, name)}
              >
                {name}
              </Button>
            </Tooltip>
          ))}
    </Box>
  );
};

export default TrendingFilters;
