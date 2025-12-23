import type { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

import components from './overrides';
import palette from './palette.ts';
import settings from './settings.ts';
import typography from './typography.ts';

const themeOptions: ThemeOptions = {
  ...settings,
  palette,
  typography,
  components,
};

const theme = createTheme(themeOptions);

export { palette, typography, components, settings, theme };