import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { formatNumberAbbreviation } from '@yup/ui';

import MetricCard from '@features/tracker/components/MetricCard';
import { YieldMetricNames } from '@shared/enums/tracker';
import { useGetYieldTopMetricsQuery } from '@store/api/trackerApi';

const TopMetrics = () => {
  const { data, isLoading, isFetching } = useGetYieldTopMetricsQuery();

  const showSkeleton = isLoading || isFetching || !data;

  const skeletons = Array.from({ length: 3 }).map((_, i) => (
    <Box
      key={i}
      sx={{
        flex: 1,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'border.default',
        px: 2.5,
        py: 2,
      }}
    >
      <Skeleton variant="text" width={100} height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="60%" height={32} />
      <Skeleton variant="text" width="40%" height={20} />
    </Box>
  ));

  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} mt={{ xs: 2, md: 3 }}>
      {showSkeleton
        ? skeletons
        : data?.map((metric) => {
            let metricData;

            switch (metric.metricName) {
              case YieldMetricNames.HighestApy:
                metricData = {
                  icon: <TrendingUpIcon sx={{ color: 'primary.main', fontSize: 20 }} />,
                };
                break;
              case YieldMetricNames.TvlLeadingProtocol: {
                const [mainValue, additionalValue] = metric.primaryValue.split(' ');
                metricData = {
                  icon: <WhatshotOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />,
                  value: `${mainValue} ${formatNumberAbbreviation(additionalValue)}`,
                };
                break;
              }
              case YieldMetricNames.StablecoinDominance:
                metricData = {
                  icon: <ShowChartOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />,
                  additionalValue: metric?.additionalValue
                    ? (() => {
                        const rounded = Math.floor(Number(metric.additionalValue) * 10) / 10;
                        return rounded === 0 ? undefined : rounded;
                      })()
                    : undefined,
                };
                break;
              default:
                metricData = null;
            }

            return (
              <MetricCard
                key={metric.metricName}
                title={metric.mainTitle}
                value={metricData?.value ?? metric.primaryValue}
                additionalValue={metricData?.additionalValue}
                tooltipText={metric?.tooltip}
                icon={metricData?.icon}
                description={metric.bottomTitle}
              />
            );
          })}
    </Stack>
  );
};

export default TopMetrics;
