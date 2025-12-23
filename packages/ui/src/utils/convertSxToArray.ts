import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

export const convertSxToArray = (sx?: SxProps<Theme>) => {
  if (!sx) return [];
  return Array.isArray(sx) ? sx : [sx];
};
