import { ReactNode } from "react";

import Typography from "@mui/material/Typography";
import { WithSx } from "../types";
import { convertSxToArray } from "../utils";

interface InputLabelBoxProps extends WithSx {
  children: ReactNode;
}

export const InputLabelBox = ({ children, sx }: InputLabelBoxProps) => (
  <Typography
    gutterBottom
    variant="textM"
    color="text.secondary"
    sx={[
      ({ palette }) => ({
        border: `solid 1px ${palette.border.default}`,
        borderRight: 0,
        borderTopLeftRadius: "6px",
        borderBottomLeftRadius: "6px",
        py: 1.25,
        px: 1.5,
        display: "flex",
        m: 0,
        height: 40,
        backgroundColor: palette.background.default,
      }),
      ...convertSxToArray(sx),
    ]}
  >
    {children}
  </Typography>
);
