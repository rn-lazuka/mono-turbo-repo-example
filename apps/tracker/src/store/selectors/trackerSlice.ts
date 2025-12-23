import {
  isTrackerResetVisible,
  isTrackerSaveViewVisible,
  lastTrackerUpdate,
  savedViews,
  selectedSavedView,
} from '@store/slices/trackerSlice';
import { useAppSelector } from '@store/store';

export const selectTrackerFilters = () => useAppSelector((state) => state.tracker.filters);
export const selectTrackerResetButton = () => useAppSelector(isTrackerResetVisible);
export const selectTrackerSaveViewButton = () =>
  useAppSelector((state) => {
    const isResetVisible = isTrackerResetVisible(state);
    const isSaveVisible = isTrackerSaveViewVisible(state);
    return isResetVisible && isSaveVisible;
  });
export const selectSelectedSavedView = () => useAppSelector(selectedSavedView);
export const selectSavedViews = () => useAppSelector(savedViews);
export const selectTrackerUpdate = () => useAppSelector(lastTrackerUpdate);
