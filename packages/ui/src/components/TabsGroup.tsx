import type { MouseEvent, ReactNode } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { WithSx } from "../types";
import { convertSxToArray } from "../utils";
import { dotsTextOverflowStyles } from "../theme/styles.ts";

export interface TabsGroupProps<T> extends WithSx {
  handleChange: (_: MouseEvent<HTMLElement>, newValue: T) => void;
  items: { name: string | number | ReactNode; value: T }[];
  value: T;
}

export const TabsGroup = <T,>({
  handleChange,
  items,
  value,
  sx,
}: TabsGroupProps<T>) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleChange}
      sx={[
        ({ palette }) => ({
          gap: "8px",
          width: "100%",
          justifyContent: "center",
          backgroundColor: palette.primary[95],
          borderRadius: "10px",
          py: 0.5,
          px: 0.25,
        }),
        ...convertSxToArray(sx),
      ]}
    >
      {items.map((item) => {
        const isReactNode =
          typeof item.name !== "string" && typeof item.name !== "number";
        return (
          <ToggleButton
            key={item.value as string | number}
            value={item.value as string | number}
            sx={(theme) => ({
              textTransform: "capitalize",
              lineHeight: "18px",
              px: isReactNode ? 0 : 2,
              py: isReactNode ? 0 : 0.625,
              borderRadius: "8px !important",
              border: "none",
              width: `calc((100% - ${Math.floor(8 * (items.length - 1))}px) / ${items.length})`,
              maxHeight: "max-content",
              "&.Mui-selected": {
                color: "text.black",
                border: `solid 1px ${theme.palette.primary.main} !important`,
              },
              color: "text.secondary",
              ...dotsTextOverflowStyles,
            })}
          >
            {item.name}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};
