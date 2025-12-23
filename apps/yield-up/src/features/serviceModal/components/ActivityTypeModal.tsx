import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DefaultModal, stablecoinIconsMap } from '@yup/ui';
import { useTranslation } from 'react-i18next';
import { selectServiceModal } from 'tracker/src/store/selectors/serviceModalSlice.ts';

import { ServiceModalName } from '@shared/enums/modals';
import { ServiceModalProps } from '@shared/types/serviceModal';
import { removeServiceModal } from '@store/slices/serviceModalSlice';
import { useAppDispatch } from '@store/store';

export interface ActivityTypeModalPayload {
  token: string;
  date: string;
  amount: string;
  dollarValue: string;
  chain: string;
  strategy: string;
  gasFees: string;
}

const ActivityTypeModal = ({ index }: ServiceModalProps) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const { token, ...payload }: ActivityTypeModalPayload = selectServiceModal(
    ServiceModalName.ActivityType
  );
  const Icon = stablecoinIconsMap[token];

  const handleClose = () => {
    dispatch(removeServiceModal(ServiceModalName.ActivityType));
  };

  const details = [
    { name: 'date', title: t('date') },
    { name: 'amount', title: t('amount') },
    { name: 'dollarValue', title: t('dollarValue') },
    { name: 'chain', title: t('chain') },
    { name: 'strategy', title: t('strategy') },
    { name: 'gasFees', title: t('gasFees') },
  ];

  return (
    <DefaultModal
      onClose={handleClose}
      maxWidth="sm"
      sx={{ zIndex: index }}
      title={
        <Stack direction="row" gap={1} alignItems="center">
          <Icon sx={{ fontSize: '24px' }} />
          <Typography variant="textL" fontWeight={600}>
            {t('deposit')}
          </Typography>
        </Stack>
      }
      hideActions
    >
      <Stack direction="column" gap={1} mb={3}>
        {details.map((item) => (
          <Stack
            key={item.title}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="textM" color="text.secondary">
              {item.title}
            </Typography>
            <Typography variant="textMSB">
              {item.name === 'dollarValue' && '$'}
              {payload[item.name as keyof typeof payload]}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Button size="small" variant="contained">
          {t('seeInBlockchain')}
        </Button>
      </Stack>
    </DefaultModal>
  );
};

export default ActivityTypeModal;
