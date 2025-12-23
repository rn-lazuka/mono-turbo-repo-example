import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import PortfolioDashboardRow from '@features/dashboard/components/PortfolioDashboardRow.tsx';
import { portfolioRows } from '@shared/constants/dashboard.ts';

const PortfolioDashboard = () => {
  const { t } = useTranslation(['dashboard', 'common']);

  return (
    <Paper
      elevation={6}
      square={false}
      sx={{
        p: { xs: 2, sm: 3 },
        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Stack direction="column" spacing={0.5}>
        <Typography
          variant="textSSB"
          color="text.secondary"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <BusinessCenterOutlinedIcon sx={{ fontSize: '14px', mr: 1 }} />
          {t('yourPortfolio')}
        </Typography>

        <Stack direction="row" alignItems="flex-end" my={0.5} spacing={0.25}>
          <Typography variant="headerL" lineHeight="30px" fontWeight={700}>
            $1,300
          </Typography>
          <Typography variant="textS" color="text.secondary">
            {t('deployed')}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="column" spacing={1.5} mt={3}>
        {portfolioRows.map((row) => (
          <PortfolioDashboardRow
            key={row.token}
            icon={row.icon}
            earning={row.earning}
            apy={row.apy}
            networkIcon={row.networkIcon}
            value={row.value}
            token={row.token}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default PortfolioDashboard;
