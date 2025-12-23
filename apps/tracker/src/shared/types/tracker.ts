import { TableSortOrder, YieldTableSortByField } from '@shared/enums/tables';
import { YieldMetricNames } from '@shared/enums/tracker';

export interface YieldPool {
  tokenSymbol: string;
  baseApy: number;
  rewardApy: number;
  apy: number;
  apy7d: number;
  apy30d: number;
  protocolName: string;
  chainName: string;
  url: string;
  tvl: string;
}

export interface GroupedYieldPool {
  groupedByToken: string;
  pools: YieldPool[];
}

export interface YieldPoolResponse {
  lastUpdateAt: Date;
  poolsGroupedByToken: GroupedYieldPool[];
}

export interface YieldPoolWithId extends YieldPool {
  id: number;
}

export interface YieldPoolRowTableData extends YieldPoolWithId {
  breakdown?: YieldPoolWithId[];
}

export interface YieldPoolsData {
  updatedAt: Date;
  pools: YieldPoolRowTableData[];
}

export interface AWeberRequestData {
  email: string;
}

export interface YieldPoolsFilters {
  tokenSymbols?: string[];
  chainNames?: string[];
  protocolNames?: string[];
  apyMin?: number;
  apyMax?: number;
  sortBy?: YieldTableSortByField;
  sortOrder?: TableSortOrder;
}

export interface YieldFiltersResponse {
  tokenSymbols: string[];
  chainNames: string[];
  protocolNames: string[];
  apyMin: number;
  apyMax: number;
}

export interface YieldTrendingFilter {
  name: string;
  tooltipName: string;
  filters: YieldPoolsFilters;
}

export type YieldTrendingFiltersResponse = YieldTrendingFilter[];

export interface TrackerFilters {
  tokenSymbols: string[];
  chainNames: string[];
  protocolNames: string[];
  defaultAPY: [number, number] | null;
  apyMin: number | null;
  apyMax: number | null;
  sortBy: YieldTableSortByField | null;
  sortOrder: TableSortOrder | null;
}

export interface TrackerViewItem {
  name: string;
  filters: Partial<TrackerFilters>;
}

export interface SavedTrackerViewItem extends TrackerViewItem {
  id: number;
  createdAt: Date;
}

export interface YieldTopMetric {
  metricName: YieldMetricNames;
  mainTitle: string;
  tooltip: string;
  primaryValue: string;
  additionalValue: string | number | null;
  bottomTitle: string;
}

export type YieldTopMetricsResponse = YieldTopMetric[];

export type SavedFiltersResponse = ({ filter: Partial<TrackerFilters> } & Omit<
  SavedTrackerViewItem,
  'filters'
>)[];
