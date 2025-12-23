import { useEffect } from 'react';

import { useLocation } from 'react-router';

import config from '@shared/config/index';
import { initGA, logPageView } from '@shared/lib/analytics/googleAnalitics';
import { initHotjar } from '@shared/lib/analytics/hotjar';

export const AnalyticsProvider = () => {
  const location = useLocation();

  useEffect(() => {
    if (config.isProduction) {
      initGA();
      initHotjar();
    }
  }, []);

  useEffect(() => {
    if (config.isProduction) {
      logPageView(location.pathname + location.search);
    }
  }, [location]);

  return null;
};
