import type { ElementType } from 'react';

import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { dotsTextOverflowStyles } from '@yup/ui';

interface StrategyTabProps {
  name: string;
  icon: ElementType;
  percent: string;
}
const StrategyTab = ({ percent, name, icon: Icon }: StrategyTabProps) => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems="center"
      spacing={{ xs: 0, sm: 2 }}
      overflow="hidden"
      p={{ xs: 0.5, sm: 1 }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 0, sm: 1 }}
        overflow="hidden"
        sx={{ maxWidth: '100%', flexShrink: 1 }}
      >
        <Icon sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '20px' }} />
        <Typography title={name} variant="textM" sx={{ ...dotsTextOverflowStyles }}>
          {name}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <AutoAwesomeOutlinedIcon sx={{ fontSize: '14px' }} />
        <Typography variant="textM" whiteSpace="nowrap">
          {percent}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default StrategyTab;
