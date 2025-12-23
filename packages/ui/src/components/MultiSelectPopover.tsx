import type { MouseEvent, ElementType, ReactNode } from "react";
import { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import { WithSx } from "../types";
import { convertSxToArray } from "../utils";

export interface MultiSelectPopoverOption<T = string> {
  name: string;
  value: T;
  icon?: ElementType;
}

interface MultiSelectPopoverProps<T = string> extends WithSx {
  options: MultiSelectPopoverOption<T>[];
  title: string | ReactNode;
  selected: T[];
  onChange: (selected: T[]) => void;
  multiselect?: boolean;
  fullWidth?: boolean;
}

export const MultiSelectPopover = <T = string,>({
  options,
  title,
  selected,
  onChange,
  sx,
  multiselect = true,
  fullWidth = false,
}: MultiSelectPopoverProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleSelection = (value: T) => {
    if (!multiselect) {
      onChange([value]);
      handleClose();
      return;
    }
    const isSelected = selected.includes(value);
    const newSelected = isSelected
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    onChange(newSelected);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={[
          { whiteSpace: "nowrap", height: 36 },
          fullWidth && {
            width: 1,
            display: "flex",
            justifyContent: "space-between",
          },
          ...convertSxToArray(sx),
        ]}
      >
        {title}
        <KeyboardArrowDownIcon
          fontSize="small"
          sx={[{ ml: 0.5 }, !selected.length && { mr: -1 }]}
        />
        {selected.length > 0 && multiselect && (
          <Box
            component="span"
            sx={{
              bgcolor: "primary.main",
              color: "text.white",
              borderRadius: "50%",
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              ml: 0.5,
            }}
          >
            {selected.length}
          </Box>
        )}
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: { minWidth: 180, mt: 1, p: 1 },
          },
        }}
      >
        <List dense disablePadding>
          {options.map(({ name, value, icon: Icon }) => (
            <ListItemButton
              key={name}
              onClick={() => toggleSelection(value)}
              sx={{
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              {Icon && (
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
              )}
              <ListItemText primary={name} />
              <ListItemIcon sx={{ minWidth: 32 }}>
                {selected.includes(value) && (
                  <CheckIcon
                    fontSize="small"
                    color="primary"
                    sx={{ ml: 1.5 }}
                  />
                )}
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </>
  );
};
