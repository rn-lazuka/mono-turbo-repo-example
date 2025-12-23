import { useMemo } from 'react';

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { snackbarDurationMs } from '@shared/constants/common';
import { AlertType } from '@shared/enums/common';
import { closeSnackbar } from '@store/slices/snackbarSlice';
import { RootState } from '@store/store';

export const SnackbarMessage = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { open, message, title, severity } = useSelector((state: RootState) => state.snackbar);

  const handleClose = (_: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(closeSnackbar());
  };

  const alert = useMemo(() => {
    switch (severity) {
      case AlertType.Error:
        return {
          title: t('error'),
          icon: <HighlightOffRoundedIcon color="error" />,
        };
      case AlertType.Warning:
        return {
          title: t('warning'),
          icon: <ErrorOutlineRoundedIcon color="warning" />,
        };
      case AlertType.Success:
        return {
          title: t('success'),
          icon: <CheckCircleOutlineRoundedIcon color="success" />,
        };
      case AlertType.Info:
        return {
          title: t('info'),
          icon: <InfoOutlineRoundedIcon color="info" />,
        };
      default:
        return null;
    }
  }, [severity, t]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={snackbarDurationMs}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Paper
        square={false}
        onClick={handleClose}
        sx={{
          background: 'linear-gradient(296.54deg, #424950 36.52%, #313A46 108.25%)',
          p: 2,
          maxWidth: 300,
          cursor: 'pointer',
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          {alert?.icon}
          <Typography variant="textMSB" sx={(theme) => ({ color: theme.palette.primary[99] })}>
            {title ? title : alert?.title}
          </Typography>
        </Stack>
        <Typography variant="textS" color="text.white">
          {message}
        </Typography>
      </Paper>
    </Snackbar>
  );
};
