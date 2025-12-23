import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type ColumnConfig, ExpandableTable, WithSx } from '@yup/ui';
import { useTranslation } from 'react-i18next';

import AllocationCollapseRow from '@features/dashboard/components/Asset/AllocationCollapseRow';
import CurrentValueTableCell from '@features/dashboard/components/Asset/CurrentValueTableCell';
import StrategyTableCell from '@features/dashboard/components/Asset/StrategyTableCell';
import { strategyAllocationData } from '@shared/constants/dashboard';
import { ServiceModalName } from '@shared/enums/modals';
import { addServiceModal } from '@store/slices/serviceModalSlice';
import { useAppDispatch } from '@store/store';

interface ActiveStrategiesProps extends WithSx {
  token: string;
  network: string;
}

const ActiveStrategies = ({ token, network, sx }: ActiveStrategiesProps) => {
  const { t } = useTranslation('dashboard');
  const dispatch = useAppDispatch();

  const handleOpenWithdrawModal = (data: any) => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.Withdraw,
        payload: { token, network, strategy: data.strategy, amount: data.value, apy: data.apy },
      })
    );
  };

  // TODO: add type after the adding data on backend
  const columns: ColumnConfig<any>[] = [
    {
      key: 'strategy',
      label: t('strategy'),
      format: (data) => <StrategyTableCell strategy={data.strategy} apy={data.apy} />,
      width: 160,
    },
    {
      key: 'deposit',
      label: t('deposit'),
      format: (data) => (
        <Typography variant="textM" color="text.black" textAlign="right">
          {`${data.deposit.toFixed(2)} ${token}`}
        </Typography>
      ),
      width: 80,
      sx: { '& div': { justifyContent: 'flex-end' } },
    },
    {
      key: 'value',
      label: t('currentValue'),
      format: (data) => <CurrentValueTableCell value={data.value} earned={data.earned} />,
      width: 120,
      sx: { '& div': { justifyContent: 'flex-end' } },
    },
    {
      key: 'action',
      label: t('action'),
      format: (data) => (
        <Button
          variant="outlined"
          size="small"
          sx={{ ml: 'auto' }}
          onClick={() => handleOpenWithdrawModal(data)}
          startIcon={<ArrowDownwardRoundedIcon />}
        >
          {t('withdraw')}
        </Button>
      ),
      width: 90,
    },
  ];

  return (
    <Paper sx={{ p: 3, ...sx }}>
      <Stack direction="column" gap={2}>
        <Typography variant="textL" fontWeight={600}>
          {t('strategyAllocation')}
        </Typography>
        <ExpandableTable<any> // TODO: add type after the adding data on backend
          data={strategyAllocationData}
          columns={columns}
          minWidth={850}
          sx={{ mt: 3 }}
          renderExpandedRow={(data) => <AllocationCollapseRow allocation={data.allocation} />}
        />
      </Stack>
    </Paper>
  );
};

export default ActiveStrategies;
