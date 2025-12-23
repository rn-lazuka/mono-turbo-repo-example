import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import BalanceDashboardRow from '@features/dashboard/components/BalanceDashboardRow.tsx';
import DashboardTip from '@features/dashboard/components/DashboardTip.tsx';
import { tokenBalanceRows } from '@shared/constants/dashboard.ts';

interface BalanceDashboardProps {
  network: string;
}

const BalanceDashboard = ({ network }: BalanceDashboardProps) => {
  const { t } = useTranslation(['dashboard', 'common']);
  const isConnectedWallet = true;
  return (
    <Paper
      elevation={6}
      square={false}
      sx={{
        p: { xs: 2, sm: 3 },
        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      {!isConnectedWallet && (
        <Typography variant="headerL" fontWeight={700} sx={{ '& span': { color: 'primary.main' } }}>
          {t('earnUpTo')}
          <span>10.5%</span>
          {t('onYourStablecoins')}
        </Typography>
      )}
      {isConnectedWallet && (
        <Stack direction="column" spacing={0.5}>
          <Typography
            variant="textSSB"
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <AccountBalanceWalletOutlinedIcon sx={{ fontSize: '14px', mr: 1 }} />
            {t('availableBalance')}
          </Typography>
          <Typography variant="headerL" fontWeight={700}>
            $5,000
          </Typography>
        </Stack>
      )}
      <DashboardTip />
      <Stack direction="column" spacing={1.5} mt={3}>
        {tokenBalanceRows.map((row) => (
          <BalanceDashboardRow
            key={row.token}
            icon={row.icon}
            network={network}
            token={row.token}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default BalanceDashboard;
