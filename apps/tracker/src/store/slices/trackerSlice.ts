import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import isEqual from 'lodash-es/isEqual';

import { TableSortOrder, YieldTableSortByField } from '@shared/enums/tables';
import { SavedTrackerViewItem, TrackerFilters } from '@shared/types/tracker';
import { logout } from '@store/slices/userSlice';

interface TrackerState {
  filters: TrackerFilters;
  selectedSavedViewId?: number;
  savedViews: SavedTrackerViewItem[];
  lastUpdateAt: Date | null;
}

const initialState: TrackerState = {
  filters: {
    tokenSymbols: [],
    chainNames: [],
    protocolNames: [],
    defaultAPY: null,
    apyMin: null,
    apyMax: null,
    sortBy: null,
    sortOrder: null,
  },
  lastUpdateAt: null,
  selectedSavedViewId: undefined,
  savedViews: [],
};

export const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<YieldTableSortByField>) {
      const clickedColumn = action.payload;
      const currentSortBy = state.filters.sortBy;
      const currentSortOrder = state.filters.sortOrder;

      if (currentSortBy !== clickedColumn) {
        state.filters.sortBy = clickedColumn;
        state.filters.sortOrder = TableSortOrder.DESC;
      } else {
        if (currentSortOrder === TableSortOrder.DESC) {
          state.filters.sortOrder = TableSortOrder.ASC;
        } else {
          state.filters.sortOrder = TableSortOrder.DESC;
        }
      }
    },
    updateTrackerDataTimestamp(state, action: PayloadAction<Date>) {
      state.lastUpdateAt = action.payload;
    },
    addFilters(state, action: PayloadAction<Partial<TrackerFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.selectedSavedViewId = undefined;
    },
    setFilters(state, action: PayloadAction<Partial<TrackerFilters>>) {
      state.filters = {
        ...initialState.filters,
        defaultAPY: state.filters.defaultAPY,
        ...action.payload,
      };
      state.selectedSavedViewId = undefined;
    },
    resetFilters(state) {
      state.filters = {
        ...initialState.filters,
        defaultAPY: state.filters.defaultAPY,
      };
      state.selectedSavedViewId = undefined;
    },
    setSelectedSavedView(
      state,
      action: PayloadAction<{ id: number; filters: Partial<TrackerFilters> }>
    ) {
      state.selectedSavedViewId = action.payload.id;
      state.filters = {
        ...initialState.filters,
        ...action.payload.filters,
        defaultAPY: state.filters.defaultAPY,
      };
    },
    addSavedView(state, action: PayloadAction<SavedTrackerViewItem>) {
      state.savedViews.unshift(action.payload);
    },
    updateSavedView(state, action: PayloadAction<{ oldName: string; newName: string }>) {
      const { oldName, newName } = action.payload;
      const view = state.savedViews.find((v) => v.name === oldName);
      if (view) {
        view.name = newName;
      }
    },
    setSavedViews(state, action: PayloadAction<SavedTrackerViewItem[]>) {
      state.savedViews = action.payload;
    },
    removeSavedView(state, action: PayloadAction<number>) {
      state.savedViews = state.savedViews.filter((view) => view.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.filters = {
        ...initialState.filters,
        defaultAPY: state.filters.defaultAPY,
      };
      state.selectedSavedViewId = undefined;
      state.savedViews = [];
    });
  },
  selectors: {
    isTrackerResetVisible(state) {
      const { filters } = state;

      const currentFiltersWithoutDefaultAPY = { ...filters } as Partial<TrackerFilters>;
      delete currentFiltersWithoutDefaultAPY.defaultAPY;

      const initialFiltersWithoutDefaultAPY = {
        ...initialState.filters,
      } as Partial<TrackerFilters>;
      delete initialFiltersWithoutDefaultAPY.defaultAPY;

      return !isEqual(currentFiltersWithoutDefaultAPY, initialFiltersWithoutDefaultAPY);
    },
    isTrackerSaveViewVisible(state) {
      const { filters } = state;

      const currentFiltersWithoutDefaultAPY = { ...filters } as Partial<TrackerFilters>;
      delete currentFiltersWithoutDefaultAPY.defaultAPY;

      const currentSelectedView = state.savedViews.find(
        (view) => view.id === state.selectedSavedViewId
      );

      return !isEqual(currentFiltersWithoutDefaultAPY, currentSelectedView?.filters);
    },
    selectedSavedView: (state) => state.savedViews.find((v) => v.id === state.selectedSavedViewId),
    savedViews: (state) => state.savedViews,
    lastTrackerUpdate: (state) => state.lastUpdateAt,
  },
});

export const {
  setFilters,
  addFilters,
  resetFilters,
  setSelectedSavedView,
  removeSavedView,
  addSavedView,
  updateSavedView,
  setSavedViews,
  setSortBy,
  updateTrackerDataTimestamp,
} = trackerSlice.actions;

export const {
  isTrackerResetVisible,
  isTrackerSaveViewVisible,
  selectedSavedView,
  savedViews,
  lastTrackerUpdate,
} = trackerSlice.selectors;

export default trackerSlice.reducer;
