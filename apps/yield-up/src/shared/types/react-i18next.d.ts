import 'i18next';
import activity from '../../../public/locales/en/activity.json';
import common from '../../../public/locales/en/common.json';
import dashboard from '../../../public/locales/en/dashboard.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      common: typeof common;
      dashboard: typeof dashboard;
      activity: typeof activity;
    };
  }
}
