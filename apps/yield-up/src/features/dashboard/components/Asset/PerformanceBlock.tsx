import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import { WithSx } from '@yup/ui';
import { useTranslation } from 'react-i18next';

import { performanceChartData } from '@shared/constants/dashboard';

interface PerformanceBlockProps extends WithSx {}

const PerformanceBlock = ({ sx }: PerformanceBlockProps) => {
  const { t } = useTranslation('dashboard');

  const performanceData = [
    { icon: TrendingUpRoundedIcon, title: t('returnRate'), value: '2.20%' },
    { icon: MonetizationOnOutlinedIcon, title: t('dailyEarnings'), value: '$6.39' },
    {
      icon: CalendarTodayOutlinedIcon,
      title: t('investmentPeriod'),
      value: t('lessThanDay', { days: 1 }),
    },
  ];

  return (
    <Paper sx={{ p: 3, ...sx }}>
      <Stack direction="column" gap={2}>
        <Typography variant="textL" fontWeight={600}>
          {t('strategyAllocation')}
        </Typography>
        <LineChart
          xAxis={[
            {
              data: performanceChartData.map((d) => d.data),
              scaleType: 'point',
              tickMinStep: 1,
            },
          ]}
          yAxis={[
            {
              id: 'leftAxisId',
              width: 50,
              valueFormatter: (v: string | number) => `$${v}`,
            },
            { id: 'rightAxisId', position: 'right' },
          ]}
          series={[
            {
              data: performanceChartData.map((d) => d.value),
              curve: 'monotoneX',
              color: '#00C26F',
              showMark: false,
            },
          ]}
          height={300}
          grid={{ horizontal: true }}
          sx={{
            mt: 2,
            '& .MuiChartsGrid-horizontalLine': {
              strokeDasharray: '4 4',
              stroke: '#ccc',
            },
          }}
        />
        <Stack direction="row" justifyContent="space-between">
          {performanceData.map(({ icon: Icon, title, value }) => (
            <Paper
              key={title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: 2,
                px: 1.5,
                width: 'calc((100% - 32px) / 3)',
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1.25,
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  borderRadius: '50%',
                  mr: 1,
                }}
              >
                <Icon sx={{ fontSize: '20px' }} />
              </Box>
              <Stack direction="column">
                <Typography variant="textM" color="text.secondary">
                  {title}
                </Typography>
                <Typography variant="textMSB">{value}</Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PerformanceBlock;
