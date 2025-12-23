import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import breatherImage from "../assets/images/breather.png";

const ErrorPage = () => {
  const { t } = useTranslation("common");

  return (
    <Stack
      component="main"
      sx={{ py: 5, maxWidth: 900 }}
      mx="auto"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <Box
        component="img"
        src={breatherImage}
        width={{ xs: 257, sm: 514 }}
        height={{ xs: 195, sm: 390 }}
        alt="breather image"
        pb={2}
      />
      <Typography
        variant="textXL"
        fontSize={{ xs: 32, sm: 58 }}
        lineHeight={{ xs: "32px", sm: "58px" }}
        fontWeight={700}
        color="primary.main"
        textAlign="center"
      >
        {t("yieldsPaused")}
      </Typography>
      <Typography
        fontSize={{ xs: 16, sm: 24 }}
        lineHeight={{ xs: "20px", sm: "32px" }}
        color="text.secondary"
        textAlign="center"
      >
        {t("interruptedDataStream")}
      </Typography>
    </Stack>
  );
};

export default ErrorPage;
