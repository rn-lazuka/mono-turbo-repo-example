import { alpha, ThemeOptions } from "@mui/material/styles";

const component: ThemeOptions["components"] = {
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
      }),
    },
  },
};

export default component;
