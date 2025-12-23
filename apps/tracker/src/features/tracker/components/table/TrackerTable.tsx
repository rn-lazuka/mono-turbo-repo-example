import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ExpandableTable, formatNumberAbbreviation, type ColumnConfig } from '@yup/ui';
import { NewTabIcon } from '@yup/ui';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import APYTableCell from '@features/tracker/components/table/APYTableCell';
import TokenTableCell from '@features/tracker/components/table/TokenTableCell';
import { filtersToSearchParams } from '@features/tracker/utils/filtersToSearchParams';
import { TableSortOrder, YieldTableSortByField } from '@shared/enums/tables';
import { logEvent } from '@shared/lib/analytics/googleAnalitics';
import { YieldPoolWithId } from '@shared/types/tracker';
import { useGetYieldPoolsQuery } from '@store/api/trackerApi';
import { selectTrackerFilters, selectTrackerUpdate } from '@store/selectors/trackerSlice';
import { setSortBy } from '@store/slices/trackerSlice';
import { useAppDispatch } from '@store/store';

const TrackerTable = () => {
  const { t } = useTranslation('tracker');
  const dispatch = useAppDispatch();
  const filters = selectTrackerFilters();
  const lastUpdateDate = selectTrackerUpdate();

  const formattedDate = lastUpdateDate
    ? format(new Date(lastUpdateDate), 'dd/MM/yyyy, HH:mm:ss')
    : null;

  const { data, isLoading, isFetching } = useGetYieldPoolsQuery({
    tokenSymbols: filters.tokenSymbols.length > 0 ? filters.tokenSymbols : undefined,
    chainNames: filters.chainNames.length > 0 ? filters.chainNames : undefined,
    protocolNames: filters.protocolNames.length > 0 ? filters.protocolNames : undefined,
    apyMin:
      filters.apyMin && filters.apyMin !== filters.defaultAPY![0] ? filters.apyMin : undefined,
    apyMax:
      filters.apyMax && filters.apyMax !== filters.defaultAPY![1] ? filters.apyMax : undefined,
    sortBy: filters.sortBy ?? undefined,
    sortOrder: filters.sortOrder ?? undefined,
  });

  const columns: ColumnConfig<YieldPoolWithId>[] = [
    {
      key: 'tokenSymbol',
      label: t('stablecoin'),
      format: (data, isExpandableRow) => (
        <TokenTableCell data={data} isExpandableRow={isExpandableRow} />
      ),
      width: 120,
      isSortable: true,
    },
    {
      key: 'apy',
      label: t('apyNow'),
      format: (data) => <APYTableCell data={data} />,
      width: 120,
      isSortable: true,
    },
    {
      key: 'apy7d',
      label: t('apyWeek'),
      format: (data) => (data.apy7d ? `${data.apy7d.toFixed(1)}%` : '-'),
      width: 120,
      isSortable: true,
    },
    {
      key: 'apy30d',
      label: t('apyMonth'),
      format: (data) => `${data.apy30d.toFixed(1)}%`,
      width: 140,
      isSortable: true,
    },
    {
      key: 'tvl',
      label: t('tvl'),
      format: (data) => `$ ${formatNumberAbbreviation(data.tvl)}`,
      width: 120,
      isSortable: true,
    },
    { key: 'protocolName', label: t('protocol'), width: 120, isSortable: true },
    { key: 'chainName', label: t('network'), width: 120, isSortable: true },
    {
      key: 'url',
      label: t('action'),
      width: 60,
      sx: { textAlign: 'center' },
      format: (data) => (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
          <Link
            href={data.url}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              logEvent('Tracker', 'tracker_table_action_url_click', data.url);
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <NewTabIcon sx={{ fontSize: '16px' }} />
          </Link>
        </Box>
      ),
    },
  ];

  const onSortClick = (column: string) => {
    dispatch(setSortBy(column as YieldTableSortByField));
    let direction = TableSortOrder.DESC;
    if (column === filters.sortBy) {
      if (filters.sortOrder === TableSortOrder.DESC) {
        direction = TableSortOrder.ASC;
      }
    }
    const params = filtersToSearchParams({
      ...filters,
      sortBy: column as YieldTableSortByField,
      sortOrder: direction,
    });
    const newRelativePathQuery = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newRelativePathQuery);
  };

  return (
    <>
      <ExpandableTable<YieldPoolWithId>
        data={data?.pools ?? []}
        columns={columns}
        minWidth={850}
        sortState={
          filters?.sortBy
            ? { key: filters.sortBy as string, direction: filters.sortOrder! }
            : undefined
        }
        isLoading={isLoading || isFetching}
        onSortClick={onSortClick}
        sx={{ mt: 3 }}
      />
      <Stack direction="column" spacing={1} mt={2} alignItems="center">
        <Typography
          variant="textM"
          color="text.secondary"
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            display: 'flex',
            lineHeight: '14px',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          <span>{t('dataSourced')}</span>
          {formattedDate && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AccessTimeOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              {t('lastUpdate', { date: formattedDate })}
            </span>
          )}
        </Typography>
        <Typography variant="textM" color="text.secondary" sx={{ textAlign: 'center' }}>
          {t('onlyShowingProtocols')}
        </Typography>
      </Stack>
    </>
  );
};

export default TrackerTable;
