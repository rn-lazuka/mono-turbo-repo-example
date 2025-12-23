import type { PropsWithChildren } from 'react';

import Box from '@mui/material/Box';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { WithSx } from '@yup/ui';

interface PieCenterLabelProps extends WithSx, PropsWithChildren {
  width?: number;
  height?: number;
}
const PieCenterLabel = ({
  width: labelWidth = 80,
  height: labelHeight = 80,
  sx,
  children,
}: PieCenterLabelProps) => {
  const { width, height, left, top } = useDrawingArea();

  return (
    <foreignObject
      x={left + width / 2 - labelWidth / 2}
      y={top + height / 2 - labelHeight / 2}
      width={labelWidth}
      height={labelHeight}
      style={{ pointerEvents: 'none' }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
        sx={sx}
      >
        {children}
      </Box>
    </foreignObject>
  );
};

export default PieCenterLabel;
