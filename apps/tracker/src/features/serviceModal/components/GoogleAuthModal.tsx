import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GoogleIcon } from '@yup/ui';
import { useTranslation } from 'react-i18next';

import roundLogoImage from '@assets/images/round-logo.png';
import config from '@shared/config/index';
import { AlertType } from '@shared/enums/common';
import { ServiceModalName } from '@shared/enums/modals';
import { logEvent } from '@shared/lib/analytics/googleAnalitics';
import { ServiceModalProps } from '@shared/types/serviceModal';
import { removeServiceModal } from '@store/slices/serviceModalSlice';
import { showSnackbar } from '@store/slices/snackbarSlice';
import { useAppDispatch } from '@store/store';

const GoogleAuthModal = ({ index }: ServiceModalProps) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(removeServiceModal(ServiceModalName.GoogleAuth));
  };

  const handleLogin = () => {
    handleClose();
    logEvent('Auth', 'google_auth_account_window_confirm');
    const authWindow = window.open(
      `${config.API_URL}/api/auth?redirectUrl=${window.location.origin}`,
      'GoogleAuth',
      'width=500,height=600'
    );

    if (!authWindow) {
      dispatch(showSnackbar({ message: t('allowPopups'), severity: AlertType.Info }));
    }
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      disableEnforceFocus
      disableScrollLock
      disableAutoFocus={true}
      sx={{ zIndex: index }}
      slotProps={{ paper: { sx: { p: 0, m: { xs: 0 }, width: { xs: 'calc(100% - 16px)' } } } }}
    >
      <DialogTitle
        sx={{ display: 'flex', alignItems: 'flex-start', flexGrow: 1, justifyContent: 'flex-end' }}
      >
        <IconButton onClick={handleClose} sx={{ mt: -0.5, mr: -1.5 }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 6 }}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Box component="img" src={roundLogoImage} width={48} height={48} alt="YieldUp" />
          <Typography variant="textXXLB">{t('signInTo')}</Typography>
          <Typography variant="textM" color="text.secondary" pb={1}>
            {t('welcomePleaseSignIn')}
          </Typography>
          <Button
            onClick={handleLogin}
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={(theme) => ({
              background: theme.palette.background.paper,
              border: `solid 1px ${theme.palette.neutral[0]}`,
            })}
          >
            {t('signInWithGoogle')}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleAuthModal;
