import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { ROUTES } from '@shared/constants/routes';
import { logEvent } from '@shared/lib/analytics/googleAnalitics';
import { useGetAuthStatusQuery } from '@store/api/authApi';
import { selectIsAuthChecked } from '@store/selectors/userSlice';
import { login, logout, setAuthCheck } from '@store/slices/userSlice';
import { useAppDispatch } from '@store/store';

function useAuthListener() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthChecked = selectIsAuthChecked();

  const { currentData: data, isError } = useGetAuthStatusQuery(undefined, {
    skip: isAuthChecked || location.pathname === `/${ROUTES.error}`,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === 'LOGIN_SUCCESS') {
        logEvent('Auth', 'google_auth_success');
        dispatch(setAuthCheck(false));
      }
    }

    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, [dispatch]);

  useEffect(() => {
    if (data?.authenticated && !isAuthChecked) {
      dispatch(login({ email: data.email }));
    } else if (!data && isError) {
      dispatch(logout());
      navigate(ROUTES.main);
    }
  }, [data, isError, dispatch, navigate, isAuthChecked]);
}

export default useAuthListener;
