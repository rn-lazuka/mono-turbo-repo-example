import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { USDCIcon } from '@yup/ui';
import { useTranslation } from 'react-i18next';

const DashboardTip = () => {
  const { t } = useTranslation('dashboard');
  const isNoStablecoins = false;

  return (
    <Paper square={false} variant="outlined" sx={{ p: 1, backgroundColor: '#F5FCFF', mt: 1 }}>
      {isNoStablecoins && (
        <Typography variant="textXLSB" color="error.main">
          {t('walletHasNoStablecoins')}
        </Typography>
      )}
      {!isNoStablecoins && (
        <Typography
          variant="textMSB"
          color="primary.main"
          component="div"
          sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', lineHeight: 1.5 }}
        >
          <Box component="span" sx={{ display: 'inline', whiteSpace: 'nowrap' }}>
            {t('earnUpTo')}
          </Box>

          <Box
            component="span"
            color="text.darker"
            px={0.5}
            fontWeight={700}
            sx={{ whiteSpace: 'nowrap' }}
          >
            16%
          </Box>

          <Box component="span" sx={{ display: 'inline', whiteSpace: 'nowrap' }}>
            {t('onYour')}
          </Box>

          <Box
            sx={{
              mx: 0.5,
              display: 'inline-flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <USDCIcon sx={{ fontSize: '20px' }} />
            <Box component="span" sx={{ ml: 0.5 }}>
              USDC
            </Box>
          </Box>

          <Box
            sx={{
              mr: 0.5,
            }}
          >
            <Box component="span" color="text.darker" pr={0.5} fontWeight={700}>
              • $400
            </Box>
            <Box component="span" sx={{ display: 'inline', whiteSpace: 'nowrap' }}>
              {t('yearWithAggressive')}
            </Box>
          </Box>
        </Typography>
      )}
    </Paper>
  );
};

export default DashboardTip;
