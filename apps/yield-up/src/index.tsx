import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import App from './App.tsx';
import i18n from '@shared/config/i18n.ts';
import config from '@shared/config/index.ts';
import { store } from '@store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <BrowserRouter basename={config?.BASE_URL}>
          <App />
        </BrowserRouter>
      </Provider>
    </I18nextProvider>
  </StrictMode>
);
