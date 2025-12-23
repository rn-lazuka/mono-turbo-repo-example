import { TrackerFilters } from '@shared/types/tracker';

export const filtersToSearchParams = (filters: Partial<TrackerFilters>): URLSearchParams => {
  const params = new URLSearchParams();
  const clearedFilters: Partial<TrackerFilters> = {
    ...filters,
    defaultAPY: null,
    apyMin: filters.apyMin !== filters?.defaultAPY?.[0] ? filters.apyMin! : null,
    apyMax: filters.apyMax !== filters?.defaultAPY?.[1] ? filters.apyMax! : null,
  };

  Object.entries(clearedFilters).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      if (value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number') {
        params.set(key, value.join(','));
      } else if (value.length > 0) {
        params.set(key, value.join(','));
      }
    } else {
      params.set(key, String(value));
    }
  });

  return params;
};
