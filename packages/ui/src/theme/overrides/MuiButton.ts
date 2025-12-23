import { alpha, type ThemeOptions } from '@mui/material/styles';

const component: ThemeOptions['components'] = {
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.textMSB,
        borderRadius: theme.spacing(0.75),
        padding: theme.spacing(1, 2),
        boxShadow: 'unset',
        color: theme.palette.text.primary,
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
      }),
      outlined: ({ theme }) => ({
        borderColor: theme.palette.border.default,
        backgroundColor: theme.palette.background.default,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
        },
      }),
      contained: ({ theme }) => ({
        color: theme.palette.text.white,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.7),
        },
      }),
      text: ({ theme }) => ({
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
        },
      }),
      sizeMedium: {
        height: 40,
      },
      sizeSmall: {
        height: 36,
      },
    },
  },
};

export default component;
