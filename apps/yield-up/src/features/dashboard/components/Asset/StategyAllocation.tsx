import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { stablecoinIconsMap, WithSx } from '@yup/ui';
import { useTranslation } from 'react-i18next';

import { Strategies } from '@shared/enums/common';
import PieCenterLabel from '@shared/ui/PieCenterIcon';

interface StrategyAllocationProps extends WithSx {
  token: string;
  allocation: { id: number; label: Strategies; value: number }[];
}

const pieChartSize = {
  width: 300,
  height: 300,
};

const StrategyAllocation = ({ allocation, token, sx }: StrategyAllocationProps) => {
  const { t } = useTranslation('dashboard');
  const Icon = stablecoinIconsMap[token.toUpperCase()];
  return (
    <Paper sx={{ p: 3, ...sx }}>
      <Stack direction="column" gap={2}>
        <Typography variant="textL" fontWeight={600}>
          {t('strategyAllocation')}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <PieChart
            series={[
              {
                data: allocation.map((item) => ({
                  ...item,
                  label: `${item.label}: ${item.value}%`,
                })),
                innerRadius: 100,
              },
            ]}
            {...pieChartSize}
            slotProps={{
              legend: {
                direction: 'horizontal',
                position: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
              },
            }}
          >
            <PieCenterLabel width={100} height={100}>
              <Icon sx={{ fontSize: '100px' }} />
            </PieCenterLabel>
          </PieChart>
          <Typography variant="textS" color="text.secondary" mt={1}>
            {t('allocatedAcrossStrategy', { token, strategiesAmount: 3 })}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default StrategyAllocation;
