import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DefaultModal } from '@yup/ui';
import { useTranslation } from 'react-i18next';
import { selectServiceModal } from 'tracker/src/store/selectors/serviceModalSlice.ts';

import loader from '@assets/images/animated-loader.gif';
import { Strategies } from '@shared/enums/common.ts';
import { ServiceModalName } from '@shared/enums/modals';
import { ServiceModalProps } from '@shared/types/serviceModal';
import { removeServiceModal } from '@store/slices/serviceModalSlice';
import { useAppDispatch } from '@store/store';

export interface ConfirmDepositModalPayload {
  amount: number;
}

const ConfirmDepositModal = ({ index }: ServiceModalProps) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const isError = false;
  const isCompleting = false;

  const { amount }: ConfirmDepositModalPayload = selectServiceModal(
    ServiceModalName.ConfirmDeposit
  );

  const depositDetails = [
    { title: t('amount'), value: amount.toFixed(2) },
    { title: t('dollarValue'), value: `$${amount.toFixed(2)}` },
    {
      title: t('strategy'),
      value: (
        <>
          <TrendingUpRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          {t(Strategies.Balanced as any)}
        </>
      ),
    },
    { title: t('expectedAPY'), value: '8-12%' },
    { title: t('yieldUpFees'), value: t('zero') },
    {
      title: t('gasFee'),
      value: (
        <>
          $2.5 <span>(0.0001 ETH)</span>
        </>
      ),
    },
  ];

  const handleClose = () => {
    dispatch(removeServiceModal(ServiceModalName.ConfirmDeposit));
  };

  const handleSubmit = async () => {
    handleClose();
  };

  return (
    <DefaultModal
      onClose={handleClose}
      submitButton={{
        action: handleSubmit,
        title: t('confirmDeposit'),
      }}
      maxWidth="sm"
      sx={{ zIndex: index }}
      title={t(isError ? 'depositFailed' : 'confirmDeposit')}
      subtitle={t(isError ? 'depositFailedTryAgain' : 'reviewDepositDetails')}
      hideActions={isError}
    >
      {(isError || isCompleting) && (
        <Stack direction="column">
          <Box width={1} display="flex" justifyContent="center">
            {isError && <CloseRoundedIcon sx={{ fontSize: '110px', color: 'error.main' }} />}
            {isCompleting && (
              <Box component="img" src={loader} alt="loader" sx={{ width: 110, height: 110 }} />
            )}
          </Box>
          <Typography variant="textMSB" my={2}>
            {t('transactionSteps')}
          </Typography>
          <Paper square={false} variant="outlined" sx={{ p: 2, display: 'flex' }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                backgroundColor: 'error.main',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              1
            </Box>
            <Stack direction="column">
              <Typography variant="textMSB">{t('confirmTransactionInWallet')}</Typography>
              <Typography variant="textMSB" color="text.secondary">
                {t('allowVaultUse', { tokenName: 'USDC' })}
              </Typography>
            </Stack>
          </Paper>
          <Paper square={false} variant="outlined" sx={{ p: 2, display: 'flex' }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                backgroundColor: 'error.main',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              2
            </Box>
            <Stack direction="column">
              <Typography variant="textMSB">{t('depositToVault')}</Typography>
              <Typography variant="textMSB" color="text.secondary">
                {t('transferToStrategyVault', { tokenName: 'USDC' })}
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      )}
      {!isError && (
        <Stack direction="column" gap={2} mt={2}>
          <Typography variant="textMSB" color="text.secondary">
            {t('depositDetails')}
          </Typography>
          {depositDetails.map((item) => (
            <Stack key={item.title} direction="row" justifyContent="space-between">
              <Typography variant="textM">{item.title}:</Typography>
              <Typography
                variant="textM"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& span': {
                    fontSize: '10px',
                    mt: 0.25,
                    ml: 0.5,
                    verticalAlign: 'bottom',
                    alignSelf: 'flex-end',
                  },
                }}
              >
                {item.value}
              </Typography>
            </Stack>
          ))}
          <Typography variant="textMSB" color="text.secondary">
            {t('depositDetails')}
          </Typography>
          <Paper
            square={false}
            variant="outlined"
            sx={{ px: 2, py: 2.5, display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="textM">{t('annualProjectedEarnings')}</Typography>
            <Typography variant="textL" fontWeight={600} color="primary.main">
              $200.00
            </Typography>
          </Paper>
        </Stack>
      )}
    </DefaultModal>
  );
};

export default ConfirmDepositModal;
