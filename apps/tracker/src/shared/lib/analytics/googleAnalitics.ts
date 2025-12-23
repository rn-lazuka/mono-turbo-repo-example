import ReactGA from 'react-ga4';

import config from '@shared/config/index';

const GA_MEASUREMENT_ID = config.GA_MEASUREMENT_ID;

export const initGA = () => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  } else {
    console.error('No GA_MEASUREMENT_ID provided');
  }
};

export const logPageView = (url: string) => {
  ReactGA.send({ hitType: 'pageview', page: url });
};

export const logEvent = (category: string, action: string, label?: string) => {
  if (!config.isProduction) return null;
  ReactGA.event({
    category,
    action,
    label,
  });
};
