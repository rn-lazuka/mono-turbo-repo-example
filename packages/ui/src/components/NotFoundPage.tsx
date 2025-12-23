import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import wrongPageImage from "../assets/images/wrong-page.png";

const NotFoundPage = () => {
  const { t } = useTranslation("common");

  return (
    <Stack
      component="main"
      sx={{ py: 5, maxWidth: 700 }}
      mx="auto"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <Box
        component="img"
        src={wrongPageImage}
        width={{ xs: 292, sm: 585 }}
        height={{ xs: 227, sm: 454 }}
        alt="404 image"
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
        {t("brokenLink")}
      </Typography>
      <Typography
        fontSize={{ xs: 16, sm: 24 }}
        lineHeight={{ xs: "20px", sm: "32px" }}
        color="text.secondary"
        textAlign="center"
      >
        {t("pageYouLookingFor")}
      </Typography>
    </Stack>
  );
};

export default NotFoundPage;
