import { useMemo } from 'react';

import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { Strategies } from '@shared/enums/common';

interface StrategyTableCellProps {
  strategy: Strategies;
  apy: number;
}
const StrategyTableCell = ({ strategy, apy }: StrategyTableCellProps) => {
  const { t } = useTranslation('common');
  const icon = useMemo(() => {
    switch (strategy) {
      case Strategies.Aggressive:
        return <PercentRoundedIcon sx={{ fontSize: '20px' }} />;
      case Strategies.Conservative:
        return <GppGoodOutlinedIcon sx={{ fontSize: '20px' }} />;
      case Strategies.Balanced:
        return <TrendingUpRoundedIcon sx={{ fontSize: '20px' }} />;
    }
  }, [strategy]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1,
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
          borderRadius: '50%',
          mr: 1,
        }}
      >
        {icon}
      </Box>
      <Stack direction="column">
        <Typography variant="textMSB" color="text.black" sx={{ whiteSpace: 'nowrap' }}>
          {`${t(strategy)} ${t('strategy')}`}
        </Typography>
        <Typography variant="textM" color="text.secondary">
          {`${t('apy')}: ${apy}%`}
        </Typography>
      </Stack>
    </Box>
  );
};

export default StrategyTableCell;
