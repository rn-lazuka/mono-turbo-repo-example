import type { ThemeOptions } from '@mui/material/styles';

import muiButton from './MuiButton.ts';
import muiIconButton from './MuiIconButton.ts';
import muiPaper from './MuiPaper.ts';
import muiTypography from './MuiTypography.ts';

const overrides: ThemeOptions['components'] = {
  ...muiPaper,
  ...muiTypography,
  ...muiButton,
  ...muiIconButton,
};

export default overrides;
