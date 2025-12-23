import { MouseEvent, useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { YieldPoolWithId } from '@shared/types/tracker';

interface APYTableCellProps {
  data: YieldPoolWithId;
}

const APYTableCell = ({ data }: APYTableCellProps) => {
  const { t } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const rowValue = (title: string, value: string | number) => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1 }}>
        <Typography variant="textXS" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="textXS" color="text.secondary">
          {Number(value).toFixed(1)} %
        </Typography>
      </Box>
    );
  };

  const open = Boolean(anchorEl);
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="textM" fontWeight={700} color="text.green">
        {data.apy.toFixed(1)}%
      </Typography>
      <Box
        component="span"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'help',
          justifyContent: 'center',
          width: 14,
          height: 14,
        }}
      >
        <InfoOutlinedIcon sx={{ color: 'text.secondary', fontSize: 16 }} />
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        disableRestoreFocus
        disableScrollLock
        sx={{ pointerEvents: 'none' }}
        slotProps={{
          paper: {
            sx: {
              mb: '100%',
              px: 1.5,
              py: 1,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              boxShadow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              width: 160,
            },
          },
        }}
      >
        <Typography variant="textXS" color="text.secondary" fontWeight={500}>
          {t('apy')}
        </Typography>
        {rowValue(t('base'), data.baseApy)}
        {rowValue(t('rewardApy'), data.rewardApy)}
        <Divider />
        {rowValue(t('total'), data.apy)}
      </Popover>
    </Stack>
  );
};

export default APYTableCell;
