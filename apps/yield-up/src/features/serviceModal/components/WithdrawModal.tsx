import { type MouseEvent, useState } from 'react';

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import { alpha } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DefaultModal, stablecoinIconsMap, TabsGroup } from '@yup/ui';
import { useTranslation } from 'react-i18next';
import { selectServiceModal } from 'tracker/src/store/selectors/serviceModalSlice.ts';

import { transactionAmountPercents } from '@shared/constants/dashboard';
import { ServiceModalName } from '@shared/enums/modals';
import { ServiceModalProps } from '@shared/types/serviceModal';
import { removeServiceModal } from '@store/slices/serviceModalSlice';
import { useAppDispatch } from '@store/store';

export interface WithdrawModalPayload {
  token: string;
  network: string;
  strategy: string;
  amount: number;
  apy: number;
}

const WithdrawModal = ({ index }: ServiceModalProps) => {
  const { t } = useTranslation(['dashboard', 'common']);
  const dispatch = useAppDispatch();
  const { token, network, strategy, amount, apy }: WithdrawModalPayload = selectServiceModal(
    ServiceModalName.Withdraw
  );
  const Icon = stablecoinIconsMap[token];
  const [withdrawPercent, setWithdrawPercent] = useState(100);
  const withdrawAmount = (amount / 100) * withdrawPercent;
  const remainingAmount = amount - withdrawAmount;

  const handleChangeWithdrawPercent = (_: MouseEvent<HTMLElement>, percent: number) => {
    if (percent) {
      setWithdrawPercent(percent);
    }
  };

  const handleClose = () => {
    dispatch(removeServiceModal(ServiceModalName.Withdraw));
  };

  return (
    <DefaultModal
      onClose={handleClose}
      maxWidth="sm"
      sx={{ zIndex: index }}
      title={
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          width={1}
          pr={2}
        >
          <Typography
            variant="textXL"
            fontWeight={700}
            sx={{ '& span': { fontWeight: 400, color: 'primary.main', ml: 0.25 } }}
          >
            {t('withdraw')}
            <span>{t('withdrawOn', { token, network })}</span>
          </Typography>
          <Typography
            variant="textM"
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: '30px',
              backgroundColor: 'background.default',
              display: 'flex',
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            <SignalCellularAltRoundedIcon sx={{ fontSize: '16px' }} />
            {t(strategy as any)}
          </Typography>
        </Stack>
      }
      subtitle={t('adjustHowMuch', { strategy })}
      hideActions
    >
      <Stack direction="column">
        <Typography
          variant="textM"
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: '30px',
            backgroundColor: 'background.paper',
            display: 'flex',
            gap: 0.5,
            alignItems: 'center',
            alignSelf: 'flex-end',
            '& span': { fontWeight: 600, ml: 0.5 },
          }}
        >
          {t('available')}:<span>{amount.toFixed(2)}</span>
        </Typography>
        <Paper
          sx={{
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            mt: 1,
            background: 'background.default',
          }}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <Icon sx={{ fontSize: '48px' }} />
            <Typography variant="textXXLSB" fontWeight={700}>
              {withdrawAmount.toFixed(2)}
            </Typography>
          </Stack>
          <Typography variant="textM" ml={7} color="text.secondary">
            ${withdrawAmount.toFixed(2)}
          </Typography>
        </Paper>
        <TabsGroup<number>
          items={transactionAmountPercents}
          value={withdrawPercent}
          handleChange={handleChangeWithdrawPercent}
          sx={{ mt: 2 }}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={3}>
          <Typography
            variant="textMSB"
            fontWeight={600}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <InfoOutlineRoundedIcon sx={{ fontSize: '16px', color: 'primary.main', mr: 1 }} />
            {t('opportunityInsight')}
          </Typography>
          <Typography
            variant="textSSB"
            sx={{
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
              borderRadius: '16px',
              px: 1.5,
              py: 0.25,
              border: (theme) => `solid 1px ${theme.palette.border.default}`,
            }}
          >
            {t('ofYourPosition', { percent: withdrawPercent })}
          </Typography>
        </Stack>
        <Paper
          sx={{
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            mt: 1,
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="textSSB">{t('remaining')}</Typography>
            <Typography variant="textSSB">{t('withdrawing')}</Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={100 - withdrawPercent}
            sx={{ height: 16, borderRadius: '40px', mt: 1 }}
          />
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography
              variant="textMSB"
              color="primary.main"
            >{`${remainingAmount.toFixed(2)} ${token}`}</Typography>
            <Typography variant="textMSB">{`${withdrawAmount.toFixed(2)} ${token}`}</Typography>
          </Stack>
          <Divider sx={{ mt: 1 }} />
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography variant="textM" sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarTodayOutlinedIcon sx={{ fontSize: '16px', mr: 1 }} />
              {t('annualReturnOpportunity')}
            </Typography>
            <Typography variant="textMSB">
              ~{(amount * (1 + apy / 100) - amount).toFixed(2)}
            </Typography>
          </Stack>
        </Paper>

        <Typography
          variant="textMSB"
          fontWeight={600}
          sx={{ display: 'flex', alignItems: 'center', mt: 3 }}
        >
          {t('withdrawalBreakdown')}
        </Typography>
        <Paper
          sx={{
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            mt: 1,
          }}
        >
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography variant="textM" sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountBalanceWalletOutlinedIcon sx={{ fontSize: '16px', mr: 1 }} />
              {t('principal')}
            </Typography>
            <Typography variant="textMSB">{`${withdrawAmount.toFixed(2)} ${token}`}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography variant="textM" sx={{ display: 'flex', alignItems: 'center' }}>
              <PercentRoundedIcon sx={{ fontSize: '16px', mr: 1 }} />
              {t('returnRate')}
            </Typography>
            <Typography variant="textMSB">{`0.00 ${token}`}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography variant="textM" sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalGasStationOutlinedIcon sx={{ fontSize: '16px', mr: 1 }} />
              {t('gasFees')}
            </Typography>
            <Typography variant="textMSB" sx={{ '& span': { fontSize: '12px' } }}>
              $2.5 <span>(0.0012ETH)</span>
            </Typography>
          </Stack>
          <Divider sx={{ mt: 1 }} />
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography variant="textM" sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoneyRoundedIcon sx={{ fontSize: '16px', mr: 1 }} />
              {t('totalToReceive')}
            </Typography>
            <Typography variant="textL" fontWeight={500}>
              {`${(withdrawAmount - 2.5).toFixed(2)} ${token}`}
            </Typography>
          </Stack>
        </Paper>
        <Stack direction="row" mt={2} gap={1}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={(theme) => ({
              width: {
                xs: `calc(50% - ${theme.spacing(0.5)})`,
              },
            })}
          >
            {t('common:cancel')}
          </Button>
          <Button
            variant="contained"
            sx={(theme) => ({
              width: { xs: `calc(50% - ${theme.spacing(0.5)})` },
            })}
            loadingIndicator={<CircularProgress sx={{ color: 'text.white' }} size={24} />}
          >
            {t('common:withdraw')}
          </Button>
        </Stack>
      </Stack>
    </DefaultModal>
  );
};

export default WithdrawModal;
