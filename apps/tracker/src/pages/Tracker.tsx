import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import Calculator from '@features/tracker/components/Calculator';
import TrackerTable from '@features/tracker/components/table/TrackerTable';
import TopMetrics from '@features/tracker/components/TopMetrics';
import TrackerSubscription from '@features/tracker/components/TrackerSubscription';
import TrackFilters from '@features/tracker/components/TrackFilters';
import TrendingFilters from '@features/tracker/components/TrendingFilters';

const Tracker = () => {
  const { t } = useTranslation('tracker');
  return (
    <Box component="main" sx={{ pt: 4, pb: { xs: 3, md: 4 }, mx: 'auto' }}>
      <Typography variant="headerL" mb={1}>
        📊 {t('stablecoinYieldTracker')}
      </Typography>
      <Typography variant="textL" color="text.secondary" mb={4}>
        {t('discoverTheBest')}
      </Typography>
      <TrendingFilters />
      <TopMetrics />
      <TrackFilters />
      <TrackerTable />
      <Calculator />
      <TrackerSubscription />
    </Box>
  );
};

export default Tracker;
