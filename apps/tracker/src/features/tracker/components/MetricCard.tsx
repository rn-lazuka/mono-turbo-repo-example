import { type ReactNode } from 'react';

import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface MetricCardProps {
  title: string;
  tooltipText?: string;
  value: string;
  additionalValue?: number;
  description?: string;
  icon?: ReactNode;
}
const MetricCard = ({
  title,
  description,
  value,
  tooltipText,
  additionalValue,
  icon,
}: MetricCardProps) => {
  const isPositive = additionalValue && additionalValue > 0;
  return (
    <Paper
      elevation={0}
      sx={{
        px: 2.5,
        py: 2,
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'space-between',
        transition: 'all 0.2s ease',
        userSelect: 'none',
        outline: 'none',
        width: 1,
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 4px 6px 1px rgba(0, 0, 0, 0.16)',
        },
      }}
    >
      <Stack spacing={0.5}>
        <Stack spacing={0.5} direction="row" alignItems="center">
          <Typography variant="textM" color="text.secondary">
            {title}
          </Typography>
          {tooltipText && (
            <Tooltip title={tooltipText} arrow placement="top">
              <Box
                component="span"
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
            </Tooltip>
          )}
        </Stack>
        <Stack spacing={0.5} direction="row" alignItems="center">
          <Typography variant="textXLSB">{value}</Typography>
          {additionalValue && (
            <Stack direction="row" alignItems="center">
              <ArrowUpwardOutlinedIcon
                sx={[
                  { fontSize: 12, color: isPositive ? 'text.green' : 'error.main' },
                  !isPositive && {
                    transform: 'rotate(180deg)',
                  },
                ]}
              />
              <Typography variant="textXL" color={isPositive ? 'text.green' : 'error.main'}>
                {additionalValue}%
              </Typography>
            </Stack>
          )}
        </Stack>
        {description && (
          <Typography variant="textS" color="text.secondary">
            {description}
          </Typography>
        )}
      </Stack>

      {icon && (
        <Box
          borderRadius="50%"
          sx={({ spacing, palette }) => ({
            minWidth: spacing(4.5),
            height: spacing(4.5),
            backgroundColor: alpha(palette.primary.main, 0.1),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ml: 2,
          })}
        >
          {icon}
        </Box>
      )}
    </Paper>
  );
};

export default MetricCard;
