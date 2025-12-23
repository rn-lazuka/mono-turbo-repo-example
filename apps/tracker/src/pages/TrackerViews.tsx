import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import TrackerViewCard from '@features/tracker/components/TrackerViewCard';
import { ROUTES } from '@shared/constants/routes';
import { useGetSavedFiltersQuery, useGetYieldFiltersQuery } from '@store/api/trackerApi';
import { selectSavedViews } from '@store/selectors/trackerSlice';

const TrackerViews = () => {
  const { t } = useTranslation(['tracker', 'common']);

  const navigate = useNavigate();
  const savedViews = selectSavedViews();
  const { isLoading } = useGetYieldFiltersQuery();
  useGetSavedFiltersQuery(undefined, { refetchOnMountOrArgChange: true });

  return (
    <Box component="main" sx={{ py: 4 }} display="flex" flexDirection="column" gap={3}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Stack direction="column">
          <Typography variant="headerM">
            {t(!savedViews.length ? 'noSavedViewsYet' : 'myViews')}
          </Typography>
          <Typography variant="textL" color="text.secondary">
            {t(!savedViews.length ? 'startByCustomizing' : 'viewAndManage')}
          </Typography>
        </Stack>
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(113.87deg, #3C4653 0.34%, #1A212A 99.13%)',
            minWidth: 'max-content',
            textTransform: 'initial',
            width: { xs: '100%', sm: 'auto' },
          }}
          onClick={() => navigate(ROUTES.main)}
        >
          {t('goToTracker')}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <TrackerViewCard isLoading={isLoading} key={index} />
            ))
          : savedViews.map((savedView) => (
              <TrackerViewCard key={savedView.name} savedView={savedView} />
            ))}
      </Box>
    </Box>
  );
};

export default TrackerViews;
