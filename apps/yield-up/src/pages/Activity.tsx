import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import ActivityRow from '@features/activity/components/ActivityRow';
import { activityData } from '@shared/constants/dashboard';

const Activity = () => {
  const { t } = useTranslation('activity');
  return (
    <Box component="main" sx={{ py: { xs: 2, sm: 3 } }} display="flex" flexDirection="column">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="headerL">{t('activity')}</Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <Button size="small" startIcon={<CalendarTodayOutlinedIcon />} variant="outlined">
            {t('filterByDate')}
          </Button>
          <Button size="small" startIcon={<FilterAltOutlinedIcon />} variant="outlined">
            {t('filter')}
          </Button>
        </Stack>
      </Stack>
      <Stack direction="column" gap={1.5} mt={3}>
        {activityData.map((item, i) => (
          <ActivityRow
            token={item.token}
            key={i}
            value={item.value}
            strategy={item.strategy}
            network={item.network}
            type={item.type}
            date={item.date}
            gasFees={item.gasFees}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Activity;
