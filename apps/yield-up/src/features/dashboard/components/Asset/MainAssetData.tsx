import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { chainsIconsMap, WithSx } from '@yup/ui';
import { useTranslation } from 'react-i18next';

import { Networks } from '@shared/enums/common.ts';

interface MainAssetDataProps extends WithSx {
  token: string;
  network: Networks;
  assetData: {
    value: number;
    earned: number;
    apy: number;
  };
}

const MainAssetData = ({ network, token, assetData, sx }: MainAssetDataProps) => {
  const { t } = useTranslation('dashboard');
  const Icon = chainsIconsMap[network.toUpperCase()];
  return (
    <Paper variant="elevation" elevation={5} sx={{ p: 3, ...sx }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" gap={2}>
          <Icon sx={{ fontSize: '58px' }} />
          <Stack direction="column" justifyContent="space-between">
            <Typography variant="textXXL" fontWeight={700}>
              {t('portfolioOn', {
                token,
                network: network.charAt(0).toUpperCase() + network.slice(1),
              })}
            </Typography>
            <Typography variant="textL" color="text.secondary">
              {t('trackYourInvestments', { token })}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" gap={3}>
          <Stack direction="column" justifyContent="space-between" alignItems="flex-end">
            <Typography variant="textS" color="text.secondary" mt={1}>
              {t('netValue')}
            </Typography>
            <Typography variant="textXL" fontWeight={600}>
              ${assetData.value.toFixed(2)}
            </Typography>
          </Stack>
          <Stack direction="column" justifyContent="space-between" alignItems="flex-end">
            <Typography variant="textS" color="text.secondary" mt={1}>
              {t('totalEarned')}
            </Typography>
            <Typography variant="textXL" fontWeight={600}>
              ${assetData.earned.toFixed(2)}
            </Typography>
          </Stack>
          <Stack direction="column" justifyContent="space-between" alignItems="flex-end">
            <Typography variant="textS" color="text.secondary" mt={1}>
              {t('timeWeightedAPY')}
            </Typography>
            <Typography variant="textXL" fontWeight={600}>
              {assetData.apy.toFixed(2)}%
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default MainAssetData;
