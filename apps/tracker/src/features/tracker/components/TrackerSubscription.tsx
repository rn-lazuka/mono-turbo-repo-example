import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { handleFieldsError } from '@yup/ui';
import { useTranslation } from 'react-i18next';

import subscriptionImage from '@assets/images/subscription.png';
import { AlertType } from '@shared/enums/common';
import { useSubscribeWeeklyUpdatesMutation } from '@store/api/aweberApi';
import { showSnackbar } from '@store/slices/snackbarSlice';
import { useAppDispatch } from '@store/store';

const TrackerSubscription = () => {
  const { t } = useTranslation(['tracker', 'common']);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<Record<string, string> | null>(null);
  const [subscribe, { isLoading, isSuccess, isError, error }] = useSubscribeWeeklyUpdatesMutation();

  const handleSubmit = async () => {
    try {
      await subscribe({ email }).unwrap();
      setEmail('');
    } catch (err) {
      console.error('Subscription error:', err);
    }
  };

  useEffect(() => {
    if (isError && error && 'status' in error) {
      const fetchError = error as FetchBaseQueryError;
      const fieldsError = handleFieldsError(fetchError);
      setEmailError(fieldsError);

      if (fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data) {
        let message: 'unexpectedError' | 'alreadySubscribed' | 'validationFailed' =
          'unexpectedError';
        let severity = AlertType.Error;
        if (
          fetchError.data.message === 'alreadySubscribed' ||
          fetchError.data.message === 'validationFailed'
        ) {
          severity = AlertType.Warning;
          message = fetchError.data.message;
        }

        dispatch(
          showSnackbar({
            message: t(message),
            severity,
          })
        );
      }
    }

    if (isSuccess) {
      dispatch(
        showSnackbar({
          message: t('subscriptionSuccessful'),
          severity: AlertType.Success,
        })
      );
    }
  }, [isError, error, isSuccess, dispatch, t]);

  return (
    <Paper
      sx={{
        mt: 3,
        p: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        gap: { xs: 2, sm: 4 },
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 1 }}>
        <Stack direction="column">
          <Typography variant="textXXLB">{t('smarterYields')}</Typography>
          <Typography variant="textM" color="text.secondary" sx={{ mt: 2 }}>
            {t('weBuilding')}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2 }}
            sx={{ mt: { xs: 2, sm: 4 } }}
          >
            <TextField
              placeholder={t('enterEmail')}
              size="small"
              value={email}
              error={!!emailError?.email}
              onChange={(e) => {
                setEmailError(null);
                setEmail(e.target.value);
              }}
              helperText={t(emailError?.email as any)}
              type="email"
            />
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(113.87deg, #3C4653 0.34%, #1A212A 99.13%)',
                minWidth: 'max-content',
              }}
              disabled={isLoading}
              loading={isLoading}
              loadingIndicator={<CircularProgress sx={{ color: 'text.white' }} size={24} />}
              onClick={handleSubmit}
            >
              {t('joinTheWaitlist')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Box
        component="img"
        src={subscriptionImage}
        alt="email subscription"
        sx={{
          mt: { xs: 3, sm: 0 },
          ml: 'auto',
          mr: { xs: 'auto', sm: 0 },
          width: 300,
          height: 138,
        }}
      />
    </Paper>
  );
};

export default TrackerSubscription;
