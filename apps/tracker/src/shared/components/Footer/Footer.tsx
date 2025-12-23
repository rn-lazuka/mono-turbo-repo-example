import XIcon from '@mui/icons-material/X';
import { Box, Container, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { SocialRoundLink, type SocialRoundLinkProps } from '@yup/ui';
import { TelegramIcon } from '@yup/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import logoImage from '@assets/images/logo.png';
import NavBar from '@shared/components/NavBar/NavBar';
import { LINKS } from '@shared/constants/common';
import { ROUTES } from '@shared/constants/routes';

const Footer = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const socialLinks: SocialRoundLinkProps[] = [
    { url: LINKS.twitter, icon: XIcon },
    { url: LINKS.telegram, icon: TelegramIcon },
  ];

  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        bgcolor: 'background.default',
        py: { xs: 3, sm: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
          <Stack direction="column">
            <Box
              component="img"
              src={logoImage}
              alt="YieldUp"
              onClick={() => navigate(ROUTES.main)}
              sx={{
                width: 90,
                height: 24,
              }}
            />
            <Typography variant="textM" color="text.secondary" width={220} mt={3}>
              {t('simplifyDeFi')}
            </Typography>
            <Typography variant="textM" color="text.secondary" mt={2}>
              {t('copyright')}
            </Typography>
          </Stack>
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
            spacing={{ xs: 2, sm: 0 }}
            mt={{ xs: 2, sm: 0 }}
          >
            <Stack direction="row" spacing={3}>
              <NavBar fontWeight={400} />
            </Stack>
            <Stack direction="row" spacing={1}>
              {socialLinks.map((socialLink, index) => (
                <SocialRoundLink key={index} url={socialLink.url} icon={socialLink.icon} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
