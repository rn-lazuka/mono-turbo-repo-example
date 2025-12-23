import config from '@shared/config/index';

export const initHotjar = () => {
  const HOTJAR_ID = Number(config.HOTJAR_ID);
  if (HOTJAR_ID) {
    (function (c: any, s: Document, q: string, u: string, a: number) {
      c.hj =
        c.hj ||
        function () {
          // eslint-disable-next-line prefer-rest-params
          (c.hj.q = c.hj.q || []).push(arguments);
        };

      c._hjSettings = { hjid: a };

      const r = s.head;
      const e = s.createElement('script');

      if (r && e) {
        e.async = true;
        e.src = q + c._hjSettings.hjid + u;
        r.appendChild(e);
      }
    })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', HOTJAR_ID);
  } else {
    console.error('No HOTJAR_ID provided');
  }
};
