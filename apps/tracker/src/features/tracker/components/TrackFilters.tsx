import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { CryptoIcon, stablecoinIconsMap, MultiSelectPopover, arrayToOptions } from '@yup/ui';
import isEqual from 'lodash-es/isEqual';
import { useTranslation } from 'react-i18next';

import SavedViewsFilter from '@features/tracker/components/SavedViewsFilter';
import YieldRangeFilter from '@features/tracker/components/YieldRangeFilter';
import { filtersToSearchParams } from '@features/tracker/utils/filtersToSearchParams';
import { ServiceModalName } from '@shared/enums/modals';
import { logEvent } from '@shared/lib/analytics/googleAnalitics';
import { TrackerFilters } from '@shared/types/tracker';
import { useGetYieldFiltersQuery } from '@store/api/trackerApi';
import {
  selectSavedViews,
  selectSelectedSavedView,
  selectTrackerFilters,
  selectTrackerResetButton,
  selectTrackerSaveViewButton,
} from '@store/selectors/trackerSlice';
import { selectIsAuth } from '@store/selectors/userSlice';
import { addServiceModal } from '@store/slices/serviceModalSlice';
import { resetFilters, addFilters } from '@store/slices/trackerSlice';
import { useAppDispatch } from '@store/store';

const TrackFilters = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['tracker', 'common']);
  const filters = selectTrackerFilters();
  const selectedView = selectSelectedSavedView();
  const savedTrackerViews = selectSavedViews();
  const isResetVisible = selectTrackerResetButton();
  const isSaveViewVisible = selectTrackerSaveViewButton();
  const isAuth = selectIsAuth();

  const { data, isLoading } = useGetYieldFiltersQuery();

  const stablecoinOptions = arrayToOptions(data?.tokenSymbols, stablecoinIconsMap, CryptoIcon);
  const chainOptions = arrayToOptions(data?.chainNames);
  const protocolOptions = arrayToOptions(data?.protocolNames);

  const isFiltersEqualToSaved = (() => {
    if (!selectedView) return false;
    const saved = savedTrackerViews.find((view) => view.id === selectedView.id);

    if (!saved) return false;
    return isEqual(saved.filters, filters);
  })();

  const handleSave = () => {
    logEvent('Tracker', 'save_tracker_view_modal_open');
    dispatch(
      addServiceModal({
        name: ServiceModalName.SaveTracker,
      })
    );
  };

  const handleReset = () => {
    dispatch(resetFilters());
    window.history.replaceState(null, '', window.location.pathname);
  };

  const updateURLSearchParamsFromFilters = (filters: Partial<TrackerFilters>) => {
    const params = filtersToSearchParams(filters);
    const newRelativePathQuery = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newRelativePathQuery);
  };

  const onFilterChange = <K extends keyof TrackerFilters>(key: K, value: TrackerFilters[K]) => {
    const updatedFilters = { ...filters, [key]: value };
    updateURLSearchParamsFromFilters(updatedFilters);
    dispatch(addFilters({ [key]: value }));
  };

  const onYieldRangeChange = (range: [number, number]) => {
    const [min, max] = range;
    const updatedFilters = { ...filters, apyMin: min, apyMax: max };
    updateURLSearchParamsFromFilters(updatedFilters);
    dispatch(addFilters({ apyMin: min, apyMax: max }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        mt: { xs: 2, md: 3 },
      }}
    >
      {isLoading || !filters?.defaultAPY ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, width: '100%' }}>
          <Skeleton variant="rounded" width={120} height={36} />
          <Skeleton variant="rounded" width={120} height={36} />
          <Skeleton variant="rounded" width={120} height={36} />
          <Skeleton variant="rounded" width={180} height={36} />
        </Box>
      ) : (
        <>
          <SavedViewsFilter />
          <Box
            sx={{
              display: 'flex',
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              gap: 1,
            }}
          >
            <MultiSelectPopover
              options={stablecoinOptions}
              selected={filters.tokenSymbols}
              title={t('stablecoin')}
              onChange={(selected) => onFilterChange('tokenSymbols', selected)}
            />
            <MultiSelectPopover
              options={chainOptions}
              title={t('chains')}
              selected={filters.chainNames}
              onChange={(selected) => onFilterChange('chainNames', selected)}
            />
            <MultiSelectPopover
              options={protocolOptions}
              title={t('protocol')}
              selected={filters.protocolNames}
              onChange={(selected) => onFilterChange('protocolNames', selected)}
            />
            <YieldRangeFilter
              defaultRangeGap={filters.defaultAPY}
              range={
                filters?.apyMin && filters.apyMax
                  ? [filters.apyMin, filters.apyMax]
                  : filters.defaultAPY
              }
              onChange={onYieldRangeChange}
            />
          </Box>
          <Stack direction="row" spacing={1}>
            {isAuth && isSaveViewVisible && !isFiltersEqualToSaved && (
              <Button
                variant="contained"
                startIcon={<SaveOutlinedIcon fontSize="small" />}
                sx={{ height: 36 }}
                onClick={handleSave}
              >
                {t('common:saveView')}
              </Button>
            )}
            {isResetVisible && (
              <Button
                variant="text"
                startIcon={<CloseRoundedIcon fontSize="small" />}
                sx={{ height: 36 }}
                onClick={handleReset}
              >
                {t('common:reset')}
              </Button>
            )}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default TrackFilters;
