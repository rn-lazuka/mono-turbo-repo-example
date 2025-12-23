import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Outlet, useLocation } from 'react-router';

import Footer from '@shared/components/Footer/Footer';
import Header from '@shared/components/Header/Header';
import { useAppDispatch } from '@store/store';

const Layout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const loginSuccess = queryParams.get('login');
    if (loginSuccess === 'success') {
      window.opener.postMessage({ type: 'LOGIN_SUCCESS' }, window.location.origin);
      window.close();
    }
  }, [location.search, dispatch]);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Header />
      <Container sx={{ minHeight: { xs: 'calc(100dvh - 317px)', sm: 'calc(100dvh - 286px)' } }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
