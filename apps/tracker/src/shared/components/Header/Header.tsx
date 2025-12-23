import { useEffect, useMemo, useState } from 'react';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import logoImage from '@assets/images/logo.png';
import { ConfirmModalData } from '@features/serviceModal/components/ConfirmModal';
import NavBar from '@shared/components/NavBar/NavBar';
import { ROUTES } from '@shared/constants/routes';
import { AlertType } from '@shared/enums/common';
import { ServiceModalName } from '@shared/enums/modals';
import { logEvent } from '@shared/lib/analytics/googleAnalitics';
import { useLogoutUserMutation } from '@store/api/authApi';
import { selectEmail, selectIsAuth } from '@store/selectors/userSlice';
import { addServiceModal } from '@store/slices/serviceModalSlice';
import { showSnackbar } from '@store/slices/snackbarSlice';
import { logout } from '@store/slices/userSlice';
import { useAppDispatch } from '@store/store';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const isAuth = selectIsAuth();
  const email = selectEmail();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const emailCircle = useMemo(() => {
    return email ? (
      <Box
        sx={{
          borderRadius: '100%',
          p: 1,
          width: 32,
          minWidth: 32,
          height: 32,
          minHeight: 32,
          bgcolor: 'primary.main',
          color: 'text.white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {email?.charAt(0).toUpperCase()}
      </Box>
    ) : null;
  }, [email, isAuth]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenSignInModal = () => {
    setMenuOpen(false);
    logEvent('Auth', 'google_auth_modal_open');
    dispatch(addServiceModal({ name: ServiceModalName.GoogleAuth }));
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch (e) {
      console.error('Logout error', e);
      dispatch(showSnackbar({ message: t('logoutError'), severity: AlertType.Error }));
    } finally {
      dispatch(logout());
      navigate(ROUTES.main);
      setMenuOpen(false);
    }
  };

  const handleOpenLogoutModal = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.Confirm,
        payload: {
          title: t('signOutQuestion'),
          subtitle: t('youWillNeedSignInAgain'),
          submitTitle: t('signOut'),
          onSubmit: handleLogout,
        } as ConfirmModalData,
      })
    );
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={[
          {
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            boxShadow: 'none',
            borderBottom: 'none',
          },
          scrolled && { borderBottom: '1px solid rgba(0, 0, 0, 0.12)' },
        ]}
      >
        <Toolbar
          sx={{ maxWidth: 'lg', width: 1, display: 'flex', justifyContent: 'space-between' }}
        >
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}
            >
              <NavBar />
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {emailCircle}
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(113.87deg, #3C4653 0.34%, #1A212A 99.13%)',
                  minWidth: 'max-content',
                }}
                onClick={isAuth ? handleOpenLogoutModal : handleOpenSignInModal}
              >
                {t(isAuth ? 'signOut' : 'signIn')}
              </Button>
            </Stack>
          </Box>

          <IconButton
            onClick={() => setMenuOpen(true)}
            sx={{ display: { xs: 'flex', sm: 'none' }, p: 0.5 }}
          >
            <MenuRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Slide in={menuOpen} mountOnEnter unmountOnExit>
        <Paper
          square
          sx={{
            position: 'fixed',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            bgcolor: 'background.default',
            border: 'none',
            display: { xs: 'flex', sm: 'none' },
            flexDirection: 'column',
            boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Stack direction="column" p={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Box
                component="img"
                src={logoImage}
                alt="YieldUp"
                onClick={() => navigate(ROUTES.main)}
                sx={{
                  width: 60,
                  height: 16,
                }}
              />
              <IconButton onClick={() => setMenuOpen(false)} sx={{ p: 0.5 }}>
                <CloseRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Stack>
            <NavBar onItemClick={() => setMenuOpen(false)} />
          </Stack>
          <Divider />
          <Stack p={2} spacing={1} direction="row" alignItems="center" width={1}>
            {emailCircle}
            <Button
              variant="contained"
              size="small"
              fullWidth
              sx={{
                background: 'linear-gradient(113.87deg, #3C4653 0.34%, #1A212A 99.13%)',
                minWidth: 'max-content',
              }}
              onClick={isAuth ? handleOpenLogoutModal : handleOpenSignInModal}
            >
              {t(isAuth ? 'signOut' : 'signIn')}
            </Button>
          </Stack>
        </Paper>
      </Slide>
    </>
  );
};

export default Header;
