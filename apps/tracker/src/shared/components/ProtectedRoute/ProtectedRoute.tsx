import { GlobalLoader } from '@yup/ui';
import { Navigate, Outlet } from 'react-router';

import { ROUTES } from '@shared/constants/routes';
import { selectIsAuth, selectIsAuthChecked } from '@store/selectors/userSlice';

export function ProtectedRoute() {
  const isAuth = selectIsAuth();
  const isAuthChecked = selectIsAuthChecked();

  if (!isAuthChecked) {
    return <GlobalLoader />;
  }

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.main} replace />;
}
