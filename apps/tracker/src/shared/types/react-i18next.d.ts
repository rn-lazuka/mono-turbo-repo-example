import 'i18next';
import common from '../../../public/locales/en/common.json';
import tracker from '../../../public/locales/en/tracker.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      tracker: typeof tracker;
      common: typeof common;
    };
  }
}
