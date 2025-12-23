import type { ThemeOptions } from "@mui/material/styles";

const component: ThemeOptions["components"] = {
  MuiPaper: {
    styleOverrides: {
      rounded: ({ theme }) => ({
        borderRadius: theme.spacing(1),
      }),
      root: ({ theme }) => ({
        backgroundColor: theme.palette.surface.default,
      }),
      outlined: ({ theme }) => ({
        border: `1px solid ${theme.palette.border.default}`,
      }),
    },
    defaultProps: {
      variant: "outlined",
      square: false,
    },
  },
};

export default component;
