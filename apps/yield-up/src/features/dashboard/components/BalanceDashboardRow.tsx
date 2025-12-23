import type { ElementType } from 'react';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { DepositModalPayload } from '@features/serviceModal/components/DepositModal/DepositModal';
import { ServiceModalName } from '@shared/enums/modals';
import { addServiceModal } from '@store/slices/serviceModalSlice';
import { useAppDispatch } from '@store/store';

export interface BalanceDashboardRowProps {
  token: string;
  network: string;
  icon: ElementType;
}
const BalanceDashboardRow = ({ network, token, icon: Icon }: BalanceDashboardRowProps) => {
  const { t } = useTranslation('dashboard');
  const dispatch = useAppDispatch();

  const handleOpenDepositModal = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.Deposit,
        payload: { tokenName: token, icon: Icon } as DepositModalPayload,
      })
    );
  };

  return (
    <Paper
      square={false}
      variant="outlined"
      sx={{ p: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
    >
      <Icon sx={{ fontSize: '46px', mr: 1.5 }} />
      <Stack direction="column" sx={{ flex: 1, justifyContent: 'center' }}>
        <Typography variant="textXLSB" fontWeight={600}>
          {token}
        </Typography>
        <Typography variant="textS" color="text.secondary">
          {network}
        </Typography>
      </Stack>
      <Stack
        direction={{ xs: 'row', sm: 'column' }}
        alignItems={{ xs: 'center', sm: 'flex-end' }}
        spacing={{ xs: 1, sm: 0 }}
        mt={{ xs: 1, sm: 0 }}
        sx={{ width: { xs: 1, sm: 'unset' }, order: { xs: 3, sm: 0 } }}
      >
        <Typography variant="textS" color="text.secondary">
          {t('earnUpTo')}
        </Typography>
        <Typography
          variant="textXLSB"
          color="text.secondary"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <AutoAwesomeOutlinedIcon sx={{ fontSize: '16px', mr: 0.5 }} />
          12-20%
        </Typography>
      </Stack>
      <IconButton
        sx={{
          width: 36,
          height: 36,
          p: 1.25,
          ml: 1.5,
          backgroundColor: 'primary.main',
          color: 'text.white',
        }}
        onClick={handleOpenDepositModal}
      >
        <AddRoundedIcon sx={{ fontSize: '16px' }} />
      </IconButton>
    </Paper>
  );
};

export default BalanceDashboardRow;
