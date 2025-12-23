import { Component, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link } from 'react-router';

import globalError from '@assets/images/global-error.png';
import Footer from '@shared/components/Footer/Footer';
import Header from '@shared/components/Header/Header';
import { ROUTES } from '@shared/constants/routes';

interface Props extends WithTranslation {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundaryComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleTryAgain = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <Box sx={{ bgcolor: 'background.default' }}>
          <Header />
          <Container sx={{ minHeight: { xs: 'calc(100dvh - 317px)', sm: 'calc(100dvh - 286px)' } }}>
            <Stack
              component="main"
              sx={{ py: 5, px: 2, maxWidth: 900 }}
              mx="auto"
              direction="column"
              alignItems="center"
              justifyContent="center"
              gap={3}
            >
              <Box
                component="img"
                src={globalError}
                width={{ xs: 270, sm: 540 }}
                height={{ xs: 190, sm: 380 }}
                alt="Error image"
                pb={2}
              />
              <Typography
                variant="textXL"
                fontSize={{ xs: 32, sm: 58 }}
                lineHeight={{ xs: '32px', sm: '58px' }}
                fontWeight={700}
                color="primary.main"
                textAlign="center"
              >
                {t('somethingWrong')}
              </Typography>
              <Typography
                fontSize={{ xs: 16, sm: 24 }}
                lineHeight={{ xs: '20px', sm: '32px' }}
                color="text.secondary"
                textAlign="center"
              >
                {t('cantFindYouAreLookingFor')}
              </Typography>
              <Link to={ROUTES.main} onClick={this.handleTryAgain} reloadDocument>
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(113.87deg, #3C4653 0.34%, #1A212A 99.13%)',
                    minWidth: 'max-content',
                  }}
                >
                  {t('goToHomepage')}
                </Button>
              </Link>
            </Stack>
          </Container>
          <Footer />
        </Box>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = withTranslation('common')(ErrorBoundaryComponent);
