import { lazy, Suspense } from 'react';

import { ThemeProvider } from '@mui/material';
import { theme, globalStyles, GlobalLoader } from '@yup/ui';
import { Route, Routes } from 'react-router';

import { ServiceModal } from '@features/serviceModal/components/ServiceModal';
import { ErrorBoundary } from '@shared/components/ErrorBoundary/ErrorBoundary';
import Layout from '@shared/components/Layout/Layout';
import { ProtectedRoute } from '@shared/components/ProtectedRoute/ProtectedRoute';
import { ROUTES } from '@shared/constants/routes';
import { AnalyticsProvider } from '@shared/providers/AnaliticsProvider';
import { SnackbarMessage } from '@shared/providers/SnackbarMessage';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import { Web3Provider } from '@shared/providers/Web3Provider';

const Dashboard = lazy(() => import('@pages/Dashboard'));
const Asset = lazy(() => import('@pages/Asset'));
const Activity = lazy(() => import('@pages/Activity'));
const NotFoundPage = lazy(() => import('@yup/ui/components/NotFoundPage'));
const ErrorPage = lazy(() => import('@yup/ui/components/ErrorPage'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      {globalStyles}
      <ErrorBoundary>
        <Web3Provider>
          <AnalyticsProvider />
          <ServiceModal />
          <SnackbarMessage />
          <Suspense fallback={<GlobalLoader />}>
            <Routes>
              <Route path={ROUTES.main} element={<Layout />}>
                {/* Public routes */}
                <Route path={ROUTES.dashboard}>
                  <Route index element={<Dashboard />} />
                  <Route path={ROUTES.asset} element={<Asset />} />
                </Route>
                <Route path={ROUTES.activity} element={<Activity />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}></Route>

                <Route path={ROUTES.error} element={<ErrorPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </Web3Provider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
