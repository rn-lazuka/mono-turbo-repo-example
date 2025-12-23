import type { ElementType } from 'react';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { ROUTES } from '@shared/constants/routes';

export interface PortfolioDashboardRowProps {
  token: string;
  networkIcon: ElementType;
  value: string;
  apy: string;
  earning: string;
  icon: ElementType;
}
const PortfolioDashboardRow = ({
  value,
  networkIcon: NetworkIcon,
  token,
  earning,
  apy,
  icon: Icon,
}: PortfolioDashboardRowProps) => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();

  const handleOpenAssetPage = () => {
    navigate(ROUTES.asset);
  };

  return (
    <Paper
      square={false}
      variant="outlined"
      onClick={handleOpenAssetPage}
      sx={{ p: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', cursor: 'pointer' }}
    >
      <Box sx={{ mr: 3, position: 'relative' }}>
        <Icon sx={{ fontSize: '24px' }} />
        <NetworkIcon
          sx={{ fontSize: '18px', position: 'absolute', bottom: '-9px', left: '100%' }}
        />
      </Box>
      <Stack direction="column" sx={{ flex: 1, justifyContent: 'center' }}>
        <Typography variant="textXLSB" fontWeight={600}>
          {token}
        </Typography>
        <Typography variant="textS" color="text.secondary">
          {value}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        mt={{ xs: 1, sm: 0 }}
        sx={{ width: { xs: 1, sm: 'unset' }, order: { xs: 3, sm: 0 } }}
        mr={2.5}
      >
        <Stack
          direction="column"
          spacing={0.5}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          flex={{ xs: 'unset', sm: 1 }}
          justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
        >
          <Typography variant="textS" color="text.secondary" lineHeight="24px">
            {t('earning')}:
          </Typography>
          <Typography variant="textS" color="#F6AD46" lineHeight="20px">
            {apy}%
          </Typography>
        </Stack>
        <Stack direction="column" spacing={0.5} alignItems="center" flex={{ xs: 'unset', sm: 1 }}>
          <Typography variant="textL" fontWeight={600}>
            ${(Number(value) + Number(earning)).toFixed(2)}
          </Typography>
          <Typography variant="textM" color="text.green">
            <ArrowUpwardRoundedIcon sx={{ fontSize: '12px' }} />+{earning}
          </Typography>
        </Stack>
      </Stack>
      <ArrowForwardRoundedIcon
        sx={{
          fontSize: '16px',
          alignSelf: { xs: 'flex-end', sm: 'unset' },
          marginBottom: { xs: -1.5, sm: 0 },
        }}
      />
    </Paper>
  );
};

export default PortfolioDashboardRow;
