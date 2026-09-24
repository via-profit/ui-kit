import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CacheProvider as CSSCacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import readPreloadedState from '~/utils/readPreloadedState';
import ReduxProvider from '~/providers/ReduxProvider';
import ThemeProvider from '~/providers/ThemeProvider';
import LocaleProvider from './providers/LocaleProvider';
import routes from '~/routes';
import reduxDefaultState from '~/redux/defaultState';
import { readUiCookies } from '~/utils/uiCookies';

const bootstrap = () => {
  const rootElement = document.getElementById('app');
  if (!rootElement) {
    throw new Error('Root element with id #app not found');
  }

  const cssCache = createCache({ key: 'app' });
  const preloadedStates = readPreloadedState();
  const router = createBrowserRouter(routes);
  reduxDefaultState.setInitialState(state => ({
    ui: {
      ...state.ui,
      ...preloadedStates?.REDUX?.ui,
      // Settings chosen by the user (theme, etc.)
      ...readUiCookies(),
    },
  }));

  const AppData = (
    <ReduxProvider>
      <ThemeProvider>
        <CSSCacheProvider value={cssCache}>
          <LocaleProvider>
            <RouterProvider router={router} />
          </LocaleProvider>
        </CSSCacheProvider>
      </ThemeProvider>
    </ReduxProvider>
  );

  // The site is rendered on the client only (there is no SSR), so there is nothing to hydrate
  const root = createRoot(rootElement);
  root.render(AppData);
};

bootstrap();
