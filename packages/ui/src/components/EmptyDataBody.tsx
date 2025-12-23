import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { WithSx } from "../types";
import { convertSxToArray } from "../utils";

type EmptyDataBodyProps = WithSx<{
  bgcolor?: string;
  emptyDataBodyText?: string;
  loading?: boolean;
  iconSize?: "small" | "medium";
}>;

export const EmptyDataBody = ({
  bgcolor,
  emptyDataBodyText,
  loading,
  iconSize = "medium",
  sx,
}: EmptyDataBodyProps) => {
  const { t } = useTranslation("common");
  return (
    <Box
      sx={[
        (theme) => ({
          display: "flex",
          flex: 1,
          height: 1,
          width: 1,
          bgcolor: bgcolor || theme.palette.surface.default,
        }),
        ...convertSxToArray(sx),
      ]}
    >
      {loading && (
        <LinearProgress sx={{ width: "100%", position: "absolute", left: 0 }} />
      )}
      <Box
        className="emptyDataBody"
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="column"
          spacing={3}
          display="flex"
          alignItems="center"
        >
          <Box
            sx={(theme) => ({
              display: "flex",
              borderRadius: "50%",
              bgcolor: "rgba(26, 28, 30, 0.08)",
              margin: "auto",
              p: 5,
              justifyContent: "center",
              alignItems: "center",
              "& svg": {
                fontSize: theme.spacing(iconSize === "medium" ? 6 : 4),
              },
              maxWidth: iconSize === "medium" ? "128px" : "64px",
              maxHeight: iconSize === "medium" ? "128px" : "64px",
            })}
          >
            <ContentPasteSearchOutlinedIcon />
          </Box>
          <Typography
            variant="labelL"
            sx={{ textAlign: "center" }}
            color="text.secondary"
          >
            {emptyDataBodyText || t("noResultsFound")}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
