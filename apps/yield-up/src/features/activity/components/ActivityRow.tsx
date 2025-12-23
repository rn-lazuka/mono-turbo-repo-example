import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { stablecoinIconsMap } from '@yup/ui';
import { useTranslation } from 'react-i18next';

import { ActivityTypeModalPayload } from '@features/serviceModal/components/ActivityTypeModal';
import { Strategies } from '@shared/enums/common';
import { ServiceModalName } from '@shared/enums/modals';
import { addServiceModal } from '@store/slices/serviceModalSlice';
import { useAppDispatch } from '@store/store';

export interface ActivityRowProps {
  token: string;
  network: string;
  type: 'deposit' | 'withdraw';
  value: number;
  strategy: Strategies;
  date: string;
  gasFees: string;
}

const ActivityRow = ({
  value,
  token,
  strategy,
  type,
  network,
  gasFees,
  date,
}: ActivityRowProps) => {
  const { t } = useTranslation(['common', 'activity']);
  const dispatch = useAppDispatch();
  const Icon = stablecoinIconsMap[token];

  const handleOpenActivityModal = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ActivityType,
        payload: {
          token,
          date,
          gasFees,
          strategy,
          amount: value.toFixed(2),
          dollarValue: value.toFixed(2),
          chain: network,
        } as ActivityTypeModalPayload,
      })
    );
  };

  return (
    <Paper
      square={false}
      variant="outlined"
      onClick={handleOpenActivityModal}
      sx={{ p: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', cursor: 'pointer' }}
    >
      <Box
        sx={{
          mr: 3,
          position: 'relative',
          p: 1,
          borderRadius: '50%',
          backgroundColor: '#FEE2E2',
          width: 40,
          height: 40,
        }}
      >
        <Icon sx={{ fontSize: '24px' }} />
      </Box>
      <Stack direction="column" sx={{ flex: 1, justifyContent: 'center' }}>
        <Typography
          variant="textL"
          sx={{ '& span': { color: 'text.secondary', ml: 1, fontSize: '14px' } }}
        >
          {t(`activity:${type}`)}
          <span>{`${token} ${value.toFixed(2)}`}</span>
        </Typography>
        <Typography variant="textM" color="text.secondary">
          {network}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack direction="column" spacing={0.5} alignItems="flex-end">
          <Typography variant="textMSB">${value.toFixed(2)}</Typography>
          <Typography
            variant="textS"
            sx={{
              border: 'solid 1px',
              borderColor: 'border.default',
              borderRadius: '10px',
              px: 1.25,
              py: 0.25,
            }}
          >
            {t(strategy)}
          </Typography>
        </Stack>
        <ArrowForwardIosRoundedIcon sx={{ fontSize: '16px' }} />
      </Stack>
    </Paper>
  );
};

export default ActivityRow;
