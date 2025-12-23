import { ElementType, MouseEvent } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { WithSx } from "../types";

interface ButtonTabsGroupProps<T> extends WithSx {
  handleChange: (_: MouseEvent<HTMLElement>, newValue: T) => void;
  items: { name: T; icon?: ElementType }[];
  value: T;
}

export const ButtonTabsGroup = <T,>({
  handleChange,
  items,
  value,
  sx,
}: ButtonTabsGroupProps<T>) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={value as string | number}
      exclusive
      onChange={handleChange}
      sx={{ gap: 2, width: "100%", justifyContent: "center", ...sx }}
    >
      {items.map(({ name, icon: Icon }) => (
        <ToggleButton
          key={String(name)}
          value={name as string | number}
          sx={(theme) => ({
            textTransform: "capitalize",
            lineHeight: "18px",
            px: 2,
            py: 1.25,
            borderRadius: "8px !important",
            border: `solid 1px ${theme.palette.border.default} !important`,
            "&.Mui-selected": {
              color: "text.black",
              border: `solid 1px ${theme.palette.primary.main} !important`,
            },
            color: "text.black",
          })}
        >
          {Icon && <Icon sx={{ fontSize: "18px", mr: 0.5 }} />}
          {String(name)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
