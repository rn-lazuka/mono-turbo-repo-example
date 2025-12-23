import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTranslation } from 'react-i18next';

import { Strategies } from '@shared/enums/common';

const pieChartSize = {
  width: 160,
  height: 160,
};

interface AllocationCollapseRowProps {
  allocation: { label: Strategies; value: number }[];
}

const AllocationCollapseRow = ({ allocation }: AllocationCollapseRowProps) => {
  const { t } = useTranslation('dashboard');

  return (
    <Stack
      direction="column"
      p={2}
      sx={{ borderBottom: (theme) => `solid 1px ${theme.palette.border.default}` }}
    >
      <Typography variant="textMSB" color="text.black">
        {t('protocolAllocation')}
      </Typography>
      <PieChart
        series={[
          {
            data: allocation.map((item, index) => ({
              ...item,
              id: index,
              label: `${item.label}: ${item.value}%`,
            })),
            innerRadius: 50,
          },
        ]}
        {...pieChartSize}
        slotProps={{
          legend: {
            direction: 'vertical',
            position: {
              vertical: 'middle',
              horizontal: 'end',
            },
          },
        }}
      />
    </Stack>
  );
};

export default AllocationCollapseRow;
