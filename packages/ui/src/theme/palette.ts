import { createTheme, Palette } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

const primary = {
  0: '#000000',
  10: '#001D31',
  20: '#003351',
  30: '#004B74',
  40: '#006398',
  50: '#008EC2',
  60: '#00A9B1',
  70: '#60B2F2',
  80: '#93CCFF',
  90: '#CDE5FF',
  95: '#DBE6F0',
  99: '#FCFDFF',
  100: '#FFFFFF',
};

const error = {
  0: '#000000',
  10: '#410002',
  20: '#690005',
  30: '#93000A',
  40: '#BA1A1A',
  50: '#DE3730',
  60: '#E46179',
  70: '#FF897D',
  80: '#FFB4AB',
  90: '#FFDAD6',
  95: '#FFEDEA',
  99: '#FFFBFF',
  100: '#FFFFFF',
};

const neutral = {
  0: '#0D1319',
  10: '#0F1729',
  20: '#1A1C1E',
  30: '#2F3033',
  40: '#45474A',
  50: '#5D5E61',
  60: '#76777A',
  70: '#8B8F9E',
  80: '#AAABAE',
  90: '#C6C6C9',
  95: '#E2E2E5',
  99: '#F4F5F9',
  100: '#FCFCFF',
};

const neutralVariant = {
  0: '#000000',
  10: '#171C22',
  20: '#2B3137',
  30: '#42474E',
  40: '#595D6C',
  50: '#65758B',
  60: '#8C9198',
  70: '#A6ACB3',
  80: '#C2C7CE',
  90: '#DEE3EB',
  95: '#ECF1F9',
  99: '#FCFCFF',
  100: '#FFFFFF',
};

const text = {
  black: neutral[0],
  white: neutral[100],
  primary: neutral[10],
  secondary: neutralVariant[40],
  green: '#5DB14F',
  darker: '#43474C',
  disabled: neutral[70],
};

const { palette: defaultMuiPalette } = createTheme();

const palette: Palette = deepmerge(defaultMuiPalette, {
  primary: {
    ...primary,
    main: primary[60],
    dark: primary[50],
    light: primary[90],
  },
  neutral: {
    ...neutral,
    main: neutral[40],
    dark: neutral[10],
    light: neutral[90],
  },
  neutralVariant: {
    ...neutral,
    main: neutralVariant[40],
    dark: neutralVariant[10],
    light: neutralVariant[90],
  },
  error: {
    ...error,
    main: error[60],
    dark: error[10],
    light: error[90],
  },
  background: {
    default: neutral[99],
    paper: primary[99],
  },
  surface: {
    default: '#FFFFFF',
  },
  border: {
    default: '#E1E7EF',
    main: primary[40],
  },
  icon: {
    main: neutralVariant[50],
    dark: neutralVariant[40],
  },
  text,
});

export default palette;
