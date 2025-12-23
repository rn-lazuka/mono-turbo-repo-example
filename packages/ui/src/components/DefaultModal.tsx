import { PropsWithChildren, ReactNode, useState } from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  type DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { WithSx } from "../types";

interface DefaultModalProps extends WithSx, PropsWithChildren {
  title?: string | ReactNode;
  subtitle?: string;
  onClose: () => void;
  cancelButtonTitle?: string;
  maxWidth?: DialogProps["maxWidth"];
  submitButton?: {
    title: string;
    action: () => Promise<void> | void;
    disabled?: boolean;
  };
  deleteCancelButton?: boolean;
  hideActions?: boolean;
}

export const DefaultModal = ({
  deleteCancelButton,
  cancelButtonTitle,
  submitButton,
  onClose,
  title,
  subtitle,
  hideActions = false,
  children,
  maxWidth = "xs",
  sx,
}: DefaultModalProps) => {
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    await submitButton?.action();
    setIsLoading(false);
  };

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      sx={sx}
      disableEnforceFocus
      disableScrollLock={false}
      disableAutoFocus={true}
      slotProps={{
        paper: {
          sx: { p: 0, m: { xs: 0 }, width: { xs: "calc(100% - 16px)" } },
        },
      }}
    >
      <DialogTitle
        sx={[
          {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          },
          !title && { flexGrow: 1, justifyContent: "flex-end" },
        ]}
      >
        <Stack direction="column" spacing={0.5} sx={{ width: 1 }}>
          {title && typeof title === "string" && (
            <Typography variant="textXLSB" textTransform="capitalize">
              {title}
            </Typography>
          )}
          {title && typeof title !== "string" && title}
          {subtitle && (
            <Typography variant="textM" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Stack>
        <IconButton onClick={onClose} sx={{ mt: -0.5, mr: -1.25 }}>
          <CloseRoundedIcon sx={{ fontSize: "16px" }} />
        </IconButton>
      </DialogTitle>

      {children && <DialogContent sx={{ pb: 2 }}>{children}</DialogContent>}

      {!hideActions && (
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Stack
            direction="row"
            spacing={1}
            width={1}
            justifyContent="flex-end"
          >
            {!deleteCancelButton && (
              <Button
                onClick={onClose}
                variant="outlined"
                sx={(theme) => ({
                  width: {
                    xs: `calc(50% - ${theme.spacing(0.5)})`,
                    sm: "unset",
                  },
                })}
              >
                {cancelButtonTitle ?? t("cancel")}
              </Button>
            )}
            <Button
              variant="contained"
              sx={(theme) => ({
                background:
                  "linear-gradient(113.87deg, #3C4653 0.34%, #1A212A 99.13%)",
                minWidth: "max-content",
                width: { xs: `calc(50% - ${theme.spacing(0.5)})`, sm: "unset" },
                "&.Mui-disabled": {
                  color: "text.disabled",
                  background: alpha("#1A212A", 0.8),
                },
              })}
              loading={isLoading}
              loadingIndicator={
                <CircularProgress sx={{ color: "text.white" }} size={24} />
              }
              onClick={onSubmit}
              disabled={submitButton?.disabled || isLoading}
            >
              {submitButton?.title}
            </Button>
          </Stack>
        </DialogActions>
      )}
    </Dialog>
  );
};
