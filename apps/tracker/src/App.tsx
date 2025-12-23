import { lazy, Suspense } from 'react';

import { ThemeProvider } from '@mui/material';
import { theme, globalStyles, GlobalLoader } from '@yup/ui';
import { Route, Routes } from 'react-router';

import { ServiceModal } from '@features/serviceModal/components/ServiceModal';
import { ErrorBoundary } from '@shared/components/ErrorBoundary/ErrorBoundary';
import Layout from '@shared/components/Layout/Layout';
import { ProtectedRoute } from '@shared/components/ProtectedRoute/ProtectedRoute';
import { ROUTES } from '@shared/constants/routes';
import useAuthListener from '@shared/hooks/useAuthListener';
import { AnalyticsProvider } from '@shared/providers/AnaliticsProvider';
import { SnackbarMessage } from '@shared/providers/SnackbarMessage';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';

const Tracker = lazy(() => import('@pages/Tracker'));
const TrackerViews = lazy(() => import('@pages/TrackerViews'));
const NotFoundPage = lazy(() => import('@yup/ui/components/NotFoundPage'));
const ErrorPage = lazy(() => import('@yup/ui/components/ErrorPage'));

function App() {
  useAuthListener();

  return (
    <ThemeProvider theme={theme}>
      {globalStyles}
      <ErrorBoundary>
        <AnalyticsProvider />
        <ServiceModal />
        <SnackbarMessage />
        <Suspense fallback={<GlobalLoader />}>
          <Routes>
            <Route path={ROUTES.main} element={<Layout />}>
              {/* Public routes */}
              <Route index element={<Tracker />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path={ROUTES.trackerViews} element={<TrackerViews />} />
              </Route>

              <Route path={ROUTES.error} element={<ErrorPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
