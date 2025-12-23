import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';

import ActiveStrategies from '@features/dashboard/components/Asset/ActiveStrategies';
import MainAssetData from '@features/dashboard/components/Asset/MainAssetData';
import PerformanceBlock from '@features/dashboard/components/Asset/PerformanceBlock';
import StrategyAllocation from '@features/dashboard/components/Asset/StategyAllocation';
import { allocationChartData, mainAssetData } from '@shared/constants/dashboard';
import { Networks } from '@shared/enums/common';

const Asset = () => {
  const { t } = useTranslation('common');
  return (
    <Box component="main" sx={{ py: { xs: 2, sm: 3 } }} display="flex" flexDirection="column">
      <Link
        component={RouterLink}
        to={'..'}
        underline="none"
        color="text.black"
        sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <ArrowBackRoundedIcon sx={{ fontSize: '16px' }} />
        {t('backToDashboard')}
      </Link>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link component={RouterLink} underline="hover" color="inherit" to={'..'}>
          {t('dashboard')}
        </Link>
        <Typography color="text.black">{`USDC ${t('portfolio')}`}</Typography>
      </Breadcrumbs>
      <MainAssetData network={Networks.Ethereum} token={'USDC'} assetData={mainAssetData} />
      <StrategyAllocation token={'USDC'} allocation={allocationChartData} sx={{ mt: 3 }} />
      <PerformanceBlock sx={{ mt: 3 }} />
      <ActiveStrategies sx={{ mt: 3 }} token={'USDC'} network={Networks.Ethereum} />
    </Box>
  );
};

export default Asset;
